<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);

// 공통 헤더 및 함수 파일 포함
include '../lib/global.php';
include '../lib/dbConnectNew.php';
include '../lib/function.php';
include '../lib/passwordHash.php';

session_set_cookie_params(0, "/", "." . $_siteURL);
ini_set('session.gc_maxlifetime', 28800);
ini_set('session.cache_limiter', 'nocache, must-revalidate-revalidate');
session_start();


// 임베딩 API 호출 함수
function getEmbedding($text) {
    // 환경 변수에서 API 키 불러오기 (보안 강화)
    $apiKey = OPENAI_API_KEY;

    if (!$apiKey) {
        die("API 키가 설정되지 않았습니다.");
    }

    $url = 'https://api.openai.com/v1/embeddings';
    $data = [
        "model" => "text-embedding-ada-002",
        "input" => $text
    ];
    $data_string = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    // API 호출 실행 및 오류 처리
    $result = curl_exec($ch);
    if ($result === false) {
        die("cURL 오류 발생: " . curl_error($ch));
    }

    // HTTP 상태 코드 확인
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($http_status != 200) {
        die("임베딩 API 호출 실패. 상태 코드: " . $http_status . " 응답: " . $result);
    }

    curl_close($ch);

    // JSON 응답 디코딩 및 확인
    $response = json_decode($result, true);
    if ($response === null && json_last_error() !== JSON_ERROR_NONE) {
        die("JSON 디코딩 오류 발생: " . json_last_error_msg());
    }

    return isset($response['data'][0]['embedding']) ? $response['data'][0]['embedding'] : null;
}

// OpenAI API 호출 함수
function callOpenAIAPI($prompt) {
    // 환경 변수에서 API 키 불러오기 (보안 강화)
    $apiKey = OPENAI_API_KEY;
    if (!$apiKey) {
        die("API 키가 설정되지 않았습니다.");
    }

    $url = 'https://api.openai.com/v1/chat/completions';
    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'system', 'content' => 'You are a helpful assistant that responds in Korean.'],
            ['role' => 'user', 'content' => $prompt]
        ],
        'max_tokens' => 500,
        'temperature' => 0.7,
    ];
    $data_string = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    $result = curl_exec($ch);

    // cURL 오류 처리
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        die("cURL 오류 발생: " . $error_msg);
    }

    // HTTP 상태 코드 확인
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_status != 200) {
        die("API 호출 실패. 상태 코드: " . $http_status . " 응답: " . $result);
    }

    return json_decode($result, true);
}

// Cosine 유사도 계산 함수
function cosineSimilarity($vec1, $vec2) {
    $dotProduct = 0.0;
    $normA = 0.0;
    $normB = 0.0;
    for ($i = 0; $i < count($vec1); $i++) {
        $dotProduct += $vec1[$i] * $vec2[$i];
        $normA += pow($vec1[$i], 2);
        $normB += pow($vec2[$i], 2);
    }
    if ($normA == 0.0 || $normB == 0.0) {
        return 0.0;
    }
    return $dotProduct / (sqrt($normA) * sqrt($normB));
}


function getRelevantContents($userQuestion, $contentsCode, $limit = 5) {
    global $mysqli;

    // 사용자 질문 임베딩 생성
    $userEmbedding = getEmbedding($userQuestion);
    if ($userEmbedding === null) {
        error_log("사용자 질문 임베딩 생성 실패");
        return array("error" => "질문 임베딩 생성 실패");
    }

    // SQL 쿼리
    $query = "SELECT content, embedding FROM nynChatbot WHERE contentsCode = ? AND embedding IS NOT NULL LIMIT 100";
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        error_log("SQL 준비 실패: " . $mysqli->error);
        return array("error" => "SQL 준비 실패");
    }

    $stmt->bind_param('s', $contentsCode);
    if (!$stmt->execute()) {
        error_log("쿼리 실행 실패: " . $stmt->error);
        return array("error" => "쿼리 실행 실패");
    }

    $result = $stmt->get_result();
    if (!$result) {
        error_log("쿼리 결과 실패: " . $mysqli->error);
        return array("error" => "쿼리 결과 실패");
    }

    $similarities = array();
    while ($row = $result->fetch_assoc()) {
        $content = $row['content'];
        $embedding = json_decode($row['embedding'], true); // 배열 반환

        if (!is_array($embedding)) {
            error_log("임베딩 JSON 디코딩 실패: " . $row['embedding']);
            continue;
        }

        if (count($userEmbedding) !== count($embedding)) {
            error_log("임베딩 벡터 크기 불일치");
            continue;
        }

        // 코사인 유사도 계산
        $similarity = cosineSimilarity($userEmbedding, $embedding);
        $similarities[] = array('content' => $content, 'similarity' => $similarity);
    }

    $stmt->close();

    // 유사도 기준 정렬
    usort($similarities, function ($a, $b) {
        if ($a['similarity'] == $b['similarity']) {
            return 0;
        }
        return ($a['similarity'] > $b['similarity']) ? -1 : 1;
    });

    // DB에 관련 데이터가 없거나, 유사도가 너무 낮으면 빈 배열 반환
    if (count($similarities) === 0 || $similarities[0]['similarity'] < 0.7) {
        return array(); // 데이터가 없으므로 빈 배열 반환
    }

    // 상위 $limit개의 콘텐츠 선택
    $relevantContents = array();
    for ($i = 0; $i < min($limit, count($similarities)); $i++) {
        $relevantContents[] = $similarities[$i]['content'];
    }

    return $relevantContents;
}

function generateAnswer($userQuestion, $contentsCode) {
    global $mysqli;

    // 1. 데이터베이스에서 데이터 가져오기
    $query = "SELECT content FROM nynChatbot WHERE contentsCode = ?";
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        error_log("SQL 준비 실패: " . $mysqli->error);
        return array("result" => "error", "message" => "데이터 조회 중 오류가 발생했습니다.");
    }

    $stmt->bind_param('s', $contentsCode);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result || $result->num_rows === 0) {
        // 데이터가 없을 경우
        $stmt->close();
        return array("result" => "no_data", "message" => "관련된 데이터가 없습니다.");
    }

    // 2. 데이터 변환
    $tableData = [];
    while ($row = $result->fetch_assoc()) {
        $tableData[] = $row['content'];
    }
    $stmt->close();

    // 3. 프롬프트 생성
    $formattedData = implode("\n", $tableData);
    $prompt = "다음은 데이터베이스에서 가져온 콘텐츠입니다:\n\n";
    $prompt .= $formattedData;
    $prompt .= "\n\n질문: $userQuestion\n\n위 데이터를 참고하여 질문에 대한 답변을 작성해주세요.";

    // 4. GPT API 호출
    try {
        $response = callOpenAIAPI($prompt);
        return array("result" => "success", "message" => $response['choices'][0]['message']['content']);
    } catch (Exception $e) {
        error_log($e->getMessage());
        return array("result" => "error", "message" => "GPT 응답 생성 중 오류가 발생했습니다.");
    }
}






// 캐시 저장 함수 (mysqli 사용)
function cacheAnswer($question, $contentsCode, $answer) {
    global $mysqli;

    // 현재 사용자 ID 가져오기
    $userID = isset($_SESSION['loginUserID']) ? $_SESSION['loginUserID'] : 'guest';

    // SQL 쿼리 준비
    $query = "INSERT INTO nynChatbotCache (question, contentsCode, answer, userID) 
              VALUES (?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE answer = ?";
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        error_log("캐시 저장 실패: " . $mysqli->error);
        return false;
    }

    // 파라미터 바인딩 및 실행
    $stmt->bind_param('sssss', $question, $contentsCode, $answer, $userID, $answer);
    if (!$stmt->execute()) {
        error_log("캐시 저장 실행 실패: " . $stmt->error);
        $stmt->close();
        return false;
    }

    $stmt->close();
    return true;
}




// POST 요청 처리
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $action = !empty($_POST['action']) ? trim($_POST['action']) : 'ask'; // 기본 동작은 질문 처리
    $userQuestion = !empty($_POST['question']) ? trim($_POST['question']) : '';
    $contentsCode = !empty($_POST['contentsCode']) ? trim($_POST['contentsCode']) : '';

    if ($action === 'getChatHistory') {
        // 캐시된 질문/답변 가져오기
        $history = getQuestionHistory($contentsCode);
        if (empty($history)) {
            echo "이전에 질문했던 기록이 없습니다.";
        } else {
            echo json_encode($history);
        }
        exit;
    }

    if ($action === 'ask') {
		if (empty($contentsCode)) {
			echo json_encode(["error" => "콘텐츠 코드가 누락되었습니다. 관리자에게 문의하세요."]);
			exit;
		}

		if (empty($userQuestion)) {
			echo json_encode(["error" => "질문을 입력해주세요."]);
			exit;
		}

		// 데이터베이스 기반 답변 생성
		$answerData = generateAnswer($userQuestion, $contentsCode);

		if ($answerData['result'] === 'no_data') {
			// 데이터가 없을 경우 질문과 "관련된 데이터 없음" 메시지를 저장
			cacheAnswer($userQuestion, $contentsCode, "관련된 데이터가 없습니다.");
			echo json_encode(["message" => "관련된 데이터가 없습니다."]);
			exit;
		}

		// 데이터가 있을 경우 질문과 생성된 답변을 저장
		cacheAnswer($userQuestion, $contentsCode, $answerData['message']);

		// 결과 반환
		echo json_encode($answerData);
		exit;
	}





}

function getSimilarCachedAnswer($userQuestion, $contentsCode) {
    global $mysqli;

    // 사용자 질문 임베딩 생성
    $userEmbedding = getEmbedding($userQuestion);
    if ($userEmbedding === null) {
        error_log("사용자 질문 임베딩 생성 실패");
        return null; // 임베딩 생성 실패 시 null 반환
    }

    // 캐시 테이블에서 해당 콘텐츠 코드와 관련된 데이터 조회
    $query = "SELECT question, answer, embedding FROM nynChatbotCache WHERE contentsCode = ?";
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        error_log("SQL 준비 실패: " . $mysqli->error);
        return null;
    }

    $stmt->bind_param('s', $contentsCode);
    if (!$stmt->execute()) {
        error_log("쿼리 실행 실패: " . $stmt->error);
        $stmt->close();
        return null;
    }

    $result = $stmt->get_result();
    $similarities = [];
    while ($row = $result->fetch_assoc()) {
        $cachedEmbedding = json_decode($row['embedding'], true); // JSON 디코딩
        if (!is_array($cachedEmbedding)) {
            error_log("임베딩 JSON 디코딩 실패: " . $row['embedding']);
            continue;
        }

        // 코사인 유사도 계산
        if (count($userEmbedding) === count($cachedEmbedding)) {
            $similarity = cosineSimilarity($userEmbedding, $cachedEmbedding);
            $similarities[] = [
                'question' => $row['question'],
                'answer' => $row['answer'],
                'similarity' => $similarity
            ];
        } else {
            error_log("임베딩 크기 불일치: 사용자(" . count($userEmbedding) . "), 캐시(" . count($cachedEmbedding) . ")");
        }
    }

    $stmt->close();

    // 유사도 기준으로 정렬 (높은 순)
    usort($similarities, function ($a, $b) {
        return $b['similarity'] - $a['similarity'];
    });

    // 상위 결과가 임계값 이상인지 확인
    if (!empty($similarities) && $similarities[0]['similarity'] >= 0.9) { // 유사도 0.7 이상
        return $similarities[0]['answer']; // 가장 유사한 답변 반환
    }

    return null; // 유사한 데이터가 없으면 null 반환
}


function getCachedAnswer($userQuestion) {
    global $mysqli;

    // SQL 쿼리: 질문 캐시 테이블에서 질문에 해당하는 답변 검색
    $query = "SELECT answer FROM nynChatbotCache WHERE question = ?";
    $stmt = $mysqli->prepare($query);

    if (!$stmt) {
        error_log("SQL 준비 실패: " . $mysqli->error);
        return null;
    }

    $stmt->bind_param('s', $userQuestion);
    if (!$stmt->execute()) {
        error_log("쿼리 실행 실패: " . $stmt->error);
        $stmt->close();
        return null;
    }

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stmt->close();
        return $row['answer']; // 캐시된 답변 반환
    }

    $stmt->close();
    return null; // 캐시된 데이터가 없으면 null 반환
}


function getQuestionHistory($contentsCode) {
    global $mysqli;

    $query = "SELECT question, answer, created_at FROM nynChatbotCache WHERE contentsCode = ? AND userID = ? ORDER BY created_at ASC";
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        die('Prepare failed: (' . $mysqli->errno . ') ' . $mysqli->error);
    }

    $stmt->bind_param('ss', $contentsCode, $_SESSION['loginUserID']);
    if (!$stmt->execute()) {
        die('Execute failed: (' . $stmt->errno . ') ' . $stmt->error);
    }

    $result = $stmt->get_result();
    $history = [];
    while ($row = $result->fetch_assoc()) {
        $history[] = [
            'question' => $row['question'],
            'answer' => $row['answer'],
            'created_at' => $row['created_at']
        ];
    }

    $stmt->close();
    return $history;
}

function getUserChatHistory($contentsCode) {
    global $mysqli;
    session_start();

    // 현재 로그인한 사용자 ID 가져오기
    $loginUserID = $_SESSION['loginUserID'];
    if (!$loginUserID) {
        return "로그인이 필요합니다.";
    }

    // 현재 콘텐츠 코드가 없으면 종료
    if (empty($contentsCode)) {
        return "콘텐츠 코드가 누락되었습니다.";
    }

    // 사용자 ID와 콘텐츠 코드에 따라 데이터 조회
    $stmt = $mysqli->prepare("
        SELECT question, answer, created_at 
        FROM nynChatbotCache 
        WHERE userID = ? AND contentsCode = ? 
        ORDER BY created_at DESC
    ");
    if (!$stmt) {
        die('SQL 준비 실패: (' . $mysqli->errno . ') ' . $mysqli->error);
    }

    $stmt->bind_param('ss', $loginUserID, $contentsCode);
    $stmt->execute();
    $result = $stmt->get_result();

    $history = [];
    while ($row = $result->fetch_assoc()) {
        $history[] = $row; // 데이터 배열로 저장
    }

    $stmt->close();

    return $history;
}



?>

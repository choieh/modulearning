<?php
include '../lib/global.php';
include '../lib/dbConnectNew.php';
include '../lib/function.php';
include '../lib/passwordHash.php';

session_set_cookie_params(0, "/", "." . $_siteURL);
ini_set('session.gc_maxlifetime', 28800);
ini_set('session.cache_limiter', 'nocache, must-revalidate-revalidate');
session_start();

// 콘텐츠를 추가하는 함수 예시
function addContent($content, $contentsCode) {
    global $mysqli;

    // 콘텐츠 추가
    $stmt = $mysqli->prepare("INSERT INTO nynChatbot (content, contentsCode) VALUES (?, ?)");
    $stmt->bind_param('ss', $content, $contentsCode);
    if (!$stmt->execute()) {
        die("콘텐츠 추가 실패: (" . $stmt->errno . ") " . $stmt->error);
    }
    $id = $stmt->insert_id;
    $stmt->close();

    // 임베딩 생성
    $embedding = getEmbedding($content);
    if ($embedding === null) {
        echo "임베딩 생성 실패 for ID: $id<br>";
        return;
    }

    // 임베딩 저장
    $embedding_json = json_encode($embedding);
    $stmt = $mysqli->prepare("UPDATE nynChatbot SET embedding = ? WHERE id = ?");
    $stmt->bind_param('si', $embedding_json, $id);
    if ($stmt->execute()) {
        echo "콘텐츠 추가 및 임베딩 저장 성공 for ID: $id<br>";
    } else {
        echo "임베딩 저장 실패 for ID: $id - " . $stmt->error . "<br>";
    }
    $stmt->close();
}

// 임베딩 생성 함수
function getEmbedding($text) {
    $apiKey = OPENAI_API_KEY;

    if (!$apiKey) {
        die("API 키가 설정되지 않았습니다.");
    }

    $url = 'https://api.openai.com/v1/embeddings';
    $data = array(
        "model" => "text-embedding-ada-002",
        "input" => $text
    );
    $data_string = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ));

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

// 지식베이스에서 모든 콘텐츠 가져오기
$query = "SELECT id, content, contentsCode FROM nynChatbot";
$result = $mysqli->query($query);

if (!$result) {
    die("쿼리 실패: " . $mysqli->error);
}

while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    $content = $row['content'];
    $contentsCode = $row['contentsCode'];

    // 이미 임베딩이 있는지 확인 (중복 생성 방지)
    $check_query = "SELECT embedding FROM nynChatbot WHERE id = " . intval($id);
    $check_result = $mysqli->query($check_query);
    if ($check_result && $check_row = $check_result->fetch_assoc()) {
        if (!empty($check_row['embedding'])) {
            echo "ID: $id - 이미 임베딩이 존재합니다. 건너뜁니다.<br>";
            continue;
        }
    }

    // 임베딩 생성
    $embedding = getEmbedding($content);

    if ($embedding === null) {
        echo "임베딩 생성 실패 for ID: $id<br>";
        continue;
    }

    // JSON 형식으로 임베딩 저장
    $embedding_json = json_encode($embedding);

    // 임베딩 업데이트
    $stmt = $mysqli->prepare("UPDATE nynChatbot SET embedding = ? WHERE id = ?");
    if (!$stmt) {
        die('Prepare failed: (' . $mysqli->errno . ') ' . $mysqli->error);
    }

    $stmt->bind_param('si', $embedding_json, $id);

    if ($stmt->execute()) {
        echo "임베딩 저장 성공 for ID: $id (콘텐츠 코드: $contentsCode)<br>";
    } else {
        echo "임베딩 저장 실패 for ID: $id - " . $stmt->error . "<br>";
    }

    $stmt->close();
}

$result->free();
$mysqli->close();
?>

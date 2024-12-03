<?php
include '../lib/global.php';
include '../lib/dbConnectNew.php';
include '../lib/function.php';
include '../lib/passwordHash.php';

//error_reporting(E_ALL);
//ini_set('display_errors', 1);



// OpenAI 임베딩 생성 함수
function getEmbedding($text) {
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

    $result = curl_exec($ch);

    if ($result === false) {
        die("cURL 오류 발생: " . curl_error($ch));
    }

    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($http_status != 200) {
        die("임베딩 API 호출 실패. 상태 코드: " . $http_status . " 응답: " . $result);
    }

    curl_close($ch);

    $response = json_decode($result, true);

    if ($response === null && json_last_error() !== JSON_ERROR_NONE) {
        die("JSON 디코딩 오류 발생: " . json_last_error_msg());
    }

    return $response['data'][0]['embedding'] ?: null;

}

// 데이터베이스에서 모든 content 가져오기
$query = "SELECT id, content FROM nynChatbot WHERE embedding IS NULL OR embedding = ''";
$result = $mysqli->query($query);

if (!$result) {
    die("쿼리 실패: " . $mysqli->error);
}

while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    $content = $row['content'];

    // 임베딩 생성
    $embedding = getEmbedding($content);

    if ($embedding === null) {
        echo "임베딩 생성 실패 for ID: $id<br>";
        continue;
    }

    // JSON 형식으로 변환
    $embedding_json = json_encode($embedding);

    // 임베딩 업데이트
    $stmt = $mysqli->prepare("UPDATE nynChatbot SET embedding = ? WHERE id = ?");
    if (!$stmt) {
        die('Prepare failed: (' . $mysqli->errno . ') ' . $mysqli->error);
    }

    $stmt->bind_param('si', $embedding_json, $id);

    if ($stmt->execute()) {
        echo "임베딩 저장 성공 for ID: $id<br>";
    } else {
        echo "임베딩 저장 실패 for ID: $id - " . $stmt->error . "<br>";
    }

    $stmt->close();
}

$result->free();
$mysqli->close();
?>

<?php
header('Content-Type: application/json');

// POST 데이터 가져오기
$data = json_decode(file_get_contents('php://input'), true);

// 입력값 확인
//$authKey = $data['authKey'] ?? null;
$contentsCode = $data['contentsCode'] ?? null;
$userQuestion = $data['question'] ?? null;

//if (!$authKey || !$contentsCode || !$userQuestion) {
if (!$contentsCode || !$userQuestion) {
    echo json_encode(['error' => '잘못된 요청입니다.']);
    exit;
}

// 인증키 검증
/*$allowedKeys = [
    "your-unique-auth-key" => "기업1",
    "another-auth-key" => "기업2"
];

if (!array_key_exists($authKey, $allowedKeys)) {
    echo json_encode(['error' => '인증 실패: 유효하지 않은 인증키입니다.']);
    exit;
}*/

// 캐시 및 DB에서 답변 검색 (기존 함수 재사용)
require_once '../chatbot.php'; // 관련 함수 포함

$cachedAnswer = getSimilarCachedAnswer($userQuestion, $contentsCode);
if ($cachedAnswer !== null) {
    echo json_encode(['message' => $cachedAnswer, 'source' => 'cache']);
    exit;
}

$relevantContents = getRelevantContents($userQuestion, $contentsCode);
if (!empty($relevantContents)) {
    $response = implode("\n", $relevantContents);
    echo json_encode(['message' => $response, 'source' => 'database']);
    exit;
}

echo json_encode(['message' => '관련된 정보를 찾을 수 없습니다.', 'source' => 'none']);

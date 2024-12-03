<?php
// 사용자로부터 질문을 입력받습니다 (예시로 하드코딩된 질문 사용)
$userQuestion = "여기에 사용자의 질문을 입력하세요.";

// 프롬프트 구성
$prompt = "사용자의 질문에 기반하여 답변을 제공하세요:\n\n질문: " . $userQuestion . "\n답변:";

// API 호출
$response = callOpenAIAPI($prompt, $apiKey);

// 응답 처리
if (isset($response['choices'][0]['text'])) {
    $answer = trim($response['choices'][0]['text']);
    echo "Chatbot 답변: " . $answer;
} else {
    echo "API 호출 중 오류가 발생했습니다.";
}
?>

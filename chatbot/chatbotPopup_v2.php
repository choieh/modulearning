<?php
// 보안 검증
$authKey = $_GET['authKey'] ? $_GET['authKey'] : null;
$contentsCode = $_GET['contentsCode'] ? $_GET['contentsCode'] : null;

/*if (!$authKey || !$contentsCode) {
    die("잘못된 접근입니다.");
}

// 인증키 검증 (데이터베이스나 설정 파일에서 인증키 확인)
$allowedKeys = [
    "your-unique-auth-key" => "기업1",
    "another-auth-key" => "기업2"
];

if (!array_key_exists($authKey, $allowedKeys)) {
    die("인증 실패: 유효하지 않은 인증키입니다.");
}*/

?>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>모두의러닝 - AI 튜터</title>
    <meta name="title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹" />
    <meta name="description"
        content="모두의러닝, 법정의무교육, 산업안전보건교육, 직무교육, 마이크로러닝, 플립러닝, 비대면서비스바우처, 사업주환급, 모두의교육그룹, AI 영상제작 스튜디오" />
    <meta name="keywords" content="모두의러닝, moduLEARNING">
    <meta property="og:type" content="website">
    <meta property="og:title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹">
    <meta property="og:description"
        content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격, 모두의교육그룹, AI 영상제작 스튜디오">
    <link rel="stylesheet" href="/css/video.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/css/fontVideo.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/css/swal.css?ver=<?= time() ?>">
    <link rel="stylesheet" href="/dist/css/main.css?ver=<?= time() ?>">
</head>

<body>
    <div id="chatbot" class="chatbot">
        <div class="chatbot__header">
            <div class="chatbot__banner">
                <img src="/images/study/img_moduri.png" alt="모두의교육그룹 챗봇 모두리입니다. 무엇이든 물어보시면 친절하게 알려드릴께요!">
            </div>
        </div>
        <!-- 채팅 내용 -->
        <div id="chatbot-container" class="chatbot__container">
            <!-- 대화 내용이 여기에 표시됩니다 -->
        </div>
        <!-- 메시지 입력란 -->
        <div class="chatbot__footer">
            <form id="chatForm">
                <ul id="chatForm--items" class="is-active">
                    <li class="chatForm--item">
                        <button type="button" class="chatForm--item-btn btn-primary"
                            data-question="모두의러닝은?">모두의러닝은?</button>
                    </li>
                    <li class="chatForm--item">
                        <button type="button" class="chatForm--item-btn btn-primary"
                            data-question="개인정보처리는 어떻게하고있나요?">개인정보처리는 어떻게하고있나요?</button>
                    </li>
                </ul>
                <div id="chatForm--input">
                    <input type="hidden" id="csrf_token" value="<?= htmlspecialchars($csrfToken) ?>">
                    <textarea id="chat-input" placeholder="메시지를 입력하세요..."></textarea>
                    <button type="button" id="send-chat" onclick="sendChat()">전송</button>
                </div>
            </form>
        </div>
    </div>

    <script>
    const chatContainer = document.getElementById('chatbot-container');
    const userInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-chat');
    const exampleQuestions = document.querySelectorAll('.chatForm--item-btn');

    const authKey = "<?= htmlspecialchars($authKey) ?>";
    const contentsCode = "<?= htmlspecialchars($contentsCode) ?>";

    // 메시지를 채팅 창에 추가하는 함수
    function appendMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type === 'user' ? 'user' : 'bot'}`;
        messageDiv.innerHTML = type === 'bot' ?
            `<div class="bot__profile"><img src="/images/study/img_chatbot.png" alt="모두리 프로필"></div>
                    <div class="message"><p class="message--text">${message}</p></div>` :
            `<div class="message"><p class="message--text">${message}</p></div>`;
        chatContainer.appendChild(messageDiv);

        // 새로운 메시지 표시를 위해 스크롤 맨 아래로 이동
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 이전 대화 내역 가져오기
    function loadChatHistory() {
        const formData = new URLSearchParams();
        formData.append('action', 'getChatHistory');
        formData.append('contentsCode', contentsCode);
        formData.append('authKey', authKey);

        fetch('https://modulearning.kr/chatbot/chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    data.forEach(item => {
                        appendMessage(item.question, 'user');
                        appendMessage(item.answer, 'bot');
                    });
                } else {
                    console.error('대화 기록을 가져오는 중 문제가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error fetching chat history:', error);
            });
    }

    // 질문 전송 함수
    function sendQuestion() {
        const userQuestion = userInput.value.trim();
        if (!userQuestion) return;

        const formData = new URLSearchParams();
        formData.append('action', 'ask');
        formData.append('question', userQuestion);
        formData.append('contentsCode', contentsCode);
        formData.append('authKey', authKey);

        appendMessage(userQuestion, 'user');

        document.getElementById('chat-input').value = '';

        fetch('https://modulearning.kr/chatbot/chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.message || '답변을 찾을 수 없습니다.';
                appendMessage(botMessage, 'bot');
                userInput.value = '';
            })
            .catch(error => {
                appendMessage('서버와 통신 중 문제가 발생했습니다.', 'bot');
                console.error('Error:', error);
            });
    }

    // 페이지 로드 시 대화 내역 불러오기
    window.addEventListener('DOMContentLoaded', loadChatHistory);

    // 엔터 키로 질문 전송
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendQuestion();
        }
    });

    // 버튼 클릭으로 질문 전송
    sendBtn.addEventListener('click', sendQuestion);

    // 예시 질문 클릭 이벤트
    exampleQuestions.forEach(example => {
        example.addEventListener('click', function() {
            const question = this.dataset.question;
            document.getElementById('chat-input').value = question;
            // sendQuestion();
            //sendMessage(question);
        });
    });
    </script>
</body>

</html>
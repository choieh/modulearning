<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>모두의교육그룹 챗봇 모두리</title>
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
                        <button type="button" class="chatForm--item-btn btn-primary">모두의러닝은?</button>
                    </li>
                    <li class="chatForm--item">
                        <button type="button" class="chatForm--item-btn btn-primary">개인정보처리는
                            어떻게하고있나요?</button>
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
    const searchParam = new URLSearchParams(window.location.search);

    const param = {
        'contentsCode': searchParam.get('contentsCode')
    }

    function sendChat() {
        const chatInput = document.getElementById('chat-input').value.trim();
        const chatContainer = document.getElementById('chatbot-container');
        if (!chatContainer) {
            console.error('채팅 컨테이너를 찾을 수 없습니다');
            return;
        }
        const contentsCode = param.contentsCode; // 현재 콘텐츠 코드

        if (!chatInput) {
            alert('메시지를 입력해주세요.');
            return;
        }

        // 사용자 메시지 추가
        appendMessage(chatInput, 'user');

        // 입력 필드 초기화
        document.getElementById('chat-input').value = '';

        // 챗봇 응답 대기 메시지 추가
        const botTyping = appendMessage('AI 튜터가 답변을 작성 중입니다...', 'bot');

        // AJAX 요청
        fetch('/chatbot/chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    question: chatInput,
                    contentsCode: contentsCode,
                    csrf_token: document.getElementById('csrf_token').value
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(jsonResponse => {
                if (jsonResponse.message) {
                    botTyping.querySelector('.message--text').textContent = jsonResponse.message;
                } else {
                    botTyping.querySelector('.message--text').textContent = '답변을 찾을 수 없습니다.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                botTyping.querySelector('.message--text').textContent = '오류가 발생했습니다. 나중에 다시 시도해주세요.';
            });
    }



    // 엔터 키 지원 추가
    document.getElementById('chat-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 줄바꿈 방지
            sendChat();
        }
    });


    function loadChatHistory() {
        const chatContainer = document.getElementById('chatbot-container');
        if (!chatContainer) {
            console.error('채팅 컨테이너를 찾을 수 없습니다');
            return;
        }
        const contentsCode = param.contentsCode;

        fetch('/chatbot/chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'getChatHistory',
                    contentsCode: contentsCode
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(chatHistory => {
                if (Array.isArray(chatHistory) && chatHistory.length > 0) {
                    chatHistory.forEach(chat => {
                        appendMessage(chat.question, 'user');
                        appendMessage(chat.answer, 'bot');
                    });
                } else {
                    appendMessage('이전 대화 기록이 없습니다.', 'bot');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('대화 기록을 불러오는 중 오류가 발생했습니다.', 'bot');
            });
    }

    function appendMessage(message, type) {
        const chatContainer = document.getElementById('chatbot-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type === 'user' ? 'user' : 'bot'}`;

        // bot 타입일 때만 프로필 이미지 추가
        messageDiv.innerHTML = type === 'bot' ?
            `<div class="bot__profile"><img src="/images/study/img_chatbot.png" alt="모두리 프로필"></div>
                    <div class="message"><p class="message--text">${message}</p></div>` :
            `<div class="message"><p class="message--text">${message}</p></div>`;

        chatContainer.appendChild(messageDiv);

        // 새로운 메시지 표시를 위해 스크롤 맨 아래로 이동
        chatContainer.scrollTop = chatContainer.scrollHeight;

        return messageDiv;
    }



    // 페이지 로드 시 실행
    document.addEventListener('DOMContentLoaded', () => {
        adjustChatContainerHeight();
        loadChatHistory();
    });

    // 챗봇 컨테이너 높이 조정 함수
    function adjustChatContainerHeight() {
        const chatbot = document.getElementById('chatbot');
        let chatbotHeader = document.querySelector('.chatbot__header');
        let chatbotContainer = document.querySelector('.chatbot__container');
        let chatbotFooter = document.querySelector('.chatbot__footer');
        const tabInHeight = 70;
        if (chatbot) {
            const windowHeight = window.innerHeight;
            const chatbotHeaderHeight = chatbotHeader.offsetHeight;
            const chatbotFooterHeight = chatbotFooter.offsetHeight;
            const newHeight = windowHeight - chatbotHeaderHeight - chatbotFooterHeight - tabInHeight;

            chatbotContainer.style.height = `${newHeight}px`;
            chatbotContainer.style.maxHeight = `${newHeight}px`;
        }
    }

    // 창 크기 변경 이벤트에 대한 리스너 등록
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustChatContainerHeight, 250);
    });
    </script>

</body>

</html>
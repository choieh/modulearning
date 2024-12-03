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
    <title>챗봇</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        #chatContainer {
            flex: 1;
            border: 1px solid #ddd;
            padding: 10px;
            overflow-y: auto;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
        }

        .message {
            margin: 5px 0;
            padding: 10px;
            border-radius: 10px;
            max-width: 70%;
        }

        .user-message {
            align-self: flex-end;
            background-color: #ffd457;
            color: black;
            text-align: left;
        }

        .bot-message {
            align-self: flex-start;
            background-color: #e9ecef;
            color: black;
            text-align: left;
        }

        #inputArea {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ddd;
            background-color: white;
        }

        #userInput {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        #sendBtn {
            padding: 10px 20px;
			color: #4d4d4f;
            background-color: #ffd457;            
            border: none;
            margin-left: 10px;
            border-radius: 4px;
            cursor: pointer;
        }

        #sendBtn:hover {
            background-color: #4d4d4f;
            color: #ffd457;
        }

		#exampleQuestions {
            padding: 10px;
            background-color: #f1f1f1;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
        }

		.example {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 5px 10px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="chatContainer"></div>
	<div id="exampleQuestions">
        <span class="example" data-question="모두의러닝은?">모두의러닝은?</span>
        <span class="example" data-question="개인정보처리는 어떻게 하고 있나요?">개인정보처리는 어떻게 하고 있나요?</span>
    </div>
    <div id="inputArea">
        <input type="text" id="userInput" placeholder="질문을 입력하세요">
        <button id="sendBtn">전송</button>
    </div>

    <script>
        const chatContainer = document.getElementById('chatContainer');
		const userInput = document.getElementById('userInput');
		const sendBtn = document.getElementById('sendBtn');
		const exampleQuestions = document.querySelectorAll('.example');

		const authKey = "<?= htmlspecialchars($authKey) ?>";
		const contentsCode = "<?= htmlspecialchars($contentsCode) ?>";

		// 메시지를 채팅 창에 추가하는 함수
		function appendMessage(message, type) {
			const messageDiv = document.createElement('div');
			messageDiv.className = `message ${type === 'user' ? 'user-message' : 'bot-message'}`;
			messageDiv.textContent = message;
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
		userInput.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				sendQuestion();
			}
		});

		// 버튼 클릭으로 질문 전송
		sendBtn.addEventListener('click', sendQuestion);
		
		// 예시 질문 클릭 이벤트
        exampleQuestions.forEach(example => {
            example.addEventListener('click', function () {
                const question = this.dataset.question;
				document.getElementById('userInput').value = question;
				sendQuestion();
                //sendMessage(question);
            });
        });

    </script>
</body>
</html>


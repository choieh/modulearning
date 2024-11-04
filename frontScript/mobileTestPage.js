let ans = []; //과제용 변수

function tabVisibility(){ //탭 백그라운드 체크
	let currentVisibility = !document.hidden;
	if(!currentVisibility){
		clearTimeout(timer);
	} 
	if(currentVisibility) {
		stopTime = Date.now();
		timer = setTimeout(()=>{step(endTime, stopTime)}, 1000);
	}
}

function step(endTime, stopTime=''){ // 최종평가 타이머
	endTime = new Date(endTime).getTime();
	
	if(stopTime == ''){
		stopTime = Date.now();
	}

	stopTime = new Date(stopTime).getTime();

	let remainTime = (endTime - stopTime) / 1000 ;

	let minute = Math.floor(remainTime % 36000 / 60); 
	let sec = Math.floor(remainTime % 3600 % 60 ); 
	if(Number(sec) < 10) {
		sec = '0'+sec;
	}

	$('#timer').html(`남은 시간 : ${minute}분${sec}초`);

	if(remainTime <= 0 ) {
		alert('시험 제한시간 1시간이 지나, 자동제출 되었습니다.');
		sendAnswer('N', 'Y');
		return false;
	}

	stopTime += 1000;
	timer = setTimeout(()=>{step(endTime, stopTime)}, 1000);
}

function leavePage(){ // 시험 페이지 나가기
	if(like == 'final'){
		if(!confirm('최종평가 중간에 나가도 시간은 멈추지 않습니다. 나가시겠습니까?')){
			return false;
		}
	}
	window.location.replace(`https://m.${domain}/m/studyDetail.php?seq=${seq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`);
}

function leaveBtn(){ // 시험 페이지 나가기 버튼
	return `<div style="padding-top:14px; padding-bottom:10px; margin-left:-20px; width:fit-content">
	<button style="background:white; border:none; display:flex; align-items:center;" onclick="leavePage();">
	<image style="width:50px;" src="../images/mobile/main/btn_prev.png"><span style="margin-left:-10px; font-size:20px; color:#636e72; font-weight:600">뒤로가기</span></button></div>`;
}


function renderShortExam(orderBy, seq, userAnswer=''){ //단답형
	if(userAnswer == ''){
		return `<input id="short" type="text" class="type${orderBy}" name="userAnswer${seq}" 
		style="width:100%; padding:5px 0; padding-left:3px; margin-top:10px;" value=""
		onblur="tempSubmitB(this)">`;
	} else {
		return `<input id="short" type="text" class="type${orderBy}" name="userAnswer${seq}" 
		style="width:100%; padding:5px 0; padding-left:3px; margin-top:10px;" value="${userAnswer}"
		onblur="tempSubmitB(this)">`;		
	}
}

function renderLongExam(orderBy, seq, userAnswer=''){ //서술형
	if(userAnswer == ''){
		return `<textarea id="long" class="type${orderBy}" name="userAnswer${seq}" 
		style="margin-top:5px; padding-top:5px; border-radius:5px; resize:none; height:100px;"
		onblur="tempSubmitB(this)"></textarea>`;
	} else {
		return `<textarea id="long" class="type${orderBy}" name="userAnswer${seq}"
		style="margin-top:5px; padding-top:5px; border-radius:5px; resize:none; height:100px;"
		onblur="tempSubmitB(this)">${userAnswer}</textarea>`;
	}
	
}

function renderOXbtn(orderBy, seq, userAnswer=''){ //진위형 OX 버튼
	let result = '';
	result += `<div id="OX" class="type${orderBy}" style="display:flex; justify-content:space-around; padding-top:15px;">`;
	if(userAnswer == ''){
		result += `
				<input id="O" type="radio" style="display:none;" name="userAnswer${seq}" value="1">
				<button type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:white; color:#3498db;" value="O"
				onclick="selectOX(this)">O</button>

				<input id="X" type="radio" style="display:none;" name="userAnswer${seq}" value="2">
				<button type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:white; color:#e74c3c;" value="X"
				onclick="selectOX(this)">X</button>
			</div>`	
	} else {
		if(userAnswer == '1'){
			result += `
				<input id="O" type="radio" style="display:none;" name="userAnswer${seq}" value="1" checked>
				<button class="select" type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:gray; color:white;" value="O"
				onclick="selectOX(this)">O</button>

				<input id="X" type="radio" style="display:none;" name="userAnswer${seq}" value="2">
				<button type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:white; color:#e74c3c;" value="X"
				onclick="selectOX(this)">X</button>
			</div>`
		} else {
			result += `
				<input id="O" type="radio" style="display:none;" name="userAnswer${seq}" value="1">
				<button type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:white; color:#3498db;" value="O"
				onclick="selectOX(this)">O</button>

				<input id="X" type="radio" style="display:none;" name="userAnswer${seq}" value="2" checked>
				<button class="select" type="button" style="border-radius:20px; border: 2px solid; font-size:40px; width:70px; height:70px; background:gray; color:white;" value="X"
				onclick="selectOX(this)">X</button>
			</div>`
		}
	}
	
	return result;
}

function selectOX(btn){ //진위형 OX 버튼 클릭 이벤트
	if(btn.classList != 'select'){
		let sibling = btn.parentNode.querySelector('.select');
		if(sibling != null){
			if(sibling.value == 'O'){
				sibling.style.background = "white";
				sibling.style.color = "#3498db";
			} else {
				sibling.style.background = "white";
				sibling.style.color = "#e74c3c";
			}

			if(btn.parentNode.querySelector(`#${btn.value}`).checked == true){
				btn.parentNode.querySelector(`#${btn.value}`).checked = false;
			}
						
			sibling.classList.remove('select');	
		}

		btn.style.background = "gray";
		btn.style.color = "white";
		btn.classList.add('select');
		if(btn.parentNode.querySelector(`#${btn.value}`).checked == false){
			btn.parentNode.querySelector(`#${btn.value}`).checked = true;	
		}
		tempSubmitA(btn);
	} else {
		if(btn.value == 'O'){
			btn.style.background = "white";
			btn.style.color = "#3498db";
		} else {
			btn.style.background = "white";
			btn.style.color = "#e74c3c";
		}

		btn.classList.remove('select');
		if(btn.parentNode.querySelector(`#${btn.value}`).checked == true){
				btn.parentNode.querySelector(`#${btn.value}`).checked = false;	
		}
	}

}

function renderLi(text, seq, value, userAnswer){ // 객관식 문항 출력
	let result = '';
	if(userAnswer != null){
		result = `<li class="select" style="padding:12px 12px; margin:20px 0px; border: 1px solid; border-radius:5px; cursor:pointer; background:gray; color:white;">
		<input type="radio" name="userAnswer${seq}" value="${value}" style="display:none;" checked>${text}</li>`;
	} else {
		result = `<li style="padding:12px 12px; margin:20px 0px; border: 1px solid; border-radius:5px; cursor:pointer;">
		<input type="radio" name="userAnswer${seq}" value="${value}" style="display:none;">${text}</li>`;
	}
	return result;
}

function changeLi(type){ // 객관식 선택시 이벤트
	const lis = document.querySelectorAll('form ul li');
	lis.forEach((li) => {
		li.addEventListener('click', function(){
			if(this.classList == 'select'){
				this.style.backgroundColor = 'white';
				this.style.color='black';
				this.classList.remove('select');
				if(this.childNodes[1].checked == true){
					this.childNodes[1].checked = false;
				}
			} else {
				selLi = this.parentNode.querySelector('.select');
				if(selLi != null){
					selLi.style.backgroundColor = 'white';
					selLi.style.color='black';
					selLi.classList.remove('select');
				}

				this.style.backgroundColor = 'gray';
				this.style.color='white';
				this.classList.add('select');

				if(this.childNodes[1].checked == false){
					this.childNodes[1].checked = true;
				}
				
				if(type == 'test'){
					tempSubmitA(this);	
				}
			}
		})
	})
}

function validateAnswer(count=0){ //시험 답안 검증
	let flag = false;
	
	for(let i=1; i<=count; i++){ 
		let exam = document.querySelector(`.type${i}`);
		let examType = exam.id;

		if(examType == 'sel') { //객관식
			document.querySelectorAll(`.type${i} li`).forEach((li, index) => {
				if(li.classList == 'select'){
					flag = true;
				}
			})

			if(flag == false){
				alert(`${i}번 문항을 선택해주세요.`);
				exam.scrollIntoView({behavior:'auto', block:'center'});
				return false;
			}

			flag = false;
		} else if(examType == 'long') { //서술형
			if(exam.value.replace(/ /g, '').length == 0){
				alert(`${i}번 문항을 작성해주세요`);
				exam.scrollIntoView({behavior:'auto', block:'center'});
				return false;
			}
		} else if(examType == 'short') { //단답형
			if(exam.value.replace(/ /g, '').length == 0){
				alert(`${i}번 문항을 작성해주세요`);
				exam.scrollIntoView({behavior:'auto', block:'center'});
				return false;
			}
		} else { // 진위형
			document.querySelectorAll(`.type${i} input`).forEach((radio, index) => {
				if(radio.checked){
					flag = true;
				}
			})
			
			if(flag == false){
				alert(`${i}번 문항을 선택해주세요.`);
				exam.scrollIntoView({behavior:'auto', block:'center'});
				return false;
			}

			flag = false;
		}

	}
	return true;
}

function submitSurvey(count){ //설문조사 제출
	if(!validateAnswer(count)) return false;

	$.ajax({
		url: surveyAnswerApi,
		method: 'POST',
		data: $(`.surveyForm`).serialize(),
		success: function(data){
			if(data.result == 'success'){
				alert('제출됐습니다.');
				chapterObj.survey = 'Y';
				getTest();
			} else {
				alert('오류 발생');
			}
		}
	})
	
}

function getSurvey(){ // 설문조사 정보 가지고 옴
	let survey = '';
	let selLi = '';
	let countTypeA = 0;
	let countTypeB = 0;
	$.get(surveyApi, {}, function(data){
		survey += leaveBtn();
		survey += '<div class="page_title" style="border-radius:5px;">';
		survey += '<h3 class="title" style="letter-spacing:3px;">설문조사</h3>';
		survey += '</div>';
		survey += '<form class="surveyForm" style="padding-bottom:15px;">';
		survey += `<input type="hidden" name="lectureOpenSeq" value="${lectureOpenSeq}">`;
		survey += `<input type="hidden" name="contentsCode" value="${contentsCode}">`;
		$.each(data.survey, function(){
			survey += '<div class="survey" style="border: 2px solid gray; border-radius:5px; padding:20px 5px; margin-top:30px;">';
			survey += `<p>${this.seq}. ${this.exam}</p>`;
			survey += `<input type="hidden" name="seq[]" value="${this.seq}">`;
			survey += `<input type="hidden" name="surveyType[]" value="${this.surveyType}">`;
			if(this.surveyType == 'A'){
				countTypeA++;
				survey += `<ul id="sel" class="type${this.seq}" style="font-size:14px; padding:0px 10px;">`;
				for(let i=1; i<=5; i++){
					survey += renderLi(eval('this.example0'+i), this.seq, i);
				}
			} else {
				countTypeB++;
				survey += `<textarea id="long" class="type${this.seq}" name="userAnswer${this.seq}" style="margin-top:5px; padding-top:5px; border-radius:5px; resize:none; height:100px;"></textarea>`;
			}
			survey += '</ul>';
			survey += '</div>';
			
		})
		survey += `<div style="padding-top:20px;"><button type="button" style="width:100%; padding: 10px 0; background:#ffcb05; border:none; border-radius:5px; font-weight:600; letter-spacing:3px;"
		onclick="submitSurvey(${countTypeA+countTypeB})">제출하기</button></div>`;

		survey += '</form>';
		survey += leaveBtn();
		$('.inner').html(survey);
		changeLi();
	});
}

function getSurveyStatus(){ // 설문조사 참여 정보
	let result = '';
	if(chapterObj.survey == 'Y'){
		return true;
	} else if(chapterObj.survey == 'N'){
		return false;
	}
}

function checkSurveyStatus(){ // 설문조사 참여 여부
	if(like == 'final' && !getSurveyStatus()){
		return false;
	}
	return true;
}

function sendAnswer(testEnd, endTime){ //시험 제출 (최종제출, 시간만료)
	$.ajax({
		url: testApi,
		method: 'POST',
		data: $(`.testForm`).serialize()+'&testEnd='+testEnd+'&endTime='+endTime+'&testType='+like,
		success: function(data){
			if(data.result == 'success'){
				alert('제출됐습니다.');	
				window.location.replace(`https://m.${domain}/m/studyDetail.php?seq=${seq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`);
			} else {
				alert('오류 발생');
			}
		}
	})
}

function tempSubmitA(s){ //객관식, 진위형 선택시 답안 저장
	const div = s.parentNode.parentNode;	

	$.ajax({
		url: testApi,
		method: 'POST',
		data: $(div).find("input").serialize()+'&testEnd=N&endTime=N&testType='+like,
		success: function(data){
			if(data.result == 'success'){

			} else {
				alert('오류 발생');
			}
		}
	})
}

function tempSubmitB(text){//단답형, 서술형 선택시 답안 저장
	const form = text.parentNode;
	$.ajax({
		url: testApi,
		method: 'POST',
		data: $(form).find("input, textarea").serialize()+'&testEnd=N&endTime=N&testType='+like,
		success: function(data){
			if(data.result == 'success'){

			} else {
				alert('오류 발생');
			}
		}
	})
}

function validateReportAnswer(){ // 과제 유효성 검사
	const allowedExtension = /(\.txt|\.xls|\.xlsx|\.pdf|\.docx|\.hwp|\.zip|\.pptx|\.jpg|\.jpeg|\.png)/;
	const files = document.querySelectorAll('input[type=file]'); 
	const textareas = document.querySelectorAll('textarea'); 
	let scrollPoint = '';
	let result = true;

	if(files.length > 0){
		for(let i = 0; i < files.length; i++){
			if(files[i].parentNode.parentNode.querySelectorAll('.savedFiles').length > 0){
				continue;
			}

			if(files[i].value == ''){
				alert('과제를 첨부 또는 작성 해주세요.')	;
				scrollPoint = files[i];
				result = false;
				break;
			}
			
			if(files[i].value.split('.').length > 2){
				alert('파일명 또는 확장자를 확인해주세요.');
				scrollPoint = files[i];
				result = false;
				break;
			}

			if(!allowedExtension.exec(files[i].value)) {
				alert('첨부 불가능한 확장자입니다.');
				scrollPoint = files[i];
				files[i].value = '';
				result = false;
				break;
			}
		}	
	}
	
	if(textareas.length > 0){
		for(let i = 0; i < textareas.length; i++){
			if(textareas[i].value == ''){
				alert('과제를 첨부 또는 작성 해주세요.');
				scrollPoint = textareas[i];
				result = false;
				break;
			}

			if(textareas[i].value.replace(/ /g, '').length == 0){
				alert('과제를 첨부 또는 작성 해주세요.');
				scrollPoint = textareas[i];
				result = false;
				break;
			}
		}
	}

	if(result == false){
		scrollPoint.scrollIntoView({behavior:'auto', block:'center'});
	}

	return result;
}

function reportTypingSubmit(text, seq){ //과제 직접 작성시 중간 저장
	const form = text.parentNode.parentNode.parentNode;
	ans[seq].answerText = $(form).find('textarea').val();

	$.ajax({
		method: 'POST',
		url: reportApi,
		data: $(form).find("input, textarea").serialize()+'&reportEnd=N',
		success: function(data){
			if(data.result == 'success'){

			} else {
				alert('오류 발생');
			}
		}
	})
}

function submitReport(btn){ // 과제 제출
	if(!validateReportAnswer()){
		return false;
	}

	let formData = new FormData($('#reportForm')[0]);

	if(btn.value == 'Y'){
		if(!confirm('최종 제출 하시겠습니까? 제출 후 수정 불가능합니다.')) return false;
		formData.append('reportEnd', 'Y');
	} else {
		if(!confirm('임시 저장 하시겠습니까? 기간 내에 최종 제출 하셔야합니다.')) return false;
		formData.append('reportEnd', 'N');
	}
	
	let seq = '';

	$.ajax({
		url: reportApi,
		contentType : false,
		processData: false,
		method: 'POST',
		cache: false,
		data: formData,
		success: function(data){
			if(data.result === 'success'){
				if(btn.value === 'Y'){
					alert('정상 제출 되었습니다.');
					window.location.replace(`https://m.${domain}/m/studyDetail.php?seq=${seq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`);
				} else {
					alert('임시 저장 됐습니다. 반드시 기간 내에 최종 제출 해주세요.');
					window.location.replace(`https://m.${domain}/m/studyDetail.php?seq=${seq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`);
				}
			} else {
				alert('오류 발생');
			}
		}
	})
}

function submitAnswer(count, testEnd, endTime){ //시험 제출 버튼
	if(!validateAnswer(count)) return false;

	if(!confirm('최종 제출시 변경 불가능합니다. 제출하시겠습니까?')){
		return false;
	}

	sendAnswer(testEnd, endTime);
}

function agreeCaution(){ //평가 유의사항 동의 버튼
	if(!document.getElementById('agreeCaution').checked){
		alert('평가 응시 유의사항에 동의해주세요.');
		return false;
	}

	if(like == 'final'){
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();    
		let hour = today.getHours() + 1;
		let min = today.getMinutes();  
		let sec = today.getSeconds();
		let finalTime = '';

		finalTime = year + '년 ' + month + '월 ' + day + '일 ' + hour +'시 ' + min + '분' + sec + '초';

		if(confirm('현재 평가 응시 중인 상태입니다.\n'+ finalTime +'까지 완료해야 합니다. \n응시 도중 접속종료를 하더라도 제한시간은 계속 흘러갑니다. \n지금 평가를 응시하시겠습니까?')){
			status = 'V';
			getTest();
		}

	} else {
		status = 'V';
		getTest();	
	}
}

function clickCheckbox(){ //평가 유의사항 동의 여부
	const checkBox = document.getElementById('agreeCaution');
	if(checkBox.checked){
		checkBox.checked = false;
	} else {
		checkBox.checked = true;
	}
}

function setCaution(){ //평가 유의사항 출력
	let result='';
	$.ajax({
		url: cautionApi,
		method: 'GET',
		success: function(data){
			result += leaveBtn();
			result += '<div class="caution" style="padding:50px 30px; box-shadow:2px 5px 5px 5px #bdc3c7; border-radius:5px;">';
			result += `<div style="display:flex;  align-items:center; padding-bottom:20px; margin-bottom:30px; border-bottom:2px solid;">
			<img src="../images/study/img_notice.png" style="width:30px;"/>&nbsp;&nbsp;
			<span style="font-weight:bold; font-size:28px; letter-spacing:5px;">주의사항</span>
			</div>`;
			if(like == 'mid'){
				result += `<p>${data.midCopy.replace(/\n/g,'<br />')}</p>`;
			} else if(like == 'final'){
				result += `<p>${data.testCopy.replace(/\n/g,'<br />')}</p>`;
			} else {
				result += `<p>${data.reportCopy.replace(/\n/g,'<br />')}</p>`;
			}
			result += `<div style="padding:30px 0px; display:flex; align-items: center;">
			<input id="agreeCaution" type="checkbox" style="width:28px; height:28px;">&nbsp;&nbsp;
			<div onclick="clickCheckbox();">위 사항을 모두 숙지하였으며, 공정하게 평가에 응시하겠습니다.</div>
			</div>`;
			result += `<div style="padding-top:20px;">
			<button style="width:100%; padding: 10px 0; background:#ffcb05; border:none; border-radius:5px; font-weight:600; letter-spacing:3px;" type="button" 
			onclick="agreeCaution()">평가보기</button></div>`;
			result += '</div>';
			result += leaveBtn();
			$('.inner').html(result);
		}
	});
}

function setReportExam(id, seq) { // 레포트 문제 셋팅
	let result = '';
	result += '<div style="padding:10px;  height:300px;">';
	if(id == 'addFile'){
		result += `<input type="hidden" name="answerType${seq}" value="attach" />`;
		result += `<input type="hidden" name="answerType[]" value="attach" />`;
		result += '<div style="margin-top:5px; padding:10px 5px; background:white; height:370px; width:100%; border-radius:5px;">';
		if(ans[seq].answerAttach != null){
			result += `<p class="savedFiles" style="border-bottom: 2px solid; padding:10px 0; height:50%;"><span style="font-size:16px; font-weight:bold; padding-right:20px;">제출 파일</span><br><br>
					<a href="../lib/fileDownLoad.php?fileName=${encodeURI(ans[seq].answerAttach)}&link=${encodeURIComponent(ans[seq].attachLink)}">${ans[seq].answerAttach}</a>
					</p>`;
		}
		result += `<p style="padding:10px 0;"><span style="font-size:16px; font-weight:bold; padding-right:20px;">파일 제출</span><br><br><input type='file' name="answerAttach${seq}" ></p>`;
		result += `<p style="color:gray">첨부가능 확장자<br>txt, xls, xlsx, pdf, docx, hwp, zip, pptx, jpg, jpeg, png</p>`;
		result += '</div>';
	} else if(id == 'manualTyping'){
		result += `<input type="hidden" name="answerType${seq}" value="text" />`;
		result += `<input type="hidden" name="answerType[]" value="text" />`;
		result += `<textarea class="type${seq}" name="answerText${seq}" 
		style="margin-top:5px; padding:10px 5px; border:none; resize:none; height:370px; border-radius:5px;" placeholder="답안작성" 
		onpaste="alert('붙여넣기는 금지입니다.'); return false;" onblur="reportTypingSubmit(this, ${seq})">${ans[seq].answerText}</textarea>`;
	}
	result += '</div>';
	return result;
}

function changeReportMenu(menu, seq) { //파일, 직접 작성 버튼 클릭
	if(menu.classList == 'select'){
		return false;
	}

	if(menu.classList != 'select'){
		let sibling = $(menu).siblings('.select');
		sibling.css('background', '#ecf0f1');
		sibling.css('boxShadow', 'unset');
		sibling.css('zIndex', 0);
		sibling.removeClass('select');

		menu.style.background = '#ffcb05';
		menu.style.boxShadow = '1px 0 2px black';
		menu.style.zIndex = 0;
		menu.classList.add('select');
		
		$(menu.parentNode).siblings('#reportAnswer').html();
//		if(menu.id == 'addFile') {
		$(menu.parentNode).siblings('#reportAnswer').html(setReportExam(menu.id, seq));
//		} else {
//			$(menu.parentNode).siblings('#reportAnswer').html(setReportExam(menu.id, seq));
//		}
	}
}

function setReport(){ //과제 출력
	$.ajax({
		method: 'GET',
		url: reportApi,
		data: {'contentsCode': contentsCode, 'lectureOpenSeq': lectureOpenSeq},
		success: function(data){
			let result='';
			
			result += leaveBtn();
			result += '<div class="page_title" style="border-radius:5px;">';
			result += `<h3 class="title" style="background:#545046; color:white;">${data.contentsName}</h3>`;
			result += '</div>';
			result += '<div style="margin-top:20px; padding:10px; border: 1px solid #7f8c8d; border-radius:5px; background:#ecf0f1;">';
			result += '<p style="font-size:17px; color:#2665ae;">과제 주의사항</p>';
			result += '<div style="display:flex; padding:5px 0;"><span>-&nbsp;</span><span>과제 제출은 <strong style="color:#c73333;">1회(최종제출 기준)만 가능</strong>하며, 최종제출 후에는 수정 및 재제출이 불가능합니다.</span></div>';
			result += '<div style="display:flex; padding:5px 0;"><span>-&nbsp;</span><span>최종제출 전까지는 임시저장 기능을 통해 수정이 가능하며, <strong style="color:#c73333;">학습 시간 내에 꼭 최종제출까지 완료</strong>하여야 합니다.</span></div>';
			result += '</div>';
			result += `<div style="padding-top:25px; border-bottom:2px solid">
				<div style="padding-bottom:10px; font-size:22px; font-weight:600; letter-spacing:10px; text-align:center;">과제</div>
			</div>`;
			result += '<div style="padding:15px 0px;">';
			result += '<form id="reportForm" enctype="multipart/form-data" method="post">';

			$.each(data.studyReport, function(){
				let answerAttach = null;
				let answerText = '';
				let attachLink = '';

				this.answerAttach != null ? answerAttach = this.answerAttach : '';
				this.answerText != null ? answerText = this.answerText : '';
				this.attachLink != null ? attachLink = this.attachLink : '';

				ans[this.seq] = {'answerAttach': answerAttach, 'answerText': answerText, 'attachLink': attachLink};

				result += `<div class="test${this.seq}" style="padding:20px 5px; margin-top:20px; border:2px solid #7f8c8d; border-radius:5px;">`;
				result += `<input type="hidden" name="lectureOpenSeq" value="${lectureOpenSeq}">`;
				result += `<input type="hidden" name="contentsCode" value="${contentsCode}">`;
				result += `<input type="hidden" name="lectureEnd" value="${data.lectureEnd}">`;
				result += `<input type="hidden" name="seq[]" value="${this.seq}" />`;
				result += `<input type="hidden" name="reportSeq[]" value="${this.reportSeq}" />`;
				result += `<input type="hidden" name="reserveDate[]" value="${this.reserveDate}" />`;
				result += `<p style="width:fit-content; padding-right:5px; padding-bottom:10px; font-size:20px;">문제</p>`;
				result += `<p style="padding-bottom:20px;">${this.exam.replace(/  /g,'&nbsp;&nbsp;').replace(/\n/g,'<br />')}</p>`;
				if(this.examAttach != null && this.examAttachLink != null) {
					result += `<a href="../lib/fileDownLoad.php?fileName=${encodeURI(this.examAttach)}&link=${encodeURIComponent(this.examAttachLink)}" 
					style="color:#2665ae; font-weight:bold;"
					target="_blank">
					레포트 문제 다운로드 : ${this.examAttach}</a>`;
				}
				
				result += `<div id="reportMenu" class="${this.seq}" 
				style="display:flex; border-radius:5px 5px 0 0; align-items:center; text-align:center; font-weight:600; padding-top:20px;">`;

				result += `<div id="addFile" class="select" 
				style="padding:15px 0; width:50%; border-radius:5px 5px 0 0; background:#ffcb05; box-shadow:1px 0px 2px black;" 
				onclick="changeReportMenu(this, ${this.seq});">파일첨부</div>`;

				result += `<div id="manualTyping" class="" 
				style="padding:15px 0; width:50%; border-radius:5px 5px 0 0; background:#ecf0f1" 
				onclick="changeReportMenu(this, ${this.seq});">직접작성</div>`;

				result += '</div>';

				result += `<div id="reportAnswer" style="min-height:400px; border:2px solid #ffcb05; background:#ffcb05;">
				<div style="padding:10px;  height:300px;">
				<input type="hidden" name="answerType[]" value="attach" />
				<input type="hidden" name="answerType${this.seq}" value="attach" />
				<div style="margin-top:5px; padding:10px 5px; background:white; height:370px; width:100%; border-radius:5px;">`;
				
				if(ans[this.seq].answerAttach != null) {
					result += `<p class="savedFiles" style="border-bottom: 2px solid; padding:10px 0; height:50%;"><span style="font-size:16px; font-weight:bold; padding-right:20px;">제출 파일</span><br><br>
						<a href="../lib/fileDownLoad.php?fileName=${encodeURI(this.answerAttach)}&link=${encodeURIComponent(this.attachLink)}">${this.answerAttach}</a>
						</p>`;
				}
				result +=`<p style="padding:10px 0;"><span style="font-size:16px; font-weight:bold; padding-right:20px;">파일 제출</span><br><br><input type='file' name="answerAttach${this.seq}" ></p>`;
				result += `<p style="color:gray">첨부가능 확장자<br>txt, xls, xlsx, pdf, docx, hwp, zip, pptx, jpg, jpeg, png</p>`;
				result += `</div>`;
				result += `</div>`;
				result += `</div>`;

				result += '<div style="border: 1px solid #7f8c8d; border-radius:5px; margin-top:10px; padding:10px;">';
				result += '<div style="padding:5px 0; display:flex;"><span>-&nbsp;</span><span>파일로 제출하는 경우 <strong style="color:#2665ae;">마지막에 제출한 파일로 최종 저장</strong>됩니다.</span></div>';
				result += '<div style="padding:5px 0; display:flex;"><span>-&nbsp;</span><span>파일로 제출하는 경우 <strong style="color:#c73333;">2개 이상의 문서는 압축하여 1개의 파일로 제출</strong>해야 합니다.</span></div>';
				result += '<div style="padding:5px 0; display:flex;"><span>-&nbsp;</span><span>파일로 제출하기와 직접 작성하기 중 <strong style="color:#2665ae;">마지막에 제출한 방식 하나만 최종 제출</strong>됩니다.</span></div>';
				result += '</div>';
				result += '</div>';
			})
			result += `<div style="display:flex; padding-top:20px; justify-content: space-between">
			<button type="button" style="width:48%; padding: 10px 0; background:#ffcb05; border:none; border-radius:5px; font-weight:600; letter-spacing:3px;" value="N" onclick="submitReport(this)">임시저장</button>
			<button type="button" style="width:48%; padding: 10px 0; background:#ffcb05; border:none; border-radius:5px; font-weight:600; letter-spacing:3px;" value="Y" onclick="submitReport(this)">제출하기</button>
			</div>`;
			result += '</form>';
			result += '</div>';
			result += leaveBtn();
			$('.inner').html();
			$('.inner').html(result);

			hrdCheckScore('S');

			if(navigator.userAgent.match(/Safari/)){ // safari는 visibilitychange 안먹는 경우가 있음
				window.addEventListener('pagehide', ()=>{
					hrdCheckScore('E');
				})

				window.addEventListener('pageshow', ()=>{
					hrdCheckScore('S');
				})
			}	
			
			if(!navigator.userAgent.match(/Safari/)){
				window.addEventListener('visibilitychange', () => {
					if(document.visibilityState === 'visible') {
						hrdCheckScore('S');
					} else if(document.visibilityState === 'hidden'){
						hrdCheckScore('E');
					}
				})	
			}
		}
	})
}

function setTest(data){ // 시험 문항 출력
	let aTypeEA = 0;
	let bTypeEA = 0;
	let cTypeEA = 0;
	let dTypeEA = 0;
	let contentsName = '';
	let result = '';
	let title = '';
	let count = 0;
	endTime = data.testEndTime;
	stopTime = data.nowTime;
	if(like == 'mid'){
		title = '중간평가';
	} else {
		title = '최종평가'
	}

	aTypeEA = data.aTypeEA;
	bTypeEA = data.bTypeEA;
	cTypeEA = data.cTypeEA;
	dTypeEA = data.dTypeEA;
	count = Number(aTypeEA) + Number(bTypeEA) + Number(cTypeEA) + Number(dTypeEA);
	contentsName = data.contentsName;
	result += leaveBtn();
	result += '<div class="page_title" style="border-radius:5px;">';
	result += `<h3 class="title" style="background:#545046; color:white;">${contentsName}</h3>`;
	result += '</div>';
	if(like == 'final'){
		result += `<div id="timer" style="text-align:center; background:#ffcb05; color:black; font-size:30px; font-weight:600; margin-top:20px; padding:25px; 0px; border-radius:5px;">남은 시간 : 00분 00초</div>`;
	}
	result += `<div style="padding-top:35px; border-bottom:2px solid">
		<div style="padding-bottom:10px; font-size:22px; font-weight:600; letter-spacing:10px; text-align:center;">${title}</div>
	</div>`;
	result += '<form class="testForm" style="padding-bottom:15px;">';
	$.each(data.studyTest, function(){
		result += `<div class="test${this.seq}" style="border: 2px solid gray; border-radius:5px; padding:20px 5px; margin-top:30px;">`;
		result += `<p>${this.orderBy}. ${this.exam}</p>`;
		result += `<input type="hidden" name="lectureOpenSeq" value="${lectureOpenSeq}">`;
		result += `<input type="hidden" name="contentsCode" value="${contentsCode}">`;
		result += `<input type="hidden" name="seq[]" value="${this.seq}">`;
		result += `<input type="hidden" name="examType[]" value="${this.examType}">`;
		if(this.examType == 'A'){ //객관식
			result += `<ul id="sel" class="type${this.orderBy}" style="font-size:14px; padding:0px 10px;">`;
			for(let i=1; i<=4; i++){
				if(this.userAnswer == i){
					result += renderLi(eval('this.example0'+i), this.seq, i, this.userAnswer);
				} else {
					result += renderLi(eval('this.example0'+i), this.seq, i);		
				}
				
			}
			result += '</ul>';
		} else if(this.examType == 'B'){ //단답형
			if(this.userAnswer != null){
				result += renderShortExam(this.orderBy, this.seq, this.userAnswer);
			} else {
				result += renderShortExam(this.orderBy, this.seq);	
			}
			
		} else if(this.examType == 'C'){ //서술형
			if(this.userAnswer != null){
				result += renderLongExam(this.orderBy, this.seq, this.userAnswer);
			} else {
				result += renderLongExam(this.orderBy, this.seq);	
			}
			
		} else { //진위형
			if(this.userAnswer != null){
				result += renderOXbtn(this.orderBy, this.seq, this.userAnswer);
			} else {
				result += renderOXbtn(this.orderBy, this.seq);	
			}
		}
		result += '</div>';
	})
	result += `<div style="padding-top:20px;"><button type="button" style="width:100%; padding: 10px 0; background:#ffcb05; border:none; border-radius:5px; font-weight:600; letter-spacing:3px;" 
	onclick="submitAnswer(${count}, 'Y', 'N')">제출하기</button></div>`;
	result += '</form>';
	
	result += leaveBtn();
	$('.inner').html();
	$('.inner').html(result);

	if(document.getElementById('timer')){ //남은 시간 표시
		document.addEventListener('visibilitychange', tabVisibility);
		timer = setTimeout(()=>{step(endTime, stopTime)}, 1000);
		let timerDiv = document.getElementById('timer');
		let timerY = timerDiv.offsetTop - timerDiv.scrollTop;
		window.addEventListener('scroll', function(e){
			if(window.scrollY >= timerY){
				timerDiv.style.position = 'sticky';
				timerDiv.style.top = 0;
				timerDiv.style.width = '100%';
			}
		})
	}
	
	hrdCheckScore('S');

	if(navigator.userAgent.match(/Safari/)){ // safari는 visibilitychange 안먹는 경우가 있음
		window.addEventListener('pagehide', ()=>{
			hrdCheckScore('E');
		})

		window.addEventListener('pageshow', ()=>{
			hrdCheckScore('S');
		})
	}	
	
	if(!navigator.userAgent.match(/Safari/)){
		window.addEventListener('visibilitychange', () => {
			if(document.visibilityState === 'visible') {
				hrdCheckScore('S');
			} else if(document.visibilityState === 'hidden'){
				hrdCheckScore('E');
			}
		})	
	}

//	window.addEventListener('beforeunload', function(){
//		console.log(visibilitychange);
//		if(performance.getEntriesByType("navigation")[0].type != 'navigation'){
//			event.preventDefault();
//			event.returnValue='';
//		}
//		
//		hrdCheckScore('E');
//	})
}

function getTest(){ //시험 정보 가지고 옴
	window.scrollTo(0,0); // 스크롤 맨위로 이동

	if(!checkSurveyStatus()){ // 설문조사 확인
		getSurvey();
		return false;
	}
	
	if(status == 'N'){
		setCaution(); //주의사항
		return false;
	}

	if(like == 'report'){
		setReport();
		return false;
	}

	if(like == 'final'){
		if(curDate >= chapterObj.testEndTime){
			alert('시험 응시 기간이 지났습니다.');
			window.location.replace=(`https://m.${domain}/m/studyDetail.php?seq=${seq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`);
			return false;
		}
	}

	$.ajax({
		method: 'GET',
		url: testApi,
		data: {'contentsCode':contentsCode, 'lectureOpenSeq':lectureOpenSeq, 'testType':like},
		success:function(data){
			if(data.result == '접근 오류'){
				alert(data.result);
				window.history.back();
				return false;
			} else if(data.result == '필수값 누락'){
				alert(data.result);
				window.history.back();
				return false;
			} 

			setTest(data);	
			changeLi('test');
		}
	})
}

document.addEventListener("DOMContentLoaded", getTest);

//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//게시판 보기 스크립트 시작
function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
	seq = writeSeq;
	//상단메뉴
	$('.searchArea').remove();

	function writePrint(){
		let writes = '';
		writes += '<form class="writeform" method="post" action="../api/apiSurveySet.php" enctype="multipart/form-data">';
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';			
		//입력영역 시작
		writes += '<ul>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>랜딩페이지</h1>';
		writes += '<select name="landingPage" onchange="addParam(this)" class="'+landingPage+'"><option value="">선택</option>'+optWrite['landing']+'</select>';
		writes += '</select>';
		writes += '</div>';					
		writes += '</li>';	
		
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>사업주명</h1>';
		writes += `<input type="text" style="width:200px;" name="companyName" value="${companyName}" />`;
		writes += '</div>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>이름</h1>';
		writes += `<input type="text" style="width:100px;" name="userName" value="${userName}" />`;
		writes += '</div>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>전화번호</h1>';
		writes += `<input type="text" style="width:80px;" name="phone01" value="${phone01}" maxlength="3"/> - `;
		writes += `<input type="text" style="width:80px;" name="phone02" value="${phone02}" maxlength="4"/> - `;
		writes += `<input type="text" style="width:80px;" name="phone03" value="${phone03}" maxlength="4"/>`;
		writes += '</div>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>이메일</h1>';
		writes += `<input type="text" style="width:200px;" name="email01" value="${email01}" /> @ `;
		writes += `<input type="text" style="width:200px;" name="email02" value="${email02}" />`;
		writes += '</div>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>영업자코드</h1>';
		writes += `<input type="text" style="width:100px;" name="marketerNumber" value="${marketerNumber}" onblur="addParam(this)"/>`;
		writes += '</div>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>영업자 URL</h1>';
		writes += `<input type="text" style="width:400px;" name="marketerUrl" value="${url}" onclick="alert('읽기전용입니다.')" readonly/>`;
		writes += `<button style="margin-left:10px;" type="button" onClick="copyUrl()">복사</button>`;
		writes += `<button style="margin-left:10px;" type="button" onClick="QrCode()">QR코드 생성</button>`;
		writes += '</div>';					
		writes += '</li>';
			
		writes += '</ul>';
		
		//버튼영역
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkForm()">';
		if(seq != ''){
			writes += '수정하기';
		}else{
			writes += '등록하기';
		}
		writes += '</button>'
		writes += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
		writes += '</form>';

		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);
		

		let param = '';
		document.querySelector('select[name=landingPage]').childNodes.forEach(option => {
			if(option.value == landingPage){
				option.selected = true;
				if(option.value != 'basic'){
					param += landingPage;	
				}
			}
		})
		param += '?s='+document.querySelector('input[name=marketerNumber]').value;
		document.querySelector('input[name=marketerUrl]').value = url+param;
	}

	var companyName = '';
	var userName = '';
	var landingPage = '';
	var phone01 = '';
	var phone02 = '';
	var phone03 = '';
	var email01 = '';
	var email02 = '';
	var marketerNumber = '';

	if(seq != ''){
		var writeAjax = $.get(useApi,{'seq':seq},function(data){
			$.each(data.marketer, function(){				
				companyName = this.companyName;
				userName = this.userName;
				landingPage = this.landingPage;
				phone01 = this.phone01;
				phone02 = this.phone02;
				phone03 = this.phone03;
				if(this.email01 == null){
					email01 = '';
					email02 = '';				
				} else {
					email01 = this.email01;
					email02 = this.email02;
				}
				
				marketerNumber = this.marketerNumber;
			})
			writePrint()
		})
	}else{
		writePrint()
	}
}

//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}

function addParam(input){
	let param1 = '';
	let param2 = '?s=';

	if(document.querySelector('select[name=landingPage]').value != '' && input.name != 'landingPage' && input.value != 'basic') {
		param1 += document.querySelector('select[name=landingPage]').value;	
	}

	if(document.querySelector('input[name=marketerNumber]').value != '' && input.name != 'marketerNumber') {
		param2 += document.querySelector('input[name=marketerNumber]').value;	
	} 
	
	if(input.name === 'landingPage' && input.value != 'basic'){
		param1 += input.value;	
	} else if(input.name === 'marketerNumber'){
		param2 += input.value;	
	}

	document.querySelector('input[name=marketerUrl]').value = url+param1+param2;
}

function checkForm(){
	if(document.querySelector('select[name=landingPage]').value == ''){
		alert('랜딩 페이지를 설정해주세요.');
		return false;
	}

	if(document.querySelector('input[name=userName]').value == ''){
		alert('이름을 입력해주세요.');
		return false;
	}

	if(document.querySelector('input[name=phone01]').value == '' || document.querySelector('input[name=phone02]').value == '' || document.querySelector('input[name=phone03]').value == ''){
		alert('전화번호를 입력해주세요.');
		return false;
	}

	if(document.querySelector('input[name=marketerNumber]').value == ''){
		alert('영업자번호를 입력해주세요.');
		return false;
	}

//	let inputs = document.querySelector('form > ul').querySelectorAll('input');
//	let count = inputs.length - 1;

//	for(let i = 0; i < count; i++){
//		if(inputs[i].value == ''){
//			switch(inputs[i].name){
//				case 'companyName':
//					alert('사업주명을 입력해주세요.');
//					break;
//
//				case 'userName':
//					alert('이름을 입력해주세요.');
//					break;
//
//				case 'phone01':
//					alert('전화번호를 입력해주세요.');
//					break;
//
//				case 'phone02':
//					alert('전화번호를 입력해주세요.');
//					break;
//
//				case 'phone03':
//					alert('전화번호를 입력해주세요.');
//					break;
//
//				case 'email01':
//					alert('이메일을 입력해주세요.');
//					break;
//
//				case 'email02':
//					alert('이메일을 입력해주세요.');
//					break;
//
//				case 'marketerNumber':
//					alert('영업자번호를 입력해주세요.');
//					break;
//			}
//			return false;
//		}
//	}

	$.ajax({
		url: useApi,
		method: 'POST',
		data: $('form').serialize(),
		success: function(data){
			alert(data.message);
		}
	})

}

function QrCode(){
	var param1 = document.querySelector('select[name=landingPage]').value
	var param2 = document.querySelector('input[name=marketerNumber]').value
	
	if(param1 == 'basic'){
		param1 = '';
	}

	if (param2 == '') {
		alert('도메인을 설정 해 주세요.');
	} else {
		window.open('landingMarketerQrCode.php?name='+param1+'&s='+param2, 'pop2', 'top=10, left=10, width=300, height=300, status=no, menubar=no, resizable=no');
	}
}

function copyUrl(){
	var url = document.querySelector('input[name=marketerUrl]').value;
	navigator.clipboard.writeText(url)
		.then(() => {
			alert('복사했습니다.');
		});
}
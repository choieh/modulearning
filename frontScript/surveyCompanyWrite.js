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

	//출력변수 지정
	var companyName = '';
	var inputDate = '';
	var companyCode = '';
	var companyRoom = '';
	var siteUrl = '';
	var siteYN = '';
	var survey = '';
	
	if(seq != ''){
		var writeAjax = $.get('../api/apiOffSurveyCompany.php',{'seq':seq},function(data){
			$.each(data.company, function(){				
				companyName = this.companyName;
				inputDate = this.inputDate;
				companyCode = this.companyCode;
				companyRoom = this.companyRoom;
				siteUrl = this.siteUrl;
				siteYN = this.siteYN;
				survey = this.survey;
			})
			writePrint()
		})
	}else{
		writePrint()
	}
	
	//게시판 생성
	function writePrint(){
		var writes = '';
		writes += '<form class="writeform" method="post" action="../api/apiOffSurveyCompany.php" enctype="multipart/form-data">';
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';			
		//입력영역 시작
		writes += '<ul>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>사업장명</h1>';
		writes += '<input type="text" style="width:300px;" name="companyName" value="'+companyName+'" />';
		writes += '</div>'					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>사업자번호</h1>';
		writes += '<input type="text" style="width:300px;" name="companyCode" value="'+companyCode+'" />';
		writes += '</div>'					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>교육장명</h1>';
		writes += '<input type="text" style="width:300px;" name="companyRoom" value="'+companyRoom+'" />';
		writes += '</div>'					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>도메인</h1>';
		writes += 'https://modulearning.kr/survey/?s=<input type="text" style="width:300px;" name="siteUrl" id="siteUrl" value="'+siteUrl+'" />';
		writes += '<button type="button" onclick="openQR('+seq+')">QR코드</button>';					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>설문설정</h1>';
		writes += '<input type="text" style="width:300px;" name="survey" value="'+survey+'" />&nbsp;콤마구분으로 설문코드를 순서대로 입력하세요 ex) 2,1,3';
		writes += '</div>'					
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>사용유무</h1>';
		writes += '<select name="siteYN" id="siteYN">';		
		writes += '<option value="Y">Y</option>';
		writes += '<option value="N">N</option>';
		writes += '</select>';
		writes += '</div>'					
		writes += '</li>';
			
		writes += '</ul>';
		
		//버튼영역
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkMemberForm()">';
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

		$('#siteYN option[value="' + siteYN + '"]').attr('selected', true);
						
	}
}

//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}

//입력폼 체크
function checkMemberForm(){

	$('.mustCheck > strong.price').remove();
	var checkFalse = 0;
	var companyCodeCheck ='';
	var companyIDCheck ='';
	
	$.get('../api/apiOffSurveyCompany.php',{'seq':seq},function(data){
		
		if($('input[name="surveySet"]').val() == ''){
			$('input[name="surveySet"]').after('&nbsp;&nbsp;<strong class="price">설문명을 입력해주세요.</strong>')
			checkFalse ++;
		}
				
		if(checkFalse == 0){
			sendData('../api/apiOffSurveyCompany.php','writeform','new')
		}
	})
}

function openQR(seq) {	
	var sUrl = $('#siteUrl').val();
	if (sUrl == '') {
		alert('도메인을 설정 해 주세요.');
	} else {
		window.open('surveyQrCode.php?seq='+seq+'&s='+sUrl, 'pop2', 'top=10, left=10, width=300, height=300, status=no, menubar=no, resizable=no');
	}
}





	








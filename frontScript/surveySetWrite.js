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
	var surveySet = '';
	var inputDate = '';
	
	if(seq != ''){
		var writeAjax = $.get('../api/apiSurveySet.php',{'seq':seq},function(data){
			$.each(data.surveySet, function(){				
				surveySet = this.surveySet;
				inputDate = this.inputDate;
			})
			writePrint()
		})
	}else{
		writePrint()
	}
	
	//게시판 생성
	function writePrint(){
		var writes = '';
		writes += '<form class="writeform" method="post" action="../api/apiSurveySet.php" enctype="multipart/form-data">';
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';			
		//입력영역 시작
		writes += '<ul>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>설문명</h1>';
		writes += '<input type="text" style="width:500px;" name="surveySet" value="'+surveySet+'" />';
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
	
	$.get('../api/apiSurveySet.php',{'seq':seq},function(data){
		
		if($('input[name="surveySet"]').val() == ''){
			$('input[name="surveySet"]').after('&nbsp;&nbsp;<strong class="price">설문명을 입력해주세요.</strong>')
			checkFalse ++;
		}
				
		if(checkFalse == 0){
			sendData('../api/apiSurveySet.php','writeform','new')
		}
	})
}

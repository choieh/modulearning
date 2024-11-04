//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiConfig.php'
var memberApi = '../api/apiMember.php'
var zipCode = '';
var address01 = '';
var address02 = '';

var optWrite = new Array();
makeOption('companyScale','','')
makeOption('enabled','','')
makeOption('phone01','','')
makeOption('mobile01','','')
makeOption('email02','','')
makeOption('bankName','','')

//리스트액션
function pageAct(){	
	var writes = ''
	$.get(useApi,function(data){
		
			writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';

			//입력영역 시작
			writes += '<ul>';

			writes += '<li>';
			writes += '<h1>비환급 수료처리</h1>';
			writes += '<select name="studyPassSet" id="studyPassSet">';
			writes += '<option value="1">수료기준 충족시</option>';
			writes += '<option value="2">수강마감 처리시</option>';
			writes += '</select>&nbsp;&nbsp;(수료증출력, 점수확인)';
			writes += '</li>';
			
			writes += '</ul>';
			
			//버튼영역
			writes += '<div class="btnArea">';
			writes += '<button type="button" onClick="multipartSendData(\'writeform\')">수정하기</button>'
			writes += '</div>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			
			writes += '</form>';
		
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);

		$('#studyPassSet option[value="' + data.config[0].studyPassSet + '"]').attr('selected', true);


	})
}

//공통화를 위한 페이지 막음
//작성완료
function multipartSendData(){
	$('form.writeform').ajaxForm({
		dataType:'text',
		beforeSubmit: function (data,form,option) {
			return true;
		},
		success: function(data,status){
			alert("작성이 완료되었습니다.");
			pageAct();
		},
		error: function(){
			//에러발생을 위한 code페이지
			alert("작성중 문제가 생겼습니다..");
		}
	});
	$('form.writeform').submit();
	
};

//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

function listAct(){
	writeAct();
}

//게시판 보기 스크립트 시작
function writeAct(){
	var startDate = '';
	var endDate = '';
	writePrint();

	//게시판 생성
	function writePrint(){
		var writes ='';

		writes += '<h1>실시회차 변경</h1>'
		writes += '<h2>파일로 업로드하기</h2>'
		writes += '<form class="fileUploadform" method="post" action="studyHrdUpdate.php" enctype="multipart/form-data">';
		writes += '<ul>';
		writes += '<li>'
		writes += '<h1>등록양식</h1>'
		writes += '<button type="button" onclick="location.href=\'../attach/docs/실시회차.xlsx\'">양식 내려받기</button>&nbsp;';
		writes += '<button type="button" onclick="location.href=\'../attach/docs/실시회차(샘플).xlsx\'">샘플보기</button>';
		writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
		writes += '</li>'
		writes += '</li>'
		writes += '<li>'
		writes += '<h1>파일등록</h1>'
		writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>'
		writes += '</li>'
		writes += '</ul>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
		writes += '</form>'

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
		tempCheck();
		//ajaxAct();
	}
}
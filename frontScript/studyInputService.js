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

			writes += '<h2>도움말</h2>';
			writes += '<ul>';
			writes += '<li>';
			writes += '- 사업주 등록이 되어 있어야 합니다. 사업주 등록 확인 및 등록은 상단메뉴 사업주관리에서 확인하실 수 있습니다.';
			writes += '</li>';
			writes += '<li>';
			writes += '- 아이디는 생년월일 6자리 + 휴대폰 뒷4자리 입니다. 비밀번호는 생일 4자리입니다.';
			writes += '</li>';
			writes += '</ul>';

			//파일등록
			writes += '<h2>파일로 업로드하기</h2>'
			writes += '<form class="fileUploadform" method="post" action="studyUploadService.php" enctype="multipart/form-data">';
			writes += '<ul>';
			writes += '<li>';
			writes += '<h1>수강과정</h1>';
			writes += '<input name="contentsCode" type="hidden" value="XQC000" readonly="readonly"/>필수 법정교육(소방안전교육 외) - 개인정보보호, 성희롱 예방, 소방안전교육, 퇴직연금(4차시)';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>수강기간</h1>';
			writes += '<select id="lectureDay" name="lectureDay">';
/*
			$.get('../api/apiDays.php',function(data){
				$.each(data.days, function(){
					writes +='<option value="'+this.startYoil+'"> 진행중 </option>';
				});
			});
*/
			writes += '</select>';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>등록샘플</h1>';
			writes += '<button type="button" onclick="location.href=\'../attach/docs/서비스과정등록(샘플).xlsx\'">등록양식받기(샘플)</button>';
			writes += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>파일등록</h1>';
			writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>임시등록 데이터</h1>';
			writes += '<span style="width:78%;" id="tempCheck"><span>';
			writes += '</li>';
			writes += '</ul>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
			writes += '</form>';

			//개별등록,수정
			writes += '<h2>개별 등록</h2>'
			writes += '<form class="writeform" method="post">';
			writes += '<input type="hidden" name="period" value="0">'; //복습일
			writes += '<input type="hidden" name="marketerID" value="'+loginUserID+'">'; // 영업자 ID
			writes += '<input type="hidden" name="tutorID" value="tutor">'; //강사배정
			writes += '<input type="hidden" name="serviceType" value="3">'; //서비스타입 - 비환급
			writes += '<input type="hidden" name="progress" value="0">'; //진도율
			writes += '<input type="hidden" name="price" value="0">'; //교육비
			writes += '<input type="hidden" name="rPrice" value="0">'; //환급비
			writes += '<ul>';
			//과정선택
			writes += '<li id="contentsCode">';
			writes += '<h1>수강과정</h1>';
			writes += '<input name="contentsCode" type="hidden" value="XQC000" readonly="readonly"/>필수 법정교육(소방안전교육 외) - 개인정보보호, 성희롱 예방, 소방안전교육, 퇴직연금(4차시)';
			writes += '</li>';
			//기간설정
			writes += '<li>';
			writes += '<h1>수강기간</h1>';
			writes += '<select id="lectureDaySolo" name="lectureDay">';
			writes += '</select>';
			writes += '</li>';
			//훈련생 이름
			writes += '<li id="userID">';
			writes += '<h1>훈련생 이름</h1>';
			writes += '<input name="userName" type="text" />';
			writes += '</li>';
			//주민등록번호
			writes += '<li id="resno">';
			writes += '<h1>주민등록번호</h1>';
			writes += '<input name="resno01" type="text" value="" /> - <input name="resno02" type="text" value="" />';
			writes += '</li>';
			//휴대폰
			writes += '<li id="mobile">';
			writes += '<h1>휴대폰</h1>';
			writes += '<input name="mobile01" type="text" value="" /> - <input name="mobile02" type="text" value="" /> - <input name="mobile03" type="text" value="" />';
			writes += '</li>';
			//사업자번호
			writes += '<li id="companyCode">';
			writes += '<h1>사업자번호</h1>';
			writes += '<input name="companyCode" type="text" />';
			writes += '</li>';

			writes += '</ul>';
			writes += '<div class="btnArea">';
			writes += '<button type="button" onClick="checkStudyForm()">등록하기</button>';
			writes += '<button type="button" onClick="resetInput()">초기화</button>';
			writes += '</div>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			writes += '</form>';

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
		tempCheck();
		daysInsert();
		//ajaxAct();
	}
}

function tempCheck(){
	var listAjax = $.get(useTempApi,function(data){
		if(data.totalCount == 0) {
			lists = '파일을 업로드 하세요.';
		} else {
			lists = '<span onClick="tempRegister()" style="cursor:pointer;">처리되지 않은 '+data.totalCount+'건의 데이터가 있습니다. (확인하기)</span>';
		}
		$('#tempCheck').html(lists);
	})
}

function daysInsert(){
 var daysAdd = '';
 $.get('../api/apiDays.php',function(data){
  $.each(data.days, function(){
   daysAdd += '<option value="'+this.lectureStart+'/'+this.lectureEnd+'">'+this.startYoil+'요일 개강 : '+this.lectureStart+' ~ '+this.lectureEnd+'</option>';;
  });
  $('#lectureDay').html(daysAdd);
  $('#lectureDaySolo').html(daysAdd);
 });
}

//수강 개별 등록
function writeStudy(){
	var sendData = $('.writeform').serialize();
	$.ajax({
		url:'../api/apiStudyService.php',
		type:'POST',
		data:sendData,
		dataType:'json',
		success:function(data){
			if(data.result == 'success'){
				alert('등록되었습니다.');
				location.reload();
			} else {
				alert(data.result);
			}
		},
		fail:function(data){
			alert(data.result);
		}
	})
}

function resetInput(){
	$('.writeform input[type="text"]').val('');
	$('.writeform div.').html('')
	$('.writeform button[type="submit"]').html('등록하기')
}

function tempRegister(){
	window.open("tempRegister.php","임시등록","width=1300,height=800,top=0,left=0,scrollbar=yes,location=yes,menubar=no,status=no,titlebar=no,toolbar=no","kiraedu")
}

//입력폼 체크
function checkStudyForm(){
	$('.writeform strong.price').remove();
	var checkFalse = 0;
		if(!$('.writeform input[name="userName"]').val()){
			$('.writeform input[name="userName"]').after('<strong class="price"> 이름을 입력해주세요.</strong>');
			checkFalse ++;
		}
		if(!$('.writeform input[name="resno01"]').val() || !$('.writeform input[name="resno02"]').val()){
			$('.writeform input[name="resno02"]').after('<strong class="price"> 주민등록번호를 입력해주세요.</strong>');
			checkFalse ++;
		}
		if(!$('.writeform input[name="mobile01"]').val() || !$('.writeform input[name="mobile02"]').val() || !$('.writeform input[name="mobile03"]').val()){
			$('.writeform input[name="mobile03"]').after('<strong class="price"> 휴대폰번호를 입력해주세요.</strong>');
			checkFalse ++;
		}
		if(!$('.writeform input[name="companyCode"]').val()){
			$('.writeform input[name="companyCode"]').after('<strong class="price"> 사업자번호를 입력해주세요.</strong>');
			checkFalse ++;
		}

	if(checkFalse == 0){
		writeStudy();
	}
}

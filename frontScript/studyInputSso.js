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
		var today = new Date();

			//파일등록
			writes += '<h2>수강정보 선택</h2>';
			//writes += '<form>';
			writes += '<ul>';
			writes += '<li>';
			writes += '<h1>수강정보</h1>';
			writes += '  <div id="companyDiv" style="display:inline-block;">';
			writes += '  </div>';
			writes += '  <div id="contentsDiv" style="display:inline-block;">';
			writes += '  </div>';
			writes += '  <div id="lectureDayDiv" style="display:inline-block;">';
			writes += '  </div>';		
			writes += '</li>';
			writes += '</ul>';
			//writes += '</form>';
									
			writes += '<h2>파일로 업로드하기</h2>'		
			if (sso != 'alpaco') {
				writes += '<form class="fileUploadform" method="post" action="studyUploadSso2.php" enctype="multipart/form-data">';
			} else {
				writes += '<form class="fileUploadform" method="post" action="studyUploadSso.php" enctype="multipart/form-data">';
			}
			writes += '<input type="hidden" name="companyCode" value="">';
			writes += '<input type="hidden" name="contentsCode" value="">';
			writes += '<input type="hidden" name="lectureOpenSeq" value="">';
			writes += '<ul>';
			writes += '<li>';
			
			writes += '<h1>등록샘플</h1>';
			if (sso != 'alpaco') {
	            writes += '<button type="button"' +
					' onclick="location.href=\'../attach/docs/studyUploadSso2.xls\'">양식 및 샘플 내려받기</button>&nbsp;';
			} else {
				writes += '<button type="button"' +
					' onclick="location.href=\'../attach/docs/studyUploadSso.xls\'">양식 및 샘플 내려받기</button>&nbsp;';
			}
			writes += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
			writes += '</li>';

			writes += '<li>';
			writes += '<h1>파일등록</h1>';
			writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
			writes += '<input type="checkbox" id="plusID" name="plusID" value="Y">';
			writes += '<label for="plusID" style="margin-left:20px">회원정보 중복시 추가 아이디 생성(ex:아이디+0)</label>';			
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>임시등록 데이터</h1>';
			writes += '<span style="width:78%;" id="tempCheck"><span>';
			writes += '</li>';
			
			writes += '</ul>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
			writes += '</form>';

			//개별등록,수정
			/*writes += '<h2>개별 등록</h2>'
			writes += '<form class="writeform" method="post">';
			writes += '<input type="hidden" name="companyCode" value="">';
			writes += '<input type="hidden" name="contentsCode" value="">';
			writes += '<input type="hidden" name="lectureOpenSeq" value="">';
			writes += '<ul>';
						
			//수강생명
			writes += '<li id="userID">';
			writes += '<h1>수강생</h1>';
			writes += '<input name="userSearch" type="text" /> <button type="button" name="userNameBtn" onClick="searchSelect(\'userID\',\''+memberApi+'\')">검색</button>';
			writes += '</li>';
			//첨삭강사
			writes += '<li id="tutorID">';
			writes += '<h1>첨삭강사</h1>';
			writes += '<input name="tutorName" type="text" /> <button type="button" onClick="searchSelect(\'tutorID\',\''+memberApi+'\',7)">검색</button>';
			writes += '</li>';
						
			writes += '</ul>';
			writes += '<div class="btnArea">';
			//writes += '<button type="button" onClick="writeStudy()">등록하기</button>';
			writes += '<button type="button" onClick="checkStudyForm()">등록하기</button>';
			writes += '<button type="button" onClick="resetInput()">초기화</button>';
			writes += '</div>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			writes += '</form>';*/

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
		tempCheck();
		searchCompany();
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

function ajaxAct(listPage){
	listPage = listPage ? listPage : page ;
	page = listPage;
	var listAjax = $.get(useTempApi,'page='+page+'&list='+listCount,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = (page-1) * listCount
		}
			if (totalCount != 0){
				j = totalCount;
				$.each(data.study,  function(){
					lists += '<tr>';
					lists += '<td>'+j+'</td>';
					lists += '<td>'+this.userID+'<br /><input type="text" name="userName" value="'+this.userName+'"></td>';
					lists += '<td><input type="text" name="birth" value="'+this.birth+'"><br /><input type="text" name="sex" value="'+this.sex+'"></td>';
					lists += '<td><input type="tel" name="mobile01" class="year" value="'+this.mobile01+'">-<input type="tel" name="mobile02" class="year" value="'+this.mobile02+'">-<input type="tel" name="mobile03" class="year" value="'+this.mobile03+'">';
					lists += '<br><input type="text" name="email01" class="name" value="'+this.email01+'">@<input type="text" name="email02" class="name" value="'+this.email02+'"></td>';
					lists += '<td><input type="text" name="companyCode" value="'+this.companyCode+'" readonly><br />'+this.companyName+'</td>';
					lists += '<td><input type="text" name="lectureStart" value="'+this.lectureStart+'"><br /><input type="text" name="lectureEnd" value="'+this.lectureEnd+'"></td>';
					lists += '<td><input type="text" name="contentsCode" value="'+this.contentsCode+'"><br />'+this.contentsName+'</td>';
					lists += '<td><input type="text" name="tutor" value="'+this.tutor+'"><br />'+this.tutorName+'</td>';
					lists += '<td><input type="text" name="price" value="'+this.price+'"><br /><input type="text" name="rPrice" value="'+this.rPrice+'"></td>';
					lists += '<td><input type="text" name="serviceType" value="'+this.serviceType+'"><br />'+this.inputDate+'</td>';
					lists += '<td>'+this.lectureEA+'</td>';
					lists += '</tr>';
					//항목 옆에 유효성 체크 해줄것
					j--;
				})
			}
		$('.BBSWrite tbody').html(lists);
	})
}



//수강 개별 등록
function writeStudy(){
	var sendData = $('.writeform').serialize();
	$.ajax({
		url:useApi,
		type:'POST',
		data:sendData,
		success:function(res){
			if(res.result == 'overlap'){
				alert('중복입과 입니다.');
			} else{
				alert('등록 되었습니다.');
			}
		},
		fail:function(){
			alert('등록에 실패하였습니다.')
		}
	})
}

function resetInput(){
	$('.writeform input[type="text"]').val('');
	$('.writeform div.').html('')
	$('.writeform button[type="submit"]').html('등록하기')
}

function tempRegister(){
	window.open("tempRegisterSso.php","임시등록","width=1300,height=800,top=0,left=0,scrollbar=yes,location=yes,menubar=no,status=no,titlebar=no,toolbar=no","kiraedu")
}

//입력폼 체크
function checkStudyForm(){
	$('.writeform strong.price').remove();
	var checkFalse = 0;
		if($('.writeform input[name="lectureStart"]').val() == '' || $('.writeform input[name="lectureEnd"]').val() == ''){
			$('.writeform input[name="lectureEnd"]').after('<strong class="price"> 수강기간을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if(!$('.writeform select[name="contentsCode"]').html()){
			$('.writeform button[name="searchNameBtn"]').after('<strong class="price"> 과정을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if(!$('.writeform select[name="userID"]').html()){
			$('.writeform button[name="userNameBtn"]').after('<strong class="price"> 수강생을 입력해주세요.</strong>')
			checkFalse ++;
		}

	if(checkFalse == 0){
		writeStudy();
	}
}

function searchCompany() {
	$('select[name="companyCode"]').remove();	
	$('select[name="contentsCode"]').remove();
	$.get(searchApi,{'searchMode':'company'},function(data){
		var selectWrite = ''	
		selectWrite += '<select id="companyCode" name="companyCode" onchange="searchContents(this.value)">';
		if(data.totalCount !=0){				
			selectWrite += '<option value="">사업주를 선택해 주세요</option>'
			$.each(data.searchResult,function(){
				selectWrite += '<option value="'+this.companyCode+'">'+this.companyName+'</option>';
			})
		}else{
			selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
		}
		selectWrite += '</select>';
		$('#companyDiv').html(selectWrite)
	})
}

function searchContents(val) {
	$('select[name="contentsCode"]').remove();	
	$.get(searchApi,{'companyCode':val, 'searchMode':'contents'},function(data){
		var selectWrite = ''	
		selectWrite += '<select id="contentsCode" name="contentsCode" onchange="searchDay(this.value)">';
		if(data.totalCount !=0){				
			selectWrite += '<option value="">과정을 선택해 주세요</option>'
			$.each(data.searchResult,function(){
				selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
			})
		}else{
			selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
		}
		selectWrite += '</select>';
		$('#contentsDiv').html(selectWrite)
	})
}

function searchDay(val) {
	$('select[name="lectureDay"]').remove();	
	$.get(searchApi,{'contentsCode':val, 'searchMode':'lectureDay', 'companyCode':$('select[name="companyCode"]').val()},function(data){
		var selectWrite = ''	
		selectWrite += '<select id="lectureDay" name="lectureDay" onchange="resultStudy()">';
		if(data.totalCount !=0){				
			selectWrite += '<option value="">기간을 선택해 주세요</option>'
			$.each(data.searchResult,function(){
				selectWrite += '<option value="'+this.lectureOpenSeq+'">'+this.lectureStart+' ~ '+this.lectureEnd+'</option>';
			})
		}else{
			selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
		}
		selectWrite += '</select>';
		$('#lectureDayDiv').html(selectWrite)
	})
}

function resultStudy() {
	$('input[name="companyCode"]').val($('#companyCode').val());
	$('input[name="contentsCode"]').val($('#contentsCode').val());
	$('input[name="lectureOpenSeq"]').val($('#lectureDay').val());	
}

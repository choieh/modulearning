//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기
//보드 정보 선언
var useApi = '../api/apiMonitoring.php';
var memberApi = '../api/apiMember.php';
var chainsearchApi = '../api/apiSearch.php';
var smsApi = '../api/apiSMStutor.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
	//현재 시간호출
	var today = new Date();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	var thisDate = today.getDate();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()" style="display: inline;">';
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2016; i <= thisYear+1; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}

	}
    actionArea += '</select>';
	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
	var h= '';
	var thisMonth = today.getMonth()+1; //January is 0!
	for(h = 1; h <= 12; h++){
		if(h != thisMonth){
			actionArea += '<option>'+h+'월</option>';
		}else{
			actionArea += '<option selected="selected">'+h+'월</option>';
		}

	}
    actionArea += '</select>&nbsp;';
    actionArea += '<span>첨삭여부</span>';
    actionArea += '<select name="tutorStat" onchange="searchAct();">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">완료</option>';
    actionArea += '<option value="N">첨삭중</option>';
    actionArea += '</select>';
	//actionArea += '<li>';
	actionArea += '<br />※ 강사를 재배정하려면 1. 재배정 파일 다운로드를 클릭하여 2.배정할 강사ID를 입력 후 3.파일을 등록하면 반영됩니다. (비환급 수강생은 출력되지 않습니다.)';
	actionArea += '<br /><button type="button" onClick="excelAct()" >재배정 파일 다운로드</button></form>';
	actionArea += '<form action="./tutorChangeOK.php" method="post" enctype="multipart/form-data" style="display: inline;">';
	actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>';
	//actionArea += '</li>';
	actionArea += '</form></div>';

	actionArea += '<div class="smsSend">';
	actionArea += '<form class="sendSMSForm" method="post" action="javascript:sendMessege()">';
	actionArea += '<div>';
    actionArea += '<span>발송시간</span>';
	actionArea += '<select name="sendReserve">';
    actionArea += '<option value="N">즉시발송</option>';
    actionArea += '<option value="Y">시간예약</option>';
    actionArea += '</select><br />';
	/*
	actionArea += '<span>전송방법</span>';
	actionArea += '<select name="device">';
	actionArea += '<option value="sms">SMS발송</option>';
	actionArea += '<option value="email">Email발송</option>';
	actionArea += '</select><br />'
	*/
    actionArea += '<span>예약시간</span>';
    actionArea += '<select name="reserveTimeYear">';
	for(i=0;i<3;i++){
		actionArea += '<option value="'+(thisYear+i)+'">'+(thisYear+i)+'</option>';
	}
	actionArea += '</select>&nbsp;';
    actionArea += '<select name="reserveTimeMonth">';
	for(i=1;i<=12;i++){
		actionArea += '<option value="'+i+'" ';
		if(i==thisMonth){
			actionArea += 'selected="selected"'
		}
		actionArea += '>'+i+'월</option>';
	}
	actionArea += '</select>&nbsp;';
    actionArea += '<select name="reserveTimeDay">';
	for(i=1;i<=31;i++){
		actionArea += '<option value="'+i+'" ';
		if(i==thisDate){
			actionArea += 'selected="selected"'
		}
		actionArea += '>'+i+'일</option>';
	}
	actionArea += '</select>&nbsp;|&nbsp;';
    actionArea += '<select name="reserveTimeHour">';
	for(i=0;i<=23;i++){
		actionArea += '<option value="'+i+'">'+i+'시</option>';
	}
	actionArea += '</select>&nbsp;';
    actionArea += '<select name="reserveTimeMinute">';
	for(i=0;i<=5;i++){
		actionArea += '<option value="'+(i*10)+'">'+(i*10)+'분</option>';
	}
    actionArea += '<input type="hidden" name="reserveTime"><br />';;
	actionArea += '<span>직접작성</span>';
	actionArea += '<input type="checkbox" id="messageBox" name="messageBox" value="Y"><label for="messageBox"></label>';
	actionArea += '<input type="text" style="width:50px;" name="messagebyte" value="0" size="1" maxlength="2" readonly> / 90 byte';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<textarea id="sendMessage" name="sendMessage" onFocus="clearMessage(this);" onKeyUp="checkByte(this);">메세지를 입력해주세요</textarea>';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<div class="pager">';
	actionArea += '</div>';
	actionArea += '<button type="button" onClick="sendMessege(\'smsTutor\')">SMS 발송</button>&nbsp;';
	actionArea += '<button type="button" onClick="sendMessege(\'emailTutor\')">Email 발송</button>&nbsp;';
	actionArea += '<button type="button" onClick="sendMessege(\'kakaoAtalkTutor\')">카카오 알림톡 발송</button>';
	actionArea += '</div>';
	actionArea += '</form>';
	actionArea += '</div>';

	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<form class="sendSMS" method="post">';
	contents += '<div class="scrollArea">'
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:40px;"><input type="checkbox" id="checkAll" onChange="checkboxAllCheck(\'checkAll\')" /><label for="checkAll"></label></th>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th>과정명<br />수강기간</th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="assign" onChange="checkboxAllCheck(\'assign\')" /><label for="assign">배정안내</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="editStart" onChange="checkboxAllCheck(\'editStart\')" /><label for="editStart">첨삭시작</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="editEnd" onChange="checkboxAllCheck(\'editEnd\')" /><label for="editEnd">첨삭종료</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="editNone" onChange="checkboxAllCheck(\'editNone\')" /><label for="editNone">미첨삭독려</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="remark" onChange="checkboxAllCheck(\'remark\')" /><label for="remark">재채점안내</label></th>';
	contents += '<th style="width:120px;">첨삭기간</th>';
	contents += '<th style="width:120px;">강사아이디<br />강사명</th>';
	contents += '<th style="width:100px;">배정인원</th>';
	contents += '<th style="width:100px;">중간평가현황<br />(응시/채점완료)</th>';
	contents += '<th style="width:100px;">최종평가현황<br />(응시/채점완료)</th>';
	contents += '<th style="width:100px;">과제현황<br />(응시/채점완료)</th>';
	contents += '<th style="width:100px;">첨삭여부</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="10">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	contents += '</div>'
	contents += '</form>';
	contents += '<div class="btnArea">';
	contents += '<button type="button" onClick="sendMessege(\'smsTutor\')">SMS 발송</button>';
	contents += '<button type="button" onClick="sendMessege(\'emailTutor\')">Email 발송</button>';
	contents += '<button type="button" onClick="sendMessege(\'kakaoAtalkTutor\')">카카오 알림톡 발송</button>';
	contents += '</div>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
}

function ajaxAct(listPage,sortData){
	listPage = listPage ? listPage : page ;
	page = listPage;
	sortData = sortData ? sortData : '';
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = (page-1) * listCount
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			j = totalCount;
			$.each(data.tutor, function(){
					lists += '<tr>';
					lists += '<td><input type="checkbox" name="check['+j+']" id="check'+j+'" class="checkAll" /><label for="check'+j+'"></label></td>';
					lists += '<td>'+j+'</td>';
					lists += '<td onClick="globalModalAct(\'contentsView\',\'\',\''+this.contentsCode+'\')" style="cursor:pointer;">'+this.contentsName+'<br/>';
					lists += data.lectureStart+' ~ '+data.lectureEnd+'</td>';
					lists += '<td><input type="checkbox" id="assign_'+j+'" name="sendType[]" class="assign" value="assign/'+this.tutorID+'/'+this.lectureOpenSeq+'" /><label for="assign_'+j+'">선택하기</label><br /><button type="button" onclick="viewMessage(\'assign/'+this.tutorID+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					
					lists += '<td><input type="checkbox" id="editStart_'+j+'" name="sendType[]" class="editStart" value="editStart/'+this.tutorID+'/'+this.lectureOpenSeq+'" /><label for="editStart_'+j+'">선택하기</label><br /><button type="button"  onclick="viewMessage(\'editStart/'+this.tutorID+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td><input type="checkbox" id="editEnd_'+j+'" name="sendType[]" class="editEnd" value="editEnd/'+this.tutorID+'/'+this.lectureOpenSeq+'" /><label for="editEnd_'+j+'">선택하기</label><br /><button type="button"  onclick="viewMessage(\'editEnd/'+this.tutorID+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td><input type="checkbox" id="editNone_'+j+'" name="sendType[]" class="editNone" value="editNone/'+this.tutorID+'/'+this.lectureOpenSeq+'" /><label for="editNone_'+j+'">선택하기</label><br /><button type="button"  onclick="viewMessage(\'editNone/'+this.tutorID+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';					
					lists += '<td><input type="checkbox" id="remark_'+j+'" name="sendType[]" class="remark" value="remark/'+this.tutorID+'/'+this.lectureOpenSeq+'" /><label for="remark_'+j+'">선택하기</label><br /><button type="button"  onclick="viewMessage(\'remark/'+this.tutorID+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td>'+this.tutorDeadline+'까지</td>';
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.tutorID+'\')" style="cursor:pointer;">'+this.tutorID+'<br/>';
					lists += this.tutorName+'</td>';
					lists += '<td>'+this.tutorCount+'</td>';
					lists += '<td>'+this.midSubmit+' / '+this.midComplete+'</td>'; //중간평가 응시/채점완료
					lists += '<td>'+this.testSubmit+' / '+this.testComplete+'</td>'; //최종평가 응시/채첨완료
					lists += '<td>'+this.reportSubmit+' / '+this.reportComplete+'</td>'; //과제현황 응시/채점완료

					if(this.testSubmit == this.testComplete && this.reportSubmit == this.reportComplete) {
						var tutorComplete = '완료';
					} else {
						var tutorComplete = '첨삭중';
					}

					lists += '<td>'+tutorComplete+'</td>';
					lists += '</tr>';
					j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="15">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="15">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
	})
}

//검색관련

function searchTypeSelect(types){
	$('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
		var today = new Date();
		var i= '';
		var thisYear = today.getFullYear();
		for(i= 2016; i <= thisYear; i++){
			if(i != thisYear){
				chageSearch += '<option>'+i+'년</option>';
			}else{
				chageSearch += '<option selected="selected">'+i+'년</option>';
			}

		}
		chageSearch += '</select>';
		chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
		var h= '';
		var thisMonth = today.getMonth()+1; //January is 0!
		for(h = 1; h <= 12; h++){
			if(h != thisMonth){
				chageSearch += '<option>'+h+'월</option>';
			}else{
				chageSearch += '<option selected="selected">'+h+'월</option>';
			}

		}
		chageSearch += '</select>';
	}else if(types == 'searchCompany'){
		chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
	}
	$('.searchArea div.searchChangeArea').append(chageSearch)
	//actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types,vals){
	if(types=='lectureDay'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}
		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="searchMonth"]').after(selectWrite)
		})
	}else if(types=='company'){
		$('select[name="companyCode"], strong.noticeSearch').remove();
		var searchName = vals.value
		if( searchName != ''&& searchName != ' ' ){
			$.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
				var selectWrite = ''
					selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'

				$('input[name="searchCompany"]').after(selectWrite)

			})
		}else{
			$('.searchChangeArea select, strong.noticeSearch').remove();
		}
	}else if(types=='printDate'){
		$('select[name="lectureDay"], strong.noticeSearch').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}
}

function viewMessage(values){
	var modalWrite =''
	modalWrite +='<div id="modal">';
	modalWrite += '<div class="messageView">';
	modalWrite += '<h1>발송메세지 확인<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
	modalWrite += '<div class="BBSWrite">'
	modalWrite += '<h1>메세지 구분'
	modalWrite += '<select onchange="viewMessageType(\''+values+'\',this)">';
	modalWrite += '<option value="smsTutor" >문자메시지</option>'
	modalWrite += '<option value="emailTutor">이메일</option>'
	modalWrite += '<option value="kakaoAtalkTutor" selected="selected">카카오 알림톡</option>'
	modalWrite += '</select>';
	modalWrite += '</h1>'
	modalWrite += '<ul>'
	modalWrite += '</ul>'
	modalWrite += '<div class="btnArea">'
	modalWrite += '<button type="button" onclick="sendMessege(\'modal\')">메세지 보내기</button>'
	modalWrite += '<button type="button" onclick="modalClose()">취소</button>'
	modalWrite += '</div>'
	modalWrite +='</div>';
	$('#contents').after(modalWrite)
	modalAlign();
	viewMessageType(values)
}
function viewMessageType(values,obj){
	obj = obj ? obj : ''
	var types = ''
	if(obj != ''){
		types = obj.options[obj.selectedIndex].value;
	}else{
		types = 'kakaoAtalkTutor'
	}
	var messageWrite = '';
	var readType = '';
	$.get(smsApi,{'sendType':values,'device':types},function(data){
		messageWrite += '<li><h1>발송 대상</h1>'+data.userName+' <span>('+data.userID+')</span></li>'
		if(types == 'smsTutor'){
			messageWrite += '<li><h1>연락처</h1>'+data.receiveNum;
		}else if (types == 'kakaoAtalkTutor'){
			messageWrite += '<li><h1>연락처</h1>'+data.receiveNum;
			readType = 'readonly onkeydown="alert(\'카카오 알림톡은 내용을 수정 하실 수 없습니다.\')" ';			
		}else{
			messageWrite += '<li><h1>이메일</h1>'+data.email;
		}
		messageWrite += '<li><h1>전송타입</h1>'+data.typeName;
		messageWrite += '<li>'
		messageWrite += '<form class="smsSendModal">'
		messageWrite += '<input type="hidden" name="sendType[]" value="'+values+'" />'
		messageWrite += '<input type="hidden" name="device" value="'+types+'" />'
		messageWrite += '<input type="hidden" name="messageBox" value="Y" />'
		messageWrite += '<textarea name="sendMessage" onKeyUp="checkByte(this.form);" '+readType+' >'+data.message+'</textarea><br />';
		messageWrite += '<input type="text" name="messagebyte" value="0" size="1" maxlength="2" readonly> / 90 byte';
		messageWrite += '</form>'
		messageWrite += '</li>'
		$('#modal div.BBSWrite ul').html(messageWrite)
	})
}

function sendMessege(types){
	types = types ? types : '';
	var sendData = ''
	if(types == 'emailTutor' || types == 'smsTutor' || types == 'kakaoAtalkTutor' || types == ''){
		sendData = $('form.sendSMS').serialize();
		if(types == 'emailTutor'){
			sendData += '&device=emailTutor'
		}else if(types == 'smsTutor'){
			sendData += '&device=smsTutor'
		}else if(types == 'kakaoAtalkTutor'){
			if ($('input[name=messageBox]:checked').val() == 'Y') {
				alert('카카오 알림톡 발송은 메세지를 직접 작성 할 수 없습니다.');			
				return;
			}
			sendData += '&device=kakaoAtalkTutor'
		}
		var reservTime = '';
		reservTime += $('.sendSMSForm select[name="reserveTimeYear"] option:selected').val() + '-';
		reservTime += $('.sendSMSForm select[name="reserveTimeMonth"] option:selected').val() + '-';
		reservTime += $('.sendSMSForm select[name="reserveTimeDay"] option:selected').val() + ' ';
		reservTime += $('.sendSMSForm select[name="reserveTimeHour"] option:selected').val() + ':';
		reservTime += $('.sendSMSForm select[name="reserveTimeMinute"] option:selected').val() + ':00';
		$('.sendSMSForm input[name="reserveTime"]').val(reservTime)
		sendData += '&'
		sendData += $('.sendSMSForm').serialize();
	}else if(types == 'modal'){
		sendData = $('.smsSendModal').serialize();
	}
	//console.log(sendData)
	if(confirm('발송하시겠습니까?') == true){
		$.post(smsApi,sendData,function(data){
			if(data.result == 'success'){
				alert('발송이 완료되었습니다.')
			}else{
				alert('발송이 되지 않았습니다.')
			}
		})
	}
}


var clearChk=true;
var limitByte = 90; //바이트의 최대크기, limitByte 를 초과할 수 없슴
/* textarea에 마우스가 클릭되었을때 초기 메시지를 클리어
function clearMessage(frm){

  if(clearChk){
    frm.sendMessage.value="";
    clearChk=false;
  }

}*/

// textarea에 마우스가 클릭되었을때 초기 메시지를 클리어
function clearMessage(frm){
	frm = $(frm);
	var frmCHK = $(frm).html();
	if(frmCHK == '메세지를 입력해주세요'){
		frm.html('');
	}else if(frmCHK == '' || frmCHK == ' '){
		frm.html('메세지를 입력해주세요');
	}
	clearChk=false;

}

// textarea에 입력된 문자의 바이트 수를 체크
function checkByte(frm) {
	var totalByte = 0;
	var message = frm.value;
	for(var i =0; i < message.length; i++) {
		var currentByte = message.charCodeAt(i);
		if(currentByte > 128) totalByte += 2;
		else totalByte++;

		$('.sendSMSForm input[name="messagebyte"]').val(totalByte)
        //frm.messagebyte.value = totalByte;

        if(totalByte > limitByte) {
            alert( limitByte+"바이트까지 전송가능합니다.");
			frm.sendMessage.value = message.substring(0,limitByte);
		}
    }
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='tutorChange.php?'+searchValue;
}
//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var sortData = '';
var useApi = '../api/apiTraining.php';
var smsApi = '../api/apiSMStraining.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = listCount ? listCount :30;
var pagerCount = 10; //페이저카운트

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	var thisDate = today.getDate();
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
	actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchEndDate" value="searchEndDate" onChange="searchTypeSelect(this.value)" /><label for="searchEndDate">종료기준월검색</label>&nbsp;&nbsp;&nbsp;'

	if(loginUserLevel != '7') {
	    actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
	}

	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear+1; i++){
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
    actionArea += '</select>';
	actionArea += '</div><div>';
    actionArea += '<span>교육담당자</span>';
    actionArea += '<input type="text" style="width:100px;" name="userName">';
	actionArea += '<span>페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';
    actionArea += '</div>';
	actionArea += '<button type="submit" class="allWidth">검색</button></form>';
	actionArea += '</form>';
	actionArea += '</div>';


	actionArea += '<div class="smsSend">';
	actionArea += '<form class="sendSMSForm" method="post" action="javascript:sendMessege()">';
	actionArea += '<div>';
    actionArea += '<span>발송시간</span>';
	actionArea += '<select name="sendReserve">';
    actionArea += '<option value="N">즉시발송</option>';
    actionArea += '<option value="Y">시간예약</option>';
    actionArea += '</select>';

	actionArea += '<span>전송방법</span>';
	actionArea += '<select name="device">';
	actionArea += '<option value="smsManager">SMS 발송</option>';
	actionArea += '<option value="kakaoAtalkManager" selected="selected">카카오 알림톡 발송</option>';
	actionArea += '</select><br />'

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
	actionArea += '<input type="text" style="width:50px;" name="messagebyte" value="0" size="1" maxlength="2" readonly> / 2000 byte/ ';
	actionArea += '<input type="text" style="width:50px;" name="messageType" value="SMS" size="1" maxlength="3" readonly><br />';
	actionArea += '<span>.</span>';
	actionArea += '90byte를 초과하면 LMS(장문)으로 발송됩니다.';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<textarea id="sendMessage" name="sendMessage" onFocus="clearMessage(this);" onKeyUp="checkByte(this);"></textarea>';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<div class="pager">';
	actionArea += '</div>';
	actionArea += '<button type="button" onClick="sendMessege(\'sms\')">SMS 발송</button>&nbsp;';
	actionArea += '<button type="button" onClick="sendMessege(\'kakaoAtalk\')">카카오 알림톡 발송</button>';
	actionArea += '</div>';
	actionArea += '</form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<form class="sendSMS" method="post">';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1420px;"><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:150px;">사업주</th>';
	contents += '<th style="width:150px;">교육 담당자 ID / 이름<br />이메일</th>';
	contents += '<th style="width:150px;">영업 팀장 ID / 이름<br />이메일</th>';
	contents += '<th style="width:150px;">영업 담당자 ID / 이름<br />이메일</th>';
	contents += '<th style="width:300px;">대표 과정명<br />수강기간</th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="sendEduInfo" onChange="checkboxAllCheck(\'sendEduInfo\')" /><label for="sendEduInfo">교육실시계획서</label></th>';
	contents += '<th style="width:106px;"><input type="checkbox" id="sendContract" onChange="checkboxAllCheck(\'sendContract\')"><label for="sendContract">훈련위탁계약서 별첨</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="sendPay" onChange="checkboxAllCheck(\'sendPay\')"><label for="sendPay">전자계산서 발행</label></th>';
	contents += '<th style="width:105px;"><input type="checkbox" id="sendStudyEnd" onChange="checkboxAllCheck(\'sendStudyEnd\')" /><label for="sendStudyEnd">수료결과보고서</label></th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="9">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>';
	contents += '</form>';
    contents += '<div class="pager">';
	contents += '</div>';
	contents += '<div class="btnArea">';
	contents += '<button type="button" onClick="sendMessege(\'sms\')">SMS 발송</button>';
	contents += '<button type="button" onClick="sendMessege(\'kakaoAtalk\')">카카오 알림톡 발송</button>';
	contents += '</div>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
}

function ajaxAct(sortDatas){
	loadingAct();
	top.location.href='#';
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+sortData,function(data){ //+listCount
		totalCount = data.totalCount;
		var lists = '';
		var midStatus = '';
		var testStatus = '';
		var reportStatus = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.training,  function(){
					lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td onClick="globalModalAct(\'companyView\',\'\','+this.companyCode+')" style="cursor:pointer;">'+this.companyName+'</td>';
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+' ('+this.userName+')<br/>';
					lists += this.email+'</td>';
          if(this.header == undefined){
            lists += `<td>-</td>`;
          } else {
            lists += `<td>${this.header}(${this.headerID??'-'})<br>${(this.headerEmail01??'-')+'@'+this.headerEmail02??'-'}</td>`;
          }
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.mktID+' ('+this.mktName+')<br/>';
					lists += this.mktEmail+'</td>';
					lists += '<td onClick="globalModalAct(\'contentsView\',\'\',\''+this.contentsCode+'\')" style="cursor:pointer;">'+this.contentsName+'<br/>';
					lists += this.lectureStart+' ~ '+this.lectureEnd+'</td>';
					lists += '<td><input type="checkbox" id="sendEduInfo'+this.seq+'" name="sendType[]" class="sendEduInfo" value="eduInfo/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'/" /><label for="sendEduInfo'+this.seq+'">선택하기</label><br />';
					lists += '<button type="button" onclick="viewMessage(\'eduInfo/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td><input type="checkbox" id="sendContract'+this.seq+'" name="sendType[]" class="sendContract" value="contracts/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'/" /><label for="sendContract'+this.seq+'">선택하기</label><br />';
					lists += '<button type="button" onclick="viewMessage(\'contracts/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td><input type="checkbox" id="sendPay'+this.seq+'" name="sendType[]" class="sendPay" value="pay/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'/" /><label for="sendPay'+this.seq+'">선택하기</label><br />';
					lists += '<button type="button" onclick="viewMessage(\'pay/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '<td><input type="checkbox" id="sendStudyEnd'+this.seq+'" name="sendType[]" class="sendStudyEnd" value="studyEnd/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'/" /><label for="sendStudyEnd'+this.seq+'">선택하기</label><br />';
					lists += '<button type="button" onclick="viewMessage(\'studyEnd/'+this.userID+'/'+this.lectureStart+'/'+this.lectureEnd+'/'+this.companyCode+'/'+this.lectureOpenSeq+'\')">내용보기</button></td>';
					lists += '</td>';
					lists += '</tr>';
					lists += '<input type="hidden name="userID" value="'+this.userID+'">';
					i--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="9">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="9">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
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
		for(i= 2015; i <= thisYear; i++){
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
	}else if(types == 'searchEndDate'){
		chageSearch += '<select name="searchYear">';
		var today = new Date();
		var i= '';
		var thisYear = today.getFullYear();
		for(i= 2015; i <= thisYear; i++){
			if(i != thisYear){
				chageSearch += '<option>'+i+'년</option>';
			}else{
				chageSearch += '<option selected="selected">'+i+'년</option>';
			}

		}
		chageSearch += '</select>';
		chageSearch += '<select name="searchMonth">';
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
		chageSearch += '<input type="hidden" name="searchEndDate" value="Y">';
	}else if(types == 'searchCompany'){
		chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
	}
	$('.searchArea div.searchChangeArea').append(chageSearch)

	if(types == 'searchDate'){
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth()+1; //January is 0!
		if(thisMonth <= 9){
			thisMonth = '0'+thisMonth;
		}
		var checkDate = thisYear +'-'+thisMonth;
		searchStudy('lectureDay',checkDate)
	}
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
				if(data.totalCount !=0){
					selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
					selectWrite += '<option value="">사업주를 선택하세요</option>'
					$.each(data.searchResult, function(){
						selectWrite += '<option value="'+this.searchCode+'">'+this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'</option>';
					})
					selectWrite += '</select>'
				}else{
					selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
				}
				$('input[name="searchCompany"]').after(selectWrite)

			})
		}else{
			$('.searchChangeArea select, strong.noticeSearch').remove();
		}
	}else if(types=='printCompany'){
		$('strong.noticeSearch, select[name="companyCode"]').remove();
		var searchDate = vals.value
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
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
	modalWrite += '<option value="smsManager" selected="selected">문자메시지</option>'
	modalWrite += '<option value="kakaoAtalkManager" selected="selected">카카오 알림톡</option>'
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
		types = 'kakaoAtalkManager'
	}
	var messageWrite = '';
	var readType = '';
	$.get(smsApi,{'sendType':values,'device':types,'manager':'Y'},function(data){
		messageWrite += '<li><h1>발송 대상</h1>'+data.userName+' <span>('+data.userID+')</span></li>'
		if(types == 'smsManager'){
			messageWrite += '<li><h1>연락처</h1>'+data.receivePhone;
		}else if (types == 'kakaoAtalkManager'){
			messageWrite += '<li><h1>연락처</h1>'+data.receivePhone;
			readType = 'readonly onkeydown="alert(\'카카오 알림톡은 내용을 수정 하실 수 없습니다.\')" ';			
		}
		messageWrite += '<li><h1>전송타입</h1>'+data.typeName;
		messageWrite += '<li>'
		messageWrite += '<form class="smsSendModal">'
		messageWrite += '<input type="hidden" name="sendType[]" value="'+values+'" />'
		messageWrite += '<input type="hidden" name="device" value="'+types+'" />'
		messageWrite += '<input type="hidden" name="messageBox" value="Y" />'
		messageWrite += '<textarea id="sendMessage"  name="sendMessage" onKeyUp="checkByte(this);" '+readType+' >'+data.message+'</textarea><br />';
		messageWrite += '<input type="text" name="messagebyte" value="0" size="1" maxlength="2" readonly> / 2000 byte / ';
		messageWrite += '<input type="text" style="width:50px;" name="messageType" value="SMS" size="1" maxlength="3" readonly><br />';
		messageWrite += '</form>'
		messageWrite += '</li>'
		$('#modal div.BBSWrite ul').html(messageWrite)
	})
}

function sendMessege(types){

	types = types ? types : '';
	var sendData = ''
	if(types == 'email' || types == 'sms' || types == 'kakaoAtalk' || types == ''){
		sendData = $('form.sendSMS').serialize();
		if(types == 'email'){
			sendData += '&device=email'
		}else if(types == 'sms'){
			sendData += '&device=smsManager'
		}else if(types == 'kakaoAtalk'){
			if ($('input[name=messageBox]:checked').val() == 'Y') {
				alert('카카오 알림톡 발송은 메세지를 직접 작성 할 수 없습니다.');			
				return;
			}
			sendData += '&device=kakaoAtalkManager'
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
	if(confirm('발송하시겠습니까?' ) == true){
		loadingAct();
		$.post(smsApi,sendData,function(data){
			if(data.result == 'success'){
				alert('발송이 완료되었습니다.');
				loadingAct();
			}else{
				alert('발송이 되지 않았습니다.');
				loadingAct();
			}
		})
	}
}



var clearChk=true;
var limitByte = 2000; //바이트의 최대크기, limitByte 를 초과할 수 없슴
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
	var messageType;
	var totalByte = 0;
	var message = frm.value;
	for(var i =0; i < message.length; i++) {
		var currentByte = message.charCodeAt(i);
		if(currentByte > 128) totalByte += 2;
		else totalByte++;
		if(totalByte > 90) {
			messageType = 'LMS';
		} else {
			messageType = 'SMS';
		}
		
		$('.sendSMSForm input[name="messagebyte"]').val(totalByte)
		$('.sendSMSForm input[name="messageType"]').val(messageType)
        //frm.messagebyte.value = totalByte;

        if(totalByte > limitByte) {
            alert( limitByte+"바이트까지 전송가능합니다.");
			frm.sendMessage.value = message.substring(0,limitByte);
		}
    }
}
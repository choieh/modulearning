//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
    actionArea += '<div id="loading" style="width:100%;height:100%;position:absolute;z-index:1;background:rgba(0,0,0,0.3);text-align:center; font-size:12pt; padding: 330px 0; display:none;">';
    actionArea += '<div style="margin: 0% 35%; background: white;"><h3>요청한 작업을 처리 중 입니다.</h3><br><h3>잠시만 기다려주세요..</h3></div>';
    actionArea += '</div>';
	actionArea += '<div class="searchArea" id="searchArea1"><form class="searchForm" action="javascript:searchAct();">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';

	if(loginUserLevel <= '3') {
		actionArea += '(<input type="radio" name="searchDayType" id="searchDayTypeStart" value="start" checked="checked" onChange="searchTypeSelect(\'searchDate\', \'start\')" /><label for="searchDayTypeStart">시작일기준</label>&nbsp;&nbsp;&nbsp;/';
		actionArea += '<input type="radio" name="searchDayType" id="searchDayTypeEnd" value="end" onChange="searchTypeSelect(\'searchDate\', \'end\')" /><label for="searchDayTypeEnd">종료일기준 )</label>&nbsp;&nbsp;&nbsp;';
	}

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
	actionArea += '<option value="0">전체</option>';
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
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<span>이름,ID</span>';
	actionArea += '<select name="searchType">';
	actionArea += '<option value="searchUserName">수강생</option>';
	actionArea += '<option value="searchMarketer">영업담당자</option>';
	actionArea += '<option value="searchTutor">교강사</option>';
	actionArea += '</select>';
	actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';
	actionArea += '<span>페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';
    actionArea += '<span>수료여부</span>';
    actionArea += '<select name="passOK" onchange="searchAct();">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">수료</option>';
    actionArea += '<option value="N">미수료</option>';
    actionArea += '</select>';
	actionArea += '<span>훈련유형</span>'
	actionArea += '<select name="serviceType" onchange="searchAct();">'
	actionArea += '<option value="">전체</option>'
	actionArea += '<option value="1">환급</option>'
	actionArea += '<option value="3">비환급</option>'
	actionArea += '<option value="5">비환급(평가있음)</option>'
	actionArea += '</select>'
	actionArea += '<span>중복제거</span>';
	actionArea += '<select name="overlapList">';
    actionArea += '<option value="N">하지않음</option>';
    actionArea += '<option value="Y">중복제거</option>';
    actionArea += '</select>';
	actionArea += '<span>퇴사자제외</span>';
	actionArea += '<select name="retire">';
    actionArea += '<option value="N">하지않음</option>';
    actionArea += '<option value="Y">제외</option>';
    actionArea += '</select>';
    actionArea += '<div style="margin-left:10px; display:inline-block;">';
    actionArea += '<span style="display:inline-block;">부서</span>';
    actionArea += '<input type="text" name="department" />';
    actionArea += '</div>';
	actionArea += '</div>';
	actionArea += '<button type="submit" style="width:100%">검색</button>';
	actionArea += '</form></div>';
	actionArea += '<div class="searchArea"><form class="searchForm">';
	actionArea += '<div class="searchChangeArea3">';
	actionArea += '<span style="width:100px;">작업구분</span>';
	actionArea += '<select name="workType" id="workType" onchange="changeWorkType(this.value)">';
	actionArea += '<option value="lectureDay">기간 변경</option>';
	actionArea += '<option value="serviceType">서비스 변경</option>';
	actionArea += '<option value="price">교육비 변경</option>';
	actionArea += '<option value="companyCode">사업주 변경</option>';
	actionArea += '<option value="marketer">영업자 변경</option>';
	actionArea += '<option value="sms">문자수신</option>';
	actionArea += '<option value="resetPW">비밀번호 초기화</option>';
	actionArea += '</select>';
	actionArea += '<div id="serviceTypeDiv" style="display:none;">';
	actionArea += '<span style="width:100px;margin-left:30px;">서비스타입(변경)</span>';
	actionArea += '<select id="serviceTypeAf" name="serviceTypeAf">';
	actionArea += '<option value="1">사업주지원(환급)1</option>';
    actionArea += '<option value="3">일반(비환급)3</option>';
	actionArea += '<option value="5">비환급(평가있음)5</option>';
    actionArea += '<option value="7">수강연동(글로벌21)7</option>';
    actionArea += '<option value="8">수강연동(오피유커스)8</option>';
	actionArea += '<option value="9">테스트용(또는 심사용)9</option>';
	actionArea += '</select>';
	actionArea += '</div>';
	actionArea += '<div id="lectureDayDiv" style="display:inline-block">';
	actionArea += '<span style="width:100px;margin-left:30px;">수강기간(변경)</span>';
	actionArea += '<div class="datePicker"><input type="text" id="startDate" name="startDate" class="cal" value="" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" id="endDate" name="endDate" class="cal"  value="" readonly="readonly" /></div>&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '<span style="width:100px; margin-left:30px;">복습일(변경)</span>';
	actionArea += '<div class="datePicker"><input type="text" id="studyReDate" name="studyReDate" class="cal" value="" readonly="readonly" /></div>';
	actionArea += '</div>';
	actionArea += '<div id="priceDiv" style="display:none">';
	actionArea += '<span style="width:100px;margin-left:30px;">교육비(변경)</span>';
	actionArea += '<input type="number" id="price" name="price" style="margin-left:30px;">';
	actionArea += '<span style="width:100px;margin-left:30px;">환급비(변경)</span>';
	actionArea += '<input type="number" id="rPrice" name="rPrice" >';
	actionArea += '</div>';
	actionArea += '<div id="companyCodeDiv" style="display:none">';
	actionArea += '<span style="width:100px;margin-left:30px;">사업주번호(변경전)</span>';
	actionArea += '<input type="text" id="companyCodeOld" name="companyCodeOld" style="margin-left:30px;" maxlength="10">';
	actionArea += '<span style="width:100px;margin-left:30px;">사업주번호(변경후)</span>';
	actionArea += '<input type="text" id="companyCodeNew" name="companyCodeNew" style="maxlength="10">';
	actionArea += '</div>';
	//영업자 배정
    actionArea += '<div id="marketerID" style="display:none">';
	actionArea += '<span style="width:100px;margin-left:30px;">영업자 배정</span>';
    actionArea += '<input name="marketerName" type="text">';
    actionArea += '<button  type="button" onclick="searchSelect(\'marketerID\',\'../api/apiMember.php\',\'manager\',\'\',\'\')">검색</button>';
	actionArea += '</div>';

	//문자수신
    actionArea += '<div id="smsSet" style="display:none">';
	actionArea += '<span style="width:100px;margin-left:30px;">문자수신</span>';
	actionArea += '<select id="smsReceive" name="smsReceive">';
	actionArea += '<option value="Y">허용</option>';
    actionArea += '<option value="N">차단</option>';
	actionArea += '</select>';
	actionArea += '</div>';

	actionArea += '<input type="checkbox" id="allCheck"><label for="allCheck" style="margin-left:30px;">전체</label>';
	actionArea += '<button type="button" style="margin-left:30px;" onclick="studyDateChange();searchAct();">변경하기</button>';
	actionArea += '</div></form></div>';
	$('#contents > h1').after(actionArea);
	//contentsPrint();
	pickerAct();//데이트피커 사용


	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;"><input type="checkbox" id="studyCkAll" onChange="checkboxAllCheck(\'studyCkAll\')" /><label for="studyCkAll"></label></th>';
	contents += '<th style="width:50px;">번호/구분</th>';
	contents += '<th style="width:80px;">ID<br />이름</th>';
	contents += '<th style="width:80px;">문자수신여부</th>';
	contents += '<th style="width:300px;">과정명<br />수강기간</th>';
	contents += '<th style="width:80px;">진도율</th>';
	contents += '<th style="width:150px;">중간평가<br />응시일</th>';
	contents += '<th style="width:150px;">최종평가<br />응시일</th>';
	contents += '<th style="width:150px;">과제<br />제출일</th>';
	contents += '<th style="width:80px;">총점<br />수료여부</th>';
	if(loginUserLevel < '5' && loginUserLevel != '4') {
		contents += '<th style="width:80px;">교ㆍ강사</th>';
	}
	contents += '<th style="width:180px;">사업주</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="11">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	//$('#contentsArea').removeAttr('class');
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
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
		totalCount = data.totalCount;
		nextCount = data.nextGroupCount;
		//alert(totalCount)
		var lists = '';
		var midStatus = '';
		var testStatus = '';
		var reportStatus = '';
		var totalScore = '';
		var testCopy = '';
		var reportCopy = '';
		var passOK = '';
		var serviceType = '';
		var j = totalCount;
		var testOverTime ='';
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.study,  function(){
				var today = new Date();
				var todayY = today.getFullYear();
				var todayM = new String(today.getMonth()+1);
				var todayD = new String(today.getDate());

				if(todayM.length == 1){
				  todayM = "0" + todayM;
				}
				if(todayD.length == 1){
				  todayD = "0" + todayD;
				}
				today = todayY+'-'+todayM+'-'+todayD;

				if(this.serviceType == '1') {
					serviceType = '사업주';
				} else if(this.serviceType == '3') {
					serviceType = '비환급';
				} else if(this.serviceType == '5') {
					serviceType = '비환급<br>(평가있음)';
				} else if(this.serviceType == '7') {
					serviceType = '수강연동<br>(글로벌21)';
				}else if(this.serviceType == '8') {
					serviceType = '수강연동<br>(오피유커스)';
				} else {
					serviceType = '테스트';
				}
				lists += '<tr>';
				lists += '<td>';
				lists += '<input type="checkbox" id="studyCk_'+this.seq+'" name="studyCk[]" class="studyCkAll" value="'+this.seq+'" /><label for="studyCk_'+this.seq+'"></label>';
				lists += '</td>';
				if(loginUserLevel <= 3){
					if (this.testStatus == "V" || this.testStatus == "Y" || this.testStatus == "C"){
						lists += '<td onClick="retaken(\''+this.user.userID+'\',\''+this.seq+'\',\''+this.lectureOpenSeq+'\',\''+this.contents.contentsCode+'\')" style="cursor:pointer;">'+this.seq+'<br />'+serviceType+'</td>';
					}else {
						lists += '<td>'+this.seq+'<br />'+serviceType+'</td>';
					}
				} else {
					lists += '<td>'+this.seq+'<br />'+serviceType+'</td>';
				}
				if(this.user.userRetire == 'Y'){
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.user.userID+'\')" style="cursor:pointer; color:red;">'+this.user.userID+'(퇴사자)<br/>';
				} else {
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.user.userID+'\')" style="cursor:pointer;">'+this.user.userID+'<br/>';
				}
				lists += this.user.userName+'</td>';
				if (this.user.smsReceive == 'Y') {
					lists += '<td>허용</td>';
				} else {
					lists += '<td>거부</td>';
				}
				if(loginUserLevel == '8') {
					lists += '<td>'+this.contents.contentsName+'<br/>';
				} else {
					lists += '<td onClick="globalModalAct(\'studyInfo\',\'\',\''+this.contents.contentsCode+'\',\''+this.seq+'\')" style="cursor:pointer;">'+this.contents.contentsName+'<br/>';
				}
				if(this.serviceType != '4') {
					lists += this.lectureStart+' ~ '+this.lectureEnd+'<br />첨삭완료 : '+this.tutorDeadline+' 까지';
				}
				lists += '</td>';
				lists += '<td onClick="globalModalAct(\'progressView\','+this.lectureOpenSeq+',\''+this.user.userID+'\')" style="cursor:pointer;">'+this.progress+'%</td>';

				if(this.midTutorTempSave == 'Y') {
					if(loginUserLevel == '7') {
						var midTutorTempSave = '(임시저장)';
					} else {
						var midTutorTempSave = '</strong><br />가채점 : '+this.tempMidScore;
					}
				} else {
					var midTutorTempSave = '';
				}

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					midStatus = '평가없음';
				} else {
					if(this.midStatus == 'Y') { // 응시
						midStatus = '<strong class="blue">채점 대기중 '+midTutorTempSave+'</strong><br />'+this.midSaveTime;
					} else if(this.midStatus == 'C') {
						if(loginUserLevel == '8'){
							if(this.studyEnd == 'Y'){
								midStatus = this.midScore+'<br />'+this.midSaveTime;
							}else {
								midStatus = '채점완료';
							}
						}else if(loginUserLevel == '6' || loginUserLevel == '5'){
							midStatus = '채점완료';
						}else{
							midStatus = this.midScore+'<br />'+this.midSaveTime;
						}
					} else if(this.midStatus == 'V') {
						midStatus = '<strong class="red">미응시</strong>';
					} else if(this.midStatus == 'N') {
						midStatus = '<strong class="red">미응시</strong>';
					} else { // 채점 완료
						midStatus = '평가 없음';
					}
				}

				if(loginUserLevel == '8' && this.resultView != 'Y') { //2018-01-23 강혜림 수정
					lists += '<td>'+midStatus+'</td>';
				}else if((loginUserLevel == '6' && this.lectureEnd >= today) || (loginUserLevel == '5' && this.lectureEnd >= today)) { //2018-01-23 강혜림 추가
					lists += '<td>'+midStatus+'</td>';
				} else {
					lists += '<td onClick="globalModalAct(\'testResultView\','+this.lectureOpenSeq+',\''+this.user.userID+'\',\'mid\')" style="cursor:pointer;">'+midStatus+'</td>';
				}

				if(this.testTutorTempSave == 'Y') {
					if(loginUserLevel == '7') {
						var testTutorTempSave = '(임시저장)';
					} else {
						var testTutorTempSave = '</strong><br />가채점 : '+this.tempTestScore;
					}
				} else {
					var testTutorTempSave = '';
				}

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					testStatus = '평가 없음';
				} else {
					if(this.testStatus == 'N') { // 미응시
						testStatus = '<strong class="red">미응시</strong>';
					} else if(this.testStatus == 'Y') { // 응시
						testStatus = '<strong class="blue">채점 대기중 '+testTutorTempSave+'</strong><br />'+this.testSaveTime;
					} else if(this.testStatus == 'C') { // 채점 완료
						if(loginUserLevel == '8'){
							if(this.studyEnd == 'Y'){
								testStatus = this.testScore+'<br />'+this.testSaveTime;
							}else {
								testStatus = '채점완료';
							}
						}else if(loginUserLevel == '6' || loginUserLevel == '5'){
							testStatus = '채점완료';
						}else{
							testStatus = this.testScore+'<br />'+this.testSaveTime;
						}
					} else if(this.testStatus == 'V') { // 채점 완료
						if(data.nowTime >= this.testEndTime) {
							testStatus = '<strong class="blue">채점 대기중</strong><br />(시간초과로인한 자동제출)<br />'+testTutorTempSave+this.testSaveTime;
						} else {
							testStatus = '<strong class="red">미응시</strong>';
						}
					} else {
						testStatus = '평가 없음';
					}
				}

				if(loginUserLevel == '8' && this.resultView != 'Y') { //2018-01-23 강혜림 수정
					lists += '<td>'+testStatus+'</td>';
				}else if((loginUserLevel == '6' && this.lectureEnd >= today) || (loginUserLevel == '5' && this.lectureEnd >= today)) { //2018-01-23 강혜림 추가
					lists += '<td>'+testStatus+'</td>';
				} else {
					if(this.testStatus == 'C' && this.testOverTime =='Y'){
						testOverTime = '(시간초과로인한 자동제출)';
					}else {
						testOverTime ='';
					}
					lists += '<td onClick="globalModalAct(\'testResultView\','+this.lectureOpenSeq+',\''+this.user.userID+'\',\'final\')" style="cursor:pointer;">'+testStatus+'<br/>'+testOverTime+'</td>';
				}

				if(this.reportTutorTempSave == 'Y') {
					if(loginUserLevel == '7') {
						var reportTutorTempSave = '(임시저장)';
					} else {
						var reportTutorTempSave = '</strong><br />가채점 : '+this.tempReportScore;
					}
				} else {
					var reportTutorTempSave = '';
				}

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					reportStatus = '과제 없음';
				} else {
					if(this.reportStatus == null) { // 과제 없는 과정
						reportStatus = '과제 없음';
					} else if(this.reportStatus == 'N') { // 미응시
						reportStatus = '<strong class="red">미응시</strong>';
					} else if(this.reportStatus == 'V') { // 응시
						var reportEndTime = this.lectureEnd+' 23:59:59';
						if(data.nowTime >= reportEndTime) {
							reportStatus = '<strong class="blue">채점 대기중</strong><br />(시간초과로인한 자동제출)'+reportTutorTempSave+'<br />'+this.reportSaveTime;
						} else {
							reportStatus = '<strong class="blue">미응시 (임시저장 중)</strong><br />'+this.reportSaveTime;
						}
					} else if(this.reportStatus == 'Y') { // 응시
						reportStatus = '<strong class="blue">채점 대기중 '+reportTutorTempSave+'</strong><br />'+this.reportSaveTime;
					} else if(this.reportStatus == 'R') { // 반려
						reportStatus = '<strong class="red">과제 반려</strong>';
					} else if(this.reportStatus == 'C') { // 채점 완료
						if(loginUserLevel == '8'){
							if(this.studyEnd == 'Y'){
								reportStatus = this.reportScore+'<br />'+this.reportSaveTime;
							}else {
								reportStatus = '채점완료';
							}
						}else if(loginUserLevel == '6' || loginUserLevel == '5'){
							reportStatus = '채점완료';
						}else{
							reportStatus = this.reportScore+'<br />'+this.reportSaveTime;
						}
					} else {
						reportStatus = '과제 없음';
					}
				}

				if(loginUserLevel == '8' && this.resultView != 'Y') { //2018-01-23 강혜림 수정
					lists += '<td>'+reportStatus+'</td>';
				}else if((loginUserLevel == '6' && this.lectureEnd >= today) || (loginUserLevel == '5' && this.lectureEnd >= today)) {	//2018-01-23 강혜림 추가
					lists += '<td>'+reportStatus+'</td>';
				} else {
					lists += '<td onClick="globalModalAct(\'reportResultView\','+this.lectureOpenSeq+',\''+this.user.userID+'\')" style="cursor:pointer;">'+reportStatus+'</td>';
				}

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					totalScore = '-';
				} else {
					if(this.totalScore == null) { // 총점이 null인 경우 0
						totalScore = 0;
					} else {
						if(loginUserLevel == '8' && this.resultView != 'Y'){ //2018-01-23 강혜림 수정
							totalScore = '채점완료';
						}else if((loginUserLevel == '6' && this.lectureEnd >= today) || (loginUserLevel == '5' && this.lectureEnd >= today)) {	//2018-01-23 강혜림 추가
							totalScore = '채점완료';
						}else {
							totalScore = this.totalScore;
						}
					}
				}

				if(this.testCopy == 'Y') { // 모사답안
					testCopy = '<br /><strong class="red">평가모사</strong>';
				} else if(this.testCopy == 'D') {
					testCopy = '<br /><strong class="blue">평가 모사의심</strong>';
				} else {
					testCopy = '';
				}

				if(this.reportCopy == 'Y') { // 모사답안
					reportCopy = '<br /><strong class="red">과제 모사확정</strong>';
				} else if(this.reportCopy == 'D') {
					reportCopy = '<br /><strong class="blue">과제 모사의심</strong>';
				} else {
					reportCopy = '';
				}

				if(this.serviceType == '3') { // 비환급인 경우 진도율 80%이면 수료
					if(this.lectureStart <= today && this.lectureEnd >= today){
						passOK = '진행중';
					}else {
						if(this.progress >= 80) { // 수료
							passOK = '<strong class="blue" style="cursor:pointer;" onclick="printPop('+this.seq+');">수료</strong>';
						}else{
							passOK = '<strong class="red">미수료</strong>';
						}
					}
				} else {
					/*if((this.midStatus == 'C' && this.testStatus == 'C' && this.reportStatus == null) || (this.midStatus == 'C' && this.testStatus == 'C' && this.reportStatus == 'C')){
						passOK = '<strong class="red">미수료</strong>';
					}else{
						passOK = '<strong class="red"></strong>';
					}*/ //2017-07-28 강혜림 수정
					if(this.passOK == 'Y') { // 수료
						passOK = '<strong class="blue" style="cursor:pointer;" onclick="printPop('+this.seq+');">수료</strong>';
					} else if(this.passOK == 'W') { // 진행중
						passOK = '진행중';
					} else {
						if(this.lectureStart <= today && this.lectureEnd >= today){
							passOK = '진행중';
						} else {
							passOK = '<strong class="red">미수료</strong>';
						}
					}/*
					if(this.lectureStart <= today && this.lectureEnd >= today){
						if(((this.midStatus != 'C' || this.testStatus != 'C') && this.reportStatus == null) || (this.midStatus != 'C' || this.testStatus != 'C' || this.reportStatus != 'C')){
							passOK = '<strong>진행중</strong>';
						}else {
							if(this.passOK == 'Y') { // 수료
								passOK = '<strong class="blue" style="cursor:pointer;" onclick="printPop('+this.seq+');">수료</strong>';
							} else {
								passOK = '<strong class="red">미수료</strong>';
							}
						}
					}else{
						if(this.passOK == 'Y') { // 수료
							passOK = '<strong class="blue" style="cursor:pointer;" onclick="printPop('+this.seq+');">수료</strong>';
						} else if(this.passOK == 'W') { // 진행중
							passOK = '진행중';
						}else {
							passOK = '<strong class="red">미수료</strong>';
						}
					}*/
				}
				if(loginUserLevel == 8){ //2018-01-23 강혜림 수정
					if(this.resultView == 'Y'){
						lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
					}else{
						if(this.serviceType == '3'){
							lists += '<td>'+passOK+'</td>';
						}else{
							//lists += '<td>'+totalScore+testCopy+reportCopy+'</td>';
							lists += '<td>진행중</td>';
						}
					}
				}else if(loginUserLevel == 5 || loginUserLevel == 6){ //2018-01-23 강혜림 추가
					if(this.lectureEnd < today){
						lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
					}else{
						if(this.serviceType == '3'){
							lists += '<td>'+passOK+'</td>';
						}else{
							//lists += '<td>'+totalScore+testCopy+reportCopy+'</td>';
							lists += '<td>진행중</td>';
						}
					}
				}else{
					lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
				}
				if(loginUserLevel < '5' && loginUserLevel != '4') {
					//lists += '<td>'+this.tutor.tutorName+'<br />'+this.marketer.marketerName+'</td>';
					lists += '<td>'+this.tutor.tutorName+'</td>';
				}
				lists += '<td onClick="globalModalAct(\'companyView\',\'\','+this.company.companyCode+')" style="cursor:pointer;">'+this.company.companyName;
				if (this.user.department) {
					lists += '<br />부서 : '+this.user.department;
				}
				if(loginUserLevel < '5') {
					lists += '<br />영업담당자 : '+this.marketer.marketerName;
				}
				lists += '</td>';
				lists += '</tr>';
				j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="11">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="11">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
        pagerAct2();
		loadingAct();
    })

}

//검색관련

function searchTypeSelect(types, searchDayType){
	$('#searchArea1 div.searchChangeArea select, #searchArea1 div.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
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
		chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
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
        chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this,\''+searchDayType+'\')">';

	}
	$('#searchArea1 div.searchChangeArea').append(chageSearch);
	if(types == 'searchDate'){
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth()+1; //January is 0!
		if(thisMonth <= 9){
			thisMonth = '0'+thisMonth;
		}
		var checkDate = thisYear +'-'+thisMonth;
		searchStudy('lectureDay',checkDate,searchDayType)
	}
	//actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types,vals,searchDayType){
	if(searchDayType == '') {
		searchDayType = $('select[name="searchDayType"]').val();
    }

	if(types=='lectureDay'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}
		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain, 'searchDayType':searchDayType},function(data){
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
					$('select[name="companyCode"]').remove();
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
		$('strong.noticeSearch, select[name="companyCode"],select[name="contentsCode"]').remove();
		var searchDate = vals.value

		//선택한 수강기간 변경일 항목에 추가
		var lectureArr = searchDate.split('~');
		$('#startDate').val(lectureArr[0]);
		$('#endDate').val(lectureArr[1]);

    var reStudyDate = new Date(lectureArr[1]);
    reStudyDate.setMonth(reStudyDate.getMonth() + 2);
    let year = reStudyDate.getFullYear();
    let month = ( (reStudyDate.getMonth()+1)+'' ).padStart(2,'0');
    let date = (reStudyDate.getDate()+'').padStart(2,'0');
		$('#studyReDate').val(year + "-" + month + "-" + date);

		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'/'+searchDate+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}else if(types=='printContents'){
		$('strong.noticeSearch, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		var scName = '';

		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode, 'type':'contents'},function(data){
			console.log(data.searchResult);
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="contentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					if(this.serviceType == '1'){
						 scName = '환급';
					}else if(this.serviceType == '3' || this.serviceType =='5'){
						scName = '비환급';
					}
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'/'+scName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}else if(types=='printDate'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+companyCode+'/'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}else if(types=='printContents2'){
		var searchDate = vals.value

		//선택한 수강기간 변경일 항목에 추가
		var lectureSeArr = searchDate.split('/');
		var lectureArr = lectureSeArr[1].split('~');
		$('#startDate').val(lectureArr[0]);
		$('#endDate').val(lectureArr[1]);

		var reStudyDate = lectureArr[1].split('-');
		var user_date = new Date(reStudyDate[0],reStudyDate[1],reStudyDate[2])
		var year = user_date.getFullYear();
		var month = user_date.getMonth() + 2; // +1은 한달을 추가
		if (month > 12) {
			month = month - 12;
			year = year + 1;
		}
		var date = user_date.getDate(); // -1은 한달 추가시 1일 감소, +1은 한달 감소시
		if(month<10) month = "0" + month; // 월을 2자리로 수정
		if(date<10) date = "0" + date; // 일을 2자리로 수정
		$('#studyReDate').val(year + "-" + month + "-" + date);

		$('strong.noticeSearch, select[name="contentsCode"]').remove();
		var searchDate = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDate':searchDate, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="contentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}
}


function printPop(popseq){
	popupAddress = '../study/print.html?seq='+popseq;
	window.open(popupAddress,"결과보기","width=712, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","printPop")
}


function contentsPrint(){
	//alert('a');
	$.get(contentsApi,{'mode':'studyList'},function(data){
		var optWrite = '<option value="">과정을 선택해주세요</option>';
		$.each(data.contentSel, function(){
			optWrite += '<option value="'+this.contentsCode+'"';
			/*if(this.contentsCode){
				optWrite += ' selected="selected"'
			}*/
			optWrite += '>'+this.contentsCode+' | '+this.contentsName+'</option>';
		})
		$('.searchArea select[name="contentSel"]').html(optWrite);
	})
}

function studyDateChange(type){
	var selectSearch    = $('input[name=selectSearch]:radio:checked').val();
	var companyCodeBe   = $('select[name=companyCode]').val();
	var lectureDayBe    = $('select[name=lectureDay]').val();
	var contentsCodeBe  = $('select[name=contentsCode]').val();		//과정코드
	var lectureStartAf  = $('#startDate').val();					//변경할 수강시작일
	var lectureEndAf    = $('#endDate').val();						//변경할 수강종료일
	var lectureReAf     = $('#studyReDate').val();					//변경할 복습일
	var price		    = $('#price').val();						//변경할 교육비
	var rPrice		    = $('#rPrice').val();						//변경할 환급비
	var workType        = $('#workType').val();						//작업타입
	var serviceTypeAf   = $('#serviceTypeAf').val();				//변경할 서비스타입
	var studyChangeType = '1';										//1:전체번경 2:선택변경
	var companyCodeOld   = $('#companyCodeOld').val();				//사업자번호(변경전)
	var companyCodeNew   = $('#companyCodeNew').val();				//사업자번호(변경후)
	var marketerID   = $('select[name=marketerID]').val();			//영업담당자
    var passOK = $('select[name=passOK]').val();                    //수료여부
    var searchType = $('select[name=searchType]').val();            //검색타입
    var searchValue = $('#searchValue').val();				        //검색조건
    var listCount = $('select[name=listCount]').val();
	var smsReceive = $('select[name=smsReceive]').val();

	if (lectureDayBe) {
		if (lectureDayBe && companyCodeBe == '') {
			var lectureDayBe   = lectureDayBe.split('~');
			var lectureStartBe = lectureDayBe[0];				//수강시작일
			var lectureEndBe   = lectureDayBe[1];
		}

		if (companyCodeBe) {
			if(selectSearch == 'searchDate') {
				var studyInfoBe    = companyCodeBe.split('/');
			} else {
				var studyInfoBe    = lectureDayBe.split('/');
			}
			//console.log(lectureDayBe);
			var companyCodeBe  = studyInfoBe[0];				//사업주코드
			var lectureDayBe   = studyInfoBe[1].split('~');
			var lectureStartBe = lectureDayBe[0];				//수강시작일
			var lectureEndBe   = lectureDayBe[1];
		}

		// if(lectureStartBe < lectureStartAf){
		// 	alert('수강기간을 확인해주세요. (수강시작일이 변경일보다 작을 수 없습니다.)');
		// 	return;
		// }

		var studyDayChangeArr = new Array();
		$('.studyCkAll:checked').each(function() {
			studyDayChangeArr.push($(this).val());
		})
		var studyDaySeq = studyDayChangeArr.join(',');

		/*if ($("#allCheck").is(":checked") != true) {		//선택변경
			studyChangeType = '2';
			var studyDayChangeArr = new Array();
			$('input[type=checkbox]:checked').each(function() {
				studyDayChangeArr.push($(this).val());
			})
			var studyDaySeq = studyDayChangeArr.join(',');
		}*/

		if($("#allCheck").is(":checked") != true){
			studyChangeType = '2';
			if(studyDaySeq == ''){
				alert('전체 또는 개별 선택 후 진행해주세요.');
				return;
			}
		}else{
            studyChangeType = '1';
        }

		var allCheck =$("#allCheck").is(":checked");

		if(studyDaySeq != '' && allCheck == true){
			alert('전체 또는 개별 한가지만 선택하여 진행해주세요.');
			return;
		}

		if(confirm('변경 하시겠습니까?')) {
			$.ajax({
				url:studyChangeApi,
				type:'POST',
				data:{
						'studyChangeType' : studyChangeType,
						'contentsCode'    : contentsCodeBe,
						'companyCodeBe'   : companyCodeBe,
						'studyDaySeq'     : studyDaySeq,
						'lectureStartBe'  : lectureStartBe,
						'lectureEndBe'    : lectureEndBe,
						'lectureStartAf'  : lectureStartAf,
						'lectureEndAf'    : lectureEndAf,
						'lectureReAf'     : lectureReAf,
						'price'           : price,
						'rPrice'          : rPrice,
						'workType'        : workType,
						'companyCodeOld'  : companyCodeOld,
						'companyCodeNew'  : companyCodeNew,
						'marketerID'      : marketerID,
                        'serviceTypeAf'   : serviceTypeAf,
                        'passOK'          : passOK,
                        'searchType'      : searchType,
                        'searchValue'     : searchValue,
                        'listCount'       : listCount,
						'smsReceive'      : smsReceive
					},
				dataType:"text",
				success:function(data){
          console.log(data);
					return;
					// alert('처리 되었습니다.');
				//	ajaxAct();
				//	location.reload();

                },
                beforeSend:function(){
                    $("#loading").css('display','block');
                },
                complete:function(){
                    $("#loading").css('display','none');
                    searchAct();
                },
				fail:function(){
					alert('변경실패.');
				}
            })

		}

	} else {
		alert('수강기간, 사업주를 선택해 주세요');
	}

}

function changeWorkType(val) {
	if (val == 'lectureDay') {
		$('#lectureDayDiv').css('display','inline-block');
		$('#serviceTypeDiv').css('display','none');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','none');
	} else if (val == 'serviceType') {
		$('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','inline-block');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','none');
	} else if (val == 'companyCode') {
		$('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','none');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','inline-block');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','none');
	} else if (val == 'marketer') {
		$('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','none');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','inline-block');
		$('#smsSet').css('display','none');
	} else if (val == 'sms') {
		$('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','none');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','inline-block');
	} else if (val == 'resetPW'){
    $('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','none');
		$('#priceDiv').css('display','none');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','none');
  } else {
		$('#lectureDayDiv').css('display','none');
		$('#serviceTypeDiv').css('display','inline-block');
		$('#priceDiv').css('display','inline-block');
		$('#companyCodeDiv').css('display','none');
		$('#marketerID').css('display','none');
		$('#smsSet').css('display','none');
	}
}

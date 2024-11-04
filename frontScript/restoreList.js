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
    var year= today.getFullYear();
    var mon = (today.getMonth()+1)>9 ? ''+(today.getMonth()+1) : '0'+(today.getMonth()+1);
    var day = today.getDate()>9 ? ''+today.getDate() : '0'+today.getDate();
    var todayDate = year + '-' + mon + '-' + day;
	var startDate = todayDate;
	var endDate = todayDate;

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div>';
	actionArea += '<span>기간</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" style="cursor:pointer"/></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+endDate+'" readonly="readonly" style="cursor:pointer"/></div>';
	actionArea += '<span style="margin-left:25px;">페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';	
	actionArea += '<button type="submit" style="margin-left:20px;">검색</button>';
	actionArea += '</div></form></div>';
	$('#contents > h1').after(actionArea);
	pickerAct();//데이트피커 사용	
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호/구분</th>';
	contents += '<th style="width:80px;">ID<br />이름</th>';
	contents += '<th style="width:300px;">과정명<br />수강기간</th>';
	contents += '<th style="width:80px;">진도율</th>';
	contents += '<th style="width:150px;">중간평가<br />응시일</th>';
	contents += '<th style="width:150px;">최종평가<br />응시일</th>';
	contents += '<th style="width:150px;">과제<br />제출일</th>';
	contents += '<th style="width:80px;">총점<br />수료여부</th>';
	contents += '<th style="width:80px;">교강사</th>';
	contents += '<th style="width:80px;">소속명</th>';
	contents += '<th style="width:80px;">삭제한ID</th>';
	contents += '<th style="width:80px;">복구</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="12">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
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
	//searchStudy('lectureDay',checkDate);
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='progress.php?'+searchValue;
}

function excelAct2(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	//top.location.href='progressB.php?'+searchValue;
	window.open('progressB.php?'+searchValue);
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
		totalCount = data.totalCount;
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
			$.each(data.restore,  function(){
				if(this.serviceType == '1') {
					serviceType = '사업주';
				} else if(this.serviceType == '3') {
					serviceType = '비환급';
				} else if(this.serviceType == '5') {
					serviceType = '비환급<br>(평가있음)';
				} else if(this.serviceType == '4'){
					serviceType = '산업안전';
				} else {
					serviceType = '테스트';
				}
				lists += '<tr>';
				lists += '<td>'+j+'<br />'+serviceType+'</td>';
				lists += '<td>'+this.user.userID+'<br/>';
				lists += this.user.userName+'</td>';
				lists += '<td>'+this.contents.contentsName+'<br/>';
				lists += this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td>'+this.progress+'%</td>';

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					midStatus = '평가없음';
				} else {
					if(this.midStatus == 'Y') { // 응시
						midStatus = '<strong class="blue">채점 대기중</strong><br />'+this.midSaveTime;
					} else if(this.midStatus == 'C') {							
						if(loginUserLevel == '8'){
							if(this.studyEnd == 'Y'){
								midStatus = this.midScore+'<br />'+this.midSaveTime;
							}else {
								midStatus = '채점완료';
							}
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
				lists += '<td>'+midStatus+'</td>';

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					testStatus = '평가 없음';
				} else {
					if(this.testStatus == 'N') { // 미응시
						testStatus = '<strong class="red">미응시</strong>';
					} else if(this.testStatus == 'Y') { // 응시
						testStatus = '<strong class="blue">채점 대기중</strong><br />'+this.testSaveTime;
					} else if(this.testStatus == 'C') { // 채점 완료
						if(loginUserLevel == '8'){
							if(this.studyEnd == 'Y'){
								testStatus = this.testScore+'<br />'+this.testSaveTime;
							}else {
								testStatus = '채점완료';
							}								
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
				
				if(this.testOverTime =='Y'){
					testOverTime = '(시간초과로인한 자동제출)';
				}else {
					testOverTime ='';
				}
				lists += '<td>'+testStatus+'<br/>'+testOverTime+'</td>';


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
							reportStatus = '<strong class="blue">채점 대기중</strong><br />(시간초과로인한 자동제출)<br />'+this.reportSaveTime;
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
						}else{
							reportStatus = this.reportScore+'<br />'+this.reportSaveTime;
						}	
					} else {
						reportStatus = '과제 없음';
					}
				}

				lists += '<td>'+reportStatus+'</td>';

				if(this.serviceType == '3') { // 비환급인 경우 평가없음
					totalScore = '-';
				} else {
					if(this.totalScore == null) { // 총점이 null인 경우 0
						totalScore = 0;
					} else {
						if(loginUserLevel == '8'){
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

				if(this.serviceType == '3') { // 비환급인 경우 진도율 80%이면 수료	
					if(this.lectureStart <= today && this.lectureEnd >= today){
						passOK = '진행중';
					}else {							
						if(this.progress >= 80) { // 수료
							passOK = '<strong class="blue" ">수료</strong>';
						}else{
							passOK = '<strong class="red">미수료</strong>';
						}
					}
				} else {					
					if(this.passOK == 'Y') { // 수료
						passOK = '<strong class="blue" ">수료</strong>';					
					} else if(this.passOK == 'W') { // 진행중
						passOK = '진행중';
					} else {
						if(this.lectureStart <= today && this.lectureEnd >= today){
							passOK = '진행중';
						} else {
							passOK = '<strong class="red">미수료</strong>';
						}		
					}
				}

				lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
				if(loginUserLevel < '5' && loginUserLevel != '4') {
					lists += '<td>'+this.tutor.tutorName+'</td>';
				}
				lists += '<td>'+this.company.companyName;
				lists += '</td>';
				lists += '<td>'+this.deleteID+'</td>';
				lists += '<td><button type="button" onClick="restore(useApi,'+this.seq+')">복구</button></td>';
				lists += '</tr>';
				j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="12">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="12">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}


function restore(apiName, sendSeq){
	if(confirm('복구하시겠습니까?')) {
		$.ajax({
			url: apiName,
			type:'POST',
			data:'studyRestore=Y&seq='+sendSeq,
			dataType:'text',
			success:function(data){
				if(data == 'deleteSuccess'){
					alert('복구되었습니다.');
				} 
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

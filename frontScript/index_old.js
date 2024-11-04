//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


// 정보 선언
var useApi = '../api/apiStudyStats.php';
var useVisitApi = '../api/apiVisit.php';
var useNoticeApi = '../api/apiBoard.php';
var studyCondApi = '../api/apiStudyCond.php';
var monitoringApi = '../api/apiMonitoringIndex.php';
var remarkApi = '../api/apiRemarkIndex.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//리스트 소팅
function listAct(page){
	var contents = '';
	$('#contents > h1').html('제목');

	if(loginUserLevel <= 3) { // 관리자 모드 접속 시
		//진행중인 수강 통계
		/*
		contents += '<div id="inProgress">';
		contents += '<h1>진행중인 수강 현황</h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="70%;">수강기간</th>';
		contents += '<th style="10%">총과정수</th>';
		contents += '<th style="20%">중간평가채점 수 / 응시자<br />최종평가채점 수 / 응시자<br />과제채점 수/ 응시자</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';
		*/

		//방문자 통계
		contents += '<div id="visitCount">';
		contents += '<h1>방문자 통계</h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="width:50%;">총 방문자수</th>';
		contents += '<th style="width:25%;">금일</th>';
		contents += '<th style="width:25%;">어제</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';

		// 현재 연도 수강 통계
		contents += '<div id="yearCount">';
		contents += '<h1>현재 연도 수강 통계 (현재 연도의 환급과정 데이터로 산출) </h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="width:30%">사업주 / 회원수</th>';
		contents += '<th style="width:15%;">과정</th>';
		contents += '<th style="width:30%;">총 수강 / 수료</th>';
		contents += '<th style="width:25%;">수료율</th>';
		contents += '</tr></thead><tbody>';
		contents += '<tr><td colspan="4"><img src="../images/global/loading.gif" alt="loading" border=0 style="width:20px; height:20px;"> 데이터를 불러오는 중입니다.</td></tr>';
		contents += '</tbody></table>';
		contents += '</div>';

	} else if(loginUserLevel == 7) { // 교강사 접속 시 공지, 첨삭현황만 불러옴

		if(loginUserID == 'khl' ){
			contents += '<div ID="monitoring" style="margin-bottom:20px;">';
			contents += '<h1>채점현황</h1>';
			contents += '<table><thead><tr>';
			contents += '<th>번호</th>';
			contents += '<th>교육기간</th>';
			contents += '<th>회사명</th>';
			contents += '<th>과정명</th>';
			contents += '<th>총첨삭배정인원</th>';
			contents += '<th>중간평가</th>';
			contents += '<th>최종평가</th>';
			contents += '<th>과제</th>';
			contents += '<th>채점대기중 인원</th>';
			contents += '<th>재채점 대기중(요청)인원</th>';
			contents += '</tr></thead><tbody>';
			contents += '</tbody></table>';
			contents += '</div>';

			contents += '<div ID="remark" style="margin-bottom:20px;">';
			contents += '<h1>재채점현황</h1>';
			contents += '<table><thead><tr>';
			contents += '<th>번호</th>';
			contents += '<th>ID/이름</th>';
			contents += '<th>교육기간</th>';
			contents += '<th>과정명</th>';
			contents += '<th>진도율</th>';
			contents += '<th>중간평가</th>';
			contents += '<th>최종평가</th>';
			contents += '<th>채점사유</th>';
			contents += '<th>재채점 요청내용</th>';
			contents += '<th>과제</th>';
			contents += '<th>총점</th>';
			contents += '<th>회사명</th>';
			contents += '</tr></thead><tbody>';
			contents += '</tbody></table>';
			contents += '</div>';
		}

			contents += '<div id="tutorNotice" style="float:right; overflow:hidden; width:49%;">';
			contents += '<h1 style="border-left:3px solid #666; margin:5px 0; padding:0 10px; color:#343434; line-height:18px; font-size:15px;">교강사 관리 규정</h1><br />';
			contents += '<table><thead><tr><th>첨삭 관리 규정</th>';
			contents += '</tr></thead><tbody>';
			contents += '</tbody></table>';
			contents += '</div>';
/*
		contents += '<div id="inProgress">';
		contents += '<h1>진행중인 첨삭 현황</h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="70%;">수강기간</th>';
		contents += '<th style="10%">총과정수</th>';
		contents += '<th style="20%">중간평가채점 수 / 응시자<br />최종평가채점 수 / 응시자<br />과제채점 수/ 응시자</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';
*/

	} else if(loginUserLevel == 8) { // 교육담당자
		contents += '<div id="inProgress">';
		contents += '<h1>진행중인 현황</h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="70%;">수강기간</th>';
		contents += '<th style="10%">총과정수</th>';
		contents += '<th style="20%">중간평가채점 수 / 응시자<br />최종평가채점 수 / 응시자<br />과제채점 수/ 응시자</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';

	} 

	if(loginUserLevel == 5 || loginUserLevel == 6){
		// 영업자 공지사항
		contents += '<div id="noticeBoardLv5" style="width:49%;float:left;">';
		contents += '<h1>공지사항</h1>';
		contents += '<table><thead><tr>';
		contents += '<th class="left">제목 / 작성자</th>';
		contents += '<th style="width:100px;">작성일</th>';
		contents += '<th style="width:70px;">조회수</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';
		// 영업자 정보 및 자료게시판
		contents += '<div id="noticeDataBoardLv5" style="width:49%;float:right;">';
		contents += '<h1>정보 및 자료게시판</h1>';
		contents += '<table><thead><tr>';
		contents += '<th class="left">제목 / 작성자</th>';
		contents += '<th style="width:100px;">작성일</th>';
		contents += '<th style="width:70px;">조회수</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';
		// 학습진행 현황
		contents += '<div id="studyCondition" style="float:left;width:100%">';
		contents += '<h1>학습 진행 현황</h1>';
		contents += '<table><thead><tr>';
		contents += '<th style="width:30px;">번호</th>';
		contents += '<th style="width:100px;">학습기간</th>';
		contents += '<th style="width:70px;">위탁회사명</th>';
		contents += '<th style="width:70px;">교육비</th>';
		contents += '<th style="width:70px;">수강인원<br>(환급/비환급/무료)</th>';
		contents += '<th style="width:70px;">진도 0%</th>';
		contents += '<th style="width:70px;">진도 1%~49%</th>';
		contents += '<th style="width:70px;">진도 50%~79%</th>';
		contents += '<th style="width:70px;">진도 80%이상</th>';
		contents += '<th style="width:70px;">평가 응시대상자<br>(중간/최종/과제)</th>';
		contents += '<th style="width:70px;">중간평가<br>(응시자/미응시자)</th>';
		contents += '<th style="width:70px;">최종평가<br>(응시자/미응시자)</th>';
		contents += '<th style="width:70px;">과제<br>(제출자/미제출자)</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';


	} else {
		// 공지사항
		contents += '<div id="noticeBoard">';
		contents += '<h1>공지사항</h1><br />';
		contents += '<table><thead><tr>';
		contents += '<th >제목</th>';
		contents += '<th style="width:100px;">작성일</th>';
		contents += '<th style="width:70px;">조회수</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		contents += '</div>';
	}
	
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	visitCountAJAX();
	yearCountAJAX();
	if (loginUserLevel == '7') {
		noticeBoardAJAX('6');
	} else if (loginUserLevel == '5' || loginUserLevel == '6') {
		noticeBoardAJAX('10');
		noticeBoardAJAX('14');
    } else {
		noticeBoardAJAX('1');
	}

	inProgressAJAX();
	studyConditionAJAX();
	monitoringAJAX();
	remarkAJAX();
	tutorNoticeAJAX();
}

function visitCountAJAX(){
	var listAjax = $.get(useVisitApi,function(data){
		totalCount = data.totalCount;
		var lists = '';

		if (totalCount != 0){
			lists += '<tr>';
			lists += '<td>'+data.totalEA+'</td>';
			lists += '<td>'+data.todayEA+'</td>';
			lists += '<td>'+data.yesterdayEA+'</td>';
			lists += '</tr>';

		}else{
			lists += '<tr><td class="notResult" colspan="4">내역이 없습니다.</td></tr>'
		}

		$('#visitCount tbody').html(lists);
	}) 
}

function yearCountAJAX(){
	var listAjax = $.get(useApi,{'year':'now'},function(data){
		totalCount = data.totalCount;
		var lists = '';

		if (totalCount != 0){
			lists += '<tr>';
			lists += '<td>'+data.companyCount+'&nbsp;/&nbsp;'+data.userCount+'</td>';
			lists += '<td>'+data.contentsCount+'</td>';
			lists += '<td>'+data.studyCount+'&nbsp;/&nbsp;'+data.passCount+'</td>';
			lists += '<td>'+eval(data.passRate).toFixed(1)+'%</td>';
			lists += '</tr>';

		}else{
			lists += '<tr><td class="notResult" colspan="6">내역이 없습니다.</td></tr>'
		}
		$('#yearCount tbody').html(lists);
	}) 
}

function noticeBoardAJAX(boardCode){
	var noticeList = '';
	if (loginUserLevel == '7') {
		noticeList = '10';
	} else {
		noticeList = '5';
	}
	var listAjax = $.get(useNoticeApi,{'boardCode':boardCode,'list':noticeList},function(data){
		totalCount = data.totalCount;
		var lists = '';
		if (totalCount != 0){
			$.each(data.board, function(){
				lists += '<tr>';
				lists += '<td class="left"><strong><a href="06_board.php?locaSel=0903&boardCode='+boardCode+'&seq='+this.seq+'">'+this.subject+'</a></strong></td>';
				lists += '<td>'+this.inputDate.substr(0,10)+'</td>';
				lists += '<td>'+this.hits+'</td>';
				lists += '</tr>';
			})

		}else{
			lists += '<tr><td class="notResult" colspan="4">내역이 없습니다.</td></tr>'
		}
		if (boardCode == '10') {
			$('#noticeBoardLv5 tbody').html(lists);
		}else if(boardCode == '14'){
			$('#noticeDataBoardLv5 tbody').html(lists);
		}else{
			$('#noticeBoard tbody').html(lists);
		}
	}) 
}

function inProgressAJAX(){
	var listAjax = $.get(useApi, function(data){
		totalCount = data.totalCount;
	var lists = '';

		if (totalCount != 0){
			$.each(data.study, function(){
				lists += '<tr>';
				lists += '<td style="background:#f8f8f8;">'+this.lectureStart+' ~ '+this.lectureEnd+'<br />~ '+this.tutorDeadline+' 까지 첨삭 완료</td>';
				lists += '<td style="background:#f8f8f8;">'+this.studyCount+'</td>';
				lists += '<td style="background:#f8f8f8;">'+this.midComplete+'&nbsp;/&nbsp;'+this.midSubmit+'<br />'+this.testComplete+'&nbsp;/&nbsp;'+this.testSubmit+'<br />'+this.reportComplete+'&nbsp;/&nbsp;'+this.reportSubmit+'</td>';
				lists += '</tr>';

				$.each(this.company, function(){
					lists += '<tr>';
					if(this.companyName != null){
					lists += '<td>'+this.companyName+'</td>';
					}else{
						lists += '<td>'+this.companyCode+'</td>';
					}

					lists += '<td>'+this.studyCount+'</td>';
					lists += '<td>'+this.midComplete+'&nbsp;/&nbsp;'+this.midSubmit+'<br />'+this.testComplete+'&nbsp;/&nbsp;'+this.testSubmit+'<br />'+this.reportComplete+'&nbsp;/&nbsp;'+this.reportSubmit+'</td>';
					lists += '</tr>';
				})
			})

		}else{
			lists += '<tr><td class="notResult" colspan="6">내역이 없습니다.</td></tr>'
		}
		$('#inProgress tbody').html(lists);
	}) 
}


function studyConditionAJAX(){
	var listAjax = $.get(studyCondApi,{'loginUserID':loginUserID},function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if (totalCount != 0){
			$.each(data.studyCond, function(){
				lists += '<tr>';
				lists += '<td style="width:30px;">'+j+'</td>';
				lists += '<td>'+this.lectureStart+'</td>'; //학습기간
				lists += '<td>'+this.companyName+'</td>'; //위탁회사명
				lists += '<td>'+this.price+'원</td>'; //교육비
				lists += '<td>'+this.studyCount+'명<br> ( '+this.rPrice+'명 / '+this.rPrice2+'명 /'+this.rPriceNo+'명 )</td>'; //수강인원(환급/비환급/무료)
				lists += '<td>'+this.progressZero+'명</td>'; //진도0%
				lists += '<td>'+this.progressTwo+'명</td>'; //진도1%~49%
				lists += '<td>'+this.progressThird+'명</td>'; //진도50%~79%
				lists += '<td>'+this.progressEnd+'명</td>'; //진도80% 이상
				lists += '<td>'+this.midCountAll+'명 /'+this.testCountAll+'명 /'+this.reportsCountAll+'명</td>'; // 평가 응시대상자
				lists += '<td>'+this.midCount+'명 /'+this.midCountNo+'명</td>'; //중간평가 응시자/미응시자
				lists += '<td>'+this.testCount+'명 /'+this.testCountNo+'명</td>'; //최종평가 응시자/미응시자
				if(this.reportsCountNull == 0){
					lists += '<td>'+this.reportsCount+'명 /'+this.reportsCountNo+'명</td>'; //과제 응시자/미응시자
				}else{
					lists += '<td>과제 없는 과정</td>';//과제 없을때
				}
				lists += '</tr>';
				j--;
			})

		}else{
			lists += '<tr><td class="notResult" colspan="12">내역이 없습니다.</td></tr>'
		}

		$('#studyCondition tbody').html(lists);
	}) 
}


function monitoringAJAX(){
	var listAjax = $.get(monitoringApi,{'loginUserID':loginUserID},function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if (totalCount != 0){
			$.each(data.monitoring, function(){
				lists += '<tr>';
				lists += '<td style="width:30px;">'+j+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>'; //학습기간
				lists += '<td>'+this.companyName+'</td>'; //회사명
				lists += '<td>'+this.contentsName+'</td>'; //과정명
				lists += '<td>'+this.studyCount+'</td>'; //배정인원
				lists += '<td>'+this.midCount+'/'+this.midAll+'</td>'; //중간평가
				lists += '<td>'+this.testCount+'/'+this.testAll+'</td>'; //최종평가
				lists += '<td>'+this.reportCount+'/'+this.reportAll+'</td>'; //과제
				lists += '<td><a href="04_study.php?locaSel=0701">'+this.statusTotal+'명</a></td>'; //채점대기중
				lists += '<td>'+this.reScoreTotal+'명</td>'; //재채점 대기중
				lists += '</tr>';
				j--;
			})

		}else{
			lists += '<tr><td class="notResult" colspan="10">내역이 없습니다.</td></tr>'
		}

		$('#monitoring tbody').html(lists);
	}) 
}

function remarkAJAX(){
	var listAjax = $.get(remarkApi,{'loginUserID':loginUserID},function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if (totalCount != 0){
			$.each(data.remark, function(){
				var reason= '';
				var reportStatus= '';
				var testStatus= '';
				var totalScore= '';

				if(this.reportStatus == null){
					reportStatus = '과제없음';
				}else{
					reportStatus = this.reportStatus;
				}
				if(this.reason == '1'){
					reason='점수배정오류';
				}else if (this.reason == '2'){
					reason='첨삭지도내용오류';
				}else if(this.reason == '3'){
					reason='답안재검토';
				}else if(this.reason == '4'){
					reason='오타';
				}else {
					reason='기타';
				}
				if(this.testStatus == 'Y'){
					testStatus ='채점대기중';
				}
				lists += '<tr>';
				lists += '<td style="width:30px;">'+j+'</td>';
				lists += '<td>'+this.userID+'/'+this.userName+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>'; //학습기간				
				lists += '<td>'+this.contentsName+'</td>'; //과정명
				lists += '<td>'+this.progress+'</td>'; //진도율
				lists += '<td>'+this.midScore+'</td>'; //중간평가
				lists += '<td>'+testStatus+'</td>'; //최종평가
				lists += '<td style="font-weight:600">'+reason+'</td>'; //재채점사유
				lists += '<td style="font-weight:600">'+this.request+'</td>'; //재채점 요청사유
				lists += '<td>'+reportStatus+'</td>'; //과제
				lists += '<td>'+this.totalScore+'</td>'; //총점
				lists += '<td>'+this.companyName+'</td>'; //회사명
				lists += '</tr>';
				j--;
			})

		}else{
			lists += '<tr><td class="notResult" colspan="12">내역이 없습니다.</td></tr>'
		}

		$('#remark tbody').html(lists);
	}) 
}

function tutorNoticeAJAX(){
	var listAjax = $.get('../api/apiSiteInfo.php',function(data){
		var lists = '';
		$('#tutorNotice tbody').html(data.tutorNotice);
	}) 
}
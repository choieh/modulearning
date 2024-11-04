var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var studySeq = '';
var progressTime = null;

//var contentsCode = '';
//var lectureOpenSeq = '';
var userID = '';
	
function listAct(){
	var contents = '';
	contents += '<ul>';
	contents += '</ul>';
	$('#contentsArea').html(contents);
	ajaxAct();
}

function viewAct(){
	listAct();
}

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		var totalCount = data.totalCount;
		var lists = '';
		if(totalCount != 0){
			$.each(data.study, function(){
				lists += '<li class="list'+this.seq+'">';
				lists += '<div class="summuryArea" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')">';
				lists += '<ul>';
				lists += '<li><h1>남은 수강일</h1><strong>'+this.leftDate+'</strong>일</li>';
				lists += '<li><h1>강의 진도</h1><strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				lists += '<li><h1>진도율</h1><strong class="totlaProgress01">'+this.progress+'</strong>%</li>';
				lists += '</ul>';
				lists += '<div></div>';
				lists += '<img src="'+this.previewImageURL+this.previewImage+'" alt="강의 이미지" />';
				lists += '<h1>'+this.contentsName+'</h1><br />';
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2><br />';
				lists += '<h3>첨삭강사 : '+this.tutorName
				if(this.mobile=='Y'){
					lists += '<strong>모바일 학습 가능</strong>'
				}
				lists += '</h3>';
				lists += '</div>';
				lists += '<button type="button" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"></button>';
				lists += '</li>';
			})
		}else{
			lists += '<li class="noList">강의가 없습니다.</li>';
		}
		$('#contentsArea > ul').html(lists);
		$('#titleArea h3 strong.blue').html(totalCount);
		/*
		if(totalCount == 1){					
			viewStudyDetail(data.study[0].seq, data.study[0].contentsCode, data.study[0].lectureOpenSeq)
		}
		*/
	})
	.done(function(){
		if(lectureOpenSeq != ''){
			viewStudyDetail(seq, contentsCode, lectureOpenSeq)
		}
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq,renew){
	//$('#contentsArea > ul > li > ul, #contentsArea > ul > li > table, #contentsArea > ul > li > form').remove();
	//$('#contentsArea > ul > li').removeClass('openClass');
	
	studySeq = studySeq ? studySeq : '';
	contentsCode = contentsCode ? contentsCode : '';
	lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
	renew = renew ? renew : 'N';
	var studyBlock = $('.list'+studySeq);
	if (studyBlock.find('form').length != 0 && renew != 'Y'){
		studyBlock.children('ul,table,form').remove();
		studyBlock.removeClass('openClass');
	}else{
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			var lectureOpenSeq = data.lectureOpenSeq;
			var lectureStart = data.lectureStart;
			var certPass = data.certPass
			var serviceType = data.serviceType

			var midCaptchaTime = data.midCaptchaTime;
			var testCaptchaTime = data.testCaptchaTime;
			var reportCaptchaTime = data.reportCaptchaTime;

			if(midCaptchaTime == null){
				midCaptchaTime = '0000-00-00'
			}
			if(testCaptchaTime == null){
				testCaptchaTime = '0000-00-00'
			}
			if(reportCaptchaTime == null){
				reportCaptchaTime = '0000-00-00'
			}
			
			if(certPass == 'Y' || serviceType == '3' || serviceType == '9' ){
				
				var today = data.nowTime.substr(0,10)
				var nowTime = data.nowTime
				
				var totalCount = data.totalCount;
				var ContentsCode = data.contentsCode;				
				var studyDetails = '';
				var useMidTest = data.midStatus;
				var useFinTest = data.testStatus;
				var useReport = data.reportStatus;
				var sourceType = data.sourceType;
				

				//환급 구분에 따른 상단 인포 노출
				if (serviceType == 1 || serviceType == 9){
					//상단과정 정보
					studyDetails += '<table class="passCheck"><tr>';
					studyDetails += '<td colspan="6" class="title">수료기준</td>'
					studyDetails += '</tr>';
					studyDetails += '<th>수강정원</th>';
					studyDetails += '<th>총 진도율</th>';
					studyDetails += '<th>중간평가</th>';
					studyDetails += '<th>최종평가</th>';
					studyDetails += '<th>과제</th>';
					studyDetails += '</tr><tr>';
					studyDetails += '<td rowspan="2"><strong>'+data.limited+'</strong>명</td>';
					studyDetails += '<td rowspan="2"><strong>'+data.passProgress+'</strong>% 이상</td>';
					studyDetails += '<td>총&nbsp;<strong>';
					if(data.totalPassMid != 0){
						studyDetails += data.totalPassMid+'</strong>점 / <strong>'+data.midRate+'</strong>% 반영';
					}
					studyDetails += '</td>';
					studyDetails += '<td>총&nbsp;<strong>';
					if(data.totalPassTest != 0){
						studyDetails += data.totalPassTest+'</strong>점 / <strong>'+data.testRate+'</strong>% 반영';
					}
					studyDetails += '</td><td>';
					if(data.totalPassReport != 0){
						studyDetails += '총&nbsp;<strong>'+data.totalPassReport+'</strong>점 / <strong>'+data.reportRate+'</strong>% 반영';
					} else {
						studyDetails += '과제 없음';
					}
					studyDetails += '</td>';
					studyDetails += '</tr><tr>';
					if(data.totalPassReport != 0){
						studyDetails += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 (평가와 과제는 40점 미만 시 과락 적용)</td>';
					} else {
						studyDetails += '<td colspan="3">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 (평가 40점 미만 시 과락 적용)</td>';
					}
					studyDetails += '</tr></table>';
					
					//평가관련
					studyDetails += '<ul>';
					//중간평가
					var midStatus = '';
					if(data.totalProgress <= 49 && data.midStatus != null){
						midStatus = '<strong class="red">진도부족</strong>'
						studyDetails += '<li class="middleTest" onclick="alert(\'진도율 50% 이상 응시 가능합니다.\')"><h1>중간평가</h1>';
						studyDetails += midStatus;
						studyDetails += '<br /><span>진도율 50%부터 응시가능</span>';
						studyDetails += '</li>';
					}else if(data.midStatus == null){
						midStatus = '<strong>평가 없음</strong>'
						studyDetails += '<li class="middleTest" onclick="alert(\'평가가 없습니다.\')"><h1>중간평가</h1>';
						studyDetails += midStatus;
						studyDetails += '<br /><span>평가가 없는 과정</span>';
						studyDetails += '</li>';
					}else{
						var midLink ='';
						var midComment = '';
						if(data.midStatus == 'N' || data.midStatus == 'V') {
							if( data.midCaptchaTime != null){							  
								if(data.midCaptchaTime.substr(0,10) == today){
									midLink = 'onclick="openStudyModal(\'mid\',\''+contentsCode+'\','+lectureOpenSeq+')"';
								}else{
									var captchaLink = 'captcha_re.php?type=mid&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
									midLink = 'onclick="openPopup(\''+captchaLink+'\')"';
								}
							}else if(data.serviceType != 1){
								midLink = 'onclick="openStudyModal(\'mid\',\''+contentsCode+'\','+lectureOpenSeq+')"';
							}else{
								var captchaLink = 'captcha_re.php?type=mid&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
								midLink = 'onclick="openPopup(\''+captchaLink+'\')"';
							}
							if(data.midStatus == 'N'){
								midStatus = '<strong class="blue">응시하기</strong>'
								midComment = '<br /><span>응시마감 : '+data.lectureEnd.substr(0,10)+' 23:50</span>';
							}else{
								midStatus = '<strong class="blue">응시중</strong>'
								midComment = '<br /><span>응시마감 : '+data.lectureEnd.substr(0,10)+' 23:50</span>';
							}
						} else if(data.midStatus == 'Y' || data.midStatus == 'C') {
							midLink = 'onclick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'mid\')"';
							if(data.midStatus == 'Y'){
								midStatus = '<strong class="red">응시완료</strong>'
							}else if (data.midStatus == 'C'){
								midStatus = '<strong class="red">'+data.midScore+'</strong>점';
							}
							midComment = '<br /><span>응시일 : '+data.midSaveTime.substr(0,10)+'</span>';
						} else {
							midStatus = '중간평가없음';
						}
						studyDetails += '<li class="middleTest" '+midLink+'><h1>중간평가</h1>';
						studyDetails += midStatus;
						studyDetails += midComment;
						studyDetails += '</li>';
					}
					
					//최종평가
					var testStatus = '';
					if(data.totalProgress <= 79 && data.testStatus != null){
						testStatus = '<strong class="red">진도부족</strong>'
						studyDetails += '<li class="lastTest" onclick="alert(\'진도율 80% 이상 응시 가능합니다.\')"><h1>최종평가</h1>';
						studyDetails += testStatus;
						studyDetails += '<br /><span>진도율 80%부터 응시가능</span>';
						studyDetails += '</li>';
					}else if(data.testStatus == null){
						testStatus = '<strong>평가 없음</strong>'
						studyDetails += '<li class="middleTest" onclick="alert(\'평가가 없습니다.\')"><h1>최종평가</h1>';
						studyDetails += testStatus;
						studyDetails += '<br /><span>평가가 없는 과정</span>';
						studyDetails += '</li>';
					}else{
						var testLink = '';
						var testComment = '';
						if(data.testStatus == 'N') {
							if( data.testCaptchaTime != null){
								if(data.testCaptchaTime.substr(0,10) == today){
									testLink = 'onclick="openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')"';
								}else{
									var captchaLink = 'captcha_re.php?type=final&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
									testLink = 'onclick="openPopup(\''+captchaLink+'\')"';
								}
							}else if(data.serviceType != 1){
								testLink = 'onclick="openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')"';
							}else{
								var captchaLink = 'captcha_re.php?type=final&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
								testLink = 'onclick="openPopup(\''+captchaLink+'\')"';
							}
							//testLink = 'onclick="openStudyModal(\'test\',\''+contentsCode+'\','+lectureOpenSeq+')"';
							testStatus = '<strong class="blue">응시하기</strong>'
							testComment = '<br /><span>제한시간 : '+data.testTime+'분</span>'
						} else if(data.testStatus == 'V') {
							if(data.nowTime >= data.testEndTime) {
								testLink = 'onclick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')"';
								testStatus = '<strong class="red">응시완료</strong>'
								testComment = '<br /><span>시간초과로 인한 응시종료</span>';
							} else {
								if(data.testCaptchaTime != null){
									if( data.testCaptchaTime.substr(0,10) == today ){
										testLink = 'onclick="openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')"';
									}else{
										var captchaLink = 'captcha_re.php?type=final&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
										testLink = 'onclick="openPopup(\''+captchaLink+'\')"';
									}
								}else if(data.serviceType != 1){
									testLink = 'onclick="openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')"';
								}else{
									var captchaLink = 'captcha_re.php?type=final&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
									testLink = 'onclick="openPopup(\''+captchaLink+'\')"';
								}
								testStatus = '<strong class="blue">응시중</strong>'
								testComment = '<br /><span>'+data.testEndTime+' 까지</span>';
							}
						} else if(data.testStatus == 'Y' || data.testStatus == 'C') {
							testLink = 'onclick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')"';
							if(data.testStatus == 'Y'){
								testStatus = '<strong class="red">응시완료</strong>'
							}else if(data.testStatus == 'C'){
								testStatus = '<strong class="red">'+data.testScore+'</strong>점';
							}
							testComment = '<br /><span>응시완료 : '+data.testSaveTime.substr(0,10)+'</span>';
						} else {
							testStatus = '최종평가없음';
						}
						//최종평가
						studyDetails += '<li class="lastTest" '+testLink+'><h1>최종평가</h1>';
						studyDetails += testStatus;
						studyDetails += testComment;
						studyDetails += '</li>';
					}
					
					//과제제출
					var reportStatus = '';
					if(data.totalProgress <= 79 && data.reportStatus != null){
						reportStatus = '<strong class="red">진도부족</strong>'
						studyDetails += '<li class="report" onclick="alert(\'진도율 80% 이상 응시가능합니다.\')"><h1>과제제출</h1>';
						studyDetails += reportStatus;
						studyDetails += '<br /><span>진도율 80%부터 제출가능</span>';
						studyDetails += '</li>';
					}else if(data.reportStatus == null){
						reportStatus = '<strong>과제 없음</strong>'
						studyDetails += '<li class="report" onclick="alert(\'과제가 없습니다.\')"><h1>과제제출</h1>';
						studyDetails += reportStatus;
						studyDetails += '<br /><span>평가가 없는 과정</span>';
						studyDetails += '</li>';
					}else{
						var reportComment = '';
						if(data.reportStatus == 'N') {
							if(data.reportCaptchaTime != null){
								if( data.reportCaptchaTime.substr(0,10) == today ){
									reportLink = 'onclick="openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')"';
								}else{
									var captchaLink = 'captcha_re.php?type=report&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
									reportLink = 'onclick="openPopup(\''+captchaLink+'\')"';
								}
							}else if(data.serviceType != 1){
								reportLink = 'onclick="openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')"';
							}else{
								var captchaLink = 'captcha_re.php?type=report&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
								reportLink = 'onclick="openPopup(\''+captchaLink+'\')"';
							}
							reportStatus = '<strong class="blue">제출하기</strong>'
						} else if(data.reportStatus == 'Y') {
							reportLink = 'onclick="resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')"';
							reportStatus = '<strong class="red">제출완료</strong>'
							reportComment = '<br /><span>제출일 : '+data.reportSaveTime.substr(0,10)+'</span>';
						} else if(data.reportStatus == 'C') {
							reportLink = 'onclick="resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')"';
							reportStatus = '<strong class="red">'+data.reportScore+'</strong>점';
							reportComment = '<br /><span>제출일 : '+data.reportSaveTime.substr(0,10)+'</span>';
						} else {
							reportLink = '';
							reportStatus = '과제없음';
							reportComment += '<br /><span>평가가 없는 과정</span>';
						}
						studyDetails += '<li class="report" '+reportLink+'><h1>과제제출</h1>';
						studyDetails += reportStatus;
						studyDetails += reportComment;
						studyDetails += '</li>';
					}	  
					studyDetails += '</ul>';
  
				} else {
					studyDetails += '<br />';
				}
				//환급 구분에 따른 상단 인포 노출 끝
				
				
				//과정노출
				if (totalCount != 0){
					///과정목록관련부					
					//포스트를 위한 변경
					studyDetails += '<form class="lectureForm'+studySeq+'" action="'+data.progress[0].player+'/player/popupStudy2.php" method="post" target="studyWindow">'
					studyDetails += '<input type="hidden" name="seq" value="'+studySeq+'">';
					studyDetails += '<input type="hidden" name="subDomains" value="'+subDomain+'">';
					studyDetails += '<input type="hidden" name="sourceType" value="'+sourceType+'">';
					studyDetails += '<input type="hidden" name="contentsCode" value="'+ContentsCode+'">';
					studyDetails += '<input type="hidden" name="lectureOpenSeq" value="'+lectureOpenSeq+'">';
					studyDetails += '<input type="hidden" name="chapter" value="">';
					studyDetails += '<input type="hidden" name="types" value="">';
					
					studyDetails += '<table>';
					studyDetails += '<colgroup><col width="90px" /><col width="*" /><col width="90px" /><col width="92px" /><col width="92px" /></colgroup>';
					
					//수강관련변수
					var midTerm = Math.ceil(Number(totalCount)/2);	
					var studyCnt = 0; //하루최대차시 체크용
					var nextUse = 'Y'; //전차시 진도체크용
					var midAfter = 'N'

					var i=0;
					for (i=0;i<totalCount;i++){
						if(i != midTerm){
							studyDetails += '<tr class="lecture'+studySeq+data.progress[i].chapter+'">';
							studyDetails += '<td>'+data.progress[i].chapter+'차시</td>';
							studyDetails += '<th><strong>'+data.progress[i].chapterName+'</strong><br />';
							if(data.progress[i].endTime != null){
								studyDetails += '교육이수 시간 : '+data.progress[i].endTime+'<br />';
								studyDetails += '접속아이피 : '+data.progress[i].studyIP+'</th>';
							}
							studyDetails += '<td>'+data.progress[i].progress+'%</td>';
														
							//이어보기 버튼
							studyDetails += '<td>';	
							if(data.progress[i].progress != 0){
								if(serviceType != 9){
									if((nowTime >= captchaBanStart && nowTime <= captchaBanEnd) || i%captchaCnt != 0){									
										studyDetails += writeBtn('continue',(i+1));
									}else{//이어보기 캡챠
										studyDetails += writeBtn('captchaContinue',(i+1));
									}
								}else{
									studyDetails += writeBtn('continue',(i+1));
								}
							}else{
								studyDetails += '-'
							}
							studyDetails += '</td>'
							
							
							//학습하기버튼
							studyDetails += '<td>';
							if(serviceType != 9){
								if(nextUse == 'N'){//전차시 진도미달, 중간평가응시전
									studyDetails += writeBtn('study','전 차시의 진도율이 부족합니다. (80% 이상)');				
								}else if(studyCnt >= maxStudyCnt){//최대차시
									studyDetails += writeBtn('study','사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시('+maxStudyCnt+'차시)를 초과하였습니다.');
								}else if(midAfter=='Y' && data.midStatus == 'N'){//중간평가 응시미달
									studyDetails += writeBtn('study','중간평가 응시 후 학습이 가능합니다.');
								}else if(!(nowTime >= captchaBanStart && nowTime <= captchaBanEnd) && i%captchaCnt == 0){//캡챠
									studyDetails += writeBtn('captchaStudy',(i+1));
								}else{//학습하기
									studyDetails += writeBtn('study',(i+1));
								}
							}else{
								studyDetails += writeBtn('study',(i+1));
							}

							studyDetails += '</td>';
							
							//하루 최대 진도차시
							if(data.progress[i].startTime == null || data.progress[i].startTime.substr(0,10) == today){
								studyCnt++
							}
							//전차시 최대 진도율
							if(data.progress[i].progress <= 79){
								nextUse = 'N'
							}							
	
							studyDetails += '</tr>';
						}else{
							//중간평가 노출							
							if(useFinTest != null && (serviceType == 1 || serviceType == 9)){//서비스타입에 따른 노출 지정
								studyDetails += '<tr class="midtestLine">';
								studyDetails += '<td>[평가]</td>';
								studyDetails += '<th class="blue"><strong>중간평가</strong>';
								
								// 평가응시전, 응시중	
								if(data.midStatus == 'N' || data.midStatus == 'V'){ 
									studyDetails += '</th>';
								} else {
									studyDetails += '<br />평가응시 시간 : '+data.midSaveTime+'<br />';
									studyDetails += '접속아이피 : '+data.midIP+'</th>';
								}
								//응시상태
								if(data.totalProgress >= 49){ 
									if(data.midStatus == 'Y'){ //채점전
										studyDetails += '<td><strong class="red">응시완료</strong></td>';							
									}else if(data.midStatus == 'C'){ //채점완료
										studyDetails += '<td><strong class="red">'+data.testScore+'</strong>점</td>';
									}else{
										studyDetails += '<td>응시가능</td>';
									}
								}else{
									studyDetails += '<td><strong class="red">진도부족</strong></td>';
								}
								//중간 공란
								studyDetails += '<td>-</td>';
								
								//버튼노출
								studyDetails += '<td>'
								
								if(serviceType != 9){//테스트, 심사용 캡챠 제외
									if(data.totalProgress >= 49){//전체진도율 체크
									    if(data.testStatus == 'Y' || data.testStatus == 'C'){
											studyDetails += writeBtn('midTestComplete');
										}else if(midCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
											studyDetails += writeBtn('captchaMidTest');											
										}else{
											studyDetails += writeBtn('midTest');
										}
									}else{
										studyDetails += writeBtn('midTest','진도율 50% 이상 응시 가능합니다.');
									}
								}else{
									studyDetails += writeBtn('midTest');
								}

								studyDetails += '</td>'
								studyDetails += '</tr>';
								midTerm = null;
								i= i-1;
								midAfter = 'Y'
							}
						}
					}
					
					//최종평가
					if(useFinTest != null && (data.serviceType == 1 || data.serviceType == 9)){
						studyDetails += '<tr class="fintestLine">';
						studyDetails += '<td>[평가]</td>';
						studyDetails += '<th class="blue"><strong>최종평가</strong>';
						if(data.testStatus == 'N' || data.testStatus == 'V'){
							studyDetails += '</th>';
						} else {
							studyDetails += '<br />평가응시 시간 : '+data.testSaveTime+'<br />';
							studyDetails += '접속아이피 : '+data.testIP+'</th>';
						}
						if(data.totalProgress >= 79){
							if(data.testStatus == 'Y'){
								studyDetails += '<td><strong class="red">응시완료</strong></td>';
							}else if(data.testStatus == 'C'){
								studyDetails += '<td><strong class="red">'+data.testScore+'</strong>점</td>';
							}else if(data.testStatus = 'V' && data.nowTime >= data.testEndTime) {
								studyDetails += '<td><strong class="red">시간초과</strong></td>';
							}else{
								studyDetails += '<td>응시가능</td>';
							}
						}else{
							studyDetails += '<td><strong class="red">진도부족</strong></td>';
						}					
						studyDetails += '<td>-</td>'
						
						studyDetails += '<td>'
						
						if(serviceType != 9){//테스트, 심사용 캡챠 제외
							if(data.totalProgress >= 79){//전체진도율 체크
								if(data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus = 'V' && data.nowTime >= data.testEndTime)){
									studyDetails += writeBtn('finTestComplete');
								}else if(testCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
									studyDetails += writeBtn('captchaFinTest');
								}else{
									studyDetails += writeBtn('finTest');
								}
							}else{
								studyDetails += writeBtn('finTest','진도율 80% 이상 응시 가능합니다.');
							}
						}else{
							studyDetails += writeBtn('finTest');
						}	

						studyDetails += '</td>'
						studyDetails += '</tr>';
					}
					
					//
					//레포트
					if(useReport != null && (serviceType == 1 || serviceType == 9)){
						studyDetails += '<tr class="reportLine">';
						studyDetails += '<td>[과제]</td>';
						studyDetails += '<th class="blue"><strong>과제제출</strong>';
						if(data.reportStatus == 'N' || data.reportStatus == 'V'){
							studyDetails += '</th>';
						} else {
							studyDetails += '<br />과제제출 시간 : '+data.reportSaveTime+'<br />';
							studyDetails += '접속아이피 : '+data.reportIP+'</th>';
						}
						//메세지 출력
						if(data.totalProgress >= 79){
							if(data.reportStatus == 'Y'){
								studyDetails += '<td><strong class="red">응시완료</strong></td>';							
							}else if(data.reportStatus == 'C'){
								studyDetails += '<td><strong class="red">'+data.testScore+'</strong>점</td>';
							}else{
								studyDetails += '<td>응시가능</td>';
							}
						}else{
							studyDetails += '<td><strong class="red">진도부족</strong></td>';
						}
						studyDetails += '<td>-</td>';
						
						studyDetails += '<td>'
						//버튼출력
						if(serviceType != 9){//테스트, 심사용 캡챠 제외
							if(data.totalProgress >= 79){//전체진도율 체크
								if(data.reportStatus == 'Y' || data.reportStatus == 'C'){
									studyDetails += writeBtn('reportComplete');
								}else if(data.reportCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
									studyDetails += writeBtn('captchaReport');
								}else{
									studyDetails +=  writeBtn('reportWrite');
								}
							}else{
								studyDetails += writeBtn('reportWrite','진도율 80% 이상 응시 가능합니다.');
							}
						}else{
							studyDetails +=  writeBtn('reportWrite');
						}
						
						studyDetails += '</td>'
						studyDetails += '</tr>';
					}
					//과정목록관련부 끝

				}else{
					studyDetails += '<tr><td colspan="5">차시정보가 없습니다.</td></tr>';
				}
				studyDetails += '</table>';
				studyDetails += '</form>';

	
				if (renew == 'Y'){
					studyBlock.children('ul,table, form').remove();
				}
				studyBlock.addClass('openClass');
				studyBlock.children('div').after(studyDetails);
				
				//특수차시
				var prologue = ''
				var epilogue = ''
				
				var preTable = '<table><colgroup><col width="90px" /><col width="*" /><col width="160px" /><col width="92px" /></colgroup><tr>';
				var apTable = '</tr></table>'
				$.each(data.progress,function(){
					if(this.chapter >= 100 && this.chapter <= 109){
						prologue += '<tr>';
						prologue += '<td>-</td>';
						prologue += '<th><strong>'+this.chapterName+'</strong><br />';
						prologue += '<td class="Left"><strong class="red">진도율에 포함되지<br /> 않는 차시입니다.</strong></td>';
						prologue += '<td>';
						prologue += '<button type="button" title="수강하기" onclick="studyPop(this,\''+contentsData1+'\',\''+contentsData2+'\',\''+data.progress[i].player+'\',\''+sourceType+'\','+data.progress[i].chapter+',\'new\')"><img src="../images/study/btn_study.png" /></button>';
						prologue += '</td>';
						prologue += '</tr>';
					}else if(this.chapter >= 110 && this.chapter <= 119){
						epilogue += '<tr>';
						epilogue += '<td>-</td>';
						epilogue += '<th><strong>'+this.chapterName+'</strong><br />';
						epilogue += '<td class="Left"><strong class="red">진도율에 포함되지<br /> 않는 차시입니다.</strong></td>';
						epilogue += '<td>';
						epilogue += '<button type="button" title="수강하기" onclick="studyPop(this,\''+contentsData1+'\',\''+contentsData2+'\',\''+data.progress[i].player+'\',\''+sourceType+'\','+data.progress[i].chapter+',\'new\')"><img src="../images/study/btn_study.png" /></button>';
						epilogue += '</td>';
						epilogue += '</tr>';
					}
				})
				if(prologue != ''){
					studyBlock.children('form').append(preTable + prologue + apTable);
				}
				if(epilogue != ''){
					studyBlock.children('form').prepend(preTable + epilogue + apTable);
				}
			}else{ //인증 받기 전
				certPassModal(lectureStart,studySeq,contentsCode,lectureOpenSeq);
			}
		})
  	}
}
//테스트용
function checkform(checkNum){
	console.log($('.lectureForm'+checkNum).serialize());
}

//버튼 변환스크립트
function writeBtn(btnType,chapter){
	chapter = chapter ? chapter : '';
	var writes = '';
	
	if(btnType == 'study'){	//학습하기 관련
		if(typeof(chapter) == 'number'){
			writes += '<button type="button" title="학습하기" onclick="studyPop(this,'+chapter+',\'new\')">';
		}else{
			writes += '<button type="button" title="학습하기" onclick="alert(\''+chapter+'\')">';
		}
		writes += '<img src="../images/study/btn_study.png" alt="학습하기" /></button>';
		
	}else if(btnType == 'continue'){//이어보기 관련
		if(typeof(chapter) == 'number'){
			writes += '<button type="button" title="이어보기" onclick="studyPop(this,'+chapter+')">';
		}else{
			writes += '<button type="button" title="이어보기" onclick="alert(\''+chapter+'\')">';
		}		
		writes += '<img src="../images/study/btn_continuestudy.png" alt="이어보기" /></button>';
		
	}else if(btnType == 'midTest' || btnType == 'finTest'){//중간,최종평가관련
		if(chapter == ''){
			if(btnType == 'midTest'){
				writes += '<button type="button" title="평가응시" onclick="openStudyModal(\'mid\',this,this);">';
			}else{
				writes += '<button type="button" title="평가응시" onclick="openStudyModal(\'final\',this,this);">';
			}
		}else{
			writes += '<button type="button" title="평가응시" onclick="alert(\''+chapter+'\');">';
		}
		writes += '<img src="../images/study/btn_dotest.png" alt="평가응시" /></button>';
		
	}else if(btnType == 'reportWrite'){//과제응시관련
		if(chapter == ''){
			writes += '<button type="button" title="과제제출" onclick="openStudyModal(\'report\',this,this);">';
		}else{
			writes += '<button type="button" title="과제제출" onclick="alert(\''+chapter+'\');">';
		}
		writes += '<img src="../images/study/btn_doreport.png" alt="과제제출" /></button>';
		
	}else if(btnType == 'midTestComplete' || btnType == 'finTestComplete' ){//평가응시완료관련
		if(btnType == 'midTestComplete'){
			writes += '<button type="button" title="응시완료" onclick="resultAct(\'test\',this,this,\'mid\')">';
		}else{
			writes += '<button type="button" title="응시완료" onclick="resultAct(\'test\',this,this,\'final\')">';
		}
		writes += '<img src="../images/study/btn_resuttest.png" alt="응시완료" /></button>';
		
	}else if(btnType == 'reportComplete'){//과제제출완료관련
		writes += '<button type="button" title="응시완료" onclick="resultAct(\'report\',this,this,\'\')">';
		writes += '<img src="../images/study/btn_resutreport.png" alt="제출완료" /></button>';
			
	}else if(btnType == 'captchaStudy' || btnType == 'captchaContinue' || btnType == 'captchaMidTest' || btnType == 'captchaFinTest' || btnType == 'captchaReport'){//캡챠관련
		var captchaLink = 'captcha_re2.php?';
		var btnImages = '';
		var btnTitles = '';
		if(btnType == 'captchaStudy'){
			btnTitles = '학습하기'
			captchaLink += 'chapter='+chapter+'&viewNew=new';
			btnImages = '<img src="../images/study/btn_study.png" alt="학습하기" />';
		}else if(btnType == 'captchaContinue'){
			btnTitles = '이어보기'
			captchaLink += 'chapter='+chapter;
			btnImages = '<img src="../images/study/btn_continuestudy.png" alt="이어보기" />';
		}else if(btnType == 'captchaMidTest' || btnType == 'captchaFinTest'){
			btnTitles = '평가응시'
			btnImages = '<img src="../images/study/btn_dotest.png" alt="평가응시" />';
		}else if(btnType == 'captchaReport'){
			btnTitles = '과제제출'
			btnImages = '<img src="../images/study/btn_doreport.png" alt="과제제출" />';
		}
		writes += '<button type="button" title="'+btnTitles+'" onclick="capchaRun(this,\''+btnType+'\',\''+captchaLink+'\')">'
		writes += btnImages
		writes += '</button>'
	}
	return writes 
}

function capchaRun(obj,types,links){
	chkform = $(obj).parents('form')
	if(types == 'captchaMidTest'){
		links += 'type=mid&chapter=n';
	}else if(types == 'captchaFinTest'){
		links += 'type=final&chapter=n';
	}else if(types == 'captchaReport'){
		links += 'type=report&chapter=n';
	}else{
		links += '&type=study'
	}
	links += '&contentsCode='+chkform.children('input[name="contentsCode"]').val();
	links += '&lectureOpenSeq='+chkform.children('input[name="lectureOpenSeq"]').val();
	links += '&studySeq='+chkform.children('input[name="seq"]').val();
	popOpen = window.open(links,"captcha","top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy");
	popOpen.focus();
}

function studyPop(obj,chapter,types){
	types = types ? types : '';	
	var runningForm =''
	if(typeof(obj) == 'object'){
		runningForm = $(obj).parents('form');
	}else{
		runningForm = $('form.lectureForm'+obj);
	}
	runningForm.children('input[name="chapter"]').val(chapter);
	runningForm.children('input[name="types"]').val(types);
	var popupAddress = runningForm.attr('action');
	var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","kiraedu")
	runningForm.submit();
	//진도체크 스크립트
	var checkSeq = runningForm.children('input[name="seq"]').val()//seq
	var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
	var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq
	progressCheck(checkSeq,checkCode,checkOpenSeq,chapter)
}

//평가완료 후 결과창
function resultAct(types,contentsCode,lectureOpenSeq,testType){
	if(testType == '') {
		testType = 'report';
	}
	if(typeof(contentsCode)=='object'){
		contentsCode = $(contentsCode).parents('form').children('input[name="contentsCode"]').val();
	}
	if(typeof(lectureOpenSeq)=='object'){
		lectureOpenSeq = $(lectureOpenSeq).parents('form').children('input[name="lectureOpenSeq"]').val();
	}
	$.get(resultApi,'lectureOpenSeq='+lectureOpenSeq+'&testType='+testType,function(data){
		if(testType == 'mid') {
			alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과 보기는 학습이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
		} else if(testType == 'final') {
			if(data.totalCount == data.userCount) {
				alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과 보기는 학습이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
			} else {
				alert('출제된 '+data.totalCount+'문항 중 '+data.userCount+'문항 응시 완료하였습니다. 결과 보기는 학습이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
			}
		} else {
			alert('과제제출을 완료하였습니다. 결과 보기는 학습이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다. ');
		}
	})
}

//post관련 업데이트
//1-진도변경
function progressCheck(checkSeq,checkCode,checkOpenSeq,checkchapter){
	clearInterval(progressTime);
	var progressCheckTime = 10000; //진도체크시간
	//진도보내기 시간별
	progressTime = setInterval(function(){progressChange(checkSeq,checkCode,checkOpenSeq,checkchapter)},progressCheckTime)	
	//alert(checkSeq+'/'+checkCode+'/'+checkOpenSeq+'/'+cehckchapter)
}

//진도체크에 따른 강의보기 기능
function progressChange(checkSeq,checkCode,checkOpenSeq,checkchapter){
	var check= $.get(chapterApi,'contentsCode='+checkCode+'&lectureOpenSeq='+checkOpenSeq,function(data){
		var midCaptchaTime = data.midCaptchaTime;
		var testCaptchaTime = data.testCaptchaTime;
		var reportCaptchaTime = data.reportCaptchaTime;
		if(midCaptchaTime == null){
			midCaptchaTime = '0000-00-00'
		}
		if(testCaptchaTime == null){
			testCaptchaTime = '0000-00-00'
		}
		if(reportCaptchaTime == null){
			reportCaptchaTime = '0000-00-00'
		}
		
		var today = data.nowTime.substr(0,10)
		$('.list'+checkSeq+' .totlaProgress01').html(data.totalProgress); //상단영역 진도율 갱신
		var chapterProgress = data.progress[(checkchapter-1)].progress;
		var changeTr = $('.lecture'+checkSeq+checkchapter);
		changeTr.children('td').eq(1).html(chapterProgress+'%');
		//버튼 및 평가응시에 따른 버튼 노출 변수
		var nowTime = data.nowTime
		//이어보기 버튼 노출
		if(chapterProgress >= 1 && changeTr.children('td').eq(2).html() == '-'){
			if((nowTime >= captchaBanStart && nowTime <= captchaBanEnd) || (checkchapter-1)%captchaCnt != 0){//캡챠체크
				changeTr.children('td').eq(2).html(writeBtn('continue',checkchapter));
			}else{//이어보기 캡챠
				changeTr.children('td').eq(2).html(writeBtn('captchaContinue',checkchapter));
			}
		}else if(chapterProgress >= 80 && changeTr.next('tr').attr('class') == 'lecture'+checkSeq+(checkchapter+1) && changeTr.next('tr').children('td').last().children('button').attr('onclick').substr(0,5)=='alert'){//다음차수 수강 가능하도록 버튼변경				
			console.log('aa')
			if((nowTime >= captchaBanStart && nowTime <= captchaBanEnd) || (checkchapter-1)%captchaCnt != 0){//캡챠체크
				changeTr.next('tr').children('td').last().html(writeBtn('study',(checkchapter+1)));
			}else{//이어보기 캡챠
				changeTr.next('tr').children('td').last().html(writeBtn('captchaStudy',(checkchapter+1)));
			}
		}
		
		//진도율에 따른 평가 응시기능
		if(data.totalProgress >= 50){
			//console.log($('.list'+checkSeq+' tr.midtestLine').children('td').last().children('button').attr('onclick').substr(0,5))
			if($('.list'+checkSeq+' tr.midtestLine').children('td').last().children('button').attr('onclick').substr(0,5)=='alert'){
				console.log('aaa')
				//버튼작성 버튼 변수
				var midBtnWrite =''
				
				//중간평가버튼 노출
				if(data.serviceType != 9){//테스트, 심사용 캡챠 제외					
					if(midCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
						midBtnWrite += writeBtn('captchaMidTest');
					}else{
						midBtnWrite += writeBtn('midTest');
					}
				}else{
					midBtnWrite += writeBtn('midTest');
				}
				$('.list'+checkSeq+' tr.midtestLine').children('td').last().html(midBtnWrite)
				$('.list'+checkSeq+' tr.midtestLine').children('td').eq(1).html('<storng class="blue">응시가능</strong>')
			}
		}else if(data.totalProgress >= 80){
			console.log('fin')
			if($('.list'+checkSeq+' tr.fintestLine').children('td').last().children('button').attr('onclick').substr(0,5)=='alert' || $('.list'+checkSeq+' tr.reportLine').children('td').last().children('button').attr('onclick').substr(0,5)=='alert'){
				var finBtnWrite ='';
				var reportBtnWrite ='';
				if(data.serviceType != 9){//테스트, 심사용 캡챠 제외			
					//최종평가 버튼 노출
					if(testCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
						finBtnWrite += writeBtn('captchaFinTest');
					}else{
						finBtnWrite += writeBtn('finTest');
					}
					//레포트 버튼 노출
					if(reportCaptchaTime.substr(0,10) != today && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
						reportBtnWrite += writeBtn('captchaReport');
					}else{
						reportBtnWrite +=  writeBtn('reportWrite');
					}
					//
				}else{
					finBtnWrite += writeBtn('finTest');
					reportBtnWrite += writeBtn('reportWrite');
				}
				$('.list'+checkSeq+' tr.fintestLine').children('td').last().html(finBtnWrite)
				$('.list'+checkSeq+' tr.reportLine').children('td').last().html(reportBtnWrite)
			}
		}
	})
}
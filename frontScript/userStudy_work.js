var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var studySeq = '';
var contentsCode = '';
var lectureOpenSeq = '';
var userID = '';

function listAct(){
	var contents = '';
	contents += '<ul>';
	contents += '</ul>';
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		var totalCount = data.totalCount;
		var lists = '';
		if (totalCount != 0){
			$.each(data.study, function(){
				lists += '<li class="list'+this.seq+'">';
				lists += '<div class="summuryArea" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')">';
				lists += '<ul>';
				lists += '<li><h1>남은 수강일</h1><strong>'+this.leftDate+'</strong>일</li>';
				lists += '<li><h1>강의 진도</h1><strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				lists += '<li><h1>진도율</h1><strong>'+this.progress+'</strong>%</li>';
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
		} else {
			lists += '<li><div class="summuryArea"><ul>강의가 없습니다.</ul></div></li>';
		}
		$('#contentsArea > ul').html(lists);
		$('#titleArea h3 strong.blue').html(totalCount);
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq,renew){
	studySeq = studySeq ? studySeq : '';
	contentsCode = contentsCode ? contentsCode : '';
	lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
	
	var studyBlock = $('.list'+studySeq);
	
	if (studyBlock.has('table').length != 0 && renew != 'Y'){
		studyBlock.children('ul,table').remove();
		studyBlock.removeClass('openClass');
	}else{
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			var totalCount = data.totalCount;
			var ContentsCode = data.contentsCode;
			var lectureOpenSeq = data.lectureOpenSeq;
			var studyDetails = '';
			var useMidTest = data.midStatus;
			var useFinTest = data.testStatus;
			var useReport = data.reportStatus;
			
			var today = new Date(data.nowTime);
			var dd = today.getDate();
			if(dd <= 9){ dd = '0'+dd }
			var mm = today.getMonth()+1; //January is 0!
			if(mm <= 9){ mm = '0'+mm }
			var yy = today.getFullYear();
			today = yy+'-' + mm+'-'+dd;
			
			if (totalCount != 0){
				
				/*수료기준*/
				studyDetails += '<table class="passCheck"><tr>';
				studyDetails += '<td colspan="6" class="title">수료기준</td>'
				studyDetails += '</tr>';
				studyDetails += '<th>수강정원</th>';
				studyDetails += '<th>총 진도율</th>';
				studyDetails += '<th>중간평가</th>';
				studyDetails += '<th>최종평가</th>';
				studyDetails += '<th>과제</th>';
				studyDetails += '</tr><tr>';
				studyDetails += '<td rowspan="2"><strong>'+data.limit+'</strong>명</td>';
				studyDetails += '<td rowspan="2"><strong>'+data.passProgress+'</strong>% 이상</td>';
				studyDetails += '<td>총&nbsp;<strong>';
				if(this.totalPassMid != 0){
					studyDetails += data.totalPassMid+'</strong>점 / <strong>'+data.midRate+'</strong>% 반영';
				}
				studyDetails += '</td>';
				studyDetails += '<td>총&nbsp;<strong>';
				if(this.totalPassTest != 0){
					studyDetails += data.totalPassTest+'</strong>점 / <strong>'+data.testRate+'</strong>% 반영';
				}
				studyDetails += '</td>';
				studyDetails += '<td>총&nbsp;<strong>';
				if(this.totalPassReport != 0){
					studyDetails += data.totalPassReport+'</strong>점 / <strong>'+data.reportRate+'</strong>% 반영';
				}
				studyDetails += '</td>';
				studyDetails += '</tr><tr>';
				studyDetails += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상</td>';
				studyDetails += '</tr></table>';

				//평가관련
				studyDetails += '<ul>';
				
				//중간평가
				var midStatus = '';
				if(data.totalProgress <= 49 && data.midStatus != null){
					midStatus = '<strong class="red">진도부족</strong>'
					studyDetails += '<li class="middleTest" onClick="alert(\'진도율이 50% 미만입니다.\')"><h1>중간평가</h1>';
					studyDetails += midStatus;
					studyDetails += '<br /><span>진도율 50%부터 응시가능</span>';
					studyDetails += '</li>';
				}else if(data.midStatus == null){
					midStatus = '<strong>평가 없음</strong>'
					studyDetails += '<li class="middleTest" onClick="alert(\'평가가 없습니다.\')"><h1>중간평가</h1>';
					studyDetails += midStatus;
					studyDetails += '<br /><span>평가가 없는 과정</span>';
					studyDetails += '</li>';
				}else{
					var midLink ='';
					var midComment = '';
					if(data.midStatus == 'N' || data.midStatus == 'V') {
						if( data.midCaptchaTime != null && data.midCaptchaTime.substr(0,10) == today){
							midLink = 'onClick="openStudyModal(\'mid\',\''+contentsCode+'\','+lectureOpenSeq+')"';
						}else{
							var captchaLink = 'captcha.php?type=mid&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
							midLink = 'onClick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
						}
						if(data.midStatus == 'N'){
							midStatus = '<strong class="blue">응시하기</strong>'
							midComment = '<br /><span>응시마감 : '+data.lectureEnd.substr(0,10)+' 23:50</span>';
						}else{
							midStatus = '<strong class="blue">응시중</strong>'
							midComment = '<br /><span>응시마감 : '+data.lectureEnd.substr(0,10)+' 23:50</span>';
						}
					} else if(data.midStatus == 'Y' || data.midStatus == 'C') {
						midLink = 'onClick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'mid\')"';
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
					studyDetails += '<li class="lastTest" onClick="alert(\'진도율이 80% 미만입니다.\')"><h1>최종평가</h1>';
					studyDetails += testStatus;
					studyDetails += '<br /><span>진도율 80%부터 응시가능</span>';
					studyDetails += '</li>';
				}else if(data.testStatus == null){
					testStatus = '<strong>평가 없음</strong>'
					studyDetails += '<li class="middleTest" onClick="alert(\'평가가 없습니다.\')"><h1>최종평가</h1>';
					studyDetails += testStatus;
					studyDetails += '<br /><span>평가가 없는 과정</span>';
					studyDetails += '</li>';
				}else{
					var testLink = '';
					var testComment = '';
					if(data.testStatus == 'N') {
						if (data.testCaptchaTime != null && data.testCaptchaTime.substr(0,10) == today ){
							testLink = 'onClick="openStudyModal(\'test\',\''+contentsCode+'\','+lectureOpenSeq+')"';
						}else{
							var captchaLink = 'captcha.php?type=test&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
							testLink = 'onClick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
						}
						testLink = 'onClick="openStudyModal(\'test\',\''+contentsCode+'\','+lectureOpenSeq+')"';
						testStatus = '<strong class="blue">응시하기</strong>'
						testComment = '<br /><span>시험시간 1시간</span>'
					} else if(data.testStatus == 'V') {
						if(new Date(data.nowTime) >= new Date(data.testEndTime)) {
							testLink = 'onClick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')"';
							testStatus = '<strong class="red">응시완료</strong>'
							testComment = '<br /><span>시간초과로 인한 응시종료</span>';
						} else {
							if (data.testCaptchaTime != null && data.testCaptchaTime.substr(0,10) == today ){
								testLink = 'onClick="openStudyModal(\'test\',\''+contentsCode+'\','+lectureOpenSeq+')"';
							}else{
								var captchaLink = 'captcha.php?type=test&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
								testLink = 'onClick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
							}
							testStatus = '<strong class="blue">응시중</strong>'
							testComment = '<br /><span>'+data.testEndTime.substr(10)+' 까지 응시가능</span>';
						}
					} else if(data.testStatus == 'Y' || data.testStatus == 'C') {
						testLink = 'onClick="resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')"';
						if(data.testStatus == 'Y'){
							testStatus = '<strong class="red">응시완료</strong>'
						}else if(data.testStatus == 'C'){
							testStatus = '<strong class="red">'+data.testScore+'</strong>점';
						}
						testComment = '<br /><span>'+data.testSaveTime.substr(0,10)+' 응시완료</span>';
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
					studyDetails += '<li class="report" onClick="alert(\'진도율이 80% 미만입니다.\')"><h1>과제제출</h1>';
					studyDetails += reportStatus;
					studyDetails += '<br /><span>진도율 80%부터 제출가능</span>';
					studyDetails += '</li>';
				}else if(data.reportStatus == null){
					reportStatus = '<strong>과제 없음</strong>'
					studyDetails += '<li class="report" onClick="alert(\'과제가 없습니다.\')"><h1>과제제출</h1>';
					studyDetails += reportStatus;
					studyDetails += '<br /><span>평가가 없는 과정</span>';
					studyDetails += '</li>';
				}else{
					var reportComment = '';
					if(data.reportStatus == 'N') {
						if(data.reportCaptchaTime != null && data.reportCaptchaTime.substr(0,10) == today ){
							reportLink = 'onClick="openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')"';
						}else{
							var captchaLink = 'captcha.php?type=report&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
							reportLink = 'onClick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
						}
						reportStatus = '<strong class="blue">응시하기</strong>'
					} else if(data.reportStatus == 'Y') {
						reportLink = 'onClick="resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')"';
						reportStatus = '<strong class="red">응시완료</strong>'
						reportComment = '<br /><span>제출일 : '+data.reportSaveTime+'</span>';
					} else if(data.reportStatus == 'C') {
						reportLink = 'onClick="resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')"';
						reportStatus = '<strong class="red">'+data.reportScore+'</strong>점';
						reportComment = '<br /><span>제출일 : '+data.reportSaveTime+'</span>';
					} else {
						reportStatus = '과제없음';
					    reportComment += '<br /><span>평가가 없는 과정</span>';
					}
					studyDetails += '<li class="report" '+reportLink+'><h1>제출과제</h1>';
					studyDetails += reportStatus;
					studyDetails += reportComment;
					studyDetails += '</li>';
				}
				
				studyDetails += '</ul>';
				
				studyDetails += '<table>';
				studyDetails += '<colgroup><col width="90px" /><col width="*" /><col width="90px" /><col width="92px" /><col width="92px" /></colgroup>';
				var midTerm = Math.ceil(Number(totalCount)/2);
				//강의 활성용 오늘날짜 호출

				var todayCount = 0;
				var btnUse = '';
				for(i=0;i<totalCount;i++){
					if(i != midTerm){
						if( i == 0 ){btnUse = 'Y'}

						if(data.progress[i].endTime != null){
						    if(data.progress[i].endTime.substr(0,10) == today){
								todayCount ++;
							}
						}
						studyDetails += '<tr>';
						studyDetails += '<td>'+data.progress[i].chapter+'차시</td>';
						studyDetails += '<th><strong>'+data.progress[i].chapterName+'</strong><br />';
						if(data.progress[i].endTime != null){
							studyDetails += '교육이수 시간 : '+data.progress[i].endTime+'<br />';
							studyDetails += '접속아이피 : '+data.progress[i].studyIP+'</th>';
						}
						studyDetails += '<td>'+data.progress[i].progress+'%</td>';
						if(data.progress[i].progress != 0){
							studyDetails += '<td><button type="button" title="이어보기" ';
							if((i+2)%6 == 0 || i == 0){
								var captchaLink = 'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq;
								studyDetails += 'onclick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
							}else{
								studyDetails += 'onclick="studyPop(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\')';
							}
							studyDetails += '"><img src="../images/study/btn_continuestudy.png" /></button></td>';
						}else{
							studyDetails += '<td>-</td>';
						}
						if(data.progress[i].startTime != null || (btnUse != 'N' && todayCount <= 5)){
							studyDetails += '<td><button type="button" title="수강하기"';
							if((i+2)%6 == 0 || i == 0){
								var captchaLink = 'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'&viewNew=new';
								studyDetails += 'onclick="window.open(\''+captchaLink+'\',\'자동등록방지캡챠시스템\',\'menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no\',\'esangStudy\')"';
							}else{
								studyDetails += 'onclick="studyPop(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'new\')';
							}
							studyDetails += '"><img src="../images/study/btn_study.png" /></button></td>';
						}else{
							studyDetails += '<td>-</td>';
						}
						studyDetails += '</tr>';
						if(Number(data.progress[i].progress) >= 80){
							btnUse = 'Y';
						}else{
							btnUse = 'N';
						}
					}else if (i == midTerm && useMidTest != null){
					  studyDetails += '<tr class="testLine">';
					  studyDetails += '<td>[평가]</td>';
					  studyDetails += '<th class="blue"><strong>중간평가</strong></th>';
					  studyDetails += '<td>'+midStatus+'</td>';
					  studyDetails += '<td>-</td>';
					  if(data.totalProgress <= 49 || data.midStatus == null){
						  studyDetails += '<td>-</td>';
					  }else {
						  studyDetails += '<td><button type="button" onClick="openStudyModal(\'mid\',\''+contentsCode+'\','+lectureOpenSeq+')" title="평가응시"><img src="../images/study/btn_dotest.png" /></button></td>';
					  }
					  studyDetails += '</tr>';
					  midTerm = null;
					  i= i-1;
					}
				}
				if(useFinTest != null){
					studyDetails += '<tr class="testLine">';
					studyDetails += '<td>[평가]</td>';
					studyDetails += '<th class="blue"><strong>최종평가</strong></th>';
					studyDetails += '<td>'+testStatus+'</td>';
					studyDetails += '<td>-</td>';
					if(data.totalProgress <= 79 || data.testStatus == null){
						studyDetails += '<td>-</td>';
					}else{
						studyDetails += '<td><button type="button" onClick="openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')" title="평가응시"><img src="../images/study/btn_dotest.png" /></button></td>';
					}
					studyDetails += '</tr>';
				}
				if(useReport != null){
					studyDetails += '<tr class="testLine">';
					studyDetails += '<td>[과제]</td>';
					studyDetails += '<th class="blue"><strong>과제제출</strong></th>';
					studyDetails += '<td>'+reportStatus+'</td>';
					studyDetails += '<td>-</td>';
					if(data.totalProgress <= 79 || data.reportStatus == null){
						studyDetails += '<td>-</td>';
					}else{
						studyDetails += '<td><button type="button" onClick="openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')" title="평가응시"><img src="../images/study/btn_dotest.png" /></button></td>';
					}
					studyDetails += '</tr>';
				}
			}else{
				studyDetails += '<tr><td colspan="5">차시정보가 없습니다.</td></tr>';
			}
			studyDetails += '</table>';			

			if (renew == 'Y'){
				studyBlock.children('ul,table').remove();
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
					prologue += '<button type="button" title="수강하기" onclick="studyPop(\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\')"><img src="../images/study/btn_study.png" /></button>';
					prologue += '</td>';
					prologue += '</tr>';
				}else if(this.chapter >= 110 && this.chapter <= 119){
					epilogue += '<tr>';
					epilogue += '<td>-</td>';
					epilogue += '<th><strong>'+this.chapterName+'</strong><br />';
					epilogue += '<td class="Left"><strong class="red">진도율에 포함되지<br /> 않는 차시입니다.</strong></td>';
					epilogue += '<td>';
					epilogue += '<button type="button" title="수강하기" onclick="studyPop(\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\')"><img src="../images/study/btn_study.png" /></button>';
					epilogue += '</td>';
					epilogue += '</tr>';
				}
			})
			if(prologue != ''){
				studyBlock.children('ul').after(preTable + prologue + apTable);
			}
			if(epilogue != ''){
				studyBlock.children('button').before(preTable + epilogue + apTable);
			}
			
		})
  	}
}

function studyPop(studySeq,contentsCode,chapter,lectureOpenSeq,types){
	popupAddress = 'popupStudy.php?seq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&types='+types;
	window.open(popupAddress,"이상에듀학습창","menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy")
}

function resultAct(types,contentsCode,lectureOpenSeq,testType){
	popupAddress = 'popupResult.php?types='+types+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&testType='+testType;
	window.open(popupAddress,"결과보기","menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","previewContents")
}
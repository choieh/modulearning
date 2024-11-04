$(document).ready(function(){
	ajaxAct();
})

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		var totalCount = data.totalCount;
		var lists = '';
		if (totalCount != 0){
			$.each(data.study, function(){
				lists += '<article id="list'+this.seq+'">';

				//상단 타이틀
				lists += '<div ';
				if(this.mobile == 'Y' || (loginUserLevel == '12' && this.userName == "콘텐츠심사")){
					if(this.serviceType != 8){
						if(loginUserID == 'zeroha2') {
							if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
								lists += 'onclick="alert(\'환급과정 완료 후 수강 하실 수 있습니다.\')"';
							} else {
								lists += 'onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"';
							}
						} else {
							lists += 'onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"';
						}
					}else{
						lists += 'onclick="joinLMS('+this.seq+',\'study\')"';
					}
				}else{
					lists += 'class="notMobile" onclick="alert(\'모바일을 지원하지 않는 과정입니다.\\n\\nPC로 수강하시기 바랍니다.\')"';
				}
				lists += '>';
				lists += '<button type="button" title="버튼"></button>';
				lists += '<h1>'+this.contentsName+'</h1>';
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2>';
				lists += '<ul>';
				lists += '<li>남은 수강일 <strong>'+this.leftDate+'</strong>일</li>';
				lists += '<li>강의 진도 <strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				lists += '<li>진도율 <strong>'+this.progress+'</strong>%</li>';
				lists += '</ul>';
				lists += '</div>';
				lists += '</article>';
			})
		} else {
			lists += '<article class="noList">강의가 없습니다.</article>';
		}
		$('#studyPage > section').html(lists);
		$('#studyPage hgroup h1 strong').html(totalCount);
		if(contentsCode != ''){
			viewStudyDetail(studySeq,contentsCode,lectureOpenSeq)
			top.location.href='#list'+studySeq;
		}
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq,renew){

	studySeq = studySeq ? studySeq : '';
	contentsCode = contentsCode ? contentsCode : '';
	lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
	var studyBlock = $('#list'+studySeq);

	if (studyBlock.has('ol').length != 0 && renew != 'Y'){
		studyBlock.children('ol').remove();
		studyBlock.removeClass('openStudy');
	}else{
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			var totalCount = data.totalCount;
			var ContentsCode = data.contentsCode;
			var lectureOpenSeq = data.lectureOpenSeq;
			var studyDetails = '';
			var useMidTest = data.midStatus;
			var useFinTest = data.testStatus;
			var useReport = data.reportStatus;
			var sourceType = data.sourceType;
			var mobileSourceType = data.mobileSourceType;
			var midTerm = data.midTestChapter;
			//2018-04-18 본인인증 1일 1회(강혜림 추가)
			// var certDate = data.certDate; 
			// if(certDate){
			// 	certDate = certDate.substr(0,10);
			// }
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			today = yyyy+'-'+mm+'-'+dd;

			if (totalCount != 0){
				//2018-04-18 본인인증 1일 1회(강혜림 추가)
				//var certPassQuery = (((data.serviceType == '1' || data.serviceType == '2') && today == certDate && data.contentsAccredit >= '2018-04-30'));
				var certPassQuery = (((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'Y'));
				if(certPassQuery || data.serviceType == '3' || data.serviceType == '9' || data.serviceType == '5'){

					if(data.lectureOpenSeq == '11056' || data.lectureOpenSeq == '11057') {
						$.get('../research/apiResearch.php',{'attendCheck':'Y','seq':'4'},function(data){
							if(data.result != 'Y') {
								//alert('사전설문조사 참여 후 수강하실 수 있습니다.\r\r설문조사로 이동합니다.');
								top.location.href="../research/index.php?seq=4";
							}
						})
					}

					studyDetails += '<ol>';

					//강의 활성용 오늘날짜 호출
					var today = new Date(data.nowTime);
					var today2 = data.nowTime;
					var dd = today.getDate();
					if(dd <= 9){ dd = '0'+dd }
					var mm = today.getMonth()+1; //January is 0!
					if(mm <= 9){ mm = '0'+mm }
					var yy = today.getFullYear();
					today = yy+'-' + mm+'-'+dd;
					var todayCount = 0;
					var btnUse = 'Y';
					//var i = 0;
					var Sid = data.contentsCode + data.lectureStart.substr(2,2) + data.lectureStart.substr(5,2) + data.lectureStart.substr(8,2) + data.lectureEnd.substr(8,2);


						//중간평가
						var midStatus = '';
						if(data.midStatus == null){
							midStatus = '<strong>평가 없음</strong>';
							midComment = '';
						}else{
							var midComment = '';
								if(data.midStatus == 'Y' || data.midStatus == 'C' || data.midStatus == 'V'){
									if(data.midStatus == 'Y' || data.midStatus == 'V'){
										midStatus = '<strong class="red">응시완료</strong>채점 전';
									} else if( data.midStatus == 'C' ){ 
										if(data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
											midStatus = '<strong class="red">'+data.midScore+' 점</strong>반영점수 : '+data.conversionMid+'점';
										} else {
											midStatus = '<strong class="red">응시완료</strong>채점 전';
										}
									}
								}else if(data.midStatus == 'N'){
									midStatus = '<strong class="red">미응시</strong>'
									midComment = '<span>응시기록없음</span>';
								}
						}
						
						//최종평가
						var testStatus = '';
						if(data.testStatus == null){
							testStatus = '<strong>평가 없음</strong>';
							testComment = '';
						}else{
							var testComment = '';
							if(data.testStatus == 'Y' || data.testStatus == 'C' || data.testStatus == 'V'){
								if(data.testStatus == 'Y' || data.testStatus == 'V'){
									testStatus = '<strong class="red">응시완료</strong>채점 전'
								}else if (data.testStatus == 'C'){
									if(data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
										testStatus = '<strong class="red">'+data.testScore+' 점</strong>반영점수 : '+data.conversionTest+'점';
									} else { 
										testStatus = '<strong class="red">응시완료</strong>채점 전';
									}
								}
							}else if(data.testStatus == 'N'){
								testStatus = '<strong class="red">미응시</strong>'
								testComment = '<strong>응시기록없음</strong>';
							}
							//최종평가
						}
						
						//과제제출
						var reportStatus = '';
						var reportComment = '';
						if(data.reportStatus == null){
							reportStatus = '<strong>과제 없음</strong>';
							reportComment = '';
						}else{
							if(data.reportStatus == 'Y') {
									reportStatus = '<strong class="red">응시완료</strong>채점 전';
									//reportStatus = '<strong class="red">응시완료</strong>';
									//reportComment = '<br /><span>채점 전</span>';

							} else if(data.reportStatus == 'C') { 
								if(data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
									reportStatus = '<strong class="red">'+data.reportScore+' 점</strong>';
									if(data.reportCopy == 'Y') {
										reportStatus += ' - 모사답안';
									}
									reportComment = '<br />반영점수 : '+data.conversionReport+'점';
								} else { 
									reportStatus = '<strong class="red">응시완료</strong>채점 전';
									//reportStatus = '<strong class="red">응시완료</strong>';
									//reportComment = '<br /><span>채점 전</span>';
								}

							} else if(data.reportStatus == 'N') {
								reportStatus = '<strong class="red">미제출</strong>'
								reportComment = '<span>제출기록없음</span>';
							}
						}

					studyDetails +='<li style="padding:0;"><ul class="progress" onclick="alert(\'PC에서만 응시 가능 합니다.\')">';
					studyDetails +='<li class="type01"><h1>중간평가 : <strong>'+midStatus+'</strong> | <strong>'+midComment+'</strong></h1></li>';
					studyDetails +='<li class="type02"><h1>최종평가 : <strong>'+testStatus+'</strong> | <strong>'+testComment+'</strong></h1></li>';
					studyDetails +='<li class="type03"><h1>과제제출 : <strong>'+reportStatus+'</strong> | <strong>'+reportComment+'</strong></h1></li>';
					studyDetails +='</ul></li>';


					/*진도율, 랭킹 출력*/
					studyDetails +='<ul class="progress">';
					studyDetails +='<li class="type01"><h1>권장진도율<strong>'+data.suggestProgress+'<span>%</span></strong></h1><div><p style="width:'+data.suggestProgress+'%"></p></div></li>';
					studyDetails +='<li class="type02"><h1>내 진도율<strong>'+data.totalProgress+'<span>%</span></strong></h1><div><p style="width:'+data.totalProgress+'%"></p></div></li>';
					studyDetails +='<li class="type03"><h1>평균진도율<strong>'+data.aveProgress+'<span>%</span></strong></h1><div><p style="width:'+data.aveProgress+'%"></p></div></li>';
					studyDetails +='</ul>';



					for (i = 0 ; i<totalCount; i++){
						if(data.progress[i].endTime != null){
							if(data.progress[i].endTime.substr(0,10) == today){
								todayCount ++;
							}
						}

						if(data.progress[i].lastPage == null) {
							var lastPage = 1;
						} else {
							var lastPage = data.progress[i].lastPage;
						}
						if(data.progress[i].mobileLastPage == null) {
							var mobileLastPage = 1;
						} else {
							var mobileLastPage = data.progress[i].mobileLastPage;
						}

						if (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9){  // 환급 과정일때만 평가 항목 출력
							if(i == midTerm){
								if(data.midStatus != 'Y'){
									btnUse = 'N'
								}
							}							
							if (data.serviceType == 9) {
								btnUse = 'Y';
								todayCount = 1;
							}
							if( btnUse == 'Y' && todayCount <= 8 ){
								if(i%8 == 0 || i == 0){
									if(today2 >= '2018-12-14 13:00:00' && today2 <= '2018-12-14 18:00:00') {	//캡차 제외 처리
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									} else {
										if(data.serviceType == 1 || data.serviceType == 2) {
											//if(loginUserID == 'zeroha3416' || loginUserID == 'eungmin2') {
												studyDetails += '<li onclick="top.location.href=\'hrdOTP_mobile.php?mobileYN=Y&type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'&mobileSourceType='+mobileSourceType+'&lectureStart='+data.lectureStart+'\'">';
											//} else {
											//	studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'&mobileSourceType='+mobileSourceType+'\'">';
											//}
										} else {
											studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
										}
										//studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'\'">';
									}
								} else {
									if(data.progress[i].progress != 0){
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}else{
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}
								}

								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
							}else{
								if(i == midTerm){
									if(data.midStatus != 'Y' && data.midStatus != 'C' && midTerm!=0){ //2017-07-03 서영기
										studyDetails += '<li onclick="alert(\'중간평가 응시완료 후 다음 차시 학습이 가능합니다. PC에서만 응시 가능합니다.\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									}else{
										if(data.progress[i].progress != 0){
											studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
												studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
										}else{
												studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
												studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
										}
                  }
								} else {
									if(todayCount >= 8) {
										studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									} else {
										studyDetails += '<li onclick="alert(\'전 차시의 진도율이 부족합니다. (80% 이상).\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									}
								}
							}
          
							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}
           
						} else { // 비환급
							if(btnUse == 'Y' && todayCount <= 8){
								if(data.progress[i].progress != 0){
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}else{
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}
								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
							}else{
								if(todayCount >= 8) {
									studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
									studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								} else {
									studyDetails += '<li onclick="alert(\'전 차시의 진도율이 부족합니다. (80% 이상).\')">';
									studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								}
							}
							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}
						}
						studyDetails += '</li>';
						if(data.progress[i].progress <= 79){
							btnUse = 'N'
						}else{
							//if (data.serviceType == 1 || data.serviceType == 9){  // 환급 과정일때만 평가 항목 출력
								if(todayCount >= 8){
									btnUse = 'N'
								} else {
									btnUse = 'Y'
								}
							//}
						}
					}
					studyDetails += '</ol>';
				} else {
					alert('최초 수강 시 본인인증절차를 거쳐야 합니다.');
					certMove(lectureOpenSeq,data.lectureStart,ContentsCode);
				}
			}else{
				alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
				location.href="/m/login.html";
			}
			if (renew == 'Y'){
				studyBlock.children('ol').remove();
			}
			studyBlock.addClass('openStudy');
			studyBlock.children('div').after(studyDetails);
			/*
			//특수차시
			var prologue = ''
			var epilogue = ''

			$.each(data.progress,function(){
				if(this.chapter >= 100 && this.chapter <= 109){
					prologue += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
					prologue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					prologue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					prologue += '<h1>'+this.chapterName+'</h1>';
					prologue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					prologue += '</li>';
				}else if(this.chapter >= 110 && this.chapter <= 119){
					epilogue += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
					epilogue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					epilogue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					epilogue += '<h1>'+this.chapterName+'</h1>';
					epilogue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					epilogue += '</li>';
				}
			})
			if(prologue != ''){
				studyBlock.children('ol').prepend(prologue);
			}
			if(epilogue != ''){
				studyBlock.children('ol').append(epilogue);
			}
			*/
		})
	}
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, mobileSourceType, Sid, MovePage, Page){
	$.get('../api/apiLoginUser.php',function(data){		
		if(data.userID == '') {
			alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
			location.href="/m/login.html";

		} else {		
			if(mobileSourceType=='book') {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.')==true){
						check = check
					}else{
						check = ''
						return;
					}
				}

				var Chasi = chapter < 10 ? '0' + chapter : chapter;
				var linkAddress = '/viewer/index.html?Sid='+Sid+'&Code='+contentsCode+'&Chasi='+Chasi+'&Page='+Page+'&MovePage='+MovePage+'&LectureOpenSeq='+lectureOpenSeq+'&PreView=N';
				top.location.href = linkAddress;

			} else if(mobileSourceType=='html5') {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				if(loginUserID == '9210066865') {
					var linkAddress = 'http://cont1.esangedu.kr/player/popup_html.php?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				} else if(loginUserID == 'zeroha2') {
					var linkAddress = 'http://cont1.esangedu.kr/player/popup_html.php?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				} else {
					var linkAddress = 'study_html.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				}
				top.location.href = linkAddress;

			} else {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				if(mobileSourceType == 'mp4cdn') {
					var linkAddress = 'study_viewS.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				} else {
					var linkAddress = 'study_view.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				}
				top.location.href = linkAddress;
			}
		}
	})
}

function certMove(lectureOpenSeq, lectureStart, ContentsCode){
	top.location.href='../m/mobileCerti.php?lectureOpenSeq='+lectureOpenSeq+'&lectureStart='+lectureStart+'&contentsCode='+ContentsCode;
}

//oneedu LMS 연동
function joinLMS(seqs,type){
	setSSO = window.open('http://oneedu.co.kr/api/apiSSO.php','studyJoin','top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no','학습연동')

    $.get(useApi,{'seq':seqs},function(data){
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('#list'+seqs);

		lists += '<form class="joinForm" action="http://oneedu.co.kr/api/apiSSO.php" method="post" target="studyJoin">';
		lists += '<input type="hidden" name="ssoSite" value="esangedu">';
		lists += '<input type="hidden" name="memID" value="'+data.study[0].userID+'">';
		lists += '<input type="hidden" name="type" value="'+type+'">';
		lists += '<input type="hidden" name="lectureStart" value="'+data.study[0].lectureStart+'">';
		lists += '<input type="hidden" name="lectureEnd" value="'+data.study[0].lectureEnd+'">';
		lists += '<input type="hidden" name="ssoCode" value="'+data.study[0].ssoCode+'">';
		lists += '</form>'
        studyBlock.children('div').after(lists);
		studyBlock.children('form.joinForm').submit();
		//progressCheck(seqs,data.study[0].contentsCode,data.study[0].lectureOpenSeq,0)
		setSSO.focus();
		studyBlock.children('form.joinForm').remove();
    })
}
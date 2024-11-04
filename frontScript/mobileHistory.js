$(document).ready(function(){
	ajaxAct();
})

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		var totalCount = data.totalCount;
		var totalScore = '';
		var passOK = '';
		var lists = '';
		if (totalCount != 0){
			$.each(data.study, function(){
				lists += '<article id="list'+this.seq+'">';

				if(this.totalScore == null) {
					totalScore = '0점';
				} else {
					totalScore = this.totalScore+'점';
				}
				if(this.resultView == 'Y') {
					if(this.passOK == 'Y') {
						passOK = '<strong class="red" style="font-size:15px;">수료</strong>';
					} else {
						passOK = '<strong class="red" style="font-size:15px;">미수료</strong>';
					}
				} else {
					passOK = '<strong class="red" style="font-size:15px;">채점중</strong>'
					totalScore ='채점중'; 
				}
				if(this.serviceType=='3') {
					if(this.passOK == 'Y') {
						passOK = '<strong class="red" style="font-size:15px;">수료</strong>';
					} else {
						passOK = '<strong class="red" style="font-size:15px;">미수료</strong>';
					}
					totalScore = '평가없음';
				}

				//상단 타이틀
				lists += '<div ';
				if(this.mobile == 'Y' || (loginUserLevel == '12' && this.userName == "콘텐츠심사")){
					lists += 'onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"';
				}else{
					lists += 'class="notMobile" onclick="alert(\'모바일을 지원하지 않는 과정입니다.\\n\\nPC로 수강하시기 바랍니다.\')"';
				}
				lists += '>';
				lists += '<button type="button" title="버튼"></button>';
				lists += '<h1>'+this.contentsName+'</h1>';
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2>';
				lists += '<ul>';
				lists += '<li>수료여부 <strong>'+passOK+'</strong></li>';
				lists += '<li>총점 <strong>'+totalScore+'</strong></li>';
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
			var midTerm = data.midTestChapter;
			//2018-04-18 본인인증 1일 1회(강혜림 추가)
			var certDate = data.certDate; 
			if(certDate){
				certDate = certDate.substr(0,10);
			}
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

					/*진도율, 랭킹 출력*/
					studyDetails +='<li style="padding:0;"><ul class="progress" onclick="alert(\'상세내역은 PC에서만 확인 가능 합니다.\')">';
					studyDetails +='<li class="type01"><h1>중간평가<strong>'+midStatus+'</strong><strong>'+midComment+'</strong></h1></li>';
					studyDetails +='<li class="type02"><h1>최종평가<strong>'+testStatus+'</strong><strong>'+testComment+'</strong></h1></li>';
					studyDetails +='<li class="type03"><h1>과제제출<strong>'+reportStatus+'</strong><strong>'+reportComment+'</strong></h1></li>';
					studyDetails +='</ul></li>';

					if(data.mobile == "Y"){
						for (i = 0 ; i<totalCount; i++){

								studyDetails += '<li onclick="studyPlay(\''+data.seq+'\',\''+data.contentsCode+'\',\''+data.progress[i].chapter+'\',\''+data.lectureOpenSeq+'\',\''+data.mobileSourceType+'\',\''+data.mobileSourceType+'\')">';
								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
								studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
								if(data.progress[i].endTime != null){
									studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
								}
							studyDetails += '</li>';
						}
					} else {
						for (i = 0 ; i<totalCount; i++){

								studyDetails += '<li onclick="alert(\'현재 PC에서만 복습이 가능합니다.\')">';
								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
								studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
								if(data.progress[i].endTime != null){
									studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
								}
							studyDetails += '</li>';
						}
					}
					studyDetails += '</ol>';

			}else{
				alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
				location.href="/m/login.html";
			}
			if (renew == 'Y'){
				studyBlock.children('ol').remove();
			}
			studyBlock.addClass('openStudy');
			studyBlock.children('div').after(studyDetails);
			//특수차시
			var prologue = ''
			var epilogue = ''

			$.each(data.progress,function(){
				if(this.chapter >= 100 && this.chapter <= 109){
					prologue += '<li onclick="alert(\'현재 PC에서만 복습이 가능합니다.\')">';
					prologue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					prologue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					prologue += '<h1>'+this.chapterName+'</h1>';
					prologue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					prologue += '</li>';
				}else if(this.chapter >= 110 && this.chapter <= 119){
					prologue += '<li onclick="alert(\'현재 PC에서만 복습이 가능합니다.\')">';
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
		})
	}
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, sourceType, Sid, MovePage, Page){
	$.get('../api/apiLoginUser.php',function(data){		
		if(data.userID == '') {
			alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
			location.href="/m/login.html";

		} else {		
			if(sourceType = 'html5'){
				sourceType ='flash';
			}
			if(sourceType=='book') {
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

			} else if(sourceType=='html5') {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				var linkAddress = 'study_html.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				top.location.href = linkAddress;

			} else {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				var linkAddress = 'study_view.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				top.location.href = linkAddress;
			}
		}
	})
}

function certMove(lectureOpenSeq, lectureStart, ContentsCode){
	top.location.href='../m/mobileCerti.php?lectureOpenSeq='+lectureOpenSeq+'&lectureStart='+lectureStart+'&contentsCode='+ContentsCode;
}

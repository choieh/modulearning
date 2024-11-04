let chapterObj = {};
$(document).ready(function(){
	$.ajax({
		method: 'GET',
		url:chapterApi,
		data: 'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,
		success: function(data){
			chapterObj = data;
			ajaxAct();
		}
	})
})

function ajaxAct(){
//	var listAjax = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq, function(data){
		var totalCount = chapterObj.totalCount;
		var lists = '';
		var Sid = chapterObj.contentsCode + chapterObj.lectureStart.substr(2,2) + chapterObj.lectureStart.substr(5,2) + chapterObj.lectureStart.substr(8,2) + chapterObj.lectureEnd.substr(8,2);
		var lectureOpenSeq = chapterObj.lectureOpenSeq;
		var contentsCode = chapterObj.contentsCode;
		var mobileSourceType = chapterObj.mobileSourceType;
		var useMidTest = chapterObj.midStatus;
		var useFinTest = chapterObj.testStatus;
		var useReport = chapterObj.reportStatus;
		var lastPage = chapterObj.lastPage;
		var mobileLastPage = chapterObj.mobileLastPage;
		var midTerm = chapterObj.midTestChapter;
		var progressCheck = chapterObj.progressCheck;
		var testOverTime = chapterObj.testOverTime;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var serviceType = chapterObj.serviceType;
		var motpUser = ['zkfmak3785'];

		if(dd<10) {
			dd='0'+dd
		}
		if(mm<10) {
			mm='0'+mm
		}
		today = yyyy+'-'+mm+'-'+dd;

		if(totalCount != 0){
			var certPassQuery = (((chapterObj.serviceType == '1' || chapterObj.serviceType == '2') && (chapterObj.certPass == 'Y' )));
			if(certPassQuery || chapterObj.serviceType == '3' || chapterObj.serviceType == '9' || chapterObj.serviceType == '5'){
				//강의 활성용 오늘날짜 호출
				var today = new Date(chapterObj.nowTime);
				var today2 = chapterObj.nowTime;
				var dd = today.getDate();
				if(dd <= 9){ dd = '0'+dd }
				var mm = today.getMonth()+1; //January is 0!
				if(mm <= 9){ mm = '0'+mm }
				var yy = today.getFullYear();
				today = yy+'-' + mm+'-'+dd;
				var todayCount = 0;
				var btnUse = 'Y';
				var btnUse2 = 'Y';
				lists += '<div class="page_title" style="border-radius:5px; margin-bottom:25px;">';
				lists += '<h3 class="title">'+chapterObj.contentsName+'</h3>';
				lists += '</div>';
				lists += '<ul class="dep_list">';
				lists += '<li class="blt_txt">학습현황</li>';
				lists += '</ul>';
				lists += '<table summary="학습현황" class="tb_style06 mt10">';
				lists += '<colgroup>';
				lists += '<col style="width:80px">';
				lists += '<col style="width:*">';
				lists += '</colgroup>';
				lists += '<tbody>';
				lists += '<tr>';
				lists += '<td class="bold talign_l">학습기간</td>';
				lists += '<td class="talign_l">'+chapterObj.lectureStart+'-'+chapterObj.lectureEnd+'</td>';
				lists += '</tr> ';
				lists += '<tr>';
				lists += '<td class="bold talign_l">진도율</td>';
				lists += '<td class="talign_l">';
				lists += '<div class="graph_wrap">';
				lists += '<div class="graph_box"> ';
				lists += '<div class="graph_bar" id="graph_bar1" style="width:'+chapterObj.totalProgress+'%"></div>';
				lists += '<script type="text/javascript">';
				$(document).ready(function(){
					$("#graph_bar1").css("width",  + "%");
					$("#graph_bar2").css("width",  + "%");
				});
				lists += '</script> ';
				lists += '</div>';
				lists += '<span class="graph_p" id="graph_no1">'+chapterObj.totalProgress+'%</span>';
				lists += '</div> ';
				lists += '</td>';
				lists += '</tr>';
				lists += '</tbody>';
				lists += '</table>';
//				lists += '<p class="notice" style="font-size:12px; background:#2c3e50; color:#ecf0f1">모바일에서는 <strong style="color:#e67e22;">학습만 가능</strong>합니다.<br>평가는 <strong style="color:#e67e22;">PC로 접속</strong>하여 응시하셔야 합니다.</p>';
				lists += '<ul class="dep_list mt30">';
				lists += '<li class="blt_txt">강의목차</li>';
				lists += '</ul>';
//				lists += '<div id="page-reload">';
//				lists += '<div>';
//				lists += '<a href="javascript:location.href=location.href">새로고침 <img src="../images/mobile/sub/icons-rotation.png"></a>';
//				lists += '</div>';
//				lists += '</div>';


				if(midTerm != 0 && chapterObj.midStatus == 'N' && (serviceType == '1' || serviceType == '9')) {
					lists += renderTestBtn('mid', chapterObj.midStatus, chapterObj.totalProgress, chapterObj.midTestProgress);
				}

				if(chapterObj.testRate != '0'){
					if(curDate >= chapterObj.testEndTime && testOverTime == 'N' && chapterObj.testStatus == 'V'){
						$.ajax({
							method: 'POST',
							url: testAnswerApi,
							data: {'contentsCode':contentsCode, 'lectureOpenSeq':lectureOpenSeq, 'testType':'final','testEnd': 'N', 'endTime': 'Y'},
						})
						chapterObj.testOverTime = 'Y';
					}

					if(serviceType == '1' || serviceType == '9' || serviceType == '3' || serviceType == '5' && chapterObj.testStatus == 'N'){
						lists += renderTestBtn('final', chapterObj.testStatus, chapterObj.totalProgress, chapterObj.finalTestProgress);
					}
				}

				if(chapterObj.reportRate != '0' && (serviceType == '1' || serviceType == '9') && chapterObj.reportStatus == 'N'){
					lists += renderTestBtn('report', chapterObj.reportStatus, chapterObj.totalProgress, chapterObj.finalTestProgress);
				}

			}
		}else {
			alert('수강 시 본인인증 절차를 거쳐야 합니다.');
			certMove(lectureOpenSeq,chapterObj.lectureStart,contentsCode);
		}
		$('.inner').html(lists);
//	})
}

function openCaptcha(like, chapter){
	if(like == 'study'){
		window.location.href=`hrdMOTP_mobile.php?mobileYN=Y&type=${like}&chapter=${chapter}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&studySeq=${studySeq}&progressCheck=timeCheck&mobileSourceType=${chapterObj.mobileSourceType}&lectureStart=${chapterObj.lectureStart}`;
	} else {
		window.location.href=`hrdMOTP_mobile.php?mobileYN=Y&type=${like}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&studySeq=${studySeq}`;
	}
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, mobileSourceType, Sid, MovePage, Page){
	let serType = 0;
	let studyCount = 0;
	let midTerm = 0;
	$.ajax({
		url: chapterApi,
		type: "GET",
		async: false, //비동기 사용
		data : {'contentsCode':contentsCode,'lectureOpenSeq':lectureOpenSeq},
		success: function(data){
			serType = data.serviceType;
			midTerm = data.midTestChapter;

			if(data.serviceType == 1){ // 환급 과정 수강 시간 및 일일 제한
				nowTime = data.nowTime;

				$.each(data.progress, function(){
					if(this.endTime != null && nowTime.substr(5, 5) == this.endTime.substr(5,5)){
						studyCount++;
						if(studyCount == 8){
							dailyMaxChapter = this.chapter;
						}
					}
				})
			}
		}
	})

	$.get('../api/apiLoginUser.php',function(data){
		if(data.userID == '') {
			alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
			location.href="login.php";

		}
	})
}

function renderTestBtn(like, status, progress, testProgress){
	let result = '';
	let title = '';
	let captcha = '';
	if(like == 'mid'){
		title = '중간평가';
		captcha = chapterObj.midCaptchaTime;
	} else if(like == 'final'){
		title = '최종평가';
		captcha = chapterObj.testCaptchaTime;
	} else {
		title = '과제';
		captcha = chapterObj.reportCaptchaTime;
	}

	result += '<section class="mypage_classIndex">';
	result += '<ul>';
	result += `<li style="letter-spacing:3px; font-weight:700;">${title}</li>`;
	result += '<li></li>';

	if(Number(progress) < Number(testProgress)){
		result += '<li class="tc_blue" style="color:gray;">진도부족</li>';
	}else if(status == 'N'){
		result += '<li class="tc_blue" style="color:red;">미응시</li>';
	} else if(status == 'V') {
		if(chapterObj.testOverTime == 'Y' && like == 'final') {
			result += '<li class="tc_blue" style="color:red;">시간초과</li>';
		} else {
			result += '<li class="tc_blue" style="color:red;">진행중</li>';
		}
	} else {
		result += '<li class="tc_blue" style="color:#3498db;">응시</li>';
	}

	result += '</ul>';
	if(status == 'C' || status == 'Y'){
		result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="alert('이미 응시 하셨습니다.')">응시 완료</button>`;
	} else if(like == 'final' && status == 'V'){
		if(chapterObj.testOverTime == 'Y'){
			result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn">시간 초과로인한 자동제출</button>`;
		} else {
			result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="moveToTest('${like}', '${progress}', '${testProgress}')">
			응시중&nbsp;(${chapterObj.testEndTime}까지 응시 가능)</button>`;
		}
	} else if(like == 'report' && status == 'V' && chapterObj.lectureEnd >= curDate){
		result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="moveToTest('${like}', '${progress}', '${testProgress}')">
		응시중&nbsp;(${chapterObj.lectureEnd} 23:50까지 응시 가능)</button>`;
	} else {
		result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn"
		onclick="moveToTest('${like}', '${title}', '${captcha}', '${progress}', '${testProgress}')">응시하기</button>`;
	}

	result += '</section>';

	return result;
}

function moveToTest(like, title, captcha, progress, testProgress){
	if(Number(progress) < Number(testProgress)){
		alert(`진도율 ${testProgress}%부터 ${title} 응시 가능합니다.`);
		return false;
	}

	if(chapterObj.serviceType == '1' && captcha == 'null'){
		openCaptcha(like);
		return false;
	}

	window.location.href=`mobileTestPage.php?like=${like}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&seq=${studySeq}`;
}

function certMove(lectureOpenSeq, lectureStart, contentsCode){
	top.location.href='mobileCerti.php?lectureOpenSeq='+lectureOpenSeq+'&lectureStart='+lectureStart+'&contentsCode='+contentsCode;
}

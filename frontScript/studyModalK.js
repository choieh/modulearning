var testApi = '../api/apiStudyTest.php';
var reportApi = '../api/apiStudyReport.php';
var reportKApi = '../api/apiStudyReportK.php';
var surveyApi = '../api/apiSurvey.php';
var surveyAnswerApi = '../api/apiSurveyAnswer.php';
var boardApi = '../api/apiBoard.php';
var examList = 2;
var examPage = 1;
var i = 1;
var examEndTime = '';
var timer = '';
var setClockfunction = '';
var testEndTime = '';

function openStudyModal(types,contentsCode,lectureOpenSeq){
	if(typeof(contentsCode) == 'object'){
		contentsCode = $(contentsCode).parents('form').children('input[name="contentsCode"]').val();
	}
	if(typeof(lectureOpenSeq) == 'object'){
		lectureOpenSeq = $(lectureOpenSeq).parents('form').children('input[name="lectureOpenSeq"]').val();
	}
	if(types == 'mid'){
		agreeModal(types,contentsCode,lectureOpenSeq);
	} else if(types == 'final'){
		$.get(chapterApi,{'contentsCode':contentsCode,'lectureOpenSeq':lectureOpenSeq}, function(data){
			if(data.survey != 'Y'){
				var studyModals = '';
				$('body').css('overflow','hidden');
				studyModals += '<div id="screenModal" style="display:none;">';
				//타이틀 노출
				studyModals += '<div class="titleArea">';
				studyModals += '<div>';
				studyModals += '<img src="../images/study/img_test02.png" />';
				studyModals += '<h1>최종평가</h1>';
				studyModals += '<h2 class="contentsName">설문조사</h2>';
				studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
				studyModals += '</div>';
				studyModals += '</div>';

				$.get(surveyApi,{},function(data){
					//주의사항
					studyModals += '<div class="cautionTest">';
					studyModals += '<div class="textArea" style="padding-top:29px; height:81px">';
					//studyModals += '<h1>설문조사입니다.</h1>';
					//studyModals += '<p>수강한 과정에 대한 <strong>설문조사</strong> 입니다.<br />시험은 <strong>설문조사 후 응시가능</strong>하며, 설문시간은 <strong>시험시간에 미포함 되며</strong> 시험 결과와는 무관합니다.</p>';
					studyModals += '<p class="surveyText">- 평가는 <strong class="blue">설문조사 후 응시 가능</strong>하며, <strong class="red">설문시간은 최종평가 응시 제한시간에 미포함</strong>됩니다.</p>';
					studyModals += '<p class="surveyText">- 더 나은 교육서비스 제공을 위한 자료로 사용되는 설문조사이니, 성실한 답변을 부탁드립니다.</p>';
					studyModals += '</div>';
					studyModals += '</div>';
					studyModals += '<div class="surveyArea">';
					studyModals += '<form class="surveyForm">';
					$.each(data.survey, function(){
						studyModals += '<input type="hidden" name="seq[]" value="'+this.seq+'">';
						studyModals += '<input type="hidden" name="surveyType[]" value="'+this.surveyType+'">';
						studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+lectureOpenSeq+'">';
						studyModals += '<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
						studyModals += '<h1>설문 '+this.orderBy+'</h1>';
						studyModals += '<h2>'+this.exam+'</h2>';
						if(this.surveyType=='A'){ // 객관식
							studyModals += '<ol>';
							for(i=1; i<6 ; i++){
								studyModals += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example0'+i+this.seq+'"  value="'+i+'" />';
								studyModals += '<label for="example0'+i+this.seq+'">'+i+'.&nbsp;'+eval('this.example0'+i)+'</label></li>';
							}
							studyModals += '</ol>';
						} else if(this.surveyType=='B'){ // 단답형
							studyModals += '<textarea name="userAnswer'+this.seq+'"></textarea>';
						}
					})
					studyModals += '</form>';
					studyModals += '</div>'; //문제종료
					studyModals += '<div class="btnArea">';
					studyModals += '<button type="button" onclick="submitSurvey(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\')"><img src="../images/study/btn_lastsubmit_survey.png" alt="설문조사 제출" /></button>';
					studyModals += '</div>';
					studyModals += '</div>';
					$('#footer').after(studyModals);
					$('#screenModal').fadeIn('fast');
				})
			}else{
				agreeModal(types,contentsCode,lectureOpenSeq);
			}
		})
	} else if(types == 'report') {
		$.get(chapterApi,{'contentsCode':contentsCode,'lectureOpenSeq':lectureOpenSeq},function(data){
			if(data.survey != 'Y'){
				var studyModals = '';
				$('body').css('overflow','hidden');
				studyModals += '<div id="screenModal" style="display:none;">';
				//타이틀 노출
				studyModals += '<div class="titleArea">';
				studyModals += '<div>';
				studyModals += '<img src="../images/study/img_test02.png" />';
				studyModals += '<h1>과제 제출</h1>';
				studyModals += '<h2 class="contentsName">설문조사</h2>';
				studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
				studyModals += '</div>';
				studyModals += '</div>';

				$.get(`${surveyApi}?serviceType=${serviceType}`,{},function(data){
					//주의사항
					studyModals += '<div class="cautionTest">';
					studyModals += '<div class="textArea" style="padding-top:29px; height:81px">';
					//studyModals += '<h1>설문조사입니다.</h1>';
					//studyModals += '<p>수강한 과정에 대한 <strong>설문조사</strong> 입니다.<br />시험은 <strong>설문조사 후 응시가능</strong>하며, 설문시간은 <strong>시험시간에 미포함 되며</strong> 시험 결과와는 무관합니다.</p>';
					studyModals += '<p class="surveyText">- 평가는 <strong class="blue">설문조사 후 응시 가능</strong>하며, <strong class="red">설문시간은 최종평가 응시 제한시간에 미포함</strong>됩니다.</p>';
					studyModals += '<p class="surveyText">- 더 나은 교육서비스 제공을 위한 자료로 사용되는 설문조사이니, 성실한 답변을 부탁드립니다.</p>';
					studyModals += '</div>';
					studyModals += '</div>';
					studyModals += '<div class="surveyArea">';
					studyModals += '<form class="surveyForm">';
					$.each(data.survey, function(){
						studyModals += '<input type="hidden" name="seq[]" value="'+this.seq+'">';
						studyModals += '<input type="hidden" name="surveyType[]" value="'+this.surveyType+'">';
						studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+lectureOpenSeq+'">';
						studyModals += '<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
						studyModals += '<h1>설문 '+this.orderBy+'</h1>';
						studyModals += '<h2>'+this.exam+'</h2>';
						if(this.surveyType=='A'){ // 객관식
							studyModals += '<ol>';
							for(i=1; i<6 ; i++){
								studyModals += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example0'+i+this.seq+'"  value="'+i+'" />';
								studyModals += '<label for="example0'+i+this.seq+'">'+i+'.&nbsp;'+eval('this.example0'+i)+'</label></li>';
							}
							studyModals += '</ol>';
						} else if(this.surveyType=='B'){ // 단답형
							studyModals += '<textarea name="userAnswer'+this.seq+'"></textarea>';
						}
					})
					studyModals += '</form>';
					studyModals += '</div>'; //문제종료
					studyModals += '<div class="btnArea">';
					studyModals += '<button type="button" onclick="submitSurvey(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\')"><img src="../images/study/btn_lastsubmit_survey.png" alt="설문조사 제출" /></button>';
					studyModals += '</div>';
					studyModals += '</div>';
					$('#footer').after(studyModals);
					$('#screenModal').fadeIn('fast');
				})
			}else{
				agreeModal(types,contentsCode,lectureOpenSeq);
			}
		})
	}
}

function submitSurvey(types,contentsCode,lectureOpenSeq){
	var surveySerial = $('.surveyForm').serialize();
	surveySerial = `${surveySerial}&serviceType=${serviceType}`;
	$('.btnArea').html('<img src="../images/global/loading_btn.gif" alt="로딩중" />'); //20170808 서영기 : 버튼 비노출, 로딩이미지 호출
	$.post(surveyAnswerApi, surveySerial, function(data){
		if(data.result == 'success'){
			$('#screenModal').remove();
			agreeModal(types,contentsCode,lectureOpenSeq);
		}else{
			alert(data.result)
			$('.btnArea').html('<button onclick="submitSurvey(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\')" type="button"><img alt="설문조사 제출" src="../images/study/btn_lastsubmit_survey.png"></button>'); //20170808 서영기 : 얼럿 호출시 문항 다시 노출
		}
	})
}

function agreeModal(types,contentsCode,lectureOpenSeq){
	$('body').css('overflow','hidden');
	//types : 중간평가=mid, 기말평가=final, 레포트 = report, 시험주의사항=cautionMid,cautionFinal , 레포트주의사항=cautionReport,
	var studyModals = '';
	studyModals += '<div id="screenModal" style="display:none;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	if(types=='mid'){
		studyModals += '<img src="../images/study/img_test01.png" />';
		studyModals += '<h1>중간평가</h1>';
	}else if(types=='final'){
		studyModals += '<img src="../images/study/img_test02.png" />';
		studyModals += '<h1>최종평가</h1>';
	}else{
		studyModals += '<img src="../images/study/img_report.png" />';
		studyModals += '<h1>과제 제출</h1>';
	}
	//강의명 호출
	studyModals += '<h2 class="contentsName">주의사항</h2>';

	//타입에 따라 버튼 액션 호출 필요
	studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';

	//주의사항
	studyModals += '<div class="caution">';
	studyModals += '<img src="../images/study/img_notice_big.png" />';
	//주의사항
	studyModals += '<h1>주의사항</h1>';

	var cautionApi = $.get('../api/apiSiteInfo.php?serviceType='+serviceType,{},function(data){
		if(types == 'mid'){
			studyModals += '<p>'+data.midCopy.replace(/\n/g,'<br />')+'</p>';
		}else if(types == 'final'){
			studyModals += '<p>'+data.testCopy.replace(/\n/g,'<br />')+'</p>';
		}else if(types == 'report'){
			studyModals += '<p>'+data.reportCopy.replace(/\n/g,'<br />')+'</p>';
		}
		studyModals += '</div>';
		studyModals += '<div class="agreeArea">';
		if(types == 'mid' || types == 'final'){
			studyModals += '<input type="checkbox" name="agree" id="agree" value="agreeOK" />';
			studyModals += '<label for="agree">위 사항을 모두 숙지하였으며, 공정하게 평가에 응시하겠습니다.</label>';
			studyModals += '</div>';
			studyModals += '<div class="btnArea">';
			studyModals += '<button onclick="agreeTest(\''+types+'\',\''+contentsCode+'\','+lectureOpenSeq+',this)"><img src="../images/study/btn_dotest_big.png" /></button>';
			studyModals += '</div>';
		}else if(types == 'report'){
			studyModals += '<input type="checkbox" name="agree" id="agree" value="agreeOK" />';
			studyModals += '<label for="agree">위 사항을 모두 숙지하였으며, 공정하게 과제를 제출하겠습니다.</label>';
			studyModals += '</div>';
			studyModals += '<div class="btnArea">';
			studyModals += '<button onclick="agreeTest(\''+types+'\',\''+contentsCode+'\','+lectureOpenSeq+',this)"><img src="../images/study/btn_doreport_big_start.png" /></button>';
			studyModals += '</div>';
		}
		studyModals += '</div>';
		$('#footer').after(studyModals);
		$('#screenModal').fadeIn('fast');
	})
}


function agreeTest(types,contentsCode,lectureOpenSeq,obj){
	if($('input[name="agree"]:checked').prop('checked') == true){
		$(obj).remove();
		$('.btnArea').html('<img src="../images/global/loading_btn.gif" alt="로딩중" />')

		if(types == 'final') {
			$.get(chapterApi,{'contentsCode':contentsCode,'lectureOpenSeq':lectureOpenSeq},function(data){
				//tday = new Date(data.nowTime);
				tday = new Date(data.insertTestEndTime);
				var dateString = data.insertTestEndTime;
				var dateArr  = dateString.toString().split('-');
				var timeArr = dateString.toString().split(':');
				var hourArr = timeArr[0].substr(11,2);
				var dayArr = dateArr[2].substr(0,2);

/*
				if(data.testTime=='60'){ //After minutes
					tday.setMinutes(tday.getMinutes() + 60);
					hourArr = Number(hourArr) + 1;
				}else{
					tday.setMinutes(tday.getMinutes() + 30);
					timeArr = Number(timeArr) + 30;

					if(timeArr >= 60) {
						timeArr = Number(timeArr) - 60;
						hourArr = Number(hourArr) + 1;
					}
				}
*/

				year = tday.getFullYear();
				month = tday.getMonth() + 1;
				day = tday.getDate();
				hour = tday.getHours();
				min = tday.getMinutes();
				sec = tday.getSeconds();
				finalTime = dateArr[0] + '년 ' + dateArr[1] + '월 ' + dayArr + '일 ' + hourArr +'시 ' + timeArr[1] + '분';

				//if(confirm('응시 제한시간이 있으며, 제한시간 내에 완료해야 합니다. \n응시 도중 접속종료를 하더라도 제한시간은 계속 흘러갑니다. \n지금 평가를 응시하시겠습니까?')){
				if(confirm('현재 평가 응시 중인 상태입니다.'+ finalTime +'까지\n완료해야 합니다. \n응시 도중 접속종료를 하더라도 제한시간은 계속 흘러갑니다. \n지금 평가를 응시하시겠습니까?')){
					$('#screenModal').fadeOut('fast',function(){
						$('#screenModal').remove()
						doTest(types,contentsCode,lectureOpenSeq)
					});
				} else {
					studyModalClose();
				}
			})
		} else {
			$('#screenModal').fadeOut('fast',function(){
				$('#screenModal').remove()
				doTest(types,contentsCode,lectureOpenSeq)
			});
		}
	}else{
		if(types == 'report'){
			alert('과제제출 유의사항에 동의해주세요');
		}else{
			alert('평가응시 유의사항에 동의해주세요');
		}
	}
}

function hrdCheckScore(types, contentsCode, lectureOpenSeq, chapter=0, flag){
	let eval_cd = '';
	if(serviceType == '1'){
		if(types == 'mid'){
			eval_cd = '04';
		}else if(types == 'final'){
			eval_cd = '02';
		}else if(types == 'report'){
			eval_cd = '03';
		}else if(types == 'study'){
			eval_cd = '01';
		}
		$.ajax({
			type : "POST",
			url : '../api/apiHrdScoreCheck.php',
			data : {"startEnd" : flag, "contentsCode" : contentsCode, "lectureOpenSeq" : lectureOpenSeq, "chapter" : chapter, "eval_cd" : eval_cd}
		});
	}
 }

function doTest(types,contentsCode,lectureOpenSeq){
	////////////////////////////
	hrdCheckScore(types, contentsCode, lectureOpenSeq, 0,'S');
	cc = contentsCode;
	los = lectureOpenSeq;
	var studyModals = '';
	studyModals += '<div id="screenModal" style="display:none;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	if(types=='mid'){
		studyModals += '<img src="../images/study/img_test01.png" />';
		studyModals += '<h1>중간평가</h1>';
	}else if(types=='final'){
		studyModals += '<img src="../images/study/img_test02.png" />';
		studyModals += '<h1>최종평가</h1>';
	}else{
		studyModals += '<img src="../images/study/img_report.png" />';
		studyModals += '<h1>과제 제출</h1>';
	}
	//강의명 호출
	studyModals += '<h2 class="contentsName"></h2>';

	//타입에 따라 버튼 액션 호출 필요
	if(types == 'final'){
		clearTimeout(setClockfunction);
		studyModals += '<button type="button" onClick="studyModalClose(\'final\');"><img src="../images/study/btn_modalclose.png" /></button>';
	}else if(types == 'mid'){
		clearTimeout(setClockfunction);
		studyModals += '<button type="button" onClick="studyModalClose(\'mid\');"><img src="../images/study/btn_modalclose.png" /></button>';
	}else{
		studyModals += '<button type="button" onClick="studyModalClose(\'report\');"><img src="../images/study/btn_modalclose.png" /></button>';
	}
	studyModals += '</div>';
	studyModals += '</div>';
	if(types=='mid' || types=='final'){ // 중간, 최종평가
		var answerAjax = $.get(testApi,'testType='+types+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&list=99',function(data){

			studyModals += '<div class="cautionTest">';
			if(types == 'final'){
				var old = data.testEndTime;
				var oldTime = old.substr(11,8)
				var oldYear = old.substr(0,4)
				var oldMonth = old.substr(5,2)
				var oldDay = old.substr(8,2)
				old = new Date(oldMonth+'/'+oldDay+'/'+oldYear+' '+oldTime).getTime()

				var now = data.nowTime;
				var nowTime = now.substr(11,8)
				var nowYear = now.substr(0,4)
				var nowMonth = now.substr(5,2)
				var nowDay = now.substr(8,2)
				now = new Date(nowMonth+'/'+nowDay+'/'+nowYear+' '+nowTime).getTime();
				var gap = old - now;
				examEndTime = gap/1000;
				testEndTime = data.testEndTime;
				//setClock();
				if(typeof setIntervalTime == 'number') clearTimeout(setIntervalTime);
				setIntervalTime = setTimeout(setClock, 1000);
				studyModals += '<div class="timer">';
				studyModals += '</div>';
				document.addEventListener('visibilitychange', tabVisibility2);
			}
			studyModals += '<input id="lectureEnd" type="hidden" value="'+data.lectureEnd+'">';
			studyModals += '<input id="studySeq" type="hidden" value="'+data.studySeq+'">';

			studyModals += '<div class="textArea">';
			if(types == 'final'){
				studyModals += '<h1>최종평가 주의사항</h1>';
				studyModals += '<p>- 평가는 <strong class="red">1회(최종제출 기준)만 응시 가능</strong>하며, <strong class="red">재응시가 불가능</strong>합니다.</p>';
				studyModals += '<p>- 최종평가는 <strong class="red">응시 제한시간이 있으며,</strong> 응시 도중 접속 종료 등의 상태에서도 <strong class="red">계속 흘러갑니다.</strong></p>';
				studyModals += '<p>- <strong class="red">최종제출 전까지는 답안 수정이 가능</strong>하며, <strong class="blue">학습 기간 내에 최종제출까지 완료</strong>하여야 합니다.</p>';
			} else if(types == 'mid') {
				studyModals += '<h1>중간평가 주의사항</h1>';
				studyModals += '<p>- 중간평가는 응시 제한시간이 없습니다.</p>';
				studyModals += '<p>- 평가는 <strong class="red">1회(최종제출 기준)만 응시 가능</strong>하며, <strong class="red">재응시 불가능</strong>하므로 신중히 응시하시길 바랍니다.</p>';
				studyModals += '<p>- <strong class="red">최종제출 전까지는 답안 수정이 가능</strong>하며, <strong class="blue">최종제출을 완료하여야 다음 차시 학습이 가능</strong>합니다.</p>';
			}
			studyModals += '</div>';
			studyModals += '</div>';
			studyModals += '<div class="testArea">';
			studyModals += '<ul>';
			var ansExamPage=0;
			$.each(data.studyTest, function(){ // 답안지
				if(examList != 1) {
					if(parseInt(this.orderBy % examList) == 1) {
						ansExamPage = parseInt(ansExamPage)+1;
					}
				} else {
					ansExamPage = parseInt(ansExamPage)+1;
				}
				if(this.userAnswer == null || this.userAnswer == '') {
					var userAnswer = '&nbsp;';
				} else {
					var userAnswer = this.userAnswer;
				}
				studyModals += '<li onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+ansExamPage+'\')" style="cursor:pointer;">문제 '+this.orderBy;
				studyModals += '<div class="userAnswer'+this.orderBy+'">'+userAnswer+'</div></li>';
				i++;
			})
			studyModals += '</ul>';
			studyModals += '<div id="examArea">';
			studyModals += '</div>';
			studyModals += '</div>'; //문제종료
			studyModals += '<div class="btnArea">';
			studyModals += '</div>';
			studyModals += '</div>';
			$('#footer').after(studyModals);
			$('#screenModal').fadeIn('fast');
			$('#screenModal div.titleArea h2').html(data.contentsName);
			examRequest(types,contentsCode,lectureOpenSeq,examList,examPage);
		})

	}else if(types=='report'){  // 과제
		var reportAjax = $.get(serviceType !=6 ? reportApi : reportKApi,`contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&reportSeq=${localStorage.getItem('reportSeq')}`,function(data){
			$('#sceenModal div h2').html(data.contentsName)
			studyModals += '<div class="cautionTest" style="height:97px">';
			studyModals += '<div class="textArea" style="height:97px">';
			studyModals += '<h1>과제 주의사항</h1>';
			studyModals += '<p>- 과제 제출은 <strong class="red">1회(최종제출 기준)만 가능</strong>하며, <strong class="blue">최종제출 후에는 수정 및 재제출이 불가능</strong>합니다.</p>';
			studyModals += '<p>- 최종제출 전까지는 임시저장 기능을 통해 수정이 가능하며, <strong class="red">학습 기간 내에 꼭 최종제출까지 완료</strong>하여야 합니다.</p>';
			studyModals += '</div>';
			studyModals += '</div>';
			var i = 1;
			studyModals += '<form class="answerForm" name="answerForm" method="post" action="'+(serviceType !=6 ? reportApi : reportKApi)+'" enctype="multipart/form-data">';
			studyModals += '<input type="hidden" name="reportEnd" value="" />';
			studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
			studyModals += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
			studyModals += '<input type="hidden" name="lectureEnd" value="'+data.lectureEnd+'">';
			$.each(data.studyReport, function(){
				//문제영역
				var answerType = '';
				if(this.answerType == null){
					answerType = 'attach';
				}else{
					answerType = this.answerType;
				}
				studyModals += '<div class="reportArea">';
				studyModals += '<input type="hidden" name="seq[]" value="'+this.seq+'" />';
				studyModals += '<input type="hidden" name="reportSeq[]" value="'+this.reportSeq+'" />';
				studyModals += '<input type="hidden" name="reserveDate[]" value="'+this.reserveDate+'" />';
				studyModals += '<input type="hidden" name="answerType[]" value="'+this.answerType+'" />';

				studyModals += '<h1>문제 '+i+'</h1>';
				studyModals += '<h2>'+this.exam.replace(/  /g,'&nbsp;&nbsp;').replace(/\n/g,'<br />')+'</h2>';
				//등록문제 다운로드
				if(this.examAttach != null) {
					studyModals += '<a href="../lib/fileDownLoad.php?fileName='+encodeURI(this.examAttach)+'&link='+encodeURIComponent(this.examAttachLink)+'" target="_blank">레포트문제 다운로드 : '+this.examAttach+'</a>';
				}
				//
				studyModals += '<br /><div class="reportSubmit">';
				studyModals += '<ul id="reportTab'+i+'" class="reportTab'+this.seq+'">';
				if(answerType == 'attach'){
					studyModals += '<li class="select"><img src="../images/study/img_submitfile.png" alt="파일제출" /> 파일로 제출하기</li>';
					if(serviceType != 6){
						studyModals += '<li><img src="../images/study/img_sumitwrite.png" alt="직접작성" /> 직접 작성하기</li>';
					} else {
						studyModals += '<li><img src="../images/study/img_sumitwrite.png" alt="직접작성" /> 교강사 답변</li>';
					}
				}else{
					studyModals += '<li><img src="../images/study/img_submitfile.png" alt="파일제출" /> 파일로 제출하기</li>';
					studyModals += '<li class="select"><img src="../images/study/img_sumitwrite.png" alt="직접작성" /> 직접 작성하기</li>';
				}
				studyModals += '</ul>';
				studyModals += '<div>';
				studyModals += '<input type="hidden" name="answerType'+this.seq+'" value="'+answerType+'" />';

				studyModals += '<ul>';
				if(answerType == 'attach'){
					if(this.answerAttach == null ){
						studyModals += '<li><h1>파일 제출하기</h1>';
						studyModals += '<input type="hidden" name="fileCheck'+this.seq+'" value="" />'
					}else{
						studyModals += '<li class="select"><h1>현재 제출파일</h1><a href="../lib/fileDownLoad.php?fileName='+encodeURI(this.answerAttach)+'&link='+encodeURIComponent(this.attachLink)+'" target="_blank">'+this.answerAttach+'</a>';
						studyModals += '<input type="hidden" name="fileCheck'+this.seq+'" value="filechecked" /></li>';
						studyModals += '<li><h1>다시 제출하기</h1>';
					}
					studyModals += '<input type="file" name="answerAttach'+this.seq+'" /></li>';
					studyModals += '</ul>';
					studyModals += '<div>- 파일로 제출하는 경우 <strong class="blue">마지막에 제출한 파일로 최종 저장</strong>됩니다.';
					studyModals += '<br />- 파일로 제출하는 경우 <strong class="red">2개 이상의 문서는 압축하여 1개의 파일로 제출</strong>하여야 합니다.';
					studyModals += '<br />- 파일로 제출하기와 직접 작성하기 중 <strong class="blue">마지막에 제출한 방식 하나만 최종 제출</strong>됩니다.</div>';
				}else{
					studyModals += '<h1>답안 작성하기</h1>';
					if(this.answerText != null){
					  studyModals += '<textarea name="answerText'+this.seq+'" oncontextmenu="return false" onkeydown="keyCheck(event)">'+this.answerText+'</textarea>';
					}else{
					  studyModals += '<textarea name="answerText'+this.seq+'" oncontextmenu="return false" onkeydown="keyCheck(event)"></textarea>';
					}
					studyModals += '<div>- 파일로 제출하는 경우 <strong class="blue">마지막에 제출한 파일로 최종 저장</strong>됩니다.';
					studyModals += '<br />- 파일로 제출하는 경우 <strong class="red">2개 이상의 문서는 압축하여 1개의 파일로 제출</strong>하여야 합니다.';
					studyModals += '<br />- 파일로 제출하기와 직접 작성하기 중 <strong class="blue">마지막에 제출한 방식 하나만 최종 제출</strong>됩니다.</div>';
				}
				studyModals += '</div>';
				//
				studyModals += '</div>';
				//
				studyModals += '</div>';
				i++;
			})
			studyModals += '</form>';
			studyModals += '<div class="btnArea">';
			if(data.contentsCode != 'Z94Q56'){
				if(data.studyReport[0]?.comment == undefined){
					studyModals += '<button type="button" onClick="reportSave(\'\')"><img src="../images/study/btn_save.png" /></button>';
				}
			} else {
				if(loginUserID == 'leehr0523'){
					studyModals += '<button type="button" onClick="reportSave(\'\')"><img src="../images/study/btn_save.png" /></button>';
				}
			}
			if(data.studyReport[0]?.comment == undefined){
				studyModals += '<button type="button" onClick="answerEnd(\'\',\'\',\'\',\'\',\'\',\'Y\')"><img src="../images/study/btn_lastsubmit.png" /></button>';
			}
			studyModals += '</div>';
			studyModals += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			studyModals += '</div>';
			$('#footer').after(studyModals);
			$('#screenModal div.titleArea h2').html(data.contentsName)
			fileformAct();//파일 첨부 사용시
			$('#screenModal').fadeIn('fast');
		}).done(function(data){
			$('.reportSubmit > ul > li').bind({
				click:function(){
					var types = $(this).index()
					var studyModals = '';
					var actionDiv = $(this).parent('ul').parent('div');
					var actionOrder = Number($(this).parent('ul').attr('id').replace('reportTab','')-1);
					var actionSeq = $(this).parent('ul').attr('class').replace('reportTab','');
					studyModals += '<input type="hidden" name="answerType'+actionSeq+'" value="" />';
					if(types == 0){
						$(this).parent('ul').children('li').removeClass('select');
						$(this).parent('ul').children('li:nth-child(1)').addClass('select');
						studyModals += '<ul>';
						if(data.studyReport[actionOrder].answerAttach != null){
							studyModals += '<li class="select"><h1>현재 제출파일</h1><a href="../lib/fileDownLoad.php?fileName='+encodeURI(this.answerAttach)+'&link='+encodeURIComponent(this.attachLink)+'" target="_blank">'+data.studyReport[actionOrder].answerAttach+'</a></li>';
							studyModals += '<li><h1>파일 제출하기</h1>';
						}
						/*else{
							studyModals += '<li><h1>다시 제출하기</h1>';
						}*/
						studyModals += '<input type="file" name="answerAttach'+actionSeq+'" /></li>';
						studyModals += '</ul>';
						studyModals += '<div>- 파일로 제출하는 경우 <strong class="blue">마지막에 제출한 파일로 최종 저장</strong>됩니다.';
						studyModals += '<br />- 파일로 제출하는 경우 <strong class="red">2개 이상의 문서는 압축하여 1개의 파일로 제출</strong>하여야 합니다.';
						studyModals += '<br />- 파일로 제출하기와 직접 작성하기 중 <strong class="blue">마지막에 제출한 방식 하나만 최종 제출</strong>됩니다.</div>';
					}else{
						$(this).parent('ul').children('li').removeClass('select');
						$(this).parent('ul').children('li:nth-child(2)').addClass('select');
						if(serviceType != 6 ){
							studyModals += '<h1>답안 작성하기</h1>';
						} else {
							studyModals += '<h1> 교강사 피드백 </h1>';
						}
						
						//alert(data.studyReport[actionOrder].exam)
						if(data.studyReport[actionOrder].answerText != null){
							studyModals += '<textarea name="answerText'+actionSeq+'" oncontextmenu="return false" onkeydown="keyCheck(event)">'+data.studyReport[actionOrder].answerText+'</textarea>';
						}else{
							if(serviceType == 6){
								studyModals += '<textarea name="answerText'+actionSeq+'" oncontextmenu="return false" onkeydown="keyCheck(event)" readonly>'+data.studyReport[actionOrder]?.comment+'</textarea>';
							} else {
								studyModals += '<textarea name="answerText'+actionSeq+'" oncontextmenu="return false" onkeydown="keyCheck(event)"></textarea>';
							}
							
						}
						studyModals += '<div>- 파일로 제출하는 경우 <strong class="blue">마지막에 제출한 파일로 최종 저장</strong>됩니다.';
						studyModals += '<br />- 파일로 제출하는 경우 <strong class="red">2개 이상의 문서는 압축하여 1개의 파일로 제출</strong>하여야 합니다.';
						studyModals += '<br />- 파일로 제출하기와 직접 작성하기 중 <strong class="blue">마지막에 제출한 방식 하나만 최종 제출</strong>됩니다.</div>';
					}
					//alert(studyModals)
					actionDiv.children('div').html(studyModals);
					if(types == 0){
						$('input[name="answerType'+actionSeq+'"]').val('attach');
						actionDiv.children('div').children('ul').children('li').children('input[type="file"]').each(function(){
							var thisName = $(this).attr('name');
							var preLabel = '';
							preLabel += '<label class="AttachFiles"><span>파일찾기</span>';
							preLabel += '<input type="file" name="'+thisName+'" style="display:none" onchange="fileAddAct(this,\''+thisName+'\')" />';
							preLabel += '</label>';
							$(this).after(preLabel);
							$(this).remove();
						})
					}else{
						$('input[name="answerType'+actionSeq+'"]').val('text');
					}
				}
			})
		})
	}
	////////////////////////////
}

//문제 호출
function examRequest(types,contentsCode,lectureOpenSeq,examList,examPage) {
	var examView = '';
	var examAjax = $.get(testApi,'testType='+types+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&list='+examList+'&page='+examPage,function(data){
		examView += '<form class="answerForm" method="post">';
		examView += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
		examView += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
		examView += '<input type="hidden" name="testType" value="'+data.testType+'">';
		$.each(data.studyTest, function(){ // 답안지
			examView += '<input type="hidden" name="seq[]" value="'+this.seq+'">';
			examView += '<input type="hidden" name="examType[]" value="'+this.examType+'">';

			if(this.examType=='C'){ // 서술형
				var examTypeName = '(서술형)';
			} else {
				var examTypeName = '';
			}

			examView += '<h1>문제 '+this.orderBy+' '+examTypeName+'</h1>';
			examView += '<h2>(배점 : '+this.score+') '+this.exam.replace(/  /g,'&nbsp;&nbsp;').replace(/\n/g,'<br />')+'</h2>';
			if(this.examType=='A'){ // 객관식
				if(this.userAnswer == 1) {
					var selected01 = 'checked="checked"';
				} else if(this.userAnswer == 2) {
					var selected02 = 'checked="checked"';
				} else if(this.userAnswer == 3) {
					var selected03 = 'checked="checked"';
				} else if(this.userAnswer == 4) {
					var selected04 = 'checked="checked"';
				} else if(this.userAnswer == 5) {
					var selected05 = 'checked="checked"';
				}
				examView += '<ol>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example01'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'1\')" value="1" '+selected01+'/>';
				examView += '<label for="example01'+this.seq+'">1.&nbsp;'+this.example01+'</label></li>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example02'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'2\')" value="2" '+selected02+'/>';
				examView += '<label for="example02'+this.seq+'">2.&nbsp;'+this.example02+'</label></li>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example03'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'3\')" value="3" '+selected03+'/>';
				examView += '<label for="example03'+this.seq+'">3.&nbsp;'+this.example03+'</label></li>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example04'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'4\')" value="4" '+selected04+'/>';
				examView += '<label for="example04'+this.seq+'">4.&nbsp;'+this.example04+'</label></li>';
				if(this.example05 != undefined){
					examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example05'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'5\')" value="5" '+selected05+'/>';
					examView += '<label for="example05'+this.seq+'">5.&nbsp;'+this.example05+'</label></li>';
				}
				examView += '</ol>';
			} else if(this.examType=='B'){ // 단답형
				if(this.userAnswer != null){
					examView += '<input type="text" name="userAnswer'+this.seq+'" onkeyup="answerUpdate('+this.orderBy+',this.value,event)" onkeydown="keyCheck(event);" value="'+this.userAnswer+'"  oncontextmenu="return false" />';
				}else{
					examView += '<input type="text" name="userAnswer'+this.seq+'" onkeyup="answerUpdate('+this.orderBy+',this.value,event)" onkeydown="keyCheck(event);" value=""  oncontextmenu="return false" />';
				}
			} else if(this.examType=='C'){ // 서술형
				if(this.userAnswer != null){
					examView += '<textarea name="userAnswer'+this.seq+'" onkeyup="answerUpdate('+this.orderBy+',this.value,event)" onkeydown="keyCheck(event);" oncontextmenu="return false">'+this.userAnswer+'</textarea>';
				}else{
					examView += '<textarea name="userAnswer'+this.seq+'" onkeyup="answerUpdate('+this.orderBy+',this.value,event)" onkeydown="keyCheck(event);" oncontextmenu="return false"></textarea>';
				}
			} else if(this.examType=='D'){ // 진위형
				if(this.userAnswer == 1) {
					var selectedOX01 = 'checked="checked"';
				} else if(this.userAnswer == 2) {
					var selectedOX02 = 'checked="checked"';
				}
				examView += '<ol>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example01'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'1\')" value="1" '+selectedOX01+'/>';
				examView += '<label for="example01'+this.seq+'">1.&nbsp;'+this.example01+'</label></li>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example02'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'2\')" value="2" '+selectedOX02+'/>';
				examView += '<label for="example02'+this.seq+'">2.&nbsp;'+this.example02+'</label></li>';
				examView += '</ol>';
			}
		})
		examView += '</form>';
		var btnView = '';
		var loadEA = parseInt(data.examList)*parseInt(data.examPage);
		var nextPage = parseInt(examPage)+1;
		var prevPage = parseInt(examPage)-1;

		btnView += '<button type="button" class="fLeft" onClick="answerEnd(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\',\'Y\')"><img src="../images/study/btn_lastsubmit.png" alt="최종제출" /></button>';
		if(examPage == 1){ // 1페이지
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+nextPage+'\')"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="pageBtn(\'first\');"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		} else if(data.totalCount <= loadEA) { // 마지막 페이지
			btnView += '<button type="button" class="fRight" onClick="pageBtn(\'last\');"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\')"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		} else {
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+nextPage+'\')"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\')"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		}
		$('#examArea').html(examView);
		$('.btnArea').html(btnView);
	})
}

//페이지 알림 모달
function pageBtn(type){
    var studyModal = '';
    studyModal += '<div class="dark"></div>'
    studyModal += '<div class="studyModal">'
    if (type == 'first'){
        studyModal += '<h1>처음입니다.</h1>'
    }else{
        studyModal += '<h1>마지막 페이지입니다.<br>작성한 답안을 확인한 후에 최종제출 버튼을 눌러 주세요.</h1>'
    }
    studyModal += '<button type="button" onclick="answerRomeve()">확인</button>'
    studyModal += '</div>'
    $('#screenModal').append(studyModal)
}

//제출답 반영
function answerUpdate(num,answer,event) {
	event = event ? event : '';
	if (event.keyCode == 86 && event.ctrlKey){
		return false
		//obj.value = ''
		//$('.userAnswer'+num).html('&nbsp');
	}else{
		if(answer != ''){
			$('.userAnswer'+num).html(answer);
		}else{
			$('.userAnswer'+num).html('&nbsp');
		}
	}
}

function answerEnd(types,contentsCode,lectureOpenSeq,examList,examPage,testEnd) {
    $('.studyModal').remove();
    var studyModal = '';
	if(types == "mid" || types == "final"){
		var text = '재응시를';
	}else{
		var text = '재제출을';
	}
    studyModal += '<div class="dark"></div>'
    studyModal += '<div class="studyModal">'
    studyModal += '<h1>최종 제출 후에는 수정 및 '+text+' 할 수 없습니다. 최종 제출하시겠습니까?</h1>'
    if(types == 'mid' || types == 'final') {
        studyModal += '<button type="button" onclick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+examPage+'\',\''+testEnd+'\')">확인</button>'
    }else{
        studyModal += '<button type="button" onclick="reportSave(\''+testEnd+'\'),studyRemove(\''+types+'\')">확인</button>'
    }
    studyModal += '<button type="button" onclick="answerRomeve()">취소</button>'
    studyModal += '</div>'
    $('#screenModal').append(studyModal)
}

//제출답 서버 저장
function answerSave(types,contentsCode,lectureOpenSeq,examList,examPage,testEnd,endTime,closed) {
	var sendSerial = $('form.answerForm').serialize();
	if(testEnd == 'Y') {
		var testEndAdd = '&testEnd=Y';
	} else {
		var testEndAdd = '';
	}
	if(endTime == 'Y') {
		var endTimeAdd = '&endTime=Y';
	} else {
		var endTimeAdd = '';
	}
	var lectureEnd = $('#lectureEnd').val();
	lectureEnd = lectureEnd.split('-');

	var studySeq = $('#studySeq').val();

	$.ajax({
		url: testApi,
		type:'POST',
		data:sendSerial+testEndAdd+endTimeAdd,
		dataType:'JSON',
		success:function(data){
			if(testEnd == 'Y') {
				if(data.result == 'success'){
					$('.studyModal').remove()
                    var studyModal = '';
                    studyModal += '<div class="studyModal">'
                    studyModal += '<h1>최종제출 되었습니다. 결과 확인은 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 <br/>1주일 이내에 가능합니다. </h1>'
                    studyModal += '<button type="button" onclick="studyModalClose(); viewStudyDetail('+studySeq+',\''+contentsCode+'\','+lectureOpenSeq+'); ">확인</button>'
                    studyModal += '</div>'
                    $('#screenModal').append(studyModal)
					//listAct();

				}else if(data.result == 'timeEnd') {
					$('.studyModal').remove()
                    var studyModal = '';
					studyModal += '<div class="dark"></div>'
                    studyModal += '<div class="studyModal">'
                    studyModal += '<h1>응시시간이 종료되었습니다. 마지막 저장된 답안까지 자동 제출됩니다.<br>결과 확인은 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 1주일 이내에 가능합니다.</h1>'
                    studyModal += '<button type="button" onclick="studyModalClose(); viewStudyDetail('+studySeq+',\''+contentsCode+'\','+lectureOpenSeq+');">확인</button>'
                    studyModal += '</div>'
                    $('#screenModal').append(studyModal)
					//listAct();
				}else{
					$('.studyModal').remove()
                    var studyModal = '';
                    studyModal += '<div class="studyModal">'
                    studyModal += '<h1>'+data.result+'</h1>'
                    studyModal += '<button type="button" onclick="answerRomeve()">확인</button>'
                    studyModal += '</div>'
                    $('#screenModal').append(studyModal)
				}
			} else {
				if(closed != 'Y') {
					examRequest(types,contentsCode,lectureOpenSeq,examList,examPage);
				}
			}
		},
		fail:function(){
			alert('저장에 실패하였습니다. 창을 다시 여시기 바랍니다.');
		}
	})
}


//과제 제출
function reportSave(reportEnd) {
	var contentsCode = $('.answerForm input[name="contentsCode"]').val();
	var lectureOpenSeq = $('.answerForm input[name="lectureOpenSeq"]').val();
	var lectureEnd = $('.answerForm input[name="lectureEnd"]').val();

	var yearS = lectureEnd.substr(0,4);
	var mothS = lectureEnd.substr(5,2);
	var dayS = lectureEnd.substr(8,2);

	var reportPart = new Array
	var errorCnt = 0;
	$('.reportArea').each(function(){
        var reportSeq = $(this).children('input[name="seq[]"]').val()
		var reportTitle = $(this).children('h1').html();
		if($(this).children('input[name="answerType[]"]').val() == 'attach' || $(this).children('input[name="answerType[]"]').val() == "null"){
			if($('input[name="answerAttach'+reportSeq+'"]').val() == '' || $('input[name="answerAttach'+reportSeq+'"]').val() == 'undefined'){
				if($('input[name="fileCheck'+reportSeq+'"]').val() != 'filechecked'){
					errorCnt ++
					alert('제출 파일이 없습니다. 파일을 등록하시기 바랍니다.');
					//doTest('report',contentsCode,lectureOpenSeq)

				}
			}
		}
		if($('textarea[name="answerText'+reportSeq+'"]').val() == ''){
			errorCnt ++
			alert('작성한 내용이 없습니다. 내용을 작성하시기 바랍니다.');
			//$('#screenModal').remove();
			//doTest('report',contentsCode,lectureOpenSeq)

		}
    });

	if(reportEnd == 'Y') {
		$('input[name="reportEnd"]').val('Y');
	}
	if(errorCnt == 0){
		$('.answerForm').ajaxForm({
			dataType:'text',
			beforeSubmit: function (data,form,option) {
				return true;
			},
			success: function(data,status){
				if(reportEnd == 'Y') {
					studyModalClose();
//					$.get(reportApi,{'reportEnd':reportEnd, 'contentsCode':contentsCode,'lectureOpenSeq':lectureOpenSeq},function(data){
//						$.each(data.studyReport, function(){
//							var uri = this.seq;
//							var group_id = this.reportSeq;
//							var reserve_date = this.reserveDate;
//							var title = loginUserID + this.seq;
//							var content = '';
//							var file1 = '';
//							if(this.answerType == "text"){
//								content = this.answerText
//							}else{
//								file1 = 'https://modulearning.kr'+this.attachLink;
//							}
							alert("제출이 완료되었습니다.");
							viewStudyDetail(data.studySeq,contentsCode,lectureOpenSeq);
//							$.get('../api/copyKiller/insert_copykiller_content.php',{'uri':uri,'group_id':group_id,'title':group_id,'content':content,'file1':file1,'reserve_date':reserve_date})
//						})
//					})
				}else{
					alert("임시 저장되었습니다.\n"+yearS+"년 "+mothS+"월 "+dayS+"일 23시 50분까지 꼭 최종제출을 하여야 합니다.");
					$('#screenModal').remove();
					doTest('report',contentsCode,lectureOpenSeq)
				}
			},
			error: function(){
				//에러발생을 위한 code페이지
				alert('저장에 실패하였습니다. 창을 다시 여시기 바랍니다.');
			}
		});
		$('.answerForm').submit();
	}
}

function tabVisibility2(){ //탭 백그라운드 체크
	let currentVisibility = !document.hidden;
	if(!currentVisibility){
		clearTimeout(setIntervalTime);
	}
	if(currentVisibility) {
		examEndTime = (new Date(testEndTime).getTime() - new Date().getTime() + 1) / 1000;
		setIntervalTime = setTimeout (setClock, 1000);
	}
}

//서영기 - 맨끝 변수 'Y' --> stat
function setClock(types,contentsCode,lectureOpenSeq,examList,examPage,stat) { // 남은시간 체크
//시간이 다되면
	if(parseInt(examEndTime)==0) {
		timer = '<span>남은 시간</span><strong>00:00</strong>';
		$('.timer').html(timer);
		examTimeOut(types,contentsCode,lectureOpenSeq,examList,examPage);
		clearTimeout(setIntervalTime);
	 } else if(parseInt(examEndTime) >= 1) {
		var Minutes = parseInt(examEndTime% 36000 / 60);
		var Seconds = parseInt(examEndTime% 3600 % 60 );
		var	Value = ((Minutes < 10) ? "0" : "") + Minutes;
			Value += ((Seconds < 10) ? ":0" : ":") + Seconds;
		timer = '<span>남은 시간</span> <strong>'+Value+'</strong>';
		$('.timer').html(timer);
		examEndTime = examEndTime - 1;
		setIntervalTime = setTimeout (setClock, 1000);
	}
}


function examTimeOut(types,contentsCode,lectureOpenSeq,examList,examPage) {
	answerSave(types,contentsCode,lectureOpenSeq,examList,examPage,'Y','Y');
}

function studyModalClose(types) {
	if(types=='final'){
		var end = testEndTime.split(':');

		var endTime = $('.timer strong').html();
        $('.studyModal').remove()
        var studyModal = '';
            studyModal += '<div class="dark"></div>'
            studyModal += '<div class="studyModal">'
            studyModal += '<h1>평가 시간이 '+endTime+' 남았습니다.<br/><strong class="red">최종평가 응시 완료시간은 '+end[0]+'시 '+end[1]+'분 '+end[2]+'초까지입니다.</strong> <br/>응시 도중 접속종료 등의 상태에서도 중단 없이 계속 흘러가며,<br/>평가시간이 지나면 작성한 답안까지 저장되어 자동 제출됩니다.<br/>창을 닫으시겠습니까?</h1>'
            studyModal += '<button type="button" onclick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+examPage+'\',\'\',\'\',\'Y\'),studyRemove(\''+types+'\', \'auto\')">확인</button>'
            studyModal += '<button type="button" onclick="answerRomeve()">취소</button>'
            studyModal += '</div>'
            $('#screenModal').append(studyModal)
	}else if(types=='mid'){
		var endTime = $('.timer strong').html();
        $('.studyModal').remove();
        var studyModal = '';
            studyModal += '<div class="dark"></div>'
            studyModal += '<div class="studyModal">'
            studyModal += '<h1>최종제출까지 완료하여야 다음 차시 학습이 가능합니다. 창을 닫으시겠습니까? </h1>'
            studyModal += '<button type="button" onclick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+examPage+'\',\'\',\'\',\'Y\'),studyRemove(\''+types+'\', \'auto\')">확인</button>'
            studyModal += '<button type="button" onclick="answerRomeve()">취소</button>'
            studyModal += '</div>'
            $('#screenModal').append(studyModal)
	}else if(types=='report'){
		var endTime = $('.timer strong').html();
        $('.studyModal').remove();
		var lectureEnd = $('.answerForm input[name="lectureEnd"]').val();
		var yearS = lectureEnd.substr(0,4);
		var mothS = lectureEnd.substr(5,2);
		var dayS = lectureEnd.substr(8,2);

        var studyModal = '';
            studyModal += '<div class="dark"></div>'
            studyModal += '<div class="studyModal">'
            studyModal += '<h1>'+yearS+'년 '+mothS+'월 '+dayS+'일 23시 50분까지 제출해야 합니다.<br>과제 제출 전입니다. 창을 닫으시겠습니까?  </h1>'
            studyModal += '<button type="button" onclick="studyRemove(\''+types+'\',\'auto\')">확인</button>'
            studyModal += '<button type="button" onclick="answerRomeve()">취소</button>'
            studyModal += '</div>'
            $('#screenModal').append(studyModal);
	}else{
        studyRemove(types);
        $('body').css('overflow','auto')
    }
	listAct();
}

//최종평가 모달 닫기
function studyRemove(types, auto){
	if(types !== undefined){
		hrdCheckScore(types, cc, los, 0,'E');
	}
    $('#screenModal').remove();
    if (auto == 'auto'){
        $('body').css('overflow','auto')
    }
	document.removeEventListener('visibilitychange', tabVisibility2);
}

//경고 모달 취소 닫기
function answerRomeve(){
    $('.studyModal, .dark').remove();
}

//인증창
function certPassModal(startDate,studySeq,contentsCode,lectureOpenSeq){
	$('body').css('overflow','hidden');
	var studyModals = '';
	studyModals += '<div id="screenModal" style="display:none;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	studyModals += '<img src="../images/study/img_test01.png" />';
	studyModals += '<h1>학습자 주의사항</h1>';
	studyModals += '<h2 class="contentsName">학습자 주의사항 및 본인인증</h2>';

	//타입에 따라 버튼 액션 호출 필요
	studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';

	//주의사항
	studyModals += '<div class="caution">';
	studyModals += '<img src="../images/study/img_notice_big.png" />';
	//주의사항
	studyModals += '<h1>주의사항</h1>';
	var cautionApi = $.get('../api/apiSiteInfo.php',function(data){
		studyModals += data.caution;
		studyModals += '<p><h1>학습 주의사항</h1>';
		studyModals += '<p>순차학습으로 진행되며, 1일 최대 <strong>8차시</strong>까지 학습이 가능합니다.<br />';
		studyModals += '평가(중간/최종)와 과제는 <strong>1회만</strong> 응시 가능하며, 최종평가는 응시 제한시간이 있습니다.<br />';
		studyModals += '진도율(중간평가 50% 이상, 최종평가/과제 80% 이상)에 따라 응시 가능 여부가 달라집니다.<br /><br />';
		studyModals += '모든 과정의 수료기준은 진도율 80% 이상, 총점 60점 이상이 되어야 합니다.<br /><br />';
		studyModals += '<strong>※ 수료기준에 도달한 경우에만 고용 노동부로부터 훈련비용의 지원을 받을 수 있습니다.</strong></p></p>';
		studyModals += '</div>';

		studyModals += '<div class="mobileCert">';
		studyModals += '<form class="certForm" action="javascript:agreeCert()">'
		studyModals += '<input type="hidden" name="lectureStart" value="'+startDate+'" />'
		studyModals += '<input type="hidden" id="certPass"  name="certPass" value="" />'
		studyModals += '<input type="hidden" name="contentsCode" value="'+contentsCode+'" />' //2018-04-18 본인인증 1일 1회(강혜림 추가)
		studyModals += '<input type="hidden" name="lectureOpenSeq" id="lectureOpenSeq" value="'+lectureOpenSeq+'" />'
		studyModals += '<input type="hidden" name="resultCode" id="resultCode" value="" />' //2020-04-21 추가
		studyModals += '</form>';
		studyModals += '<ul><li>';
		studyModals += '<h1>본인인증</h1>';
		studyModals += `<button class="btnPhone" type="button" onclick="captchaRun('','start','hrdMOTP.php?contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&type=start');">본인인증</button>&nbsp;&nbsp;`;
		studyModals += '<button type="button" onClick="window.open(\'http://www.niceipin.co.kr\')" class="btnIpin">민간아이핀센터 바로가기</button>&nbsp;&nbsp;';
	    studyModals += '<button type="button" class="btnIpin" onClick="window.open(\'../attach/docs/한국산업인재융합교육원_민간아이핀.pdf\')">민간아이핀 발급순서 보기</button>';
		studyModals += '<br /><span class="red ipinInfo" id="ipinInfo">※ 타인 명의 휴대폰인 경우 민간아이핀을 발급 후 아이핀 인증으로 진행해 주시기 바랍니다. (아이핀/마이핀가입)</span>';
		studyModals += '</div>';

		studyModals += '<div class="btnArea">';
		studyModals += '<button onclick="agreeCert('+studySeq+',\''+contentsCode+'\','+lectureOpenSeq+')"><img src="../images/member/btn_ok.png" /></button>';
		studyModals += '</div>';
		studyModals += '</div>';
		$('#footer').after(studyModals);
		$('#screenModal').fadeIn('fast');
	})
}

function certPassModal2(startDate, studySeq, contentsCode, lectureOpenSeq, userAuth) {
	$('body').css('overflow', 'hidden');
	var studyModals = '';
	studyModals += '<div id="screenModal" style="display:none;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	studyModals += '<img src="../images/study/img_test01.png" />';
	studyModals += '<h1>학습자 유의사항</h1>';
	studyModals += '<h2 class="contentsName">학습자 유의사항 및 본인인증</h2>';

	//타입에 따라 버튼 액션 호출 필요
	studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';

	//주의사항
	studyModals += '<div class="caution">';
	studyModals += '<img src="../images/study/img_notice_big.png" />';
	//주의사항
	studyModals += '<h1>본인인증</h1>';
	studyModals += '<p>수강생들은 최초 수업시 본인인증을 하고 있습니다.<br/>';
	studyModals += '고객님의 개인정보는 본인의 동의없이 제3자에게 제공되지 않으며,<br/>';
	studyModals += '개인정보 취급방침에 따라 외부 위협으로 부터 안전하게 보호 되고 있습니다.<br/>';
	studyModals += '고객님께서 입력하신 정보를 안전하고 정확하게 관리하기 위해 최선을 다하겠습니다.<br/><br/><br/>';
	studyModals += '* 휴대폰 인증 시 본인 명의가 아닌 경우 정상적으로 진행되지 않을 수 있습니다.<br/>';
	studyModals += '* 명의 문제로 인한 휴대폰 인증 실패 시 아이핀 인증을 이용하시기 바랍니다.';
	studyModals += '</p>';
	// studyModals += '<p>「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 <strong>제44조</strong>의9,<br />';
	// studyModals += ' 같은 법 시행령 제35조의2에 따른 불법촬영물등 유통방지책임자 교육입니다.<br />';
	// studyModals += '수료기준은 진도율 <strong>95%</strong> 이상이 되어야 합니다.<br /><br /></p>';
	studyModals += '</div>';
	studyModals += '<div class="mobileCert">';
	studyModals += '<form class="certForm" action="javascript:agreeCert()">'
	studyModals += '<input type="hidden" name="lectureStart" value="'+startDate+'" />'
	studyModals += '<input type="hidden" id="certPass"  name="certPass" value="" />'
	studyModals += '<input type="hidden" name="contentsCode" value="'+contentsCode+'" />' //2018-04-18 본인인증 1일 1회(강혜림 추가)
	studyModals += '<input type="hidden" name="lectureOpenSeq" id="lectureOpenSeq" value="'+lectureOpenSeq+'" />'
	studyModals += '<input type="hidden" name="resultCode" id="resultCode" value="" />' //2020-04-21 추가
	studyModals += '</form>';
	studyModals += '<ul><li>';
	studyModals += '<h1>본인인증</h1>';
	studyModals += `<button class="btnPhone" type="button" onclick="captchaRun('','start','hrdMOTP.php?contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&type=start');">본인인증</button>&nbsp;&nbsp;`;
	studyModals += '<button type="button" onClick="window.open(\'http://www.niceipin.co.kr\')" class="btnIpin">민간아이핀센터 바로가기</button>&nbsp;&nbsp;';
	studyModals += '<button type="button" class="btnIpin" onClick="window.open(\'../attach/docs/한국산업인재융합교육원_민간아이핀.pdf\')">민간아이핀 발급순서 보기</button>';
	studyModals += '<br /><span class="red ipinInfo" id="ipinInfo">※ 타인 명의 휴대폰인 경우 민간아이핀을 발급 후 아이핀 인증으로 진행해 주시기 바랍니다. (아이핀/마이핀가입)</span>';
	studyModals += '</div>';
	studyModals += '<div class="btnArea">';
	studyModals += '<button onclick="agreeCert(' + studySeq + ',\'' + contentsCode + '\',' + lectureOpenSeq + ')"><img src="../images/member/btn_ok.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';
	$('#footer').after(studyModals);
	$('#screenModal').fadeIn('fast');
}


function mobileCheck(userName,userBirth,sex,m_retCD,m_trnID,m_trnDT){
	if (loginUserID == 'eungmin2') {
		alert(loginUserBirth);
		alert(userBirth.substring(2));
	}
	if(userBirth.substring(2) != loginUserBirth) {
		alert('본인인증은 되었으나 모두의러닝에 등록된 회원정보와 일치하지 않습니다. 문제가 있는 경우 고객센터로 연락주시기 바랍니다.');
	} else {
		//2020-06-23 14:00 ~ 2020-06-23 15:30 EMON 서버점검 데이터 전송 예외처리
		var banStartDate = new Date(2020, 5, 23, 14, 00);
		var banEndDate = new Date(2020, 5, 23, 15, 00);
		var inputDate = new Date();

		if(inputDate >= banStartDate && inputDate <= banEndDate){
			$.ajax({
				method:"POST",
				url:"/api/apiSendHrd.php",
				dataType:"json",
				data: {
								AGTID : "kiraedu",
								USRID : USRID,
					COURSE_AGENT_PK : COURSE_AGENT_PK,
					CLASS_AGENT_PK : CLASS_AGENT_PK,
								m_Ret : "T",
							m_retCD : m_retCD,
							m_trnID : m_trnID,
							m_trnDT : m_trnDT,
							EVAL_CD : EVAL_CD,
							EVAL_TYPE : EVAL_TYPE,
							CLASS_TME : CLASS_TME,
							AUTH_TYPE : AUTH_TYPE
					}
				})
		} else {
			var COURSE_AGENT_PK = $('#certContentsCode').val();
			var CLASS_AGENT_PK = $('#certContentsCode').val()+','+$('#lectureOpenSeq').val();

			try {
				$.ajax({
					type : 'POST',
					url  : 'https://emon.hrdkorea.or.kr/EAIServer/SOURCE/ExConn/LMS/pAuthLog.jsp',
					crossDomain: true,
					data : {
						AGTID : 'kiraedu',
						USRID : loginUserID,
						m_Ret : 'T',
						m_retCD : m_retCD,
						m_trnID : m_trnID,
						m_trnDT : m_trnDT,
						COURSE_AGENT_PK : COURSE_AGENT_PK,
						CLASS_AGENT_PK : CLASS_AGENT_PK
					},
					dataType : 'xml',
					success : function(xml) {
						if($(xml).find('RetVal').text() != '101') {	//실패시 DB 기록
							// console.log(data);

							$.ajax({
								method:'POST',
								url:'/api/apiSendHrd.php',
								dataType:'json',
								data: {
												AGTID : 'kiraedu',
												USRID : loginUserID,
									  COURSE_AGENT_PK : COURSE_AGENT_PK,
									   CLASS_AGENT_PK : CLASS_AGENT_PK,
												m_Ret : 'F',
											  m_retCD : m_retCD,
											  m_trnID : m_trnID,
											  m_trnDT : m_trnDT,
											AUTH_TYPE : '101'
									  }
							})

						} else {
							$.ajax({
								method:'POST',
								url:'/api/apiSendHrd.php',
								dataType:'json',
								data: {
									AGTID : 'kiraedu',
									USRID : loginUserID,
									COURSE_AGENT_PK : COURSE_AGENT_PK,
									CLASS_AGENT_PK : CLASS_AGENT_PK,
									m_Ret : 'T',
									m_retCD : m_retCD,
									m_trnID : m_trnID,
									m_trnDT : m_trnDT,
									AUTH_TYPE : '101'
								}
                            })
                            $('div.mobileCert > ul form, .ipinInfo').remove();
                            $('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
                            $('input[name="certPass"]').val('Y');
                            $("#resultCode").val(m_retCD);
						}
					},
					error : function(xhr, textStatus, error) {
						alert("오류발생 : " + error);
					}
				});
			} catch(e) {
				alert("오류발생 : " + e.message);
			}
		}


	}

/*
	if(loginUserID == 'zeroha2') { // 생년월일 비교
		if(userBirth.substring(2) != loginUserBirth) {
			alert('본인인증은 되었으나 이상에듀에 등록된 회원정보와 일치하지 않습니다. 문제가 있는 경우 고객센터로 연락주시기 바랍니다.');
		} else {
			$('div.mobileCert > ul form, .ipinInfo').remove();
			$('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
			$('input[name="certPass"]').val('Y');
		}

	} else { // 이름 비교

		if(userName != loginUserName) {
			alert('인증정보와 회원정보가 일치하지 않습니다. 문제가 있는 경우 고객센터로 연락주시기 바랍니다.');
		} else {
			$('div.mobileCert > ul form, .ipinInfo').remove();
			$('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
			$('input[name="certPass"]').val('Y');
		}
	}
*/
}

function agreeCert(studySeq,contentsCode,lectureOpenSeq){
	if($('input[name="certPass"]').val() != 'Y'){
		alert('휴대폰 또는 아이핀 본인인증을 해주세요.')
	}else{
		var sendData = $('form.certForm').serialize();
		$.post(chapterApi,sendData,function(data){
			if(data.result == 'success'){
				alert('확인이 완료되었습니다.');
				$('#screenModal').remove();
				$('body').css('overflow','auto')
				viewStudyDetail(studySeq,contentsCode,lectureOpenSeq)
			}else{
				alert('에러입니다. 시스템관리자에게 문의하세요.')
			}
		})
	}
}

function keyCheck(event){
	if (event.keyCode == 86 && event.ctrlKey){
		alert('붙여넣기는 불가능합니다.');
		event.returnValue = false;
	}
}


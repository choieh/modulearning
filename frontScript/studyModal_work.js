var testApi = '../api/apiStudyTest.php';
var reportApi = '../api/apiStudyReport.php';
var examList = 2;
var examPage = 1;
var i = 1;
var examEndTime = '';
var timer = '';

function openStudyModal(types,contentsCode,lectureOpenSeq){
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
	}else if(types=='test'){
		studyModals += '<img src="../images/study/img_test02.png" />';
		studyModals += '<h1>최종평가</h1>';
	}else{
		studyModals += '<img src="../images/study/img_report.png" />';
		studyModals += '<h1>과제제출</h1>';
	}
	//강의명 호출
	studyModals += '<h2 class="contentsName"></h2>';
	
	//타입에 따라 버튼 액션 호출 필요
	studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';
	
	//주의사항
	studyModals += '<div class="caution">';
	studyModals += '<img src="../images/study/img_notice_big.png" />';
	//주의사항
	studyModals += '<h1>시험 주의사항</h1>';
	if(types == 'mid'){
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 <strong>80% 이상</strong> 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
	}else if(types == 'test'){
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 <strong>80% 이상</strong> 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
	}else if(types == 'report'){
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 <strong>80% 이상</strong> 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
		studyModals += '<p>모든 수강과정의 평가응시와 과제제출은 진도율이 80% 이상 되어야 가능합니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다. </p>';
	}
	studyModals += '</div>';
	studyModals += '<div class="agreeArea">';
	if(types == 'mid' || types == 'test'){
		studyModals += '<input type="checkbox" name="agree" id="agree" value="agreeOK" />';
		studyModals += '<label for="agree">위 사항을 모두 숙지하였으며, 공정하게 시험에 응시하겠습니다.</label>';
	}else if(types == 'report'){
		studyModals += '<input type="checkbox" name="agree" id="agree" value="agreeOK" />';
		studyModals += '<label for="agree">위 사항을 모두 숙지하였으며, 공정하게 과제를 제출하겠습니다.</label>';
	}
	studyModals += '</div>';
	studyModals += '<div class="btnArea">';
	studyModals += '<button onclick="agreeTest(\''+types+'\',\''+contentsCode+'\','+lectureOpenSeq+')"><img src="../images/study/btn_dotest_big.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';
	$('#footer').after(studyModals);
	$('#screenModal').fadeIn('fast');
}

function agreeTest(types,contentsCode,lectureOpenSeq){
	if($('input[name="agree"]:checked').prop('checked') == true){
		
		$('#screenModal').fadeOut('fast',function(){
			$('#screenModal').remove()
			doTest(types,contentsCode,lectureOpenSeq)
		});
	}else{
		if(types == 'report'){
			alert('과제제출 유의사항에\n동의해주세요');
		}else{
			alert('시험응시 유의사항에\n동의해주세요');
		}
	}
}
function doTest(types,contentsCode,lectureOpenSeq){
	////////////////////////////
	var studyModals = '';
	studyModals += '<div id="screenModal" style="display:none;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	if(types=='mid'){
		studyModals += '<img src="../images/study/img_test01.png" />';
		studyModals += '<h1>중간평가</h1>';
	}else if(types=='test'){
		studyModals += '<img src="../images/study/img_test02.png" />';
		studyModals += '<h1>최종평가</h1>';
	}else{
		studyModals += '<img src="../images/study/img_report.png" />';
		studyModals += '<h1>과제제출</h1>';
	}
	//강의명 호출
	studyModals += '<h2 class="contentsName"></h2>';
	
	//타입에 따라 버튼 액션 호출 필요
	studyModals += '<button type="button" onClick="studyModalClose();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';
	if(types=='mid' || types=='final'){ // 중간, 최종평가
		var answerAjax = $.get(testApi,'testType='+types+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&list=99',function(data){
			var old = new Date(data.testEndTime);
			var now = new Date(data.nowTime);
			var gap = old.getTime() - now.getTime();
			examEndTime = gap/1000;
			setClock();
			studyModals += '<div class="cautionTest">';
			if(types == 'final'){
				studyModals += '<div class="timer">';
				studyModals += '</div>';
			}
			studyModals += '<div class="textArea">';
			studyModals += '<h1>평가 주의 사항</h1>';
			studyModals += '<p>시험은 <strong>1회만 응시가능</strong>하며, 제한시간은 접속종료 등의 상태에서도 중단없이 계속 흘러가게 됩니다.<br />교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다.</p>';
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
			examRequest(types,contentsCode,lectureOpenSeq,examList,examPage);
		})

	}else if(types=='report'){  // 과제
		var reportAjax = $.get(reportApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
				$('#sceenModal div h2').html(data.contentsName)
				studyModals += '<div class="cautionTest">';
				studyModals += '<div class="textArea">';
				studyModals += '<h1>평가 주의 사항</h1>';
				studyModals += '<p>교육생님의 부주의로 인한 평가 미응시와 과제 미제출에 관련해서는 재응시, 다시제출이 불가능합니다.</p>';
				studyModals += '</div>';
				studyModals += '</div>';
				$.each(data.studyReport, function(){
					//문제영역
					studyModals += '<div class="reportArea">';
					studyModals += '<h1>문제.</h1>';
					studyModals += '<h2>'+this.exam.replace(/\n/g,'<br />')+'</h2>';
					//등록문제 다운로드
					if(this.examAttach != null) {
						studyModals += '<a href="'+data.attachExamURL+this.examAttach+'" target="_blank">레포트문제 다운로드</a>';
					}
					studyModals += '</div>';

					studyModals += '<div class="reportSubmit">';
					studyModals += '<ul>';
					if(this.answerAttach == null || this.answerType == 'attach'){
						studyModals += '<li class="select"><img src="../images/study/img_submitfile.png" alt="파일제출" /> 파일로 제출하기</li>';
						studyModals += '<li><img src="../images/study/img_sumitwrite.png" alt="직접작성" /> 직접작성하기</li>';
					}else{
						studyModals += '<li><img src="../images/study/img_submitfile.png" alt="파일제출" /> 파일로 제출하기</li>';
						studyModals += '<li class="select"><img src="../images/study/img_sumitwrite.png" alt="직접작성" /> 직접작성하기</li>';
					}
					studyModals += '</ul>';
					studyModals += '<div>';
					studyModals += '<form class="answerForm" name="answerForm" method="post" action="'+reportApi+'" enctype="multipart/form-data">';
					studyModals += '<input type="hidden" name="reportEnd" value="" />';
					var answerType = '';
					if(this.answerType == null){
						answerType = 'attach'
					}else{
						answerType = this.answerType
					}
					studyModals += '<input type="hidden" name="answerType" value="'+answerType+'" />';
					studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
					studyModals += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
					studyModals += '<ul>';
					if(this.answerAttach == null || this.answerType == 'attach'){
						if(this.answerAttach == null ){
							studyModals += '<li><h1>파일 제출하기</h1>';
						}else{
							studyModals += '<li class="select"><h1>현재 제출파일</h1><a href="'+data.attachAnswerURL+this.attachLink+'" target="_blank">'+this.answerAttach+'</a></li>';
							studyModals += '<li><h1>다시 제출하기</h1>';
						}
						studyModals += '<input type="file" name="answerAttach" /></li>';
						studyModals += '</ul>';
						studyModals += '<div>제출파일은 <strong>마지막에 제출한 파일로 저장되며</strong>, 반드시 모든 확인이 완료되시면 반드시 <strong>최종제출을 눌러주셔야 정상적인 제출</strong>이 완료됩니다.</div>';
					}else{
						studyModals += '<h1>레포트입력하기</h1>';
						if(this.answerText != null){
						  studyModals += '<textarea name="answerText">'+this.answerText+'</textarea>';
						}else{
						  studyModals += '<textarea name="answerText"></textarea>';
						}
						studyModals += '<div>제출파일은 <strong>마지막에 제출한 파일로 저장되며</strong>, 반드시 모든 확인이 완료되시면 반드시 <strong>최종제출을 눌러주셔야 정상적인 제출</strong>이 완료됩니다.</div>';
					}
					studyModals += '</div>';
					studyModals += '</div>';
					studyModals += '</form>';
					studyModals += '<div class="btnArea">';
					studyModals += '<button type="button" onClick="reportSave(\'\')"><img src="../images/study/btn_save.png" /></button>';
					studyModals += '<button type="button" onClick="answerEnd(\'\',\'\',\'\',\'\',\'\',\'Y\')"><img src="../images/study/btn_lastsubmit.png" /></button>';
					studyModals += '</div>';
					studyModals += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
					studyModals += '</div>';
				})

			$('#footer').after(studyModals);
			fileformAct();//파일 첨부 사용시
			$('#screenModal').fadeIn('fast');
		}).done(function(data){
			$('.reportSubmit > ul > li').bind({
				click:function(){
					var types = $(this).index()
					var studyModals = '';
					studyModals += '<input type="hidden" name="reportEnd" value="" />';
					studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
					studyModals += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
					studyModals += '<input type="hidden" name="answerType" value="" />';
					if(types == 0){						
						$('.reportSubmit > ul > li').removeClass('select');
						$('.reportSubmit > ul > li:nth-child(1)').addClass('select');
						studyModals += '<ul>';
						studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
						studyModals += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
						if(data.studyReport[0].answerAttach != null){
							studyModals += '<li class="select"><h1>현재 제출파일</h1><a href="'+data.attachAnswerURL+data.studyReport[0].attachLink+'" target="_blank">'+data.studyReport[0].answerAttach+'</a></li>';
							studyModals += '<li><h1>파일 제출하기</h1>';
						}
						else{
							studyModals += '<li><h1>다시 제출하기</h1>';
						}
						studyModals += '<input type="file" name="answerAttach" /></li>';
						studyModals += '</ul>';
						studyModals += '<div>제출파일은 <strong>마지막에 제출한 파일로 저장되며</strong>, 반드시 모든 확인이 완료되시면 반드시 <strong>최종제출을 눌러주셔야 정상적인 제출</strong>이 완료됩니다.</div>';
					}else{
						$('.reportSubmit > ul > li').removeClass('select');
						$('.reportSubmit > ul > li:nth-child(2)').addClass('select');
						studyModals += '<h1>레포트입력하기</h1>';
						if(data.studyReport[0].answerAttach != null){
							studyModals += '<textarea name="answerText">'+data.studyReport[0].answerText+'</textarea>';
						}else{
							studyModals += '<textarea name="answerText"></textarea>';
						}
						studyModals += '<div>제출파일은 <strong>마지막에 제출한 파일로 저장되며</strong>, 반드시 모든 확인이 완료되시면 반드시 <strong>최종제출을 눌러주셔야 정상적인 제출</strong>이 완료됩니다.</div>';
					}
					$('.answerForm').html(studyModals);
					if(types == 0){
						$('input[name="answerType"]').val('attach');
						fileformAct();//파일 첨부 사용시
					}else{
						$('input[name="answerType"]').val('text');
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
			examView += '<h1>문제 '+this.orderBy+'</h1>';
			examView += '<h2>'+this.exam+'</h2>';
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
					examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example05'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'4\')" value="5" '+selected05+'/>';
					examView += '<label for="example05'+this.seq+'">5.&nbsp;'+this.example05+'</label></li>';
				}
				examView += '</ol>';
			} else if(this.examType=='B'){ // 단답형
				examView += '<input type="text" name="userAnswer'+this.seq+'" onkeyup="answerUpdate('+this.orderBy+',this.value)" value="'+this.userAnswer+'" />';
			} else if(this.examType=='C'){ // 서술형
				examView += '<textarea name="userAnswer'+this.seq+'">'+this.userAnswer+'</textarea>';
			} else if(this.examType=='D'){ // 진위형
				if(this.userAnswer == 1) {
					var selectedOX01 = 'checked="checked"';
				} else if(this.userAnswer == 2) {
					var selectedOX02 = 'checked="checked"';
				}
				examView += '<ol>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example01'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'1\')" value="1" '+selectedOX01+'/>';
				examView += '<label for="example01'+this.seq+'">'+this.example01+'</label></li>';
				examView += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example02'+this.seq+'" onClick="answerUpdate('+this.orderBy+',\'2\')" value="2" '+selectedOX02+'/>';
				examView += '<label for="example02'+this.seq+'">'+this.example02+'</label></li>';
				examView += '</ol>';
			}
		})
		examView += '</form>';
		var btnView = '';
		btnView += '<button type="button" class="fLeft" onClick="answerEnd(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\',\'Y\')"><img src="../images/study/btn_lastsubmit.png" alt="최종제출" /></button>';
		var loadEA = parseInt(data.examList)*parseInt(data.examPage);
		var nextPage = parseInt(examPage)+1;
		var prevPage = parseInt(examPage)-1;
		if(examPage == 1){ // 1페이지
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+nextPage+'\')"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="alert(\'처음입니다.\');"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		} else if(data.totalCount <= loadEA) { // 마지막 페이지
			btnView += '<button type="button" class="fRight" onClick="alert(\'마지막입니다.\');"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\')"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		} else {
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+nextPage+'\')"><img src="../images/study/btn_nextexam.png" alt="다음문제" /></button>';
			btnView += '<button type="button" class="fRight" onClick="answerSave(\''+types+'\',\''+contentsCode+'\',\''+lectureOpenSeq+'\',\''+examList+'\',\''+prevPage+'\')"><img src="../images/study/btn_prevexam.png" alt="이전문제" /></button>';
		}
		$('#examArea').html(examView);
		$('.btnArea').html(btnView);
	})
}

//제출답 반영
function answerUpdate(num,answer) {
	$('.userAnswer'+num).html(answer);
}

function answerEnd(types,contentsCode,lectureOpenSeq,examList,examPage,testEnd) {
	if(confirm('최종제출 후 수정 하실 수 없습니다.\r\r최종제출 하시겠습니까?')) {
		if(types == 'mid' || types == 'test') {
			answerSave(types,contentsCode,lectureOpenSeq,examList,examPage,testEnd);
		} else {
			reportSave(testEnd);
		}
	}
}

//제출답 서버 저장
function answerSave(types,contentsCode,lectureOpenSeq,examList,examPage,testEnd) {
	var sendSerial = $('form.answerForm').serialize();
	if(testEnd == 'Y') {
		var testEndAdd = '&testEnd=Y';
	} else {
		var testEndAdd = '';
	}
	$.ajax({
		url: testApi,
		type:'POST',
		data:sendSerial+testEndAdd,
		dataType:'text',
		success:function(data){
			if(testEnd == 'Y') {
				alert('최종제출 되었습니다.');
				$('#screenModal').remove();
			} else {
				examRequest(types,contentsCode,lectureOpenSeq,examList,examPage);
			}
		},
		fail:function(){
			alert('저장에 실패하였습니다. 창을 다시 여시기 바랍니다.');
		}
	})	
}


//과제 제출
function reportSave(reportEnd) {
	if(reportEnd == 'Y') {
		$('input[name="reportEnd"]').val('Y');
	}
	$('.answerForm').ajaxForm({
		dataType:'text',
		beforeSubmit: function (data,form,option) {
			return true;
		},
		success: function(data,status){
			alert("작성이 완료되었습니다.");
			if(reportEnd == 'Y') {
				studyModalClose();	
			}
		},
		error: function(){
			//에러발생을 위한 code페이지
			alert('저장에 실패하였습니다. 창을 다시 여시기 바랍니다.');
		}
	});
	$('.answerForm').submit();
}

//서영기 - 맨끝 변수 'Y' --> stat
function setClock(types,contentsCode,lectureOpenSeq,examList,examPage,stat) { // 남은시간 체크
//시간이 다되면
	if(parseInt(examEndTime)==0) {
		timer = '<span>남은시간</span><strong>00:00</strong>';
		$('.timer').html(timer);
		examTimeOut(types,contentsCode,lectureOpenSeq,examList,examPage,'Y');
	 } else if(parseInt(examEndTime)>0) {
		var Minutes = parseInt(examEndTime % 36000 / 60); // 시간을 구한 나머지로 분을 구한다.
		var Seconds = parseInt(examEndTime % 3600 % 60 ); 
		var	Value = ((Minutes < 10) ? "0" : "") + Minutes;
			Value += ((Seconds < 10) ? ":0" : ":") + Seconds;
		examEndTime = examEndTime - 1;
		timer = '<span>남은시간</span> <strong>'+Value+'</strong>';
		$('.timer').html(timer);
		setTimeout ("setClock()", 1000); 
	}
}

function examTimeOut() {
	answerSave(types,contentsCode,lectureOpenSeq,examList,examPage,'Y');
}

function studyModalClose() {
	$('#screenModal').remove();
	$('body').css('overflow','auto')
	listAct();
}
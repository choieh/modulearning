var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var surveyAPi = '../api/apiSurvey.php';
var offSurveyApi = '../api/apiOffSurvey.php';
var offSurveyAnswerApi = '../api/apiOffSurveyAnswer.php';
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
		//var lectureEndDate = data.study.lectureEnd.split('-');
		var lists = '';
		if(totalCount != 0){
			$.each(data.study, function(){
				var endDate = this.lectureEnd.split('-');
				//console.log(endDate);
				var certDate = this.certDate;
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

				lists += '<li class="list'+this.seq+'">';
				if (this.serviceType != 8 && this.serviceType != 7) {
                    // console.log(this.serviceType);
				  lists += '<div class="summuryArea" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')">';
                }

				lists += '<ul>';
				if(this.leftDate == '종료'){
					lists += '<li><h1>남은 수강일</h1><strong style="color:red;">'+this.leftDate+'</strong>일</li>';
				}else{
					lists += '<li><h1>남은 수강일</h1><strong>'+this.leftDate+'</strong>일</li>';
				}
				if (this.contentsCode == 'PO0KA2' && this.passOK == 'Y') {
					lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop('+this.seq+');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
				} else if (this.serviceType != '8' && this.serviceType != '7'){
					lists += '<li><h1>차시 진도</h1><strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				}

				lists += '<li><h1>진도율</h1><strong class="totlaProgress01">'+this.progress+'</strong>%</li>';

				lists += '</ul>';
				lists += '<div></div>';
				lists += '<img src="'+this.previewImageURL+this.previewImage+'" alt="강의 이미지" />';
				if(this.contentsName.length > 25) {
					lists += '<h1 style="font-size:14px;">'+this.contentsName+'</h1><br />';
				} else {
					lists += '<h1>'+this.contentsName+'</h1><br />';
				}
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2><br />';
				lists += '<input id="lectureEndDate" type="hidden" value="'+this.lectureEnd+'">';
				if (this.serviceType != 8 || this.serviceType != 7){
					lists += '<h3>첨삭강사 : '+this.tutorName
					if(this.mobile=='Y'){
						lists += '<strong>모바일 학습 가능</strong>';
					}
					lists += '<strong class="score" onClick="alert(\'점수 확인은 학습종료일('+endDate[1]+'월 '+endDate[2]+'일) 이후 1주일 이내에 가능합니다\')">점수확인안내</strong>';
				}
				lists += '</h3>';
				lists += '</div>';

				lists += '<button type="button" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"></button>';
				lists += '</li>';

			})
		}else{
			lists += '<li class="noList">진행 중인 과정이 없습니다.</li>';
		}
		$('#contentsArea > ul').html(lists);
		//$('#titleArea h3 strong.blue').html(totalCount);
		if(totalCount > 0){
			$('#titleArea h3 span').html('총 <strong class="blue">'+totalCount+'</strong>개 과정의 학습이 진행 중입니다.');
		}else{
			$('#titleArea h3 span').html('진행 중인 과정이 없습니다.');
		}

	})
	.done(function(){
		if(lectureOpenSeq != ''){
			viewStudyDetail(seq, contentsCode, lectureOpenSeq)
		}
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq){
	var $studyBlock = $('.list'+studySeq);//변동될 스터디블록
	if ($studyBlock.find('form').length != 0){ //스터디블록 닫기
		$studyBlock.children('ul,table,form, div:not(".summuryArea")').remove(); //18-03-15 한상민
		$studyBlock.removeClass('openClass');
	}else{ //스터디블록열기
		$studyBlock.addClass('openClass');
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			// 2018-04-18 본인인증 1일 1회 (강혜림 추가)
			/*if(loginUserID != 'leehr0523' && loginUserID != 'dnthdgml' && loginUserID != 'cds334'){
				if(data.certDate){
					certDate = data.certDate.substr(0,10);
				}
			}*/
			/*
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
			*/
			var today = data.nowTime.substring(0,10);

			/*if(loginUserID == 'testsms'){
				var qery = (data.serviceType == '1' && data.certPass == 'N') || (data.serviceType == '1' && today != certDate && data.contentsAccredit >= '2018-04-30');
			}else{
				var qery = data.certPass != 'Y' && data.serviceType == '1';
			}*/

			//if((data.serviceType == '1' && data.certPass == 'N') || ((data.serviceType == '1') && today != certDate)){
			if((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N'){
				certPassModal(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
			}else{
				if(data.serviceType == 1 || data.serviceType == 3 || data.serviceType == 9 || data.serviceType == 5){ //2017.07.19 강혜림 서비스타입 5 추가
					chkPassTable(data,studySeq)//최초 진도 테이블
					chkTestArea(data,studySeq)//평가진행 관련 버튼ul
				}
				runStudyList(data,studySeq)
			}
		})
	}
}
//테스트용
function checkform(checkNum){
	//console.log($('.lectureForm'+checkNum).serialize());
}

//버튼 변환스크립트
function writeBtn(btnType,chapter){
	chapter = chapter ? chapter : '';
	var writes = '';

	if(btnType == 'study'){	//학습하기 관련
		if(typeof(chapter) == 'number'){
			writes += '<button type="button" style="background:#4f4f4d; width:80%; color:#F6B618; letter-spacing:5px; border-radius:5px; padding:8px 10px; height:auto; font-weight:bold; font-size:16px; title="학습하기" onclick="studyPop(this,'+chapter+',\'new\')">';
		}else{
			writes += '<button type="button" style="background:#4f4f4d; width:80%; color:#F6B618; letter-spacing:5px; border-radius:5px; padding:8px 10px; height:auto; font-weight:bold; font-size:16px; title="학습하기" onclick="alert(\''+chapter+'\')">';
		}
		writes += '학습하기</button>';

	}else if(btnType == 'continue'){//이어보기 관련
		writes += '<button type="button" style="background:#4f4f4d; width:80%; color:#F6B618; letter-spacing:5px; border-radius:5px; padding:8px 10px; height:auto; font-weight:bold; font-size:16px; title="학습하기" onclick="studyPop(this,'+chapter+',\'new\')">';
		writes += '학습하기</button>';

	}else if(btnType == 'midTest' || btnType == 'finTest'){//중간,최종평가관련
		if(btnType == 'midTest'){
			writes += '<button type="button" title="평가응시" onclick="chkTest(\'mid\',this);">';
		}else{
			writes += '<button type="button" title="평가응시" onclick="chkTest(\'final\',this);">';
		}
		writes += '<img src="../images/study/btn_dotest.png" alt="평가응시" /></button>';

	}else if(btnType == 'reportWrite'){//과제응시관련
		writes += '<button type="button" title="과제 제출" onclick="chkTest(\'report\',this);">';
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

	}
	return writes
}

function captchaRun(chkSeq,types,links){
	chkform = $('form.lectureForm' + chkSeq)
	if(types == 'study'){
		links += '&type=study'
	}else{
		links += '?type='+types+'&chapter=n';
	}
	links += '&chkSeq='+chkSeq;
	links += '&contentsCode='+chkform.children('input[name="contentsCode"]').val();
	links += '&lectureOpenSeq='+chkform.children('input[name="lectureOpenSeq"]').val();
	links += '&studySeq='+chkform.children('input[name="seq"]').val();
	popOpen = window.open(links,"captcha","top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy");
	popOpen.focus();
}
//수강하기
function studyPop(obj,chapter,types,captchChk){

	types = types ? types : '';
	captchChk = captchChk ? captchChk : '';
	var captchaPage = 'hrdMOTP.php';
//	var captchaPage = 'captcha.php';

	var $changeTarget = $(obj).closest('tr').children('td:eq(2)');
	var runningForm =''
	if(typeof(obj) == 'object'){
		runningForm = $(obj).parents('form');
	}else{
		runningForm = $('form.lectureForm'+obj);
	}
	var checkSeq = runningForm.children('input[name="seq"]').val()//seq
	var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
	var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq

	$.get(chapterApi,{'contentsCode':checkCode,'lectureOpenSeq':checkOpenSeq},function(data){
		var today = data.nowTime
		var midTerm = data.midTestChapter;

		//if(eval(midTerm)!=0 &&(eval(chapter) > eval(midTerm)) && (data.midStatus != 'Y' && data.midStatus != 'C') && (eval(data.serviceType)== 1 || eval(data.serviceType)==5 )){
		if(eval(midTerm)!=0 &&(eval(chapter) > eval(midTerm)) && (data.midStatus != 'Y' && data.midStatus != 'C') && eval(data.serviceType)== 1 ){
				alert('중간평가 응시 완료 후에 학습할 수 있습니다.');
		}else if(chapter != 1 && eval(data.progress[(chapter-2)].progress) < 100 && data.midStatus == 'N' && eval(data.serviceType)== 3) {
			alert('해당 과정은 진도율 100%가 되어야 수료입니다. 이전 차시 및 모든 차시 진도율이 100%가 되도록' +
				' 학습해 주세요.');
		}else if(chapter != 1 && eval(data.progress[(chapter-2)].progress) < 100){
			alert('이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.');
		}else if(eval(data.serviceType) == 1 && (chapter-1)%8 == 0 && captchChk == '' && !(today >= captchaBanStart && today <= captchaBanEnd)){//캡챠 실행
			if(types == 'new'){
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter+'&viewNew=new');
			}else{
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter);
			}
			$changeTarget.html(writeBtn('continue',chapter));
		}else{
			runningForm.children('input[name="chapter"]').val(chapter);
			runningForm.children('input[name="types"]').val(types);
			var popupAddress = runningForm.attr('action');
			if(runningForm.children('input[name="sourceType"]').val() != 'book'){
				$('.lectureForm'+checkSeq).attr('action',data.progress[chapter-1].player+'/player/popupStudy.php');

					//if (loginUserID == 'eungmin2') {

					//}

					var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","kiraedu");


				runningForm.submit();
				$changeTarget.html(writeBtn('continue',chapter));
				//진도체크 스크립트
				progressCheck(checkSeq,checkCode,checkOpenSeq,chapter);
			} else {
				/*
				var popupAddress = '/viewer/index.html?Sid='+Sid+'&Code='+contentsCode+'&Chasi='+Chasi+'&Page='+Page+'&MovePage='+MovePage+'&LectureOpenSeq='+lectureOpenSeq+'&PreView=N';
				//popupAddress = '/viewer/index.html?Code=7BOWJ5&Sid=7BOWJ5000000999999guest&Chasi=01&Page=99';
				var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","kiraedu")
				*/
				var Chasi = chapter < 10 ? '0' + chapter : chapter;
				runningForm.children('input[name="Chasi"]').val(Chasi);
				var ContentsCode = runningForm.children('input[name="Code"]').val();
				var lectureOpenSeq = runningForm.children('input[name="LectureOpenSeq"]').val();
				runningForm.attr('action','/viewer/index.php')
				var checkData = $.get(chapterApi,{'contentsCode':ContentsCode,'lectureOpenSeq':lectureOpenSeq},function(data){
					runningForm.children('input[name="Page"]').val(data.progress[chapter-1].mobileLastPage);
					if(types=='new'){
						runningForm.children('input[name="MovePage"]').val(1);
					}else{
						//runningForm.children('input[name="MovePage"]').val(data.progress[chapter-1].lastPage);
						runningForm.children('input[name="MovePage"]').val(999);
					}
					var screenWidth = screen.width;
					var screenHeight = screen.height;
					var player=window.open("","studyWindow","top=0,left=0,height=" + screen.height + ",width=" + screen.width + ",location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizable=yes");
					runningForm.submit();
					$changeTarget.html(writeBtn('continue',chapter));
					progressCheck(checkSeq,ContentsCode,lectureOpenSeq,Chasi);
				})
			}
			studyPopOpen.focus();
			//if(studyPopOpen == null || studyPopOpen.screenLeft == 0){
			//	alert('팝업이 차단되어 있습니다. 팝업을 허용해 주세요.');
			//}


		}

	})
}

function chkTest(types,obj){
	if(typeof(obj)=='object'){
		runningForm = $(obj).parents('form');
	}else{
		runningForm = $('form.lectureForm'+obj);
	}

//	var links = 'captcha.php'
	var links = 'hrdOTP.php';

	var checkSeq = runningForm.children('input[name="seq"]').val()//seq
	var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
	var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq
	$.get(chapterApi,{'contentsCode':checkCode,'lectureOpenSeq':checkOpenSeq},function(data){
		var today = data.nowTime.substr(0,10);
		var nowTime = data.nowTime;
		if(types == 'mid'){
			if(eval(data.totalProgress) < eval(data.midTestProgress)){
				alert('진도율 '+data.midTestProgress+'% 이상 응시 가능합니다.')
			}else if(eval(data.serviceType) == 1 && !(data.midCaptchaTime != null && data.midCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
				captchaRun(checkSeq,types,links)
			}else{
				openStudyModal(types,obj,obj)
			}
		}else{
			if(eval(data.totalProgress) < eval(data.finalTestProgress)){
				if(types == 'final'){
					alert('진도율 '+data.finalTestProgress+'% 이상 응시 가능합니다.')
				}else{
					alert('진도율 '+data.finalTestProgress+'% 이상 제출 가능합니다.')
				}
			}else if(types == 'final'){
				if(eval(data.serviceType) == 1 && !(data.testCaptchaTime != null && data.testCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
					captchaRun(checkSeq,'final',links)
				}else{
					openStudyModal(types,obj,obj)
				}
			}else if(types == 'report'){
				if(eval(data.serviceType) == 1 && !(data.reportCaptchaTime != null && data.reportCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
					captchaRun(checkSeq,'report',links)
				}else{
					openStudyModal(types,obj,obj)
				}
			}
		}
	})
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
	var lectureEndDate = $('#lectureEndDate').val();
	var lectureEnd = lectureEndDate.split('-');
	$.get(resultApi,'lectureOpenSeq='+lectureOpenSeq+'&testType='+testType,function(data){
		var lectureEnd = data.lectureEnd.split('-');
		if(testType == 'mid') {
			alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과보기는 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.');
		} else if(testType == 'final') {
			if(data.totalCount == data.userCount) {
				alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과보기는 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.');
			} else {
				alert('출제된 '+data.totalCount+'문항 중 '+data.userCount+'문항 응시 완료하였습니다. 결과보기는 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.');
			}
		} else {
			alert('과제 제출을 완료하였습니다. 결과보기는 학습종료일('+lectureEnd[1]+'월 '+lectureEnd[2]+'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.');
		}
	})
}



//post관련 업데이트
//1-진도변경
function progressCheck(checkSeq,checkCode,checkOpenSeq,checkchapter){
	clearInterval(progressTime);
	var progressCheckTime = 5000; //진도체크시간
	//진도보내기 시간별
	progressTime = setInterval(function(){progressChange(checkSeq,checkCode,checkOpenSeq,checkchapter)},progressCheckTime)
	//alert(checkSeq+'/'+checkCode+'/'+checkOpenSeq+'/'+cehckchapter)
}

//진도체크에 따른 강의보기 기능
function progressChange(checkSeq,checkCode,checkOpenSeq,checkchapter){
	var check= $.get(chapterApi,'contentsCode='+checkCode+'&lectureOpenSeq='+checkOpenSeq,function(data){
		var $beforeProgress = Number($('.list'+checkSeq+' .totlaProgress01').html());

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

		//진도율에 따른 평가상태 변경
		if(($beforeProgress <= eval(data.midTestProgress) && eval(data.totalProgress) >= eval(data.midTestProgress))||($beforeProgress <= eval(data.finalTestProgress) && data.totalProgress >= eval(data.finalTestProgress))){
			chkTestArea(data,checkSeq)
		}
		var i=1
		$.each(data.progress, function(){//전체 진도율갱신
			var changeTr = $('.lecture'+checkSeq+i);
			changeTr.children('td').eq(1).html(this.progress+'%');
			chapterHtml = '<strong>'+this.chapterName+'</strong><br />';
			if(data.progress[(i-1)].endTime != null){
				chapterHtml += '교육이수 시간 : '+this.endTime+'<br />';
				chapterHtml += '접속아이피 : '+this.studyIP;
			}
			changeTr.children('th').html(chapterHtml);
			i++;
		})
		if($beforeProgress <= eval(data.midTestProgress) && data.totalProgress >= eval(data.midTestProgress)){//평가 응시가능 알림
			if(data.midstatus != 'C') {
				$('.list'+checkSeq+' .midStatus').html('<strong class="blue">응시 가능</strong>')
			} else {
				$('.list'+checkSeq+' .midStatus').html('<strong class="blue">응시 완료</strong>')
			}
		}else if($beforeProgress <= eval(data.finalTestProgress) && data.totalProgress >= eval(data.finalTestProgress)){
			$('.list'+checkSeq+' .finStatus').html('<strong class="blue">응시 가능</strong>')
			$('.list'+checkSeq+' .reportStatus').html('<strong class="blue">제출 가능</strong>')
		}
	})
}

function openDetail(viewCode){
	popOpen = window.open("/study/lecturepop.php?contentsCode="+viewCode,"captcha","top=0,left=0,width=680,height=620,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","study");
	popOpen.focus();
}

function openPopup(linkAddress){
	popOpen = window.open(linkAddress,"captcha","top=0,left=0,width=380,height=460,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","study");
	popOpen.focus();
}

//실제 구동 화면
function chkPassTable(data,writeTarget){//수강기준 테이블
	var chkTable = '';
/*
	//맞춤형 자료제공
	if(data.setSummaryYN == 'Y') {
		if(data.setSummary != null) {
			studyDetails += '<ul class="setSummaryUI">';
			studyDetails += '<li class="setSummary" style="width:100%; box-sizing:border-box; padding-top:20px">';
			studyDetails += '<button type="button" onclick="window.open(\'../lib/fileDownLoad.php?fileName='+encodeURI(data.setSummaryLink)+'&link=/attach/setSummary/'+encodeURIComponent(data.setSummaryLink)+'\')" style="margin-top:0; background:transparent; border:none; width:90px; height:25px;">';
			studyDetails += '<img src="../images/study/btn_down.png" alt="다운로드"/></button>';
			studyDetails += '<strong style="font-size:15px">보충자료</strong>';
			studyDetails += '<span style="color:#787878; padding-left:15px;">나에게 맞는 보충자료를 확인하세요!</span>';
			studyDetails += '</li>';
			studyDetails += '</ul>';

		} else {
			studyDetails += '<ul class="setSummaryUI">';
			studyDetails += '<li class="setSummary" style="width:100%; box-sizing:border-box; padding-top:20px">';
			studyDetails += '<button type="button" onclick="alert(\'중간평가 응시 후 취득 점수에 따라 보충자료가 제공됩니다.\')" style="margin-top:0; background:transparent; border:none; width:90px; height:25px;">';
			studyDetails += '<img src="../images/study/btn_down.png" alt="다운로드"/></button>';
			studyDetails += '<strong>보충자료</strong>';
			studyDetails += '<span style="color:#787878; padding-left:15px;">중간평가 응시 후 취득 점수에 따라 보충자료가 제공됩니다.</span>';
			studyDetails += '</li>';
			studyDetails += '</ul>';
		}
	}
*/






	if(data.sourceType == 'book'){
		chkTable += '<ul class="bookMenu">';
		chkTable += '<li onclick="bookPop(\'scrab\',\''+data.contentsCode+'\')">';
        chkTable += '<div><img src="../images/study/icon_scrap.png" alt="스트랩 아이콘"></div>';
        chkTable += '<h1>스크랩<br/><span>상세보기</span></h1>'
        chkTable += '</li>';
		chkTable += '<li onclick="bookPop(\'linkMent\',\''+data.contentsCode+'\')" style="border-right:1px solid #bfc3c4;">';
        chkTable += '<div><img src="../images/study/icon_opinion.png" alt="스트랩 아이콘"></div>';
        chkTable += '<h1>의견공유<br/><span>상세보기</span></h1>'
        chkTable += '</li>';
		chkTable += '</ul>';
	}
	$('.list'+writeTarget+' .summuryArea').after(chkTable)

}

function chkTestArea(data,writeTarget){//평가진행 관련 버튼ul
	//평가관련
	if($('.list'+writeTarget+' > ul').length == 0){
		$('.list'+writeTarget+' table.passCheck').after('<ul></ul>')
		var testUl = '';
		testUl += '<li class="middleTest"></li>'
		testUl += '<li class="lastTest"></li>'
		testUl += '<li class="report"></li>'
		$('.list'+writeTarget+' > ul').html(testUl)
	}
	//전체 공통
	var today = data.nowTime.substr(0,10);
	var nowTime = data.nowTime;
	var contentsCode = data.contentsCode;
	var lectureOpenSeq = data.lectureOpenSeq;
	//중간평가
	var midWrite = '';
	var midtext = '';
	var midMsg = '';
	var midLink = '';
	if(data.serviceType == 3) {
		midtext = '평가 없는 과정'
		midMsg = '<strong class="red">평가 없음</strong>';
		midLink = 'alert(\''+midtext+'\')';
	} else {
		if(eval(data.totalProgress) < eval(data.midTestProgress) && data.midStatus != null){
			midtext = '진도율 '+data.midTestProgress+'% 이상 응시 가능'
			midMsg = '<strong class="red">진도 부족</strong>';
			midLink = 'alert(\'진도율 '+data.midTestProgress+'% 이상 응시 가능합니다.\')';
		}else if(data.midStatus == null){
			midtext = '평가 없는 과정'
			midMsg = '<strong class="red">평가 없음</strong>';
			midLink = 'alert(\''+midtext+'\')';
		}else{
			var captchaLink = 'captcha.php?type=mid&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
			if(data.midStatus == 'N' || data.midStatus == 'V') { //평가응시 전,중
				if(data.serviceType == 1 && (data.midCaptchaTime == null || data.midCaptchaTime.substr(0,10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){//일반 과정일시 캡챠 적용
					midLink = 'openPopup(\''+captchaLink+'\')';
				}else{
					midLink = 'openStudyModal(\'mid\',\''+contentsCode+'\','+lectureOpenSeq+')';
				}
				if(data.midStatus == 'N'){ //응시관련 메세지
					if(data.serviceType == 1){
						midMsg = '<strong class="blue">응시 하기</strong>';
					}else{
						midMsg = '<strong class="blue">응시하기</strong>';
					}
				}else{
					midMsg = '<strong class="blue">응시 중</strong>';
				}
				midtext = '<span class="red">응시 마감 : '+data.lectureEnd.substr(0,10)+' 23:50까지</span>';
			}else if(data.midStatus == 'Y' || data.midStatus == 'C') { //평가응시 후
				midLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'mid\')';
				midMsg = '<strong class="blue">응시 완료</strong>';
				midtext = '응시일 : '+data.midSaveTime.substr(0,10);
			}
		}
	}
	midWrite += '<h1>중간평가</h1>'+midMsg;
	midWrite += '<br /><span>'+midtext+'</span>'
	$('.list'+writeTarget+' li.middleTest').html(midWrite)
	$('.list'+writeTarget+' li.middleTest').attr('onclick',midLink);

	//최종평가
	var finWrite = '';
	var fintext = '';
	var finMsg = '';
	var finLink = '';
	if(data.serviceType == 3) {
		fintext = '평가 없는 과정'
		finMsg = '<strong class="red">평가없음</strong>';
		finLink = 'alert(\''+fintext+'\')';
	} else {
		if(data.totalProgress < eval(data.finalTestProgress) && data.testStatus != null){
			fintext = '진도율 '+data.finalTestProgress+'% 이상 응시 가능'
			finMsg = '<strong class="red">진도 부족</strong>';
			finLink = 'alert(\'진도율 '+data.finalTestProgress+'% 이상 응시 가능합니다.\')';
		}else if(data.testStatus == null){
			fintext = '평가 없는 과정'
			finMsg = '<strong class="red">평가없음</strong>';
			finLink = 'alert(\''+fintext+'\')';
		}else{
			var captchaLink = 'captcha.php?type=final&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
			if(data.testStatus == 'N') {
				if(data.serviceType == 1 && (data.testCaptchaTime == null || data.testCaptchaTime.substr(0,10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){//일반 과정일시 캡챠 적용
					finLink = 'openPopup(\''+captchaLink+'\')';
				}else{
					finLink = 'openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')';
				}
				if(data.serviceType == 1){
					finMsg = '<strong class="blue">응시 하기</strong>'
				}else{
					finMsg = '<strong class="blue">응시하기</strong>'
				}
				fintext = '<span class="red">제한시간 : '+data.testTime+'분</span>'
			} else if(data.testStatus == 'V') {
				if(data.nowTime >= data.testEndTime) {
					finLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')';
					finMsg = '<strong class="blue">응시 완료</strong>'
					fintext = '시간 초과로 인한 응시 종료';
				} else {
					//20170809 서영기 if문 결과 값 수정
					if(data.serviceType == 1 && (data.testCaptchaTime == null || data.testCaptchaTime.substr(0,10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
						finLink = 'openPopup(\''+captchaLink+'\')';
					}else{
						finLink = 'openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')';
					}
					finMsg = '<strong class="blue">응시 중</strong>'
					fintext = '<span class="red">'+data.testEndTime+'까지</span>';
				}
			}else if(data.testStatus == 'Y' || data.testStatus == 'C') { //평가응시 후
				finLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')';
				finMsg = '<strong class="blue">응시 완료</strong>';
				fintext = '응시일 : '+data.testSaveTime.substr(0,10);
			}
		}
	}
	finWrite += '<h1>최종평가</h1>'+finMsg;
	finWrite += '<br /><span>'+fintext+'</span>'
	$('.list'+writeTarget+' li.lastTest').html(finWrite)
	$('.list'+writeTarget+' li.lastTest').attr('onclick',finLink);

	//과제 제출 관련
	var reportWrite = '';
	var reporttext = '';
	var reportMsg = '';
	var reportLink = '';
	if(data.totalProgress < eval(data.finalTestProgress) && data.reportStatus != null){
		reporttext = '진도율 '+data.finalTestProgress+'% 이상 제출 가능'
		reportMsg = '<strong class="red">진도 부족</strong>';
		reportLink = 'alert(\'진도율 '+data.finalTestProgress+'% 이상 제출 가능합니다.\')';
	}else if(data.reportStatus == null){
		reporttext = '과제가 없는 과정'
		reportMsg = '<strong class="red">과제 없음</strong>';
		reportLink = 'alert(\'과제가 없는 과정입니다.\')';
	}else{
		var captchaLink = 'captcha.php?type=report&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
		if(data.reportStatus == 'N' || data.reportStatus == 'V') {
			if(data.serviceType == 1 && (data.reportCaptchaTime == null || data.reportCaptchaTime.substr(0,10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){//일반 과정일시 캡챠 적용
				reportLink = 'openPopup(\''+captchaLink+'\')';
			}else{
				reportLink = 'openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')';
			}
			if(data.reportStatus == 'N'){
			if(data.serviceType == 1){
				reportMsg = '<strong class="blue">제출 하기</strong>'
			}else{
				reportMsg = '<strong class="blue">제출하기</strong>'
			}
				reporttext = '<span class="red">제출 마감 : '+data.lectureEnd.substr(0,10)+' 23:50까지</span>';
			}else{
				reportMsg = '<strong class="blue">작성 중</strong>'
				//reporttext = '임시저장 중 : 최종제출하지 않으셨습니다.';
				reporttext = '<span class="red">제출 마감 : '+data.lectureEnd.substr(0,10)+' 23:50까지</span>';
			}
		}else if(data.reportStatus == 'Y' || data.reportStatus == 'C') { //평가응시 후
			reportLink = 'resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')';
			reportMsg = '<strong class="blue">제출 완료</strong>';
			reporttext = '제출일 : '+data.reportSaveTime.substr(0,10);
		}
	}
	reportWrite += '<h1>과제제출</h1>'+reportMsg;
	reportWrite += '<br /><span>'+reporttext+'</span>'
	$('.list'+writeTarget+' li.report').html(reportWrite)
	$('.list'+writeTarget+' li.report').attr('onclick',reportLink);
}
function runStudyList(data,writeTarget){
	//평가관련
	if($('.list'+writeTarget+' > form').length == 0){
		$('.list'+writeTarget+ ' > button').before('<form class="lectureForm'+writeTarget+'" action="'+data.progress[0].player+'/player/popupStudy.php" method="post" target="studyWindow"></form>')
	}
	var useMidTest = data.midStatus;
	var useFinTest = data.testStatus;
	var useReport = data.reportStatus;
	var studyList = '';	//목록불러오기
	var nowTime = data.nowTime.substr(0,10);
	if(data.sourceType != 'book'){
		studyList += '<input type="hidden" name="seq" value="'+writeTarget+'">';
		studyList += '<input type="hidden" name="subDomains" value="'+subDomain+'">';
		studyList += '<input type="hidden" name="sourceType" value="'+data.sourceType+'">';
		studyList += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
		studyList += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
		studyList += '<input type="hidden" name="chapter" value="">';
		studyList += '<input type="hidden" name="types" value="">';
	}else{
		studyList += '<input type="hidden" name="seq" value="'+writeTarget+'">';
		studyList += '<input type="hidden" name="Sid" value="'+data.contentsCode + data.lectureStart.substr(2,2) + data.lectureStart.substr(5,2) + data.lectureStart.substr(8,2) + data.lectureEnd.substr(2,2) + data.lectureEnd.substr(5,2) + data.lectureEnd.substr(8,2) + loginUserID+'">';
		studyList += '<input type="hidden" name="subDomains" value="'+subDomain+'">';
		studyList += '<input type="hidden" name="sourceType" value="'+data.sourceType+'">';
		studyList += '<input type="hidden" name="Code" value="'+data.contentsCode+'">';
		studyList += '<input type="hidden" name="LectureOpenSeq" value="'+data.lectureOpenSeq+'">';
		studyList += '<input type="hidden" name="Chasi" value="">';
		studyList += '<input type="hidden" name="PreView" value="N">';
		studyList += '<input type="hidden" name="MovePage" value="">';
		studyList += '<input type="hidden" name="Page" value="">';
	}
	//수강관련변수
	var midTerm = data.midTestChapter;
	var studyCnt = 0; //하루최대차시 체크용
	//var nextUse = 'Y'; //전차시 진도체크용
	//var midAfter = 'N'

	if(data.sourceType == 'book' || data.sourceType == 'html5') {
		// Internet Explorer 버전 체크
		var IEVersionCheck = function() {
		var word;
		var version = "N/A";
		var agent = navigator.userAgent.toLowerCase();
		var name = navigator.appName;

			// IE old version ( IE 10 or Lower )
			if ( name == "Microsoft Internet Explorer" ) word = "msie ";
			else {
				 // IE 11
				 if ( agent.search("trident") > -1 ) word = "trident/.*rv:";
				 // IE 12  ( Microsoft Edge )
				 else if ( agent.search("edge/") > -1 ) word = "edge/";
			}

			var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
			if (  reg.exec( agent ) != null  )
				 version = RegExp.$1 + RegExp.$2;
			return version;
		};
		//document.write(IEVersionCheck());
		if(IEVersionCheck() == '9.0' || IEVersionCheck() == '8.0' || IEVersionCheck() == '7.0') {
			studyList +='<div class="noticeArea">';
			studyList +='<img src="../images/study/img_chrome.png" alt="주의" />';
			studyList +='<h1>인터넷 브라우저 경고</h1>';
			studyList +='<p>현재 사용중인 <strong>인터넷 브라우저</strong>에서는 <strong>원활한 강의 재생이 되지 않을 수 있습니다</strong>.<br />크롬 브라우저를 사용하시기 바라며 설치가 되어 있지 않다면 <a href="https://www.google.co.kr/chrome/browser/desktop/" target="_blank">이곳을 클릭</a>하여 설치하시기 바랍니다.</p>';
			studyList +='</div>';
		}
	}

	studyList += '<table style="margin:5px 10px;">';
	studyList += '<colgroup><col width="90px" /><col width="*" /><col width="150px" /><col width="92px" /><col width="92px" /></colgroup>';
	//수강 노출시작
	var i=0;
	for (i=0;i<data.totalCount;i++){
		if(i != midTerm || data.totalPassMid == 0){	//2018-03-23 이응민 data.totalPassMid == 0 조건 추가 (중간평가가 없고 최종평가만 있을시)
			studyList += '<tr class="lecture'+writeTarget+data.progress[i].chapter+'">';
			studyList += '<td>'+data.progress[i].chapter+'차시</td>';
			studyList += '<th><strong>'+data.progress[i].chapterName+'</strong><br />';
			if(data.progress[i].endTime != null){
				studyList += '교육이수 시간 : '+data.progress[i].endTime+'<br />';
				studyList += '접속아이피 : '+data.progress[i].studyIP+'</th>';
			}
			studyList += '<td>'+data.progress[i].progress+'%</td>';

			//학습하기버튼
			studyList += '<td colspan="2">';
			//진도제한 변경 2017-07-06 서영기

			if(data.serviceType == 1 ){ // || data.serviceType == 3 ||data.serviceType == 5
				if(studyCnt >= maxStudyCnt){//최대차시
					studyList += writeBtn('study','사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시('+maxStudyCnt+'차시)를 초과하였습니다.');
				}else{//학습하기
					studyList += writeBtn('study',(i+1));
				}
			}else{
				studyList += writeBtn('study',(i+1));
			}

			//진도제한 변경 2017-07-06 서영기
			//studyList += writeBtn('study',(i+1));
			//studyList += writeBtn('study','사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시('+maxStudyCnt+'차시)를 초과하였습니다.');
			studyList += '</td>';

			//하루 최대 진도차시
			if(data.progress[i].endTime == null || data.progress[i].endTime.substr(0,10) == data.nowTime.substr(0,10)){
				studyCnt++
			}
			studyList += '</tr>';
		}else if(data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5){ //2017.07.19 강혜림 서비스타입 5번 추가
			//중간평가 노출
			if(useMidTest != null && (data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5)){//서비스타입에 따른 노출 지정
				if(midTerm != 0){
					studyList += '<tr class="midtestLine" style="background-color:#E7F6FF;">';
					studyList += '<td>[평가]</td>';
					studyList += '<th class="blue"><strong>중간평가</strong>';

					// 평가응시전, 응시중
					if(data.midStatus == 'N' || data.midStatus == 'V'){
						studyList += '</th>';
					} else {
						studyList += '<br />평가 응시시간 : '+data.midSaveTime+'<br />';
						studyList += '접속 아이피 : '+data.midIP+'</th>';
					}
					//응시상태
					if(eval(data.totalProgress) >= eval(data.midTestProgress)){
						if(data.midStatus == 'Y' || data.midStatus == 'C'){ //채점전
							studyList += '<td class="midStatus"><strong class="blue">응시 완료</strong></td>';
						}else if(data.midStatus == 'V'){
							studyList += '<td class="midStatus"><strong class="red">응시 중</strong></td>';
						}else{
							studyList += '<td class="midStatus"><strong class="blue">응시 가능</strong></td>';
						}
					}else{
						studyList += '<td class="midStatus"><strong class="red">진도 부족</strong></td>';
					}
					//중간 공란
					studyList += '<td>-</td>';

					//버튼노출
					studyList += '<td>'
					//중간평가버튼
					if(data.midStatus == 'Y' || data.midStatus == 'C'){
						studyList += writeBtn('midTestComplete');
					}else{
						studyList += writeBtn('midTest');
					}

					studyList += '</td>'
					studyList += '</tr>';
				}

				midTerm = null;
				i=i-1;

			}


			//경비과정. 메세지 노출. 2018-01-15 최형진 추가
			if(data.sort01 == 'lecture09'){
				studyList += '<tr style="background-color: red;">';
				studyList += '    <td colspan="5"><strong>총 학습진도율 100%가 되어야 이수증이 발급됩니다.</strong></td>';
				studyList += '</tr>';
			} else if(data.contentsCode == 'XKK8W0' || data.contentsCode == '9W7KKZ'){
				studyList += '<tr style="background-color: red;">';
				studyList += '    <td colspan="5"><strong>근로자 산업안전 수료증은 총 학습진도율 100%가 되어야 발급됩니다.</strong></td>';
				studyList += '</tr>';
			}


		}else{
			midTerm = null;
			i= i-1;
		}
	}
	//최종평가
	if(useFinTest != null && (data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5 )){ //2017.07.19 강혜림 서비스타입 5번 추가
		studyList += '<tr class="fintestLine" style="background-color:#E7F6FF;">';
		studyList += '<td>[평가]</td>';
		studyList += '<th class="blue"><strong>최종평가</strong>';
		if(data.testStatus == 'N' || data.testStatus == 'V'){
			studyList += '</th>';
		} else {
			studyList += '<br />평가 응시시간 : '+data.testSaveTime+'<br />';
			studyList += '접속 아이피 : '+data.testIP+'</th>';
		}
		if(eval(data.totalProgress) >= eval(data.finalTestProgress)){
			if((data.testStatus == 'Y' && data.testOverTime != 'Y') || data.testStatus == 'C'){
				studyList += '<td class="finStatus"><strong class="blue">응시 완료</strong></td>';
			}else if(data.testStatus = 'V' && data.nowTime >= data.testEndTime) {
				studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
			}else if(data.testStatus = 'Y' && data.testOverTime == 'Y') {
				studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
			}else if(data.testStatus = 'V' && data.nowTime < data.testEndTime) {
				var end = data.testEndTime.split(':');
				var end2 = end[0].split(' ');
				studyList += '<td class="finStatus"><strong class="red">응시 중<br>'+end2[0]+'<br>'+end2[1]+'시 '+end[1]+'분 '+end[2]+'초까지</strong></td>';
			}else{
				studyList += '<td class="finStatus"><strong class="blue">응시 가능</strong></td>';
			}
		}else{
			studyList += '<td class="finStatus"><strong class="red">진도 부족</strong></td>';
		}
		studyList += '<td>-</td>'

		studyList += '<td>'
		//기말평가 버튼
		if(data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus = 'V' && data.nowTime >= data.testEndTime)){
			studyList += writeBtn('finTestComplete');
		}else{
			studyList += writeBtn('finTest');
		}
		studyList += '</td>'
		studyList += '</tr>';
	}

	//
	//레포트
	if(useReport != null && (data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5)){ //2017.07.19 강혜림 서비스타입 5번 추가
		studyList += '<tr class="reportLine" style="background-color:#E7F6FF;">';
		studyList += '<td>[과제]</td>';
		studyList += '<th class="blue"><strong>과제 제출</strong>';
		if(data.reportStatus == 'N' || data.reportStatus == 'V'){
			studyList += '</th>';
		} else {
			studyList += '<br />과제 제출 시간 : '+data.reportSaveTime+'<br />';
			studyList += '접속 아이피 : '+data.reportIP+'</th>';
		}
		//메세지 출력
		if(data.totalProgress >= eval(data.finalTestProgress)){
			if(data.reportStatus == 'Y' || data.reportStatus == 'C'){
				studyList += '<td class="reportStatus"><strong class="blue">응시 완료</strong></td>';
			}else if(data.reportStatus == 'V' ){
				studyList += '<td class="reportStatus"><strong class="red">작성 중<br>'+data.lectureEnd.substr(0,10)+' 23:50까지</strong></td>';
			}else{
				studyList += '<td class="reportStatus"><strong class="blue">응시 가능</strong></td>';
			}
		}else{
			studyList += '<td class="reportStatus"><strong class="red">진도 부족</strong></td>';
		}
		studyList += '<td>-</td>';

		studyList += '<td>'
		//레포트버튼출력
		if(data.reportStatus == 'Y' || data.reportStatus == 'C'){
			studyList += writeBtn('reportComplete');
		}else{
			studyList += writeBtn('reportWrite');
		}
		studyList += '</td>'
		studyList += '</tr>';
	}

	if(department == "학원설립운영자" && subDomain == "sjhy" && data.contentsCode == 'PO0KA2'){
		studyList += '<tr>';
		studyList += '<td>설문조사</td>';
		studyList += '<th><strong>설문조사</strong><span style="color: red;"> ✓ 설문조사까지 완료하셔야 수료 처리가 됩니다.</span></th>';
		if(data.survey == 'N'){
			studyList += '<td style="color:red;">미참여</td>';
			studyList += `<td colspan="2">
			<button type="button" style="background:#4f4f4d; width:80%; color:white; letter-spacing:5px; border-radius:5px; padding:8px 10px; height:auto; font-weight:bold; font-size:16px;"
			onclick="openSurvey('${data.totalProgress}', '${data.contentsCode}', '${data.lectureOpenSeq}')";>설문참여</button></td>`;
		} else {
			studyList += '<td style="color:green;">참여</td>';
			studyList += `<td colspan="2">
			<button type="button" style="background:gray; width:80%; color:white; letter-spacing:5px; border-radius:5px; padding:8px 10px; height:auto; font-weight:bold; font-size:16px;"
			onclick="alert('설문에 참여했습니다.')";>설문완료</button></td>`;
		}
		studyList += '</tr>';
	}

	//수강 노출끝
	studyList += '</table>';
	$('.list'+writeTarget+' form').html(studyList)
}

function openSurvey(progress, contentsCode, lectureOpenSeq){ //학원 교습소장 설문용
	if(progress < 100){
		alert("전체 진도율이 100% 이상 되어야합니다.");
		return;
	}

	var studyModals = '';
//	$('body').css('overflow','hidden');
	studyModals += '<div id="screenModal" style="display:none; z-index:999;">';
	//타이틀 노출
	studyModals += '<div class="titleArea">';
	studyModals += '<div>';
	studyModals += '<h1>2023 교육청 학원·교습소 연수 및 민원서비스 만족도 조사</h1>';
	studyModals += '<h2 class="contentsName">설문조사</h2>';
	studyModals += '<button type="button" onClick="closeSurvey();"><img src="../images/study/btn_modalclose.png" /></button>';
	studyModals += '</div>';
	studyModals += '</div>';

	$.get(offSurveyApi,{surveySetSeq:'26'},function(data){
		//주의사항
		studyModals += '<div>';
		studyModals += '<div style="padding:10px 0; width:90%; margin:auto; font-size:18px; line-height:150%;">';
		studyModals += `<p class="surveyText">
		안녕하십니까?<br>
		세종교육 발전을 위한 많은 관심과 격려에 학원(교습소) 설립·운영자님께 깊은 감사를 드립니다.<br>
		우리 교육청에서는 학원·교습소 대상 온라인 연수 운영 및 각종 민원서비스 제공에 대한 만족도 조사를 실시하고 있습니다.
		본 조사 결과를  연수 및 민원업무 개선에 반영하고자 하오니 설문조사에 적극 참여해 주시면 감사하겠습니다.
		</p>`;
		const today = new Date();
		const year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		if(String(month).length < 2) month = '0' + String(month);
		if(String(day).length < 2) day = '0' + String(day);
		studyModals += `<div style="text-align:center;">
			2024. 9<br>
			<span style="font-size:18px; font-weight:bold;">세종특별자치시교육청 운영지원과 학원평생교육담당</span>
		</div>`;
		studyModals += '</div>';
		studyModals += '</div>';
		studyModals += '<div class="surveyArea">';
		studyModals += '<form class="surveyForm">';
		studyModals += '<input type="hidden" name="lectureOpenSeq" value="'+lectureOpenSeq+'">';
		studyModals += '<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		$.each(data.survey, function(){
			studyModals += '<input type="hidden" name="seq[]" value="'+this.seq+'">';
			studyModals += '<input type="hidden" name="surveyType[]" value="'+this.surveyType+'">';
			studyModals += '<input type="hidden" name="companySeq[]" value="32">';
			studyModals += '<h1 id="'+this.seq+'">설문 '+this.orderBy+'</h1>';
			studyModals += '<h2>'+this.exam+'</h2>';
			if(this.surveyType=='A'){ // 객관식
				studyModals += '<ol>';
				for(i=1; i<6 ; i++){
					studyModals += '<li><input type="radio" name="userAnswer'+this.seq+'" id="example0'+i+this.seq+'"  value="'+i+'" />';
					studyModals += '<label for="example0'+i+this.seq+'">'+i+'.&nbsp;'+eval('this.example0'+i)+'</label></li>';
					if(eval('this.example0'+(i+1)) == undefined){
						break;
					}
				}
				if (this.seq == '285') {
					studyModals += '<li><input type="radio"' +
						' name="userAnswer'+this.seq+'" id="example06'+this.seq+'"  value="6" />';
					studyModals += '<label for="example06'+this.seq+'">6.&nbsp;자율점검활동을 받아본 적이 없음</label></li>';
				}
				studyModals += '</ol>';
			} else if(this.surveyType=='B'){ // 단답형
				studyModals += '<textarea id="userTextAnswer'+this.seq+'" name="userTextAnswer'+this.seq+'"></textarea>';
			}
		})
		studyModals += '</form>';
		studyModals += '</div>'; //문제종료
		studyModals += '<div class="btnArea">';
		studyModals += '<button type="button" onclick="submitSurveys(\''+contentsCode+'\',\''+lectureOpenSeq+'\')"><img src="../images/study/btn_lastsubmit_survey.png" alt="설문조사 제출" /></button>';
		studyModals += '</div>';
		studyModals += '</div>';
		$('#footer').after(studyModals);
		$('#screenModal').css('display', 'block');
	})
}

function closeSurvey(){ //학원 교습소장 설문용
	window.location.reload();
}

function submitSurveys(contentsCode, lectureOpenSeq){  //학원 교습소장 설문용
	// 객관식: 1, 2, 3, 6, 7, 8, 9, 10, 13
	// 작성형: 4, 5, 11, 12, 14, 15
	// 커스텀: 4, 5, 10, 11, 12, 14
	if(!document.getElementById('example01202').checked && !document.getElementById('example02202').checked) {
		alert('설문 1을 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01203').checked && !document.getElementById('example02203').checked
		&& !document.getElementById('example03203').checked && !document.getElementById('example04203').checked
		&& !document.getElementById('example05203').checked) {
		alert('설문 2를 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01204').checked && !document.getElementById('example02204').checked
		&& !document.getElementById('example03204').checked && !document.getElementById('example04204').checked
		&& !document.getElementById('example05204').checked) {
		alert('설문 3를 선택해주세요.');
		return false;
	}

	if(!document.getElementById('example01207').checked && !document.getElementById('example02207').checked
		&& !document.getElementById('example03207').checked && !document.getElementById('example04207').checked
		&& !document.getElementById('example05207').checked) {
		alert('설문 6을 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01208').checked && !document.getElementById('example02208').checked
		&& !document.getElementById('example03208').checked && !document.getElementById('example04208').checked
		&& !document.getElementById('example05208').checked) {
		alert('설문 7를 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01209').checked && !document.getElementById('example02209').checked
		&& !document.getElementById('example03209').checked && !document.getElementById('example04209').checked
		&& !document.getElementById('example05209').checked) {
		alert('설문 8을 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01210').checked && !document.getElementById('example02210').checked
		&&!document.getElementById('example03210').checked) {
		alert('설문 9를 선택해주세요.');
		return false;
	}
	if(!document.getElementById('example01211').checked && !document.getElementById('example02211').checked
		&& !document.getElementById('example03211').checked && !document.getElementById('example04211').checked
		&& !document.getElementById('example05211').checked && !document.getElementById('example06211').checked) {
		alert('설문 10을 선택해주세요.');
		return false;
	}

	if(!document.getElementById('example01214').checked && !document.getElementById('example02214').checked
		&& !document.getElementById('example03214').checked && !document.getElementById('example04214').checked
		&& !document.getElementById('example05214').checked) {
		alert('설문 13을 선택해주세요.');
		return false;
	}
	
	const data = $('.surveyForm').serialize();
	$.ajax({
		method: "POST",
		url:offSurveyAnswerApi,
		data:data,
		success:function(data){
			if(data.result == 'success'){
				alert("연수가 완료되었습니다.");
				window.location.reload();
			} else {
				alert("오류 발생.");
			}
		}
	});
}

//안기원 LMS 연동
function joinLMS(seqs,type){
	setSSO = window.open('http://kosafe.or.kr/api/apiSSO.php','studyJoin','top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no','학습연동')
    $.get(useApi,{'seq':seqs},function(data){
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('.list'+seqs);
		lists += '<form class="joinForm" action="http://kosafe.or.kr/api/apiSSO.php" method="post" target="studyJoin">';
		lists += '<input type="hidden" name="ssoSite" value="kiraedu">';
		lists += '<input type="hidden" name="memID" value="'+data.study[0].userID+'">';
		lists += '<input type="hidden" name="type" value="'+type+'">';
		lists += '<input type="hidden" name="lectureStart" value="'+data.study[0].lectureStart+'">';
		lists += '<input type="hidden" name="lectureEnd" value="'+data.study[0].lectureEnd+'">';
		lists += '<input type="hidden" name="ssoCode" value="'+data.study[0].ssoCode+'">';
		lists += '</form>';
		studyBlock.children('div').after(lists);
		studyBlock.children('form.joinForm').submit();
		progressCheck(seqs,data.study[0].contentsCode,data.study[0].lectureOpenSeq,0)
		setSSO.focus();
		studyBlock.children('form.joinForm').remove();
    })
}

//이상에듀 LMS 연동
function nynJoinLMS(seqs,type){
	setSSO = window.open('http://esangedu.kr/api/apiSSO.php','studyJoin','top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no','학습연동')
    $.get(useApi,{'seq':seqs},function(data){
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('.list'+seqs);
		lists += '<form class="joinForm" action="http://esangedu.kr/api/apiSSO.php" method="post" target="studyJoin">';
		lists += '<input type="hidden" name="ssoSite" value="kiraedu">';
		lists += '<input type="hidden" name="memID" value="'+data.study[0].userID+'">';
		lists += '<input type="hidden" name="type" value="'+type+'">';
		lists += '<input type="hidden" name="lectureStart" value="'+data.study[0].lectureStart+'">';
		lists += '<input type="hidden" name="lectureEnd" value="'+data.study[0].lectureEnd+'">';
		lists += '<input type="hidden" name="ssoCode" value="'+data.study[0].ssoCode+'">';
		lists += '</form>';
		studyBlock.children('div').after(lists);
		studyBlock.children('form.joinForm').submit();
		progressCheck(seqs,data.study[0].contentsCode,data.study[0].lectureOpenSeq,0)
		setSSO.focus();
		studyBlock.children('form.joinForm').remove();
    })
}


/* 북러닝 관련 팝업 실행 */
function bookPop(type,contentsCode){
	var openAddress = 'bookPop.php?type='+type+'&contentsCode='+contentsCode;
	//console.log(openAddress);
	var bookPop = window.open(openAddress,"bookPop","top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no","study");
	bookPop.focus();

}

function reviewPop(contentsCode){
	popupAddress = '../study/review.html?contentsCode='+contentsCode;
	window.open(popupAddress,"결과보기","top=0, left=0, width=480, height=500, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","reviewPop")
}

function printPop(seq){

    // alert('수료증');
	$.get('../api/apiStudyHistory.php',{'progressChk':'Y','seq':seq},function(data){
        // console.log(data);
        if(data.study[0].passOK != "Y" || data.study[0].progress > '100'){
            alert('수료증은 수료 후 출력할수 있습니다.');
        }else{
            popupAddress = 'finish.html?progressChk=Y&seq='+seq;
            window.open(popupAddress,"결과보기","width=600, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","printPop")

        }
	})
}

		//게시판 상세보기
function noticeView(addItem01,seq){
    window.open("./studyNotice.php?addItem01="+addItem01+"&seq="+seq+"","notice","top=0,left=0,width=830,height=600,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no","notice");
}


function bbsWrite(contentsCode){
	//강의실 과정 게시판
	$.get('../api/apiBoard.php',{'boardCode':'15','addItem01':contentsCode},function(data){
		if(data.totalCount != 0 || (eval(data.topCount) != 0 || eval(data.topCount) != '')){
			var chkTable = '';
			chkTable += '<table class="studyNotice">';
			chkTable += '<colgroup>';
			chkTable += '<col style="width:68px">';
			chkTable += '<col>';
			chkTable += '<col style="width:94px">';
			chkTable += '<col style="width:83px">';
			chkTable += '</colgroup>';

			//게시판 상단 공지사항
			if( eval(data.topCount) != 0 || eval(data.topCount) != ''){
				$.each(data.boardTop, function(){
					chkTable += '<tr>';
					chkTable += '<td class="category">['+this.categoryName+']</td>';
					chkTable += '<td class="subject" onclick="noticeView(\''+contentsCode+'\',\''+this.seq+'\')">'+this.subject+'</td>';
					chkTable += '<td class="date">'+this.inputDate.substring(0,10)+'</td>';
					chkTable += '<td class="btn">';
					if(this.attachFile01Name != null){
						//첨부파일 소팅
							chkTable += '<div class="fileArea">';
							if(eval('this.attachFile01Name') != null){
								chkTable += '<button type="button" onclick="top.location.href=\'../lib/fileDownLoad.php?fileName='+eval('this.attachFile01Name')+'&link='+data.attachURL+eval('this.attachFile01')+'\'"><img src="../images/study/icon_download01.png" alt="다운로드">다운로드</button>'
							};
							chkTable += '</div>'
					}else{
						chkTable += '<button type="button" onclick="noticeView(\''+contentsCode+'\',\''+this.seq+'\')"><img src="../images/study/icon_noticeView01.png" alt="상세">상세보기</button>';
					}
					chkTable += '</td>'
					chkTable += '</tr>';
				})
			}

			//게시판 리스트
			$.each(data.board,function(){
				chkTable += '<tr>';
				chkTable += '<td class="category">['+this.categoryName+']</td>';
				chkTable += '<td class="subject" onclick="noticeView(\''+contentsCode+'\',\''+this.seq+'\')">'+this.subject+'</td>';
				chkTable += '<td class="date">'+this.inputDate.substring(0,10)+'</td>';
				chkTable += '<td class="btn">';
				if(this.attachFile01Name != null){
					//첨부파일 소팅
						chkTable += '<div class="fileArea">';
						if(eval('this.attachFile01Name') != null){
							notice += '<button type="button" onclick="top.location.href=\'../lib/fileDownLoad.php?fileName='+eval('this.attachFile01Name')+'&link='+data.attachURL+eval('this.attachFile01')+'\'"><img src="../images/study/icon_download01.png" alt="다운로드">다운로드</button>'
						};
						chkTable += '</div>'
				}else{
					chkTable += '<button type="button" onclick="noticeView(\''+contentsCode+'\',\''+this.seq+'\')"><img src="../images/study/icon_noticeView01.png" alt="상세">상세보기</button>';
				}
				chkTable += '</td>'
				chkTable += '</tr>';
			})

			chkTable += '</table>';
			$('table.passCheck').after(chkTable)
		}
	})
}

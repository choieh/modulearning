var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var studySeq = '';
var progressTime = null;
var popOpen = '';

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
				if (this.serviceType != 8) {
					if(loginUserID == 'zeroha22') {
						if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
							lists += '<div class="summuryArea" onclick="alert(\'환급과정 완료 후 수강 하실 수 있습니다.\');">';
						} else {
							lists += '<div class="summuryArea" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')">';
						}
					} else {
						if (this.serviceType == 2) {
							lists += '<div class="summuryArea" onclick="esangMove();">';
						} else {
							lists += '<div class="summuryArea" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')">';
						}
					}
				}else{  // 수강연동인 경우 (serviceType 값이 8일 경우)
				  lists += '<div class="summuryArea" onclick="joinLMS(\''+this.seq+'\',\'study\')">';
				}
				lists += '<ul>';
				lists += '<li><h1>남은 수강일</h1><strong>'+this.leftDate+'</strong>일</li>';

				if (this.contentsCode == 'HFUXWM' && this.progress == '100') {	//에듀미 성희롱 과정 진도 100%시 수료증 출력 
					lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop('+this.seq+');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
				} else if (this.serviceType != 8){
					lists += '<li><h1>강의 진도</h1><strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				}
				if (this.contentsCode == 'HFUXWM' && this.progress == '100') {	//에듀미 성희롱 과정 진도 100%시 수강후기 작성
					lists += '<li><h1>수강후기</h1><button type="button" class="epilogue" onClick="reviewPop(\''+this.contentsCode+'\')">작성하기</button></li>';
				} else {
					lists += '<li><h1>진도율</h1><strong class="totlaProgress01">'+this.progress+'</strong>%</li>';
				}

				lists += '</ul>';
				lists += '<div></div>';
				lists += '<img src="'+this.previewImageURL+this.previewImage+'" alt="강의 이미지" />';
				lists += '<h1><span>'+this.contentsName+'</span></h1><br />';
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2><br />';
				if (this.serviceType != 8){	
					lists += '<h3>첨삭강사 : '+this.tutorName;
					if(this.mobile=='Y'){
						lists += '<strong>모바일 학습 가능</strong>';
					}
					if (this.totalPassMid > 0 || this.totalPassTest > 0 || this.totalPassReport > 0) {
						lists += '<strong style="background-color:#FF7E00">평가있음</strong>';
					}
					//lists += '<strong class="score">점수확인안내</strong>';
					if (this.serviceType == 1){
						lists += '<strong class="score">사업주 훈련(환급)</strong>';
					} else if(this.serviceType == 2) {
						lists += '<strong class="score">재직자 훈련(환급)</strong>';
					}
				}
				lists += '</h3>';
				lists += '</div>';
				if (this.serviceType != 8) {
					if(loginUserID == 'zeroha22') {
						if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
							lists += '<button type="button" onclick="alert(\'환급과정 완료 후 수강 하실 수 있습니다.\');"></button>';
						} else {
							lists += '<button type="button" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"></button>';
						}
					} else {
						if(this.serviceType == 2) {
							lists += '<button type="button" onclick="esangMove();"></button>';
						} else {
							lists += '<button type="button" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"></button>';
						}

					}
				}else{  // 수강연동인 경우 (serviceType 값이 8일 경우)
					lists += '<button type="button" onclick="joinLMS(\''+this.seq+'\',\'study\')"></button>';
				}
				lists += '</li>';

			})
		}else{
			lists += '<li class="noList">강의가 없습니다.</li>';
		}
		$('#contentsArea > ul').html(lists);
		$('#titleArea h3 strong.blue').html(totalCount);
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
			// if(data.certDate){
			// 	certDate = data.certDate.substr(0,10);
			// }
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
			
			if(data.lectureOpenSeq == '11056' || data.lectureOpenSeq == '11057') { //사전설문조사 연동
				$.get('../research/apiResearch.php',{'attendCheck':'Y','seq':'4'},function(data){
					if(data.result != 'Y') {
						//alert('사전설문조사 참여 후 수강하실 수 있습니다.\r\r설문조사로 이동합니다.');
						top.location.href="../research/index.php?seq=4";
					}
				})
			}
			
				if(((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N')){
					certPassModal(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
				}else{
					if(data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9 || data.serviceType == 5){ //2017.07.19 강혜림 서비스타입 5 추가
						chkPassTable(data,studySeq)//최초 진도 테이블
						chkTestArea(data,studySeq)//평가진행 관련 버튼ul
					}
					runStudyList(data,studySeq)
				}
	
			if(data.lectureStart >= '2019-05-13' && data.sort01 == 'lecture03' && data.serviceType == '5') {
				if(data.certPass == 'N') {
					certPassModalType2(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
				}
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
		writes += '<button type="button" title="이어보기" onclick="studyPop(this,'+chapter+')">';
		writes += '<img src="../images/study/btn_continuestudy.png" alt="이어보기" /></button>';

	}else if(btnType == 'midTest' || btnType == 'finTest'){//중간,최종평가관련
		if(btnType == 'midTest'){
			writes += '<button type="button" title="평가응시" onclick="chkTest(\'mid\',this);">';
		}else{
			writes += '<button type="button" title="평가응시" onclick="chkTest(\'final\',this);">';
		}
		writes += '<img src="../images/study/btn_dotest.png" alt="평가응시" /></button>';

	}else if(btnType == 'reportWrite'){//과제응시관련
		writes += '<button type="button" title="과제제출" onclick="chkTest(\'report\',this);">';
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
	if(popOpen){		
       popOpen.close();
    } 	
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
	//var captchaPage = 'captcha.php'
	var captchaPage = 'hrdOTP.php'	
	/*if (loginUserID == 'eungmin2' || loginUserID == 'zeroha3416' || loginUserID == '8601264822') {		
		var captchaPage = 'hrdOTP.php'	
	}*/

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
	
		if(eval(midTerm)!=0 &&(eval(chapter) > eval(midTerm)) && (data.midStatus != 'Y' && data.midStatus != 'C') && (eval(data.serviceType)== 1 || eval(data.serviceType)== 2 || eval(data.serviceType)==5 )){
				alert('중간평가 이후 학습가능합니다.')
		}else if(chapter != 1 && eval(data.progress[(chapter-2)].progress) <= 79){
			alert('전차시 진도율이 80% 미만입니다.')
		}else if(eval(data.serviceType) == 1 && (chapter-1)%8 == 0 && captchChk == '' && !(today >= captchaBanStart && today <= captchaBanEnd)){//캡챠 실행
			if(types == 'new'){
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter+'&viewNew=new')
			}else{
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter)
			}
			$changeTarget.html(writeBtn('continue',chapter));
		}else{
			runningForm.children('input[name="chapter"]').val(chapter);
			runningForm.children('input[name="types"]').val(types);
			var popupAddress = runningForm.attr('action');
			if(runningForm.children('input[name="sourceType"]').val() != 'book'){
				var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangedu")
				runningForm.submit();
				$changeTarget.html(writeBtn('continue',chapter));				
				//진도체크 스크립트
				progressCheck(checkSeq,checkCode,checkOpenSeq,chapter)
			} else {
				/*
				var popupAddress = '/viewer/index.html?Sid='+Sid+'&Code='+contentsCode+'&Chasi='+Chasi+'&Page='+Page+'&MovePage='+MovePage+'&LectureOpenSeq='+lectureOpenSeq+'&PreView=N';
				//popupAddress = '/viewer/index.html?Code=7BOWJ5&Sid=7BOWJ5000000999999guest&Chasi=01&Page=99';
				var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangedu")				
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
	var links = 'hrdOTP.php'
	var checkSeq = runningForm.children('input[name="seq"]').val()//seq
	var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
	var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq
	$.get(chapterApi,{'contentsCode':checkCode,'lectureOpenSeq':checkOpenSeq},function(data){
		var today = data.nowTime.substr(0,10);
		var nowTime = data.nowTime;
		if(types == 'mid'){
			if(eval(data.totalProgress) < eval(data.midTestProgress)){
				alert('진도율이 부족합니다.('+data.midTestProgress+'%이상)')
			}else if(eval(data.serviceType) == 1 && !(data.midCaptchaTime != null && data.midCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
				captchaRun(checkSeq,types,links)
			}else{
				openStudyModal(types,obj,obj)
			}
		}else{
			if(eval(data.totalProgress) < eval(data.finalTestProgress)){
				alert('진도율이 부족합니다.('+data.finalTestProgress+'%이상)')
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
	$.get(resultApi,'lectureOpenSeq='+lectureOpenSeq+'&testType='+testType,function(data){
		if(testType == 'mid') {
			alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과 보기는 학습기간이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
		} else if(testType == 'final') {
			if(data.totalCount == data.userCount) {
				alert('출제된 '+data.totalCount+'문항 모두 응시 완료하였습니다. 결과 보기는 학습기간이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
			} else {
				alert('출제된 '+data.totalCount+'문항 중 '+data.userCount+'문항 응시 완료하였습니다. 결과 보기는 학습기간이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다.');
			}
		} else {
			alert('과제제출을 완료하였습니다. 결과 보기는 학습기간이 종료된 이후 점수 확인 기간(1주일 이내)에 가능합니다. ');
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
			$('.list'+checkSeq+' .midStatus').html('<strong class="blue">응시가능</strong>')
		}else if($beforeProgress <= eval(data.finalTestProgress) && data.totalProgress >= eval(data.finalTestProgress)){
			$('.list'+checkSeq+' .finStatus').html('<strong class="blue">응시가능</strong>')
			$('.list'+checkSeq+' .reportStatus').html('<strong class="blue">제출가능</strong>')
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

	//18-03-15 한상민
	chkTable +='<div class="progress">';
	chkTable +='<ul>';
	chkTable +='<li class="type01"><h1>권장 진도율<strong>'+data.suggestProgress+'<span>%</span></strong></h1><div><p style="width:'+data.suggestProgress+'%"></p></div></li>';
	chkTable +='<li class="type02"><h1>내 진도율<strong class="totlaProgress02">'+data.totalProgress+'<span>%</span></strong></h1><div><p style="width:'+data.totalProgress+'%"></p></div></li>';
	chkTable +='<li class="type03"><h1>평균 진도율<strong>'+data.aveProgress+'<span>%</span></strong></h1><div><p style="width:'+data.aveProgress+'%"></p></div></li>';
	chkTable +='</ul>';
	chkTable +='</div>';
	//여기까지

	chkTable += '<table class="passCheck"><tr>';
	chkTable += '<td colspan="6" class="title">수료기준</td>'
	chkTable += '<td rowspan="4" class="detailView">';
	chkTable += '<a href="javascript:openDetail(\''+data.contentsCode+'\')"><h1>교육과정</h1>상세보기</a>';

	chkTable += '</td>';
	if(data.attachFile!=null && data.attachFile!=''){
		chkTable += '<td rowspan="4" class="downFile">';
		chkTable += '<a href="../lib/fileDownLoad.php?fileName='+encodeURI(data.attachFile)+'&link='+encodeURIComponent(data.previewImageURL+data.attachFile)+'" target="_blank"><h1>학습자료</h1>다운로드</a>';
		chkTable += '</td>';
	}
	chkTable += '</tr>';
	chkTable += '<th>수강정원</th>';
	chkTable += '<th>총 진도율</th>';
	chkTable += '<th>중간평가</th>';
	chkTable += '<th>최종평가</th>';
	chkTable += '<th>과제</th>';
	chkTable += '</tr><tr>';
	chkTable += '<td rowspan="2"><strong>'+data.limited+'</strong>명</td>';
	chkTable += '<td rowspan="2"><strong>'+data.passProgress+'</strong>% 이상</td>';
	chkTable += '<td>총&nbsp;<strong>';
	if(data.totalPassMid != 0){
		chkTable += data.totalPassMid+'</strong>점 / <strong>'+data.midRate+'</strong>% 반영';
	}
	chkTable += '</td>';
	chkTable += '<td>총&nbsp;<strong>';
	if(data.totalPassTest != 0){
		chkTable += data.totalPassTest+'</strong>점 / <strong>'+data.testRate+'</strong>% 반영';
	}
	chkTable += '</td><td>';
	if(data.totalPassReport != 0){
		chkTable += '총&nbsp;<strong>'+data.totalPassReport+'</strong>점 / <strong>'+data.reportRate+'</strong>% 반영';
	} else {
		chkTable += '과제 없음';
	}
	chkTable += '</td>';
	chkTable += '</tr><tr>';
	/*if(data.totalPassReport != 0){
		//2018-03-14 강혜림 수정
		//chkTable += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 (평가와 과제는 40점 미만 시 과락 적용)</td>';
		chkTable += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 </td>';
	} else {
		//chkTable += '<td colspan="3">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 (평가 40점 미만 시 과락 적용)</td>';
		chkTable += '<td colspan="3">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 </td>';
	}*/
	chkTable += '<td colspan="3">';
	if (data.totalPassReport > 0) {
		chkTable += '반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상<br/>';
		chkTable += '(최종평가 : 총점 <strong>'+data.totalPassTest+'</strong>점 중 <strong>'+data.passTest+'</strong>점 이상';
		chkTable += ' / 과제 : 총점 <strong>'+data.totalPassReport+'</strong>점 중 <strong>'+data.passReport+'</strong>점 이상)';
	} else {
		chkTable += '반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상<br/>';
		chkTable += '(최종평가 : 총점 <strong>'+data.totalPassTest+'</strong>점 중 <strong>'+data.passTest+'</strong>점 이상)';					
	}
	chkTable += '</td>';
	chkTable += '</tr>';

	if(data.sort01 == 'lecture09'){
		chkTable += '<tr>';
		chkTable += '	<td colspan="10" style="background-color: red">';
		chkTable += '		<strong>총 학습진도율 100%가 되어야 이수증이 발급됩니다.</strong>';
		chkTable += '	</td>';
		chkTable += '</tr>';
	} else if(data.contentsCode == 'XKK8W0' || data.contentsCode == '9W7KKZ'){
		chkTable += '<tr>';
		chkTable += '	<td colspan="10" style="background-color: red">';
		chkTable += '		<strong>근로자 산업안전 수료증은 총 학습진도율 100%가 되어야 발급됩니다.</strong>';
		chkTable += '	</td>';
		chkTable += '</tr>';
	}
	
	chkTable += '</table>';
	
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
	if(eval(data.totalProgress) < eval(data.midTestProgress) && data.midStatus != null){
		midtext = '진도율 '+data.midTestProgress+'% 이상 응시 가능.'
		midMsg = '<strong class="red">진도부족</strong>';
		midLink = 'alert(\''+midtext+'\')';
	}else if(data.midStatus == null){
		midtext = '평가가 없습니다.'
		midMsg = '<strong class="red">평가없음</strong>';
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
				midMsg = '<strong class="blue">응시하기</strong>';
			}else{
				midMsg = '<strong class="blue">응시중</strong>';
			}
			midtext = '응시마감 : '+data.lectureEnd.substr(0,10)+' 23:50';
		}else if(data.midStatus == 'Y' || data.midStatus == 'C') { //평가응시 후
			midLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'mid\')';
			midMsg = '<strong class="blue">응시완료</strong>';
			midtext = '응시일 : '+data.midSaveTime.substr(0,10);
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
	if(data.totalProgress < eval(data.finalTestProgress) && data.testStatus != null){
		fintext = '진도율 '+data.finalTestProgress+'% 이상 응시 가능.'
		finMsg = '<strong class="red">진도부족</strong>';
		finLink = 'alert(\''+fintext+'\')';
	}else if(data.testStatus == null){
		fintext = '평가가 없습니다.'
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
			finMsg = '<strong class="blue">응시하기</strong>'
			fintext = '제한시간 : '+data.testTime+'분'
		} else if(data.testStatus == 'V') {
			if(data.nowTime >= data.testEndTime) {
				finLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')';
				finMsg = '<strong class="red">응시완료</strong>'
				fintext = '시간초과로 인한 응시종료';
			} else {
				//20170809 서영기 if문 결과 값 수정 
				if(data.serviceType == 1 && (data.testCaptchaTime == null || data.testCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
					finLink = 'openPopup(\''+captchaLink+'\')';
				}else{
					finLink = 'openStudyModal(\'final\',\''+contentsCode+'\','+lectureOpenSeq+')';
				}
				finMsg = '<strong class="blue">응시중</strong>'
				fintext = data.testEndTime+' 까지';
			}
		}else if(data.testStatus == 'Y' || data.testStatus == 'C') { //평가응시 후
			finLink = 'resultAct(\'test\',\''+contentsCode+'\','+lectureOpenSeq+',\'final\')';
			finMsg = '<strong class="blue">응시완료</strong>';
			fintext = '응시일 : '+data.testSaveTime.substr(0,10);
		}
	}
	if(data.lectureOpenSeq=='8619') { // 평가 타이틀 변경
		finWrite += '<h1>직장 내 성희롱 예방교육 평가</h1>'+finMsg;
	} else {
		finWrite += '<h1>최종평가</h1>'+finMsg;
	}
	finWrite += '<br /><span>'+fintext+'</span>'
	$('.list'+writeTarget+' li.lastTest').html(finWrite)
	$('.list'+writeTarget+' li.lastTest').attr('onclick',finLink);

	//과제 제출 관련
	var reportWrite = '';
	var reporttext = '';
	var reportMsg = '';
	var reportLink = '';
	if(data.totalProgress < eval(data.finalTestProgress) && data.reportStatus != null){
		reporttext = '진도율 '+data.finalTestProgress+'% 이상 응시 가능.'
		reportMsg = '<strong class="red">진도부족</strong>';
		reportLink = 'alert(\''+reporttext+'\')';
	}else if(data.reportStatus == null){
		reporttext = '평가가 없습니다.'
		reportMsg = '<strong class="red">평가없음</strong>';
		reportLink = 'alert(\''+reporttext+'\')';
	}else{
		var captchaLink = 'captcha.php?type=report&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq;
		if(data.reportStatus == 'N' || data.reportStatus == 'V') {
			if(data.serviceType == 1 && (data.reportCaptchaTime == null || data.reportCaptchaTime.substr(0,10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){//일반 과정일시 캡챠 적용
				reportLink = 'openPopup(\''+captchaLink+'\')';
			}else{
				reportLink = 'openStudyModal(\'report\',\''+contentsCode+'\','+lectureOpenSeq+')';
			}
			if(data.reportStatus == 'N'){
				reportMsg = '<strong class="blue">제출하기</strong>'
			}else{
				reportMsg = '<strong class="red">제출하기</strong>'
				reporttext = '임시저장 중 : 최종제출하지 않으셨습니다.';
			}
		}else if(data.reportStatus == 'Y' || data.reportStatus == 'C') { //평가응시 후
			reportLink = 'resultAct(\'report\',\''+contentsCode+'\','+lectureOpenSeq+',\'\')';
			reportMsg = '<storng>제출완료</strong>';
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
		studyList += '<input type="hidden" name="progressCheckType" value="'+data.progressCheck+'">';
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

	var version = "N/A";
	var agent = navigator.userAgent.toLowerCase();
	var name = navigator.appName;

	// 익스로 접속 시
	if((name == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {

		if(data.baseBrowser == 'chrome') { // 익스 미지원 과정일때
			studyList +='<div class="noticeArea">';
			studyList +='<img src="../images/study/img_chrome.png" alt="주의" />';
			studyList +='<h1>인터넷 브라우저 경고</h1>';
			studyList +='<p>현재 사용중인 <strong>인터넷 브라우저</strong>에서는 <strong>원활한 강의 재생이 되지 않을 수 있습니다</strong>.<br />크롬 브라우저를 사용하시기 바라며 설치가 되어 있지 않다면 <a href="https://www.google.co.kr/chrome/browser/desktop/" target="_blank">이곳을 클릭</a>하여 설치하시기 바랍니다.</p>';
			studyList +='</div>';

		} else {

			if(data.sourceType == 'book' || data.sourceType == 'html5') {
				// Internet Explorer 버전 체크
				var IEVersionCheck = function() {
				var word;
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
		}
		
	} else { // 익스가 아닐 시 (크롬 등)
			if(data.baseBrowser == 'explorer') { // 익스전용 과정일때
				studyList +='<div class="noticeArea">';
				studyList +='<img src="../images/study/exIcon.png" alt="주의" />';
				studyList +='<h1>인터넷 브라우저 경고</h1>';
				studyList +='<p>현재 사용중인 <strong>인터넷 브라우저</strong>에서는 <strong>원활한 강의 재생이 되지 않을 수 있습니다</strong>.<br /><strong>인터넷 익스플로러</strong>로 접속하여 학습하여 주시기 바랍니다.</p>';
				studyList +='</div>';
			}
	}


	studyList += '<table>';
	studyList += '<colgroup><col width="90px" /><col width="*" /><col width="90px" /><col width="92px" /><col width="92px" /></colgroup>';
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

			//이어보기 버튼
			studyList += '<td>';
			if(data.progress[i].progress != 0){
				studyList += writeBtn('continue',(i+1));
			}else{
				studyList += '-'
			}
			studyList += '</td>'


			//학습하기버튼
			studyList += '<td>';
			//진도제한 변경 2017-07-06 서영기

			//if(data.serviceType == 1  || data.serviceType == 3 || data.serviceType == 5 || data.serviceType == 9){	
			if(data.serviceType == 1  || data.serviceType == 5 || data.serviceType == 9){	
				//1일8차시 제한 해제 (임시)
				//한림대학교부속춘천성심병원, 19.11.07-19.12.06
				//2019년도 인증 및 법정필수 교육 - 의료인 과정 (과정코드: 1BNL4P)
				//2019년도 인증 및 법정필수 교육 2 - 의료인 과정 (과정코드: 7ENNT0)
				//2019년도 인증 및 법정필수 교육 - 비의료인 과정 (과정코드: T8DO7Q)
				//2019년도 인증 및 법정필수 교육 2 - 비의료인 과정 (과정코드: 1VGIVH)

				//이소라씨 요청 1388202667 /  VQMGXR,TGOUWA,OL5U8Y 1일 수강제한 1일8차시 제한 해제 2019-12-20 여준혁
                //이소라씨 요청 2218203051  /  T8DO7Q,1BNL4P,7ENNT0 1일 수강제한 1일8차시 제한 해제 2019-12-26 여준혁
                //이상에듀 요청 1358216196   /  0G2XAE,HQMHG7 1일 수강제한 1일8차시 제한 해제 2019-12-26 여준혁
				//if (data.companyCode == '2218203051' && (data.lectureOpenSeq >= '9544' && data.lectureOpenSeq <= '9547')) {
				/*if (data.companyCode == '1388202667' && (data.contentsCode == 'VQMGXR' || data.contentsCode == 'TGOUWA' || data.contentsCode == 'OL5U8Y')) {
					studyList += writeBtn('study',(i+1));
				} else if(data.companyCode == '2218203051' && (data.contentsCode == 'T8DO7Q' || data.contentsCode == '1BNL4P' || data.contentsCode == '7ENNT0')){
                    studyList += writeBtn('study',(i+1));
				} else if(data.companyCode == '1358216196' && (data.contentsCode == '0G2XAE' || data.contentsCode == 'HQMHG7')){
                    studyList += writeBtn('study',(i+1));
				} else {*/
					if(studyCnt >= maxStudyCnt){//최대차시
						studyList += writeBtn('study','사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시('+maxStudyCnt+'차시)를 초과하였습니다.');
					}else{//학습하기
						studyList += writeBtn('study',(i+1));
					}
				//}
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
						studyList += '<br />평가응시 시간 : '+data.midSaveTime+'<br />';
						studyList += '접속아이피 : '+data.midIP+'</th>';
					}
					//응시상태
					if(eval(data.totalProgress) >= eval(data.midTestProgress)){
						if(data.midStatus == 'Y' || data.midStatus == 'C'){ //채점전
							studyList += '<td class="midStatus"><strong class="red">응시완료</strong></td>';
						}else{
							studyList += '<td class="midStatus">응시가능</td>';
						}
					}else{
						studyList += '<td class="midStatus"><strong class="red">진도부족</strong></td>';
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

		if(data.lectureOpenSeq=='8619') { // 평가 타이틀 변경
			studyList += '<th class="blue"><strong>직장 내 성희롱 예방교육 평가</strong>';
		} else {
			studyList += '<th class="blue"><strong>최종평가</strong>';
		}
		if(data.testStatus == 'N' || data.testStatus == 'V'){
			studyList += '</th>';
		} else {
			studyList += '<br />평가응시 시간 : '+data.testSaveTime+'<br />';
			studyList += '접속아이피 : '+data.testIP+'</th>';
		}
		if(eval(data.totalProgress) >= eval(data.finalTestProgress)){
			if(data.testStatus == 'Y' || data.testStatus == 'C'){
				studyList += '<td class="finStatus"><strong class="red">응시완료</strong></td>';
			}else if(data.testStatus == 'V' && data.nowTime >= data.testEndTime) {
				studyList += '<td class="finStatus"><strong class="red">시간초과</strong></td>';
			}else{
				studyList += '<td class="finStatus">응시가능</td>';
			}
		}else{
			studyList += '<td class="finStatus"><strong class="red">진도부족</strong></td>';
		}

		//후지제록스일시 가채점점수 확인 버튼 2019-06-03 진영하
		if(loginUserID=='zeroha2' && data.testStatus == 'C') {
			studyList += '<td onClick="alert(\'가채점 점수는 '+data.testScore+'점 입니다.\')" style="cursor:pointer;">[가채점 확인]</td>';
		} else {
			studyList += '<td>-</td>';
		}

		studyList += '<td>'
		//기말평가 버튼
		if(data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus == 'V' && data.nowTime >= data.testEndTime)){
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
		studyList += '<tr class="reportLine">';
		studyList += '<td>[과제]</td>';
		studyList += '<th class="blue"><strong>과제제출</strong>';
		if(data.reportStatus == 'N' || data.reportStatus == 'V'){
			studyList += '</th>';
		} else {
			studyList += '<br />과제제출 시간 : '+data.reportSaveTime+'<br />';
			studyList += '접속아이피 : '+data.reportIP+'</th>';
		}
		//메세지 출력
		if(data.totalProgress >= eval(data.finalTestProgress)){
			if(data.reportStatus == 'Y' || data.reportStatus == 'C'){
				studyList += '<td class="reportStatus"><strong class="red">제출완료</strong></td>';
			}else{
				studyList += '<td class="reportStatus">제출가능</td>';
			}
		}else{
			studyList += '<td class="reportStatus"><strong class="red">진도부족</strong></td>';
		}
		studyList += '<td>-</td>';

		studyList += '<td>'
		//레포트버튼출력
		if(data.reportStatus == 'Y' || data.reportStatus == 'C'){
			studyList += writeBtn('reportComplete');
		}else{
			studyList +=  writeBtn('reportWrite');
		}
		studyList += '</td>'
		studyList += '</tr>';
	}

	//수강 노출끝
	studyList += '</table>';
	$('.list'+writeTarget+' form').html(studyList)
}

//원에듀 LMS 연동
function joinLMS(seqs,type){
	setSSO = window.open('http://oneedu.co.kr/api/apiSSO.php','studyJoin','top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no','학습연동')
    $.get(useApi,{'seq':seqs},function(data){
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('.list'+seqs);
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

function printPop(popseq){
	$.get('../api/apiStudyHistory.php',{'seq':popseq,'print':'Y','progressChk':'Y'},function(data){
		popupAddress = '../study/printTCPDF.php?seq='+popseq+'&progressChk=Y';
		window.open(popupAddress,"결과보기","width=600, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","printPop")
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

function esangMove(){
	if(confirm('본 과정은 재직자 훈련과정입니다. 재직자 훈련 사이트에서 수강하실 수 있습니다. 이동하시겠습니까?')) {
		top.location.href='http://hrd.esangedu.kr/hrd/study';
	}
}

var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var studySeq = '';
var progressTime = null;

//var contentsCode = '';
//var lectureOpenSeq = '';
var userID = '';

/* 최초 페이지 로드시 동작시작 */
$(document).ready(function(){
    var contents = '';
	contents += '<ul>';
	contents += '</ul>';
	$('#contentsArea').html(contents);
	ajaxAct();
});

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
				lists += '<h3>경비지도사 : '+this.tutorName
				if(this.mobile=='Y'){
					lists += '<strong>모바일 학습 가능</strong>'
				}
				lists += '</h3>';
				lists += '</div>';
				if(this.serviceType == 1 && this.certPass == 'N'){
					lists += '<button type="button" onclick="certPassModal(\''+this.lectureStart+'\','+this.seq+',\''+this.contentsCode+'\',\''+this.lectureOpenSeq+'\')"></button>';
				}else{
					lists += '<button type="button" onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"></button>';
				}
				lists += '</li>';
			})
		}else{
			lists += '<li class="noList">강의가 없습니다.</li>';
		}
		$('#contentsArea > ul').html(lists);
		$('#titleArea h3 strong.blue').html(totalCount);
	})
	.done(function(data){
		if(data.totalCount == 1){
			viewStudyDetail(data.study[0].seq,data.study[0].contentsCode,data.study[0].lectureOpenSeq)
		}
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq){
	var $studyBlock = $('.list'+studySeq);//변동될 스터디블록
	if ($studyBlock.find('form').length != 0){ //스터디블록 닫기
		$studyBlock.children('ul,table,form').remove();
		$studyBlock.removeClass('openClass');
	}else{ //스터디블록열기
		$studyBlock.addClass('openClass');
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			if(data.certPass != 'Y' && data.serviceType == '1'){
				certPassModal(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
			}else{
				if(data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5){ //2017.07.19 강혜림 서비스타입 5 추가
					chkPassTable(data,studySeq)//최초 진도 테이블
					//chkTestArea(data,studySeq)//평가진행 관련 버튼ul
				}
				runStudyList(data,studySeq)
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
		writes += '<img src="../images/security/icon_test.png" alt="평가응시" /><br />평가응시</button>';

	}else if(btnType == 'midTestComplete' || btnType == 'finTestComplete' ){//평가응시완료관련
		if(btnType == 'midTestComplete'){
			writes += '<button type="button" title="평가완료" onclick="resultAct(\'test\',this,this,\'mid\')">';
		}else{
			writes += '<button type="button" title="평가완료" onclick="resultAct(\'test\',this,this,\'final\')">';
		}
		writes += '<img src="../images/security/icon_test.png" alt="평가응시" /><br />평가완료</button>';

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
	var captchaPage = 'captcha.php'
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
		var nowTime = data.nowTime;
		var today = data.nowTime.substr(0,10)
		//경비직무교육 전용 학습기간 처리
		returnDate(data.lectureStart);
		
		var midTerm = Math.ceil(Number(data.totalCount)/2);
		if(nowTime <= studyNextStart && chapter > midTerm){
			alert('아직 수강 가능한 기간이 아닙니다.')
		}else if(chapter > midTerm && (data.midStatus != 'Y' && data.midStatus != 'C') && (eval(data.serviceType)== 1 || eval(data.serviceType)==9 )){
			alert('이전 교육과 평가를 모두 진행하셔야\n학습이가능합니다.')
		}else if(chapter != 1 && eval(data.progress[(chapter-2)].progress) <= 79){
			alert('전차시 진도율이 80% 미만입니다.')
		}else if(eval(data.serviceType) == 1 && (chapter-1)%8 == 0 && captchChk == '' && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){//캡챠 실행
			if(types == 'new'){
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter+'&viewNew=new')
			}else{
				captchaRun(checkSeq,'study',captchaPage+'?chapter='+chapter)
			}
		}else{
			runningForm.children('input[name="chapter"]').val(chapter);
			runningForm.children('input[name="types"]').val(types);
			var popupAddress = runningForm.attr('action');

			var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","kiraedu")
			/*
			if(studyPopOpen == null || studyPopOpen.screenLeft == 0){
				alert('팝업이 차단되어 있습니다. 팝업을 허용해 주세요.');
			}
			*/
			runningForm.submit();
			$changeTarget.html(writeBtn('continue',chapter));
			//진도체크 스크립트
			progressCheck(checkSeq,checkCode,checkOpenSeq,chapter)
		}

	})
}

function chkTest(types,obj){
	if(typeof(obj)=='object'){
		runningForm = $(obj).parents('form');
	}else{
		runningForm = $('form.lectureForm'+obj);
	}
	var links = 'captcha.php'
	var checkSeq = runningForm.children('input[name="seq"]').val()//seq
	var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
	var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq
	$.get(chapterApi,{'contentsCode':checkCode,'lectureOpenSeq':checkOpenSeq},function(data){
		var today = data.nowTime.substr(0,10);
		var nowTime = data.nowTime;
		if(types == 'mid'){
			if(eval(data.totalProgress) <= 49){
				alert('진도율이 부족합니다.')
			}else if(eval(data.serviceType) == 1 && !(data.midCaptchaTime != null && data.midCaptchaTime.substr(0,10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)){
				captchaRun(checkSeq,types,links)
			}else{
				openStudyModal(types,obj,obj)
			}
		}else{
			if(eval(data.totalProgress) <= 99){
				alert('진도율이 부족합니다.')
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
		if(($beforeProgress <= 49 && data.totalProgress >= 50)||($beforeProgress <= 79 && data.totalProgress >= 80)){
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
		if($beforeProgress <= 49 && data.totalProgress >= 50){//평가 응시가능 알림
			$('.list'+checkSeq+' .midStatus').html('<strong class="blue">응시가능</strong>')
		}else if($beforeProgress <= 79 && data.totalProgress >= 80){
			$('.list'+checkSeq+' .finStatus').html('<strong class="blue">응시가능</strong>')
			$('.list'+checkSeq+' .reportStatus').html('<strong class="blue">제출가능</strong>')
		}
	})
}

function openDetail(viewCode){
	popOpen = window.open("./lecturepop.php?contentsCode="+viewCode,"captcha","top=0,left=0,width=680,height=620,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","study");
	popOpen.focus();
}

function openPopup(linkAddress){
	popOpen = window.open(linkAddress,"captcha","top=0,left=0,width=380,height=460,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","study");
	popOpen.focus();
}

//실제 구동 화면
function chkPassTable(data,writeTarget){//수강기준 테이블
	//교육차시 세팅 및 교육기간세팅
    var midChasi = Math.ceil(Number(data.totalCount)/2);
	returnDate(data.lectureStart);
	
	//수강테이블 제작
	var chkTable = '';
	chkTable += '<table class="passCheck"><tr>';
	chkTable += '<td colspan="5" class="title">수료기준</td>'
	chkTable += '<td rowspan="5" class="detailView">';
	chkTable += '<a href="javascript:openDetail(\''+data.contentsCode+'\')"><h1>교육과정</h1>상세보기</a>';
	chkTable += '</td>';
	if(data.attachFile!=null && data.attachFile!=''){
		chkTable += '<td rowspan="4" class="downFile">';
		chkTable += '<a href="../lib/fileDownLoad.php?fileName='+data.attachFile+'&link='+data.previewImageURL+data.attachFile+'" target="_blank"><h1>학습자료</h1>다운로드</a>';
		chkTable += '</td>';
	}
	chkTable += '</tr>';
	chkTable += '<th rowspan="2">수강정원</th>';
	chkTable += '<th colspan="2"><strong>'+studyMonth01+'</strong> 교육</th>';
	chkTable += '<th colspan="2"><strong>'+studyMonth02+'</strong> 교육</th>';
	chkTable += '</tr>';
	chkTable += '<tr>';
	chkTable += '<th>진도</th>';
	chkTable += '<th>평가</th>';
	chkTable += '<th>진도</th>';
	chkTable += '<th>평가</th>';
	chkTable += '</tr>';
	chkTable += '<tr>';
	chkTable += '<td rowspan="2"><strong>'+data.limited+'</strong>명</td>';
	chkTable += '<td>총 <strong>'+midChasi+'<strong> 차시<strong>100</strong>%</td>';
	chkTable += '<td>총&nbsp;<strong>';
	if(data.totalPassMid != 0){
		chkTable += data.totalPassMid+'</strong>점 / <strong>'+data.midRate+'</strong>% 반영';
	}
	chkTable += '</td>';
	chkTable += '<td>총 <strong>'+midChasi+'<strong> 차시<strong>100</strong>%</td>';
	chkTable += '<td>총&nbsp;<strong>';
	if(data.totalPassTest != 0){
		chkTable += data.totalPassTest+'</strong>점 / <strong>'+data.testRate+'</strong>% 반영';
	}
	chkTable += '</td>';
	chkTable += '</tr><tr>';
	if(data.totalPassReport != 0){
		chkTable += '<td colspan="4">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 (평가와 과제는 40점 미만 시 과락 적용)</td>';
	} else {
		chkTable += '<td colspan="4">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 (평가 40점 미만 시 과락 적용)</td>';
	}
	chkTable += '</tr></table>';
	$('.list'+writeTarget+' .summuryArea').after(chkTable)
}

function runStudyList(data,writeTarget){
	//교육차시 세팅 및 교육기간세팅
	var totalCount = data.totalCount;
    var midChasi = Math.ceil(Number(data.totalCount)/2);
	returnDate(data.lectureStart);
	var studyCnt = 0; //하루최대차시 체크용
	
	//평가관련
	if($('.list'+writeTarget+' > form').length == 0){
		$('.list'+writeTarget+ ' > button').before('<form class="lectureForm'+writeTarget+'" action="'+data.progress[0].player+'/player/popupStudy.php" method="post" target="studyWindow"></form>')
	}
	var useMidTest = data.midStatus;
	var useFinTest = data.testStatus;
	var useReport = data.reportStatus;
	var studyList = '';	//목록불러오기
	var nowTime = data.nowTime.substr(0,10);
	studyList += '<input type="hidden" name="seq" value="'+writeTarget+'">';
	//studyList += '<input type="hidden" name="subDomains" value="'+subDomain+'">';
	studyList += '<input type="hidden" name="sourceType" value="'+data.sourceType+'">';
	studyList += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
	studyList += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
	studyList += '<input type="hidden" name="chapter" value="">';
	studyList += '<input type="hidden" name="types" value="">';

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

	studyList += '<ul>';
	//수강 노출시작
	var i=0;
	for (i=0;i<data.totalCount;i++){
		if(i==0 || i==midChasi){ //교육분기 2번으로 나누어 진행 최초와 중간일때 노출
			studyList += '<li>';
			studyList += '<div>';
			if(i==0){
				studyList += '<h1><strong>'+studyMonth01+'</strong> 교육</h1>';
				if(data.midStatus == 'Y' || data.midStatus == 'C' || (data.midStatus = 'V' && data.nowTime >= data.testEndTime)){
					studyList += writeBtn('midTestComplete');
				}else{
					studyList += writeBtn('midTest');
				}
				studyList += '<button type="button" title="이수증출력" onclick="paperAct(\'test\',\'mid\')">';
				studyList += '<img src="../images/security/icon_paper.png" alt="이수증출력" /><br />이수증출력</button>';
			}else{
				studyList += '<h1><strong>'+studyMonth02+'</strong> 교육</h1>';
				studyList += '<h3><strong>'+studyNextStart.substr(0,10)+'</strong>부터 교육가능</h3>';
				if(data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus = 'V' && data.nowTime >= data.testEndTime)){
					studyList += writeBtn('finTestComplete');
				}else{
					studyList += writeBtn('finTest');
				}
				studyList += '<button type="button" title="이수증출력" onclick="paperAct(\'test\',\'final\')">';
				studyList += '<img src="../images/security/icon_paper.png" alt="이수증출력" /><br />이수증출력</button>';
			}
			
			studyList += '</div>';
			studyList += '<table>';
			studyList += '<colgroup><col width="90px" /><col width="*" /><col width="90px" /><col width="92px" /><col width="92px" /></colgroup>';
		}
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
		
		if(data.serviceType == 1  || data.serviceType == 3 ){
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
		if(i==(midChasi-1) || i==(totalCount-1)){ //교육분기 2번으로 나누어 진행 최초와 중간일때 노출
			studyList += '</table>';
			studyList += '</li>';
		}
	}
	studyList += '</ul>';
	//수강 노출끝
	$('.list'+writeTarget+' form').html(studyList)
}

function returnDate(lectureStart){
	//날짜 구분	
	//lectureStart = '2017-11-01';
	lectureStart = lectureStart.split('-');
	//var chkDate = new Date(lectureStart[0],Number(lectureStart[1])-1,lectureStart[2]);
	var chkDate = new Date(lectureStart[0],lectureStart[1],lectureStart[2]);

	//alert(chkDate.getFullYear()+"-"+(chkDate.getMonth()+1)+"-"+chkDate.getDate());
	//chkDate.setMonth(chkDate.getMonth()+2); // 1달 더하기
	
	//일,월 0더하기
	//var chkMonth = chkDate.getMonth();
	var chkMonth = chkDate.getMonth()+1;
	if(chkMonth <= 9){
		chkMonth = '0'+chkMonth;
	}

	studyMonth01 = '<strong>'+lectureStart[0]+'</strong>년 <strong>'+lectureStart[1]+'</strong>월' //첫 교육달
	studyMonth02 = '<strong>'+chkDate.getFullYear()+'</strong>년 <strong>'+chkMonth+'</strong>월'; //두번째 교육달
	studyNextStart = chkDate.getFullYear()+'-'+chkMonth+'-01 00:00:00';//1달 체크 두번째 교육달 시작일 체크
	return(studyMonth01,studyMonth02,studyNextStart)
}
//수료증출력
function paperAct(){
	alert('준비중입니다.')
}
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
				if(this.mobile == 'Y'){
					lists += 'onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"';
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
		}
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq,renew){

	studySeq = studySeq ? studySeq : '';
	contentsCode = contentsCode ? contentsCode : '';
	lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
	
	var studyCnt = 0; //하루최대차시 체크용
	var studyBlock = $('#list'+studySeq);

	if (studyBlock.has('form').length != 0 && renew != 'Y'){
		studyBlock.children('form').remove();
		studyBlock.removeClass('openStudy');
	}else{
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			if(loginUserID != ''){
				//교육차시 세팅 및 교육기간세팅
				var totalCount = data.totalCount;
				var midChasi = Math.ceil(Number(data.totalCount)/2);
				if (totalCount != 0){
					returnDate(data.lectureStart)
					if(data.certPass == 'Y' || data.serviceType == '3' || data.serviceType == '9' ){
						//평가관련
						if($('#list'+studySeq+' > form').length == 0){
							$('#list'+studySeq).append('<form class="lectureForm'+studySeq+'" action="javascript:studyPlay('+studySeq+')" method="post" target="studyWindow"></form>')
						}
						var studyList = '';	//목록불러오기
						var nowTime = data.nowTime.substr(0,10);
						studyList += '<input type="hidden" name="seq" value="'+studySeq+'">';
						studyList += '<input type="hidden" name="sourceType" value="'+data.sourceType+'">';
						studyList += '<input type="hidden" name="contentsCode" value="'+data.contentsCode+'">';
						studyList += '<input type="hidden" name="lectureOpenSeq" value="'+data.lectureOpenSeq+'">';
						studyList += '<input type="hidden" name="chapter" value="">';
						studyList += '<input type="hidden" name="types" value="">';
						//리스트 노출시작
						var i=0;
						for (i=0;i<data.totalCount;i++){
							if(i==0 || i==midChasi){ //교육분기 2번으로 나누어 진행 최초와 중간일때 노출
								if(i==0){
									studyList += '<h1><strong>'+studyMonth01+'</strong> 교육</h1>';
								}else{
									studyList += '<h1><strong>'+studyMonth02+'</strong> 교육 <span>'+studyNextStart.substr(0,10)+'부터 교육가능</span></h1>';
								}
								studyList += '<ol>';
							}
							studyList += '<li onclick="studyPop(this,\''+data.progress[i].chapter+'\')">';
							studyList += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
							studyList += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyList += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyList += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}

							studyList += '</li>';
							//하루 최대 진도차시
							if(data.progress[i].endTime == null || data.progress[i].endTime.substr(0,10) == data.nowTime.substr(0,10)){
								studyCnt++
							}
							if(i==(midChasi-1) || i == totalCount){ //교육분기 2번으로 나누어 진행 최초와 중간일때 노출
								studyList += '</ol>';
							}
						}
						//리스트 노출 끝

					}				
				} else {
					alert('최초 수강 시 본인인증절차를 거쳐야 합니다. 본인인증은 PC로만 가능합니다. PC로 접속하여 본인인증을 진행해주시기 바랍니다.');
                    //certPassModal(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
				}
			}else{
				alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
				location.href="/security/m_login.php";
			}
			if (renew == 'Y'){
				studyBlock.children('ol').remove();
			}
			studyBlock.addClass('openStudy');
			studyBlock.children('form').html(studyList);
			//특수차시
			var prologue = ''
			var epilogue = ''

			$.each(data.progress,function(){
				if(this.chapter >= 100 && this.chapter <= 109){
					prologue += '<li onclick="studyPop(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+sourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
					prologue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					prologue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					prologue += '<h1>'+this.chapterName+'</h1>';
					prologue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					prologue += '</li>';
				}else if(this.chapter >= 110 && this.chapter <= 119){
					prologue += '<li onclick="studyPop(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+sourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
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

function studyPlay(targetNum){
	var sendData = $('form.lectureForm'+targetNum).serialize();
	console.log(sendData) ;
	$.get('../api/apiLoginUser.php',function(data){		
		if(data.userID == '') {
			alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
			location.href="/m/login.html";

		} else {
			if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n교육을 진행하시겠습니까?')){
				if(confirm('이어보기를 하시겠습니까?') != true){
					$('form.lectureForm'+targetNum).children('input[name="types"]').val('new')
				}
				var linkAddress = 'm_studyView.php?'+sendData;
				top.location.href = linkAddress;
			}
		}
	})
}

//수강 체크
function studyChk(target,chapter){
}

//날짜 구분 스크립트 - 경비교육 전용
function returnDate(lectureStart){
	//날짜 구분	
	//lectureStart = '2017-07-20'
	lectureStart = lectureStart.split('-');
	var chkDate = new Date(lectureStart[0],Number(lectureStart[1])-1,lectureStart[2])
	chkDate.setMonth(chkDate.getMonth()+2); // 1달 더하기
	
	//일,월 0더하기
	var chkMonth = chkDate.getMonth();	
	if(chkMonth <= 9){
		chkMonth = '0'+chkMonth;
	}
	
	studyMonth01 = '</strong>'+lectureStart[0]+'</strong>년 <strong>'+lectureStart[1]+'</strong>월' //첫 교육달
	studyMonth02 = '</strong>'+chkDate.getFullYear()+'</strong>년 <strong>'+chkMonth+'</strong>월'; //두번째 교육달
	studyNextStart = chkDate.getFullYear()+'-'+chkMonth+'-01 00:00:00';//1달 체크 두번째 교육달 시작일 체크
	return(studyMonth01,studyMonth02,studyNextStart)
}

//모바일용 강의진행 확인
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
			runningForm.submit();
		}

	})
}

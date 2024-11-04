//보드 정보 선언
seq = seq ? seq : '' ;
contentsCode = contentsCode ? contentsCode : '' ;
var useApi = '../api/apiContents.php';
var chapterApi = '../api/apiChapter.php';
var orderApi = '../api/apiOrder.php';
var loginApi = '../api/apiLoginUser.php';
var checkDateApi = '../api/apiStudyCenter.php';
var categoryApi = '../api/apiCategory.php';
var reviewApi = '../api/apiBoard.php';
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var totalCount = ''; //전체 페이지 카운트
var writeType = '';
var studyRequestStart = '';
var studyRequestEnd = '';
var categoryName01 = new Array();
var categoryName02 = new Array();
var sortData = '';
//var sort02 = '';

//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅

function listAct(page){
	
	//상단 액션 부분	
	var actionArea = '';
	var companys = subDomain;
	if(companys == ''){
		companys = 'kiraedu';
	}
	$.get(checkDateApi,{'companyID':companys},function(data){
		var requestMent = '상시 접수';
		var studyMent = '상시 접수';
		if(data.totalCount != 0) {
			studyRequestStart = data.studyCenter[0].studyRequestStart;
			studyRequestEnd = data.studyCenter[0].studyRequestEnd;
			studyStart = data.studyCenter[0].studyStart;
			studyEnd = data.studyCenter[0].studyEnd;

			/*if( studyRequestStart != '' && studyRequestStart != null){
				if(studyRequestStart == '1900-01-01') {
					studyMent = '수강승인 후 1개월 이내';
				} else {
					requestMent = studyRequestStart+'&nbsp;~&nbsp;'+studyRequestEnd
					studyMent = studyStart+'&nbsp;~&nbsp;'+studyEnd
				}
			}*/
			if(studyRequestStart || studyStart){
				requestMent = studyRequestStart+'&nbsp;~&nbsp;'+studyRequestEnd;
				studyMent = studyStart+'&nbsp;~&nbsp;'+studyEnd;
			}
		}
	})
	.done(function(){
		$.get(categoryApi,{'value01':'lectureCode','companyID':subDomain},function(data){
			var leftMenu = ''
			$.each(data.category, function(){
				var conNum = Number(this.value01.slice(7))
				leftMenu += '<li onclick="top.location.href=\'/lecture/?sort01='+this.value01+'\'">';
				leftMenu += this.value02+'과정';
				leftMenu += '</li>';
				if(this.value01 == sort01){
					$('#titleArea > h2 strong, #titleArea > h1').html(this.value02+'과정');
				}
				categoryName01[conNum] = this.value02;
				return categoryName02;
			})			
			$('.menuArea > ul').html(leftMenu);
			return categoryName01;
		})
		.done(function(){
			var enabled = 'Y';
				if(sortData == ''){
					$.get(categoryApi,{'value01':sort01,'companyID':subDomain,'enabled':enabled},function(data){
						var tabMenu = ''
						if(data.division != 0) {
							tabMenu += '<ul class="tabMenu">'
							//tabMenu += '<li class="select" id="">전체</li>';
							$.each(data.category, function(){
								tabMenu += '<li id="'+this.value01+'">';
								tabMenu += this.value02;
								tabMenu += '</li>'
								catName = this.value01;
							})
							tabMenu += '</ul>'
						}
						$('#contentsArea').before(tabMenu);
						$('.tabMenu li').click(function(){
							sort01 = this.value01;
							sort02 = $(this).attr('id');
							$('.tabMenu li').removeClass('select');
							$(this).addClass('select');
							ajaxAct(1)
						})
					})
				}
		})
		.always(function(){
			//게시물 소팅부분
			var contents = '';
			contents += '<ul class="lectureList">';
			contents += '</ul>';
			$('#contentsArea').removeAttr('class');
			$('#contentsArea').addClass('BBSList');
			$('#contentsArea').html(contents);
			ajaxAct();
			if(sortData != ''){
				//$('.tabMenu').remove();
				$('#titleArea > h2 strong, #titleArea > h1').html('검색결과')
			}
		})
	})
}

function ajaxAct(listPage){
	var mapping = '';

	if(typeof contentsMapping != 'undefined' && contentsMapping == 'N'){
		mapping = 'enabled=Y&enabled2=Y';
	}else{		
		mapping = 'enabled=Y&enabled2=Y&companyID='+subDomain;
	}
	var sort01s = '';
	var sort02s = '';

	sort01 = sort01 ? sort01 : '';
	if(sort01 != ''){
		if(sortData == ''){
			sort01s = '&sort01='+sort01;
		}
	}
	sort02 = sort02 ? sort02 : '';
	if(sort02 != ''){
		if(sortData == ''){
			sort02s = '&sort02='+sort02;
		}
	}
	listPage = listPage ? listPage : page ;
	page = listPage;
	var listAjax = $.get(useApi,mapping+'&page='+page+'&list='+listCount+sortData+sort01s+sort02s,function(data){
		imageURL = data.previewImageURL;
		totalCount = data.totalCount;
		var nowTime = data.nowTime;		
		var nowYear = nowTime.substr(0,4)
		var nowMonth = nowTime.substr(5,2)
		var nowDay = nowTime.substr(8,2)
		nowTime = new Date(nowMonth+'/'+nowDay+'/'+nowYear).getTime()
		var startTime = studyRequestStart;
		if (startTime == null || startTime == ''){
			startTime = '1900-01-01'
		}
		var startYear = startTime.substr(0,4)
		var startMonth = startTime.substr(5,2)
		var startDay = startTime.substr(8,2)
		startTime = new Date(startMonth+'/'+startDay+'/'+startYear).getTime();
		
		var endTime = studyRequestEnd;
		if (endTime == null || endTime == ''){
			endTime = '1900-01-01'
		}
		var endYear = endTime.substr(0,4)
		var endMonth = endTime.substr(5,2)
		var endDay = endTime.substr(8,2)
		endTime = new Date(endMonth+'/'+endDay+'/'+endYear).getTime();
		$('#titleArea > h3 > strong').html(totalCount)
		var lists = '';
		var i = 1;
		if(page != 1){
			i = totalCount - ((page-1) * listCount);
		}else{
			i = totalCount;
		}
		if (totalCount != 0){	
			/*
			$.each(data.contents, function(){
				lists += '<li>';
				//버튼영역
				lists += '<a href="#"><button type="button" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>'

				//썸네일
				if(this.previewImage != null){
					lists += '<img src="'+imageURL+this.previewImage+'" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="'+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'" />';
				}else{
					lists += '<img src="../images/lecture/img_noimage.png" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="이미지준비중" />';
				}

				//과정명
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-02-20 ~ 2017-03-19</span></h3>';
				lists += '<h1 onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')">'+this.contentsName+'</h1>'
				lists += '<h2>총 <strong>'+this.chapter+'</strong>차시&nbsp;/&nbsp;<strong>'+this.contentsTime+'</strong>시간</h2>'
				if(this.mobile == 'Y'){
					lists += '<h5>모바일 학습 가능</h5>'
				}
			})
			*/
			if(subDomain == 'clearwell'){
				lists += '<li>';
				lists += '<a href="#"><button type="button" onclick="viewAct(239,\'3XXD4U\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>';
				lists += '<img src="/attach/contents/031_01.jpg" onclick="viewAct(239,\'3XXD4U\')" alt="근로자 산업안전보건교육 Ⅱ-상" />';
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-03-21 ~ 2017-04-19</span></h3>';
				lists += '<h1 onclick="viewAct(4,\'3XXD4U\')">근로자 산업안전보건교육 Ⅱ-상</h1>';
				lists += '<h2>총 <strong>22</strong>차시&nbsp;/&nbsp;<strong>22</strong>시간</h2>';
				lists += '<h5>모바일 학습 가능</h5>';
				lists += '</li>';
			}else if(subDomain == 'serim'){
				lists += '<li>';
				lists += '<a href="#"><button type="button" onclick="viewAct(283,\'ZNE0YT\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>';
				lists += '<img src="/attach/contents/ZNE0YT.jpg" onclick="viewAct(283,\'ZNE0YT\')" alt="병원 근로자 정기안전•보건교육 [1차]" />';
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-09-20 ~ 2017-10-19</span></h3>';
				lists += '<h1 onclick="viewAct(283,\'ZNE0YT\')">병원 근로자 정기안전•보건교육 [1차]</h1>';
				lists += '<h2>총 <strong>8</strong>차시&nbsp;/&nbsp;<strong>6</strong>시간</h2>';
				lists += '<h5>모바일 학습 가능</h5>';
				lists += '</li>';
			}else if(subDomain == 'hrd'){
				lists += '<li>';
				lists += '<a href="#"><button type="button" onclick="viewAct(281,\'60RYI3\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>';
				lists += '<img src="/attach/contents/281_60RYI3.jpg" onclick="viewAct(281,\'60RYI3\')" alt="서비스업[백화점•마트] 근로자 정기안전•보건교육 [1차]" />';
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-09-20 ~ 2017-10-19</span></h3>';
				lists += '<h1 onclick="viewAct(281,\'60RYI3\')">서비스업[백화점•마트] 근로자 정기안전•보건교육 [1차]</h1>';
				lists += '<h2>총 <strong>8</strong>차시&nbsp;/&nbsp;<strong>6</strong>시간</h2>';
				lists += '<h5>모바일 학습 가능</h5>';
				lists += '</li>';
				lists += '<li>';
				lists += '<a href="#"><button type="button" onclick="viewAct(284,\'9C0NP1\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>';
				lists += '<img src="/attach/contents/9C0NP1.jpg" onclick="viewAct(284,\'9C0NP1\')" alt="제조업 근로자 정기안전•보건교육 [1차]" />';
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-09-20 ~ 2017-10-19</span></h3>';
				lists += '<h1 onclick="viewAct(284,\'9C0NP1\')">제조업 근로자 정기안전•보건교육 [1차]</h1>';
				lists += '<h2>총 <strong>8</strong>차시&nbsp;/&nbsp;<strong>8</strong>시간</h2>';
				lists += '<h5>모바일 학습 가능</h5>';
				lists += '</li>';
			}else{
				lists += '<li>';
				lists += '<a href="#"><button type="button" onclick="viewAct(239,\'3XXD4U\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>';
				lists += '<img src="/attach/contents/031_01.jpg" onclick="viewAct(239,\'3XXD4U\')" alt="근로자 산업안전보건교육 Ⅱ-상" />';
				lists += '<h3><span style=\'font-size:18px; color:#000000; padding-bottom:15px;\'>수강 일정 : 2017-03-15 ~ 2017-04-14</span></h3>';
				lists += '<h1 onclick="viewAct(4,\'3XXD4U\')">근로자 산업안전보건교육 Ⅱ-상</h1>';
				lists += '<h2>총 <strong>22</strong>차시&nbsp;/&nbsp;<strong>22</strong>시간</h2>';
				lists += '<h5>모바일 학습 가능</h5>';
				lists += '</li>';
			}
				
		} else {
			lists += '<li class="noList">과정이 없습니다.</li>';
		}
		$('.lectureList').html(lists);
		//pagerAct();
	})
}


//신청하기- 완료후 submitList() 실행 새로고침하도록 한다.
function lectureSubmit(types,contentsCode,contentsName,price,lectureStart,lectureEnd,serviceType){	
	var modalWrite = '';
	if(loginUserID == ''){
		if(confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?') == true){
			if(pageMode == 'studyCenterPage'){
				top.location.href='login.php?page=lecture.php?sort01=lecture01'
			}else{
				top.location.href='/member/login.php?page=lecture'
			}
		}
	}else{
		var listAjax = $.get(loginApi,function(data){
		var today = new Date(data.nowTime);
		var dd = today.getDate();
		if(dd <= 9){ dd = '0'+dd }
		var mm = today.getMonth()+1; //January is 0!
		if(mm <= 9){ mm = '0'+mm }
		var yy = today.getFullYear();

		today.setDate(today.getDate() + 30); //15일 더하여 setting
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		if(month <= 9){ month = '0'+month }
		var day = today.getDate();
		if(day <= 9){ day = '0'+day }
		var yy = today.getFullYear();

		modalWrite +='<form class="orderSubmit" id="orderSubmit" method="post" action="../lib/payment/payreq_crossplatform.php">';
		modalWrite +='<div id="modal">';
		modalWrite +='<div class="lectureSubmit">';
		modalWrite +='<h1>교육신청하기<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite +='<div>';
		modalWrite +='<div class="BBSList">';
		modalWrite +='<input type="hidden" name="serviceType" value="0">'; // 서비스 구분 : 0-사업주개별, 1-사업주, 2-일반(비환급), 3-능력개발
		modalWrite +='<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		modalWrite +='<input type="hidden" name="educationPrice" value="'+price+'">';
		modalWrite +='<input type="hidden" name="lectureStart" value="'+lectureStart+'">';
		modalWrite +='<input type="hidden" name="lectureEnd" value="'+lectureEnd+'">';
		modalWrite +='<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value="'+contentsName+'"/>';
		modalWrite +='<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value="'+price+'"/>';
		modalWrite +='<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value="'+data.email01+'@'+data.email02+'"/>';
		modalWrite +='<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_BUYEREMAIL" value="SC0010"/>';
		modalWrite +='<input type="hidden" name="LGD_ENCODING" id="LGD_ENCODING" value="UTF-8"/>';

		modalWrite +='<table><thead><tr>';
		modalWrite +='<th>과정명</th>';
		modalWrite +='<th style="width:70px;">기간</th>';
		modalWrite +='<th style="width:70px;">교육비</th>';
		modalWrite +='</tr></thead><tbody>';
		modalWrite +='<td>'+contentsName+'</td>';
		modalWrite +='<td>1개월</td>';
		modalWrite +='<td>'+toPriceNum(price)+'</td>';
		modalWrite +='</tbody></table>';
		modalWrite +='</div>';
		modalWrite +='<div class="BBSWrite">';
		modalWrite +='<li>';
		modalWrite +='<h1>수강기간</h1>';
		modalWrite +=lectureStart+' ~ '+lectureEnd;
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>신청자</h1>';
		modalWrite +=data.userName;
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>연락처</h1>';
		modalWrite +=data.mobile01+'-'+data.mobile02+'-'+data.mobile03;
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>이메일</h1>';
		modalWrite +=data.email01+'@'+data.email02;
		modalWrite +='</li>';
		if(serviceType == '2') {
			modalWrite +='<div class="btnArea"><button type="button" onClick="doPay();">결제하기</button></div>';
			modalWrite +='</div>';
		} else {
			modalWrite +='<li>';
			modalWrite +='<h1>주민등록번호</h1>';
			modalWrite +='<input class="name" type="tel" name="RRN01" />&nbsp;-&nbsp;<input class="name" type="password" name="RRN02" />';
			modalWrite +='<div class="normalText" style="margin:10px 0;">';
			modalWrite +='신청하는 과정은 사업주지원훈련과정입니다. 근로자직업능력개발법 시행령 제52조의2(민감정보 및 고유식별정보의처리)에 의하여 주민번호 등을 처리할 수 있으며, 수집한 주민번호는 산업인력공단에 훈련 실시신고 후 바로 파기합니다.';
			modalWrite +='자세한 사업주지원훈련 정보는 <a href="/eduinfo" target="_blank">이곳을 클릭</a>하여 확인하실 수 있습니다. 반드시 신청 정보를 확인 후 신청하시기 바랍니다.';
			modalWrite +='</div>';
			modalWrite +='</li>';
			modalWrite +='</div>';
			modalWrite +='<div class="btnArea"><button type="button" onClick="orderReg()">신청하기</button></div>';
		}
		//modalWrite +='<li><h1></h1><div class="normalText">';
		//modalWrite +='수강시작일 <select name="dday"><option value="0">당일시작</option><option value="1">1일후</option><option value="2">2일후</option><option value="3">3일후</option></select>';
		//modalWrite +='</div></li>';
		modalWrite +='</div>';
		modalWrite +='</div>';
		modalWrite +='</form>';
		$('#footer').after(modalWrite);
		modalAlign();
		})
	}
}

function viewAct(viewSeq,contentsCode){
	viewSeq = viewSeq ? viewSeq : '';
	seq = viewSeq;
	contentsCode = contentsCode;
	//상단 액션 부분	
	$('.searchArea').remove();	
	$('.dateArea').remove();
	$('.tabMenu').remove();
	//게시물 소팅부분
	var views = '';
	$.get(useApi,{'seq':seq,'contentsCode':contentsCode},function(data){
		imageURL = data.previewImageURL;
		bookURL = data.bookImageURL;

		$.each(data.contents, function(){
			if(sort01 == ''){
				$('#titleArea > h2 strong, #titleArea > h1').html(this.sort01Name+'과정');
				sort01 = this.sort01;
				sort02 = this.sort02;
				$.get(categoryApi,{'value01':'lectureCode'},function(data){
					var leftMenu = ''
					$.each(data.category, function(){
						leftMenu += '<li onclick="top.location.href=\'/lecture/?sort01='+this.value01+'\'">';
						leftMenu += this.value02+'과정';
						leftMenu += '</li>';
					})			
					$('.menuArea > ul').html(leftMenu);
				})
			}
			views += '<div class="summuryArea">';
			if(this.previewImage != '' && this.previewImage != null){
				views += '<img src="'+imageURL+this.previewImage+'" alt="'+this.contentsName+'" />';
			}else{
				views += '<img src="/images/lecture/img_noimage.png" alt="이미지 준비중입니다." />'
			}
			views += '<h5>'+this.sort01Name+' <img src="../images/global/icon_triangle.png" alt="화살표" /> '+this.sort02Name+'</h5>'
			views += '<h1>'+this.contentsName+'</h1>';
			views += '<h2>총 <strong>'+this.chapter+'</strong>차시 / <strong>'+this.contentsTime+'시간</strong></h2>';
			views += '<h3><strong>'+this.professor+'</strong> 강사</h3>';
			//views += '<button type="button">미리보기</button>'
			//views += '<button type="button" class="listButton" onclick="listAct()">목록으로</button>'
			views += '</div>';
			

			if (this.serviceType == 1){  // 환급 과정일때만 평가 항목 출력
				//수료기준
				views += '<h1>수료기준 및 수강정원</h1>'
				views += '<table><tr>';
				views += '<th>수강정원</th>';
				views += '<th>총 진도율</th>';
				views += '<th>중간평가</th>';
				views += '<th>최종평가</th>';
				views += '<th>과제</th>';
				views += '</tr><tr>';
				views += '<td rowspan="2"><strong>'+this.limited+'</strong>명</td>';
				views += '<td rowspan="2"><strong>'+this.passProgress+'</strong>% 이상</td>';
				views += '<td>총&nbsp;<strong>';
				if(this.totalPassMid != 0){
					views += this.totalPassMid+'</strong>점 / <strong>'+this.midRate+'</strong>% 반영';
				}
				views += '</td>';
				views += '<td>총&nbsp;<strong>';
				if(this.totalPassTest != 0){
					views += this.totalPassTest+'</strong>점 / <strong>'+this.testRate+'</strong>% 반영';
				}
				views += '</td>';
				views += '<td>';
				if(this.totalPassReport != 0){
					views += '총&nbsp;<strong>'+this.totalPassReport+'</strong>점 / <strong>'+this.reportRate+'</strong>% 반영';
				} else {
					views += '없음';
				}
				views += '</td>';
				views += '</tr><tr>';
				views += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+this.passScore+'</strong>점 이상</td>';
				views += '</tr></table>';
				
				if(subDomain != 'hangun' && subDomain != 'locus'){
					//교육비
					views += '<h1>교육비 안내</h1>'
					views += '<table><tr>';
					views += '<th>교육비</th>';
					views += '<th>환급 : 우선지원 기업</th>';
					views += '<th>환급 : 대규모<br />(1000인 미만)</th>';
					views += '<th>환급 : 대규모<br />(1000인 이상)</th>';
					views += '</tr><tr>';
					views += '<td><strong>'+toPriceNum(this.price)+'</strong>원</td>';
					views += '<td><strong>'+toPriceNum(this.rPrice01)+'</strong>원</td>';
					views += '<td><strong>'+toPriceNum(this.rPrice02)+'</strong>원</td>';
					views += '<td><strong>'+toPriceNum(this.rPrice03)+'</strong>원</td>';
					views += '</tr></table>';
				}
			} else {
				views += '<h1>수료기준</h1>'
				views += '<div class="infoArea">총 진도율 <strong>'+this.passProgress+'</strong>% 이상</div>';
			}
			
			//교육교재안내
			if(this.bookIntro != '' && this.bookIntro != null){
				views += '<h1>교재정보</h1>'
				views += '<div class="bookInfo">'
				if(this.bookImage != '' && this.bookImage != null){
					views += '<img src="'+bookURL+this.bookImage+'" alt="교재이미지">';
				}else{
					views += '<img src="/images/lecture/img_nobooks.png" alt="이미지가 준비중입니다." />'
				}
				views += '<h1>'+this.bookIntro+'</h1>'
				views += '</div>';
			}
			//교육소개관련
			if(this.intro != '' && this.intro != null){
				views += '<h1>과정소개</h1>';
				views += '<div class="infoArea">';
				views += this.intro.replace(/\n/g,'<br />');
				views += '</div>';
			};
			if(this.target != '' && this.target != null){
				views += '<h1>교육대상</h1>';
				views += '<div class="infoArea">';
				views += this.target.replace(/\n/g,'<br />');
				views += '</div>';
			};
			if(this.goal != '' && this.goal != null){
				views += '<h1>교육목표</h1>';
				views += '<div class="infoArea">';
				views += this.goal.replace(/\n/g,'<br />');
				views += '</div>';
			};
			//목차관련
			views += '<h1>교육목차</h1>';
			views += '<ol></ol>';
			views += '<div class="btnArea">';
			//views += '<button type="button" onclick="listAct(page)">목록으로</button>'
			views += '</div>';
		})
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('lectureDetail');
		$('#contentsArea').html(views);		
	}).done(function(data){
		$.each(data.contents, function(){
			$.get(chapterApi,{'contentsCode':this.contentsCode},function(data){
				var chapterWrite = '';
				$.each(data.chapter,function(){
					chapterWrite += '<li>'+this.chapterName+'</li>'
				})
				$('.lectureDetail ol').html(chapterWrite);
				var previewLink = data.chapter[0].player+'/player/popupPreview.php?contentsCode='+data.contentsCode+'&sourceType='+data.sourceType;
				$('.summuryArea > button:eq(0)').bind({
					click:function(){
						window.open(previewLink,"학습창","location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","study")
					}
				})
			})
		})		
	}).always(function(data){
		$.each(data.contents, function(){
			$.get(reviewApi,{'boardCode':'3','list':'5','page':'1','addItem01':this.contentsCode},function(data){
				var reviewCount = data.totalCount
				if(reviewCount != 0){
					var reviewWrite = '';
					reviewWrite += '<h1>수강후기<button type="button" onclick="openReview(\''+data.board[0].addItem01+'\');">댓글 더보기+</button></h1>';
					reviewWrite += '<div class="reviewArea">';
					reviewWrite += '<ul>'
					$.each(data.board, function(){
						reviewWrite += '<li>';
						reviewWrite += '<div>';
						reviewWrite += '<h3 class="scroe'+this.addItem02+'">[ <strong>'+this.addItem02+'</strong>/5점 ]</h3>';
						reviewWrite += '<h1>'+this.userName.substr(0,this.userName.length-1)+'*('+this.userID.substr(0,this.userID.length-3)+'***)</h1>';
						reviewWrite += '<h2>Date : '+this.inputDate+' | IP : '+this.userIP+'</h2>';
						reviewWrite += '<p>'+this.content+'</p>';
						reviewWrite += '</div>';
						reviewWrite += '</li>';
					})
					reviewWrite += '</ul>'
					reviewWrite += '</div>';
				}
				$('.btnArea').before(reviewWrite)
			})
		})
	})
}

function orderReg(){
    var RRN01 = $('input[name="RRN01"]');
    var RRN02 = $('input[name="RRN02"]');
    var RRN = RRN01.val() + RRN02.val();
	var sendSerial = $('form.orderSubmit').serialize();

	if($('input[name="RRN01"]').val() == '' || $('input[name="RRN02"]').val() == ''){
		alert('주민등록번호를 입력해 주세요.');
		return;
	}
	if($('input[name="RRN01"]').val().length != 6 || $('input[name="RRN02"]').val().length != 7){
		alert('주민등록번호를 다시 입력해 주세요.');
		return;
	}

    //올바른 주민등록번호가 입력되는지 검사
    var total = 0;
    var cnt = 2;
    for (var i = 0; i < RRN.length - 1; i++) {
        if (cnt > 9) {
            cnt = 2;
        }
        total += parseInt(RRN.charAt(i)) * cnt;
        cnt++;
    }
    var check = (11 - (total % 11)) % 10;
    if(parseInt(check) != parseInt(RRN.charAt(12)))
    {
        alert("주민등록번호를 다시 입력해 주세요.");
        RRN01.value = "";
        RRN02.value = "";
        RRN01.focus();
        return false;
     }
    if(!$('.payForm input[type="radio"]').is(':checked') ){
		alert('결제방식을 선택해 주세요.');
		return;
	}

    if($('#remit02').is(':checked')) {
        if($('select[name="bank"]').val() == 'bank01'){
            alert('은행명을 선택해 주세요.');
            return;
        }
        if($('input[name="bankNum"]').val() == ''){
            alert('계좌번호를 입력해 주세요.');
            return;
        }
        if($('input[name="bankName"]').val() == ''){
            alert('입금자명 입력해 주세요.');
            return;
        }
    }
		$.ajax({
			url: orderApi,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				if(data == 'duplication'){
					alert('이미 수강신청한 과정입니다. 내 강의실 - 수강신청내역을 확인해 주십시오.');
				} else {
					alert('신청 되었습니다. 신청한 과정은 내 강의실 - 수강신청내역에서 확인해 주십시오.');
				}
				modalClose();
				ajaxAct();
			},
			fail:function(){
				alert('신청 도중 오류가 발생하였습니다.')
			}
		})
}


function searchActLecture(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	page = 1;
	sortData = searchValue;
	ajaxAct();
	$('.tabMenu').remove();
	$('#titleArea > h2 strong, #titleArea > h1').html('검색결과')
}

function openReview(contentsCode){
	popupAddress = '../lecture/review.html?contentsCode='+contentsCode;
	window.open(popupAddress,"review","top=0, left=0, width=640, height=530, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","reviewPop")
}

function doPay() {
	// 결제창 호출
	document.getElementById("orderSubmit").submit();
}
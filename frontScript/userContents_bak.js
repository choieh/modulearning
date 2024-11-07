//보드 정보 선언
seq = seq ? seq : '' ;
contentsCode = contentsCode ? contentsCode : '' ;
var useApi = '../api/apiContents.php';
var chapterApi = '../api/apiChapter.php';
var orderApi = '../api/apiOrder.php';
var loginApi = '../api/apiLoginUser.php';
var checkDateApi = '../api/apiStudyCenter.php';
var categoryApi = '../api/apiCategory.php';
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
var sort02 = '';

//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅

function sortCategories(){
	
}

function listAct(page){

	//상단 액션 부분	
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchActLecture()">';
	actionArea += '<input type="hidden" name="searchType" value="contentsName" />';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchActLecture()">검색하기</button></form>';
	actionArea += '</form>'
	actionArea += '&nbsp</div>';
	$.get(checkDateApi,{'companyID':'kiraedu'},function(data){
		studyRequestStart = data.studyCenter[0].studyRequestStart;
		studyRequestEnd = data.studyCenter[0].studyRequestEnd;
		studyStart = data.studyCenter[0].studyStart;
		studyEnd = data.studyCenter[0].studyEnd;
		if( studyRequestStart != '' && studyRequestStart != null){
			actionArea += '<div class="dateArea">';
			actionArea += '<ul>'
			actionArea += '<li><h1>교육신청기간 : </h1>'+studyRequestStart+'&nbsp;~&nbsp;'+studyRequestEnd+'</li>';
			actionArea += '<li><h1>교육진행기간 : </h1>'+data.studyCenter[0].studyStart+'&nbsp;~&nbsp;'+data.studyCenter[0].studyEnd+'</li>';
			actionArea += '</div>';
		}
		$('#contentsArea').before(actionArea);	
	})
	.done(function(){
		$.get(categoryApi,{'value01':'lectureCode'},function(data){
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
				$.get(categoryApi,{'value01':this.value01},function(data){
					totalCnt = data.totalCount;
					var i = 0;
					for(i=0; i<totalCnt ; i++){
						var conNum02 = Number(data.category[i].value01.slice(7));
						categoryName02[conNum02] = data.category[i].value02;
					}
				})
				return categoryName02;
			})			
			$('.menuArea > ul').html(leftMenu);
			return categoryName01;
		})
		.done(function(){
			if(sortData == ''){
				$.get(categoryApi,{'value01':sort01},function(data){
					var tabMenu = ''
					tabMenu += '<ul class="tabMenu">'
					tabMenu += '<li class="select" id="">전체</li>';
					$.each(data.category, function(){
						tabMenu += '<li id="'+this.value01+'">';
						tabMenu += this.value02;
						tabMenu += '</li>'
						catName = this.value01;
					})
					tabMenu += '</ul>'
					$('#contentsArea').before(tabMenu);
					$('.tabMenu li').click(function(){
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
	var sort01s = '';
	var sort02s = '';
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
	var listAjax = $.get(useApi,'enabled=Y&page='+page+'&list='+listCount+sortData+sort01s+sort02s,function(data){
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
			endTime = '2800-01-01'
		}
		var endYear = endTime.substr(0,4)
		var endMonth = endTime.substr(5,2)
		var endDay = endTime.substr(8,2)
		endTime = new Date(endMonth+'/'+endDay+'/'+endYear).getTime();
		
		$('#titleArea > h3 > strong').html(totalCount)
		//alert(totalCount)
		var lists = '';
		var i = 1;
		if(page != 1){
			i = totalCount - ((page-1) * listCount);
		}else{
			i = totalCount;
		}
		if (totalCount != 0){	
			$.each(data.contents, function(){
				lists += '<li>';
				
				//버튼영역
				lists += '<button type="button" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button>'				
				if(startTime <= nowTime && endTime >= nowTime){
					lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>'
				}else{
					lists += '<button type="button" onClick="alert(\'신청기간이 아닙니다.\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>'
				}
				
				//썸네일
				if(this.previewImage != null){
					lists += '<img src="'+imageURL+this.previewImage+'" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="'+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'" />';
				}else{
					lists += '<img src="../images/lecture/img_noimage.png" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="이미지준비중" />';
				}
				//과정명
				
				lists += '<h3>'+this.sort01Name+' > '+this.sort02Name+'</h3>'
				lists += '<h1 onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')">'+this.contentsName+'</h1>'
				lists += '<h2>총 <strong>'+this.chapter+'</strong>차시&nbsp;/&nbsp;<strong>'+this.contentsTime+'</strong>시간</h2>'
				if(this.mobile == 'Y'){
					lists += '<h5>모바일 학습 가능</h5>'
				}
			})
		} else {
			lists += '<li class="noList">과정이 없습니다.</li>';
		}
		$('.lectureList').html(lists);
		pagerAct();
	})
}


//신청하기- 완료후 submitList() 실행 새로고침하도록 한다.
function lectureSubmit(types,contentsCode,contentsName,price,lectureStart,lectureEnd){	
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


		modalWrite +='<div id="modal">';
		modalWrite +='<div class="lectureSubmit">';
		modalWrite +='<h1>교육신청하기<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite +='<div class="BBSList scrollArea">';
		modalWrite +='<form class="orderSubmit" method="post">';
		modalWrite +='<input type="hidden" name="serviceType" value="0">'; // 서비스 구분 : 0-사업주개별, 1-사업주, 2-능력개발, 3-일반(비환급)
		modalWrite +='<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		modalWrite +='<input type="hidden" name="educationPrice" value="'+price+'">';
		modalWrite +='<input type="hidden" name="lectureStart" value="'+lectureStart+'">';
		modalWrite +='<input type="hidden" name="lectureEnd" value="'+lectureEnd+'">';
		modalWrite +='<table><thead><tr>';
		modalWrite +='<th>과정명</th>';
		modalWrite +='<th style="width:70px;">기간</th>';
		modalWrite +='<th style="width:70px;">교육비</th>';
		modalWrite +='</tr></thead><tbody>';
		modalWrite +='<td>'+contentsName+'</td>';
		modalWrite +='<td>30일</td>';
		modalWrite +='<td>'+price+'</td>';
		modalWrite +='</tbody></table>';
		modalWrite +='</div>';
		modalWrite +='<div class="BBSWrite">';
		modalWrite +='<li>';
		modalWrite +='<h1>수강기간</h1>';
		modalWrite +='<div class="normalText">';
		modalWrite +=lectureStart+' ~ '+lectureEnd;
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>신청자</h1>';
		modalWrite +='<div class="normalText">';
		modalWrite +=data.userName;
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>연락처</h1>';
		modalWrite +='<div class="normalText">';
		modalWrite +=data.mobile01+'-'+data.mobile02+'-'+data.mobile03;
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>이메일</h1>';
		modalWrite +='<div class="normalText">';
		modalWrite +=data.email01+'@'+data.email02;
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1></h1>';
		modalWrite +='<div class="normalText">';
		modalWrite +='신청정보를 반드시 확인 후 신청하시기 바랍니다.';
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='</form>';
		modalWrite +='</div>';

		//modalWrite +='<li><h1></h1><div class="normalText">';
		//modalWrite +='수강시작일 <select name="dday"><option value="0">당일시작</option><option value="1">1일후</option><option value="2">2일후</option><option value="3">3일후</option></select>';
		//modalWrite +='</div></li>';

		modalWrite +='<div class="btnArea"><button type="button" onClick="orderReg()">신청하기</button></div>';
		modalWrite +='</div>';
		modalWrite +='</div>';
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
			views += '<div class="summuryArea">';
			if(this.previewImage != '' && this.previewImage != null){
				views += '<img src="'+imageURL+this.previewImage+'" alt="'+this.contentsName+'" />';
			}else{
				views += '<img src="/images/lecture/img_noimage.png" alt="이미지가 준비중입니다." />'
			}
			views += '<h5>'+this.sort01Name+' <img src="../images/global/icon_triangle.png" alt="화살표" /> '+this.sort02Name+'</h5>'
			views += '<h1>'+this.contentsName+'</h1>';
			views += '<h2>총 <strong>'+this.chapter+'</strong>차시 / <strong>'+this.contentsTime+'시간</strong> 교육과정</h2>';
			views += '<h3><strong>'+this.professor+'</strong> 강사</h3>';
			views += '<button type="button">미리보기</button>'
			views += '<button type="button" class="listButton" onclick="listAct()">목록으로</button>'
			views += '</div>';
			
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
				views += this.target.replace(/\n/g,'<br />');;
				views += '</div>';
			};
			if(this.goal != '' && this.goal != null){
				views += '<h1>교육목표</h1>';
				views += '<div class="infoArea">';
				views += this.goal.replace(/\n/g,'<br />');;
				views += '</div>';
			};
			//목차관련
			views += '<h1>교육목차</h1>';
			views += '<ol></ol>';
			views += '<div class="btnArea">';
			views += '<button type="button" onclick="listAct(page)">목록으로</button>'
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
				var previewLink = data.chapter[0].player+'/player/popupPreview.php?contentsCode='+data.contentsCode;
				$('.summuryArea > button:eq(0)').bind({
					click:function(){
						window.open(previewLink,"이상에듀학습창","location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy")
					}
				})
			})
		})		
	})
}

function orderReg(){
	var sendSerial = $('form.orderSubmit').serialize();
		$.ajax({
			url: orderApi,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				alert('신청 되었습니다.');
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
//보드 정보 선언
seq = seq ? seq : '' ;
var useApi = '../api/apiStudyCenterOrder.php';
var orderApi = '../api/apiOrder.php';
var detailApi = '../api/apiContents.php';
var chapterApi = '../api/apiChapter.php';
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var totalCount = ''; //전체 페이지 카운트
var sortData = ''; //검색값

//리스트 소팅


function listAct(){
    if(loginUserID == ''){
        var pageWrites ="";
        pageWrites += '<form class="orderSearch" action="javascript:orderSearch()">';
        pageWrites += '<h1>수강신청조회</h1>';
		pageWrites += '<h2>다음 정보를 입력하여 조회합니다.</h2>';
		pageWrites += '<div><h1>신청자명</h1><input type="text" name="userName" /></div>';
		pageWrites += '<div><h1>생년월일</h1><input type="tel" name="birth01" maxlength="2" />&nbsp;년&nbsp;&nbsp;&nbsp;<input type="tel" name="birth02" maxlength="2" />&nbsp;월&nbsp;&nbsp;&nbsp;<input type="tel" name="birth03" maxlength="2" />&nbsp;일&nbsp;<strong>(ex.92년 9월 19일)</strong></div>';
		pageWrites += '<div><h1>휴대폰</h1><input type="tel" name="mobile01" maxlength="3" />&nbsp;-&nbsp;<input type="tel" name="mobile02" maxlength="4"" />-&nbsp;<input type="tel" name="mobile03" maxlength="4"" /></div>';
		pageWrites += '<button type="submit"><img src="../images/member/btn_find.png" alt="찾기" />수강신청조회</button>';
		pageWrites += '</form>';

        $('#contentsArea').html(pageWrites)
    }else{
        alert(loginUserName+'님은 이미 로그인 되어있습니다.');
        top.location.href='/studyCenter/studyOrder.php'
    }
}

//리스트형태 검색 search Ajax
function orderSearch(){
    $('input[type="tel"]').each(function(){
        if($(this).val().length == 1){
			nuNumber = '0'+$(this).val();
			$(this).val(nuNumber)
		}
    });

    //var data = { };
	sortData = '&'+$('form.orderSearch').serialize();
	page = 1;
	ajaxAct();
	/*
    $.each($('.orderSearch').serializeArray(), function() {
        datas[this.name] = this.value;
    });
	
	console.log(datas['mobile01'])
	*/
	//console.log(data)
	/*
    var birth = data.birth01 + data.birth02 + data.birth03;

	searchValue = '&userName='+data.userName+'&mobile01='+data.mobile01+'&mobile02='+data.mobile02+'&mobile03='+data.mobile03+'&birth='+birth+'';
    sortData = searchValue;
    page = 1;
	ajaxAct();
	*/
}

function ajaxAct(){
    $.get(useApi,'enabled=Y&page='+page+'&list='+listCount+sortData,function(data){
        imageURL = data.previewImageURL;
		totalCount = data.totalCount;
    
		var nowTime = '2017-04-21'
		//var nowTime = data.nowTime;		
		var nowYear = nowTime.substr(0,4)
		var nowMonth = nowTime.substr(5,2)
		var nowDay = nowTime.substr(8,2)
		nowTime = new Date(nowMonth+'/'+nowDay+'/'+nowYear);
		nowTime = nowTime.setDate(nowTime.getDate())

		$('#titleArea > h3 > strong').html(totalCount)
		var lists = '';
		var i = 1;
		if(page != 1){
			i = totalCount - ((page-1) * listCount);
		}else{
			i = totalCount;
		}
        lists += '<ul class="lectureList">'
		if (totalCount != 0){
			$.each(data.order, function(){
			
				var startTime = this.lectureStart;
				var startYear = startTime.substr(0,4)
				var startMonth = startTime.substr(5,2)
				var startDay = startTime.substr(8,2)
				startTime = new Date(startMonth+'/'+startDay+'/'+startYear);
				
				var refoundTime = startTime.setDate(startTime.getDate() - 3);//수강시작 ~일까지 취소가능
				var refoundYear = new Date(refoundTime).getFullYear();
				var refoundMonth = new Date(refoundTime).getMonth() + 1;
				if(refoundMonth <= 10){
					refoundMonth = '0'+refoundMonth;
				}
				var refoundDay = new Date(refoundTime).getDate();
				if(refoundDay <= 10){
					refoundDay = '0'+refoundDay;
				}
				var refoundDate = refoundYear +'-'+ refoundMonth +'-'+ refoundDay;
				//var refoundTimes = refoundTime.getDate()
				
				lists += '<li>';
				
				//버튼영역
				lists += '<button type="button" onclick="viewAct(\''+this.contentsCode+'\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button>'
				if(refoundTime >= nowTime){
					lists += '<button type="button" onClick="deleteData(\''+this.seq+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청취소이미지"><br />변경 및 취소</button>'
				}
				
				//썸네일
				if(this.previewImage != null){
					lists += '<img src="'+imageURL+this.previewImage+'" onclick="viewAct(\''+this.contentsCode+'\')" alt="'+this.contentsName+'" />';
				}else{
					lists += '<img src="../images/lecture/img_noimage.png" onclick="viewAct(\''+this.contentsCode+'\')" alt="이미지준비중" />';
				}
				//과정명
				lists += '<h3>교육과정 > 경영.리더십과정</h3>'
				lists += '<h1 onclick="viewAct(\''+this.contentsCode+'\')">'+this.contentsName+'</h1>'
				if(this.mobile == 'Y'){
					lists += '<h5>모바일 학습 가능</h5>'
				}
				lists += '<h4>수강 신청일 : '+this.orderDate+'&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;취소 가능일 : <strong class="red">'+refoundDate+'</strong>까지</h4>'
				lists += '<h4>수강기간 : <strong class="blue">'+this.lectureStart+'&nbsp;~&nbsp;'+this.lectureEnd+'</strong></h4>';
			})
		} else {
			lists += '<li class="noList">신청 내역이 없습니다.</li>';
		}
        lists += '</ul>'
		$('#contentsArea').html(lists);
        $('#contentsArea').addClass('BBSList');
        $('#contentsArea').removeClass('lectureDetail');
		pagerAct();

    })
}

function viewAct(contentsCode){
	//상단 액션 부분	
	$('.searchArea').remove();	
	//게시물 소팅부분
	var views = '';
	$.get(detailApi,{'contentsCode':contentsCode},function(data){
		imageURL = data.previewImageURL;
		$.each(data.contents, function(){
			views += '<div class="summuryArea">';
			if(this.previewImage != '' && this.previewImage != null){
				views += '<img src="'+imageURL+this.previewImage+'" alt="'+this.contentsName+'" />';
			}else{
				views += '<img src="/images/lecture/img_noimage.png" alt="이미지가 준비중입니다." />'
			}
			views += '<h5>리더십<img src="../images/global/icon_triangle.png" alt="화살표" />인문학 리더십</h5>'
			views += '<h1>'+this.contentsName+'</h1>';
			views += '<h2>총 <strong>'+this.chapter+'</strong>차시 / <strong>'+this.contentsTime+'시간</strong> 교육과정</h2>';
			views += '<h3><strong>'+this.professor+'</strong> 강사</h3>';
			views += '<button type="button" onclick="studyPop(\''+this.contentsCode+'\');">미리보기</button>'
            views += '<button type="button" class="listButton" onclick="ajaxAct()">목록으로</button>'
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
			views += '<th>일반교육비</th>';
			views += '<th>우선지원 기업</th>';
			views += '<th>대규모<br />(1000인 미만)</th>';
			views += '<th>대규모<br />(1000인 이상)</th>';
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
			views += '<button type="button" onclick="ajaxAct()">목록으로</button>'
			views += '</div>';
		})
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('lectureDetail');
		$('#contentsArea').html(views);		
	}).done(function(data){
		var contentsCode = ''
		$.each(data.contents, function(){
			$.get(chapterApi,{'contentsCode':this.contentsCode},function(data){
				var chapterWrite = '';
				$.each(data.chapter,function(){
					chapterWrite += '<li>'+this.chapterName+'</li>'
				})
				$('.lectureDetail ol').html(chapterWrite)
			})
		})		
	})
}


function studyPop(contentsCode){
	popupAddress = 'http://cont2.'+siteURL+'/player/popupPreview.php?contentsCode='+contentsCode+'&chapter=1';
	window.open(popupAddress,"이상에듀학습창","menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy")
}

function deleteData(delSeq){
	if(confirm('정말 취소하시겠습니까? 교육신청 기간에는 얼마든지 다시 신청이 가능합니다.') == true){
		$.ajax({
			url:useApi,
			type:'DELETE',
			data:{'seq':delSeq},
			dataType:'json',
			success: function(data){
				if(data.result == 'success'){
					alert('수강신청한 과정이 취소 처리되었습니다.');
					ajaxAct();
				}else{
					alert(data.result);
				}		
			},
			fail: function(){
				alert('시스템에 문제가 있습니다. 관리자에 문의하세요')
			}
		})
	}
		
}
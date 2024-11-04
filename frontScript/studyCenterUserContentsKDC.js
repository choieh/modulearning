//보드 정보 선언
seq = seq ? seq : '' ;
contentsCode = contentsCode ? contentsCode : '' ;
currSort01 = '';
currNcs01 = '';
//var useApi = '../api/apiContents.php';

var useApi = '../api/apiContentsUserKDC.php';

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
var inputStudyType = '';
var categoryName01 = new Array();
var categoryName02 = new Array();
var sortData = '';
//var sort02 = '';

//출력변수 지정
var recipientMobile01 = '';
var email01 = '';
var email02 = '';

if (seq != '') {
	viewAct(seq, contentsCode);
}

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

	$('#titleArea h3').css('display','block');
  
	//상단 액션 부분
	var actionArea = '';
	if(subDomain != 'safety' && subDomain != 'ksa') {
		actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchActLecture()">';
		actionArea += '<input type="hidden" name="searchType" value="contentsName" />';

    // actionArea += `
    // <select name="sort01">
    // </select>
    // `
    // 대분류 중분류 박스
    if(/studyCenterFlex\/lecture.php/.test(location.pathname)){
      let sort01 = `
      <select id='sort01' name='sort01' style="appearance:auto; height:34px; width:150px; border:1px solid black !important;">
      <option value="">대분류 선택</option>
      ` + contentsCategoryArr.map(v=>{
        return `
        <option value="${v.value01}">${v.value02}</option>
        `
      }).join('') + `</select>
      <select id='sort02' name='sort02' style="appearance:auto; height:34px; width:150px; border:1px solid black !important;">
      <option value="">중분류 선택</option>
      <option value="">대분류를 선택해주세요</option>
      </select>`
      
      actionArea += sort01
      let sort02 = contentsCategoryArr.map(v=>{
        return `
        <select id='${v.value01}' name='sort02' class='${v.value01}' style="appearance:auto; display:none; height:34px; width:150px; border:1px solid black !important;" disabled >
        <option value="">중분류 선택</option>
        ${
          v.subValue01.map((w,i,arr)=>{
            return `<option value='${v.subValue01[i]}'>${v.subValue02[i]}</option>`
          }).join('')
        }
        </select>
        `
      }).join('')

      actionArea += sort02
    }

    // NCS 박스
    if(/studyCenterFlex\/lectureNCS.php/.test(location.pathname)){
      let sort01 = `
      <select id='ncsCode01' name='ncsCode01' style="appearance:auto; height:34px; width:150px; border:1px solid black !important;">
      <option value="">NCS 대분류 전체</option>
      ` + contentsCategoryArr.map(v=>{
        return `
        <option value="${v.ncsCode01}">${v.ncsName01}</option>
        `
      }).join('') + `</select>
      <select id='ncsCode02' name='ncsCode02' style="appearance:auto; height:34px; width:150px; border:1px solid black !important;">
      <option value="">NCS 중분류 전체</option>
      <option value="">NCS 대분류를 선택해주세요</option>
      </select>`
      
      actionArea += sort01
      let sort02 = contentsCategoryArr.map(v=>{
        return `
        <select id='ncs${v.ncsCode01}' name='ncsCode02' class='${v.ncsCode01}' style="appearance:auto; display:none; height:34px; width:150px; border:1px solid black !important;" disabled >
        <option value="">NCS 중분류 전체</option>
        ${
          v.ncsCode02.map((w,i,arr)=>{
            return `<option value='${v.ncsCode02[i]}'>${v.ncsName02[i]}</option>`
          }).join('')
        }
        </select>
        `
      }).join('')

      actionArea += sort02
    }

    //대분류 중분류 박스 line end

    actionArea += '<input type="text" name="searchValue" placeholder="과정이름 입력"/>&nbsp;';
		actionArea += '<button type="button" onClick="searchActLecture()">검색하기</button></form>';
		actionArea += '</form>'
		actionArea += '&nbsp</div>';
	}

	var companys = subDomain;
	if(companys == ''){
		companys = 'kira';
	}
	if(companys == 'www'){
		companys = 'kira';
	}
	$.get(checkDateApi,{'companyID':companys},function(data){
        // console.log(data);
		var requestMent = '';
		var studyMent = '';
		var contentsMapping = '';
		if(data.totalCount != 0) {
			studyRequestStart = data.studyCenter[0].studyRequestStart;
			studyRequestEnd = data.studyCenter[0].studyRequestEnd;
			studyStart = data.studyCenter[0].studyStart;
			studyEnd = data.studyCenter[0].studyEnd;
			contentsMapping = data.studyCenter[0].contentsMapping;
			inputStudyType = data.studyCenter[0].inputStudyType;
			lectureDateSet = data.studyCenter[0].lectureDateSet;

			/*if(studyRequestStart != "" || studyStart !=""){
				requestMent = studyRequestStart+'&nbsp;~&nbsp;'+studyRequestEnd;
				studyMent = studyStart+'&nbsp;~&nbsp;'+studyEnd;
			}*/
			if(studyRequestStart == "1900-01-01" || studyRequestStart == "" ){
					requestMent = '상시 접수';
			} else {
				requestMent = studyRequestStart+'&nbsp;~&nbsp;'+studyRequestEnd;
			}
			if( studyStart == "1900-01-01" ||  studyStart == ""){
				if(subDomain ==''){
					studyMent = '상시 접수 (고객센터 1544-9335로 문의해주시기 바랍니다.)';
				}else {
					studyMent = '상시 접수';
				}
			} else {
				studyMent = studyStart+'&nbsp;~&nbsp;'+studyEnd;
			}
		}
		actionArea += '<div class="dateArea">';
		actionArea += '<ul>'


		if( data.studyCenter ){
			if(data.studyCenter[0].lectureDateSet == '1month'){
				studyMent = "신청일로부터 1개월";
			} else if (data.studyCenter[0].lectureDateSet == '1week') {
				studyMent = "신청일로부터 1주일";
			}
			actionArea += '<li><h1>교육신청기간 : </h1>'+requestMent+'</li>';
			actionArea += '<li><h1>교육진행기간 : </h1>'+studyMent+'</li>';
		}



		actionArea += '</div>';
		$('#contentsArea').before(actionArea);

    //과정검색 분류 이벤트관리
    if(/studyCenterFlex\/lecture.php/.test(location.pathname)){
      document.querySelector('#sort01').addEventListener('change',(e)=>{

        if(currSort01 != e.target.value){

          if(e.target.value != ''){

            document.querySelector(`#${e.target.value}`).disabled = false
            document.querySelector(`#${e.target.value}`).style.display = 'inline-block'

            if(currSort01 != ''){

              document.querySelector(`#${currSort01}`).disabled = true
              document.querySelector(`#${currSort01}`).style.display = 'none'  

            } else {

              document.querySelector(`#sort02`).disabled = true
              document.querySelector(`#sort02`).style.display = 'none'  

            }

          } else {

            document.querySelector(`#sort02`).disabled = false
            document.querySelector(`#sort02`).style.display = 'inline-block'  
            document.querySelector(`#${currSort01}`).disabled = true
            document.querySelector(`#${currSort01}`).style.display = 'none'  

          }

        }

      })

      document.querySelector('#sort01').addEventListener('click',(e)=>{
        currSort01 = e.target.value
      })
    }

    //과정검색 분류 이벤트관리 끝라인

    //NCS검색 분류 이벤트관리

    if(/studyCenterFlex\/lectureNCS.php/.test(location.pathname)){
      document.querySelector('#ncsCode01').addEventListener('change',(e)=>{

        let tv = 'ncs'+e.target.value
        if(currNcs01 != tv){

          if(tv != 'ncs'){

            document.querySelector(`#${tv}`).disabled = false
            document.querySelector(`#${tv}`).style.display = 'inline-block'

            if(currNcs01 != 'ncs'){

              document.querySelector(`#${currNcs01}`).disabled = true
              document.querySelector(`#${currNcs01}`).style.display = 'none'

            } else {

              document.querySelector(`#ncsCode02`).disabled = true
              document.querySelector(`#ncsCode02`).style.display = 'none'

            }

          } else {

            document.querySelector(`#ncsCode02`).disabled = false
            document.querySelector(`#ncsCode02`).style.display = 'inline-block'
            document.querySelector(`#${currNcs01}`).disabled = true
            document.querySelector(`#${currNcs01}`).style.display = 'none'

          }

        }

      })

      document.querySelector('#ncsCode01').addEventListener('click',(e)=>{
        currNcs01 = 'ncs'+e.target.value
      })
    }

	})
	.done(function(){
			var leftMenu = '';
			//leftMenu += '<li onclick="top.location.href=\'/lecture/intro_duty_education.php\'">법정의무교육 소개</li>';
			//leftMenu += '<li onclick="top.location.href=\'/lecture/intro_safety_education.php\'">산업안전보건교육 소개</li>';
		$.get(categoryApi,{'value01':'lectureCode','companyID':subDomain},function(data){

			$.each(data.category, function(){
				var conNum = Number(this.value01.slice(7))
				if (subDomain == 'steelnsteel') {
					leftMenu += '<li onclick="top.location.href=\'/studyCenter3/lecture.php?sort01='+this.value01+'\'">';
				} else {
					leftMenu += '<li onclick="top.location.href=\'/lecture/?sort01='+this.value01+'\'">';
				}
				leftMenu += this.value02+'과정';
				leftMenu += '</li>';
				if(this.value01 == sort01){
					$('#titleArea > h2 strong, #titleArea > h1').html(this.value02+'과정');
				}
				categoryName01[conNum] = this.value02;
				/*
				$.get(categoryApi,{'value01':this.value01},function(data){
					totalCnt = data.totalCount;
					var i = 0;
					for(i=0; i<totalCnt ; i++){
						var conNum02 = Number(data.category[i].value01.slice(7));
						categoryName02[conNum02] = data.category[i].value02;
					}
				})
				*/
				return categoryName02;
			})
			$('.menuArea > ul').html(leftMenu);
			return categoryName01;
		})
		.done(function(){
			var enabled = (subDomain=='ksa' || subDomain=='edumi')?'':'Y'; // ksa의 경우 NY에 상관없이 모두 노출
			if(subDomain != 'safety') {
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



	// 2018-04-25 김은성 로딩 프로그래스 추가 - 시작
	loadingAct();

  /*if(subDomain =='ksa'){
		mapping = 'enabled=Y';
  } else if(subDomain =='edumi'){
		mapping = 'enabled=N&enabled2=N&companyID='+subDomain;
	}else*/
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
			startTime = '2800-01-01'
		}
		var startYear = startTime.substr(0,4)
		var startMonth = startTime.substr(5,2)
		var startDay = startTime.substr(8,2)
		startTime = new Date(startMonth+'/'+startDay+'/'+startYear).getTime();

		var endTime = studyRequestEnd;
		if (endTime == null || endTime == ''){
			endTime = '1900-01-01'
		}
		//console.log(studyRequestStart);
		//console.log(studyRequestEnd);
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
				lists += '<a href="#"><button type="button" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>'

				if(startTime <= nowTime && endTime >= nowTime){

					/*if (loginUserIP == '211.108.232.23') {
						lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\'0\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						//lists += '<button type="button" onClick="inputStudyAct(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
					}*/

					if(inputStudyType == 'ord'){
						/*if(this.serviceType == '1'){
							lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						}else if(this.serviceType == '3'){ //비환급은 결제 후 수강등록
							lists += '<button type="button" onClick="top.location.href=\'pay.php?contentsCode='+this.contentsCode+'\'"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						}*/
						if (this.contentsMapping == 'Y') {
							lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.mpServiceType+'\')">' +
								'<img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						} else {
							lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')">' +
								'<img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						}

						//lists += '<button type="button" onClick="inputStudyAct(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';

					} else if (inputStudyType == 'app') {

					} else if (inputStudyType == 'pay' || inputStudyType == 'payApp') {
						//if (loginUserID == 'eungmin2') {
							
							lists += '<button type="button" onClick="lectureSubmitHrd(\''+this.contentsType+'\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+inputStudyType+'\')">' +
									'<img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
							
						//}						
					} 
					//else if (loginUserID == 'eungmin2') {

						//lists += '<button type="button" onClick="lectureSubmit(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
						//lists += '<button type="button" onClick="inputStudyAct(\'1\',\''+this.contentsCode+'\',\''+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'\',\''+this.price+'\',\''+studyStart+'\',\''+studyEnd+'\',\''+this.serviceType+'\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';

					//} else if (this.inputStudyType == 'payInput') {
						//lists += '<button type="button" onClick="top.location.href=\'pay.php?contentsCode='+this.contentsCode+'\'"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>';
					//} else {
					//	lists += '<button type="button" onClick="alert(\'고객센터 1544-9335로 문의해주시기 바랍니다.\\n감사합니다.\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>'
					//}


				}else{


					lists += '<button type="button" onClick="alert(\'고객센터 1544-9335로 문의해주시기 바랍니다.\\n감사합니다.\')"><img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />신청하기</button>'



				}

				//썸네일
				if(this.previewImage != null){
					lists += '<img src="'+imageURL+this.previewImage+'" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="'+this.contentsName.replace(/"/g,'&quot;').replace(/'/g,'&quot;')+'" />';
				}else{
					lists += '<img src="../images/lecture/img_noimage.png" onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')" alt="이미지준비중" />';
				}

				//과정명
				if(subDomain == 'boram') {
					lists += '<h3></h3>';
				} else {
					lists += '<h3>'+this.sort01Name+' > '+this.sort02Name+'</h3>'
				}
				lists += '<h1 onclick="viewAct('+this.seq+',\''+this.contentsCode+'\')">'+this.contentsName+'</h1>'
				lists += '<h2>총 <strong>'+this.chapter+'</strong>차시</h2>'; //&nbsp;/&nbsp;<strong>'+this.contentsTime+'</strong>시간</h2>'
				if(this.mobile == 'Y'){
					lists += '<h5>모바일 학습 가능</h5>'
                }
                if(this.sort01 == 'lecture12' || this.sort01 == 'lecture03'){
                  lists += '<br/><h2><strong class="red">교육비 : '+this.selfPrice+'원</strong></h2>';
                }
			})
		} else {
			lists += '<li class="noList">과정이 없습니다.</li>';
		}
		$('.lectureList').html(lists);
		pagerAct();

		// 2018-04-25 김은성 로딩 프로그래스 추가 - 종료
		loadingAct();
		pageMaxUp();
	})
}


//신청하기- 완료후 submitList() 실행 새로고침하도록 한다.
function lectureSubmit(types,contentsCode,contentsName,price,lectureStart,lectureEnd,serviceType){
	var url = window.location.href;
	var companyID = url.split('/');
	var companyID = companyID[2].split('.');
	var modalWrite = '';
	if(loginUserID == '') {
		if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?') == true) {
			if (pageMode == 'studyCenterPage') {
				top.location.href = 'login.php?page=lecture.php?sort01=lecture01'
			} else {
				top.location.href = '/member/login.php?page=lecture'
			}
		}
		return false;
	}
	var listAjax = $.get(loginApi,function(data){
		if(loginUserID != ''){
			var recipientName = data.userName;
			var recipientBirth = data.birth;
			var recipientMobile01 = data.mobile01;
			var recipientMobile02 = data.mobile02;
			var recipientMobile03 = data.mobile03;
			var recipientEmail01 = data.email01;
			var recipientEmail02 = data.email02;
			var addItem01 = data.department;
		} else {
			var recipientName = '';
			var recipientBirth = '';
			var recipientMobile01 = '';
			var recipientMobile02 = '';
			var recipientMobile03 = '';
			var recipientEmail01 = '';
			var recipientEmail02 = '';
			var addItem01 = '';
		}
		var today = new Date(data.nowTime);
		var dd = today.getDate();
		if(dd <= 9){ dd = '0'+dd }
		var mm = today.getMonth()+1; //January is 0!
		if(mm <= 9){ mm = '0'+mm }
		var yy = today.getFullYear();

		if (lectureDateSet == '1month') {
			today.setDate(today.getDate() + 29); //29일 더하여 setting
		} else if (lectureDateSet == '1week') {
			today.setDate(today.getDate() + 6); //6일 더하여 setting
		}
		var month = today.getMonth() + 1;
		if(month <= 9){ month = '0'+month }
		var day = today.getDate();
		if(day <= 9){ day = '0'+day }
		var year = today.getFullYear();

		var serviceTypeGubun = '';

		if (lectureDateSet == '1month' || lectureDateSet == '1week') {
			lectureStart = yy+'-'+mm+'-'+dd;
			lectureEnd = year+'-'+month+'-'+day;
		}

		modalWrite +='<form class="orderSubmit" id="orderSubmit" method="post" action="../lib/payment/payreq_crossplatform.php">';
		modalWrite +='<div id="modal">';
		modalWrite +='<div class="lectureSubmit" style="height:auto;">';
		modalWrite +='<h1>교육신청하기<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite +='<div>';
		modalWrite +='<div class="BBSList">';
		modalWrite +='<input type="hidden" name="serviceType" value="'+serviceType+'">'; // 서비스 구분 : 0-사업주개별, 1-사업주, 2-일반(비환급), 3-능력개발
		modalWrite +='<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		modalWrite +='<input type="hidden" name="educationPrice" value="'+price+'">';
		modalWrite +='<input type="hidden" name="lectureStart" value="'+lectureStart+'">';
		modalWrite +='<input type="hidden" name="lectureEnd" value="'+lectureEnd+'">';
		modalWrite +='<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value="'+contentsName+'"/>';
		modalWrite +='<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value="'+price+'"/>';
		modalWrite +='<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value="'+data.email01+'@'+data.email02+'"/>';
		modalWrite +='<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_BUYEREMAIL" value="SC0010"/>';
		modalWrite +='<input type="hidden" name="LGD_ENCODING" id="LGD_ENCODING" value="UTF-8"/>';
		modalWrite +='<input type="hidden" name="inputStudyType" id="inputStudyType" value="'+inputStudyType+'"/>';

		modalWrite +='<table><thead><tr>';
		modalWrite +='<th>과정명</th>';
		//modalWrite +='<th style="width:70px;">기간</th>';
		modalWrite +='<th style="width:70px;">구분</th>';
		//modalWrite +='<th style="width:70px;">교육비</th>';
		modalWrite +='</tr></thead><tbody>';
		modalWrite +='<td>'+contentsName+'</td>';
		//modalWrite +='<td>1개월</td>';
		if (serviceType == 1) {
			serviceTypeGubun = '환급';
		} else if (serviceType == 3) {
			serviceTypeGubun = '비환급';
		} else if (serviceType == 5) {
			serviceTypeGubun = '산업안전';
		}
		modalWrite +='<td>'+serviceTypeGubun+'</td>';
		//modalWrite +='<td>'+toPriceNum(price)+'</td>';
		modalWrite +='</tbody></table>';
		modalWrite +='</div>';
		modalWrite +='<div class="BBSWrite">';
		modalWrite +='<li>';
		modalWrite +='<h1>수강기간</h1>';
		// if(loginUserID == 'dhkang'){
		// } else {
		// 	modalWrite += lectureStart+' ~ '+lectureEnd;
		// }
		if(lectureDateSet == 'setDay'){
			modalWrite += `<input type="text" id="datePicker" onchange="setForm(this)" readonly>`+' ~ '+`<input type="text" value="${lectureEnd}" readonly>`;
		} else {
			modalWrite += `<input type="text" id="datePicker" onchange="setForm(this)" readonly>`+' ~ '+`<input type="text" readonly>`;
		}
		// modalWrite += lectureStart+' ~ '+lectureEnd;
		modalWrite +='</li>';
		modalWrite +='<li style="display:none;"><input type="hidden" name="companyID" class="name" value="'+companyID[0]+'"/></li>';
		modalWrite +='<li>';
		modalWrite +='<h1>신청자</h1>';
		modalWrite +='<input type="text" name="recipientName" class="name" maxlength="20" value="'+recipientName+'" />';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>생년월일</h1>';
		modalWrite +='<input type="text" name="recipientBirth" class="name" maxlength="6" value="'+recipientBirth+'" />&nbsp; <span>예시: 801002</span>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>휴대전화</h1>';
		modalWrite +='<select name="recipientMobile01" class="'+recipientMobile01+'">';
		if(loginUserID != ''){
			modalWrite += '<option value="'+recipientMobile01+'">'+recipientMobile01+'</option>';
		} else {
			modalWrite += '<option value="010" >010</option>';
		}
		modalWrite += '</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="recipientMobile02" maxlength="4" style="ime-mode:disabled;" value="'+recipientMobile02+'" />&nbsp;-&nbsp;<input class="tel" name="recipientMobile03" type="tel" maxlength="4" value="'+recipientMobile03+'"/>';
		modalWrite +='</li>';
		/*modalWrite +='<li>';
		modalWrite +='<h1>이메일</h1>';
		modalWrite +='<input class="name" name="recipientEmail01" type="text" maxlength="20" value="'+recipientEmail01+'"/>&nbsp;@&nbsp;<input type="text" name="recipientEmail02" id="emails" class="name" value="'+recipientEmail02+'"/>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>부서</h1>';
		modalWrite +='<input class="name" name="addItem01" type="text" value="'+addItem01+'" />';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>주민등록번호</h1>';
		modalWrite +='<input class="name" type="tel" name="RRN01" />&nbsp;-&nbsp;<input class="name" type="password" name="RRN02" />';
		modalWrite +='<div class="normalText" style="margin:10px 0;">';
		modalWrite +='신청하는 과정은 사업주지원훈련과정입니다. 근로자직업능력개발법 시행령 제52조의2(민감정보 및 고유식별정보의처리)에 의하여 주민번호 등을 처리할 수 있으며, 수집한 주민번호는 산업인력공단에 훈련 실시신고 후 바로 파기합니다.';
		modalWrite +='자세한 사업주지원훈련 정보는 <a href="/eduinfo" target="_blank">이곳을 클릭</a>하여 확인하실 수 있습니다. 반드시 신청 정보를 확인 후 신청하시기 바랍니다.';
		modalWrite +='</div>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>직책</h1>';
		modalWrite +='<input class="name" name="addItem02" type="text"  />';
		modalWrite +='</li>';*/
		modalWrite +='<div class="btnArea"><button type="button" onClick="orderReg()">신청하기</button></div>';
		modalWrite +='</div>';
		modalWrite +='</div>';
		modalWrite +='</form>';
		$('#footer').after(modalWrite);
		modalAlign();
		let setDatePicker = {
			dateFormat: 'yy-mm-dd',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			yearSuffix: '년',
			beforeShowDay: function(date){					
						
						if (subDomain === 'iic') {
							return [true];
						}

						// 화, 목 제외 선택 불가					
						return [
															
									(date.getDay() != 0
									&& date.getDay() != 1
									&& date.getDay() != 3
									&& date.getDay() != 5
									&& date.getDay() != 6)
								
						];
					
			}
		}

		if(lectureDateSet == 'setDay'){
			setDatePicker.minDate = lectureStart;
			setDatePicker.maxDate = new Date();
		} else {
      let setRange = new Date(lectureStart);
      setRange.setDate( setRange.getDate() - 7 );
			setDatePicker.minDate = setRange;
      setDatePicker.maxDate = studyRequestEnd
		}

		$('#datePicker').datepicker(setDatePicker);

		$('#datePicker').css('position','static');
		$('#datePicker, #datePicker + input').css('margin','0');
		$('#datePicker, #datePicker + input').css('padding','5px');
		$('#datePicker, #datePicker + input').css('height','20px');
		$('#datePicker, #datePicker + input').css('text-align','center');
		$('#datePicker, #datePicker + input').css('width','140px');
	
	})
	/*}else{
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
		modalWrite +='<li style="display:none;"><input type="hidden" name="companyID" class="name" value="'+companyID[0]+'"/></li>';
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
		modalWrite +='</li>';/*
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
		modalWrite +='<div class="btnArea"><button type="button" onClick="orderReg()">신청하기</button></div>';
		//modalWrite +='<li><h1></h1><div class="normalText">';
		//modalWrite +='수강시작일 <select name="dday"><option value="0">당일시작</option><option value="1">1일후</option><option value="2">2일후</option><option value="3">3일후</option></select>';
		//modalWrite +='</div></li>';
		modalWrite +='</div>';
		modalWrite +='</div>';
		modalWrite +='</form>';
		$('#footer').after(modalWrite);
		modalAlign();
		})
	}*/
}

function lectureSubmitHrd(types,contentsCode,contentsName,price,lectureStart,lectureEnd,inputStudyType){
	var url = window.location.href;
	var companyID = url.split('/');
	var companyID = companyID[2].split('.');
	var modalWrite = '';
	if(loginUserID == '') {
		if (confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?') == true) {
			if (pageMode == 'studyCenterPage') {
				top.location.href = 'login.php?page=lecture.php?sort01=lecture01'
			} else {
				top.location.href = '/member/login.php?page=lecture'
			}
		}
		return false;
	}
	var listAjax = $.get(loginApi,function(data){
		if(loginUserID != ''){
			var recipientName = data.userName;
			var recipientBirth = data.birth;
			var recipientMobile01 = data.mobile01;
			var recipientMobile02 = data.mobile02;
			var recipientMobile03 = data.mobile03;
			var recipientEmail01 = data.email01;
			var recipientEmail02 = data.email02;
			var addItem01 = data.department;
		} else {
			var recipientName = '';
			var recipientBirth = '';
			var recipientMobile01 = '';
			var recipientMobile02 = '';
			var recipientMobile03 = '';
			var recipientEmail01 = '';
			var recipientEmail02 = '';
			var addItem01 = '';
		}
		var today = new Date(data.nowTime);
		var dd = today.getDate();
		if(dd <= 9){ dd = '0'+dd }
		var mm = today.getMonth()+1; //January is 0!
		if(mm <= 9){ mm = '0'+mm }
		var yy = today.getFullYear();

		if (lectureDateSet == '1month') {
			today.setDate(today.getDate() + 29); //29일 더하여 setting
		} else if (lectureDateSet == '1week') {
			today.setDate(today.getDate() + 6); //6일 더하여 setting
		}
		var month = today.getMonth() + 1;
		if(month <= 9){ month = '0'+month }
		var day = today.getDate();
		if(day <= 9){ day = '0'+day }
		var year = today.getFullYear();

		var serviceTypeGubun = '';

		if (lectureDateSet == '1month' || lectureDateSet == '1week') {
			lectureStart = yy+'-'+mm+'-'+dd;
			lectureEnd = year+'-'+month+'-'+day;
		}

		modalWrite +='<form class="orderSubmitHRD" id="orderSubmitHRD" method="post" action="/payments/hrdPay.php">';
		modalWrite +='<div id="modal">';
		modalWrite +='<div class="lectureSubmit" style="height:auto;">';
		modalWrite +='<h1>교육신청하기<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite +='<div>';
		modalWrite +='<div class="BBSList">';
		modalWrite +='<input type="hidden" name="serviceType" value="'+types+'">'; // 서비스 구분 : 1사업주, 2내일배움카드, 3비환급
		modalWrite +='<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		modalWrite +='<input type="hidden" id="educationPrice" name="educationPrice" value="'+price+'">';
		modalWrite +='<input type="hidden" name="lectureStart" value="'+lectureStart+'">';
		modalWrite +='<input type="hidden" name="lectureEnd" value="'+lectureEnd+'">';
		//modalWrite +='<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value="'+contentsName+'"/>';
		//modalWrite +='<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value="'+price+'"/>';
		//modalWrite +='<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value="'+data.email01+'@'+data.email02+'"/>';
		//modalWrite +='<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_BUYEREMAIL" value="SC0010"/>';
		//modalWrite +='<input type="hidden" name="LGD_ENCODING" id="LGD_ENCODING" value="UTF-8"/>';
		modalWrite +='<input type="hidden" name="inputStudyType" id="inputStudyType" value="'+inputStudyType+'"/>';

		modalWrite +='<table><thead><tr>';
		modalWrite +='<th>과정명</th>';
		//modalWrite +='<th style="width:70px;">기간</th>';
		modalWrite +='<th style="width:70px;">구분</th>';
		//modalWrite +='<th style="width:70px;">교육비</th>';
		modalWrite +='</tr></thead><tbody>';
		modalWrite +='<td>'+contentsName+'</td>';
		if (types == 1) {
			serviceTypeGubun = '환급';
		} else if (types == 2) {
			serviceTypeGubun = '내일배움카드';
		} else if (types == 3) {
			serviceTypeGubun = '비환급';
		}
		modalWrite +='<td>'+serviceTypeGubun+'</td>';
		modalWrite +='</tbody></table>';
		modalWrite +='</div>';
		modalWrite +='<div class="BBSWrite">';
		
		if (types == 2) {
			modalWrite +='<li>';
			modalWrite +='<h1>지원유형</h1>';
			modalWrite +='<select name="orderType" onchange="changeOrderPrice(\''+price+'\',this.value)">';
			modalWrite +='<option value="">선택</option>';
			modalWrite +='<option value="1">재직자 일반</option>';
			modalWrite +='<option value="2">국민취업제도I(취성패I)</option>';
			modalWrite +='<option value="3">국민취업제도II(취성패II)</option>';
			modalWrite +='</select>';
			modalWrite +='</li>';
		}
		/*modalWrite +='<li>';
		modalWrite +='<h1>수강기간</h1>';
		if(lectureDateSet == 'setDay'){
			modalWrite += `<input type="text" id="datePicker" onchange="setForm(this)" readonly>`+' ~ '+`<input type="text" value="${lectureEnd}" readonly>`;
		} else {
			modalWrite += `<input type="text" id="datePicker" onchange="setForm(this)" readonly>`+' ~ '+`<input type="text" readonly>`;
		}
		modalWrite +='</li>';*/
		modalWrite +='<li style="display:none;"><input type="hidden" name="companyID" class="name" value="'+companyID[0]+'"/></li>';
		modalWrite +='<li>';
		modalWrite +='<h1>신청자</h1>';
		modalWrite +='<input type="text" name="recipientName" class="name" maxlength="20" value="'+recipientName+'" readonly />';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>생년월일</h1>';
		modalWrite +='<input type="text" name="recipientBirth" class="name" maxlength="6" value="'+recipientBirth+'" readonly />&nbsp; <span>예시: 801002</span>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>휴대전화</h1>';
		modalWrite +='<select name="recipientMobile01" class="'+recipientMobile01+'">';
		if(loginUserID != ''){
			modalWrite += '<option value="'+recipientMobile01+'">'+recipientMobile01+'</option>';
		} else {
			modalWrite += '<option value="010" >010</option>';
		}
		modalWrite += '</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="recipientMobile02" maxlength="4" style="ime-mode:disabled;" value="'+recipientMobile02+'" readonly />&nbsp;-&nbsp;<input class="tel" name="recipientMobile03" type="tel" maxlength="4" value="'+recipientMobile03+'" readonly/>';
		modalWrite +='</li>';
		
		if (types == 2) {
			modalWrite +='<li>';
			modalWrite +='<h1>유의사항</h1>';
			modalWrite +='<div class="normalText" style="margin:10px 0;font-size: 12px;">';
			modalWrite +='- 국민내일배움카드 과정은 (모두의러닝)과 (HRD-Net) <br/>&nbsp;&nbsp;모두 신청해야 수강이 가능합니다.<br/>';
			modalWrite +='- 국민내일배움카드 과정에 교재는 무료로 제공됩니다.<br/>';
			modalWrite +='- 국민내일배움카드가 발급된 재직자에 한하여 수강이 가능합니다.';
			modalWrite +='</div>';
			modalWrite +='</li>';
		}

		modalWrite +='<li>';
		modalWrite +='<h1>교육비정가</h1>';
		modalWrite +='<div style="display: inline;" id="price">'+toPriceNum(price)+'원</div>';
		modalWrite +='</li>';

		modalWrite +='<li>';
		modalWrite +='<h1>정부지원금</h1>';
		modalWrite +='<div style="display: inline;" id="priceM"></div>';
		modalWrite +='</li>';

		modalWrite +='<li>';
		modalWrite +='<h1>실결제금액</h1>';
		modalWrite +='<div style="display: inline;" id="totalPrice"></div>';
		modalWrite +='</li>';

		//modalWrite +='<div class="btnArea"><button type="button" onClick="orderRegHRD(\''+types+'\')">신청하기</button></div>';
		modalWrite +='<div class="btnArea"><button type="submit" >신청하기</button></div>';
		modalWrite +='</div>';
		modalWrite +='</div>';
		modalWrite +='</form>';
		$('#footer').after(modalWrite);
		modalAlign();
		let setDatePicker = {
			dateFormat: 'yy-mm-dd',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			yearSuffix: '년',
			beforeShowDay: function(date){
					// 화, 목 제외 선택 불가
					return [
							(date.getDay() != 0
							&& date.getDay() != 1
							&& date.getDay() != 3
							&& date.getDay() != 5
							&& date.getDay() != 6)
					];
			}
		}

		if(lectureDateSet == 'setDay'){
			setDatePicker.minDate = lectureStart;
			setDatePicker.maxDate = new Date();
		} else {
      let setRange = new Date(lectureStart);
      setRange.setDate( setRange.getDate() - 7 );
			setDatePicker.minDate = setRange;
      setDatePicker.maxDate = studyRequestEnd
		}

		$('#datePicker').datepicker(setDatePicker);

		$('#datePicker').css('position','static');
		$('#datePicker, #datePicker + input').css('margin','0');
		$('#datePicker, #datePicker + input').css('padding','5px');
		$('#datePicker, #datePicker + input').css('height','20px');
		$('#datePicker, #datePicker + input').css('text-align','center');
		$('#datePicker, #datePicker + input').css('width','140px');
	
	})
	
}

function changeOrderPrice(price,val) {
	var priceM = 0;	//정부지원금
	var totalPrice = 0; //실제결제금액

	switch (val) {
		case '1':	//55% 
			priceM = (55 / 100) * price;
			priceM = priceM * 10 / 10;
			priceM = Number(priceM.toFixed(0));
			totalPrice = price - priceM;
			priceM = '-'+toPriceNum(priceM);
		break;

		case '2': //100%
			priceM = price;			
			totalPrice = price - priceM;			
			priceM = '-'+toPriceNum(priceM);
		break;

		case '3': //60%
			priceM = (60 / 100) * price;
			priceM = priceM * 10 / 10;			
			totalPrice = price - priceM;		
			priceM = Number(priceM.toFixed(0));
			priceM = '-'+toPriceNum(priceM);
		break;
	}
	
	$('#educationPrice').val(totalPrice);
	$('#priceM').html('<span style="color:green">'+priceM+'원</span>');
	$('#totalPrice').html('<span style="color:red;font-size: larger">'+toPriceNum(totalPrice)+'원</span>');
}

//신청하기- 완료후 submitList() 실행 새로고침하도록 한다.
function inputStudyAct(types,contentsCode,contentsName,price,lectureStart,lectureEnd,serviceType){
	var url = window.location.href;
	var companyID = url.split('/');
	var companyID = companyID[2].split('.');
	var modalWrite = '';
	/*if(loginUserID == ''){
		if(confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?') == true){
			if(pageMode == 'studyCenterPage'){
				top.location.href='login.php?page=lecture.php?sort01=lecture01'
			}else{
				top.location.href='/member/login.php?page=lecture'
			}
		}*/
	var listAjax = $.get(loginApi,function(data){
		if(loginUserID != ''){
			var recipientName = data.userName;
			var recipientBirth = data.birth;
			var recipientMobile01 = data.mobile01;
			var recipientMobile02 = data.mobile02;
			var recipientMobile03 = data.mobile03;
			var recipientEmail01 = data.email01;
			var recipientEmail02 = data.email02;
			var addItem01 = data.department;
		} else {
			var recipientName = '';
			var recipientBirth = '';
			var recipientMobile01 = '';
			var recipientMobile02 = '';
			var recipientMobile03 = '';
			var recipientEmail01 = '';
			var recipientEmail02 = '';
			var addItem01 = '';
		}
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
		modalWrite +='<div class="lectureSubmit" style="height:auto;">';
		modalWrite +='<h1>교육신청하기<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite +='<div>';
		modalWrite +='<div class="BBSList">';
		modalWrite +='<input type="hidden" name="serviceType" value="'+serviceType+'">'; // 서비스 구분 : 0-사업주개별, 1-사업주, 2-일반(비환급), 3-능력개발
		modalWrite +='<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
		modalWrite +='<input type="hidden" name="educationPrice" value="'+price+'">';
		modalWrite +='<input type="hidden" name="lectureStart" value="'+lectureStart+'">';
		modalWrite +='<input type="hidden" name="lectureEnd" value="'+lectureEnd+'">';
		modalWrite +='<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value="'+contentsName+'"/>';
		modalWrite +='<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value="'+price+'"/>';
		modalWrite +='<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value="'+data.email01+'@'+data.email02+'"/>';
		modalWrite +='<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_BUYEREMAIL" value="SC0010"/>';
		modalWrite +='<input type="hidden" name="LGD_ENCODING" id="LGD_ENCODING" value="UTF-8"/>';
		modalWrite +='<input type="hidden" name="inputStudyType" id="inputStudyType" value="'+inputStudyType+'"/>';

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
		modalWrite +='<li style="display:none;"><input type="hidden" name="companyID" class="name" value="'+companyID[0]+'"/></li>';
		modalWrite +='<li>';
		modalWrite +='<h1>신청자</h1>';
		modalWrite +='<input type="text" name="recipientName" class="name" maxlength="20" value="'+recipientName+'" />';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>생년월일</h1>';
		modalWrite +='<input type="text" name="recipientBirth" class="name" maxlength="6" value="'+recipientBirth+'" />&nbsp; <span>예시: 801002</span>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>휴대전화</h1>';
		modalWrite +='<select name="recipientMobile01" class="'+recipientMobile01+'">';
		if(loginUserID != ''){
			modalWrite += '<option value="'+recipientMobile01+'">'+recipientMobile01+'</option>';
		} else {
			modalWrite += '<option value="010" >010</option>';
			modalWrite += '<option value="011" >011</option>';
			modalWrite += '<option value="016" >016</option>';
			modalWrite += '<option value="017" >017</option>';
			modalWrite += '<option value="018" >018</option>';
			modalWrite += '<option value="019" >019</option>';
		}
		modalWrite += '</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="recipientMobile02" maxlength="4" style="ime-mode:disabled;" value="'+recipientMobile02+'" />&nbsp;-&nbsp;<input class="tel" name="recipientMobile03" type="tel" maxlength="4" value="'+recipientMobile03+'"/>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>이메일</h1>';
		modalWrite +='<input class="name" name="recipientEmail01" type="text" maxlength="20" value="'+recipientEmail01+'"/>&nbsp;@&nbsp;<input type="text" name="recipientEmail02" id="emails" class="name" value="'+recipientEmail02+'"/>';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>부서</h1>';
		modalWrite +='<input class="name" name="addItem01" type="text" value="'+addItem01+'" />';
		modalWrite +='</li>';
		modalWrite +='<li>';
		modalWrite +='<h1>주민등록번호</h1>';
		modalWrite +='<input class="name" type="tel" name="RRN01" />&nbsp;-&nbsp;<input class="name" type="password" name="RRN02" />';
		modalWrite +='<div class="normalText" style="margin:10px 0;">';
		modalWrite +='신청하는 과정은 사업주지원훈련과정입니다. 근로자직업능력개발법 시행령 제52조의2(민감정보 및 고유식별정보의처리)에 의하여 주민번호 등을 처리할 수 있으며, 수집한 주민번호는 산업인력공단에 훈련 실시신고 후 바로 파기합니다.';
		modalWrite +='자세한 사업주지원훈련 정보는 <a href="/eduinfo" target="_blank">이곳을 클릭</a>하여 확인하실 수 있습니다. 반드시 신청 정보를 확인 후 신청하시기 바랍니다.';
		modalWrite +='</div>';
		modalWrite +='</li>';
		/*modalWrite +='<li>';
		modalWrite +='<h1>직책</h1>';
		modalWrite +='<input class="name" name="addItem02" type="text"  />';
		modalWrite +='</li>';*/
		modalWrite +='<div class="btnArea"><button type="button" onClick="orderReg()">신청하기</button></div>';
		modalWrite +='</div>';
		modalWrite +='</div>';
		modalWrite +='</form>';
		$('#footer').after(modalWrite);
		modalAlign();
		})

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
				views += '<img src="'+imageURL+this.previewImage+'" alt="'+this.contentsName+'" style="margin-top:8px;" />';
			}else{
				views += '<img src="/images/lecture/img_noimage.png" alt="이미지 준비중입니다." style="margin-top:8px;" />'
			}
			if(subDomain == 'boram') {
				views += '<h5></h5>';
			} else {
				views += '<h5>'+this.sort01Name+' <img src="../images/global/icon_triangle.png" alt="화살표" /> '+this.sort02Name+'</h5>';
			}
			views += '<h1>'+this.contentsName+'</h1>';
			views += '<h2>총 <strong>'+this.chapter+'</strong>차시';// / <strong>'+this.contentsTime+'시간</strong></h2>';
			views += '<h3><strong>'+this.professor+'</strong> 강사</h3>';

			//SNS공유
			views += '<a href="javascript:sendSns(\'facebook\',\''+document.location.href+'\',\''+this.contentsName+'\');"><img src="../images/global/facebook.png" style="width:30px;"></a>';
			//views += '&nbsp;<a href="javascript:sendSns(\'twitter\',\''+document.location.href+'\',\''+this.contentsName+'\');"><img src="../images/global/twitter.png" style="width:30px;"></a>';
			views += '&nbsp;<a href="javascript:sendSns(\'band\',\''+document.location.href+'\',\''+this.contentsName+'\');"><img src="../images/global/naverband.png" style="width:30px;"></a>';
			views += '&nbsp;<a href="javascript:sendSns(\'naver\',\''+document.location.href+'\',\''+this.contentsName+'\');"><img src="../images/global/naver.jpg" style="width:30px;"></a>';
			views += '&nbsp;<a href="javascript:sendSns(\'kakaotalk\',\''+document.location.href+'\',\''+this.contentsName+'\');"><img src="../images/global/kakao.png" style="width:30px;"></a><br/>';

			views += '<button type="button">미리보기</button>'
			views += '<button type="button" class="listButton" onclick="listAct()">목록으로</button>'
			views += '</div>';


			//if (this.serviceType == 1){  // 환급 과정일때만 평가 항목 출력
				

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
			var introtxt = '';
			if(this.intro != '' && this.intro != null){
				views += '<h1>과정소개</h1>';
				views += '<div class="infoArea">';

				introtxt = this.intro.replace(/\n/g,'<br />');


				views += introtxt.replace("다만 이 교육과정은 모바일 학습이 인증되지 않습니다. 컴퓨터로 수강 하시기 바랍니다.","<font color='blue'><b>다만 이 교육과정은 모바일 학습이 인증되지 않습니다. 컴퓨터로 수강 하시기 바랍니다.</b></font>");

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
			views += '<button type="button" onclick="listAct(page)">목록으로</button>'
			views += '</div>';
		})
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('lectureDetail');
		$('#contentsArea').html(views);
		$('#titleArea h3').css('display','none');


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
					reviewWrite += '<h1>수강후기<button type="button" onclick="openReview(\''+data.board[0].addItem01+'\');">후기 더 보기+</button></h1>';
					reviewWrite += '<div class="reviewArea">';
					reviewWrite += '<ul>'
					$.each(data.board, function(){
						reviewWrite += '<li>';
						reviewWrite += '<div>';
						reviewWrite += '<h3 class="scroe'+this.addItem02+'">[ <strong>'+this.addItem02+'</strong>/5점 ]</h3>';
						reviewWrite += '<h1>'+this.userName.substr(0,this.userName.length-2)+'**('+this.userID.substr(0,this.userID.length-6)+'*****)</h1>';
						reviewWrite += '<h2>Date : '+this.inputDate+' | IP : '+this.userIP.substr(0,this.userIP.length-7)+'******</h2>';
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
	var checkFalse = 0;

	/*if($('input[name="RRN01"]').val() == '' || $('input[name="RRN02"]').val() == ''){
		alert('주민등록번호를 입력해 주세요.');
		return;
	}
	if($('input[name="RRN01"]').val().length != 6 || $('input[name="RRN02"]').val().length != 7){
		alert('주민등록번호를 다시 입력해 주세요.');
		return;
	}
	if($('input[name="recipientName"]').val() == ''){
		$('input[name="recipientName"]').after('&nbsp;&nbsp;<strong class="red">이름을 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientBirth"]').val() == ''){
		$('span').after('&nbsp;&nbsp;<strong class="red">생년월일을 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientMobile02"]').val() == '' || $('input[name="recipientMobile03"]').val() == '' ){
		$('input[name="recipientMobile03"]').after('&nbsp;&nbsp;<strong class="red">휴대폰 번호를 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientEmail01"]').val() == '' || $('input[name="recipientEmail02"]').val() == '' ){
		$('input[name="recipientEmail02"]').after('&nbsp;&nbsp;<strong class="red">이메일을 모두 입력해주세요.</strong>')
		checkFalse ++;
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
    if(parseInt(check) != parseInt(RRN.charAt(12))) {
        alert("주민등록번호가 정확하지 않습니다. 다시 입력해 주세요.");
        RRN01.value = "";
        RRN02.value = "";
        RRN01.focus();
        return false;
     }*/

	if(checkFalse == 0){
		orderApprove();
    }
/*
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
		})*/
}


function orderRegHRD(types){   
	var sendSerial = $('form.orderSubmitHrd').serialize();
	var checkFalse = 0;
	
	if (types == 2) {
		if($('select[name="orderType"]').val() == ''){
			alert('지원유형을 선택해 주세요.');
			return;
		}
	}
	if($('#datePicker').val() == ''){
		alert('수강기간을 선택 해주세요.');
		return;
	}
	console.log(sendSerial);
	$('.orderSubmitHrd').submit();
	//orderApprove();

	/*if($('input[name="RRN01"]').val() == '' || $('input[name="RRN02"]').val() == ''){
		alert('주민등록번호를 입력해 주세요.');
		return;
	}
	if($('input[name="RRN01"]').val().length != 6 || $('input[name="RRN02"]').val().length != 7){
		alert('주민등록번호를 다시 입력해 주세요.');
		return;
	}
	if($('input[name="recipientName"]').val() == ''){
		$('input[name="recipientName"]').after('&nbsp;&nbsp;<strong class="red">이름을 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientBirth"]').val() == ''){
		$('span').after('&nbsp;&nbsp;<strong class="red">생년월일을 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientMobile02"]').val() == '' || $('input[name="recipientMobile03"]').val() == '' ){
		$('input[name="recipientMobile03"]').after('&nbsp;&nbsp;<strong class="red">휴대폰 번호를 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="recipientEmail01"]').val() == '' || $('input[name="recipientEmail02"]').val() == '' ){
		$('input[name="recipientEmail02"]').after('&nbsp;&nbsp;<strong class="red">이메일을 모두 입력해주세요.</strong>')
		checkFalse ++;
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
    if(parseInt(check) != parseInt(RRN.charAt(12))) {
        alert("주민등록번호가 정확하지 않습니다. 다시 입력해 주세요.");
        RRN01.value = "";
        RRN02.value = "";
        RRN01.focus();
        return false;
     }

	if(checkFalse == 0){
		orderApprove();
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
		})*/
}

function orderApprove(){
	var sendSerial = $('form.orderSubmit').serialize();
	$.ajax({
			url: orderApi,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				if(data == 'duplication'){
					alert('이미 수강신청한 과정입니다. 내 강의실 - 수강신청내역을 확인해 주십시오.');
				} else {
					if (inputStudyType == 'ord') {
						if (data == 'overlap') {
							alert('이미 수강중인 동일한 과정이 있습니다. 확인 부탁 드립니다.');
						} else {
							alert('입과 되었습니다. 내 강의실에서 수강을 진행 해 주세요.');
						}
					} else if (inputStudyType == 'app') {
						alert('신청 되었습니다.\n신청한 과정은 내 강의실 - 수강신청내역에서 확인해 주십시오.\n관리자 승인 후 수강 해 주세요.');
					} /*else if (inputStudyType == 'pay' || inputStudyType == 'payApp') {
					
					}*/ else {
						alert('신청 되었습니다. 신청한 과정은 내 강의실 - 수강신청내역에서 확인해 주십시오.');
					}
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

function setForm(obj){
	let startDate = new Date(obj.value), endDate
	let year, month, date

	// 수강기간 설정방식  (설정, 1달, 1주)
	if(lectureDateSet == '1month'){
		startDate.setDate(startDate.getDate()+29)
	} else if(lectureDateSet == '1week'){
		startDate.setDate(startDate.getDate()+6)
	}
	
	[year, month, date] = [startDate.getFullYear(), startDate.getMonth()+1 + '', startDate.getDate() + '']
	$('.BBSList > input[name="lectureStart"]').val(obj.value)

	// 수강기간 설정방식 1달 1주일 경우 자동으로 종료날 변경
	if( startDate != new Date(obj.value) + '' ){
		endDate = `${year}-${ month.padStart(2, '0') }-${ date.padStart(2, '0') }`
		$('#datePicker + input').val(endDate)	
		$('.BBSList > input[name="lectureEnd"]').val(endDate)
	}
	
}

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
	var today = new Date();

	actionArea += '<div class="search_box">';
	actionArea += '<form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<ul><li class="searchChangeArea">';
	actionArea += '<p>';
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" class="m_right10" checked="checked" onChange="searchTypeSelect(this.value)"/>';
	actionArea += '<label for="searchDate">기간검색</label><span class="bg_line"></span>';
	actionArea += '</p>';	

	actionArea += '<p>';	
	actionArea += '<input type="radio" id="searchCompany" name="selectSearch" value="searchCompany" class="m_right10" onChange="searchTypeSelect(this.value)"/>';	
	actionArea += '<label for="searchCompany" class="m_right10">사업주검색</label>';

	actionArea += '<div class="search_group1">';
	actionArea += '<select name="searchYear" class="width100 m_right10" onchange="searchStudy(\'lectureDay\')">';

	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}
	}

	actionArea += '</select>';
	actionArea += '<select name="searchMonth" class="width100 m_right10" onchange="searchStudy(\'lectureDay\')">';
	actionArea += '<option value="0" selected="selected">전체</option>';
	var h= ''; 
	var thisMonth = today.getMonth()+1; //January is 0!
	for(h = 1; h <= 12; h++){
		if(h != thisMonth){
			actionArea += '<option>'+h+'월</option>';
		}else{
			actionArea += '<option>'+h+'월</option>';
		}

	}
	actionArea += '</select>';
	actionArea += '</div>';
	actionArea += '</p></li>';
	
	actionArea += '<li>';
	actionArea += '<label for="search05" class="width50">지역</label>';
	actionArea += '<select name="country" class="width100 m_right10">'
	
	var code = '';

	if(memo == '충남'){
		code = '34';
	}else if(memo == "세종"){
		code = '29';
	}else if(memo == "대전"){
		code = '25';
	}else if(memo == "전남"){
		code = '36';
	}else if(memo == "강원"){
		code = '32';
	}else if(memo == "충북"){
		code = '33';
	}

	if(code != '33') {
		$.ajax({
			url : "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
			method : "GET",
			data : {
				consumer_key : 'ad3fdd30090b4c3794d8',
				consumer_secret : '0eb630f252114e48b433'
			},
			dataType : 'json',
			async:false,
			success: function(data){
				// console.log(data.result.accessToken);
				var accessToken = data.result.accessToken;
				$.ajax({
					url:"https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
					method:'GET',
					data : {
						accessToken : accessToken,
						cd : code
					},
					dataType: 'json',
					async:false,
					success: function(data){
						// console.log(data);
						// var count = data.result.length;
						actionArea += '<option value=""></option>';
						$.each(data.result,function(key, value){
							actionArea += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
							// console.log(value['addr_name']);
						})
					}
				})
			}

		})
	} else {
		//writes += optWrite['cbhyCountry'];
		actionArea += '<option value=""></option>';
		actionArea += '<option value="괴산군">괴산군</option>';
		actionArea += '<option value="단양군">단양군</option>';
		actionArea += '<option value="보은군">보은군</option>';
		actionArea += '<option value="영동군">영동군</option>';
		actionArea += '<option value="옥천군">옥천군</option>';
		actionArea += '<option value="음성군">음성군</option>';
		actionArea += '<option value="제천시">제천시</option>';
		actionArea += '<option value="증평군">증평군</option>';
		actionArea += '<option value="진천군">진천군</option>';
		actionArea += '<option value="청주시">청주시</option>';
		actionArea += '<option value="충주시">충주시</option>';
	}
	//$("select[name='country']").html(countryOpt);
	actionArea += '</select>&nbsp;'
	actionArea += '<label for="search05" class="width100">페이지수</label>';
	actionArea += '<select name="listCount" class="width120 m_right10" id="search05" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';
	if(loginUserLevel <= 8){
        if(loginUserLevel <= 4) {
        actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelCerti()">수료증다운로드</a></p>';
        actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelResult()">수료결과보고서</a></p>';
        }		
	}
	//actionArea += '<p class="btn_005 width120"><a href="javascript:excelAct()">엑셀 다운로드</a></p>';
	actionArea += '</li></ul>';
	actionArea += '<p class="btn_004 width180"><a href="javascript:searchAct()">검색하기</a></p>';
	actionArea += '</form></div>';
	$('.admin_tab').after(actionArea);
    contentsPrint();
    //ajaxAct();

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="admin_table">';
	contents += '<table cellpadding="0" cellspacing="0" width="100%" class="BBSList">';
	contents += '<colgroup>';
	contents += '<col width="5%"/>';
	contents += '<col width="12%"/>';
	contents += '<col width="24%"/>';
	contents += '<col width="5%"/>';
	contents += '<col width="10%"/>';
	contents += '<col width="5%"/>';
	contents += '<col width="7%"/>';
	contents += '<col width="18%"/>';
	contents += '</colgroup>';
	contents += '<thead><tr>';
	contents += '<th>번호<br>구분</th>';
	contents += '<th>ID<br>이름</th>';
	contents += '<th>과정명<br>수강기간</th>';
	contents += '<th>진도율</th>';
	contents += '<th>직책</th>';
	contents += '<th>지역</th>';
	contents += '<th>총점<br>수료여부</th>';
	contents += '<th>사업주<br>(현재 영업담당자와 다를 수 있음)</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="8">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>';

	//$('.admin_table > table').addClass('BBSList');
	$('.search_box').after(contents);
	//ajaxAct();
}


function excelCerti(){
    //수료증
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	searchValue += '&page='+page;
    window.open('certificate_kaoh.php?'+searchValue,"width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no");
}
function excelResult(){
    //수료결과보고서
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
    // top.location.href='resultDoc.php?'+searchValue;
    window.open('resultDoc.php?'+searchValue,"width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no");
}


function studyAct(){
	window.open('../admin/08_study_end.php?locaSel=0506');
}


function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var useApi3 = '../api/apiStudyAcademy_certificate.php'; // 학원연합회 수료증 출력 api
	var listAjax = $.get(useApi3,'page='+page+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
		totalCount = data.totalCount;
        //alert(totalCount)
        
        resultData=data.result;
		if(resultData =='logout'){
			location.reload();
		}
		var lists = '';
		var midStatus = '';
		var testStatus = '';
		var reportStatus = '';
		var totalScore = '';
		var testCopy = '';
		var reportCopy = '';
		var passOK = '';
		var serviceType = '';
		var j = totalCount;
		var testOverTime ='';
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.study,  function(){
				var today = new Date();
				var todayY = today.getFullYear();
				var todayM = new String(today.getMonth()+1);
				var todayD = new String(today.getDate());

				if(todayM.length == 1){
				  todayM = "0" + todayM;
				}
				if(todayD.length == 1){
				  todayD = "0" + todayD;
				}
				today = todayY+'-'+todayM+'-'+todayD;

				if(this.serviceType == '1') {
					serviceType = '사업주';
				} else if(this.serviceType == '3') {
					serviceType = '비환급';
				} else if(this.serviceType == '5') {
					serviceType = '비환급<br>(평가있음)';
				} else if(this.serviceType == '4'){
					serviceType = '산업안전';
				} else if(this.serviceType == '8' || this.serviceType =='7'){
                    if(this.serviceType == '7'){
                        serviceType = '이상에듀-수강연동';
                    }else{
                        serviceType = '안기원-수강연동';
                    } 
					
					if(this.rPrice == 0) {
						serviceType += '<br /><span style="color:red;">(비환급)</span>';
					} else {
						serviceType += '<br />(환급)';
					}
				} else {
					serviceType = '테스트';
				}

				if(this.memo == '퇴사') {
					lists += '<tr class="red">';			
				} else {
					lists += '<tr>';				
				}
				if(loginUserLevel <= 3){
					if (this.testStatus == "V" || this.testStatus == "Y" || this.testStatus == "C"){
						lists += '<td style="cursor:pointer;">'+j+'<br />'+serviceType+'</td>';
					}else {
						lists += '<td>'+j+'<br />'+serviceType+'</td>';
					}
				} else {
					lists += '<td>'+j+'<br />'+serviceType+'</td>';
				}
				lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.user.userID+'\')" style="cursor:pointer;">'+this.user.userID+'<br/>';
				lists += this.user.userName+'</td>';
				if(loginUserLevel == '8') {
					lists += '<td>'+this.contents.contentsName+'<br/>';
				} else {
					//if(loginUserID = 'eungmin2'){
						lists += '<td onClick="globalModalAct(\'studyInfo\',\'\',\''+this.contents.contentsCode+'\',\''+this.seq+'\',\''+this.lectureOpenSeq+'\')" style="cursor:pointer;">'+this.contents.contentsName+'<br/>';
					//} else {
					//	lists += '<td onClick="globalModalAct(\'contentsView\',\'\',\''+this.contents.contentsName+'\')" style="cursor:pointer;">'+this.contents.contentsName+'<br/>';
					//}
					//lists += '<td onClick="globalModalAct(\'contentsView\',\'\',\''+this.contents.contentsCode+'\')" style="cursor:pointer;">'+this.contents.contentsName+'<br/>';
				}
				if(loginUserLevel == 7) {
					if(this.serviceType != '4') {
						lists += this.lectureStart+' ~ '+this.lectureEnd+'<br />첨삭완료 : '+this.tutorDeadline+' 까지';
					}
				} else {
						var openChapter = this.openChapter;
						if(openChapter == null) {
							openChapter = '미등록';
						}
						if(this.serviceType == '8') {
							openChapter = '수강연동';
						} else if(this.serviceType == '3' || this.serviceType == '5'){
							openChapter = '비환급';
						}
						lists += this.lectureStart+' ~ '+this.lectureEnd+'<br />HRD 실시회차 : '+openChapter;
				}

				if(this.memo == '퇴사') {
					lists += '<br />퇴사자 : 퇴사로 인한 수강 중단';
				}
				lists += '</td>';
				lists += '<td onClick="globalModalAct(\'progressView\','+this.lectureOpenSeq+',\''+this.user.userID+'\')" style="cursor:pointer;">'+this.progress+'%</td>';

				if(this.midTutorTempSave == 'Y') {
					if(loginUserLevel == '7') {
						var midTutorTempSave = '(임시저장)';
					} else {
						var midTutorTempSave = '</strong><br />가채점 : '+this.tempMidScore;
					}
				} else {
					var midTutorTempSave = '';
				}
				lists += '<td>'+this.department+'</td>';
				lists += '<td>'+this.country+'</td>';
							
				if(loginUserLevel == 5 || loginUserLevel == 6 || loginUserLevel == 8){ //2018-01-23 강혜림 추가
					if(this.lectureEnd < today){
						lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
					}else{
						if(this.serviceType == '3'){
							lists += '<td>'+passOK+'</td>';
						}else{
							//lists += '<td>'+totalScore+testCopy+reportCopy+'</td>';
							lists += '<td>진행중</td>';
						}
					}
				}else{
					if(loginUserLevel < 4){
						lists += '<td><span onClick="globalModalAct(\'passOKView\','+this.lectureOpenSeq+',\''+this.user.userID+'\')" style="cursor:pointer;">'+totalScore+testCopy+reportCopy+'</span><br />'+passOK+'</td>';
					}else{
						lists += '<td>'+totalScore+testCopy+reportCopy+'<br />'+passOK+'</td>';
					}
				}				
				if(loginUserLevel < '5' && loginUserLevel != '4') {
					//lists += '<td>'+this.tutor.tutorName+'<br />'+this.marketer.marketerName+'</td>';
					lists += '<td>'+this.tutor.tutorName+'</td>';
				}
				lists += '<td onClick="globalModalAct(\'companyView\',\'\',\''+this.company.companyCode+'\'\)" style="cursor:pointer;">'+this.company.companyName;
				if (this.user.department) {
					lists += '<br />직책 : '+this.user.department;
				}
				lists += '</td>';
				lists += '</tr>';
				j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="12">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="12">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}

//검색관련
function searchTypeSelect(types, searchDayType){
	$('.search_box li.searchChangeArea select, .search_box li.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" class="width100 m_right10"  onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
		var today = new Date();
		var i= '';
		var thisYear = today.getFullYear();
		for(i= 2015; i <= thisYear; i++){
			if(i != thisYear){
				chageSearch += '<option>'+i+'년</option>';
			}else{
				chageSearch += '<option selected="selected">'+i+'년</option>';
			}

		}
		chageSearch += '</select>';
		chageSearch += '<select name="searchMonth" class="width100 m_right10"  onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
		var h= '';
		var thisMonth = today.getMonth()+1; //January is 0!
		for(h = 1; h <= 12; h++){
			if(h != thisMonth){
				chageSearch += '<option>'+h+'월</option>';
			}else{
				chageSearch += '<option selected="selected">'+h+'월</option>';
			}

		}
		chageSearch += '</select>';
	}else if(types == 'searchCompany'){
		chageSearch += '<input type="text" name="searchCompany" class="width180 m_right10" onkeyup="searchStudy(\'company\',this)">';
	}
	$('.search_box li.searchChangeArea').append(chageSearch)
	if(types == 'searchDate'){
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth()+1; //January is 0!
		if(thisMonth <= 9){
			thisMonth = '0'+thisMonth;
		}
		var checkDate = thisYear +'-'+thisMonth;
		searchStudy('lectureDay',checkDate,searchDayType)
	}
	//actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types,vals,searchDayType){
	if(searchDayType == '') {
		searchDayType = $('select[name="searchDayType"]').val();
	}
	if(types=='lectureDay'){
		$('select[name="lectureDay"], span.f_c_red, select[name="companyCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}
		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain, 'searchDayType':searchDayType},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" class="m_right10" onChange="searchStudy(\'printCompany\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
			}
			$('select[name="searchMonth"]').after(selectWrite)
		})
	}else if(types=='company'){
		$('select[name="companyCode"], span.f_c_red').remove();
		var searchName = vals.value
		if( searchName != ''&& searchName != ' ' ){
			$.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
				var selectWrite = ''
				if(data.totalCount !=0){
					$('select[name="companyCode"]').remove();
					selectWrite += '<select name="companyCode" class="m_right10" onChange="searchStudy(\'printDate\',this);searchAct()">';
					selectWrite += '<option value="">사업주를 선택하세요</option>'
					$.each(data.searchResult, function(){
						selectWrite += '<option value="'+this.searchCode+'">'+this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'</option>';
					})
					selectWrite += '</select>'
				}else{
					selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
				}
				$('input[name="searchCompany"]').after(selectWrite)

			})
		}else{
			$('.searchChangeArea select, span.f_c_red').remove();
		}
	}else if(types=='printCompany'){
		$('span.f_c_red, select[name="companyCode"],select[name="contentsCode"]').remove();
		var searchDate = vals.value
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				//selectWrite += '<select name="companyCode" class="m_right10" onChange="searchStudy(\'printContents\',this);searchAct()">';
				selectWrite += '<select name="companyCode" class="m_right10" onChange="searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'/'+searchDate+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}/*else if(types=='printContents'){
		$('span.f_c_red, select[name="autoContentsCode"]').remove();
		var companyCode = vals.value;
	
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="autoContentsCode" class="m_right10" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}*/else if(types=='printDate'){
		$('select[name="lectureDay"], span.f_c_red, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){				
				//selectWrite += '<select name="lectureDay" class="m_right10" onChange="searchStudy(\'printContents2\',this);searchAct()">';
				selectWrite += '<select name="lectureDay" class="m_right10" onChange="searchStudy(\'printContents2\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+companyCode+'/'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})	
	}/*else if(types=='printContents2'){
		$('span.f_c_red, select[name="autoContentsCode"]').remove();
		var searchDate = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDate':searchDate, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="autoContentsCode" class="m_right10" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<span class="f_c_red">검색결과가 없습니다.</span></option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}*/
}

function printPop(popseq){
	popupAddress = '../study/print.html?seq='+popseq;
	window.open(popupAddress,"결과보기","width=712, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","printPop")
}


function retaken(userID,seq,lectureOpenSeq,cotentsCode){
	if(confirm('콘텐츠코드: '+cotentsCode+' / 과정개설번호: '+lectureOpenSeq+' / 수강생ID: '+userID+' \n재응시를 요청하시겠습니까?')) {
		$.ajax({
			url:'../api/apiStudy.php',
			type:'POST',
			data:{'userID':userID,'seq':seq,'retaken':'Y'},
			dataType:"text",
			success:function(){
				alert('재응시 요청처리 되었습니다.');
				ajaxAct();
			},
			fail:function(){
				alert('변경실패.');
			}
		})
	}
}

function contentsPrint(){
	//alert('a');
	$.get(contentsApi,{'mode':'studyList'},function(data){
		var optWrite = '<option value="">과정을 선택해주세요</option>';
		$.each(data.contentSel, function(){
			optWrite += '<option value="'+this.contentsCode+'"';
			optWrite += '>'+this.contentsCode+' | '+this.contentsName+'</option>';
		})
		$('.search_box select[name="contentSel"]').html(optWrite);
	})
}

function retaken(userID,seq,lectureOpenSeq,cotentsCode,testType,testStatus,serviceType){
	if (testType == 'mid') {
		var testTxt = '중간평가';
		if ((testStatus != 'null' && testStatus != 'N' && serviceType != '9' && serviceType != '8') || (serviceType == '9' && testStatus != 'null' && testStatus != 'N') ) {					
			alert('최종평가를 먼저 재응시 처리 해야 합니다.');
			return false;
		}
	} else {
		var testTxt = '최종평가';
	}
	if(confirm('콘텐츠코드: '+cotentsCode+' / 과정개설번호: '+lectureOpenSeq+' / 수강생ID: '+userID+' \n '+testTxt+' 재응시를 요청하시겠습니까?')) {
		$.ajax({
			url:'../api/apiStudy.php',
			type:'POST',
			data:{'userID':userID,'seq':seq,'retaken':'Y','testType':testType},
			dataType:"text",
			success:function(){
				alert('재응시 요청처리 되었습니다.');
				ajaxAct();
			},
			fail:function(){
				alert('변경실패.');
			}
		})
	}
}

function ssoExcel(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	window.open('ssoExcel.php?'+searchValue);
	//top.location.href='ssoExcel.php?'+searchValue;
}

function reStudyReasonForm(userID, companyCode, contentsCode){
	var reStudy = '&userID='+userID+'&companyCode='+companyCode+'&contentsCode='+contentsCode;
	window.open('reStudyForm.php?'+reStudy);
}
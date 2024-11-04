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

	actionArea += '<li><p>';
	actionArea += '<label for="search01" class="width100">이름, ID</label>';
	actionArea += '<select name="searchType" class="idth120 m_right10">';
	actionArea += '<option value="searchUserName">수강생</option>';
	actionArea += '<option value="searchMarketer">영업담당자</option>';
	actionArea += '<option value="searchTutor">교강사</option>';
	actionArea += '</select>';
	actionArea += '<input type="text" id="search01" class="width120" name="searchValue">';
	actionArea += '<span class="bg_line"></span></p>';

    actionArea += '<p><label for="search02" class="width100">진도율</label>';
    actionArea += '<input type="text" id="search02" class="width65" name="progress01" /><span class="m_side10">% ~</span>';
	actionArea += '<input type="text" class="width65" name="progress02"><span class="m_side10">%</span>';
	actionArea += '<span class="bg_line"></span></p>';

    actionArea += '<p><label for="search03" class="width100">수료여부</label>';
	actionArea += '<select name="passOK" class="idth120" id="search03">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">수료</option>';
	actionArea += '<option value="N">미수료</option>';
    actionArea += '</select></p></li>';

	actionArea += '<li>';
	actionArea += '<label for="search04" class="width100">과정명</label>';
    actionArea += '<input type="text" name="contentsName" id="search04" class="width500">';
	actionArea += '</li>';
	actionArea += '<li>';
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
		if(loginUserLevel <= 3){
			actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelAct3()">엑셀 다운로드</a></p>';
			actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:ssoExcel()">수강연동</button>';
		}else{
			actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelAct()">엑셀 다운로드</a></p>';
		}
		
		if(loginUserLevel <= 6){
			actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelAct2()">진도현황 다운로드</a></p>';
        }
        if(loginUserLevel <= 4) {
        actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelCerti()">수료증다운로드</a></p>';
        actionArea += '<p class="btn_005 width120 m_right10"><a href="javascript:excelResult()">수료결과보고서</a></p>';
        }		
	}
	//actionArea += '<p class="btn_005 width120"><a href="javascript:excelAct()">엑셀 다운로드</a></p>';
	actionArea += '</li>';
	actionArea += '<li id="catificateAll">';
	actionArea += '</li>';
	actionArea += '</ul>';
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
	if(loginUserLevel < 5) {
		contents += '<col width="18%"/>';		
	}
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
	if(loginUserLevel < '5') {
		contents += '<th>삭제</th>';		
	}
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="8">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>';

	//$('.admin_table > table').addClass('BBSList');
	$('.search_box').after(contents);
	//ajaxAct();
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='progress.php?'+searchValue;
}

function excelAct2(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	//top.location.href='progressB.php?'+searchValue;
	window.open('progressB.php?'+searchValue);
}

function excelAct3(){
	//loadingAct();
	//alert('test');
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	//window.open('progress_admin.php?'+searchValue);
	window.open('progressSpeed.php?'+searchValue);
}

function excelCerti(){
    //수료증
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	if (loginUserID == 'sjhyAdmin2') {		
		searchValue += '&page='+page+'&listCount='+listCount;
		//window.open('certificate_test.php?'+searchValue,"width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no");
		window.open('certificateKaoh.php?'+searchValue,"width=800, height=300, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "_blank");
	} else {
		window.open('certificate.php?'+searchValue,"width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no");
	}
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
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
		totalCount = data.totalCount;
        //alert(totalCount)

		var catificateBtn = '';
		var catificateTotal = totalCount/300;
		
		if (loginUserID == 'sjhyAdmin2') {
			catificateBtn += '새로고침시 다운로드한 체크항목은 초기화 됩니다.<br/>';
			for (var i=1; i<=catificateTotal+1; i++) {
				catificateBtn += '<p class="btn_005 width120 m_right10" style="margin-bottom:5px;"><a href="javascript:certiAll('+i+')" id="sBtn'+i+'">수료증다운'+i+'</a></p>';
			}
		}
		$('#catificateAll').html(catificateBtn);			
        
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
				if(loginUserLevel < '5') {
					// lists += '<td>';
					// if ((this.midStatus == "V" || this.midStatus == "Y" || this.midStatus == "C") && this.serviceType != '3' && this.serviceType != '8'){						
					// 	lists += '<button type="button" onClick="retaken(\''+this.user.userID+'\',\''+this.seq+'\',\''+this.lectureOpenSeq+'\',\''+this.contents.contentsCode+'\',\'mid\',\''+this.testStatus+'\','+this.serviceType+')">중간</button>';
					// }
					// if ( (this.testStatus == "V" || this.testStatus == "Y" || this.testStatus == "C" ) && this.serviceType != '3' && this.serviceType != '8'){						
					// 	lists += '<br><button type="button" onClick="retaken(\''+this.user.userID+'\',\''+this.seq+'\',\''+this.lectureOpenSeq+'\',\''+this.contents.contentsCode+'\',\'test\')">최종</button>';
					// }
					// lists += '</td>';
					// if(this.serviceType == '1'){
					// 	lists += '<button type="button" onClick="reStudyReasonForm(\''+this.user.userID+'\',\''+this.company.companyCode+'\',\''+this.contents.contentsCode+'\')">사유서</button>';
					// }
					//lists += '<td><button type="button" onClick="deleteData(useApi,'+this.seq+')">삭제</button></td>';
					lists += '<td><p class="btn_005"><a href="javascript:deleteData(useApi,'+this.seq+')">삭제</a></p></td>';
					
				}
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
				selectWrite += '<select name="companyCode" class="m_right10" onChange="searchStudy(\'printContents\',this);searchAct()">';
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
	}else if(types=='printContents'){
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
	}else if(types=='printDate'){
		$('select[name="lectureDay"], span.f_c_red, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){				
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
	}else if(types=='printContents2'){
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
	}
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


function allDelete(){
	var delData = $('form.searchForm').serialize();
	if(confirm('전체삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: useApi,
			type:'DELETE',
			data:'allDelete=Y&'+delData,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				} else if(data == 'lectureDay error'){
					alert('수강기간을 선택해 주세요.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
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

function certiAll(pageNum) {
	$('#sBtn'+pageNum).css('background-color','#ffcc00');
	$('#sBtn'+pageNum).text('완료');
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	searchValue += '&page='+pageNum+'&listCount=300';
	window.open('certificate_test.php?'+searchValue,"width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no");
}
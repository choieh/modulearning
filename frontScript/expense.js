//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var useApi = '../api/apiExpenseStat.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
	//파일등록
	if(loginUserLevel <= 4){
		actionArea += '<div style="margin-bottom:20px;"><h2>파일로 업로드하기</h2>'
		actionArea += '<form class="fileUploadform" method="post" action="expense.php" enctype="multipart/form-data">';
		actionArea += '<ul>';
		//actionArea += '<li>';
		//actionArea += '<h1>등록샘플</h1>';
		//actionArea += '<button type="button" onclick="location.href=\'../attach/docs/수강등록.xlsx\'">양식 내려받기</button>&nbsp;';
		//actionArea += '<button type="button" onclick="location.href=\'../attach/docs/수강등록(샘플).xlsx\'">샘플보기</button>';
		//actionArea += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
		//actionArea += '</li>';
		actionArea += '<li>';
		actionArea += '<h1>파일등록</h1>';
		actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
		actionArea += '</li>';
		actionArea += '</ul>';
		actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		actionArea += '</form></div>';
	}
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
	actionArea += '(<input type="radio" name="searchDayType" id="searchDayTypeStart" value="start" checked="checked" onChange="searchTypeSelect(\'searchDate\', \'start\')" /><label for="searchDayTypeStart">시작일기준</label>&nbsp;&nbsp;&nbsp;/';
	actionArea += '<input type="radio" name="searchDayType" id="searchDayTypeEnd" value="end" onChange="searchTypeSelect(\'searchDate\', \'end\')" /><label for="searchDayTypeEnd">종료일기준 )</label>&nbsp;&nbsp;&nbsp;';
	if(loginUserLevel != '7') {
	    actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
	}

	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
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
	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
	actionArea += '<option value="0">전체</option>';
	var h= '';
	var thisMonth = today.getMonth()+1; //January is 0!
	for(h = 1; h <= 12; h++){
		if(h != thisMonth){
			actionArea += '<option>'+h+'월</option>';
		}else{
			actionArea += '<option selected="selected">'+h+'월</option>';
		}
	}
	actionArea += '</select>';

	actionArea += '</div>';
	actionArea += '<div>'
  actionArea += '<div style="margin-left:10px; display:inline-block;">';
  actionArea += '<span style="display:inline-block;">부서</span>';
  actionArea += '<input type="text" name="department" placeholder=""cant write me" readonly"/>';
  actionArea += '</div>';

  actionArea += '<span>영업자</span><input type="text" name="searchMarketer" />';
	actionArea += '<span>서비스구분</span>';
	actionArea += '<select name="serviceType">';
	actionArea += '<option value="1">환급만</option>';
	actionArea += '<option value="all">전체</option>';
	actionArea += '</select>';
	actionArea += '<button style="margin-left:10px;" type="button" onClick="searchAct()">검색하기</button>';
	actionArea += '<button style="margin-left:10px;" type="button" onClick="excelAct()" >엑셀 다운로드</button>';
	actionArea += '</div></form>';
	//actionArea += '<select name="searchMode"><option value="lectureDay">수강기간별 통계</option><option value="month">월별 통계</option></select>&nbsp;&nbsp;&nbsp;'

	actionArea += '</form></div>';

	$('#contents > h1').after(actionArea);
	$('#contents').removeAttr('class');
	$('#contents').addClass('BBSWrite');

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';
	/*contents += '<th style="width:40px;">번호</th>';
	contents += '<th style="width:110px;">교육기간</th>';
	contents += '<th style="width:110px;"> 회사명</th>';
	contents += '<th style="width:110px;">비용환급일</th>';
	contents += '<th style="width:100px;">특이사항</th>';
	contents += '<th style="width:54px;">담당자</th>';
	contents += '<th style="width:75px;">교육비</th>';
	contents += '<th style="width:75px;">수료금액</th>';
	contents += '<th style="width:75px;">미수료금액</th>';
	contents += '<th style="width:54px;">교육인원</th>';
	contents += '<th style="width:54px;">수료인원</th>';
	contents += '<th style="width:54px;">미수료인원</th>';
	contents += '<th style="width:50px;">수료율</th>';*/

	contents += '<th style="width:40px;">번호</th>';
	contents += '<th style="width:170px;">교육기간</th>';
	contents += '<th style="width:150px;">회사명</th>';
	contents += '<th style="width:250px;">과정명</th>';
	contents += '<th style="width:100px;">영업자명</th>';
	contents += '<th style="width:100px;">비용환급일</th>';
	contents += '<th>비고</th>';
	contents += '<th style="width:75px;">구분</th>';
	contents += '<th style="width:75px;">교육비</th>';
	contents += '<th style="width:75px;">수료금액</th>';
	contents += '<th style="width:75px;">환급액</th>';
	contents += '<th style="width:75px;">교육인원</th>';
	contents += '<th style="width:75px;">수료인원</th>';
	contents += '<th style="width:75px;">미수료인원</th>';
	contents += '<th style="width:75px;">수료율</th>';

	//if(loginUserLevel < 5){
	//  contents += '<th style="width:50px;">삭제</th>';
	//}
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="15">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>'
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
}

function ajaxAct(listPage,sortData){
	loadingAct();
	listPage = listPage ? listPage : page ;
	page = listPage;
	sortData = sortData ? sortData : '';
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var j = totalCount;
		if (totalCount != 0 && loginUserLevel <= userLevel){
			var priceTotal = 0;
			var passMoneyTotal = 0;
			var passNoMoneyTotal = 0;
			var totalPeopleTotal = 0;
			var passOkPeopleTotal = 0;
			var passNoPeopleTotal = 0;
			var percentTotal = 0;
			var serviceTypeName = '';
			$.each(data.expenseStat, function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td>'+this.companyName+'</td>';
				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td>'+this.marketerName+'</td>';
				lists += '<td>'+this.rPriceDate+'</td>';
				lists += '<td>'+this.note+'</td>';
				if(this.serviceType == 1) {
					serviceTypeName = '환급';
				} else if(this.serviceType == 3) {
					serviceTypeName = '비환급';
				} else if(this.serviceType == 5) {
					serviceTypeName = '비환급(평가)';
				} else if(this.serviceType == 8) {
					serviceTypeName = '수강연동';
				} else {
					serviceTypeName = '알수없음';
				}
				lists += '<td>'+serviceTypeName+'</td>';
				lists += '<td>'+toPriceNum(this.priceSum)+'</td>';
				lists += '<td>'+toPriceNum(this.passOkPrice)+'</td>';
				lists += '<td>'+toPriceNum(this.rPrice)+'</td>';
				lists += '<td>'+toPriceNum(this.totalPeople)+'</td>';
				lists += '<td>'+toPriceNum(this.passOkPeople)+'</td>';
                lists += '<td>'+toPriceNum(this.passNoPeople)+'</td>';
                lists += '<td>'+this.percent+'</td>';

				//if(loginUserLevel < '5'){
				//	lists += '<td><button type="button" onClick="companyDelete(\''+this.companyName+'\',\''+this.lectureStart+'\',\''+this.lectureEnd+'\')">삭제</button></td>';
				//}
				lists += '</tr>';
				j--;

				priceTotal        = parseInt(priceTotal) + parseInt(this.priceSum);
				if (this.studyEnd == 'Y') {
					passMoneyTotal    = parseInt(passMoneyTotal) + parseInt(this.passOkPrice);
					passOkPeopleTotal = parseInt(passOkPeopleTotal) + parseInt(this.passOkPeople);
					passNoPeopleTotal = parseInt(passNoPeopleTotal) + parseInt(this.passNoPeople);
					percentTotal      = parseInt(percentTotal) + parseInt(this.percent);
				}
				if (this.rPrice != '') {
					passNoMoneyTotal  = parseInt(passNoMoneyTotal) + parseInt(this.rPrice);
				}
				totalPeopleTotal  = parseInt(totalPeopleTotal) + parseInt(this.totalPeople);				
			})
			percentTotal = (passOkPeopleTotal/ totalPeopleTotal)*100;
			lists += '<tr>';
			lists += '<td colspan="8"><strong>총 계</strong></td>';
			lists += '<td><strong>'+toPriceNum(priceTotal)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(passMoneyTotal)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(passNoMoneyTotal)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalPeopleTotal)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(passOkPeopleTotal)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(passNoPeopleTotal)+'</strong></td>';
			lists += '<td><strong>'+Math.round(percentTotal)+'%</strong></td>';
			/*if(loginUserLevel < '5'){
				lists += '<td>';
				$.each(data.expenseStat[0].month, function(){
					lists += '<button type="button" onClick="monthDelete(\''+this.month+'\')">전체삭제</button>';
				})
				lists += '</td>';
			}*/
			lists += '</tr>';
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="14">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="14">검색 결과가 없습니다.</td></tr>'
		}

		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}

//검색관련
function searchTypeSelect(types, searchDayType){
	$('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
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
		chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
		chageSearch += '<option value="0">전체</option>';
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
		chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
	}
	$('.searchArea div.searchChangeArea').append(chageSearch)
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
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
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
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="searchMonth"]').after(selectWrite)
		})

	}else if(types=='company'){
		$('select[name="companyCode"], strong.noticeSearch').remove();
		var searchName = vals.value
		if( searchName != ''&& searchName != ' ' ){
			$.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
				var selectWrite = ''
				if(data.totalCount !=0){
					selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
					selectWrite += '<option value="">사업주를 선택하세요</option>'
					$.each(data.searchResult, function(){
						selectWrite += '<option value="'+this.searchCode+'">'+this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'</option>';
					})
					selectWrite += '</select>'
				}else{
					selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
				}
				$('input[name="searchCompany"]').after(selectWrite)

			})
		}else{
			$('.searchChangeArea select, strong.noticeSearch').remove();
		}
	}else if(types=='printCompany'){
		$('strong.noticeSearch, select[name="companyCode"]').remove();
		var searchDate = vals.value
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}else if(types=='printDate'){
		$('select[name="lectureDay"], strong.noticeSearch').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='expenseDown.php?'+searchValue;
}


function companyDelete(companyName,lectureStart,lectureEnd){
	if(confirm('해당 정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: useApi,
			type:'DELETE',
			data:'companyDelete=Y&companyName='+companyName+'&lectureStart='+lectureStart+'&lectureEnd='+lectureEnd,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

function monthDelete(month){
	if(confirm(month+'월의 정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: useApi,
			type:'DELETE',
			data:'monthDelete=Y&month='+month,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

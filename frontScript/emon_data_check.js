//보드 정보 선언
var useApi = '../api/apiEmonDataCheck.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var lists = '';
var getDate = '';

function listAct(page){
	//상단 액션 부분
	var actionArea = '';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
	actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
	var thisYear = today.getFullYear();
	if(lectureDay != '') {
		getDate = lectureDay.split('-');
		thisYear = getDate[0];
	}

	var i= '';
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
	if(lectureDay != '') {
		thisMonth = getDate[1];
	}

	for(h = 1; h <= 12; h++){
		if(h != thisMonth){
			actionArea += '<option>'+h+'월</option>';
		}else{
			actionArea += '<option selected="selected">'+h+'월</option>';
		}
	}
	actionArea += '</select>';
	actionArea += '</div>';

	actionArea += '<button type="submit" style="width:100%">검색</button>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:200px;">데이터 오류</th>';
	contents += '<th style="width:100px;">건수</th>';
	contents += '<th style="width:100px;">상세보기</th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="3">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
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

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	sortData = sortData+'&checkType=day8';
	var listAjax = $.get(useApi,sortData,function(data){
			lists = '';
			$.each(data.dataCheck, function(){
					lists = '';
					lists += '<tr>';
					lists += '<td>1일 진도 8차시 초과</td>';
					lists += '<td>'+this.day8+'</td>';
					lists += '<td>';
					if(this.day8 == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckDay8\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>종료일 이후 제출 - 진행단계평가</td>';
					lists += '<td>'+this.endMid+'</td>';
					lists += '<td>';
					if(this.endMid == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckEndMid\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>종료일 이후 제출 - 시험</td>';
					lists += '<td>'+this.endTest+'</td>';
					lists += '<td>';
					if(this.endTest == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckEndTest\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>종료일 이후 제출 - 과제</td>';
					lists += '<td>'+this.endReport+'</td>';
					lists += '<td>';
					if(this.endReport == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckEndReport\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>교.강사 첨삭IP와 평가제출IP가 동일한 경우</td>';
					lists += '<td>'+this.testIP+'</td>';
					lists += '<td>';
					if(this.testIP == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckTestIP\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>교.강사 첨삭IP와 진도IP가 동일한 경우</td>';
					lists += '<td>'+this.progressIP+'</td>';
					lists += '<td>';
					if(this.progressIP == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckProgressIP\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';

					lists += '<tr>';
					lists += '<td>총점 60점 미만이나 수료처리</td>';
					lists += '<td>'+this.passOK+'</td>';
					lists += '<td>';
					if(this.passOK == 0) {
						lists += '데이터 정상';
					} else {
						lists += '<button type="button" onClick="globalModalAct(\'dataCheckPassOK\',\'\',\''+sortData+'\')" style="cursor:pointer;">상세보기 (데이터확인)</button>';
					}
					lists += '</td>';
					lists += '</tr>';
			})
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}

//검색관련

function searchTypeSelect(types){
	$('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
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
		chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
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
		searchStudy('lectureDay',checkDate)
	}
}

function searchStudy(types,vals){
	if(types=='lectureDay'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}
		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					if(this.lectureStart+'~'+this.lectureEnd == lectureDay) {
						selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'" selected="selected">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
					} else {
						selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
					}

				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="searchMonth"]').after(selectWrite)
			if(lectureDay != '') {
				searchStudy('printCompany',lectureDay);
				if(companyCodeGet == '') {
					searchAct();
				}
			}
		})
	}else if(types=='company'){
		$('select[name="companyCode"], strong.noticeSearch').remove();
		var searchName = vals.value
		if( searchName != ''&& searchName != ' ' ){
			$.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
				var selectWrite = ''
				if(data.totalCount !=0){
					$('select[name="companyCode"]').remove();
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
		var searchDate = vals.value;

		if(lectureDay != '') {
			searchDate = vals;
		}

		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					if(this.companyCode == companyCodeGet) {
						selectWrite += '<option value="'+this.companyCode+'" selected="selected">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
					} else {
						selectWrite += '<option value="'+this.companyCode+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
					}
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite);
			if(companyCodeGet != '') {
				searchAct();
			}
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
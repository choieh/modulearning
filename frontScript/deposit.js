//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var useApi = '../api/apiDeposit.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//데이트 피커사용용
function dateAct(){
	function closePicker(){
		$('#datePicker').remove();
		$('.picked').removeClass('picked');		
	}
	function todaySel(){
		$('#datePicker').remove();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		today = yy+'-' + mm+'-'+dd;
		$('.picked').val(today);
		$('.picked').removeClass('picked');
	}
	$('#datePicker').append('<p><button type="button" class="todaySel">오늘선택</button>&nbsp;&nbsp;<button type="button" class="pickerClose">닫기</button></p>')
	$('.pickerClose').click(function(){closePicker()})
	$('.todaySel').click(function(){todaySel()})
	$('#calendarTable').children('tbody').children('tr').children('td').click(function(){
		var dateSel = $(this).attr('id');
		$('.picked').val(dateSel);
		closePicker();
	})
};


//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
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
	for(i= 2016; i <= thisYear; i++){
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
	actionArea += '<div>';
	/*
	actionArea += '<span>입금요청</span>';
	actionArea += '<select name="depositRequest">';
	actionArea += '<option value="">전체</option>';
	actionArea += '<option value="N">미요청</option>';
	actionArea += '<option value="Y">요청</option>';
	actionArea += '</select>';
	*/
	actionArea += '<span>입금여부</span>';
	actionArea += '<select name="deposit">';
	actionArea += '<option value="">전체</option>';
	actionArea += '<option value="N">미입금</option>';
	actionArea += '<option value="Y">입금</option>';
	actionArea += '</select>';
	actionArea += '<span>발행여부</span>';
	actionArea += '<select name="publish">';
	actionArea += '<option value="">전체</option>';
	actionArea += '<option value="00">미발행</option>';
	actionArea += '<option value="01">영수</option>';
	actionArea += '<option value="02">청구</option>';
	actionArea += '</select>';
	actionArea += '&nbsp;&nbsp;<button type="submit" style="width:100px;">검색하기</button></form>';
	actionArea += '<button style="margin-left:10px;" type="button" onClick="excelAct()" >홈택스 전자계산서 다운로드</button>';
	//actionArea += '<button style="margin-left:10px;" type="button" onClick="excelAct2()" >국민은행 다건이체</button>';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '<span>일괄처리</span>';
	actionArea += '<button type="button" onClick="excelAct()" >파일 다운로드</button>';
	actionArea += '<form action="./depositUpload.php" method="post" enctype="multipart/form-data" style="display: inline;">';
	actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>';
	actionArea += '</form>';
	actionArea += '</div>';
	actionArea += '<div>';
	actionArea += '※ 홈택스의 경우 건수(100건)에 따라 일반 / 대량 양식으로 자동 다운로드 됩니다.<br />';
	actionArea += '※ 홈택스 다운로드 시 미발행인 데이터만 출력 됩니다. 미입금 또는 영수,청구인 데이터는 출력되지 않습니다.<br />';
	actionArea += '</div>';
	actionArea += '</div>';

	$('#contents > h1').after(actionArea);
	$('#contents').removeAttr('class');
	$('#contents').addClass('BBSWrite');

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:40px;">번호</th>';
	contents += '<th style="width:200px;">교육기간</th>';
	contents += '<th style="width:200px;">회사명</th>';
	contents += '<th style="width:200px;">과정명</th>';
	contents += '<th style="width:100px;">교육비</th>';
	contents += '<th style="width:100px;">환급액(수료금액)</th>';
	contents += '<th style="width:100px;">납입안내서</th>';
	contents += '<th style="width:120px;">안내서발송일</th>';
	contents += '<th style="width:100px;">입금여부</th>';
	contents += '<th style="width:120px;">입금일</th>';
	contents += '<th style="width:100px;">발행여부</th>';
	contents += '<th >비고</th>';
	contents += '<th style="width:60px;">반영</th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="15">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '<input type="hidden" name="totalCount" value="">';
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
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(jsonData){
		totalCount = jsonData.totalCount;
		var deposit = '';
		var depositYN = '';
		var depositDate = '';
		var depositMoney = '';
		var depositRequest = '';
		var depositRequestDate = '';
		var depositRequestID = '';
		var memo = '';
		var publish = '';

		var lists = '';
		var j = totalCount;
		$('input[name="totalCount"]').val(totalCount);
		if (totalCount != 0 && loginUserLevel <= userLevel){
			//toPriceNum(this.priceSum)
			$.each(jsonData.data, function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td onClick="globalModalAct(\'companyView\',\'\','+this.companyCode+')" style="cursor:pointer;">'+this.companyName+'</td>';
				//lists += '<td>'+this.contentsName+'<br />'+this.contentsCode+'</td>';
				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td>'+toPriceNum(this.price)+'</td>';
				lists += '<td>'+this.rPrice+'</td>';
				if(this.depositLimitDate == null) {
					depositLimitDate = '';
				} else {
					depositLimitDate = this.depositLimitDate;
				}
				if(this.depositDate == null) {
					depositDate = '';
				} else {
					depositDate = this.depositDate;
				}
				if(this.depositMoney == null) {
					depositMoney = '';
				} else {
					depositMoney = this.depositMoney;
				}
				if(this.depositRequestDate == null) {
					depositRequestDate = '';
				} else {
					depositRequestDate = this.depositRequestDate;
				}
				if(this.depositRequestID == null) {
					depositRequestID = '';
				} else {
					depositRequestID = this.depositRequestID;
				}
				if(this.memo == null) {
					memo = '';
				} else {
					memo = this.memo;
				}
				/*
				if(this.deposit == 'Y') {
					deposit = '<span style="color:#0000ff; font-weight: bold; cursor:pointer; text-decoration: underline;">입금</span>';
				} else {
					deposit = '<span style="color:#ff0000; font-weight: bold; cursor:pointer; text-decoration: underline;">미입금</span>';
				}
				*/
				if(this.depositRequest == 'Y') {
					depositRequest = '<span style="color:#0000ff; font-weight: bold; cursor:pointer;">입금필요(요청)</span>';
				} else {
					depositRequest = '<span style="color:#ff0000; font-weight: bold; cursor:pointer;">미요청</span>';
				}
				if(this.depositLimitDate != null) {
					depositLimit = '<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="depositLimit">발송</span>';
					depositLimitYN = 'Y';
				} else {
					depositLimit = '<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="depositLimit">미발송</span>';
					depositLimitYN = 'N';
				}
				if(this.depositDate != null) {
					deposit = '<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="deposit">입금</span>';
					depositYN = 'Y';
				} else {
					deposit = '<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="deposit">미입금</span>';
					depositYN = 'N';
				}
				if(this.publish == '01') {
					publish = '<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="publish">영수</span>';
				} else if(this.publish == '02') {
					publish = '<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="publish">청구</span>';
				} else {
					publish = '<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="publish">미발행</span>';
				}

/*
				lists += '<td>';
				lists += '<input type="radio" id="depositY_'+j+'" name="deposit_'+j+'" value="Y">';
				lists += '<label for="depositY_'+j+'">Y</label>';
				lists += '<input type="radio" id="depositN_'+j+'" name="deposit_'+j+'" value="N">';
				lists += '<label for="depositN_'+j+'">N</label></td>';
*/

				lists += '<td class="menuPopup" onClick="statUpdate(\'depositLimit\',\''+this.lectureStart+'\',\''+this.lectureEnd+'\',\''+this.contentsCode+'\',\''+this.companyCode+'\',\''+j+'\');">';
				lists += '<span class="depositLimit_'+j+'">'+depositLimit+'</span>';
				lists += '<p class="arrow_box">클릭하여 상태를 변경합니다..<br />오른쪽의 발송일을 반드시 입력해야 합니다.</p>';
				lists += '<input type="hidden" name="depositLimit_'+j+'" value="'+depositLimitYN+'">';
				lists += '</td>';
				lists += '<td>';
				lists += '<div class="datePicker" style="cursor:point;">';
				lists += '<input type="text" name="depositLimitDate_'+j+'" class="cal" value="'+depositLimitDate+'" readonly="readonly" />';
				lists += '</div>';
				lists += '</td>';
				lists += '<td class="menuPopup" onClick="statUpdate(\'deposit\',\''+this.lectureStart+'\',\''+this.lectureEnd+'\',\''+this.contentsCode+'\',\''+this.companyCode+'\',\''+j+'\');">';
				lists += '<span class="deposit_'+j+'">'+deposit+'</span>';
				lists += '<p class="arrow_box">클릭하여 상태를 변경합니다.<br />오른쪽의 입금일을 반드시 입력해야 합니다.</p>';
				lists += '<input type="hidden" name="deposit_'+j+'" value="'+depositYN+'">';
				lists += '</td>';
				lists += '<td>';
				lists += '<div class="datePicker" style="cursor:pointer;">';
				lists += '<input type="text" name="depositDate_'+j+'" class="cal" value="'+depositDate+'" readonly="readonly" />';
				lists += '</div>';
				lists += '</td>';
				lists += '<td class="menuPopup" onClick="statUpdate(\'publish\',\''+this.lectureStart+'\',\''+this.lectureEnd+'\',\''+this.contentsCode+'\',\''+this.companyCode+'\',\''+j+'\');">';
				lists += '<span class="publish_'+j+'">'+publish+'</span>';
				lists += '<p class="arrow_box">클릭하여 상태를 변경합니다.<br />미발행, 영수, 청구순으로 변경됩니다.</p>';
				if(this.publish == null) {
					var publishValue = '00';
				} else {
					var publishValue = this.publish;
				}
				lists += '<input type="hidden" name="publish_'+j+'" value="'+publishValue+'">';
				lists += '</td>';
				lists += '<td><textarea class="memo_'+j+'" style="width:260px; height:40px;">'+memo+'</textarea></td>';
				lists += '<td><button type="button" onclick="statUpdate(\'memo\',\''+this.lectureStart+'\',\''+this.lectureEnd+'\',\''+this.contentsCode+'\',\''+this.companyCode+'\',\''+j+'\');">저장</button></td>';
				lists += '</tr>';
				j--;
			});

		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="14">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="14">검색 결과가 없습니다.</td></tr>'
		}

		$('.BBSList tbody').html(lists);
		pickerAct();
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
	if($('input[name="totalCount"]').val() > 100) {
		top.location.href='excel_elecA.php?'+searchValue;
	} else {
		window.open('excel_elecA.php?'+searchValue);
		//top.location.href='excel_elecA.php?'+searchValue;
	}
}

function excelAct2(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='excel_bank.php?'+searchValue;
}

function companyDelete(companyName,lectureStart,lectureEnd){
	if(confirm('해당 정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: useApi,
			type:'DELETE',
			data:'companyDelete=Y&companyName='+companyName+'&lectureStart='+lectureStart+'&lectureEnd='+lectureEnd,
			dataType:'json',
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

function statUpdate(type,lectureStart,lectureEnd,contentsCode,companyCode,num){
	var value = '';
	var value2 = '';
	if(type == 'deposit') {
		value = $('input[name="deposit_'+num+'"]').val();
		value2 = $('input[name="depositDate_'+num+'"]').val();
		if(value2 == '') {
			alert('입금일을 입력해야 반영됩니다.');
			return false;
		}

	} else if(type == 'depositLimit') {
		value = $('input[name="depositLimit_'+num+'"]').val();
		value2 = $('input[name="depositLimitDate_'+num+'"]').val();
		if(value2 == '') {
			alert('발송일을 입력해야 반영됩니다.');
			return false;
		}

	} else if (type == 'publish'){
		value = $('input[name="publish_'+num+'"]').val();

	} else if (type == 'memo') {
		value = $('.memo_'+num).val();

	}

	$.ajax({
		url: useApi,
		type:'POST',
		data:'lectureStart='+lectureStart+'&lectureEnd='+lectureEnd+'&contentsCode='+contentsCode+'&companyCode='+companyCode+'&type='+type+'&value='+value+'&value2='+value2,
		dataType:'json',
		success:function(data){
			if(data.result != 'error') {

				if(type == 'deposit') { // 입금여부

					if(data.result == 'Y') {
						$('.deposit_'+num).html('<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="deposit">입금</span>');
						$('input[name="deposit_'+num+'"]').val('Y');

					} else if(data.result == 'N') {
						$('.deposit_'+num).html('<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="deposit">미입금</span>');
						$('input[name="deposit_'+num+'"]').val('N');
						$('input[name="depositDate_'+num+'"]').val('');

					}

				} else if (type == 'depositLimit') {

					if(data.result == 'Y') {
						$('.depositLimit_'+num).html('<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="depositLimit">발송</span>');
						$('input[name="depositLimit_'+num+'"]').val('Y');

					} else if(data.result == 'N') {
						$('.depositLimit_'+num).html('<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="depositLimit">미발송</span>');
						$('input[name="depositLimit_'+num+'"]').val('N');
						$('input[name="depositLimitDate_'+num+'"]').val('');

					}

				} else if (type == 'publish') {

					if(data.result == '01') {
						$('.publish_'+num).html('<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="publish">영수</span>');
						$('input[name="publish_'+num+'"]').val('01');

					} else if(data.result == '02') {
						$('.publish_'+num).html('<span style="color:#0000ff; font-weight: bold; cursor:pointer;" class="publish">청구</span>');
						$('input[name="publish_'+num+'"]').val('02');

					} else {
						$('.publish_'+num).html('<span style="color:#ff0000; font-weight: bold; cursor:pointer;" class="publish">미발행</span>');
						$('input[name="publish_'+num+'"]').val('00');
					}

				} else if (type == 'memo') {
					alert('비고 내용이 저장 되었습니다.');
				}

			} else {
				alert('반영되지 않았습니다. 다시 시도하여 주시기 바랍니다.');
			}
		},
		fail:function(){
			alert('오류가 발생하였습니다.');
		}
	})
}
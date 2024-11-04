//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var sortData = '';
var useApi = '../api/apiMonitoringState.php';
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

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'

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
	actionArea += '<button style="margin:0 10px;" type="submit">검색</button>';
	actionArea += '<button type="button" onClick="excelAct()" >엑셀 다운로드</button></form> ';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:170px;">수강기간</th>';
	contents += '<th style="width:170px;">첨삭기간</th>';
	contents += '<th style="width:100px;">총 배정인원</th>';
	contents += '<th style="width:100px;">중간평가 응시인원</th>';
	contents += '<th style="width:100px;">최종평가 응시인원</th>';
	contents += '<th style="width:100px;">과제 제출인원</th>';
	contents += '<th style="width:100px;">중간평가 미채점인원</th>';
	contents += '<th style="width:100px;">최종평가 미채점인원</th>';
	contents += '<th style="width:100px;">과제 미채점인원</th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>'
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();
	
	//2017.01.25 주석처리 되어있던부분
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
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if (totalCount != 0 && loginUserLevel <= userLevel){
			j = totalCount;
			var totalStudy = 0;
			var totalMidStauts = 0;
			var totalTestStauts = 0;
			var totalReportStatus = 0;
			var totalMidCheck = 0;
			var totalTestCheck = 0;
			var totalReportCheck = 0;

			$.each(data.state,  function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td>'+this.tutorDeadline+'</td>';
				lists += '<td>'+this.totalStudy+'</td>';
				lists += '<td>'+this.totalMidStauts+'</td>';
				lists += '<td>'+this.totalTestStauts+'</td>';
				lists += '<td>'+this.totalReportStatus+'</td>';
				lists += '<td>'+this.totalMidCheck+'</td>';
				lists += '<td>'+this.totalTestCheck+'</td>';
				lists += '<td>'+this.totalReportCheck+'</td>';
				lists += '</tr>';
				
				j--;

				//총계
				totalStudy  = parseInt(totalStudy) + parseInt(this.totalStudy); //교육인원
				totalMidStauts  = parseInt(totalMidStauts) + parseInt(this.totalMidStauts); //중간평가 응시인원
				totalTestStauts  = parseInt(totalTestStauts) + parseInt(this.totalTestStauts); //최종평가 응시인원
				totalReportStatus  = parseInt(totalReportStatus) + parseInt(this.totalReportStatus); //과제 제출인원
				totalMidCheck  = parseInt(totalMidCheck) + parseInt(this.totalMidCheck); //중간평가 미채점인원
				totalTestCheck  = parseInt(totalTestCheck) + parseInt(this.totalTestCheck); //최종평가 미채점인원
				totalReportCheck  = parseInt(totalReportCheck) + parseInt(this.totalReportCheck); //과제미채점인원				
			})
			lists += '<tr>';
			lists += '<td colspan="3"><strong>총 계</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalStudy)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalMidStauts)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalTestStauts)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalReportStatus)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalMidCheck)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalTestCheck)+'</strong></td>';
			lists += '<td><strong>'+toPriceNum(totalReportCheck)+'</strong></td>';
			lists += '</tr>';

		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="13">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		//pagerAct();
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
	//actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
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
				selectWrite += '<select name="lectureDay" >';
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
	}
}


function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='monitoringState.php?'+searchValue;
}


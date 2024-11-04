//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var chainsearchApi = '../api/apiSearch.php';
var useApi = '../api/apiEmonLoginIP.php';

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var startDate = '';
	var endDate = '';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';	
	actionArea += '(<input type="radio" name="searchDayType" id="searchDayTypeStart" value="start" checked="checked" onChange="searchTypeSelect(\'searchDate\', \'start\')" /><label for="searchDayTypeStart">시작일기준</label>&nbsp;&nbsp;&nbsp;/';
	actionArea += '<input type="radio" name="searchDayType" id="searchDayTypeEnd" value="end" onChange="searchTypeSelect(\'searchDate\', \'end\')" /><label for="searchDayTypeEnd">종료일기준 )</label>&nbsp;&nbsp;&nbsp;';
	actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear+1; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}
	}
	actionArea += '</select>';
	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
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
	actionArea += '<div>';
    actionArea += '<select name="searchType">';
	actionArea += '<option value="userName">이름</option>';
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button>';
	actionArea += '</div>';
	actionArea += '<strong style="color:red">* 로그인 IP 상이 데이터는 재전송이 불가합니다.</strong>';
	actionArea += '</div>';	
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:30px;">번호</th>';
	contents += '<th style="width:120px;">중간평가 응시IP<br>로그인 IP</th>';
	contents += '<th style="width:120px;">최종평가 응시IP<br>로그인 IP</th>';
	contents += '<th style="width:120px;">과제 응시IP<br>로그인 IP</th>';
	contents += '<th style="width:100px;">수강기간</th>';
	contents += '<th style="width:200px;">과정코드<br>과정명</th>';
	contents += '<th style="width:70px;">수업코드</th>';
	contents += '<th style="width:100px;">회원PK<br>(아이디)</th>';
	contents += '<th style="width:60px;">회원이름</th>';
	contents += '<th style="width:150px;">소속기관</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="14">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	pickerAct();//데이트피커 사용
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	listCount = 30;
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		
		if(totalCount != 0){
			$.each(data.emon,  function(){
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				if(this.midLoginIP == this.midIP || this.midLoginIP == '미응시'){
					lists += '<td>'+this.midLoginIP+'<br>'+this.midIP+'</td>';
				}else{
					lists += '<td><strong style="color:red">'+this.midLoginIP+'</strong><br>'+this.midIP+'</td>';					
				}	
				
				if(this.testLoginIP == this.testIP || this.testLoginIP == '미응시'){
					lists += '<td>'+this.testLoginIP+'<br>'+this.testIP+'</td>';
				}else{
					lists += '<td><strong style="color:red">'+this.testLoginIP+'</strong><br>'+this.testIP+'</td>';					
				}

				if(this.reportLoginIP == this.reportIP || this.reportLoginIP == '미응시' || this.reportLoginIP == '과제없음'){
					lists += '<td>'+this.reportLoginIP+'<br>'+this.reportIP+'</td>';
				}else{
					lists += '<td><strong style="color:red">'+this.reportLoginIP+'</strong><br>'+this.reportIP+'</td>';					
				}				
				
				lists += '<td>'+this.lectureStart+' ~ '+this.lectureEnd+'</td>';
				lists += '<td>'+this.contentsCode+'<br>'+this.contentsName+'</td>';
				lists += '<td>'+this.contentsCode+','+this.lectureOpenSeq+'</td>';
				lists += '<td>'+this.userID+'</td>';
				lists += '<td>'+this.userName+'</td>';
				lists += '<td>'+this.companyName+'</td>';
				lists += '</tr>';
				i--;
			})
		}else{			
			lists += '<tr><td class="notResult" colspan="14">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
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
		$('strong.noticeSearch, select[name="companyCode"],select[name="contentsCode"]').remove();
		var searchDate = vals.value
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct()">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'/'+searchDate+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}else if(types=='printContents'){
		$('strong.noticeSearch, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
	
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="contentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}else if(types=='printDate'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){				
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+companyCode+'/'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})	
	}else if(types=='printContents2'){
		$('strong.noticeSearch, select[name="contentsCode"]').remove();
		var searchDate = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDate':searchDate, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="contentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}
}
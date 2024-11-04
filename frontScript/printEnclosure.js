//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기
//보드 정보 선언
var useApi = '../api/apiprintEnclosure.php';
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
	actionArea += '<h1>훈련위탁 계약서 별첨</h1>';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
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
		actionArea += '<option>'+h+'월</option>';
	}
    actionArea += '</select>';
	actionArea += '&nbsp;<button type="button" onClick="excelAct_2()" class="excel" style="margin-left:5px;">엑셀 다운로드</button>';
	actionArea += '</div>';
	actionArea += '</div>';

	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">'
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:30px;">번호</th>';
	contents += '<th style="width:50px;">수강기간</th>';
	contents += '<th style="width:50px;">수강회사명</th>';
	contents += '<th style="width:50px;">총 교육비</th>';
	contents += '<th style="width:50px;">교육비</th>';
	contents += '<th style="width:50px;">과정명</th>';
	contents += '<th style="width:50px;">수강인원<br>(환급/비환급/무료)</th>';
	contents += '<th style="width:50px;">사업자 등록번호</th>';
	contents += '<th style="width:50px;">교육담당자</th>';
	contents += '<th style="width:50px;">담당자 전화번호</th>';
	contents += '<th style="width:50px;">환급계좌</th>';
	contents += '<th style="width:50px;">훈련위탁계약서 별첨</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="12">검색 값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	contents += '</div>'
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
}

function ajaxAct(listPage,sortData){
	listPage = listPage ? listPage : page ;
	page = listPage;
	sortData = sortData ? sortData : '';
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = (page-1) * listCount
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			j = totalCount;
			var loop= 0;
			$.each(data.enclosure, function(){
					for(loop=0; loop<this.rowspan; loop++){
						if(loop==0){
							lists += '<tr>';
							lists += '<input type="hidden" id="companyCodeW" value="'+this.companyCode+'">'
							lists += '<td rowspan="'+this.rowspan+'">'+j+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+data.lectureStart+' ~ '+data.lectureEnd+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+this.companyName+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+toPriceNum(this.totalPriceSum)+'</td>';
							lists += '<td>'+toPriceNum(this.contents[0].totalPrice)+'</td>';
							lists += '<td>'+this.contents[0].contentsName+'</td>';
							lists += '<td>'+this.contents[0].serviceType_1+' / '+this.contents[0].serviceType_3+' / '+this.contents[0].serviceType_free+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+this.companyCode.substr(0,3)+'-'+this.companyCode.substr(3,2)+'-'+this.companyCode.substr(5,5)+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+this.managerName+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+this.managerMobile+'</td>';
							lists += '<td rowspan="'+this.rowspan+'">'+this.bankName+' / '+this.bankNum+'</td>';
							if(data.output=="Y"){
								lists += '<td rowspan="'+this.rowspan+'"><button type="button" onClick="excelAct(\''+data.lectureStart+'\',\''+data.lectureEnd+'\',\''+this.companyCode+'\')">출력하기</button></td>';
							}else{
								var outputTime = data.outputTime.split("-");
								lists += '<td rowspan="'+this.rowspan+'">'+outputTime[0]+'년 '+outputTime[1]+'월 '+outputTime[2]+'일부터 출력 가능합니다.</td>';
							}
							lists += '</tr>';
						}else{
							lists += '<tr>';
							lists += '<td>'+toPriceNum(this.contents[loop].totalPrice)+'</td>';
							lists += '<td>'+this.contents[loop].contentsName+'</td>';
							lists += '<td>'+this.contents[loop].serviceType_1+' / '+this.contents[loop].serviceType_3+' / '+this.contents[loop].serviceType_free+'</td>';
							lists += '</tr>';
						}
					}
					j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="15">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="15">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
	})
}

//검색관련
function searchTypeSelect(types){
	$('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .noticeSearch').remove();
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
	$('.searchArea div.searchChangeArea .excel').before(chageSearch)
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

function excelAct(lectureStart,lectureEnd,companyCode){
	//searchValue = $('.searchForm').serialize();
	//searchValue = '&'+searchValue+'&companyCode='+companyCode;
	window.open('../attach/witak.php?lectureStart='+lectureStart+'&lectureEnd='+lectureEnd+'&companyCode='+companyCode);
}

function excelAct_2(){
	if(!$('select[name=lectureDay]').val()){
		alert("수강기간을 선택해주세요");
		return;
	}
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	window.open('printEnclosure.php?'+searchValue);
}
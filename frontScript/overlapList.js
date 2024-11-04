//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
function listAct(){
	
	//상단 액션 부분	
	var actionArea = '';

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<select name="searchType">';	
    actionArea += '<option value="companyName">사업주명</option>';
    actionArea += '<option value="companyCode">사업자번호</option>';
    //actionArea += '<option value="marketerName">영업담당자</option>';
    actionArea += '<option value="managerName">교육담당자</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';	
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';	
	contents += '<th style="width:300px;">사업장명</th>';
	contents += '<th style="width:100px;">사업자번호</th>';
	contents += '<th style="width:80px;">담당자구분</th>';
	contents += '<th style="width:100px;">담당자 ID <br /> 담당자명</th>';
	contents += '<th style="width:80px;">삭제 </th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="6">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}


function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'matchingType=manager&page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			$.each(data.overlap,  function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';				
				lists += '<td>'+this.companyName+'</td>';
				lists += '<td>'+this.matchingValue+'</td>';
				lists += '<td>'+this.matchingType+'</td>';
				lists += '<td>'+this.userID+'<br/>'+this.userName+'</td>';
				lists += '<td><button type="button" onClick="deleteData(useApi,'+this.seq+')">삭제</button></td>';
				lists += '</tr>';
				j--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="6">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="6">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}




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
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';

    actionArea += '<select name="searchType">';
	/*if(userLevel == 8) {
		actionArea += '<option value="companyName">사업주</option>';
		actionArea += '<option value="userName">이름</option>';
	} else {
		actionArea += '<option value="userName">이름</option>';
		actionArea += '<option value="companyName">사업주</option>';
	}
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '<option value="mobile">연락처</option>';*/
	actionArea += '<option value="USER_AGENT_PK">회원_PK</option>';
	actionArea += '<option value="USER_NAME">이름</option>';
	actionArea += '<option value="ENC_RES_NO">업체명</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	//contents += '<th style="width:50px;"><input type="checkbox" id="checkAll" onChange="checkboxAllCheck(\'checkAll\')" /><label for="checkAll"></label></th>';
	contents += '<th style="width:60px;">번호</th>';
	contents += '<th>USER_AGENT_PK</th>';
	contents += '<th style="width:200px;">USER_NAME</th>';
	contents += '<th style="width:120px;">RES_NO</th>';
	contents += '<th style="width:200px;">ENC_RES_NO</th>';
	contents += '<th style="width:120px;">EMAIL</th>';
	contents += '<th style="width:120px;">MOBILE</th>';
	contents += '<th style="width:120px;">TEL</th>';
	contents += '<th style="width:80px;">POST</th>';
	contents += '<th style="width:80px;">CHANGE_STATE</th>';
	contents += '<th style="width:80px;">REG_DATE</th>';
	contents += '</tr></thead><tbody>'	;
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
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+'&joinURL='+joinURL+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.data,  function(){
					lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td>'+this.USER_AGENT_PK+'</td>';
					lists += '<td>'+this.USER_NAME+'</td>';
					lists += '<td>'+this.RES_NO+'</td>';
					lists += '<td>'+this.ENC_RES_NO+'</td>';
					lists += '<td>'+this.EMAIL+'</td>';
					lists += '<td>';
					if(this.MOBILE == '' || this.MOBILE == null){
						lists += '-'
					}else{
						lists += this.MOBILE;;
					}
					lists += '</td>';
					lists += '<td>';
					if(this.TEL == '' || this.TEL == null){
						lists += '-'
					}else{
						lists += this.TEL;;
					}
					lists += '</td>';
					lists += '<td>'+this.POST+'</td>';
					lists += '<td>'+this.CHANGE_STATE+'</td>';
					lists += '<td>'+this.REG_DATE+'</td>';
					lists += '</td>';
					lists += '</tr>';
					i--;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
		loadingAct();
	})
}
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
	var startDate = '';
	var endDate = '';
	var today = new Date();

	//actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchCheck()">';
	actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
	actionArea += '<span>로그인시간</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;';
    actionArea += '<select name="searchType">';
	actionArea += '<option value="userName">이름</option>';
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchCheck()">검색하기</button>';
	actionArea += '</div>';
	actionArea += '<strong style="color:red">* 로그인 데이터는 재전송이 불가합니다.</strong>';
	actionArea += '</div>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:100px;">회원PK<br>(아이디)</th>';
	contents += '<th style="width:100px;">회원이름</th>';
	contents += '<th style="width:120px;">로그인IP</th>';
	contents += '<th style="width:120px;">로그인시간</th>';
	contents += '<th style="width:120px;">접속기기</th>';
	contents += '<th style="width:120px;">OS</th>';
	contents += '<th style="width:120px;">접속 브라우저</th>';
	contents += '<th style="width:120px;">브라우저 버전</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="9">검색값을 선택하세요.</td></tr>'	;
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
				lists += '<td>'+this.userID+'</td>';
				lists += '<td>'+this.userName+'</td>';
				lists += '<td>'+this.eHistory.loginIP+'</td>';
				lists += '<td>'+this.eHistory.loginTime+'</td>';
				lists += '<td>'+this.eHistory.device+'</td>';
				lists += '<td>'+this.eHistory.OS+'</td>';
				lists += '<td>'+this.eHistory.browser+'</td>';
				lists += '<td>'+this.eHistory.browserVersion+'</td>';
				lists += '</tr>';
				i--;
			})
		}else{			
			lists += '<tr><td class="notResult" colspan="9">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
		loadingAct();
	})
}

function searchCheck(){
	var startDate = $('input[name="startDate"]').val();
	var endDate = $('input[name="endDate"]').val();

	if(startDate == '' && endDate == ''){
		alert('로그인시간을 입력해주세요.');
	}else if(startDate == ''){
		alert('로그인시간을 입력해주세요.');
	}else if(endDate == ''){
		alert('로그인시간을 입력해주세요.');
	}else{
		searchAct();
	}
}
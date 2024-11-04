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
	actionArea += '<option value="userName">이름</option>';
	actionArea += '<option value="userId">아이디</option>';
	actionArea += '<option value="companyName">사업주</option>';
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
	contents += '<th style="width:40%;">아이디/이름</th>';
	contents += '<th style="width:40%;">사업주</th>';
	contents += '<th>수료증</th>';
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
		sortData = sortDatas;
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;

		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}

		if (totalCount != 0){
			var i = 0;
			$.each(data.study, function(){
						console.log(data.study);
						lists += '<tr>';
						lists += '<td>'+this.userId+'<br>'+this.userName+'</td>';
						lists += '<td>'+this.companyName+'</td>';
						//수료증
						if(this.studyCount == 0) { // 비환급
							lists += '<td>비환급';
							lists += '<br /><button onClick="window.open(\'certificateSpecial.php?lectureStart='+this.lectureStart+'&lectureEnd='+this.lectureEnd+'&userName='+this.userName+'&companyCode='+this.companyCode+'&serviceType=3&contentsName=전직원\')">산업(전직원20차시)</button></td>';
						} else { // 환급
							lists += '<td>개인(환급)';
							lists += '<br /><button onClick="window.open(\'certificateSpecial.php?lectureStart='+this.lectureStart+'&lectureEnd='+this.lectureEnd+'&userName='+this.userName+'&companyCode='+this.companyCode+'&serviceType=1&contentsName=전직원\')">산업(전직원20)</button></td>';
						}

						lists += '</tr>';
					j--;
					i++;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}
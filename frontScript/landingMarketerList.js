//리스트액션
function listAct(page){
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()" style="display:flex;">';
	actionArea += '<div>';
	actionArea += `랜딩페이지: <select name="landingPage"><option value="">선택</option>${optWrite['landing']}</select>&nbsp;&nbsp;&nbsp;&nbsp;`;
	actionArea += '사업장명: <input type="text" name="companyName">&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '영업자명: <input type="text" name="userName">&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '<button type="sumbit" onClick="searchAct()">검색하기</button>';
	actionArea += '</div>';
	actionArea += '<div style="text-align:right;">';
	actionArea += '<button type="button" onClick="writeAct();">영업자등록</button>';
	actionArea += '</div>';
	actionArea += '</form></div>';

	$('#contents > h1').after(actionArea);

	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th>번호</th>';
	contents += '<th>랜딩페이지</th>';
	contents += '<th>기업명</th>';
	contents += '<th>영업자</th>';
	contents += '<th>연락처</th>';
	contents += '<th>영업자코드</th>';		
	contents += '<th>등록일</th>';
	contents += '<th>수정</th>';
	contents += '<th>삭제</th>';
	contents += '</tr></thead><tbody>';		
	contents += '</tbody></table>';		
	$('#wrap').removeAttr('class');
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}

	$.get(useApi, 'page='+page+'&list='+listCount+sortData, function(data){
		totalCount = data.totalCount;
		var lists = '';
		var phone = '';
		var email = '';
		var i = '';
		if (page != 1){
			i = (page-1)*listCount;
		}else{
			i = 1;
		}

		limit = (page - 1) * listCount; 
		i = data.totalCount - limit; //2017.1.25 게시글번호 역순처리

		if(totalCount != 0){
			$.each(data.marketer, function(){
				phone = this.phone01 + '-' + this.phone02 + '-' + this.phone03;
				if(this.email01 == null){
					email = '@';
				} else {
					email = this.email01 + '@' + this.email02;	
				}
				
				lists += '<tr>';
				lists += `<td>${i}</td>`;
				lists += `<td>${this.landingName}</td>`;
				lists += `<td>${this.companyName}</td>`;
				lists += `<td>${this.userName}</td>`;
				lists += `<td>${phone}<br>${email}</td>`;
				lists += `<td>${this.marketerNumber}</td>`;
				lists += `<td>${this.inputDate}</td>`;
				lists += `<td><button onClick="writeAct(${this.seq})">수정</button></td>`;
				lists += `<td><button onClick="deleteAct(${this.seq})">삭제</button></td>`;
				lists += '</tr>';

				i--;
			})	
		} else {
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 글이 없습니다.</td></tr>';
		}
		$('.BBSList > table > tbody').html(lists);
		pagerAct();
	})

}

function deleteAct(seq){
	if(!confirm("삭제하시겠습니까?")){
		return false;
	}
	$.ajax({
		method: "DELETE",
		url: useApi,
		data: {seq: seq},
		success: function(data){
			alert(data.message);
			ajaxAct();
		}		
	});
}
//리스트액션
function listAct(page){
	if( modes != 'writeMode'){
		var contents = '';
		contents += '<div class="searchArea">';
		contents += '</div>';
		contents += '<table><thead><tr>';
		contents += '<th style="width:60px;">번호</th>';
		contents += '<th class="left" style="text-align:center;">제목</th>';		
		contents += '<th style="width:120px;">등록일</th>';
		contents += '</tr></thead><tbody>';		
		contents += '</tbody></table>';
		$('#wrap').removeAttr('class');
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		ajaxAct();
	}
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var type = '';
	var listAjax = $.get(useApi,'&page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		//console.log(totalCount);
		var lists = '';
		var i = totalCount;
		if (page != 1){
			i = (page-1)*listCount;
		}else{
			i = 1;
		}

		limit = (page - 1) * listCount; 
		i = data.totalCount - limit; //2017.1.25 게시글번호 역순처리
		if (totalCount != 0){
			$.each(data.note, function(){
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td onclick="viewAct('+this.seq+')" style="cursor:pointer; text-align:center;">'+this.subject+'</td>';
				lists += '<td>'+this.inputDate+'</td>';
				lists += '</tr>';
				i--;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 학습노트가 없습니다.</td></tr>';
		}
		$('.BBSList > table > tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}
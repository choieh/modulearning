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

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	//contents += '<th style="width:50px;"><input type="checkbox" id="checkAll" onChange="checkboxAllCheck(\'checkAll\')" /><label for="checkAll"></label></th>';
	contents += '<th style="width:5%;">번호</th>';	
	//contents += '<th style="width:10%x;">변경 전</th>';
	//contents += '<th style="width:10%x;">변경 후</th>';
	contents += '<th style="width:15%;">메뉴1</th>';
	contents += '<th style="width:15%;">메뉴2</th>';
	contents += '<th style="width:5%;">작업구분</th>';
	contents += '<th style="width:25%;">작업자</th>';
	contents += '<th style="width:15%;">작업자IP</th>';
	contents += '<th style="width:15%;">작업시간</th>';	
	contents += '<th style="width:5%;">상세</th>';	
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
		
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.workHist,  function(){
					lists += '<tr>';
					lists += '<td>'+i+'</td>';					
					lists += '<td>'+this.menu1+'</td>';
					lists += '<td>'+this.menu2+'</td>';										
					lists += '<td>'+this.workType+'</td>';	
					if (this.inputID != '') {
						lists += '<td>'+this.inputID+'('+this.userName+'/'+this.companyName+')</td>';
					} else {
						lists += '<td>비회원</td>';
					}									
					lists += '<td>'+this.inputIP+'</td>';
					lists += '<td>'+this.inputDate+'</td>';
					lists += '<td><button type="button" onclick="workHistModalAct('+this.seq+');">상세</button></td>';
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

function workHistModalAct(modalSeq){
	var modalWrite =''
	modalWrite +='<div id="modal">';

	var loginTime = '';
	modalWrite += '<div class="memberView" style="width:55%;margin-left:-470px">';
	modalWrite += '<h1><strong>작업이력정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
	$.get(useApi,{'seq':modalSeq},function(data){
		$.each(data.workHist,function(){
			modalWrite +='<div style="width:1025px;">';
			modalWrite +='<div class="BBSWrite">';
			modalWrite +='<h1>작업이력정보</h1>';
			
			modalWrite +='<ul>';

			modalWrite +='<li>';			
			modalWrite +='<div class="halfDiv"><h1>메뉴</h1>';
			modalWrite += this.menu1+' > '+this.menu2;
			modalWrite +='</div>';			
			modalWrite +='<div class="halfDiv"><h1>구분</h1>';
			modalWrite += this.workType;			
			modalWrite +='</div>';
			modalWrite +='</li>';

			modalWrite +='<li>';			
			modalWrite +='<h1>작업자</h1><div class="normalText">';
			modalWrite += this.inputID+'('+this.userName+'/'+this.companyName+')';
			modalWrite +='</div>';
			modalWrite +='</li>';	
			
			modalWrite +='<li>';			
			modalWrite +='<div class="halfDiv"><h1>작업자IP</h1>';
			modalWrite += this.inputIP;
			modalWrite +='</div>';			
			modalWrite +='<div class="halfDiv"><h1>작업시간</h1>';
			modalWrite += this.inputDate;			
			modalWrite +='</div>';
			modalWrite +='</li>';

			modalWrite +='</ul>';

			modalWrite +='<div class="BBSList scrollDiv" style="height:550px; margin:10px 0;">';
			modalWrite +='<table><thead><tr>';
			modalWrite +='<th style="width:200px" nowrap>변경 전</th>';
			modalWrite +='<th style="width:200px" nowrap>변경 후</th>';			
			modalWrite +='</tr></thead><tbody>';
			modalWrite +='<td><pre>'+this.workBefore+'</pre></td>';
			modalWrite +='<td><pre>'+this.workAfter+'</pre></td>';
			//modalWrite +='<tr><td colspan="2"><pre>'+this.workResult+'</pre></td></tr>';
			modalWrite +='</tbody></table>';
			modalWrite +='</div>';

			
		})
		modalWrite +='</div></div></div></div>';
		$('#contents').after(modalWrite)
		modalAlign()
		// <- 20170428 이응민 추가
	})
	
}

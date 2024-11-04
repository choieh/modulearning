//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiAutoCompanySetting.php'
var totalCount = '';
var page = '';
var seq = '';
var writeSeq = '';

//리스트액션
function listAct(writeSeqNum){
	writeSeqNum = writeSeqNum ? writeSeqNum : '';
	writeSeq = writeSeqNum;
	var actionArea = '';
	actionArea += '<div class="inputArea"><form class="writeform" name="writeform" method="post" action="'+useApi+'"><table>';
	actionArea += '<tr>';
	actionArea += '<th style="width:30%;">사업주번호</th>';
	actionArea += '<th style="width:50%;">메모</th>';
	actionArea += '<th style="width:140px;" rowspan="2"><button type="button" onClick="multipartSendData(\'writeform\')">등록</button></th>';
	actionArea += '</tr>';
	actionArea += '<tr><td><input type="text" name="companyCode" maxlength="10" /></td><td><input type="text" name="memo" /></td></tr>';
	actionArea += '</table></form><script type="text/javascript" src="../js/jquery.form.min.js"></script></div>';

	$('div.inputArea').remove();
	$('#contents > h1').after(actionArea);

	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:30%;">사업주번호</th>';
	contents += '<th style="width:50%;">메모</th>';
	contents += '<th style="width:140px;">삭제</th>';
	contents += '</tr></thead><tbody>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//게시물 소팅부분
	ajaxAct()
}

function ajaxAct(){
	var listAjax = $.get(useApi,{'seq':writeSeq},function(data){
		totalCount = data.totalCount;
		var lists = ''
		if (totalCount != 0){
			$.each(data.cm, function(){
				lists += '<tr class="line'+this.seq+'">';				
				lists += '<td><input type="text" name="companyCode" value="'+this.companyCode+'" /></td>';
				lists += '<td><input type="text" name="memo" value="'+this.memo+'" /></td>';				
				lists += '<td><button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
				lists += '</tr>';
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 목록이 없습니다.</td></tr>';
		}
		lists += '</tbody></table>';
		$('.BBSList tbody').html(lists);
	})
}

//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiSetSummary.php';
var totalCount = '';
var page = '';
var seq = '';

//리스트액션
function listAct(){
	var actionArea = '';
	actionArea += '<div class="inputArea"><form class="writeform" name="writeform" method="post" enctype="multipart/form-data" action="'+useApi+'">';
	actionArea += '<table>';
	actionArea += '<tr>';
	actionArea += '<th style="width:100px;">평가구분</th>';
	actionArea += '<th style="width:120px;">점수(이상)</th>';
	actionArea += '<th style="width:120px;">점수(이하)</th>';
	actionArea += '<th>자료등록 (zip 형식의 압축파일로 등록해 주세요.)</th>';
	actionArea += '<th style="width:100px;" rowspan="2"><button type="button" onClick="multipartSendData(\'writeform\')">등록</button></th>';
	actionArea += '</tr>';
	actionArea += '<tr>';
	actionArea += '<td><select name="testType"><option value="mid">중간평가</option>';
	//actionArea += '<option value="final">최종평가</option>';
	actionArea += '</select></td>';
	actionArea += '<td><input type="tel" name="minScore" style="width:100px;" maxlength="3" /></td>';
	actionArea += '<td><input type="tel" name="maxScore" style="width:100px;" maxlength="3" /></td>';
	actionArea += '<td><input type="file" name="attachFile" style="width:300px;"/></td>';
	actionArea += '</tr>';
	actionArea += '</table>';
	actionArea += '<input type="hidden" name="contentsCode" value="'+contentsCode+'">';
	actionArea += '</form><script type="text/javascript" src="../js/jquery.form.min.js"></script></div>';

	$('div.inputArea').remove();
	$('#contents > h1').after(actionArea);

	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:150px;">평가명</th>';
	contents += '<th style="width:120px;">점수(이상)</th>';
	contents += '<th style="width:120px;">점수(이하)</th>';
	contents += '<th >제공자료</th>';
	contents += '<th style="width:100px;">삭제</th>';
	contents += '</tr></thead><tbody>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//게시물 소팅부분
	ajaxAct()
}

function ajaxAct(){
	var listAjax = $.get(useApi,{'contentsCode':contentsCode},function(data){
		totalCount = data.totalCount;
		var lists = ''
		if (totalCount != 0){
			$.each(data.list, function(){
				lists += '<tr class="line'+this.seq+'">';
				if(this.testType == 'mid') {
				lists += '<td>중간평가</td>';
				} else {
				lists += '<td>최종평가</td>';
				}
				lists += '<td>'+this.minScore+'</td>';
				lists += '<td>'+this.maxScore+'</td>';
				lists += '<td><a href="../lib/fileDownLoad.php?fileName='+encodeURI(this.attachFile)+'&link=/attach/setSummary/'+encodeURIComponent(this.attachFile)+'" target="_blank">'+this.attachFile+'</a></td>';
				lists += '<td><button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
				lists += '</tr>';
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 자료가 없습니다.</td></tr>';
		}
		lists += '</tbody></table>';
		$('.BBSList tbody').html(lists);
	})
}

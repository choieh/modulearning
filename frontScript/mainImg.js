//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiMainImage.php'
var totalCount = '';
var page = '';
var seq = '';
var writeSeq = '';

//리스트액션
function listAct(writeSeqNum){
	writeSeqNum = writeSeqNum ? writeSeqNum : '';
	writeSeq = writeSeqNum;
	var actionArea = '';
	actionArea += '<div class="inputArea"><form class="writeform" name="writeform" method="post" enctype="multipart/form-data" action="'+useApi+'"><table>';
	actionArea += '<tr><th style="width:50px;">순번</th><th style="width:40%;">이미지등록</th><th style="width:40%;">이미지링크</th>';
	actionArea += '<th style="width:140px;">링크방식</th><th style="width:140px;" rowspan="2"><button type="button" onClick="multipartSendData(\'writeform\')">등록</button></th></tr>';
	actionArea += '<tr><td><input type="tel" name="orderBy" style="width:40px" maxlength="4" /></td><td><input type="file" name="imagePath" /></td>';
	actionArea += '<td><input type="text" name="imageLink" /></td><td><select name="imageTarget"><option value="_self">현재창</option><option value="_blank">새창</option></select></td></tr>';
	actionArea += '</table></form><script type="text/javascript" src="../js/jquery.form.min.js"></script></div>';

	$('div.inputArea').remove();
	$('#contents > h1').after(actionArea);

	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:60px;">순번</th>';
	contents += '<th style="width:40%;">이미지명</th>';
	contents += '<th style="width:40%;">이미지링크</th>';
	contents += '<th style="width:120px;">링크방식</th>';
	contents += '<th style="width:180px;">수정</th>';
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
			$.each(data.mainImg, function(){
				lists += '<tr class="line'+this.seq+'">';
				lists += '<td><input type="tel" name="orderBy" value="'+this.orderBy+'" style="width:40px;" /></td>';
				var imagePathName = this.imagePath.split("/");
				lists += '<td>'+imagePathName[3]+'</td>';
				if(this.imageTarget == '_self') {
					var _self = 'selected="seleted"';
				} else {
					var _blank = 'selected="seleted"';
				}
				lists += '<td><input type="text" name="imageLink" value="'+this.imageLink+'" /></td>';
				lists += '<td><select name="imageTarget"><option value="_self" '+_self+'>현재창</option><option value="_blank" '+_blank+'>새창</option></select></td>';
				lists += '<td><button type="button"  onClick="lineSendData(\''+useApi+'\','+this.seq+',\'modifys\')">수정</button> / <button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
				lists += '</tr>';
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 목록이 없습니다.</td></tr>';
		}
		lists += '</tbody></table>';
		$('.BBSList tbody').html(lists);
	})
}

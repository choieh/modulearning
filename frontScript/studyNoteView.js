//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//게시판 보기 스크립트 시작
function viewAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용
	
	var type = '';
	if(pageMode == 'adminPage'){
		type='admin';
	}
	viewAjax = $.get(useApi,{'viewType':type,'seq':seq,'boardType':boardType},function(data){
		var writes ='';
		$.each(data.note,function(){
			//입력영역 시작
			writes += '<div class="titleArea">';
			writes += '<h1>'+this.subject+'</h1>';
			writes += '<h2>'+this.userName+' | '+this.userID+'</span>';
			writes += '<strong class="date">등록일 '+this.inputDate+'</strong>';
			if(this.updateDate != false){
				writes += '<strong class="date">수정일 '+this.updateDate+'</strong>';
			}
			writes += '</h2>';
			writes += '</div>'
			writes += '<div class="BBSContents">';
			writes += this.content.replace(/\n/g,'<br />').replace(/  /g,'&nbsp;&nbsp;');
			writes += '</div>'
			writes += '<div class="btnArea">';
			writes += '<button type="button" onClick="writeAct('+seq+')">수정하기</button>'
			writes += '<button type="button" onClick="deleteData(useApi,'+seq+')">삭제하기</button>'
			writes += '<button type="button" onClick="listAct('+page+')">목록으로</button>';
			writes += '</div>';
		})
		$('#wrap').removeClass('study')
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSView')
		$('#contentsArea').html(writes);
	});
}

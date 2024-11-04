//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var replyAnswer = '';
//게시판 보기 스크립트 시작
function viewAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용

	//상단메뉴
	$('.searchArea').remove();
	var type = '';
	if(pageMode == 'adminPage'){
		type='admin';
	}
	viewAjax = $.get(useApi,{'viewType':type,'seq':seq,'boardType':boardType, 'flag': flag},function(data){
		var writes ='';
		var attachURL = data.attachURL
		$.each(data.consult,function(){

			//입력영역 시작
			writes += '<div class="titleArea">';
			writes += '<h1>'+this.subject+'</h1>';
			writes += '<h2>'+this.userName+'<span onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+'</span>';
			writes += '<strong class="email">'+this.email01+'@'+this.email02+'</strong>';
			writes += '<strong class="tel">'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</strong>';
			writes += '<strong class="date">'+this.inputDate+'</strong>';
			writes += '</h2>';
			writes += '</div>'
			writes += '<div class="BBSContents">';
			writes += this.content.replace(/\n/g,'<br />').replace(/  /g,'&nbsp;&nbsp;');
			if(pageMode != 'userPage' && pageMode != 'studyCenterPage'){
				if(loginUserLevel <= 8){
					writes += '<div class="replyArea">';
					writes += '<form class="writeform" action="javascript:sendData(useApi,\'writeform\')">';
					if(this.reply != null && this.reply != '' ){
						writes += '<h2>관리자 | <span>'+this.replyDate+'</span>'
					}else{
						writes += '<h2>'+loginUserName+' | <span>'+loginUserID+'</span>'
					}
                    writes += '<button type="submit">';
					if(this.reply != null && this.reply != '' ){
						writes += '수정하기'
					}else{
						writes += '등록하기'
					}
					writes += '</button>';
					writes += '<input type="checkbox" name="smsSend" id="smsSend" value="Y"><label for="smsSend" style="float:right; height:24px; margin-right:10px; line-height:24px;"> 답변문자알림</label>';
					writes += '</h2>';
					if(this.replyID == loginUserID || !(this.reply == null && this.reply == '') ){
						writes += '<input type="hidden" name="seq" value="'+this.seq+'">'
						writes += '<input type="hidden" name="replyID" value="'+loginUserID+'">'
						writes += '<input type="hidden" name="replyName" value="'+loginUserName+'">'
						writes += '<input type="hidden" name="status" value="C">'
					}
					writes += '</h2>';
					if(this.reply != null && this.reply != '' ){
						writes += '<textarea name="reply">'+this.reply+'</textarea>';
					}else{
						writes += '<textarea name="reply"></textArea>';
					}
					writes += '</form>';
/*
						writes += '<form class="writeform" action="javascript:sendData(useApi,\'writeform\')">';
						writes += '<h2>개선사항';
						writes += '<button type="submit">';
						if(this.refinement != null && this.refinement != '' ){
							writes += '수정하기'
						}else{
							writes += '등록하기'
						}
						writes += '</button>';
						if(this.refinement != null && this.refinement != '' ){
							writes += ' <span style="float:right; margin:3px 5px 0 0">작성자 : '+this.refinementName+' | 작성일 : '+this.refinementDate+'</span><span style="clear:both"></span>';
						}
						if(this.refinementID == loginUserID || !(this.refinement == null && this.refinement == '') ){
							writes += '<input type="hidden" name="seq" value="'+this.seq+'">';
							writes += '<input type="hidden" name="refinementID" value="'+loginUserID+'">';
						}

						writes += '</h2>';
						if(this.refinement != null && this.refinement != '' ){
							writes += '<textarea style="min-height:120px" name="refinement">'+this.refinement+'</textarea>';
						}else{
							writes += '<textarea style="min-height:120px" name="refinement"></textArea>';
						}

					writes += '</form>';
*/
					writes += '</div>';
				} else {
					if(this.status == 'C'){
						var replyName = '';
						var uLength = this.replyName.length;
						for (var u =0; u < uLength; u++){
							replyName += u != 1 ? this.replyName.charAt(u) : '*';
						}

						writes += '<div class="replyArea"><h2>관리자 | <span>'+this.replyDate+'</span></h2>';
						writes += '<div id="reply" style="white-space: pre;">'+this.reply+'</div></div>';
					}
				}
			}else{
				if(this.status == 'C'){
					var replyName = '';
					var uLength = this.replyName.length;
					for (var u =0; u < uLength; u++){
						replyName += u != 1 ? this.replyName.charAt(u) : '*';
					}

					writes += '<div class="replyArea"><h2>관리자 | <span>'+this.replyDate+'</span></h2>';
					writes += '<div id="reply" style="white-space: pre;">'+this.reply+'</div></div>';
				}
			}
			writes += '</div>'
			writes += '<div class="btnArea">';
			//if(loginUserID == this.userID){
				writes += '<button type="button" onClick="writeAct('+seq+')">수정하기</button>'
				writes += '<button type="button" onClick="deleteData(useApi,'+seq+')">삭제하기</button>'
			//}
			writes += '<button type="button" onClick="listAct('+page+')">목록으로</button>';
			writes += '</div>';

			replyAnswer = this.reply;
		})
		$('#wrap').removeClass('study')
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSView')
		$('#contentsArea').html(writes);

		if (document.getElementById('reply')) {
			document.getElementById('reply').innerHTML = '';
			document.getElementById('reply').innerHTML = replyAnswer;
		}


	});
}

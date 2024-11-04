//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//게시판 보기 스크립트 시작
function viewAct(writeSeq,addItem02){

	var visitPathList = {
		onlineSearch: "온라인검색",
		path_email: "이메일",
		liveSeminar: "라이브세미나",
		sns: "페이스북/인스타그램",
		banner: "배너광고",
		youtube: "유튜브",
		referral: "지인추천",
		etc: "기타",
		"": "",
		undefined: "",
	};

	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용

	
	//상단메뉴	
	$('.searchArea').remove();	
	var type = '';
	if(pageMode == 'adminPage'){
		type='admin';
	}
	viewAjax = $.get(useApi,{'type':type,'viewType':viewType,'seq':seq,'boardType':boardType,'addItem02':addItem02},function(data){
		var writes ='';
		var attachURL = data.attachURL
		$.each(data.consult,function(){
			
			//입력영역 시작
			writes += '<div class="titleArea">';
			writes += '<h2>'+this.userName+'</span>';
			//writes += '<strong class="email">'+this.email01+'@'+this.email02+'</strong>';
			if (loginUserID == '10004ok') {
				writes += '<strong class="tel">'+this.phone01+'-'+this.phone02+'-****</strong>';
			} else {
				writes += '<strong class="tel">'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</strong>';
			}
			writes += '<strong class="date">'+this.inputDate+'</strong>';
			writes += '</h2>';
			writes += '</div>'
			writes += '<div class="BBSContents">';
			writes += this.content.replace(/\n/g,'<br />').replace(/  /g,'&nbsp;&nbsp;');

			if(this.addItem02 == 'landing'){
				writes += '<table class="deco";>';
				writes += '<col style="width: 120px"/>';
				writes += '<col style="width: 220px"/>';
				writes += '<col style="width: 120px"/>';
				writes += '<col style="width: 220px"/>';
				writes += '<col style="width: 120px"/>';
				writes += '<col style="width: 220px"/>';
				writes += '<tbody><tr>';
                writes += '<td>문의유형</td>';
                writes += '<td colspan="5">'+this.consultType+'</td>';
            	writes += '</tr>'
				writes += '<tr><td>기업유형</td><td>'+this.companyType+'</td>';
                writes += '<td>임직원 수</td><td>'+this.people_number+'</td>';
                writes += '<td>예상 교육인원</td><td>'+this.expect_number+'</td></tr>';
            	writes += '<tr><td>기업명</td><td colspan="5">'+this.company+'</td></tr>';
            	writes += '<tr><td>소속</td><td>'+this.department+'</td>';
				writes += '<td>이름</td><td>'+this.userName+'</td>';
                writes += '<td>직급/직책</td><td>'+this.position+'</td></tr>';
                writes += '<tr><td>연락처</td><td>'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</td>';
                writes += '<td>이메일</td><td>'+this.email+'</td>';
                writes += '<td>방문경로</td><td>'+visitPathList[this.visitPath]+'</td>';
            	writes += '</tr></tbody></table>';
			}
				if(loginUserLevel <= 8){
					writes += '<div class="replyArea">';
					writes += '<form class="writeform" action="javascript:sendData(useApi,\'writeform\')">';
					writes += '<input type="hidden" name="seq" value="'+this.seq+'">'
					if(this.addItem02 == 'landing'){
						writes += '<input type="hidden" name="in" value="landing">'
					}
					writes += '<input type="hidden" name="adminCk" value="Y" />';
					if(this.reply != null && this.reply != '' ){
						writes += '<h2>'+this.replyName+' | <span>'+this.replyDate+'</span>'
					}else{
						writes += '<h2>'+loginUserName+' | <span>'+loginUserID+'</span>'
					}
                    writes += '<button type="submit">등록하기</button>';
					if (this.status == 'C') {
						var checkedY = 'checked';
					} else {
						var checkedY = '';
					}					
					writes += '<input type="checkbox" name="checkY" id="checkY" value="Y" '+checkedY+'><label for="checkY" style="float:right; height:24px; margin-right:10px; line-height:24px;">상담완료</label>';
					writes += '</h2>';
					
					if(this.reply != null && this.reply != '' ){
						writes += '<textarea name="reply">'+this.reply+'</textarea>';
					}else{
						writes += '<textarea name="reply"></textArea>';
					}								
					writes += '</form>';

					writes += '</div>';					
				}
			
				/*if(this.status == 'C'){
					var replyName = '';
					var uLength = this.replyName.length;
					for (var u =0; u < uLength; u++){
						replyName += u != 1 ? this.replyName.charAt(u) : '*';
					}

					writes += '<div class="replyArea"><h2>'+replyName+' | <span>'+this.replyDate+'</span></h2>';
					writes += '<div>'+this.reply+'</div></div>';
				}*/
			
			writes += '</div>'
			writes += '<div class="btnArea">';
			//if(loginUserID == this.userID){
				//writes += '<button type="button" onClick="writeAct('+seq+')">수정하기</button>'
				//writes += '<button type="button" onClick="deleteData(useApi,'+seq+')">삭제하기</button>'
			//}
			writes += '<button type="button" onClick="listAct('+page+')">목록으로</button>';
			writes += '</div>';
		})
		$('#wrap').removeClass('study')
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSView')
		$('#contentsArea').html(writes);
	});
}

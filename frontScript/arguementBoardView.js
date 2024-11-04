//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var endDate = ''

//게시판 보기 스크립트 시작
function viewAct(seqNumb){
	endDate =  $.urlParam('addItem01').split('~'); // 수강일
	var boardInfo = $.get('../api/apiBoardInfo.php',{'seq':boardCode},function(data){
		$.each(data.boardInfo, function(){
			boardName = this.boardName;
			boardMode = this.boardMode;
			useName = this.useName;
			useEmail = this.useEmail;
			usePhone = this.usePhone;
			usePassword = this.usePassword;
			useSecret = this.useSecret;
			useTop = this.useTop;
			useCategory = this.useCategory;
			useReply = this.useReply;
			useComment = this.useComment;
			useFile = this.useFile;
			useSearch = this.useSearch;
			useDateView = this.useDateView;
			useHitView = this.useHitView;
			memo = this.memo;
			writeAttachFile01 = this.attachFile01;
			writeAttachFile01Name = this.attachFile01Name;
			writeAttachFile02 = this.attachFile02;
			writeAttachFile02Name = this.attachFile02Name;
			writeAttachFile03 = this.attachFile03;
			writeAttachFile03Name = this.attachFile03Name;
			addItem01 = this.addItem01;
			titleHtml = boardName +'<span>'+ memo +'</span>';
		});
	}).done(function(){
		var boardPermit = $.get('../api/apiBoardPermit.php',{'boardCode':boardCode},function(data){
			$.each(data.boardPermit, function(){
				listPermit = this.listPermit;
				viewPermit = this.viewPermit;
				writePermit = this.writePermit;
				replyPermit = this.replyPermit;
				deletePermit = this.deletePermit;
				commentPermit = this.commentPermit;
				secretPermit = this.secretPermit;
				topPermit = this.topPermit;
			})
		})
	}).always(function(){
		//console.log(boardMode)
		seq = seqNumb;
		//var boardSeq = seq;
		//var fileAddress = 'fileUpload/'; //추후 절대경로로 변경
		if(eval(viewPermit) < eval(loginUserLevel)) {
			alert('회원만 보실 수 있습니다.');
			return false;
		}
		if(seq){
			var urlDate = $.urlParam('addItem01');
			var urlTitle = decodeURI($.urlParam('subject').replace(/\+/g,' '));
			if(urlTitle.length > 12){
				urlTitle = urlTitle.substring(0,12)+'...';
			}
			var titleHtml =  urlDate+'<span>'+ urlTitle +'</span>';
			$('#titleArea > h2 > strong').html(urlDate);
			$('#titleArea > h1').html(urlTitle);
			}

		//상단메뉴
		$('#contents > h1').html(titleHtml);
		$('.searchArea, .BBSCategory').remove();

		//게시물 소팅부분2017-07-24
		var viewAjax = $.get(useApi,{'seq':seq, 'boardCode':boardCode},function(data){
			var attachURL = data.attachURL;
			var views = '';

			if (boardMode == 9) {	//수강요청파일 업로드 게시판
				$.each(data.board, function(){
					var nowDate    = new Date();
					var startDay   = new Date(this.addItem02);
					var endDay     = new Date(this.addItem02);
					var startWeek  = startDay.getDay();
					var sdate      = startDay.getDate();
					var uploadDate = '';

					if (startWeek == 2) {				//개강일이 화요일이면..
						startDay.setDate(sdate - 8);	//파일 업로드 가능 시간 설정 (시작 : 개강 전주 월요일 4시)
						startDay.setHours(16);
						endDay.setDate(sdate - 6);		//파일 업로드 가능 시간 설정 (종료 : 개강 전주 수요일 4시)
						endDay.setHours(16);
						uploadDate = '업로드 가능 기간은 '+startDay.getFullYear()+'년 '+(startDay.getMonth()+1)+'월 '+startDay.getDate()+'일 16시 ~ '+endDay.getFullYear()+'년 '+(endDay.getMonth()+1)+'월 '+endDay.getDate()+'일 16시 까지 입니다.';
					} else {							//개강일이 금요일이면..
						startDay.setDate(sdate - 9);	//파일 업로드 가능 시간 설정 (시작 : 개강 전주 수요일 4시)
						startDay.setHours(16);
						endDay.setDate(sdate - 4);		//파일 업로드 가능 시간 설정 (종료 : 월요일 4시)
						endDay.setHours(16);
						uploadDate = '업로드 가능 기간은 '+startDay.getFullYear()+'년 '+(startDay.getMonth()+1)+'월 '+startDay.getDate()+'일 16시 ~ '+endDay.getFullYear()+'년 '+(endDay.getMonth()+1)+'월 '+endDay.getDate()+'일 16시 까지 입니다.';
					}

					//제목열 소팅
					views += '<div class="titleArea">';
					views += '<h1>'
					views += '[수강시작일 : '+this.addItem02+']&nbsp;&nbsp;'+this.subject+'</h1>';
					if(useName == 'Y' || useEmail == 'Y' || usePhone == 'Y' || useDateView == 'Y' || useHitView == 'Y'){
						views += '<h2>';
						if(useName != 'N'){
							views += '작성자 : '+this.userName+'<span>'+this.userID+'</span>';
						}
						if(useEmail == 'Y'){
							views += '<strong class="email">'+this.email01+'@'+this.email02+'</strong>';
						}
						if(usePhone == 'Y'){
							views += '<strong class="tel">'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</strong>';
						}
						if(useDateView == 'Y'){
							views += '<strong class="date">'+this.inputDate.substr(0,10) +'</strong>';
						}
						if(useHitView == 'Y'){
							views += '<strong class="hit">'+this.hits+'</strong>';
						}
						views += '</h2>';
					}
					views += '</div>';
					views += '<div><h2><span style="color:red;margin-left:35px;">';
					views += uploadDate;
					views += '</span></h2></div>';

				//상단 파일 업로드
				views += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
				views += '<div class="inputArea">';
				views += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
				views += '<input type="hidden" name="userID" value="'+loginUserID+'" />';
				views += '<input type="hidden" name="userName" value="'+loginUserName+'" />';
				views += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
				views += '<input type="hidden" name="replySeq" value="'+seq+'" />';
				views += '<table><tr>';
				views += '<th style="width:140px;">수강 종료 날짜</th>';
				//views += '<th colspan="3">첨부파일</th>';
				views += '<th>첨부파일</th>';
				views += '<th style="width:500px;">내용</th>';
				views += '<th>등록</th>';
				views += '</tr>';
				views += '<tr>';
				views += '<td><div class="datePicker"><input type="text" class="cal" name="addItem02" readonly="readonly" /></td>';
				var i=1;
				//for(i=1;i <= 3 ; i++){
					views += '<td>';
					if(eval('writeAttachFile0'+i) == '' || eval('writeAttachFile0'+i) == null){
						views += '<input name="attachFile0'+i+'" type="file" />'
					}else{
						views += '<div id="attachFile0'+i+'" class="attachFile"><a href="'+attachURL+eval('writeAttachFile0'+i)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('writeAttachFile0'+i+'Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile0'+i+'\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0'+i+'" value="Y" />';
					}
					views += '</td>';
				//}

				views += '<td><input type="text" name="subject" value="" /></td>';
				views += '<td style="width:140px;">';
				//if (eval(5) == eval(loginUserLevel) || eval(6) == eval(loginUserLevel)) {
					views += '<button type="button" onClick="fileUploadCheck(\''+this.addItem02+'\','+seq+');">등록</button>';
				//} else {
				//	views += '<button type="button" onClick="alert(\'영업자만 등록 할 수 있습니다.\')">등록</button>';
				//}
				views += '</td>';
				views += '</tr></table>';
				views += '</form>';
				views += '</div>';

				//업로드한 파일 리스트
				views += '<br/><br/>';
				views += '<div class="BBSList">';
				views += '<table class="BBSList"><thead><tr>';
				views += '<th style="width:5%;">번호</th>';
				views += '<th style="width:7%;">수강 종료 날짜</th>';
				//views += '<th colspan="3" style="width:35%;">첨부파일</th>';
				views += '<th style="width:35%;">첨부파일</th>';
				views += '<th style="width:22%;">내용</th>';
				views += '<th style="width:5%;">등록자</th>';
				views += '<th style="width:10%;">처리현황</th>';
				if(eval(2) >= eval(loginUserLevel) && loginCompanyCode == '7838700353'){
					views += '<th style="width:7%;">상태변경</th>';
					views += '<th style="width:13%;">수정/삭제</th>';
				}
				views += '</tr></thead><tbody>';
				views += '</tbody></table></div>';

				views += '<br/><div class="btnArea">';
				if(eval(2) >= eval(loginUserLevel) && loginCompanyCode == '7838700353'){
					if(eval(2) >= eval(loginUserLevel) || this.userID == loginUserID){
						views += '<button type="button" onClick="writeAct('+this.seq+')">수정하기</button>';
					}
					if(eval(deletePermit) >= eval(loginUserLevel) || this.userID == loginUserID || this.userID == 'guest'){
						if(this.userID == loginUserID){
							views += '<button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제하기</button>';
						}else{
							views += '<button type="button" onClick="modalAct(\''+useApi+'\','+this.seq+',\'deletes\')">삭제하기</button>';
						}
					}
				}
				views += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
				views += '</div>';
				})
				$('#contentsArea').removeAttr('class')
				$('#contentsArea').addClass('BBSView')
				$('#contentsArea').html(views);
				//fileformAct();//파일 첨부 사용시
				pickerAct();//데이트피커 사용
				board9AjaxAct(seq);
			} else {
				//게시글 소팅
				$.each(data.board, function(){
					//제목열 소팅
					if(this.secret == 'Y'){
						views += '<div class="titleArea secret">';
					}else{
						views += '<div class="titleArea">';
					}
					views += '<h1>'
					if (this.secret == 'Y'){
						views += '<span>[ 비밀글 ]</span>';
					}
					if (useCategory == 'Y'){
						views += '<span>[ '+this.categoryName+' ]</span>&nbsp;';
					}
					views += this.subject+'</h1>';
					if(useName == 'Y' || useEmail == 'Y' || usePhone == 'Y' || useDateView == 'Y' || useHitView == 'Y'){
						views += '<h2>';
						if(useName != 'N'){
							views += '작성자 : '
							if (this.userName.length == 2){
								views += this.userName.substring(0,1)+'*';
							}else if( this.userName.length == 3){
								views += this.userName.substring(0,1)+'*'+this.userName.substring(2,3);
							}else{
								var aa = '';
								for(j=0;this.userName.length-2 > j; j++){
									aa += '*';
								}
								views += this.userName.substring(0,1)+aa+this.userName.substring(this.userName.length-1,this.userName.length);
							}
							views += '<span>';
						if(this.userID != ''){
							var aaa = '';
							for(h=0;this.userID.length-4 > h; h++){
								aaa += '*';
							}
						}
							views += this.userID.substring(0,2)+aaa+this.userID.substring(this.userID.length-3,this.userID.length);
							views += '</span>';
						}
						if(useEmail == 'Y'){
							views += '<strong class="email">'+this.email01+'@'+this.email02+'</strong>';
						}
						if(usePhone == 'Y'){
							views += '<strong class="tel">'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</strong>';
						}
						if(useDateView == 'Y'){
							views += '<strong class="date">'+this.inputDate.substr(0,10) +'</strong>';
						}
						if(useHitView == 'Y'){
							views += '<strong class="hit">'+this.hits+'</strong>';
						}
						views += '</h2>';
					}
					views += '</div>';

					//첨부파일 소팅
					if(eval(useFile) != 0 && !(this.attachFile01Name == null && this.attachFile02Name == null) ){
						views += '<div class="fileArea">';
						for (i=1;i<=eval(useFile);i++){
							if(eval('this.attachFile0'+i+'Name') != null){
								views += '<a href="../lib/fileDownLoad.php?fileName='+ encodeURI(eval('this.attachFile0'+i+'Name')) +'&link='+ encodeURIComponent( attachURL+eval('this.attachFile0'+i) )+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('this.attachFile0'+i+'Name')+'</a>';
							};
						}
						views += '</div>'
					}
					//게시글 소팅
					views += '<div class="BBSContents">'+ this.content +'</div>'

					views += '<div class="btnArea">';

					if((checkDate >= endDate[0] && endDate[1] >= checkDate) || eval(4) > eval(loginUserLevel)){
						if(this.userID == loginUserID){
							views += '<button type="button" onClick="writeAct('+this.seq+')">수정하기</button>';
						}
						if(eval(deletePermit) >= eval(loginUserLevel) || this.userID == loginUserID || this.userID == 'guest'){
							if(this.userID == loginUserID){
								views += '<button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제하기</button>';
							}
						}
						views += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
						if(useReply == "Y" && eval(replyPermit) >= eval(loginUserLevel) && this.titleSubject != 'Y'){
							views += '<button type="button" onClick="writeAct('+this.seq+',\'reply\')">답변달기</button>';
						}
					}else{
						views += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
					}
					views += '</div>';
				})

			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSView')
			$('#contentsArea').html(views);
			pickerAct();//데이트피커 사용

			//댓글 기능 소팅
			if(useComment != 'N' && commentPermit >= loginUserLevel){
				var commentArea = '';
				commentArea += '<div class="commentArea">'
				if((checkDate >= endDate[0] && endDate[1] >= checkDate) || eval(8) > eval(loginUserLevel)){
					if(eval(commentPermit) >= eval(loginUserLevel)){
						commentArea += '<form class="commentWrite">';
						commentArea += '<input type="hidden" name="seq" value="" />';
						commentArea += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
						commentArea += '<input type="hidden" name="boardSeq" value="'+seq+'" />';
						if(eval(commentPermit) == 10 && loginUserID == ''){
							commentArea += '<div>'
							commentArea += '<h1>작성자</h1><input type="text" name="userName" value="" /><input type="hidden" name="userID" value="guest" />';
							commentArea += '<h1>비밀번호</h1><input type="password" name="pwd" name="userID" value="" />';
							commentArea += '</div>'
						}
						if(loginUserID != ''){
							commentArea += '<div>'
							commentArea += '<h1>'+loginUserName+'</h1><input type="hidden" name="userID" value="'+loginUserID+'" /><input type="hidden" name="userName" value="'+loginUserName+'" />';
							commentArea += '</div>'
						}
						commentArea += '<textarea name="content"></textarea>';
						commentArea += '<button type="button" onClick="confirmComment()">댓글달기</button>';
						commentArea += '</form>';
					}
				}
				commentArea += '<ul class="commentList"></ul></div>'
			}
			$('#contentsArea').append(commentArea);
			if(useComment == 'Y'){
				commentAct(seq)
			}
			}
		})
	})
}

//댓글관련 시작
function commentAct(seq){
	var comments = '';
	var commentsAjax = $.get(commentApi,{'boardSeq':seq},function(data){
		if(data.totalCount != 0 ){
			$.each(data.comment, function(){
				comments += '<li>';
				comments += '<form  class="comment'+this.seq+'">'
				comments += '<h1>';
				if (this.userName.length == 2){
								comments += this.userName.substring(0,1)+'*';
							}else if( this.userName.length == 3){
								comments += this.userName.substring(0,1)+'*'+this.userName.substring(2,3);
							}else{
								var aa = '';
								for(j=0;this.userName.length-2 > j; j++){
									aa += '*';
								}
								comments += this.userName.substring(0,1)+aa+this.userName.substring(this.userName.length-1,this.userName.length);
							}
				comments += '<span>'
				if(this.userID != ''){
						var aaa = '';
						for(h=0;this.userID.length-4 > h; h++){
						aaa += '*';
					}
				}
				comments += this.userID.substring(0,2)+aaa+this.userID.substring(this.userID.length-3,this.userID.length);
				comments += '</span><span>'+this.inputDate+'</span></h1>';
				if(loginUserID == this.userID || loginUserLevel < 4){
					comments += '<button type="button" onClick="';
					if(this.userID == loginUserID || loginUserLevel < 4){
						comments += 'deleteData(\''+commentApi+'\','+this.seq+',\'comment\')';
					}
					comments += '">삭제하기</button>';
				}
				if(loginUserID == this.userID || loginUserLevel < 4){
					comments += '<button type="button" class="modifyBtn" onClick="';
					if(this.userID == loginUserID || loginUserLevel < 4){
					comments += 'commentModify('+this.seq+')';
					}
					comments += '">수정하기</button>';
				}
				comments += '<p name="content">'+this.content+'</p>';
				comments += '<h3>'+this.userIP+'</h3>';
				comments += '</form>'
				comments += '</li>'
			})
		}else{
			comments += '<li class="noReply">작성된 댓글이 없습니다.</li>'
		}
		$('#contentsArea div.commentArea ul').html(comments)
	})
}

function confirmComment(commentSeq){
	commentSeq = commentSeq ? commentSeq : '';
	if(commentSeq==''){
		if($('form.commentWrite input[name="userName"]').val() == ''){
			alert('댓글에 이름을 입력해주세요')
		}else if($('form.commentWrite input[name="pwd"]').val() == ''){
			alert('댓글에 비밀번호을 입력해주세요')
		}else{
			sendData(commentApi,'commentWrite','comment');
		}
	}else{
		var commetData = $('form.comment'+commentSeq).serialize()
		var pwdCheck = $.post(commentApi,commetData,function(data){
			if(data.result == 'success'){
				alert('수정되었습니다.')
				commentAct(seq);
			}else{
				alert('비밀번호가 일치하지 않습니다..')
			}
		})
	}
}

function commentModify(commentSeq,usePWD,cancel){
	usePWD = usePWD ? usePWD : '';
	if(cancel != "cancel"){
		$('form.comment'+commentSeq).children('button.modifyBtn').html('수정취소')
		$('form.comment'+commentSeq).children('button.modifyBtn').removeAttr('onClick')
		$('form.comment'+commentSeq).children('button.modifyBtn').click(function(){commentModify(commentSeq,usePWD,'cancel')})
		var commentsConents = $('form.comment'+commentSeq).children('p').html();
		var commentsModifyArea = '';
		commentsModifyArea += '<div>'
		commentsModifyArea += '<input type="hidden" name="seq" value="'+commentSeq+'">'
		commentsModifyArea += '<input type="hidden" name="boardCode" value="'+boardCode+'">'
		if(usePWD != ''){
			commentsModifyArea += '<div><h1>비밀번호 확인</h1><input type="password" name="pwd" /></div>'
		}
		commentsModifyArea += '<textarea name="content">'+commentsConents+'</textArea>'
		commentsModifyArea += '<button type="button" onClick="confirmComment('+commentSeq+')">수정하기</button>';
		$('form.comment'+commentSeq).children('p').after(commentsModifyArea);
		$('form.comment'+commentSeq).children('p').css('display','none');
	}else{
		$('form.comment'+commentSeq).children('button.modifyBtn').html('수정하기')
		$('form.comment'+commentSeq).children('button.modifyBtn').removeAttr('onClick')
		$('form.comment'+commentSeq).children('button.modifyBtn').click(function(){commentModify(commentSeq,usePWD)})
		$('form.comment'+commentSeq).children('div').remove();
		$('form.comment'+commentSeq).children('p').css('display','block');
	}

}

//FAQ보기
function openView(viewSeq){
    if ($('.openView').length > 0) {
	    $('.openView').remove();
    } else {

        var openViewAjax = $.get(useApi,{'boardCode':boardCode,'seq':viewSeq},function(data){
            var openViews = '';
            openViews += '<tr class="openView"><td colspan="20"><div>'
            $.each(data.board, function(){
                openViews += this.content;
                openViews += '</div></td></tr>';
            })
            $('tr#line'+viewSeq).after(openViews)
        })
    }
}

//수강 후기
function reviewAct(obj){
    if($(obj).hasClass('on')){
        $(obj).removeClass('on');
    }else{
        $(obj).addClass('on');
    }
}

//리스트 소팅동작
function board9AjaxAct(seq){
	var viewAjax2 = $.get(useApi,{'replySeq':seq, 'boardCode':boardCode},function(data){
			var attachURL = data.attachURL;
			var i         = data.totalCount;
			var lists     = '';
			if (data.totalCount != 0) {
				$.each(data.board, function(){
					if (loginCompanyCode == '7838700353' || this.userID == loginUserID) {
						lists += '<tr class="line'+this.seq+'">';
						lists += '<td width="5%">'+i+'</td>';
						lists += '<td>'+this.addItem02+'</td>';
						//lists += '<td colspan="3">';
						lists += '<td>';
						//lists += '<div class="fileTD">';
						var j=1;
						//for (j=1;j<=3;j++) {
							if (eval('this.attachFile0'+j+'Name') != null) {
								lists += '<a href="../lib/fileDownLoad.php?fileName='+eval('this.attachFile0'+j+'Name')+'&link='+attachURL+eval('this.attachFile0'+j)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('this.attachFile0'+j+'Name')+'</a>';
							}
						//}
						//lists += '</div>';
						lists += '</td>';
						lists += '<td>'+this.subject;
						if (this.studyInputStatus == 'X') {
							lists += '<br/><div id="uploadFail"><span style="color:red;">반려사유 : '+this.content+'</span></div>';
						} else {
							lists += '<br/><div id="uploadFail'+i+'" style="display:none;">반려사유 : <input style="width:200px;" type="text" id="content'+i+'" name="content" value="" /></div>';
						}
						lists += '</td>';
						lists += '<td>'+this.userName+'</td>';
						lists += '<td>';
						if (this.studyInputStatus == 'Y') {
							lists += '<span style="color:blue;">처리완료</span><br/>(처리자:'+this.studyInputUserID+')';
						} else if (this.studyInputStatus == 'X') {
							lists += '<span style="color:red;">반려</span><br/>(처리자:'+this.studyInputUserID+')';
						} else {
							lists += '요청중';
						}
						lists += '</td>';
						if(eval(2) >= eval(loginUserLevel) && loginCompanyCode == '7838700353'){
							lists += '<td><select id="studyInputStatus'+i+'" name="studyInputStatus" onchange="changeSel('+i+');">';
							if (this.studyInputStatus == "N") {	var statusN = "selected"; }
							if (this.studyInputStatus == "Y") {	var statusY = "selected"; }
							if (this.studyInputStatus == "X") {	var statusX = "selected"; }
							lists += '<option value="N" '+statusN+'>요청중</option>';
							lists += '<option value="Y" '+statusY+'>처리완료</option>';
							lists += '<option value="X" '+statusX+'>반려</option>';
							lists += '</select>';
							lists += '</td>';
							lists += '<td>';
							lists += '<button type="button" onclick="changeStatus(\''+useApi+'\','+this.seq+','+seq+','+i+');">수정</button>&nbsp;';
							lists += '<button type="button" onclick="deleteData(\''+useApi+'\','+this.seq+',\'mode9\','+seq+');">삭제</button>';
							lists += '</td>';
						}
						lists += '</tr>';
						i--;
					}
			})
		} else {
			lists += '<tr><td class="notResult" colspan="20">등록된 파일이 없습니다.</td></tr>';
		}
		$('.BBSList tbody').html(lists)
		findOpt();
		pickerAct();//데이트피커 사용
	})
}

function changeSel(num) {
	if ($('#studyInputStatus'+num).val() == "X") {
		$('#uploadFail'+num).attr('style', "display:inline;");
	} else {
		$('#uploadFail'+num).attr('style', "display:none;");
	}
}
function changeStatus(apiName,seq,boardSeq,num){
	if (confirm("수정 하시겠습니까?")) {
		var studyInputStatus = $('#studyInputStatus'+num).val();
		var content = $('#content'+num).val();
		$.ajax({
			url: apiName,
			type:'POST',
			data:{'seq':seq,'changeStatus':'Y','studyInputStatus':studyInputStatus,'studyInputUserID':loginUserID,'content':content},
			dataType:'text',
			success:function(data){
				alert('변경되었습니다.');
				viewAct(boardSeq);
			},
			fail:function(){
				alert('변경에 실패하였습니다.')
			}
		})
	}
}

function fileUploadCheck(startDate,seq) {	//업로드 가능 시간 체크
	var nowDate   = new Date();
	var startDay  = new Date(startDate);
	var endDay    = new Date(startDate);
	var startWeek = startDay.getDay();
	var sdate     = startDay.getDate();

	if (startWeek == 2) {				//개강일이 화요일이면..
		startDay.setDate(sdate - 8);	//파일 업로드 가능 시간 설정 (시작 : 개강 전주 월요일 4시)
		startDay.setHours(16);
		endDay.setDate(sdate - 6);		//파일 업로드 가능 시간 설정 (종료 : 개강 전주 수요일 4시)
		endDay.setHours(16);
		if (startDay < nowDate && nowDate < endDay) {
			multipartSendData('writeform','mode9',seq);
		} else {
			alert('파일 업로드 가능 기간이 아닙니다. 업로드 가능 기간은 '+startDay.getFullYear()+'년 '+(startDay.getMonth()+1)+'월 '+startDay.getDate()+'일 16시 ~ '+endDay.getFullYear()+'년 '+(endDay.getMonth()+1)+'월 '+endDay.getDate()+'일 16시 까지 입니다.');
		}
	} else {							//개강일이 금요일이면..
		startDay.setDate(sdate - 9);	//파일 업로드 가능 시간 설정 (시작 : 개강 전주 수요일 4시)
		startDay.setHours(16);
		endDay.setDate(sdate - 4);		//파일 업로드 가능 시간 설정 (종료 : 월요일 4시)
		endDay.setHours(16);
		if (startDay < nowDate && nowDate < endDay) {
			multipartSendData('writeform','mode9',seq);
		} else {
			alert('파일 업로드 가능 기간이 아닙니다. 업로드 가능 기간은 '+startDay.getFullYear()+'년 '+(startDay.getMonth()+1)+'월 '+startDay.getDate()+'일 16시 ~ '+endDay.getFullYear()+'년 '+(endDay.getMonth()+1)+'월 '+endDay.getDate()+'일 16시 까지 입니다.');
		}
	}

}


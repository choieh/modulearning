// 2018-03-16 김재욱 과정별 게시판 추가


//게시판 목록으로
function noticeModalAct(addItem01){
    $('#modal').remove();
    $.get(boardApi,{'boardCode':'20','addItem01':addItem01},function(data){
        var modal = '';
        modal += '<div id="modal">';
        modal += '<div class="closeArea" onclick="modalClose()"></div>';
        modal += '<div class="noticeModal" style="margin-top: -376px; margin-left: -416px;">';
        modal += '<h1><strong>게시판 관리</strong><button type="button" onclick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기"></button></h1>';
        modal += '<div style="width:830px; height:750px;">';
        modal += '<div class="BBSList">';
        modal += '<table>';
        modal += '<colgroup>';
        modal += '<col style="width:80px">';
        modal += '<col>';
        modal += '<col style="width:100px">';
        modal += '<col style="width:200px">';
        modal += '</colgroup>';
        modal += '<tr>';
        modal += '<th>번호</th>';
        modal += '<th>제목</th>';
        modal += '<th>작성일</th>';
		if(loginUserLevel < 4){
			modal += '<th>관리</th>';
		}
        modal += '</tr>';
        var i = 1;
        var i = data.totalCount;    
        if (data.totalCount != 0 || eval(data.topCount) != 0 || eval(data.topCount) != ''){ //공지글, 게시글이 1개 이상 있을 경우
           /* if( eval(data.topCount) != 0 || eval(data.topCount) != ''){ // 공지글이 1개 이상 있을 경우
                $.each(data.boardTop, function(){
					
					modal += '<tr>';
                    modal += '<td>'+i+'</td>';
                    modal += '<td class="left" onclick="noticeView(\''+addItem01+'\',\''+this.seq+'\')" style="cursor:pointer;">'+this.subject+'</td>';
                    modal += '<td class="date">'+this.inputDate.substring(0,10)+'</td>';
					modal += '<td><button type="button" onclick="modalWrite(\''+addItem01+'\',\''+this.seq+'\')">수정하기</button>';
                    modal += '&nbsp;<button type="button" onClick="modalDelete(\'../api/apiBoard.php\','+this.seq+',\''+addItem01+'\')">삭제하기</button>';
                    modal += '</td>'
                    modal += '</tr>';
					i--;
                })
            }
		*/
            if (data.totalCount != 0){ //게시글이 1개 이상 있을 경우
                $.each(data.board,function(){
                    modal += '<tr>';
                    modal += '<td>'+i+'</td>';
                    modal += '<td class="left" onclick="noticeView(\''+addItem01+'\',\''+this.seq+'\')" style="cursor:pointer;">';
					if(this.replySeq != 0){
							modal += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;';
					}
					modal += this.subject+'</td>';
                    modal += '<td>'+this.inputDate.substring(0,10)+'</td>';
					if(loginUserLevel < 4){
						modal += '<td><button type="button" onclick="modalWrite(\''+addItem01+'\',\''+this.seq+'\')">수정하기</button>';
						modal += '&nbsp;<button type="button" onClick="modalDelete(\'../api/apiBoard.php\','+this.seq+',\''+addItem01+'\')">삭제하기</button>';
						modal += '</td>'						
					}
                    modal += '</tr>';
					i--;
                })
            }
        }else{
            modal += '<tr><td colspan="4">게시글이 없습니다.</td></tr>';  
        }
        modal += '</table>';
        modal += '</div>';
        modal += '<div class="btnArea"><button type="button" onclick="modalWrite(\''+addItem01+'\',\'\')">글쓰기</button></div>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';
        $('#contents').after(modal);
	})
}
//게시판 보기
function noticeView(addItem01,seq){
   $.get(boardApi,{'boardCode':'20','addItem01':addItem01,'seq':seq},function(data){
      var view = '';
      $.each(data.board,function(){
        view += '<div class="closeArea" onclick="modalClose()"></div>';
        view += '<div class="noticeModal" style="margin-top: -376px; margin-left: -416px;">';
        view += '<h1><strong>게시판 관리</strong><button type="button" onclick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기"></button></h1>';
        view += '<div class="BBSView" style="width:830px; height:750px;">';
        view += '<div class="titleArea">';
        view += '<h1 style="border-bottom:none;">'+this.subject+'</h1>';
        view += '<h2><strong class="date">'+this.inputDate.substr(0,10)+'</strong><strong class="hit">'+this.hits+'</strong></h2>';
        view += '</div>';
        /*
		//첨부파일 소팅
        if(this.attachFile01Name != null){
            view += '<div class="fileArea" style="margin:0;">';
            view += '<a href="../lib/fileDownLoad.php?fileName='+eval('this.attachFile01Name')+'&link='+data.attachURL+eval('this.attachFile01')+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('this.attachFile01Name')+'</a>';
            view += '</div>'
        }*/
        view += '<div class="BBSContents" style="border-bottom:1px solid #ccc;">'+this.content+'</div>';
        view += '<div class="btnArea">';
        if(loginUserID != ''){
			view += '<button type="button" onclick="modalWrite(\''+addItem01+'\',\''+this.seq+'\',\'reply\')";>답글달기</button>';
		}
		if (loginUserID == this.userID || LoginUserLevel < 4){
			view += '<button type="button" onclick="modalWrite(\''+addItem01+'\',\''+this.seq+'\')";>수정하기</button>';
			view += '<button type="button" onClick="modalDelete(\'../api/apiBoard.php\','+this.seq+',\''+addItem01+'\')">삭제하기</button>';
		}
		view += '<button type="button" onclick="noticeModalAct(\''+addItem01+'\')">목록으로</button>';
        view += '</div>';
        view += '</div>'
        view += '</div>'
      })
      $('#modal').html(view)
  })
}
//게시판 글쓰기 수정
function modalWrite(addItem01,writeSeq,writeReply){
    writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
	writeReply = writeReply ? writeReply : '';

	//댓글일 경우
	var replySeq = '';
	var replySecret = '';
	var replyTop = '';
	var replySubject = '';
	var replyContents = '';
	var replyCategorySeq = '';

	//기존,신규글
	var writeseq = '';
	var writeUserName = '';
	var writeUserID = '';
	var writeCategorySeq = '';
	var writeSubject = '';
	var writeContent = '';
	var writeAttachFile01 = '';
	var writeAttachFile01Name = '';
	var writeAttachFile02 = '';
	var writeAttachFile02Name = '';
	var writeAttachFile03 = '';
	var writeAttachFile03Name = '';
	var writeSecret = '';
	var writeTop = '';
	var attachURL = '';
	var writeUserID = loginUserID ? loginUserID : 'guest';
	var replyOrderBy = '';
    var addItem02 = '';

	if(writeReply != ''){
		replySeq = writeSeq;
		seq = '';
		writeSeq = '';
		var replyAjax = $.get(boardApi,{'seq':replySeq, 'boardCode':'20'},function(data){
			$.each(data.board, function(){
				replySecret = this.secret;
				replyTop = this.top;
				replySubject = this.subject;
				replyContents = this.content;
				replyCategorySeq = this.categorySeq;
				replyOrderBy = this.replyOrderBy;
			})
			writePrint()
		})
	}else{
		seq = writeSeq;

		if(seq != ''){
			var writeAjax = $.get(boardApi,{'seq':seq, 'boardCode':'20'},function(data){
				attachURL = data.attachURL;
				$.each(data.board, function(){
					writeseq = this.seq;
					writeUserName = this.userName;
					writeUserID = this.userID;
					writePhone01 = this.phone01;
					writePhone02 = this.phone02;
					writePhone03 = this.phone03;
					writeEmail01 = this.email01;
					writeEmail02 = this.email02;
					writeCategorySeq = this.categorySeq;
					writeSubject = this.subject;
					writeContent = this.content;
					writeAttachFile01 = this.attachFile01;
					writeAttachFile01Name = this.attachFile01Name;
					writeAttachFile02 = this.attachFile02;
					writeAttachFile02Name = this.attachFile02Name;
					writeSecret = this.secret;
					writeTop = this.top;
					addItem01 = this.addItem01;
					addItem02 = this.addItem02;
                    managerID = this.managerID;
                    managerName = this.managerName;
                    managerCompany = this.managerCompany;
				})
				writePrint()
			})
		}else{
			writePrint()
		}
	}
	

	function writePrint(data){
        var writes ='';
		writes += '<form class="writeform" method="post" action="'+boardApi+'" enctype="multipart/form-data">';
        if(returnData(writeUserID) != ''){
            writes += '<input type="hidden" name="userID" value="'+writeUserID+'" />';
        }else{
            writes += '<input type="hidden" name="userID" value="'+loginUserID+'" />';
        }
		writes += '<input type="hidden" name="replySeq" value="'+replySeq+'" />';
		writes += '<input type="hidden" name="userName" value="'+loginUserName+'" />';
		writes += '<input type="hidden" name="seq" value="'+writeSeq+'" />';
		writes += '<input type="hidden" name="boardCode" value="20" />';
        writes += '<input type="hidden" name="addItem01" value="'+addItem01+'" />';
        writes += '<div class="BBSWrite">';
        writes += '<ul>'
        //제목
        writes += '<li>'
        writes += '<h1>제목</h1>'
		/*
        writes += '<input name="top" id="useTop" value="Y" type="checkbox"'
        if(returnData(writeTop) == 'Y'){
             writes += 'checked="checked"'
        }
		*/
        writes += '<input type="text" style="width:70%;" name="subject" value="';
		if(writeReply != ''){
				writes += '[댓글]'+replySubject;
			}else{
				writes += returnData(writeSubject);
			}
        writes += '"></li>'

       /*
		//카테고리
        writes += '<li><h1>카테고리</h1>';
        writes += '<select name="categorySeq"></select></li>';
        var categorySort = $.get(categoryApi,{'value01':'boardCategory','divisionValue':'15'},function(data){
			optionWrite = '';
			if(data.totalCount != 0){
                $.each(data.category,function(){
					optionWrite += '<option value="'+this.seq+'"';
                    if (chkData.categorySeq == this.seq){
                        optionWrite += 'selected';
                    }
                    optionWrite += '>'+this.value02+'</option>';
                })
            }
            $('select[name="categorySeq"]').html(optionWrite)
        })
		
        writes += '<li><h1>첨부파일</h1>';
        if(returnData(chkData.attachFile01) == '' || returnData(chkData.attachFile01) == null){
            writes += '<input type="file" name="attachFile01" />'
        }else{
			writes += '<div id="attachFile01" class="attachFile"><a href="'+data.attachURL+eval('chkData.attachFile01')+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('chkData.attachFile01Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile01\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
        }
        writes += '</li>';
		*/
        //내용
        writes += '<li>';
        writes += '<h1>내용</h1>';

	    writes += '<form action="sample.php" method="post"><textarea name="content" id="ir1" rows="10" cols="100" style="display:none;">';	
		writes += returnData(writeContent);
		writes += '<br /><br />';
			if(writeReply != ''){
				if(replyOrderBy == 0){
					writes += '[원본]<br />'
					writes += replyContents;
				}else{
					writes += replyContents;
				}
			}
		writes += '</textarea></form>';
        writes += '</li>';
        writes += '</ul>'
        writes += '<div class="btnArea">';
        writes += '<button type="button" onclick="submitContents1(\'writeform\',\''+addItem01+'\')">등록하기</button>';
        writes += '<button type="button" onclick="noticeModalAct(\''+addItem01+'\')">목록으로</button>';
        writes += '</div>';
        writes += '</div>';
        writes += '</form>'
        writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
        $('#modal > .noticeModal > div').html(writes)

        nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "ir1",
			sSkinURI: "../lib/SmartEditor/SmartEditor2Skin.html",
			htParams : {
				bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
				fOnBeforeUnload : function(){
					//alert("완료!");
				}
			}, //boolean
			fOnAppLoad : function(){
				//예제 코드
				//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
			},
			fCreator: "createSEditor2"
		});
    }
}
//에디터 사용시 호출
var oEditors = [];

function submitContents1(elClickedObj,addItem01) {
	oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.	
	// 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById("ir1").value를 이용해서 처리하면 됩니다.	
	try {
		elClickedObj.form.submit();				
	} catch(e) {}
	submitNotice('writeform',addItem01);
}
//작성완료
function submitNotice(formName,addItem01){
	if($('input[name="subject"]').val() == ''){
		alert('제목을 입력하세요');
		return;
	}else{
	var formName = $('form.'+formName);
	formName.ajaxForm({
		dataType:'text',
		beforeSubmit: function (data,form,option) {
			return true;
		},
		success: function(data,status){
			alert('등록되었습니다.');
            noticeModalAct(addItem01)
		},
		error: function(){
			//에러발생을 위한 code페이지
			alert('등록에 실패하였습니다.')
		}
	});
	formName.submit();
	}
};
//게시글 삭제
function modalDelete(apiName, sendSeq, addItem01){
	if(confirm("정말 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.")){
		$.ajax({
			url: apiName,
			type:'DELETE',
			data:{'seq':sendSeq},
			dataType:'text',
			success:function(data){
				alert('삭제되었습니다.');
                noticeModalAct(addItem01)
			},
			fail:function(){
				alert('삭제에 실패하였습니다.')
			}
		})
	}
}

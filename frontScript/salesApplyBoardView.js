
//게시판 보기 스크립트 시작
function viewAct(seqNumb) {
    var boardInfo = $.get('../api/apiBoardInfo.php', {'seq': boardCode}, function (data) {
        $.each(data.boardInfo, function () {
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
            memo = this.memo;
            titleHtml = boardName + '<span>' + memo + '</span>';
        });
    }).done(function () {
        seq = seqNumb;

        //상단메뉴
        $('#contents > h1').html(titleHtml);
        $('.searchArea, .BBSCategory').remove();

        //게시물 소팅부분2017-07-24
        var viewAjax = $.get(useApi, {
            'seq': seq,
            'boardCode': boardCode
        }, function (data) {
            var attachURL = data.attachURL;
            var views = '';

            //입과게시판
            $.each(data.board, function () {
                var nowDate = new Date();
                var startDay = new Date(this.addItem02);
                var endDay = new Date(this.addItem02);
                var startWeek = startDay.getDay();
                var sdate = startDay.getDate();
                var uploadDate = '';
                var serviceTypeString = '';
                var addItem03 = this.addItem03 ?? '';
                var addItem04 = this.addItem04 ?? '';
                var addItem05 = this.addItem05 ?? '';
                var companyName = this.company ?? '';
                var marketerMatching = this.marketerMatching ?? '사업주 번호 미기입';
                var serviceType = {
                    service1: "환급 ",
                    service2: "비환급(서비스) ",
                    service3: "비환급(판매) ",
                    service4: "환급+비환급 ",
                    service5: "기직카",
                };
                if (addItem03.length > 0) {
                    addItem03.split('.').forEach(str => {
                        serviceTypeString += serviceType[str];
                    })
                }

                //제목열 소팅
                views += '<div class="titleArea">';
                views += '<h2>'
                views += '[수강날짜 : ' + this.addItem01 + ' ~ ' + this.addItem02 + ']&nbsp;&nbsp;' + this.subject + '</h2>';
                if (useName == 'Y' || useEmail == 'Y' || usePhone == 'Y' || useDateView == 'Y') {
                    views += '<h2>';
                    if (useName != 'N') {
                        views += '작성자 : ' + this.userName + '<span>' + this.userID + '</span>';
                    }
                    if (useEmail == 'Y') {
                        views += '<strong class="email">' + this.email01 + '@' + this.email02 + '</strong>';
                    }
                    if (usePhone == 'Y') {
                        views += '<strong class="tel">' + this.phone01 + '-' + this.phone02 + '-' + this.phone03 + '</strong>';
                    }
                    if (this.status == 'W') {
                        views += `<span style="color:black;"><strong>처리 상태 : </strong>대기</span>`;
                    } else if (this.status == 'C') {
                        views += `<span style="color:black;"><strong>처리 상태 : </strong>접수</span>`;
                    } else if (this.status == 'N') {
                        views += `<span style="color:black;"><strong>처리 상태 : </strong>처리중</span>`;
                    } else if (this.status == 'Y') {
                        views += `<span style="color:black;"><strong>처리 상태 : </strong>완료</span>`;
                    } else if (this.status == 'R') {
                        views += `<span style="color:black;"><strong>처리 상태 : </strong>보완</span>`;
                    }
                    if (useDateView == 'Y') {
                        views += '<strong class="date">' + this.inputDate.substr(0, 10) + '</strong>';
                    }

                    views += '</h2>';
                }
                views += '</div>';
                views += '<div><h2><span style="color:red;margin-left:35px;">';
                views += uploadDate;
                views += '</span></h2></div>';

                if (loginUserLevel == 2) {
                    views += '<br/>';
                    views += '<div style="display:flex; padding-left:10px; align-items:center">';
                    views += '<h2 style="">처리상태 변경</h2>';
                    views += '<div style="padding-left:10px;">';
                    views += `<span><button type="button" style="border:none; border-radius:5px;  width:60px; height:30px; background:#4d4d4f; color:white;" onClick="changeApplicationStatus(${this.seq}, 'C', 'V')">접수</button></span>&nbsp;&nbsp;&nbsp;&nbsp;`;
                    views += `<span><button type="button" style="border:none; border-radius:5px;  width:60px; height:30px; background:#4d4d4f; color:white;" onClick="changeApplicationStatus(${this.seq}, 'R', 'V')">보완</button></span>&nbsp;&nbsp;&nbsp;&nbsp;`;
                    views += `<span><button type="button" style="border:none; border-radius:5px;  width:60px; height:30px; background:#4d4d4f; color:white;" onClick="changeApplicationStatus(${this.seq}, 'Y', 'V')">완료</button></span>&nbsp;&nbsp;&nbsp;&nbsp;`;
                    views += `<span><button type="button" style="border:none; border-radius:5px;  width:60px; height:30px; background:#4d4d4f; color:white;" onClick="changeApplicationStatus(${this.seq}, 'X', 'V')">취소</button></span>&nbsp;&nbsp;&nbsp;&nbsp;`;
                    views += '</div>';
                    views += '</div>';
                    views += `<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 영업자 매칭여부: </strong>${marketerMatching}</div>`;
                    views += '<br/><br/>';
                }
                views += '<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 기업명: </strong>' + companyName + '</div>';
                views += '<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 수강구분: </strong>' + serviceTypeString + '</div>';
                views += '<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 계산서 메일: </strong>' + addItem04 + '</div>';
                views += '<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 금액: </strong>' + addItem05 + '</div>';
                views += '<div style="padding:10px; font-size:14px;"><strong style="font-size: 16px;">- 비고: </strong>' + this.content + '</div>';
                views += '</div>';

                //업로드한 파일 리스트
                views += '<div class="BBSList">';
                views += '<table class="BBSList"><thead><tr>';
                views += '<th style="width:5%;">번호</th>';
                //views += '<th colspan="3" style="width:35%;">첨부파일</th>';
                views += '<th style="width:95%;">첨부파일&nbsp;' +
                    '<button type="button" onclick="downloadAllFiles()" style="background: #4d4d4f; color: white; border: none; border-radius: 5px; font-size: 12px; padding: 8px 5px; width: 90px; height: 30px;">일괄 다운로드</button></th>';
                views += '</tr></thead><tbody>';
                views += '</tbody></table></div>';

                views += '<br/><div class="btnArea">';

                if (eval(2) >= eval(loginUserLevel) || this.userID == loginUserID) {
                    views += '<button type="button" onClick="writeAct(' + this.seq + ')">수정하기</button>';
                }
                if (eval(deletePermit) >= eval(loginUserLevel) || this.userID == loginUserID || this.userID == 'guest') {
                    if (this.userID == loginUserID || loginUserLevel == '2') {
                        views += '<button type="button" onClick="deleteData(\'' + useApi + '\',' + this.seq + ', \'mode9\')">삭제하기</button>';
                    } else {
                        views += '<button type="button" onClick="modalAct(\'' + useApi + '\',' + this.seq + ',\'deletes\')">삭제하기</button>';
                    }
                }

                views += '<button type="button" onClick="listAct(' + page + ')">목록보기</button>';
                views += '</div>';
            })
            $('#contentsArea').removeAttr('class')
            $('#contentsArea').addClass('BBSView')
            $('#contentsArea').html(views);
            //fileformAct();//파일 첨부 사용시
            pickerAct();//데이트피커 사용
            board9AjaxAct(seq);

            //댓글 기능 소팅
            if (useComment != 'N' && commentPermit >= loginUserLevel) {
                var commentArea = '';
                commentArea += '<div class="commentArea">'
                if (eval(commentPermit) >= eval(loginUserLevel)) {
                    commentArea += '<form class="commentWrite">';
                    commentArea += '<input type="hidden" name="seq" value="" />';
                    commentArea += '<input type="hidden" name="boardCode" value="' + boardCode + '" />';
                    commentArea += '<input type="hidden" name="boardSeq" value="' + seq + '" />';
                    if (eval(commentPermit) == 10 && loginUserID == '') {
                        commentArea += '<div>'
                        commentArea += '<h1>작성자</h1><input type="text" name="userName" value="" /><input type="hidden" name="userID" value="guest" />';
                        commentArea += '<h1>비밀번호</h1><input type="password" name="pwd" name="userID" value="" />';
                        commentArea += '</div>'
                    }
                    if (loginUserID != '') {
                        commentArea += '<div>'
                        commentArea += '<h1>' + loginUserName + '</h1><input type="hidden" name="userID" value="' + loginUserID + '" /><input type="hidden" name="userName" value="' + loginUserName + '" />';
                        commentArea += '</div>'
                    }
                    commentArea += '<textarea name="content"></textarea>';
                    commentArea += `<button type="button" onClick="confirmComment()">댓글달기</button>`;
                    commentArea += '</form>';
                }
                commentArea += '<ul class="commentList"></ul></div>'
            }
            $('#contentsArea').append(commentArea);
            if (useComment == 'Y') {
                commentAct(seq)
            }

        })
    })
}

//댓글관련 시작
function commentAct(seq) {
    var comments = '';
    var commentsAjax = $.get(commentApi, {'boardSeq': seq}, function (data) {
        if (data.totalCount != 0) {
            $.each(data.comment, function () {
                comments += '<li>';
                comments += '<form  class="comment' + this.seq + '">'
                if (boardCode == '16') {
                    comments += '<input type="hidden" name="boardCode" value=' + boardCode + '>';
                }
                comments += '<h1>' + this.userName + '<span>' + this.userID + '</span><span>' + this.inputDate + '</span></h1>';
                if (loginUserID == this.userID || this.userID == 'guest') {
                    comments += '<button type="button" onClick="';
                    if (this.userID == loginUserID || loginUserType == 'admin') {
                        comments += 'deleteData(\'' + commentApi + '\',' + this.seq + ',\'comment\')';
                    } else {
                        comments += 'modalAct(\'' + commentApi + '\',' + this.seq + ',\'deletes\')';
                    }
                    comments += '">삭제하기</button>';
                }
                comments += '<button type="button" class="modifyBtn" onClick="';
                if (loginUserID == this.userID) {
                    comments += 'commentModify(' + this.seq + ')';
                } else {
                    comments += 'commentModify(' + this.seq + ',\'pwd\')';
                }
                comments += '">수정하기</button>';
                comments += '<p name="content">' + this.content + '</p>';
                if (loginUserLevel == '2') {
                    comments += '<h3>' + this.userIP + '</h3>';
                }
                comments += '</form>'
                comments += '</li>'
            })
        } else {
            comments += '<li class="noReply">아직 작성된 댓글이 없습니다.</li>'
        }
        $('#contentsArea div.commentArea ul').html(comments)
    })
}

function confirmComment(commentSeq) {
    commentSeq = commentSeq ? commentSeq : '';
    if (commentSeq == '') {
        if ($('form.commentWrite input[name="userName"]').val() == '') {
            alert('댓글에 이름을 입력해주세요')
        } else if ($('form.commentWrite input[name="pwd"]').val() == '') {
            alert('댓글에 비밀번호을 입력해주세요')
        } else {
            sendData(commentApi, 'commentWrite', 'comment');
        }
    } else {
        var commetData = $('form.comment' + commentSeq).serialize();
        var pwdCheck = $.post(commentApi, commetData, function (data) {
            if (data.result == 'success') {
                alert('수정되었습니다.')
                commentAct(seq);
            } else {
                alert('비밀번호가 일치하지 않습니다..')
            }
        })
    }
}

function commentModify(commentSeq, usePWD, cancel) {
    usePWD = usePWD ? usePWD : '';
    if (cancel != "cancel") {
        $('form.comment' + commentSeq).children('button.modifyBtn').html('수정취소')
        $('form.comment' + commentSeq).children('button.modifyBtn').removeAttr('onClick')
        $('form.comment' + commentSeq).children('button.modifyBtn').click(function () {
            commentModify(commentSeq, usePWD, 'cancel')
        })
        var commentsConents = $('form.comment' + commentSeq).children('p').html();
        var commentsModifyArea = '';
        commentsModifyArea += '<div>'
        commentsModifyArea += '<input type="hidden" name="seq" value="' + commentSeq + '">'
        commentsModifyArea += '<input type="hidden" name="boardCode" value="' + boardCode + '">'
        if (usePWD != '') {
            commentsModifyArea += '<div><h1>비밀번호 확인</h1><input type="password" name="pwd" /></div>'
        }
        commentsModifyArea += '<textarea name="content">' + commentsConents + '</textArea>'
        commentsModifyArea += '<button type="button" onClick="confirmComment(' + commentSeq + ')">수정하기</button>';
        $('form.comment' + commentSeq).children('p').after(commentsModifyArea);
        $('form.comment' + commentSeq).children('p').css('display', 'none');
    } else {
        $('form.comment' + commentSeq).children('button.modifyBtn').html('수정하기')
        $('form.comment' + commentSeq).children('button.modifyBtn').removeAttr('onClick')
        $('form.comment' + commentSeq).children('button.modifyBtn').click(function () {
            commentModify(commentSeq, usePWD)
        })
        $('form.comment' + commentSeq).children('div').remove();
        $('form.comment' + commentSeq).children('p').css('display', 'block');
    }

}

//리스트 소팅동작
function board9AjaxAct(seq) {
    var viewAjax2 = $.get(useApi, {
        'seq': seq,
        'boardCode': boardCode
    }, function (data) {
        var attachURL = data.attachURL;
        var lists = '';
        var flag = 'N';
        if (data.totalCount != 0) {
            $.each(data.board, function () {
                if (this.userID == loginUserID || loginUserLevel == 2) {
                    for (var i = 1; i <= 5; i++) {
                        if (eval('this.attachFile0' + i + 'Name') != null) {
                            lists += '<tr>';
                            lists += '<td width="5%">' + i + '</td>';
                            lists += '<td>';
                            lists += '<a href="../lib/fileDownLoad.php?fileName=' + eval('this.attachFile0' + i + 'Name') + '&link=' + attachURL + eval('this.attachFile0' + i) + '" download><img src="../images/admin/icon_addfile.png">' + eval('this.attachFile0' + i + 'Name') + '</a>';
                            lists += '</td>';
                            lists += '</tr>';
                            flag = 'Y';
                        }
                    }

                    if (flag == 'N') {
                        lists += '<tr><td class="notResult" colspan="20">등록된 파일이 없습니다.</td></tr>';
                    }
                }
            })
        }
        $('.BBSList tbody').html(lists)
//		findOpt();
//		pickerAct();//데이트피커 사용
    })
}

function changeStatus(apiName, seq, boardSeq, num) {
    if (confirm("수정 하시겠습니까?")) {
        var studyInputStatus = $('#studyInputStatus' + num).val();
        var content = $('#content' + num).val();
        $.ajax({
            url: apiName,
            type: 'POST',
            data: {
                'seq': seq,
                'changeStatus': 'Y',
                'studyInputStatus': studyInputStatus,
                'studyInputUserID': loginUserID,
                'content': content
            },
            dataType: 'text',
            success: function (data) {
                alert('변경되었습니다.');
                viewAct(boardSeq);
            },
            fail: function () {
                alert('변경에 실패하였습니다.')
            }
        })
    }
}

async function downloadAllFiles() {
    let tbody = document.getElementsByTagName('tbody')[0];
    let count = tbody.childElementCount;
    let aTag = tbody.getElementsByTagName('a');


    var zip = new JSZip();
    for (let i = 0; i < count; i++) {
        let fileName = aTag[i].innerText;
        let fileRes;
        let fileBlob;

        fileRes = await fetch(aTag[i].href);
        fileBlob = await fileRes.blob();
        zip.file(fileName, fileBlob);
    }

    zip.generateAsync({type: 'blob'})
        .then((resZip) => {
            const a = document.createElement('a');

            a.href = URL.createObjectURL(resZip);
            a.download = '일괄 다운로드';
            a.innerHTML = 'download';

            document.body.appendChild(a);
            a.click();

            // 메모리 누수 방지
            URL.revokeObjectURL(a.href);
        })
        .catch((error) => {
            console.log(error);
        });
}

function modalAct(apiName,modalSeq,type,afterAct){
    var modalWrite =''
    modalWrite +='<div id="modal"><div>';
    modalWrite +='<h1>비밀번호 확인<button type="button" onClick="modalClose()"><img src="../../images/admin/btn_close.png" alt="닫기" /></button></h1>';
    modalWrite +='<div><form class="chkPWD" action="javascript:chkPWD(\''+apiName+'\',\''+type+'\',\''+afterAct+'\')">';
    modalWrite +='<input type="hidden" name="seq" value="'+modalSeq+'">';
    modalWrite +='<input type="password" name="pwd">';
    modalWrite +='<div class="btnArea"><button type="button" onclick="chkPWD(\''+apiName+'\',\''+type+'\',\''+afterAct+'\')">비밀번호확인</button></div>';
    modalWrite +='</div></div>';
    $('#contents').after(modalWrite)
    modalAlign()
}

function chkPWD(apiName,type,afterAct){
    var sendCHKData = $('#modal form.chkPWD').serialize();
    var resultSeq = $('#modal input[name="seq"]').val();
    //공통선언 - 삭제
    if(type=="deletes"){
        $.ajax({
            url: apiName,
            type:'DELETE',
            data:sendCHKData+'delFileAll=Y',
            dataType:'text',
            success:function(data){
                alert(data)
                if(data == 'success'){
                    alert('삭제되었습니다.')
                    if(afterAct == 'comment'){
                        commentAct()
                    }else{
                        listAct()
                    }
                    modalClose();
                }else{
                    alert('비밀번호가 일치하지 않습니다.')
                }
            },
            fail:function(){
                alert('삭제에 실패하였습니다.')
            }
        })
    }else if(type=="viewCheck"){
        $.get(apiName,'boardCode='+boardCode+'&'+sendCHKData,function(data){
            if(data.result == 'error'){
                alert('비밀번호가 잘못되었습니다.')
            }else{
                viewAct(resultSeq);
                modalClose();
            }
        })
    }
}

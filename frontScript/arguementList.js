//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

if (loginUserID == "") {
    alert("로그인 후 이용 가능합니다.");
    top.location.href = "../main/";
}


//리스트 소팅
var categoryLink = ''//카테고리 사용시 선택 메뉴탭

// 과정 검색창
function listAct(listPage) {
    $('.BBSWrite').empty();
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
            useHitView = this.useHitView;
            memo = this.memo;

        })
    }).done(function () {
        $.get('../api/apiBoardPermit.php', {'boardCode': boardCode}, function (data) {
            $.each(data.boardPermit, function () {
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
    }).done(function () {
        $.get(useApi, {'boardCode': 20, 'titleSubject': 'Y', 'list':1000}, function (data) {
            //토론주제 소팅부분
            var tabMenu = '';
            var actionArea = '';
            actionArea += '<div class="searchArea" style="background:none;">';
            if (loginUserLevel < 8 && eval(boardMode) != 7) {
                actionArea += '<button style="width:100px;" type="button" class="fRight" onClick="writeAct()">토론주제 쓰기</button>';
            }
            actionArea += '</span></form></div>';
            if (pageMode == 'adminPage') {
                $('#contents > h1').after(actionArea);
            } else {
                $('#contentsArea').before(actionArea);
            }

            if (data.totalCount != 0) {
                var chkDay = new Date();
                var thisYear = chkDay.getFullYear();
                var thisMonth = chkDay.getMonth() + 1; //January is 0!
                if (thisMonth < 10) {
                    thisMonth = "0" + thisMonth;
                }
                var thisDay = chkDay.getDate();
                if (thisDay < 10) {
                    thisDay = "0" + thisDay;
                }
                var checkDate = thisYear + '-' + thisMonth + '-' + thisDay; // 오늘날짜
                var f = 0;
                $.each(data.board, function () {
                    var endDate = this.addItem01.split('~'); // 토론기간
                    tabMenu += '<form class="boardList' + f + '" action="javascript:boardList(' + f + ')">';
                    tabMenu += '<table class="searchForm debate_table">'
                    tabMenu += '<colgroup>';
                    tabMenu += '<col>';
                    tabMenu += '<col style="width:200px">';
                    tabMenu += '<col>';
                    tabMenu += '</colgroup>';
                    tabMenu += '<input type="hidden" name="addItem01" value="' + this.addItem01 + '">';
                    tabMenu += '<input type="hidden" name="addItem02" value="' + this.addItem02 + '">';
                    tabMenu += '<input type="hidden" name="boardCode" value="' + boardCode + '">';
                    tabMenu += '<input type="hidden" name="subject" value="' + this.subject + '">';
                    tabMenu += `<tr><th onclick="boardList('${f}','${checkDate}', '${endDate[0]}', '${endDate[1]}', '${this.seq}')">${this.subject}</th>`;
                    tabMenu += '<td>' + this.addItem01 + '</td>';
                    if (loginUserLevel < 7) {
                        tabMenu += '<td style="text-align:center;">참여글 <br/>(' + this.arguementCount + ')</td>';
                        tabMenu += '<td style="text-align:center;"><button onClick="deleteData(\'' + useApi + '\',' + this.seq + ');history.go(0);return false;" class="del">삭제하기</button>';
                        tabMenu += '<br/><button onClick="writeAct(' + this.seq + '); return false;">수정하기</button></td>';
                    } else {
                        tabMenu += '<td style="text-align:center;">참여글 <br/>(' + this.arguementCount + ')</td>';
                    }
                    tabMenu += '</tr></table>'
                    tabMenu += '</ul></form>'
                    f++;
                })
            } else {
                tabMenu += '<tr><td>등록된 주제가 없습니다.</td></tr>';
                tabMenu += '</table>'
            }
            $('#contentsArea').html(tabMenu);
            $('#contentsArea').addClass('debate');
            //pagerAct();
        })
    })
    $('#titleArea > h1').html('토론주제');
}


// function paramsToObject(entries) {
// 	const result = {}
// 	for(const [key, value] of entries) {
// 		result[key] = value;
// 	}
// 	return result;
// }
function boardList(f, chk, start, end, seq) {
    if (loginUserLevel > 7 && (start > chk || chk > end)) {
        alert("토론기간이 아닙니다.");
        return;
    }
    searchValue = $('.boardList' + f).serialize();
    // const urlParams = new URLSearchParams(searchValue);
    // const entries = urlParams.entries();
    // const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
    const url = location.origin + location.pathname;
    history.pushState('', '', url + '?' + searchValue);
    viewAct(seq);
    // location.href = '../study/arguementBoard.php?'+searchValue;
}




function listAct(listPage) {
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


            titleHtml = boardName + '<span>' + memo + '</span>';



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
            .done(function () {
                listPage = listPage ? listPage : 1;
                page = listPage;
                //상단 액션 부분

                $('#contents > h1').html(titleHtml);

                // 사업주 계약서 화면에서 넘어온 경우
                const urlParam = new URLSearchParams(window.location.search);
                if (urlParam.get('elecEmail')) {
                    writeAct('', {
                        elecEmail: urlParam.get('elecEmail'),
                        companyCode: urlParam.get('companyCode'),
                        companyName: urlParam.get('companyName'),
                    });

                    urlParam.delete('companyName');
                    urlParam.delete('companyCode');
                    urlParam.delete('elecEmail');

                    // 혹시 모를 오류 방지용, url 초기화
                    history.replaceState('', '', window.location.pathname + '?' + urlParam.toString())

                    return;
                }

                //상단 액션 부분
                if (useSearch == "Y") {
                    var actionArea = '';
                    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
                    actionArea += '<div>';
                    actionArea += '<button type="button" class="fRight" onClick="writeAct()">입과신청</button>';
                    actionArea += '<button type="button" class="fRight" onClick="printContents()">과정목록</button>';

                    actionArea += '<select name="searchType">';
                    actionArea += '<option value="company">사업주명</option>';
                    actionArea += '<option value="userName">작성자 이름</option>';
                    actionArea += '<option value="userID">작성자 아이디</option>';
                    actionArea += '<option value="subject">과정명</option>';
                    actionArea += '</select>&nbsp;';
                    actionArea += '<input name="searchValue" id="board9SearchVal" type="text" />&nbsp;';
                    actionArea += '<select name="searchDate">';
                    actionArea += '<option value="startDate">시작날짜</option>';
                    actionArea += '<option value="writeDate">작성날짜</option>';
                    actionArea += '</select>&nbsp;';
                    actionArea += '<input name="date" id="board9Date" type="text" placeholder="2000-11-11" onkeyup="inputYMDNumber(this)"></span>';
                    actionArea += '<span style="padding: 0 10px;">페이지 수</span>';
                    actionArea += '<select name="listCount" onchange="updateListCount(this.value);">';
                    actionArea += '<option value="10">10개</option>';
                    actionArea += '<option value="50">50개</option>';
                    actionArea += '<option value="100">100개</option>';
                    actionArea += '</select>';
                    actionArea += '<span style="padding: 0 5px;">정렬방법</span>';
                    actionArea += '<select name="order" id="listOrder">';
                    actionArea += '<option value="status" selected>처리순</option>';
                    actionArea += '<option value="input">등록순</option>';
                    actionArea += '</select>';
                    actionArea += `<span><button type="button" onClick="searchAct()">검색하기</button></span>`;
                    actionArea += '</div>';

                    actionArea += '<div>';
                    actionArea += '<span style="font-size:14px;">처리상태</span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'\')">전체</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'W\')">대기</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'C\')">접수</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'R\')">보완</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'N\')">처리중</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'Y\')">완료</button></span>';
                    if (loginUserLevel == 2) {
                        actionArea += '<span style="padding-left: 20px; font-size:14px;">일괄변경</span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'C\');">접수</button></span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'R\');">보완</button></span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'Y\');">완료</button></span>';
                    }
                    actionArea += '</div>';
                    actionArea += '</span></form></div>';

                    $('#contents > h1').after(actionArea);
                }

                //게시판 상단 제목열 세팅
                var contents = ''

                contents += '<table><thead><tr>';
                contents += '<th style="width:10%">번호</th>';
                if (useCategory == 'Y') {
                    contents += '<th style="width:10%;">카테고리</th>';
                }

                contents += '<th style="width:15%;">사업주명/과정명/날짜</th>';

                if (useName == 'Y') {
                    contents += '<th style="width:15%;">작성자</th>';
                }
                if (useDateView == 'Y') {
                    contents += '<th style="width:10%">작성일</th>';
                }

                contents += '<th style="width:10%">처리상태</th>';
                if (loginUserLevel == 2) {
                    contents += '<th style="width:10%">상태변경</th>';
                }

                contents += '</tr></thead><tbody>';
                contents += '</tbody></table>';


                $('#contentsArea').removeAttr('class')
                $('#contentsArea').addClass('BBSList')
                $('#contentsArea').html(contents);
                ajaxAct();
                pickerAct2();//데이트피커 사용

                document.getElementById('board9Date').addEventListener('keydown', (e) => {
                    if (e.keyCode == 13) {
                        searchAct();
                    }
                });

                document.getElementById('board9SearchVal').addEventListener('keydown', (e) => {
                    if (e.keyCode == 13) {
                        searchAct();
                    }
                });

            })
    })
}

function ajaxAct(sortDatas) {
    //게시물 소팅부분
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }
    let lists = '';
    param = 'boardCode=' + boardCode + '&page=' + page + '&list=' + listCount + sortData;
    let listAjax = $.get(useApi, param, function (data) {
        totalCount = data.totalCount;

        //입과 게시판
        let endDate = '';
        let sub = '';
        if (totalCount > 0) {
            var i = 1
            if (page == 1) {
                i = 1
            } else {
                i = page * listCount + 1
            }

            limit = (page - 1) * listCount;
            i = data.totalCount - limit;

            $.each(data.board, function () {
                lists += '<tr';
                if (this.status == 'Y') {
                    lists += ' style="background:#ecf0f1;"';
                }
                lists += '>';
                lists += '<td>' + i + '</td>';
                lists += '<td class="left" ';
                if (this.secret != "Y" || loginUserType == 'admin' || loginUserID == this.userID) {
                    lists += 'onclick="viewAct(' + this.seq + ')"';
                } else {
                    lists += 'onclick="modalAct(\'' + useApi + '\',' + this.seq + ',\'viewCheck\')"';
                }
                lists += ' style="cursor:pointer">';

                lists += '<strong>사업주명 : ' + this.company + '</strong><br>과정명 : ' + this.subject + '<br>' + this.addItem01 + ' ~ ' + this.addItem02;
                if (this.commentCount >= 1) {
                    lists += '&nbsp;&nbsp;<span>[' + this.commentCount + ']</span>'
                }
                if (this.attachFile01Name != null || this.attachFile02Name != null) {
                    lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
                }
                lists += '</td>';
                if (useName == 'Y') {
                    lists += '<td>' + this.userName + '<br>' + this.userID + '</td>';
                }
                if (useDateView == 'Y') {
                    lists += '<td>' + this.inputDate + '</td>';
                }

                if (this.status == 'N') { // 입과게시판 처리 상태
                    lists += '<td style="color:blue;">처리중</td>';
                } else if (this.status == 'Y') {
                    lists += '<td>입과완료</td>';
                } else if (this.status == 'C') {
                    lists += '<td style="color:green;">접수완료</td>';
                } else if (this.status == 'W') {
                    lists += '<td>대기</td>';
                } else if (this.status == 'R') {
                    lists += '<td style="color:red;">보완</td>';
                } else if (this.status == 'X') {
                    lists += '<td style="color:red;">입과취소</td>';
                }
                if (loginUserLevel == 2) {
                    lists += '<td>';
                    lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
                        'onclick="changeApplicationStatus(\'' + this.seq + '\', \'C\', \'L\')">접수</button>&nbsp;';
                    lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
                        'onclick="changeApplicationStatus(\'' + this.seq + '\', \'R\', \'L\')">보완</button>&nbsp;';
                    lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
                        'onclick="changeApplicationStatus(\'' + this.seq + '\', \'Y\', \'L\')">완료</button>';
                    lists += '</td>';
                }
                lists += '</tr>';
                i--
            })
        } else {
            lists += '<tr><td class="notResult" colspan="20">게시글이 없습니다.</td></tr>'
        }


        $('.BBSList tbody').html(lists)

        pagerAct();
        pageMaxUp();
    })

}

function printContents() {
    loadingAct();
    let modal = '';
    modal += '<div id="modal">';
    modal += '<div style="width:50%; height:90%; margin:auto; overflow-y: scroll;" class="BBSList">';
    modal += `<div style="position:sticky; top:0; text-align:right; background:#4d4d4f; padding-right:15px; overflow:hidden;"><img src="../images/admin/btn_close.png" alt="닫기" style="cursor:pointer;" onClick="modalClose()"></div>`;
    modal += `<div style="font-size:14px;">
	<form action="" method="" style="width:80%; display:flex; align-items:center;">
	<input type="hidden" name="printCon" value="Y">
	<span>과정 검색&nbsp;</span>
	<select name="searchType" style="padding: 5px 2px;">
	<option value="lecture16" selected>디지털융합</option>
	<option value="lecture07">의료기관</option>
	<option value="lecture10">영유아교사</option>
	<option value="lecture09">경비원직무</option>
	<option value="lecture01">경영리더십</option>
	<option value="lecture02">업무스킬</option>
	<option value="lecture08">일반직무</option>
	<option value="lecture04">IT</option>
	<option value="lecture05">자격증</option>
	<option value="lecture06">외국어</option>
	<option value="lecture11">스틸전문</option>
	<option value="lecture14">플립러닝</option>
	<option value="lecture17">전문직무</option>
	<option value="lecture18">직무</option>
	<option value="lecture19">소양</option>
	<option value="card">기업직업훈련카드</option>
	<option value="lecture03">산업안전</option>
	<option value="lecture12">일반비환급</option>
	</select>&nbsp;
	<input type="text" name="searchValue" style="padding: 5px 2px; width:30%;">&nbsp;
	<button type="button" style="background:#4d4d4f; color:white; border:none; height:29px;" onClick="searchContents(this);">검색</button></form></div>`;
    modal += '<table style="width:100%; text-align:center;">';
    modal += '<thead><tr><th style="width:40%;">과정명</th><th>표준훈련비</th><th style="width:10%;">지정한도 인원</th><th style="width:10%;">수강인원</th></tr></thead>';
    modal += '<tbody id="modalBody" style="font-size:14px;">';
    $.ajax({
        url: '../api/apiContents.php',
        method: 'GET',
        data: {printCon: 'Y', searchType: 'lecture16'},
        success: function (data) {
            if (data.totalCount != 0) {
                $.each(data.contents, function () {
                    modal += `<tr><td style="width:50%;"><span style="color:black;">${this.contentsName}</span>
				<button type="button" style="background:#4d4d4f; color:white; border-radius:3px;" onClick="copyColumn(this)">복사</button></td>`;
                    modal += `<td>${Number(this.selfPrice).toLocaleString()}원</td>`;
                    if (Number(this.applyLimit) === 0) {
                        modal += `<td style="width:10%; color:red;">미지정</td>`;
                    } else {
                        modal += `<td style="width:10%;">${this.applyLimit}</td>`;
                    }
                    modal += `<td>${this.currentStudy}</td></tr>`;
                })
            }

            modal += '</tbody>';
            modal += '</table>';
            modal += '</div>';
            modal += '</div>';
            $('#contents').after(modal);
            modalAlign();
            loadingAct();
        }
    })


}

function copyColumn(btn) {
    let context = $(btn).siblings()[0].innerHTML;
    console.log(context);
    navigator.clipboard.writeText(context)
        .then(() => {

        });
}

function searchContents(btn) {
    loadingAct();
    let modal = '';
    $.ajax({
        url: '../api/apiContents.php',
        method: 'GET',
        data: $(btn).parent().serialize(),
        success: function (data) {
            if (data.totalCount != 0) {
                $.each(data.contents, function () {
                    modal += `<tr><td style="width:50%;"><span style="color:black;">${this.contentsName}</span>
				<button type="button" style="background:#4d4d4f; color:white; border-radius:3px;" onClick="copyColumn(this)">복사</button></td>`;
                    modal += `<td>${Number(this.selfPrice).toLocaleString()}원</td>`;
                    if (Number(this.applyLimit) === 0) {
                        modal += `<td style="width:10%; color:red;">미지정</td>`;
                    } else {
                        modal += `<td style="width:10%;">${this.applyLimit}</td>`;
                    }
                    modal += `<td>${this.currentStudy}</td></tr>`;
                })
            } else {
                modal += '<tr><td class="noResult" colspan="10">검색결과가 없습니다.</td></tr>'
            }
            modal += '</table>';
            modal += '</div>';
            modal += '</div>';
            $('#modalBody').empty();
            $('#modalBody').html(modal);
            modalAlign();
            loadingAct();
        }
    })
}


function searchAct2(status) {
    searchValue = $('.searchForm').serialize();
    searchValue = '&' + searchValue;
    searchValue += '&status=' + status;
    page = 1;
    ajaxAct(searchValue);
}

function changeApplicationStatus(seq, status, flag) {
    if (!confirm("변경하시겠습니까?")) {
        return false;
    }
    loadingAct();
    $.ajax({
        url: useApi,
        method: 'POST',
        data: {seq: seq, status: status, boardCode: '16'},
        async: false,
        success: function (data) {
            if (data.result == 'success') {
                alert('변경됐습니다.');
                if (flag == 'L') {
                    ajaxAct(param);
                } else if (flag == 'V') {
                    viewAct(seq);
                }
            } else {
                alert('오류가 발생했습니다.');
            }
            loadingAct();
        }

    });
}

function changeAllStatus(status) {
    let searchValue = document.getElementsByName('searchValue')[0].value;
    let dates = document.getElementsByName('date')[0].value;

    if (searchValue == '' && dates == '') {
        alert("검색 후 일괄 변경 가능합니다.");
        return false;
    }

    if (!confirm("일괄 변경 하시겠습니까? ")) {
        return false;
    }

    loadingAct();
    $.ajax({
        url: useApi,
        method: "PUT",
        data: param + '&status=' + status,
        async: false,
        success: function (data) {
            if (data.result == 'success') {
                alert('변경 성공');
            } else {
                alert('오류가 발생했습니다.');
            }
            ajaxAct(param);
            loadingAct();
        }
    });
}

function updateListCount(value) {
    listCount = value;
}
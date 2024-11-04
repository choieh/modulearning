//보드 정보 선언
var sortData = '';
var useApi = '../api/apiTutorFee.php';
var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = '';
var seq = seq ? seq : '';
var page = page ? page : 1;

function listAct(page) {
    //상단 액션 부분
    var actionArea = '';
    var sort01 = '';
    var today = new Date();

    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()"  >';
    actionArea += '<div class="searchChangeArea">';
    actionArea += '<span>기간</span><select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
    var i = '';
    var thisYear = today.getFullYear();
    for (i = 2015; i <= thisYear; i++) {
        if (i != thisYear) {
            actionArea += '<option value=' + i + '>' + i + '년</option>';
        } else {
            actionArea += '<option selected="selected" value=' + i + '>' + i + '년</option>';
        }
    }
    actionArea += '</select>';
    actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
    var j = '';
    var thisMon = today.getMonth() + 1;
    for (j = 1; j <= 12; j++) {
        if (j != thisMon) {
            actionArea += '<option value=' + j + '>' + j + '월</option>';
        } else {
            actionArea += '<option selected="selected" value=' + j + '>' + j + '월</option>';
        }
    }
    actionArea += '</select>';
    actionArea += '&nbsp;&nbsp;&nbsp;<button style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>';
    actionArea += '<button type="button" onClick="excelAct()" >엑셀 다운로드</button>';
    actionArea += '</div>';
    actionArea += '</form></div>';
    $('#contents > h1').after(actionArea);
    $('#contents').removeAttr('class');
    $('#contents').addClass('BBSWrite');

    //게시물 소팅부분
    var contents = '';
    contents += '<div class="scrollArea" style="min-width:1360px; height:900px; overflow:auto; white-space:nowrap">';
    contents += '<table style=""><thead><tr>';
    contents += '<th style="width:40px;">번호</th>';
    contents += '<th>첨삭자</th>';
    contents += '<th>과정명</th>';
    contents += '<th>수강기간</th>';
    contents += '<th>첨삭인원</th>'
    contents += '<th>첨삭료</th>';
    contents += '</tr></thead><tbody>';
    contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>';
    contents += '</tbody></table>';

    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
}


function ajaxAct(sortData) {
    loadingAct();
    sortData = sortData ? sortData : '';
    var listAjax = $.get(useApi, sortData, function (data) {
        totalCount = data.totalCount;
        var tutorCount = data.tutorCount;
        var lists = '';
        var tutor = '';
        var totalTutorFee = 0;
        var userName = '';
        var mobile = '';
        var bank = '';
        var bankNum = '';
        var tax01 = 0;
        var tax02 = 0;
        var realFee = 0;
        var i = 1;
        if (totalCount != 0) {
            $.each(data.tutors, function () {
                if (i != 1 && tutor != this.tutor) {
                    // 2024.08.22 세법 변경으로 금액이 적어도 소득세, 주민세 발생
                    // if (totalTutorFee >= 30000){
                    // 	tax01 = Math.floor(totalTutorFee * 0.03 / 10) * 10;
                    // 	tax02 = Math.floor(tax01 * 0.1 / 10) * 10;
                    // 	realFee = Math.floor((totalTutorFee - tax01 - tax02) / 10) * 10;
                    // } else {
                    // 	tax01 = 0;
                    // 	tax02 = 0;
                    // 	realFee = Math.floor(totalTutorFee / 10) * 10;
                    // }

                    tax01 = Math.floor(totalTutorFee * 0.03 / 10) * 10;
                    tax02 = Math.floor(tax01 * 0.1 / 10) * 10;
                    realFee = Math.floor((totalTutorFee - tax01 - tax02) / 10) * 10;

                    lists += '<tr>';
                    lists += '<td colspan=30>';
                    lists += `<b>수수료</b> : ${Number(totalTutorFee).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>소득세</b> : ${Number(tax01).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>주민세</b> : ${Number(tax02).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>실지급액</b> : ${Number(realFee).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>이름</b> : ${userName}&nbsp;&nbsp;&nbsp;&nbsp;<b>번호</b> : ${mobile}&nbsp;&nbsp;&nbsp;&nbsp;<b>은행</b> : ${bank}&nbsp;&nbsp;&nbsp;&nbsp;<b>계좌</b> : ${bankNum}`;
                    lists += '</td>';
                    lists += '</tr>';
                    userName = this.userName;
                    mobile = this.mobile;
                    bank = this.bank;
                    bankName = this.bankNum;
                    tutor = this.tutor;
                    totalTutorFee = 0;
                    totalTutorFee += this.tutorFee;

                    lists += '<tr>';
                    lists += `<td>${i}</td>`;
                    lists += `<td>${this.userName}</td>`;
                    lists += `<td>${this.contentsName}</td>`;
                    lists += `<td>${this.lectureStart}~${this.lectureEnd}</td>`;
                    lists += `<td>${this.totalUser}명</td>`;
                    lists += `<td>${Number(this.tutorFee).toLocaleString('ko-KR')}</td>`;
                    lists += '</tr>';
                    i++;
                } else {
                    lists += '<tr>';
                    lists += `<td>${i}</td>`;
                    lists += `<td>${this.userName}</td>`;
                    lists += `<td>${this.contentsName}</td>`;
                    lists += `<td>${this.lectureStart}~${this.lectureEnd}</td>`;
                    lists += `<td>${this.totalUser}명</td>`;
                    lists += `<td>${Number(this.tutorFee).toLocaleString('ko-KR')}</td>`;
                    lists += '</tr>';

                    userName = this.userName;
                    mobile = this.mobile;
                    bank = this.bank;
                    bankNum = this.bankNum;
                    totalTutorFee += this.tutorFee;
                    tutor = this.tutor;
                    i++;
                }

                if (i == data.tutors.length + 1) {
                    if (totalTutorFee >= 30000) {
                        tax01 = Math.floor(totalTutorFee * 0.03 / 10) * 10;
                        tax02 = Math.floor(tax01 * 0.1 / 10) * 10;
                        realFee = Math.floor((totalTutorFee - tax01 - tax02) / 10) * 10;
                    } else {
                        tax01 = 0;
                        tax02 = 0;
                        realFee = Math.floor(totalTutorFee / 10) * 10;
                    }
                    lists += '<tr>';
                    lists += '<td colspan=30>';
                    lists += `<b>수수료</b> : ${Number(totalTutorFee).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>소득세</b> : ${Number(tax01).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>주민세</b> : ${Number(tax02).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>실지급액</b> : ${Number(realFee).toLocaleString('ko-KR')}&nbsp;&nbsp;&nbsp;&nbsp;`;
                    lists += `<b>이름</b> : ${userName}&nbsp;&nbsp;&nbsp;&nbsp;<b>번호</b> : ${mobile}&nbsp;&nbsp;&nbsp;&nbsp;<b>은행</b> : ${bank}&nbsp;&nbsp;&nbsp;&nbsp;<b>계좌</b> : ${bankNum}`;
                    lists += '</td>';
                    lists += '</tr>';
                }
            });

            lists += '<tr>';
//			lists += '<td colspan=30><span style="font-size:medium; color:black;">총 수강인원 : '+allUser.toLocaleString('ko-KR')+'명</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 수강비 : '+allPrice.toLocaleString('ko-KR')+'원</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 자부담비 : '+allSelfPrice.toLocaleString('ko-KR')+'원</span></td>'
            lists += '</tr>';
            $('.BBSList tbody').html(lists);
            loadingAct();
        } else {
            alert('검색 결과가 없습니다.');
            loadingAct();
        }

    });
}

function excelAct() {
    let searchValue = $('.searchForm').serialize();
    serarchValue = '&' + searchValue;
    top.location.href = 'tutorFeeExcel.php?' + searchValue;
}


function searchStudy(types, vals) {
    if (types == 'lectureDay') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"], select[name="autoContentsCode"]').remove();
        var dateChain = ''
        dateChain += $('select[name="searchYear"]').val().replace('년', '') + '-';
        if (eval($('select[name="searchMonth"]').val().replace('월', '')) < 10) {
            dateChain += '0' + $('select[name="searchMonth"]').val().replace('월', '');
        } else {
            dateChain += $('select[name="searchMonth"]').val().replace('월', '');
        }
    }
}



// 월 마감 데이터 리스트
let today = new Date();
page = page ? page : 1;

async function listAct(page) {
    document.getElementById('contentsArea').innerHTML = '';
    const table = document.getElementById('table').value;
    let actionArea = '';
    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';

    if (table == 'study') {
        actionArea += '<div class="searchChangeArea">'
        actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';
        actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
        actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchAcademy" value="searchAcademy" onChange="searchTypeSelect(this.value)" /><label for="searchAcademy">연합회검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';

        actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                actionArea += '<option>' + i + '년</option>';
            } else {
                actionArea += '<option selected="selected">' + i + '년</option>';
            }
        }
        actionArea += '</select>';
        actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        actionArea += `<option value="0">전체</option>`;
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                actionArea += '<option>' + h + '월</option>';
            } else {
                actionArea += '<option selected="selected">' + h + '월</option>';
            }

        }
        actionArea += '</select>';
        actionArea += '</div>';
        actionArea += '<div>';
        actionArea += '<span>이름,ID</span>';
        actionArea += '<select name="searchType">';
        actionArea += '<option value="searchUserName">수강생</option>';
        actionArea += '<option value="searchMarketer">영업담당자</option>';
        actionArea += '<option value="searchTutor">교강사</option>';
        actionArea += '</select>';
        actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';
        actionArea += '<span>진도율</span>';
        actionArea += '<input type="text" style="width:50px;" name="progress01">% ~ <input type="text" style="width:50px;" name="progress02">%';
        actionArea += '<span>첨삭정렬</span>';
        actionArea += '<select name="correct">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="Y">첨삭 완료</option>';
        actionArea += '<option value="N">첨삭 미완료</option>';
        actionArea += '</select>';
        actionArea += '<span>수료여부</span>';
        actionArea += '<select name="passOK">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="Y">수료</option>';
        actionArea += '<option value="N">미수료</option>';
        actionArea += '</select>';

        actionArea += '<span>환급여부</span>';
        actionArea += '<select name="serviceType">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="1">환급(사업주)</option>';
        actionArea += '<option value="3">비환급(일반)</option>';
        actionArea += '<option value="5">비환급(평가있음)</option>';
        actionArea += '</select>';
        actionArea += '</div>';
        actionArea += '<div>';
        actionArea += '<span>과정명</span>';
        actionArea += '<input type="text" style="width:570px;" name="contentsName">';
        actionArea += '<span>과정코드</span>';
        actionArea += '<input type="text" style="width:100px;" name="contentsCode">';
        actionArea += '<span>재응시내역</span>';
        actionArea += '<select name="reTestStatus">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="Y">있음</option>';
        actionArea += '<option value="N">없음</option>';
        actionArea += '</select>';
        actionArea += '<span>페이지 수</span>';
        actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
        actionArea += '<option value="10">10개</option>';
        actionArea += '<option value="30">30개</option>';
        actionArea += '<option value="50">50개</option>';
        actionArea += '<option value="100">100개</option>';
        actionArea += '<option value="150">150개</option>';
        actionArea += '<option value="200">200개</option>';
        actionArea += '<option value="300">300개</option>';
        actionArea += '</select>';
        actionArea += ' <button type="button" onClick="excelAct3()" style="margin-left:10px">엑셀 다운로드</button>';
        actionArea += ' <button type="button" onClick="excelAct2()" style="margin-left:10px">진도현황 다운로드</button>';
        actionArea += '</div>';
        actionArea += '<button type="submit" style="width:100%">검색</button>';
    } else if (table == 'company') {
        actionArea += '<select name="searchType">';
        actionArea += '<option value="companyName">사업주명</option>';
        actionArea += '<option value="companyCode">사업자번호</option>';
        actionArea += '<option value="ceoName">대표자명</option>';
        actionArea += '<option value="marketerName">영업담당자</option>';
        actionArea += '<option value="phone">연락처</option>';
        actionArea += '</select>&nbsp;';
        actionArea += '<input type="text" name="searchValue" />&nbsp;';
        actionArea += '<button type="button" onClick="searchAct()">검색하기</button>';
    } else if (table == 'contents') {
        let data = await getSort();
        let optSort01 = '';
        optSort01 += '<option value="">전체</option>';
        $.each(data.category, function () {
            optSort01 += '<option value="' + this.value01 + '">';
            optSort01 += this.value02;
            optSort01 += '</option>'
        })
        actionArea += '<div>';
        actionArea += '<select name="searchType">';
        actionArea += '<option value="contentsName">과정명</option>';
        actionArea += '<option value="contentsCode">과정코드</option>';
        actionArea += '<option value="cp">CP사</option>';
        actionArea += '<option value="chapterName">차시명</option>';
        actionArea += '</select>&nbsp;';
        actionArea += '<input type="text" name="searchValue" />&nbsp;';
        actionArea += '<span style="margin-left:40px;">서버위치</span>';
        actionArea += '<select name="server">';
        actionArea += '<option value="">전체';
        actionArea += '<option value="cont0">0서버';
        actionArea += '<option value="cont2">2서버';
        actionArea += '<option value="cont3">3서버';
        actionArea += '<option value="cont4">4서버';
        actionArea += '<option value="cont5">5서버';
        actionArea += '<option value="cont6">6서버';
        actionArea += '<option value="cont7">7서버';
        actionArea += '<option value="cont8">8서버';
        actionArea += '</select>';

        actionArea += '<span style="margin-left:40px;">과정분류</span>';
        actionArea += '<select name="sort01" onchange="changeSort2(this);ajaxAct(' + page + ',this,\'\')">' + optSort01 + '</select>';

        if (sort01 != '') {
            actionArea += '<span style="margin-left:40px;">과정분류</span>';
            actionArea += '<input type="hidden" name="sort01">';
        }

        if (loginUserLevel <= 3) {
            actionArea += '<span style="margin-left:40px;">공개여부</span>';
            actionArea += '<select name="enabled" onchange="searchAct()">';
            actionArea += '<option value="">전체</option>';
            actionArea += '<option value="Y">공개</option>';
            actionArea += '<option value="N">비공개</option>';
            actionArea += '</select>&nbsp;';

            /*actionArea += '<span style="margin-left:40px;">운영여부</span>';
            actionArea += '<select name="used" onchange="searchAct()">';
            actionArea += '<option value="">전체</option>';
            actionArea += '<option value="Y">운영</option>';
            actionArea += '<option value="N">비운영</option>';
            actionArea += '</select>&nbsp;';*/

            actionArea += '<span style="margin-left:40px;">훈련유형</span>';
            actionArea += '<select name="serviceType" >';
            actionArea += '<option value="">전체</option>';
            actionArea += '<option value="1">환급</option>';
            actionArea += '<option value="3">비환급</option>';
            actionArea += '</select>&nbsp;';

            actionArea += '<span style="margin-left:40px;">심사차수</span>';
            actionArea += '<select name="simsaChapterY" onchange="searchAct()">';
            actionArea += '<option value="">전체 (연도)</option>';
            for (var nowYear = new Date().getFullYear(); nowYear >= 2016; nowYear--) {
                actionArea += '<option value="' + nowYear + '">' + nowYear + '년</option>';
            }
            actionArea += '<option value="0">해당없음</option>';
            actionArea += '</select>';
            actionArea += '<select name="simsaChapterC" onchange="searchAct()">'
            actionArea += '<option value="">전체 (차수)</option>';
            for (var c = 1; c < 10; c++) {
                actionArea += '<option value="' + c + '">' + c + '차</option>';
            }
            actionArea += '<option value="0">해당없음</option>';
            actionArea += '</select>';
        }
        actionArea += '</div>';
        actionArea += '<div>';
        actionArea += '<span>페이지 수</span>';
        actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
        actionArea += '<option value="10">10개</option>';
        actionArea += '<option value="30">30개</option>';
        actionArea += '<option value="50">50개</option>';
        actionArea += '<option value="100">100개</option>';
        actionArea += '<option value="150">150개</option>';
        actionArea += '<option value="200">200개</option>';
        actionArea += '</select>';
        actionArea += '<span>훈련카드</span>';
        actionArea += '<select name="trainingCard">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="Y">지원</option>';
        actionArea += '<option value="N">미지원</option>';
        actionArea += '</select>&nbsp;';
        actionArea += '<button type="submit">검색하기</button>';
        actionArea += '</div>';
        actionArea += '</div>&nbsp;';
        actionArea += '</div>';

    }
    actionArea += '</form></div>';
    const contentsArea = document.getElementById('contentsArea');
    contentsArea.insertAdjacentHTML('beforeEnd', actionArea);
    addYearSelect();
    addMonthSelect();
    addSearchBtn();

    let contents = '';
    if (table == 'study') {
        contents += '<table><thead><tr>';
        contents += '<th style="width:50px;">구분번호</th>';
        contents += '<th style="width:180px;">사업주</th>';
        contents += '<th style="width:180px;">영업자</th>';
        contents += '<th style="width:80px;">ID<br />이름</th>';
        contents += '<th style="width:310px;">과정명<br />수강기간</th>';
        contents += '<th style="width:100px">수료여부</th>';
        contents += '</tr></thead><tbody>';
        contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>';
        contents += '</tbody></table>';
    } else if (table == 'company') {
        contents += '<table><thead><tr>';
        contents += '<th style="width:50px;">구분번호</th>';
        contents += '<th style="width:120px;">사업자번호</th>';
        contents += '<th style="width:120px;">고용관리번호</th>';
        contents += '<th style="width:120px;">사업주명</th>';
        contents += '<th style="width:100px;">영업담당자</th>';
        contents += '</tr></thead><tbody>';
        contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>';
        contents += '</tbody></table>';
    } else if (table == 'contents') {

    }

    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    contentsArea.insertAdjacentHTML('beforeend', contents);
}

function ajaxAct(sortDatas) {
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }

    const table = document.getElementById('table').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    fetch(useApi + `?table=${table}&year=${year}&month=${month}&page=${page}
                &list=${listCount}&serviceType=${serviceType}${sortData}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            totalCount = data.result.totalCount;
            nextCount = data.result.nextCount;
            nowPage = data.result.nowPage;
            console.log(nowPage);
            let lists = '';
            let serviceType = '';
            if (totalCount > 0) {
                data.result.list.forEach(ele => {

                    switch (ele.serviceType) {
                        case 1:
                            serviceType = '사업주';
                            break;

                        case 2:
                            serviceType = '내배카';
                            break;

                        case 3:
                            serviceType = '비환급';
                            break;

                        case 5:
                            serviceType = '산업안전';
                            break;

                        case 9:
                            serviceType = '테스트';
                            break;

                        default:
                            serviceType = '오류';
                            break;
                    }

                    lists += '<tr>';
                    lists += `<td>${ele.seq}<br>${serviceType}</td>`;
                    lists += `<td>${ele.companyName}<br>${ele.applySeq}</td>`;
                    lists += `<td>${ele.marketerName}</td>`;
                    lists += `<td>${ele.userID}<br>${ele.userName}</td>`;
                    lists += `<td>${ele.contentsName}<br>${ele.lectureStart} ~ ${ele.lectureEnd}</td>`;
                    lists += `<td>${ele.passOK}</td>`;
                    lists += '</tr>';
                });
            } else {
                lists += '<tr><td class="notResult" colspan="12">검색 결과가 없습니다.</td></tr>'
            }

            $('.BBSList tbody').html(lists);
            pagerAct();
            loadingAct();
        })
}


function searchTypeSelect(types, searchDayType) {

    $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .searchArea div.searchChangeArea span').remove();
    var chageSearch = ''
    if (types == 'searchDate') {
        chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        var today = new Date();
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option>' + i + '년</option>';
            } else {
                chageSearch += '<option selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>';
        chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                chageSearch += '<option>' + h + '월</option>';
            } else {
                chageSearch += '<option selected="selected">' + h + '월</option>';
            }

        }
        chageSearch += '</select>';
    } else if (types == 'searchCompany') {
        chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
    } else if (types == 'searchAcademy') {
        chageSearch += '<span>지회구분</span>';
        chageSearch += '<select name="bigCountry">';
        chageSearch += '<option value="sjhy">세종</option>';
        chageSearch += '<option value="djhy">대전</option>';
        chageSearch += '<option value="cnhy">충남</option>';
        chageSearch += '<option value="cbhy">충북</option>';
        chageSearch += '<option value="kwhy">강원</option>';
        chageSearch += '<option value="jnhy">전남</option>';
        chageSearch += '</select>';
        chageSearch += '&nbsp;<input type="text" name="searchAcCompany">';
        chageSearch += '<select name="searchYear">';
        var today = new Date();
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option>' + i + '년</option>';
            } else {
                chageSearch += '<option selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>'
        chageSearch += '<select name="searchMonth">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        chageSearch += '<option value="0">전체</option>';
        for (h = 1; h <= 12; h++) {
            if (h != 1) {
                chageSearch += '<option>' + h + '월</option>';
            } else {
                chageSearch += '<option selected="selected">' + h + '월</option>';
            }
        }
        chageSearch += '</select>';
    }
    $('.searchArea div.searchChangeArea').append(chageSearch)
    if (types == 'searchDate') {
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth() + 1; //January is 0!
        if (thisMonth <= 9) {
            thisMonth = '0' + thisMonth;
        }
        var checkDate = thisYear + '-' + thisMonth;
        searchStudy('lectureDay', checkDate, searchDayType)
    }
    //actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types, vals, searchDayType) {
    if (searchDayType == '') {
        searchDayType = $('select[name="searchDayType"]').val();
    }
    if (types == 'lectureDay') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
        var dateChain = ''
        dateChain += $('select[name="searchYear"]').val().replace('년', '') + '-';
        if (eval($('select[name="searchMonth"]').val().replace('월', '')) < 10) {
            dateChain += '0' + $('select[name="searchMonth"]').val().replace('월', '');
        } else {
            dateChain += $('select[name="searchMonth"]').val().replace('월', '');
        }
        $.get(chainsearchApi, {
            'searchMode': types,
            'searchDay': dateChain,
            'searchDayType': searchDayType
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.lectureStart + '~' + this.lectureEnd + '">' + this.lectureStart + '~' + this.lectureEnd + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="searchMonth"]').after(selectWrite)
        })
    } else if (types == 'company') {
        $('select[name="companyCode"], strong.noticeSearch').remove();
        var searchName = vals.value
        if (searchName != '' && searchName != ' ') {
            $.get(chainsearchApi, {
                'searchMode': types,
                'searchName': searchName
            }, function (data) {
                var selectWrite = ''
                if (data.totalCount != 0) {
                    $('select[name="companyCode"]').remove();
                    selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
                    selectWrite += '<option value="">사업주를 선택하세요</option>'
                    $.each(data.searchResult, function () {
                        selectWrite += '<option value="' + this.searchCode + '">' + this.searchName + '&nbsp;|&nbsp;' + this.searchCode + '</option>';
                    })
                    selectWrite += '</select>'
                } else {
                    selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
                }
                $('input[name="searchCompany"]').after(selectWrite)

            })
        } else {
            $('.searchChangeArea select, strong.noticeSearch').remove();
        }
    } else if (types == 'printCompany') {
        $('strong.noticeSearch, select[name="companyCode"],select[name="contentsCode"]').remove();
        var searchDate = vals.value
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'lectureDay': searchDate
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct()">';
                selectWrite += '<option value="">사업주를 선택하세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.companyCode + '/' + searchDate + '">' + this.companyName + '&nbsp;|&nbsp;' + this.companyCode + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    } else if (types == 'printContents') {
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var companyCode = vals.value;

        $.get(chainsearchApi, {
            'searchMode': 'study',
            'companyCode': companyCode,
            'type': 'contents'
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.contentsCode + '">' + this.contentsName + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    } else if (types == 'printDate') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
        var companyCode = vals.value;
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'companyCode': companyCode
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + companyCode + '/' + this.lectureStart + '~' + this.lectureEnd + '">' + this.lectureStart + '~' + this.lectureEnd + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    } else if (types == 'printContents2') {
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var searchDate = vals.value;
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'lectureDate': searchDate,
            'type': 'contents'
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.contentsCode + '">' + this.contentsName + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    }
}

function changeSort2(obj) {
    //obj = obj.options[obj.selectedIndex].value;
    sort02s = '';
    $('select[name="sort02"]').remove();
    if (obj != '') {
        $.get(categoryApi, {'value01': obj}, function (data) {
            var selectWrite = '';
            selectWrite += '<select name="sort02" onchange="ajaxAct(' + page + ',\'\',this)">';
            selectWrite += '<option value="">소분류</option>';
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.value01 + '">';
                selectWrite += this.value02;
                selectWrite += '</option>';
            })
            selectWrite += '</select>';
            $('input[name="sort01"]').after(selectWrite);
        })
    }
}

async function getSort() {
    const res = await fetch(categoryApi + `?value01=lectureCode`, {
        method: 'GET'
    });

    return res.json();
}


function addYearSelect() {
    if (document.getElementById('year')) return;

    const tableSearch = document.getElementById('tableSearch');
    var thisYear = today.getFullYear();

    let selectYear = '<select id="year" name="year" style="height: 21px;">';
    for (var i = 2015; i <= thisYear; i++) {
        if (i != thisYear) {
            selectYear += `<option value="${i}">${i}년</option>`;
        } else {
            selectYear += `<option value="${i}" selected="selected">${i}년</option>`;
        }
    }
    selectYear += '</select>';
    tableSearch.insertAdjacentHTML('beforeend', selectYear);
}

function addMonthSelect() {
    if (document.getElementById('month')) return;

    const tableSearch = document.getElementById('tableSearch');
    var thisMonth = today.getMonth() + 1; //January is 0!

    let selectMonth = '<select id="month" name="month" style="height: 21px;">';
    for (var i = 1; i <= 12; i++) {
        selectMonth += `<option value="${i}">${i}월</option>`;
    }
    selectMonth += '</select>';
    tableSearch.insertAdjacentHTML('beforeend', selectMonth);
}

function addSearchBtn() {
    if (document.getElementById('searchBtn')) return;

    const tableSearch = document.getElementById('tableSearch');
    let btn = `<button id="searchBtn" type="button" onclick="checkExist()">선택하기</button>`;
    tableSearch.insertAdjacentHTML('beforeend', btn);
}

function checkExist() {
    const table = document.getElementById('table').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    fetch(useApi + `?check=Y&table=${table}&year=${year}&month=${month}`, {
        method: 'GET'
    })
        .then( res => res.json())
        .then( data => {
            if (data.result == 'none') {
                alert('해당 기간 데이터가 존재하지 않습니다.');
            } else if (data.result == 'success') {
                alert('변경됐습니다.');
                listAct();
            }
        })
}
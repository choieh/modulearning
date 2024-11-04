const categoryApi = '../api/apiCategory.php';
const chainsearchApi = '../api/apiSearch2.php';
const useApi = '../api/checkHrdPriceData.php';

function listAct() {
    //상단 액션 부분
    var actionArea = '';
    var today = new Date();
    actionArea += `<div># 파일 업로드 시에 수강기간, 과정 선택 후 업로드하세요.</div>`;
    actionArea += `<div class="searchArea"><form id="searchForm" class="searchForm" action="javascript:searchAct()"  >`;
    actionArea += '<div class="searchChangeArea">';
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>';
    actionArea += `<input type="radio" name="selectSearch" id="searchHrdrDate" value="searchHrdrDate" onChange="searchTypeSelect(this.value)"><label for="searchHrdrDate">환급일검색</label>&nbsp;&nbsp;&nbsp;`;

    // actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';

    actionArea += `<select name="searchYear" onchange="searchStudy2('lectureDay', 1)">`;
    var i = '';
    var thisYear = today.getFullYear();
    for (i = 2015; i <= thisYear; i++) {
        if (i != thisYear) {
            actionArea += '<option value=' + i + '>' + i + '년</option>';
        } else {
            actionArea += '<option value=' + i + ' selected="selected">' + i + '년</option>';
        }
    }
    actionArea += '</select>';
    actionArea += `<select name="searchMonth" onchange="searchStudy2('lectureDay', 1)">`;
    var h = '';
    var thisMonth = today.getMonth() + 1; //January is 0!
    for (h = 1; h <= 12; h++) {
        if (h != thisMonth) {
            actionArea += '<option value=' + h + '>' + h + '월</option>';
        } else {
            actionArea += '<option value=' + h + ' selected="selected">' + h + '월</option>';
        }

    }
    actionArea += '</select>';
    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += `<span>이름: </span><input type="text" name="userName">&nbsp;&nbsp;`;
    actionArea += `<button id="searchBtn" style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>`;
    actionArea += `<button type="button" onclick="excelAct()">엑셀 다운로드</button>`;
    actionArea += '</div>';
    actionArea += '</form></div>';
    actionArea += '<h2>파일 업로드</h2>'
    actionArea += `<form class="fileUploadform" method="post" action="./uploadHrdPriceExcel.php" enctype="multipart/form-data" style="margin-bottom:16px;">`;
    actionArea += '<ul>';
    actionArea += '<li>';
    actionArea += '<h1>파일등록</h1>';
    actionArea += `<input type="hidden" name="lectureStart" value="">`;
    actionArea += `<input type="hidden" name="lectureEnd" value="">`;
    actionArea += `<input type="hidden" name="contentsCode" value="">`;
    actionArea += `<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>`;
    actionArea += '</li>';
    actionArea += '</ul>';
    actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
    actionArea += '</form>';
    $('#contents > h1').after(actionArea);
    $('#contents').removeAttr('class');
    $('#contents').addClass('BBSWrite');

    var contents = '';
    contents += '<div class="scrollArea" style="min-width:1360px; height:900px; overflow:auto; white-space:nowrap">';
    contents += '<table style=""><thead><tr>';
    contents += '<th style="width:40px;">번호</th>';
    contents += '<th style="width:100px">이름/아이디</th>';
    contents += '<th style="width:100px">고용보험 취득/상실일</th>';
    contents += '<th style="width:100px">입과번호</th>';
    contents += '<th style="width:300px;">학습기간/과정명</th>';
    contents += '<th style="width:200px;">회사명</th>';
    contents += '<th style="width:200px;">영업자</th>';
    contents += '<th style="width:100px;">수강비</th>';
    contents += '<th style="width:100px;">환급일</th>';
    contents += '</tr></thead><tbody>'	;
    contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>'	;
    contents += '</tbody></table>';

    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);

    //게시물 소팅부분

    var thisYear = today.getFullYear();
    var thisMonth = today.getMonth() + 1; //January is 0!
    if (thisMonth <= 9) {
        thisMonth = '0' + thisMonth;
    }
    var checkDate = thisYear + '-' + thisMonth;
    // searchStudy('lectureDay', checkDate)
    searchStudy2('lectureDay', 1);

}

async function ajaxAct() {
    loadingAct();
    const data = await getData();

    let lists = '';
    if (data.totalCount > 0) {
        Array.from(data.study).forEach( study => {
            let acquisitionDate = study.acquisitionDate ?? '-';
            let lossDate = study.lossDate ?? '-';
            let hrdrPrice = study.hrdrPrice ?? '-';
            let hrdrDate = study.hrdrDate ?? '-';
            let highMarketer = study.highMarketer ?? '-';
            let highMarketerString = '영업팀장: 없음<br>';

            if (acquisitionDate != '-') {
                acquisitionDate = moment(acquisitionDate).format(`YYYY-MM-DD`);
            }

            if (lossDate != '-') {
                lossDate = moment(lossDate).format(`YYYY-MM-DD`);
            }

            if (hrdrDate != '-') {
                hrdrDate = moment(hrdrDate).format(`YYYY-MM-DD`);
            }

            if (highMarketer != '-') {
                highMarketerString = '';
                highMarketer.split(',').forEach( m => {
                    highMarketerString += `영업팀장: ${m}<br>`;
                })
            }

            lists += '<tr>';
            lists += `<td>${study.seq}</td>`;
            lists += `<td>${study.userName}<br>${study.userID}</td>`;
            lists += `<td>취득:${acquisitionDate}<br>상실:${lossDate}</td>`;
            lists += `<td>${study.applySeq}</td>`;
            lists += `<td>${study.lectureStart}~${study.lectureEnd}<br>${study.contentsName}</td>`;
            lists += `<td>${study.companyName}<br>${study.companyCode}</td>`;
            lists += `<td>${highMarketerString}영업담당자: ${study.marketer}</td>`;
            lists += `<td>${hrdrPrice}</td>`;
            lists += `<td>${hrdrDate}</td>`;
            lists += '</tr>';
        })
        // lists += '';
    } else {
        lists += '<tr><td colspan=30>검색결과가 없습니다.</td></tr>'
    }
    $('.BBSList tbody').html(lists);
    loadingAct();
}

function searchTypeSelect(types, searchDayType) {

    $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .searchArea div.searchChangeArea span').remove();
    var chageSearch = ''
    if (types == 'searchDate') {
        // chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        chageSearch += `<select name="searchYear" onchange="searchStudy2('lectureDay', 1)">`;
        var today = new Date();
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option value=' + i + '>' + i + '년</option>';
            } else {
                chageSearch += '<option value=' + i + ' selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>';
        // chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        chageSearch += `<select name="searchMonth" onchange="searchStudy2('lectureDay', 1)">`;
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                chageSearch += '<option value=' + h + '>' + h + '월</option>';
            } else {
                chageSearch += '<option value=' + h + ' selected="selected">' + h + '월</option>';
            }

        }
        chageSearch += '</select>';
    } else if (types == 'searchHrdrDate') {
        chageSearch += `
            <input style="width:200px" type="text" name="hrdrDate" id="hrdrDate" placeholder="ex)2023, 202308, 20230319">
        `;
    }
    $('.searchArea div.searchChangeArea').append(chageSearch);

    if (types == 'searchDate') {
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth() + 1; //January is 0!
        if (thisMonth <= 9) {
            thisMonth = '0' + thisMonth;
        }
        var checkDate = thisYear + '-' + thisMonth;
        // searchStudy('lectureDay', checkDate)
        searchStudy2('lectureDay', 1);
    }
    //actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

async function searchStudy2(types, serviceType) {

    if (types == 'lectureDay') {
        if (document.querySelector('select[name="lectureDay"]')) {
            document.querySelector('select[name="lectureDay"]').remove();
        }

        if (document.querySelector('select[name="contentsCode"]')) {
            document.querySelector('select[name="contentsCode"]').remove()
        }

        if (document.querySelector('select[name="companyCode"]')) {
            document.querySelector('select[name="companyCode"]').remove()
        }

        const data = await getSearchData(types, serviceType);

        let select = '';
        select += `<select name="lectureDay" onChange="searchStudy2('contents', 1); searchAct();">`;
        if (data.totalCount > 0) {
            select += `<option value="">기간을 선택해주세요</option>`;
            Array.from(data.search).forEach( ele => {
                select += `<option value="${ele.lectureStart}~${ele.lectureEnd}">${ele.lectureStart}~${ele.lectureEnd}</option>`;
            })
        } else {
            select += `<option value="">검색결과가 없습니다</option>`;
        }
        select += `</select>`;
        $('select[name="searchMonth"]').after(select);

        document.querySelector('select[name="lectureDay"]').addEventListener('change', (e) => {
            const studyPeriod = e.target.value.split('~');
            document.querySelector('input[name="lectureStart"]').value = studyPeriod[0];
            document.querySelector('input[name="lectureEnd"]').value = studyPeriod[1];
        })
    } else if (types == 'contents') {
        if (document.querySelector('select[name="contentsCode"]')) {
            document.querySelector('select[name="contentsCode"]').remove()
        }
        
        if (document.querySelector('select[name="companyCode"]')) {
            document.querySelector('select[name="companyCode"]').remove()
        }

        const data = await getSearchData(types, serviceType);

        let select = '';
        select += `<select name="contentsCode" onChange="searchStudy2('company', 1);searchAct();">`;
        if (data.totalCount > 0) {
            select += `<option value="">과정을 선택해주세요</option>`;
            Array.from(data.search).forEach( ele => {
                select += `<option value="${ele.contentsCode}">${ele.contentsName}</option>`;
            })
        } else {
            select += `<option value="">검색결과가 없습니다</option>`;
        }
        select += `</select>`;
        $('select[name="lectureDay"]').after(select);

        document.querySelector('select[name="contentsCode"]').addEventListener('change', (e) => {
            document.querySelector('input[name="contentsCode"]').value = e.target.value;
        })
    } else if (types == 'company') {
        if (document.querySelector('select[name="companyCode"]')) {
            document.querySelector('select[name="companyCode"]').remove()
        }

        const data = await getSearchData(types, serviceType);

        let select = '';
        select += `<select name="companyCode" onChange="searchAct();">`;
        if (data.totalCount > 0) {
            select += `<option value="">사업주를 선택해주세요</option>`;
            Array.from(data.search).forEach( ele => {
                select += `<option value="${ele.companyCode}">${ele.companyName}</option>`;
            })
        } else {
            select += `<option value="">검색결과가 없습니다</option>`;
        }
        select += `</select>`;
        $('select[name="contentsCode"]').after(select);
    }
}

function formDataToQuery(formData) {
    const data = [...formData.entries()];
    const query = data
        .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');

    return query;
}

async function getData() {

    const formData = new FormData(searchForm);
    const query = formDataToQuery(formData);

    let res = await fetch(useApi + `?${query}`, {
        method: 'GET',
    });

    return res.json();
}

async function getSearchData(type, serviceType) {
    const formData = new FormData(searchForm);
    let query = formDataToQuery(formData);
    query += `&type=${type}&serviceType=${serviceType}`;

    const res = await fetch(chainsearchApi + `?${query}`, {
        method: 'GET'
    })

    return res.json();
}

function excelAct() {
    const formData = new FormData(searchForm);
    const data = [...formData.entries()];
    const queryString = data
        .map( x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join('&');
    top.location.href='hrdPriceUploadExcel.php?'+queryString;
}

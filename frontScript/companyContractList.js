let sortData = '';
let moduCode = '';
const useApi = '../api/apiCompanyContractList.php';
const moduApi = '../api/apiModuEmployeeCode.php';


async function listAct() {
    var actionArea = '';
    moduCode = await fetchModuCode();

    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div class="searchChangeArea">'
    actionArea += `<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" />
                    <label for="searchDate">계약기간검색</label>`;
    // 이슈로 인해 주석처리
    // actionArea += `<input type="radio" name="selectSearch" id="searchApplySeq" value="searchApplySeq" />
    //                 <label for="searchApplySeq">입과번호검색</label>&nbsp;&nbsp;&nbsp;`;
    actionArea += searchDateHTML();
    actionArea += '</div>';

    actionArea += '<div>';
    actionArea += searchCompanyHTML();
    actionArea += searchContractClass();
    actionArea += '</div>';

    actionArea += '<div>';
    actionArea += searchContractUser();
    actionArea += '<span>상태</span>';
    actionArea += '<select id="contractStatus" name="contractStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="normal">정상</option>';
    actionArea += '<option value="termination">해지</option>';
    actionArea += '<option value="expire">만료</option>';
    actionArea += '</select>';
    actionArea += ' <button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
    actionArea += '</div>';

    actionArea += '<button type="submit" style="width:100%">검색</button></form>';
    actionArea += '</form></div>';
    $('#contents > h1').after(actionArea);

    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(tableHeader());

    document.querySelector('.searchChangeArea').addEventListener('click', (e) => {
        let searchArea = '';
        if (e.target.id == 'searchDate') {
            searchArea += `<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" />
                    <label for="searchDate">기간검색</label>`;
            searchArea += `<input type="radio" name="selectSearch" id="searchApplySeq" value="searchApplySeq" />
                    <label for="searchApplySeq">입과번호검색</label>&nbsp;&nbsp;&nbsp;`;
            searchArea += searchDateHTML();
            document.querySelector('.searchChangeArea').innerHTML = '';
            document.querySelector('.searchChangeArea').insertAdjacentHTML('beforeend', searchArea);
        } else if (e.target.id == 'searchApplySeq') {
            searchArea += `<input type="radio" name="selectSearch" id="searchDate" value="searchDate" />
                    <label for="searchDate">기간검색</label>`;
            searchArea += `<input type="radio" name="selectSearch" id="searchApplySeq" 
                            value="searchApplySeq"  checked="checked"/>
                    <label for="searchApplySeq">입과번호검색</label>&nbsp;&nbsp;&nbsp;`;
            searchArea += `<input type="text" id="applySeq" name="applySeq">`;
            document.querySelector('.searchChangeArea').innerHTML = '';
            document.querySelector('.searchChangeArea').insertAdjacentHTML('beforeend', searchArea);
        } else {
            return;
        }

    })
}

function searchDateHTML() {
    let template = '';
    template += `<input style="width:120px;" type="text" id="contractDate01" name="contractDate01" onkeyup="inputYMDNumber(this)" placeholder="ex) 20230801">&nbsp;~&nbsp;`;
    template += `<input style="width:120px;" type="text" id="contractDate02" name="contractDate02" onkeyup="inputYMDNumber(this)" placeholder="ex) 20230831">`;

    return template;
}

function searchCompanyHTML() {
    let template = '';

    template += '<select id="companySearchType" name="companySearchType">';
    template += '<option value="companyName">사업주명</option>';
    template += '<option value="companyCode">사업자번호</option>';
    template += '<option value="contractSeq">계약번호</option>';
    template += '</select>&nbsp;&nbsp;&nbsp;';

    template += `<input type="text" id="companySearchValue" name="companySearchValue">`;

    return template;
}

function searchContractClass() {
    let template = '';
    template += '<span>전략구분</span>';
    template += '<select id="ST01" name="ST01">';
    template += '<option value="">전체</option>';
    template += '<option value="S01">표준</option>';
    template += '<option value="S02">전략</option>';
    template += '<option value="S03">특판</option>';
    template += '</select>&nbsp;&nbsp;&nbsp;';

    template += '<span>계약구분</span>';
    template += '<select id="CT01" name="CT01">';
    template += '<option value="">전체</option>';
    template += '<option value="T01">직접</option>';
    template += '<option value="T02">간접</option>';
    template += '</select>&nbsp;&nbsp;&nbsp;';

    template += '<span>채널구분</span>';
    template += '<select id="CH01" name="CH01">';
    template += '<option value="">전체</option>';
    template += '<option value="C11">직접계약</option>';
    template += '<option value="C12">비영업소개</option>';
    template += '<option value="C13">인바운드</option>';
    template += '<option value="C14">아웃바운드</option>';
    template += '<option value="C21">파트너소개</option>';
    template += '<option value="C22">대리점영업</option>';

    template += '</select>&nbsp;&nbsp;&nbsp;';


    return template;
}

function searchContractUser() {
    let template = '';
    template += '<span>발굴부서</span>';
    template += '<select id="suggester" name="suggester">';
    template += '<option value="">전체</option>';
    template += '<option value="CS담당">CS담당</option>';
    template += '<option value="Sales TM">Sales TM</option>';
    template += '<option value="정보제공자">정보제공자</option>';
    template += '<option value="파트너소개">소개자</option>';
    template += '<option value="대리점영업">대리점</option>';
    template += '</select>&nbsp;&nbsp;&nbsp;';

    template += '<span>발굴자 이름</span>';
    template += `<input type="text" id="suggesterName" name="suggesterName">`;

    template += '<span>영업부서</span>';
    template += '<select id="salesPerson" name="salesPerson">';
    template += '<option value="">전체</option>';
    template += '<option value="영업">영업</option>';
    template += '<option value="Sales TM">Sales TM</option>';
    template += '</select>&nbsp;&nbsp;&nbsp;';

    template += '<span>영업담당 이름</span>';
    template += `<input type="text" id="salesPersonName" name="salesPersonName">`;

    return template;
}

function tableHeader() {
    let template = `<div style="min-width:1360px; overflow:auto; white-space:nowrap">`;
    template += '<table style="table-layout: fixed"><thead><tr>';
    template += '<th style="width:90px;" rowspan=2>계약번호</th>';
    template += '<th style="width:80px;" rowspan=2>사업주번호</th>';
    template += '<th style="width:80px;" rowspan=2>고용보험관리번호</th>';
    template += '<th style="width:200px;" rowspan=2>사업주명</th>';
    template += '<th style="width:80px;"  rowspan=2>계약시작날짜</th>';
    template += '<th style="width:80px;" rowspan=2>계약종료날짜</th>';
    template += '<th style="width:50px;"  rowspan=2>ST01</th>';
    template += '<th style="width:70px;" rowspan=2>전략구분</th>';
    template += '<th style="width:50px;" rowspan=2>CT01</th>';
    template += '<th style="width:70px;" rowspan=2>계약구분</th>';
    template += '<th style="width:50px;" rowspan=2>CH01</th>';
    template += '<th style="width:70px;" rowspan=2>채널구분</th>';
    template += '<th style="width:50px;" rowspan=2>SL01</th>';
    template += '<th style="width:70px;" rowspan=2>발굴부서</th>';
    template += '<th style="width:70px;" rowspan=2>사번(벤더번호)</th>';
    template += '<th style="width:70px;" rowspan=2>발굴자명</th>';
    template += '<th style="width:70px;" rowspan=2>SL01</th>';
    template += '<th style="width:70px;" rowspan=2>영업부서</th>';
    template += '<th style="width:70px;" rowspan=2>사번(벤더번호)</th>';
    template += '<th style="width:70px;" rowspan=2>영업담당자명</th>';
    template += '<th style="width:300px;" colspan=3>실물계약서 파일</th>';
    template += '<th style="width:50px;" rowspan=2>상태</th>';
    template += '<th style="width:80px;" rowspan=2>해지일</th>';
    template += '</tr>';

    template += '<tr>';
    template += '<th style="width:100px;">환급계약서</th>';
    template += '<th style="width:100px;">비환급계약서</th>';
    template += '<th style="width:100px;">개인정보동의서</th>';
    template += '</tr>';

    template += '</thead><tbody >';
    template += '<tr><td class="notResult" colspan="30">검색값을 선택하세요.</td></tr>';
    template += '</tbody></table>';

    return template;
}

async function ajaxAct(sortDatas) {
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }

    const data = await fetchData(sortData);
    
    let lists = '';

    if (data.totalCount > 0) {
        Array.from(data.lists).forEach( ele => {
            let suggesterDepartment = ''
            let salesDepartment = '';
            let suggesterUser = '';
            let salesPersonUser = '';
            let contractFileName = '-';
            let contractFile5Name = '-';
            let userPrivacyFileName = '-';
            let terminationDate = '-';

            if (ele.suggesterUser) {
                suggesterUser = ele.suggesterUser;
            }

            if (ele.suggesterVendor) {
                suggesterUser = ele.suggesterVendor;
            }

            if (ele.salesPersonUser) {
                salesPersonUser = ele.salesPersonUser;
            }

            if (ele.salesPersonVendor) {
                salesPersonUser = ele.salesPersonVendor;
            }

            if (ele.contractFileName) {
                contractFileName = ele.contractFileName;
            }

            if (ele.contractFile5Name) {
                contractFile5Name = ele.contractFile5Name;
            }

            if (ele.userPrivacyFileName) {
                userPrivacyFileName = ele.userPrivacyFileName;
            }

            if (ele.terminationDate) {
                terminationDate = ele.terminationDate;
            }

            if (moduCode.titleClass[ele.suggester]) {
                suggesterDepartment = moduCode.titleClass[ele.suggester];
            } else {
                if (ele.suggester == 'V01') {
                    suggesterDepartment = '파트너소개';
                }

                if (ele.suggester == 'V02') {
                    suggesterDepartment = '대리점영업';
                }
            }

            if (moduCode.titleClass[ele.sales]) {
                salesDepartment = moduCode.titleClass[ele.sales];
            } else {
                if (ele.sales == 'V01') {
                    salesDepartment = '파트너소개';
                }

                if (ele.sales == 'V02') {
                    salesDepartment = '대리점영업';
                }
            }

            lists += '<tr>';
            lists += `<td>${ele.contractSeq}</td>`;
            lists += `<td>${ele.companyCode}</td>`;
            lists += `<td>${ele.hrdCode}</td>`;
            lists += `<td style="width:200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; text-align: left;">${ele.companyName}</td>`;
            lists += `<td>${ele.contractStart}</td>`;
            lists += `<td>${ele.contractEnd}</td>`;
            lists += `<td>${ele.ST01}</td>`;
            lists += `<td>${ele.ST01Name}</td>`;
            lists += `<td>${ele.CT01}</td>`;
            lists += `<td>${ele.CT01Name}</td>`;
            lists += `<td>${ele.CH01}</td>`;
            lists += `<td>${ele.CH01Name}</td>`;
            lists += `<td>${ele.suggester}</td>`;
            lists += `<td>${suggesterDepartment}</td>`;
            lists += `<td>${ele.suggesterMSEQ}</td>`;
            lists += `<td style="width:70px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${suggesterUser}</td>`;
            lists += `<td>${ele.sales}</td>`;
            lists += `<td>${salesDepartment}</td>`;
            lists += `<td>${ele.salesPersonMSEQ}</td>`;
            lists += `<td style="width:70px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${salesPersonUser}</td>`;
            lists += `<td style="width:100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${contractFileName}</td>`;
            lists += `<td style="width:100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${contractFile5Name}</td>`;
            lists += `<td style="width:100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${userPrivacyFileName}</td>`;
            lists += `<td>${ele.status}</td>`;
            lists += `<td>${terminationDate}</td>`;
            lists += '</tr>';
        })
    } else {
        lists += '<tr><td class="notResult" colspan="30">검색결과가 없습니다.</td></tr>';
    }

    document.querySelector('.BBSList tbody').innerHTML = '';
    document.querySelector('.BBSList tbody').insertAdjacentHTML('beforeend', lists);

    loadingAct();
}

async function fetchData(sortData) {
    const res = await fetch(useApi + `?${sortData}`, {
        method: 'GET'
    })
    return res.json();
}

async function fetchModuCode() {
    const res = await fetch(moduApi, {
        method: 'GET'
    })
    return res.json();
}

function excelAct() {
    searchValue = $('.searchForm').serialize();
    searchValue = '&' + searchValue;
    top.location.href = 'companyContractExcel.php?' + searchValue;
}
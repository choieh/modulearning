const authKey = 'EaCJiOhQL5IuGbsRLYnW15r4HdDFTtrk';
let totalCount = 0;
let pages = 0;
async function listAct() {
    loadingAct();
    let actionArea = `
    <div class="searchArea">
        <form class="searchForm">
            <div>
                <label for=" srchTraStDt">훈련시작일 검색</label>
                <input type="date" name="srchTraStDt" id="srchTraStDt"> ~
                <input type="date" name="srchTraEndDt" id="srchTraEndDt">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="crseTracseSe">훈련유형</label>
                <select id="crseTracseSe" name="crseTracseSe">
                    <option value="">선택</option>
                    <option value="C0041T">일반직무훈련</option>
                    <option value="C0041B">기업직업훈련카드</option>
                    <option value="C0041N">고숙련신기술훈련</option>
                    <option value="C0041H">패키지구독형 원격</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="srchTraGbn">훈련구분</label>
                <select id="srchTraGbn" name="srchTraGbn">
                    <option value="">선택</option>
                    <option value="M1001">일반과정</option>
                    <option value="M1005">인터넷과정</option>
                    <option value="M1010">혼합과정</option>
                    <option value="M1011">스마트혼합훈련</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="srchTraType">훈련종류</label>
                <select id="srchTraType" name="srchTraType">
                    <option value="">선택</option>
                </select>
            </div>
            <div>
                <span>훈련지역</span>
                <label for="srchTraArea1">대분류</label>
                <select id="srchTraArea1" name="srchTraArea1">
                    <option value="">선택</option>
                    <option value="11">서울</option>
                    <option value="26">부산</option>
                    <option value="27">대구</option>
                    <option value="28">인천</option>
                    <option value="29">광주</option>
                    <option value="30">대전</option>
                    <option value="31">울산</option>
                    <option value="36">세종</option>
                    <option value="41">경기</option>
                    <option value="42">강원</option>
                    <option value="43">충북</option>
                    <option value="44">충남</option>
                    <option value="45">전북</option>
                    <option value="46">전남</option>
                    <option value="47">경북</option>
                    <option value="48">경남</option>
                    <option value="50">제주</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- api 연결하기 -->
                <label for="srchTraArea2">소분류</label>
                <select id="srchTraArea2" name="srchTraArea2">
                    <option value="">선택</option>
                </select>
                <span>훈련분야</span>
                <label for="srchKeco1">대분류</label>
                <select id="srchKeco1" name="srchKeco1">
                    <option value="">선택</option>
                    <option value="01">사업관리</option>
                    <option value="02">경영/회계/사무</option>
                    <option value="03">금융/보험</option>
                    <option value="04">교육/자연/사회과학</option>
                    <option value="05">법률/경찰/소방/교도/국방</option>
                    <option value="06">보건/의료</option>
                    <option value="07">사회복지/종교</option>
                    <option value="08">문화/예술/디자인/방송</option>
                    <option value="09">운전/운송</option>
                    <option value="10">영업판매</option>
                    <option value="11">경비/청소</option>
                    <option value="12">이용/숙박/여행/오락/스포츠</option>
                    <option value="13">음식서비스</option>
                    <option value="14">건설</option>
                    <option value="15">기계</option>
                    <option value="16">재료</option>
                    <option value="17">화학</option>
                    <option value="18">섬유/의복</option>
                    <option value="19">전기/전자</option>
                    <option value="20">정보통신</option>
                    <option value="21">식품가공</option>
                    <option value="22">인쇄/목재/가구/공예</option>
                    <option value="23">환경/에너지/안전</option>
                    <option value="24">농림어업</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="srchKeco2">중분류</label>
                <select id="srchKeco2" name="srchKeco2">
                    <option value="">선택</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="srchKeco3">소분류</label>
                <select id="srchKeco3" name="srchKeco3">
                    <option value="">선택</option>
                </select>
            </div>
            <div>
                <label for="srchTraProcessNm">훈련과정명</label>
                <input id="srchTraProcessNm" type="text" name="srchTraProcessNm">
                <label for="srchTraOrganNm">훈련기관명</label>
                <input id="srchTraOrganNm" type="text" name="srchTraOrganNm">
                    <label for="pageSize">페이지 수</label>
                    <select id="pageSize" name="pageSize">
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
            </div>
            <button type="button" style="width:100%" onClick="hrdSearch()">검색</button>
        </form>
    </div>`;
    $('#contents > h1').after(actionArea);

    let contents = '';
    contents += '<table><thead><tr>';
    contents += '<th style="width:150px;">훈련기관<br>코드</th>';
    contents += '<th style="width:300px;">과정명<br>코드</th>';
    contents += '<th style="width:200px;">훈련 시작/종료 날짜</th>';
    contents += '</tr></thead><tbody>'	;
    contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>'	;
    contents += '</tbody></table>';
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);

    const traType = await getSrchTraType();
    const traTypeSel = document.getElementById('srchTraType');
    for (const [key, value] of Object.entries(traType.srchList.scn_list)) {
        const opt = document.createElement('option');
        opt.innerHTML = value.rsltName;
        opt.value = value.rsltCode;
        traTypeSel.appendChild(opt);
    }

    const traArea2 = await getSrchTraArea2();
    const traArea2Sel = document.getElementById('srchTraArea2');
    for (const [key, value] of Object.entries(traArea2.srchList.scn_list)) {
        const opt = document.createElement('option');
        opt.innerHTML = value.rsltName;
        opt.value = value.rsltCode;
        traArea2Sel.appendChild(opt);
    }

    const keco2 = await getSrchKeco2();
    const srchKeco2Sel = document.getElementById('srchKeco2');
    for (const [key, value] of Object.entries(keco2.srchList.scn_list)) {
        const opt = document.createElement('option');
        opt.innerHTML = value.rsltName;
        opt.value = value.rsltCode;
        srchKeco2Sel.append(opt);
    }

    const keco3 = await getSrchKeco3();
    const srchKeco3Sel = document.getElementById('srchKeco3');
    for (const [key, value] of Object.entries(keco3.srchList.scn_list)) {
        const opt = document.createElement('option');
        opt.innerHTML = value.rsltName;
        opt.value = value.rsltCode;
        srchKeco3Sel.append(opt);
    }

    loadingAct();
}


function ajaxAct(data) {
    console.log(data);
    let lists = '';
    if (data.scn_cnt > 0) {
        for (const result of data.srchList.entries()){
            lists += '<tr>';
            lists += `<td><a href="${result[1].subTitleLink}" target="_blank">${result[1].subTitle}<br>${result[1].instCd}</a></td>`;
            lists += `<td><a href="${result[1].titleLink}" target="_blank">${result[1].title}<br>${result[1].trprId}</a></td>`;
            lists += `<td>${result[1].traStartDate} ~ ${result[1].traEndDate}</td>`;
            lists += '</tr>';
        }
    } else {
        lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>';
    }
    $('.BBSList tbody').html(lists);
    pager();
}

function hrdSearch(paging) {
    if (!paging) {
        paging = 1;
    }
    const srchTraStDt = document.getElementById('srchTraStDt');
    const srchTraEndDt = document.getElementById('srchTraEndDt');
    const pageSize = document.getElementById('pageSize');
    if (srchTraStDt.value == '' && srchTraEndDt.value == '') {
        alert('훈련 시작 날짜는 필수값입니다.');
        return false;
    }

    const form = document.getElementsByClassName('searchForm')[0];
    const formData = new FormData(form);

    const params = new URLSearchParams();
    params.append('authKey', authKey);
    params.append('returnType', 'JSON');
    params.append('outType', '1');
    params.append('sort', 'ASC');
    params.append('sortCol', 'TRNG_BGDE');
    params.append('pageNum', `${paging}`);
    for (const p of formData.entries()) {
        if (p[0] === 'srchTraStDt' || p[0] === 'srchTraEndDt') { // 날짜 '-' 빠져야함
            p[1] = p[1].replaceAll('-', '');
        }

        if (p[1] !== '') { // 선택 값이 없으면 param에서 제외
            params.append(p[0], p[1]);
        }
    }
    params.append('url', 'https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA62/HRDPOA62_1.jsp');

    fetch(`https://modulearning.kr/proxy?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then( response => response.json())
        .then(data => {
            data = JSON.parse(data.returnJSON);
            totalCount = data.scn_cnt;
            pages = Math.floor(totalCount / pageSize.value) + 1;

            ajaxAct(data);
        });

}

// 훈련종류
async function getSrchTraType() {
    const params = new URLSearchParams();
    params.append('authKey', authKey);
    params.append('returnType', 'XML');
    params.append('outType', '1');
    params.append('srchType', '09');
    params.append('url', 'https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp');

    const response = await fetch(`https://modulearning.kr/proxy?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json();
}

async function getSrchTraArea2() {
    const params = new URLSearchParams();
    params.append('authKey', authKey);
    params.append('returnType', 'XML');
    params.append('outType', '1');
    params.append('srchType', '01');
    params.append('url', 'https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp');

    const response = await fetch(`https://modulearning.kr/proxy?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

async function getSrchKeco2() {
    const params = new URLSearchParams();
    params.append('authKey', authKey);
    params.append('returnType', 'XML');
    params.append('outType', '1');
    params.append('srchType', '03');
    params.append('url', 'https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp');

    const response = await fetch(`https://modulearning.kr/proxy?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

async function getSrchKeco3() {
    const params = new URLSearchParams();
    params.append('authKey', authKey);
    params.append('returnType', 'XML');
    params.append('outType', '1');
    params.append('srchType', '04');
    params.append('url', 'https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp');

    const response = await fetch(`https://modulearning.kr/proxy?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

function pager() {
    const pageSize = document.getElementById('pageSize');
    const contentsArea = document.getElementById('contentsArea');

    let start = 0;
    let end = 0;

    if (document.getElementById('pager')) {
        document.getElementById('pager').remove();
    }

    let pager = '<div id="pager" style="display: flex; gap: 0 10px; justify-content: center; padding-top: 40px; font-size: 16px;">';
    for ($i=0; $i<10; $i++) {
        pager += `<span style="cursor: pointer;">${$i+1}</span>`;
    }
    pager += '</div>';

    contentsArea.insertAdjacentHTML('afterend', pager);

    const pagerDiv = document.getElementById('pager');
    for (const [index, span] of Object.entries(pagerDiv.childNodes)) {
        span.addEventListener('click', () => {
            hrdSearch(`${span.innerText}`);
        })
    }

}

/**
 * totalCount = 181
 * pageNum = 10
 * if (totalCount % pageNum !=  0): totalPage = (totalCount / pageNum) + 1
 * else: totalPage = (totalCount / pageNum)
 * start = 1, end = totalPage
 *
 * if totalPage > 10:
 * for i = start; i < start + 4; i++ : i, i+1, i+2, i+3
 * + ...... +
 * for i = end; i > start - 4; i-- : i, i-1, i-2, i-3
 */

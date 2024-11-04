const contractApi = '../api/apiCompanyContract.php';
let companySeq = '';

/*
classify 변수로 메인화면인지, 모달창인지 구분
메인 화면이면 companyApi에서 정보를 받고, 모달창이면 contractApi에서 정보를 받음
company -> 메인화면, contract -> 모달창
 */

// 계약서 메인화면
async function contractAct(seq) {
    companySeq = seq;
    $('.searchArea').remove();
    let company = await fetchCompany(seq); //사업주 정보
    company = company["company"][0];

    let writes = '';
    writes += '<div id="main">';
    writes += contractInfoTable('company', company);
    writes += '</div>';
    $('#contentsArea').removeAttr('class')
    $('#contentsArea').addClass('BBSWrite')
    $('#contentsArea').html(writes); // 계약서 및 계약구분 출력

    document.querySelector('#main select[name=suggester]').addEventListener('change', () => {
        document.querySelector('#main input[name=suggesterInfo]').value = '';
    });

    const select = document.getElementsByName('companyScale')[0];
    setSelectValue(select, company.companyScale);

    let contractList = await fetchContracts(company.companyCode);
    contractList = contractList["contractList"];

    let lists = '';
    lists += '<div class="txt-c"><h1>계약서 목록</h1></div>' +
        '<table id="contractList" style="width: 50%; margin: 0 auto; min-width: 500px; border-collapse: collapse; border:1px solid black; text-align: center;">' +
        '<thead style="font-size: 16px;">' +
        '<tr style="border: 1px solid black;">' +
        '<th style="width: 150px; background: #eceadd;">계약번호</th>' +
        '<th style="width: 250px; background: #eceadd;">계약기간</th>' +
        '<th style="width: 100px; background: #eceadd;">정보</th>' +
        '</tr>' +
        '</thead>';

    lists += '<tbody>';
    if (contractList != null) {
        var i = 0;
        while (i < contractList.length) {
            var data = contractList[i];
            lists += '<tr style="border: 1px solid black; font-size: 14px;">' +
                `<td>${data.contractSeq}</td>` +
                `<td>${data.contractStart} ~ ${data.contractEnd}</td>` +
                `<td><button onclick="contractModal('${data.seq}')">열기</button></td>` +
                '</tr>';
            i++;
        }
    } else {
        lists += '<td colspan="3">등록 결과가 없습니다.</td>';
    }

    lists += '</tbody>';
    lists += '</table>';

    $('#contentsArea').append(lists);

}

// 작성, 수정시에 필수값 검사
function checkForm(classify) {
    if (classify == 'company') {
        parent = '#main';
    } else {
        parent = '#modal';
    }
    if (!document.querySelector(`${parent} input[name=contractStart]`).value || !document.querySelector(`${parent} input[name=contractEnd]`).value) {
        alert("계약기간을 확인해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} input[name=hrdCode]`).value || document.querySelector(`${parent} input[name=hrdCode]`).value.length < 11) {
        alert("사업장관리번호를 확인해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} select[name=strategyClassify]`).value) {
        alert("전략구분을 선택해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} select[name=contractClassify]`).value) {
        alert("계약구분을 선택해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} select[name=channelClassify]`).value) {
        alert("채널구분을 선택해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} select[name=sales]`).value) {
        alert("영업담당을 선택해주세요.");
        return false;
    }

    if (!document.querySelector(`${parent} input[name=salesPersonInfo]`).value) {
        alert("영업담당을 입력해주세요.");
        return false;
    }

    return true;
}

// 계약서 폼
function contractInfoTable(classify, company) {
    let hrdCode = '';
    let managerName = '';
    let mobile01 = '';
    let mobile02 = '';
    let mobile03 = '';
    let email01 = '';
    let email02 = '';
    let elecEmail01 = '';
    let elecEmail02 = '';
    let companyCode = '';
    let contractSeq = '';
    let contractStart = '';
    let contractEnd = '';
    let contractFile = null;
    let contractFileName = '';

    if (classify == 'company') {
        hrdCode = company.hrdCode;
        managerName = company.manager.name;

        if (company.manager.mobile === '미등록') {
            mobile01 = '';
            mobile02 = '';
            mobile03 = '';
        } else {
            mobile01 = company.manager.mobile.split('-')[0];
            mobile02 = company.manager.mobile.split('-')[1];
            mobile03 = company.manager.mobile.split('-')[2];
        }

        if (company.manager.email === '미등록') {
            email01 = '';
            email02 = '';
        } else {
            email01 = company.manager.email.split('@')[0];
            email02 = company.manager.email.split('@')[1];
        }

        elecEmail01 = company.elecEmail01;
        elecEmail02 = company.elecEmail02;
        companyCode = company.companyCode;
    } else if (classify == 'contract') {
        hrdCode = company.hrdCode;
        managerName = company.managerName;
        mobile01 = company.mobile01;
        mobile02 = company.mobile02;
        mobile03 = company.mobile03;
        email01 = company.email01;
        email02 = company.email02;
        elecEmail01 = company.elecEmail01;
        elecEmail02 = company.elecEmail02;
        companyCode = company.companyCode;
        contractStart = company.contractStart;
        contractEnd = company.contractEnd;
        contractFile = company.contractFile;
        contractFileName = company.contractFileName;
        contractSeq = company.contractSeq;
    }

    let template = '';
    template += `<form id="writeForm" style="min-width: 700px;" class="writeform" method="post" action="${contractApi}" enctype="multipart/form-data">` +
        '<div style="overflow-y: unset;"><h1>계약서</h1></div>' +
        '<li>' +
        '<div class="halfDiv">' +
        '<h1>지원구분</h1>' +
        '<select name="companyScale" >' + optWrite['companyScale'] + '</select>' +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<div class="halfDiv" style="width: 100%;">' +
        '<h1>계약기간</h1>' +
        `<input type="text" name="contractStart" value="${contractStart}" onkeyup="inputYMDNumber(this)">
            ~ <input type="text" name="contractEnd" value="${contractEnd}" onkeyup="inputYMDNumber(this)">` +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<div class="halfDiv" style="width: 100%;">' +
        '<h1>사업장관리번호<br>(고용관리번호)</h1>' +
        `<input type="text" name="hrdCode" value="${hrdCode}" placeholder="11자리 입력" maxlength="11">&nbsp;` +
        '<a href="https://www.comwel.or.kr/comwel/info/cont/cont.jsp" target="_blank">사업장관리번호 찾기</a>' +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<h1>교육담당자명</h1>' +
        `<input type="text" name="managerName" value="${managerName}">` +
        '</li>';

    template += '<li>' +
        '<div class="halfDiv" style="width: 100%;">' +
        '<h1>교육담당자 연락처</h1>' +
        `<input type="text" class="tel" name="mobile01" value="${mobile01}" maxlength="3"> - ` +
        `<input type="text" class="tel" name="mobile02" value="${mobile02}" maxlength="4"> - ` +
        `<input type="text" class="tel" name="mobile03" value="${mobile03}" maxlength="4">` +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<div class="halfDiv" style="width: 100%;">' +
        '<h1>교육담당자 이메일</h1>' +
        `<input type="text" class="email" value="${email01}" name="email01"> @ ` +
        `<input type="text" class="email" value="${email02}" name="email02">` +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<div class="halfDiv" style="width: 100%;">' +
        '<h1>전자계산서<br> 발행 이메일</h1>' +
        `<input type="text" class="email" name="elecEmail01" value="${elecEmail01}"> @ ` +
        `<input type="text" class="email" name="elecEmail02" value="${elecEmail02}">` +
        '</div>' +
        '</li>';

    template += '<li>' +
        '<div id="file" class="halfDiv" style="width: 100%;">' +
        '<h1>계약서 첨부</h1>';

    if (contractFile == null) {
        template += `<input type="file" class="file" name="contractFile">`;
    } else {
        template += `<a href="../lib/fileDownLoad.php?fileName=${contractFileName}&link=${contractFile}"
        style="text-decoration: none; color: black;" target="_blank">${contractFileName}</a>
        <button type="button" style="margin-left: 10px; border-radius: 5px;" onclick="deleteFile();">삭제</button>`;
    }

    template += '</div></li>';


    template += '<div style="overflow-y: unset;"><h1>계약구분</h1></div>' +
        contractCmsTable(`${classify}`, company);

    template += '<div class="btnArea" style="overflow-y: unset;">';

    // name=_method로 등록, 수정 method 분류 api 파일 확인
    if (classify == 'company') {
        template += `<input type="hidden" name="_method" value="POST">`;
        template += `<button type="button" onclick="submitContract('${classify}')">등록하기</button>` +
            '<button type="button" onclick="listAct()">목록보기</button>';
    } else {
        template += `<input type="hidden" name="_method" value="PUT">`;
        template += `<button type="button" onclick="submitContract('${classify}')">수정하기</button>`;
        template += `<button type="button" onclick="deleteContract('${contractSeq}')">삭제하기</button>`;
    }

    template += '</div>' +
        '</form>';

    return template;
}

// 계약구분 템플릿
function contractCmsTable(classify, company) {
    let contractRelevant = '';
    let strategyClassify = '';
    let contractClassify = '';
    let channelClassify = '';
    let relevantPerson = '';
    let sales = '';
    let salesPersonInfo = '';
    let suggester = '';
    let suggesterInfo = '';
    let template = '';

    if (classify == 'contract') {
        contractRelevant = company.contractRelevant;
        strategyClassify = company.strategyClassify;
        contractClassify = company.contractClassify;
        channelClassify = company.channelClassify;
        relevantPerson = company.relevantPerson;
        sales = company.sales;
        salesPersonInfo = `${company.salesPersonMSEQ}/${company.salesPersonName}`;
        suggester = company.suggester;
        suggesterInfo = `${company.suggesterMSEQ}/${company.suggesterName}`;
        template += `<input type="hidden" name="contractSeq" value="${company.contractSeq}">`;
    }

    template += '<table style="width: 100%; min-width: 600px; border-collapse: collapse; border:1px solid black; text-align: center;">' +
        `<input type="hidden" name="companyCode" value="${company.companyCode}">` +
        '<thead style="font-size: 20px; border: 1px solid black;">' +
        '<tr>' +
        '<th colspan="3" rowspan="2" style="min-width: 200px; border: 1px solid black; background: #eceadd;">채널구분</th>' +
        '<th colspan="2" style="border: 1px solid black; background: #eceadd;">계약관계자</th>' +
        '</tr>' +
        '<tr>' +
        '<th style="border: 1px solid black; background: #eceadd;">발굴자</th>' +
        '<th style="background: #eceadd;">영업담당</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody style="font-size: 20px; border: 1px solid black;">' +
        '<tr style="font-size: 16px; border: 1px solid black;">' +
        '<td style="border: 1px solid black;">전략구분</td>' +
        '<td style="border: 1px solid black;">계약구분</td>' +
        '<td style="border: 1px solid black;">채널구분</td>' +
        `<td style="border: 1px solid black">
            <select name="suggester" style="height: 30px;">
                <option value="">선택</option>
                <option value="cs">CS담당</option>
                <option value="infoProvider">정보제공자</option>
                <option value="introducer">소개자</option>
                <option value="vendor">파트너</option>
            </select>
        </td>` +
        `<td>
            <select name="sales" style="height: 30px;">
                <option value="">선택</option>
                <option value="sales">영업</option>
                <option value="cs">CS</option>
            </select>
        </td>` +
        '</tr>' +
        '<tr style="font-size: 14px; border: 1px solid black;">' +
        '<td style="border: 1px solid black;"><select name="strategyClassify" style="height: 30px;">' +
        '<option value="">선택</option>' +
        '<option value="standard">표준</option>' +
        '<option value="strategy">전략</option>' +
        '<option value="special">특판</option>' +
        '</select></td>' +
        `<td style="border: 1px solid black;">
            <select name="contractClassify" style="height: 30px;" onchange="changeChannel(this, '${classify}')">
                <option value="">선택</option>
                <option value="directContract">직접계약</option>
                <option value="indirectContract">간접계약</option>
            </select>
        </td>` +
        `<td style="border: 1px solid black;">
            <select name="channelClassify" style="height: 30px;" onchange="setSearch(this, '${classify}', 'N')">
                <option value="">선택</option>
            </select>
        </td>` +
        `<td style="border: 1px solid black;">` +
        `<input style="height: 30px;"
            type="text" id="suggesterInfo" name="suggesterInfo" value="${suggesterInfo}" placeholder="이름검색" readonly>
            <i class="xi-search" style="margin-left: -20px;" 
            onclick="searchMemberDialog(this, '${classify}', 'suggester')">
            </i>
        </td>` +
        `<td id="salesPersonInfo" style="border: 1px black;">` +
        `<input style="height: 30px;"
            type="text" name="salesPersonInfo" value="${salesPersonInfo}" placeholder="이름검색" readonly>
        <i class="xi-search" style="margin-left: -20px;" onclick="searchMemberDialog(this, '${classify}', 'sales')"></i>
        </td>` +
        '</tr>' +
        '</tbody>' +
        '</table>';

    return template;
}

// 사업주 정보
function fetchCompany(seq) {
    const response = fetch(useApi + `?seq=${seq}`);
    return response.then((res) => res.json());
}

// 계약서 목록용
function fetchContracts(companyCode) {
    const response = fetch(contractApi + `?companyCode=${companyCode}`);
    return response.then((res) => res.json());
}

// 계약서 정보
function fetchContract(seq) {
    const response = fetch(contractApi + `?seq=${seq}`);
    return response.then((res) => res.json());
}

// 모두의 교육그룹 사번 검색
// 대리점, 파트너 검색은 아직 구현 안함
// 구현 시에 nynSalesChannel쪽으로 검색되게
function fetchMember(btn, classify, inputName, selectName) {
    event.preventDefault();

    if (classify == 'company') {
        parent = '#main';
    } else {
        parent = '#modal';
    }

    const listDiv = document.getElementById('listDiv');
    let param = '?member=Y';

    const selectBox = document.querySelector(`${parent} select[name=${selectName}]`);

    if (selectBox.value != '') {
        param += `&${selectName}=${selectBox.value}`;
    } else {
        alert("계약관계자 선택 후 검색해주세요.");
        return;
    }


    const userName = btn.parentNode.children['userName'].value;
    if (userName != '') {
        param += `&userName=${userName}`;
    } else {
        alert("이름을 입력해주세요.");
        return;
    }

    fetch(contractApi + param)
        .then((res) => res.json())
        .then((data) => {
            const members = data['member'];
            let lists = '';
            if (!members) {
                lists += `<p>검색결과가 없습니다.</p>`;
            } else {
                for (var i = 0; i < members.length; i++) {
                    lists += `<p><span style="font-size: 14px;">${members[i].mSeq} / ${members[i].userName}</span>
                        <button
                        type="button" style="border-radius: 5px; margin-left: 5px;"
                        onclick="selMember('${inputName}', '${members[i].mSeq}', '${members[i].userName}')">
                        선택</button></p>`;
                }
            }
            listDiv.innerHTML = lists;
        });

}

// select 박스들 selected 값 매핑
function setSelectValue(selects, vals) {
    if (Array.isArray(selects)) {
        for (let i = 0; i < selects.length; i++) {
            selects[i].value = vals[i];
            if (selects[i].name == 'contractClassify') {
                changeChannel(selects[i], 'contract');
            } else if (selects[i].name == 'channelClassify') {
                setSearch(selects[i], 'contract', 'Y');
            }
        }
    } else {
        selects.value = vals;
        if (selects.name == 'contractClassify') {
            changeChannel(selects, 'contract');
        } else if (selects.name == 'channelClassify') {
            setSearch(selects, 'contract', 'Y');
        }
    }
}

// 계약구분 테이블 select 입력값 관리
function setSearch(channel, classify, change) {
    let parent = '';
    if (classify == 'company') {
        parent = '#main';
    } else {
        parent = '#modal';
    }

    const suggestBox = document.querySelector(`${parent} select[name=suggester]`);
    const salesBox = document.querySelector(`${parent} select[name=sales]`);
    suggestBox.innerHTML = '';
    salesBox.innerHTML = '';

    if (change == 'N') {
        clearCMSTableInput(parent);
    }

    switch (channel.value) {
        case "directContract":
            suggestBox.insertAdjacentHTML("beforeend", `<option value="">--</option>`);
            salesBox.insertAdjacentHTML("beforeend", `<option value="sales">영업</option>`);
            break;

        case "nonSales":
            suggestBox.insertAdjacentHTML("beforeend", `<option value="infoProvider">정보제공자</option>`);
            salesBox.insertAdjacentHTML("beforeend", `
                <option value="">선택</option>
                <option value="sales">영업</option>
                <option value="cs">CS</option>
            `);
            break;

        case "inbound":
            suggestBox.insertAdjacentHTML("beforeend", `<option value="cs">CS담당</option>`);
            salesBox.insertAdjacentHTML("beforeend", `
                <option value="">선택</option>
                <option value="sales">영업</option>
                <option value="cs">CS</option>
            `);
            break;

        case "outbound":
            suggestBox.insertAdjacentHTML("beforeend", `
                <option value="cs">CS담당</option>
                <option value="tm">TM영업</option>
            `);
            salesBox.insertAdjacentHTML("beforeend", `
                <option value="">선택</option>
                <option value="sales">영업</option>
                <option value="cs">CS</option>
            `);
            break;

        case "partner":
            suggestBox.insertAdjacentHTML("beforeend", `<option value="introducer">소개자</option>`);
            salesBox.insertAdjacentHTML("beforeend", `<option value="sales">영업</option>`);
            break;

        case "vendor":
            suggestBox.insertAdjacentHTML("beforeend", `<option value="vendor">파트너</option>`);
            salesBox.insertAdjacentHTML("beforeend", `<option value="sales">영업</option>`);
            break;
    }

}

// 계약구분 테이블 Input text 초기화
function clearCMSTableInput(parent) {
    document.querySelector(`${parent} input[name=suggesterInfo]`).value = '';
    document.querySelector(`${parent} input[name=salesPersonInfo]`).value = '';
}

// 계약구분 select박스 변경시 채널구분 변경
function changeChannel(contractClassify, id) {
    let classify = contractClassify.value;
    let parent = '';
    if (id == 'contract') {
        parent = '#modal';
    } else if (id == 'company') {
        parent = '#main'
    }

    let channelClassify = document.querySelector(`${parent} select[name=channelClassify]`);
    let salesSelect = document.querySelector(`${parent} select[name=sales]`);
    let salesPerson = document.querySelector(`${parent} input[name=salesPersonInfo]`);
    let directContract = {
        "선택": "", "직접계약": "directContract",
        "비영업소개": "nonSales", "인바운드": "inbound",
        "아웃바운드": "outbound"
    };
    let indirectContract = {"선택": "", "파트너소개": "partner", "대리점영업": "vendor"};

    channelClassify.innerText = '';

    let targetObj = '';
    if (classify == 'directContract') {
        targetObj = directContract;
    } else if (classify == 'indirectContract') {
        targetObj = indirectContract;
    }

    for (const [key, value] of Object.entries(targetObj)) {
        let option = document.createElement('option');
        option.innerText = key;
        option.value = value;
        channelClassify.append(option);
    }

}

// 이름검색 후 선택 시에
function selMember(inputName, mSeq, userName) {
    const main = document.getElementById('main');
    const modal = document.getElementById('modal');
    let eleId = '';

    if (modal) {
        eleId = '#modal';
    }

    if (main) {
        eleId = '#main';
    }

    const input = document.querySelector(`${eleId} input[name=${inputName}]`);
    input.value = mSeq + '/' + userName;
    closeDialog();
}

// 첨부 파일 삭제
function deleteFile() {
    let fileDiv = document.querySelector('#modal #file');
    fileDiv.innerText = '';
    fileDiv.innerHTML = '<h1>계약서 첨부</h1>' +
        '<input type="hidden" name="delFile" value="Y">' +
        `<input type="file" class="file" name="contractFile">`;

}

// 이름 검색 모달창
function searchMemberDialog(btn, classify, selectName) {
    let input = btn.parentNode.children[0];
    let parent = '';
    if (classify == 'company') {
        parent = '#main';
    } else {
        parent = '#modal';
    }

    let modalWrite = '';
    modalWrite += '<dialog id="findMember" style="width: 300px; border: 1px solid gray">' +
        '<div id="searchDiv">' +
        '<div style="display:flex; justify-content:space-between; font-size: 20px;">' +
        '<span>이름 검색</span><i class="xi-close" onclick="closeDialog()"></i></div>' +
        `<form id="member" style="padding-top:10px;" onsubmit="return false;">
            <input type="hidden" name="member" value="Y">
            <input type="text" name="userName" style="width: 200px; height: 30px;">
            <button type="button"
                    style="margin-left: 10px; border-radius: 5px; padding: 4px 8px;"
                    onclick="fetchMember(this, '${classify}', '${input.name}', '${selectName}')">검색</button>
        </form>` +
        '</div>' +
        '<div id="listDiv" style="padding-top:10px;"></div>' +
        '</dialog>';
    $('#contents').after(modalWrite);

    const dialog = document.getElementById('findMember');
    dialog.showModal();
}

// 이름 검색 종료
function closeDialog() {
    const dialog = document.getElementById('findMember');
    dialog.close();
}

// 계약서 등록 및 수정
function submitContract(classify) {
    if (!checkForm(`${classify}`)) {
        return false;
    }

    let parent = '';
    if (classify == 'company') {
        parent = '#main';
    } else {
        parent = '#modal';
    }

    let form = document.querySelector(`${parent} #writeForm`);
    let formData = new FormData(form);

    if (classify == 'contract') {
        formData.append("update", "Y");
    }

    fetch(contractApi, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "ContentType": "application/x-www-form-urlencoded"
        },
        body: formData
    })
        .then(response => response.json())
        .then((data) => {
            if (data.result === 'success') {
                alert('등록됐습니다.');
                contractAct(companySeq);
            } else if (data.result === 'update') {
                alert("수정됐습니다.");
                modalClose();
            } else if (data.result === 'error') {
                alert('실패했습니다.');
            } else if (data.result === 'duplicate') {
                alert('해당 기간에 계약이 존재합니다.');
            } else if (data.result === 'file') {
                alert('파일에 오류가 있습니다.');
            } else if (data.result === 'size') {
                alert('파일 최대 크기는 10MB입니다.');
            } else {
                alert('오류가 발생했습니다.');
            }
        });
}

// 계약서 삭제
function deleteContract(contractSeq) {
    if (!confirm("삭제 하시겠습니까?")) return;

    fetch(contractApi, {
        method: "DELETE",
        headers: {
            "ContentType": "application/x-www-form-urlencoded"
        },
        body: "contractSeq=" + contractSeq
    })
        .then(response => response.json())
        .then((data) => {
            if (data.result === 'success') {
                alert('삭제됐습니다.');
                modalClose();
                contractAct(companySeq);
            } else if (data.result === 'error') {
                alert('실패했습니다.');
            } else {
                alert('오류가 발생했습니다.');
            }
        });
}

// 계약서 모달창
async function contractModal(seq) {
    let contract = await fetchContract(seq);
    let modalWrite = '';
    modalWrite += '<div id="modal">' +
        '<div class="BBSWrite">' +
        '<h1><strong>내용</strong><button type="button" onClick="modalClose();"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>' +
        contractInfoTable('contract', contract) +
        '</div>' +
        '</div>';
    $('#contents').after(modalWrite);

    document.querySelector('#modal select[name=suggester]').addEventListener('change', () => {
        document.querySelector('#modal input[name=suggesterInfo]').value = '';
    });

    const companyScale = document.querySelector('#modal select[name=companyScale]');
    const strategyClassify = document.querySelector('#modal select[name=strategyClassify]');
    const contractClassify = document.querySelector('#modal select[name=contractClassify]');
    const channelClassify = document.querySelector('#modal select[name=channelClassify]');
    const suggester = document.querySelector('#modal select[name=suggester]');
    const sales = document.querySelector('#modal select[name=sales]');

    setSelectValue(
        [companyScale, strategyClassify, contractClassify, channelClassify, suggester, sales],
        [contract.companyScale, contract.strategyClassify, contract.contractClassify, contract.channelClassify,
            contract.suggester, contract.sales]
    );

    modalAlign();

}

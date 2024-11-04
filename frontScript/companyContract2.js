const contractApi = '../api/apiCompanyContract.php';
const cmsCodeApi = '../api/apiSalesCmsCode.php';
let companySeq = '';

// 셀렉트 박스 순서, 숫자가 작을수록 상위 셀렉트
const idObj = {'ST01': 0, 'CT01': 1, 'CH01': 2, 'suggester': 3, 'sales': 4};
let contractList = '';

/**
 * 계약서 메인화면
 * @param seq
 * @returns {Promise<void>}
 */
async function contractAct(seq) {
  companySeq = seq;
  $('.searchArea').remove();
  let company = await fetchCompany(seq); //사업주 정보
  company = company["company"][0];

  let writes = '';
  writes += '<div id="main">';
  writes += contractInfoTable('main', company);
  writes += '</div>';
  $('#contentsArea').removeAttr('class')
  $('#contentsArea').addClass('BBSWrite')
  $('#contentsArea').html(writes); // 계약서 및 계약구분 출력

  setSelectbox('main', 'ST01');

  let lists = '<div id="contractListDiv"></div>';
  $('#contentsArea').append(lists);
  contractListTable(company.companyCode);
}

/**
 * 계약서 목록
 * @param companyCode
 * @returns {Promise<void>}
 */
async function contractListTable(companyCode) {
  contractList = await fetchContracts(companyCode);
  contractList = contractList["contractList"];

  let contractStatus = '';

  let template = '';
  template += '<div class="txt-l"><h1>계약서 목록</h1></div>' +
    `<table id="contractList" style="width: 100%; min-width:700px; margin: 0 auto; float:left; min-width: 500px; border-collapse: collapse; border:1px solid black; text-align: center;">` +
    '<thead style="font-size: 16px;">' +
    '<tr style="border: 1px solid black;">' +
    '<th style="width: 150px; background: #eceadd;">계약번호</th>' +
    '<th style="width: 150px; background: #eceadd;">계약등록일</th>' +
    '<th style="width: 250px; background: #eceadd;">계약기간</th>' +
    '<th style="width: 100px; background: #eceadd;">조회 및 수정</th>' +
    '<th style="width: 80px; background: #eceadd;">상태</th>' +
    '<th style="width: 80px; background: #eceadd;">삭제</th>' +
    '</tr>' +
    '</thead>';

  template += '<tbody>';
  if (contractList != null) {
    var i = 0;
    while (i < contractList.length) {
      var data = contractList[i];
      template += '<tr style="border: 1px solid black; font-size: 14px;">' +
        `<td>${data.contractSeq}</td>` +
        `<td>${data.inputDate}</td>` +
        `<td>${data.contractStart} ~ ${data.contractEnd}</td>` +
        `<td><button onclick="contractModal('${data.seq}')">열기</button></td>`;

      if (data.contractTermination == 'Y') {
        contractStatus = '해지';
      } else {
        if (moment(data.contractEnd).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
          contractStatus = '만료';
        } else {
          contractStatus = '정상';
        }
      }

      template += `<td>${contractStatus}</td>`;
      template += `<td><button onclick="deleteContract('${data.contractSeq}')">삭제</button></td>`
      template += '</tr>';
      i++;
    }
  } else {
    template += '<td colspan="20">등록 결과가 없습니다.</td>';
  }

  template += '</tbody>';
  template += '</table>';

  document.getElementById('contractListDiv').innerHTML = '';
  document.getElementById('contractListDiv').insertAdjacentHTML('beforeend', template);
  controlUI('contractListTable')
}


/**
 * 계약서 작성 폼
 * @param parent
 * @param company
 * @returns {string}
 */
function contractInfoTable(parent, company) {
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
  let companyName = '';
  let companyScale = '';
  let contractSeq = '';
  let contractStart = '';
  let contractEnd = '';
  let contractFile = null;
  let contractFileName = '';
  let contractFile5 = null;
  let contractFile5Name = '';
  let userPrivacyFile = null;
  let userPrivacyFileName = '';
  let isFilesNotExist = '';
  let contractTermination = '';
  let terminationDate = '';
  let terminationReason = '';

  if (parent == 'main') {
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
    companyName = company.companyName;
  } else if (parent == 'modal') {
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
    companyName = company.companyName;
    companyScale = company.companyScale;
    contractStart = company.contractStart;
    contractEnd = company.contractEnd;
    contractFile = company.contractFile;
    contractFileName = company.contractFileName;
    contractFile5 = company.contractFile5;
    contractFile5Name = company.contractFile5Name;
    userPrivacyFile = company.userPrivacyFile;
    userPrivacyFileName = company.userPrivacyFileName;
    contractSeq = company.contractSeq;
    isFilesNotExist = company.isFilesNotExist;
    contractTermination = company.contractTermination;
    terminationDate = company.terminationDate ?? '';
    terminationReason = company.terminationReason ?? '';
  }

  let template = '';
  template += `<form id="writeForm" style="min-width: 700px;" class="writeform" method="post" action="${contractApi}" enctype="multipart/form-data">`;
  template += '<div style="overflow-y: unset;"><h1>';
  if (parent == 'main') {
    template += '계약서등록조회화면';
  } else {
    template += '계약서 조회 및 수정';
  }
  template += '</h1></div>';
  template += `<li>
            <div class="halfDiv">
                <h1>사업주</h1>
                <span>${companyName}</span>
            </div>
        </li>`;

  template += '<li><div class="halfDiv">';
  template += '<h1>지원구분</h1>';
  if (parent == 'modal') {
    if (companyScale == 'A') {
      template += '대규모 1000인 이상';
    } else if (companyScale == 'B') {
      template += '대규모 1000인 미만';
    } else {
      template += '우선지원대상';
    }

  } else {
    template += '<select id="companyScale" name="companyScale" >' + optWrite['companyScale'] + '</select>';
  }

  template += '</div></li>';

  template += '<li><div class="halfDiv" style="width: 100%;">';
  template += '<h1>계약기간</h1>';
  template += `<input type="text" name="contractStart" value="${contractStart}" onkeyup="inputYMDNumber(this)"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>~';
  template += `<input type="text" name="contractEnd" value="${contractEnd}" onkeyup="inputYMDNumber(this)"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>';
  template += '</div></li>';

  template += '<li><div class="halfDiv" style="width: 100%;">';
  template += '<h1>사업장관리번호<br>(고용관리번호)</h1>';
  template += `<input type="text" name="hrdCode" value="${hrdCode}" placeholder="11자리 입력" maxlength="11"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += `>&nbsp;`;
  template += '<a href="https://www.comwel.or.kr/comwel/info/cont/cont.jsp"' +
    ' target="_blank">사업장관리번호 찾기</a>'
  '</div>' +
  '</li>';

  template += '<li><h1>교육담당자명</h1>';
  template += `<input type="text" name="managerName" value="${managerName}"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>'
  template += '</li>';

  template += '<li><div class="halfDiv" style="width: 100%;">';
  template += '<h1>교육담당자 연락처</h1>';
  template += `<input type="text" class="tel" name="mobile01" value="${mobile01}" maxlength="3"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '> - ';
  template += `<input type="text" class="tel" name="mobile02" value="${mobile02}" maxlength="4"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '> - ';
  template += `<input type="text" class="tel" name="mobile03" value="${mobile03}" maxlength="4"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>';
  template += '</div></li>';

  template += '<li><div class="halfDiv" style="width: 100%;">';
  template += '<h1>교육담당자 이메일</h1>';
  template += `<input type="text" class="email" value="${email01}" name="email01"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '> @ ';
  template += `<input type="text" class="email" value="${email02}" name="email02"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>';
  template += '</div></li>';

  template += '<li><div class="halfDiv" style="width: 100%;">';
  template += '<h1>전자계산서<br> 발행 이메일</h1>';
  template += `<input type="text" class="email" name="elecEmail01" value="${elecEmail01}"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '> @ ';
  template += `<input type="text" class="email" name="elecEmail02" value="${elecEmail02}"`;
  if (parent == 'modal') {
    template += 'style="background: #ecf0f1" readonly';
  }
  template += '>';
  template += '</div></li>';

  template += '<li>' +
    '<div id="file" class="halfDiv" style="width: 100%;">' +
    '<h1>환급 계약서 첨부</h1>';

  if (contractFile == null) {
    template += `<input id="contractFile" type="file" class="file" name="contractFile">`;
  } else {
    template += `<a href="../lib/fileDownLoad.php?fileName=${contractFileName}&link=${contractFile}"
        style="text-decoration: none; color: black;" target="_blank">${contractFileName}</a>
        <button type="button" style="margin-left: 10px; border-radius: 5px;" onclick="deleteFile('file', 'contractFile');">삭제</button>`;
  }

  template += '</div></li>';

  template += `<li>
        <div id="file2" class="halfDiv" style="width: 100%">
            <h1>비환급 계약서 첨부</h1>`;

  if (contractFile5 == null) {
    template += `<input id="contractFile5" type="file" class="file" name="contractFile5">`;
  } else {
    template += `<a href="../lib/fileDownLoad.php?fileName=${contractFile5Name}&link=${contractFile5}"
        style="text-decoration: none; color: black;" target="_blank">${contractFile5Name}</a>
        <button type="button" style="margin-left: 10px; border-radius: 5px;" onclick="deleteFile('file2', 'contractFile5');">삭제</button>`;
  }

  template += `</div></li>`;

  template += `<li>
        <div id="file3" class="halfDiv" style="width: 100%">
            <h1>개인정보동의서 첨부</h1>`;

  if (userPrivacyFile == null) {
    template += `<input id="userPrivacyFile" type="file" class="file" name="userPrivacyFile">`;
  } else {
    template += `<a href="../lib/fileDownLoad.php?fileName=${userPrivacyFileName}&link=${userPrivacyFile}"
        style="text-decoration: none; color: black;" target="_blank">${userPrivacyFileName}</a>
        <button type="button" style="margin-left: 10px; border-radius: 5px;" onclick="deleteFile('file3', 'userPrivacyFile');">삭제</button>`;
  }

  template += `</div></li>`;

  if (['hmjung1', 'dnthdgml', 'may57'].includes(loginUserID)) {

    template += `<li>
            <div class="halfDiv" style="width:100%; display:flex; gap: 0 10px; align-items:center;">
                <input id="isFilesNotExist" type="checkbox" name="isFilesNotExist" value="Y" style="display:inline; width:15px; height:15px;"`;

    if (isFilesNotExist == 'Y') {
      template += ` checked`;
    }

    template += `>`;

    template += `<span style="font-size:13px" onclick="checkFilesNotExist(this)">실물 계약서 없음</span>`;

    template += `</div></li>`;
  }

  if (parent == 'modal') {
    template += `<li>
            <div class="halfDiv" style="width:100%; display:flex; gap: 0 10px; align-items:center;" >
                <input id="contractTermination" type="checkbox" name="contractTermination" value="Y" 
                    style="display: inline; width:15px; height:15px;" onclick="clickCheckbox()"`;

    if (contractTermination == 'Y') {
      template += ` checked`;
    }

    template += `>`;

    template += `<span style="font-size:13px; width:80px;" onclick="checkContractTermination()">계약해지</span>`;
    template += `</div>`;

    template += `<span id="inputDateTitle" style="display:none;">해지날짜: </span><input style="width:130px; height:25px; margin-right:5px;`;
    if (contractTermination == 'N') {
      template += 'display:none;';
    }
    template += `" id="inputDate" name="terminationDate" value="${terminationDate}" placeholder="ex)2023-08-01">`;

    template += `<span id="inputReasonTitle" style="display:none;">해지사유: </span><input style="width:200px; height:25px;`;
    if (contractTermination == 'N') {
      template += 'display:none;';
    }
    template += `" id="inputReason" name="terminationReason" value="${terminationReason}" placeholder="사유 입력">`;

    template += '</li>';
  }


  template += '<div style="overflow-y: unset;"><h1>계약구분</h1></div>' +
    contractCmsTable(`${parent}`, company);

  template += '<div class="btnArea" style="overflow-y: unset;">';



  if (parent == 'main') {
    template += `<a href="/admin/salesApplyBoard.php?locaSel=2601&companyName=${companyName}&companyCode=${companyCode}&elecEmail=${elecEmail01}@${elecEmail02}">
            <button type="button">입과게시판</button></a>`;
    template += `<input type="hidden" name="_method" value="POST">`;
    template += `<button type="button" onclick="submitContract('${parent}')">등록하기</button>` +
      '<button type="button" onclick="listAct()">목록보기</button>';
  } else {
    template += `<input type="hidden" name="_method" value="PUT">`;
    template += `<button type="button" onclick="submitContract('${parent}')">수정하기</button>`;
    // template += `<button type="button" onclick="deleteContract('${contractSeq}')">삭제하기</button>`;
  }

  template += '</div>' +
    '</form>';

  return template;
}

/**
 * 계약 수수료 설정 테이블
 * @param parent
 * @param company
 * @returns {string}
 */
function contractCmsTable(parent, company) {
  let contractRelevant = '';
  let ST01 = '';
  let CT01 = '';
  let CH01 = '';
  let relevantPerson = '';
  let sales = '';
  let salesPersonInfo = '';
  let suggester = '';
  let suggesterInfo = '';
  let template = '';

  if (parent == 'modal') {
    contractRelevant = company.contractRelevant;
    ST01 = company.ST01;
    CT01 = company.CT01;
    CH01 = company.CH01;
    relevantPerson = company.relevantPerson;
    sales = company.sales;
    salesPersonInfo = `${company.salesPersonMSEQ}/`;
    if (company.salesPersonUser) {
      salesPersonInfo += `${company.salesPersonUser}`;
    } else if (company.salesPersonVendor) {
      salesPersonInfo += `${company.salesPersonVendor}`;
    }

    suggester = company.suggester;
    suggesterInfo = `${company.suggesterMSEQ}/`;
    if (company.suggesterUser) {
      suggesterInfo += `${company.suggesterUser}`;
    } else if (company.suggesterVendor) {
      suggesterInfo += `${company.suggesterVendor}`;
    }
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
            <select id="suggester" name="suggester" style="height: 30px;">
                <option value="">선택</option>
            </select>
        </td>` +
    `<td>
            <select id="sales" name="sales" style="height: 30px;">
                <option value="">선택</option>
            </select>
        </td>` +
    '</tr>' +
    '<tr style="font-size: 14px; border: 1px solid black;">' +
    `<td style="border: 1px solid black;"><select id="ST01" name="ST01" style="height: 30px;">` +
    '</select></td>' +
    `<td style="border: 1px solid black;">
            <select id="CT01" name="CT01" style="height: 30px;">
                <option value="">선택</option>
            </select>
        </td>` +
    `<td style="border: 1px solid black;">
            <select id="CH01" name="CH01" style="height: 30px;">
                <option value="">선택</option>
            </select>
        </td>` +

    `<td style="border: 1px black;">` +
    `<div><input style="height: 30px; width:200px;"
            type="text" id="suggesterInfo" name="suggesterInfo" value="${suggesterInfo}" 
            onfocus="searchFoucs(this, '${parent}', 'suggester')" placeholder="이름검색">
        <i class="xi-search" style="margin-left: -20px;" onclick="searchMember(this, '${parent}', 'suggester')"></i>
        <div id="suggesterInfoDrop"></div>
        </div>
        </td>` +

    `<td style="border: 1px black;">` +
    `<div><input style="height: 30px; width:200px;"
            type="text" id="salesPersonInfo" name="salesPersonInfo" value="${salesPersonInfo}" 
            onfocus="searchFoucs(this, '${parent}', 'sales')" placeholder="이름검색">
        <i class="xi-search" style="margin-left: -20px;" onclick="searchMember(this, '${parent}', 'sales')"></i>
        <div id="salesPersonInfoDrop"></div>
        </div>
        </td>` +

    '</tr>' +
    '</tbody>' +
    '</table>';

  return template;
}

/**
 * 사업주 정보
 * @param seq
 * @returns {Promise<any>}
 */
function fetchCompany(seq) {
  const response = fetch(useApi + `?seq=${seq}`);
  return response.then((res) => res.json());
}


/**
 * 계약서 목록용
 * @param companyCode
 * @returns {Promise<any>}
 */
function fetchContracts(companyCode) {
  const response = fetch(contractApi + `?companyCode=${companyCode}`);
  return response.then((res) => res.json());
}

/**
 * 계약서 정보
 * @param seq
 * @returns {Promise<any>}
 */
function fetchContract(seq) {
  const response = fetch(contractApi + `?seq=${seq}`);
  return response.then((res) => res.json());
}

/**
 * 사번 및 벤더 검색
 * @param parent
 * @param input
 * @param selectName
 */
function fetchMember(parent, input, selectName) {

  const listDiv = document.getElementById('listDiv');
  let param = '?member=Y';

  const selectBox = document.querySelector(`#${parent} select[name=${selectName}]`);

  const ST01 = document.getElementById('ST01').value;
  const CT01 = document.getElementById('CT01').value;
  const CH01 = document.getElementById('CH01').value;
  const userName = input.value;

  if (selectBox.value != '') {
    param += `&typeCode=${selectBox.value}`;
  } else {
    alert("계약관계자 선택 후 검색해주세요.");
    return;
  }

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
        let div = document.querySelector(`#${parent} #${input.name}Drop`);
        let bbsWrite = '';
        let bbsHeight = '';

        if (parent == 'modal') {
          bbsWrite = document.querySelector(`#${parent} .BBSWrite`);
          bbsHeight = bbsWrite.getBoundingClientRect().height;
        }


        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.position = 'absolute';
        div.style.backgroundColor = 'white';

        if (parent == 'main') {
          div.style.width = '200px';
          div.style.left = `${input.getBoundingClientRect().left}px`;
        }

        if (parent == 'modal') {
          div.parentNode.style.position = 'relative';
          div.style.width = '80%';
          div.style.left = `10%`;
        }
        div.style.boxShadow = `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`;
        div.style.transition = `all 0.3s cubic-bezier(.25,.8,.25,1)`;

        let innerDiv = '';
        Array.from(members).forEach(ele => {
          innerDiv += `<span onclick="selMember(this, '${parent}','${input.name}')"
                        style="padding:5px 0; font-size:14px; border-bottom: 1px solid gray; cursor:pointer;">
                        ${ele.mSeq}/${ele.userName}</span>`;
        })
        div.innerHTML = '';
        div.insertAdjacentHTML('beforeend', innerDiv);

        if (parent == 'modal') {
          bbsWrite.style.overflowY = "auto";
          bbsWrite.scroll({
            top: bbsHeight,
          });
        }
      }
    });

}

/**
 * 실물 계약서 체크, 라벨 사용시 메인 및 모달 충돌
 * @param obj
 */
function checkFilesNotExist(obj) {
  const input = [...obj.parentNode.children].filter(e => e != obj)[0];
  input.checked ? input.checked = false : input.checked = true;
}

/**
 * 계약해지 클릭 시
 */
function checkContractTermination() {
  const input = document.getElementById('contractTermination');
  if (input.checked) {
    input.checked = false;
    if (document.getElementById('inputDate')) {
      document.getElementById('inputDate').style.display = 'none';
    }

    if (document.getElementById('inputDateTitle')) {
      document.getElementById('inputDateTitle').style.display = 'none';
    }

    if (document.getElementById('inputReason')) {
      document.getElementById('inputReason').style.display = 'none';
    }

    if (document.getElementById('inputReasonTitle')) {
      document.getElementById('inputReasonTitle').style.display = 'none';
    }
  } else {
    input.checked = true;
    document.getElementById('inputDate').style.display = 'inline';
    document.getElementById('inputDateTitle').style.display = 'inline';
    document.getElementById('inputReason').style.display = 'inline';
    document.getElementById('inputReasonTitle').style.display = 'inline';
  }
}

/**
 * 체크박스 클릭 시 이벤트
 */
function clickCheckbox() {
  const input = document.getElementById('contractTermination');
  if (input.checked) {
    document.getElementById('inputDate').style.display = 'inline';
    document.getElementById('inputDateTitle').style.display = 'inline';
    document.getElementById('inputReason').style.display = 'inline';
    document.getElementById('inputReasonTitle').style.display = 'inline';

  } else {
    if (document.getElementById('inputDate')) {
      document.getElementById('inputDate').style.display = 'none';
    }

    if (document.getElementById('inputDateTitle')) {
      document.getElementById('inputDateTitle').style.display = 'none';
    }

    if (document.getElementById('inputReason')) {
      document.getElementById('inputReason').style.display = 'none';
    }

    if (document.getElementById('inputReasonTitle')) {
      document.getElementById('inputReasonTitle').style.display = 'none';
    }
  }
}

/**
 * 사번 및 벤더 검색 후 span 선택
 * @param span
 * @param parent
 * @param inputName
 */
function selMember(span, parent, inputName) {
  const input = document.querySelector(`#${parent} input[name=${inputName}]`);
  input.value = '';
  input.value = span.innerText;
  span.parentNode.innerHTML = '';
}

/**
 * 첨부 파일 삭제
 * @param divId: div box  id
 * @param fileId: input file -> id, name
 */
function deleteFile(divId, fileId) {
  let fileDiv = document.querySelector(`#modal #${divId}`);
  let delName = '';
  let h1Name = '';
  switch (fileId) {
    case 'contractFile':
      h1Name = '환급 계약서 첨부';
      delName = 'delFile01';
      break;

    case 'contractFile5':
      h1Name = '비환급 계약서 첨부';
      delName = 'delFile02';
      break;

    case 'userPrivacyFile':
      h1Name = '개인정보동의서 첨부';
      delName = 'delFile03';
      break;
  }
  fileDiv.innerText = '';
  fileDiv.innerHTML = `<h1>${h1Name}</h1>` +
    `<input type="hidden" name="${delName}" value="Y">` +
    `<input id="${fileId}" type="file" class="file" name="${fileId}">`;

}

/**
 * 사번 및 벤더 검색 인풋 포커스 시에
 * @param input
 * @param parent
 * @param selectName
 */
function searchFoucs(input, parent, selectName) {
  if (!input.classList.contains('once')) {
    document.querySelector(`#${parent} #${input.id}`).addEventListener('keypress', (e) => {
      input.classList.add("once");
      if (e.key == 'Enter') {
        fetchMember(parent, input, selectName);
      }
    })
  }
}

/**
 * 검색 버튼 클릭
 * @param btn
 * @param parent
 * @param selectName
 */
function searchMember(btn, parent, selectName) {
  let input = btn.parentNode.children[0];
  fetchMember(parent, input, selectName);
}

/**
 * 입력값 확인
 * @param parent
 * @returns {boolean}
 */
function checkForm(parent) {
  if (!document.querySelector(`#${parent} input[name=contractStart]`).value || !document.querySelector(`#${parent} input[name=contractEnd]`).value) {
    alert("계약기간을 확인해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} input[name=hrdCode]`).value || document.querySelector(`#${parent} input[name=hrdCode]`).value.length < 11) {
    alert("사업장관리번호를 확인해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} #isFilesNotExist`)) {
    if (document.querySelector(`#${parent} #contractFile`) && document.querySelector(`#${parent} #contractFile5`)) {
      if (!document.querySelector(`#${parent} #contractFile`).value && !document.querySelector(`#${parent} #contractFile5`)) {
        alert("환급, 비환급 계약서 둘 중 하나는 첨부해야합니다.");
        return false;
      }
    }
    if (document.querySelector(`#${parent} #userPrivacyFile`)) {
      if (!document.querySelector(`#${parent} #userPrivacyFile`).value) {
        //리스트에 1개라도 있을 시
        if (contractList == null) {
          alert("개인정보동의서를 첨부해주세요.");
          return false;
        }
      }
    }

  } else {
    if (!document.querySelector(`#${parent} #isFilesNotExist`).checked) {
      if (document.querySelector(`#${parent} #contractFile`) && document.querySelector(`#${parent} #contractFile5`)) {
        if (document.querySelector(`#${parent} #contractFile`).value.length == 0 && document.querySelector(`#${parent} #contractFile5`).value.length == 0) {
          alert("환급, 비환급 계약서 둘 중 하나는 첨부해야합니다.");
          return false;
        }
      }

      if (document.querySelector(`#${parent} #userPrivacyFile`)) {
        if (!document.querySelector(`#${parent} #userPrivacyFile`).value) {
          alert("개인정보동의서를 첨부해주세요.");
          return false;
        }
      }
    }
  }

  if (document.getElementById('inputDate')) {
    if (document.getElementById('inputDate').style.display !== 'none') {
      if (document.getElementById('inputDate').value.length < 10) {
        alert('해지 날짜를 입력해주세요.');
        return;
      }
    }
  }

  if (document.getElementById('inputReason')) {
    if (document.getElementById('inputReason').style.display !== 'none') {
      if (document.getElementById('inputReason').value.length == 0) {
        alert('해지 사유를 입력해주세요.');
        return;
      }
    }
  }


  if (!document.querySelector(`#${parent} select[id=ST01]`).value) {
    alert("전략구분을 선택해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} select[id=CT01]`).value) {
    alert("계약구분을 선택해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} select[id=CH01]`).value) {
    alert("채널구분을 선택해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} select[name=sales]`).value) {
    alert("영업담당을 선택해주세요.");
    return false;
  }

  if (!document.querySelector(`#${parent} input[name=salesPersonInfo]`).value) {
    alert("영업담당을 입력해주세요.");
    return false;
  }

  if (document.querySelector(`#${parent} input[name=salesPersonInfo]`).value) {
    if (!/\//.test(document.querySelector(`#${parent} input[name=salesPersonInfo]`).value)) {
      alert('영업담당 이름을 검색을 해주세요.');
      return false;
    }
  }

  if (document.querySelector(`#${parent} input[name=suggesterInfo]`).value != '') {
    if (!/\//.test(document.querySelector(`#${parent} input[name=suggesterInfo]`).value)) {
      alert('발굴자 이름을 검색을 해주세요.');
      return false;
    }
  }

  return true;
}


/**
 * 계약서 등록 및 수정
 * @param parent
 * @returns {boolean}
 */
function submitContract(parent) {
  if (!checkForm(`${parent}`)) {
    return false;
  }

  let form = document.querySelector(`#${parent} #writeForm`);
  let formData = new FormData(form);

  if (parent == 'modal') {
    formData.append("update", "Y");
  }

  const contractStart = new Date(document.querySelector(`#${parent} input[name=contractStart]`).value);
  const contractEnd = new Date(document.querySelector(`#${parent} input[name=contractEnd]`).value);

  if (contractStart > contractEnd) {
    alert('계약기간을 확인해주세요.');
    return;
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
        contractListTable(data.companyCode);
        modalClose();
      } else if (data.result === 'error') {
        alert('실패했습니다.');
      } else if (data.result === 'duplicate') {
        alert('해당 기간에 계약이 존재합니다.');
      } else if (data.result === 'year') {
        alert('년도 수정은 불가능합니다.');
      } else if (data.result === 'file') {
        alert('파일에 오류가 있습니다.');
      } else if (data.result === 'size') {
        alert('파일 최대 크기는 10MB입니다.');
      } else if (data.result === 'cntFile1') {
        alert('해당 년도에 이미 10개의 환급 계약이 존재합니다.');
      } else if (data.result === 'cntFile5') {
        alert('해당 년도에 이미 10개의 비환급 계약이 존재합니다.')
      } else if (data.result == 'full') {
        alert('해당 년도에 더이상 등록할 수 없습니다.');
      } else {
        alert('오류가 발생했습니다.');
      }
    });
}

/**
 * 계약서 삭제
 * @param contractSeq
 */
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

/**
 * 계약서 모달창
 * @param seq
 * @returns {Promise<void>}
 */
async function contractModal(seq) {

  let contract = await fetchContract(seq);
  let modalWrite = '';
  modalWrite += '<div id="modal">' +
    '<div class="BBSWrite">' +
    '<h1><strong>내용</strong><button type="button" onClick="modalClose();"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>' +
    contractInfoTable('modal', contract) +
    '</div>' +
    '</div>';
  $('#contents').after(modalWrite);
  modalAlign();
  controlUI('contractModal');
  await setModalSelectbox('modal', 'ST01', '', contract);

  const companyScale = document.querySelector('#modal select[name=companyScale]');

}

/**
 *
 * @param selects select tag
 * @param vals value
 * @param text innerText
 */
function setSelectValue(selects, vals, text = '') {
  if (selects.id == 'companyScale' || selects.id == 'ST01') {
    selects.value = vals;
  } else {
    selects.innerHTML = `<option value="${vals}">${text}</option>`;
  }

}

/**
 * api type으로 검색
 * @param id
 * @returns {Promise<any>}
 */
async function getUseType(id) {
  let type = '';
  if (id == 'ST01') {
    type = '전략구분';
  } else if (id == 'CT01') {
    type = '계약구분'
  }

  const res = await fetch(cmsCodeApi + `?type=${type}`, {
    method: 'GET'
  })

  return res.json();
}

/**
 * api typeCode로 검색
 * @param typeCode
 * @returns {Promise<any|boolean>}
 */
async function getUseTypeCode(typeCode) {
  if (typeCode.length < 1) return false;

  const res = await fetch(cmsCodeApi + `?typeCode=${typeCode}`, {
    method: 'GET',
  })

  return res.json();
}


/**
 * 메인 화면 select box 생성 및 할당
 * @param parent
 * @param id
 * @param value
 * @returns {Promise<void>}
 */
async function setSelectbox(parent, id, value = '') {
  if (!(id in idObj)) return;

  let data = '';
  let options = '';
  let nextId = findObjectKey(idObj, idObj[id] + 1);

  if (['ST01', 'CT01'].includes(id)) {
    data = await getUseType(id);
  } else {
    data = await getUseTypeCode(value);
  }

  if (!data) {
    options = '<option value="">선택</option>';
  } else {
    options = await makeOption(id, data.result.types);
  }

  await initElement(parent, id, options);

  if (id in idObj) {
    await addChangeEventToSelect(parent, id, nextId);
  }
}

/**
 * 계약서 수정 모달시에 select box 생성 및 할당
 * @param parent
 * @param id
 * @param value
 * @param contractObj
 * @returns {Promise<void>}
 */
async function setModalSelectbox(parent, id, value = '', contractObj) {
  if (!(id in idObj)) return;

  let data = '';
  let options = '';
  let selectedVal = '';
  let nextId = findObjectKey(idObj, idObj[id] + 1);

  if (['ST01', 'CT01'].includes(id)) {
    data = await getUseType(id);
  } else {
    data = await getUseTypeCode(value);
  }

  selectedVal = contractObj[id];
  options = await makeOption(id, data.result.types, selectedVal);
  await initElement(parent, id, options);

  if (id in idObj) {
    setModalSelectbox(parent, nextId, selectedVal, contractObj);
    await addChangeEventToSelect(parent, id, nextId);
  }
}

/**
 * select box option 생성
 * @param id element id
 * @param obj fetch data
 * @param selectedValue 수정 시에 저장된 값
 * @returns {string}
 */
function makeOption(id, obj, selectedValue = '') {
  let opt = '<option value="">선택</option>';

  Array.from(obj).forEach(ele => {
    opt += `<option value="${ele.typeCode}"`;

    if (selectedValue == ele.typeCode) opt += ' selected';

    if (ele.tsName == null) {
      opt += `>${ele.typeName}</option>`;
    } else {
      opt += `>${ele.tsName}</option>`;
    }
  });

  return opt;
}

/**
 * 하위 셀렉트 박스 초기화
 * @param parent
 * @param id
 */
function initChildElement(parent, id) {
  for (var i = idObj[id] + 1; i < Object.keys(idObj).length; i++) {
    const eId = findObjectKey(idObj, i);
    initElement(parent, eId, '<option value="">선택</option>');
  }
}

/**
 * 셀렉트 박스 초기화
 * @param parent
 * @param id
 * @param options
 */
function initElement(parent, id, options) {
  document.querySelector(`#${parent} #${id}`).innerHTML = '';
  document.querySelector(`#${parent} #${id}`).insertAdjacentHTML('beforeend', options);
}

/**
 * 값을 기준으로 Key 찾기
 * @param obj
 * @param value
 * @returns {string}
 */
function findObjectKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] == value);
}

/**
 * select박스에 change 이벤트 부착
 * @param parent
 * @param id
 * @param nextId
 */
function addChangeEventToSelect(parent, id, nextId) {
  if (!document.querySelector(`#${parent} #${id}`).classList.contains('once')) {
    document.querySelector(`#${parent} #${id}`).classList.add('once');
    document.querySelector(`#${parent} #${id}`).addEventListener('change', (e) => {
      initChildElement(parent, id);
      if (id != 'sales') {
        setSelectbox(parent, nextId, e.target.value);
        clearTextInput(parent, 'suggesterInfo');
        clearTextInput(parent, 'salesPersonInfo');
      } else {
        clearTextInput(parent, 'salesPersonInfo');
      }
    })
  }

}

/**
 * input[type=text] init
 * @param parent string
 * @param id string
 */
function clearTextInput(parent, id) {
  document.querySelector(`#${parent} #${id}`).value = '';
}

function tempMessageAlert() {
  const dialog = document.createElement('dialog');
  let inner = '';

}


/*
전혜연, 우송희 전용 기능

- 조회 및 수정 부분 열기 클릭시 계약기간 ~ 전자계산서 발행 이메일 수정 활성화

*/
function controlUI(location) {

  if (location == 'contractModal') {
    if (checkAdmin()) {
      //모달창 인풋 활성화
      var inputOnModal = document.querySelectorAll('#modal input');
      for (let i = 0; i < 11; i++) {
        inputOnModal[i].readOnly = false
        inputOnModal[i].style = ''
      }

    } else {
      //전혜연, 우송희 외 닫기 버튼
      var buttonOnModal = document.querySelector('#modal #writeForm > div.btnArea > button')
      buttonOnModal.setAttribute("onClick", 'modalClose();')
      buttonOnModal.textContent = '닫기'
    }
  }

  if (location == 'contractListTable') {
    if (checkAdmin()) {

    } else {
      //삭제버튼 비활성
      let removeBtns = document.querySelectorAll('#contractList > tbody > tr > td:nth-child(6) > button')
      removeBtns.forEach((el) => el.disabled = true)
    }
  }
}

function checkAdmin() {
  if (/^dhkang$|^dnthdgml$|^may57$|^zkfmak3785$/.test(loginUserID)) {
    return true
  }
  return false
}
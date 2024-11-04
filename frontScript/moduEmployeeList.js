let emp = '';

//리스트 소팅
async function listAct(page){
    moduCode = await getModuCode();
    //상단 액션 부분
    var actionArea = '';
    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';

    actionArea += '<span>이름/사번</span>';
    actionArea += '<input type="text" name="userSearch" />&nbsp;';

    actionArea += '<button type="submit" onClick="searchAct()">검색하기</button>';
    actionArea += '<button type="button" id="addEmp" class="fRight">사원등록</button>';
    actionArea += '</form>'
    actionArea += '</div>';
    $('#contents > h1').after(actionArea);
    //게시물 소팅부분
    var contents = `
        <table>
            <thead>
                <tr>
                    <th style="width:60px;">번호</th>
                    <th style="width:100px;">사번</th>
                    <th style="width:100px;">이름</th>
                    <th style="width:200px;">소속</th>
                    <th style="width:200px;">부서</th>
                    <th style="width:140px;">직군</th>
                    <th style="width:140px;">직책</th>
                    <th style="width:40px;">퇴사여부</th>
                    <th style="width:100px;">수정/삭제</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);

    document.getElementById('addEmp').addEventListener('click', () => {
        if (loginUserLevel != '2') {
            alert("권한이 없습니다.");
            return false;
        }
        editEmpDialog('create');
    });

    ajaxAct();
}

async function ajaxAct(sortDatas){
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if(sortDatas != ''){
        sortData = sortDatas
    }


    emp = await fetchEmployee(sortData);
    emp = emp['empList'];

    let lists = '';

    if (emp == null) {
        lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
    } else if (emp.length > 0) {
        for (var i=0; i<emp.length; i++){
            const empInfo = emp[i];
            lists += `<tr id="emp${emp[i].seq}">`;
            lists += `<td>${i+1}</td>`;
            lists += `<td>${emp[i].mSeq}</td>`;
            lists += `<td>${emp[i].userName}</td>`;
            lists += `<td>${moduCode.organization[emp[i].organization]}</td>`;
            lists += `<td>${moduCode.department[emp[i].department]}</td>`;
            lists += `<td>${moduCode.titleClass[emp[i].titleClass]}</td>`;
            lists += `<td>${moduCode.title[emp[i].title]}</td>`;
            !emp[i].leaveDate ? lists += `<td></td>` : lists += `<td>퇴사</td>`;
            lists +=
                `<td>
                    <div class="btnArea">
                        <button id="update" type="button" onclick="editEmpDialog('update', '${i}')">수정</button>
                        <button type="button" onclick="deleteEmp('${emp[i].seq}')">삭제</button>
                    </div>
                </td>`;
            lists += '</tr>';
        }
    }

    $('.BBSList tbody').html(lists);
    pagerAct();
    loadingAct();
}

// 사원 정보 fetch
function fetchEmployee(sortData) {
    const response = fetch(useApi + '?' +sortData);
    return response.then((res) => res.json());
}

// 사원 등록 모달
function editEmpDialog(action, row = '') {
    let method = '';
    let actionTitle = '';
    //action -> create, update
    if (action == 'create') {
        actionTitle = '등록';
        method = 'POST';
    } else if (action == 'update') {
        actionTitle = '수정';
        method = 'PUT';
    }

    let empInfo = '';
    let seq = '';
    let organization = '';
    let department = '';
    let titleClass = '';
    let title = '';
    let userName = '';
    let birth = '';
    let sex = '';
    let mobile01 = '';
    let mobile02 = '';
    let mobile03 = '';
    let joinDate = '';
    let finalJoinDate = '';
    let leaveDate = '';

    if (row != '') {
        empInfo = emp[row];
        seq = empInfo.seq;
        organization = empInfo.organization;
        department = empInfo.department;
        titleClass = empInfo.titleClass;
        title = empInfo.title;
        userName = empInfo.userName ?? '';
        birth = empInfo.birth ?? '';
        sex = empInfo.sex;
        mobile01 = empInfo.mobile01 ?? '';
        mobile02 = empInfo.mobile02 ?? '';
        mobile03 = empInfo.mobile03 ?? '';
        joinDate = empInfo.joinDate ?? '';
        finalJoinDate = empInfo.finalJoinDate ?? '';
        leaveDate = empInfo.leaveDate ?? '';
    }
    let modal = '';
    modal += `
        <dialog id="addEmpDiv">
            <div class="BBSWrite">
                <div id="addEmpTitle">
                    <span>사원 ${actionTitle}</span><i class="xi-close" onclick="closeEditEmpDialog()"></i>
                </div>
                <form id="writeForm" class="writeform" method="post">
                    <input type="hidden" name="_method" value="${method}">
                    <input type="hidden" name="seq" value="${seq}">
                    <li>
                        <div class="lineDiv">
                        <h1>소속 <strong class="price">(*)</strong></h1>
                        ${organiztionSelect(organization)}
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>부서 <strong class="price">(*)</strong></h1>
                        ${departmentSelect(department)}
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv" >
                        <h1>직군 <strong class="price">(*)</strong></h1>
                        ${titleClassSelect(titleClass)}
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>직책 <strong class="price">(*)</strong></h1>
                        ${titleSelect(title)}
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>이름 <strong class="price">(*)</strong></h1>
                        <input type="text" name="userName" value="${userName}">
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>생일</h1>
                        <input type="text" name="birth" value="${birth}" onkeyup="inputYMDNumber(this)"
                        placeholder="ex) 2002-02-02">
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>성별</h1>
                        ${sexSelect(sex)}
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>연락처</h1>
                        <input type="tel" class="tel" value="${mobile01}" name="mobile01"> -
                        <input type="tel" class="tel" value="${mobile02}" name="mobile02"> -
                        <input type="tel" class="tel" value="${mobile03}" name="mobile03">
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>입사일</h1>
                        <input type="text" name="joinDate" value="${joinDate}" onkeyup="inputYMDNumber(this)"
                        placeholder="ex) 2002-02-02">
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>보임일</h1>
                        <input type="text" name="finalJoinDate" value="${finalJoinDate}" onkeyup="inputYMDNumber(this)"
                        placeholder="ex) 2002-02-02"
                        </div>
                    </li>
                    <li>
                        <div class="lineDiv">
                        <h1>퇴사일</h1>
                        <input type="text" name="leaveDate" value="${leaveDate}" onkeyup="inputYMDNumber(this)"
                        placeholder="ex) 2002-02-02">
                        </div>
                    </li>
                </form>
                <div class="btnArea">
                    <button type="button" onclick="submitForm()">${actionTitle}하기</button>
                    <button type="button" onclick="closeEditEmpDialog()">취소하기</button>
                </div>
            </div>
        </dialog>
    `;
    $('#contents').after(modal);

    const dialog = document.getElementById('addEmpDiv');
    dialog.showModal();

    if (row != '') {
        setSelectValues(
            ['organization', 'department', 'titleClass', 'title', 'sex'],
            [ empInfo.organization, empInfo.department, empInfo.titleClass, empInfo.title, empInfo.sex]
        );
    }

}

// 사원 수정 모달창 닫기
function closeEditEmpDialog() {
    const dialog = document.getElementById('addEmpDiv');
    dialog.close();
}

// 등록, 수정
function submitForm() {
    let form = document.querySelector(`#writeForm`);
    let formData = new FormData(form);

    fetch(useApi, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "ContentType": "application/x-www-form-urlencoded"
        },
        body: formData
    })
        .then( response => response.json())
        .then(data => {
            if (data.message !== undefined) {
                alert(`${data.message}`);
            }

            if (data.result !== undefined) {
                if (data.result == 'success') {
                    alert("성공했습니다.");
                    closeEditEmpDialog();
                    ajaxAct();
                } else {
                    alert("실패했습니다.");
                }
            }

        });
}

// 삭제
function deleteEmp(seq) {
    if (!confirm("삭제 하시겠습니까?")) {
        return true;
    }

    fetch(useApi, {
        method: "DELETE",
        cache: "no-cache",
        body: `seq=${seq}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.result !== undefined) {
                if (data.result == 'seq') {
                    alert("SEQ 오류가 발생했습니다.");
                } else if (data.result == 'success') {
                    alert("성공했습니다.");
                    ajaxAct();
                } else {
                    alert("실패했습니다.");
                }
            }
        });
}


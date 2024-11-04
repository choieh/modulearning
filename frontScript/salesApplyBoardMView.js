let cmtArr = [];
let comments = '';
async function viewAct(seq) {
    if (getComputedStyle(document.getElementById('moveUpBtn')).display !== 'none') {
        document.getElementById('moveUpBtn').style.display = 'none';
    }

    if (getComputedStyle(document.getElementById('btnBundle')).display !== 'none') {
        document.getElementById('btnBundle').style.display = 'none';
    }

    comments = '';
    const data = await getView(seq);
    const attachURL = data.attachURL;
    const board = data.board[0];
    history.pushState('', '', document.baseURI);
    window.removeEventListener('scroll', scrollPage);

    window.addEventListener('popstate', function () {
        comments = '';
        cmtArr = [];
        listAct();
    }, { once:true });

    let stateType = {
        W: '대기',
        C: '접수',
        R: '보완',
        N: '처리중',
        Y: '완료',
        '': '오류'
    };

    let state = stateType[board.status];

    let serviceTypeString = '';
    let serviceType = {
        service1: "환급 ",
        service2: "비환급(서비스) ",
        service3: "비환급(판매) ",
        service4: "환급+비환급 ",
        service5: "기직카",
    };
    if (board.addItem03.length > 0) {
        board.addItem03.split('.').forEach(str => {
            serviceTypeString += serviceType[str];
        })
    }

    let view = '';
    view += `
        <div id="viewPage">
            <div class="flex flex-col px-4 gap-y-4">
                <div id="title" class="flex flex-col gap-y-2">
                    <div class="border-b border-gray-200 py-1">[수강날짜: ${board.addItem01} ~ ${board.addItem02}]</div>
                    <div class="border-b border-gray-200 py-1"><span class="font-bold">과정:</span> ${board.subject}</div>
                    <div class="border-b border-gray-200 py-1">
                    <span class="font-bold">작성자:</span> ${board.userName} | ${board.userID} | 
                    <span class="font-bold">처리상태:</span> ${state}</div>
                </div>
                <div id="story" class="flex flex-col gap-y-2">
                    <div><span class="font-bold">- 기업명:</span> ${board.company}</div>
                    <div><span class="font-bold">- 수강구분:</span> ${serviceTypeString}</div>
                    <div><span class="font-bold">- 계산서 메일:</span> ${board.addItem04}</div>
                    <div><span class="font-bold">- 금액:</span> ${board.addItem05}</div>
                    <div><span class="font-bold">- 비고:</span> ${board.content}</div>
                </div>
            </div>
    `;
    view += `
        <div id="fileBox" class="px-4 mt-10">
            <div class="bg-[#4d4d4f] text-[#F3A916] 
                text-lg rounded-t-md text-center py-1">
            첨부파일
            </div>
    `;

    view += `<div class="flex flex-col text-left gap-y-2 px-2 py-3 border border-[#4d4d4f] rounded-b-sm">`;
    if (board.attachFile01) {
        view += `<div class="py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <a href="../lib/fileDownLoad.php?fileName=${board.attachFile01Name}&link=${attachURL}${board.attachFile01}" download>
            1. ${board.attachFile01Name}
            </a>
        </div>`;
    }

    if (board.attachFile02) {
        view += `<div class="py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <a href="../lib/fileDownLoad.php?fileName=${board.attachFile02Name}&link=${attachURL}${board.attachFile02}" download>
            2. ${board.attachFile02Name}
            </a>
        </div>`;
    }

    if (board.attachFile03) {
        view += `<div class="py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <a href="../lib/fileDownLoad.php?fileName=${board.attachFile03Name}&link=${attachURL}${board.attachFile03}" download>
            3. ${board.attachFile03Name}
            </a>
        </div>`;
    }

    if (board.attachFile04) {
        view += `<div class="py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <a href="../lib/fileDownLoad.php?fileName=${board.attachFile04Name}&link=${attachURL}${board.attachFile04}" download>
            4. ${board.attachFile04Name}
            </a>
        </div>`;
    }

    if (board.attachFile05) {
        view += `<div class="py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <a href="../lib/fileDownLoad.php?fileName=${board.attachFile05Name}&link=${attachURL}${board.attachFile05}" download>
            5. ${board.attachFile05Name}
            </a>
        </div>`;
    }

    view += '</div>';
    view += '</div>';
    view += '</div>';

    view += `
        <div class="flex w-full gap-x-4 pt-6 px-4">
            <button type="button" 
            class="w-1/2 bg-blue-300 text-blue-600 py-2 rounded-sm"
            onclick="editContent('${seq}')">수정</button>
            <button type="button" 
            class="w-1/2 bg-red-300 text-red-600 rounded-sm"
            onclick="delContent('${seq}')">삭제</button>
        </div>
    `;

    if (document.getElementById('contentsList') !== null) {
        const contentsList = document.getElementById('contentsList');
        htmlObj.push(contentsList.innerHTML);
    }

    const contents = document.getElementById('contents');
    contents.innerHTML = '';
    contents.insertAdjacentHTML('beforeend', view);
    scrollUp();

    comments = await getComment(seq);

    let cmt = '';
    cmt += `<div id="commentBox" class="p-4">`;
    cmt += `
        <div class="flex flex-col gap-y-2 py-4">
        <div class="flex items-center gap-x-2 text-xl">
           <i class="xi-comment"></i>
           <span>댓글</span>
        </div>
        <form id="cmt" class="flex justify-between gap-x-2 py-2 h-28">
        <input type="hidden" name="userID" value="${loginUserID}">
        <input type="hidden" name="userName" value="${loginUserName}">
        <textarea name="content" class="w-full border-2 border-[#4d4d4f] rounded-sm p-1"></textarea>
        <button type="button" 
        class="bg-[#4d4d4f] w-1/6 min-w-[60px] rounded-sm text-[#F3A916] py-2"
        onclick="submitCmt('${seq}')">
        등록</button>
        </form>
    `;

    if (comments.totalCount > 0) {
        cmt += `<div class="flex flex-col gap-y-4 border-2 border-[#4d4d4f] py-8 rounded-sm">`;
        for (const index in comments.comment) {
            let c = comments.comment[index];
            cmt += `
                <div class="flex flex-col gap-y-1 px-2 py-2 border-b border-gray-200">
                    <div class="flex justify-between">
                        <div class="flex gap-x-1 items-center">
                            <span class="text-md font-bold">${c.userName}</span>
                            <span class="text-sm text-gray-500">${c.inputDate}</span>
                        </div>
                
            `;

            cmt += `
                    </div>
                        <div id="cmt${index}" >
                        <span>${c.content}</span>
                        
            `;

            if (loginUserID == c.userID) {
                cmt += `
                <div class="flex justify-end gap-x-4 pt-3">
                    <button 
                    class="w-1/12 min-w-[50px] bg-blue-300 text-blue-600 rounded-sm"
                    onclick="editCmtBox('${index}', '${seq}')">
                    수정</button>

                    <button 
                    class="w-1/12 min-w-[50px] bg-red-300 text-red-600 rounded-sm"
                    onclick="delCmt('${index}', '${seq}')">
                    삭제</button>
                </div>
            `;
            }
            cmt += `</div></div>`;
        }
    }

    contents.insertAdjacentHTML('beforeend', cmt);
}

async function getView(seq) {
    const result = await fetch(useApi + `?seq=${seq}&boardCode=16`, {
        method: 'GET'
    })

    return result.json();
}

async function getComment(seq) {
    const result = await fetch(commentApi + `?boardSeq=${seq}`, {
        method: 'GET'
    })

    return result.json();
}

function editContent(seq) {
    writeAct(seq)
}

function delContent(seq) {
    const formData = new FormData();
    formData.append('seq', seq);
    formData.append('delFileAll', 'Y');

    fetch(useApi, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
    })
        .then( (res) => res.text())
        .then( (data) => {
            if (data == 'success') {
                alert('삭제됐습니다.');
                htmlObj = [];
                listAct();
            } else if (data == 'error') {
                alert('실패했습니다.');
            }
        })
}

function submitCmt(boardSeq) {
    const form = document.getElementById('cmt');
    const formData = new FormData(form);
    formData.append('boardSeq', boardSeq);
    formData.append('boardCode', '16');

    fetch(commentApi, {
        method: 'POST',
        body: formData
    })
        .then( (res) => res.json())
        .then( (data) => {
            if (data.result == 'success') {
                viewAct(boardSeq);
            } else if (data.result == 'error') {
                alert('실패했습니다.');
            } else {
                alert('오류가 발생했습니다.');
            }
        })
}

function editCmtBox(index, boardSeq) {
    let createCmt = '';
    createCmt += `
        <form id="editCmt${comments.comment[index].seq}" class="flex justify-between gap-x-2 py-2 h-32">
        <textarea name="content" class="w-full border-2 border-[#4d4d4f] rounded-sm p-1">${comments.comment[index].content}</textarea>
        <button type="button" 
        class="bg-[#4d4d4f] w-1/6 min-w-[60px] rounded-sm text-[#F3A916] py-2" 
        onclick="editCmt('${comments.comment[index].seq}', '${boardSeq}')">
        수정</button>
        </form>
        
        <div class="flex justify-end gap-x-4 pt-4">
            <button 
                class="w-1/12 min-w-[50px] bg-red-300 text-red-600 rounded-sm" 
                onclick="cancleEditCmtBox('${index}')">
            취소</button>
        </div>
    `;

    const cmt = document.getElementById(`cmt${index}`);
    cmtArr.push(cmt.innerHTML);
    cmt.innerHTML = '';
    cmt.insertAdjacentHTML('beforeend',createCmt);

}

function delCmt(index, boardSeq) {
    if (!confirm('삭제하시겠습니까?')) return false;

    const seq = comments.comment[index].seq;

    fetch(commentApi, {
        method: 'DELETE',
        body: `seq=${seq}`
    })
        .then( (res) => res.text())
        .then( (data) => {
            if (data == 'success') {
                alert('삭제됐습니다.');
                viewAct(boardSeq);
            } else if (data == 'error') {
                alert('실패했습니다.');
            } else {
                alert('오류가 발생했습니다.');
            }
        })
}

function editCmt(seq, boardSeq) {
    if (!confirm('수정하시겠습니까?')) return false;

    const form = document.getElementById(`editCmt${seq}`);
    const formData = new FormData(form);
    formData.append('seq', seq);
    formData.append('boardCode', '16');

    fetch(commentApi, {
        method: 'POST',
        body: formData
    })
        .then( (res) => res.json())
        .then( (data) => {
            if (data.result == 'success') {
                alert('수정됐습니다.');
                viewAct(boardSeq);
            } else if (data.result == 'error') {
                alert('실패했습니다.');
            } else {
                alert('오류가 발생했습니다.');
            }
        })
}

function cancleEditCmtBox(index) {
    const cmt = document.getElementById(`cmt${index}`);
    cmt.innerHTML = '';
    cmt.insertAdjacentHTML('beforeend', cmtArr.pop());
}

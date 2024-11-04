async function writeAct(seq = '') {
    history.pushState('','',document.baseURI);
    window.removeEventListener('scroll', scrollPage);

    if (getComputedStyle(document.getElementById('moveUpBtn')).display !== 'none') {
        document.getElementById('moveUpBtn').style.display = 'none';
    }

    if (getComputedStyle(document.getElementById('btnBundle')).display !== 'none') {
        document.getElementById('btnBundle').style.display = 'none';
    }

    let subject = '';
    let company = '';
    let userName = '';
    let addItem01 = '';
    let service = '';
    let serviceArr = '';
    let countSelArr = '';
    let billEmail = '';
    let price = '';
    let content = '';
    let attachFile01 = '';
    let attachFile01Name = '';
    let attachFile02 = '';
    let attachFile02Name = '';
    let attachFile03 = '';
    let attachFile03Name = '';
    let attachFile04 = '';
    let attachFile04Name = '';
    let attachFile05 = '';
    let attachFile05Name = '';

    if (seq != '') {
        const data = await getContent(seq);
        const board = data.board[0];

        subject = board.subject;
        company = board.company;
        userName = board.userName;
        addItem01 = board.addItem01;
        service = board.addItem03;
        billEmail = board.addItem04;
        price = board.addItem05;
        content = board.content;
        attachFile01 = board.attachFile01;
        attachFile01Name = board.attachFile01Name;
        attachFile02 = board.attachFile02;
        attachFile02Name = board.attachFile02Name;
        attachFile03 = board.attachFile03;
        attachFile03Name = board.attachFile03Name;
        attachFile04 = board.attachFile04;
        attachFile04Name = board.attachFile04Name;
        attachFile05 = board.attachFile05;
        attachFile05Name = board.attachFile05Name;
        serviceArr = service.split('.');
        countSelArr = serviceArr.length;
    }

    let writes = '';
    writes += `
        <div id="writePage" class="w-full">
        <div class="flex flex-col gap-y-2 w-full p-4">
        <form id="writeForm" class="flex flex-col pt-4 pb-2 gap-y-4" method="POST" enctype="multipart/form-data">
        <div class="flex flex-col gap-y-1">
        <label for="subject" class="w-5/12 font-bold">과정명</label>
        <input id="subject" name="subject" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${subject}">
        </div>
        
        <div class="flex flex-col gap-y-1">
        <label for="company" class="w-5/12 font-bold">기업명</label>
        <input id="company" name="company" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${company}">
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="userName" class="w-5/12 font-bold">작성자</label>
        <input id="userName" name="userName" type="text" value="${loginUserName}" class="w-5/12 border
            border-[#4d4d4f] rounded-md py-1 pl-2" readonly>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="datePicker" class="w-5/12 font-bold">수강시작날짜</label>
        <input id="datePicker" name="addItem01" type="text" class="w-7/12 border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${addItem01}" 
            autocomplete="off" inputmode="none">
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="service" class="w-5/12 font-bold">수강구분</label>
        
        <div class="grid grid-cols-2 w-full gap-y-2">
        
        <div class="flex align-middle gap-x-1">
        <input id="service1" type="checkbox" name="service1" value="service1">
        <label for="service1">환급</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service2" type="checkbox" name="service2" value="service2">
        <label for="service2">비환급(서비스)</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service3" type="checkbox" name="service3" value="service3">
        <label for="service3">비환급(판매)</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service4" type="checkbox" name="service4" value="service4">
        <label for="service4">환급+비환급</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service5" type="checkbox" name="service4" value="service4">
        <label for="service5">기직카</label>
        </div>
        
        </div>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="billEmail" class="w-5/12 font-bold">계산서 메일</label>
        <input id="billEmail" name="billEmail" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${billEmail}">
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="price" class="w-5/12 font-bold">금액</label>
        <input id="price" name="price" type="text" class="w-7/12 border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${price}" }>
            <span>* 비환급(판매)인 경우에만 입력해주세요.</span>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="content" class="w-5/12 font-bold">비고</label>
        <input id="content" name="content" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${content}">
        </div>
    `;

    if (attachFile01) {
        writes += `
            <div id="attachFile01Box" class="flex justify-between border-b border-gray-200 py-2">
                <span>${attachFile01Name}</span>
                <button class="bg-red-300 text-red-600 px-2 rounded-md" type="button"
                onclick="deleteFile('attachFile01')">
                파일삭제</button>
            </div>
        `;
    } else {
        writes += `
            <div id="attachFile01Box" class="flex flex-col gap-y-1">
            <label for="attachFile01" class="w-5/12 font-bold">첨부파일1</label>
            <input id="attachFile01" name="attachFile01" type="file" class="w-full border
                border-[#4d4d4f] rounded-md py-1 pl-2">
            </div>
        `;
    }

    if (attachFile02) {
        writes += `
            <div id="attachFile02Box" class="flex justify-between border-b border-gray-200 py-2">
                <span>${attachFile02Name}</span>
                <button class="bg-red-300 text-red-600 px-2 rounded-md" type="button"
                onclick="deleteFile('attachFile02')">
                파일삭제</button>
            </div>
        `;
    } else {
        writes += `
            <div id="attachFile02Box" class="flex flex-col gap-y-1">
            <label for="attachFile02" class="w-5/12 font-bold">첨부파일2</label>
            <input id="attachFile02" name="attachFile02" type="file" class="w-full border
                border-[#4d4d4f] rounded-md py-1 pl-2">
            </div>
        `;
    }

    if (attachFile03) {
        writes += `
            <div id="attachFile03Box" class="flex justify-between border-b border-gray-200 py-2">
                <span>${attachFile03Name}</span>
                <button class="bg-red-300 text-red-600 px-2 rounded-md" type="button"
                onclick="deleteFile('attachFile03')">
                파일삭제</button>
            </div>
        `;
    } else {
        writes += `
            <div id="attachFile03Box" class="flex flex-col gap-y-1">
            <label for="attachFile03" class="w-5/12 font-bold">첨부파일3</label>
            <input id="attachFile03" name="attachFile03" type="file" class="w-full border
                border-[#4d4d4f] rounded-md py-1 pl-2">
            </div>
        `;
    }

    if (attachFile04) {
        writes += `
            <div id="attachFile04Box" class="flex justify-between border-b border-gray-200 py-2">
                <span>${attachFile04Name}</span>
                <button class="bg-red-300 text-red-600 px-2 rounded-md" type="button"
                onclick="deleteFile('attachFile04')">
                파일삭제</button>
            </div>
        `;
    } else {
        writes += `
            <div id="attachFile04Box" class="flex flex-col gap-y-1">
            <label for="attachFile04" class="w-5/12 font-bold">첨부파일4</label>
            <input id="attachFile04" name="attachFile04" type="file" class="w-full border
                border-[#4d4d4f] rounded-md py-1 pl-2">
            </div>
        `;
    }

    if (attachFile05) {
        writes += `
            <div id="attachFile05Box" class="flex justify-between border-b border-gray-200 py-2">
                <span>${attachFile05Name}</span>
                <button class="bg-red-300 text-red-600 px-2 rounded-md" type="button"
                onclick="deleteFile('attachFile05')">
                파일삭제</button>
            </div>
        `;
    } else {
        writes += `
            <div id="attachFile05Box" class="flex flex-col gap-y-1">
            <label for="attachFile05" class="w-5/12 font-bold">첨부파일5</label>
            <input id="attachFile05" name="attachFile05" type="file" class="w-full border
                border-[#4d4d4f] rounded-md py-1 pl-2">
            </div>
        `;
    }

    writes += '</form>';

    writes += '<div class="flex justify-between gap-x-6 py-4 mt-2">';

    if (seq != '') {
        writes += `<button type="button" class="bg-blue-300 text-blue-600 px-2 py-1 rounded-md 
                w-1/3" onclick="submitContent('${seq}')">수정</button>`;
    } else {
        writes += `<button type="button" class="bg-blue-300 text-blue-600 px-2 py-1 rounded-md 
                w-1/3" onclick="submitContent()">등록</button>`;
    }
    writes += `<button type="button" class="bg-red-300 text-red-600 px-2 py-1 rounded-md w-1/3"
            onclick="closeWriteModal()">취소</button>`;

    writes += '</div>';
    writes += '</form></div></div>';


    if (document.getElementById('contentsList') !== null) {
        const contentsList = document.getElementById('contentsList');
        htmlObj.push(contentsList.innerHTML);
    }

    const contents = document.getElementById('contents');
    contents.innerHTML = '';
    contents.insertAdjacentHTML('beforeend', writes);
    scrollUp();

    $('#datePicker').datepicker({
        dateFormat: 'yy-mm-dd',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        yearSuffix: '년',
        beforeShowDay: function(date){
            // 화, 목 제외 선택 불가
            return [
                (date.getDay() != 0
                && date.getDay() != 1
                && date.getDay() != 3
                && date.getDay() != 5
                && date.getDay() != 6)
            ];
        }
    });

    if (countSelArr > 0) {
        for (let i=0; i<countSelArr; i++) {
            document.getElementById(`${serviceArr[i]}`).checked = true;
        }
    }

    window.addEventListener('popstate', (e) => {
        listAct();
    }, { once: true });

}

function closeWriteModal() {
    listAct();
}

async function getContent(seq) {
    const result = await fetch(useApi + `?seq=${seq}&boardCode=16`, {
        method: 'GET'
    })

    return result.json();
}

function validationForm() {
    if (document.getElementById('subject').value == '') {
        alert('과정명을 입력해주세요.');
        return false;
    }

    if (document.getElementById('company').value == '') {
        alert('사업주명을 입력해주세요.');
        return false;
    }

    if (document.getElementById('datePicker').value == '') {
        alert('수강날짜를 선택해주세요.');
        return false;
    }

    return true;
}

function submitContent(seq='') {
    if (!validationForm()) return false;

    const form = document.getElementById('writeForm');
    const formData = new FormData(form);
    formData.append('boardCode', '16');

    if (seq != '') {
        formData.append('seq', seq);
    }

    fetch(useApi, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then((data) => {
            if (data.result != 'success') {
                alert(data.message);
            } else {
                alert(data.message);
                writeAct();
            }
        })
}

function deleteFile(name) {
    if (!confirm('삭제하시겠습니까?')) return false;
    const number = name.slice(-1);
    const box = document.getElementById(`${name}Box`);
    box.innerHTML = '';
    box.classList = 'flex flex-col gap-y-1';
    box.innerHTML = `
        <label for="${name}" class="w-5/12 font-bold">첨부파일${number}</label>
        <input id="${name}" name="${name}" type="file" class="w-full border
            border-[#4d4d4f] rounded-md py-1 pl-2">
        <input type="hidden" name="delFile0${number}" value="Y">
    `;
    console.log();
}


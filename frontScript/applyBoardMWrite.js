let newApplyListMap = new Map();
let newAttachListMap = new Map();
let applyListMap = new Map();
let attachListMap = new Map();
let totalFiles = 0;
let debounceTimerId = null
let deleteList = [];

async function writeAct(seq = '') {
  history.pushState('', '', document.baseURI);
  window.removeEventListener('scroll', scrollPage);

  if (getComputedStyle(document.getElementById('moveUpBtn')).display !== 'none') {
    document.getElementById('moveUpBtn').style.display = 'none';
  }

  if (getComputedStyle(document.getElementById('btnBundle')).display !== 'none') {
    document.getElementById('btnBundle').style.display = 'none';
  }

  let contents = '';
  let companyName = '';
  let userName = '';
  let lectureStart = '';
  let service = '';
  let serviceArr = '';
  let countSelArr = '';
  let billingEmail = '';
  let price = '';
  let memo = '';
  let files = '';
  let attachURL = '';
  let companyCode = '';


  if (seq != '') {
    const data = await getContent(seq);
    const board = data.board[0];
    attachURL = data.attachURL;

    contents = board.contents;
    companyCode = board.companyCode;
    companyName = board.companyName;
    userName = board.userName;
    lectureStart = board.lectureStart;
    service = board.serviceType;
    billingEmail = board.billingEmail;
    price = board.price;
    memo = board.memo;
    files = board.files;
    serviceArr = service.split('.');
    countSelArr = serviceArr.length;
  }

  let writes = '';
  writes += `
        <div id="writePage" class="w-full">
        <div class="flex flex-col gap-y-2 w-full p-4">
        <form id="writeForm" class="flex flex-col pt-4 pb-2 gap-y-4" method="POST" enctype="multipart/form-data">
        <div class="flex flex-col gap-y-1">
        <label for="contents" class="w-5/12 font-bold">과정명</label>
        <input id="contents" name="contents" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${contents}">
        </div>
        
        <div class="flex flex-col gap-y-1">
        <label for="companyName" class="w-5/12 font-bold">기업명</label>
        <input id="companyName" name="companyName" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${companyName}" autocomplete="off" >
        <div id="companyList" class="hidden z-10 bg-white rounded-sm pl-1 
        absolute overflow-y-auto max-h-[200px] w-1/2 top-[18rem] left-[.75rem]"></div>
        </div>
        
        <div class="flex flex-col gap-y-1">
        <label for="companyCode" class="w-5/12 font-bold">사업주번호</label>
        <input id="companyCode" name="companyCode" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${companyCode}" placeholder="기업명을 검색해주세요." readonly>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="userName" class="w-5/12 font-bold">작성자</label>
        <input id="userName" name="userName" type="text" value="${loginUserName}" class="w-5/12 border
            border-[#4d4d4f] rounded-md py-1 pl-2" readonly>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="datePicker" class="w-5/12 font-bold">수강시작날짜</label>
        <input id="datePicker" name="lectureStart" type="text" class="w-7/12 border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${lectureStart}" 
            autocomplete="off" inputmode="none">
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="service" class="w-5/12 font-bold">수강구분</label>
        
        <div class="grid grid-cols-2 w-full gap-y-2">
        
        <div class="flex align-middle gap-x-1">
        <input id="service1" type="checkbox" name="service[]" value="service1">
        <label for="service1">환급</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service2" type="checkbox" name="service[]" value="service2">
        <label for="service2">비환급(서비스)</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service3" type="checkbox" name="service[]" value="service3">
        <label for="service3">비환급(판매)</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service4" type="checkbox" name="service[]" value="service4">
        <label for="service4">환급+비환급</label>
        </div>
        
        <div class="flex align-middle gap-x-1">
        <input id="service5" type="checkbox" name="service[]" value="service5">
        <label for="service5">기직카</label>
        </div>
        
        </div>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="billingEmail" class="w-5/12 font-bold">계산서 메일</label>
        <input id="billingEmail" name="billingEmail" type="text" class="w-full border border-[#4d4d4f] rounded-md py-1 pl-2" value="${billingEmail}">
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="price" class="w-5/12 font-bold">금액</label>
        <input id="price" name="price" type="text" class="w-7/12 border border-[#4d4d4f] rounded-md py-1 pl-2" value="${price}">
            <span>* 비환급(판매)인 경우에만 입력해주세요.</span>
        </div>

        <div class="flex flex-col gap-y-1">
        <label for="memo" class="w-5/12 font-bold">비고</label>
        <input id="memo" name="memo" type="text" class="w-full border 
            border-[#4d4d4f] rounded-md py-1 pl-2" value="${memo}">
        </div>
    `;

  writes += `<div class="flex gap-x-4">
            <button type="button" class="border border-black px-2" onclick="uploadFile('applyList')">훈련생명부 첨부</button>
            <input type="file" id="applyListInput" name="applyListInput" class="hidden" multiple>
            <button type="button" class="border border-black px-2" onclick="uploadFile('attachList')">파일 첨부</button>
            <input type="file" id="attachListInput" name="attachListInput" class="hidden" multiple>
        </div>`;

  writes += '<div id="fileBox" class="flex flex-col gap-y-4 px-4 mt-10">';
  writes += `<div>
            <div class="bg-[#4d4d4f] text-[#F3A916] text-lg rounded-t-md text-center py-1">
            <span>훈련생 명부</span>
            </div>`;
  writes += `<div id="applyList" class="flex flex-col text-left gap-y-2 px-2 py-3 border border-[#4d4d4f] rounded-b-sm">`;
  writes += '</div>';
  writes += '</div>';

  writes += `<div>
            <div class="bg-[#4d4d4f] text-[#F3A916] text-lg rounded-t-md text-center py-1">
            <span>첨부파일</span>
            </div>
    `;

  writes += `<div id="attachList" class="flex flex-col text-left gap-y-2 px-2 py-3 border border-[#4d4d4f] rounded-b-sm">`;
  writes += '</div>';
  writes += '</div>';
  writes += '</div>';
  writes += '</div>';

  if (files.length > 0) {
    var applyFilesList = [];
    var attachFilesList = [];

    files.forEach(f => {
      let file = `<div id="registerd${f.seq}" class="flex gap-x-4 py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <span class="text-ellipsis overflow-hidden whitespace-nowrap">${f.attachFileName} (기존)</span>
            <span class="text-red-600" onclick="deleteFile(${f.seq})">X</span>
        </div>`;

      if (f.type === 'applyList') {
        applyFilesList.push(file);
      } else {
        attachFilesList.push(file);
      }
    })
    totalFiles = applyFilesList.length + attachFilesList.length;
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

  const contentsArea = document.getElementById('contents');
  contentsArea.innerHTML = '';
  contentsArea.insertAdjacentHTML('beforeend', writes);

  document.getElementById('companyName').addEventListener('input',
    debounce((event) => {
      searchCompany(event.target.value)
    }, 300)
  )

  document.getElementById('companyName').addEventListener('focus', () => {
    document.getElementById('companyList').classList.remove('hidden');
    document.getElementById('companyList').classList.add('block');
  })


  if (applyFilesList) {
    document.getElementById('applyList').insertAdjacentHTML('beforeend', applyFilesList.join(''));
  }

  if (attachFilesList) {
    document.getElementById('attachList').insertAdjacentHTML('beforeend', attachFilesList.join(''));
  }
  scrollUp();

  $('#datePicker').datepicker({
    dateFormat: 'yy-mm-dd',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    yearSuffix: '년',
    beforeShowDay: function (date) {
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
    for (let i = 0; i < countSelArr; i++) {
      document.getElementById(`${serviceArr[i]}`).checked = true;
    }
  }

  window.addEventListener('popstate', (e) => {
    listAct();
  }, {once: true});

}

function closeWriteModal() {
  listAct();
}

function selectCompany(e) {
  document.getElementById('companyCode').value = e.target.dataset.value;
  document.getElementById('companyName').value = e.target.innerText;
  document.getElementById('companyList').classList.remove('block');
  document.getElementById('companyList').classList.add('hidden');
}

function searchCompany(value) {
  if (value.length < 2) return;
  document.getElementById('companyList').innerHTML = '';
  fetch(`/api/apiApplyBoard.php?companyName=${value}`)
    .then(res => res.json())
    .then(data => {
      if (data.company.length > 0) {
        document.getElementById('companyList').classList.remove('hidden');
        const ul = document.createElement('ul');
        data.company.forEach(c => {
          let li = document.createElement('li');
          li.innerText = c.companyName;
          li.dataset.value = String(c.companyCode)
          li.classList.add('border', 'border-b', 'list-none', 'px-2', 'py-2')
          li.addEventListener('click', selectCompany)
          document.getElementById('companyList').insertAdjacentElement('beforeend', li);
        })
        document.getElementById('companyList').classList.add('block');
      }
    })
}

function debounce(func, delay) {
  return function (...args) {
    if (debounceTimerId) {
      clearTimeout(debounceTimerId);
    }

    debounceTimerId = setTimeout(() => func.apply(this, args), delay);
  }
}

async function getContent(seq) {
  const result = await fetch(useApi + `?seq=${seq}`, {
    method: 'GET'
  })

  return result.json();
}

function validationForm() {
  if (document.getElementById('contents').value == '') {
    alert('과정명을 입력해주세요.');
    return false;
  }

  if (document.getElementById('companyName').value == '' || document.getElementById('companyCode').value) {
    alert('사업주를 검색해주세요.');
    return false;
  }

  if (document.getElementById('datePicker').value == '') {
    alert('수강날짜를 선택해주세요.');
    return false;
  }

  return true;
}

function submitContent(seq = '') {
  if (!validationForm()) return false;

  const form = document.getElementById('writeForm');
  const formData = new FormData(form);

  if (attachListMap.size > 0) {
    attachListMap.forEach(f => {
      formData.append('attachFiles[]', f)
    })
  }

  if (applyListMap.size > 0) {
    if (![...document.querySelectorAll('input[name="applyListValidation"]')].some(e => e.value === 'Y')) {
      alert('훈련생명부 유효성 검사를 해주세요.');
      return;
    }

    applyListMap.forEach(f => {
      formData.append('applyUser[]', f)
    })
  }

  if (deleteList.length > 0) {
    formData.append('deleteList[]', deleteList);
  }

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
        writeAct(seq);
      }
    })
    .catch(error => {
      alert('서버에 오류가 발생했습니다.');
      console.log(error);
    })
}

// 실제 파일명은 바뀌지 않음 key 값만 변경
function checkIsExist(listMap, fileName, inc = 1) {
  inc += 1;
  if (listMap.get(fileName)) {
    var splitFileName = fileName.split('.');
    var splitFileNameLen = splitFileName.length;
    var newFileName = fileName.split('.').slice(0, splitFileName.length - 1).join('') + '_' + String(inc) + '.' + splitFileName[splitFileNameLen - 1]
    return checkIsExist(listMap, newFileName, inc)
  }
  return fileName;
}

function uploadEvent(e) {
  var uploadFileLen = Object.keys(e.target.files).length;

  if ((totalFiles + uploadFileLen) > 10) {
    alert('파일첨부(훈련생명부, 첨부파일)는 최대 10개까지만 가능합니다.');
    return;
  }

  newApplyListMap = new Map();
  newAttachListMap = new Map();

  for (const [key, value] of Object.entries(e.target.files)) {
    if (e.target.id == 'applyListInput') {
      if (!['xls', 'xlsx', 'csv'].includes(value.name.split('.').pop())) {
        alert('엑셀 파일만 업로드할 수 있습니다.')
        return
      }
      var fileName = checkIsExist(applyListMap, value.name);
      newApplyListMap.set(fileName, value);
    } else {
      var fileName = checkIsExist(attachListMap, value.name);
      newAttachListMap.set(fileName, value);
    }
  }
  totalFiles += Object.keys(e.target.files).length;
  renderInsertedList();
}

function uploadFile(type) {
  document.getElementById(type + 'Input').click();
  document.getElementById(type + 'Input').removeEventListener('change', uploadEvent);
  document.getElementById(type + 'Input').addEventListener('change', uploadEvent)
}

function deleteFileMap(type, name, index) {
  if (!confirm('삭제하시겠습니까? ')) return;

  if (type === 'applyList') {
    applyListMap.delete(`${name}`);
  } else {
    attachListMap.delete(`${name}`);
  }
  document.getElementById(`${type}${index}`).remove();
}

function renderInsertedList() {
  if (newApplyListMap.size > 0) {
    var index = applyListMap.size;
    newApplyListMap.forEach((f, key) => {
      document.getElementById('applyList').insertAdjacentHTML('beforeend', `
        <div id="applyList${index}" data-type="new" class="flex gap-x-4 py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <span class="text-ellipsis overflow-hidden whitespace-nowrap">${f.name}</span>
            <input type="hidden" name="applyListValidation">
            <button type="button" class="border border-black px-2" onclick="validateExcel('${f.name}', this)">유효성 검사(필수)</button>
            <span class="text-red-600" onclick="deleteFileMap('applyList', '${f.name}', '${index}')">X</span>
        </div>`);
      applyListMap.set(key, f);
      index++;
    })
  }

  if (newAttachListMap.size > 0) {
    var index = attachListMap.size;
    newAttachListMap.forEach((f, key) => {
      document.getElementById('attachList').insertAdjacentHTML('beforeend', `
        <div id="attachList${index}" data-type="new" class="flex gap-x-4 py-2 border-b border-gray-200 text-ellipsis overflow-hidden whitespace-nowrap">
            <span class="text-ellipsis overflow-hidden whitespace-nowrap">${f.name}</span>
            <span class="text-red-600" onclick="deleteFileMap('attachList', '${f.name}', '${index}')">X</span>
        </div>`);
      attachListMap.set(key, f);
      index++;
    })
  }
}

function validateExcel(fileName, btn) {
  loading();
  const formData = new FormData();
  if (!applyListMap.get(fileName)) {
    alert('검사할 파일이 존재하지 않습니다.');
    return;
  }
  formData.append('applyValidation', applyListMap.get(fileName))

  fetch('/admin/validateExcelUserList.php', {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      const contentType = res.headers.get('Content-Type');

      if (contentType === 'application/vnd.ms-excel') {
        alert('엑셀 데이터에 오류가 있습니다.');
        return res.blob();
      } else if (contentType === 'application/json') {
        return res.json();
      } else {
        alert('오류가 발생했습니다.');
      }
    })
    .then(data => {
      if (typeof data === 'object' && !(data instanceof Blob)) {
        if (data.result === 'success') {
          btn.parentNode.querySelector('input[name="applyListValidation"]').value = 'Y';
          btn.innerText = '성공';
        } else if (data.result === 'error') {
          alert('검사 중 오류가 발생했습니다.');
          btn.innerText = '실패';
        }
      } else if (data instanceof Blob) {
        btn.innerText = '실패';
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = '명부오류.xls'; // 파일 이름 지정
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      loading();
    })
    .catch(error => {
      alert('서버 오류 발생');
      console.log(error);
    })
}

function deleteFile(seq) {
  if (!confirm('삭제하시겠습니까?')) return false;
  deleteList.push(seq);
  document.getElementById(`registerd${seq}`).remove();
}

function loading() {
  var loadingScreen = `<div class="loading top-1/2 left-1/2 z-[20] absolute">
<img src="../images/global/loading.gif" alt="loading" border=0>
<span onclick="loading()">[close]</span>
</div>`;
  if ($('body').find('.loading').length == 0) {
    $('body').append(loadingScreen);
  } else {
    $('.loading').fadeOut('fast', function () {
      $(this).remove();
    });
  }
}





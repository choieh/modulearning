let order = ''; // 정렬순서
let statusParam = ''; // 처리상태 검색
let param = ''; // 검색 값
let htmlObj = []; // div contents에 들어있던 element
async function listAct() {

  if (getComputedStyle(document.getElementById('moveUpBtn')).display === 'none') {
    document.getElementById('moveUpBtn').style.display = 'block';
  }

  if (getComputedStyle(document.getElementById('btnBundle')).display === 'none') {
    document.getElementById('btnBundle').style.display = 'flex';
  }

  let lists = `
        <div id="nav" class="flex text-center font-bold sticky top-[113px] bg-white py-3">
            <div id="statusOrder" class="select w-1/2 border-b-2 border-[#F3A916] 
                text-[#F3A916] pb-3">처리순</div>
            <div id="inputOrder" class="w-1/2 border-b border-[#4d4d4f] pb-3">등록순</div>
        </div>
        <div id="contentsList" class="h-full"></div>
    `;

  document.getElementById('contents').innerHTML = '';
  document.getElementById('contents').insertAdjacentHTML('beforeend', lists);
  order = 'order=status';

  document.getElementById('statusOrder').addEventListener('click', (ele) => {
    const inputOrder = document.getElementById('inputOrder');

    if (!ele.target.classList.contains('select')) {
      ele.target.classList = '';
      ele.target.classList = `select w-1/2 pb-3 border-b-2
                border-[#F3A916] text-[#F3A916]`;

      inputOrder.classList = '';
      inputOrder.classList = `w-1/2 pb-3 border-b border-[#4d4d4f]`;
      page = 1;
      order = `order=status`;
      param = '';
      statusParam = '';
      scrollUp();
      ajaxAct();
    }
  });

  document.getElementById('inputOrder').addEventListener('click', (ele) => {
    const statusOrder = document.getElementById('statusOrder');

    if (!ele.target.classList.contains('select')) {
      ele.target.classList = '';
      ele.target.classList = `select w-1/2 pb-3 border-b-2
                border-[#F3A916] text-[#F3A916]`;

      statusOrder.classList = '';
      statusOrder.classList = `w-1/2 pb-3 border-b border-[#4d4d4f]`;
      page = 1;
      order = `order=input`;
      param = '';
      statusParam = '';
      scrollUp();
      ajaxAct();
    }
  })

  const contentsList = document.getElementById('contentsList');

  if (htmlObj.length > 0) {
    contentsList.insertAdjacentHTML('beforeend', htmlObj.pop());
  } else {
    ajaxAct();
  }

  window.addEventListener('scroll', scrollPage);

}

async function ajaxAct(action = '') {
  let lists = '';
  const data = await getContents();

  if (data.totalCount == 0) {
    lists += '<div class="py-2 text-center">검색결과가 없습니다.</div>';
  } else if (!data.board) {
    return;
  } else {
    for (const c of data.board) {
      lists += `
            <div class="min-h-[50px] w-full border-b border-gray-300">
                <div class="flex p-4 justify-between">
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-md font-bold">${c.userName}</span>
                        <span class="text-sm text-gray">${c.inputDate}</span>
                    </div>
        `;

      lists += '<span class=" px-1 rounded-sm ';
      if (c.status == 'W') {
        lists += 'text-gray-600 bg-gray-200">대기';
      } else if (c.status == 'C') {
        lists += 'text-green-600 bg-green-200">접수완료';
      } else if (c.status == 'R') {
        lists += 'text-red-600 bg-red-200">보완';
      } else if (c.status == 'N') {
        lists += 'text-blue-600 bg-blue-200">처리중';
      } else if (c.status == 'Y') {
        lists += 'text-gray-600 bg-gray-200">입과완료';
      }

      lists += '</span>'

      lists += `
            </div>
                <div class="px-4 pb-4" onclick="viewAct('${c.seq}')">
                    <div class="border-b border-gary-200 w-full py-1">
                    <span class="font-bold">사업주명:</span> ${c.companyName}</div>
                    <div class="border-b border-gray-200 w-full py-1">
                    <span class="font-bold">과정명:</span> ${c.contents}</div>
                    <div class="border-b border-gray-200 w-full py-1">
                    <span class="font-bold">수강기간:</span> ${c.lectureStart} ~ ${c.lectureEnd}</div>
                </div>
                <div class="flex items-center justify-end gap-x-2 pb-1 pr-4 text-right">
                    <i class="xi-comment text-2xl"></i><span>${c.commentCount}</span>
                </div>
            </div>
        `;
    }
  }

  const contentsList = document.getElementById('contentsList');
  if (action != 'scroll') {
    contentsList.innerHTML = '';
  }
  contentsList.insertAdjacentHTML('beforeend', lists);

}

async function getContents() {
  if (page == 1) {
    scrollUp()
  }

  const result = await fetch(
    useApi + `?${order}&page=${page}${statusParam}${param}`, {
      method: 'GET'
    })

  return result.json();
}

function searchModal() {
  const searchModal = document.getElementById('searchModal');
  searchModal.style.display = 'block';
}


function closeModal() {
  const writeModal = document.getElementById('searchModal');
  if (writeModal.style.display === 'block') {
    writeModal.style.display = 'none';
  }
}

function searchAct() {
  const searchType = document.getElementById('searchType').value;
  const searchValue = document.getElementById('searchValue').value;
  page = 1;
  param = '';
  param += `&searchType=${searchType}&searchValue=${searchValue}`;

  ajaxAct();
  closeModal();
}

function searchAct2(status) {
  page = 1;
  statusParam = `&status=${status}`;
  ajaxAct();
  closeModal();
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
  });
}

function scrollPage() {
  if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight - 10) {
    page++;
    ajaxAct('scroll');
  }
}

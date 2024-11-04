let isClick = false; // 글쓰기 버튼 다중클릭 막기

function writeAct(writeSeq, obj = {}) {
  writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용

  //기존,신규글
  let writeseq = '';
  let writeUserName = '';
  let writePhone01 = '';
  let writePhone02 = '';
  let writePhone03 = '';
  let writeEmail01 = '';
  let writeEmail02 = '';
  let writeSubject = '';
  let writeContent = '';
  let writeAttachFile01 = '';
  let writeAttachFile01Name = '';
  let writeAttachFile02 = '';
  let writeAttachFile02Name = '';
  let writeAttachFile03 = '';
  let writeAttachFile03Name = '';
  let writeAttachFile04 = '';
  let writeAttachFile04Name = '';
  let writeAttachFile05 = '';
  let writeAttachFile05Name = '';
  let writeSecret = '';
  let writeTop = '';
  let attachURL = '';
  let writeUserID = loginUserID ? loginUserID : 'guest';
  let replyOrderBy = '';
  let addItem01 = '';
  let addItem02 = '';
  let addItem03 = '';
  let addItem04 = '';
  let addItem05 = '';
  let company = '';
  let companyCode = '';

  seq = writeSeq;
  //상단메뉴
  $('#contents > h1').html(titleHtml);
  $('.searchArea, .BBSCategory').remove();

  if (seq != '') {
    var writeAjax = $.get(useApi, {
      'seq': seq,
      'boardCode': boardCode
    }, function (data) {
      attachURL = data.attachURL;
      $.each(data.board, function () {
        writeseq = this.seq;
        writeUserName = this.userName;
        writeUserID = this.userID;
        writePhone01 = this.phone01;
        writePhone02 = this.phone02;
        writePhone03 = this.phone03;
        writeEmail01 = this.email01;
        writeEmail02 = this.email02;
        writeSubject = this.subject;
        writeContent = this.content;
        writeAttachFile01 = this.attachFile01;
        writeAttachFile01Name = this.attachFile01Name;
        writeAttachFile02 = this.attachFile02;
        writeAttachFile02Name = this.attachFile02Name;
        writeAttachFile03 = this.attachFile03;
        writeAttachFile03Name = this.attachFile03Name;
        writeAttachFile04 = this.attachFile04;
        writeAttachFile04Name = this.attachFile04Name;
        writeAttachFile05 = this.attachFile05;
        writeAttachFile05Name = this.attachFile05Name;
        writeSecret = this.secret;
        writeTop = this.top;
        addItem01 = this.addItem01;
        addItem02 = this.addItem02;
        addItem03 = this.addItem03 ?? '';
        addItem04 = this.addItem04 ?? '';
        addItem05 = this.addItem05 ?? '';
        managerID = this.managerID;
        managerName = this.managerName;
        managerCompany = this.managerCompany;
        company = this.company;
        companyCode = this.companyCode;
      })
      writePrint()
    })
  } else {
    if (Object.keys(obj).length > 0) {
      if (obj.elecEmail === '@') {
        addItem04 = '';
      } else {
        addItem04 = obj.elecEmail;
      }
      companyCode = obj.companyCode;
      company = obj.companyName;
    }
    writePrint()
  }

  //게시판 생성
  function writePrint() {
    var writes = '';

    //2017-07-11 이응민 추가 (수강요청파일 업로드)
    writes += '<form class="writeform" method="post" action="' + useApi + '" enctype="multipart/form-data">';
    writes += '<input type="hidden" name="userID" value="' + writeUserID + '" />';
    writes += '<input type="hidden" name="seq" value="' + writeSeq + '" />';
    writes += '<input type="hidden" name="boardCode" value="' + boardCode + '" />';
    writes += '<ul>';
    writes += '<li><h1>과정명</h1>';
    if (useSecret == 'Y') {
      writes += '<input id="useSecret" name="secret" value="Y" type="checkbox"'
      if (writeSecret == 'Y') {
        writes += 'checked="checked"'
      }
      writes += '><label for="useSecret">비밀글</label>'
    }

    writes += `<input type="text" class="subject" name="subject" value="${writeSubject}">`;
    writes += '<button type="button" class="fRight" onClick="printContents()">과정 목록</button>';
    writes += '</li>';
    writes += '<li><h1>기업명</h1><input type="text" class="subject" name="company" value="' + company + '"></li>'

    writes += `<li><h1>사업자번호</h1><input type="text" class="subject" name="companyCode" onkeyup="validateNumber(this)" value="${companyCode}" maxlength="10"></li>`

    if (useName == 'Y') {
      writes += '<li><h1>작성자</h1>';
      if (loginUserName != '' && seq == '') {
        writes += loginUserName;
        writes += '<input type="hidden" name="userName" value="' + loginUserName + '" />';
      } else {
        writes += writeUserName;
        writes += '<input type="hidden" name="userName" value="' + writeUserName + '" />';
      }
    }
    writes += '</li>';
    if (loginUserID == '') {
      writes += '<li><h1>비밀번호</h1><input class="name" type="password" name="pwd" /></li>'
    }
    if (usePhone == 'Y') {
      writes += '<li><h1>연락처</h1><select type="tel" name="phone01" class="' + writePhone01 + '">' + optWrite['mobile01'] + optWrite['phone01'] + '</select>  - <input type="tel"  class="tel" name="phone02" value="' + writePhone02 + '"> - <input type="tel" class="tel" name="phone03" value="' + writePhone03 + '"></li>'
    }
    if (useEmail == 'Y') {
      writes += '<li><h1>이메일</h1><input class="name" name="email01" type="text" maxlength="20" tabindex="1" value="' + writeEmail01 + '" />&nbsp;@&nbsp;<select name="email02Chk" class="' + writeEmail02 + '" id="email02">' + optWrite['email02'] + '</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="' + writeEmail02 + '" /></li>'
    }

    writes += '<li>';
    writes += '<h1>수강시작날짜</h1>';
    writes += '<div class="datePicker"><input type="text" name="addItem01" class="cal" value="' + addItem01 + '" readonly="readonly" /></div>';
    writes += '</li>';

    writes += '<li>';
    writes += '<h1>수강구분</h1>';
    writes += '<input id="service1" type="checkbox" name="service1" value="service1"><label for="service1">환급</label>';
    writes += '<input id="service2" type="checkbox" name="service2" value="service2"><label for="service2">비환급(서비스)</label>';
    writes += '<input id="service3" type="checkbox" name="service3" value="service3"><label for="service3">비환급(판매)</label>';
    writes += '<input id="service4" type="checkbox" name="service4" value="service4"><label for="service4">환급+비환급</label>';
    writes += '<input id="service5" type="checkbox" name="service5" value="service5"><label for="service5">기직카</label>';
    writes += '</li>'

    writes += '<li>';
    writes += '<h1>계산서 메일</h1><input type="text" style="width: 200px;" name="billEmail" value="' + addItem04 + '">';
    writes += '</li>';

    writes += '<li>';
    writes += '<h1>금액</h1><input type="text" name="price" value="' + addItem05 + '"> <span style="color: red;">* 비환급(판매)인 경우에만 입력해주세요.</span>';
    writes += '</li>';


    writes += '<li>';
    writes += '<h1>비고</h1><input type="text" class="subject" name="content" value="' + writeContent + '" placeholder="수강기간이 한달이 아닐 경우 or 특이사항을 적어주세요.">';
    writes += '</li>';

    if (useFile != 0) {
      for (i = 1; i <= eval(useFile); i++) {
        writes += '<li><h1>첨부파일';
        if (useFile != 1) {
          writes += i;
        }
        writes += '</h1>'
        if (eval('writeAttachFile0' + i) == '' || eval('writeAttachFile0' + i) == null) {
          writes += '<input name="attachFile0' + i + '" type="file" />'
        } else {
          writes += '<div id="attachFile0' + i + '" class="attachFile"><a href="' + attachURL + eval('writeAttachFile0' + i) + '" target="_blank"><img src="../images/admin/icon_addfile.png">' + eval('writeAttachFile0' + i + 'Name') + '</a><button type="button" onclick="deleteFileAct(\'attachFile0' + i + '\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0' + i + '" value="Y" />';
        }
        // const fileInfo = ['계약서', '개인정보동의서', '사업자등록증', '훈련생명부', '사이버연수원생성 요청 시 로고'];
        // writes += `<span style="margin-left:10px;">${fileInfo[i-1]}</span>`;
        writes += '</li>';
      }
    }

    writes += '</ul>'
    writes += '</form>'
    writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
    if (seq == '') {
      writes += '<div class="btnArea"><button type="button" onClick="submitContents(this,\'mode9\');">작성완료</button>';
    } else {
      writes += '<div class="btnArea"><button type="button" onClick="submitContents(this);">수정완료</button>';
    }
    writes += '<button type="button" onClick="listAct(' + page + ')">목록보기</button></div>';
    $('#contentsArea').removeAttr('class')
    $('#contentsArea').addClass('BBSWrite')
    $('#contentsArea').html(writes);
    findOpt();//selct 선택자 찾기
    emailSelect();//이메일 select 호출 사용시 같이 호출
    pickerAct2();//데이트피커 사용
    fileformAct();//파일 첨부 사용시
    serviceSelect(addItem03); // 수강 구분 선택 데이터 있을 시
    dragAndDrop();

  }
}

function submitContents(elClickedObj, type) {

  if ($('input[name=subject]').val() == '') {
    alert('과정명을 입력해주세요.');
    return false;
  }

  if ($('input[name=company]').val() == '') {
    alert('사업주명을 입력해주세요.');
    return false;
  }

  if ($('input[name=addItem01]').val() == '') {
    alert('수강날짜를 선택해주세요.');
    return false;
  }

  if (!isClick) {
    sendContents();
  }
}

function sendContents() {
  const form = document.getElementsByClassName('writeform')[0];
  const formData = new FormData(form);
  isClick = true;
  fetch(useApi, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then((data) => {
      isClick = false;
      if (data.result != 'success') {
        alert(data.message);
      } else {
        writeAct();
      }
    })
}

function serviceSelect(service) {
  if (service == '') {
    return;
  }

  let checkedService = service.split('.');
  checkedService.forEach(check => {
    const checkbox = document.getElementById(check);
    checkbox.checked = true;
  })
}

function dragAndDrop() {
  let writeForm = document.getElementsByClassName("writeform")[0];

  writeForm.ondragover = function (e) {
    e.preventDefault();
  }

  writeForm.ondragleave = function (e) {
    e.preventDefault();
  }

  writeForm.ondrop = function (e) {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    let countExistFile = 0;

    for (var i = 1; i <= 5; i++) {
      if (document.getElementById("attachFile0" + i) != null) {
        countExistFile++;
      }
    }

    if (files.length > 5 - countExistFile) {
      alert("최대 " + (5 - countExistFile) + "개까지 첨부 가능합니다.");
      return false;
    }

    let a = 1; // input용 변수
    let b = 0; // 드랍 파일용 변수
    while (a <= 5 && b < files.length) {
      const dataTrans = new DataTransfer();
      dataTrans.items.add(files[b])
      const file = dataTrans.files;
      const inputFile = document.getElementsByName("attachFile0" + a);

      if (inputFile[0] != null) {
        inputFile[0].previousSibling.innerText = files[b].name;
        inputFile[0].files = file;
        a++;
        b++;
      } else {
        a++;
      }

    }
  }
}

function validateNumber(input) {
  const regex = /[^0-9]/gi;
  input.value = input.value.replaceAll(regex, '');
}


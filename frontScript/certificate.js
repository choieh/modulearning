
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
//보드 정보 선언
var useApi = '../api/apiStudyEnd2.php';

//var memberApi = '../api/apiMember.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '';
userLevel = userLevel ? userLevel : 9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 5; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var sortData = '';

if (loginUserLevel != '8') {
  alert('교육담당자만 사용가능합니다.');
  window.location.href = "/";
}

function getList(chk) {
  let chkVal = chk.value;
  var actionArea = '';
  var today = new Date();
  actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
  actionArea += '<div class="searchChangeArea">';
  actionArea += `<input type="hidden" name="companyCode" value="${companyCode}">`;
  actionArea += `<input type="hidden" name="searchType" value="${chkVal}">`;
  actionArea += '<div class="checkedBox" style="display:inline-block">';
  actionArea += '<input id="date" type="radio" name="searchTypes" value="date" onclick="getList(this);"> <label for="date">날짜별</label>';
  actionArea += '<input id="content" type="radio" name="searchTypes" value="content" onclick="getList(this);"> <label for="content">과정별</label>';
  actionArea += '<input id="user" type="radio" name="searchTypes" value="user" onclick="getList(this);"> <label for="user">개인별</label>';
  actionArea += '</div>&nbsp;&nbsp;&nbsp;';

  if (chkVal == 'user') {
    actionArea += '<br>';
    actionArea += '<div class="checkedBox" style="display:inline-block;margin-right:10px;">';
    actionArea += '<input id="combination" type="radio" name="searchSubTypes" value="combination" checked> <label for="combination">통합</label>';
    actionArea += '<input id="individual" type="radio" name="searchSubTypes" value="individual"> <label for="individual">개별</label>';
    actionArea += '</div>';
  }
  actionArea += '<select id="searchYear" name="searchYear" >';
  var i = '';
  
  var thisYear = today.getFullYear();
  for (i = 2015; i <= thisYear; i++) {
      if (i != thisYear) {
          actionArea += '<option>' + i + '년</option>';
      } else {
          actionArea += '<option selected="selected">' + i + '년</option>';
      }
  }
  actionArea += '</select>&nbsp;&nbsp;&nbsp;';
  if (chkVal == 'date') {
      actionArea += '<select id="searchMonth" name="searchMonth"  selected="selected">';
      actionArea += '<option value="" selected="selected">전체</option>';
      var h = '';
      var thisMonth = today.getMonth() + 1; //January is 0!
      for (h = 1; h <= 12; h++) {
          actionArea += '<option >' + h + '월</option>';
      }

      actionArea += '</select>';
  } else if (chkVal == 'content'){
      actionArea += '<input type="text" name="contentsName" placeholder="과정명을 입력해주세요.">';
  }

  if (chkVal != 'user') {
    actionArea += '&nbsp;<input type="text" name="department" placeholder="부서명을 입력해주세요.">';
  } else {
    actionArea += '&nbsp;<input type="text" name="userName" placeholder="이름을 입력해주세요.">';
  }

  actionArea += '<button style="margin-left:10px; padding:2px 14px;" type="submit">검색</button>';
  if (loginUserLevel < 4) {
      actionArea += '<a href="/attach/docs/certificate.xlsx"> | 수료증출력기준보기(클릭다운로드)</a>';
  }
  actionArea += '</div>';
  actionArea += '</form></div>';

  $('#contents > .searchArea').remove();
  $('#contents > h1').after(actionArea);
  document.getElementById(chkVal).checked = true;
  searchValue = $('.searchForm').serialize();
  searchValue = '&' + searchValue;
  if(chkVal != 'user') {
    ajaxAct(searchValue);
  }
}


//리스트 소팅
function listAct(page) {
  //상단 액션 부분
  var actionArea = '';
  var today = new Date();

  actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
  actionArea += '<div class="searchChangeArea">';
  actionArea += `<input type="hidden" name="companyCode" value="${companyCode}">`;
  actionArea += `<input type="hidden" name="searchType" value="date">`;
  actionArea += '<div class="checkedBox" style="display:inline-block">';
  actionArea += '<input id="date" type="radio" name="searchTypes" value="date" onclick="getList(this);" checked> <label for="date">날짜별</label>';
  actionArea += '<input id="content" type="radio" name="searchTypes" value="content" onclick="getList(this);"> <label for="content">과정별</label>';
  actionArea += '<input id="user" type="radio" name="searchTypes" value="user" onclick="getList(this);"> <label for="user">개인별</label>';
  actionArea += '</div>&nbsp;&nbsp;&nbsp;';
  actionArea += '<select id="searchYear" name="searchYear" >';
  var i = '';
  var thisYear = today.getFullYear();
  for (i = 2015; i <= thisYear; i++) {
      if (i != thisYear) {
          actionArea += '<option>' + i + '년</option>';
      } else {
          actionArea += '<option selected="selected">' + i + '년</option>';
      }

  }
  actionArea += '</select>';
  actionArea += '<select id="searchMonth" name="searchMonth"  selected="selected">';
  actionArea += '<option value="" selected="selected">전체</option>';
  var h = '';
  var thisMonth = today.getMonth() + 1; //January is 0!
  for (h = 1; h <= 12; h++) {
      actionArea += '<option >' + h + '월</option>';
  }
  actionArea += '</select>';
  actionArea += '&nbsp;<input type="text" name="department" placeholder="부서명을 입력해주세요.">';
  actionArea += '<button style="margin-left:10px; padding:2px 14px;" type="submit">검색</button>';
  if (loginUserLevel < 4) {
      actionArea += '<a href="/attach/docs/certificate.xlsx"> | 수료증출력기준보기(클릭다운로드)</a>';
  }
  actionArea += '</div>';
  actionArea += '</form></div>';
  $('#contents > h1').after(actionArea);

  //게시물 소팅부분
  var contents = '';
  contents += '<div class="scrollArea">';
  contents += '<table style="min-width:1360px;"><thead><tr>';
  contents += '<th style="width:50px;">번호</th>';
  contents += '<th style="width:200px;">수강기간</th>';
  contents += '<th style="width:200px;">과정명</th>';
  contents += '<th style="width:120px;">교육비</th>';
  contents += '<th style="width:120px;">최종 환급액</th>';
  contents += '<th style="width:120px;">수강인원</th>';
  contents += '<th style="width:120px;">수료인원</th>';
  contents += '<th style="width:120px;">수료증</th>';
  contents += '<th style="width:120px;">수료결과보고서</th>';
  contents += '</tr></thead><tbody>';
  contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
  contents += '</tbody></table>';
  contents += '</div>'
  $('#contentsArea').removeAttr('class');
  $('#contentsArea').addClass('BBSList');
  $('#contentsArea').html(contents);
  searchValue = $('.searchForm').serialize();
  searchValue = '&' + searchValue;
  ajaxAct(searchValue);
//	loadingAct();
}


function ajaxAct(sortDatas, scHeight) {

  var individualElement = document.getElementById('individual');

  if (individualElement && individualElement.checked && !document.getElementsByName('userName')[0].value) {
      alert('이름을 입력해주세요.');
      return false;
  }
  sortDatas = sortDatas ? sortDatas : '';
  if (sortDatas != '') {
      sortData = sortDatas
  }
  // loadingAct();
  var listAjax = $.get(useApi, 'page=' + page + '&list=' + listCount + sortData, function (data) {
      totalCount = data.totalCount;
      var lists = '';
      var j = totalCount;
      if (totalCount != 0) {
          var i = 0;
          var lectureDay = '';
          let queryString = '';
          var contents = '';
          if (data.types == 'date') {
              contents += '<div class="scrollArea">';
              contents += '<table style="min-width:1360px;"><thead><tr>';
              contents += '<th style="width:50px;">번호</th>';
              contents += '<th style="width:200px;">수강기간</th>';
              contents += '<th style="width:200px;">과정명</th>';
              contents += '<th style="width:120px;">수강인원</th>';
              contents += '<th style="width:120px;">수료인원</th>';
              contents += '<th style="width:120px;">교육실시확인서</th>';
              contents += '<th style="width:120px;">수료증</th>';
              contents += '<th style="width:120px;">수료결과보고서</th>';
              contents += '</tr></thead><tbody>';
              contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
              contents += '</tbody></table>';
              contents += '</div>';
              var prevDay = '';
              $.each(data.study, function () {
                  if (this.lectureStart != prevDay) {
                      lists += '<tr class="BBSListBg" style="height:80px;">';
                      lists += `<td></td>`;
                      lists += `<td style="font-size:18px; font-weight:bold;">${this.lectureStart}</td>`;
                      lists += `<td></td>`;
                      lists += `<td></td>`;
                      lists += `<td></td>`;
                      lists += `<td></td>`;
                      // lists += `<td><a href="certificatePDF.php?lectureStart=${this.lectureStart}${searchValue}" target="_blank"><button>수료증</button></a></td>`;
                      queryString = `&isManager=Y&lectureStart=${this.lectureStart}${searchValue}`;
                      lists += `<td><button type="button" onclick="certificateFilter('${queryString}')">수료증</button></td>`;
                      lists += `<td>`;
                      lists += `<a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}${searchValue}" target="_blank"><button>보고서</button></a>`;
          lists += `<br><br><a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}${searchValue}&cover=N" target="_blank"><button>보고서(표지제외)</button></a>`;
                      lists += '<br><br>';
                      lists += `<a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}${searchValue}&passOK=Y" target="_blank"><button>미수료 제외</button></a>`;
                      lists += '</td>';
                      lists += '</tr>';
                  }
                  lists += '<tr class="">';
                  lists += `<td>${j}</td>`;
                  lists += `<td>${this.companyName}</td>`;
                  lists += `<td>${this.contentsName}</td>`;

                  if (this.serviceType == '1') {
                      lists += `<td>환급 : ${this.studyUser}</td>`;
                      lists += `<td>환급 : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '3') {
                      lists += `<td>비환급(평가없음) : ${this.studyUser}</td>`;
                      lists += `<td>비환급(평가없음) : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '5') {
                      lists += `<td>산업안전 : ${this.studyUser}</td>`;
                      lists += `<td>산업안전 : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '10') {
                      lists += `<td>비환급(평가있음) : ${this.studyUser}</td>`;
                      lists += `<td>비환급(평가있음) : ${this.passOkUser}</td>`;
                  } else {
                      lists += `<td>${this.studyUser}</td>`;
                      lists += `<td>${this.passOkUser}</td>`;
                  }

                  if (this.serviceType == '5') {
                      lists += `<td><button onClick="window.open('accomplish2.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&sort01=${this.sort01}&sort02=${this.sort02}&companyCode=${this.companyCode}&contentsCode=${this.contentsCode}','수료증','width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no','printPop')">산업안전</button></td>`;
                  } else {
                      lists += '<td>-</td>';
                  }

                  //lists += `<br /><button
                  // onClick="window.open('accomplish.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&sort01=lecture03&sort02=lecture0301&companyCode=${this.companyCode}','수료증','width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no','printPop')">산업(감독)</button></td>`;
                  // lists += `<td><a href="certificatePDF.php?lectureStart=${this.lectureStart}&contentsCode=${this.contentsCode}${searchValue}" target="_blank"><button>수료증</button></a></td>`;
                  queryString = `&isManager=Y&lectureStart=${this.lectureStart}&contentsCode=${this.contentsCode}${searchValue}`;
                  lists += `<td><button type="button" onclick="certificateFilter('${queryString}')">수료증</button></td>`;
                  lists += `<td>`;
                  lists += `<a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}&contentsCode=${this.contentsCode}${searchValue}" target="_blank"><button>보고서</button></a>`;
        lists += `<br/><br><a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}&contentsCode=${this.contentsCode}${searchValue}&cover=N" target="_blank"><button>보고서(표지제외)</button></a>`;
                  lists += '<br><br>';
                  lists += `<a href="resultDocumentNewTest2.php?lectureStart=${this.lectureStart}&contentsCode=${this.contentsCode}${searchValue}&passOK=Y" target="_blank"><button>미수료 제외</button></a>`;
                  lists += '</td>';
                  lists += '</tr>';

                  prevDay = this.lectureStart;
                  j--;
                  i++;
              })
          } else if (data.types == 'content'){
              contents += '<div class="scrollArea">';
              contents += '<table style="min-width:1360px;"><thead><tr>';
              contents += '<th style="width:50px;">번호</th>';
              contents += '<th style="width:200px;">과정명</th>';
              contents += '<th style="width:120px;">수강인원</th>';
              contents += '<th style="width:120px;">수료인원</th>';
              contents += '<th style="width:120px;">수료증</th>';
              contents += '<th style="width:120px;">수료결과보고서</th>';
              contents += '</tr></thead><tbody>';
              contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
              contents += '</tbody></table>';
              contents += '</div>';
              lists += '<tr class="BBSListBg" style="height:80px;">';
              lists += `<td></td>`;
              lists += `<td></td>`;
              lists += `<td></td>`;
              lists += `<td></td>`;
              // lists += `<td><a href="certificatePDF.php?${searchValue}" target="_blank"><button>수료증</button></a></td>`;
              queryString = `&isManager=Y${searchValue}`;
              lists += `<td><button type="button" onclick="certificateFilter('${queryString}')">수료증</button></td>`;
              lists += `<td>`;
              lists += `<a href="resultDocumentNewTest2.php?${searchValue}" target="_blank"><button>보고서</button></a>`;
              lists += '<br><br>';
              lists += `<a href="resultDocumentNewTest2.php?${searchValue}&passOK=Y" target="_blank"><button>미수료 제외</button></a>`;
              lists += '</td>';
              lists += '</tr>';

              $.each(data.study, function () {
                  queryString = '';
                  lists += '<tr class="">';
                  lists += `<td>${j}</td>`;
                  lists += `<td>${this.contentsName}</td>`;

                  if (this.serviceType == '1') {
                      lists += `<td>환급 : ${this.studyUser}</td>`;
                      lists += `<td>환급 : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '3') {
                      lists += `<td>비환급(평가없음) : ${this.studyUser}</td>`;
                      lists += `<td>비환급(평가없음) : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '5') {
                      lists += `<td>산업안전 : ${this.studyUser}</td>`;
                      lists += `<td>산업안전 : ${this.passOkUser}</td>`;
                  } else if (this.serviceType == '10') {
                      lists += `<td>비환급(평가있음) : ${this.studyUser}</td>`;
                      lists += `<td>비환급(평가있음) : ${this.passOkUser}</td>`;
                  } else {
                      lists += `<td>${this.studyUser}</td>`;
                      lists += `<td>${this.passOkUser}</td>`;
                  }
                  // lists += `<td><a href="certificatePDF.php?contentsCode=${this.contentsCode}${searchValue}" target="_blank"><button>수료증</button></a></td>`;
                  queryString = `contentsCode=${this.contentsCode}&isManager=Y${searchValue}`;
                  lists += `<td><button type="button" onclick="certificateFilter('${queryString}')">수료증</button></td>`;
                  lists += `<td>`;
                  lists += `<a href="resultDocumentNewTest2.php?contentsCode=${this.contentsCode}${searchValue}" target="_blank"><button>보고서</button></a>`;
                  lists += '<br><br>';
                  lists += `<a href="resultDocumentNewTest2.php?contentsCode=${this.contentsCode}${searchValue}&passOK=Y" target="_blank"><button>미수료 제외</button></a>`;
                  lists += '</td>';
                  lists += '</tr>';

                  j--;
                  i++;
              })
          } else if (data.searchSubTypes == 'individual' && data.types == 'user') {
            contents += '<div class="scrollArea">';
                contents += '<table style="min-width:1360px;"><thead><tr>';
                contents += '<th style="width:50px;">번호</th>';
                contents += '<th style="width:200px;">과정명</th>';
                contents += '<th style="width:120px;">이름</th>';
                contents += '<th style="width:120px;">수료여부</th>';
                contents += '<th style="width:120px;">수료증</th>';
                contents += '</tr></thead><tbody>';
                contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
                contents += '</tbody></table>';
                contents += '</div>';
                lists += '<tr class="BBSListBg" style="height:80px;">';
                lists += `<td></td>`;
                lists += `<td></td>`;
                lists += `<td></td>`;
                lists += `<td></td>`;
                lists += `<td><button type="button" onclick="certificateFilter('userName=${data.userID}&${searchValue}&isManager=Y')">수료증</button></td>`;
                lists += '</tr>';

                $.each(data.study, function () {
                    lists += '<tr class="">';
                    lists += `<td>${j}</td>`;
                    lists += `<td>${this.contentsName}</td>`;
                    lists += `<td>${this.userName}</td>`;
                    if (this.passOK == 'Y') {
                        lists += `<td>수료</td>`;
                        lists += `<td><button type="button" onclick="certificateFilter('userID=${this.userID}&contentsCode=${this.contentsCode}${searchValue}&isManager=Y')">수료증</button></td>`;
                       
                    } else {
                        lists += `<td>미수료</td>`;
                        lists += '<td></td>';
                    }
                    lists += '</tr>';

                    j--;
                    i++;
                })
          } else if (data.searchSubTypes == 'combination' && data.types == 'user') {
            contents += '<div class="scrollArea">';
                contents += '<table style="min-width:1360px;"><thead><tr>';
                contents += '<th style="width:50px;">번호</th>';
                contents += '<th style="width:120px;">아이디</th>';
                contents += '<th style="width:120px;">이름</th>';
                contents += '<th style="width:120px;">수료 수</th>';
                contents += '<th style="width:120px;">수료증</th>';
                contents += '</tr></thead><tbody>';
                contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
                contents += '</tbody></table>';
                contents += '</div>';

                $.each(data.study, function () {
                    lists += '<tr class="">';
                    lists += `<td>${j}</td>`;
                    lists += `<td>${this.userID}</td>`;
                    lists += `<td>${this.userName}</td>`;
                    lists += `<td>${this.passOkUser}</td>`;
                    lists += `<td><button type="button" onclick="certificateFilter('userID=${this.userID}${searchValue}&isManager=Y')">수료증</button></td>`;
                    lists += '</tr>';

                    j--;
                    i++;
                })
          }
          $('#contentsArea').removeAttr('class');
          $('#contentsArea').addClass('BBSList');
          $('#contentsArea').html(contents);

      } else {
          lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>'
      }
      $('.BBSList tbody').html(lists);
//		pagerAct();
		  //loadingAct();
      window.scrollTo(0, scHeight);
  })
}

function certificateFilter(queryString) {
  if (document.getElementById('certificateFilter')) {
      document.getElementById('certificateFilter').remove();
  }

  const dialog = `
      <dialog id="certificateFilter" style="border: 1px solid; border-radius: 5px; width: 400px; min-height: 200px;">
      <div style="text-align: right">
          <button type="button" 
              style="background: #fab1a0; color:tomato; border:none; padding: 5px 7px; font-size: 15px; border-radius: 5px;"
              onclick="closeModal()">
              닫기</button>
      </div>
      <div style="font-weight: bold; font-size: 20px; text-align: center;">수료증 설정</div>
      <div style="display: flex; flex-direction: column; gap: 20px 0; margin-top: 20px; min-height: 100px;">
          <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="chapterName" style="font-size:14px; font-weight: bold;">차시명 노출</lable>
              <input id="chapterName" type="checkbox" name="chapterName" style="display: inline; width: 15px; height: 15px; margin: 0;">
              <span style="color: tomato; font-size: 12px;">* 차시수가 30개 이하인 경우만 가능합니다.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="changeDept" style="font-size:14px; font-weight: bold;">부서명으로 회사명 대체</lable>
              <input id="changeDept" type="checkbox" name="changeDept" style="display: inline; width: 15px; height: 15px; margin: 0;">
              <span style="color: tomato; font-size: 12px;">* 부서명이 없는 경우 회사명이 들어갑니다.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0 5px;">
            <lable for="birthDay" style="font-size:14px; font-weight: bold;">생년월일 미표기</lable>
            <input id="birthDay" type="checkbox" name="birthDay" style="display: inline; width: 15px; height: 15px; margin: 0;">
          </div>
          <div style="display: flex; align-items: center; gap: 0 5px;">
            <lable for="hidePassDate" style="font-size:14px; font-weight: bold;">수료일 미표기</lable>
            <input id="hidePassDate" type="checkbox" name="hidePassDate" style="display: inline; width: 15px; height: 15px; margin: 0;">
          </div>
          <div style="display: flex; align-items: center; gap: 0 5px;">
            <lable for="passDate" style="font-size:14px; font-weight: bold;">수료일 선택(미선택시 실제 수료일 출력)</lable>
            <input id="passDate" type="date" name="passDate" style="display: inline; margin: 0;">
          </div>
      </div>
      <div style="display:flex; justify-content: center; margin-top: 20px;">
          <button style="border:none; background: #74b9ff; color: #0984e3; 
          font-size:15px; width: 100px; height: 30px; border-radius: 5px;"
          onclick="printCertificate('${queryString}')">
          출력</button>
      </div>
      </dialog>
  `;


  document.body.insertAdjacentHTML('beforeend', dialog);
  const modal = document.getElementById('certificateFilter');
  modal.showModal();
}

function closeModal() {
  const modal = document.getElementById('certificateFilter');
  modal.close();
}

function printCertificate(query) {
  let param = query;
  if (document.getElementById('chapterName').checked) {
      param += '&chapterName=Y';
  }

  if (document.getElementById('changeDept').checked) {
      param += '&changeDept=Y';
  }

  if (document.getElementById('birthDay').checked) {
      param += '&birthDay=N';
  }

  if (document.getElementById('hidePassDate').checked) {
      param += '&hidePassDate=Y';
  }

  if (document.getElementById('passDate').value != '') {
      param += '&passDate=' + document.getElementById('passDate').value;
  }

  const modal = document.getElementById('certificateFilter');
  closeModal();
  window.open(`certificateNew.php?${param}`, '_blank');
}
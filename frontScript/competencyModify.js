var chainsearchApi = '../api/apiSearch.php';

// 과정 검색 contentsCode로
function searchContents() {

  let contentsCode = $(".contentsCode").val();

  if(contentsCode.trim() == '' ) {
    alert('과정코드 입력은 필수입니다.');
    return;
  }

  $("#contentsCD").val(contentsCode);

  $.ajax({
    url: '../api/apiCompetencyTest.php',
    method: 'GET',
    data: { contentsCode: contentsCode },
    success: function(data) {
      var result = '';
      console.log(data);
      if (parseInt(data.cnt) == 0) {
        result += '<p class="msg" style="color:red;font-weight: bold;">조회된 과정이 없습니다.</p>';
      } else {
        let server  = data.player;
        let chapterPath = data.chapterPath;
        $("#server").val(server);
        server = server.replace('https://cont', '').replace('.modulearning.kr', '');
        chapterPath = chapterPath.replace('/contents/', '').replace('/pc', '').replace('/01/01.html', '');
        $("#folder").val(chapterPath);
        result += '<table class="custom-table">';
        result +=  '<thead>';
        result +=        '<tr class="table-header">';
        result +=          '<th>과정명</th>';
        result +=          '<th>서버위치</th>';
        result +=        '</tr>';
        result +=      '</thead>';
        result +=      '<tbody>';
        result +=        '<tr class="table-row">';
        result +=          '<td class="course-name">'+data.contentsName+'</td>';
        result +=          '<td class="server-location">'+server+'서버</td>';
        result +=        '</tr>';
        result +=      '</tbody>';
        result +=    '</table>';
        result += '<button type="button" class="inquiry-btn" onClick="searchTest()">조회하기</button>';
      }
      $('#content').html(result);
    },
    error: function() {
      alert('과정 조회 중 오류가 발생했습니다.');
    }
  });
}

// 역량진단문항 조회
function searchTest() {

  let server = $('#server').val();
  let url = server+'/api/apiCompetency.php'
  let contentsCode = $('#contentsCD').val();
  let folder = $('#folder').val();
  $.ajax({
    url: url,
    method: 'GET',
    data: { contentsCode: contentsCode , folder : folder},
    success: function(data) {
      console.log(data);
      if (data.result == 'error') {
        alert(data.msg);
      } else {
        const test = data.data;
        var result = '';
        var idx = 1;
        result += '<div id="competencyArea">';
        result += '<h3 class="title-zone">';
        result += '<p>진단 제목</p>';
        result += '<div class="title-container">';
        result += '<input type="text" class="test-title" value="'+test.title+'">';
        result += '<button type="button" class="modify-btn title-btn" onClick="modifyData(\'title\')">제목수정</button>';
        result += '</div>';
        result += '</h3>';
        result += '<table class="custom-table">';
        result +=  '<thead>';
        result +=        '<tr class="table-header">';
        result +=          '<th>질문번호</th>';
        result +=          '<th>질문내용</th>';
        result +=          '<th style="width:90px;"><button type="button" class="modify-all" onClick="modifyData(\'all\')">일괄수정</button></th>';
        result +=        '</tr>';
        result +=      '</thead>';
        result +=      '<tbody>';
        $.each(test.pages, function () {
          $.each(this.questions[0].rows, function () {
            result +=        '<tr class="table-row competency-row">';
            result +=          '<td class="idx">'+idx+'번</td>';
            result +=          '<td class="question"><input type="text" class="quest-title" value="'+this.text+'"></td>';
            result +=          '<td class="modify"><button type="button" class="modify-btn" data-idx="'+idx+'" onClick="modifyData(\'question\','+idx+')">수정하기</button></td>';
            result +=        '</tr>';
            idx++;
          })
        })
        result +=      '</tbody>';
        result +=    '</table>';
        result += '</div>';
        $('#content').after(result);
      }
    },
    error: function(error) {
      alert('역량진단 테스트 조회 중 오류가 발생했습니다.');
      console.log(error);
    }
  });
}

// 데이터 수정
function modifyData (type,idx) {

  let contentsCode = $('#contentsCD').val();
  let folder = $('#folder').val();
  let postData = {
    contentsCode: contentsCode,
    folder: folder
  };

  if (type === 'title') {
    let title = $(".test-title").val();
    if (title.trim() == '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (confirm('제목을 수정하시겠습니까?')) {
      postData = { ...postData, type: 'title', title: title };
      sendAjax(postData);
    }
  } else if (type === 'all') {
    let allQuestions = [];
    let title = $(".test-title").val();
    if (title.trim() == '') {
      alert('제목을 입력해주세요.');
      return;
    }
    $('.competency-row').each(function() {
      let questionText = $(this).find('.quest-title').val();
      let idx = $(this).find('button.modify-btn').data('idx');

      if (idx == '' || idx == null || idx == undefined) {
        alert('질문 번호가 누락된 항목이 있습니다. 수정 불가.');
        return false;
      } else if (questionText.trim() == '') {
        alert(idx + '번 질문의 내용을 입력해주세요.');
        return false;
      }
      allQuestions.push({ questionIdx: idx, questionText: questionText });
    });
    if (allQuestions.length > 0) {
      if (confirm('질문을 일괄 수정하시겠습니까?')) {
        postData = { ...postData, type: 'all', questions : allQuestions, title: title };
        sendAjax(postData);
      }
    }
  } else if (type === 'question') {
    let questionText = $('button[data-idx="'+idx+'"]').closest('tr').find('.quest-title').val();
    if (idx == '' || idx == null || idx == undefined) {
      alert('idx 값이 누락되어 수정 진행 불가.');
      return;
    } else if (questionText.trim() == '') {
      alert('질문내용을 입력해주세요');
      return;
    }
    if (confirm(idx+'번 질문내용을 수정하시겠습니까?')) {
      postData = { ...postData, type: 'question', questionText: questionText, questionIdx: idx };
      sendAjax(postData);
    }
  }
}

// 수정 요청 보내기
function sendAjax (postData) {
  let server = $('#server').val();
  let url = server+'/api/apiCompetency.php'

  $.ajax({
      url: url,
      method: 'POST',
      data: postData,
      success: function(response) {
        console.log(response);
        if (response.result == 'success') {
          alert('수정이 완료되었습니다.');
          $('#competencyArea').remove();
          searchTest();
        } else {
          alert(response.msg);
        }
      },
      error: function() {
        alert('수정 요청 중 오류가 발생했습니다.');
      }
  });
}

// 파일 수정 시
function uploadFileHandle() {
  var contentsCode = $('select[name="contentsCode"]').val();
  var uploadFile = $('input[name="uploadFile"]').prop('files');
  var chapterPath  = '';
  var server = '';
  if (contentsCode == '' || contentsCode == undefined) {
    alert('과정을 선택해 주세요.');
    $('input[name="searchName"]').focus();
    return;
  } else if (uploadFile.length === 0) {
    alert('파일을 선택해 주세요.');
    return;
  }
  if (confirm('첨부한 파일 내용으로 역량진단문항 수정을 하시겠습니까?')) {
    $.ajax({
      url: '../api/apiCompetencyTest.php',
      method: 'GET',
      data: { contentsCode: contentsCode },
      success: function(data) {
        if (data.chapterPath == '') {
          alert('과정 조회 중 오류가 발생했습니다.');
          return;
        }
        console.log(data);
        server  = data.player;
        $("#server").val(server);
        
        chapterPath = data.chapterPath;
        chapterPath = chapterPath.replace('/contents/', '').replace('/pc', '').replace('/01/01.html', '');

        let formData = new FormData();
        formData.append('uploadFile', uploadFile[0]);

        $.ajax({
            url: '../api/apiCompetencyTest.php',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
              if (response.result == 'success') {
                $('#contentsCD').val(contentsCode);
                $("#folder").val(chapterPath);
                let file = response.questions;
                let title = response.title;
                let postData = {
                  contentsCode: contentsCode,
                  folder: chapterPath,
                  type: 'file',
                  title: title,
                  questions: file
                };
                sendAjax(postData);
              } else {
                alert(response.msg);
              }
            },
            error: function() {
              alert('엑셀 파일 읽기 요청 중 오류가 발생했습니다.');
            }
        });
      },
      error: function() {
        alert('과정 조회 중 오류가 발생했습니다.');
        return;
      }
    })
  }
}
function pageAct(){}
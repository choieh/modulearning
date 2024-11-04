
let contents = '';
contents += '변경전 아이디검색 <input type="text" id="searchID"></input>';
contents += '<table>';
contents += '<thead>';
contents += '<tr>';
contents += '<td></td><td>과정코드</td><td>과정명</td><td>서비스타입</td><td>회원ID</td><td>사업주</td><td>수강기간</td><td>전체<input type="checkbox" class="selectedData"></td>';
contents += '</thead>';
contents += '<tbody id="studyDataArea"></tbody>';
contents += '</table>';

$(document).ready(function(){

    $('.contentsArea').html(contents);
    $('#searchID').keypress(function(event) {
        if (event.which == 13) {
            
            sendAjaxRequest();
            event.preventDefault();
        }
    });

});

function sendAjaxRequest() {
    var inputValue = $('#searchID').val();

    $.ajax({
        url: '../api/apiStudyData.php',
        type: 'GET',
        data: {
            inputData: inputValue
        },
        success: function(data) {
            if(data.count == "0"){
                alert("검색된 정보 없음");
                return;
            }
            var list = '';
            $.each(data.data, function(input) {
                list += '<tr>'
                list += '<td><input type="hidden" value="' + this.seq +'"></td>';
                list += '<td>' + this.contentsCode + '</td>';
                list += '<td>' + this.contentsName + '</td>';
                list += '<td>' + this.serviceType + '</td>';
                list += '<td>' + this.userID + '</td>';
                list += '<td>' + this.companyName + '</td>';
                list += '<td>' + this.lectureStart + '~' + this.lectureEnd + '</td>';
                list += '<td><input type="checkbox" class="selectedData"></td>';
                list += '</tr>'
            });

            $('.contentsArea .send').remove();
            $('.contentsArea').append('<input type="text" id="receiver" class="send"><button onclick="sendData()" class="send">전송하기</button>');

            $('#studyDataArea').html(list);
            
        },
        error: function(xhr, status, error) {
            
            console.error(error);
        }
    });
}

function sendData() {
    var selectedCheckboxes = $('.selectedData:checked');
    var receiver = $('#receiver').val();
    if(selectedCheckboxes.length < 1){
        alert("전송할 데이터를 선택해주세요.");
        return;
    }

    var selectedData = [];
    selectedData.push(receiver);
    
    selectedCheckboxes.each(function() {
        var hiddenInputValue = $(this).closest('tr').find('td:eq(0) input[type="hidden"]').val();
        selectedData.push(hiddenInputValue);
    });

    $.ajax({
        url: '../api/apiStudyData.php', // 서버 URL
        type: 'POST', // POST 요청 사용
        data: {
            selectedData: JSON.stringify(selectedData) // 배열을 JSON 문자열로 변환
        },
        success: function(response) {
        },
        error: function(xhr, status, error) {
            
        }
    });
    
}

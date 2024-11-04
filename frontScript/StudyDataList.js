
let contents = '';
contents += '<h2>환급과정을 제외한 기록만 표시됨</h2>';
contents += '변경전 아이디 검색 <input type="text" id="searchID"></input>';
contents += '<form id="dataForm" method="post" action="../api/apiStudyData.php">';
contents += '<table>';
contents += '<thead>';
contents += '<tr>';
contents += '<td></td><td></td><td>과정코드</td><td>과정명</td><td>서비스타입</td><td>회원ID</td><td>사업주</td><td>수강기간</td><td>전체<input type="checkbox" id="checkAll" class="selectedData"></td>';
contents += '</thead>';
contents += '<tbody id="studyDataArea"></tbody>';
contents += '</table>';
contents += '</form>';


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
                $('#studyDataArea').html("<tr><td colspan=8><h3>검색된 내용 없음</h3></td></tr>");
                return;
            }
            var list = '';
            $.each(data.data, function(input) {
                list += '<tr>'
                list += '<td><input type="hidden" name="lectureOpenSeq" value="' + this.lectureOpenSeq + '"></td>';
                list += '<td><input type="hidden" name="seq" value="' + this.seq +'"></td>';
                list += '<td name="contentsCode">' + this.contentsCode + '</td>';
                list += '<td name="contentsName">' + this.contentsName + '</td>';
                list += '<td name="serviceType">' + this.serviceType + '</td>';
                list += '<td name="userID">' + this.userID + '</td>';
                list += '<td name="companyName">' + this.companyName + '</td>';
                list += '<td>' + this.lectureStart + '~' + this.lectureEnd + '</td>';
                list += '<td><input type="checkbox" class="selectedData" name="chk"></td>';
                list += '</tr>'
            });

            $('#dataForm .send').remove();
            $('#dataForm').append('<p class="send">전송받을 아이디 입력</p><input type="text" id="receiver" name="receiver" class="send"><input type="submit" class="send" value="전송하기">');

            $('#studyDataArea').html(list);

        },
        error: function(xhr, status, error) {

            console.error(error);
        }
    });
}

$(document).ready(function() {

    $("#checkAll").click(function() {
		if($("#checkAll").is(":checked")) $("input[name=chk]").prop("checked", true);
		else $("input[name=chk]").prop("checked", false);
	});

    $("input[name=chk]").click(function(){
        var totalArr = $("input[name=chk]").length;
        var checked = $("input[name=chk]:checked").length;
        
        if(totalArr != ckecked){
          $("#checkAll").prop("checked", false);
        }else{
          $("#checkAll").prop("checked", true);
        }
      });

    $('#dataForm').submit(function(e) {
        e.preventDefault();

        var selectedRowsData = [];
        $('.selectedData:checked').each(function() {
            var rowData = {};
            $(this).closest('tr').find('td').each(function() {
                var inputField = $(this).find('input');

                if(inputField.length > 0) {
                    var key = inputField.attr('name');
                    var value = inputField.val();
                    if(key) {
                        rowData[key] = value;
                    }
                } else {
                    var key = $(this).attr('name');
                    var value = $(this).text();
                    if(key) {
                        rowData[key] = value;
                    }
                }
            });
            selectedRowsData.push(rowData);
        });

        var receiver = $('#receiver').val();

        if(selectedRowsData.length < 1){
            alert("전송할 데이터를 선택해주세요.");
            return;
        }

        if (selectedRowsData.length > 0 && receiver.length < 1){
            alert("전송받을 아이디를 입력해주세요.");
            return;
        }

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: {
                receiver: receiver,
                selectedData: JSON.stringify(selectedRowsData)
            },
            success: function(response) {
                var list = '';
                var receiver = response.receiver;
                var userID = response.selectedData[0].userID;
                var count = response.selectedData.length;

                var txt = "(" + count + ")건 전송완료 전송 ID : " + userID + "-> 전송된 ID : " + receiver;

                $('#searchID').text(userID);
                alert(txt);

                sendAjaxRequest();
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});


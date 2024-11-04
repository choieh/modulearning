var useApi = '/api/apiTempRegister.php';

printAjax();

// 등록 대기 리스트 화면
function printAjax() {
    var printAjax = $.get(useApi, function (data) {
        var tempList = '';
        var totList = '';
        var i = 1;
        var error = 'class="error"';

        if (data.totalCount != 0) {
            totList += '<h1>총 등록 대기수: <br /><strong>' + data.totalCount + '개</strong>(' + data.companyCodeCount + '건)<br />';
            totList += '<button type="button" onClick="allSubmit()">전체등록</button>&nbsp;';
            totList += '<button type="button" onClick="allDelete()">전체삭제</button></h1>';
            totList += '<div>';

            $.each(data.company, function () {
                totList += '<button type="button">' + this.name + ' : ' + this.count + '</button>';
            })
            totList += '</div>';
            $('.totalArea').html(totList);

            $.each(data.study, function () {

                var userID = (this.userID == '' || this.userID == null) ? error : '';
                var userName = (this.userName == '' || this.userName == null) ? error : '';
                var birth = (this.birth == '' || this.birth == null || this.birth.length != 6) ? error : '';
                var sex = (this.sex == '' || this.sex == null) ? error : '';
                var mobile01 = (this.mobile01 == '' || this.mobile01 == null) ? error : '';
                var mobile02 = (this.mobile02 == '' || this.mobile02 == null) ? error : '';
                var mobile03 = (this.mobile03 == '' || this.mobile03 == null) ? error : '';
                var companyCode = (this.companyCode.length > 10) ? error : '';
                var companyName = (this.companyName == '' || this.companyName == null) ? error : '';
                var contentsCode = (this.contentsCode.length != 6) ? error : '';
                var contentsName = (this.contentsName == '' || this.contentsName == null) ? error : '';
                var tutor = (this.tutor == '' || this.tutor == null) ? error : '';
                var tutorName = (this.tutorName == '' || this.tutorName == null) ? error : '';
                var openChapter = (this.openChapter == '' || this.openChapter == null) ? error : '';
                var email01 = '';
                var email02 = '';

                tempList += '<tr class="line' + this.seq + '">';
                tempList += '<td class="center">' + i + '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="userID" value="' + this.userID + '" ' + userID + '>&nbsp;/&nbsp;'; //ID
                tempList += '<input type="text" name="userName" value="' + this.userName + '" ' + userName + '><br />'; //이름
                tempList += '<input type="tel" name="birth" value="' + this.birth + '" ' + birth + '>&nbsp;/&nbsp;'; //생년월일
                tempList += '<input type="tel" name="sex" value="' + this.sex + '" ' + sex + '>'; //성별
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="tel" name="mobile01" value="' + this.mobile01 + '" ' + mobile01 + '>&nbsp;-&nbsp;';
                tempList += '<input type="tel" name="mobile02" value="' + this.mobile02 + '" ' + mobile02 + '>&nbsp;-&nbsp;';
                tempList += '<input type="tel" name="mobile03" value="' + this.mobile03 + '" ' + mobile03 + '><br/>';//휴대폰
                tempList += '<input type="text" name="email01" value="' + this.email01 + '" ' + email01 + '>&nbsp;@&nbsp;';
                tempList += '<input type="text" name="email02" value="' + this.email02 + '" ' + email02 + '>';//이메일
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="companyCode" value="' + this.companyCode + '" ' + companyCode + '><br />'; //사업자
                tempList += '<input type="text" name="companyName" value="' + this.companyName + '" ' + companyName + ' readonly>'; //회사명
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="lectureStart" value="' + this.lectureStart + '" ><br />'; //시작일
                tempList += '<input type="text" name="lectureEnd" value="' + this.lectureEnd + '" >'; //종료일
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="contentsCode" value="' + this.contentsCode + '" ' + contentsCode + '><br />'; //콘텐츠코드
                tempList += '<input type="text" name="contentsName" value="' + this.contentsName + '" ' + contentsName + ' readonly>';//콘텐츠명
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="tutor" value="' + this.tutor + '" ' + tutor + '><br />'; //강사ID
                tempList += '<input type="text" name="tutorName" value="' + this.tutorName + '" ' + tutorName + ' readonly>'; //강사명
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="price" value="' + this.price + '"> 원<br /><input type="text" name="rPrice" value="' + this.rPrice + '"> 원'; //교육비, 환급비
                tempList += '</td>';
                tempList += '<td>';
                tempList += '<input type="text" name="openChapter" value="' + this.openChapter + '" ' + openChapter + '>'; //실시회차
                tempList += '</td>';
                tempList += `<td><input type="text" name="companyManager" value='${this.companyManager}'></td>`;
                tempList += '<td><input type="text" name="serviceType" value="' + this.serviceType + '"><br />';
                tempList += '수강횟수 : <strong>' + this.lectureEA + '</strong></td>';//수강구분,등록일,동일과정수강횟수
                tempList += '<td class="center"><button type="button" onClick="lineSendData(\'' + this.seq + '\');">수정</button>&nbsp;';
                tempList += '<button type="button" onClick="deleteData(\'' + this.seq + '\');">삭제</button></td>';
                tempList += '</tr>';
                i++;
            })
            $('.infoArea tbody').html(tempList);

        }
    })
}

// 데이터 수정
function lineSendData(sendSeq) {
    var sendSeq = sendSeq ? sendSeq : '';
    var sendData = '';
    var sendObj = '';
    sendObj = $('.line' + sendSeq + '>td');

    var sendSerial = sendObj.each(function () {
        $(this).find('input, select').each(function () {
            sendData += $(this).attr('name');
            sendData += '=';
            sendData += $(this).val().replace(/&/g, '%26');
            sendData += '&';
        })
    })

    sendData += 'seq=' + sendSeq;

    if (confirm('수정하시겠습니까?')) {
        $.ajax({
            method: 'POST',
            url: '../api/apiTempRegister.php',
            dataType: 'text',
            data: sendData,
            success: function (data) {
                alert('수정되었습니다.');
                printAjax();
                opener.location.reload();
            },
            fail: function () {
                alert('정상적으로 처리되지 않았습니다.')
            }
        })
    }
}

// 데이터 삭제
function deleteData(sendSeq) {
    if (confirm("삭제하시겠습니까?")) {
        $.ajax({
            url: '../api/apiTempRegister.php',
            type: 'DELETE',
            data: {'seq': sendSeq},
            dataType: 'text',
            success: function (data) {
                top.location.reload();
                opener.location.reload();
            },
            fail: function () {
                alert('실패하였습니다.')
            }
        })
    }
}

// 전체 등록
function allSubmit() {
    if (confirm("실제 등록을 진행할까요?")) {
        $.ajax({
            url: '../api/apiTempRegister.php',
            type: 'PUT',
            data: 'allSubmit=Y',
            dataType: 'text',
            success: function (data) {
                alert('등록 되었습니다.');
                opener.location.reload();
            },
            fail: function () {
                alert('등록 실패하였습니다.');
            },
            beforeSend: function () {
                $('#loadingScreen').removeClass('displayNone');
            },
            complete: function () {
                $('#loadingScreen').addClass('displayNone');
            }
        })
        loadingAct();
    }
}

// 전체 삭제
function allDelete() {
    if (confirm("전체 삭제하시겠습니까?")) {
        $.ajax({
            url: '../api/apiTempRegister.php',
            type: 'DELETE',
            data: 'allDelete=Y',
            dataType: 'text',
            success: function (data) {
                alert('삭제 되었습니다.');
                opener.location.reload();
                window.close();
            },
            fail: function () {
                alert('삭제 실패하였습니다.');
            }
        })
    }
}

function loadingAct() {
    var loadingScreen = '<div class="loadingScreen" id="loadingScreen"><img src="../images/global/loading.gif" alt="loading"></div>';
    if ($('body').find('.loadingScreen').length == 0) {
        $('body').append(loadingScreen);
    } else {
        $('.loadingScreen').fadeOut('fast', function () {
            $(this).remove();
        });
    }
}

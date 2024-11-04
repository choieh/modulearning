//게시판 보기 스크립트 시작

function writeAct(writeSeq) {
    writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
    var seq = '';
    seq = writeSeq;
    //alert(seq);
    //상단메뉴
    $('.searchArea').remove();

    //출력변수 지정
    var countryID = '';
    var countryName = '';
    var countryLogoImg = '';
    var countryManagerText = '';
    var membershipSearchYN = '';
    var noMembershipSearchYN = '';
    var academyOpenYN = '';
    var membershipPrice_down = '';
    var membershipPrice_up = '';
    var noMembershipPrice_down = '';
    var noMembershipPrice_up = '';
    var registManual = '';
    var studyManual = '';
    var academyOpenTime = '';
    var academyCloseTime = '';
    var countryLogoImgURL = '';
    var manualURL = '';


    if (seq != '') {
        var writeAjax = $.get(useApi, {'seq': seq}, function (data) {
            countryLogoImgURL = data.countryLogoImgURL;
            manualURL = data.manualURL;
            $.each(data.academyManage, function () {
                countryID = this.countryID;
                countryName = this.countryName;
                countryLogoImg = this.countryLogoImg;
                countryManagerText = this.countryManagerText;
                membershipSearchYN = this.membershipSearchYN;
                noMembershipSearchYN = this.noMembershipSearchYN;
                academyOpenYN = this.academyOpenYN;
                membershipPrice_down = this.membershipPrice_down;
                membershipPrice_up = this.membershipPrice_up;
                noMembershipPrice_down = this.noMembershipPrice_down;
                noMembershipPrice_up = this.noMembershipPrice_up;
                registManual = this.registManual;
                studyManual = this.studyManual;
                academyOpenTime = this.academyOpenTime;
                academyCloseTime = this.academyCloseTime;
                //countryLogoImgURL = this.countryLogoImgURL;
                //manualURL = this.manualURL;
            })
            writePrint()
        })
    } else {
        writePrint()
    }


    //게시판 생성
    function writePrint() {
        var writes = '';
        writes += '<form class="writeform" method="post" action="' + useApi + '" enctype="multipart/form-data">';
        //seq값 선언
        writes += '<input type="hidden" name="seq" value="' + seq + '" />';
        //입력영역 시작
        writes += '<ul>';

        //지회ID, 지회명
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>지회ID</h1>';
        writes += '<input type="text" name="countryID" value="' + countryID + '" />';
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>지회명</h1>';
        writes += '<input type="text" name="countryName" value="' + countryName + '" placeholder="예) 충청북도" />';
        writes += '</div>';
        writes += '</li>';

        //지회로고 이미지, 지회담당자/연락처 텍스트
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>지회로고</h1>';
        if (countryLogoImg == null || countryLogoImg == '') {
            writes += '<input type="file" name="countryLogoImg" class="name" />'
        } else {
            writes += '<div id="countryLogoImg" class="attachFile">'
            writes += '<input type="hidden" name="countryLogoImgeU" value="' + countryLogoImg + '"/><img src="' + countryLogoImgURL + countryLogoImg + '" style="width:100px;"><br />'
            writes += '<button type="button" onclick="deleteFileAct(\'countryLogoImg\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
        }
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>지회담당자/연락처</h1>';
        writes += '<input type="text" name="countryManagerText" value="' + countryManagerText + '"/>';
        writes += '</div>';
        writes += '</li>';

        //정회원 / 비회원 검색여부
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>정회원 검색여부</h1>';
        writes += '<select name="membershipSearchYN">';
        if (membershipSearchYN == 'Y') {
            writes += '<option value="N">미검색</option>';
            writes += '<option value="Y" selected>검색</option>';
        } else {
            writes += '<option value="N" selected>미검색</option>';
            writes += '<option value="Y">검색</option>';
        }
        writes += '</select>';
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>비회원 검색여부</h1>';
        writes += '<select name="noMembershipSearchYN">';
        if (noMembershipSearchYN == 'Y') {
            writes += '<option value="N">미검색</option>';
            writes += '<option value="Y" selected>검색</option>';
        } else {
            writes += '<option value="N" selected>미검색</option>';
            writes += '<option value="Y">검색</option>';
        }
        writes += '</select>';
        writes += '</div>';
        writes += '</li>';

        //정회원 / 비회원 5명 이하 교육비
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>정회원 5명 이하 교육비</h1>';
        writes += '<input type="text" name="membershipPrice_down" value="' + membershipPrice_down + '" />';
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>비회원 5명 이하 교육비</h1>';
        writes += '<input type="text" name="noMembershipPrice_down" value="' + noMembershipPrice_down + '" />';
        writes += '</div>';
        writes += '</li>';

        //정회원 / 비회원 5명 이상 교육비
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>정회원 5명 이상 교육비</h1>';
        writes += '<input type="text" name="membershipPrice_up" value="' + membershipPrice_up + '"/>';
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>비회원 5명 이상 교육비</h1>';
        writes += '<input type="text" name="noMembershipPrice_up" value="' + noMembershipPrice_up + '"/>';
        writes += '</div>';
        writes += '</li>';


        //학원등록방법 / 수강방법 매뉴얼
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>학원등록방법 매뉴얼</h1>';
        if (registManual == '' || registManual == null) {
            writes += '<input type="file" name="registManual" />';
        } else {
            writes += '<div id="registManual" class="attachFile"><input type="hidden" name="registManualU" value="' + registManual + '"/>'
            writes += '<a href="fileDownLoad.php?fileName=' + encodeURI(registManual) + '&link=' + encodeURI(manualURL + registManual) + '" target="_blank">' + registManual + '</a><br />'
            writes += '<button type="button" onclick="deleteFileAct(\'registManual\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
        }
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>수강방법 매뉴얼</h1>';
        //writes += '<input type="file" name="studyManual" />';
        if (studyManual == '' || studyManual == null) {
            writes += '<input type="file" name="studyManual" />';
        } else {
            writes += '<div id="studyManual" class="attachFile"><input type="hidden" name="studyManualU" value="' + studyManual + '"/>'
            writes += '<a href="fileDownLoad.php?fileName=' + encodeURI(studyManual) + '&link=' + encodeURI(manualURL + studyManual) + '" target="_blank">' + studyManual + '</a><br />'
            writes += '<button type="button" onclick="deleteFileAct(\'studyManual\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
        }
        writes += '</div>';
        writes += '</li>';

        //지회 오픈여부 / 사이트 오픈/닫는 시간
        writes += '<li>';
        writes += '<div class="halfDiv">';
        writes += '<h1>연합회 사이트 오픈여부</h1>';
        writes += '<select name="academyOpenYN">';
        if (academyOpenYN == 'Y') {
            writes += '<option value="N">미오픈</option>';
            writes += '<option value="Y" selected>오픈</option>';
        } else {
            writes += '<option value="N" selected>미오픈</option>';
            writes += '<option value="Y">오픈</option>';
        }
        writes += '</select>';
        writes += '</div>';
        writes += '<div class="halfDiv">';
        writes += '<h1>사이트 Open / Close 시간</h1>';
        writes += '<div class="datePicker">';
        writes += '<input type="text" name="academyOpenTimeDD" class="cal" value="' + academyOpenTime.substring(0, 10) + '" readonly="readonly"/>&nbsp;';
        writes += '</div>';

        var openHH = academyOpenTime.substring(11, 13);

        writes += '<select name="academyOpenTimeHH">';
        for (var i = 0; i < 24; i++) {
            if (openHH == i) {
                writes += '<option value="' + i + '" selected>' + i + '시</option>'
            } else {
                writes += '<option value="' + i + '">' + i + '시</option>'
            }
        }
        writes += '</select> ~ ';
        writes += '<div class="datePicker">';
        writes += '<input type="text" name="academyCloseTimeDD" class="cal" value="' + academyCloseTime.substring(0, 10) + '" readonly="readonly" />';
        writes += '</div>&nbsp;';

        var closeHH = academyCloseTime.substring(11, 13);

        writes += '<select name="academyCloseTimeHH">';
        for (var i = 0; i < 24; i++) {
            if (closeHH == i) {
                writes += '<option value="' + i + '" selected>' + i + '시</option>';
            } else {
                writes += '<option value="' + i + '">' + i + '시</option>'
            }
        }
        writes += '</select>';
        writes += '</div>';
        writes += '</li>';

        if (seq != '') {
            writes += '<li>';
            writes += '<div id="append" class="halfDiv">';
            writes += '<div>';
            writes += '<h1>콘텐츠 매핑</h1>';
            writes += `<button type="button" class="studyMap" onclick="studyMap('${countryID}')">과정등록하기</button>`;
            writes += '</div>';
            writes += '</div>';
            writes += '</li>';
        }

        writes += '</ul>';

        //버튼영역
        writes += '<div class="btnArea">';
        writes += '<button type="button" onClick="checkManageForm()">';
        if (seq != '') {
            writes += '수정하기';
        } else {
            writes += '등록하기';
        }
        writes += '</button>'
        writes += '<button type="button" onClick="listAct(' + page + ')">목록보기</button>';
        writes += '</div>';
        writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'

        writes += '</form>';

        $('#contentsArea').removeAttr('class')
        $('#contentsArea').addClass('BBSWrite')
        $('#contentsArea').html(writes);
        pickerAct();
    }
}

//공통화를 위한 페이지 막음

function viewAct(seq) {
    writeAct(seq)
}

//입력폼 체크
function checkManageForm() {
    /*$.get(useApi,{'seq':seq},function(data){
        if(checkFalse == 0){
            sendData(useApi,'writeform',types);
        }
    })*/
    multipartSendData('writeform');
}

//데이트 피커사용용
function dateAct() {
    function closePicker() {
        $('#datePicker').remove();
        $('.picked').removeClass('picked');
    }

    function todaySel() {
        $('#datePicker').remove();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yy + '-' + mm + '-' + dd;
        $('.picked').val(today);
        $('.picked').removeClass('picked');
    }

    $('#datePicker').append('<p><button type="button" class="todaySel">오늘선택</button>&nbsp;&nbsp;<button type="button" class="pickerClose">닫기</button></p>')
    $('.pickerClose').click(function () {
        closePicker()
    })
    $('.todaySel').click(function () {
        todaySel()
    })
    $('#calendarTable').children('tbody').children('tr').children('td').click(function () {
        var dateSel = $(this).attr('id');
        $('.picked').val(dateSel);
        closePicker();
    })
};

function studyMap(joinUrl) {
    var companyMapLink = 'https://' + siteURL + '/admin/kaohContentsMapping.php?joinUrl=' + joinUrl;
    window.open(companyMapLink, "width=800,height=600,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "modu")
}

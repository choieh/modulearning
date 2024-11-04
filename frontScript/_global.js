function modalAlign() {
    var modalMarginX = Number($('#modal > div:not(".closeArea")').outerWidth()) / 2 * -1;
    var modalMarginY = Number($('#modal > div:not(".closeArea")').outerHeight()) / 2 * -1;
    modalMarginX = modalMarginX + 'px';
    modalMarginY = modalMarginY + 'px';
    $('#modal').prepend('<div class="closeArea"></div>')
    $('#modal div.closeArea').bind('click', function (e) {
        $('#modal').remove();
    });
    $('#modal > div:not(".closeArea")').css({'margin-top': modalMarginY, 'margin-left': modalMarginX})
}

function modalClose() {
    $('#modal').remove();
}

//리스트형태 검색 search Ajax
function searchAct() {
    searchValue = $('.searchForm').serialize();
    searchValue = '&' + searchValue;
    page = 1;
    ajaxAct(searchValue);
}

//검색 후 셀렉트 생성
function searchSelect(obj, apiName, optValue) {
    var searchValue = '';
    $('#' + obj + '>input').each(function () {
        if ($(this).val() != '') {
            searchValue += $(this).attr('name');
            searchValue += '=';
            searchValue += encodeURIComponent($(this).val());
            //2017-05-10 이응민 추가 ->
            searchValue += '&';
            searchValue += 'sqlLimit=memberSearch';
            if (loginUserLevel == 5) {
                searchValue += '&';
                searchValue += 'userID=' + loginUserID;
            }
            //2017-05-10 이응민 추가 끝
            if (apiName == '../api/apiMember.php') {
                if (typeof (optValue) != 'undefined') {
                    searchValue += '&';
                    searchValue += 'userLevel=' + optValue;
                }
            } else if (apiName == '../api/apiSearch.php') {
                if (typeof (optValue) != 'undefined') {
                    searchValue += '&';
                    searchValue += 'searchMode=' + optValue;
                }
            } else if (apiName == '../api/apiSearchApplication.php') {
                if (typeof (optValue) != 'undefined') {
                    searchValue += '&';
                    searchValue += 'searchMode=' + optValue;
                }
            }
            $.get(apiName, searchValue, function (data) {
                var makeSelect = '';
                var ceoName = '';
                var phone01 = '';
                var phone02 = '';
                var phone03 = '';
                var managerName = '';
                var managerID = '';
                var companyCode = '';
                var companyName = '';
                var studyPayCount = '';
                var eduLimitPay = '';
                var bank = '';
                var bankNum = '';
                var bankName = '';
                if (data.totalCount != 0) {
                    if (apiName == '../api/apiMember.php') {
                        $.each(data.member, function () {
                            makeSelect += '<option value="' + this.userID + '">'
                            makeSelect += this.userName + '&nbsp;|&nbsp;' + this.userID + '&nbsp;|&nbsp;' + this.company.companyName + '&nbsp;';
                            makeSelect += '</option>'
                        })
                    } else if (apiName == '../api/apiCompany.php') {
                        $.each(data.company, function () {
                            makeSelect += '<option value="' + this.companyCode + '">'
                            makeSelect += this.companyName + '&nbsp;|&nbsp;' + this.companyCode + '&nbsp;';
                            makeSelect += '</option>'
                        })
                    } else if (apiName == '../api/apiSearch.php') {
                        $.each(data.searchResult, function () {
                            makeSelect += '<option value="' + this.searchCode + '">'
                            makeSelect += this.searchName + '&nbsp;|&nbsp;' + this.searchCode + '&nbsp;';
                            makeSelect += '</option>'
                        })
                    } else if (apiName == '../api/apiSearchApplication.php') {
                        $.each(data.searchResult, function () {
                            makeSelect += '<option value="' + this.searchCode + '">'
                            makeSelect += this.searchName + '&nbsp;|&nbsp;' + this.searchCode + '&nbsp;';
                            makeSelect += '</option>'

                            if (obj == 'contentsC') {
                                studyPayCount = this.studyPayCount;
                                eduLimitPay = this.eduLimitPay;
                            }
                        })
                        if (obj == 'companyCodeC') {
                            companyCode = data.searchResult[0].searchCode;
                            ceoName = data.searchResult[0].ceoName;
                            phone01 = data.searchResult[0].phone01;
                            phone02 = data.searchResult[0].phone02;
                            phone03 = data.searchResult[0].phone03;
                            managerName = data.searchResult[0].managerName;
                            managerID = data.searchResult[0].managerID;
                            companyName = data.searchResult[0].searchName;
                            bank = data.searchResult[0].bank;
                            bankNum = data.searchResult[0].bankNum;
                            bankName = data.searchResult[0].bankName;
                        }
                    }
                    if ($(document).find('select[name="' + obj + '"]').index() == -1) {
                        if (obj == 'companyCodeC') {
                            $('#' + obj + ' button[name="companyBtn"]').after('&nbsp;<select name="' + obj + '" onchange="searchCompany(this.value)"></select>');
                            //$('#'+obj+' button[name="companyBtn"]').after('&nbsp;<select name="'+obj+'"></select>');
                        } else {
                            $('#' + obj).append('&nbsp;<select name="' + obj + '"></select>');
                        }
                    }
                    $('select[name="' + obj + '"]').html(makeSelect);
                    if (obj == 'companyCodeC') {
                        $('input[name="companyCode"]').val(companyCode);
                        $('input[name="companyName"]').val(companyName);
                        $('input[name="ceoName"]').val(ceoName);
                        $('input[name="phone01"]').val(phone01);
                        $('input[name="phone02"]').val(phone02);
                        $('input[name="phone03"]').val(phone03);
                        $('input[name="managerName"]').val(managerName);
                        $('input[name="managerID"]').val(managerID);
                        $('input[name="bank"]').val(bank);
                        $('input[name="bankNum"]').val(bankNum);
                        $('input[name="bankName"]').val(bankName);
                    } else if (obj == 'contentsC') {
                        $('#contentsCodePay strong').html('잔여한도: ' + eduLimitPay + '원 / 예상인원: ' + studyPayCount + '명');
                    }
                    //20170428 이응민 추가 ->
                    if (obj == 'contentsCode') {
                        $('.writeform li[id="contentsCode"] strong.price').remove();
                    } else if (obj == 'userID') {
                        $('.writeform li[id="userID"] strong.price').remove();
                    } else if (obj == 'companyCode') {
                        $('.writeform li[id="companyCode"] strong.price').remove();
                    } else if (obj == 'contentsC') {
                        $('.writeform li[id="contentsCode"] strong.price').remove();
                    }
                    // <- 20170428 이응민 추가
                } else {
                    alert('검색결과가 없습니다.')
                }
            })
        } else {
            alert('검색어를 입력해주세요')
        }
    });
}

function searchCompany(value) {
    var searchMode = '';
    searchMode = 'searchMode=company&companyCode=' + value;

    $.get('../api/apiSearchApplication.php', searchMode, function (data) {
        var ceoName = '';
        var phone01 = '';
        var phone02 = '';
        var phone03 = '';
        var managerName = '';
        var managerID = '';
        var companyName = '';
        var studyPayCount = '';
        var eduLimitPay = '';
        var bank = '';
        var bankNum = '';
        var bankName = '';
        var companyCode = '';

        $.each(data.searchResult, function () {
            companyCode = this.searchCode;
            ceoName = this.ceoName;
            phone01 = this.phone01;
            phone02 = this.phone02;
            phone03 = this.phone03;
            managerName = this.managerName;
            managerID = this.managerID;
            companyName = this.searchName;
            bank = this.bank;
            bankNum = this.bankNum;
            bankName = this.bankName;
        });

        $('input[name="companyCode"]').val(companyCode);
        $('input[name="companyName"]').val(companyName);
        $('input[name="ceoName"]').val(ceoName);
        $('input[name="phone01"]').val(phone01);
        $('input[name="phone02"]').val(phone02);
        $('input[name="phone03"]').val(phone03);
        $('input[name="managerName"]').val(managerName);
        $('input[name="managerID"]').val(managerID);
        $('input[name="bank"]').val(bank);
        $('input[name="bankNum"]').val(bankNum);
        $('input[name="bankName"]').val(bankName);
    });
}


//아이디 중복 체크
function idUseCheck(useApi, checkKey) {
    var checkValues = $('input[name="' + checkKey + '"]').val();
    var checkData = checkKey + '=' + checkValues
    var idReg = /^[a-z0-9]{6,25}$/g;
    console.log(checkData);
    $('input[name="idUseOk"]').prop('checked', false);
    $.ajax({
        url: useApi,
        type: 'PUT',
        data: checkData,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.result == 'success') {
                if (checkValues == '') {	//20170424 이응민 수정
                    alert('아이디를 입력해 주세요.');
                    $('input[name="idUseOk"]').prop('checked', false);
                    /*
                } else if (!idReg.test(checkValues)) {
                    alert('아이디는 6~25자 영문 또는 숫자이어야 합니다.');
                    $('input[name="idUseOk"]').prop('checked',false);
                    */
                } else {
                    alert('사용가능한 아이디입니다.');
                    $('input[name="idUseOk"]').prop('checked', true);
                }
            } else {
                alert('중복 또는 사용할 수 없는 아이디입니다.');
                $('input[name="idUseOk"]').prop('checked', false);
            }
        }
    })
}

// 사업자번호 중복 체크
function companyCodeCheck(useApi, checkKey) {
    var checkValues = $('input[name="' + checkKey + '"]').val();
    var checkData = checkKey + '=' + checkValues
    $('input[name="companyCodeOK"]').prop('checked', false);
    $.ajax({
        url: useApi,
        type: 'PUT',
        data: checkData,
        dataType: 'json',
        success: function (data) {
            if (data.result == 'success') {
                alert('사용가능한 사업자번호입니다.')
                $('input[name="companyCodeOK"]').prop('checked', true);
            } else {
                alert('중복 또는 사용할 수 없는 사업자번호입니다.');
                $('input[name="companyCodeOK"]').prop('checked', false);
            }
        }
    })
}

// 사업자아이디 중복 체크
function companyIDCheck(useApi, checkKey) {
    var checkValues = $('input[name="' + checkKey + '"]').val();
    var checkData = checkKey + '=' + checkValues
    $('input[name="companyIDOk"]').prop('checked', false);
    $.ajax({
        url: useApi,
        type: 'PUT',
        data: checkData,
        dataType: 'json',
        success: function (data) {
            if (data.result == 'success') {
                alert('사용가능한 사업자아이디입니다.')
                $('input[name="companyIDOk"]').prop('checked', true);
            } else {
                alert('중복 또는 사용할 수 없는 사업자아이디입니다.');
                $('input[name="companyIDOk"]').prop('checked', false);
            }
        }
    })
}

//체크박스 전체선택
function checkboxAllCheck(checkedClass) {
    if ($('#' + checkedClass).prop('checked')) {
        $('.' + checkedClass).prop('checked', true);
    } else {
        $('.' + checkedClass).prop('checked', false);
    }
}

//가격형태 콤마 변환,복귀
function toPriceNum(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function forPriceNum(x) {
    return x.toString().replace(/,/g, '');
}

//파일 폼
function fileformAct() {
    $('input[type="file"]').each(function () {
        var thisName = $(this).attr('name');
        var preLabel = '';
        preLabel += '<label class="AttachFiles"><span>파일찾기</span>';
        preLabel += '<input type="file" name="' + thisName + '" style="display:none" onchange="fileAddAct(this,\'' + thisName + '\')" />';
        preLabel += '</label>';
        $(this).after(preLabel);
        $(this).remove();
    })
}

//파일 첨부형태 변환
function fileAddAct(fileName, root) {
    var insertSpan = $('input[name="' + root + '"]').parent('label').children('span');
    var fileName = fileName.value;
    fileName = fileName.replace('C:\\fakepath\\', '');
    if (fileName != '') {
        insertSpan.html(fileName)
    } else {
        insertSpan.html('파일찾기')
    }
}

//파일 첨부 삭제
function deleteFileAct(inputName) {
    var deleteDiv = $('#' + inputName)
    deleteDiv.parent('li, td, div').children('input[type="checkbox"]').prop('checked', true);
    var preLabel = '';
    preLabel += '<label class="AttachFiles"><span>파일찾기</span>';
    preLabel += '<input type="file" name="' + inputName + '" style="display:none" onchange="fileAddAct(this,\'' + inputName + '\')" />';
    preLabel += '</label>';
    deleteDiv.after(preLabel);
    deleteDiv.remove()
}

//인풋내 문자열 검사
function keyCheck(keytypes, inputValue) {
    if (keytypes == "numb") {
        var checkCode = inputValue.value.charCodeAt(inputValue.value.length - 1);
        var str;
        if (inputValue.value.length > 0 && !(checkCode >= 48 && checkCode <= 57)) {
            alert("숫자만 입력가능합니다.");
            var thisLength = inputValue.value.length;
            for (var i = 0; i < thisLength; i++) {
                checkCode_for = inputValue.value.charCodeAt(inputValue.value.length - 1);
                if (!(checkCode_for >= 48 && checkCode_for <= 57)) {
                    str = inputValue.value.substring(0, inputValue.value.length - 1);
                    inputValue.value = str;
                }
            }
            inputValue.focus();
        } else if (inputValue.value.length == 0 || checkCode >= 48 && checkCode <= 57) {
            inputValue.focus();
        }
    } else if (keytypes == "numbEng") {
        if (event.keyCode == 8 || event.keyCode == 9 || event.keycode == 37 || event.keyCode == 39 || event.keyCode == 46) return;
        inputValue.value = inputValue.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힇]/g, '');
    }
}

//팝업 및 쿠키;
function openPopups(name, linkAddress, linkType, images, width, height, left) {
    left = left ? left : 25;
    var openPopupWindow = window.open("", '"' + name + '"', '"toolbar=no, scrollbars=no, resizable=no, top=25, left=' + left + ' , width=' + width + ', height=' + height + '"')
    var popupContents = '';
    popupContents += '<body style="margin:0; padding:0;">';
    popupContents += '<div class="popup">';
    if (linkAddress != '') {
        popupContents += '<a href="' + linkAddress + '" target="' + linkType + '">'
        popupContents += '<img src="../attach/popup/' + images + '" /><br />';
        popupContents += '</a>'
    } else {
        popupContents += '<img src="../attach/popup/' + images + '" /><br />';
    }
    popupContents += '<button type="button" onClick="self.close()" style="width:100%; height:40px; border:none; background:#565656; color:#efefef;">일주일간 이창을 열지 않음</button>'
    popupContents += '</div>';
    popupContents += '</body>';
    openPopupWindow.document.write(popupContents);
    popupContents = '';
}

//팝업 및 쿠키;
function openPopupStudy(name, linkAddress, linkType, images, width, height, left) {
    left = left ? left : 25;
    var openPopupWindow = window.open("", '"' + name + '"', '"toolbar=no, scrollbars=no, resizable=no, top=25, left=' + left + ' , width=' + width + ', height=' + height + '"')
    var popupContents = '';
    popupContents += '<body style="margin:0; padding:0;">';
    popupContents += '<div class="popup">';
    if (linkAddress != '') {
        popupContents += '<a href="' + linkAddress + '" target="' + linkType + '">'
        popupContents += '<img src="../studyCenter/popup/' + images + '" /><br />';
        popupContents += '</a>'
    } else {
        popupContents += '<img src="../studyCenter/popup/' + images + '" /><br />';
    }
    popupContents += '<button type="button" onClick="self.close()" style="width:100%; height:40px; border:none; background:#565656; color:#efefef;">일주일간 이창을 열지 않음</button>'
    popupContents += '</div>';
    popupContents += '</body>';
    openPopupWindow.document.write(popupContents);
    popupContents = '';
}

function loadingAct() {
    var loadingScreen = '<div class="loadingScreen"><img src="../images/global/loading.gif" alt="loading" border=0><span onclick="loadingAct()">[close]</span></div>';
    if ($('body').find('.loadingScreen').length == 0) {
        $('body').append(loadingScreen);
    } else {
        $('.loadingScreen').fadeOut('fast', function () {
            $(this).remove();
        });
    }
}

//리스트 카운트 업데이트
function listCountUpdate(v) {
    listCount = v;
}

//Json Parse시 없는 데이터 입력시 빈값 처리
function returnData(vals) {
    if (vals == undefined) {
        vals = '';
    }
    return vals;
}

//2018-04-26 김재욱 페이지 최상단 이동 추가
function pageMaxUp() {
    $(window).scrollTop(0);
}

//SNS공유
function sendSns(sns, url, txt) {
    var o;
    var _url = encodeURIComponent(url);
    var _txt = encodeURIComponent(txt);
    var _br = encodeURIComponent('\r\n');

    switch (sns) {
        case 'facebook':
            o = {
                method: 'popup',
                url: 'http://www.facebook.com/sharer/sharer.php?t=' + _txt + '&u=' + _url
            };
            break;

        case 'twitter':
            o = {
                method: 'popup',
                url: 'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
            };
            break;

        case 'kakaotalk':
            alert('이 기능은 모바일에서만 사용할 수 있습니다.');
            break;

        case 'naver':
            o = {
                method: 'popup',
                url: 'http://share.naver.com/web/shareView.nhn?url=' + _url + '&title=' + _txt
            };
            break;

        case 'band':
            o = {
                method: 'popup',
                url: 'http://www.band.us/plugin/share?body=' + _txt + '&route=' + _url
            };
            break;

        default:
            alert('지원하지 않는 SNS입니다.');
            return false;
    }

    switch (o.method) {
        case 'popup':
            window.open(o.url);
            break;

        case 'web2app':
            if (navigator.userAgent.match(/android/i)) {
                // Android
                setTimeout(function () {
                    location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'
                }, 100);
            } else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)) {
                // Apple
                setTimeout(function () {
                    location.href = o.a_store;
                }, 200);
                setTimeout(function () {
                    location.href = o.a_proto + o.param
                }, 100);
            } else {
                alert('이 기능은 모바일에서만 사용할 수 있습니다.');
            }
            break;
    }
}

// 바인딩 json 데이터 메모리에 넣어 놓는다.
var gblJsonData = '';

// 일반 jsonAjax 처리
function callAjax(apiAddress, type, param, callback) {
    gblJsonData = ''; // 초기화
    //loadingbar();
    $.ajax({
        url: apiAddress,
        type: type,
        dataType: "json",
        data: param,
        success: function (data) {
            gblJsonData = data;
            if (callback != '') {
                if (typeof (callback) == "function") {
                    callback(data);
                } else {
                    eval(callback);
                }
            }
        },
        error: function (request, status, error) {   // 오류가 발생했을 때 호출된다.
            callNoty('error', 1000, 'bottom', '에러발생');
        }

    }).done(function () {
        //loadingbar('close');
    });
}

/* required class 속성 NULL 체크 */
function nullCheckAll() {

    var rtn = true;
    var temp = $(".required");

    $(".required").each(function () {
        var tempElement = $("#" + this.id);
        var tempType = tempElement.prop("type");
        if (tempType == "text" || tempType == "password") {
            if (tempElement.val() == null || tempElement.val() == "") {
                alert(tempElement.attr("title") + "을(를) 입력해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        } else if (tempType == "select-one") {
            if (tempElement.val() == null || tempElement.val() == "") {
                alert(tempElement.attr("title") + "을(를) 선택해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        } else if (tempType == "checkbox") {
            if (!tempElement.is(":checked")) {
                alert(tempElement.attr("title") + "을(를) 체크해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        } else if (tempType == "radio") {
            if (!tempElement.is(":checked")) {
                alert(tempElement.attr("title") + "을(를) 선택해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        } else if (tempType == "file") {
            if (tempElement.val() == null || tempElement.val() == "") {
                alert(tempElement.attr("title") + " 파일을 첨부해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        } else if (tempType == "email") {
            if (tempElement.val() == null || tempElement.val() == "") {
                alert(tempElement.attr("title") + "을(를) 입력해주세요.");
                tempElement.focus();
                rtn = false;
                return rtn;
            }
        }
    });

    return rtn;

}

function diffDays(date1, date2, flag = '') {  //기준 날짜(YYYY-MM-DD), 변하는 날짜(YYYY-MM-DD), 절대값 flag -> flag = 'a'
    var d1 = new Date(date1); // 오늘날짜
    var d2 = new Date(date2); // 달력 날짜
    var diffDate = d2.getTime() - d1.getTime();

    if (flag == 'a') {
        return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 두 날짜의 차이
    }

    return diffDate / (1000 * 60 * 60 * 24); // 두 날짜의 차이


}

function diffMonth(date1, date2, flag = '') {  //기준 날짜(YYYY-MM-DD), 변하는 날짜(YYYY-MM-DD), 절대값 flag -> flag = 'a'
    var d1 = new Date(date1); // 오늘날짜
    var d2 = new Date(date2); // 달력 날짜
    var diffDate = d2.getTime() - d1.getTime();

    if (flag == 'a') {
        return Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30)); // 두 날짜의 차이
    }

    return diffDate / (1000 * 60 * 60 * 24 * 30); // 두 날짜의 차이


}

function diffYear(date1, date2, flag = '') {  //기준 날짜(YYYY-MM-DD), 변하는 날짜(YYYY-MM-DD), 절대값 flag -> flag = 'a'
    var d1 = new Date(date1); // 오늘날짜
    var d2 = new Date(date2); // 달력 날짜
    var diffDate = d2.getTime() - d1.getTime();

    if (flag == 'a') {
        return Math.floor(diffDate / (1000 * 60 * 60 * 24 * 365)); // 두 날짜의 차이
    }

    return diffDate / (1000 * 60 * 60 * 24 * 365); // 두 날짜의 차이
}

/**
 * return select box option
 * @param obj
 * @returns {string}
 */
function generateOption(obj) {
    return Object.keys(obj).reduce((str, cur) => str += `<option value="${cur}">${obj[cur]}</option>`,'<option value="">선택</option>');
}

// MySQL에서 데이터를 가져와서 select box를 생성하고 선택된 옵션을 처리하는 함수
function createOptions(selectBoxID, tableName, columnName1, columnName2, defaultOption, selectedValue, condition = '') {
    // AJAX 요청을 통해 데이터를 가져옴
    $.ajax({
        url: '../api/apiMakeSelectBox.php', // 데이터를 가져올 PHP 파일의 경로
        type: 'GET',
        data: { table: tableName, column1: columnName1, column2: columnName2, condition: condition }, // 가져올 테이블 이름과 컬럼 이름을 전달
        dataType: 'json',
        success: function(data) {
            // select box를 시작
            var output = '';
            // 기본 옵션 추가
            if (defaultOption) {
                output += '<option value="">' + defaultOption + '</option>';
            }
            // 데이터를 반복하면서 option 태그 추가
            data.forEach(function(item) {
                var selected = (item.value === selectedValue) ? 'selected' : ''; // 선택된 옵션인지 확인
                output += '<option value="' + item.value + '" ' + selected + '>' + item.text + '</option>';
            });
            
            // 결과를 출력
            $('#' + selectBoxID).html(output);
        },
        error: function(xhr, status, error) {
            console.error('AJAX request failed: ' + status + ', ' + error);
        }
    });
}
function actLogin(nextPage) {

    nextPage = nextPage ? nextPage : '';
    var loginData = $('#login').serialize();
    var actLogins = $.ajax({
        method: 'POST',
        url: '../api/apiLogin.php',
        data: loginData,
        dataType: 'text',
        async: false,
        success: function (data) {

            if (data == 'error') {
                alert('로그인에 실패하였습니다.\n\n아이디 또는 비밀번호를 확인 바랍니다.');
            } else {
                window.location.reload();
            }
        },
        error: function (request, status, error) {
            alert('시스템 에러 관리자에게 문의하세요.')
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    })
}

function loginPage(types, nextAct) {
    var types = types ? types : 'login';
    var pageWrites = ''
    if (types == 'login') {
        if (pageMode == 'userPage') {
            pageWrites += '<img src="../images/member/title_login.png" alt="로그인" />';
        } else if (pageMode == 'studyCenterPage' || pageMode == 'securityPage') {
            pageWrites += '<img src="../images/studycenter/img_login.png" alt="로그인" />';
        } else if (pageMode == 'cbhyPage') {
            pageWrites += '<img src="../images/studycenter/img_login.png" alt="로그인" />';
        } else {
            pageWrites += '<h1></h1>';
        }
        pageWrites += '<form id="login" action="javascript:actLogin(\'' + nextAct + '\')">';
        if (pageMode == 'userPage') {
            //pageWrites += '<h1>모두의러닝 교육시스템의 원활한 이용을 위해서는<br />로그인이 필요합니다.</h1>';
        } else if (pageMode == 'studyCenterPage' || pageMode == 'securityPage') {
            pageWrites += '<h1>교육시스템의 원활한 이용을 위해서는<br />로그인이 필요합니다.</h1>';
        } else if (pageMode == 'cbhyPage') {
            pageWrites += '<h1>충청북도 학원연합회 로그인</h1>';
        }
		if(subDomain == 'fowi') {
			pageWrites += '<input type="text" value="forest_" name="userID" />';
		} else {
			pageWrites += '<input type="text" value="아이디" name="userID" />';
		}        
        pageWrites += '<input type="text" value="비밀번호" name="pwd" />';
        pageWrites += '<button type="submit"><img src="../images/member/btn_login.png" alt="로그인" />로그인</button>';
        pageWrites += '</form>';
        pageWrites += '<a href="javascript:loginPage(\'findID\')" style="font-weight: bold;">아이디 찾기</a> | <a href="javascript:loginPage(\'findPW\')" style="font-weight: bold;"><b>비밀번호 찾기</b></a>';
        if (pageMode != 'mobilePage') {
            if (pageMode == 'userPage') {
                //pageWrites += '| <a href="/member/mypage.php">회원가입</a>';
                pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')" style="font-weight: bold;">회원가입</a>';
            } else if (pageMode == 'studyCenterPage') {
                if(subDomain !== 'skoc' && subDomain !== 'fowi') {
                    pageWrites += `| <a href="javascript:top.location.href='../${studyCenterLocate}/mypage.php'" style="font-weight: bold;">회원가입</a>`;
                }
            } else {
                if (pageMode != 'securityPage' && pageMode != 'appPage') {
                    if (subDomain != 'steelnsteel' && subDomain != 'cbhy' && subDomain != 'fowi') {
                        pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')" style="font-weight: bold;">회원가입</a>';
                    } else {
                        if (subDomain == 'cbhy') {
                            pageWrites += '| <a href="javascript:top.location.href=\'../member/cbhyMyPage.php\'">학원등록</a>';
                        }
                    }
                }
            }
        }
    } else if (types == 'findID') {
        if (pageMode == 'userPage') {
            pageWrites += '<img src="../images/member/title_findid.png" alt="아이디찾기" />';
        } else if (pageMode == 'studyCenterPage' || pageMode == 'securityPage') {
            pageWrites += '<img src="../images/studycenter/img_findid.png" alt="아이디찾기" />';
        }
        pageWrites += '<form id="login" action="javascript:findMember(\'ID\')">';
        pageWrites += '<h1>회원가입하신 정보와 일치해야 아이디를 찾을 수 있습니다.</h1>';
        pageWrites += '<div><h1>가입자(성명)</h1><input type="text" name="userName" /></div>';
        pageWrites += '<div><h1>생년월일</h1><input type="tel" name="birth01" maxlength="2" />&nbsp;년&nbsp;&nbsp;&nbsp;<input type="tel" name="birth02" maxlength="2" />&nbsp;월&nbsp;&nbsp;&nbsp;<input type="tel" name="birth03" maxlength="2" />&nbsp;일&nbsp;</div>';
        pageWrites += '<div><h1>휴대폰</h1><input type="tel" name="mobile01" maxlength="3" />&nbsp;-&nbsp;<input type="tel" name="mobile02" style="width:60px;" maxlength="4"" />&nbsp;-&nbsp;<input type="tel" name="mobile03" style="width:60px;" maxlength="4"" /></div>';
        pageWrites += '<button type="submit"><img src="../images/member/btn_find.png" alt="찾기" />아이디 찾기</button>';
        pageWrites += '</form>';
        pageWrites += '<a href="javascript:loginPage(\'login\',\'main/index.php?\')">로그인</a> | <a href="javascript:loginPage(\'findPW\')">비밀번호 찾기</a>';
        if (pageMode != 'mobilePage') {
            if (pageMode == 'userPage') {
                //pageWrites += '| <a href="/member/mypage.php">회원가입</a>';
				if (subDomain != 'fowi') {
	                pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')">회원가입</a>';
				}
            } else {
                if (pageMode != 'securityPage' && pageMode != 'appPage') {
                    if (subDomain != 'steelnsteel' && subDomain != 'cbhy' && subDomain != 'fowi') {
                        pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')">회원가입</a>';
                    } else {
                        if (subDomain == 'cbhy') {
                            pageWrites += '| <a href="javascript:top.location.href=\'../member/cbhyMyPage.php\'">학원등록</a>';
                        }
                    }
                }
            }
        }
    } else if (types == 'findPW') {
        if (pageMode == 'userPage') {
            pageWrites += '<img src="../images/member/title_findpw.png" alt="비밀번호찾기" />';
        } else if (pageMode == 'studyCenterPage' || pageMode == 'securityPage') {
            pageWrites += '<img src="../images/studycenter/img_findpw.png" alt="비밀번호찾기" />';
        }
        pageWrites += '<form id="loginpw" action="javascript:findMember(\'PW\')">';
        //pageWrites += '<h1>비밀번호는 회원가입시 입력하신 휴대폰으로 초기화되어 전송됩니다.</h1>';
        pageWrites += '<div><h1>아이디</h1><input type="text" name="userID" /></div>';
        pageWrites += '<div><h1>가입자(성명)</h1><input type="text" name="userName" /></div>';
        pageWrites += '<div><h1>생년월일</h1><input type="tel" name="birth01" maxlength="2" />&nbsp;년&nbsp;&nbsp;&nbsp;<input type="tel" name="birth02" maxlength="2" />&nbsp;월&nbsp;&nbsp;&nbsp;<input type="tel" name="birth03" maxlength="2" />&nbsp;일&nbsp;<strong>(ex.92년 9월 19일)</strong></div>';
        pageWrites += '<div><h1>휴대폰</h1><input type="tel" name="mobile01" maxlength="3" />&nbsp;-&nbsp;<input type="tel" name="mobile02" style="width:60px;" maxlength="4"" />&nbsp;-&nbsp;<input type="tel" name="mobile03" style="width:60px;" maxlength="4"" /></div>';
        pageWrites += '<button type="submit"><img src="../images/member/btn_find.png" alt="찾기" />비밀번호 찾기</button>';
        pageWrites += '</form>';
        pageWrites += '<a href="javascript:loginPage(\'login\',\'main/index.php?\')">로그인</a> | <a href="javascript:loginPage(\'findID\')">아이디 찾기</a>';
        if (pageMode != 'mobilePage') {
            if (pageMode == 'userPage') {
                //pageWrites += '| <a href="/member/mypage.php">회원가입</a>';
                pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')">회원가입</a>';
            } else {
                if (pageMode != 'securityPage' && pageMode != 'appPage') {
                    if (subDomain != 'steelnsteel' && subDomain != 'cbhy' && subDomain != 'fowi') {
                        pageWrites += '| <a href="javascript:alert(\'회원가입은 전화로 문의 바랍니다.\')">회원가입</a>';
                    } else {
                        if (subDomain == 'cbhy') {
                            pageWrites += '| <a href="javascript:top.location.href=\'../member/cbhyMyPage.php\'">학원등록</a>';
                        }
                    }
                }
            }
        }
    }
    $('#loginArea').html(pageWrites)
    if (types == 'login') {
        loginScript();
    }
}

//아이디 비번찾기
function findMember(findObj) {
    //input 검사
    var $writeChk = $('#login input[type="text"], #login input[type="tel"]')//20170810 서영기 select항목 각각 등록
    var checkFalse = 0
    /*$writeChk.each(function(){
        if($(this).val() == ''){
			alert('정보를 모두 입력해 주세요.')
			checkFalse ++;
			return false;
		}
    })*/

    /*$('input[type="tel"]').each(function(){
        if($(this).val().length == 1){
            nuNumber = '0'+$(this).val();
            $(this).val(nuNumber)
        }
    });*/

    if (checkFalse == 0) {
        if (findObj == 'ID') {
            sendData = $('#login').serialize();
        } else {
            sendData = $('#loginpw').serialize();
        }
        var findMembers = $.ajax({
            method: 'PUT',
            url: '../api/apiLogin.php',
            data: sendData,
            dataType: 'text',
            success: function (data) {
                if (findObj == 'ID') {
                    if (data != 'error' && data !== '[]' && data != 'null') {
                        var users = JSON.parse(data);
                        var concatenatedIDs = '';

                        for (var i = 0; i < users.length; i++) {
                            var userID = users[i].userID;
                            var inputDate = new Date(users[i].inputDate);
                            var formattedDate = inputDate.getFullYear() + '년 ' +
                                (inputDate.getMonth() + 1) + '월 ' +
                                inputDate.getDate() + '일 가입';

                            concatenatedIDs += userID + ' (' + formattedDate + ')<br><br>';
                        }

                        $('.userIdList').html(concatenatedIDs);
                        openIdModal();

                        // alert(concatenatedIDs);
                    } else {
                        var concatenatedIDs = '<br>일치하는 정보가 없습니다.<br>입력한 내용을 다시 한번 확인해주세요.';
                        $('.userIdList').html(concatenatedIDs);
                        openIdModal();
                    }
                } else {
                    if (data != 'error' && data !== '[]' && data != 'null') {
                        var concatenatedIDs = '<br>임시 비밀번호를 핸드폰으로 전송했습니다.';
                        $('#searchText').text('회원정보 조회 결과');
                        $('.userIdList').html(concatenatedIDs);
                        openIdModal();
                        //top.location.href='../member/index.php?pid=1'
                    } else {
                        var concatenatedIDs = '<br>일치하는 정보가 없습니다.<br>입력한 내용을 다시 한번 확인해주세요.';
                        $('#searchText').text('회원정보 조회 결과');
                        $('.userIdList').html(concatenatedIDs);
                        openIdModal();
                    }
                }
            },
            error: function (request, status, error) {
                alert('시스템 에러 관리자에게 문의하세요.')
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        })
    }
}



var setLoginCookie = function (name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var getLoginCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};


var deleteLoginCookie = function (cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}


function openIdModal() {
    $('.userIdModal').css('display', 'block');
    $('body').addClass('no-scroll').on('scroll touchmove mousewheel', function (e) {
        e.preventDefault();
    });
}

$(document).ready(function () {
    $('#confirmBtn').click(function () {
        $('body').removeClass('no-scroll').off('scroll touchmove mousewheel');
        $('.userIdModal').css('display', 'none'); // 모달 창 숨기기
    });
});

//(function(a,g,e,n,t){a.enp=a.enp||function(){(a.enp.q=a.enp.q||[]).push(arguments)};n=g.createElement(e);n.async=!0;n.defer=!0;n.src="https://cdn.megadata.co.kr/dist/prod/enp_tracker_self_hosted.min.js";t=g.getElementsByTagName(e)[0];t.parentNode.insertBefore(n,t)})(window,document,"script");

let chapterObj = {};
$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: chapterApi,
        data: 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq,
        async: false,
        success: function (data) {
            chapterObj = data;
            ajaxAct();
        }
    })
})


function setReferrer() {
    sessionStorage.setItem('referrer', window.location.pathname + window.location.search);
}

function ajaxAct() {
//	var listAjax = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq, function(data){
    var totalCount = chapterObj.totalCount;
    var lists = '';
    var Sid = chapterObj.contentsCode + chapterObj.lectureStart.substr(2, 2) + chapterObj.lectureStart.substr(5, 2) + chapterObj.lectureStart.substr(8, 2) + chapterObj.lectureEnd.substr(8, 2);
    var lectureOpenSeq = chapterObj.lectureOpenSeq;
    var contentsCode = chapterObj.contentsCode;
    var mobileSourceType = chapterObj.mobileSourceType;
    var useMidTest = chapterObj.midStatus;
    var useFinTest = chapterObj.testStatus;
    var useReport = chapterObj.reportStatus;
    var lastPage = chapterObj.lastPage;
    var mobileLastPage = chapterObj.mobileLastPage;
    var midTerm = chapterObj.midTestChapter;
    var progressCheck = chapterObj.progressCheck;
    var testOverTime = chapterObj.testOverTime;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var serviceType = chapterObj.serviceType;

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    if (totalCount != 0) {
        // 산업안전 인증
        // if ((chapterObj.serviceType == '5' && (loginUserID == 'zkfmak3785' || loginUserID == 'sun2313') && chapterObj.certPass == 'N') ||
        if (((chapterObj.serviceType == '5' && chapterObj.userAuth == 'Y' && chapterObj.certPass == 'N') ||
            ((chapterObj.serviceType == '1' || chapterObj.serviceType == '2') && (chapterObj.certPass == 'N'))) && chapterObj.companyCode != '3018211347' && loginUserID != 'dhkang99') {
            // if (((chapterObj.serviceType == '1' || chapterObj.serviceType == '2') && (chapterObj.certPass == 'N' ))) {
            alert('수강 시 본인인증 절차를 거쳐야 합니다.');
            certMove(lectureOpenSeq, chapterObj.lectureStart, contentsCode, serviceType);
        } else {
            var today = new Date(chapterObj.nowTime);
            var today2 = chapterObj.nowTime;
            var dd = today.getDate();
            if (dd <= 9) {
                dd = '0' + dd
            }
            var mm = today.getMonth() + 1; //January is 0!
            if (mm <= 9) {
                mm = '0' + mm
            }
            var yy = today.getFullYear();
            today = yy + '-' + mm + '-' + dd;
            var todayCount = 0;
            var btnUse = 'Y';
            var btnUse2 = 'Y';
            lists += '<div class="page_title" style="border-radius:5px; margin-bottom:25px;">';
            lists += '<h3 class="title">' + chapterObj.contentsName + '</h3>';
            lists += '</div>';
            lists += '<ul class="dep_list">';
            lists += '<li class="blt_txt">학습현황</li>';
            lists += '</ul>';

            lists += `<div id="page-reload">
                    <div style="position:absolute; right:0; top:-24px; font-weight:900;">
                    <button type="button" style="background:#ffcb05; border:none; padding: 4px 5px; border-radius:5px; margin-bottom:2px" 
                        onclick="certificateFilter('${chapterObj.seq}')">수료증 발급
                    </button>
                    </div>
                    </div>`;

            lists += '<table summary="학습현황" class="tb_style06 mt10">';
            lists += '<colgroup>';
            lists += '<col style="width:80px">';
            lists += '<col style="width:*">';
            lists += '</colgroup>';
            lists += '<tbody>';
            lists += '<tr>';
            lists += '<td class="bold talign_l">학습기간</td>';
            lists += '<td class="talign_l">' + chapterObj.lectureStart + '-' + chapterObj.lectureEnd + '</td>';
            lists += '</tr> ';
            lists += '<tr>';
            lists += '<td class="bold talign_l">진도율</td>';
            lists += '<td class="talign_l">';
            lists += '<div class="graph_wrap">';
            lists += '<div class="graph_box"> ';
            lists += '<div class="graph_bar" id="graph_bar1" style="width:' + chapterObj.totalProgress + '%"></div>';
            lists += '<script type="text/javascript">';
            $(document).ready(function () {
                $("#graph_bar1").css("width", +"%");
                $("#graph_bar2").css("width", +"%");
            });
            lists += '</script> ';
            lists += '</div>';
            lists += '<span class="graph_p" id="graph_no1">' + chapterObj.totalProgress + '%</span>';
            lists += '</div> ';
            lists += '</td>';
            lists += '</tr>';
            if (chapterObj?.testScore && chapterObj.serviceType == '5') {
              lists +=  '<tr>';
              lists += '<td class="bold talign_l">점수</td>';
              lists += `<td class="talign_l">${chapterObj.testScore}점 / 총점 100점</td>`;
              lists +=  '</tr>';
            }
            lists += '</tbody>';
            lists += '</table>';
//				lists += '<p class="notice" style="font-size:12px; background:#2c3e50; color:#ecf0f1">모바일에서는 <strong style="color:#e67e22;">학습만 가능</strong>합니다.<br>평가는 <strong style="color:#e67e22;">PC로 접속</strong>하여 응시하셔야 합니다.</p>';
            lists += '<ul class="dep_list mt30">';
            lists += '<li class="blt_txt">강의목차</li>';
            lists += '</ul>';
            lists += '<div id="page-reload">';
            lists += '<div>';
            lists += '<a href="javascript:location.href=location.href">새로고침 <img src="../images/mobile/sub/icons-rotation.png"></a>';
            lists += '</div>';
            lists += '</div>';

            let i = 1;
            $.each(chapterObj.progress, function () {
                if (this.endTime != null) {
                    if (this.endTime.substr(0, 10) == today) {
                        todayCount++;
                    }
                }

                if (this.lastPage == null) {
                    var lastPage = 1;
                } else {
                    var lastPage = this.lastPage;
                }

                if (this.mobileLastPage == null) {
                    var mobileLastPage = 1;
                } else {
                    var mobileLastPage = this.mobileLastPage;
                }

                lists += '<section class="mypage_classIndex">';
                lists += '<ul>';
                lists += '<li>' + this.chapter + '차시</li>';
                lists += '<li>' + this.chapterName + '</li>';
                lists += '<li class="tc_blue" style="color:#3498db">' + this.progress + '%</li>';
                lists += '</ul>';

                lists += `<button type="button" class="learn_btn"
						onclick="studyPlay('${studySeq}', '${contentsCode}', '${this.chapter}', '${lectureOpenSeq}', 'check', '${mobileSourceType}', '${Sid}', '${lastPage}', '${mobileLastPage}')">수강하기</button>`;

                lists += '</section>';

                if (midTerm != 0 && i == midTerm && (serviceType == '1' || serviceType == '9' || serviceType == '10')) {
                    lists += renderTestBtn('mid', chapterObj.midStatus, chapterObj.totalProgress, chapterObj.midTestProgress);
                }

                i++;
            })

            if (chapterObj.testRate != '0') {
                if (curDate >= chapterObj.testEndTime && testOverTime == 'N' && chapterObj.testStatus == 'V') {
                    $.ajax({
                        method: 'POST',
                        url: testAnswerApi,
                        data: {
                            'contentsCode': contentsCode,
                            'lectureOpenSeq': lectureOpenSeq,
                            'testType': 'final',
                            'testEnd': 'N',
                            'endTime': 'Y'
                        },
                    })
                    chapterObj.testOverTime = 'Y';
                }

                if (serviceType == '1' || serviceType == '9' || serviceType == '5' || serviceType == '10' ||
                    (serviceType == '3' && chapterObj.contentsCode == "3FO31N" &&
                        (chapterObj.companyCode == "5058203997" || chapterObj.companyCode == "2198201220" || chapterObj.companyCode == "2198201221" || chapterObj.companyCode == "2728101049" || chapterObj.companyCode == "0000000000"))
                ) {
                    lists += renderTestBtn('final', chapterObj.testStatus, chapterObj.totalProgress, chapterObj.finalTestProgress);
                }
            }

            if (chapterObj.reportRate != '0' && (serviceType == '1' || serviceType == '9' || serviceType == '10')) {
                lists += renderTestBtn('report', chapterObj.reportStatus, chapterObj.totalProgress, chapterObj.finalTestProgress);
            }

            if ((chapterObj.testStatus == 'Y' && chapterObj.testOverTime != 'Y') || chapterObj.testStatus == 'C') {
                if (serviceType == '5' && parseInt(chapterObj.passScore) > parseInt(chapterObj.testScore)) {
                    lists += renderRetakenBtn(chapterObj.retakenWay, chapterObj.seq)
                }
            }

        }
    }
    $('.inner').html(lists);
//	})
}

function openCaptcha(like, chapter) {
    if (like == 'study') {
        window.location.href = `hrdMOTP_mobile.php?mobileYN=Y&type=${like}&chapter=${chapter}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&studySeq=${studySeq}&progressCheck=timeCheck&mobileSourceType=${chapterObj.mobileSourceType}&lectureStart=${chapterObj.lectureStart}&userID=${loginUserID}`;
    } else {
        window.location.href = `hrdMOTP_mobile.php?mobileYN=Y&type=${like}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&studySeq=${studySeq}&userID=${loginUserID}`;
    }
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, mobileSourceType, Sid, MovePage, Page) {
    let dailyMaxChapter = 0;
    let serType = 0;
    let studyCount = 0;
    let prevProgress = 100;
    let lectureEnd = '';
    let midTerm = 0;

    $.ajax({
        url: chapterApi,
        type: "GET",
        async: false, //비동기 사용
        data: {'contentsCode': contentsCode, 'lectureOpenSeq': lectureOpenSeq},
        success: function (data) {
            serType = data.serviceType;
            midTerm = data.midTestChapter;
            lectureEnd = data.lectureEnd;
            nowTime = data.nowTime;

            if (chapter > 1) {
                prevProgress = data.progress[chapter - 2].progress;
            }

            if (data.serviceType == 1) { // 환급 과정 수강 시간 및 일일 제한
                $.each(data.progress, function () {
                    if (this.endTime != null && nowTime.substr(5, 5) == this.endTime.substr(5, 5)) {
                        studyCount++;
                        if (studyCount == 8) {
                            dailyMaxChapter = this.chapter;
                        }
                    }
                })
            }
        }
    })

    if (Number(prevProgress) != 100 && nowTime < lectureEnd + '23:59:59') {
        alert(`${chapter - 1}차시 진도율 100%를 채워주세요.`);
        return false;
    }


    if (serType == '1' && nowTime < lectureEnd + '23:59:59') { // 환급 일일 수강 제한
        if (Number(dailyMaxChapter) != 0 && Number(chapter) > Number(dailyMaxChapter)) {
            alert('사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.');
            return false;
        }

        if (Number(chapter) > Number(midTerm) && Number(midTerm) != 0 && (chapterObj.midStatus != 'C' && chapterObj.midStatus != null)) {
            alert('중간평가 응시 후, 다음 차시 학습 가능합니다.');
            return false;
        }

        if (Number(chapter) % 8 == 1) {
            alert('사업주 직업능력개발훈련 규정에 따라 인증을 실시합니다.');
            openCaptcha('study', Number(chapter));
            return false;
        }

    }

    $.get('../api/apiLoginUser.php', function (data) {
        if (data.userID == '') {
            alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
            location.href = "login.php";

        } else {
            if (mobileSourceType == 'html5') {
                if (check != '') {
                    if (confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?') == true) {
                        check = check
                    } else {
                        check = ''
                        return false
                    }

                }
                var linkAddress = 'study_html.php?studySeq=' + studySeq + '&contentsCode=' + contentsCode + '&chapter=' + chapter + '&lectureOpenSeq=' + lectureOpenSeq + '&check=' + check;
                top.location.href = linkAddress;

            } else {
                if (check != '') {
                    if (confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?') == true) {
                        check = check
                    } else {
                        check = ''
                        return false
                    }

                }
                var linkAddress = 'study_view.php?studySeq=' + studySeq + '&contentsCode=' + contentsCode + '&chapter=' + chapter + '&lectureOpenSeq=' + lectureOpenSeq + '&autoplay=' + chapterObj.autoplay + '';
                top.location.href = linkAddress;

            }
        }
    })
}

function renderTestBtn(like, status, progress, testProgress) {
    let result = '';
    let title = '';
    let captcha = '';
    if (like == 'mid') {
        title = '중간평가';
        captcha = chapterObj.midCaptchaTime;
    } else if (like == 'final') {
        title = '최종평가';
        captcha = chapterObj.testCaptchaTime;
    } else {
        title = '과제';
        captcha = chapterObj.reportCaptchaTime;
    }

    result += '<section class="mypage_classIndex">';
    result += '<ul>';
    result += `<li style="letter-spacing:3px; font-weight:700;">${title}</li>`;
    result += '<li></li>';

    if (Number(progress) < Number(testProgress)) {
        result += '<li class="tc_blue" style="color:gray;">진도부족</li>';
    } else if (status == 'N') {
        result += '<li class="tc_blue" style="color:red;">미응시</li>';
    } else if (status == 'V') {
        if (chapterObj.testOverTime == 'Y' && like == 'final') {
            result += '<li class="tc_blue" style="color:red;">시간초과</li>';
        } else {
            result += '<li class="tc_blue" style="color:red;">진행중</li>';
        }
    } else {
        result += '<li class="tc_blue" style="color:#3498db;">응시</li>';
    }

    result += '</ul>';
    if (status == 'C' || status == 'Y') {
        result += `<button style="background:gray; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="alert('이미 응시 하셨습니다.')">응시완료</button>`;
    } else if (like == 'final' && status == 'V') {
        if (chapterObj.testOverTime == 'Y') {
            result += `<button style="background:gray; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn">시간 초과로인한 자동제출</button>`;
        } else {
            result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="moveToTest('${like}', '${progress}', '${testProgress}')">
			응시중&nbsp;(${chapterObj.testEndTime}까지 응시 가능)</button>`;
        }
    } else if (like == 'report' && status == 'V' && chapterObj.lectureEnd >= curDate) {
        result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="moveToTest('${like}', '${progress}', '${testProgress}')">
		응시중&nbsp;(${chapterObj.lectureEnd} 23:50까지 응시 가능)</button>`;
    } else {
        result += `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn"
		onclick="moveToTest('${like}', '${title}', '${captcha}', '${progress}', '${testProgress}')">평가응시</button>`;
    }

    result += '</section>';

    return result;
}

function moveToTest(like, title, captcha, progress, testProgress) {
    if (Number(progress) < Number(testProgress)) {
        alert(`진도율 ${testProgress}%부터 ${title} 응시 가능합니다.`);
        return false;
    }

    if (chapterObj.serviceType == '1' && captcha == 'null') {
        openCaptcha(like);
        return false;
    }

    window.location.href = `mobileTestPage.php?like=${like}&contentsCode=${chapterObj.contentsCode}&lectureOpenSeq=${chapterObj.lectureOpenSeq}&seq=${studySeq}`;
}

function certMove(lectureOpenSeq, lectureStart, contentsCode, serviceType) {
    window.location.href = 'mobileCerti.php?lectureOpenSeq=' + lectureOpenSeq + '&lectureStart=' + lectureStart + '&contentsCode=' + contentsCode + '&serviceType=' + serviceType;
}

function certificateFilter(seq) {
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
        </div>
        <div style="display:flex; justify-content: center; margin-top: 20px;">
            <button style="border:none; background: #74b9ff; color: white; 
            font-size:15px; width: 100px; height: 30px; border-radius: 5px;"
            onclick="printCertificate('${seq}')">
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

function printCertificate(seq) {
    let param = `seq=${seq}`;
    if (document.getElementById('chapterName').checked) {
        param += '&chapterName=Y';
    }

    if (document.getElementById('changeDept').checked) {
        param += '&changeDept=Y';
    }
    const modal = document.getElementById('certificateFilter');
    closeModal();
    window.open(`../m/print.php?${param}`, '_blank');
}

function renderRetakenBtn(retakenWay, seq) {
    if (retakenWay == 0) {
        return `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="retaken('${loginUserID}','${seq}','test',0)">
			재응시하기</button>`
    }

    if (retakenWay == 1) {
        return `<button style="background:#ffcb05; color:#4d4d4f; font-weight:900;" type="button" class="learn_btn" onclick="retaken('${loginUserID}','${seq}','test',1)">
			재응시하기</button>`
    }


}

function retaken(userID, seq, testType, retakenWay) {
    let testTxt = testType == 'mid' ? '중간' : testType == 'test' ? '최종' : '과제'

    if (retakenWay == 0) {
        if (confirm(`${testTxt}평가를 재응시 하시겠습니까?`)) {
            $.ajax({
                url: '../api/apiStudy.php',
                type: 'POST',
                data: {
                    'userID': userID,
                    'seq': seq,
                    'retaken': 'Y',
                    'testType': testType
                },
                dataType: "text",
                success: function () {
                    alert('재응시 요청처리 되었습니다.');
                    window.location.reload();
                },
                fail: function () {
                    alert('변경실패.');
                }
            })
        }
    }


    if (retakenWay == 1) {
        if (confirm(`${testTxt}평가를 재응시 요청하시겠습니까?`)) {
            fetch('/api/apiStudyRetaken.php', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(
                    {
                        'userID': userID,
                        'studySeq': seq,
                        'testType': testType
                    }).toString()
            })
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    } else {
                        alert('요청에러')
                    }
                })
                .then(data => {
                    if (data.result == 0) {
                        alert('요청완료')
                    } else if (data.result == 1) {
                        alert('이미 요청되어 승인 대기중입니다. 문의사항은 기업의 교육담당자에게 연락바랍니다.')
                    } else {
                        alert('알 수 없는 에러')
                    }
                })
                .catch(e => console.log(e))
        }
    }

}
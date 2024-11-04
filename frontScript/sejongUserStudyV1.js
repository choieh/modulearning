var useApi = '/api/v1/apiStudyRoom.php';
var chapterApi = '/api/apiStudyChapter.php';
var checkTestApi = '/api/v1/apiCheckTest.php';
var offSurveyApi = '../api/apiOffSurvey.php';
var offSurveyAnswerApi = '../api/apiOffSurveyAnswer.php';

var studySeq = '';
var serviceType = '';
let sourceType = 'mp4';
let studyObj = {};

// window.addEventListener('pageshow', () => {
//     setTimeout(() => {
//         ajaxAct();
//     }, 100)
// })

function listAct() {
    var contents = '';
    contents += '<ul>';
    contents += '</ul>';
    $('#contentsArea').html(contents);
    ajaxAct();
}

function viewAct() {
    listAct();
}

function ajaxAct() {
    var listAjax = $.get(useApi, function (data) {

        var totalCount = data.totalCount;

        var lists = '';
        if (totalCount != 0) {
            $.each(data.study, function () {
                studyObj[this.contentsCode + ',' + this.lectureOpenSeq] = this;
                var endDate = this.lectureEnd.split('-');

                var certDate = this.certDate;
                if (certDate) {
                    certDate = certDate.substr(0, 10);
                }
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                today = yyyy + '-' + mm + '-' + dd;

                lists += '<li class="list' + this.seq + '" style="margin-bottom:40px;">';
                if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
                    lists += `<div class="summuryArea" onclick="alert('환급 과정 완료 후 다음과정 수강 할 수 있습니다.');">`;
                } else {

                    if (this.serviceType != 8 && this.serviceType != 7) {
                        lists += `<div class="summuryArea" data-seq="${this.seq}" data-contents-code="${this.contentsCode}"
                                   data-lecture-open-seq="${this.lectureOpenSeq}">`;
                    } else {  // 수강연동인 경우 (serviceType 값이 7(이상에듀)이거나 8(안기원)일 경우)
                        if (this.serviceType == '7') {//이상에듀 수강연동일경우
                            lists += '<div class="summuryArea" onclick="nynJoinLMS(\'' + this.seq + '\',\'study\')">';
                        } else {//안기원 수강연동일경우
                            lists += '<div class="summuryArea" onclick="joinLMS(\'' + this.seq + '\',\'study\')">';
                        }
                    }
                }

                lists += '<ul>';
                if (this.leftDate == '종료') {
                    lists += '<li><h1>남은 수강일</h1><strong style="color:red;">' + this.leftDate + '</strong>일</li>';
                } else {
                    lists += '<li><h1>남은 수강일</h1><strong>' + this.leftDate + '</strong>일</li>';
                }

                if ((this.serviceType == '3' || this.serviceType == '5' || this.serviceType == '10' || this.serviceType == '11') && this.passOK == 'Y') {   //수료시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += `<li id="passOK"><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(${this.seq});" style="width:71px; height:60px; margin:6px 15px;" /></li>`;
                } else if (this.serviceType != '8' && this.serviceType != '7') {
                    lists += '<li><h1>차시 진도</h1><strong id="currentChapter' + this.seq + '">' + this.nowChapter + '</strong>/' + this.chapter + '</li>';
                }

                if (this.serviceType == '5' && this.testStatus == 'C' && this.companyCode != '5088213174') {
                    lists += '<li><h1>평가점수</h1><strong>' + this.totalScore + '</strong>점</li>';
                } else {
                    lists += '<li><h1>진도율</h1><strong class="totlaProgress01">' + this.progress + '</strong>%</li>';
                }


                lists += '</ul>';
                lists += '<img src="' + this.previewImageURL + this.previewImage + '" alt="강의 이미지" />';
                if (this.contentsName.length > 25) {
                    lists += '<h1 style="font-size:14px;">' + this.contentsName + '</h1><br />';
                } else {
                    lists += '<h1>' + this.contentsName + '</h1><br />';
                }
                lists += '<h2>수강기간 : ' + this.lectureStart + ' ~ ' + this.lectureEnd + '</h2><br />';
                lists += '<input id="lectureEndDate" type="hidden" value="' + this.lectureEnd + '">';
                lists += '<h3>' + this.serviceTypeName + '</h3>';
                lists += `<p style="float:right; font-weight:bold; margin-right:5px; font-size:18px;
                            padding: 3px 15px; background-color:#F6B618; border-radius:5px;">수강하기</p>`;
                lists += '</div>';

                lists += '</li>';


            })
        } else {
            lists += `<div style="text-align:left; padding-top:32px;">
                                <button id="applyingBtn"
                                style="background:#4d4d4f; border:none; border-radius:5px; color:whitesmoke;
                                padding:10px; font-size:18px; font-weight:bold;"
                                onClick="checkFounderEdu()">연수 교육 신청하기
                               </button></div>`
        }

        $('#contentsArea > ul').html(lists);

        document.querySelectorAll('.summuryArea').forEach(ele => {
            if (ele.dataset.seq) {
                ele.addEventListener('click', (e) => {
                    const {seq, contentsCode, lectureOpenSeq} = ele.dataset;

                    viewStudy(e, seq, contentsCode, lectureOpenSeq);
                })
            }
        })

        if (totalCount > 0) {
            $('#titleArea h3 span').html('총 <strong class="blue">' + totalCount + '</strong>개 과정의 학습이 진행 중입니다.');
        } else {
            $('#titleArea h3 span').html('진행 중인 과정이 없습니다.');
        }
    })


}

function setRefferrer() {
    sessionStorage.setItem('referrer', window.location.pathname);
}

// 수강창 열기
function openStudyTab(studySeq, contentsCode, lectureOpenSeq, serviceType) {
    window.location.href = `/study/studyView.php?studySeq=${studySeq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&userID=${loginUserID}&serviceType=${serviceType}`;
}

// 플렉스 과정 시작 후 만듬 (2024.01.30)
function viewStudy(obj, studySeq, contentsCode, lectureOpenSeq) {
    if (obj.target.parentNode.id == 'passOK') {
        return;
    }

    var $studyBlock = $('.list' + studySeq);//변동될 스터디블록
    var studyDetails = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
        var today = data.nowTime.substring(0, 10);
        serviceType = data.serviceType;
        sourceType = data.sourceType;

        setRefferrer();
        if ((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N') {
            certPassModal3(data.lectureStart, data.seq, data.contentsCode, data.lectureOpenSeq, data.serviceType);
        } else if (data.certPass == 'N' && data.serviceType == 5) { // 산업안전 본인인증용
            certPassModal4(data.lectureStart, data.seq, data.contentsCode, data.lectureOpenSeq, data.userAuth);
        } else {
            openStudyTab(data.seq, data.contentsCode, data.lectureOpenSeq, data.serviceType)
        }
    })
}

// 플렉스 과정 도입 이전 사용 함수
function viewStudyDetail(studySeq, contentsCode, lectureOpenSeq) {
    var $studyBlock = $('.list' + studySeq);//변동될 스터디블록
    var studyDetails = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
        var today = data.nowTime.substring(0, 10);
        serviceType = data.serviceType;
        sourceType = data.sourceType;

        setRefferrer();
        if ((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N') {
            certPassModal(data.lectureStart, studySeq, contentsCode, lectureOpenSeq);
        } else if (data.certPass == 'N' && data.serviceType == 5) { // 산업안전 본인인증용
            certPassModal2(data.lectureStart, studySeq, contentsCode, lectureOpenSeq, data.userAuth);
        } else {
            openStudyTab(studySeq, contentsCode, lectureOpenSeq, serviceType)
        }
    })

}

function openTest(type, seq, contentsCode, lectureOpenSeq, serviceType) {
    if (event.srcElement.id == 'retakenBtn') {
        return;
    }
    setRefferrer();
    fetch(checkTestApi + `?type=${type}&seq=${seq}&userID=${loginUserID}`)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'progress') {
                alert(`${data.message}% 이상 수강 후 응시 가능합니다.`)
            }

            var hasSurvey = studyObj[contentsCode + ',' + lectureOpenSeq].survey;

            if (data.result == 'cert') {
                if (serviceType == '1' && hasSurvey == 'N' && type == 'final') {
                    setEmonFormValue(studyObj[contentsCode + ',' + lectureOpenSeq])
                    getSurveyChk(studyObj[contentsCode + ',' + lectureOpenSeq], `/auth/userCertSso.php?type=${type}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&userID=${loginUserID}&serviceType=${serviceType}`)
                } else {
                    window.location.href = `/auth/userCertSso.php?type=${type}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&userID=${loginUserID}&serviceType=${serviceType}`;
                }
            }

            if (data.result == 'expired') {
                alert(`응시 시간: ${data.message}\n응시 시간이 지났습니다.`);
            }

            if (data.result == 'success') {
                if (serviceType == '1' && hasSurvey == 'N' && type == 'final') {
                    setEmonFormValue(studyObj[contentsCode + ',' + lectureOpenSeq])
                    getSurveyChk(studyObj[contentsCode + ',' + lectureOpenSeq], `/study/userTestPage.php?contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&like=${type}&studySeq=${seq}&serviceType=${serviceType}`)
                } else {
                    window.location.href = `/study/userTestPage.php?contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&like=${type}&studySeq=${seq}&serviceType=${serviceType}`;
                }
            }
        })
}


function checkFounderEdu() {
    let lists = '';
    if (!isF) {
        lists += '<div id="modal">';
        lists += '<div style="width:60%; display:flex; flex-direction:column;">';
        lists += '<div style="font-size:24px; font-weight:1000; color:#f6b618; background:#4d4d4f;">교육수강 신청</div>';
        lists += '<div style="background:#dfd2c6; margin:0;">';
        lists += `<p style="font-size:22px; color:black; font-weight:bold;">세종특별자치시교육청에서 진행하는 온라인 교육과정입니다.</p>`;
        lists += '<div style="font-size:22px; line-height:170%;">';
        lists += `<div style="display:flex; align-items:center;"><i class="xi-check" style="color:#4d4d4f; font-weight:bold;"></i>&nbsp;
			<span style="font-size:20px;">본 교육은 <span style="color: red;"> 2024-10-11까지</span> 수료를 하셔야 합니다.</span></div>`;
        lists += `<div style="display:flex; align-items:center;"><i class="xi-check" style="color:#4d4d4f; font-weight:bold;"></i>&nbsp;
			<span style="font-size:20px;">수강 및 설문조사까지 완료하여야 최종 수료 처리가 됩니다.</span></div>`;
        lists += `<div style="display:flex; align-items:center;"><i class="xi-check" style="color:#4d4d4f; font-weight:bold;"></i>&nbsp;
			<span style="font-size:20px;">동의하기 버튼 클릭 시 교육수강이 가능하며, 동의하지 않으실 경우 교육수강 진행이 불가합니다.</span></div>`;
        lists += '</div>';
        lists += '<div style="display:flex; justify-content:center; padding:20px 0;">';
        lists += `<button style="background:#4d4d4f; border:none; border-radius:5px; color:#f6b618; font-size:22px; width:15%; padding:6px 0; margin-right:15px;" onClick="applyLecture()">동의</button>
			<button style="background:#4d4d4f; border:none; border-radius:5px; color:#f6b618; font-size:22px; width:15%; padding:6px 0;" onclick="modalClose();">비동의</button>`;
        lists += '</div>';

        lists += '</div>';
        lists += '</div>';
        lists += '</div>';
        $('#contents').after(lists);
        modalAlign();
    } else {
        applyLecture();
    }
}

function applyLecture() {
    var checkF = isF ? 'Y' : 'N';

    $.ajax({
        method: 'POST',
        url: '../api/apiAcademyFounderEdu.php',
        data: {apply: 'Y', isF: checkF},
        async: false,
        success: function (data) {
            if (data.result == 'success') {
                alert("수강 신청이 완료됐습니다. 수강페이지로 이동합니다.");
                window.location.replace("https://" + subDomain + ".modulearning.kr/studyCenterKaoh/founderStudy.php");
            } else if (data.result == 'logout') {
                alert("로그인 정보가 없습니다.");
                window.location.replace("https://" + subDomain + ".modulearning.kr/kaoh_main/founderEducation.php");
            } else if (data.result == 'exist') {
                alert("이미 수강 신청 되었습니다. 24년 9월 23일부터 수강 가능합니다.");
            } else if (data.result == 'permit') {
                alert("학원설립운영자만 수강신청 가능합니다.");
                window.location.replace("https://" + subDomain + ".modulearning.kr/kaoh_main/founderEducation.php");
            } else if (data.result == 'error') {
                alert("오류 발생");
            }
        }
    })
}

function printPop(seq) {
    $.get('../api/apiStudyHistory.php', {'progressChk': 'Y', 'seq': seq}, function (data) {
        var checkIsF = isF ? 'Y' : 'N'
        if (data.study[0].passOK != "Y") {
            alert('수료증은 수료 후 출력할수 있습니다.');
        } else {
            popupAddress = `finish.html?progressChk=Y&seq=${seq}&isF=${checkIsF}`;
            window.open(popupAddress, "결과보기", "width=600, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")

        }
    })
}

function openSurvey() { //학원 교습소장 설문용
    fetch('/api/apiSejongProgress.php?userID=' + loginUserID, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'less') {
                alert('모든 과정을 90% 이상 수강하고 설문조사에 응해주세요.');
            } else if (data.result == 'error') {
                alert('오류가 발생했습니다.');
            } else if (data.result == 'already') {
                alert('이미 설문조사를 진행했습니다.');
            } else {
                var studyModals = '';

                studyModals += '<div id="screenModal" style="display:none; z-index:999;">';
                //타이틀 노출
                studyModals += '<div class="titleArea">';
                studyModals += '<div>';
                studyModals += '<h1>2024 교육청 학원·교습소 연수 및 민원서비스 만족도 조사</h1>';
                studyModals += '<h2 class="contentsName">설문조사</h2>';
                studyModals += '<button type="button" onClick="closeSurvey();"><img src="../images/study/btn_modalclose.png" /></button>';
                studyModals += '</div>';
                studyModals += '</div>';

                $.get(offSurveyApi, {surveySetSeq: '26'}, function (data) {
                    //주의사항
                    studyModals += '<div>';
                    studyModals += '<div style="padding:10px 0; width:90%; margin:auto; font-size:18px; line-height:150%;">';
                    studyModals += `<p class="surveyText">
                        안녕하십니까?<br>
                        세종교육 발전을 위한 많은 관심과 격려에 학원(교습소) 설립·운영자님께 깊은 감사를 드립니다.<br>
                        우리 교육청에서는 학원·교습소 대상 온라인 연수 운영 및 각종 민원서비스 제공에 대한 만족도 조사를 실시하고 있습니다.
                        본 조사 결과를  연수 및 민원업무 개선에 반영하고자 하오니 설문조사에 적극 참여해 주시면 감사하겠습니다.
                        </p>`;
                    const today = new Date();
                    const year = today.getFullYear();
                    var month = today.getMonth() + 1;
                    var day = today.getDate();
                    if (String(month).length < 2) month = '0' + String(month);
                    if (String(day).length < 2) day = '0' + String(day);
                    studyModals += `<div style="text-align:center;">2024. 9<br>
			        <span style="font-size:18px; font-weight:bold;">세종특별자치시교육청 운영지원과 학원평생교육담당</span></div>`;
                    studyModals += '</div>';
                    studyModals += '</div>';
                    studyModals += '<div class="surveyArea">';
                    studyModals += '<form class="surveyForm">';
                    studyModals += '<input type="hidden" name="lectureOpenSeq" value="0">';
                    studyModals += '<input type="hidden" name="contentsCode" value="0">';
                    studyModals += '<input type="hidden" name="surveySetSeq" value="26">';
                    $.each(data.survey, function () {
                        studyModals += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                        studyModals += '<input type="hidden" name="surveyType[]" value="' + this.surveyType + '">';
                        studyModals += '<input type="hidden" name="companySeq[]" value="32">';
                        studyModals += '<h1 id="' + this.seq + '">설문 ' + this.orderBy + '</h1>';
                        studyModals += '<h2>' + this.exam + '</h2>';
                        if (this.surveyType == 'A') { // 객관식
                            studyModals += '<ol>';
                            for (i = 1; i < 6; i++) {
                                studyModals += '<li><input type="radio" name="userAnswer' + this.seq + '" id="example0' + i + this.seq + '"  value="' + i + '" />';
                                studyModals += '<label for="example0' + i + this.seq + '">' + i + '.&nbsp;' + eval('this.example0' + i) + '</label></li>';
                                if (eval('this.example0' + (i + 1)) == undefined) {
                                    break;
                                }
                            }
                            if (this.seq == '285') {
                                studyModals += '<li><input type="radio"' +
                                    ' name="userAnswer' + this.seq + '" id="example06' + this.seq + '"  value="6" />';
                                studyModals += '<label for="example06' + this.seq + '">6.&nbsp;자율점검활동을 받아본 적이 없음</label></li>';
                            }
                            studyModals += '</ol>';
                        } else if (this.surveyType == 'B') { // 단답형
                            studyModals += '<textarea id="userTextAnswer' + this.seq + '" name="userTextAnswer' + this.seq + '"></textarea>';
                        }
                    })
                    studyModals += '</form>';
                    studyModals += '</div>'; //문제종료
                    studyModals += '<div class="btnArea">';
                    studyModals += '<button type="button" onclick="submitSurveys(\'' + contentsCode + '\',\'' + lectureOpenSeq + '\')"><img src="../images/study/btn_lastsubmit_survey.png" alt="설문조사 제출" /></button>';
                    studyModals += '</div>';
                    studyModals += '</div>';
                    $('#footer').after(studyModals);
                    $('#screenModal').css('display', 'block');
                })
            }
        })
}

function closeSurvey() { //학원 교습소장 설문용
    window.location.reload();
}

function submitSurveys(contentsCode, lectureOpenSeq) {  //학원 교습소장 설문용
    // 객관식: 1, 2, 3, 6, 7, 8, 9, 10, 13
    // 작성형: 4, 5, 11, 12, 14, 15
    // 커스텀: 4, 5, 10, 11, 12, 14
    if (!document.getElementById('example01276').checked && !document.getElementById('example02276').checked) {
        alert('설문 1을 선택해주세요.');
        return false;
    }

    if (!document.getElementById('example01277').checked && !document.getElementById('example02277').checked
        && !document.getElementById('example03277').checked && !document.getElementById('example04277').checked
        && !document.getElementById('example05277').checked) {
        alert('설문 2를 선택해주세요.');
        return false;
    }
    if (!document.getElementById('example01278').checked && !document.getElementById('example02278').checked
        && !document.getElementById('example03278').checked && !document.getElementById('example04278').checked
        && !document.getElementById('example05278').checked) {
        alert('설문 3를 선택해주세요.');
        return false;
    }

    if (!document.getElementById('example01281').checked && !document.getElementById('example02281').checked
        && !document.getElementById('example03281').checked && !document.getElementById('example04281').checked
        && !document.getElementById('example05281').checked) {
        alert('설문 6을 선택해주세요.');
        return false;
    }
    if (!document.getElementById('example01282').checked && !document.getElementById('example02282').checked
        && !document.getElementById('example03282').checked && !document.getElementById('example04282').checked
        && !document.getElementById('example05282').checked) {
        alert('설문 7를 선택해주세요.');
        return false;
    }
    if (!document.getElementById('example01283').checked && !document.getElementById('example02283').checked
        && !document.getElementById('example03283').checked && !document.getElementById('example04283').checked
        && !document.getElementById('example05283').checked) {
        alert('설문 8을 선택해주세요.');
        return false;
    }
    if (!document.getElementById('example01284').checked && !document.getElementById('example02284').checked
        && !document.getElementById('example03284').checked) {
        alert('설문 9를 선택해주세요.');
        return false;
    }
    if (!document.getElementById('example01285').checked && !document.getElementById('example02285').checked
        && !document.getElementById('example03285').checked && !document.getElementById('example04285').checked
        && !document.getElementById('example05285').checked && !document.getElementById('example06285').checked) {
        alert('설문 10을 선택해주세요.');
        return false;
    }

    if (!document.getElementById('example01298').checked && !document.getElementById('example02298').checked
        && !document.getElementById('example03298').checked && !document.getElementById('example04298').checked
        && !document.getElementById('example05298').checked) {
        alert('설문 13을 선택해주세요.');
        return false;
    }

    const data = $('.surveyForm').serialize();
    $.ajax({
        method: "POST",
        url: offSurveyAnswerApi,
        data: data,
        success: function (data) {
            if (data.result == 'success') {
                alert("연수가 완료되었습니다.");
                window.location.reload();
            } else {
                alert("오류 발생.");
            }
        }
    });
}







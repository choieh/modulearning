var useApi = './api/apiStudyRoomV2.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var progressApi = '../api/apiProgressCheckNew.php';
var checkTestApi = './api/apiCheckTest.php';

var studySeq = '';
// var progressTime = null; //

var cc = '';
var los = '';
var userID = '';
var serviceType = '';

// let timeCheck = null;
// const interval = 1000; //ms
// let hour = 0;
// let minute = 0;
// let sec = 0;
// let stopTime = 0;
// let totalTime = 0;
// let currentVisibility = true;
// let contentsInfo = '';
// let scrollPosition = 0;
// let lastPageUrl = '';
let sourceType = 'mp4';

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
        // console.log(data);
        var totalCount = data.totalCount;

        //var lectureEndDate = data.study.lectureEnd.split('-');
        var lists = '';
        if (totalCount != 0) {
            $.each(data.study, function () {
                var endDate = this.lectureEnd.split('-');
                //console.log(endDate);
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

                lists += '<li class="list' + this.seq + '">';
                if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
                    lists += '<div class="summuryArea" onclick="alert(\'환급 과정 완료 후 다음과정 수강 할 수 있습니다.\');">';
                } else {

                    if (this.serviceType != 8 && this.serviceType != 7) {
                        lists += `<div class="summuryArea" onclick="viewStudyDetail('${this.seq}', '${this.contentsCode}', '${this.lectureOpenSeq}', '${this.serviceType}')">`;
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

                if ((this.serviceType == '3' || this.serviceType == '5') && this.passOK == 'Y') {   //수료시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                } else if (this.contentsCode == 'HFUXWM' && this.progress == '100') {   //에듀미 성희롱 과정 진도 100%시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                } else if (this.serviceType != '8' && this.serviceType != '7') {
                    lists += '<li><h1>차시 진도</h1><strong id="currentChapter' + this.seq + '">' + this.nowChapter + '</strong>/' + this.chapter + '</li>';
                }
                if (this.contentsCode == 'HFUXWM' && this.progress == '100') {  //에듀미 성희롱 과정 진도 100%시 수강후기 작성
                    lists += '<li><h1>수강후기</h1><button type="button" class="epilogue" onClick="reviewPop(\'' + this.contentsCode + '\')">작성하기</button></li>';
                } else {
                    if (this.serviceType == '5' && this.testStatus == 'C' && this.companyCode != '5088213174') {
                        lists += '<li><h1>평가점수</h1><strong>' + this.totalScore + '</strong>점</li>';
                    } else {
                        lists += '<li><h1>진도율</h1><strong class="totlaProgress01">' + this.progress + '</strong>%</li>';
                    }
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
                lists += '</div>';

                if ((this.midStatus != null || this.testStatus != null || this.reportStatus != null) && [1, 2, 5].includes(this.serviceType)) {
                    lists += '<ul style="background-color:white; text-align:center; padding-top:10px">';
                    lists += setMidExam(this);
                    lists += setFinalExam(this);
                    lists += setReportExam(this);
                    lists += '</ul>';
                }

                lists += '</li>';


            })
        } else {
            lists += '<li class="noList">진행 중인 과정이 없습니다.</li>';
        }
        $('#contentsArea > ul').html(lists);
        //$('#titleArea h3 strong.blue').html(totalCount);
        if (totalCount > 0) {
            $('#titleArea h3 span').html('총 <strong class="blue">' + totalCount + '</strong>개 과정의 학습이 진행 중입니다.');
        } else {
            $('#titleArea h3 span').html('진행 중인 과정이 없습니다.');
        }

    })
        .done(function () {
            if (lectureOpenSeq != '') {
                // viewStudyDetail(seq, contentsCode, lectureOpenSeq)
            }
        })
}

// 수강창 열기
function openStudyTab(studySeq, contentsCode, lectureOpenSeq, serviceType) {
    window.location.href = `./studyView.php?studySeq=${studySeq}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&userID=${loginUserID}&serviceType=${serviceType}`;
}

function viewStudyDetail(studySeq, contentsCode, lectureOpenSeq, serviceType) {
    var $studyBlock = $('.list' + studySeq);//변동될 스터디블록
    var studyDetails = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
        var today = data.nowTime.substring(0, 10);
        serviceType = data.serviceType;
        sourceType = data.sourceType;

        if ((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N') {
            certPassModal(data.lectureStart, studySeq, contentsCode, lectureOpenSeq);
        } else if (data.certPass == 'N' && data.serviceType == 5) { // 산업안전 본인인증용
            certPassModal2(data.lectureStart, studySeq, contentsCode, lectureOpenSeq, data.userAuth);
        } else {
            openStudyTab(studySeq, contentsCode, lectureOpenSeq, serviceType)
        }
    })

}

function setExamStatus(status) {
    switch(status) {
        case 'N':
            return '<span style="color:red">미응시</span>';
            break;

        case 'Y':
            return '<span style="color:blue">채점 대기중</span>';
            break;

        case 'C':
            return '<span style="color:green">채점완료</span>';
            break;

        case 'V':
            return '<span style="color:green">응시중</span>';
            break;
    }
}

function setMidExam(data) {
    let list = '';
    if ([1, 2].includes(data.serviceType) && data.midStatus != null) {
        list += `<li class="middleTest" onclick="openTest('mid', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}')">`;
        list += '중간평가<br>';
        list += setExamStatus(data.midStatus);
        list += `</li>`;
    }
    return list;
}

function setFinalExam(data) {
    let list = '';
    if ([1, 2].includes(data.serviceType) && data.testStatus != null) {
        list += `<li class="lastTest" onclick="openTest('final', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}')">최종평가<br>`;
        list += setExamStatus(data.testStatus);
        list += `</li>`;
    }

    if (data.serviceType == '5' && data.testStatus != null) {
        list += `<li class="lastTest" onclick="openStudyModal('final', '${contentsCode}', '${lectureOpenSeq}')">최종평가<br>`;
        list += setExamStatus(data.testStatus);
        list += `</li>`;
    }
    return list;
}

function setReportExam(data) {
    let list = '';
    if ([1, 2].includes(data.serviceType) && data.reportStatus != null) {
        list += `<li class="lastTest" onclick="openTest('report', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}')">과제평가<br>`;
        list += setExamStatus(data.reportStatus);
        list += `</li>`;
    }
    return list;
}

function openTest(type, seq, contentsCode, lectureOpenSeq) {
    fetch(checkTestApi + `?type=${type}&seq=${seq}&userID=${loginUserID}`)
        .then (res => res.json())
        .then (data => {
            if (data.result == 'progress') {
                alert(`${data.message}% 이상 수강 후 응시 가능합니다.`)
            }

            if (data.result == 'survey') {
                alert('설문조사 후 응시가능합니다.')
            }

            if (data.result == 'cert') {
                window.location.href = `/auth/userCert.php?type=${type}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}`;
                // let certLink = `hrdMOTP.php?type=${type}&contentsCode=` + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq;
                // openPopup(`${certLink}`); // 인증창
            }

            if (data.result == 'success') {
                openStudyModal(`${type}`, `${contentsCode}`, `${lectureOpenSeq}`); // 평가창
            }
        })
}

//서비스타입 5 자동마감 후 평가 결과창
function resultAct5(types, contentsCode, lectureOpenSeq, testType) {
    popupAddress = 'popupResult.php?types=' + types + '&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq + '&testType=' + testType;
    window.open(popupAddress, "결과보기", "menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "previewContents")
}

//평가완료 후 결과창
function resultAct(types, contentsCode, lectureOpenSeq, testType) {
    if (testType == '') {
        testType = 'report';
    }
    if (typeof (contentsCode) == 'object') {
        contentsCode = $(contentsCode).parents('form').children('input[name="contentsCode"]').val();
    }
    if (typeof (lectureOpenSeq) == 'object') {
        lectureOpenSeq = $(lectureOpenSeq).parents('form').children('input[name="lectureOpenSeq"]').val();
    }
    var lectureEndDate = $('#lectureEndDate').val();
    var lectureEnd = lectureEndDate.split('-');
    $.get(resultApi, 'lectureOpenSeq=' + lectureOpenSeq + '&testType=' + testType, function (data) {
        var lectureEnd = data.lectureEnd.split('-');
        if (testType == 'mid') {
            alert('출제된 ' + data.totalCount + '문항 모두 응시 완료하였습니다. 결과보기는 학습종료일(' + lectureEnd[1] + '월 ' + lectureEnd[2] + '일) 이후 1주일 이내에 가능합니다.');
        } else if (testType == 'final') {
            if (data.totalCount == data.userCount) {
                alert('출제된 ' + data.totalCount + '문항 모두 응시 완료하였습니다. 결과보기는 학습종료일(' + lectureEnd[1] + '월 ' + lectureEnd[2] + '일) 이후 1주일 이내에 가능합니다.');
            } else {
                alert('출제된 ' + data.totalCount + '문항 중 ' + data.userCount + '문항 응시 완료하였습니다. 결과보기는 학습종료일(' + lectureEnd[1] + '월 ' + lectureEnd[2] + '일) 이후 1주일 이내에 가능합니다.');
            }
        } else {
            alert('과제 제출을 완료하였습니다. 결과보기는 학습종료일(' + lectureEnd[1] + '월 ' + lectureEnd[2] + '일) 이후 1주일 이내에 가능합니다.');
        }
    })
}

function openDetail(viewCode) {
    popOpen = window.open("/study/lecturepop.php?contentsCode=" + viewCode, "captcha", "top=0,left=0,width=680,height=620,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "study");
    popOpen.focus();
}

function openPopup(linkAddress) {
    popOpen = window.open(linkAddress, "captcha", "top=0,left=0,width=380,height=460,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "study");
    popOpen.focus();
}

//실제 구동 화면
function reviewPop(contentsCode) {
    popupAddress = '../study/review.html?contentsCode=' + contentsCode;
    window.open(popupAddress, "결과보기", "top=0, left=0, width=480, height=500, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "reviewPop")
}

function printPop(popseq) {
    $.get('../api/apiStudyHistory.php', {
        'seq': popseq,
        'print': 'Y',
        'progressChk': 'Y'
    }, function (data) {
        popupAddress = '../study/print.html?seq=' + popseq + '&progressChk=Y';
        window.open(popupAddress, "결과보기", "width=600, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")
    })
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
    window.open(`../study/print.php?${param}`, '_blank');
}

function openMotp(type, className) {
    if (type === 'study') {
        window.location.href = `/auth/userCert.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&chapter=${contentsInfo.chapter}&className=${className}`;
        // otpUrl = `hrdMOTP.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&chapter=${contentsInfo.chapter}&className=${className}`;
    } else {
        window.location.href = `/auth/userCert.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}`;
        // otpUrl = `hrdMOTP.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}`;
    }
    // window.open(otpUrl, '', popup = 1);
}
function hrdCheckScore(types, contentsCode, lectureOpenSeq, chapter = 0, flag) {
    let eval_cd = '';
    if (serviceType == '1' || serviceType == '2') {
        if (types == 'mid') {
            eval_cd = '04';
        } else if (types == 'final') {
            eval_cd = '02';
        } else if (types == 'report') {
            eval_cd = '03';
        } else if (types == 'study') {
            eval_cd = '01';
        }

        fetch('../api/apiHrdScoreCheck.php' + `?userID=${loginUserID}&contentsCode=${contentsInfo.contentsCode}&chapter=${contentsInfo.chapter}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `startEnd=${flag}&contentsCode=${contentsCode}&lectureOpenSeq=${lectureOpenSeq}&chapter=${chapter}&eval_cd=${eval_cd}`,
            keepalive: true
        })

    }
}

function captchaRun(chkSeq, types, links) {
    chkform = $('form.lectureForm' + chkSeq);
    if (types == 'start') {
        links = links
    } else if (types == 'study') {
        links += '&type=study';
    } else {
        links += '?type=' + types + '&chapter=n';
    }

    if (types != 'start') {
        links += '&chkSeq=' + chkSeq;
        links += '&contentsCode=' + chkform.children('input[name="contentsCode"]').val();
        links += '&lectureOpenSeq=' + chkform.children('input[name="lectureOpenSeq"]').val();
        links += '&studySeq=' + chkform.children('input[name="seq"]').val();
    }
    popOpen = window.open(links, "captcha", "top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "esangStudy");
    popOpen.focus();
}

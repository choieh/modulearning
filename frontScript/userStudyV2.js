var useApi = '/api/v1/apiStudyRoom.php';
var chapterApi = '/api/apiStudyChapter.php';
var resultApi = '/api/apiResultMessage.php';
var checkTestApi = '/api/v1/apiCheckTest.php';

var studySeq = '';
// var progressTime = null; //

var cc = '';
var los = '';
// var userID = '';
var serviceType = '';
let sourceType = 'mp4';
let studyObj = {};

window.addEventListener('pageshow', () => {
    setTimeout(() => {
        ajaxAct();
    }, 100)
})

function listAct() {
    var contents = '';
    contents += '<ul>';
    contents += '</ul>';
    $('#contentsArea').html(contents);
    // ajaxAct();
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
                studyObj[this.contentsCode + ',' + this.lectureOpenSeq] = this;
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

                if ((this.serviceType == '1' || this.serviceType == '3' || this.serviceType == '5' || this.serviceType == '10' || this.serviceType == '11') && this.passOK == 'Y') {   //수료시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += `<li id="passOK"><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="certificateFilter(${this.seq});" style="width:71px; height:60px; margin:6px 15px;" /></li>`;
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
                lists += `<p style="float:right; font-weight:bold; margin-right:5px; font-size:18px;
                            padding: 3px 15px; background-color:#F6B618; border-radius:5px;">수강하기</p>`;
                lists += '</div>';
                lists += chkPassTable(this, this.seq)
                lists += '<ul style="background-color:white; text-align:center; padding-top:10px;padding-bottom:10px">';
                lists += setMidExam(this);
                lists += setFinalExam(this);
                lists += setReportExam(this);
                lists += '</ul>';

                lists += '</li>';


            })
        } else {
            lists += '<li class="noList">진행 중인 과정이 없습니다.</li>';
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

        makeEmonForm()
    })
    // .done(function () {
    //     if (lectureOpenSeq != '') {
    //         // viewStudyDetail(seq, contentsCode, lectureOpenSeq)
    //     }
    // })

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
            certPassModal4(data.lectureStart, data.seq, data.contentsCode, data.lectureOpenSeq, data.userAuth, data.serviceType);
        } else {
            if (data.companyCode == '0000000072' && !data.chapterMobilePath) {
                alert('등록된 영상이 없습니다.')
                return;
            }

            if (data.companyCode == '0000000072' && data.passOK == 'Y' && data.serviceType == '11') {
                alert('당일 교육 참석자는 수강할 수 없습니다.')
                return;
            }

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

function setExamStatus(status, rate = '') {
    if (status == 'N' && rate > 0) {
        return '<span style="color:red">미응시</span>';
    }

    if (status == 'Y') {
        return '<span style="color:blue">채점 대기중</span>';
    }

    if (status == 'C') {
        return `<span style="color:green">채점완료</span>`;
    }

    if (status == 'V') {
        return '<span style="color:green">응시중</span>';
    }

    if (status == 'E') {
        return '<span style="color:red">시간 만료</span>';
    }

    if (status == null || rate == 0) {
        return '<span style="color:black">없음</span>';
    }

    // switch (status) {
    //     case 'N':
    //         return '<span style="color:red">미응시</span>';
    //         break;
    //
    //     case 'Y':
    //         return '<span style="color:blue">채점 대기중</span>';
    //         break;
    //
    //     case 'C':
    //         return `<span style="color:green">채점완료</span>`;
    //         break;
    //
    //     case 'V':
    //         return '<span style="color:green">응시중</span>';
    //         break;
    //
    //     case 'E':
    //         return '<span style="color:red">시간 만료</span>';
    //         break;
    //
    //     case null:
    //         return '<span style="color:black">없음</span>';
    //         break;
    // }
}

function setMidExam(data) {
    let list = '';
    if (data.midStatus == 'C') {
        list += `<li class="middleTest" onclick="resultAct('test', '${data.contentsCode}', '${data.lectureOpenSeq}', 'mid', '${data.serviceType}')">`;
    } else {
        list += `<li class="middleTest" onclick="openTest('mid', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}','${data.serviceType}')">`;
    }
    list += '중간평가<br>';
    list += setExamStatus(data.midStatus, data.midRate);
    list += `</li>`;
    return list;
}

function setFinalExam(data) {
    let list = '';
    if (data.testStatus == 'C') {
        list += `<li class="lastTest" onclick="resultAct('test', '${data.contentsCode}', '${data.lectureOpenSeq}', 'final', '${data.serviceType}')">최종평가<br>`;
    } else {
        list += `<li class="lastTest" onclick="openTest('final', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}', ${data.serviceType} )">최종평가<br>`;
    }

    if (data.testStatus == 'V' && data.testOverTime == 'Y') {
        list += setExamStatus('E');
    } else {
        list += setExamStatus(data.testStatus, data.testRate);
    }

    if (data.serviceType == '5'
        && data.passScore > data.testScore
        && (data.testStatus == 'C' || (data.testStatus == 'V' && new Date(data.testEndTime) < new Date()) )) {
        list += setRetakenBtn('test', data.seq, data.retakenWay);
    }
    
    list += `</li>`;
    return list;
}

function setReportExam(data) {
    let list = '';
    if (data.reportStatus == 'C') {
        list += `<li class="report" onclick="resultAct('report', '${data.contentsCode}', '${data.lectureOpenSeq}', 'report', '${data.serviceType}')">과제평가<br>`;
    } else {
        list += `<li class="report" onclick="openTest('report', '${data.seq}', '${data.contentsCode}', '${data.lectureOpenSeq}', '${data.serviceType}')">과제평가<br>`;
    }

    list += setExamStatus(data.reportStatus, data.reportRate);
    list += `</li>`;
    return list;
}


// function openEmonSurvey() {

// }

function makeEmonForm() {
    document.body.insertAdjacentHTML('beforeend',
        `<form name="frmData" id="frmData" method="post" target="emon" action="https://emon.hrdkorea.or.kr/common/SurveyEpTraPop">
            <input type="hidden" name="agent_pk" value="kiraedu">
            <input type="hidden" name="course_agent_pk" value="">
            <input type="hidden" name="class_agent_pk" value="">
            <input type="hidden" name="user_agent_pk" value="">
            <input type="hidden" name="tracse_id" value="">
            <input type="hidden" name="tracse_tme" value="">
        </form>`)
}

function setEmonFormValue(data) {
    document.querySelector('input[name="course_agent_pk"]').value = data.contentsCode
    document.querySelector('input[name="class_agent_pk"]').value = data.contentsCode + ',' + data.lectureOpenSeq
    document.querySelector('input[name="user_agent_pk"]').value = loginUserID
    document.querySelector('input[name="tracse_id"]').value = data.hrdCode
    document.querySelector('input[name="tracse_tme"]').value = data.openChapter
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

//평가완료 후 결과창
function resultAct(types, contentsCode, lectureOpenSeq, testType, serviceType) {
    if (event.srcElement.id == 'retakenBtn') {
        return;
    }
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

    if (serviceType == '1') {
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
    } else {
        popupAddress = '/study/popupResult.php?types=' + types + '&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq + '&testType=' + testType;
        window.open(popupAddress, "결과보기", "menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "previewContents")
    }

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
    $.get('/api/apiStudyHistory.php', {
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
    window.open(`/study/print.php?${param}`, '_blank');
}

function openMotp(type, className) {
    var otpUrl = '';
    if (type === 'study') {
        window.location.href = `/auth/userCertSso.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&chapter=${contentsInfo.chapter}&userID=${loginUserID}`;
    } else {
        window.location.href = `/auth/userCertSso.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&userID=${loginUserID}`;
    }
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

        fetch('/api/apiHrdScoreCheck.php' + `?userID=${loginUserID}&contentsCode=${contentsInfo.contentsCode}&chapter=${contentsInfo.chapter}`, {
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

function retaken(userID, seq, testType, retakenWay) {
    let testTxt = testType == 'mid' ? '중간' : testType == 'test' ? '최종' : '과제'

    if (retakenWay == 0) {
        if (confirm(`${testTxt}평가를 재응시 하시겠습니까?`)) {
            $.ajax({
                url: '/api/apiStudyV1.php',
                type: 'POST',
                data: {
                    'userID': userID,
                    'seq': seq,
                    'retaken': 'Y',
                    'testType': testType
                },
                dataType: "text",
                success: function (response) {
                    if (response === "success") {
                        alert('재응시 요청처리 되었습니다.');
                        ajaxAct();
                    } else if (response === "error"){
                        alert('재응시 요청 도중 오류가 발생했습니다. 관리자에게 문의하세요');
                    } else {
                        var msg = response.replace('success','');
                        if(msg.includes('error')) {
                            alert('재응시 요청 도중 오류가 발생했습니다. 관리자에게 문의하세요');
                        } else {
                            alert(msg);
                            ajaxAct();
                        }    
                    }
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

function setRetakenBtn(type, seq, retakenWay) {
    if (retakenWay == 0) {
        return `<br><button id="retakenBtn" type="button" onclick="retaken('${loginUserID}','${seq}','${type}',${retakenWay})" 
                style="font-size:14px; margin-right:0px; box-shadow: 1px 1px 1px 1px gray; background-color:#F6B618; padding:2px;">재응시</button>`;
    }

    if (retakenWay == 1) {
        return `<br><button id="retakenBtn" type="button" onclick="retaken('${loginUserID}','${seq}','${type}',${retakenWay})" 
                style="font-size:14px; margin-right:0px; box-shadow: 1px 1px 1px 1px gray; background-color:#F6B618; padding:2px;">재응시 요청</button></td>`;
    }
}


function chkPassTable(data, writeTarget) {//수강기준 테이블
    var chkTable = '';

    chkTable += '<table class="passCheck"><tr>';
    chkTable += '<td colspan="6" class="title">수료기준</td>'
    chkTable += '<td rowspan="4" class="detailView">';
    chkTable += '<a href="javascript:openDetail(\'' + data.contentsCode + '\')"><h1>교육과정</h1>상세보기</a>';

    chkTable += '</td>';
    if (data.attachFile != null && data.attachFile != '') {
        chkTable += '<td rowspan="4" class="downFile">';
        chkTable += '<a href="../lib/fileDownLoad.php?fileName=' + encodeURI(data.attachFile) + '&link=' + encodeURIComponent(data.previewImageURL + data.attachFile) + '" target="_blank"><h1>학습자료</h1>다운로드</a>';
        chkTable += '</td>';
    }
    chkTable += '</tr>';
    chkTable += '<th>수강정원</th>';
    chkTable += '<th>총 진도율</th>';
    chkTable += '<th>중간평가</th>';
    chkTable += '<th>최종평가</th>';
    chkTable += '<th>과제</th>';
    //新 유비무환 과정 강의노트 추가건
    if (data.contentsName.includes('新 유비무환')) {
        chkTable += '<th rowspan="3" style="background-color: white;">';
        chkTable += `<a href="/attach/ubi/${data.contentsName}.zip" target="_blank">강의노트</a></th>`;
    }
    chkTable += '</tr><tr>';
    chkTable += '<td rowspan="2"><strong>' + data.limited + '</strong>명</td>';
    chkTable += '<td rowspan="2"><strong>' + data.passProgress + '</strong>% 이상</td>';
    if (data.midTestChapter == '0' || data.serviceType == 3) {
        chkTable += '<td>평가없음&nbsp;<strong>';
    } else {
        chkTable += '<td>총&nbsp;<strong>';
    }
    if (data.totalPassMid != 0) {
        chkTable += data.totalPassMid + '</strong>점 / <strong>' + data.midRate + '</strong>% 반영';
    }
    chkTable += '</td>';
    chkTable += '<td>총&nbsp;<strong>';
    if (data.totalPassTest != 0) {
        chkTable += data.totalPassTest + '</strong>점 / <strong>' + data.testRate + '</strong>% 반영';
    }
    chkTable += '</td><td>';
    if (data.totalPassReport != 0) {
        chkTable += '총&nbsp;<strong>' + data.totalPassReport + '</strong>점 / <strong>' + data.reportRate + '</strong>% 반영';
    } else {
        chkTable += '과제 없음';
    }
    chkTable += '</td>';
    chkTable += '</tr><tr>';
    if (data.totalPassReport != 0) {
        //2018-03-14 강혜림 수정
        //chkTable += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 (평가와 과제는 40점 미만 시 과락 적용)</td>';
        //chkTable += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 </td>';
        chkTable += '<td colspan="3" style="padding:5px 0 ">반영된 평가, 과제 점수 합산 <strong>' + data.passScore + '</strong>점 이상 </td>';
    } else {
        //chkTable += '<td colspan="3">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 (평가 40점 미만 시 과락 적용)</td>';
        //chkTable += '<td colspan="3">반영된 평가 합산 <strong>'+data.passScore+'</strong>점 이상 </td>';
        //chkTable += '<td colspan="3" style="padding:5px 0 ">반영된 평가 합산  <strong>'+data.passScore+'</strong>점 이상 (단, 최종평가 '+data.passTest+'점 미만 시 과락 적용)<br>반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 (단, 최종평가 '+data.passTest+'점, 과제 '+data.passReport+'점 미만 시 과락 적용)</td>';
        chkTable += '<td colspan="3" style="padding:5px 0 ">반영된 평가 점수 합산  <strong>' + data.passScore + '</strong>점 이상 </td>';
    }
    chkTable += '</tr>';

    if (data.sort01 == 'lecture09') {
        chkTable += '<tr>';
        chkTable += '   <td colspan="10" style="background-color: red">';
        chkTable += '       <strong>총 학습진도율 100%가 되어야 이수증이 발급됩니다.</strong>';
        chkTable += '   </td>';
        chkTable += '</tr>';
    } else if (data.contentsCode == 'XKK8W0' || data.contentsCode == '9W7KKZ') {
        chkTable += '<tr>';
        chkTable += '   <td colspan="10" style="background-color: red">';
        chkTable += '       <strong>근로자 산업안전 수료증은 총 학습진도율 100%가 되어야 발급됩니다.</strong>';
        chkTable += '   </td>';
        chkTable += '</tr>';
    }

    chkTable += '</table>';

    // $('.list' + writeTarget + ' .summuryArea').after(chkTable)
    return chkTable;

}

function getSurveyChk(data, redirectLink) {
    $.ajax({
        url: "https://emon.hrdkorea.or.kr/common/SurveyReponseChk", type: "post",
        data: $('#frmData').serialize(),
        dataType: "jsonp",
        jsonp: "reponseCallback",
        success: function (reponse) {
            var result = reponse.response_yn;
            if (result == "Y") {
                updateSurveyStatus(data, redirectLink)
            } else {
                alert("산업인력공단 규정으로 만족도 조사를 실시합니다.");
                openEmonSurvey();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("오류 발생");
        }
    });
}

function openEmonSurvey() {
    window.open("", "emon", "width=960px,height=1000px,top=100,left=100, scrollbars=yes");
    var frmData = document.frmData;
    frmData.target = "emon";
    frmData.action = "https://emon.hrdkorea.or.kr/common/SurveyEpTraPop";
    frmData.submit();
}

function updateSurveyStatus(data, redirectLink) {
    const formData = new FormData();
    formData.append('userID', data.userID)
    formData.append('lectureOpenSeq', data.lectureOpenSeq)
    formData.append('survey', 'Y');


    fetch('/api/v1/apiSurveyStatus.php', {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                window.location.href = redirectLink;
            } else {
                alert('오류가 발생했습니다.')
            }

        })

}
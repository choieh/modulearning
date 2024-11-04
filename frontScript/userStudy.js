var useApi = '../api/apiStudyRoom.php';
var chapterApi = '../api/apiStudyChapter.php';
var resultApi = '../api/apiResultMessage.php';
var progressApi = '../api/apiProgressCheckNew.php';

var studySeq = '';
var progressTime = null; //

var cc = '';
var los = '';
var userID = '';
var serviceType = '';

let timeCheck = null;
const interval = 1000; //ms
let hour = 0;
let minute = 0;
let sec = 0;
let stopTime = 0;
let totalTime = 0;
let currentVisibility = true;
let contentsInfo = '';
let scrollPosition = 0;
let lastPageUrl = '';
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
                        lists += '<div class="summuryArea" onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')">';
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

                if ((this.serviceType == '3' || this.serviceType == '5') && this.passOK == 'Y' && this.companyCode != '5988200110') {   //수료시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                } else if (this.contentsCode == 'HFUXWM' && this.progress == '100') {   //에듀미 성희롱 과정 진도 100%시 수료증 출력
                    // lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                    lists += '<li><h1>수료여부</h1><img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" /></li>';
                } else if (this.serviceType != '8' && this.serviceType != '7') {
                    lists += '<li><h1>차시 진도</h1><strong id="currentChapter' + this.seq + '">' + this.nowChapter + '</strong>/' + this.allChapter + '</li>';
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
                lists += '<div></div>';
                lists += '<img src="' + this.previewImageURL + this.previewImage + '" alt="강의 이미지" />';
                if (this.contentsName.length > 25) {
                    lists += '<h1 style="font-size:14px;">' + this.contentsName + '</h1><br />';
                } else {
                    lists += '<h1>' + this.contentsName + '</h1><br />';
                }
                lists += '<h2>수강기간 : ' + this.lectureStart + ' ~ ' + this.lectureEnd + '</h2><br />';
                lists += '<input id="lectureEndDate" type="hidden" value="' + this.lectureEnd + '">';
                if (this.serviceType != 8 || this.serviceType != 7) {
                    lists += '<h3>첨삭강사 : ' + this.tutorName
                    if (this.mobile == 'Y') {
                        lists += '<strong>모바일 학습 가능</strong>';
                    }
                    lists += '<strong class="score" onClick="alert(\'점수 확인은 학습종료일(' + endDate[1] + '월 ' + endDate[2] + '일) 이후 1주일 이내에 가능합니다\')">점수확인안내</strong>';
                }
                lists += '</h3>';
                lists += '</div>';
                if (totalCount > 1 && data.studyLimit == 'Y' && (this.serviceType == '3' || this.serviceType == '5')) {
                    lists += '<button type="button" onclick="alert(\'환급 과정 완료 후 다음과정 수강 할 수 있습니다.\');"></button>';
                } else {
                    if (this.serviceType != 8 && this.serviceType != 7) {
                        lists += '<button type="button" onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')"></button>';
                    } else {

                        if (this.serviceType == '7') {//이상에듀 수강연동일경우
                            lists += '<button type="button" onclick="nynJoinLMS(\'' + this.seq + '\',\'study\')"></button>';
                        } else {//안기원 수강연동일 경우
                            lists += '<button type="button" onclick="joinLMS(\'' + this.seq + '\',\'study\')"></button>';
                        }
                    }
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
                viewStudyDetail(seq, contentsCode, lectureOpenSeq)
            }
        })
}

function viewStudyDetail(studySeq, contentsCode, lectureOpenSeq) {
    var $studyBlock = $('.list' + studySeq);//변동될 스터디블록
    if ($studyBlock.find('form').length != 0) { //스터디블록 닫기
        $studyBlock.children('ul,table,form, div:not(".summuryArea")').remove(); //18-03-15 한상민
        $studyBlock.removeClass('openClass');
    } else { //스터디블록열기
        $studyBlock.addClass('openClass');
        var studyDetails = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
            // 2018-04-18 본인인증 1일 1회 (강혜림 추가)
            /*if(loginUserID != 'leehr0523' && loginUserID != 'dnthdgml' && loginUserID != 'cds334'){
                if(data.certDate){
                    certDate = data.certDate.substr(0,10);
                }
            }*/
            /*
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd
            }
            if(mm<10) {
                mm='0'+mm
            }
            today = yyyy+'-'+mm+'-'+dd;
            */
            var today = data.nowTime.substring(0, 10);
            serviceType = data.serviceType;
            sourceType = data.sourceType;
            /*if(loginUserID == 'testsms'){
                var qery = (data.serviceType == '1' && data.certPass == 'N') || (data.serviceType == '1' && today != certDate && data.contentsAccredit >= '2018-04-30');
            }else{
                var qery = data.certPass != 'Y' && data.serviceType == '1';
            }*/
            //if((data.serviceType == '1' && data.certPass == 'N') || ((data.serviceType == '1') && today != certDate)){
            if ((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'N') {
                certPassModal(data.lectureStart, studySeq, contentsCode, lectureOpenSeq);
            } else if (data.userAuth == 'Y' && data.certPass == 'N' && data.serviceType == 5 && new Date(data.lectureStart) > new Date('2023-05-01') && loginCompanyCode != '3018211347' ) { // 산업안전 본인인증용
                certPassModal2(data.lectureStart, studySeq, contentsCode, lectureOpenSeq, data.userAuth);
            } else {
                if (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 3 || data.serviceType == 9 || data.serviceType == 5 || data.serviceType == 10) { //2017.07.19 강혜림 서비스타입 5 추가
                    chkPassTable(data, studySeq)//최초 진도 테이블
                    chkTestArea(data, studySeq)//평가진행 관련 버튼ul
                }
                runStudyList(data, studySeq)
            }
        })
    }
}

//버튼 변환스크립트
function writeBtn(btnType, chapter) {

    chapter = chapter ? chapter : '';
    var writes = '';

    if (btnType == 'study') { //학습하기 관련
        if (typeof (chapter) == 'number') {
            writes += '<button type="button" title="학습하기" onclick="studyModal(this,' + chapter + ',\'new\')">';
        } else {
            writes += '<button type="button" title="학습하기" onclick="alert(\'' + chapter + '\')">';
        }
        writes += '<img src="../images/study/btn_study.png" alt="학습하기" /></button>';

    } else if (btnType == 'continue') {//이어보기 관련
        writes += '<button type="button" title="이어보기" onclick="studyModal(this,' + chapter + ')">';
        writes += '<img src="../images/study/btn_continuestudy.png" alt="이어보기" /></button>';

    } else if (btnType == 'midTest' || btnType == 'finTest') {//중간,최종평가관련
        if (btnType == 'midTest') {
            writes += '<button type="button" title="평가응시" onclick="chkTest(\'mid\',this);">';
        } else {
            writes += '<button type="button" title="평가응시" onclick="chkTest(\'final\',this);">';
        }
        writes += '<img src="../images/study/btn_dotest.png" alt="평가응시" /></button>';

    } else if (btnType == 'reportWrite') {//과제응시관련
        writes += '<button type="button" title="과제 제출" onclick="chkTest(\'report\',this);">';
        writes += '<img src="../images/study/btn_doreport.png" alt="과제제출" /></button>';

    } else if (btnType == 'midTestComplete' || btnType == 'finTestComplete') {//평가응시완료관련
        if (btnType == 'midTestComplete') {
            writes += '<button type="button" title="응시완료" onclick="resultAct(\'test\',this,this,\'mid\')">';
        } else {
            writes += '<button type="button" title="응시완료" onclick="resultAct(\'test\',this,this,\'final\')">';
        }
        writes += '<img src="../images/study/btn_resuttest.png" alt="응시완료" /></button>';

    } else if (btnType == 'reportComplete') {//과제제출완료관련
        writes += '<button type="button" title="응시완료" onclick="resultAct(\'report\',this,this,\'\')">';
        writes += '<img src="../images/study/btn_resutreport.png" alt="제출완료" /></button>';

    }
    return writes;
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

//수강하기
function studyPop(obj, chapter, types, captchChk) {

    types = types ? types : '';
    captchChk = captchChk ? captchChk : '';
    var captchaPage = 'hrdMOTP.php';
//  var captchaPage = 'captcha.php';

    var $changeTarget = $(obj).closest('tr').children('td:eq(2)');
    var runningForm = ''
    if (typeof (obj) == 'object') {
        runningForm = $(obj).parents('form');
    } else {
        runningForm = $('form.lectureForm' + obj);
    }
    var checkSeq = runningForm.children('input[name="seq"]').val()//seq
    var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
    var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq

    $.get(chapterApi, {
        'contentsCode': checkCode,
        'lectureOpenSeq': checkOpenSeq
    }, function (data) {
        var today = data.nowTime
        var midTerm = data.midTestChapter;

        if (eval(midTerm) > 0 && (eval(chapter) > eval(midTerm)) && (data.midStatus != 'Y' && data.midStatus != 'C') && (eval(data.serviceType) == 1 || eval(data.serviceType) == 2)) {
            //if (eval(midTerm) != 0 && (eval(chapter) > eval(midTerm)) && (data.midStatus != 'Y' && data.midStatus != 'C') && eval(data.serviceType) == 1) {
            alert('중간평가 응시 완료 후에 학습할 수 있습니다.');
        } else if (chapter != 1 && eval(data.progress[(chapter - 2)].progress) != 100 && data.midStatus == 'N' && eval(data.serviceType) != 3) {
            alert('중간평가는 총 진도율 50% 이상 응시 가능하므로, 이전 차시 진도율이 100%가 되도록 학습을 해주세요.');
        } else if (chapter != 1 && eval(data.progress[(chapter - 2)].progress) != 100 && data.midStatus == 'N' && eval(data.serviceType) == 3) {
            alert('비환급 과정은 진도율 100%가 되어야 수료입니다. 이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.');
        } else if (chapter != 1 && eval(data.progress[(chapter - 2)].progress) != 100) {
            alert('이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.');
        } else if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && (chapter - 1) % 8 == 0 && captchChk == '' && !(today >= captchaBanStart && today <= captchaBanEnd)) {//캡챠 실행
            if (types == 'new') {
                captchaRun(checkSeq, 'study', captchaPage + '?chapter=' + chapter + '&viewNew=new');
            } else {
                captchaRun(checkSeq, 'study', captchaPage + '?chapter=' + chapter);
            }
            $changeTarget.html(writeBtn('continue', chapter));
        } else {
            runningForm.children('input[name="chapter"]').val(chapter);
            runningForm.children('input[name="types"]').val(types);
            var popupAddress = runningForm.attr('action');
            if (runningForm.children('input[name="sourceType"]').val() != 'book') {
                $('.lectureForm' + checkSeq).attr('action', data.progress[chapter - 1].player + '/player/popupStudy.php');

                //if (loginUserID == 'eungmin2') {

                //}

                var studyPopOpen = window.open(popupAddress, "studyWindow", "top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "kiraedu");


                runningForm.submit();
                $changeTarget.html(writeBtn('continue', chapter));
                //진도체크 스크립트
                progressCheck(checkSeq, checkCode, checkOpenSeq, chapter);
            } else {
                /*
                var popupAddress = '/viewer/index.html?Sid='+Sid+'&Code='+contentsCode+'&Chasi='+Chasi+'&Page='+Page+'&MovePage='+MovePage+'&LectureOpenSeq='+lectureOpenSeq+'&PreView=N';
                //popupAddress = '/viewer/index.html?Code=7BOWJ5&Sid=7BOWJ5000000999999guest&Chasi=01&Page=99';
                var studyPopOpen = window.open(popupAddress,"studyWindow","top=0,left=0,location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","kiraedu")
                */
                var Chasi = chapter < 10 ? '0' + chapter : chapter;
                runningForm.children('input[name="Chasi"]').val(Chasi);
                var ContentsCode = runningForm.children('input[name="Code"]').val();
                var lectureOpenSeq = runningForm.children('input[name="LectureOpenSeq"]').val();
                runningForm.attr('action', '/viewer/index.php')
                var checkData = $.get(chapterApi, {
                    'contentsCode': ContentsCode,
                    'lectureOpenSeq': lectureOpenSeq
                }, function (data) {
                    runningForm.children('input[name="Page"]').val(data.progress[chapter - 1].mobileLastPage);
                    if (types == 'new') {
                        runningForm.children('input[name="MovePage"]').val(1);
                    } else {
                        //runningForm.children('input[name="MovePage"]').val(data.progress[chapter-1].lastPage);
                        runningForm.children('input[name="MovePage"]').val(999);
                    }
                    var screenWidth = screen.width;
                    var screenHeight = screen.height;
                    var player = window.open("", "studyWindow", "top=0,left=0,height=" + screen.height + ",width=" + screen.width + ",location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizable=yes");
                    runningForm.submit();
                    $changeTarget.html(writeBtn('continue', chapter));
                    progressCheck(checkSeq, ContentsCode, lectureOpenSeq, Chasi);
                })
            }
            studyPopOpen.focus();
            //if(studyPopOpen == null || studyPopOpen.screenLeft == 0){
            //  alert('팝업이 차단되어 있습니다. 팝업을 허용해 주세요.');
            //}


        }

    })
}

function chkTest(types, obj) {
    if (typeof (obj) == 'object') {
        runningForm = $(obj).parents('form');
    } else {
        runningForm = $('form.lectureForm' + obj);
    }

//  var links = 'captcha.php'

    var links = 'hrdMOTP.php';


    var checkSeq = runningForm.children('input[name="seq"]').val()//seq
    var checkCode = runningForm.children('input[name="contentsCode"]').val()//contentsCode
    var checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()//lectureOpenSeq

    $.get(chapterApi, {
        'contentsCode': checkCode,
        'lectureOpenSeq': checkOpenSeq
    }, function (data) {
        var today = data.nowTime.substr(0, 10);
        var nowTime = data.nowTime;
        if (types == 'mid') {
            if (eval(data.totalProgress) < eval(data.midTestProgress)) {
                alert('진도율 ' + data.midTestProgress + '% 이상 응시 가능합니다.')
            } else if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && !(data.midCaptchaTime != null && data.midCaptchaTime.substr(0, 10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {
                captchaRun(checkSeq, types, links)
            } else {
                openStudyModal(types, obj, obj)
            }
        } else {

            if (data.serviceType == 5) {
                data.finalTestProgress = 100;
            }

            if (eval(data.totalProgress) < eval(data.finalTestProgress)) {
                if (types == 'final') {
                    alert('진도율 ' + data.finalTestProgress + '% 이상 응시 가능합니다.')
                } else {
                    alert('진도율 ' + data.finalTestProgress + '% 이상 제출 가능합니다.')
                }
            } else if (types == 'final') {
                if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && !(data.testCaptchaTime != null && data.testCaptchaTime.substr(0, 10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {
                    captchaRun(checkSeq, 'final', links)
                } else {
                    openStudyModal(types, obj, obj)
                }

            } else if (types == 'report') {
                if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && !(data.reportCaptchaTime != null && data.reportCaptchaTime.substr(0, 10) == today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {
                    captchaRun(checkSeq, 'report', links)
                } else {
                    openStudyModal(types, obj, obj)
                }
            }
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

//post관련 업데이트
//1-진도변경
function progressCheck(checkSeq, checkCode, checkOpenSeq, checkchapter) {
    clearInterval(progressTime);
    var progressCheckTime = 5000; //진도체크시간
    //진도보내기 시간별
    progressTime = setInterval(function () {
        progressChange(checkSeq, checkCode, checkOpenSeq, checkchapter)
    }, progressCheckTime)
    //alert(checkSeq+'/'+checkCode+'/'+checkOpenSeq+'/'+cehckchapter)
}

//진도체크에 따른 강의보기 기능
function progressChange(checkSeq, checkCode, checkOpenSeq, checkchapter) {
    var check = $.get(chapterApi, 'contentsCode=' + checkCode + '&lectureOpenSeq=' + checkOpenSeq, function (data) {
        var $beforeProgress = Number($('.list' + checkSeq + ' .totlaProgress01').html());

        var midCaptchaTime = data.midCaptchaTime;
        var testCaptchaTime = data.testCaptchaTime;
        var reportCaptchaTime = data.reportCaptchaTime;
        if (midCaptchaTime == null) {
            midCaptchaTime = '0000-00-00'
        }
        if (testCaptchaTime == null) {
            testCaptchaTime = '0000-00-00'
        }
        if (reportCaptchaTime == null) {
            reportCaptchaTime = '0000-00-00'
        }

        var today = data.nowTime.substr(0, 10);
        $('.list' + checkSeq + ' .totlaProgress01').html(data.totalProgress); //상단영역 진도율 갱신

        //진도율에 따른 평가상태 변경
        if (($beforeProgress <= eval(data.midTestProgress) && eval(data.totalProgress) >= eval(data.midTestProgress)) || ($beforeProgress <= eval(data.finalTestProgress) && data.totalProgress >= eval(data.finalTestProgress))) {
            chkTestArea(data, checkSeq)
        }
        var i = 1
        $.each(data.progress, function () {//전체 진도율갱신
            var changeTr = $('.lecture' + checkSeq + i);
            changeTr.children('td').eq(1).html(this.progress + '%');
            chapterHtml = '<strong>' + this.chapterName + '</strong><br />';
            if (data.progress[(i - 1)].endTime != null) {
                chapterHtml += '교육이수 시간 : ' + this.endTime + '<br />';
                // chapterHtml += '접속아이피 : ' + this.studyIP;
            }
            changeTr.children('th').html(chapterHtml);
            i++;
        })
        if ($beforeProgress <= eval(data.midTestProgress) && data.totalProgress >= eval(data.midTestProgress)) {//평가 응시가능 알림
            if (data.midstatus != 'C') {
                $('.list' + checkSeq + ' .midStatus').html('<strong class="blue">응시 가능</strong>')
            } else {
                $('.list' + checkSeq + ' .midStatus').html('<strong class="blue">응시 완료</strong>')
            }
        } else if ($beforeProgress <= eval(data.finalTestProgress) && data.totalProgress >= eval(data.finalTestProgress)) {
            $('.list' + checkSeq + ' .finStatus').html('<strong class="blue">응시 가능</strong>')
            $('.list' + checkSeq + ' .reportStatus').html('<strong class="blue">제출 가능</strong>')
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
function chkPassTable(data, writeTarget) {//수강기준 테이블
    var chkTable = '';

    //18-03-15 한상민
//  chkTable +='<div class="progress">';
//  chkTable +='<ul>';
//  chkTable +='<li class="type01"><h1>권장 진도율<strong>'+data.suggestProgress+'<span>%</span></strong></h1><div><p style="width:'+data.suggestProgress+'%"></p></div></li>';
//  chkTable +='<li class="type02"><h1>내 진도율<strong class="totlaProgress02">'+data.totalProgress+'<span>%</span></strong></h1><div><p style="width:'+data.totalProgress+'%"></p></div></li>';
//  chkTable +='<li class="type03"><h1>평균 진도율<strong>'+data.aveProgress+'<span>%</span></strong></h1><div><p style="width:'+data.aveProgress+'%"></p></div></li>';
//  chkTable +='</ul>';
//  chkTable +='</div>';
    //여기까지

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

    $('.list' + writeTarget + ' .summuryArea').after(chkTable)

}

function chkTestArea(data, writeTarget) {//평가진행 관련 버튼ul
    //평가관련
    if ($('.list' + writeTarget + ' > ul').length == 0) {
        $('.list' + writeTarget + ' table.passCheck').after('<ul style="font-size:12px;"></ul>')
        var testUl = '';
        testUl += '<li class="middleTest"></li>'
        testUl += '<li class="lastTest"></li>'
        testUl += '<li class="report"></li>'
        $('.list' + writeTarget + ' > ul').html(testUl)
    }
    //전체 공통
    var today = data.nowTime.substr(0, 10);
    var nowTime = data.nowTime;
    var contentsCode = data.contentsCode;
    var lectureOpenSeq = data.lectureOpenSeq;
    //중간평가
    var midWrite = '';
    var midtext = '';
    var midMsg = '';
    var midLink = '';
    if (data.serviceType == 3) {
        midtext = '평가 없는 과정'
        midMsg = '<strong class="red">평가 없음</strong>';
        midLink = 'alert(\'' + midtext + '\')';
    } else {
        if (eval(data.totalProgress) < eval(data.midTestProgress) && data.midStatus != null) {
            midtext = '진도율 ' + data.midTestProgress + '% 이상 응시 가능'
            midMsg = '<strong class="red">진도 부족</strong>';
            midLink = 'alert(\'진도율 ' + data.midTestProgress + '% 이상 응시 가능합니다.\')';
        } else if (data.midStatus == null) {
            midtext = '평가 없는 과정'
            midMsg = '<strong class="red">평가 없음</strong>';
            midLink = 'alert(\'' + midtext + '\')';
        } else {
            var captchaLink = 'hrdMOTP.php?type=mid&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq;

            if (data.midStatus == 'N' || data.midStatus == 'V') { //평가응시 전,중
                if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && (data.midCaptchaTime == null || data.midCaptchaTime.substr(0, 10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {//일반 과정일시 캡챠 적용
                    midLink = 'openPopup(\'' + captchaLink + '\')';
                } else {
                    midLink = 'openStudyModal(\'mid\',\'' + contentsCode + '\',' + lectureOpenSeq + ')';
                }
                if (data.midStatus == 'N') { //응시관련 메세지
                    if (eval(data.serviceType) == 1 || eval(data.serviceType) == 2) {
                        midMsg = '<strong class="blue">응시하기</strong>';
                    } else {
                        midMsg = '<strong class="blue">응시하기</strong>';
                    }
                } else {
                    midMsg = '<strong class="blue">응시 중</strong>';
                }
                midtext = '<span class="red">응시 마감 : ' + data.lectureEnd.substr(0, 10) + ' 23:50까지</span>';
            } else if (data.midStatus == 'Y' || data.midStatus == 'C') { //평가응시 후
                if (data.serviceType == 5) {
                    midLink = 'resultAct35(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'mid\')';
                } else {
                    midLink = 'resultAct(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'mid\')';
                }
                midMsg = '<strong class="blue">응시 완료</strong>';
                midtext = '응시일 : ' + data.midSaveTime.substr(0, 10);
            }
        }
    }
    midWrite += '<h1>중간평가</h1>' + midMsg;
    midWrite += '<br /><span>' + midtext + '</span>'
    $('.list' + writeTarget + ' li.middleTest').html(midWrite)
    $('.list' + writeTarget + ' li.middleTest').attr('onclick', midLink);

    //최종평가
    var finWrite = '';
    var fintext = '';
    var finMsg = '';
    var finLink = '';
    if (data.serviceType == 3 && data.contentsCode != "3FO31N" && data.companyCode != "5058203997" && data.companyCode != "2198201220" && data.companyCode != "2198201221") {
        fintext = '평가 없는 과정'
        finMsg = '<strong class="red">평가없음</strong>';
        finLink = 'alert(\'' + fintext + '\')';

    } else {

        if (data.serviceType == 5) {
            data.finalTestProgress = 100;
        }

        if (data.totalProgress < eval(data.finalTestProgress) && data.testStatus != null) {
            fintext = '진도율 ' + data.finalTestProgress + '% 이상 응시 가능'
            finMsg = '<strong class="red">진도 부족</strong>';
            finLink = 'alert(\'진도율 ' + data.finalTestProgress + '% 이상 응시 가능합니다.\')';
        } else if (data.testStatus == null) {
            fintext = '평가 없는 과정'
            finMsg = '<strong class="red">평가없음</strong>';
            finLink = 'alert(\'' + fintext + '\')';
        } else {
            var captchaLink = 'hrdMOTP.php?type=final&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq;

            if (data.testStatus == 'N') {

                if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && (data.testCaptchaTime == null || data.testCaptchaTime.substr(0, 10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {//일반 과정일시 캡챠 적용
                    finLink = 'openPopup(\'' + captchaLink + '\')';
                } else {
                    finLink = 'openStudyModal(\'final\',\'' + contentsCode + '\',' + lectureOpenSeq + ')';
                }
                if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2)) {
                    finMsg = '<strong class="blue">응시하기</strong>'
                } else {
                    finMsg = '<strong class="blue">응시하기</strong>'
                }
                fintext = '<span class="red">제한시간 : ' + data.testTime + '분</span>'

            } else if (data.testStatus == 'V') {
                if (data.nowTime >= data.testEndTime) {
                    if (data.serviceType == 5) {
                        finLink = 'resultAct35(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'final\')';
                    } else {
                        finLink = 'resultAct(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'final\')';
                    }
                    finMsg = '<strong class="blue">응시 완료</strong>'
                    fintext = '시간 초과로 인한 응시 종료';
                } else {
                    //20170809 서영기 if문 결과 값 수정
                    if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && (data.testCaptchaTime == null || data.testCaptchaTime.substr(0, 10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {
                        finLink = 'openPopup(\'' + captchaLink + '\')';
                    } else {
                        finLink = 'openStudyModal(\'final\',\'' + contentsCode + '\',' + lectureOpenSeq + ')';
                    }
                    finMsg = '<strong class="blue">응시 중</strong>'
                    fintext = '<span class="red">' + data.testEndTime + '까지</span>';
                }
            } else if (data.testStatus == 'Y' || data.testStatus == 'C') { //평가응시 후
                if (data.companyCode == '5088213174') {
                    finLink = '';
                } else {
                    if (data.serviceType == 5) {
                        finLink = 'resultAct5(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'final\')';
                    } else {
                        finLink = 'resultAct(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'final\')';
                    }
                }
                finMsg = '<strong class="blue">응시 완료</strong>';
                fintext = '응시일 : ' + data.testSaveTime.substr(0, 10);
            }
        }
    }
    finWrite += '<h1>최종평가</h1>' + finMsg;
    finWrite += '<br /><span>' + fintext + '</span>'
    $('.list' + writeTarget + ' li.lastTest').html(finWrite)
    $('.list' + writeTarget + ' li.lastTest').attr('onclick', finLink);

    //과제 제출 관련
    var reportWrite = '';
    var reporttext = '';
    var reportMsg = '';
    var reportLink = '';

    if (data.totalProgress < eval(data.finalTestProgress) && data.reportStatus != null) {
        reporttext = '진도율 ' + data.finalTestProgress + '% 이상 제출 가능'
        reportMsg = '<strong class="red">진도 부족</strong>';
        reportLink = 'alert(\'진도율 ' + data.finalTestProgress + '% 이상 제출 가능합니다.\')';
    } else if (data.reportStatus == null) {
        reporttext = '과제가 없는 과정'
        reportMsg = '<strong class="red">과제 없음</strong>';
        reportLink = 'alert(\'과제가 없는 과정입니다.\')';
    } else {
        var captchaLink = 'hrdMOTP.php?type=report&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq;


        if (data.reportStatus == 'N' || data.reportStatus == 'V') {
            if ((eval(data.serviceType) == 1 || eval(data.serviceType) == 2) && (data.reportCaptchaTime == null || data.reportCaptchaTime.substr(0, 10) != today) && !(nowTime >= captchaBanStart && nowTime <= captchaBanEnd)) {//일반 과정일시 캡챠 적용
                reportLink = 'openPopup(\'' + captchaLink + '\')';
            } else {
                reportLink = 'openStudyModal(\'report\',\'' + contentsCode + '\',' + lectureOpenSeq + ')';
            }
            if (data.reportStatus == 'N') {
                if (eval(data.serviceType) == 1 || eval(data.serviceType) == 2) {
                    reportMsg = '<strong class="blue">제출하기</strong>'
                } else {
                    reportMsg = '<strong class="blue">제출하기</strong>'
                }
                reporttext = '<span class="red">제출 마감 : ' + data.lectureEnd.substr(0, 10) + ' 23:50까지</span>';
            } else {
                reportMsg = '<strong class="blue">작성 중</strong>'
                //reporttext = '임시저장 중 : 최종제출하지 않으셨습니다.';
                reporttext = '<span class="red">제출 마감 : ' + data.lectureEnd.substr(0, 10) + ' 23:50까지</span>';
            }
        } else if (data.reportStatus == 'Y' || data.reportStatus == 'C') { //평가응시 후
            reportLink = 'resultAct(\'report\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'\')';
            reportMsg = '<strong class="blue">제출 완료</strong>';
            reporttext = '제출일 : ' + data.reportSaveTime.substr(0, 10);
        }
    }
    reportWrite += '<h1>과제제출</h1>' + reportMsg;
    reportWrite += '<br /><span>' + reporttext + '</span>'
    $('.list' + writeTarget + ' li.report').html(reportWrite)
    $('.list' + writeTarget + ' li.report').attr('onclick', reportLink);
}


function runStudyList(data, writeTarget) {

    //평가관련
    if ($('.list' + writeTarget + ' > form').length == 0) {

        $('.list' + writeTarget + ' > button').before('<form class="lectureForm' + writeTarget + '" action="' + data.progress[0].player + '/player/popupStudy.php" method="post" target="studyWindow"></form>')

    }

    var useMidTest = data.midStatus;
    var useFinTest = data.testStatus;
    var useReport = data.reportStatus;
    var studyList = ''; //목록불러오기
    var nowTime = data.nowTime.substr(0, 10);
    if (data.sourceType != 'book') {
        studyList += '<input type="hidden" name="seq" value="' + writeTarget + '">';
        studyList += '<input type="hidden" name="subDomains" value="' + subDomain + '">';
        studyList += '<input type="hidden" name="sourceType" value="' + data.sourceType + '">';
        studyList += '<input type="hidden" name="contentsCode" value="' + data.contentsCode + '">';
        studyList += '<input type="hidden" name="lectureOpenSeq" value="' + data.lectureOpenSeq + '">';
        studyList += '<input type="hidden" name="chapter" value="">';
        studyList += '<input type="hidden" name="types" value="">';
    } else {
        studyList += '<input type="hidden" name="seq" value="' + writeTarget + '">';
        studyList += '<input type="hidden" name="Sid" value="' + data.contentsCode + data.lectureStart.substr(2, 2) + data.lectureStart.substr(5, 2) + data.lectureStart.substr(8, 2) + data.lectureEnd.substr(2, 2) + data.lectureEnd.substr(5, 2) + data.lectureEnd.substr(8, 2) + loginUserID + '">';
        studyList += '<input type="hidden" name="subDomains" value="' + subDomain + '">';
        studyList += '<input type="hidden" name="sourceType" value="' + data.sourceType + '">';
        studyList += '<input type="hidden" name="Code" value="' + data.contentsCode + '">';
        studyList += '<input type="hidden" name="LectureOpenSeq" value="' + data.lectureOpenSeq + '">';
        studyList += '<input type="hidden" name="Chasi" value="">';
        studyList += '<input type="hidden" name="PreView" value="N">';
        studyList += '<input type="hidden" name="MovePage" value="">';
        studyList += '<input type="hidden" name="Page" value="">';
    }
    //수강관련변수
    var midTerm = data.midTestChapter;

    var studyCnt = 0; //하루최대차시 체크용
    //var nextUse = 'Y'; //전차시 진도체크용
    //var midAfter = 'N'

    if (data.sourceType == 'book' || data.sourceType == 'html5') {
        // Internet Explorer 버전 체크
        var IEVersionCheck = function () {
            var word;
            var version = "N/A";
            var agent = navigator.userAgent.toLowerCase();
            var name = navigator.appName;

            // IE old version ( IE 10 or Lower )
            if (name == "Microsoft Internet Explorer") word = "msie ";
            else {
                // IE 11
                if (agent.search("trident") > -1) word = "trident/.*rv:";
                // IE 12  ( Microsoft Edge )
                else if (agent.search("edge/") > -1) word = "edge/";
            }

            var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
            if (reg.exec(agent) != null)
                version = RegExp.$1 + RegExp.$2;
            return version;
        };
        //document.write(IEVersionCheck());
        if (IEVersionCheck() == '9.0' || IEVersionCheck() == '8.0' || IEVersionCheck() == '7.0') {
            studyList += '<div class="noticeArea">';
            studyList += '<img src="../images/study/img_chrome.png" alt="주의" />';
            studyList += '<h1>인터넷 브라우저 경고</h1>';
            studyList += '<p>현재 사용중인 <strong>인터넷 브라우저</strong>에서는 <strong>원활한 강의 재생이 되지 않을 수 있습니다</strong>.<br />크롬 브라우저를 사용하시기 바라며 설치가 되어 있지 않다면 <a href="https://www.google.co.kr/chrome/browser/desktop/" target="_blank">이곳을 클릭</a>하여 설치하시기 바랍니다.</p>';
            studyList += '</div>';
        }
    }

    studyList += '<table>';
    studyList += '<colgroup><col width="90px" /><col width="*" /><col width="150px" /><col width="92px" /><col width="92px" /></colgroup>';
    //수강 노출시작
    var i = 0;

    for (i = 0; i < data.totalCount; i++) {
        if (i != midTerm || data.totalPassMid == 0) { //2018-03-23 이응민 data.totalPassMid == 0 조건 추가 (중간평가가 없고 최종평가만 있을시)
            studyList += '<tr class="lecture' + writeTarget + data.progress[i].chapter + '">';
            studyList += '<td>' + data.progress[i].chapter + '차시</td>';
            studyList += '<th><strong>' + data.progress[i].chapterName + '</strong><br />';
            if (data.progress[i].endTime != null) {
                studyList += '교육이수 시간 : ' + data.progress[i].endTime + '<br />';
            }
            studyList += '<td>' + data.progress[i].progress + '%</td>';


            studyList += '<td class="like-container">';
            studyList += '<button type="button" onclick="likeAct(\'' + data.contentsCode + '\',\'' + data.progress[i].chapter + '\')" class="btn-like" data-article-id="' + data.progress[i].chapter + '">';
            studyList += '<span id="heart-shape-' + data.progress[i].chapter + '">';
            if (!data.progress[i].likeSeq) {
                studyList += '<img src="/images/global/like_no.png" style="width:20px;margin-top:0px">';
            } else {
                studyList += '<img src="/images/global/like.png" style="width:20px;margin-top:0px">';
            }
            studyList += '</span> <span id="like-count-' + data.progress[i].chapter + '">' + data.progress[i].likeCount + '</span></button>';
            studyList += '</td>';
            studyList += '</td>';

            //학습하기버튼
            studyList += '<td>';
            //진도제한 변경 2017-07-06 서영기

            if (eval(data.serviceType) == 1 || eval(data.serviceType) == 2) { // || data.serviceType == 3 ||data.serviceType == 5
                if (studyCnt >= maxStudyCnt) {//최대차시
                    studyList += writeBtn('study', '사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(' + maxStudyCnt + '차시)를 초과하였습니다.');
                } else if (eval(midTerm) != 0 && (eval(data.progress[i].chapter) > eval(midTerm)) && (useMidTest != 'Y' && useMidTest != 'C') && eval(data.serviceType) == 1 && data.totalPassMid > 0) {//학습하기
                    studyList += writeBtn('study', '중간평가 응시 완료 후에 학습할 수 있습니다.');
                } else {
                    studyList += writeBtn('study', (i + 1));
                }
            } else {
                studyList += writeBtn('study', (i + 1));
            }

            studyList += '</td>';

            //하루 최대 진도차시
            if (data.progress[i].endTime == null || data.progress[i].endTime.substr(0, 10) == data.nowTime.substr(0, 10)) {
                studyCnt++
            }
            studyList += '</tr>';
        } else if (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9 || data.serviceType == 5 || data.serviceType == 10) { //2017.07.19 강혜림 서비스타입 5번 추가
            //중간평가 노출
            if (useMidTest != null && (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9 || data.serviceType == 5 || data.serviceType == 10)) {//서비스타입에 따른 노출 지정
                if (midTerm != 0) {
                    studyList += '<tr class="midtestLine" style="background-color:#E7F6FF;">';
                    studyList += '<td>[평가]</td>';
                    studyList += '<th class="blue"><strong>중간평가</strong>';

                    // 평가응시전, 응시중
                    if (data.midStatus == 'N' || data.midStatus == 'V') {
                        studyList += '</th>';
                    } else {
                        studyList += '<br />평가 응시시간 : ' + data.midSaveTime + '<br />';

                    }
                    //응시상태www
                    if (eval(data.totalProgress) >= eval(data.midTestProgress)) {
                        if (data.midStatus == 'Y' || data.midStatus == 'C') { //채점전
                            studyList += '<td class="midStatus"><strong class="blue">응시 완료</strong>';


                        } else if (data.midStatus == 'V') {
                            studyList += '<td class="midStatus"><strong class="red">응시 중</strong></td>';
                        } else {
                            studyList += '<td class="midStatus"><strong class="blue">응시 가능</strong></td>';
                        }
                    } else {
                        studyList += '<td class="midStatus"><strong class="red">진도 부족</strong></td>';
                    }
                    //중간 공란
                    studyList += '<td>-</td>';
//#4188ae
                    //버튼노출
                    studyList += '<td>'
                    //중간평가버튼
                    if (data.midStatus == 'Y' || data.midStatus == 'C') {
                        //산업안전용 재응시기능
                        if (data.serviceType == 5 && /dhkang99|9707262672/.test(loginUserID) && data.passScore > data.testScore) {

                            if (data.retakenWay == 0) {
                                studyList += `<button type="button" onclick="retaken('${loginUserID}','${data.seq}','mid',0)" style="width:82px; font-weight:bold;font-size:inherit;border: 1px solid #494949;color: #FFFFFF;background: linear-gradient(0deg, rgba(65,136,174,1) 0%, rgba(84,175,224,1) 100%);border-radius: 5px;font-family: monospace;padding: 4px 6px 4px 6px;">재응시 ↩︎</button></td>`;
                            }

                            if (data.retakenWay == 1) {
                                studyList += `<button type="button" onclick="retaken('${loginUserID}','${data.seq}','mid',1)" style="width:82px; font-weight:bold;font-size:inherit;border: 1px solid #494949;color: #FFFFFF;background: linear-gradient(0deg, rgba(65,136,174,1) 0%, rgba(84,175,224,1) 100%);border-radius: 5px;font-family: monospace;padding: 4px 6px 4px 6px;">재응시요청 ↩︎</button></td>`;
                            }

                        } else {
                            studyList += writeBtn('midTestComplete');
                        }

                    } else {
                        studyList += writeBtn('midTest');
                    }

                    studyList += '</td>'
                    studyList += '</tr>';
                }

                midTerm = null;
                i = i - 1;

            }


            //경비과정. 메세지 노출. 2018-01-15 최형진 추가
            if (data.sort01 == 'lecture09') {
                studyList += '<tr style="background-color: red;">';
                studyList += '    <td colspan="5"><strong>총 학습진도율 100%가 되어야 이수증이 발급됩니다.</strong></td>';
                studyList += '</tr>';
            } else if (data.contentsCode == 'XKK8W0' || data.contentsCode == '9W7KKZ') {
                studyList += '<tr style="background-color: red;">';
                studyList += '    <td colspan="5"><strong>근로자 산업안전 수료증은 총 학습진도율 100%가 되어야 발급됩니다.</strong></td>';
                studyList += '</tr>';
            }
        } else {
            midTerm = null;
            i = i - 1;
        }
    }
    //최종평가
    if (useFinTest != null && (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9 || data.serviceType == 5 || data.serviceType == 10)) { //2017.07.19 강혜림 서비스타입 5번 추가
        studyList += '<tr class="fintestLine" style="background-color:#E7F6FF;">';
        studyList += '<td>[평가]</td>';
        studyList += '<th class="blue"><strong>최종평가</strong>';
        if (data.testStatus == 'N' || data.testStatus == 'V') {
            studyList += '</th>';
        } else {
            studyList += '<br />평가 응시시간 : ' + data.testSaveTime + '<br />';
            // studyList += '접속 아이피 : ' + data.testIP + '</th>';
        }
        if (eval(data.totalProgress) >= eval(data.finalTestProgress)) {
            if ((data.testStatus == 'Y' && data.testOverTime != 'Y') || data.testStatus == 'C') {
                studyList += '<td class="finStatus"><strong class="blue">응시 완료</strong>';

            } else if (data.testStatus == 'V' && data.nowTime >= data.testEndTime) {
                studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
            } else if (data.testStatus == 'Y' && data.testOverTime == 'Y') {
                studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
            } else if (data.testStatus == 'V' && data.nowTime < data.testEndTime) {
                var end = data.testEndTime.split(':');
                var end2 = end[0].split(' ');
                studyList += '<td class="finStatus"><strong class="red">응시 중<br>' + end2[0] + '<br>' + end2[1] + '시 ' + end[1] + '분 ' + end[2] + '초까지</strong></td>';
            } else {
                studyList += '<td class="finStatus"><strong class="blue">응시 가능</strong></td>';
            }
        } else {
            studyList += '<td class="finStatus"><strong class="red">진도 부족</strong></td>';
        }
        studyList += '<td>-</td>'

        studyList += '<td>'
        //기말평가 버튼
        if (data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus = 'V' && data.nowTime >= data.testEndTime)) {
            if (data.serviceType == 5 && parseInt(data.passScore) > parseInt(data.testScore)) {

                if (data.retakenWay == 0) {
                    studyList += `<button class="retaken" type="button" onclick="retaken('${loginUserID}','${data.seq}','test',0)">재응시 ↩︎</button></td>`;
                }

                if (data.retakenWay == 1) {
                    studyList += `<button class="retaken" type="button" onclick="retaken('${loginUserID}','${data.seq}','test',1)">재응시요청 ↩︎</button></td>`;
                }

            } else {
                studyList += writeBtn('finTestComplete');
            }

        } else {
            studyList += writeBtn('finTest');
        }
        studyList += '</td>'
        studyList += '</tr>';
    }

    //========================== 비환급 평가진행 예외건

    //최종평가
    if (useFinTest != null && data.serviceType == 3 && data.contentsCode == "3FO31N" && (data.companyCode == "5058203997" || data.companyCode == "2198201220" || data.companyCode == "2198201221" || data.companyCode == "2728101049")) {
        studyList += '<tr class="fintestLine" style="background-color:#E7F6FF;">';
        studyList += '<td>[평가]</td>';
        studyList += '<th class="blue"><strong>최종평가</strong>';
        if (data.testStatus == 'N' || data.testStatus == 'V') {
            studyList += '</th>';
        } else {
            studyList += '<br />평가 응시시간 : ' + data.testSaveTime + '<br />';
            // studyList += '접속 아이피 : ' + data.testIP + '</th>';
        }
        if (eval(data.totalProgress) >= eval(data.finalTestProgress)) {
            if ((data.testStatus == 'Y' && data.testOverTime != 'Y') || data.testStatus == 'C') {
                studyList += '<td class="finStatus"><strong class="blue">응시 완료</strong></td>';
            } else if (data.testStatus == 'V' && data.nowTime >= data.testEndTime) {
                studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
            } else if (data.testStatus == 'Y' && data.testOverTime == 'Y') {
                studyList += '<td class="finStatus"><strong class="red">시간 초과<br>자동 제출</strong></td>';
            } else if (data.testStatus == 'V' && data.nowTime < data.testEndTime) {
                var end = data.testEndTime.split(':');
                var end2 = end[0].split(' ');
                studyList += '<td class="finStatus"><strong class="red">응시 중<br>' + end2[0] + '<br>' + end2[1] + '시 ' + end[1] + '분 ' + end[2] + '초까지</strong></td>';
            } else {
                studyList += '<td class="finStatus"><strong class="blue">응시 가능</strong></td>';
            }
        } else {
            studyList += '<td class="finStatus"><strong class="red">진도 부족</strong></td>';
        }
        studyList += '<td>-</td>'

        studyList += '<td>'
        //기말평가 버튼
        if (data.testStatus == 'Y' || data.testStatus == 'C' || (data.testStatus = 'V' && data.nowTime >= data.testEndTime)) {
            studyList += writeBtn('finTestComplete');
        } else {
            studyList += writeBtn('finTest');
        }
        studyList += '</td>'
        studyList += '</tr>';
    }

    //=============================================

    //
    //레포트
    if (useReport != null && (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9 || data.serviceType == 5 || data.serviceType == 10)) { //2017.07.19 강혜림 서비스타입 5번 추가
        studyList += '<tr class="reportLine" style="background-color:#E7F6FF;">';
        studyList += '<td>[과제]</td>';
        studyList += '<th class="blue"><strong>과제 제출</strong>';
        if (data.reportStatus == 'N' || data.reportStatus == 'V') {
            studyList += '</th>';
        } else {
            studyList += '<br />과제 제출 시간 : ' + data.reportSaveTime + '<br />';
            // studyList += '접속 아이피 : ' + data.reportIP + '</th>';
        }
        //메세지 출력
        if (data.totalProgress >= eval(data.finalTestProgress)) {
            if (data.reportStatus == 'Y' || data.reportStatus == 'C') {
                studyList += '<td class="reportStatus"><strong class="blue">응시 완료</strong>';

                if (data.serviceType == 5 && /dhkang99|9707262672/.test(loginUserID) && data.passScore <= testScore) {

                    if (data.retakenWay == 0) {
                        studyList += `<br/><button type="button" onclick="retaken('${loginUserID}','${data.seq}','report',0)" style="font-size:16px; margin-right:0px;">재응시하기</button></td>`;
                    }

                    if (data.retakenWay == 1) {
                        studyList += `<br/><button type="button" onclick="retaken('${loginUserID}','${data.seq}','report',1)" style="font-size:16px; margin-right:0px;">재응시 요청하기</button></td>`;
                    }

                }

            } else if (data.reportStatus == 'V') {
                studyList += '<td class="reportStatus"><strong class="red">작성 중<br>' + data.lectureEnd.substr(0, 10) + ' 23:50까지</strong></td>';
            } else {
                studyList += '<td class="reportStatus"><strong class="blue">응시 가능</strong></td>';
            }
        } else {
            studyList += '<td class="reportStatus"><strong class="red">진도 부족</strong></td>';
        }
        studyList += '<td>-</td>';

        studyList += '<td>'
        //레포트버튼출력
        if (data.reportStatus == 'Y' || data.reportStatus == 'C') {
            studyList += writeBtn('reportComplete');
        } else {
            studyList += writeBtn('reportWrite');
        }
        studyList += '</td>'
        studyList += '</tr>';
    }

    //수강 노출끝
    // 231129 외부 설문조사링크 추가 - 특정기업 / 함대용주임 요청
    if (data.contentsCode == 'CCNSA2') {
        studyList += '<tr class="fintestLine" style="background-color:#E7F6FF;">'
        studyList += '<td>[설문]</td>'
        studyList += '<td> 감사합니다</td>'
        studyList += '<td> - </td>'
        studyList += '<td> - </td>'
        studyList += '<td><a href="https://forms.gle/vw4u94ubtBtPbgUe7" target="_blank" style="font-size:18px; font-weight:bold;">설문하기</a></td>'
        studyList += '</tr>'
    }

    if (data.contentsCode == '51I1E0') {
        studyList += '<tr class="fintestLine" style="bacground-color:#E7F6FF;">'
        studyList += '<td>[설문]</td>'
        studyList += '<td> 감사합니다</td>'
        studyList += '<td> - </td>'
        studyList += '<td> - </td>'
        studyList += '<td><a href="https://forms.gle/qxUYsnaDehThjN7K6" target="_blank" style="font-size:18px; font-weight:bold;">설문하기</a></td>'
        studyList += '</tr>'
    }

    studyList += '</table>';
    $('.list' + writeTarget + ' form').html(studyList)
}


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
    var otpUrl = '';
    if (type === 'study') {
        otpUrl = `hrdMOTP.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&chapter=${contentsInfo.chapter}&className=${className}`;
    } else {
        otpUrl = `hrdMOTP.php?type=${type}&contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}`;
    }
    window.open(otpUrl, '', popup = 1);
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

//          $.ajax({
//              type : "POST",
//              url : '../api/apiHrdScoreCheck.php',
//              async:false,
//              data : {"startEnd" : flag, "contentsCode" : contentsCode, "lectureOpenSeq" : lectureOpenSeq, "chapter" : chapter, "eval_cd" : eval_cd}
//          });

    }
}


function studyEnd(className) { //학습 종료
    sendProgress();
    hrdCheckScore('study', contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter, 'E');
    // 스케줄러 및 이벤트리스너 종료
    clearTimeout(timeCheck);
    clearTimeout(progressTime);
    totalTime = 0;
    changeListProgress(className);
    document.getElementById('modal').remove();
    document.removeEventListener('visibilitychange', tabVisibility);
    window.removeEventListener('beforeunload', tabUnloadCheck);
    window.removeEventListener('message', getPostMessage);

    let body = document.querySelector('body');
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition); // 외부 스크롤 허용
    clearTimeout(progressTime);
}

function changeListProgress(className) { // 차시 목록 진도율 변경 반영
                                         //className is studySeq
    let seqNum = className.substring(11);
    let tr = document.getElementsByClassName('lecture' + seqNum + contentsInfo.chapter);
    let li = document.getElementsByClassName('list' + seqNum);
    $.ajax({
        type: 'GET',
        url: chapterApi,
        data: {
            'contentsCode': contentsInfo.contentsCode,
            'lectureOpenSeq': contentsInfo.lectureOpenSeq,
            'chapter': contentsInfo.chapter
        },
        success: function (data) {
            tr[0].childNodes[2].textContent = data.progress[0].progress + "%";
            li[0].childNodes[0].childNodes[0].childNodes[2].childNodes[1].textContent = data.totalProgress;
        }
    });
}

function step() { // setInterval 사용시 문제 발생 setTimeout 재귀적 사용
    hour = Math.floor(totalTime / 3600);
    minute = Math.floor((totalTime - (hour * 3600)) / 60);
    sec = totalTime - (hour * 3600) - (minute * 60);

    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (sec < 10) sec = "0" + sec;

    $('#time > span').html(hour + ':' + minute + ':' + sec);
    totalTime++;
    timeCheck = setTimeout(step, interval);
}

function tabUnloadCheck(event) { //onbeforeunload event 체크
    if (navigator.userAgent.match(/Firefox/) || navigator.userAgent.match(/Edg/)) { // 파이어폭스, 엣지 환경 경고창 표시
        event.preventDefault();
        event.returnValue = '';
    }

    getContentsInfo(contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter);
    sendProgress();
    hrdCheckScore('study', contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter, 'E');
}

function tabVisibility() { //브라우저 백그라운드 상태 체크
    currentVisibility = !document.hidden;
    if (!currentVisibility) {
        $('#time > span').html('--:--:--');
        if (typeof timeCheck === 'number') {
            clearTimeout(timeCheck);
            timeCheck = null;
        }
        clearTimeout(progressTime);
    } else {
        // progressTime = setTimeout(updateProgress, 0);
        // setTimeout(()=>{getContentsInfo(contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter)}, 1000);
        // setTimeout(()=>{timeCheck = setTimeout(step, interval)}, 1500);
        setTimeout(() => {
            updateProgress();
            setTimeout(async () => {
                await getContentsInfo(contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter);
                if (timeCheck == null) {
                    timeCheck = setTimeout(step, interval);
                }
            }, 0)
        }, 0);
    }
}

function sendProgress(open) {
    // if (contentsInfo.autoplay == 'Y') {
        let videoSrc = document.querySelector('#frame').src;
        // nowPage 저장코드
        lastPageUrl = new URL(videoSrc).pathname
    // }
    fetch(progressApi + `?userID=${loginUserID}&contentsCode=${contentsInfo.contentsCode}&chapter=${contentsInfo.chapter}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `contentsCode=${contentsInfo.contentsCode}&lectureOpenSeq=${contentsInfo.lectureOpenSeq}&chapter=${contentsInfo.chapter}&totalTime=${totalTime}&open=${open}&cookie=${document.cookie}&nowPageURL=${lastPageUrl}`,
        keepalive: true
    })
        .then((response) => (response.json()))
        .then((data) => {
            if (data.result === 'logout') {
                alert('로그아웃 되었습니다. 로그인 후 수강해주시기 바랍니다.');
                window.location.reload();
            } else if (data.result === 'date error') {
                window.location.reload();
            }
        });

}

function updateProgress(open) {
    sendProgress(open);

    progressTime = setTimeout(() => {
        updateProgress('N')
    }, 10000);
}

function sendData(flag) {
    let contentData = '';
    if (flag === 'note') {
        contentData = $('.note').serialize();
        if ($('.noteContent').val().length <= 0) {
            alert('내용을 입력해주세요.');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: '../api/apiStudyNote.php',
            data: contentData + '&lectureOpenSeq=' + contentsInfo.lectureOpenSeq,
            success: function (data) {
                if (data.result === 'success') {
                    alert('등록 성공');
                } else {
                    alert('등록 실패');
                }
            }
        })
    } else {
        contentData = $('.consult').serialize();
        if ($('.consultContent').val().length <= 0) {
            alert('내용을 입력해주세요.');
            return false;
        }
        $.ajax({
            type: 'POST',
            url: '../api/apiConsult.php',
            data: contentData + '&userName=' + loginUserName,
            success: function (data) {
                if (data.result !== 'error') {
                    alert('등록 성공');
                } else {
                    alert('등록 실패');
                }
            }
        })
    }
}

function changeSummary(li) {
    let summaryContent = '';
    $(li).siblings().removeClass('selectedSummary');
    $(li).addClass('selectedSummary');

    if ($(li).index() == '0') {
        if (contentsInfo.attachFile != '') {
            summaryContent += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습자료받기</span><br>
            <a href="https://modulearning.kr/lib/fileDownLoad.php?fileName=${encodeURI(contentsInfo.attachFile)}&link=${encodeURIComponent('/attach/contents/' + contentsInfo.attachFile)}" target="_blank">
            ${contentsInfo.attachFile}</a>
            </p><br>`;
        } else {
            summaryContent += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습자료받기</span><br>등록된 학습자료가 없습니다.</p><br>`;
        }
        summaryContent += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">내용전문가</span><br>${contentsInfo.professor.replace(/\n/g, '<br />')}</p><br>`;
        summaryContent += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습목표</span><br>${contentsInfo.goal.replace(/\n/g, '<br />')}</p><br>`;
        summaryContent += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습내용</span><br>${contentsInfo.content.replace(/\n/g, '<br />')}</p><br>`;
    } else if ($(li).index() == '1') {
        summaryContent += '<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">나만의 학습노트</span></p><br>';
        summaryContent += '<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; ">작성한 학습노트는 <font style="color:#0780c2;">내 강의실 > 나만의 학습노트</font>에서 확인 가능합니다.</span></p><br>';
        summaryContent += '<form class="note"><textarea class="noteContent" name="noteContent" style="width:100%; height:100px; padding:5px;"></textarea></form><br>';
        summaryContent += `<div style="text-align:center; margin-top:10px;"><button onclick="sendData('note')" style="width:90%; padding: 10px; 5px; background:#0780c2; color:white; font-size:16px; border-radius:3px;">학습노트 저장하기</button></div>`;
    } else {
        let loginUserInfo = $.get('../api/apiLoginUser.php', {}, function (data) {
            $('input[name="phone01"]').val(data.mobile01);
            $('input[name="phone02"]').val(data.mobile02);
            $('input[name="phone03"]').val(data.mobile03);
            $('input[name="email01"]').val(data.email01);
            $('input[name="email02"]').val(data.email02);
        })
        summaryContent += '<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">문의하기</span></p><br>';
        summaryContent += '<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; ">질문내용 및 답변은 <font style="color:#0780c2;">내 강의실 > 상담신청내역</font>에서 확인 가능합니다.</span></p><br>';
        summaryContent += '<form class="consult"><span style="color:black;">문의 선택 : </span><select name="consult">';
        summaryContent += '<option value="">문의종류선택</option>';
        summaryContent += '<option value="learn">학습질의</option>';
        summaryContent += '<option value="contents">콘텐츠 오류</option>';
        summaryContent += '<option value="progress">진도율 관련</option>';
        summaryContent += '<option value="system">시스템 관련</option>';
        summaryContent += '<option value="test">평가 관련</option>';
        summaryContent += '<option value="pass">수료 관련</option>';
        summaryContent += '<option value="score">성적 이의신청</option>';
        summaryContent += '<option value="tendinous">건의사항</option>';
        summaryContent += '<option value="etc">기타</option>';
        summaryContent += '</select><br>';
        summaryContent += '<input type="hidden" name="phone01" value="">';
        summaryContent += '<input type="hidden" name="phone02" value="">';
        summaryContent += '<input type="hidden" name="phone03" value="">';
        summaryContent += '<input type="hidden" name="email01" value="">';
        summaryContent += '<input type="hidden" name="email02" value="">';
        summaryContent += `<input type="hidden" name="subject" value="[${contentsInfo.contentsName}]과정 ${contentsInfo.chapter}차시 질문입니다.">`;
        summaryContent += '<textarea class="consultContent" name="content" style="width:100%; height:100px; padding:5px; margin-top:5px;"></textarea></form><br>';
        summaryContent += `<div style="text-align:center; margin-top:10px;"><button onclick="sendData('consult')" style="width:90%; padding: 10px; 5px; background:#0780c2; color:white; font-size:16px; border-radius:3px;">문의하기</button></div>`;
    }

    $('#summaryContent').html(summaryContent);
}

function openStudyDiv(className) { // 수강창
    hrdCheckScore('study', contentsInfo.contentsCode, contentsInfo.lectureOpenSeq, contentsInfo.chapter, 'S');
    clearTimeout(progressTime);
    progressTime = setTimeout(() => {
        lastPageUrl = contentsInfo.nowPageUrl;
        updateProgress('Y')
    }, 0);
    document.addEventListener('visibilitychange', tabVisibility);// 창 내림 또는 탭 이동 감지(브라우저 백그라운드 상태 감지);
    window.addEventListener('beforeunload', tabUnloadCheck);

    let body = document.querySelector('body');
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%'; // 외부 스크롤 금지

    let modalWrite = '';
    modalWrite += '<div id="modal">';
    modalWrite += '<div style="transform: translateX(-50%) translateY(-50%);">';
    modalWrite += `<span style="display:block; background:#f2f6f7; text-align:right; padding:3px;">
    <img style="cursor:pointer;" src="../images/admin/btn_close.png" onClick="studyEnd('${className}')"></span>`;
    modalWrite += '<div style="display:flex; padding:0;">';
    modalWrite += `<div id="modalBody" style="width:${contentsInfo.conWidth}px; height:${contentsInfo.conHeight}px;">`;


    // mp4 자동 페이지 넘김 시
    if (contentsInfo.sourceType == 'mp4') {
        let currVideo = `${location.protocol}//${contentsInfo.serverLocation}.${location.host.replace('www.', '')}${contentsInfo.nowPageUrl}`;
        let continueWatching = true // 기본설정
        if (contentsInfo.contentsUrl != currVideo) {
            continueWatching = confirm('이어보기 시청하시겠습니까')
        }

        if (!continueWatching) {
            // when no continueWatching
            currVideo = contentsInfo.contentsUrl
        }

        if (contentsInfo.autoplay == 'Y') {
            // added event form in tag
            modalWrite += `<video id="frame" name="frame" src="${currVideo}" style="width:inherit; height:inherit;" oncanplay="handleCanplayVideo(this)" onended="document.querySelector('#modal > div > div > div.modalSide > div:nth-child(4) > button:nth-child(2)').onclick();" onload="" allowfullscreen controls controlslist="nodownload"></video>`;
        } else {
            modalWrite += `<video id="frame" name="frame" src="${currVideo}" style="width:inherit; height:inherit;" oncanplay="handleCanplayVideo(this)" onended="" onload="" allowfullscreen controls controlslist="nodownload"></video>`;
        }
    } else {
        modalWrite += `<iframe id="frame" name="frame" src="${contentsInfo.contentsUrl}" style="width:inherit; height:inherit;" onload="frameLoad()" allowfullscreen></iframe>`;
    }

    //mp4 
    // modalWrite += `<iframe id="frame" name="frame" src="${contentsInfo.contentsUrl}" style="width:inherit; height:inherit;" onload="frameLoad()" allowfullscreen></iframe>`;


    modalWrite += '</div>';

    modalWrite += '<div class="modalSide" style="width:350px; border-left: 1px solid; background:#f2f6f7;">';
    modalWrite += '<div id="time" style="text-align:center; padding:10px 0; font-size:13px; background:#0780c2; color:white;">수강시간&nbsp;<span style="font-size:18px;">00:00:00</span></div>';
    modalWrite += '<div style="padding: 10px; font-size:16px;">';

    modalWrite += `${contentsInfo.contentsName}<br>`;
    modalWrite += '<div style="font-size:12px; padding-top:4px;">';
    modalWrite += `${contentsInfo.chapter}차시 | ${contentsInfo.chapterName}`;
    modalWrite += '</div>';
    modalWrite += '</div>';
    modalWrite += `<div style="text-align:center; padding-bottom:20px;">
    <button onclick="studyEnd('${className}')" style="width:90%; height:40px; margin-top:20px; font-size:16px; background:#eb4d4b; border-radius:3px; color:white; letter-spacing:2px;">학습종료</button></div>`;
    if (contentsInfo.sourceType == 'mp4' && contentsInfo.contentsCode != 'B9EIDC') {
        modalWrite += '<div style="display:flex; width: 100%; text-align: center; justify-content: center; gap:10px; padding: 5px 0;">';
        modalWrite += '<button style="width: 44%; padding: 7px 0; border-radius: 5px; background: #54a0ff; color: white; font-size:14px; font-weight: bold;" type="button" onclick="movePage(\'P\', contentsInfo.chapterSize);">이전</button>';
        modalWrite += '<button style="width: 44%; padding: 7px 0; border-radius: 5px; background: #54a0ff; color: white; font-size:14px; font-weight: bold;" type="button" onclick="movePage(\'N\', contentsInfo.chapterSize);">다음</button>';
        modalWrite += '</div>';
        let chapterPage = `<span id="chapterPage">${parseInt(contentsInfo.nowPageUrl.slice(-6, -4))}</span>`;
        modalWrite += `<div style="text-align:center;">${chapterPage} / ${contentsInfo.chapterSize}</div>`;
    }
    modalWrite += '<div id="summaryArea" style="padding:0 10px; padding-bottom:20px; border-radius:6px; ">';
    modalWrite += '<ul style="display:flex;justify-content:space-evenly; padding-top:10px; font-size:14px; height:40px;">';
    modalWrite += '<li class="selectedSummary" onclick="changeSummary(this);">학습요점</li><li onclick="changeSummary(this);">학습노트</li><li onclick="changeSummary(this);">문의하기</li></ul>';
    modalWrite += '<div id="summaryContent" style="font-size:12px; background:white; max-height:230px; padding: 15px 5px; overflow:auto; ">';
    if (contentsInfo.attachFile != '') {
        modalWrite += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습자료받기</span><br>
        <a href="https://modulearning.kr/lib/fileDownLoad.php?fileName=${encodeURI(contentsInfo.attachFile)}&link=${encodeURIComponent('/attach/contents/' + contentsInfo.attachFile)}" target="_blank">
        ${contentsInfo.attachFile}</a>
        </p><br>`;
    } else {
        modalWrite += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습자료받기</span><br>등록된 학습자료가 없습니다.</p><br>`;
    }
    modalWrite += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">내용전문가</span><br>${contentsInfo.professor.replace(/\n/g, '<br />')}</p><br>`;
    modalWrite += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습목표</span><br>${contentsInfo.goal.replace(/\n/g, '<br />')}</p><br>`;
    modalWrite += `<p><span style="display:inline-block; font-size:14px; padding-bottom:3px; color:#0780c2;">학습내용</span><br>${contentsInfo.content.replace(/\n/g, '<br />')}</p><br>`;
    modalWrite += '</div>';
    modalWrite += '</div>';
    if (contentsInfo.serviceType != '5') {
        modalWrite += `<div style="text-align:center; padding:10px 0px; color:#0780c2">진도율은 최소 ${contentsInfo.progressCheckTime} 이상<br> 학습하셔야 정상 반영됩니다.</div>`;
    }
    modalWrite += '</div>';
    modalWrite += '</div>';

    modalWrite += '</div>';
    modalWrite += '</div>';
    $('#contents').after(modalWrite);
    disableContextMenu(document.querySelector('#frame'));
}

function frameLoad() {
    if (contentsInfo.serviceType === '5') { // 신 유비무환 컨텐츠 한정 수강 제어
        // window.top.frames[1].postMessage(`${contentsInfo.lectureStart}`, `https://${contentsInfo.serverLocation}.modulearning.kr`);
        // window.addEventListener('message', getPostMessage);
    }

    clearTimeout(timeCheck);
    timeCheck = setTimeout(step, interval);
}

function getPostMessage(event) {
    lastPageUrl = event.data;
}

function getContentsInfo(contentsCode, lectureOpenSeq, chapter) { // 콘텐츠 정보 가져옴
    let conWidth = '';
    let conHeight = '';
    let progressCheckTime = '';
    let prevProgress = 100;
    let studyCount = 0;
    let nowTime = '';
    let result = '';
    let dailyMaxChapter = 0;
    let athFile = '';
    let srcUrl = '';
    $.ajax({
        url: chapterApi,
        type: "GET",
        async: false, //동기 사용
        data: {'contentsCode': contentsCode, 'lectureOpenSeq': lectureOpenSeq},
        success: function (data) {
            if (data.conWidth == 0) {
                conWidth = 1024;
            } else {
                conWidth = data.conWidth;
            }

            if (data.conHeight == 0) {
                conHeight = 724;
            } else {
                conHeight = data.conHeight;
            }

            if (window.innerWidth < conWidth) {
                conWidth = window.innerWidth;
            }

            if (window.innerHeight < conHeight) {
                conHeight = window.innerHeight;
            }

            if (chapter > 1) {
                prevProgress = data.progress[chapter - 2].progress;
            }

            if (data.attachFile !== null) {
                athFile = data.attachFile;
            }

            if (data.sourceType == 'html5') {
                srcUrl = data.progress[chapter - 1].chapterPath;
            } else if (data.sourceType == 'mp4') {
                srcUrl = data.progress[chapter - 1].chapterMobilePath;
                var temp = srcUrl.split('/');
                srcUrl = '/'+temp.filter( (t) => ![0, 1, 2].includes(temp.indexOf(t))).join('/');
            }
            // 환급 과정 수강 시간 및 일일 제한
            if (data.serviceType == '1' || data.serviceType == '2') {
                progressCheckTime = data.progress[chapter - 1].chapterTime;
                nowTime = data.nowTime;

                $.each(data.progress, function () {
                    if (this.endTime != null && nowTime.substr(5, 5) === this.endTime.substr(5, 5)) {
                        studyCount++;
                        if (studyCount == 8) {
                            dailyMaxChapter = this.chapter;
                        }
                    }
                })
            } else if (contentsCode == 'B9EIDC') {
                progressCheckTime = data.progress[chapter - 1].chapterTime;
            } else {
                progressCheckTime = data.progressCheckTime;
            }

            totalTime = Number(data.progress[chapter - 1].totalTime);
            result = {
                lectureStart: data.lectureStart,
                contentsUrl: data.progress[chapter - 1].player + srcUrl,
                mobileUrl: data.progress[chapter - 1].chapterMobilePath,
                chapterSize: data.progress[chapter - 1].chapterMobileSize,
                contentsName: data.contentsName,
                chapterName: data.progress[chapter - 1].chapterName,
                contentsCode: contentsCode,
                lectureOpenSeq: lectureOpenSeq,
                nowPageUrl: data.progress[chapter - 1].lastPage ?? srcUrl,
                conWidth: conWidth,
                conHeight: conHeight,
                progressCheckTime: progressCheckTime,
                serviceType: data.serviceType,
                chapter: chapter,
                prevProgress: prevProgress,
                dailyMaxChapter: dailyMaxChapter,
                professor: data.professor,
                goal: data.progress[chapter - 1].goal,
                attachFile: athFile,
                content: data.progress[chapter - 1].content,
                sourceType: data.sourceType,
                serverLocation: data.progress[chapter - 1].serverLocation,
                autoplay: data.autoplay
            }
        }
    })
    // Object.freeze(result); // 객체 할당 후 수정 방지
    // nowPageUrl 변경됨 - 이어보기 기능을 위해
    console.log(result);
    return result;
}

async function studyModal(obj, chapter) { // 모달 창 오픈
    var runningForm = '';
    if (typeof (obj) == 'object') {
        runningForm = $(obj).parents('form');
    } else {
        runningForm = $('form.lectureForm' + obj);
    }

    let seq = runningForm[0].className.match(/\d/g).join('')

    // 진도율 관련 상태값 변경은 차후 진행
    let response = await fetch(`/api/apiStudyRoom.php?seq=${seq}`)
    let contentsSummary = await response.json()
    contentsSummary = contentsSummary.study[0]

    let {progress, nowChapter} = contentsSummary
    let currChapter = document.querySelector(`#currentChapter${seq}`)?.innerText || 999

    if (currChapter < chapter) {
        document.querySelector(`#currentChapter${seq}`).innerText = chapter
    }

    // progress : 50

    let checkCode = runningForm.children('input[name="contentsCode"]').val()
    let checkOpenSeq = runningForm.children('input[name="lectureOpenSeq"]').val()

    contentsInfo = await getContentsInfo(checkCode, checkOpenSeq, chapter); // 콘텐츠 정보 가져옴

    if (Number(contentsInfo.prevProgress) != 100) { // 이전 차시 진도율 100%
        alert(`${chapter - 1}차시 진도율 100%를 채워주세요.`);
        return false;
    }

    if (contentsInfo.serviceType == '1' || contentsInfo.serviceType == '2') {
        if (Number(contentsInfo.dailyMaxChapter) != 0 && Number(chapter) > Number(contentsInfo.dailyMaxChapter)) { // 환급 일일 수강 제한
            alert('직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.');
            return false;
        }

        if (Number(chapter) % 8 == 1) { //OTP 인증
            openMotp('study', runningForm[0].className);
            return false;
        }
    }

    openStudyDiv(runningForm[0].className);
}

function movePage(flag, chapterSize) {
    let frame = document.getElementById("frame");
    let url = frame.src;
    let urlArr = url.split("/");
    let contentUrl = urlArr.pop();
    let frontUrl = url.replace(contentUrl, '');
    let contentsPages = contentUrl.split('.')[0];
    let extension = contentUrl.split('.')[1]
    let page = '';
    let chapter = '';
    let type = 'short';

    // 파일명 01_01, 01_02, ~ 10_01, 10_02 경우
    // type: underbar
    if (contentsPages.match(/_/)) {
        type = 'underbar';
        chapter = contentsPages.split("_")[0];
        page = contentsPages.split("_")[1];
    }


    if (Number.isInteger(Number(contentsPages))) {
        // 파일명 0101, 0102 ~ 1101, 1102의 경우
        // type: long
        if (contentsPages.length == 4) {
            type = 'long';
            chapter = contentsPages.slice(-2);
            page = contentsPages.slice(-4, -2);
        }

        // 파일명 10001, 10002 ~ 10101, 13002의 경우
        // type: long
        if (contentsPages.length == 5) {
            type = 'long';
            chapter = contentsPages.slice(-3);
            page = contentsPages.slice(-5, -2);
        }

        // 파일명 01, 02  ~ 10의 경우
        // type: short
        if (contentsPages.length == 2) {
            type = 'short';
            page = contentsPages;
        }
    }

    if (page == '') {
        var contentsPagesLength = contentsPages.length
        page = parseInt(contentsPages)
    }

    // N : 다음 페이지, P : 이전 페이지
    if (flag == 'N') {
        page = Number(page) + 1;
    } else {
        page = Number(page) - 1;
    }

    if (Number(page) == 0) {
        alert("첫 페이지 입니다.");
        return;
    }

    if (Number(page) > chapterSize) {
        alert("마지막 페이지 입니다.");
        return;
    }


    // if (String(page).length < 2) {
    //     page = '0' + page;
    // } 

    if (contentsPagesLength != undefined) {
        page = ('' + page).padStart(contentsPagesLength, '0')
    } else if (String(page).length < 2) {
        page = '0' + page;
    }


    switch (type) {
        case 'underbar':
            frame.src = frontUrl + chapter + '_' + page + '.' + extension;
            break;

        default:
            frame.src = frontUrl + chapter + page + '.' + extension;
            break;
    }
}

//좋아요 버튼
function likeAct(contentsCode, chapter) {

    $.ajax({
        type: 'POST',
        url: '../api/apiLike.php',
        data: 'contentsCode=' + contentsCode + '&chapter=' + chapter,
        dataType: 'json',
        success: function (data) {
            if (data.result == 'success' && data.like != '') {
                $('#heart-shape-' + chapter).html(data.like == 'Y' ? '<img src="/images/global/like.png" style="width:20px;margin-top:0px">' : data.like == 'N' ? '<img src="/images/global/like_no.png" style="width:20px;margin-top:0px">' : '<img src="/images/global/like_no.png" style="width:20px;margin-top:0px">');
                //$('#like-count-'+chapter).text(data == 'Y' ? likeCount+1 : data == 'N' ? likeCount-1 : likeCount-1);
                $('#like-count-' + chapter).text(data.likeCount);
            } else {
                alert('실패하였습니다.');
            }
        }
    })

}

function disableContextMenu(dom) {
    dom.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

function handleCanplayVideo(dom) {
    dom.play();
    frameLoad();
    document.querySelector('#chapterPage').innerHTML = '진도 페이지 ' + parseInt(dom.src.slice(-6, -4))
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
                    ajaxAct();
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

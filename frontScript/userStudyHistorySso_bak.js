var useApi = '../api/apiStudyHistory.php';
var chapterApi = '../api/apiStudyChapter.php';
var studySeq = '';
var contentsCode = '';
var lectureOpenSeq = '';
var userID = '';

function listAct() {
    $('#contentsArea').html('<ul></ul>');
    ajaxAct();
}

function ajaxAct() {
    var listAjax = $.get(useApi, function (data) {
        var totalCount = data.totalCount;
        var totalScore = '';
        var passOK = '';
        var lists = '';
        if (totalCount != 0) {
            //180608 한상민(추천과정)
            /*
            if(data.recommendTotalCount !=0){
                lists += '<li style="background:none; border:none; padding:0; margin:0;"><div class="recommend">';
                lists += '<h1><img src="../images/study/img_history01.png" alt="다음과정을 추천해드립니다."></h1>';
                lists += '<ul class="recommend_view">';
                for(var a=0; a<2; a++){
                    lists += '<li>';
                    lists += '<a href="#" onclick="window.open(\'http://modulearning.kr/lecture/?seq='+data.recommend[a].seq+'\')">';
                    lists += '<img src="../attach/contents/'+data.recommend[a].previewImage+'" alt="'+data.recommend[a].contentsName+'" style="width:136px; height:90px;">';
                    lists += '<h1>'+data.recommend[a].contentsName+'</h1>';
                    lists += '</a>';
                    lists += '</li>';
                }
                lists += '</ul>';
                lists += '</div></li>';
            }
            */

            $.each(data.study, function () {
                lists += '<li class="list' + this.seq + '">';
                var endDate = this.lectureEnd.split('-');

                if (this.serviceType != 8) {
                    lists += '<div class="summuryArea" onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')">';
                } else {
                    lists += '<div class="summuryArea" onclick="joinLMS(\'' + this.seq + '\',\'history\')">';
                }
                lists += '<ul>';

                if (this.totalScore == null) {
                    totalScore = '0점';
                } else {
                    totalScore = this.totalScore + '점';
                }
                if (this.resultView == 'Y' || (this.serviceType == '1' || this.serviceType == '3' || this.serviceType == '5')) {
                    if (this.passOK == 'Y') {
                        if (this.serviceType != 8) {
                            // passOK = '<img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" />';
                            passOK = '<img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:6px 15px;" />';
                        }
                    } else {
                        passOK = '<strong class="red" style="font-size:15px;">미수료</strong><br/><button type="button" onClick="alert(\'미수료로 인한 재수강 문의는 학습자 회사 내부 교육담당자에게 확인 부탁드립니다.\');">미수료문의</button>';
                    }
                } else {
                    var end = this.lectureEnd.split('-');
                    passOK = '<strong class="red" style="font-size:15px;">채점중</strong><br/><button type="button" onClick="alert(\'결과보기는 학습종료일(' + end[1] + '월' + end[2] + '일)이후 1주일 이내에 가능합니다.\');">점수확인</button>'
                    totalScore = '채점중';
                }
                if (this.serviceType == 1 || this.serviceType == 9 || this.serviceType == 5) { // 환급 또는 테스트과정인 경우
                    lists += '<li class="passOK"><h1>수료여부</h1>' + passOK + '</li>';
                    //lists += '<li><h1>복습가능일</h1><strong>'+this.leftDate+'</strong>일</li>';
                    if (this.companyCode == '5088213174') {
                        lists += '<li class="smallText"><h1>진도율</h1><strong>' + this.progress + '</strong>%</li>';
                    } else {
                        lists += '<li class="smallText"><h1>점수/진도율</h1><strong>' + totalScore + '</strong>/ <br /><strong>' + this.progress + '</strong>%</li>';
                    }
                    lists += '<li><h1>수강후기</h1><button type="button" class="epilogue" onClick="reviewPop(\'' + this.contentsCode + '\')">작성하기</button></li>';
                } else {
                    //if(this.progress > 79) {  // 비환급 과정인 경우 진도율이 80%이상이면 수료
                    if (this.passOK == 'Y') {  // 비환급 과정인 경우 진도율이 80%이상이면 수료
                        if (this.contentsCode == 'TPW1H0') { // 2018-10-01 김재욱 추가 (장애인 인식 과정 수료증 구분)
                            // passOK = '<img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ',\'disability\');" style="width:71px; height:60px; margin:9px 15px;" />';
                            passOK = '<img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:9px 15px;" />';
                        } else {
                            if (this.serviceType == 8) {
                                passOK = '<img src="/images/study/img_success.png" style="width:71px; height:60px; margin:9px 15px;" />';
                            } else {
                                // passOK = '<img src="/images/study/img_success.png" onclick="printPop(' + this.seq + ');" style="width:71px; height:60px; margin:9px 15px;" />';
                                passOK = '<img src="/images/study/img_success.png" onclick="certificateFilter(' + this.seq + ');" style="width:71px; height:60px; margin:9px 15px;" />';
                            }
                        }
                    } else {
                        passOK = '<strong class="red" style="font-size:15px;">미수료</strong>';
                    }
                    lists += '<li class="passOK"><h1>수료여부</h1>' + passOK + '</li>';
                    lists += '<li><h1>최종진도율</h1><strong>' + this.progress + '</strong>%</li>';
                    lists += '<li><h1>수강후기</h1><button type="button" class="epilogue" onClick="reviewPop(\'' + this.contentsCode + '\')">작성하기</button></li>';
                    //lists += '<li><h1>복습가능일</h1><strong>'+this.leftDate+'</strong>일</li>';
                }
                lists += '</ul>';
                lists += '<div></div>';
                lists += '<img src="' + this.previewImageURL + this.previewImage + '" alt="강의 이미지" />';

                if (this.contentsName.length > 25) {
                    if (this.serviceType != 8) {
                        lists += '<h1 style="font-size:14px;" onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')"><span>' + this.contentsName + '</span></h1><br />';
                    } else {
                        lists += '<h1 style="font-size:14px;" onclick="joinLMS(\'' + this.seq + '\',\'history\')"><span>' + this.contentsName + '</span></h1><br />';
                    }
                } else {
                    if (this.serviceType != 8) {
                        lists += '<h1 onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')"><span>' + this.contentsName + '</span></h1><br />';
                    } else {
                        lists += '<h1 onclick="joinLMS(\'' + this.seq + '\',\'history\')"><span>' + this.contentsName + '</span></h1><br />';
                    }
                }
                lists += '<h2>수강기간 : ' + this.lectureStart + ' ~ ' + this.lectureEnd + '&nbsp;/&nbsp;복습기간 : ' + this.lectureReStudy + '까지</h2><br />';
                lists += '<h3>첨삭강사 : ' + this.tutorName
                if (this.mobile == 'Y') {
                    lists += '<strong>모바일 학습 가능</strong>'
                }
                lists += '<strong class="score" onClick="alert(\'점수 확인은 학습종료일(' + endDate[1] + '월 ' + endDate[2] + '일) 이후 1주일 이내에 가능합니다\');">점수확인안내</strong>';
                lists += '</h3>';
                lists += '</div>';
                if (this.serviceType != 8) {
                    lists += '<button type="button" onclick="viewStudyDetail(' + this.seq + ',\'' + this.contentsCode + '\',' + this.lectureOpenSeq + ')"></button>';
                } else {
                    lists += '<button type="button" onclick="joinLMS(\'' + this.seq + '\',\'history\')"></button>';
                }
                lists += '</li>';
            })
        } else {
            lists += '<li class="noList">강의가 없습니다.</li>';
        }
        $('#contentsArea > ul').html(lists);
        //console.log(lists)
        //$('#titleArea h3 strong.blue').html(totalCount);
        if (totalCount > 0) {
            $('#titleArea h3 span').html('총 <strong class="blue">' + totalCount + '</strong>개 과정의 학습이 종료되었습니다.');
        } else {
            $('#titleArea h3 span').html('학습이 종료된 과정이 없습니다.');
        }
    })
}

function viewStudyDetail(studySeq, contentsCode, lectureOpenSeq, renew) {
    studySeq = studySeq ? studySeq : '';
    contentsCode = contentsCode ? contentsCode : '';
    lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
    var studyBlock = $('.list' + studySeq);

    if (studyBlock.has('table').length != 0) {
        studyBlock.children('ul,table').remove();
        studyBlock.removeClass('openClass');
    } else {
        var studyDetails = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
            var totalCount = data.totalCount;
            var ContentsCode = data.contentsCode;
            var lectureOpenSeq = data.lectureOpenSeq;
            var studyDetails = '';
            var useMidTest = data.midStatus;
            var useFinTest = data.testStatus;
            var useReport = data.reportStatus;
            var today = new Date(data.nowTime);
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
            if (totalCount != 0) {

                /*수료기준, 평가응시항목 출력 */
                if (data.serviceType == 1 || data.serviceType == 9 || data.serviceType == 5) {
                    studyDetails += '<table class="passCheck"><tr>';
                    studyDetails += '<td colspan="6" class="title">수료기준</td>'
                    studyDetails += '</tr>';
                    studyDetails += '<th>수강정원</th>';
                    studyDetails += '<th>총 진도율</th>';
                    studyDetails += '<th>중간평가</th>';
                    studyDetails += '<th>최종평가</th>';
                    studyDetails += '<th>과제</th>';
                    studyDetails += '</tr><tr>';
                    studyDetails += '<td rowspan="2"><strong>' + data.limited + '</strong>명</td>';
                    studyDetails += '<td rowspan="2"><strong>' + data.passProgress + '</strong>% 이상</td>';
                    studyDetails += '<td>총&nbsp;<strong>';
                    if (this.totalPassMid != 0) {
                        studyDetails += data.totalPassMid + '</strong>점 / <strong>' + data.midRate + '</strong>% 반영';
                    }
                    studyDetails += '</td>';
                    studyDetails += '<td>총&nbsp;<strong>';
                    if (this.totalPassTest != 0) {
                        studyDetails += data.totalPassTest + '</strong>점 / <strong>' + data.testRate + '</strong>% 반영';
                    }
                    studyDetails += '</td>';
                    studyDetails += '<td>총&nbsp;<strong>';
                    if (this.totalPassReport != 0) {
                        studyDetails += data.totalPassReport + '</strong>점 / <strong>' + data.reportRate + '</strong>% 반영';
                    }
                    studyDetails += '</td>';
                    studyDetails += '</tr><tr>';
                    //studyDetails += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상</td>';
                    if (data.totalPassReport != 0) {
                        //studyDetails += '<td colspan="3" style="padding:5px 0 ">반영된 평가 합산  <strong>'+data.passScore+'</strong>점 이상 <br>반영된 평가, 과제 점수 합산 <strong>'+data.passScore+'</strong>점 이상 </td>';
                        studyDetails += '<td colspan="3" style="padding:5px 0 ">반영된 평가 합산  <strong>' + data.passScore + '</strong>점 이상';
                    } else {
                        studyDetails += '<td colspan="3" style="padding:5px 0 ">반영된 평가, 과제 점수 합산  <strong>' + data.passScore + '</strong>점 이상 </td>';
                    }
                    studyDetails += '</tr></table>';

                    //평가관련
                    studyDetails += '<ul>';

                    //중간평가
                    var midStatus = '';
                    var lectureEndDate = data.lectureEnd.split('-');
                    if (data.midStatus == null) {
                        midStatus = '<strong>평가 없음</strong>'
                        studyDetails += '<li class="middleTest" onClick="alert(\'평가가 없습니다.\')"><h1>중간평가</h1>';
                        studyDetails += '<strong class="red">평가없음</strong>'
                        studyDetails += '<br /><span>평가가 없는 과정</span>';
                        studyDetails += '</li>';
                    } else {
                        var midLink = '';
                        var midComment = '';

                        if (data.midStatus == 'Y' || data.midStatus == 'C' || data.midStatus == 'V') {
                            if (data.midStatus == 'Y' || data.midStatus == 'V') {
                                midLink = `onClick="alert('결과보기는 학습종료일(${lectureEndDate[1]}월 ${lectureEndDate[2]}일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.')"`;
                                midStatus = '<strong class="red">응시완료</strong><br />채점 전';
                            } else if (data.midStatus == 'C') {
                                if (data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
                                    midLink = 'onClick="resultAct(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'mid\')"';
                                    if (data.midRate == 100) { // 2018-06-14 김재욱  중간,최종,과제 반영점수 추가
                                        midStatus = '<strong class="red">' + data.midScore + '</strong>점<br />반영점수 : ' + data.midScore + '점';
                                    } else {
                                        midStatus = '<strong class="red">' + data.midScore + '</strong>점<br />반영점수 : ' + data.conversionMid + '점';
                                    }
                                } else {
                                    midLink = `onClick="alert('결과보기는 학습종료일(${lectureEndDate[1]}월 ${lectureEndDate[2]}일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.')"`;
                                    midStatus = '<strong class="blue">응시 완료</strong><br />채점 전';
                                }
                            }
                        } else if (data.midStatus == 'N') {
                            midStatus = '<strong class="red">미응시</strong>'
                            midComment = '<br /><span>응시기록 없음</span>';
                        }
                        studyDetails += '<li class="middleTest" ' + midLink + '><h1>중간평가</h1>';
                        studyDetails += midStatus;
                        studyDetails += midComment;
                        studyDetails += '</li>';
                    }

                    //최종평가
                    var testStatus = '';

                    if (data.testStatus == null) {
                        testStatus = '<strong>평가 없음</strong>'
                        studyDetails += '<li class="middleTest" onClick="alert(\'평가가 없습니다.\')"><h1>최종평가</h1>';
                        studyDetails += '<strong class="red">평가없음</strong>'
                        studyDetails += '<br /><span>평가가 없는 과정</span>';
                        studyDetails += '</li>';
                    } else {
                        var testLink = '';
                        var testComment = '';
                        if (data.testStatus == 'Y' || data.testStatus == 'C' || data.testStatus == 'V') {
                            if (data.testStatus == 'Y' || data.testStatus == 'V') {
                                testStatus = '<strong class="blue">응시 완료</strong><br />채점 전'
                            } else if (data.testStatus == 'C') {
                                //if (data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
                                    testLink = 'onClick="resultAct(\'test\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'final\')"';
                                    if (data.testRate == 100) {
                                        testStatus = '<strong class="red">' + data.testScore + '</strong>점<br />반영점수 : ' + data.testScore + '점';
                                    } else {
                                        testStatus = '<strong class="red">' + data.testScore + '</strong>점<br />반영점수 : ' + data.conversionTest + '점';
                                    }
                                //} else {
                                //    midLink = `onClick="alert('결과보기는 학습종료일('${lectureEndDate[1]}'월 '${lectureEndDate[2]}'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.')"`;
                                //    testStatus = '<strong class="blue">응시 완료</strong><br />채점 전';
                                //}
                            }
                        } else if (data.testStatus == 'N') {
                            testStatus = '<strong class="red">미응시</strong>'
                            testComment = '<br /><span>응시기록 없음</span>';
                        }

                        //최종평가
                        studyDetails += '<li class="lastTest" ' + testLink + '><h1>최종평가</h1>';
                        studyDetails += testStatus;
                        studyDetails += testComment;
                        studyDetails += '</li>';
                    }

                    //과제제출
                    var reportStatus = '';
                    var reportLink = '';
                    var reportComment = '';
                    if (data.reportStatus == null) {
                        reportStatus = '<strong>과제 없음</strong>'
                        studyDetails += '<li class="report" onClick="alert(\'과제가 없습니다.\')"><h1>과제 제출</h1>';
                        studyDetails += '<strong class="red">과제 없음</strong>'
                        studyDetails += '<br /><span>과제가 없는 과정</span>';
                        studyDetails += '</li>';
                    } else {
                        if (data.reportStatus == 'Y') {
                            reportStatus = '<strong class="red">응시완료</strong>';
                            reportComment = '<br /><span>채점 전</span>';

                        } else if (data.reportStatus == 'C') {
                            if (data.resultView == 'Y') { // 채점 완료 상태에서만 결과 보여줌
                                reportLink = 'onClick="resultAct(\'report\',\'' + contentsCode + '\',' + lectureOpenSeq + ',\'\')"';
                                //console.log(lectureOpenSeq);
                                reportStatus = '<strong class="red">' + data.reportScore + '</strong>점';
                                if (data.reportCopy == 'Y') {
                                    reportStatus += ' - 모사답안';
                                }
                                if (data.reportRate == 100) {
                                    reportComment = '<br />반영점수 : ' + data.reportScore + '점';
                                } else {
                                    reportComment = '<br />반영점수 : ' + data.conversionReport + '점';
                                }
                            } else {
                                midLink = `onClick="alert('결과보기는 학습종료일('${lectureEndDate[1]}'월 '${lectureEndDate[2]}'일) 이후 1주일 이내에 가능하며, 휴대전화로 점수확인 문자가 발송됩니다.')"`;
                                reportStatus = '<strong class="blue">제출 완료</strong>';
                                reportComment = '<br /><span>채점 전</span>';
                            }

                        } else if (data.reportStatus == 'N') {
                            reportStatus = '<strong class="red">미제출</strong>'
                            reportComment = '<br /><span>제출기록 없음</span>';
                        }
                        studyDetails += '<li class="report" ' + reportLink + '><h1>과제 제출</h1>';
                        studyDetails += reportStatus;
                        studyDetails += reportComment;
                        studyDetails += '</li>';
                    }
                    studyDetails += '</ul>';


                } else {
                    //studyDetails += '<br />';
                }

                studyDetails += '<table>';
                studyDetails += '<colgroup><col width="90px" /><col width="*" /><col width="90px" /><col width="92px" /></colgroup>';
                //강의 활성용 오늘날짜 호출
                $.each(data.progress, function () {

                    if (totalCount != 0) {
                        //if(this.chapter <= 99){
                        studyDetails += '<tr>';
                        studyDetails += '<td>' + this.chapter + '차시</td>';
                        studyDetails += '<th><strong>' + this.chapterName + '</strong><br />';
                        if (this.endTime != null) {
                            studyDetails += '교육이수 시간 : ' + this.endTime + '<br />';
                            studyDetails += '접속아이피 : ' + this.studyIP + '</th>';
                        }
                        studyDetails += '<td>' + this.progress + '%</td>';
                        studyDetails += '<td>';
                        if (data.nowTime.substr(0, 10) > data.lectureReStudy) {
                            studyDetails += '<button type="button" title="수강하기" onclick="alert(\'복습기간이 지났습니다.\')">복습하기</button>';
                        } else {
                            //console.log(lectureOpenSeq);
                            studyDetails += '<button type="button" title="수강하기" onclick="studyPop(\'' + this.player + '\',\'' + ContentsCode + '\',\'' + this.chapter + '\',\'' + lectureOpenSeq + '\')">복습하기</button>';
                        }
                        studyDetails += '</td>';
                        studyDetails += '</tr>';
                        //}
                    } else {
                        studyDetails += '<tr colspan="6"><td>교육과정이 없습니다.</td></tr>';
                    }
                })
                studyDetails += '</table>';
                studyBlock.addClass('openClass');
                studyBlock.children('div').after(studyDetails);

                //특수차시
                var prologue = ''
                var epilogue = ''

                var preTable = '<table><colgroup><col width="90px" /><col width="*" /><col width="160px" /><col width="92px" /></colgroup><tr>';
                var apTable = '</tr></table>'
                $.each(data.progress, function () {
                    if (this.chapter >= 100 && this.chapter <= 109) {
                        prologue += '<tr>';
                        prologue += '<td>-</td>';
                        prologue += '<th><strong>' + this.chapterName + '</strong><br />';
                        prologue += '<td class="Left"><strong class="red">진도율에 포함되지<br /> 않는 차시입니다.</strong></td>';
                        prologue += '<td>';
                        prologue += '<button type="button" title="수강하기" onclick="studyPop(\'' + data.progress[i].player + '\',\'' + ContentsCode + '\',\'' + this.chapter + '\',\'' + lectureOpenSeq + '\')"><img src="../images/study/btn_study.png" /></button>';
                        prologue += '</td>';
                        prologue += '</tr>';
                    } else if (this.chapter >= 110 && this.chapter <= 119) {
                        epilogue += '<tr>';
                        epilogue += '<td>-</td>';
                        epilogue += '<th><strong>' + this.chapterName + '</strong><br />';
                        epilogue += '<td class="Left"><strong class="red">진도율에 포함되지<br /> 않는 차시입니다.</strong></td>';
                        epilogue += '<td>';
                        epilogue += '<button type="button" title="수강하기" onclick="studyPop(\'' + data.progress[i].player + '\',\'' + ContentsCode + '\',\'' + this.chapter + ',\'' + lectureOpenSeq + '\')"><img src="../images/study/btn_study.png" /></button>';
                        epilogue += '</td>';
                        epilogue += '</tr>';
                    }
                })
                if (prologue != '') {
                    studyBlock.children('ul').after(preTable + prologue + apTable);
                }
                if (epilogue != '') {
                    studyBlock.children('button').before(preTable + epilogue + apTable);
                }
            }
        })
    }
}

function studyPop(player, contentsCode, chapter, lectureOpenSeq) {
    popupAddress = player + '/player/popupConfirm.php?contentsCode=' + contentsCode + '&chapter=' + chapter + '&lectureOpenSeq=' + lectureOpenSeq;
    window.open(popupAddress, "학습창", "top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "esangStudy")
}

function resultAct(types, contentsCode, lectureOpenSeq, testType) {
    popupAddress = 'popupResult.php?types=' + types + '&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq + '&testType=' + testType;
    window.open(popupAddress, "결과보기", "menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "previewContents")
}

function printPop(popseq, type) {
    $.get(useApi, {'seq': popseq, 'print': 'Y'}, function (data) { // 수강연동 수료증 출력 가능하도록 추가
//		if(data.study[0].company[0].inputDateS || (data.study[0].serviceType == 3 && data.study[0].companyID == 'seegene') || data.study[0].serviceType == 3 || data.study[0].serviceType == 8){	//2017-07-17 이응민 수정
        if (data.study[0].company[0].inputDateS || (data.study[0].serviceType == 3 && data.study[0].companyID == 'seegene') || data.study[0].serviceType == 3 || data.study[0].serviceType == 5) {
            if (data.study[0].companyID == 'yumc') {
                popupAddress = '../study/print_yumc.html?seq=' + popseq;
                window.open(popupAddress, "결과보기", "width=712, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")
            } else if (type == 'disability') {
                popupAddress = '../study/print_disability.html?seq=' + popseq;
                window.open(popupAddress, "결과보기", "width=740, height=800, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")
            } else {
                popupAddress = 'print.html?seq=' + popseq;
                window.open(popupAddress, "결과보기", "width=712, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")
            }
        } else if (data.study[0].serviceType == 1) {
            popupAddress = 'print.html?seq=' + popseq;
            window.open(popupAddress, "결과보기", "width=712, height=700, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "printPop")
        } else {
            alert('수강 마감(점수확인 문자 발송) 이후 3~4일 이내에 수료증 출력이 가능합니다.');
        }
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
    window.open(`print.html?${param}`, '_blank');
}

function reviewPop(contentsCode) {
    popupAddress = '../study/review.html?contentsCode=' + contentsCode;
    window.open(popupAddress, "결과보기", "top=0, left=0, width=480, height=500, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "reviewPop")
}

//LMS 연동
function joinLMS(seqs, type) {
    setSSO = window.open('http://kosafe.or.kr/api/apiSSO.php', 'studyJoin', 'top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no', '학습연동')
    $.get(useApi, {'seq': seqs}, function (data) {
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('.list' + seqs);
        lists += '<form class="joinForm" action="http://kosafe.or.kr/api/apiSSO.php" method="post" target="studyJoin">';
        lists += '<input type="hidden" name="ssoSite" value="kiraedu">';
        lists += '<input type="hidden" name="memID" value="' + data.study[0].userID + '">';
        lists += '<input type="hidden" name="type" value="' + type + '">';
        lists += '<input type="hidden" name="lectureStart" value="' + data.study[0].lectureStart + '">';
        lists += '<input type="hidden" name="lectureEnd" value="' + data.study[0].lectureEnd + '">';
        lists += '<input type="hidden" name="ssoCode" value="' + data.study[0].ssoCode + '">';
        lists += '</form>'
        studyBlock.children('div').after(lists);
        studyBlock.children('form.joinForm').submit();
        progressCheck(seqs, data.study[0].contentsCode, data.study[0].lectureOpenSeq, 0);
        setSSO.focus();
        studyBlock.children('form.joinForm').remove();
    })
}

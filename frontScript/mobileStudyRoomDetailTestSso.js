$(document).ready(function () {
    ajaxAct();
})

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}


function ajaxAct() {
    var listAjax = $.get(chapterApi, 'contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq, function (data) {
        var totalCount = data.totalCount;
        var lists = '';
        var Sid = data.contentsCode + data.lectureStart.substr(2, 2) + data.lectureStart.substr(5, 2) + data.lectureStart.substr(8, 2) + data.lectureEnd.substr(8, 2);
        var lectureOpenSeq = data.lectureOpenSeq;
        var contentsCode = data.contentsCode;
        var mobileSourceType = data.mobileSourceType;
        var useMidTest = data.midStatus;
        var useFinTest = data.testStatus;
        var useReport = data.reportStatus;
        var lastPage = data.lastPage;
        var mobileLastPage = data.mobileLastPage;
        var midTerm = data.midTestChapter;
        var progressCheck = data.progressCheck;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var serviceType = data.serviceType;

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        if (totalCount != 0) {
            var certPassQuery = (((data.serviceType == '1' || data.serviceType == '2') && (data.certPass == 'Y')));
            if (certPassQuery || data.serviceType == '3' || data.serviceType == '9' || data.serviceType == '5') {
                //강의 활성용 오늘날짜 호출
                var today = new Date(data.nowTime);
                var today2 = data.nowTime;
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
                lists += '<div class="page_title" style="border-radius:5px;">';
                lists += '<h3 class="title">' + data.contentsName + '</h3>';
                lists += '</div>';
                lists += '<ul class="dep_list">';
                lists += '<li class="blt_txt">학습현황</li>';
                lists += '</ul>';
                lists += '<table summary="학습현황" class="tb_style06 mt10">';
                lists += '<colgroup>';
                lists += '<col style="width:80px">';
                lists += '<col style="width:*">';
                lists += '</colgroup>';
                lists += '<tbody>';
                lists += '<tr>';
                lists += '<td class="bold talign_l">학습기간</td>';
                lists += '<td class="talign_l">' + data.lectureStart + '-' + data.lectureEnd + '</td>';
                lists += '</tr> ';
                lists += '<tr>';
                lists += '<td class="bold talign_l">진도율</td>';
                lists += '<td class="talign_l">';
                lists += '<div class="graph_wrap">';
                lists += '<div class="graph_box"> ';
                lists += '<div class="graph_bar" id="graph_bar1" style="width:' + data.totalProgress + '%"></div>';
                lists += '<script type="text/javascript">';
                $(document).ready(function () {
                    $("#graph_bar1").css("width", +"%");
                    $("#graph_bar2").css("width", +"%");
                });
                lists += '</script> ';
                lists += '</div>';
                lists += '<span class="graph_p" id="graph_no1">' + data.totalProgress + '%</span>';
                lists += '</div> ';
                lists += '</td>';
                lists += '</tr>';
                lists += '</tbody>';
                lists += '</table>';
                lists += '<p class="notice" style="font-size:12px; background:#2c3e50; color:#ecf0f1">모바일에서는 <strong style="color:#e67e22;">학습만 가능</strong>합니다.<br>평가는 <strong style="color:#e67e22;">PC로 접속</strong>하여 응시하셔야 합니다.</p>';
                lists += '<ul class="dep_list mt30">';
                lists += '<li class="blt_txt">강의목차</li>';
                lists += '</ul>';
                lists += '<div id="page-reload">';
                lists += '<div>';
                lists += '<a href="javascript:location.href=location.href">새로고침 <img src="../images/mobile/sub/icons-rotation.png"></a>';
                lists += '</div>';
                lists += '</div>';
                for (i = 0; i < totalCount; i++) {
                    lists += '<section class="mypage_classIndex">';
                    lists += '<ul>';
                    lists += '<li>' + data.progress[i].chapter + '차시</li>';
                    lists += '<li>' + data.progress[i].chapterName + '</li>';
                    lists += '<li class="tc_blue">' + data.progress[i].progress + '%</li>';
                    lists += '</ul>';

                    if (data.progress[i].endTime != null) {
                        if (data.progress[i].endTime.substr(0, 10) == today) {
                            todayCount++;
                        }
                    }
                    if (data.progress[i].lastPage == null) {
                        var lastPage = 1;
                    } else {
                        var lastPage = data.progress[i].lastPage;
                    }
                    if (data.progress[i].mobileLastPage == null) {
                        var mobileLastPage = 1;
                    } else {
                        var mobileLastPage = data.progress[i].mobileLastPage;
                    }

                    if (data.serviceType == 1 || data.serviceType == 2 || data.serviceType == 9) {  // 환급 과정일때만 평가 항목 출력
                        if (i == midTerm) {
                            if (data.midStatus != 'Y') {
                                btnUse = 'N'
                            }
                        }


                        if (btnUse == 'Y' && todayCount <= 8) {
                            if (i % 8 == 0 || i == 0) {
                                if (today2 >= '2018-12-14 13:00:00' && today2 <= '2018-12-14 18:00:00') {	//캡차 제외 처리
                                    lists += '<button type="button" class="learn_btn"  onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                } else {
                                    if (data.serviceType == 1 || data.serviceType == 2) {
                                        var motpUser = [];
                                        if (motpUser.includes(loginUserID)) {
                                            lists += '<button type="button" class="learn_btn" onclick="top.location.href=\'hrdMOTP_mobile.php?mobileYN=Y&type=study&chapter=' + data.progress[i].chapter + '&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq + '&studySeq=' + studySeq + '&progressCheck=' + progressCheck + '&mobileSourceType=' + mobileSourceType + '&lectureStart=' + data.lectureStart + '\'">학습하기</button>';
                                        } else {
                                            lists += '<button type="button" class="learn_btn"  onclick="top.location.href=\'hrdOTP_mobile.php?mobileYN=Y&type=study&chapter=' + data.progress[i].chapter + '&contentsCode=' + contentsCode + '&lectureOpenSeq=' + lectureOpenSeq + '&studySeq=' + studySeq + '&progressCheck=' + progressCheck + '&mobileSourceType=' + mobileSourceType + '&lectureStart=' + data.lectureStart + '\'">학습하기</button>';
                                        }
                                        //	studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'\'">';
                                    } else {
                                        lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                    }
                                    //studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'\'">';
                                }
                            } else {
                                if (data.progress[i].progress != 0) {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                } else {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                }
                            }
                        } else {
                            if (i == midTerm) {
                                if (data.midStatus == 'N' && midTerm != 0) { //2017-07-03 서영기
                                    lists += '<button type="button" class="learn_btn" onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">학습하기</button>';
                                } else {
                                    if (data.progress[i].progress != 0) {
                                        lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                    } else {
                                        lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                    }
                                }
                            } else {
                                if (todayCount >= 8) {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                } else {
                                    if (data.midStatus == 'N') {
                                        lists += '<button type="button" class="learn_btn" onclick="alert(\'중간평가는 총 진도율 50% 이상 응시 가능하므로, 이전 차시 진도율이 100%가 되도록 학습을 해주세요.\')">학습하기</button>';
                                    } else {
                                        lists += '<button type="button" class="learn_btn" onclick="alert(\'이전 차시 진도율이 100% 이상 되도록 학습을 해주세요.\')">학습하기</button>';
                                    }
                                }
                            }
                        }


                    } else if (data.serviceType == 5) {  // 김재욱 비환급 요청 추가
                        if (i == midTerm) {
                            if (data.midStatus != 'Y') {
                                btnUse2 = 'N'
                            }
                            if (data.midStatus == null) {
                                btnUse2 = 'Y'
                            }
                        }
                        if (btnUse2 == 'Y') {
                            if (i > 0) {
                                if (data.progress[i - 1].progress == 100) {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                } else {
                                    lists += '<button type="button" class="learn_btn" onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">학습하기</button>';
                                }
                            } else {
                                if (data.progress[i].progress != 0) {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                } else {
                                    lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                }
                            }

                        } else {
                            if (i == midTerm) {
                                if (data.midStatus == 'N' && midTerm != 0) { //2017-07-03 서영기
                                    lists += '<button type="button" class="learn_btn" onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">학습하기</button>';
                                } else {
                                    if (data.progress[i].progress != 0) {
                                        lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                    } else {
                                        lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                                    }
                                }
                            } else {
                                //if(todayCount >= 8) {
                                //	studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
                                //	studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
                                //} else {
                                if (data.midStatus == 'N') {
                                    lists += '<button type="button" class="learn_btn" onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">학습하기</button>';
                                } else {
                                    lists += '<button type="button" class="learn_btn" onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">학습하기</button>';
                                }
                                //}
                            }
                            if (data.midStatus != 'N' && midTerm != 0) {
                                btnUse2 = 'Y';
                            }
                        }


                    } else {
                        if (i > 0) {
                            if (data.progress[i - 1].progress == 100) {
                                //studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
                                lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                            } else {
                                lists += '<button type="button" class="learn_btn" onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">학습하기</button>';
                            }
                        } else {
                            if (data.progress[i].progress != 0) {
                                lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'check\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                            } else {
                                lists += '<button type="button" class="learn_btn" onclick="studyPlay(\'' + studySeq + '\',\'' + contentsCode + '\',\'' + data.progress[i].chapter + '\',\'' + lectureOpenSeq + '\',\'\',\'' + mobileSourceType + '\',\'' + Sid + '\',\'' + lastPage + '\',\'' + mobileLastPage + '\')">학습하기</button>';
                            }
                        }
                    }
                    lists += '</li>';
                    if (data.progress[i].progress < 100) {
                        btnUse = 'N'
                    } else {
                        if (todayCount >= 8) {
                            btnUse = 'N'
                        } else {
                            btnUse = 'Y'
                        }

                    }
                    lists += '</div>';
                    lists += '</section>';
                }
            } else {
                alert('수강 시 본인인증 절차를 거쳐야 합니다.');
                certMove(lectureOpenSeq, data.lectureStart, contentsCode);
            }

        }
        $('.inner').html(lists);
    })
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, mobileSourceType, Sid, MovePage, Page) {
    var dailyMaxChapter = 0;
    var serType = 0;
    var studyCount = 0;
    $.ajax({
        url: chapterApi,
        type: "GET",
        async: false, //비동기 사용
        data: {'contentsCode': contentsCode, 'lectureOpenSeq': lectureOpenSeq},
        success: function (data) {
            serType = data.serviceType;
            // 환급 과정 수강 시간 및 일일 제한
            if (data.serviceType == 1 || data.serviceType == 2) {
                nowTime = data.nowTime;

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

    if ((serType == '1' || serType == '2') && Number(dailyMaxChapter) != 0 && Number(chapter) > Number(dailyMaxChapter)) { // 환급 일일 수강 제한
        alert('사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.');
        return false;
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
                var linkAddress = 'study_view.php?studySeq=' + studySeq + '&contentsCode=' + contentsCode + '&chapter=' + chapter + '&lectureOpenSeq=' + lectureOpenSeq + '&check=' + check;
                top.location.href = linkAddress;
            }
        }
    })
}

function certMove(lectureOpenSeq, lectureStart, contentsCode) {
    top.location.href = 'mobileCerti.php?lectureOpenSeq=' + lectureOpenSeq + '&lectureStart=' + lectureStart + '&contentsCode=' + contentsCode;
}
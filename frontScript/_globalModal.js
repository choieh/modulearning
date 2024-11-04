var modalMemberApi = '../api/apiMember.php';
var modalMemberB2CApi = '../api/apiMemberB2C.php';
var modalCompanyApi = '../api/apiCompany.php';
var modalCompanyStudyStatsApi = '../api/apiCompanyStudyStats.php';
var modalStudyApi = '../api/apiStudy.php';
var modalProgressApi = '../api/apiProgress.php';
var modalTestResultApi = '../api/apiStudyTestResult.php';
var modalReportResultApi = '../api/apiStudyReportResult.php';
var modalContentsApi = '../api/apiContents.php';
var modalOrderApi = '../api/apiOrder.php';
var modalSurveyApi = loginUserID == 'dhkang' ? '../api/apiSurveyAnswerTest.php' : '../api/apiSurveyAnswer.php';
var modalLoginHistoryApi = '../api/apiLoginHistory.php';	//로그인 정보 api
var modalCertApi = '../api/apiCert.php';
var modalremarkApi = '../api/apiMonitoringRemark.php';
var modalHrdApi = '../api/apiContentsHrd.php';
var modalApplicationApi = '../api/apiApplication.php';
var studyCenterPopupApi = '../api/apiStudyCenterPopup.php';
var modalDataCheck = '../api/apiDataCheckView.php';
var modalCsApi = '../api/apiCS.php';
var modalMemberStudyInOrder = '../api/apiMemberStudyInOrder.php';
let modalExcludeAuth = '../api/apiExcludeAuthS5.php';
var lectureStartR = '';
var lecutureEndR = '';
var contentsCodeR = '';
var serviceTypeR = '';
var userIDR = '';
var memoR = '';

function globalModalActMore(types, modalSeq, eachID, option, option2) {
    modalClose();
    globalModalAct(types, modalSeq, eachID, option, option2);
}

function globalModalAct(types, modalSeq, eachID, option, option2) {
    //상담이력 저장 후 재조회를 위해서 담아두기
    typesRefresh = types;
    modalSeqRefresh = modalSeq;
    eachIDRefresh = eachID;
    optionRefresh = option;

    var csComboWrite = '';

    var modalWrite = ''
    modalWrite += '<div id="modal">';

    //회원정보 조회
    if (types == 'memberView') {
        var loginTime = '';
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>회원정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        $.get(modalMemberApi, {'seq': modalSeq, 'userID': eachID}, function (data) {
            $.each(data.member, function () {
                modalWrite += '<div>';
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>기본정보</h1>';
                //수험생정보
                modalWrite += '<ul>';

                modalWrite += '<li>';
                //이름
                modalWrite += '<div class="halfDiv"><h1>이름</h1>';
                modalWrite += this.userName;
                modalWrite += '/ ID : ' + this.userID;
				modalWrite += '</div>';
								                
                //생년월일,성별
                modalWrite += '<div class="halfDiv"><h1>생년월일/성별</h1>';
                modalWrite += this.birth + '&nbsp;/&nbsp;';

                switch (this.sex) {
                    case "9":
                    case "1":
                    case "3":
                    case "5":
                    case "7":
                        modalWrite += '남';
                        break;
                    case "0":
                    case "2":
                    case "4":
                    case "6":
                    case "8":
                        modalWrite += '여';
                        break;
                }

                modalWrite += '</div>';


                modalWrite += '</li>';

				if (this.ssoName) {
					modalWrite += '<li><h1>수강연동</h1><div class="normalText">';
					modalWrite += '<span style="color:blue">'+this.ssoName+'</span>';
					modalWrite += '</div>';
					modalWrite += '</li>';
				}

                modalWrite += '<li>';
                //최근로그인
                if (this.loginTime == null) {
                    loginTime = '로그인 기록이 없습니다.';
                } else {
                    loginTime = this.loginTime;
                }
                modalWrite += '<div class="halfDiv"><h1>최근로그인</h1>';
                modalWrite += loginTime;
                modalWrite += '</div>';
                //회원가입일
                modalWrite += '<div class="halfDiv"><h1>회원가입일</h1>';
                modalWrite += this.inputDate;
                modalWrite += '</div>';
                modalWrite += '</li>';

                modalWrite += '<li>';
                //휴대폰
                modalWrite += '<div class="halfDiv"><h1>휴대폰</h1>';
                modalWrite += this.mobile01 + '&nbsp;-&nbsp;' + this.mobile02 + '&nbsp;-&nbsp;' + this.mobile03;
                if (this.smsReceive == 'Y') {
                    modalWrite += '&nbsp;(동의)'
                } else {
                    modalWrite += '&nbsp;(거부)'
                }
                modalWrite += '</div>';
                //회원가입일
                modalWrite += '<div class="halfDiv"><h1>이메일</h1>';
                modalWrite += this.email01 + '@' + this.email02;
                if (this.emailReceive == 'Y') {
                    modalWrite += '&nbsp;(동의)'
                } else {
                    modalWrite += '&nbsp;(거부)'
                }
                modalWrite += '</div>';
                modalWrite += '</li>';

                modalWrite += '<li>';
                //훈련생 구분
                modalWrite += '<div class="halfDiv"><h1>훈련생 구분</h1>';
                modalWrite += this.trneeSeName;
                modalWrite += '</div>';
                //비정규직 구분
                modalWrite += '<div class="halfDiv"><h1>비정규직구분</h1>';
                modalWrite += this.IrglbrSeName;
                modalWrite += '</div>';
                modalWrite += '</li>';

                //주민등록번호
                if (loginUserID == 'lksc' || loginUserID == 'kira02' || loginUserID == 'kira05' || loginUserID == 'kira002' || loginUserID == 'kira003' || loginUserID == 'rkdus0620' || loginUserID == 'choi873') {
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv"><h1>주민등록번호</h1>';
                    modalWrite += this.unResno01 + '-' + this.unResno02;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                }

                //주소
                if (this.address01 == null) {
                    var address01 = '';
                } else {
                    var address01 = this.address01;
                }
                if (this.address02 == null) {
                    var address02 = '';
                } else {
                    var address02 = this.address02;
                }
                modalWrite += '<li><h1>주소</h1><div class="normalText">';
                modalWrite += this.zipCode + '&nbsp;)&nbsp;' + address01 + '<br />' + address02;
                modalWrite += '</div>';
                modalWrite += '</li>';
                if (this.memo == null) {
                    var memo = '';
                } else {
                    var memo = this.memo;
                }

                //메모
                if (loginUserLevel < 5) { // 메모 기능
                    modalWrite += '<li><h1>메모</h1><div class="normalText">';
                    modalWrite += memo;
                    modalWrite += '</div></li>';
                }

                modalWrite += '</ul>';

                modalWrite += '<div class="tabMain" id="tabMain" style="width:700px;">';

                modalWrite += '<input type="radio" id="tab1" name="tabs" class="tabRadio" checked> ';
                modalWrite += '<label for="tab1" class="tabLabel">소속정보/상담이력</label>';

                modalWrite += '<input type="radio" id="tab2" name="tabs" class="tabRadio"> ';
                modalWrite += '<label for="tab2" class="tabLabel">수강정보</label>';

                modalWrite += '<input type="radio" id="tab3" name="tabs" class="tabRadio"> ';
                modalWrite += '<label for="tab3" class="tabLabel">교육순서해제</label>';

                modalWrite += '<input type="radio" id="tab4" name="tabs" class="tabRadio"> ';
                modalWrite += '<label for="tab4" class="tabLabel">본인인증(최근100건)</label>';

                modalWrite += '<input type="radio" id="tab5" name="tabs" class="tabRadio"> ';
                modalWrite += '<label for="tab5" class="tabLabel">로그인이력(최근100건)</label>';


                //수험생정보
                modalWrite += '<section id="content1" class="tabSection">';
                //modalWrite +='<h1>소속정보</h1>';
                //modalWrite +='<ul>';
                modalWrite += '<ul id="infoUl01">';
                if (this.company.companyCode == 0000000000) {
                    modalWrite += '<li style="text-align:center">일반회원입니다.</li>';
                } else {
                    //회사명 사업자번호
                    modalWrite += '<li>';
                    modalWrite += '<h1>회사명 / ID</h1>';
                    modalWrite += this.company.companyName + '&nbsp;/&nbsp;' + this.company.companyID;
                    modalWrite += '</li>';

                    modalWrite += '<li><div class="halfDiv">';
                    modalWrite += '<h1>사업자번호</h1>';
                    modalWrite += this.company.companyCode;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>비용수급사업장번호</h1>';
                    modalWrite += this.nwIno;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //주소
                    modalWrite += '<li><h1>주소</h1>';
                    modalWrite += /*this.comapny.zipCode+'&nbsp;)&nbsp;'+*/this.company.address01 + '<br />' + this.company.address02;
                    modalWrite += '</li>';
                }
                modalWrite += '</ul>';

                if (loginUserLevel < '4') {
                    //상담 이력
                    //modalWrite += '<section id="content3" class="tabSection">';
                    //modalWrite +='<h1 style="display: inline-block;margin-left:10px;">상담 이력</h1>';
                    //modalWrite +='<button type="button" onclick="openInfo(\'BBSCSList\',this)" style="margin-left:10px;">펼치기</button>';
                    modalWrite += '<div id="BBSCSList" class="BBSList scrollDiv" style="height:700px; margin:10px 0;">';
                    modalWrite += '<form class="BBSCsForm" method="post">';
                    modalWrite += '<input type="hidden" name="userID" value="' + this.userID + '"/>';
                    modalWrite += '<input type="hidden" name="adviserID" value="' + loginUserID + '"/>';
                    modalWrite += '<input type="hidden" name="csTypeSeq" value="" >';
                    modalWrite += '<div class="after" style="margin:5px 0">';
                    //modalWrite +='<button type="button"  class="first" onclick="hiddenCss(\'\');" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin: 0 0 3px 5px;">구분항목</button>';
                    //modalWrite +='<button type="button" onclick="csExcel();" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin: 0 0 0 5px;">엑셀 다운로드</button>';
                    modalWrite += '</div>';
                    modalWrite += '<div class="csHistoryList"></div>';
                    //modalWrite +='<input type="text" name="content" value="" style="height: 30px; width: 93.9%; vertical-align:top;" placeHolder=" 등록하실 상담 내용을 입력하세요"/>';
                    modalWrite += '<textarea name="question" style="height: 100px; width: 49.4%; vertical-align:top;margin-bottom: 5px;" placeholder="문의 내역" ></textarea>&nbsp;&nbsp;';
                    modalWrite += '<textarea name="content" style="height: 100px; width: 49.5%; vertical-align:top;margin-bottom: 5px;" placeholder="처리 내역" ></textarea>';
                    modalWrite += '<button type="button" onclick="csSaveAct();" style=" float:right; height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin: 0 0 5px 20px; width: 200px;">저장</button>';
                    modalWrite += '<input type="checkbox" name="status" id="status" value="Y" checked="checked"><label for="status" style="float:right;">처리완료</label>';
                    modalWrite += '<select name="category" id="category" style="float:left; height:30px;">';
                    modalWrite += '<option value="">문의분류를 선택해주세요</option>';
                    modalWrite += '<option value="learn">학습</option>';
                    modalWrite += '<option value="system">시스템</option>';
                    modalWrite += '<option value="register">수강신청</option>';
                    modalWrite += '<option value="contents">콘텐츠</option>';
                    modalWrite += '<option value="marketer">영업자</option>';
                    modalWrite += '<option value="etc">기타</option>';
                    modalWrite += '</select>';

                    modalWrite += '<div class="talbeA" style="margin-top:10px;">';
                    modalWrite += '<table>';
                    modalWrite += '<thead>';
                    modalWrite += '<tr>';
                    modalWrite += '<th style="width:6%;">분류</th>';
                    modalWrite += '<th style="width:18%;">기간/과정명</th>';
                    modalWrite += '<th style="width:25%;">내용</th>';
                    modalWrite += '<th style="width:6%;">작성</th>';
                    modalWrite += '<th style="width:5%;">수정</th>';
                    modalWrite += '</tr>';
                    modalWrite += '</thead>';
                    modalWrite += '<tbody class="BBSCsTbody"></tbody>';
                    modalWrite += '</table>';
                    modalWrite += '</div>';
                    modalWrite += '</form></div>';
                    //modalWrite += '</section>';
                }
                modalWrite += '</section>';

                if (this.userLevel.userLevel != '7') {
                    modalWrite += '<section id="content2" class="tabSection">';
                    modalWrite += '<div class="BBSList scrollDiv" id="infoUl02" style="height:370px; margin:10px 0;">';
                    modalWrite += '<table><thead><tr>';
                    modalWrite += '<th style="width:130px">기간</th>';
                    modalWrite += '<th>과정명</th>';
                    modalWrite += '<th style="width:80px;">인증</th>';
                    modalWrite += '<th style="width:60px;">진도율</th>';
                    modalWrite += '<th style="width:120px;">중간/최종/과제</th>';
                    modalWrite += '<th style="width:80px;">수료여부</th>';
                    modalWrite += '</tr></thead><tbody id="BBSstudyList">';
                    modalWrite += '</tbody></table>';
                    modalWrite += '</div>';
                    modalWrite += '</section>';
                }


                modalWrite += '<section id="content3" class="tabSection">';
                modalWrite += '<div id="infoUl05" class="BBSList BBSOrderHistory scrollDiv" style="height:370px; margin:10px 0; overflow: hidden;">';
                modalWrite += '<table><thead>';
                modalWrite += '<tr>';
                modalWrite += '<th>기간</th>';
                modalWrite += '<th>환급</th>';
                modalWrite += '<th>산업안전</th>';
                modalWrite += '<th>일반</th>';
                modalWrite += '<th>교육순서 설정</th>';
                modalWrite += '</tr></thead>';
                modalWrite += '<tbody>';
                modalWrite += '</tbody>';
                modalWrite += '</table>';
                modalWrite += '</div>';
                modalWrite += '</section>';


                //18-04-17 본인인증 (한상민)
                //modalWrite +='<h1>본인인증 (최근 100건만 보여집니다.)</h1>';
                modalWrite += '<section id="content4" class="tabSection">';
                modalWrite += '<div id="infoUl03" class="BBSList BBSCertHistory scrollDiv" style="height:370px; margin:10px 0;">';
                modalWrite += '<table><thead>';
                modalWrite += '<tr>';
                modalWrite += '<th>번호</th>';
                modalWrite += '<th>교육 시작일</th>';
                modalWrite += '<th>인증 시간</th>';
                modalWrite += '</tr></thead>';
                modalWrite += '<tbody></tbody></table>';
                modalWrite += '</div>';
                modalWrite += '</section>';
                //

                if (loginUserLevel < 4 || (loginUserLevel >= 5 && loginUserLevel <= 8)) {
                    //20170428 이응민 추가 ->
                    modalWrite += '<section id="content5" class="tabSection">';
                    //modalWrite +='<h1>로그인 이력 정보 <span style="font-size:12pt;">(최근 100건만 보여집니다.)</span></h1>';
                    //modalWrite +='<div class="BBSLoginHistory scrollDiv" style="height:370px; margin:10px 0;">';
                    modalWrite += '<div id="infoUl04" class="BBSLoginHistory scrollDiv" style="height:370px; margin:10px 0;">';
                    modalWrite += '<table><thead>';
                    modalWrite += '<tr>';
                    modalWrite += '<th>번호</th>';
                    modalWrite += '<th>로그인 시간</th>';
                    modalWrite += '<th>IP</th>';
                    modalWrite += '<th>디바이스</th>';
                    modalWrite += '<th>OS</th>';
                    modalWrite += '<th>브라우저</th>';
                    modalWrite += '<th>브라우저버전</th>';
                    modalWrite += '</tr></thead>';
                    modalWrite += '<tbody></tbody></table>';
                    modalWrite += '</div>';
                    modalWrite += '</section>';
                }

            })
            modalWrite += '</div></div></div></div></div></div>';
            $('#contents').after(modalWrite)
            modalAlign()
            // <- 20170428 이응민 추가
        })
            .done(function (data) {
                var listCS = '';
                $('select[name="call01"]').remove();
                $.get('../api/apiCategoryCS.php', {'seq': 714}, function (data) {
                    $('select[name="csHistory"]').remove();
                    listCS += '<select name="csHistory" style="display:none" id="csHistory" onChange="categoryCS(\'call01\',this)";>';
                    listCS += '<option value="">상담이력선택</option>';
                    $.each(data.category, function () {
                        listCS += '<option value="' + this.seq + '">' + this.value02 + '</option>';
                    })
                    listCS += '</select>';
                });

                $.each(data.member, function () {
                    $.get(modalStudyApi, {'userID': this.userID, 'list': '30'}, function (data) {
                        var listView = '';
                        csComboWrite = '<select name="studySeq" style="height: 30px; width:100%;">';
                        if (data.totalCount != 0) {
                            $.each(data.study, function () {
                                listView += '<tr>';
                                listView += '<td>' + this.lectureStart + '&nbsp;~<br/>' + this.lectureEnd + '</td>';

                                if (this.serviceType == '1') {
                                    var serviceType = '사업주';

                                    if (this.contents.contentsAccredit >= '2018-04-30') {
                                        var certPass = '1일 1회 인증';

                                    } else {
                                        if (this.certPass == 'Y') {
                                            var certPass = '인증받음<br />' + this.certDate;
                                        } else {
                                            if (loginUserLevel < 4) {
                                                var certPass = '미인증<br /><button type="button" onClick="certPassOK(\'' + this.user.userID + '\',\'' + this.lectureStart + '\',\'' + loginUserID + '\')">인증제외</button>';
                                            } else {
                                                var certPass = '미인증';
                                            }
                                        }
                                    }

                                } else if (this.serviceType == '2') {
                                    var serviceType = '근로자카드';
                                    if (this.certPass == 'Y') {
                                        var certPass = '인증받음<br />' + this.certDate;
                                    } else {
                                        var certPass = '미인증';
                                        if (loginUserLevel != '5' && loginUserLevel != '6') {
                                            certPass += '<br /><button type="button" onClick="certPassOK(\'' + this.user.userID + '\',\'' + this.lectureStart + '\',\'' + loginUserID + '\')">인증제외</button>';
                                        }
                                    }
                                } else if (this.serviceType == '3') {
                                    var serviceType = '비환급';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '5') {
                                    var serviceType = '산업안전';
									if (this.certPass == 'Y') {
										var certPass = '인증받음<br />' + this.certDate;
										if (this.certMemo != '') {
											 certPass += '<br/><b>문자인증사유:' + this.certMemo + '</b>';
										}
									} else {
										var certPass = '<button type="button" onClick="certPassOK(\'' + this.user.userID + '\',\'' + this.lectureStart + '\',\'' + loginUserID + '\')">인증제외</button>';
									}                                    
                                } else if (this.serviceType == '8') {
                                    var serviceType = '수강연동';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '9') {
                                    var serviceType = '테스트';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '10') {
                                    var serviceType = '비환급(평가있음)';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '11') {
                                    var serviceType = '오프라인';
                                    var certPass = '해당없음';
                                } else {
                                    var serviceType = '?';
                                    var certPass = '해당없음';
                                }
                                /*listView +='<td>'+this.contents.contentsName+'<br / >('+serviceType+' 과정)</td>';
							listView +='<td>'+certPass+'</td>';
							listView +='<td>'+this.progress+'%</td>';
							listView +='<td>';*/

                                listView += '<td onClick="globalModalActMore(\'studyInfo\',\'\',\'' + this.contents.contentsCode + '\',\'' + this.seq + '\',\'' + this.lectureOpenSeq + '\')" style="cursor:pointer;">' + this.contents.contentsName + '<br / >(' + serviceType + ' 과정)</td>';
                                listView += '<td>' + certPass + '</td>';
                                listView += '<td onClick="globalModalActMore(\'progressView\',' + this.lectureOpenSeq + ',\'' + this.user.userID + '\')" style="cursor:pointer;">' + this.progress + '%</td>';
                                listView += '<td>';

                                if (this.serviceType == '3') {
                                    listView += '<strong >평가 없음</strong><br />';
                                    listView += '<strong >평가 없음</strong><br />';
                                    listView += '<strong >과제 없음</strong>';
                                } else {
                                    if (this.midStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong><br />';
                                    } else if (this.midStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.midScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserID == 'hhtmc12') { // 가산 TM만 점수 나오게 처리 2018-08-14 진영하 / 오정욱실장님 요청
                                            listView += '<strong class="price">' + this.midScore + '</strong><br />';
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.midScore + '</strong><br />';
                                        }
                                    } else {
                                        listView += '<strong class="price">미응시</strong><br />';
                                    }
                                    if (this.testStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong><br />';
                                    } else if (this.testStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.testScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserID == 'hhtmc12') { // 가산 TM만 점수 나오게 처리 2018-08-14 진영하 / 오정욱실장님 요청
                                            listView += '<strong class="price">' + this.testScore + '</strong><br />';
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.testScore + '</strong><br />';
                                        }
                                    } else {
                                        listView += '<strong class="price">미응시</strong><br />';
                                    }
                                    if (this.reportStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong>';
                                    } else if (this.reportStatus == 'R') {
                                        listView += '<strong class="price">과제 반려</strong>';
                                    } else if (this.reportStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.reportScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserID == 'hhtmc12') { // 가산 TM만 점수 나오게 처리 2018-08-14 진영하 / 오정욱실장님 요청
                                            listView += '<strong class="price">' + this.reportScore + '</strong><br />';
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.reportScore + '</strong><br />';
                                        }
                                    } else if (this.reportStatus == 'N') {
                                        listView += '<strong class="price">미제출</strong>';
                                    } else if (this.reportStatus == 'V') {
                                        listView += '<strong class="price">진행중</strong>';
                                    } else {
                                        listView += '<strong class="price">과제 없음</strong>';
                                    }
                                }

                                listView += '</td>';
                                listView += '<td>';
                                /*if(this.serviceType == '3'){
								if(this.passOK == 100) { // 수료
									listView +='<strong>수료</strong><br />';
								} else {
									listView +='<strong class="price">미수료</strong><br />';
								}
							} else {
								if(this.passOK == 'Y'){
									listView +='<strong>수료</strong><br />';
								}else if(this.passOK == 'W'){
									listView +='<strong class="price">진행중</strong><br />';
								}else{
									listView +='<strong class="price">미수료</strong><br />';
								}
							}*/
                                /*if(this.passOK == 'Y'){
								listView +='<strong>수료</strong><br />';
							}else if(this.passOK == 'W'){
								listView +='<strong class="price">진행중</strong><br />';
							}else{
								listView +='<strong class="price">미수료</strong><br />';
							}*/
                                var today = new Date();
                                if (this.serviceType == '3') { // 비환급인 경우 진도율 80%이면 수료
                                    if (this.lectureStart <= today && this.lectureEnd >= today) {
                                        passOK = '진행중';
                                    } else {
                                        if (this.progress == 100) { // 수료
                                            passOK = '<strong class="blue">수료</strong>';
                                        } else {
                                            passOK = '<strong class="red">미수료</strong>';
                                        }
                                    }
                                } else {
                                    /*if((this.midStatus == 'C' && this.testStatus == 'C' && this.reportStatus == null) || (this.midStatus == 'C' && this.testStatus == 'C' && this.reportStatus == 'C')){
									passOK = '<strong class="red">미수료</strong>';
								}else{
									passOK = '<strong class="red"></strong>';
								}*/ //2017-07-28 강혜림 수정
                                    if (this.passOK == 'Y') { // 수료
                                        passOK = '<strong class="blue");">수료</strong>';
                                    } else if (this.passOK == 'W') { // 진행중
                                        passOK = '진행중';
                                    } else {
                                        if (this.lectureStart <= today && this.lectureEnd >= today) {
                                            passOK = '진행중';
                                        } else {
                                            passOK = '<strong class="red">미수료</strong>';
                                        }
                                    }

                                    if (loginUserLevel == 8) {
                                        if (totalScore == '채점중') {
                                            passOK = '-';
                                        } else {
                                            if (this.passOK == 'Y') { // 수료
                                                passOK = '<strong class="blue">수료</strong>';
                                            } else if (this.passOK == 'W') { // 진행중
                                                passOK = '진행중';
                                            } else {
                                                if (this.lectureStart <= today && this.lectureEnd >= today) {
                                                    passOK = '진행중';
                                                } else {
                                                    passOK = '<strong class="red">미수료</strong>';
                                                }
                                            }
                                        }
                                    }

                                }
                                //listView +='<td><button type="button">인증대상</button></td>';
                                listView += passOK;
                                listView += '</td>';
                                listView += '</tr>';

                                //상담이력 수강 콤보박스 만들기
                                csComboWrite += '<option value="' + this.seq + '">[' + this.lectureStart + '~' + this.lectureEnd + '] ' + this.contents.contentsName + '</option>';
                            })
                        } else {
                            listView += '<tr><td colspan="20">수강중인 과정이 없습니다.</td></tr>';
                        }
                        csComboWrite += '<option value="0">선택안함</option></select>';
                        //$('#modal .BBSList tbody').html(listView)
                        $('#BBSstudyList').html(listView);
                        $('#modal .csHistoryList').html(listCS);
                        //$('.after .first').before(csComboWrite); //상담이력 수강 콤보박스 추가
                        $('.after').after(csComboWrite); //상담이력 수강 콤보박스 추가
                    })
                })

                //상담이력
                var listCsView = '';
                $.get(modalCsApi, {'userID': data.member[0].userID}, function (data) {
                    if (data.totalCount != 0) {
                        $.each(data.data, function () {
                            listCsView += '<form class="BBSCsUpdateForm' + this.seq + '" method="post">';
                            listCsView += '<input id="seq' + this.seq + '" type="hidden" value="' + this.seq + '">';
                            listCsView += '<input type="hidden" id="adviserID" value="' + loginUserID + '"/>';
                            listCsView += '<tr style="height: 40px;">';
                            listCsView += '<td id="csDateUpdate' + this.seq + '" style="display:none;"></td>'
                            listCsView += '<td id="category' + this.seq + '" >';
                            if (this.category == 'learn') {
                                listCsView += '학습';
                            } else if (this.category == 'system') {
                                listCsView += '시스템';
                            } else if (this.category == 'register') {
                                listCsView += '수강신청';
                            } else if (this.category == 'contents') {
                                listCsView += '콘텐츠';
                            } else if (this.category == 'marketer') {
                                listCsView += '영업자';
                            } else if (this.category == 'etc') {
                                listCsView += '기타';
                            }
                            listCsView += '</td>';
                            listCsView += '<input type="hidden" id="categoryValue' + this.seq + '" value="' + this.category + '">'; //수정 시 select 하기 위해 값 가져올 input hidden
                            listCsView += '<td id="updateCategory' + this.seq + '" style="display:none;">';
                            listCsView += '<select id="updateCategoryForm' + this.seq + '" style="height: 30px;margin-top:3px;">';
                            listCsView += '<option value="learn">학습</option>';
                            listCsView += '<option value="system">시스템</option>';
                            listCsView += '<option value="register">수강신청</option>';
                            listCsView += '<option value="contents">콘텐츠</option>';
                            listCsView += '<option value="marketer">영업자</option>';
                            listCsView += '<option value="etc">기타</option>';
                            listCsView += '</select>';
                            listCsView += '</td>';
                            listCsView += '<td id="contentsName' + this.seq + '" >' + this.lectureDay + '<br />' + this.contentsName + '</td>';
                            //listCsView +='<td id="content'+this.seq+'" ><span style="padding:0 2px">['+this.value02+']</span>'+this.content+'</td>';
                            //listCsView +='<td id="updateContent'+this.seq+'" style="display:none;">['+this.value02+']<br><strong style="cursor:pointer;" onclick="hiddenCss(\''+this.csTypeSeq+'\');">구분항목 변경시 클릭</strong><input type="text" id="updateContentForm'+this.seq+'" style="height: 30px;margin-top:3px;" value="'+this.content+'"/></td>';
                            listCsView += '<td id="content' + this.seq + '" >';
                            if (this.question != null && this.question != '') {
                                listCsView += this.question + '<br />-------------------------------------------------------------<br />';
                            }
                            listCsView += this.content + '</td>';
                            listCsView += '<td id="updateContent' + this.seq + '" style="display:none;"><input type="text" id="updateContentForm' + this.seq + '" style="height: 30px;margin-top:3px;" value="' + this.content + '"/></td>';
                            if (this.upDateName) {
                                listCsView += '<td>' + this.upDateName;
                            } else {
                                listCsView += '<td>' + this.adviserName;
                            }
                            if (this.infoUpdate) {
                                listCsView += '<br />' + this.infoUpdate + '</td>';
                            } else {
                                listCsView += '<br />' + this.inputDate + '</td>';
                            }
                            listCsView += '<td>';
                            listCsView += '<span id="csUpdate' + this.seq + '" style="text-align:center; display:none;"><input type="button" value="저장" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csUpdateAct(' + this.seq + ',\'' + this.csTypeSeq + '\',\'' + this.userID + '\')" ></span>';
                            listCsView += '<span id="csUpdateForm' + this.seq + '" style="text-align:center; display:"";"><input type="button" value="수정" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csUpdateForm(' + this.seq + ')" ></span>';
                            listCsView += '<span id="csDelete' + this.seq + '" style="text-align:center; display:"";"><input type="button" value="삭제" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csDelete(' + this.seq + ')" ></span>';
                            listCsView += '</td>';
                            listCsView += '</tr>';
                            listCsView += '</form>';
                        });

                    } else {
                        listCsView += '<tr style="height: 40px; text-align: center;">';
                        listCsView += '<td colspan="7">등록된 상담 이력이 없습니다.</td>';
                        listCsView += '</tr>';
                    }

                    $('.BBSCsTbody').html(listCsView);
                });
            })
            .always(function (data) {
                $.ajax({
                    method: "GET",
                    url: modalMemberStudyInOrder,
                    data: {'userID': eachID},
                    success: function (data) {
                        var modalOrderWrite = '';
                        if (loginUserLevel != '2') {
                            modalOrderWrite += '<tr><td colspan="8">권한이 없습니다.</td></tr>';
                        } else if (data.totalCount != 0) {
                            $.each(data.member, function () {
                                modalOrderWrite += `<tr><td>${this.lectureStart} ~ ${this.lectureEnd}</td>`;
                                modalOrderWrite += `<td>${this.serviceType1}</td>`;
                                modalOrderWrite += `<td>${this.serviceType5}</td>`;
                                modalOrderWrite += `<td>${this.serviceType3}</td>`;
                                if (this.flag == 'Y') {
                                    modalOrderWrite += `<td><button onclick="removeStudyOrder('N', '${eachID}', '${this.lectureStart}', '${this.lectureEnd}')">현상태:해제</button></td></tr>`;
                                } else {
                                    modalOrderWrite += `<td><button onclick="removeStudyOrder('Y', '${eachID}', '${this.lectureStart}', '${this.lectureEnd}')">현상태:설정</button></td></tr>`;
                                }
                            })
                        } else {
                            modalOrderWrite += '<tr><td colspan="8">수강 내역이 없습니다.</td></tr>';
                        }
                        $('#modal .BBSOrderHistory tbody').after(modalOrderWrite);
                    }
                })
            })
            //18-04-17 본인인증 (한상민)
            .always(function (data) {
                $.get(modalCertApi, {'userID': eachID}, function (data) {
                    var historyNum = data.totalCount;
                    var modalCertWrite = ''
                    if (data.totalCount != 0) {
                        $.each(data.certHistory, function () {
                            modalCertWrite += '<tr>';
                            modalCertWrite += '<td>' + historyNum + '</td>';
                            modalCertWrite += '<td>' + this.lectureStart + '</td>';
                            modalCertWrite += '<td>' + this.certDate + '</td>';
                            modalCertWrite += '</tr>';
                            historyNum--;
                        })
                    } else {
                        modalCertWrite += '<tr><td colspan="3">본인 인증 이력이 없습니다.</td></tr>';
                    }
                    $('#modal .BBSCertHistory tbody').after(modalCertWrite)
                })
            })
            //
            //20170428 이응민 추가 ->
            .always(function (data) {
                //로그인 이력 정보
                $.get(modalLoginHistoryApi, {'userID': eachID}, function (data) {
                    var historyNum = data.totalCount;
                    var modalLoginWrite = ''
                    //modalLoginWrite +='<ul>';
                    if (data.totalCount != 0) {
                        $.each(data.loginHistory, function () {
                            //로그인 시간
                            modalLoginWrite += '<tr>';
                            modalLoginWrite += '<td>' + historyNum + '</td>';
                            modalLoginWrite += '<td>' + this.loginTime + '</td>';
                            modalLoginWrite += '<td>' + this.loginIP + '</td>';
                            if (this.device == '' || this.device == null) {
                                var device = '-';
                            } else {
                                var device = this.device;
                            }
                            if (this.os == '' || this.os == null) {
                                var os = '-';
                            } else {
                                var os = this.os;
                            }
                            if (this.browser == '' || this.browser == null) {
                                var browser = '-';
                            } else {
                                var browser = this.browser;
                            }
                            if (this.browserVersion == '' || this.browserVersion == null) {
                                var browserVersion = '-';
                            } else {
                                var browserVersion = this.browserVersion;
                            }
                            modalLoginWrite += '<td>' + device + '</td>';
                            modalLoginWrite += '<td>' + os + '</td>';
                            modalLoginWrite += '<td>' + browser + '</td>';
                            modalLoginWrite += '<td>' + browserVersion + '</td>';
                            modalLoginWrite += '</tr>';
                            historyNum--;
                        })
                    } else {
                        modalLoginWrite += '<tr><td colspan="7">로그인 정보가 없습니다.</td></tr>';
                    }
                    $('#modal .BBSLoginHistory tbody').after(modalLoginWrite)
                })
            })

    } else if (types == 'memberB2CView') {
        var loginTime = '';
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>회원정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        $.get(modalMemberB2CApi, {'seq': modalSeq, 'userID': eachID}, function (data) {
            $.each(data.member, function () {
                modalWrite += '<div>';
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>기본정보</h1>';
                //수험생정보
                modalWrite += '<ul>';

                modalWrite += '<li>';
                //이름
                modalWrite += '<div class="halfDiv"><h1>이름</h1>';
                modalWrite += this.userName;
                modalWrite += '/ ID : ' + this.userID;
                modalWrite += '</div>';
                //생년월일,성별
                modalWrite += '<div class="halfDiv"><h1>생년월일/성별</h1>';
                modalWrite += this.birth + '&nbsp;/&nbsp;';
                switch (this.sex) {
                    case "9":
                    case "1":
                    case "3":
                    case "5":
                    case "7":
                        modalWrite += '남';
                        break;
                    case "0":
                    case "2":
                    case "4":
                    case "6":
                    case "8":
                        modalWrite += '여';
                        break;
                }
                modalWrite += '</div>';
                modalWrite += '</li>';

                modalWrite += '<li>';
                //최근로그인
                if (this.loginTime == null) {
                    loginTime = '로그인 기록이 없습니다.';
                } else {
                    loginTime = this.loginTime;
                }
                modalWrite += '<div class="halfDiv"><h1>최근로그인</h1>';
                modalWrite += loginTime;
                modalWrite += '</div>';
                //회원가입일
                modalWrite += '<div class="halfDiv"><h1>회원가입일</h1>';
                modalWrite += this.inputDate;
                modalWrite += '</div>';
                modalWrite += '</li>';

                modalWrite += '<li>';
                //휴대폰
                modalWrite += '<div class="halfDiv"><h1>휴대폰</h1>';
                modalWrite += this.mobile01 + '&nbsp;-&nbsp;' + this.mobile02 + '&nbsp;-&nbsp;' + this.mobile03;
                if (this.smsReceive == 'Y') {
                    modalWrite += '&nbsp;(동의)'
                } else {
                    modalWrite += '&nbsp;(거부)'
                }
                modalWrite += '</div>';
                //회원가입일
                modalWrite += '<div class="halfDiv"><h1>email</h1>';
                modalWrite += this.email01 + '@' + this.email02;
                if (this.emailReceive == 'Y') {
                    modalWrite += '&nbsp;(동의)'
                } else {
                    modalWrite += '&nbsp;(거부)'
                }
                modalWrite += '</div>';
                modalWrite += '</li>';

                //주소
                if (this.address01 == null) {
                    var address01 = '';
                } else {
                    var address01 = this.address01;
                }
                if (this.address02 == null) {
                    var address02 = '';
                } else {
                    var address02 = this.address02;
                }
                modalWrite += '<li><h1>주소</h1><div class="normalText">';
                modalWrite += this.zipCode + '&nbsp;)&nbsp;' + address01 + '&nbsp;' + address02;
                modalWrite += '</div></li>';
                modalWrite += '</ul>';

                //수험생정보
                modalWrite += '<h1>소속정보</h1>';
                modalWrite += '<ul>';
                if (this.company.companyCode == 0000000000) {
                    modalWrite += '<li style="text-align:center">일반회원입니다.</li>';
                } else {
                    //회사명 사업자번호
                    modalWrite += '<li><div class="halfDiv">';
                    modalWrite += '<h1>회사명</h1>';
                    modalWrite += this.company.companyName;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>사업자번호</h1>';
                    modalWrite += this.company.companyCode;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //업태 업종
                    modalWrite += '<li><div class="halfDiv">';
                    modalWrite += '<h1>업태</h1>';
                    modalWrite += this.company.kind;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>업종</h1>';
                    modalWrite += this.company.part;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //대표, 계산서
                    modalWrite += '<li><div class="halfDiv">';
                    modalWrite += '<h1>대표자</h1>';
                    modalWrite += this.company.ceo;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>전자세금계산서</h1>';
                    modalWrite += this.company.elecEmail01 + '@' + this.company.elecEmail02;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //주소
                    modalWrite += '<li><h1>주소</h1><div class="normalText">';
                    modalWrite += /*this.comapny.zipCode+'&nbsp;)&nbsp;'+*/this.company.address01 + '&nbsp;' + this.company.address02;
                    modalWrite += '</div></li>';
                }
                modalWrite += '</ul>';
                modalWrite += '</div>';

                if (this.userLevel.userLevel != '7') {
                    modalWrite += '<div class="BBSList scrollDiv" style="height:370px; margin:10px 0;">';
                    modalWrite += '<table><thead><tr>';
                    modalWrite += '<th style="width:130px">기간</th>';
                    modalWrite += '<th>과정명</th>';
                    modalWrite += '<th style="width:80px;">인증</th>';
                    modalWrite += '<th style="width:60px;">진도율</th>';
                    modalWrite += '<th style="width:120px;">중간/최종/과제</th>';
                    modalWrite += '<th style="width:80px;">수료여부</th>';
                    modalWrite += '</tr></thead><tbody>';
                    modalWrite += '</tbody></table>';
                    modalWrite += '</div>';
                }
            })
            modalWrite += '</div></div>';
            $('#contents').after(modalWrite)
            modalAlign()
        })
            .done(function (data) {
                $.each(data.member, function () {
                    $.get(modalStudyApi, {'userID': this.userID}, function (data) {
                        var listView = '';
                        if (data.totalCount != 0) {
                            $.each(data.study, function () {
                                listView += '<tr>';
                                listView += '<td>' + this.lectureStart + '&nbsp;~<br/>' + this.lectureEnd + '</td>';
                                if (this.serviceType == '1') {
                                    var serviceType = '사업주';
                                    if (this.certPass == 'Y') {
                                        var certPass = '인증받음<br />' + this.certDate;
                                    } else {
                                        var certPass = '미인증<br /><button type="button" onClick="certPassOK(\'' + this.user.userID + '\',\'' + this.lectureStart + '\',\'' + loginUserID + '\')">인증제외</button>';
                                    }
                                } else if (this.serviceType == '3') {
                                    var serviceType = '비환급';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '5') {
                                    var serviceType = '산업안전';
                                    var certPass = '<br /><button type="button" onClick="certPassOK(\'' + this.user.userID + '\',\'' + this.lectureStart + '\',\'' + loginUserID + '\')">인증제외</button>';
                                } else if (this.serviceType == '8') {
                                    var serviceType = '수강연동';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '9') {
                                    var serviceType = '테스트';
                                    var certPass = '해당없음';
                                } else if (this.serviceType == '10') {
                                    var serviceType = '비환급(평가있음)';
                                } else if (this.serviceType == '11') {
                                    var serviceType = '오프라인';
                                } else {
                                    var serviceType = '?';
                                    var certPass = '해당없음';
                                }
                                listView += '<td>' + this.contents.contentsName + '<br / >(' + serviceType + ' 과정)</td>';
                                listView += '<td>' + certPass + '</td>';
                                listView += '<td>' + this.progress + '%</td>';
                                listView += '<td>';

                                if (this.serviceType == '3') {
                                    listView += '<strong >평가 없음</strong><br />';
                                    listView += '<strong >평가 없음</strong><br />';
                                    listView += '<strong >과제 없음</strong>';
                                } else {
                                    if (this.midStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong><br />';
                                    } else if (this.midStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.midScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.midScore + '</strong><br />';
                                        }
                                    } else {
                                        listView += '<strong class="price">미응시</strong><br />';
                                    }
                                    if (this.testStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong><br />';
                                    } else if (this.testStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.testScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.testScore + '</strong><br />';
                                        }
                                    } else {
                                        listView += '<strong class="price">미응시</strong><br />';
                                    }
                                    if (this.reportStatus == 'Y') {
                                        listView += '<strong>채점 대기중</strong>';
                                    } else if (this.reportStatus == 'R') {
                                        listView += '<strong class="price">과제 반려</strong>';
                                    } else if (this.reportStatus == 'C') {
                                        if (loginUserLevel == '8') {
                                            if (this.studyEnd == 'Y') {
                                                listView += '<strong class="price">' + this.reportScore + '</strong><br />';
                                            } else {
                                                listView += '<strong>채점완료</strong><br />';
                                            }
                                        } else if (loginUserLevel == '6' || loginUserLevel == '5') {
                                            listView += '<strong>채점완료</strong><br />';
                                        } else {
                                            listView += '<strong class="price">' + this.reportScore + '</strong><br />';
                                        }
                                    } else if (this.reportStatus == 'N') {
                                        listView += '<strong class="price">미제출</strong>';
                                    } else {
                                        listView += '<strong class="price">과제 없음</strong>';
                                    }
                                }

                                listView += '</td>';
                                listView += '<td>';
                                if (this.serviceType == '3') {
                                    if (this.progress >= 80) { // 수료
                                        listView += '<strong>수료</strong><br />';
                                    } else {
                                        listView += '<strong class="price">미수료</strong><br />';
                                    }
                                } else {
                                    if (this.passOK == 'Y') {
                                        listView += '<strong>수료</strong><br />';
                                    } else if (this.passOK == 'W') {
                                        listView += '<strong class="price">진행중</strong><br />';
                                    } else {
                                        listView += '<strong class="price">미수료</strong><br />';
                                    }
                                }
                                //listView +='<td><button type="button">인증대상</button></td>';
                                listView += '</td>';
                                listView += '</tr>';
                            })
                        } else {
                            listView += '<tr><td colspan="20">수강중인 과정이 없습니다.</td></tr>';
                        }
                        $('#modal .BBSList tbody').html(listView)
                    })
                })
            })
    }

    //회사정보 조회
    else if (types == 'companyView') {
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>사업주 정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        $.get(modalCompanyApi, {'seq': modalSeq, 'companyCode': eachID}, function (data) {
            if (loginUserID == 'leehr0523') {
                //alert(eachID);
            }
            if (data.totalCount != 0) {
                $.each(data.company, function () {
                    modalWrite += '<div>';
                    modalWrite += '<h1>기본정보</h1>';
                    modalWrite += '<div class="BBSWrite">';
                    //수험생정보
                    modalWrite += '<ul>';

                    modalWrite += '<li>';
                    modalWrite += '<h1>회사명</h1>';
                    modalWrite += this.companyName + '&nbsp;(&nbsp;ID&nbsp;:&nbsp;' + this.companyID + '&nbsp;)';
                    modalWrite += '</li>';

                    //회사규모 사이버교육센터정보
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>회사규모</h1>';
                    if (this.companyScale == 'A') {
                        modalWrite += '대규모 1000인 이상'
                    } else if (this.companyScale == 'B') {
                        modalWrite += '대규모 1000인 미만'
                    } else if (this.companyScale == 'C') {
                        modalWrite += '우선지원대상'
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>사이버 교육센터</h1>';
                    if (this.studyEnabled != 'N') {
                        modalWrite += '사용&nbsp;(&nbsp;주소&nbsp;:&nbsp;<a href="https://' + this.companyID + '.' + siteURL + '" target="_blank">' + this.companyID + '.' + siteURL + '</a>&nbsp;)'
                    } else {
                        modalWrite += '사용하지 않음'
                    }
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //사업자 번호
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>사업자 번호</h1>'
                    modalWrite += this.companyCode;
                    if (this.hrdCode != '' && this.hrdCode != null) {
                        modalWrite += '&nbsp;(&nbsp;HRD 번호&nbsp;:&nbsp;' + this.hrdCode + '&nbsp;)';
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>업태/업종</h1>';
                    modalWrite += this.kind + '&nbsp;/&nbsp;' + this.part;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //대표자명
                    modalWrite += '<li>';
                    modalWrite += '<h1>대표자명</h1>';
                    modalWrite += this.ceoName;
                    modalWrite += '</li>';

                    //회사 전화번호
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>전화번호</h1>';
                    modalWrite += this.phone01 + '-' + this.phone02 + '-' + this.phone03;
                    modalWrite += '</div>';

                    //회사 전화번호
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>팩스</h1>';
                    modalWrite += this.fax01 + '-' + this.fax02 + '-' + this.fax03;
                    modalWrite += '</div>';
                    modalWrite += '</li>';


                    //주소
                    modalWrite += '<li><h1>주소</h1><div class="normalText">';
                    modalWrite += this.zipCode + '&nbsp;)&nbsp;' + this.address01 + '<br />' + this.address02;
                    modalWrite += '</div></li>';

                    //계좌정보,홈페이지
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>계좌번호</h1>'
                    modalWrite += '[&nbsp;' + this.bank + '&nbsp;]&nbsp;' + this.bankNum;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>홈페이지</h1>'
                    modalWrite += '<a href="https://' + this.siteURL + '" target="_blank">' + this.siteURL + '</a>';
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //담당자명,담당자연락처
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>담당자명</h1>'
                    if (this.manager.ID != '' && this.manager.ID != null) {
                        modalWrite += this.manager.name + '&nbsp;(&nbsp;ID&nbsp;:&nbsp;' + this.manager.ID + '&nbsp;)';
                    } else {
                        modalWrite += '미등록';
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>담당자 연락처</h1>'
                    modalWrite += this.manager.mobile;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    //email관련
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>담당자 email</h1>'
                    modalWrite += this.manager.email;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>계산서 email</h1>'
                    modalWrite += this.elecEmail01 + '@' + this.elecEmail02;
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    if (loginUserLevel < 5) {
                        //영업담당자
                        modalWrite += '<li>';
                        modalWrite += '<div class="halfDiv">';
                        modalWrite += '<h1>영업담당자</h1>';
                        if (this.marketer.name != '' && this.marketer.name != null) {
                            modalWrite += this.marketer.name + '&nbsp;(&nbsp;ID&nbsp;:&nbsp;' + this.marketer.ID + '&nbsp;)';
                        } else {
                            modalWrite += '미등록';
                        }
                        modalWrite += '</div>';

                        //내부담당자
                        modalWrite += '<div class="halfDiv">';
                        modalWrite += '<h1>내부운영담당자</h1>';
                        if (this.staff.name != '' && this.staff.name != null) {
                            modalWrite += this.staff.name + '&nbsp;(&nbsp;ID&nbsp;:&nbsp;' + this.staff.ID + '&nbsp;)';
                        } else {
                            modalWrite += '미등록';
                        }
                        modalWrite += '</div>';
                        modalWrite += '</li>';

                        //메모
                        modalWrite += '<li><h1>메모</h1><div class="normalText">';
                        modalWrite += this.memo;
                        modalWrite += '</div></li>';
                    }

                    modalWrite += '</ul>';
                    modalWrite += '</div>';

                    //if(loginUserLevel < 5) {
                    modalWrite += '<div class="BBSList" style="height:332px; margin:10px 0;">';
                    modalWrite += '<table><thead><tr>';
                    modalWrite += '<th style="width:200px">기간</th>';
                    modalWrite += '<th style="width:80px">환급</th>';
                    modalWrite += '<th style="width:80px">비환급(무료)</th>';
                    modalWrite += '<th style="width:80px">비환급(유료)</th>';
                    modalWrite += '<th style="width:90px;">수료율</th>';
                    modalWrite += '<th style="width:110px;">교육비</th>';
                    modalWrite += '<th style="width:110px;">환급비</th>';
                    modalWrite += '<th style="width:110px;">교육순서<br/>(환급우선)</th>';
                    modalWrite += '</tr></thead><tbody>';
                    modalWrite += '</tbody></table>';
                    modalWrite += '</div>';
                    //}
                    modalWrite += '</div></div>';
                    $('#contents').after(modalWrite);
                    modalAlign();
                })

            } else {
                //일반회원 정보 없음
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>기본정보</h1>';
                modalWrite += '<ul>';
                modalWrite += '<li style="text-align:center">';
                modalWrite += '일반 회원 이거나 검색 값이 없습니다.';
                modalWrite += '</li>';
                modalWrite += '</div>';
            }
        })


            .done(function (data) {
                $.each(data.company, function () {
                    $.get(modalCompanyStudyStatsApi, {'companyCode': this.companyCode}, function (data) {
                        var listView = '';
                        var totalReturnPrice = '';
                        var dCompanyCode = this.companyCode;
                        if (data.totalCount != 0) {
                            $.each(data.companyStudyStats, function () {
                                if (this.totalReturnPrice == null) {
                                    totalReturnPrice = '-';
                                } else {
                                    totalReturnPrice = this.totalReturnPrice;
                                }
                                if (this.totalPrice == null) {
                                    this.totalPrice = '-';
                                }
                                listView += '<tr>';
                                listView += '<td>' + this.lectureStart + ' ~ ' + this.lectureEnd;
                                if (this.serviceType == '8' || this.serviceType == '7') {
                                    listView += '<br />(수강연동)';
                                }
                                listView += '</td>';
                                listView += '<td>' + this.totalStudy + '/' + this.totalPassOK + '</td>';
                                listView += '<td>' + this.totalStudy2 + '/' + this.totalPassOK2 + '</td>';
                                if (this.price > 0) {
                                    //listView +='<td>'+this.totalStudy3+'/'+this.totalPassOK3+'<br>(&nbsp;'+toPriceNum(this.price)+'&nbsp;원)</td>';
                                    listView += '<td>' + this.totalStudy3 + '/' + this.totalPassOK3 + '<br>(&nbsp;' + this.price + '&nbsp;원)</td>';
                                } else {
                                    listView += '<td>' + this.totalStudy3 + '/' + this.totalPassOK3 + '<br>(&nbsp;0 원)</td>';
                                }
                                listView += '<td>' + this.totalPassRate + '%</td>';
                                //listView +='<td>'+toPriceNum(this.totalPrice)+'</td>';
                                listView += '<td>' + this.totalPrice + '</td>';
                                //listView +='<td>'+toPriceNum(totalReturnPrice)+'</td>';
                                listView += '<td>' + totalReturnPrice + '</td>';

                                listView += '<td>';
                                if (this.studyInOrderCk == 1) {
                                    listView += '<button type="button" id="studyInOrderBtn" onclick="studyInOrder(1,\'' + this.companyCode + '\',\'' + this.lectureStart + '\',\'' + this.lectureEnd + '\')">현상태:해제</button>';
                                } else {
                                    listView += '<button type="button" id="studyInOrderBtn" onclick="studyInOrder(0,\'' + this.companyCode + '\',\'' + this.lectureStart + '\',\'' + this.lectureEnd + '\')">현상태:설정</button>';
                                }
                                listView += '</td>';
                                listView += '</tr>';
                            })
                        } else {
                            listView += '<tr><td colspan="20">수강한 과정이 없습니다.</td></tr>';
                        }
                        $('#modal .BBSList tbody').html(listView);
                    })
                })
            })

    }

    //차시 진도 조회
    else if (types == 'progressView') {
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>차시별 진도율</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div>';
        $.get(modalProgressApi, {'lectureOpenSeq': modalSeq, 'userID': eachID}, function (data) {
            modalWrite += '<div class="BBSWrite">';
            modalWrite += '<h1>기본정보</h1>';
            modalWrite += '<ul>';
            modalWrite += '<li>';

            //아이디(이름)
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>아이디(이름)</h1>' + data.userID + '(' + data.userName + ')';
            modalWrite += '</div>';

            //회사명
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>회사명</h1>' + data.companyName;
            modalWrite += '</div>';
            modalWrite += '</li>';
            modalWrite += '<li>';

            //진도율(전체)
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>진도율(전체)</h1>' + data.totalProgress + ' %';
            modalWrite += '</div>';

            //수강기간
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>수강기간</h1>' + data.lectureStart + ' ~ ' + data.lectureEnd;
            modalWrite += '</div>';
            modalWrite += '</li>';

            //진도율(전체)
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>진행차시</h1>전체:' + data.maxChapter + '차시, 진행:' + data.totalCount + '차시';
            modalWrite += '</div>';
            modalWrite += '</li>';

            modalWrite += '</ul>';
            modalWrite += '</div>';


            //차시 이력
            modalWrite += '<div class="BBSList">';
            modalWrite += '<h1>' + data.contentsName + ' <span style="font-size:13px;">(과정코드: ' + data.contentsCode + ' / 과정개설번호: ' + data.lectureOpenSeq + ')</span></h1>';
            modalWrite += '<table><thead><tr>';
            modalWrite += '<th style="width:60px;">차시번호</th>';
            modalWrite += '<th>차시명</th>';
            modalWrite += '<th style="width:60px;">진도율</th>';
            modalWrite += '<th style="width:140px;">수강시간/접속IP</th>';
            modalWrite += '<th style="width:100px;">총학습시간</th>';
            modalWrite += '</tr></thead><tbody>';

            var time = '';
            var hour = '';
            var min = '';
            var sec = '';

            if (data.totalCount != 0) {
                $.each(data.progress, function () {
                    time = this.totalTime;
                    hour = parseInt(time / 3600);
                    min = parseInt((time % 3600) / 60);
                    sec = time % 60;
                    modalWrite += '<tr>';
                    modalWrite += '<td>' + this.chapter + '</td>';
                    //modalWrite +='<td>'+this.chapterName+'</td>';
                    modalWrite += '<td>' + this.chapterName + '<br />';
                    modalWrite += '전체 : ';
                    if (this.chapterSize.length == 1) {
                        modalWrite += '0';
                    }
                    if (data.progressCheck == 'pageCheck') {
                        modalWrite += this.chapterSize + ' 페이지 / 마지막 학습페이지 : ' + this.lastPageCheck + ' 페이지';
                        //modalWrite +='<br />'+this.mobileLastPageCheck;
                    } else {
                        modalWrite += '- 시간체크 방식으로 페이지 추적이 되지 않습니다.';
                    }
                    modalWrite += '</td>';
                    modalWrite += '<td>' + this.progress + '</td>';
                    modalWrite += '<td>' + this.endTime + '<br />' + this.studyIP + '</td>';
                    modalWrite += '<td>' + hour + '시간' + min + '분' + sec + '초</td>';
                    modalWrite += '</tr>';
                })

            } else {
                modalWrite += '<tr><td colspan="20">수강이력이 없습니다.</td></tr>';
            }

            modalWrite += '</tbody></table>';
            modalWrite += '<div>';
            modalWrite += '</div></div>';
            $('#contents').after(modalWrite);
            modalAlign();
        })
    }

    //평가 결과조회
    else if (types == 'testResultView') {
        var i = 1;
        var submitIP = '';
        var saveTime = '';
        var CheckTime = '';
        var submitScore = '';
        var submitStatus = '';
        var statusText = '';
        var testCopy = '';
        var testCopyCheck = '';
        var testCheckTime = '';

        modalWrite += '<div class="testView">';
        modalWrite += '<h1><strong>평가 결과</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        $.get(modalTestResultApi, {
            'lectureOpenSeq': modalSeq,
            'userID': eachID,
            'testType': option,
            'admin': 'Y'
        }, function (data) {
            if (loginUserID == '') {
                alert('로그아웃 상태입니다. 다시 로그인 해주시기 바랍니다.');
                top.location.href = '/admin/';
            }
            modalWrite += '<div id="contentsNav">';
            //평가 제목
            modalWrite += '<h2 style="font-size:12pt; color:#000000;">'
            if (data.testCopy == 'N') {
                MosaCheck = '정상'
            } else {
                MosaCheck = '모사답안'
            }
            if (option == 'mid') {
                modalWrite += '중간평가';
            } else if (option == 'final') {
                modalWrite += '최종평가';
            }
            modalWrite += ' | <strong>' + data.contentsName + '</strong><br />';
            modalWrite += '</h2>';
            //문제 바로가기
            modalWrite += '<form id="searchForm">';
            modalWrite += '<h1>문제 바로가기</h1>';
            modalWrite += '<select name="examNum" onchange="findExam(this)"></select>';
            modalWrite += '</form>';
            //평가 점수
            modalWrite += '<table><thead><tr>';
            if (data.status == "C") {
                modalWrite += '<th>환산점수</th>';
            }
            modalWrite += '<th>총점</th>';
            if (data.dTypeEA != 0) {
                modalWrite += '<th>진위형</th>';
            }
            if (data.aTypeEA != 0) {
                modalWrite += '<th>객관식</th>';
            }
            if (data.bTypeEA != 0) {
                modalWrite += '<th>단답형</th>';
            }
            if (data.cTypeEA != 0) {
                modalWrite += '<th>서술형</th>';
            }
            modalWrite += '</tr></thead><tbody><tr>';

            if (data.status == "C") {
                modalWrite += '<td>' + data.testCount + '</td>';
            }
            if (data.userScore == null || data.userScore == '') {
                userScore = '채점중';
            } else {
                userScore = data.userScore;
            }
            dTypeTotalScore = data.dTypeTotalScore;
            aTypeTotalScore = data.aTypeTotalScore;
            bTypeTotalScore = data.bTypeTotalScore;
            cTypeTotalScore = data.cTypeTotalScore;

            modalWrite += '<td><strong class="red">' + userScore + '</strong></td>';
            if (data.dTypeEA != 0) {
                modalWrite += '<td>' + dTypeTotalScore + '</td>';
            }
            if (data.aTypeEA != 0) {
                modalWrite += '<td>' + aTypeTotalScore + '</td>';
            }
            if (data.bTypeEA != 0) {
                modalWrite += '<td>' + bTypeTotalScore + '</td>';
            }
            if (data.cTypeEA != 0) {
                if (data.testTutorTempSave == 'Y') {
                    modalWrite += '<td id="cTypeTotalScore">' + data.scoreTotal + '</td>';
                } else {
                    modalWrite += '<td id="cTypeTotalScore">' + cTypeTotalScore + '</td>';
                }
            }
            modalWrite += '</tr></tbody></table>';
            modalWrite += '</div>';

            var today = data.nowTime.substr(0, 10);
            modalWrite += '<div>';
            modalWrite += '<form class="tutorGrade" method="post">';
            modalWrite += '<input type="hidden" name="testType" value="' + data.testType + '">';
            modalWrite += '<input type="hidden" name="lectureOpenSeq" value="' + data.lectureOpenSeq + '">';
            modalWrite += '<input type="hidden" name="contentsCode" value="' + data.contentsCode + '">';
            modalWrite += '<input type="hidden" name="userID" value="' + data.userID + '">';
            modalWrite += '<div id="examArea" class="testArea">';
            modalWrite += '<h1>기본정보</h1>'
            modalWrite += '<ul class="modalList">'
            modalWrite += '<li><div class="halfDiv"><h1>아이디(이름)</h1> ' + data.userID + '(' + data.userName + ')</div><div class="halfDiv"><h1>사업주</h1> ' + data.companyName + '</div></li>';
            modalWrite += '<li><div class="halfDiv"><h1>수강기간</h1> ' + data.lectureStart + ' ~ ' + data.lectureEnd + '</div><div class="halfDiv"><h1>응시 IP</h1> ' + data.submitIP + '</div></li>';
            modalWrite += '<li><div class="halfDiv"><h1>응시일</h1> ' + data.saveTime + '</div><div class="halfDiv"><h1>채점시간</h1> ' + data.checkTime + '</div></li>';
            modalWrite += '<li><h1>응시가능시간</h1> ' + data.testStartTime + ' ~ ' + data.testEndTime + '</li>';
            modalWrite += '</ul>'
            if (data.dTypeEA != 0) { // 진위형
                $.each(data.dType, function () {
                    var answerOK = '';
                    var rightAnswer = '';
                    var commentary = '';

                    if (this.userAnswer == this.answer) {
                        answerOK = ' 정답';
                        rightAnswer = 'Y';
                    } else {
                        answerOK = ' 오답';
                        rightAnswer = 'N';
                    }

                    modalWrite += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                    modalWrite += '<input type="hidden" name="testSeq[]" value="' + this.testSeq + '">';
                    modalWrite += '<div id="exam' + i + '"';
                    if (this.score != 0 && this.score != null) {
                        modalWrite += 'class="answerTrue"'
                    } else if (this.score == null) {
                        modalWrite += ''
                    } else {
                        modalWrite += 'class="answerFalse"'
                    }

                    if (rightAnswer == 'Y') { //채점 전이라도 채점 마킹 노출
                        modalWrite += 'class="answerTrue"';
                    } else if (rightAnswer == 'N') {
                        modalWrite += 'class="answerFalse"';
                    }
                    modalWrite += '>'
                    modalWrite += '<input type="hidden" name="rightAnswer[]" value="' + rightAnswer + '">';
                    modalWrite += '<h1>문제 ' + i + '</h1>';
                    modalWrite += '<h2>' + this.exam + '</h2>';
                    modalWrite += '<h3 style="font-size:12pt;">';
                    if (this.score == null) {
                        score = '채점전';
                    } else {
                        score = this.score;
                    }
                    if (this.commentary == null) {
                        commentary = '해설이 없습니다.';
                    } else {
                        commentary = this.commentary;
                    }
                    modalWrite += '획득점수 : <strong>' + score + '</strong> 배점 : <strong>' + this.baseScore + '</strong> 정답 : <strong>' + answerOK + '</strong>';
                    modalWrite += '</h3>';

                    if (this.userAnswer == 1) {
                        var selectedOX01 = 'checked="checked"';
                    } else if (this.userAnswer == 2) {
                        var selectedOX02 = 'checked="checked"';
                    }

                    var answerCheck = new Array;
                    var h = 0;
                    for (h = 0; h < 2; h++) {
                        if (this.answer == h + 1 && this.userAnswer == h + 1) {
                            answerCheck[h] = 'class="blue"'
                        } else if (this.answer == h + 1 && this.userAnswer != h + 1) {
                            answerCheck[h] = 'class="red"'
                        }
                    }

                    modalWrite += '<ol>';
                    modalWrite += '<li><input type="radio" name="userAnswer' + this.seq + '" id="example01' + this.seq + '" onClick="answerUpdate(' + this.orderBy + ',\'1\')" value="1" ' + selectedOX01 + '/>';
                    modalWrite += '<label for="example01' + this.seq + '" ' + answerCheck[0] + '>' + this.example01 + '</label></li>';
                    modalWrite += '<li><input type="radio" name="userAnswer' + this.seq + '" id="example02' + this.seq + '" onClick="answerUpdate(' + this.orderBy + ',\'2\')" value="2" ' + selectedOX02 + '/>';
                    modalWrite += '<label for="example02' + this.seq + '" ' + answerCheck[1] + '>' + this.example02 + '</label></li>';
                    modalWrite += '</ol>';
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>문제해설</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + commentary.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    modalWrite += '</div>';
                    modalWrite += '</div>';
                    i++;
                })
            }

            if (data.aTypeEA != 0) { // 객관식
                $.each(data.aType, function () {
                    var commentary = '';
                    var rightAnswer = '';
                    var selected01 = '';
                    var selected02 = '';
                    var selected03 = '';
                    var selected04 = '';
                    var selected05 = '';

                    if (this.userAnswer == this.answer) {
                        rightAnswer = 'Y';
                    } else {
                        rightAnswer = 'N';
                    }
                    modalWrite += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                    modalWrite += '<input type="hidden" name="testSeq[]" value="' + this.testSeq + '">';
                    modalWrite += '<div id="exam' + i + '"';
                    if (this.score != 0 && this.score != null) {
                        modalWrite += 'class="answerTrue"';
                    } else if (this.score == null) {
                        modalWrite += '';
                    } else {
                        modalWrite += 'class="answerFalse"';
                    }

                    if (rightAnswer == 'Y') { //채점 전이라도 채점 마킹 노출
                        modalWrite += 'class="answerTrue"';
                    } else if (rightAnswer == 'N') {
                        modalWrite += 'class="answerFalse"';
                    }
                    modalWrite += '>';
                    modalWrite += '<input type="hidden" name="rightAnswer[]" value="' + rightAnswer + '">';
                    modalWrite += '<h1>문제 ' + i + '</h1>';
                    modalWrite += '<h2>' + this.exam.replace(' ', '&nbsp;').replace(/  /g, '&nbsp;&nbsp;') + '</h2>';
                    modalWrite += '<h3 style="font-size:12pt;">';
                    if (this.score == null) {
                        score = '채점전';
                    } else {
                        score = this.score;
                    }
                    if (this.commentary == null) {
                        commentary = '해설이 없습니다.';
                    } else {
                        commentary = this.commentary;
                    }
                    modalWrite += '획득점수 : <strong>' + score + '</strong> 배점 : <strong>' + this.baseScore + '</strong> 출처 : <strong>' + this.sourceChapter + '차시</strong> 정답 : <strong>' + this.answer + '</strong>';
                    //modalWrite += '출제차시 : <strong>'+this.sourceChapter+'차시</strong>';
                    modalWrite += '</h3>';

                    if (this.userAnswer == 1) {
                        selected01 = 'checked="checked"';
                    } else if (this.userAnswer == 2) {
                        selected02 = 'checked="checked"';
                    } else if (this.userAnswer == 3) {
                        selected03 = 'checked="checked"';
                    } else if (this.userAnswer == 4) {
                        selected04 = 'checked="checked"';
                    } else if (this.userAnswer == 5) {
                        selected05 = 'checked="checked"';
                    }

                    var answerCheck = new Array;
                    var h = 0;
                    for (h = 0; h < 5; h++) {
                        if (this.answer == h + 1 && this.userAnswer == h + 1) {
                            answerCheck[h] = 'class="blue"'
                        } else if (this.answer == h + 1 && this.userAnswer != h + 1) {
                            answerCheck[h] = 'class="red"'
                        } else {
                            answerCheck[h] = ''
                        }
                    }
                    modalWrite += '<ol>';
                    modalWrite += '<li><input type="radio" id="example01' + this.seq + '" ' + selected01 + ' disabled/>';
                    modalWrite += '<label for="example01' + this.seq + '" ' + answerCheck[0] + '>1.&nbsp;' + this.example01 + '</label></li>';
                    modalWrite += '<li><input type="radio" id="example02' + this.seq + '" ' + selected02 + ' disabled/>';
                    modalWrite += '<label for="example02' + this.seq + '" ' + answerCheck[1] + '>2.&nbsp;' + this.example02 + '</label></li>';
                    modalWrite += '<li><input type="radio" id="example03' + this.seq + '" ' + selected03 + ' disabled/>';
                    modalWrite += '<label for="example03' + this.seq + '" ' + answerCheck[2] + '>3.&nbsp;' + this.example03 + '</label></li>';
                    modalWrite += '<li><input type="radio" id="example04' + this.seq + '" ' + selected04 + ' disabled/>';
                    modalWrite += '<label for="example04' + this.seq + '" ' + answerCheck[3] + '>4.&nbsp;' + this.example04 + '</label></li>';

                    if (this.example05 != undefined) {
                        modalWrite += '<li><input type="radio" id="example05' + this.seq + '" ' + selected05 + ' disabled/>';
                        modalWrite += '<label for="example05' + this.seq + '" ' + answerCheck[4] + '>5.&nbsp;' + this.example05 + '</label></li>';
                    }

                    modalWrite += '</ol>';
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>문제해설</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + commentary.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    modalWrite += '</div>';
                    modalWrite += '</div>';
                    i++;
                })
            }

            if (data.bTypeEA != 0) { // 단답형
                $.each(data.bType, function () {
                    var userAnswer = '';
                    var commentary = '';
                    var selectedY = '';
                    var selectedN = '';
                    var selectedNone = '';

                    if (this.score > 0) {
                        selectedY = 'selected="seleted"';
                    } else if (this.score == null) {
                        selectedNone = 'selected="seleted"';
                    } else {
                        selectedN = 'selected="seleted"';
                    }
                    if (this.userAnswer == null || this.userAnswer == '') {
                        userAnswer = '미작성';
                    } else {
                        userAnswer = this.userAnswer;
                    }
                    if (this.commentary == null) {
                        commentary = '해설이 없습니다.';
                    } else {
                        commentary = this.commentary;
                    }
                    modalWrite += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                    modalWrite += '<input type="hidden" name="testSeq[]" value="' + this.testSeq + '">';
                    modalWrite += '<div id="exam' + i + '"';
                    if (this.score != 0 && this.score != null) {
                        modalWrite += 'class="answerTrue"'
                    } else if (this.score == null) {
                        modalWrite += ''
                    } else {
                        modalWrite += 'class="answerFalse"'
                    }
                    modalWrite += '>'
                    modalWrite += '<h1>문제 ' + i + '</h1>';
                    modalWrite += '<h2>' + this.exam.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</h2>';
                    modalWrite += '<h3 style="font-size:12pt;">';
                    if (this.score == null) {
                        score = '채점전';
                    } else {
                        score = this.score;
                    }
                    modalWrite += '획득점수 : <strong>' + score + '</strong> 배점 : <strong>' + this.baseScore + '점</strong> 출처 : <strong>' + this.sourceChapter + '차시</strong>';
                    //modalWrite += '출제차시 : <strong>'+this.sourceChapter+'차시</strong>';
                    modalWrite += '<select name="rightAnswer[]">';
                    modalWrite += '<option value="" ' + selectedNone + '>선택하세요.</option>';
                    modalWrite += '<option value="Y" ' + selectedY + '>정답</option>';
                    modalWrite += '<option value="N" ' + selectedN + '>오답</option>';
                    modalWrite += '</select>';
                    modalWrite += '</h3>';
                    //modalWrite += '<input type="text" style="font-size:12pt;" value="'+userAnswer+'" readonly="readonly"/>';
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>제출답안</h1>';
                    if (this.userAnswer == null) {
                        modalWrite += '<div style="font-size:12pt;">미작성 (시간초과로 인한 자동제출)</div>';
                    } else {
                        modalWrite += '<div style="font-size:12pt;">' + this.userAnswer + '</div>';
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>모범답안</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + this.answer + '</div>';
                    modalWrite += '</div>';
                    if (loginUserLevel == '7' || loginUserLevel < '4') {
                        modalWrite += '<div class="commentaryArea">';
                        modalWrite += '<h1>참고</h1>';
                        if (typeof this.reference === 'undefined' || this.reference == null) {
                            modalWrite += '<div style="font-size:12pt;">&nbsp;</div>';
                        } else {
                            modalWrite += '<div style="font-size:12pt;">' + this.reference + '</div>';
                        }
                        modalWrite += '</div>';
                    }
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>문제해설</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + this.commentary.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    modalWrite += '</div>';
                    modalWrite += '</div>';
                    i++;
                })
            }

            if (data.cTypeEA != 0) { // 서술형
                $.each(data.cType, function () {
                    var userAnswer = '';
                    var commentary = '';
                    var correct = '';
                    var selectedY = '';
                    var selectedN = '';
                    if (this.userAnswer == null || this.userAnswer == '') {
                        userAnswer = '미작성 (시간초과로 인한 자동제출)';
                    } else {
                        userAnswer = this.userAnswer;
                    }
                    if (this.commentary == null) {
                        commentary = '해설이 없습니다.';
                    } else {
                        commentary = this.commentary;
                    }
                    if (this.correct == null) {
                        correct = '첨삭 내용이 없습니다.';
                    } else {
                        correct = this.correct;
                    }
                    if (this.score == null) {
                        scoreA = '채점전';
                    } else if (this.score == '') {
                        scoreA = '0';
                    } else {
                        scoreA = this.score;
                    }
                    score = this.score;
                    modalWrite += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                    modalWrite += '<input type="hidden" name="testSeq[]" value="' + this.testSeq + '">';
                    modalWrite += '<div id="exam' + i + '">'
                    modalWrite += '<h1>문제 ' + i + ' (서술형)</h1>';
                    modalWrite += '<h2>' + this.exam + '</h2>';
                    modalWrite += '<h3 style="font-size:12pt;">';
                    modalWrite += '획득점수 : <strong>' + scoreA + '</strong> 배점 : <strong>' + this.baseScore + ' 점</strong> 출처 : <strong>' + this.sourceChapter + '차시</strong>';
                    //modalWrite += '출제차시 : <strong>'+this.sourceChapter+'차시</strong>';
                    if (loginUserLevel == '7' || loginUserID == 'eungmin2') {
                        var c = 0;
                        //modalWrite +='<select name="cTypeScore[]" onchange="cTypeScoreVal(this.value);">';
                        modalWrite += '<select name="cTypeScore[]">';
                        modalWrite += '<option value="" ' + selectedN + '>선택하세요.</option>';

                        for (c = this.baseScore; c >= 0; c--) {
                            if (score == c && score != '') {
                                selectedY = 'selected="seleted"';
                            } else {
                                if (score == '') {
                                    selectedN = 'selected="seleted"';
                                } else {
                                    selectedY = '';
                                }
                            }
                            modalWrite += '<option value="' + c + '" ' + selectedY + '>' + c + ' 점</option>';
                        }
                        //modalWrite +='</select>  / (배점 : '+this.baseScore+'점)';
                        modalWrite += '</select>';
                    }
                    modalWrite += '</h3>';
                    modalWrite += '<textarea style="font-size:12pt;" readonly="readonly">' + userAnswer + '</textarea>';
                    /*
					modalWrite += '<div class="commentaryArea">';
					modalWrite += '<h1>문제해설</h1>';
					modalWrite += '<div>'+commentary.replace(/\n/g,'<br />').replace(/  /g,'&nbsp;&nbsp;')+'</div>';
					modalWrite += '</div>';
					*/
                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>채점기준</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + this.commentary.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    modalWrite += '</div>';

                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1 style="font-size:12pt;">모범답안</h1>';
                    modalWrite += '<div style="font-size:12pt;">' + this.answer.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    modalWrite += '</div>';

                    if (loginUserLevel == '7' || loginUserLevel < '4') {
                        modalWrite += '<div class="commentaryArea">';
                        modalWrite += '<h1 style="font-size:12pt;">참고</h1>';
                        if (typeof this.reference === 'undefined' || this.reference == null) {
                            modalWrite += '<div style="font-size:12pt;">&nbsp;</div>';
                        } else {
                            modalWrite += '<div style="font-size:12pt;">' + this.reference + '</div>';
                        }
                        modalWrite += '</div>';
                    }

                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>점수확인</h1>';
                    modalWrite += '<div style="font-size:12pt;"><input type="tel" name="scoreCheck[]" value="" style="width:50px; font-size:12pt;"> ※ 채점한 점수를 다시 확인하여 입력해주세요.(숫자만 입력)</div>';
                    modalWrite += '</div>';

                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1>첨삭지도</h1>';
                    //if(this.correct == null || data.testTutorTempSave != 'Y') {
                    if (this.correct == null) {
                        var correct = '';
                    } else {
                        var correct = this.correct;
                    }
                    if (loginUserLevel == '7' || loginUserID == 'eungmin2') {
                        modalWrite += '<div style="font-size:12pt;"><textarea name="correct[]" style="width:690px; height:200px; font-size:12pt;" oncontextmenu="return false" onkeydown="keyCheck(event)">' + correct + '</textarea></div>';
                    } else {
                        modalWrite += '<div style="font-size:12pt;">' + correct.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</div>';
                    }
                    modalWrite += '</div>';

                    modalWrite += '<div class="commentaryArea">';
                    modalWrite += '<h1 style="font-size:12pt;">모사답안</h1>';
                    modalWrite += '<div>';
                    modalWrite += '<input type="checkbox" name="copyCheck">';
                    if (data.testCopy == 'D' || data.testCopy == 'Y') {
                        testCopyCheck = 'checked="checked"';
                    }
                    if (loginUserLevel == '7') {
                        var testCopyValue = "value=D";
                    } else {
                        var testCopyValue = "value=Y";
                    }
                    modalWrite += '<input type="checkbox" name="testCopy" ' + testCopyCheck + ' id="testCopy" ' + testCopyValue + '><label for="testCopy" style="font-size:12pt;">모사의심</label>&nbsp;';
                    modalWrite += '<button type="button" class="btnTestCopy" onclick="mosaCheckTest(' + this.seq + ')">모사율 조회하기</button>';
                    if (loginUserLevel <= '4') {
                        if (this.testCopy == 'D') {
                            var testCopy = "N";
                            var testCopyM = "모사답안 의심 취소";
                        } else if (data.testCopy == 'Y') {
                            var testCopy = "N";
                            var testCopyM = "모사답안 확정 취소";
                        } else {
                            var testCopy = "Y";
                            var testCopyM = "모사답안 확정";
                        }
                        modalWrite += '<input type="hidden" name="testCopy" value="' + testCopy + '" id="testCopy">';
                        modalWrite += '&nbsp;&nbsp;|&nbsp;&nbsp;<button type="button" onClick="tempGrade(\'' + modalTestResultApi + '\')">' + testCopyM + '</button>';
                    }
                    modalWrite += '</div>';
                    modalWrite += '</div>';
                    modalWrite += '</div>';
                    i++;
                })
            }

            modalWrite += '</div>';

            if (loginUserLevel == '7' || loginUserID == 'eungmin2') {
                if (data.status == 'C') {
                    modalWrite += '<div class="btnArea"><strong class="blue" style="font-size:12pt;">채점이 완료 되었습니다.<br /><br /></strong></div>';
                } else {
                    modalWrite += '<div class="btnArea">';
                    modalWrite += '<button type="button" onClick="tempGrade(\'' + modalTestResultApi + '\')">임시저장</button>';
                    modalWrite += '<button type="button" onClick="tutorGrade(\'' + modalTestResultApi + '\',\'tests\',\'' + data.lectureEnd + '\',\'' + today + '\')">채점완료</button><br /><br />';
                    modalWrite += '</div>';
                }
            } else if (loginUserLevel <= '4') {
                if (data.status == 'C') {
                    modalWrite += '<div class="btnArea">';
                    if (data.studyEnd == 'Y') {
                        modalWrite += '수강이 마감된 과정입니다.';
                    } else {
                        modalWrite += '<button type="button" onClick="reScore(\'' + modalTestResultApi + '\')">채점 완료 취소</button>';
                    }
                    modalWrite += '</div>';

                } else if (data.bTypeEA == 0 && data.cTypeEA == 0) {
                    modalWrite += '<div class="btnArea">';
                    modalWrite += '<button type="button" onClick="autoResult(\'' + modalTestResultApi + '\',\'tests\',\'' + data.lectureEnd + '\',\'' + today + '\')">자동 채점 하기</button>';
                    modalWrite += '</div>';
                }
            }
            modalWrite += '</form>';

            modalWrite += '</div></div>';
            $('#contents').after(modalWrite);
            for (var j = 1; j < i; j++) {
                $('#contentsNav > form select').append('<option value="exam' + j + '">' + j + '번</option>');
            }
            modalAlign();
        })
    }

    //과제 결과조회
    else if (types == 'reportResultView') {
        var i = 1;
        var reportStatus = '';
        var reportScore = '';
        var answerType = '';
        var reportCopy = '';
        var reportCopyCheck = '';
        var returnCheck = '';
        var reportCheckTime = '';
        var comment = '';


        //modalWrite += '<div class="memberView">';
        //modalWrite += '<h1><strong>과제 결과</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';

        $.get(modalReportResultApi, {'lectureOpenSeq': modalSeq, 'userID': eachID, 'admin': 'Y'}, function (data) {
            if (data.totalCount == '0') {
                alert('로그아웃 상태입니다. 다시 로그인 해주시기 바랍니다.');
                top.location.href = 'https://' + siteURL + '/admin/';
            }

            //2018-11-30 김나영 추가
            modalWrite += '<div class="testView">';
            modalWrite += '<h1><strong>과제 결과</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
            modalWrite += '<div id="contentsNav">';
            modalWrite += '<h2 style="font-size:12pt; color:#000000;">과제 | <strong>' + data.contentsName + '</strong><br></h2>';
            modalWrite += '<table>';
            modalWrite += '<thead>';
            modalWrite += '<tr>';
            modalWrite += '<th>환산점수</th>';
            modalWrite += '<th>총점</th>';
            modalWrite += '</tr>';
            modalWrite += '</thead>';
            modalWrite += '<tbody>';
            modalWrite += '<tr>';
            modalWrite += '<td>' + data.reportCount + '</td>';
            if (data.reportResult[0].score == '' || data.reportResult[0].score == null) {
                var reportScore = '0';
            } else {
                var reportScore = data.reportResult[0].score;
            }
            modalWrite += '<td>' + reportScore + '</td>';
            modalWrite += '</tr>';
            modalWrite += '</tbody>';
            modalWrite += '</table>';
            modalWrite += '</div>';
            modalWrite += '<div>';
            //2018-11-30 김나영 추가 끝

            var today = data.nowTime.substr(0, 10);
            modalWrite += '<div class="testArea">'; //2018-11-30 김나영 수정
            modalWrite += '<h1 class="modalTitle">기본정보</h1>';
            modalWrite += '<ul class="modalList">'; //2018-11-30 김나영 수정

            // modalWrite +='<div class="BBSWrite">';
            //modalWrite +='<h1 class="modalTitle">기본정보</h1>';
            //modalWrite +='<ul>';
            modalWrite += '<li>';
            modalWrite += '<h1>과정명</h1>' + data.contentsName;
            modalWrite += '</li>';
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>아이디(이름)</h1>' + data.userID + '(' + data.userName + ')';
            modalWrite += '</div>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>회사명</h1>' + data.companyName;
            modalWrite += '</div>';
            modalWrite += '</li>';
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>진도율(전체)</h1>' + data.progress + ' %';
            modalWrite += '</div>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>수강기간</h1>' + data.lectureStart + ' ~ ' + data.lectureEnd;
            modalWrite += '</div>';
            modalWrite += '</li>';
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>응시일</h1>' + data.reportSaveTime;
            modalWrite += '</div>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>응시한 IP</h1>' + data.reportIP;
            modalWrite += '</div>';
            modalWrite += '</li>';
            if (data.reportCheckTime == null) {
                reportCheckTime = '채점 대기중';
            } else {
                reportCheckTime = data.reportCheckTime;
            }
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>채점시간</h1>' + reportCheckTime;
            modalWrite += '</div>';
            if (data.reportScore == null) {
                reportScore = '채점 대기중';
            } else {
                reportScore = data.reportScore;
            }
            modalWrite += '<div class="halfDiv">';
            modalWrite += '<h1>점수</h1>' + reportScore;
            modalWrite += '</div>';
            modalWrite += '</li>';
            modalWrite += '<li>';
            modalWrite += '<div class="halfDiv">';

            if (data.reportStatus == 'C') {
                reportStatus = '채점완료';
            } else if (data.reportStatus == 'N') {
                reportStatus = '미응시';
            } else if (data.reportStatus == 'Y') {
                reportStatus = '채점 대기중';
            } else if (data.reportStatus == 'R') {
                reportStatus = '반려';
            }

            modalWrite += '<h1>진행상황</h1>' + reportStatus;
            modalWrite += '</div>';
            modalWrite += '<div class="halfDiv">';

            if (data.reportCopy == 'Y') {
                reportCopy = '모사답안';
            } else if (data.reportCopy == 'D') {
                reportCopy = '모사답안 의심';
            } else {
                reportCopy = '정상';
            }

            modalWrite += '<h1>모사답안의심</h1>' + reportCopy;
            modalWrite += '</div>';
            modalWrite += '</li>';
            modalWrite += '</ul>';
            modalWrite += '</div>';
            modalWrite += '<div class="BBSList" style="height:440px;">';
            modalWrite += '<form class="tutorGrade" method="post">';
            modalWrite += '<input type="hidden" name="lectureOpenSeq" value="' + data.lectureOpenSeq + '">';
            modalWrite += '<input type="hidden" name="contentsCode" value="' + data.contentsCode + '">';
            modalWrite += '<input type="hidden" name="userID" value="' + data.userID + '">';
            modalWrite += '<h1 class="modalTitle">과제 (' + data.reportEA + '문항 / 총 ' + data.totalPassReport + '점)</h1>';

            if (data.totalCount != 0) {
                $.each(data.reportResult, function () {
                    modalWrite += '<table><thead><tr>';
                    modalWrite += '<th style="width:100px;">문제</th>';
                    modalWrite += '<th class="left">' + this.exam.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;');

                    if (this.examAttach != null) {
                        modalWrite += '<br /><br /><a href="fileDownLoad.php?fileName=' + encodeURI(this.examAttach) + '&link=' + encodeURIComponent(this.examAttachLink) + '" target="_blank">첨부파일 : ' + this.examAttach;
                    }

                    modalWrite += '</th></thead></tr>';

                    modalWrite += '<tbody>';
                    modalWrite += '<tr>';
                    modalWrite += '<td>채점기준</td>';
                    modalWrite += '<td class="left">' + this.rubric.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;');
                    if (this.rubricAttach != '') {
                        modalWrite += '<br /><a href="fileDownLoad.php?fileName=' + encodeURI(this.rubricAttach) + '&link=' + encodeURIComponent(this.rubricAttachLink) + '" target="_blank">첨부파일 : ' + this.rubricAttach + '</td>';
                    }
                    modalWrite += '</tr>';
                    modalWrite += '<tr>';
                    modalWrite += '<td>제출답안</td>';

										answerType = '';
                    if (this.answerType == 'text') {
                        answerType = this.answerText.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;');
                    } else {
                        answerType += '링크 1 : <a href="fileDownLoad.php?fileName=' + encodeURI(this.answerAttach) + '&link=' + encodeURIComponent(this.attachLink) + '" target="_blank">' + this.answerAttach + '</a><br />';
                        //answerType += '링크 2 : <a href="'+this.attachLink+'" target="_blank">'+this.answerAttach+'</a><br />';
                        //answerType += '(링크 1,2 둘다 다운로드시 파일이 깨지는 경우 마우스 우클릭 > "다른이름으로 대상 저장" 하시기 바랍니다.)';
                    }

                    modalWrite += '<td class="left">' + answerType + '</td>';
                    modalWrite += '</tr>';
                    if (loginUserLevel == '7' || loginUserLevel < '4') {
                        modalWrite += '<tr>';
                        modalWrite += '<td>참고</td>';
                        if (typeof this.reference === 'undefined' || this.reference == null) {
                            modalWrite += '<td class="left"></td>';
                        } else {
                            modalWrite += '<td class="left">' + this.reference;
                            if (this.referenceAttach != '' && this.referenceAttach != null) {
                                modalWrite += '<br /><a href="fileDownLoad.php?fileName=' + encodeURI(this.referenceAttach) + '&link=' + encodeURIComponent(this.referenceAttachLink) + '" target="_blank">첨부파일 : ' + this.referenceAttach + '</a><br />(다운로드시 파일이 깨지는 경우 마우스 우클릭 > "다른이름으로 대상 저장" 하시기 바랍니다.)';
                            }
                            modalWrite += '</td>';
                        }
                        modalWrite += '</tr>';
                    }
                    modalWrite += '<tr>';
                    modalWrite += '<td>모범답안</td>';
                    modalWrite += '<td class="left">' + this.example.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;');

                    if (this.exampleAttach != '' && this.exampleAttach != null) {
                        modalWrite += '<br /><a href="fileDownLoad.php?fileName=' + encodeURI(this.exampleAttach) + '&link=' + encodeURIComponent(this.exampleAttachLink) + '" target="_blank">첨부파일 : ' + this.exampleAttach + '</a><br />(다운로드시 파일이 깨지는 경우 마우스 우클릭 > "다른이름으로 대상 저장" 하시기 바랍니다.)';
                    }

                    modalWrite += '</td></tr>';
                    modalWrite += '<tr>';
                    modalWrite += '<td>획득점수</td>';

                    if (this.score == null) {
                        var reportScore = '';
                    } else {
                        var reportScore = this.score;
                    }

                    if (loginUserLevel == '7') {
                        var c = '';
                        var selectedY = '';
                        var selectedN = '';
                        modalWrite += '<td class="left">';
                        modalWrite += '<select name="reportScore[]">';
                        for (c = this.baseScore; c >= 0; c--) {
                            if (reportScore == c) {
                                selectedY = 'selected="seleted"';
                            } else {
                                if (reportScore == '') {
                                    selectedN = 'selected="seleted"';
                                } else {
                                    selectedY = '';
                                }
                            }
                            modalWrite += '<option value="' + c + '" ' + selectedY + '>' + c + ' 점</option>';
                        }
                        modalWrite += '<option value="" ' + selectedN + '>선택하세요.</option>';
                        modalWrite += '</select>  / (배점 : ' + this.baseScore + '점)</td>';

                    } else {
                        if (reportScore == '') {
                            modalWrite += '<td class="left">미채점 / (배점 ' + this.baseScore + '점)</td>';
                        } else {
                            modalWrite += '<td class="left">' + reportScore + ' 점 / (배점 ' + this.baseScore + '점)</td>';
                        }
                    }

                    modalWrite += '</tr>';
                    modalWrite += '<tr>';
                    modalWrite += '<td>첨삭지도</td>';

                    if (this.comment == null) {
                        comment = '';
                    } else {
                        comment = this.comment;
                    }

                    if (loginUserLevel == '7') {
                        modalWrite += '<td class="left"><textarea style="width:600px; height:200px;" name="comment[]" oncontextmenu="return false" onkeydown="keyCheck(event)" oncontextmenu="return false" >' + comment + '</textarea></td>';
                    } else {
                        modalWrite += '<td class="left"><span style="font-size:13pt; color:red;">' + comment.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</span></td>';
                    }

                    modalWrite += '</tr>';

                    modalWrite += '<tr>';
                    modalWrite += '<td>반려</td>';

                    if (data.reportStatus == 'R') {
                        returnCheck = 'checked="checked"';
                    }

                    selectedY = 'selected="seleted"';
                    modalWrite += '<td class="left"><input type="checkbox" name="return" id="return" value="Y" ' + returnCheck + '/><label for="return"> 반려처리 (반드시 반려사유를 상단에 작성해주세요.)</label></td>';
                    modalWrite += '</tr>';
                    modalWrite += '<tr>';
                    modalWrite += '<td>모사답안</td>';

                    if (data.reportCopy == 'D' || data.reportCopy == 'Y') {
                        reportCopyCheck = 'checked="checked"';
                    }

                    if (loginUserLevel == '7') {
                        var reportCopyValue = "value=D";
                    } else {
                        var reportCopyValue = "value=Y";
                    }
                    modalWrite += '<td class="left">';
                    modalWrite += '<input type="checkbox" name="copyCheck">';
                    modalWrite += '<input type="checkbox" name="reportCopy" ' + reportCopyCheck + ' id="reportCopy" ' + reportCopyValue + '><label for="reportCopy" style="font-size:12pt;">모사의심</label>';
                    modalWrite += '&nbsp;&nbsp;|&nbsp;&nbsp;<button type="button" class="btnReportCopy" onclick="mosaCheck(' + this.seq + ')">모사율 조회하기</button>';
                    //modalWrite +='&nbsp;&nbsp;|&nbsp;&nbsp;<button type="button" onclick="mosaDetail('+this.seq+')">모사답안 상세조회</button>';
                    if (loginUserLevel <= '4') {
                        if (this.reportCopy == 'D') {
                            var reportCopy = "N";
                            var reportCopyM = "모사답안 의심 취소";
                        } else if (data.reportCopy == 'Y') {
                            var reportCopy = "N";
                            var reportCopyM = "모사답안 확정 취소";
                        } else {
                            var reportCopy = "Y";
                            var reportCopyM = "모사답안 확정";
                        }
                        modalWrite += '<input type="hidden" name="reportCopy" value="' + reportCopy + '" id="reportCopy">';
                        modalWrite += '&nbsp;&nbsp;|&nbsp;&nbsp;<button type="button" onClick="tempGrade(\'' + modalReportResultApi + '\')">' + reportCopyM + '</button>';
                    }
                    /*
					modalWrite +='<br />수강 종료일 ('+data.lectureEnd+') 이후 모사율 조회가 가능합니다.<br />모사율이 검사대기로 나오는 경우 수강 종료일 이후 조회해주시기 바랍니다.';
					modalWrite +='</td></tr>';
					*/
                    //}

                    modalWrite += '<tr>';
                    modalWrite += '<td>정보</td>';
                    modalWrite += '<td class="left">출처 차시 : ' + this.sourceChapter + ', 문제 ID : ' + this.reportSeq + '</td>';
                    modalWrite += '</tr>';
                    modalWrite += '</tbody></table><br />';
                    modalWrite += '<input type="hidden" name="seq[]" value="' + this.seq + '">';
                    i++;
                })
            }
            if (loginUserLevel == '7') {
                if (data.reportStatus == 'C') {
                    modalWrite += '<div class="btnArea"><strong class="blue" style="font-size:12pt;">채점이 완료 되었습니다.<br /><br /></strong></div>';
                } else {
                    modalWrite += '<div class="btnArea">'
                    modalWrite += '<button type="button" onClick="tempGrade(\'' + modalReportResultApi + '\')">임시저장</button>';
                    modalWrite += '<button type="button" onClick="tutorGrade(\'' + modalReportResultApi + '\',\'reports\',\'' + data.lectureEnd + '\',\'' + today + '\',\'' + data.marketerID + '\')">채점완료</button>';
                    modalWrite += '</div>'
                }
            } else if (loginUserLevel <= '4') {
                if (data.reportStatus == 'C') {
                    modalWrite += '<div class="btnArea">'
                    if (data.studyEnd == 'Y') {
                        modalWrite += '수강이 마감된 과정입니다.';
                    } else {
                        modalWrite += '<button type="button" onClick="reScore(\'' + modalReportResultApi + '\')">채점 완료 취소</button>';
                    }
                    modalWrite += '</div>'
                }
            }
            modalWrite += '</form>';
            modalWrite += '</div></div></div>';
            $('#contents').after(modalWrite);
            modalAlign();
        })
    } else if (types == 'contentsView') {
        var i = 1;
        var reportStatus = '';
        var answerType = '';
        var returnCheck = '';
        var passCode = '';

        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>과정 정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div>'
        $.get(modalContentsApi, {'contentsCode': eachID}, function (data) {
            $.each(data.contents, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>' + this.contentsName + '</h1>';
                modalWrite += '<ul>';
                modalWrite += '<li>';
                modalWrite += '<h1>수강 등록수</h1><b>' + this.studyCount + '</b> (현재까지 사업주(환급)으로 등록된 총 과정 수)';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>등급/과정코드</h1>' + this.contentsGrade + ' / ' + this.contentsCode;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>사용여부</h1>' + this.enabled.replace('Y', '사용').replace('N', '미사용');
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                if (this.passCode == null) {
                    passCode = '미입력';
                } else {
                    passCode = this.passCode;
                }

                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>심사코드</h1>' + passCode;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>내용전문가</h1>' + this.professor;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>과정분류</h1>' + this.sort01;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수강구분</h1>' + this.serviceType;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>차시수</h1>' + this.chapter;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>교육시간</h1>' + this.contentsTime;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>교육비용</h1>' + toPriceNum(this.price);
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>우선지원</h1>' + toPriceNum(this.rPrice01);
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>대규모 1000인미만</h1>' + toPriceNum(this.rPrice02);
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>대규모 1000인이상</h1>' + toPriceNum(this.rPrice03);
                modalWrite += '</div>';
                modalWrite += '</li>';
                if (this.contentsPeriod == null) {
                    var contentsPeriod = '';
                } else {
                    var contentsPeriod = this.contentsPeriod;
                }
                if (this.contentsExpire == null) {
                    var contentsExpire = '';
                } else {
                    var contentsExpire = this.contentsExpire;
                }
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>콘텐츠 유효기간</h1>' + contentsPeriod;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>인정만료일</h1>' + contentsExpire;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>공급사</h1>' + this.cp;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수수료</h1>' + this.commission;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>모바일지원</h1>' + this.mobile;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>플레이방식</h1>' + this.sourceType;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>참고도서명</h1>' + this.bookIntro;
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>중간평가</h1>';
                modalWrite += '진위형 : ' + this.mid04EA + '문항 (배점:' + this.mid04Score + '),';
                modalWrite += '객관식 : ' + this.mid01EA + '문항 (배점:' + this.mid01Score + '),';
                modalWrite += '단답형 : ' + this.mid02EA + '문항 (배점:' + this.mid02Score + '),';
                modalWrite += '서술형 : ' + this.mid03EA + '문항 (배점:' + this.mid03Score + ')';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>최종평가</h1>';
                modalWrite += '진위형 : ' + this.test04EA + '문항 (배점:' + this.test04Score + '),';
                modalWrite += '객관식 : ' + this.test01EA + '문항 (배점:' + this.test01Score + '),';
                modalWrite += '단답형 : ' + this.test02EA + '문항 (배점:' + this.test02Score + '),';
                modalWrite += '서술형 : ' + this.test03EA + '문항 (배점:' + this.test03Score + ') | ';
                modalWrite += '시간 : ' + this.testTime + '분';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>과제</h1> ' + this.reportEA + '문항 (배점:' + this.reportScore + ')';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>수료기준</h1><div class="normalText">' + this.passProgress + '% 이상, 총점 ' + this.passScore + ' 점 이상<br />';
                modalWrite += '총점 반영 비율: 중간평가 ' + this.midRate + '%, 최종평가 ' + this.testRate + '%, 과제 ' + this.reportRate + '%<br />';
                modalWrite += '최종평가 : ' + this.totalPassTest + '점 중 최소 ' + this.passTest + '점 이상<br />';
                modalWrite += '과제 : ' + this.totalPassReport + ' 점 중 최소 ' + this.passReport + '점 이상';
                modalWrite += '</div></li>';
                modalWrite += '<li>';
                modalWrite += '<h1>과정소개</h1><div class="normalText">' + this.intro;
                modalWrite += '</div></li>';
                modalWrite += '<li>';
                modalWrite += '<h1>교육대상</h1><div class="normalText">' + this.target;
                modalWrite += '</div></li>';
                modalWrite += '<li>';
                modalWrite += '<h1>교육목표</h1><div class="normalText">' + this.goal;
                modalWrite += '</div></li>';
                modalWrite += '</ul>';
                modalWrite += '</div>';
                modalWrite += '</div>';
                modalWrite += '</div>';
            })
            $('#contents').after(modalWrite);
            modalAlign();

        })
    } else if (types == 'surveyView') { //설문상세내용
        var reportStatus = '';
        var answerType = '';
        var returnCheck = '';

        modalWrite += '<div class="serveyModal">';
        modalWrite += '<h1><strong>설문 조사</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';

        $.get(modalSurveyApi, {'lectureOpenSeq': modalSeq, 'userID': eachID, 'contentsCode': option}, function (data) {
            $.each(data.survey, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>' + this.contentsName + '</h1>';
                modalWrite += '<ul>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>아이디/이름</h1>' + this.userID + ' / ' + this.userName;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수강기간</h1>' + this.lectureStart + ' ~ ' + this.lectureEnd;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '</ul>';
                modalWrite += '<ol>';
                $.each(this.answer, function () {
                    var userAnswer = this.userAnswer;
                    modalWrite += '<li>';
                    $.each(this.exam, function () {
                        modalWrite += '<h1>' + this.exam.replace(/\n/g, '<br />').replace(/  /g, '&nbsp;&nbsp;') + '</h1>';
                        var i = 1;
                        if (this.surveyType == 'A') {
                            var maxNum = 4;
                            if (this.example05 != undefined) {
                                maxNum = 5;
                            }
                            for (i = 1; i <= maxNum; i++) {
                                if (i == this.userAnswer) {
                                    modalWrite += '<p>'
                                    modalWrite += i + '번 : ' + eval('this.example0' + i)
                                    modalWrite += '</p>'
                                }
                            }
                            modalWrite += '</li>'
                        } else {
                            modalWrite += '<p>' + this.userAnswer + '</p>';
                            modalWrite += '</li>'
                        }
                        i++;
                    })
                })
                modalWrite += '</ol>';
                modalWrite += '</div></div>';
            })
            $('#contents').after(modalWrite);
            modalAlign();
        })
    }
    // 180502 한상민(수료/미수료 처리)
    else if (types == 'passOKView') {
        var reportStatus = '';
        var answerType = '';
        var returnCheck = '';

        modalWrite += '<div class="passOKView" style="width:795px;">';
        modalWrite += '<h1><strong>수료/미수료 처리</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<form class="passOKForm">';
        $.get(modalStudyApi, {'lectureOpenSeq': modalSeq, 'userID': eachID}, function (data) {
            $.each(data.study, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1></h1>';
                modalWrite += '<ul>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>아이디/이름</h1>' + this.user.userID + ' / ' + this.user.userName;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수강기간</h1>' + this.lectureStart + ' ~ ' + this.lectureEnd;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>과정</h1>' + this.contents.contentsName;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수료 여부</h1>';

                if (this.passOK == "W") {
                    var select01 = 'selected="selected"';
                } else if (this.passOK == "Y") {
                    var select02 = 'selected="selected"';
                } else {
                    var select03 = 'selected="selected"';
                }
                modalWrite += '<input id="beforePassOkStatus" type="hidden" value="' + this.passOK + '">';
                modalWrite += '<select id="passOkStatus" name="passOkStatus">'
                modalWrite += '<option value="W" ' + select01 + '> 진행중 </option>'
                modalWrite += '<option value="Y" ' + select02 + '> 수료 </option>'
                modalWrite += '<option value="N" ' + select03 + '> 미수료 </option>'

                modalWrite += '</select>'

                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="fullDiv">';
                modalWrite += '<h1>메모</h1>'
                modalWrite += '<textarea id="passOKMemo" name="passOKMemo" style="resize:none;">' + this.passOKMemo + '</textarea>'
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<div class="btnArea">'
                modalWrite += '<button type="button" onclick="passOKSave(' + modalSeq + ', \'' + eachID + '\')">저장하기</button>'
                modalWrite += '<button type="button" onclick="listAct()">목록으로</button>'
                modalWrite += '</div>'
                modalWrite += '</ul>';
                modalWrite += '<ol>';

                modalWrite += '</ol>';
                modalWrite += '</div></div>';
            })
            modalWrite += '</form>';
            $('#contents').after(modalWrite);
            modalAlign();
        })
    }
        //

    // 재채점 요청 팝업
    else if (types == 'remark') {
        modalWrite += '<div class="passOKView" style="width:795px;">';
        modalWrite += '<h1><strong>재채점요청</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<form class="passOKForm">';

        modalWrite += '<div class="BBSWrite">';
        modalWrite += '<h1></h1>';
        modalWrite += '<ul>';
        modalWrite += '<li>';
        modalWrite += '<div class="halfDiv">';
        modalWrite += '<h1>아이디/이름</h1>123123123';
        modalWrite += '</div>';
        modalWrite += '<div class="halfDiv">';
        modalWrite += '<h1>수강기간</h1>???'
        modalWrite += '</div>';
        modalWrite += '</li>';
        modalWrite += '<li>';
        modalWrite += '<div class="halfDiv">';
        modalWrite += '<h1>과정</h1>qweqweqwe';
        modalWrite += '</div>';
        modalWrite += '<div class="halfDiv">';
        modalWrite += '<h1>재채점 사유</h1>';
        modalWrite += '<select id="reason" name="reason">';
        modalWrite += '<option value="584"> 점수배점오류 </option>';
        modalWrite += '<option value="585"> 첨삭지도내용오류 </option>';
        modalWrite += '<option value="586"> 답안재검토 </option>';
        modalWrite += '<option value="587"> 오타 </option>';
        modalWrite += '<option value="588"> 기타 </option>';
        modalWrite += '<option value="589"> 모범답안추가 </option>';
        modalWrite += '<option value="590"> 시스템오류 </option>';
        modalWrite += '<option value="591"> 채점기준준수 예외사항 </option>';
        modalWrite += '</select>'
        modalWrite += '</div>';
        modalWrite += '</li>';
        modalWrite += '<li>';
        modalWrite += '<div class="fullDiv">';
        modalWrite += '<h1>재채점 요청내용</h1>'
        modalWrite += '<textarea id="request" name="request" style="resize:none;"></textarea>'
        modalWrite += '</div>';
        modalWrite += '</li>';
        modalWrite += '<div class="btnArea">'
        modalWrite += '<button type="button" onclick="remarkSave(\'\', \'\')">저장하기</button>'
        modalWrite += '<button type="button" onclick="listAct()">목록으로</button>'
        modalWrite += '</div>'
        modalWrite += '</ul>';
        modalWrite += '<ol>';

        modalWrite += '</ol>';
        modalWrite += '</div></div>';
        modalWrite += '</form>';
        $('#contents').after(modalWrite);
        modalAlign();
    }

    //수강 신청 현황
    else if (types == 'order') {
        var i = 1;
        var totalEA = '';
        var eaTotal = 0;
        var priceTotal = 0;
        var rPriceTotal = 0;
        var lectureStart = '';
        var lectureEnd = '';

        modalWrite += '<div class="orderView">';
        modalWrite += '<h1><strong>신청 내역</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div>'
        modalWrite += '<form class="paymentApproval" method="post" action="javascript:paymentApprovals()">';

        $.get(modalOrderApi, {'orderNum': eachID}, function (data) {

            // console.log(data.order);
            $.each(data.order, function () {
                lectureStart = this.lectureStart;
                lectureEnd = this.lectureEnd;

                modalWrite += '<div class="BBSList">';
                modalWrite += '<h1>신청 과정</h1>';
                modalWrite += '<table><thead><tr>';
                modalWrite += '<th style="width:50px;">번호</th>';
                modalWrite += '<th >신청과정명</th>';
                modalWrite += '<th style="width:180px;">수강기간</th>';
                //modalWrite +='<th style="width:80px;">수강인원</th>';
                modalWrite += '<th style="width:80px;">교육비</th>';
                //modalWrite +='<th style="width:80px;">환급비</th>';
                modalWrite += '</thead></tr>';
                modalWrite += '<tbody>';
                modalWrite += '<input type="hidden" name="orderNum" value="' + this.orderNum + '">';
                modalWrite += '<input type="hidden" name="serviceType" value="' + this.serviceType + '">';
                modalWrite += '<input type="hidden" name="userID" value="' + this.userID + '">';
                modalWrite += '<input type="hidden" name="lectureStart" value="' + lectureStart + '">';
                modalWrite += '<input type="hidden" name="lectureEnd" value="' + lectureEnd + '">';

                modalWrite += '<tr>';
                modalWrite += '<td>' + i + '</td>';
                modalWrite += '<td>' + this.orderName + '</td>';
                if (lectureStart == '0000-00-00') {
                    var lectureDay = '승인일로부터 1개월';
                } else {
                    var lectureDay = lectureStart + ' ~ ' + lectureEnd;
                }
                modalWrite += '<td>' + lectureDay + '</td>';
                //modalWrite +='<td>'+this.EA+'</td>';
                modalWrite += '<td>' + this.educationPrice + '</td>';
                //modalWrite +='<td>'+this.rPrice+'</td>';
                modalWrite += '</tr>';
                modalWrite += '<input type="hidden" name="contentsCode[]" value="' + this.contentsCode + '">';
                /*
				if(data.orderCount != 0){
					$.each(this.detail,function(){
						modalWrite +='<tr>';
						modalWrite +='<td>'+i+'</td>';
						modalWrite +='<td>'+this.ㅐㄱ+'</td>';
						modalWrite +='<td>'+lectureStart+' ~ '+lectureEnd+'</td>';
						//modalWrite +='<td>'+this.EA+'</td>';
						modalWrite +='<td>'+this.price+'</td>';
						//modalWrite +='<td>'+this.rPrice+'</td>';
						modalWrite +='</tr>';
						modalWrite +='<input type="hidden" name="contentsCode[]" value="'+this.contentsCode+'">';
						eaTotal = parseInt(eaTotal) + parseInt(this.EA);
						priceTotal = parseInt(priceTotal) + parseInt(this.price);
						rPriceTotal = parseInt(rPriceTotal) + parseInt(this.rPrice);
						i++;
					})
				} else {
						modalWrite +='<tr>';
						modalWrite +='<td colspan="5">신청 내역이 없습니다.</td>';
						modalWrite +='</tr>';
				}


				modalWrite +='<tr>';
				modalWrite +='<td colspan="3">합계</td>';
				//modalWrite +='<td>'+eaTotal+'</td>';
				modalWrite +='<td>'+priceTotal+'</td>';
				//modalWrite +='<td>'+rPriceTotal+'</td>';
				modalWrite +='</tr>';
				*/
                modalWrite += '</tbody></table>';
                modalWrite += '</div>';

                if (this.serviceType == 1) { // 사업주 개별 , 사업주
                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>신청자 정보</h1>';
                    modalWrite += '<ul>';
                    /*
					modalWrite +='<li>';
					modalWrite +='<h1>신청구분</h1>';
					modalWrite +='<div class="normalText">';
					modalWrite +=this.serviceTypeName;
					modalWrite +='</div>';
					modalWrite +='</li>';
					*/
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청자명</h1>' + this.userName + ' (' + this.userID + ')';
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청일</h1>' + this.orderDate;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>휴대폰</h1>' + this.mobile;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>이메일</h1>' + this.email;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>최종학력</h1>' + this.education;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1></h1>';
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '</ul></div>';

                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>결제 정보(메인)</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>표준훈련비</h1>';
                    if (this.selfPrice) {
                        modalWrite += toPriceNum(this.selfPrice);
                    } else {
                        modalWrite += '0원';
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>정부지원금</h1>';
                    if (this.hrdPrice) {
                        modalWrite += toPriceNum(this.hrdPrice);
                    } else {
                        modalWrite += '0원';
                    }
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>자비부담금</h1>';
                    if (this.hrdSelfPrice) {
                        modalWrite += toPriceNum(this.hrdSelfPrice);
                    } else {
                        modalWrite += '0원';
                    }
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>패널티자비부담금</h1>';
                    modalWrite += '<select id="pntStatus" name="pntStatus" onchange="pntChange();">';
                    modalWrite += '<option value="N"';

                    if (this.pntStatus == 'N') {
                        modalWrite += ' selected="selected"';
                    }
                    modalWrite += '>N</option>';
                    modalWrite += '<option value="Y"';

                    if (this.pntStatus == 'Y') {
                        modalWrite += ' selected="selected"';
                    }

                    modalWrite += '>Y</option>';

                    modalWrite += '</select>';

                    var orderOC = '';
                    if (this.orderOpenChapter != "") {
                        orderOC = this.orderOpenChapter;
                    }
                    var dis = "";
                    if (this.pntStatus != 'Y') {
                        var dis = "none";
                    }
                    var pntPrice = '';
                    if (this.pntPrice) {
                        var pntPrice = this.pntPrice;
                    } else {
                        var pntPrice = '0';
                    }
                    modalWrite += '<input type="text" id="pntPrice" value="' + pntPrice + '" style="display:' + dis + '; margin-left:5px; width:100px;">';

                    if (this.payStatus != 'Y') {
                        modalWrite += '<button type="button" onclick="pntSave(' + this.seq + ',' + this.hrdSelfPrice + ')" style="margin-left:5px;">수정</button>';
                    }
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                    modalWrite += '<li>';
                    modalWrite += '<h1 style="color:red"><b>총 결제금</b></h1>';
                    //var totalHrdPrice = eval(this.hrdSelfPrice) + eval(this.pntPrice);
                    //modalWrite +='<span style="color:red;display:inline;"><b id="totalHrdPrice">'+toPriceNum(this.price)+'</b></span>';
                    modalWrite += '<span style="color:red;display:inline;"><b id="totalHrdPrice">' + toPriceNum(this.price) + '</b></span>';

                    modalWrite += '<select name="payStatus" id="payStatusN" style="margin-left:10px;';
                    /*if (this.payStatus == 'Y') {
						modalWrite += 'display:none;';
					}*/
                    modalWrite += '">';
                    modalWrite += '<option value="N"';
                    if (this.payStatus == 'N') {
                        modalWrite += ' selected';
                    }
                    modalWrite += '>결제승인대기</option>';
                    modalWrite += '<option value="Y"';
                    if (this.payStatus == 'Y') {
                        modalWrite += ' selected';
                    }
                    modalWrite += '>결제승인</option>';
                    modalWrite += '</select>';
                    modalWrite += '<button type="button" id="payStatusBtn" onclick="payStatusSave(' + this.seq + ')" style="margin-left:10px;';
                    /*if (this.payStatus == 'Y') {
						modalWrite += 'display:none;';
					}*/
                    modalWrite += '">수정</button>';
                    modalWrite += ' <span id="payStatusY" style="color:red;';
                    if (this.payStatus != 'Y') {
                        modalWrite += 'display:none;';
                    }
                    modalWrite += '"><b>[결제승인완료]</b></span>';
                    modalWrite += '</li>';

                    modalWrite += '<li>';
                    modalWrite += '<h1><b>결제상태</b></h1>';
                    if (this.mainStatus == 'Y') {
                        modalWrite += '<span style="width:10%;color:#0000ff;">결제완료</span><button type="button" onclick="showReceiptByTID(\'kiraedu\', \'' + this.mainTid + '\', \'' + this.mainAuthdata + '\')">영수증</button>';
                    } else if (this.mainStatus == 'C') {
                        modalWrite += '<span style="width:10%;color:#0000ff;">결제취소</span><button type="button" onclick="showReceiptByTID(\'kiraedu\', \'' + this.mainTid + '\', \'' + this.mainAuthdata + '\')">영수증</button>';
                    } else {
                        modalWrite += '<td style="color:#ff0000;">결제대기<br>';
                    }
                    //modalWrite +=;
                    modalWrite += '</li>';

                    modalWrite += '</ul></div>';

                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>결제 정보(추가)</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<h1>추가결제 등록</h1>';
                    modalWrite += '<input type="text" id="addOrderName" name="addOrderName" style="width:300px" placeholder="결제요청명">';
                    modalWrite += '<input type="text" id="addOrderPrice" name="addOrderPrice" style="width:150px;margin-left:10px;" placeholder="요청금액">';
                    modalWrite += '<button type="button" style="margin-left:10px;" onclick="addOrder(' + this.seq + ',\'' + this.userID + '\')">등록</button>';
                    modalWrite += '</li>';
                    modalWrite += '</ul>';
                    modalWrite += '<ul id="addOrderList">';
                    modalWrite += '</ul></div>';
                    orderSeq = this.seq;

                } else if (this.serviceType == 4) { //
                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>신청자 정보</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<h1>신청구분</h1>';
                    modalWrite += '<div class="normalText">';
                    modalWrite += this.serviceTypeName;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청자명</h1>' + this.userName + ' (' + this.userID + ')';
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청일</h1>' + this.orderDate;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>소속회사</h1>' + this.company.companyName;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>휴대폰</h1>' + this.mobile;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>이메일</h1>' + this.email;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1></h1>';
                    modalWrite += '</div>';
                    modalWrite += '</li>';

                } else { // 능력 개발, 일반(비환급)
                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>신청자 정보</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<h1>신청구분</h1>';
                    modalWrite += '<div class="normalText">';
                    modalWrite += this.serviceTypeName;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청자명</h1>' + this.recipientName + ' (' + this.userID + ')';
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>신청일</h1>' + this.orderDate;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>사업주</h1>' + this.company.companyName;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>휴대폰</h1>' + this.company.recipientMobile01 + '-' + this.company.recipientMobile02 + '-' + this.company.recipientMobile03;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>이메일</h1>' + this.company.recipientEmail01 + '@' + this.company.recipientEmail02;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1></h1>';
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    /*
					// 배송 정보
					modalWrite +='<div class="BBSWrite">';
					modalWrite +='<h1>배송 정보</h1>';
					modalWrite +='<ul>';
					modalWrite +='<li>';
					modalWrite +='<h1>받는분</h1>';
					modalWrite +='<div class="normalText">';
					modalWrite +=this.recipient.recipientName;
					modalWrite +='</div>';
					modalWrite +='</li>';
					modalWrite +='<li>';
					modalWrite +='<div class="halfDiv">';
					modalWrite +='<h1>연락처</h1>'+this.recipient.recipientPhone01+'-'+this.recipient.recipientPhone02+'-'+this.recipient.recipientPhone03;
					modalWrite +='</div>';
					modalWrite +='<div class="halfDiv">';
					modalWrite +='<h1>휴대폰</h1>'+this.recipient.recipientMobile01+'-'+this.recipient.recipientMobile02+'-'+this.recipient.recipientMobile03;
					modalWrite +='</div>';
					modalWrite +='</li>';
					modalWrite +='<li>';
					modalWrite +='<h1>주소</h1>';
					modalWrite +='<div class="normalText">';
					modalWrite +='('+this.recipient.recipientZipCode+') '+this.recipient.recipientAddress01+' '+this.recipient.recipientAddress02;
					modalWrite +='</div>';
					modalWrite +='</li>';
					modalWrite +='<li>';
					modalWrite +='<h1>요청사항</h1>';
					modalWrite +='<div class="normalText">';
					modalWrite +=this.recipient.recipientMemo;
					modalWrite +='</div>';
					modalWrite +='</li>';
*/
                    modalWrite += '</ul>';
                    modalWrite += '</div>';

                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>결제 정보</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<h1>결제상태</h1>';
                    modalWrite += '<div class="normalText">';
                    //modalWrite +='<form class="paymentApproval" method="post" action="javascript:paymentApprovals()">';
                    modalWrite += this.orderStatusName;
                    if (loginUserLevel < '5') {
                        if (this.serviceType != '1') {
                            if (this.orderStatus == 'Y') {
                                modalWrite += '&nbsp;&nbsp;<button type="submit">결제취소</button>';
                                modalWrite += '<input type="hidden" name="orderStatus" id="orderStatus" value="N">';
                            } else if (this.orderStatus == 'C') {
                                modalWrite += '&nbsp;&nbsp;<button type="submit">결제취소</button>';
                                modalWrite += '<input type="hidden" name="orderStatus" id="orderStatus" value="X">';
                            } else if (this.orderStatus == 'X') {
                                modalWrite += '&nbsp;&nbsp;<button type="submit">결제승인</button>';
                                modalWrite += '<input type="hidden" name="orderStatus" id="orderStatus" value="Y">';
                                modalWrite += '&nbsp;&nbsp;<button type="button" onclick="javascript:CompanionF()">결제반려</button>';
                                modalWrite += '<input type="hidden" name="Companion" id="Companion">';
                            } else if (this.orderStatus == 'P') {
                                modalWrite += '&nbsp;&nbsp;<button type="submit">반려취소</button>';
                                modalWrite += '<input type="hidden" name="orderStatus" id="orderStatus" value="N">';
                            } else {
                                modalWrite += '&nbsp;&nbsp;<button type="submit">결제승인</button>';
                                modalWrite += '<input type="hidden" name="orderStatus" id="orderStatus" value="Y">';
                                modalWrite += '&nbsp;&nbsp;<button type="button" onclick="javascript:CompanionF()">결제반려</button>';
                                modalWrite += '<input type="hidden" name="Companion" id="Companion">';
                            }
                        }
                    }
                    modalWrite += '</div>';
                }

                /* modalWrite +='<div class="BBSWrite">';
				modalWrite +='<h1>결제 정보</h1>';
				modalWrite +='<ul>';
				modalWrite +='<li>';
				modalWrite +='<h1>결제상태</h1>';
				modalWrite +='<div class="normalText">';
				//modalWrite +='<form class="paymentApproval" method="post" action="javascript:paymentApprovals()">';
				modalWrite +=this.orderStatusName;
				if(loginUserLevel < '5') {
					if(this.serviceType != '1'){
						if(this.orderStatus == 'Y'){
							modalWrite +='&nbsp;&nbsp;<button type="submit">결제취소</button>';
							modalWrite +='<input type="hidden" name="orderStatus" value="N">';
						} else {
							modalWrite +='&nbsp;&nbsp;<button type="submit">결제승인</button>';
							modalWrite +='<input type="hidden" name="orderStatus" value="Y">';
						}
					}
				}

				modalWrite +='</div>';
				modalWrite +='</li>';
				modalWrite +='<li>';
				modalWrite +='<div class="halfDiv">';
				modalWrite +='<h1>결제방식</h1>'+this.orderTypeName;
				modalWrite +='</div>';
				if(this.depositName == null){
					var depositName = '-';
				} else {
					var depositName = this.depositName;
				}
				modalWrite +='<div class="halfDiv">';
				modalWrite +='<h1>입금자명</h1>'+depositName;
				modalWrite +='</div>';
				modalWrite +='</li>';
				modalWrite +='<li>';
				modalWrite +='<div class="halfDiv">';
				modalWrite +='<h1>결제금액</h1>'+this.orderTotalPrice;
				modalWrite +='</div>';
				if(this.deliveryInvoice == null){
					var deliveryInvoice = '-';
				} else {
					var deliveryInvoice = this.deliveryInvoice;
				}
				modalWrite +='<div class="halfDiv">';
				modalWrite +='<h1>송장번호</h1>'+deliveryInvoice;
				modalWrite +='</div>';
				modalWrite +='</li>';
				modalWrite +='</ul>';
				modalWrite +='</div>';
				*/
                if (this.serviceType == '2') { // 사업주 개별 , 사업주
                    modalWrite += '<div class="BBSWrite">';
                    modalWrite += '<h1>환급 정보</h1>';
                    modalWrite += '<ul>';
                    modalWrite += '<li>';
                    modalWrite += '<h1>채점마감</h1>';
                    modalWrite += '<div class="normalText">';
                    modalWrite += this.testCompleteDate;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>환급신청일</h1>' + this.refundApplyDate;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>환급신청지점</h1>' + this.refundApplyBranch;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '<li>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>환급완료일</h1>' + this.refundCompleteDate;
                    modalWrite += '</div>';
                    modalWrite += '<div class="halfDiv">';
                    modalWrite += '<h1>실 환급금액</h1>' + this.refundCompletePrice;
                    modalWrite += '</div>';
                    modalWrite += '</li>';
                    modalWrite += '</ul>';
                    modalWrite += '</div>';
                }
            })

            modalWrite += '</div></form></div></div>';


            $('#contents').after(modalWrite);
            modalAlign();
        })
    } else if (types == 'studyInfo') {
        var i = 1;
        var reportStatus = '';
        var answerType = '';
        var returnCheck = '';
        var passCode = '';

        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>과정 정보</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div style="overflow:hidden">'
        $.get(modalContentsApi, {'contentsCode': eachID}, function (data) {
            $.each(data.contents, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>' + this.contentsName + '</h1>';
                modalWrite += '<ul>';
                modalWrite += '<li>';
                modalWrite += '<h1>수강 등록수</h1><b>' + this.studyCount + '</b> (현재까지 사업주(환급)으로 등록된 총 과정 수)';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>등급/과정코드</h1>' + this.contentsGrade + ' / ' + this.contentsCode;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>사용여부</h1>' + this.enabled.replace('Y', '사용').replace('N', '미사용');
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                if (this.passCode == null) {
                    passCode = '미입력';
                } else {
                    passCode = this.passCode;
                }

                if (!this.hrdCode) {
                    var hrdCode = '미입력';
                } else {
                    var hrdCode = this.hrdCode;
                }

                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>심사코드</h1>' + passCode;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>내용전문가</h1>' + this.professor;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>HRD코드</h1>' + hrdCode;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>과정분류</h1>' + this.sort01;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수강구분</h1>' + this.serviceType;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>차시수</h1>' + this.chapter;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>교육시간</h1>' + this.contentsTime;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>교육비용</h1>' + toPriceNum(this.price);
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>우선지원</h1>' + toPriceNum(this.rPrice01);
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>대규모 1000인미만</h1>' + toPriceNum(this.rPrice02);
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>대규모 1000인이상</h1>' + toPriceNum(this.rPrice03);
                modalWrite += '</div>';
                modalWrite += '</li>';
                if (this.contentsPeriod == null) {
                    var contentsPeriod = '';
                } else {
                    var contentsPeriod = this.contentsPeriod;
                }
                if (this.contentsExpire == null) {
                    var contentsExpire = '';
                } else {
                    var contentsExpire = this.contentsExpire;
                }
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>콘텐츠 유효기간</h1>' + contentsPeriod;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>인정만료일</h1>' + contentsExpire;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>공급사</h1>' + this.cp;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수수료</h1>' + this.commission;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>모바일지원</h1>' + this.mobile;
                modalWrite += '</div>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>플레이방식</h1>' + this.sourceType;
                modalWrite += '</div>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>참고도서명</h1>' + this.bookIntro;
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>중간평가</h1>';
                modalWrite += '진위형 : ' + this.mid04EA + '문항 (배점:' + this.mid04Score + '),';
                modalWrite += '객관식 : ' + this.mid01EA + '문항 (배점:' + this.mid01Score + '),';
                modalWrite += '단답형 : ' + this.mid02EA + '문항 (배점:' + this.mid02Score + '),';
                modalWrite += '서술형 : ' + this.mid03EA + '문항 (배점:' + this.mid03Score + ')';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>최종평가</h1>';
                modalWrite += '진위형 : ' + this.test04EA + '문항 (배점:' + this.test04Score + '),';
                modalWrite += '객관식 : ' + this.test01EA + '문항 (배점:' + this.test01Score + '),';
                modalWrite += '단답형 : ' + this.test02EA + '문항 (배점:' + this.test02Score + '),';
                modalWrite += '서술형 : ' + this.test03EA + '문항 (배점:' + this.test03Score + ') | ';
                modalWrite += '시간 : ' + this.testTime + '분';
                modalWrite += '</li>';
                modalWrite += '<li id ="test01">';
                modalWrite += '<h1>과제</h1> ' + this.reportEA + '문항 (배점:' + this.reportScore + ')';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>수료기준</h1><div class="normalText">' + this.passProgress + '% 이상, 총점 ' + this.passScore + ' 점 이상<br />';
                modalWrite += '총점 반영 비율: 중간평가 ' + this.midRate + '%, 최종평가 ' + this.testRate + '%, 과제 ' + this.reportRate + '%<br />';
                modalWrite += '최종평가 : ' + this.totalPassTest + '점 중 최소 ' + this.passTest + '점 이상<br />';
                modalWrite += '과제 : ' + this.totalPassReport + ' 점 중 최소 ' + this.passReport + '점 이상';
                modalWrite += '</div></li>';
            })
            //2018-03-06 강혜림 수정
            /*if(loginUserLevel < 5) {
				$.get(modalStudyApi,{'seq':option},function(data){
					$.each(data.study,function(){
						modalWrite +='<li>';
						modalWrite +='<div class="halfDiv">';
						modalWrite +='<h1>수강기간</h1>'+this.lectureStart+'&nbsp;~&nbsp;'+this.lectureEnd;
						modalWrite +='</div>';
						modalWrite +='<div class="halfDiv">';
						modalWrite +='<h1>복습기간</h1>';
						modalWrite +='<div class="datePicker" style="top:424px;">';
						modalWrite +='<input type="text" name="lectureReStudy" class="cal"  value="'+this.lectureReStudy+'" readonly="readonly" /></div>&nbsp;';
						modalWrite +='<button type="button" onClick="studyInfoUpdate(\'lectureReStudy\',\''+option+'\');">수정</button>';
						modalWrite +='</div>';
						modalWrite +='</li>';
						modalWrite +='<li>';
						modalWrite +='<div class="halfDiv">';
						modalWrite +='<h1>교육비</h1>';
						modalWrite += '<input type="text" style="width:110px" name="price" value="'+this.price+'" />&nbsp;';
						modalWrite += '<button type="button" onClick="studyInfoUpdate(\'price\',\''+option+'\');">수정</button>';
						modalWrite +='</div>';
						modalWrite +='<div class="halfDiv">';
						modalWrite +='<h1>환급비</h1>';
						modalWrite += '<input type="text" style="width:110px" name="rPrice" value="'+this.rPrice+'" />&nbsp;';
						modalWrite += '<button type="button" onClick="studyInfoUpdate(\'rPrice\',\''+option+'\');">수정</button>';
						modalWrite +='</div>';
						modalWrite +='</li>';

						modalWrite +='</ul>';
						modalWrite +='</div>';
						modalWrite +='</div>';
						modalWrite +='</div>';
					})
				$('#contents').after(modalWrite);
				modalAlign();
				pickerAct();//데이트피커 사용
			})
		} else {
			$('#contents').after(modalWrite);
			modalAlign();
			pickerAct();//데이트피커 사용
		}*/

            modalWrite += '</ul>';
            modalWrite += '</div>';
            modalWrite += '</div>';
            modalWrite += '</div>';
            $('#contents').after(modalWrite);
            modalAlign();
            pickerAct();//데이트피커 사용

            var modalWrite2 = '';
            $.get(modalHrdApi, {'seq': option, 'lectureOpenSeq': option2}, function (data) {
                $.each(data.Hrd, function () {
                    if (this.openChapter == "" || this.openChapter == null) {
                        this.openChapter = "";
                    }
                    modalWrite2 += '<li>';
                    modalWrite2 += '<div class="halfDiv" id="beResignation">';
                    modalWrite2 += '<h1>실시회차</h1>';
                    modalWrite2 += '<input type="text" style="width:110px" name="openChapter" value="' + this.openChapter + '" />&nbsp;';
                    modalWrite2 += '<button type="button" onClick="studyInfoUpdate(\'openChapter\',\'' + option + '\');">수정</button>';
                    modalWrite2 += '</div>';
                    modalWrite2 += '</li>';
                })
                $('#test01').after(modalWrite2);
                pickerAct();//데이트피커 사용
            })

            var modalWrite1 = '';
            $.get(modalStudyApi, {'seq': option}, function (data) {
                $.each(data.study, function () {
                    modalWrite1 += '<li>';
                    modalWrite1 += '<div class="halfDiv">';
                    modalWrite1 += '<h1>수강기간</h1>' + this.lectureStart + '&nbsp;~&nbsp;' + this.lectureEnd;
                    modalWrite1 += '</div>';
                    modalWrite1 += '<div class="halfDiv">';
                    modalWrite1 += '<h1>복습기간</h1>';
                    modalWrite1 += '<div class="datePicker" style="top:424px;">';
                    modalWrite1 += '<input type="text" name="lectureReStudy" class="cal"  value="' + this.lectureReStudy + '" readonly="readonly" /></div>&nbsp;';
                    modalWrite1 += '<button type="button" onClick="studyInfoUpdate(\'lectureReStudy\',\'' + option + '\');">수정</button>';
                    modalWrite1 += '</div>';
                    modalWrite1 += '</li>';
                    modalWrite1 += '<li>';
                    modalWrite1 += '<div class="halfDiv">';
                    modalWrite1 += '<h1>교육비</h1>';
                    modalWrite1 += '<input type="text" style="width:110px" name="price" value="' + this.price + '" />&nbsp;';
                    modalWrite1 += '<button type="button" onClick="studyInfoUpdate(\'price\',\'' + option + '\');">수정</button>';
                    modalWrite1 += '</div>';
                    modalWrite1 += '<div class="halfDiv">';
                    modalWrite1 += '<h1>환급비</h1>';
                    modalWrite1 += '<input type="text" style="width:110px" name="rPrice" value="' + this.rPrice + '" />&nbsp;';
                    modalWrite1 += '<button type="button" onClick="studyInfoUpdate(\'rPrice\',\'' + option + '\');">수정</button>';
                    modalWrite1 += '</div>';
                    modalWrite1 += '</li>';
                })
                $('#test01').after(modalWrite1);
                pickerAct();//데이트피커 사용
            })

            // var modalWrite3 = '';
            // $.get(modalStud사yApi, {'seq': option}, function (data) {
            //     $.each(data.study, function () {
            //         modalWrite3 += '<div class="halfDiv">';
            //         modalWrite3 += '<h1>퇴사여부</h1>';
            //         modalWrite3 += '<select name="resignation" onChange="resignation(\'' + this.lectureStart + '\', \'' + this.lectureEnd + '\', \'' + this.serviceType + '\', \'' + this.contents.contentsCode + '\', \'' + this.user.userID + '\')">';
            //         if (this.memo == '퇴사') {
            //             modalWrite3 += '<option value="resignationY" selected>퇴사</option>';
            //             modalWrite3 += '<option value="resignationN">해당없음</option>';
            //         } else {
            //             modalWrite3 += '<option value="resignationY">퇴사</option>';
            //             modalWrite3 += '<option value="resignationN" selected>해당없음</option>';
            //         }
            //         modalWrite3 += '</select>&nbsp;';
            //         modalWrite3 += '</div>';
            //     })
            //     $('#beResignation').after(modalWrite3);
            // })
        })

    } else if (types == 'application') {
        var i = 1;

        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>수강 등록</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div style="overflow:hidden">'
        $.get(modalApplicationApi, {'seq': modalSeq}, function (data) {
            $.each(data.application, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>' + this.companyName + '</h1>';
                modalWrite += '<form class="applicationFrom" method="post">';
                modalWrite += '<input type="hidden"name="seq" value="' + this.seq + '"/>';
                modalWrite += '<input type="hidden"name="companyCode" value="' + this.companyCode + '"/>';
                modalWrite += '<input type="hidden"name="contentsCode" value="' + this.contentsCode + '"/>';
                modalWrite += '<input type="hidden"name="lectureStart" value="' + this.lectureStart + '"/>';
                modalWrite += '<input type="hidden"name="lectureEnd" value="' + this.lectureEnd + '"/>';
                modalWrite += '<input type="hidden"name="marketerID" value="' + this.userID + '"/>';
                modalWrite += '<input type="hidden"name="registerFile" value="' + this.registerFile + '"/>';
                modalWrite += '<input type="hidden"name="registerFileName" value="' + this.registerFileName + '"/>';
                modalWrite += '<ul>';
                modalWrite += '<li>';
                modalWrite += '<h1>사업주규모</h1>';
                modalWrite += '<select name="companyScale">';
                modalWrite += '<option value="">선택</option>';
                modalWrite += '<option value="C">우선지원대상</option>';
                modalWrite += '<option value="B">1000인 미만</option>';
                modalWrite += '<option value="A">1000인 이상</option>';
                modalWrite += '</select>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>서비스타입</h1>';
                modalWrite += '<select name="serviceType">';
                modalWrite += '<option value="">선택</option>';
                modalWrite += '<option value="1">환급</option>';
                modalWrite += '<option value="5">산업안전</option>';
                modalWrite += '<option value="3">비환급(평가없음)</option>';
                modalWrite += '</select>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>실시회차</h1>';
                modalWrite += '<input type="text" style="width:110px" name="openChapter"/>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>비용수급사업장</h1>';
                modalWrite += '<input type="text" style="width:110px" name="nwIno" maxlength="11"/>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>훈련생구분</h1>'
                modalWrite += '<select class="trneeSe" name="trneeSe">' + optWrite['trneeSe'] + '</select>';
                modalWrite += '</li>';
                modalWrite += '<li>';
                modalWrite += '<h1>비정규직구분</h1>';
                modalWrite += '<select class="IrglbrSe" name="IrglbrSe">' + optWrite['IrglbrSe'] + '</select>';
                modalWrite += '</li>';
            })
            modalWrite += '</ul>';
            modalWrite += '</form>';
            modalWrite += '<div style="text-align:center;"><button class="applicationBtn" type="button" onClick="checkStudyForm();">수강등록</button></div>';
            modalWrite += '</div>';
            modalWrite += '</div>';
            modalWrite += '</div>';
            $('#contents').after(modalWrite);
            modalAlign();
        })

    } else if (types == 'studyCenterPopup') {
        var i = 1;
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>사이버센터 팝업등록</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div style="overflow:hidden">'
        modalWrite += '<div class="BBSWrite">';
        modalWrite += '<h1>팝업 등록</h1>';
        modalWrite += '<form class="studyCenterPopupFrom" method="post" action="' + studyCenterPopupApi + '" enctype="multipart/form-data">';
        modalWrite += '<input type="hidden" name="seq" value="" />';
        modalWrite += '<input type="hidden" name="companyID" value="' + option2 + '"/>';
        modalWrite += '<ul>';
        modalWrite += '<li>';
        modalWrite += '<h1>제목</h1>';
        modalWrite += '<input type="text" class="subject" name="subject" value="" />';
        modalWrite += '</li>';
        modalWrite += '<li>';
        modalWrite += '<h1>사이즈</h1>';
        modalWrite += '<input type="text" name="width" class="tel" value="" /> px&nbsp;*&nbsp;';
        modalWrite += '<input type="text" name="height" class="tel" value="" /> px</li>';
        modalWrite += '</li>';
        modalWrite += '<li class="attachFileTe">';
        modalWrite += '<h1>내용이미지</h1>';
        modalWrite += '<input class="fileFind" type="file" name="attachFile" />'
        modalWrite += '</li>';
        modalWrite += '<li><h1>링크주소</h1><input type="text" name="popupURL" class="subject" value="" /></li>';
        modalWrite += '<li>';
        modalWrite += '<h1>사용기간</h1>';
        modalWrite += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="" readonly="readonly" /></div>&nbsp;~&nbsp;';
        modalWrite += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="" readonly="readonly" /></div></li>';
        modalWrite += '</li>';
        modalWrite += '<li><h1>사용여부</h1>';
        modalWrite += '<input type="radio" id="use" name="enabled"  value="Y" /><label for="use">사용</label>';
        modalWrite += '<input type="radio" id="useless" name="enabled" checked="checked" value="N" /><label for="useless">사용대기</label>&nbsp;&nbsp;(확인 후 사용여부 수정 바랍니다.)</li>';
        modalWrite += '</ul>';
        modalWrite += '</form>';
        modalWrite += '<div style="text-align:center;"><button id="btnText" class="applicationBtn" type="button" onClick="popupBtn();">등록하기</button>';
        modalWrite += '<button class="applicationBtn" type="button" onClick="resetInput();">초기화</button></div>';
        modalWrite += '</div>';

        modalWrite += '<div class="BBSList scrollDiv" style="height:370px; margin:10px 0;">';
        modalWrite += '<h1>팝업 리스트</h1>';
        modalWrite += '<table><thead><tr>';
        modalWrite += '<th style="width:60px;">번호</th>';
        modalWrite += '<th>제목</th>';
        modalWrite += '<th style="width:100px;">사이즈</th>';
        modalWrite += '<th style="width:200px;">등록기간</th>';
        modalWrite += '<th style="width:60px;">사용</th>';
        modalWrite += '<th style="width:130px;">수정/삭제</th>';
        modalWrite += '</tr></thead><tbody>';
        modalWrite += '</tbody></table>';
        modalWrite += '</div>';
        modalWrite += '</div>';
        modalWrite += '</div>';
        $('#contents').after(modalWrite);
        modalAlign();
        //fileformAct();
        pickerAct();

        $.get(studyCenterPopupApi, {'companyID': option2}, function (data) {
            var listView = '';
            totalCount = data.totalCount;
            var j = totalCount;
            if (totalCount != 0) {
                $.each(data.popup, function () {
                    listView += '<tr>';
                    listView += '<td>' + j + '</td>';
                    listView += '<td class="left" onClick="openPopupStudy(\'' + this.subject + '\',\'' + this.popupURL + '\',\'_' + this.popupTarget + '\',\'' + this.attachFile + '\',\'' + this.width + '\',\'' + this.height + '\')" style="cursor:pointer;">' + this.subject + '</td>';
                    listView += '<td>' + this.width + '*' + this.height + '</td>';
                    listView += '<td>' + this.startDate + ' ~ ' + this.endDate + '</td>';
                    listView += '<td>' + this.enabled + '</td>';
                    listView += '<td><button onclick="popupWrite(' + this.seq + ');">수정</button> / <button onclick="deleteData(\'' + studyCenterPopupApi + '\',' + this.seq + ',\'studyPopup\');">삭제</button></td>';
                    listView += '</tr>';
                    j--;
                })
            } else {
                listView += '<tr><td colspan="20">수강중인 과정이 없습니다.</td></tr>';
            }
            $('#modal .BBSList tbody').html(listView)

        })
        //데이터 검증 - 1일 8차시 제한 검출
    } else if (types == 'dataCheckDay8') {
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>1일 진도 8차시 초과</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div>';

        $.get(modalDataCheck, eachID, function (data) {
            $.each(data.data, function () {
                modalWrite += '<div class="BBSWrite">';
                modalWrite += '<h1>' + this.userName + '</h1>';
                modalWrite += '<ul>';
                modalWrite += '<li>';

                //아이디(이름)
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>아이디</h1>' + this.userID;
                modalWrite += '</div>';

                //회사명
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>회사명</h1>' + this.companyName;
                modalWrite += '</div>';

                modalWrite += '</li>';
                modalWrite += '<li>';

                //수강기간
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수강기간</h1>' + this.lectureStart + ' ~ ' + this.lectureEnd;
                modalWrite += '</div>';

                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수료여부</h1>' + this.passOK;
                modalWrite += '</div>';

                modalWrite += '</li>';

                modalWrite += '<li>';
                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>과정코드</h1>' + this.contentsCode;
                modalWrite += '</div>';

                modalWrite += '<div class="halfDiv">';
                modalWrite += '<h1>수업PK</h1>' + this.contentsCode + ',' + this.lectureOpenSeq;
                modalWrite += '</div>';
                modalWrite += '</li>';

                modalWrite += '<li>';
                modalWrite += '<h1>과정명</h1>' + this.contentsName;
                modalWrite += '</li>';

                modalWrite += '</ul>';
                modalWrite += '</div>';


                //차시 이력
                /*modalWrite +='<div class="BBSList">';
				modalWrite +='<h1>'+this.contentsName+'</h1>';
				modalWrite +='<table><thead><tr>';
				modalWrite +='<th style="width:60px;">차시번호</th>';
				modalWrite +='<th style="width:60px;">진도율</th>';
				modalWrite +='<th style="width:140px;">수강시간</th>';
				modalWrite +='</tr></thead><tbody>';

				$.each(this.progress,function(){
					modalWrite +='<tr>';
					modalWrite +='<td>'+this.chapter+'</td>';
					modalWrite +='<td>'+this.progress+'</td>';
					modalWrite +='<td>'+this.endTime+'</td>';
					modalWrite +='</tr>';
				})(*/
            })
            modalWrite += '</tbody></table>';
            modalWrite += '<div>';
            modalWrite += '</div></div>';
            $('#contents').after(modalWrite);
            modalAlign();
        })
    } else if (types == 'guestCS') { // 비회원 상담 내역
        modalWrite += '<div class="memberView">';
        modalWrite += '<h1><strong>CS  상담관리</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        modalWrite += '<div>'

        modalWrite += '<div class="BBSWrite">';
        modalWrite += '<h1>회원으로 상담 등록</h1>';

        if (loginUserLevel < '4') {
            modalWrite += '<div id="BBSCSList" class="BBSList" style="height:700px; margin:10px 0;">';
            modalWrite += '<form class="BBSCsForm" method="post">';
            modalWrite += '<input type="hidden" name="userID" value="_guest"/>';
            modalWrite += '<input type="hidden" name="adviserID" value="' + loginUserID + '"/>';
            modalWrite += '<input type="hidden" name="csTypeSeq" value="" >';
            modalWrite += '<div class="after" style="margin:5px 0">';
            modalWrite += '</div>';
            modalWrite += '<div class="csHistoryList"></div>';
            modalWrite += '<br /><input id="userName" name="userName" type="text" style="height:30px;" />&nbsp;';
            modalWrite += '<button type="button" name="userNameBtn" onClick="csMemberSearch()" style="height:30px; border: 1px solid #ccc; vertical-align: bottom;">이름검색</button>&nbsp;';
            modalWrite += '<span id="userIDadd"></span>&nbsp;';
            modalWrite += '<span id="csMemberReg"></span>&nbsp;';

            modalWrite += '<br /><br /><br /><h1 style="padding: 0 0 0 8px; margin: 3px 0; border-left: 5px solid #4a5359; line-height: 24px; font-size: 15px; border-bottom: none;">비회원으로 상담 등록</h1>';
            modalWrite += '<br /><input type="text" name="guestName" style="height:30px;" placeholder="이름 (고객)" /> ※ 이름(고객)<br /><br />';
            modalWrite += '<input type="text" name="userTel" style="width:220px; height:30px;" placeholder="연락처 (전화번호 또는 이메일)" /> ※ 전화번호 또는 이메일 작성<br /><br />';

            modalWrite += '<select name="category" id="category" style="height:30px;">';
            modalWrite += '<option value="">문의 분류를 선택해주세요.</option>';
            modalWrite += '<option value="learn">학습</option>';
            modalWrite += '<option value="system">시스템</option>';
            modalWrite += '<option value="register">수강신청</option>';
            modalWrite += '<option value="contents">콘텐츠</option>';
            modalWrite += '<option value="marketer">영업자</option>';
            modalWrite += '<option value="etc">기타</option>';
            modalWrite += '</select> ※ 문의 분류 <br /><br />';

            modalWrite += '<textarea name="question" style="height: 100px; width: 49.4%; vertical-align:top;margin-bottom: 5px;" placeholder="문의 내역" ></textarea>&nbsp;&nbsp;';
            modalWrite += '<textarea name="content" style="height: 100px; width: 49.5%; vertical-align:top;margin-bottom: 5px;" placeholder="처리 내역" ></textarea>';
            modalWrite += '<button type="button" onclick="csSaveAct();" style=" float:right; height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin: 0 0 5px 20px; width: 200px;">저장</button>';
            modalWrite += '<input type="checkbox" name="status" id="status" value="Y" checked="checked"><label for="status" style="float:right;">처리완료</label>';

            modalWrite += '<div class="talbeA" style="margin-top:10px;">';
            modalWrite += '<table>';
            modalWrite += '<thead>';
            modalWrite += '<tr>';
            modalWrite += '<th style="width:10%;">분류</th>';
            modalWrite += '<th style="width:10%;">이름</th>';
            modalWrite += '<th style="width:13%;">연락처</th>';
            modalWrite += '<th style="width:30%;">문의/처리</th>';
            modalWrite += '<th style="width:10%;">작성자/날짜</th>';
            modalWrite += '<th style="width:5%;">수정</th>';
            modalWrite += '</tr>';
            modalWrite += '</thead>';
            modalWrite += '<tbody class="BBSCsTbody"></tbody>';
            modalWrite += '</table><br /><br />';
            modalWrite += '</div>';
            modalWrite += '</form></div>';
        }

        modalWrite += '</div></div></div>';

        $('#contents').after(modalWrite);
        modalAlign();

        var listCsView = '';
        $.get(modalCsApi, {'myCS': 'Y'}, function (data) {
            if (data.totalCount != 0) {

                listCsView += '<tr style="height: 40px; text-align: center;">';
                listCsView += '<td colspan="7" onClick="top.location.href=\'./csList.php?locaSel=0914\'">내 상담 내역입니다. 전체 상담 내역을 보려면 클릭하세요. (클릭 시 이동)</td>';
                listCsView += '</tr>';

                $.each(data.data, function () {
                    listCsView += '<form class="BBSCsUpdateForm' + this.seq + '" method="post">';
                    listCsView += '<input id="seq' + this.seq + '" type="hidden" value="' + this.seq + '">';
                    listCsView += '<input type="hidden" id="adviserID" value="' + loginUserID + '"/>';
                    listCsView += '<tr style="height: 40px;">';
                    listCsView += '<td id="csDateUpdate' + this.seq + '" style="display:none;"></td>';

                    listCsView += '<td id="category' + this.seq + '" >';
                    if (this.userID == '_guest') {
                        listCsView += '[비회원]<br />';
                    } else {
                        listCsView += '[회원]<br />';
                    }
                    if (this.category == 'learn') {
                        listCsView += '학습';
                    } else if (this.category == 'system') {
                        listCsView += '시스템';
                    } else if (this.category == 'register') {
                        listCsView += '수강신청';
                    } else if (this.category == 'contents') {
                        listCsView += '콘텐츠';
                    } else if (this.category == 'marketer') {
                        listCsView += '영업자';
                    } else if (this.category == 'etc') {
                        listCsView += '기타';
                    }
                    listCsView += '</td>';
                    listCsView += '<input type="hidden" id="categoryValue' + this.seq + '" value="' + this.category + '">'; //수정 시 select 하기 위해 값 가져올 input hidden
                    listCsView += '<td id="updateCategory' + this.seq + '" style="display:none;">';
                    listCsView += '<select id="updateCategoryForm' + this.seq + '" style="height: 30px;margin-top:3px;">';
                    listCsView += '<option value="learn">학습</option>';
                    listCsView += '<option value="system">시스템</option>';
                    listCsView += '<option value="register">수강신청</option>';
                    listCsView += '<option value="contents">콘텐츠</option>';
                    listCsView += '<option value="marketer">영업자</option>';
                    listCsView += '<option value="etc">기타</option>';
                    listCsView += '</select>';
                    listCsView += '</td>';

                    if (this.userID == '_guest') {
                        listCsView += '<td id="guestName' + this.seq + '" >' + this.guestName + '</td>';
                        listCsView += '<td id="updateGuestName' + this.seq + '" style="display:none;">';
                        listCsView += '<input type="text" id="updateGuestNameForm' + this.seq + '" style="height: 30px;margin-top:3px;" value="' + this.guestName + '"/><br />';
                        listCsView += '</td>';
                    } else {
                        listCsView += '<td>' + this.userName + '<br />' + this.companyName + '</td>';
                    }

                    if (this.userID == '_guest') {
                        listCsView += '<td id="userTel' + this.seq + '" >' + this.userTel + '</td>';
                        listCsView += '<td id="updateUserTel' + this.seq + '" style="display:none;">';
                        listCsView += '<input type="text" id="updateUserTelForm' + this.seq + '" style="height: 30px;margin-top:3px;" value="' + this.userTel + '"/><br />';
                        listCsView += '</td>';
                    } else {
                        listCsView += '<td>' + this.mobile + '<br />' + this.email + '</td>';
                    }

                    listCsView += '<td id="content' + this.seq + '" >';
                    if (this.question != null || this.question == '') {
                        listCsView += this.question + '<br />------------------------------------<br />';
                    }
                    listCsView += this.content + '</td>';


                    listCsView += '<td id="updateContent' + this.seq + '" style="display:none;">';
                    listCsView += '<input type="text" id="updateContentForm' + this.seq + '" style="height: 30px;margin-top:3px;" value="' + this.content + '"/>';
                    listCsView += '</td>';

                    listCsView += '<td>';
                    if (this.upDateName) {
                        listCsView += this.upDateName;
                    } else {
                        listCsView += this.adviserName;
                    }
                    listCsView += '<br />';
                    if (this.infoUpdate) {
                        listCsView += this.infoUpdate;
                    } else {
                        listCsView += this.inputDate;
                    }
                    listCsView += '</td>';
                    listCsView += '<td>';
                    listCsView += '<span id="csUpdate' + this.seq + '" style="text-align:center; display:none;"><input type="button" value="저장" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csUpdateAct(' + this.seq + ',\'' + this.csTypeSeq + '\',\'' + this.userID + '\',\'Y\')" ></span>';
                    listCsView += '<span id="csUpdateForm' + this.seq + '" style="text-align:center; display:"";"><input type="button" value="수정" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csUpdateForm(' + this.seq + ',\'' + this.userID + '\')" ></span>';
                    listCsView += '<span id="csDelete' + this.seq + '" style="text-align:center; display:"";"><input type="button" value="삭제" style=" height: 30px; border: 1px solid #ccc; vertical-align: top; background: #efefef; color: #565656; line-height: 23px; margin-bottom: 3px;" onclick="csDelete(' + this.seq + ')" ></span>';
                    listCsView += '</td>';
                    listCsView += '</tr>';
                    listCsView += '</form>';


                });

            } else {
                listCsView += '<tr style="height: 40px; text-align: center;">';
                listCsView += '<td colspan="7" onClick="top.location.href=\'./csList.php?locaSel=0914\'">내 상담 내역이 없습니다. 전체 상담 내역을 보려면 클릭하세요. (클릭 시 이동)</td>';
                listCsView += '</tr>';
            }

            $('.BBSCsTbody').html(listCsView);
        });

    }
}

/*function cTypeScoreVal(val){
	if(val != ''){
		$('#cTypeTotalScore').html(val);
	}
}*/

//초기화
function resetInput() {
    $('.studyCenterPopupFrom input[type="text"]').val('');
    $('.studyCenterPopupFrom .AttachFiles span').text('파일찾기');
    $('.studyCenterPopupFrom #useless').prop('checked', 'checked');
    $('.studyCenterPopupFrom #btnText').text('등록하기');
    $('.studyCenterPopupFrom #attachFile').remove();
    if ($('.studyCenterPopupFrom .attachFileTe').hasClass('attachFile')) {
        console.log('true');
    } else {
        $('.studyCenterPopupFrom input[name="delFile01"]').remove();
        var inputFind = $('.studyCenterPopupFrom .attachFileTe').children('input');
        if (inputFind.length == 0) {
            $('.studyCenterPopupFrom .attachFileTe').append('<input class="fileFind" type="file" name="attachFile" />');
        }

    }

}

function popupWrite(seq) {
    $('#btnText').text('수정하기');
    $.get(studyCenterPopupApi, {'seq': seq}, function (data) {
        var imageURL = data.imageURL;
        $.each(data.popup, function () {
            $('input[name="seq"]').val(this.seq);
            $('input[name="subject"]').val(this.subject);
            $('input[name="width"]').val(this.width);
            $('input[name="height"]').val(this.height);
            $('input[name="popupURL"]').val(this.popupURL);
            $('input[name="startDate"]').val(this.startDate);
            $('input[name="endDate"]').val(this.endDate);
            if (this.enabled == 'Y') {
                $('#use').prop('checked', 'checked');
            } else {
                $('#useless').prop('checked', 'checked');
            }
            if (this.attachFile != '') {
                $('.attachFileTe input').remove();
                $('.attachFileTe').append('<div id="attachFile" class="attachFile"><button type="button" onclick="delFileAct(\'attachFile\')">' + this.attachFile + ' 첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />');
            }
        })
    })
}

//파일 첨부 삭제
function delFileAct(inputName) {
    var deleteDiv = $('#' + inputName)
    deleteDiv.parent('li, td, div').children('input[type="checkbox"]').prop('checked', true);
    deleteDiv.after('<input class="fileFind" type="file" name="attachFile" />');
    deleteDiv.remove()
}

function popupBtn() {
    var startDate = $('input[name="startDate"]').val();
    var endDate = $('input[name="endDate"]').val();
    var width = $('input[name="width"]').val();
    var height = $('input[name="height"]').val();

    if (startDate == '' || endDate == '') {
        alert('사용기간을 등록해주세요.');
        return;
    } else if ($('input[name="subject"]').val() == '') {
        alert('제목을 입력해주세요.');
        return;
    } else if (width == '' || height == '') {
        alert('사이즈를 입력해주세요.');
        return;
    } else {
        if (confirm("팝업을 등록하시겠습니까?")) {
            var formName = $('form.studyCenterPopupFrom');
            formName.ajaxForm({
                dataType: 'JSON',
                beforeSubmit: function (data, form, option) {
                    return true;
                },
                success: function (data, status) {
                    if (data.result == 'success') {
                        alert("처리되었습니다.");
                        modalClose();
                        globalModalAct('studyCenterPopup', '', '', '', '');
                    } else {
                        alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
                    }
                },
                error: function () {
                    //에러발생을 위한 code페이지
                    alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
                }
            });
            formName.submit();
        }
    }
}


function checkStudyForm() {
    $('.applicationFrom .price').remove();
    var checkFalse = 0;

    if ($('.applicationFrom select[name="companyScale"]').val() == '') {
        $('.applicationFrom select[name="companyScale"]').after('<strong class="price" style="margin-left:20px;"> 사업주규모를 선택해주세요.</strong>')
        checkFalse++;
    }
    if ($('.applicationFrom select[name="serviceType"]').val() == '') {
        $('.applicationFrom select[name="serviceType"]').after('<strong class="price" style="margin-left:20px;"> 서비스타입을 선택해주세요.</strong>')
        checkFalse++;
    }
    if (!$('.applicationFrom input[name="openChapter"]').val()) {
        $('.applicationFrom input[name="openChapter"]').after('<strong class="price" style="margin-left:20px;"> 실시회차를 입력해주세요.</strong>')
        checkFalse++;
    }
    if (checkFalse == 0) {
        applictionStudy();
    }
}

function applictionStudy() {
    if (confirm("수강등록하시겠습니까?")) {
        var sendSerial = $('form.applicationFrom').serialize();
        $.ajax({
            url: '../api/apiApplicationStudy.php',
            type: 'POST',
            data: sendSerial + '&study=Y',
            dataType: 'JSON',
            success: function (data) {
                if (data.result != 'success') {
                    alert('오류가 발생하였습니다.');
                } else {
                    alert('수강등록 되었습니다. \n수강관리-학습현황에서 확인해주세요.');
                    modalClose();
                    ajaxAct(searchValue);
                }
            },
            fail: function () {
                alert('오류가 발생하였습니다.')
            }
        })
    }
}

function CompanionF() {
    $("#Companion").val("Y");
    paymentApprovals('1');
}

function reScore(apiName) {
    if (confirm("첨삭강사가 다시 채점을 할 수 있도록 하시겠습니까?")) {
        var sendSerial = $('form.tutorGrade').serialize();
        $.ajax({
            url: apiName,
            type: 'POST',
            data: sendSerial + '&reScore=Y',
            dataType: 'text',
            success: function (data) {
                alert('재채점 처리 되었습니다.');
                modalClose();
                ajaxAct();
            },
            fail: function () {
                alert('오류가 발생하였습니다.')
            }
        })
    }
}

function tempGrade(apiName, types) {
    var sendSerial = $('form.tutorGrade').serialize();
    $.ajax({
        url: apiName,
        type: 'POST',
        data: sendSerial + '&temp=Y',
        dataType: 'text',
        success: function (data) {
            alert('임시저장 되었습니다.');
            modalClose();
            ajaxAct();
        },
        fail: function () {
            alert('임시저장 오류가 발생하였습니다.')
        }
    })
}

function tutorGrade(apiName, types, lectureEnd, today, marketerID) {
    var sendSerial = $('form.tutorGrade').serialize();
    var contentsCode = $('.tutorGrade input[name="contentsCode"]').val();
    var lectureOpenSeq = $('.tutorGrade input[name="lectureOpenSeq"]').val();
    var userID = $('.tutorGrade input[name="userID"]').val();
    /*
	if(lectureEnd >= today) {
		alert('채점완료는 '+lectureEnd+' 이후 가능합니다. 임시저장 하시기 바랍니다.');
		return;
	}
	*/
    if ($('input[name="copyCheck"]').prop('checked') == true || types == 'tests') {
        var bTypeCnt = 0;
        var cTypeCnt = 0;
        var cTypeMsg = '';

        if (types == 'reports') { // 과제 첨삭 검사
            if ($('input[name="return"]').prop('checked') == true) {
                alert('반려 상태에서는 채점완료 하실 수 없습니다. 임시저장 하시기 바랍니다.');
                return;
            } else if ($('select[name="reportScore[]"]').val() == '') {
                alert('점수를 입력해 주시기 바랍니다.');
                return;
            } else if ($('textarea[name="comment[]"]').val() == '') {
                alert('첨삭지도를 작성해 주시기 바랍니다.');
                return;
            } else if ($('textarea[name="comment[]"]').val().length < 100 && loginUserID != 'zkfmak_tutor') {
                alert('100자 이상 작성해주세요. 채점 기준에 맞게 감점 점수 및 감점사유를 적어 주시고, 학습자의 답안이 우수한 경우에도 문제에서 요구하는 핵심 내용을 다시 한번 요약해 주시기 바랍니다.');
                return;
            }

        } else { // 중간, 최종평가 첨삭 검사
            $('#modal select[name="rightAnswer[]"]').each(function () {
                if (($(this).length) != 0 && $(this).val() == '') {
                    bTypeCnt++
                }
            })
            var o = 0;
            var textareaSelect = '';
            $('#modal select[name="cTypeScore[]"]').each(function () {

                //var textareaSelect = $(this).parent('td').parent('tr').parent('tbody').find('textarea[name="correct[]"]')
                var textareaSelect = $('textarea[name="correct[]"]')
                textareaSelectLen = textareaSelect.val().replace(/(\s*)/g, "");//모든공백을 제거
                $.trim(textareaSelectLen);

                var scoreCheck = $('input[name="scoreCheck[]"]').eq(o).val();
                //console.log(textareaSelectLen.length);
                if ($(this).val() == '') {
                    cTypeMsg = '서술형 점수를 입력해 주세요!';
                    cTypeCnt++;
                    return false;
                } else if (textareaSelect.val() == '') {
                    cTypeMsg = '첨삭지도를 작성해 주시기 바랍니다.';
                    cTypeCnt++;
                    return false;
                } else if (textareaSelectLen.length < 100) {
                    cTypeMsg = '100자 이상 작성해주세요. 채점 기준에 맞게 감점 점수 및 감점사유를 적어 주시고, 학습자의 답안이 우수한 경우에도 문제에서 요구하는 핵심 내용을 다시 한번 요약해 주시기 바랍니다. ';
                    cTypeCnt++;
                    return false;
                } else if ($(this).val() != scoreCheck) {
                    cTypeMsg = '채점한 점수와 점수확인에 입력한 점수가 다릅니다. 다시 확인해 주시기 바랍니다.';
                    cTypeCnt++;
                    return false;
                }
                o++;
            })
        }

        if (bTypeCnt == 0 && cTypeCnt == 0) {
            if (confirm("채점완료 하시겠습니까? 완료 후에는 수정하실 수 없습니다.")) {
                $.ajax({
                    url: apiName,
                    type: 'POST',
                    data: sendSerial,
                    dataType: 'text',
                    success: function (data) {
                        if (data != 'success') {
                            alert(data);
                            return;
                        } else {
                            //수강연동 평가데이터 전송	(2018-06-22 최종평가 데이터 한번더 전송)
                            /*if(marketerID == 'oneedu'){
								var check= $.get('../api/apiStudyChapterSSO.php','contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&userID='+userID,function(data){
								var sendAddress = data.sso;
								var sendData = {'userID':data.userID,'ssoCode':data.contentsCode,'lectureStart':data.lectureStart,'lectureEnd':data.lectureEnd,'progress':data.totalProgress,'midProgress':data.midProgress,'testProgress':data.testProgress,'reportProgress':data.reportProgress,'midSaveTime':data.midSaveTime,'testSaveTime':data.testSaveTime,'reportSaveTime':data.reportSaveTime}
									$.ajax({
										url:sendAddress,
										type:'GET',
										dataType:'jsonp',
										data:sendData
									})
								});
							}*/
                            alert('채점 반영되었습니다.');
                            modalClose();
                            ajaxAct();
                        }
                    },
                    fail: function () {
                        alert('채점에 실패하였습니다.')
                    }
                })
            }
        } else {
            if (bTypeCnt != 0) {
                alert('단답형 채점이 안된 항목이 있습니다.')
                return;
            } else if (cTypeCnt != 0) {
                alert(cTypeMsg)
                return;
            }
        }

    } else {
        alert('모사율 조회하기 실행 후 첨삭완료가 가능합니다.')
        return;
    }

}

function autoResult() {
    var sendSerial = $('form.tutorGrade').serialize();
    var contentsCode = $('.tutorGrade input[name="contentsCode"]').val();
    var lectureOpenSeq = $('.tutorGrade input[name="lectureOpenSeq"]').val();
    var userID = $('.tutorGrade input[name="userID"]').val();

    if (confirm('자동채점을 진행합니다.')) {
        $.ajax({
            url: '/api/apiStudyAutoResult.php',
            type: 'POST',
            data: sendSerial,
            dataType: 'json',
            success: function (data) {
                if (data.result != 'success') {
                    alert(data);
                    return;
                } else {
                    alert('자동채점 되었습니다.');
                    modalClose();
                    ajaxAct();
                }
            },
            fail: function () {
                alert('오류가 발생하였습니다.');
            }
        })
    }
}

function paymentApprovals(s) {
    if (s != 1) {
        var sendSerial = $('form.paymentApproval').serialize();
        if (confirm("결제상태를 변경하시겠습니까?")) {
            $.ajax({
                url: '/api/apiStudy.php',
                type: 'POST',
                data: sendSerial,
                dataType: 'text',
                success: function () {
                    alert('변경되었습니다.');
                    modalClose();
                    ajaxAct();
                },
                fail: function () {
                    alert('변경실패.');
                }
            })
        }
    }

}


function keyCheck(event) {
    // if (loginUserID != '87140731' && loginUserID != '59487609') {
        if (event.keyCode == 86 && event.ctrlKey) {
            alert('붙여넣기는 불가능합니다.\r\r(한국산업인력공단 규정내용 : 교강사가 첨삭을 진행할 때 복사 및 붙여넣기 기능이 동작되지 않도록 유도)');
            event.returnValue = false;
        }
    // }
}

function mosaCheckTest(seq) {
    $.ajax({
        type: "POST",
        url: '../api/apiTestCopyCheck.php',
        dataType: 'JSON',
        data: {'seq': seq},
        success: function (data) {
            alert(data.result);
        },
        error: function (xhr, status) {
            XMLLoader.error(xhr, status)
        }
    });
}

function _mosaCheck(uri) {
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: '../api/copyKiller/get_copykiller_info.php',
        data: {'uri': uri},
        success: function (data) {
            mosaNum = $(data).find('disp_total_copy_ratio').text();
            $('.btnReportCopy').before('<strong class="red">모사율 : ' + mosaNum + '&nbsp;&nbsp;|&nbsp;&nbsp;</strong>')
            $('input[name="copyCheck"]').prop('checked', true)
        },
        error: function (xhr, status) {
            XMLLoader.error(xhr, status)
        }
    });
}

function mosaCheck(seq) {
    $.ajax({
        type: "POST",
        url: '../api/apiReportCopyCheck.php',
        dataType: 'JSON',
        data: {'seq': seq},
        success: function (data) {
            alert(data.result);
            $('input[name="copyCheck"]').prop('checked', true);
        },
        error: function (xhr, status) {
            XMLLoader.error(xhr, status)
        }
    });
}

function mosaDetail(uri) {
    var mosaUrl = '../api/copyKiller/get_copykiller_info_with_sentence.php?uri=' + uri;
    window.open(mosaUrl, "모사답안 검사", "top=0,left=0,width=1080,height=700,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no", "esangStudy")
}


function certPassOK(userID, lectureStart, adminID) {
    if (confirm('인증제외처리 하시겠습니까? \r\r사유가 될 수 있는 자료를 보관하시기 바랍니다.')) {
        $.ajax({
            url: '../api/apiStudyChapter.php',
            type: 'POST',
            data: {'userID': userID, 'lectureStart': lectureStart, 'certPass': 'Y', 'adminID': adminID},
            success: function () {
                alert('인증처리 되었습니다.');
                modalClose();
            }
        })
    }
}


// 180502 한상민(수료/미수료 처리)
function passOKSave(lectureOpenSeq, userID) {
    var memo = $('#passOKMemo').val();
    var beforePassOkStatus = $('#beforePassOkStatus').val();
    var passOkStatus = $('#passOkStatus').val();
    if (memo == null || memo == "") {
        alert("메모를 입력해주세요.");
        return;
    }
    if (passOkStatus == "Y" && beforePassOkStatus == "W") {
        alert("변경 불가합니다.");
        return;
    }
    var sendSerial = $('form.passOKForm').serialize() + '&lectureOpenSeq=' + lectureOpenSeq + "&userID=" + userID;
    if (confirm("저장 하시겠습니까?")) {
        $.ajax({
            url: '../api/apiPassOK.php',
            type: 'POST',
            data: sendSerial,
            dataType: 'text',
            success: function () {
                alert('변경되었습니다.');
                modalClose();
                ajaxAct();
            },
            fail: function () {
                alert('변경실패.');
            }
        })
    }
}

function findExam(obj) {
    var links = '#' + obj.value;
    window.location.href = links;
    var scrollTops = $(window).scrollTop();
    var plusHeight = $('#contentsNav').height();
    $(window).scrollTop(scrollTops - plusHeight);
}


function studyInfoUpdate(name, seq) {
    var inputVal = $('input[name="' + name + '"]').val();
    var studyInfo = 'Y';
    var api = "../api/apiStudy.php";
    if (name == 'openChapter') {
        studyInfo = 'hrd';
        var api = "../api/apiContentsHrd.php";
    }

    if (confirm("수정 하시겠습니까?")) {
        $.ajax({
            url: api,
            type: 'POST',
            data: {'studyInfoSeq': seq, 'studyInfoName': name, 'studyInfoVal': inputVal, 'studyInfoUpdate': studyInfo},
            dataType: 'text',
            success: function (data) {
                if (data == "error") {
                    alert('변경에 실패했습니다.');
                } else {
                    alert('변경되었습니다.');
                }
                //modalClose();
                //ajaxAct();
            },
            fail: function () {
                //alert('변경실패.');
            }
        })
    }
}

function resignation(lectureStartR, lectureEndR, serviceTypeR, contentsCodeR, userIDR) {
    var resignVal = $('select[name="resignation"]').val();
    $.ajax({
        url: '../api/apiStudy.php',
        type: 'POST',
        data: {
            'resignation': resignVal,
            'lectureStartR': lectureStartR,
            'lectureEndR': lectureEndR,
            'serviceTypeR': serviceTypeR,
            'contentsCodeR': contentsCodeR,
            'userIDR': userIDR
        },
        dataType: 'text',
        success: function (data) {
            if (data == 'error') {
                alert('변경 실패! 다시 시도해주세요.');
            } else {
                alert('변경 완료했습니다.');
                modalClose();
                ajaxAct();
            }
        },
        fail: function () {
            alert('변경실패');
        }
    })
}

function categoryCS(type, vals) {
    if (type == 'call01') {
        $('select[name="call02"], select[name="call03"], select[name="call04"], select[name="call05"]').remove();
        var searchName = vals.value;
        $.get('../api/apiCategoryCS.php', {'subSeq': searchName}, function (data) {
            $('select[name="call01"]').remove();
            var selectWrite = '';
            selectWrite += '<select name="call01" id="call01" onChange="categoryCS(\'call02\',this);" style="margin-left:10px;">';
            selectWrite += '<option value="">선택</option>'
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.seq + '">' + this.value02 + '</option>';
            })
            selectWrite += '</select>'
            $('select[name="csHistory"]').after(selectWrite);

            $('#call01').change(function () {
                checkValue = $("#call01 option:selected").val();
                $('input[name="csTypeSeq"]').val(checkValue);
            })
        })
    } else if (type == 'call02') {
        $('select[name="call03"], select[name="call04"], select[name="call05"]').remove();
        var searchName = vals.value;
        $.get('../api/apiCategoryCS.php', {'subSeq': searchName}, function (data) {
            $('select[name="call02"]').remove();
            var selectWrite = '';
            selectWrite += '<select name="call02" id="call02" onChange="categoryCS(\'call03\',this);" style="margin-left:10px;">';
            selectWrite += '<option value="">선택</option>'
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.seq + '">' + this.value02 + '</option>';
            })
            selectWrite += '</select>'
            $('select[name="call01"]').after(selectWrite);

            $('#call02').change(function () {
                checkValue = $("#call02 option:selected").val();
                $('input[name="csTypeSeq"]').val(checkValue);
            })
        })
    } else if (type == 'call03') {
        $('select[name="call04"], select[name="call05"]').remove();
        var searchName = vals.value;
        $.get('../api/apiCategoryCS.php', {'subSeq': searchName}, function (data) {
            $('select[name="call03"]').remove();
            var selectWrite = '';
            selectWrite += '<select name="call03" id="call03" onChange="categoryCS(\'call04\',this);" style="margin-left:10px;">';
            selectWrite += '<option value="">선택</option>'
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.seq + '">' + this.value02 + '</option>';
            })
            selectWrite += '</select>'
            $('select[name="call02"]').after(selectWrite);

            $('#call03').change(function () {
                checkValue = $("#call03 option:selected").val();
                $('input[name="csTypeSeq"]').val(checkValue);
            })
        })
    } else if (type == 'call04') {
        $('select[name="call05"]').remove();
        var searchName = vals.value;
        $.get('../api/apiCategoryCS.php', {'subSeq': searchName}, function (data) {
            $('select[name="call04"]').remove();
            var selectWrite = '';
            selectWrite += '<select name="call04" id="call04" onChange="categoryCS(\'call05\',this);" style="margin-left:10px;">';
            selectWrite += '<option value="">선택</option>'
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.seq + '">' + this.value02 + '</option>';
            })
            selectWrite += '</select>'
            $('select[name="call03"]').after(selectWrite);

            $('#call04').change(function () {
                checkValue = $("#call04 option:selected").val();
                $('input[name="csTypeSeq"]').val(checkValue);
            })
        })
    } else if (type == 'call05') {
        var searchName = vals.value;
        $.get('../api/apiCategoryCS.php', {'subSeq': searchName}, function (data) {
            $('select[name="call05"]').remove();
            var selectWrite = '';
            selectWrite += '<select name="call05" id="call05" style="margin-left:10px;">';
            selectWrite += '<option value="">선택</option>'
            $.each(data.category, function () {
                selectWrite += '<option value="' + this.seq + '">' + this.value02 + '</option>';
            })
            selectWrite += '</select>'
            $('select[name="call04"]').after(selectWrite);

            $('#call05').change(function () {
                checkValue = $("#call05 option:selected").val();
                $('input[name="csTypeSeq"]').val(checkValue);
            })
        })
    }
}

function openInfo(id, btn) {
    if ($('#' + id).css('display') == 'none') {
        $('#' + id).show();
        $(btn).text('접기');
    } else {
        $('#' + id).hide();
        $(btn).text('펼치기');
    }
}

function csMemberSearch() {
    $('#userIDadd').html('&nbsp;불러오고 있습니다. 잠시만 기다려 주세요.');

    var userName = $('#userName').val();
    var csSearch = '';
    var csMemberReg = '';

    $.get('../api/apiMember.php', '&userName=' + userName, function (data) {
        if (data.totalCount != 0) {
            $.each(data.member, function () {
                csSearch += '<option value="' + this.userID + '">';
                csSearch += this.userName + '&nbsp;|&nbsp;' + this.userID + '&nbsp;|&nbsp;' + this.company.companyName + '&nbsp;';
                csSearch += '</option>';
            })
            if ($(document).find('select[name="userID"]').index() == -1) {
                $('#userIDadd').html('&nbsp;<select name="userID" style="height:30px;"></select>');
                $('#csMemberReg').html('&nbsp;<button type="button" name="csMemberReg" style="height:30px;" onClick="csMemberRegister();">선택된 회원으로 등록하기</button>');
            }
            $('select[name="userID"]').html(csSearch);

        } else {
            $('#userIDadd').html('');
            $('#csMemberReg').html('');
            alert('검색결과가 없습니다.');
        }
    })
}

function csMemberRegister() {
    var userIDcs = $('select[name="userID"]').val();
    modalClose();
    if (userIDcs != '') {
        globalModalAct('memberView', '', userIDcs);
    }
}

function csUpdateForm(seq, userID) {

    if (userID == '_guest') {
        var guestName = document.getElementById("guestName" + seq);
        var updateGuestName = document.getElementById("updateGuestName" + seq);
        var userTel = document.getElementById("userTel" + seq);
        var updateUserTel = document.getElementById("updateUserTel" + seq);

        guestName.style.display = "none";
        userTel.style.display = "none";
        updateGuestName.style.display = "";
        updateUserTel.style.display = "";

        //값 selected
    }

    var category = document.getElementById("category" + seq);
    var updateCategory = document.getElementById("updateCategory" + seq);
    var content = document.getElementById("content" + seq);
    var updateContent = document.getElementById("updateContent" + seq);
    var csUpdateForm = document.getElementById("csUpdateForm" + seq);
    var csUpdate = document.getElementById("csUpdate" + seq);

    category.style.display = "none";
    content.style.display = "none";
    updateCategory.style.display = "";
    updateContent.style.display = "";
    csUpdateForm.style.display = "none";
    csUpdate.style.display = "";

    $('#updateCategoryForm' + seq).val(document.getElementById("categoryValue" + seq).value).prop("selected", true);
}


function csSaveAct() {

    var valiMsg = '';

    if ($('textarea[name=content]').val() == '' || $('textarea[name=content]').val() == '처리 내역') {
        valiMsg = '처리 내역을 입력해주세요.';
    }

    if ($('textarea[name=question]').val() == '' || $('textarea[name=question]').val() == '문의 내역') {
        valiMsg = '문의 내역을 입력해주세요.';
    }

    if ($('#category').val() == '') {
        valiMsg = '문의 분류를 선택해주세요.';
    }

    /*else if( $('input[name=studySeq]').val() == '' ){
		valiMsg = '상담강의를 선택해주세요.';
	}else if($('input[name="csTypeSeq"]').val() == ''){
		valiMsg = '상담이력을 선택해주세요.';
	}*/

    if (valiMsg != '') {
        alert(valiMsg);
        return false;
    }

    if (confirm('입력하신 상담내용을 저장하시겠습니까?')) {

        $.ajax({
            url: '../api/apiCS.php',
            type: 'POST',
            data: $('.BBSCsForm').serialize(),
            success: function (data) {

                modalClose();

                //재조회
                globalModalAct(typesRefresh, modalSeqRefresh, eachIDRefresh, optionRefresh);

            }
        });


    }
}


function csUpdateAct(seq, csTypeSeq, userID, guest) {

    var valiMsg = '';

    if ($('input[name=content' + seq + ']').val() == '') {
        valiMsg = '상담내용을 입력해주세요.';
    }/*else if( $('input[name=actionContent'+seq+']').val() == '' ){
		valiMsg = '조치사항을 입력해주세요.';
	}*/
    /*else if($('input[name="csTypeSeq"]').val() == ''){
		valiMsg = '상담이력을 선택해주세요.';
	}*/

    if (valiMsg != '') {
        alert(valiMsg);
        return false;
    }

    var adviserID = document.getElementById("adviserID").value;
    var content = document.getElementById("updateContentForm" + seq).value;
    var seq = document.getElementById("seq" + seq).value;
    var category = document.getElementById("updateCategoryForm" + seq).value;

    if (userID == '_guest') {
        var guestName = document.getElementById("updateGuestNameForm" + seq).value;
        var userTel = document.getElementById("updateUserTelForm" + seq).value;
        var userID = '_guest';

    } else {
        var guestName = '';
        var userTel = '';
        var userID = userID;
    }


    /*if(csType){
		csType = csType;
	}else{
		csType= $('#modal input[name="csType"]').val();
	}*/

    var csTypeSeqV = $('#modal input[name="csTypeSeq"]').val();

    if (csTypeSeqV) {
        csTypeSeq = csTypeSeqV;
    } else {
        csTypeSeq = csTypeSeq;
    }

    if (confirm('입력하신 상담내용을 저장하시겠습니까?')) {
        $.ajax({
            url: '../api/apiCS.php',
            type: 'POST',
            data: {
                'adviserID': adviserID,
                'guestName': guestName,
                'userTel': userTel,
                'category': category,
                'content': content,
                'userID': userID,
                'seq': seq,
                'csTypeSeq': csTypeSeq
            },
            success: function (data) {
                if (userID == '_guest') {
                    $('#guestName' + seq).text(guestName);
                    $('#guestName' + seq).css('display', '');
                    $('#userTel' + seq).text(userTel);
                    $('#userTel' + seq).css('display', '');
                    $('#updateGuestName' + seq).css('display', 'none');
                    $('#updateUserTel' + seq).css('display', 'none');
                }

                $('#category' + seq).text(category);
                $('#category' + seq).css('display', '');
                $('#updateCategory' + seq).css('display', 'none');
                $('#content' + seq).text(content);
                $('#content' + seq).css('display', '');
                $('#updateContent' + seq).css('display', 'none');
                $('#csUpdate' + seq).css('display', 'none');
                $('#csUpdateForm' + seq).css('display', '');

                //재조회
                modalClose();
                if (guest == 'Y') {
                    globalModalAct('guestCS', '', '_guest');
                } else {
                    globalModalAct('memberView', '', userID);
                    //alert(userID);
                }
            }

        });

    }
}


function csDelete(seq) {
    if (confirm('입력하신 상담내용을 삭제 하시겠습니까?')) {
        $.ajax({
            url: '../api/apiCS.php',
            type: 'DELETE',
            data: {
                'seq': seq
            },
            success: function (data) {

                modalClose();
                //재조회
                globalModalAct(typesRefresh, modalSeqRefresh, eachIDRefresh, optionRefresh);

            }

        });

    }
}

function hiddenCss(csType) {
    var talbeCss = $('#modal #csHistory').css('display');
    if (talbeCss == 'none') {
        $('#modal #csHistory').css('display', 'inline-block');
    } else {
        $('#modal #csHistory').css('display', 'none');
    }
}

function removeStudyOrder(flag, userID, lectureStart, lectureEnd) { // 개인 교육 순서 해제
    if (flag == 'Y') {
        if (!confirm('교윤 순서를 해제 하시겠습니까?')) {
            return false;
        }
    } else {
        if (!confirm('교윤 순서를 설정 하시겠습니까?')) {
            return false;
        }
    }

    $.ajax({
        url: modalMemberStudyInOrder,
        method: 'POST',
        data: {'flag': flag, 'userID': userID, 'lectureStart': lectureStart, 'lectureEnd': lectureEnd},
        success: function (data) {
            if (data.result == 'success') {
                alert('처리 됐습니다.');
                modalClose();
                globalModalAct(typesRefresh, modalSeqRefresh, eachIDRefresh, optionRefresh);
            } else {
                alert('오류가 발생했습니다.');
            }
        }
    });
}

function studyInOrder(num, companyCode, lectureStart, lectureEnd) { //기업별 교육 순서 해제

    if (num == 0) {
        var cfTxt = "교육 순차학습(환급우선) 설정을 해제 하시겠습니까?";
    } else {
        var cfTxt = "교육 순차학습(환급우선)을 설정 하시겠습니까?";
    }

    if (confirm(cfTxt)) {
        $.ajax({
            url: '../api/apiStudyInOrder.php',
            type: 'POST',
            data: {
                'num': num,
                'companyCode': companyCode,
                'lectureStart': lectureStart,
                'lectureEnd': lectureEnd
            },
            success: function (data) {
                if (data.result == 'success') {
                    alert('처리 되었습니다.');
                    modalClose();
                    globalModalAct(typesRefresh, modalSeqRefresh, eachIDRefresh, optionRefresh);
                } else {
                    alert('처리 오류 입니다.');
                }
            }

        });

    }

}


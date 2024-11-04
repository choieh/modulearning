//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var useApi = '../api/apiStudyEnd_new.php';
//var memberApi = '../api/apiMember.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '';
userLevel = userLevel ? userLevel : 9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 5; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var sortData = '';
var cpCode = '';

//리스트 소팅
function listAct(page) {
    //상단 액션 부분
    var actionArea = '';
    var today = new Date();

    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'

    if (loginUserLevel != '7') {
        actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
    }

    actionArea += '<span id="searchTypeArea"><select name="searchYear"' +
        ' onchange="searchStudy(\'lectureDay\')">';
    var i = '';
    var thisYear = today.getFullYear();
    for (i = 2015; i <= thisYear + 1; i++) {
        if (i != thisYear) {
            actionArea += '<option>' + i + '년</option>';
        } else {
            actionArea += '<option selected="selected">' + i + '년</option>';
        }

    }
    actionArea += '</select>';
    actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')" selected="selected">';
    //actionArea += '<option value="">전체</option>';
    var h = '';
    var thisMonth = today.getMonth() + 1; //January is 0!
    for (h = 1; h <= 12; h++) {
        if (h != thisMonth) {
            actionArea += '<option >' + h + '월</option>';
        } else {
            actionArea += '<option selected="selected">' + h + '월</option>';
        }

    }
    actionArea += '</select></span>';
    actionArea += '<span><button type="button"' +
        ' onclick="searchAct()">검색하기</button></span>';
    if (loginUserLevel < 4) {
        actionArea += ' | <a href="/attach/docs/certificate.xlsx">수료증출력기준보기(클릭다운로드)</a>';
    }
    actionArea += '</div>';
    actionArea += '</form></div>';
    $('#contents > h1').after(actionArea);

    //게시물 소팅부분
    var contents = '';
    contents += '<div class="scrollArea">';
    contents += '<table style="min-width:1360px;"><thead><tr>';
    contents += '<th style="width:50px;">번호</th>';
    contents += '<th style="width:200px;">수강기간</th>';
    contents += '<th style="width:200px;">과정명</th>';
    if (loginUserLevel < 4) {
        contents += '<th style="width:200px;">점수확인</th>';
        contents += '<th style="width:200px;">수강마감</th>';
    }
    contents += '<th style="width:120px;">교육실시확인서</th>';
    contents += '<th style="width:120px;">교육비</th>';
    contents += '<th style="width:120px;">최종 환급액</th>';
    contents += '<th style="width:120px;">수강인원</th>';
    contents += '<th style="width:120px;">수료인원</th>';
//	contents += '<th style="width:120px;">교육이수증</th>';
    contents += '<th style="width:120px;">수료증</th>';
    contents += '<th style="width:120px;">수료결과보고서</th>';
    contents += '</tr></thead><tbody>';
    contents += '<tr><td colspan=13>검색값을 선택하세요.</td></tr>';
    contents += '</tbody></table>';
    contents += '</div>'
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
    //ajaxAct();
    var thisYear = today.getFullYear();
    var thisMonth = today.getMonth() + 1; //January is 0!
    if (thisMonth <= 9) {
        thisMonth = '0' + thisMonth;
    }
    var checkDate = thisYear + '-' + thisMonth;
    searchStudy('lectureDay', checkDate);
}

function ajaxAct(sortDatas, scHeight) {
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }
    var listAjax = $.get(useApi, 'page=' + page + '&list=' + listCount + sortData, function (data) {
        totalCount = data.totalCount;
        var lists = '';
        var j = totalCount;
        if (page != 1) {
            j = totalCount - ((page - 1) * listCount);
        }
        if (totalCount != 0) {
            var i = 0;
            $.each(data.study, function () {
                let queryString = '';

                if (data.study[i].companyCode != null) {
                    cpCode = data.study[i].companyCode;
                } else {
                    cpCode = '';
                }

                lists += '<tr class="BBSListBg">';
                lists += '<td>' + j + '</td>';
                lists += '<td>' + this.lectureStart + ' ~ ' + this.lectureEnd;
                lists += '<br />(' + this.tutorDeadline + '까지 첨삭)</td>';
                lists += '<td>&nbsp;</td>';
                if (loginUserLevel < 4) {
                    lists += '<td><button type="button" onClick="studyEndAll(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + cpCode + '\',1,5,3,10,\'resultView\');" >일괄확인처리</button></td>';
                    lists += '<td><button type="button" onClick="studyEndAll(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + cpCode + '\',1,5,3,10,\'studyEnd\');" >일괄마감하기</button></td>';
                }
                lists += '<td>&nbsp;</td>';
                lists += '<td>&nbsp;</td>';
                lists += '<td>&nbsp;</td>';
                lists += '<td>&nbsp;</td>';
                lists += '<td>&nbsp;</td>';

                queryString = `lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}`;
                lists += `<td><button type="button" onclick="certificateFilter('Y','${queryString}')">수료증</button></td>`;

                lists += '<td>';
                lists += `<button onClick="pdfBundle('R', '${data.study[i].lectureStart}', '${data.study[i].lectureEnd}', '${data.study[i].companyCode}','','Y')">보고서</button>`;
                lists += '</br>';
				lists += `<button onClick="pdfBundle('R', '${data.study[i].lectureStart}', '${data.study[i].lectureEnd}', '${data.study[i].companyCode}','','N')">보고서(표지제외)</button>`;
                lists += '</br>';
                lists += `<button onClick="pdfBundle('R', '${data.study[i].lectureStart}', '${data.study[i].lectureEnd}', '${data.study[i].companyCode}', 'Y')">미수료제외</button>`;
                lists += '</td>';
                lists += '</tr>';

                $.each(this.company, function () {
                    lists += '<tr>';
                    lists += '<td></td>';
                    lists += '<td>' + this.companyName + '</td>';
                    lists += '<td>' + this.contentsName + '</td>';

                    // 점수확인
                    if (loginUserLevel < 4) {
                        lists += '<td>';
                        if (this.studyCount != 0) {
                            if (this.serviceType == 1) {
                                if (this.resultView1 == 'Y') {
                                    lists += '처리자 : ' + this.userIDR1 + '<br />마감일 : ' + this.inputDateR1 + '<br /><button type="button" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'1\',\'resultView\')" >취소(환급)</button><br/>';
                                } else {
                                    lists += '<button type="button" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'1\',\'resultView\');"> 확인(환급)</button><br/>';
                                }
                            } else if (this.serviceType == 3) {
                                if (this.resultView3 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDR3 + '<br />마감일 : ' + this.inputDateR3 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'resultView\')" >취소<br />(비환급/평가없음)</button>';
                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'resultView\');" >확인<br />(비환급/평가없음)</button>';
                                }
                            } else if (this.serviceType == 5) {
                                if (this.resultView5 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDR5 + '<br />마감일 : ' + this.inputDateR5 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'5\',\'resultView\')" >취소<br />(산업안전)</button>';
                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'5\',\'resultView\');" >확인<br />(산업안전)</button>';
                                }
                            } else if (this.serviceType == 10) {
                                if (this.resultView3 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDR3 + '<br />마감일 : ' + this.inputDateR3 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'resultView\')" >취소<br />(비환급/평가있음)</button>';
                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'resultView\');" >확인<br />(비환급/평가있음)</button>';
                                }
                            }
                        }

                        lists += '</td>';

                        lists += '<td>';
                        // 수강마감, 수료증, 수료결과보고서
                        if (this.studyCount != 0) {
                            if (this.serviceType == 1) {
                                if (this.studyEnd1 == 'Y') {
                                    lists += '처리자 : ' + this.userIDS1 + '<br />마감일 : ' + this.inputDateS1 + '<br /><button type="button" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'1\',\'studyEnd\')" >취소(환급)</button><br/>';
                                } else {
                                    lists += '<button type="button" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\', \'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'1\',\'studyEnd\');" >마감(환급)</button><br>';
                                }
                            } else if (this.serviceType == 3) {
                                if (this.studyEnd3 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDS3 + '<br />마감일 : ' + this.inputDateS3 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'studyEnd\')" >취소<br />(비환급/평가없음)</button>';
                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'studyEnd\');" >마감<br />(비환급/평가없음)</button>';
                                }
                            } else if (this.serviceType == 5) {
                                if (this.studyEnd5 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDS5 + '<br />마감일 : ' + this.inputDateS5 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'5\',\'studyEnd\')" >취소<br />(산업안전)</button>';

                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'5\',\'studyEnd\');" >마감<br />(산업안전)</button>';
                                }
                            } else if (this.serviceType == 10) {
                                if (this.studyEnd3 == 'Y') {
                                    lists += '<br/>처리자 : ' + this.userIDS3 + '<br />마감일 : ' + this.inputDateS3 + '<br /><button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'studyEnd\')" >취소<br />(비환급/평가있음)</button>';
                                } else {
                                    lists += '<button type="button" style="font-size:11px;" onClick="studyEnd(\'' + data.study[i].lectureStart + '\',\'' + data.study[i].lectureEnd + '\',\'' + this.companyCode + '\',\'' + this.contentsCode + '\',\'3\',\'studyEnd\');" >마감<br />(비환급/평가있음)</button>';
                                }
                            }
                        }

                        lists += '</td>';
                    }


                    // 20230119 강동현 - 414141 출력기능
                    lists += `<td><button onClick="window.open('accomplish.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&sort01=lecture03&sort02=lecture0302&companyCode=${this.companyCode}','수료증','width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no','printPop')">산업(근로자)</button>`;
                    lists += `<br /><button onClick="window.open('accomplish.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&sort01=lecture03&sort02=lecture0301&companyCode=${this.companyCode}','수료증','width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no','printPop')">산업(감독)</button></td>`;
                    // 20230119

                    lists += '<td>' + toPriceNum(this.totalPrice) + '</td>';
                    if (this.studyCount == 0) {
                        lists += '<td>0</td>';
                    } else {
                        if (this.studyEnd == 'Y') {
                            lists += '<td>' + toPriceNum(this.totalRPrice) + '</td>';
                        } else {
                            lists += '<td>진행 중</td>';
                        }
                    }
                    // 수강인원
                    var typeText = '';
                    if (this.serviceType == 1) {
                        typeText = '환급';
                    } else if (this.serviceType == 3) {
                        typeText = '비환급(평가없음)';
                    } else if (this.serviceType == 5) {
                        typeText = '산업안전';
                    } else if (this.serviceType == 10) {
                        typeText = '비환급(평가있음)';
                    }

                    lists += '<td>' + typeText + ' : ' + this.studyCount + '</td>';
                    lists += '<td>' + typeText + ' : ' + this.studyPassCount + '</td>';
                    //교육이수증
//						lists += '<td><button style="font-size:11px;" onClick="window.open(\'certificateStudy.php?lectureStart='+data.study[i].lectureStart+'&lectureEnd='+data.study[i].lectureEnd+'&companyCode='+this.companyCode+'&serviceType='+this.serviceType+'&contentsCode='+this.contentsCode+'\',\'개인정보\',\'수료증\',\'width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no\',\'printPop\')">이수증</button></td>';

                    //수료증
                    if (this.companyCode == '1068260938') {
                        lists += '<td><button style="font-size:11px;" onClick="window.open(\'certificate_bundle.php?lectureStart=' + data.study[i].lectureStart + '&lectureEnd=' + data.study[i].lectureEnd + '&companyCode=' + this.companyCode + '&serviceType=' + this.serviceType + '\',\'개인정보\',\'수료증\',\'width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no\',\'printPop\',\'수료증\',\'width=740, height=900, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no\',\'printPop\')">수료증</button></td>';
                    } else {
                        queryString = `lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}&serviceType=${this.serviceType}&contentsCode=${this.contentsCode}`;
                        lists += `<td><button type="button" onclick="certificateFilter('', '${queryString}')">수료증</button></td>`;
                        // lists += `<td><a href='certificateNewTest.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}&serviceType=${this.serviceType}&contentsCode=${this.contentsCode}' target='_blank'><button style="font-size:11px;">수료증</button></a></td>`;
                    }

                    //수료결과보고서
                    lists += '<td>';
                    lists += `<a href='resultDocumentNewTest2.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}&serviceType=${this.serviceType}&contentsCode=${this.contentsCode}' target='_blank'><button>보고서</button></a>`;
                    lists += '<br/>';
					lists += `<a href='resultDocumentNewTest2.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}&serviceType=${this.serviceType}&contentsCode=${this.contentsCode}&cover=N' target='_blank'><button>보고서(표지제외)</button></a>`;
                    lists += '<br/>';
                    lists += `<a href='resultDocumentNewTest2.php?lectureStart=${data.study[i].lectureStart}&lectureEnd=${data.study[i].lectureEnd}&companyCode=${this.companyCode}&serviceType=${this.serviceType}&contentsCode=${this.contentsCode}&passOK=Y' target='_blank'><button>미수료제외</button></a>`;
                    lists += '</td>';

                    lists += '</tr>';
                })
                j--;
                i++;
            })
        } else {
            lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>'
        }
        $('.BBSList tbody').html(lists);
        pagerAct();
        loadingAct();
        window.scrollTo(0, scHeight);
    })
}

function studyEnd(lectureStart, lectureEnd, companyCode, contentsCode, serviceType, gubun) {
    var msg = '';
    var scHeight = $(window).scrollTop();
    if (gubun == 'studyEnd') {
        msg = '정말 수강마감을 하시겠습니까?';
    } else {
        msg = '점수 확인처리를 하시겠습니까?';
    }
    if (confirm(msg)) {
        $.ajax({
            url: useApi,
            type: 'POST',
            data: {
                'lectureStart': lectureStart,
                'lectureEnd': lectureEnd,
                'companyCode': companyCode,
                'contentsCode': contentsCode,
                'serviceType': serviceType,
                'gubun': gubun
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.result == 'success') {
                    alert('처리되었습니다.');
                    ajaxAct('', scHeight);
                }
            }
        })
    }
}

function studyEndAll(lectureStart, lectureEnd, companyCode, serviceType1, serviceType5, serviceType3, serviceType10, gubun) {
    var lectureDay = $('select[name="lectureDay"]').val();
    var scHeight = $(document).scrollTop();

    if (lectureDay != '') {
        var msg = '';
        if (gubun == 'studyEnd') {
            msg = '정말 일괄 수강마감을 하시겠습니까?';
        } else {
            msg = '점수 일괄 확인처리를 하시겠습니까?';
        }
        if (confirm(msg)) {
            $.ajax({
                url: useApi,
                type: 'POST',
                data: {
                    'lectureStart': lectureStart,
                    'lectureEnd': lectureEnd,
                    'companyCode': companyCode,
                    'serviceType1': serviceType1,
                    'serviceType5': serviceType5,
                    'serviceType3': serviceType3,
                    'serviceType10': serviceType10,
                    'gubun': gubun,
                    'sendAll': 'y'
                },
                dataType: 'JSON',
                success: function (data) {
                    if (data.result == 'success') {
                        alert('처리되었습니다.');
                        ajaxAct();
                        //loadingAct();
                        window.scrollTo(0, scHeight);
                    } else {
                        alert('이미 처리되었습니다.');
                    }
                },
                beforeSend: function () {
                    //loadingAct();
                }
            })
        }
    } else {
        alert('기간을 선택해 주세요.');
        return;
    }
}

function lmsJoinEnd(lectureOpenSeq, contentsCode, companyCode) {
    var check = $.get('../api/apiStudyChapterSSO.php', 'lectureOpenSeq=' + lectureOpenSeq + '&contentsCode=' + contentsCode + '&companyCode=' + companyCode + '&userID=N', function (data) {
        var sendAddress = data.sso;
        var sendData = {
            'userID': data.userID,
            'ssoCode': data.contentsCode,
            'lectureStart': data.lectureStart,
            'lectureEnd': data.lectureEnd,
            'progress': data.totalProgress,
            'midProgress': data.midProgress,
            'testProgress': data.testProgress,
            'reportProgress': data.reportProgress,
            'totalScore': data.totalScore,
            'passOK': data.passOK
        }


        if (confirm('수강연동 데이터를 전송하시겠습니까?')) {
            $.ajax({
                url: sendAddress,
                type: 'GET',
                dataType: 'jsonp',
                data: sendData
            })
        }
    });
}

function resultDoc(lectureStart, lectureEnd, companyCode) {
    if (confirm(msg)) {
        $.ajax({
            url: useApi,
            type: 'GET',
            data: {'lectureStart': lectureStart, 'lectureEnd': lectureEnd, 'companyCode': companyCode},
            success: function () {
                ajaxAct();
            }
        })
    }
}


//검색관련

function searchTypeSelect(types) {
    document.getElementById('searchTypeArea').innerHTML = '';
    // $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"]').remove();
    var chageSearch = ''
    if (types == 'searchDate') {
        chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
        var today = new Date();
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option>' + i + '년</option>';
            } else {
                chageSearch += '<option selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>';
        chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                chageSearch += '<option>' + h + '월</option>';
            } else {
                chageSearch += '<option selected="selected">' + h + '월</option>';
            }

        }
        chageSearch += '</select>';
    } else if (types == 'searchCompany') {
        chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
    }
    document.getElementById('searchTypeArea').insertAdjacentHTML('beforeend', chageSearch);
    // $('.searchArea div.searchChangeArea').append(chageSearch)
    if (types == 'searchDate') {
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth() + 1; //January is 0!
        if (thisMonth <= 9) {
            thisMonth = '0' + thisMonth;
        }
        var checkDate = thisYear + '-' + thisMonth;
        searchStudy('lectureDay', checkDate)
    }
    //actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types, vals) {
    if (types == 'lectureDay') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
        var dateChain = ''
        dateChain += $('select[name="searchYear"]').val().replace('년', '') + '-';
        if (eval($('select[name="searchMonth"]').val().replace('월', '')) < 10) {
            dateChain += '0' + $('select[name="searchMonth"]').val().replace('월', '');
        } else {
            dateChain += $('select[name="searchMonth"]').val().replace('월', '');
        }
        $.get(chainsearchApi, {'searchMode': types, 'searchDay': dateChain}, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.lectureStart + '~' + this.lectureEnd + '">' + this.lectureStart + '~' + this.lectureEnd + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="searchMonth"]').after(selectWrite)
        })
    } else if (types == 'company') {
        $('select[name="companyCode"], strong.noticeSearch').remove();
        var searchName = vals.value
        if (searchName != '' && searchName != ' ') {
            $.get(chainsearchApi, {'searchMode': types, 'searchName': searchName}, function (data) {
                var selectWrite = ''
                if (data.totalCount != 0) {
                    $('select[name="companyCode"]').remove();
                    selectWrite += '<select id="companyCode" name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
                    selectWrite += '<option value="">사업주를 선택하세요</option>'
                    $.each(data.searchResult, function () {
                        selectWrite += '<option value="' + this.searchCode + '">' + this.searchName + '&nbsp;|&nbsp;' + this.searchCode + '</option>';
                    })
                    selectWrite += '</select>'
                } else {
                    selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
                }
                $('input[name="searchCompany"]').after(selectWrite)

            })
        } else {
            $('.searchChangeArea select, strong.noticeSearch').remove();
        }
    } else if (types == 'printCompany') {
        $('strong.noticeSearch, select[name="companyCode"]').remove();
        var searchDate = vals.value
        $.get(chainsearchApi, {'searchMode': 'study', 'lectureDay': searchDate}, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select id="companyCode" name="companyCode" onChange="searchAct()">';
                selectWrite += '<option value="">사업주를 선택하세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.companyCode + '">' + this.companyName + '&nbsp;|&nbsp;' + this.companyCode + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    } else if (types == 'printDate') {
        $('select[name="lectureDay"], strong.noticeSearch').remove();
        var companyCode = vals.value;
        $.get(chainsearchApi, {'searchMode': 'study', 'companyCode': companyCode}, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="lectureDay" onChange="searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.lectureStart + '~' + this.lectureEnd + '">' + this.lectureStart + '~' + this.lectureEnd + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    }
}

function pdfBundle(flag, lectureStart, lectureEnd, companyCode, passOK, cover) {
    if (document.getElementById('companyCode').value == '') {
        alert('사업주를 선택해주세요.');
        return false;
    }

    if (flag == 'C') {
        certificateFilter();
        // window.open(`certificateNewTest.php?lectureStart=${lectureStart}&lectureEnd=${lectureEnd}&companyCode=${companyCode}`, '_blank');
    } else {
        if (passOK == 'Y') {
            window.open(`resultDocumentNewTest2.php?lectureStart=${lectureStart}&lectureEnd=${lectureEnd}&companyCode=${companyCode}&passOK=Y&cover=${cover}`, '_blank');
        } else {
            window.open(`resultDocumentNewTest2.php?lectureStart=${lectureStart}&lectureEnd=${lectureEnd}&companyCode=${companyCode}&cover=${cover}`, '_blank');
        }

    }
}

function certificateFilter(bundle, queryString) {
    if (document.getElementById('certificateFilter')) {
        document.getElementById('certificateFilter').remove();
    }

    if (bundle == 'Y' && document.getElementById('companyCode').value == '') {
        alert('사업주를 선택해주세요.');
        return false;
    }

    const dialog = `
        <dialog id="certificateFilter" style="border: 1px solid; border-radius: 5px; width: 500px; min-height: 200px;">
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
            <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="birthDay" style="font-size:14px; font-weight: bold;">생년월일 미표기</lable>
              <input id="birthDay" type="checkbox" name="birthDay" style="display: inline; width: 15px; height: 15px; margin: 0;">
            </div>
            <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="hidePassDate" style="font-size:14px; font-weight: bold;">수료일 미표기</lable>
              <input id="hidePassDate" type="checkbox" name="hidePassDate" style="display: inline; width: 15px; height: 15px; margin: 0;">
            </div>
            <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="passDate" style="font-size:14px; font-weight: bold;">수료일 선택(미선택시 실제 수료일 출력)</lable>
              <input id="passDate" type="date" name="passDate" style="display: inline; margin: 0;">
            </div>
        </div>
        <div style="display:flex; justify-content: center; margin-top: 20px;">
            <button style="border:none; background: #74b9ff; color: #0984e3; 
            font-size:15px; width: 100px; height: 30px; border-radius: 5px;"
            onclick="printCertificate('${queryString}')">
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

function printCertificate(query) {
    let param = query;
    if (document.getElementById('chapterName').checked) {
        param += '&chapterName=Y';
    }

    if (document.getElementById('changeDept').checked) {
        param += '&changeDept=Y';
    }

    if (document.getElementById('birthDay').checked) {
        param += '&birthDay=N';
    }

    if (document.getElementById('hidePassDate').checked) {
        param += '&hidePassDate=Y';
    }

	if (document.getElementById('passDate').value != '') {
		param += '&passDate=' + document.getElementById('passDate').value;
	}

    const modal = document.getElementById('certificateFilter');
    closeModal();
    window.open(`certificateNew.php?${param}`, '_blank');
}



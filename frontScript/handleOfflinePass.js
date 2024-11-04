var allowUserID = ['sseul0613', 'dr2201', 'dnthdgml', 'hh19', 'yeram07', 'want314', 'lucia_nam', 'eungmin2', 'zkfmak3785', 'hreducenter'];
var offlinePassApi = '/api/apiHandleOfflinePass.php';

if (!allowUserID.includes(loginUserID)) {
    alert('접근권한이 없습니다.');
    window.history.back();
}

function listAct(page) {
    var actionArea = '';
    var today = new Date();

    actionArea += '<div class="searchArea"><form class="searchForm" id="seachForm" action="javascript:searchAct()">';
    actionArea += '<input type="hidden" id="isActSearch" name="isActSearch" value="N">';
    actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>';

    if (loginUserLevel == 2) {
        actionArea += addStandardDayType();
    }

    // actionArea += '(<input type="radio" name="searchDayType" id="searchDayTypeStart" value="start" checked="checked" onChange="searchTypeSelect(\'searchDate\', \'start\')" /><label for="searchDayTypeStart">시작일기준</label>&nbsp;&nbsp;&nbsp;/';
    // actionArea += '<input type="radio" name="searchDayType" id="searchDayTypeEnd" value="end" onChange="searchTypeSelect(\'searchDate\', \'end\')" /><label for="searchDayTypeEnd">종료일기준 )</label>&nbsp;&nbsp;&nbsp;';

    if (loginUserLevel != '7' && loginUserLevel != '8') {
        actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
    }

    actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
    var i = '';
    var thisYear = today.getFullYear();
    for (i = 2015; i <= thisYear; i++) {
        if (i != thisYear) {
            actionArea += '<option value="' + i + '">' + i + '년</option>';
        } else {
            actionArea += '<option value="' + i + '" selected="selected">' + i + '년</option>';
        }
    }
    actionArea += '</select>';
    actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
    if (allowUserID.includes(loginUserID) || loginUserLevel == '7') {
        actionArea += '<option value="0" selected="selected">전체</option>';
    }
    var h = '';
    var thisMonth = today.getMonth() + 1; //January is 0!
    for (h = 1; h <= 12; h++) {
        if (h != thisMonth) {
            actionArea += '<option value="' + h + '">' + h + '월</option>';
        } else {
            actionArea += '<option value="' + h + '" selected="selected">' + h + '월</option>';
        }

    }
    actionArea += '</select>';
    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += '<span>이름,ID</span>';
    actionArea += '<select name="searchType">';
    actionArea += '<option value="searchUserName">수강생</option>';
    actionArea += '<option value="searchMarketer">영업담당자</option>';
	if (loginUserLevel <= 3) {
		actionArea += '<option value="searchTutor">교강사</option>';
	}
    actionArea += '</select>';
    actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';

    actionArea += '<span>수료여부</span>';
    actionArea += '<select name="passOK">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">수료</option>';
    actionArea += '<option value="N">미수료</option>';
    actionArea += '</select>';


    actionArea += '<span>부서</span>';
    actionArea += '<input type="text" style="width:250px;" name="department">';
    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += '<span>과정명</span>';
    actionArea += '<input type="text" style="width:570px;" name="contentsName">';
    if (loginUserLevel <= 3) {
        actionArea += '<span>과정코드</span>';
        actionArea += '<input type="text" style="width:100px;" name="contentsCode">';
    }
    actionArea += '<span>페이지 수</span>';
    actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';
    actionArea += '</div>';

    actionArea += '<button type="submit" style="width:100%">검색</button></form>';
    actionArea += '</form></div>';

    if (loginUserLevel < '4') {
		actionArea += '<div class="searchArea">'
		actionArea += '<form class="searchForm" id="handleForm">'
		actionArea += '<div class="searchChangeArea3">'

		actionArea += '<span>수료변경</span>';
		actionArea += '<select name="handlePass">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="Y">수료</option>';
		actionArea += '<option value="N">미수료</option>';
		actionArea += '</select>';

		actionArea += '<span>수료일</span>';
		actionArea += '<input type="date" name="passDate">'

		actionArea += '<input type="checkbox" name="allCheck" value="Y" id="allCheck" onchange="isAllCheck(this)">';
		actionArea += '<label for="allCheck" style="margin-left:30px;">전체</label>';
		actionArea += '&nbsp;&nbsp;<span style="color:tomato">주의) 전체 선택시 페이지에 보이는 개수가 아닌, 검색 결과의 모든 데이터가 변경됩니다.</span>';
		actionArea += '<button type="button" style="margin-left:30px;" onclick="passStatusChange()">변경하기</button>';
		actionArea += '</div>';
		actionArea += '</form>';
		actionArea += '</div>';
	}
    $('#contents > h1').after(actionArea);

    var contents = '';
    contents += '<table> <thead><tr>';
	if (loginUserLevel < '4') {
	    contents += '<th style="width:50px;">선택</th>';
	}
    contents += '<th style="width:50px;">번호/구분</th>';
    contents += '<th style="width:80px;">ID<br/>이름</th>';
    contents += '<th style="width:310px;">과정명<br/>수강기간</th>';
	if (loginUserLevel < '4') {
	    contents += '<th style="width:70px;">진도율</th>';
	}
    contents += '<th style="width:80px;">총점<br/>수료여부</th>';
    if (loginUserLevel < '4') {
        contents += '<th style="width:80px;">교ㆍ강사</th>';    
	    contents += '<th style="width:180px;">사업주<br/>(현재 영업담당자와 다를 수 있음)</th>';
	}
    contents += '</tr></thead><tbody>';
    contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td> </tr>';
    contents += '</tbody></table>';
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
    //ajaxAct();
    /*
    var thisYear = today.getFullYear();
    var thisMonth = today.getMonth()+1; //January is 0!
    if(thisMonth
        <= 9){
        thisMonth = '0' + thisMonth;
    }
    var checkDate = thisYear +'-'+thisMonth;
    searchStudy('lectureDay',checkDate)
    */
    var checkDate = thisYear + '-' + thisMonth;
    searchStudy('lectureDay', checkDate)
}


function ajaxAct(sortDatas) {
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }
    var listAjax = $.get(offlinePassApi, 'page=' + page + '&list=' + listCount + '&serviceType=' + serviceType + sortData, function (data) {
        totalCount = data.totalCount;
        nextCount = data.nextGroupCount;
        //alert(totalCount)
        var lists = '';
        var midStatus = '';
        var testStatus = '';
        var reportStatus = '';
        var totalScore = '';
        var testCopy = '';
        var reportCopy = '';
        var passOK = '';
        var serviceType = '';
        var j = totalCount;
        var testOverTime = '';
        if (page != 1) {
            j = totalCount - ((page - 1) * listCount);
        }
        if (totalCount != 0 && loginUserLevel <= userLevel) {
            $.each(data.study, function () {
                var today = new Date();
                var todayY = today.getFullYear();
                var todayM = new String(today.getMonth() + 1);
                var todayD = new String(today.getDate());

                if (todayM.length == 1) {
                    todayM = "0" + todayM;
                }
                if (todayD.length == 1) {
                    todayD = "0" + todayD;
                }
                today = todayY + '-' + todayM + '-' + todayD;

                let highMarketer = this.marketer.highMarketer ?? '-';
                let highMarketerString = '영업팀장: 없음<br>';

                if (highMarketer != '-') {
                    highMarketerString = '';
                    highMarketer.split(',').forEach(m => {
                        highMarketerString += `영업팀장: ${m}<br>`;
                    })
                }

                if (this.serviceType == '1') {
                    serviceType = '사업주';
                } else if (this.serviceType == '2') {
                    serviceType = '내배카';
                } else if (this.serviceType == '3') {
                    serviceType = '비환급';
                } else if (this.serviceType == '5') {
                    serviceType = '산업안전';
                } else if (this.serviceType == '4') {
                    serviceType = 'Flex';
                } else if (this.serviceType == '8' || this.serviceType == '7') {
                    if (this.rPrice == 0) {
                        serviceType += '<br /><span style="color:red;">(비환급)</span>';
                    } else {
                        serviceType += '<br />(환급)';
                    }
                } else if (this.serviceType == '10') {
                    serviceType = '비환급(평가있음)';
                } else if (this.serviceType == '11') {
                    serviceType = '오프라인';
                } else {
                    serviceType = '테스트';
                }

                lists += '<tr>';
	
				if (loginUserLevel < '4') {
					lists += `<td><input type="checkbox" id="chk_${this.seq}" name="chk_${this.seq}" value="${this.seq}" onchange="isChecked(this)">
						<label for="chk_${this.seq}"></label></td>`;
				}

                if (loginUserLevel <= 3) {
                    lists += '<td>' + j + '<br />' + serviceType + '</td>';
                } else {
                    lists += '<td>' + j + '<br />' + serviceType + '</td>';
                }
                if (this.user.userRetire == 'Y') {
                    lists += '<td onClick="globalModalAct(\'memberView\',\'\',\'' + this.user.userID + '\')" style="cursor:pointer; color:red;">' + this.user.userID + '<br/>';
                    lists += this.user.userName + '(퇴사자)</td>';
                } else {
                    lists += '<td onClick="globalModalAct(\'memberView\',\'\',\'' + this.user.userID + '\')" style="cursor:pointer;">' + this.user.userID + '<br/>';
                    lists += this.user.userName;
                    if (this.user.ssoName) {
                        lists += '<br/><span style="color:blue">(' + this.user.ssoName + ' 수강연동회원)</span>';
                    }
                    lists += '</td>';
                }

                lists += '<td onClick="globalModalAct(\'studyInfo\',\'\',\'' + this.contents.contentsCode + '\',\'' + this.seq + '\',\'' + this.lectureOpenSeq + '\')" style="cursor:pointer;">' + this.contents.contentsName + '<br/>';


                var openChapter = this.openChapter;
                if (openChapter == null) {
                    openChapter = '미등록';
                }
                if (this.serviceType == '8') {
                    openChapter = '수강연동';
                } else if (this.serviceType == '3' || this.serviceType == '5') {
                    openChapter = '비환급';
                }
                lists += this.lectureStart + ' ~ ' + this.lectureEnd;


                lists += '</td>';
				if (loginUserLevel < '4') {
	                lists += '<td onClick="globalModalAct(\'progressView\',' + this.lectureOpenSeq + ',\'' + this.user.userID + '\')" style="cursor:pointer;">' + this.progress + '%</td>';
				}


                if (this.serviceType == '3') { // 비환급인 경우 평가없음
                    totalScore = '-';
                } else {
                    if (this.totalScore == null) { // 총점이 null인 경우 0
                        totalScore = 0;
                    } else {
                        totalScore = this.totalScore;
                    }
                }

                if (this.testCopy == 'Y') { // 모사답안
                    testCopy = '<br /><strong class="red">평가모사</strong>';
                } else if (this.testCopy == 'D') {
                    testCopy = '<br /><strong class="blue">평가 모사의심</strong>';
                } else {
                    testCopy = '';
                }

                if (this.reportCopy == 'Y') { // 모사답안
                    reportCopy = '<br /><strong class="red">과제 모사확정</strong>';
                } else if (this.reportCopy == 'D') {
                    reportCopy = '<br /><strong class="blue">과제 모사의심</strong>';
                } else {
                    reportCopy = '';
                }

                if (this.serviceType == '3') {
                    if (this.progress < 100 && this.progress > 0) {
                        passOK = '진행중';
                    } else {
                        if (this.progress == 100) { // 수료
                            // passOK = '<strong class="blue" style="cursor:pointer;" onclick="printPop(' + this.seq + ');">수료</strong>';
                            passOK = '<strong class="blue" style="cursor:pointer;" onclick="certificateFilter(' + this.seq + ');">수료</strong>';
                        } else {
                            passOK = '<strong class="red">미수료</strong>';
                        }
                    }
                } else {
                    if (this.passOK == 'Y') { // 수료
                        passOK = '<strong class="blue" style="cursor:pointer;" onclick="certificateFilter(' + this.seq + ');">수료</strong>';
                    } else {
                        passOK = '<strong class="red">미수료</strong>';
                    }


                }

                lists += '<td><span onClick="globalModalAct(\'passOKView\',' + this.lectureOpenSeq + ',\'' + this.user.userID + '\')" style="cursor:pointer;">' + totalScore + testCopy + reportCopy + '</span><br />' + passOK + '</td>';

                if (loginUserLevel <= '2') {
                    //lists += '<td>'+this.tutor.tutorName+'<br />'+this.marketer.marketerName+'</td>';
                    lists += '<td>' + this.tutor.tutorName + '</td>';                
	                lists += '<td onClick="globalModalAct(\'companyView\',\'\',\'' + this.company.companyCode + '\'\)" style="cursor:pointer;">' + this.company.companyName + '<br>';
				}

                lists += this.applySeq + '<br>';
                lists += this.contractSeq;
                if (this.user.department) {
                    lists += '<br />부서 : ' + this.user.department;
                }
                if (loginUserLevel <= '2') {
                    lists += `<br/>${highMarketerString}`;
                    lists += '영업담당자 : ' + this.marketer.marketerName;
                }
                lists += '</td>';

                lists += '</tr>';
                j--;
            })

            // 검색을 하고 검색 결과가 있는 경우에 검색했다는 값을 넣어줌
            document.getElementById('isActSearch').value = 'Y';
        } else if (loginUserLevel > userLevel) {
            document.getElementById('isActSearch').value = 'N';
            lists += '<tr><td class="notResult" colspan="12">조회 권한이 없습니다.</td></tr>'
        } else {
            document.getElementById('isActSearch').value = 'N';
            lists += '<tr><td class="notResult" colspan="12">검색 결과가 없습니다.</td></tr>'
        }
        $('.BBSList tbody').html(lists);

        pagerAct();
        loadingAct();
    })
}

function searchTypeSelect(types, searchDayType) {

    $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .searchArea div.searchChangeArea span').remove();
    var chageSearch = ''
    if (types == 'searchDate') {
        document.querySelector('label[for="searchDate"]').insertAdjacentHTML('afterend', addStandardDayType());
        chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
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
        chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
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
    } else if (types == 'searchAcademy') {
        chageSearch += '<span>지회구분</span>';
        chageSearch += '<select name="bigCountry">';
        chageSearch += '<option value="sjhy">세종</option>';
        chageSearch += '<option value="djhy">대전</option>';
        chageSearch += '<option value="cnhy">충남</option>';
        chageSearch += '<option value="cbhy">충북</option>';
        chageSearch += '<option value="kwhy">강원</option>';
        chageSearch += '<option value="jnhy">전남</option>';
        chageSearch += '</select>';
        chageSearch += '&nbsp;<input type="text" name="searchAcCompany">';
        chageSearch += '<select name="searchYear">';
        var today = new Date();
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option>' + i + '년</option>';
            } else {
                chageSearch += '<option selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>'
        chageSearch += '<select name="searchMonth">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != 1) {
                chageSearch += '<option>' + h + '월</option>';
            } else {
                chageSearch += '<option selected="selected">' + h + '월</option>';
            }
        }
        chageSearch += '</select>';
    }
    $('.searchArea div.searchChangeArea').append(chageSearch)
    if (types == 'searchDate') {
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth() + 1; //January is 0!
        if (thisMonth <= 9) {
            thisMonth = '0' + thisMonth;
        }
        var checkDate = thisYear + '-' + thisMonth;
        searchStudy('lectureDay', checkDate, searchDayType)
    }
    //actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types, vals, searchDayType) {
    if (searchDayType == '') {
        searchDayType = $('select[name="searchDayType"]').val();
    }

    if (document.getElementById('standardDayType')) {
        document.getElementById('standardDayType').value = '';
    }

    if (document.querySelector('input[name="startDate"]')) {
        document.querySelector('input[name="startDate"]').parentNode.remove();
    }

    if (types == 'lectureDay') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
        var dateChain = ''
        dateChain += $('select[name="searchYear"]').val().replace('년', '') + '-';
        if (eval($('select[name="searchMonth"]').val().replace('월', '')) < 10) {
            dateChain += '0' + $('select[name="searchMonth"]').val().replace('월', '');
        } else {
            dateChain += $('select[name="searchMonth"]').val().replace('월', '');
        }
        $.get(chainsearchApi, {
            'searchMode': types,
            'searchDay': dateChain,
            'searchDayType': searchDayType
        }, function (data) {
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
            $.get(chainsearchApi, {
                'searchMode': types,
                'searchName': searchName
            }, function (data) {
                var selectWrite = ''
                if (data.totalCount != 0) {
                    $('select[name="companyCode"]').remove();
                    selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
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
        $('strong.noticeSearch, select[name="companyCode"],select[name="contentsCode"]').remove();
        var searchDate = vals.value
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'lectureDay': searchDate
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct()">';
                selectWrite += '<option value="">사업주를 선택하세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.companyCode + '/' + searchDate + '">' + this.companyName + '&nbsp;|&nbsp;' + this.companyCode + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    } else if (types == 'printContents') {
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var companyCode = vals.value;

        $.get(chainsearchApi, {
            'searchMode': 'study',
            'companyCode': companyCode,
            'type': 'contents'
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.contentsCode + '">' + this.contentsName + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    } else if (types == 'printDate') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
        var companyCode = vals.value;
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'companyCode': companyCode
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + companyCode + '/' + this.lectureStart + '~' + this.lectureEnd + '">' + this.lectureStart + '~' + this.lectureEnd + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    } else if (types == 'printContents2') {
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var searchDate = vals.value;
        $.get(chainsearchApi, {
            'searchMode': 'study',
            'lectureDate': searchDate,
            'type': 'contents'
        }, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult, function () {
                    selectWrite += '<option value="' + this.contentsCode + '">' + this.contentsName + '</option>';
                })
                selectWrite += '</select>'
            } else {
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    }
}

function addDateInput(select) {
    let standardDayType = document.getElementById('standardDayType');
    let dateInput = '';

    dateInput += '<span><input type="date" name="startDate"> ~ ';
    dateInput += '<input type="date" name="endDate"></span>';

    if (!document.querySelector('input[name="startDate"]')) {
        standardDayType.insertAdjacentHTML('afterend', dateInput);
    }

    if (select.value == '') {
        if (document.querySelector('input[name="startDate"]')) {
            document.querySelector('input[name="startDate"]').parentNode.remove();
        }
    }

    $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
}

function addStandardDayType() {
    return '<select name="standardDayType" id="standardDayType" onchange="addDateInput(this)"' +
        ' style="margin:0 5px">' +
        '<option value="">기준없음</option>' +
        '<option value="startDay">시작일</option>' +
        '<option value="endDay">종료일</option>' +
        '</select>';
}

// 전체 선택시에 개별 선택 초기화
function isAllCheck(box) {
    if (document.getElementById('contentsArea')) {
        if (box.checked) {
            const innerCheckedBoxes = document.getElementById('contentsArea').querySelectorAll('input[type="checkbox"]:checked');

            Array.from(innerCheckedBoxes).forEach(e => {
                e.checked = false;
            })
        }
    }
}

// 개별 선택시에 전체선택 초기화
function isChecked(box) {
    const allCheck = document.getElementById('allCheck');

    if (box.checked && allCheck.checked) {
        allCheck.checked = false;
    }
}

function passStatusChange() {
    const searchForm = document.getElementById('seachForm');
    const handleForm = document.getElementById('handleForm');

    const searchFormData = new FormData(searchForm);
    const handleFormData = new FormData(handleForm);

    let finalData = new FormData();

    for (let [key, value] of searchFormData.entries()) {
        finalData.append(key, value);
    }

    for (let [key, value] of handleFormData.entries()) {
        finalData.append(key, value);
    }

    const innerCheckBoxes = document.getElementById('contentsArea').querySelectorAll('input[type="checkbox"]:checked')
    if (innerCheckBoxes.length > 0) {
        let seqBundle = [];
        Array.from(innerCheckBoxes).forEach(e => {
            seqBundle.push(e.value);
        })
        finalData.append('seqBundle', seqBundle);
    }

    if (finalData.get('isActSearch') != 'Y') {
        alert('검색을 해주세요.');
        return;
    }

    if (!finalData.get('handlePass')) {
        alert('수료변경 값을 설정해주세요.');
        return;
    }

    if (finalData.get('handlePass') == 'Y' && finalData.get('passDate') == '') {
        alert('수료일을 설정해주세요.');
        return;
    }

    fetch(offlinePassApi, {
        method: 'POST',
        body: finalData
    })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                alert('변경됐습니다');
                ajaxAct(sortData);
            }

            if (data.result != 'success') {
                alert('오류가 발생했습니다.');
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
            <div style="display: flex; align-items: center; gap: 0 5px;">
              <lable for="birthDay" style="font-size:14px; font-weight: bold;">생년월일 미표기</lable>
              <input id="birthDay" type="checkbox" name="birthDay" style="display: inline; width: 15px; height: 15px; margin: 0;">
            </div>
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

    if (document.getElementById('birthDay').checked) {
        param += '&birthDay=N';
    }

    const modal = document.getElementById('certificateFilter');
    closeModal();
    window.open(`../study/print.php?${param}`, '_blank');
}
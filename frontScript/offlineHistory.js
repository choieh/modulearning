var allowUserID = ['sseul0613', 'dr2201', 'dnthdgml', 'hh19', 'want314', 'eungmin2', 'zkfmak3785', 'hreducenter', 'mrkim91'];
var useApi = '/api/apiOfflineHistory.php';

if (!allowUserID.includes(loginUserID) && loginUserLevel != 8) {
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
        actionArea += '|&nbsp;<input type="radio" name="selectSearch" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
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
    var h = '';
    var thisMonth = today.getMonth() + 1; //January is 0!
    for (h = 1; h <= 12; h++) {
        if (h != thisMonth) {
            actionArea += '<option value="' + h + '">' + h + '월</option>';
        } else {
            actionArea += '<option value="' + h + '" selected="selected">' + h + '월</option>';
        }

    }
	if (allowUserID.includes(loginUserID) || loginUserLevel == '7' || loginUserLevel == '8') {
        actionArea += '<option value="0" selected="selected">전체</option>';
    }
    actionArea += '</select>';
    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += '<span>이름,ID</span>';
    actionArea += '<select name="searchType">';
    actionArea += '<option value="searchUserName">수강생</option>';
    actionArea += '<option value="searchMarketer">영업담당자</option>';
    actionArea += '<option value="searchTutor">교강사</option>';
    actionArea += '</select>';
    actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';

    actionArea += '<span>수료여부</span>';
    actionArea += '<select name="passOK">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">수료</option>';
    actionArea += '<option value="N">미수료</option>';
    actionArea += '</select>';

    actionArea += '<span>결제여부</span>';
    actionArea += '<select name="orderStatus">';
    actionArea += '<option value="">선택</option>';
    actionArea += '<option value="Y">결제</option>';
    actionArea += '<option value="C">취소</option>';
    actionArea += '<option value="R">대기</option>';
    actionArea += '</select>'

    actionArea += '<span>결제방법</span>';
    actionArea += '<select name="paymentType">';
    actionArea += '<option value="">선택</option>';
    actionArea += '<option value="card">카드</option>';
    actionArea += '<option value="simplePay">간편결제</option>';
    actionArea += '<option value="va">가상계좌</option>';
    actionArea += '<option value="bill">세금계산서</option>';
    actionArea += '</select>'

    actionArea += '<span>회사</span>';
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
    actionArea += ' <button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
    actionArea += '</div>';

    actionArea += '<button type="submit" style="width:100%">검색</button></form>';
    actionArea += '</form></div>';


    $('#contents > h1').after(actionArea);

    var contents = '';
    contents += '<table><thead><tr>';
    contents += '<th style="width:80px;">ID<br/>이름</th>';
    contents += '<th style="width:310px;">결제요청명</th>';
	contents += '<th style="width:70px;">수강일</th>';
    contents += '<th style="width:70px;">결제금액</th>';
    contents += '<th style="width:70px;">결제요청일</th>';
    contents += '<th style="width:70px;">결제여부</th>';
    contents += '<th style="width:70px;">결제방법</th>';
    contents += '<th style="width:70px;">결제일</th>';
    if (loginUserLevel == 2) {
        contents += '<th style="width:70px;">취소/삭제</th>';
    }

    contents += '<th style="width:70px;">비고</th>';
    contents += '</tr></thead><tbody>';
    contents += '<tr><td class="notResult" colspan="20">검색값을 선택하세요.</td> </tr>';
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

    var listAjax = $.get(useApi, 'subdomain=educenter&page=' + page + '&list=' + listCount + sortData, function (data) {
        totalCount = data.totalCount;

        //alert(totalCount)
        var lists = '';

        var j = totalCount;
        var testOverTime = '';
        if (page != 1) {
            j = totalCount - ((page - 1) * listCount);
        }
        if (totalCount != 0 && loginUserLevel <= userLevel) {
            $.each(data.list, function () {
                var paymentType = '-'
                if (this.paymentType == 'card') {
                    paymentType = '카드'
                } else if (this.paymentType == 'va') {
                    paymentType = '가상계좌'
                } else if (this.paymentType == 'simplePay') {
                    paymentType = '간편결제'
                } else if (this.paymentType == 'bill') {
                    paymentType = '세금계산서'
                }
				
				if (this.hidden == 'Y') {
					lists += '<tr style="background-color:darkgray;text-decoration: line-through;">';
				} else {
					lists += '<tr>';
				}
                
                lists += `<td onClick="globalModalAct('memberView','${this.memberSeq}','${this.userID}')">${this.userID}<br>${this.userName}</td>`;
                lists += '<td>' + this.orderName + '</td>';
				lists += `<td>${this.lectureStart}</td>`;
                lists += '<td>' + toPriceNum(this.price) + '</td>';
                lists += '<td>' + this.inputDate + '</td>';
				
				if (loginUserLevel == 8) {
					if (this.orderStatus == 'Y') {
						lists += `<td style="color:#0000ff; cursor:pointer;">결제완료</td>`;
					} else if (this.orderStatus == 'C') {
						lists += `<td style="color:#ff0000;">결제취소</td>`;
					} else if (this.orderStatus == 'R') {
						lists += `<td style="color:green;">결제대기</td>`;
					} else {
						lists += `<td style="color: tomato;">미결제</td>`;
					}
				} else {
					if (this.orderStatus == 'Y') {
						lists += `<td style="color:#0000ff; cursor:pointer;">결제완료<br/><button type="button" onClick="reOrderStatus('C',${this.seq})">결제취소</button></td>`;
					} else if (this.orderStatus == 'C') {
						lists += `<td style="color:#ff0000;">결제취소<br/><button type="button" onClick="reOrderStatus('Y',${this.seq})">결제완료</button></td>`;
					} else if (this.orderStatus == 'R') {
						lists += `<td style="color:green;">결제대기<br/><button type="button" onClick="reOrderStatus('Y',${this.seq})">결제완료</button></td>`;
					} else {
						lists += `<td style="color: tomato;">미결제<br/><button type="button" onClick="reOrderStatus('Y',${this.seq})">결제완료</button></td>`;
					}
				}

                lists += `<td>${paymentType}</td>`;
                lists += `<td>${this.orderDate ?? '-'}</td>`;

                if (loginUserLevel == '2') {
					lists += '<td>';
                    if (this.orderStatus == 'Y' && this.paymentType != 'bill') {
                        lists += `<button type="button" onClick="refundAmount('${this.paymentType}',${this.seq}, ${this.studySeq})">결제 취소</button>`;
                    }
					if (this.hidden == 'N') {
						lists += `<button type="button" onClick="hiddenAct(${this.seq},'Y')">삭제</button>`;
					} else {
						lists += `<button type="button" onClick="hiddenAct(${this.seq},'N')">삭제취소</button>`;
					}					
					lists += '</td>';
                }


                lists += '<td>-</td>';

                lists += '</tr>';
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
		'<option value="inputDate">결제요청일</option>' +
		'<option value="orderDate">결제일</option>' +
        '</select>';
}

function removeModal() {
    document.getElementById('refundModal').remove();
}

function addRefundInfo(customPaySeq, studySeq) {
    const bank = document.querySelector('#refundInfo #bank').value;
    const account = document.querySelector('#refundInfo #account').value;
    const userName = document.querySelector('#refundInfo #userName').value;
    removeModal();
    refundAmount('', customPaySeq, studySeq, {bank, account, userName});
}

function writeRefundInfo(customPaySeq, studySeq) {
    var modal = '';
    modal += '<dialog open id="refundModal" style="width: 300px; position: fixed; top:50%; left: 15%;">'
    modal += '<div style="text-align: right"><button type="button" onclick="removeModal()">닫기</button></div>';
    modal += '<div id="refundInfo" style="font-size: 14px;">'
    modal += `<p><label for="bank">은행</label>&nbsp;&nbsp;&nbsp;`
    modal += '<select id="bank" name="bank">'
    modal += `<option value="">선택</option>`
    Object.keys(bankCode).map(function (key) {
        modal += `<option value="${key}">${bankCode[key]}</option>`;
    })
    modal += '</select></p>'
    modal += '<p><label for="account">계좌</label><input type="text" id="account" name="account"></p>'
    modal += '<p><label for="userName">예금주</label><input type="text" id="userName" name="userName"></p>'
    modal += '</div>';
    modal += `<div><button type="button" style="width: 100%; padding: 2px;" onclick="addRefundInfo(${customPaySeq}, ${studySeq})">작성</button></div>`;
    modal += '</dialog>'

    document.body.insertAdjacentHTML('beforeend', modal);
}

function refundAmount(paymentType, customPaySeq, studySeq, obj = {}) {
    if (paymentType == 'va') {
        writeRefundInfo(customPaySeq, studySeq);
        return;
    }

    var str = '';
		
	if (confirm("결제 취소를 하시겠습니까? (예/아니오)")) {

		if (obj) {
			str = Object.keys(obj).map(function (key) {
				return key + "=" + encodeURIComponent(obj[key]);
			}).join("&");
		}

		fetch(useApi, {
			method: 'DELETE',
			body: `customPaySeq=${customPaySeq}&studySeq=${studySeq}&${str}`,
		})
			.then(res => res.json())
			.then(data => {
				if (data.result == 'refund') {
					alert(`환불 실패\n${data.message.message}`)
					ajaxAct(sortData);
					return;
				}

				if (data.result == 'error') {
					alert('오류가 발생했습니다.')
					ajaxAct(sortData);
					return;
				}

				if (data.result == 'success') {
					alert('처리 됐습니다.')
					ajaxAct(sortData);
					return;
				}

				alert('알 수 없는 오류 발생')
			})
	}
}

//삭제처리 (실제 삭제는 되지 않음, hidden 처리)
function hiddenAct(seq,hiddenVal) {
	// 전송할 데이터 객체 생성
	var dataToSend = {
		seq: seq,
		hiddenYN: 'Y',
		hiddenVal: hiddenVal
	};
	
	// 버튼 클릭 시 AJAX 요청 전송	
	$.ajax({
		url: useApi,
		type: 'POST',		
		data: dataToSend,
		success: function(response) {
			// 요청이 성공했을 때의 처리
			alert('Success: ' + response.message);
			searchAct();
		},
		error: function(xhr, status, error) {
			// 요청이 실패했을 때의 처리
			alert('Error: ' + error);
		}
	});
		
}

function reOrderStatus(orderType, seq) {

	// 전송할 데이터 객체 생성
	var dataToSend = {
		seq: seq,
		orderChange: 'Y',
		orderType: orderType
	};
	
	// 버튼 클릭 시 AJAX 요청 전송	
	$.ajax({
		url: useApi,
		type: 'POST',		
		data: dataToSend,
		success: function(response) {
			// 요청이 성공했을 때의 처리
			alert('Success: ' + response.message);
			searchAct();
		},
		error: function(xhr, status, error) {
			// 요청이 실패했을 때의 처리
			alert('Error: ' + error);
		}
	});

}

function excelAct() {
    searchValue = $('.searchForm').serialize();
    searchValue = '&' + searchValue;
    top.location.href = 'insadreamOfflineExcel.php?' + searchValue;
}
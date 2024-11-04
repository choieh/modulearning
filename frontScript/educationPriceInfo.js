//보드 정보 선언
var sortData = '';
var useApi = '../api/apiEducationPriceInfoV1.php';


var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = 0;
var seq = seq ? seq : '';
var page = page ? page : 1;

function listAct(page) {
    //상단 액션 부분
    var actionArea = '';
    $.get(categoryApi, {'value01': 'lectureCode'}, function (data) {
        var sort01 = '';
        var today = new Date();

        actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()"  >';
        actionArea += '<div class="searchChangeArea">'
        actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';

        actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';

        actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                actionArea += '<option value=' + i + '>' + i + '년</option>';
            } else {
                actionArea += '<option value=' + i + ' selected="selected">' + i + '년</option>';
            }
        }
        actionArea += '</select>';
        actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                actionArea += '<option value=' + h + '>' + h + '월</option>';
            } else {
                actionArea += '<option value=' + h + ' selected="selected">' + h + '월</option>';
            }

        }
        actionArea += '</select>';
        actionArea += '</div>';
        actionArea += '<div>';
//		actionArea += '<span>기준</span><select name="selectStandard">';
//		actionArea += '<option value="">전체</option>';
//		actionArea += '<option value="eduCostDepositDay">교육비 입금일</option>';
//		actionArea += '<option value="costApplicationDay">비용 신청일</option>';
//		actionArea += '<option value="costGiveDay">비용 지급일</option>';
//		actionArea += '</select>&nbsp;&nbsp;';
//		actionArea += '<input type="date" name="getStandard"/>&nbsp;';

        actionArea += '<div>';
        actionArea += '<div style="margin-left:10px; display:inline-block;">';
        actionArea += '<span style="display:inline-block;">부서</span>';
        actionArea += '<input type="text" name="department" placeholder=""/>';
        actionArea += '</div>';
        actionArea += '<span>훈련유형</span><select name="serviceType">';
        actionArea += '<option value="">전체';
        actionArea += '<option value="1">환급';
        actionArea += '<option value="3">비환급';
        actionArea += '</select>';
        actionArea += '<span>영업담당자</span><input type="text" name="marketer"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        actionArea += '<button style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>';
        actionArea += '<button type="button" onClick="excelAct()" >엑셀 다운로드</button>';
        actionArea += '</div>';
        actionArea += '</div>';
        actionArea += '</form></div>';
        actionArea += '<h2>파일 업로드(미구현)</h2>'
        actionArea += '<form class="fileUploadform" method="post" action="" enctype="multipart/form-data" style="margin-bottom:16px;">';
        actionArea += '<ul>';
        actionArea += '<li>';
        actionArea += '<h1>등록샘플</h1>';
        actionArea += '<button type="button" onclick="">양식 및 샘플 내려받기</button>&nbsp;';
        actionArea += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
        actionArea += '</li>';
        actionArea += '<li>';
        actionArea += '<h1>파일등록</h1>';
        actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
        actionArea += '</li>';
        actionArea += '</ul>';
        actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
        actionArea += '</form>';
        $('#contents > h1').after(actionArea);
        $('#contents').removeAttr('class');
        $('#contents').addClass('BBSWrite');

        //게시물 소팅부분
        var contents = '';
        contents += '<div class="scrollArea" style="min-width:1360px; height:900px; overflow:auto; white-space:nowrap">';
        contents += '<table style=""><thead><tr>';
        contents += '<th style="width:40px;">번호</th>';
        contents += '<th style="width:100px;">수납확인서(엑셀)</th>';
        contents += '<th style="width:100px;">수납확인서(PDF)</th>';
        contents += '<th style="width:200px;">학습기간</th>';
        contents += '<th style="width:200px;">회사명</th>';
        contents += '<th style="width:300px;">과정명</th>';
        contents += '<th style="width:100px;">수강인원</th>';
        contents += '<th style="width:100px;">수강비</th>';
        contents += '<th style="width:100px;">수강비 합계</th>';
        contents += '<th style="width:100px;">자부담비 합계</th>';
        contents += '<th style="width:100px;">수료자 합계</th>';
        contents += '<th style="width:100px;">수료자 인원</th>';
        contents += '<th style="width:100px;">미수료자 합계</th>';
        contents += '<th style="width:100px;">미수료자 인원</th>';
        contents += '<th style="width:100px;">훈련유형</th>';
        contents += '<th style="width:100px;">영업팀장</th>';
		contents += '<th style="width:100px;">영업자</th>';
        contents += '<th style="width:100px;">CP사</th>';
        contents += '<th style="width:100px;">수수료</th>';
        contents += '<th style="width:120px;">수료자 수수료</th>';
        contents += '<th style="width:120px;">미수료자 수수료</th>';
        contents += '<th style="width:100px;">메모</th>';

        //if(loginUserLevel < 5){
        //  contents += '<th style="width:50px;">삭제</th>';
        //}
        contents += '</tr></thead><tbody>';
        contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>';
        contents += '</tbody></table>';

        $('#contentsArea').removeAttr('class');
        $('#contentsArea').addClass('BBSList');
        $('#contentsArea').html(contents);
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth() + 1; //January is 0!
        if (thisMonth <= 9) {
            thisMonth = '0' + thisMonth;
        }
        var checkDate = thisYear + '-' + thisMonth;
        searchStudy('lectureDay', checkDate)
    })
}


function ajaxAct(sortDatas) {
    loadingAct();
    sortData = sortDatas ? sortDatas : '';
    var listAjax = $.get(useApi, 'page=' + page + sortData, function (data) {
        totalCount = data.totalCount;
        var lists = '';
        var i = 1;
        var allUser = 0;
        var allPrice = 0;
        var allSelfPrice = 0;
        if (totalCount != 0) {
            $.each(data.edu, function () {
                lists += '<tr id=' + i + ' ondblClick="copyTableRow(this)">';
                lists += '<td class="py-4">' + i + '</td>';
                if (this.serviceType == '1') {
                    lists += `<td><button type="button" onclick="paymentCertExcel('${this.companyCode}','${this.contentsCode}','${this.lectureStart}','${this.lectureEnd}')">
                        수납 확인서(엑셀)</button></td>` ;
                } else {
                    lists += '<td>-</td>';
                }
                if (this.serviceType == '1') {
                    lists += `<td><button type="button" onclick="receiveCert('${this.companyCode}','${this.contentsCode}','${this.lectureStart}','${this.lectureEnd}')">
                        수납 확인서(PDF)</button></td>` ;
                } else {
                    lists += '<td>-</td>';
                }
                lists += '<td class="py-4">' + this.lectureStart + '~' + this.lectureEnd + '<br>' + this.applySeq + '</td>';
                lists += '<td>' + this.companyName + '</td>';
                lists += '<td>' + this.contentsName + '</td>';
                lists += '<td>' + Number(this.totalUser).toLocaleString('ko-KR') + '</td>';
                if (this.serviceType == '1') {
                    allUser += Number(this.totalUser);
                    allPrice += Number(this.totalPrice);
                    allSelfPrice += Number(this.totalSelfPrice);
                    lists += '<td>' + Number(this.selfPrice).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>' + Number(this.totalPrice).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>' + Number(this.totalSelfPrice).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>' + Number(this.totalPassPrice).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>' + Number(this.passUser).toLocaleString('ko-KR') + '</td>';
                    if (this.lectureStart.substring(0, 4) >= '2022') {
                        lists += '<td>' + Number(this.totalNoPassPrice).toLocaleString('ko-KR') + '</td>';
                    } else {
                        lists += '<td>0</td>'
                    }
                    lists += '<td>' + Number(this.noPassUser).toLocaleString('ko-KR') + '</td>';
                } else {
                    allUser += Number(this.totalUser);
                    allPrice += Number(this.price);
                    lists += '<td>0</td>';
                    lists += '<td>' + Number(this.price).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>0</td>';
                    lists += '<td>0</td>';
                    lists += '<td>0</td>';
                    lists += '<td>0</td>';
                    lists += '<td>0</td>';
                }
                if (this.serviceType == '1') {
                    lists += '<td>환급</td>';
                } else {
                    lists += '<td>비환급</td>';
                }
				lists += '<td>' + this.marketHeader + '</td>';
                lists += '<td>' + this.marketer + '</td>';
                lists += '<td>' + this.cp + '</td>';
                lists += '<td>' + this.commission + '%</td>';
                if (this.serviceType == '1' && this.lectureStart.substring(0, 4) >= '2022') {
                    lists += '<td>' + Number(this.passUserCommission).toLocaleString('ko-KR') + '</td>';
                    lists += '<td>' + Number(this.noPassUserCommission).toLocaleString('ko-KR') + '</td>';
                } else {
                    lists += '<td>0</td>';
                    lists += '<td>0</td>';
                }
                if (this.memo != null) {
                    lists += `<td><button id="memoBtn_${i}" style="background-color:#f1c40f; color:white;" id="memoBtn" onClick="memoModal('${i}', '${this.companyCode}', '${this.contentsCode}', '${this.lectureStart}');">메모</button></td>`
                } else {
                    lists += `<td><button id="memoBtn_${i}" onClick="memoModal('${i}','${this.companyCode}', '${this.contentsCode}', '${this.lectureStart}');">메모</button></td>`
                }

                lists += '</tr>'
//				if(this.serviceType == '1'){
//					lists += '<tr id="'+i+'_box" style="display: none;">';
//					lists += '<td colspan="15" style="background-color:#F4F9F9;">';
//					lists += '<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:50px; width:70%; margin:auto; padding:10px 10px; text-align:left;">';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">교육비 입금일 : <input type="text" name="" style="width:150px;"></span>'
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용신청일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용입금일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">1차 계산서 발행일자 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">2차 계산서 발행일자: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수수료 지급일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">자부담액 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수료 환급액: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">산인공 확정 환급액: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용신청관리대상 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용신청준비: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용신청일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">비용지급일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수료증 발송일자 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수료율: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수강인원: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">환급인원: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">cp료: <input type="text" name="" style="width:150px;"></span>';
//					lists += '</div>';
//					lists += '<div style="margin-top: 40px">';
//					lists += '<span><button type="button" style="width:90%;">수정</button></span>';
//					lists += '</div>';
//					lists += '</td>';
//					lists += '</tr>';
//				} else {
//					lists += '<tr id="'+i+'_box" style="display: none;">';
//					lists += '<td colspan="15" style="background-color:#F4F9F9;">';
//					lists += '<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:50px; width:70%; margin:auto; padding:10px 10px; text-align:left;">';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">교육비 입금일 : <input type="text" name="" style="width:150px;"></span>'
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수수료지급일: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">계산서 발행일자: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">1인당 교육비 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">교육비: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수료증 발송일자: <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수강인원 : <input type="text" name="" style="width:150px;"></span>';
//					lists += '<span style="font-size: medium; color:black; border-left:solid 2px #92A9BD; padding-left:3px;">수료인원: <input type="text" name="" style="width:150px;"></span>';
//					lists += '</div>';
//					lists += '<div style="margin-top: 40px">';
//					lists += '<span><button type="button" style="width:90%;">수정</button></span>';
//					lists += '</div>';
//					lists += '</td>';
//					lists += '</tr>';
//				}
                i++;
            });
            lists += '<tr>';
            lists += '<td colspan=30><span style="font-size:medium; color:black;">총 수강인원 : ' + allUser.toLocaleString('ko-KR') + '명</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 수강비 : ' + allPrice.toLocaleString('ko-KR') + '원</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 자부담비 : ' + allSelfPrice.toLocaleString('ko-KR') + '원</span>'

            lists += `<span style="margin-left:10px"><button type="button" onclick="receiveCert()">수납 확인서 출력</button></span>`;

            lists += '</td>';
            lists += '</tr>';
            $('.BBSList tbody').html(lists);
            loadingAct();
        } else {
            alert('검색 결과가 없습니다.');
            loadingAct();
        }
    });
}

function excelAct() {
    let searchValue = $('.searchForm').serialize();
    serarchValue = '&' + searchValue;
    top.location.href = 'excelEduInfoPrice.php?' + searchValue;
}


function extend(tr) {
    let a = document.getElementById(tr.id + '_box');
    if (a.style.display == 'none') {
        a.style.display = 'table-row';
        tr.value = '숨김';
    } else {
        a.style.display = 'none';
        tr.value = '확장';
    }
}

function copyTableRow(tr) { // 테이블 한 줄의 정보를 복사, 더블 클릭시 복사
    var children = tr.childNodes;
//	var countChild = tr.childElementCount; //for문으로 바꿀 경우 사용
    var newStr = '';
    children.forEach(function (td, index) {
        if (index % 18 != 0) {
            newStr += td.innerText;
            newStr += '\u0009';
        }
    })
    navigator.clipboard.writeText(newStr);
    alert('복사됐습니다.');
}

function copyAllTableRow(btn) {// 전체 테이블 정보를 복사
    var thead = btn.parentNode.parentNode.parentNode;
    var tbody = thead.nextElementSibling;
    var tr = tbody.childNodes;
    var newStr = '';
    tr.forEach(function (thr, index) {
//		if(index % 2 == 0){
//			var thrChild = thr.childElementCount; //for문으로 바꿀 경우 사용
        thr.childNodes.forEach(function (td, index) {
            if (index % 18 != 0) {
                newStr += td.innerText;
                newStr += '\u0009';
            }
        })
        newStr += '\n';
//		}
    })
    navigator.clipboard.writeText(newStr);
    alert('복사됐습니다.');
}

function searchTypeSelect(types, searchDayType) {

    $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .searchArea div.searchChangeArea span').remove();
    var chageSearch = ''
    if (types == 'searchDate') {
        chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        var today = new Date();
        var i = '';
        var thisYear = today.getFullYear();
        for (i = 2015; i <= thisYear; i++) {
            if (i != thisYear) {
                chageSearch += '<option value=' + i + '>' + i + '년</option>';
            } else {
                chageSearch += '<option value=' + i + ' selected="selected">' + i + '년</option>';
            }

        }
        chageSearch += '</select>';
        chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\'' + searchDayType + '\')">';
        var h = '';
        var thisMonth = today.getMonth() + 1; //January is 0!
        for (h = 1; h <= 12; h++) {
            if (h != thisMonth) {
                chageSearch += '<option value=' + h + '>' + h + '월</option>';
            } else {
                chageSearch += '<option value=' + h + ' selected="selected">' + h + '월</option>';
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
        chageSearch += '<select name="searchYear2">';
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
        chageSearch += '<select name="searchMonth2">';
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


function searchStudy(types, vals) {
    if (types == 'lectureDay') {
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"], select[name="autoContentsCode"]').remove();
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
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct();">';
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
        $('select[name="companyCode"], strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var searchName = vals.value
        if (searchName != '' && searchName != ' ') {
            $.get(chainsearchApi, {'searchMode': types, 'searchName': searchName}, function (data) {
                var selectWrite = ''
                if (data.totalCount != 0) {
                    $('select[name="companyCode"]').remove();
                    selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct();">';
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
        $('strong.noticeSearch, select[name="companyCode"], select[name="contentsCode"], select[name="autoContentsCode"]').remove();
        var searchDate = vals.value
        $.get(chainsearchApi, {'searchMode': 'study', 'lectureDay': searchDate}, function (data) {
            var selectWrite = ''
            if (data.totalCount != 0) {
                selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct();">';
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

        $.get(chainsearchApi, {'searchMode': 'study', 'companyCode': companyCode, 'type': 'contents'}, function (data) {
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
        $.get(chainsearchApi, {'searchMode': 'study', 'companyCode': companyCode}, function (data) {
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
        $.get(chainsearchApi, {'searchMode': 'study', 'lectureDate': searchDate, 'type': 'contents'}, function (data) {
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

function memoModal(seq, companyCode, contentsCode, lectureStart) {
    let cpCode = companyCode;
    let ctCode = contentsCode;
    let lecStart = lectureStart
    let modalWrite = '';

    $.get(useApi, {flag: 'memo', cpCode: cpCode, ctCode: ctCode, lecStart: lecStart}, function (data) {
        modalWrite += '<div id="modal">';
        modalWrite += '<div>';
        modalWrite += '<h1><strong>메모</strong><button type="button" onClick="modalClose();"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
        if (data == 'no') {
            modalWrite += `<textarea id="textareaMemo" style="width:500px; height:200px; margin:10px auto; resize:none; padding-left:5px"></textarea>`;
        } else {
            modalWrite += `<textarea id="textareaMemo" style="width:500px; height:200px; margin:10px auto; resize:none; padding-left:5px">${data}</textarea>`;
        }
        modalWrite += `<div style="margin:10px auto; text-align:center;"><button style="width:100px; height:35px" onClick="saveMemo('${seq}','${cpCode}', '${ctCode}', '${lecStart}');">저장</button>`;
        modalWrite += `<button style="width:100px; height:35px; margin-left:10px" onClick="deleteMemo('${seq}','${cpCode}', '${ctCode}', '${lecStart}');">삭제</button></div>`;
        modalWrite += '</div>';
        $('#contents').after(modalWrite);
        modalAlign();
    });
}

function saveMemo(seq, companyCode, contentsCode, lectureStart) {
    let data = document.getElementById('textareaMemo').value;
    let memoBtn = document.getElementById('memoBtn_' + seq);

    if (data.length < 1) {
        alert('내용을 입력해주세요.');
        return false;
    }

    $.ajax({
        url: useApi,
        data: {memo: data, companyCode: companyCode, contentsCode: contentsCode, lectureStart: lectureStart},
        type: "POST"
    })
        .success(function (data) {
            memoBtn.style.backgroundColor = "#f1c40f";
            memoBtn.style.color = "white";
            alert('저장했습니다.');
            modalClose();
        })
        .fail(function (data) {
            alert('실패했습니다.');
        })
}


function deleteMemo(seq, companyCode, contentsCode, lectureStart) {
    let memoBtn = document.getElementById('memoBtn_' + seq);

    $.ajax({
        url: useApi,
        data: {companyCode: companyCode, contentsCode: contentsCode, lectureStart: lectureStart},
        type: "DELETE"
    })
        .success(function (data) {
            memoBtn.style.backgroundColor = "#efefef";
            memoBtn.style.color = "#565656";
            alert('삭제했습니다.');
            modalClose();
        })
        .fail(function (data) {
            alert('실패했습니다.');
        })
}

function receiveCert(companyCode = '', contentsCode = '', lectureStart = '', lectureEnd = '') {
    if (companyCode == '') {
        window.open('/admin/paymentCertification.php?' + sortData)
    } else {
        window.open(`/admin/paymentCertification.php?companyCode=${companyCode}&contentsCode=${contentsCode}&lectureStart=${lectureStart}&lectureEnd=${lectureEnd}`)
    }

}

function paymentCertExcel(companyCode, contentsCode, lectureStart, lectureEnd) {
    window.open(`/admin/paymentCertExcel.php?companyCode=${companyCode}&contentsCode=${contentsCode}&lectureStart=${lectureStart}&lectureEnd=${lectureEnd}`)
}

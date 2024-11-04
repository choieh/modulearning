//보드 정보 선언
var useApi = '../api/apiCustomPay.php';
var companyApi = '../api/apiCompany.php';
const receiptApi = '/api/apiTossReceipt.php';
var seq = seq ? seq : '';
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//사용옵션 가져오기
optWrite = new Array();
makeOption('userLevel', 'user', '')

//리스트 소팅
function listAct(page) {
    //상단 액션 부분
    var actionArea = '';
    var lectureStart = '';
    var startDate = '';
    var endDate = '';
    var today = new Date();
    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
    actionArea += '<span>결제요청일</span>';
    actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="' + startDate + '" readonly="readonly" /></div>&nbsp;~&nbsp;';
    actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="' + endDate + '" readonly="readonly" /></div>&nbsp;';
    actionArea += '<span style="margin-left:106px;">수강시작일</span>';
    actionArea += '<div class="datePicker"><input type="text" name="lectureStart" class="cal" value="' + lectureStart + '" readonly="readonly" /></div>';
    actionArea += '</div>';
    actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
    /*
        actionArea += '<span>신청구분</span>';
        actionArea += '<select name="serviceType">';
        actionArea += '<option value="">전체</option>';
        actionArea += '<option value="0">사업주(개별)</option>';
        actionArea += '<option value="1">사업주</option>';
        actionArea += '<option value="2">재직자</option>';
        actionArea += '<option value="3">일반(비환급)</option>';
        actionArea += '</select>&nbsp;';
    */
    actionArea += '<span style="width:120px;">사업주(아이디,이름)</span>';
    actionArea += '<input type="text" style="width:100px;" name="userName" onKeypress="javascript:if(event.keyCode==13) {searchAct()}">';
    /*
    actionArea += '<span>택배상태</span>';
    actionArea += '<select name="deliveryYN">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="N">발송전</option>';
    actionArea += '<option value="Y">발송완료</option>';
    actionArea += '</select>&nbsp;';

    actionArea += '<span>자부담결제</span>';
    actionArea += '<select name="customPayStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="N">결제대기</option>';
    actionArea += '<option value="Y">결제완료</option>';
    actionArea += '<option value="X">해당없음</option>';
    actionArea += '</select>&nbsp;';*/
    actionArea += '<span>결제여부</span>';
    actionArea += '<select name="orderStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">결제완료</option>';
    actionArea += '<option value="N">결제대기</option>';
    actionArea += '<option value="C">결제취소</option>';
    actionArea += '</select>&nbsp;';
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
    //actionArea += '<button type="button" onClick="excelAct()" style="margin:0 15px;">엑셀 다운로드</button>';

    actionArea += '<button type="button" class="fRight" onClick="writeAct()">사업주결제 등록</button>';

    actionArea += '</div><div>';
    actionArea += '<button type="button" style="width:100%;" onClick="searchAct()">검색하기</button></form>';
    actionArea += '</div>';

    actionArea += '</div>';
    $('#contents > h1').after(actionArea);
    pickerAct();//데이트피커 사용

    //게시물 소팅부분
    var contents = '';
    contents += '<table><thead><tr>';
    contents += '<th style="width:60px;">번호</th>';
    contents += '<th style="width:120px;">ID/이름</th>';
    // contents += '<th style="width:120px;">시장자부담여부</th>';
    contents += '<th >결제요청명</th>';
    contents += '<th style="width:100px;">결제금액</th>';
    contents += '<th style="width:200px;">결제요청일</th>';
    contents += '<th style="width:200px;">결제여부</th>';
    contents += '<th style="width:100px;">결제방법</th>';
    contents += '<th style="width:200px;">결제일</th>';
    contents += '<th style="width:100px;">매출전표</th>';
    contents += '<th style="width:100px;">수정</th>';
    contents += '<th style="width:100px;">삭제</th>';
    contents += '<th style="width:100px;">비고</th>';
    contents += '</tr></thead><tbody>';
    contents += '</tbody></table>';
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
    ajaxAct();
}

function ajaxAct(sortDatas) {
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if (sortDatas != '') {
        sortData = sortDatas
    }
    var listAjax = $.get(useApi, 'pageType=company&page=' + page + '&list=' + listCount + sortData, function (data) {
        totalCount = data.totalCount;
        //alert(totalCount)
        var lists = '';
        var i = totalCount;
        if (page != 1) {
            i = totalCount - ((page - 1) * listCount)
        }
        if (totalCount != 0) {
            $.each(data.list, function () {
                var paymentType = '-'
                if (this.paymentType == 'card') {
                    paymentType = '카드'
                } else if (this.paymentType == 'va') {
                    paymentType = '가상계좌'
                }

                lists += '<tr>';
                lists += '<td>' + i + '</td>';
                lists += '<td onClick="globalModalAct(\'companyView\',\'\',\'' + this.companyCode + '\')" style="cursor:pointer;">' + this.companyName + '<br />' + this.ceoName + '</td>';
                // lists += '<td>'+this.selfPricePay+'</td>';
                lists += '<td>' + this.orderName + '</td>';
                lists += '<td>' + toPriceNum(this.price) + '</td>';
                lists += '<td>' + this.inputDate + '</td>';
                if (this.orderStatus == 'Y') {
                    lists += '<td style="color:#0000ff; cursor:pointer;" onclick="showReceiptByTID(\'kiraedu\', \'' + this.tid + '\', \'' + this.authdata + '\')">결제완료</td>';
                } else if (this.orderStatus == 'C') {
                    lists += '<td style="color:#ff0000;">결제취소</td>';
                } else if (this.orderStatus == 'R') {
                    lists += '<td style="color:green;	">결제요청</td>';
                } else {
                    lists += '<td>결제대기</td>';
                }
                lists += `<td>${paymentType}</td>`;
                lists += `<td>${this.orderDate ?? '-'}</td>`;

                if (this.orderStatus == 'Y' && this.orderNum != '') {
                    lists += `<td><button style="background-color:#3498db; color:#f1f2f6; border:none; padding:3px 10px;
            border-radius:5px;" type="button" onclick="getReceipt(${this.seq})">출력</button></td>`;
                } else {
                    lists += `<td>-</td>`;
                }

                if (this.orderStatus == 'Y') {
                    lists += '<td><button type="button" onClick="alert(\'결제가 완료되어 수정 하실 수 없습니다.\')">수정</button></td>';
                    lists += '<td><button type="button" onClick="alert(\'결제가 완료되어 삭제 하실 수 없습니다.\')">삭제</button></td>';
                } else {
                    lists += '<td><button type="button" onClick="writeAct(' + this.seq + ')">수정</button></td>';
                    lists += '<td><button type="button" onClick="payDelete(\'' + this.seq + '\')">삭제</button></td>';
                }

                if (paymentType == '가상계좌' && this.tosspayStatus == 'DONE') {
                    lists += '<td><button type="button" onclick="issueBill()">계산서 발행</button></td>';
                } else {
                    lists += '<td>-</td>';
                }
                lists += '</tr>';
                i--;
            })
        } else {
            lists += '<tr><td class="notResult" colspan="10">검색 결과가 없습니다.</td></tr>'
        }
        $('.BBSList tbody').html(lists)
        pagerAct();
        loadingAct();
    })
}

function payDelete(seq) {
    if (confirm('정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
        $.ajax({
            url: useApi,
            type: 'DELETE',
            data: 'seq=' + seq,
            dataType: 'json',
            success: function (data) {
                alert(data.result);
                ajaxAct();
            },
            fail: function () {
                alert('오류가 발생하였습니다.');
            }
        })
    }
}

function payExcel() {

}


function writeAct(writeSeq) {
    seq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용

    //상단메뉴
    $('.searchArea').remove();

    //출력변수 지정
    var userID = '';
    var orderName = '';
    var orderSeq = '';
    var orderStatus = '';
    var orderStatusName = '';
    var inputDate = '';
    var selfPricePay = '';
    var price = '';
    var paymentType = '-';
    var bankName = '';
    var virtualAccount = '';
    var dueDate = '';

    if (seq != '') {
        var writeAjax = $.get(useApi, {'seq': seq}, function (data) {
            $.each(data.list, function () {
                userID = this.userID;
                orderName = this.orderName;
                orderSeq = this.orderSeq;
                orderStatus = this.orderStatus;
                orderStatusName = this.orderStatusName;
                inputDate = this.inputDate;
                selfPricePay = this.selfPricePay;
                price = this.price;
                companyID = this.companyName;
                bankName = this.bankName;
                virtualAccount = this.virtualAccount;
                dueDate = this.dueDate;

                if (this.paymentType == 'card') {
                    paymentType = '카드';
                }

                if (this.paymentType == 'va') {
                    paymentType = '가상계좌';
                }

            })
            writePrint()
        })
    } else {
        writePrint()
    }

    //게시판 생성
    function writePrint() {
        var writes = '';
        writes += '<form class="writeform">';

        //seq값 선언
        writes += '<input type="hidden" name="seq" value="' + seq + '" />';

        writes += '<input type="hidden" name="companyPay" value="Y" />';
        //입력영역 시작
        writes += '<ul>';

        //아이디 입력
        if (seq == '') {
            writes += '<li id="companyID" class="mustCheck">';
        } else {
            writes += '<li id="companyID">';
            writes += '<input type="hidden" name="userID" value="' + userID + '" >';
        }
        writes += '<h1>사업주</h1>';
        if (seq == '') {
            writes += '<input name="companyName" type="text" /> <button type="button" name="companyBtn" onClick="searchComCustom(\'companyID\',\'' + companyApi + '\')">검색</button>';
        } else {
            writes += '<strong>' + companyID + '</strong>&nbsp;&nbsp;&nbsp;&nbsp;';
            writes += '<input type="hidden" name="companyID" value="' + companyID + '">';
        }
        writes += '</li>';
        // writes += '<li class="mustCheck">';
        // writes += '<h1>신청코드</h1><input type="text" name="orderSeq" value="'+orderSeq+'" />';
        // writes += '</li>';
        writes += '<li class="mustCheck">';
        writes += '<h1>결제요청명</h1><input type="text" style="width:600px;" name="orderName" value="' + orderName + '" />';
        writes += '</li>';
        writes += '<li class="mustCheck">';
        writes += '<h1>결제금액</h1><input type="text" name="price" value="' + price + '" />';
        writes += '</li>';
        writes += '<li>';
        writes += `<h1>결제방법</h1><span>${paymentType}</span>`;
        writes += '</li>';
        writes += '<li>';

        writes += `<h1>결제상태</h1>`;
        writes += '<span>';
        writes += '<select name="orderStatus">';
        writes += '<option value="">선택</option>';
        writes += '<option value="N">결제대기</option>';
        writes += '<option value="R">결제요청</option>';
        writes += '<option value="C">결제취소</option>';
        writes += '<option value="Y">결제완료</option>';
        writes += '</select>';
        writes += '</span>';

        // writes += `<h1>결제상태</h1><span>${orderStatusName}</span>`;
		

        writes += '</li>';

        if (paymentType == '가상계좌' && seq != '') {
            writes += '<li>'
            writes += `<h1>계좌 정보</h1><span>은행: ${bankName} / 계좌: ${virtualAccount} / 입금기한: ${dueDate}</span>`
            writes += '</li>'
        }


        writes += '</ul>';
        writes += '</form>';
        writes += '<div class="btnArea">';
        writes += '<button type="button" onClick="checkPayForm(' + seq + ')">';
        if (seq != '') {
            writes += '수정하기'
        } else {
            writes += '등록하기'
        }
        writes += '</button>';
        writes += '<button type="button" onClick="listAct(' + page + ')">목록보기</button>';
        writes += '</div>';
        $('#contentsArea').removeAttr('class')
        $('#contentsArea').addClass('BBSWrite')
        $('#contentsArea').html(writes);

        setOrderStatus(orderStatus)
    }
}

function viewAct() {
    ajaxAct();
}

function searchComCustom(type, api) {

    var seleteList = '';
    var companyName = $('input[name="companyName"]').val();
    // console.log(companyName);
    $('select[name="userID"]').remove();
    if (companyName != "") {
        $.get(api + '?companyName=' + companyName, type, function (data) {
            if (data.totalCount != 0) {

                $.each(data.company, function () {
                    // console.log(this.companyName);
                    //seleteList += '<option value='+this.companyID+'>'+this.ceoName+'('+this.companyName+')</option>';
                    seleteList += '<option value=' + this.manager.ID + '>' + this.ceoName + '(' + this.companyName + ')</option>';
                })
                if ($(document).find('select[name="userID"]').index() == -1) {
                    $('#companyID button[name="companyBtn"]').after('&nbsp;<select name="userID"></select>');
                } else {
                    $('#companyID').append('&nbsp;<select name="userID"></select>');
                }
                $('select[name="userID"]').html(seleteList);

            } else {
                alert('검색결과가 없습니다.');
            }
        })
    } else {
        alert('검색값을 입력해주세요.');
    }


}

//입력폼 체크
function checkPayForm(seq) {
    $('strong.price').remove();
    var checkFalse = 0;
    if ($('input[name="companyName"]').val() == '') {
        $('button[name="companyBtn"]').after('&nbsp;<strong class="price">사업주를 선택해 주세요.</strong>')
        checkFalse++;
    }
    if ($('input[name="orderName"]').val() == '') {
        $('input[name="orderName"]').after('&nbsp;<strong class="price">결제요청명을 입력해 주세요.</strong>')
        checkFalse++;
    }
    if ($('input[name="price"]').val() == '') {
        $('input[name="price"]').after('&nbsp;<strong class="price">결제금액을 입력해 주세요.</strong>')
        checkFalse++;
    }
    if ($('select[name="orderStatus"]').val() == '') {
        $('select[name="orderStatus"]').after('&nbsp;<strong class="price">결제상태를 선택해주세요.</strong>')
        checkFalse++;
    }
    if (checkFalse == 0) {
        if (seq != '') {
            sendData(useApi, 'writeform');
        } else {
            sendData(useApi, 'writeform', 'new');
        }
    }
}

function setOrderStatus(status) {
    if (document.querySelector('select[name="orderStatus"]')) {
        document.querySelector('select[name="orderStatus"]').value = status;
    }
}

function issueBill() {
    alert('기능 미구현입니다.');
}

function getReceipt(seq) {
    loadingAct()
    fetch(receiptApi + `?seq=${seq}`)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'error') {
                Swal.fire({
                    icon: 'warning',
                    title: '오류가 발생했습니다.'
                })
            }

            if (data.result == 'success') {
                if (data.receiptUrl != null) {
                    window.open(data.receiptUrl);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: '매출전표를 확인할 수 없습니다.'
                    })
                }
            }

            loadingAct()
        })

}
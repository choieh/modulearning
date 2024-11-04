const useApi = '/api/apiEduCenterPayment.php';
const virtualApi = '/api/apiVirtualAccount.php';

function listAct() {
    var list = '';

    list += '<table style="width: 100%; border-collapse: collapse; border-bottom: 1px solid #565656">'
    list += '<thead>'
    list += '<tr style="font-size: 15px; border-bottom: 1px solid #565656; height: 60px">'
    list += '<th style="width: 10%;">신청일</th>'
    list += '<th style="width: 50%;">과정명</th>'
    list += '<th style="width: 5%;">결제금액</th>'
    list += '<th style="width: 10%;">결제방법</th>'
    list += '<th style="width: 5%;">결제상태</th>'
    list += '<th style="width: 10%;">가상계좌</th>'
    // list += '<th style="width: 10%;">결제취소</th>'
    list += '</tr>'
    list += '</thead>'
    list += '<tbody>'
    list += '</tbody>'
    list += '</table>'

    document.getElementById('contentsArea').insertAdjacentHTML('beforeend', list);
    ajaxAct();
}

function ajaxAct() {
    var lists = '';
    var listAjax = $.get(useApi, `userID=${loginUserID}&type=${type}`, function (data) {
        if (data.result == 'success') {
            if (data.data.totalCount == 0) {
                lists += '<tr style="font-size: 14px; text-align: center; height: 50px;"><td class="notResult" colspan="12">조회 결과가 없습니다.</td></tr>'
            }

            if (data.data.totalCount > 0) {
                $.each(data.data.list, function () {
                    var paymentType = '';
                    var tosspayStatus = '';
                    var lectureDay = '';

                    if (this.lectureStart) {
                        lectureDay = `<br>교육일: ${this.lectureStart}`;
                    }

                    if (this.paymentType == 'va') {
                        paymentType = '가상계좌';
                    } else if (this.paymentType == 'simplePay') {
                        paymentType = '간편결제';
                    } else if (this.paymentType == 'card') {
                        paymentType = '카드';
                    } else if (this.paymentType == 'bill') {
                       paymentType = '세금계산서';
                    } else {
                        paymentType = '오류';
                    }

                    if (this.orderStatus == 'Y') {
                        tosspayStatus = '<td style="color:#0000ff; cursor:pointer;">결제완료</td>';
                    } else if (this.orderStatus == 'C') {
                        tosspayStatus = '<td style="color:#ff0000;">결제취소</td>';
                    } else if (this.orderStatus == 'R') {
                        tosspayStatus = '<td style="color:green;">결제대기</td>';
                    } else {
                        tosspayStatus = '<td style="color: tomato;">미결제</td>';
                    }

                    lists += `<tr style="font-size: 14px; text-align: center; height: 50px; border-bottom: 1px solid gray">`;
                    lists += `<td>${this.inputDate}</td>`;
                    lists += `<td>${this.orderName} ${lectureDay}</td>`;
                    lists += `<td>${Number(this.price).toLocaleString('ko-KR')}</td>`;
                    lists += `<td>${paymentType}</td>`;
                    lists += `${tosspayStatus}`;
                    if (this.virtualAccount && this.tosspayStatus == 'WAITING_FOR_DEPOSIT') {
                        lists += `<td>
                        <button type="button" style="background-color: #ffcb05; padding: 8px;"
                        onclick="getVirtualAccount('${this.seq}', '${this.orderNum}', ${this.price})">가상계좌 보기</button>
                        </td>`;
                    } else {
                        lists += `<td>-</td>`;
                    }

                    // lists += `<td><button type="button">취소</button></td>`;
                    lists += '</tr>';
                })
            }
        }

        if (data.result == 'error') {
            lists += `<tr style="font-size: 14px; text-align: center; height: 50px;"><td class="notResult" colspan="12">오류가 발생했습니다.</td></tr>`
        }


        document.querySelector('#contentsArea tbody').insertAdjacentHTML('beforeend', lists);
    })
}

function getVirtualAccount(seq, orderNum, price) {
    fetch(virtualApi + `?seq=${seq}&orderNum=${orderNum}`)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                if (data.totalCount > 0) {
                    Swal.fire({
                        icon: 'info',
                        // title: '가상계좌 정보',
                        html: `<div style="font-size: 18px;">
                                <div style="font-size:20px;">가상계좌 정보</div><br>
                                <div>
                                <p style="font-size: 20px; font-weight: bold;">은행</p> 
                                <span>${data.account.bankName}</span>
                                </div>
                                <br>
                                
                                <div>
                                <p style="font-size: 20px; font-weight: bold;">계좌번호</p> 
                                <span>${data.account.virtualAccount}</span>
                                </div>
                                <br>
                                
                                <div>
                                <p style="font-size: 20px; font-weight: bold;">계좌 유효기간</p> 
                                <span>${data.account.dueDate}</span>
                                </div>
                                <br>
                                
                                <div>
                                <p style="font-size: 20px; font-weight: bold;">금액</p>
                                <span>${Number(price).toLocaleString()}원</span> 
                                </div>
                               </div>`
                    })
                }
            }
        })
}
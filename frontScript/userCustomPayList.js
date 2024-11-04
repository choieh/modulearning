//보드 정보 선언
seq = seq ? seq : '' ;
var useApi = '../api/apiUserCustomPay.php';
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var totalCount = ''; //전체 페이지 카운트

//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
function listAct(page){
    var contents = '';
    contents += '<ul class="orderList">';
    contents += '</ul>';
    $('#wrap').removeAttr('class');
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
    ajaxAct();
}


function ajaxAct(listPage,sortData){
    listPage = listPage ? listPage : page ;
    page = listPage;
    sortData = sortData ? sortData : '';
    var listAjax = $.get(useApi,'',function(data){
        totalCount = data.totalCount;
        $('#titleArea > h3 > strong').html(totalCount)
        var lists = '';
        var i = 1;
        if(page != 1){
            i = totalCount - ((page-1) * listCount);
        }else{
            i = totalCount;
        }
        if (totalCount != 0){
            $.each(data.list, function(){
                lists += '<li>';
                if(this.orderStatus == 'Y') {
                    lists += '<button type="button" onClick="alert(\'이미 완료된 결제 입니다.\')">';
                    lists += '<img src="../images/lecture/img_button_submit.png" alt="결제완료"><br />결제완료</button>';
                } else if (this.orderStatus == 'R') {
                    lists += '';
                } else {
                    // if(loginUserID == '0000001231'){
                        lists += '<button type="button" onClick="top.location.href=\'../payments/userPay.php?seq='+this.seq+'&subDomain='+subDomain+'\'">';
                        lists += '<img src="../images/lecture/img_button_submit.png" alt="결제하기"><br />결제하기</button>';
                    // } else {
                    //     lists += '<button type="button" onClick="top.location.href=\'../study/customPay.php?seq='+this.seq+'\'">';
                    //     lists += '<img src="../images/lecture/img_button_submit.png" alt="결제하기"><br />결제하기</button>';
                    // }
                }
                lists += '<h1>'+this.orderName+'</h1>'
                lists += '<h4>결제금액 : <span class="red">'+toPriceNum(this.price)+'원</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;결제요청일 : <span class="red">'+this.inputDate+'</span></h4>'
                lists += '<h4>결제상태 : <span class="red">'+this.orderStatusName+'</span>';
                if(this.orderStatus == 'Y') {
                    lists += `&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span class="blue" style="cursor:pointer;" onclick="printReceipt('${this.seq}')">결제영수증 보기</span></h4>`;
                } else {
                    lists += '</h4>';
                }
                if(this.orderDate == null) {
                    var orderDate = '미결제';
                } else {
                    var orderDate = this.orderDate;
                }
                lists += '<h4>결제승인일 : <span class="red">'+orderDate+'</span></h4>'
            })
        } else {
            lists += '<li class="noList">결제 요청이 없습니다.</li>';
        }
        $('.orderList').html(lists);
    })
}


function printReceipt(seq) {
    fetch('/api/apiTossReceipt.php?seq=' + seq)
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                window.open(data.receiptUrl);
            }

            if (data.result == 'error') {
                alert('오류가 발생했습니다.');
            }
        })
}

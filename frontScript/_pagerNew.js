//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

function pagerAct(){
    let pagerArea = '';
    let nextPage = Number(nowPage) + 1;
    let prevPage = Number(nowPage) - 1;
    console.log(`nowPage: ${nowPage}, nextPage: ${nextPage}, prevPage: ${prevPage}`);

    if (totalCount > 0) {
        if (nowPage == 1 ){
            if (nextCount > 0) {
                pagerArea += `<button type="button" title="다음" onClick="pageMove('${nextPage}')">
                        <img src="../images/admin/pager_next.png" /></button>`;
            }
        } else if (nextCount == 0) {
            pagerArea += `<button type="button" title="이전" onClick="pageMove('${prevPage}')">
                        <img src="../images/admin/pager_prev.png" /></button>`;
        } else {
            pagerArea += `<button type="button" title="이전" onClick="pageMove('${prevPage}')">
                        <img src="../images/admin/pager_prev.png" /></button>`;
            pagerArea += `<button type="button" title="다음" onClick="pageMove('${nextPage}')">
                        <img src="../images/admin/pager_next.png" /></button>`;
        }
    }

    if($('body').find('div.pager').length == 0){
        $('#contentsArea').append('<div class="pager"></div>')
        $('.pager').html(pagerArea)
    }else{
        $('.pager').html(pagerArea)
    }
    $(window).scrollTop(0);
    //$('.pager a').bind('click',function(){ page=i })
}

function pageMove(pageNum){
    page=pageNum
    ajaxAct();
}

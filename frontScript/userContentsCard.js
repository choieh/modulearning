//보드 정보 선언
seq = seq ? seq : '';
contentsCode = contentsCode ? contentsCode : '';

var useApi = '../api/apiStudyCardContents.php';
var chapterApi = '../api/apiChapter.php';
var orderApi = '../api/apiOrder.php';
var loginApi = '../api/apiLoginUser.php';
var checkDateApi = '../api/apiStudyCenter.php';
var categoryApi = '../api/apiCategory.php';
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var totalCount = ''; //전체 페이지 카운트
var writeType = '';
var studyRequestStart = '';
var studyRequestEnd = '';
var categoryName01 = new Array();
var categoryName02 = new Array();
var sortData = '';
//var sort02 = '';

let urlParams = new URLSearchParams(window.location.search);

if (seq != '') {
    viewAct(seq, contentsCode);
}

//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅

function listAct(page) {

    $('#titleArea h3').css('display', 'block');

    //상단 액션 부분
    var actionArea = '';
    if (subDomain != 'safety' && subDomain != 'ksa') {
        actionArea += '<div class="searchArea"><form class="searchForm">';
        actionArea += '<input type="hidden" name="searchType" value="contentsName" />';
        actionArea += '<input type="text" name="searchValue" />&nbsp;';
        actionArea += '<button type="button" onClick="searchActLecture()">검색하기</button></form>';
        actionArea += '</form>'
        actionArea += '&nbsp</div>';
    }
    actionArea += '</div>';
    $('#contentsArea').before(actionArea);


    var leftMenu = '';
    $.get(categoryApi, {
        'value01': 'lectureCode',
        'value03': '내일배움카드',
        'companyID': subDomain
    }, function (data) {

        $.each(data.category, function () {
            var conNum = Number(this.value01.slice(7))
            leftMenu += '<li' +
                ' onclick="top.location.href=\'/card/?pid=2&sort01=' + this.value01 + '\'">';
            leftMenu += this.value02 + '과정';
            leftMenu += '</li>';
            if (this.value01 == sort01) {
                $('#titleArea > h2 strong, #titleArea > h1').html(this.value02 + '과정');
            }
            categoryName01[conNum] = this.value02;

            return categoryName02;
        })
        $('.menuArea > ul').html(leftMenu);
        return categoryName01;
    })

    //게시물 소팅부분
    var contents = '';
    contents += '<ul class="lectureList">';
    contents += '</ul>';
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);
    ajaxAct();
    if (sortData != '') {
        $('#titleArea > h2 strong, #titleArea > h1').html('검색결과')
    }


}

function ajaxAct(listPage) {
    var mapping = '';

    // 2018-04-25 김은성 로딩 프로그래스 추가 - 시작
    loadingAct();

    if (typeof contentsMapping != 'undefined' && contentsMapping == 'N') {
        mapping = 'enabled=Y&enabled2=Y';
    } else {
        mapping = 'enabled=Y&enabled2=Y&companyID=' + subDomain;
    }
    var sort01s = '';
    var sort02s = '';

    sort01 = sort01 ? sort01 : '';
    if (sort01 != '') {
        if (sortData == '') {
            sort01s = '&sort01=' + sort01;
        }
    }
    sort02 = sort02 ? sort02 : '';
    if (sort02 != '') {
        if (sortData == '') {
            sort02s = '&sort02=' + sort02;
        }
    }
    listPage = listPage ? listPage : page;
    page = listPage;


    var listAjax = $.get(useApi, mapping + '&page=' + page + '&list=' + listCount + sortData + sort01s + sort02s, function (data) {
        imageURL = data.previewImageURL;
        totalCount = data.totalCount;
        var nowTime = data.nowTime;
        var nowYear = nowTime.substr(0, 4)
        var nowMonth = nowTime.substr(5, 2)
        var nowDay = nowTime.substr(8, 2)
        nowTime = new Date(nowMonth + '/' + nowDay + '/' + nowYear).getTime()
        var startTime = studyRequestStart;
        if (startTime == null || startTime == '') {
            startTime = '2800-01-01'
        }
        var startYear = startTime.substr(0, 4)
        var startMonth = startTime.substr(5, 2)
        var startDay = startTime.substr(8, 2)
        startTime = new Date(startMonth + '/' + startDay + '/' + startYear).getTime();

        var endTime = studyRequestEnd;
        if (endTime == null || endTime == '') {
            endTime = '1900-01-01'
        }
        var endYear = endTime.substr(0, 4)
        var endMonth = endTime.substr(5, 2)
        var endDay = endTime.substr(8, 2)
        endTime = new Date(endMonth + '/' + endDay + '/' + endYear).getTime();
        $('#titleArea > h3 > strong').html(totalCount)

        var lists = '';
        var i = 1;
        if (page != 1) {
            i = totalCount - ((page - 1) * listCount);
        } else {
            i = totalCount;
        }
        if (totalCount != 0) {
            $.each(data.contents, function () {

                lists += '<li>';

                //버튼영역
                lists += '<a href="#"><button type="button" onclick="viewAct(' + this.seq + ',\'' + this.contentsCode + '\')"><img src="../images/lecture/img_button_detail.png" alt="상세보기이미지"><br />상세보기</button></a>'
                lists += `<button type="button" onClick="orderWindow('${this.contentsCode}')">
                    <img src="../images/lecture/img_button_submit.png" alt="신청하기이미지"><br />
                    신청하기</button>`;

                //썸네일
                if (this.previewImage != null) {
                    lists += '<img src="' + imageURL + this.previewImage + '" onclick="viewAct(' + this.seq + ',\'' + this.contentsCode + '\')" alt="' + this.contentsName.replace(/"/g, '&quot;').replace(/'/g, '&quot;') + '" />';
                } else {
                    lists += '<img src="../images/lecture/img_noimage.png" onclick="viewAct(' + this.seq + ',\'' + this.contentsCode + '\')" alt="이미지준비중" />';
                }

                //과정명

                lists += '<h3>' + this.value03 + ' > ' + this.value02 + '</h3>';
                lists += '<h1 onclick="viewAct(' + this.seq + ',\'' + this.contentsCode + '\')">' + this.contentsName + '</h1>'
                lists += '<h2>총 <strong>' + this.chapter + '</strong>차시</h2>';
                if (this.mobile == 'Y') {
                    lists += '<h5>모바일 학습 가능</h5>'
                }
            })
        } else {
            lists += '<li class="noList">과정이 없습니다.</li>';
        }
        $('.lectureList').html(lists);
        pagerAct();

        // 2018-04-25 김은성 로딩 프로그래스 추가 - 종료
        loadingAct();
    })
}

function viewAct(viewSeq, contentsCode) {
    viewSeq = viewSeq ? viewSeq : '';
    seq = viewSeq;
    contentsCode = contentsCode;
    //상단 액션 부분
    $('.searchArea').remove();
    $('.dateArea').remove();
    //게시물 소팅부분
    var views = '';
    $.get(useApi, {'seq': seq, 'contentsCode': contentsCode}, function (data) {
        imageURL = data.previewImageURL;
        bookURL = data.bookImageURL;
        $.each(data.contents, function () {
            $('#titleArea > h2 strong, #titleArea > h1').html(this.sort01Name + '과정');
            sort01 = this.sort01;
            sort02 = this.sort02;
            $.get(categoryApi, {
                'value01': 'lectureCode',
                'value03': '내일배움카드'
            }, function (data) {
                var leftMenu = ''
                $.each(data.category, function () {
                    leftMenu += '<li' +
                        ' onclick="top.location.href=\'/card/?pid=2&sort01=' + this.value01 + '\'">';
                    leftMenu += this.value02 + '과정';
                    leftMenu += '</li>';
                })
                $('.menuArea > ul').html(leftMenu);
            })
            views += '<div class="summuryArea">';
            if (this.previewImage != '' && this.previewImage != null) {
                views += '<img src="' + imageURL + this.previewImage + '" alt="' + this.contentsName + '" style="margin-top:8px;" />';
            } else {
                views += '<img src="/images/lecture/img_noimage.png" alt="이미지 준비중입니다." style="margin-top:8px;" />'
            }
            if (subDomain == 'boram') {
                views += '<h5></h5>';
            } else {
                views += '<h5>' + this.value03 + ' <img' +
                    ' src="../images/global/icon_triangle.png" alt="화살표" /> ' + this.value02;
                if (this.serviceType != '1') {
                    views += '(비환급 과정)';
                }
                views += '</h5>';
            }
            views += '<h1>' + this.contentsName + '</h1>';
            views += '<h2>총 <strong>' + this.chapter + '</strong>차시';
            views += '<h3><strong>' + this.professor + '</strong> 강사</h3>';

            //SNS공유
            views += '<a href="javascript:sendSns(\'facebook\',\'' + document.location.href + '\',\'' + this.contentsName + '\');"><img src="../images/global/facebook.png" style="width:30px;"></a>';
            views += '&nbsp;<a href="javascript:sendSns(\'band\',\'' + document.location.href + '\',\'' + this.contentsName + '\');"><img src="../images/global/naverband.png" style="width:30px;"></a>';
            views += '&nbsp;<a href="javascript:sendSns(\'naver\',\'' + document.location.href + '\',\'' + this.contentsName + '\');"><img src="../images/global/naver.jpg" style="width:30px;"></a>';
            views += '&nbsp;<a href="javascript:sendSns(\'kakaotalk\',\'' + document.location.href + '\',\'' + this.contentsName + '\');"><img src="../images/global/kakao.png" style="width:30px;"></a><br/>';

            views += '<button type="button">미리보기</button>'
            views += '<button type="button" class="listButton" onclick="listAct()">목록으로</button>'
            views += '</div>';


            //수료기준
            views += '<h1>수료기준 및 수강정원</h1>'
            views += '<table><tr>';
            views += '<th>수강정원</th>';
            views += '<th>총 진도율</th>';
            views += '<th>중간평가</th>';
            views += '<th>최종평가</th>';
            views += '<th>과제</th>';
            views += '</tr><tr>';
            views += '<td rowspan="2"><strong>' + this.limited + '</strong>명</td>';
            views += '<td rowspan="2"><strong>' + this.passProgress + '</strong>% 이상</td>';
            views += '<td>총&nbsp;<strong>';
            if (this.totalPassMid != 0) {
                views += this.totalPassMid + '</strong>점 / <strong>' + this.midRate + '</strong>% 반영';
            }
            views += '</td>';
            views += '<td>총&nbsp;<strong>';
            if (this.totalPassTest != 0) {
                views += this.totalPassTest + '</strong>점 / <strong>' + this.testRate + '</strong>% 반영';
            }
            views += '</td>';
            views += '<td>';
            if (this.totalPassReport != 0) {
                views += '총&nbsp;<strong>' + this.totalPassReport + '</strong>점 / <strong>' + this.reportRate + '</strong>% 반영';
            } else {
                views += '없음';
            }
            views += '</td>';
            views += '</tr><tr>';
            if (this.totalPassReport != 0) {
                views += '<td colspan="3">반영된 평가, 과제 점수 합산 <strong>' + this.passScore + '</strong>점 이상</td>';

            } else {
                views += '<td colspan="3">반영된 평가 점수 합산 <strong>' + this.passScore + '</strong>점 이상</td>';
            }
            views += '</tr></table>';


            //교육비
            views += '<h1>교육비 안내</h1>'
            views += '<table><tr>';
            views += '<th rowspan="2">교육비</th>';
            views += '<th colspan="2" style="width:273px;">우선지원 기업</th>';
            views += '<th colspan="2" style="width:273px;">대규모(1000인 미만) 기업</th>';
            views += '<th colspan="2" style="width:273px;">대규모(1000인 이상) 기업</th>';
            views += '</tr>';
            views += '<tr>';
            views += '<th style="width:136px;">정부지원금</th>';
            views += '<th style="width:136px;">자부담금</th>';
            views += '<th style="width:136px;">정부지원금</th>';
            views += '<th style="width:136px;">자부담금</th>';
            views += '<th style="width:136px;">정부지원금</th>';
            views += '<th style="width:136px;">자부담금</th>';
            views += '</tr>';
            views += '<tr style="height:43px;">';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.selfPrice) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.rPrice01) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.selfPrice01) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.rPrice02) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.selfPrice02) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.rPrice03) + '</strong>원</td>';
            views += '<td style="width:136px;"><strong>' + toPriceNum(this.selfPrice03) + '</strong>원</td>';
            views += '</tr></table>';

            views += '<h1>수료기준</h1>'
            views += '<div class="infoArea">총 진도율 <strong>' + this.passProgress + '</strong>% 이상</div>';

            //교육교재안내
            if (this.bookIntro != '' && this.bookIntro != null) {
                views += '<h1>교재정보</h1>'
                views += '<div class="bookInfo">'
                if (this.bookImage != '' && this.bookImage != null) {
                    views += '<img src="' + bookURL + this.bookImage + '" alt="교재이미지">';
                } else {
                    views += '<img src="/images/lecture/img_nobooks.png" alt="이미지가 준비중입니다." />'
                }
                views += '<h1>' + this.bookIntro + '</h1>'
                views += '</div>';
            }
            //교육소개관련
            var introtxt = '';
            if (this.intro != '' && this.intro != null) {
                views += '<h1>과정소개</h1>';
                views += '<div class="infoArea">';

                introtxt = this.intro.replace(/\n/g, '<br />');


                views += introtxt.replace("다만 이 교육과정은 모바일 학습이 인증되지 않습니다. 컴퓨터로 수강 하시기 바랍니다.", "<font color='blue'><b>다만 이 교육과정은 모바일 학습이 인증되지 않습니다. 컴퓨터로 수강 하시기 바랍니다.</b></font>");

                views += '</div>';
            }

            if (this.target != '' && this.target != null) {
                views += '<h1>교육대상</h1>';
                views += '<div class="infoArea">';
                views += this.target.replace(/\n/g, '<br />');
                views += '</div>';
            }

            if (this.goal != '' && this.goal != null) {
                views += '<h1>교육목표</h1>';
                views += '<div class="infoArea">';
                views += this.goal.replace(/\n/g, '<br />');
                views += '</div>';
            }

            //목차관련
            views += '<h1>교육목차</h1>';
            views += '<ol></ol>';
            views += '<div class="btnArea">';
            views += '<button type="button" onclick="listAct(page)">목록으로</button>'
            views += '</div>';
        })
        $('#contentsArea').removeAttr('class');
        $('#contentsArea').addClass('lectureDetail');
        $('#contentsArea').html(views);
        $('#titleArea h3').css('display', 'none');

        if (urlParams.get('sort01') == 'lecture20') hidePriceTable(); //20230125 dhk - add


    }).done(function (data) {
        $.each(data.contents, function () {
            $.get(chapterApi, {'contentsCode': this.contentsCode}, function (data) {
                var chapterWrite = '';
                $.each(data.chapter, function () {
                    chapterWrite += '<li>' + this.chapterName + '</li>'
                })
                $('.lectureDetail ol').html(chapterWrite);
                var previewLink = data.chapter[0].player + '/player/popupPreview.php?contentsCode=' + data.contentsCode + '&sourceType=' + data.sourceType;
                $('.summuryArea > button:eq(0)').bind({
                    click: function () {
                        window.open(previewLink, "학습창", "location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "study")
                    }
                })
            })
        })
    })
}

function searchActLecture() {
    searchValue = $('.searchForm').serialize();
    searchValue = '&' + searchValue;
    page = 1;
    sortData = searchValue;
    ajaxAct();
    $('#titleArea > h2 strong, #titleArea > h1').html('검색결과')
}

function hidePriceTable() {

    let priceTable = $('#contentsArea > table:nth-child(5)');
    let contentsPriceOne = $('#contentsArea > table:nth-child(5) > tbody > tr:nth-child(1)');
    let contentsPriceTwo = $('#contentsArea > table:nth-child(5) > tbody > tr:nth-child(2)');
    let contentsPriceThr = $('#contentsArea > table:nth-child(5) > tbody > tr:nth-child(3)');


    priceTable.css('width', '382px');
    contentsPriceOne.children(`th:nth-child(3)`).css('display', 'none');
    contentsPriceOne.children(`th:nth-child(4)`).css('display', 'none');

    contentsPriceTwo.children(`th:nth-child(3)`).css('display', 'none');
    contentsPriceTwo.children(`th:nth-child(4)`).css('display', 'none');
    contentsPriceTwo.children(`th:nth-child(5)`).css('display', 'none');
    contentsPriceTwo.children(`th:nth-child(6)`).css('display', 'none');

    contentsPriceThr.children(`td:nth-child(4)`).css('display', 'none');
    contentsPriceThr.children(`td:nth-child(5)`).css('display', 'none');
    contentsPriceThr.children(`td:nth-child(6)`).css('display', 'none');
    contentsPriceThr.children(`td:nth-child(7)`).css('display', 'none');
}

function orderWindow(contentsCode) {
    window.open(`https://modulearning.kr/payments/coursePay.php?contentsCode=${contentsCode}`, '_blank', 'popup=true, width=650, height=650');
}
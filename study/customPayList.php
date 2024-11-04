<? include '../include/header.php' ?>
    <script type="text/javascript">
        var page = '<?=$_GET[page]; ?>'; //검색 페이지
        var seq = '<?=$_GET[seq]; ?>'; //검색 페이지
        $(document).ready(function(){
            GNBAct('userGNB');
        });
    </script>
    <script type="text/javascript" src="../frontScript/GNB.js"></script>
    <script type="text/javascript" src="../frontScript/_global.js"></script>
    <script type="text/javascript" src="../frontScript/_pager.js"></script>
    <script type="text/javascript" src="../frontScript/userCustomPayList.js?ver=<?=date(ymdhis)?>"></script>
        <!-- 전자결제 영수증 출력 스크립트 -->
    <script language="JavaScript" src="https://pgweb.uplus.co.kr/WEB_SERVER/js/receipt_link.js"></script>

<style>


    .BBSList ul.orderList, .BBSList ul.orderList li{ margin:0; padding:0; list-style:none; }
    .BBSList ul.orderList { margin-top:10px; }
    .BBSList ul.orderList li { overflow:hidden; min-height:116px; border:1px solid #ccc; padding-left:15px; }
    .BBSList ul.orderList li.noList { text-align:center; line-height:80px; font-size:15px; }
    .BBSList ul.orderList li + li { margin-top:8px; }
    .BBSList ul.orderList li > img { float:left; width:130px; height:88px; margin:10px 20px 10px 10px; cursor:pointer; }
    .BBSList ul.orderList li button { float:right; width:96px; height:116px; border-radius:0; border:none; border-left:1px solid #ccc; background:#efefef; font-weight:bold; color:#565656; text-align:center; }
    .BBSList ul.orderList li button img { margin-bottom:15px; }
    .BBSList ul.orderList li button:hover { background:#fff; }
    .BBSList ul.orderList li h1, .BBSList ul.orderList li h2, .BBSList ul.orderList li h3, .BBSList ul.orderList li h4, .BBSList ul.orderList li h5 { margin:0; padding:0; }
    .BBSList ul.orderList li h1 { overflow:hidden; margin:12px 0 8px; width:350px; font-size:16px; color:#252525; text-overflow:ellipsis; white-space:nowrap; cursor:pointer; background:none; }
    .BBSList ul.orderList li h2 { margin-top:11px; font-size:12px; color:#666; font-weight:normal; }
    .BBSList ul.orderList li h3 { margin-top:23px; font-size:12px; color:#999; }
    .BBSList ul.orderList li h2, .BBSList ul.orderList li h5 { display:inline-block; }
    .BBSList ul.orderList li h5 { padding:0 8px; margin-left:5px; background:#0780c2; border:1px solid #83c0eb; border-radius:4px; line-height:18px; color:#fff; }
    .BBSList ul.orderList li h4 { font-size:12px; color:#666; line-height:18px; }
    .BBSList ul.orderList li h4 + h4 {}

</style>
    </head>

    <body>

    <div id="wrap" class="<? echo $fileName[1] ?>">
	    <? include '../include/gnb.php' ?>
        <? include '../include/lnb_study.php' ?>
        <div id="contents">
            <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
                <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
                <h2><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" />내 강의실<img src="../images/global/icon_triangle.png" alt="▶" /><strong>추가 결제</strong></h2>
                <h1>추가 결제</h1>
            </div>
            <!-- 동작호출부 -->
            <div id="contentsArea">
            </div>
            <!-- //동작호출부 -->
        </div>
    </div>

<? include '../include/footer.php' ?>
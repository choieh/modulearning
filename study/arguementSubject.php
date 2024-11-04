<? include '../include/header.php' ?>
<script type="text/javascript">
    var page = '<?=$_GET[page]; ?>'; //검색 페이지
    var seq = '<?=$_GET[seq]; ?>'; //검색 페이지
    var boardCode = '<?=$_GET[boardCode]; ?>'; //검색 페이지
    var servTime = '<?=$inputDate ?>';
    var listCount = 10;
    var page = 1;
    page ? page : 1;
    $(document).ready(function () {
        GNBAct('userGNB');
    });
</script>
<script type="text/javascript" src="../lib/SmartEditor/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="../frontScript/GNB.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/_global.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/_calendar.js"></script>
<script type="text/javascript" src="../frontScript/_pager.js"></script>
<script type="text/javascript" src="../frontScript/_category.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/arguementPager.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/_sendData.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/board.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/arguementList.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/arguementWrite.js?ver=<?= date(ymdhi) ?>"></script>
<script type="text/javascript" src="../frontScript/arguementBoardView.js?ver=<?= date(ymdhi) ?>"></script>
</head>

<body>

<div id="wrap" class="study">
    <? include '../include/gnb.php' ?>
    <? include '../include/lnb_study.php' ?>
    <div id="contents">
        <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
            <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
            <h2><?= $siteName ?><img src="../images/global/icon_triangle.png" alt="▶"/>토론게시판<img
                        src="../images/global/icon_triangle.png" alt="▶"/><strong></strong></h2>
            <h1></h1>
        </div>
        <!-- 동작호출부 -->
        <div id="contentsArea">
        </div>
        <!-- //동작호출부 -->
    </div>
</div>

<? include '../include/footer.php' ?>

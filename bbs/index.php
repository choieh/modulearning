<? include '../include/header.php' ?>
<script type="text/javascript">
var page = '<?=$_GET[page]; ?>'; //검색 페이지
var seq = '<?=$_GET[seq]; ?>'; //검색 페이지
var boardCode = '<?=$_GET[boardCode]; ?>'; //검색 페이지
var servTime = '<?=$inputDate ?>';
$(document).ready(function(){
	GNBAct('userGNB');  
});
</script>
<script type="text/javascript" src="../lib/SmartEditor/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="../frontScript/GNB.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_global.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_category.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_pager.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_sendData.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/board.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/boardList.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/boardWrite.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/boardView.js?ver=20180209"></script>
</head>

<body>

<div id="wrap" class="<? echo $fileName[1] ?>">
<? include '../include/gnb.php' ?>
  <? include '../include/lnb_bbs.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />고객지원<img src="../images/global/icon_triangle.png" alt="▶" /><strong></strong></h2>
      <h1></h1>
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea">
    </div>
    <!-- //동작호출부 -->
  </div>
</div>

<? 

include '../include/footer.php';

?>
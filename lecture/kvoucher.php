<? include '../include/header.php' ?>
<script type="text/javascript">
var page = '<?=$_GET[page]; ?>';
var seq = '<?=$_GET[seq]; ?>';
var sort01 = '<?=$_GET[sort01]; ?>';
var sort02 = '<?=$_GET[sort02]; ?>';
var contentsCode = '<?=$_GET[contentsCode]; ?>';
$(document).ready(function(){
	GNBAct('userGNB');  
});
</script>
<script type="text/javascript" src="../frontScript/GNB.js"></script>
<script type="text/javascript" src="../frontScript/_global.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_pager.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/_sendData.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/userContents_kvoucher.js?ver=<?=date(ymdhi)?>"></script>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_kvoucher.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />비대면서비스바우처<img src="../images/global/icon_triangle.png" alt="▶" /><strong>비대면서비스바우처과정</strong></h2>
      <h1>비대면서비스바우처</h1>
      <h3>상세보기를 누르시면 과정의 세부 정보를 확인할 수 있습니다. </h3>
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea">
    </div>
    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>
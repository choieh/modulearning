<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" /><?=$_siteName?> HRD<img src="../images/global/icon_triangle.png" alt="▶" /><strong>튜터모집</strong></h2>
      <h1>튜터모집</h1>
    </div>
    <div style="padding:20px;">
      <img src="../images/about/img_tutor.png" alt="이상에튜 튜터 모집">
    </div>
    <!-- 동작호출부 -->
    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>
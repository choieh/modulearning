<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2>회사소개<img src="../images/global/icon_triangle.png" alt="▶" /><strong>조직도</strong></h2>
      <h1>조직도</h1>
    </div>
    <div class="designImage">
      <p>
			<!--<img src="../images/about/img_organization01.png" alt="조직도" /><br />
			<img src="../images/about/img_organization02.png" alt="조직도" " /><br />-->
			<img src="../images/about/img_organization03.png" alt="조직도" " /><br />
			</p>
    </div>
  </div>
</div>

<? include '../include/footer.php' ?>
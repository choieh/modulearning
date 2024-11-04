<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2>모두의러닝<img src="../images/global/icon_triangle.png" alt="▶" /><strong>교육체계수립</strong></h2>
      <h1>교육체계수립</h1>
    </div>
    <div style="text-align:center;">
      <p>
			<!--<img src="../images/about/img_organization01.png" alt="조직도" /><br />
			<img src="../images/about/img_organization02.png" alt="조직도" " /><br />-->
			<!-- <img src="../images/about/img_organization03.png" alt="조직도" " /><br /> -->
			<img src="../images/about/about02.png" alt="교육체계수립" style="width:100%" /><br />
			<img src="../images/about/about02_btn.png" alt="교육신청하기" onclick="javascript:location.href='https://<?=$_siteURL?>/landing/'" style="cursor:pointer" /><br />
			</p>
    </div>
  </div>
</div>

<? include '../include/footer.php' ?>
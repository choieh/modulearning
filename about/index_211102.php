<? include '../include/header.php' ?>

</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2>모두의러닝<img src="../images/global/icon_triangle.png" alt="▶" /><strong>모두의러닝</strong></h2>
      <h1>모두의러닝</h1>
    </div>
    <!-- <div class="designImage"> -->
	<div>
      <p><br />
			<!----<img src="../images/about/img_about01.png" alt="소개이미지1" style="width:920px;" /><br />
			<img src="../images/about/img_about02.png" alt="소개이미지1" style="width:920px;" /><br />
			<img src="../images/about/img_about03.png" alt="소개이미지1" style="width:920px;" /><br />
			<img src="../images/about/img_about04.png" alt="소개이미지1" style="width:920px;" /><br />--->
			<!-- <img src="../images/about/img_about06.png" alt="소개이미지1" style="width:920px;" /><br /> -->
			<img src="../images/about/about01.png" alt="소개이미지1" style="width:100%;" /><br />
			</p><br />
    </div>
  </div>
</div>

<? include '../include/footer.php' ?>


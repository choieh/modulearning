<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />교육과정<img src="../images/global/icon_triangle.png" alt="▶" /><strong>직무교육 소개</strong></h2>
      <h1>직무교육 소개</h1>
    </div>
    <div style="padding:20px; text-align:center;">
      <!--  컨텐츠 이미지 영역 -->
		<img src="../images/lecture/intro_job_educationM.jpg" usemap="#imgmap2021216163431">

		<map id="imgmap2021216163431" name="imgmap2021216163431">
        <area shape="rect" alt="" title="" coords="292,1900,540,1968" href="http://modulearning.kr/bbs/mantomanNew.php" target="_blank" />
        <!-- Created by Online Image Map Editor (http://www.maschek.hu/imagemap/index) --></map>
      <!--  //컨텐츠 이미지 영역 -->
    </div>
    <!-- 동작호출부 -->
    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>
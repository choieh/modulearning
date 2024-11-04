<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2>회사소개<img src="../images/global/icon_triangle.png" alt="▶" /><strong>찾아오시는 길</strong></h2>
      <h1>찾아오시는 길</h1>
    </div>
    <div class="location">
      <h1>location <span class="titleBlue">Map</span></h1><br />
				<!-- * Daum 지도 - 지도퍼가기 -->
				<!-- 1. 지도 노드 -->
				<div id="daumRoughmapContainer1545885956382" class="root_daum_roughmap root_daum_roughmap_landing"></div>

				<!--
					2. 설치 스크립트
					* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
				-->
				<!-- <script charset="UTF-8" class="daum_roughmap_loader_script" src="http://dmaps.daum.net/map_js_init/roughmapLoader.js"></script> -->
				<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

				<!-- 3. 실행 스크립트 -->
				<script charset="UTF-8">
					new daum.roughmap.Lander({
						"timestamp" : "1545885956382",
						"key" : "riuk",
						"mapWidth" : "885",
						"mapHeight" : "480"
					}).render();
				</script>
			<h1>Location <span class="titleBlue">Information</span></h1>
      <div>
        <h1><strong class="titleBlue">Address</strong><br />주소</h1>
        <img src="../images/about/bg_location_line.png" alt="선" />
        <p><strong><?=$_address?></strong><br /><?=$_siteName?></p>
      </div>
      <div>
        <h1><strong class="titleBlue">Tel number</strong><br />전화번호</h1>
        <img src="../images/about/bg_location_line.png" alt="선" />
        <p><strong><?=$_csPhone?><!--<br />FAX : <?=$_csFax?></strong><br />--></strong></p>
      </div>
      <!--div>
        <h1><strong class="titleBlue">email</strong><br />e메일</h1>
        <img src="../images/about/bg_location_line.png" alt="선" />
        <p><strong><?=$_adminMail?></strong></p>
      </div>
    </div-->
	 <div>
        <h1><strong class="titleBlue">Public traffic</strong><br />대중교통</h1>
        <img src="../images/about/bg_location_line.png" alt="선" />
        <p><strong>지하철 7호선 가산디지털단지역 5번 출구 → <br> 약 100m 직진 후 횡단보도 건너편 건물(1층 기업은행) </strong></p>
      </div>
    <!-- 동작호출부 -->
    <!-- //동작호출부 -->
  </div>
</div>
</div>

<? include '../include/footer.php' ?>

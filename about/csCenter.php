<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" /><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" /><strong>운영시간 안내</strong></h2>
      <h1>운영시간 안내</h1>
    </div>
    <div class="csArea">
      <div class="cs01">
        <h1>한국안전교육기술원<br/><span>고객센터</span></h1>
        <div>
          <h1><?=$_csPhone?></h1>
          <!--<h2>FAX &nbsp;  &nbsp;<?=$_csFax?></h2>-->
        </div>
      </div>
      <!--
	  <h1>키라에듀는 문화체육관광부가 시행하는 회사내<img src="/images/about/img_cscenter01.png" alt="문화가 있는 날" style="margin:0 6px 0 19px;">을 매달 마지막 수요일에 실시하고 있습니다.</h1>
      <h2>이에 매달 마지막 수요일 키라에듀의 고객센터 운영시간은<br/>09:00 ~ 15:00 입니다.</h2>-->
      <ul class="cs02">
        <li>
          <h1>평 일</h1>
          <h2>09:00 ~ 18:00</h2>
          <h3>( 점심시간 12:00 ~ 13:00 )</h3>
        </li>
        <!--<li style="background-image:url(/images/about/img_cscenter03.png);">
          <h1>매월 마지막 수요일</h1>
          <h2>09:00 ~ 15:00</h2>
          <h3>( 점심시간 12:00 ~ 13:00 )</h3>
        </li>-->
      </ul>
    </div>
  </div>
</div>

<? include '../include/footer.php' ?>
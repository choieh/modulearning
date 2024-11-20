<? include '../include/header.php' ?>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/<? echo $fileName[1] ?>.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />마이페이지<img src="../images/global/icon_triangle.png" alt="▶" /><strong>탈퇴 안내</strong></h2>
      <h1>회원탈퇴</h1>
    </div>
	<div class="eduinfoArea" >
      <h1 style="margin:44px 0 -30px 44px"><span class="titleBlue">회원탈퇴</span> 안내</h1>
      <ol style="list-style:none;">
        <li>
          <ul>
            <li>본 사이트는 사업주 직업능력개발훈련 위탁교육을 진행하고 있습니다.</li>
            <li>이에 따라 소속된 사업장(직장)의 확인절차 후 탈퇴처리가 가능합니다.</li>
            <li>회원탈퇴를 원하시는 분은 고객센터(<?=$_csPhone?>)로 연락해주시기 바랍니다.</li>
          </ul>
        </li>
	   </ol>
	  </div>
    <!-- 동작호출부 -->
    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>
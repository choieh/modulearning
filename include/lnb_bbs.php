<div id="LNB">
  <div class="menuArea">
    <h1>학습지원센터<br /><span>Customer</span></h1>
    <ul>
      <li onclick="top.location.href='/bbs/?boardCode=1'">공지사항</li>
      <li onclick="top.location.href='/bbs/?boardCode=12'">시스템공지안내</li>
	  <li onclick="top.location.href='/bbs/?boardCode=162'">뉴스레터</li>
      <li onclick="top.location.href='/bbs/?boardCode=2'">자주묻는질문</li>
      <li onclick="top.location.href='/bbs/?boardCode=17'">학습자료실</li>
	  <li onclick="top.location.href='/bbs/?boardCode=25'">법정필수교육 자료실</li>
	  <li onclick="top.location.href='/bbs/?boardCode=47'">산업안전 자료실</li>
      <li onclick="top.location.href='/download'">뷰어 다운로드</li>
      <li onclick="top.location.href='/bbs/mantomanNew.php'">1:1 문의</li>
	  

	  <?php
	  
	  // 로그인 된 사용자만 사용 가능
	  if($_SESSION['loginUserLevel']){ ?>
		<!--<li onclick="alert('준비중 입니다.')">원격지원</li>-->
		<li onclick="window.open('https://939.co.kr/kiraedu')">PC 원격지원</li> 
	  <?php } ?>

		<!--
      <li onclick="top.location.href='/bbs/?boardCode=9'">이벤트게시판</li>
	  -->
      <li onclick="top.location.href='/bbs/?boardCode=3'">수강후기</li>
	  <?php if($_SESSION['loginUserLevel'] == 5 || $_SESSION['loginUserLevel'] == 6){ ?>
		<li onclick="top.location.href='/bbs/?boardCode=10'">영업자 공지사항</li>
		<li onclick="top.location.href='/bbs/?boardCode=14'">영업자 정보 및 자료게시판</li>
	  <?php } ?>
	  <li onclick="top.location.href='/eduinfo/'">위탁교육안내</li>
	  <li onclick="top.location.href='/eduinfo/logic.php'">교육진행절차</li>
	  <li onclick="top.location.href='/eduinfo/goyong.php'">환급절차</li>
	  <li onclick="top.location.href='/eduinfo/rule.php'">교육이용 안내</li>
    </ul>
  </div>
<? include '../include/csCenter.php' ?>
</div>
<script type="text/javascript">
//실시간상담 팝업창
function helpChat(){
  var popUrl = "/include/helpChat.php";
  var popOption = "width=380, height=550, resizable=no, scrollbars=no, status=no;";
    window.open(popUrl,"",popOption);
}
</script>
<div id="header">
  <div>
    &nbsp;
  	<? if($_SESSION['loginUserID'] == "" ){ ?>
	    <button type="button" onClick="helpChat();" style="cursor:pointer;">실시간상담</button>
      <button type="button" onclick="top.location.href='/member/mypage.php'">회원가입</button>
      <button type="button" onclick="top.location.href='/member/login.php?page=<? echo $fileName[1] ?>/<? echo $fileName[2] ?>?<? echo getenv("QUERY_STRING") ?>'">로그인</button>
    <? }else{ ?>
      <strong><?=$_SESSION['loginUserName'] ?></strong>&nbsp;<span>(<?=$_SESSION['loginUserID'] ?>)</span>&nbsp;&nbsp;&nbsp;
	    <button type="button" onClick="helpChat();" style="cursor:pointer;">실시간상담</button>
      <button type="button" onclick="top.location.href='/member/mypage.php'">개인정보변경</button>
    <?
				if($_SESSION['loginUserLevel'] < 9 ){
		?>
			<button type="button" onclick="window.open('http://modulearning.kr/admin')">관리자모드</button>
		<?
				}
		?>
      <button type="button" onClick="logOut();">로그아웃</button>
		<?
			}
		?>
  </div>
</div>
<div id="GNB">
  <div>
    <a href="/main/"><img src="../images/global/logo_gnb.png" alt="이상에듀" /></a>
    <ul>
      <li>
        <h1 onclick="top.location.href='/about/'"><?=$_siteName?> HRD</h1>
        <ol>
          <li onclick="top.location.href='/about/'"><?=$_siteName?> 소개</li>
          <li onclick="top.location.href='/about/organization.php'">조직도</li>
		  <li onclick="top.location.href='/about/csCenter.php'">운영시간안내</li>
		  <li onclick="top.location.href='/about/certification.php'">인증현황</li>
          <li onclick="top.location.href='/about/location.php'">찾아오시는 길</li>
        </ol>
      </li>
      <li>
        <h1 onclick="top.location.href='/eduinfo/'">교육안내</h1>
        <ol>
          <li onclick="top.location.href='/eduinfo/'">위탁교육안내</li>
          <li onclick="top.location.href='/eduinfo/logic.php'">교육진행절차</li>
          <li onclick="top.location.href='/eduinfo/goyong.php'">환급절차</li>
          <li onclick="top.location.href='/eduinfo/rule.php'">교육이용 안내</li>
        </ol>
      </li>
      <li class="lectureMenu">
        <h1>교육과정소개</h1>
        <ol>
          <!--
          <li onclick="top.location.href='/lecture/'">경영∙리더십과정</li>
          <li onclick="top.location.href='/lecture/'">업무스킬과정</li>
          <li onclick="top.location.href='/lecture/'">산업직무과정</li>
          <li onclick="top.location.href='/lecture/'">IT과정</li>
          <li onclick="top.location.href='/lecture/'">자격증과정</li>
          <li onclick="top.location.href='/lecture/'">외국어과정</li>
          -->
        </ol>
      </li>
      <li>
        <h1 onclick="top.location.href='/bbs/?boardCode=1'">고객지원</h1>
        <ol>
          <li onclick="top.location.href='/bbs/?boardCode=1'">공지사항</li>
          <li onclick="top.location.href='/bbs/?boardCode=12'">시스템공지안내</li>
          <li onclick="top.location.href='/bbs/?boardCode=2'">자주묻는질문</li>

      <li onclick="top.location.href='/bbs/?boardCode=17'">학습자료실</li>
      <li onclick="top.location.href='/download'">뷰어 다운로드</li>


          <li onclick="top.location.href='/bbs/mantoman.php'">1:1문의</li>
          <!--<li onclick="top.location.href='/bbs/?boardCode=9'">이벤트게시판</li>-->
          <li onclick="top.location.href='/bbs/?boardCode=3'">수강후기</li>
			<li onclick="window.open('https://939.co.kr/nayanet/')">PC 원격지원</li>
		  <?php if($_SESSION['loginUserLevel'] == 5 || $_SESSION['loginUserLevel'] == 6){ ?>
			<li onclick="top.location.href='/bbs/?boardCode=10'">영업자 공지사항</li>
			<li onclick="top.location.href='/bbs/?boardCode=14'">영업자 정보 및<br/>자료게시판</li>
		  <?php } ?>
        </ol>
      </li>
      <li>
        <h1>지사안내</h1>
        <ol>
          <li onclick="window.open('http://sjb.modulearning.kr')">서울중부지사</li>
          <li onclick="window.open('http://snb.modulearning.kr')">서울남부지사</li>
          <li onclick="window.open('http://ydp.modulearning.kr')">영등포지사</li>
        </ol>
      </li>
      <li class="studyMenu">
        <h1 onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study'" <? }else{ ?> "top.location.href='/study/'" <? } ?>>내 강의실</h1>
        <ol>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study'" <? }else{ ?> "top.location.href='/study/'" <? } ?>>진행중인과정</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/history.php'" <? }else{ ?> "top.location.href='/study/history.php'" <? } ?>>학습종료과정</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/studyOrder.php'" <? }else{ ?> "top.location.href='/study/studyOrder.php'" <? } ?>>수강신청내역</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/mantoman.php'" <? }else{ ?> "top.location.href='/study/mantoman.php'" <? } ?>>상담신청내역</li>
        </ol>
      </li>
    </ul>
  </div>
</div>
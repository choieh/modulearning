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
      <button type="button" onclick="alert('회원가입은 전화로 문의 바랍니다.')">회원가입</button>
      <button type="button" onclick="top.location.href='/member/login.php?page=<? echo $fileName[1] ?>/<? echo $fileName[2] ?>?<? echo getenv("QUERY_STRING") ?>'">로그인</button>
    <? }else{ ?>
      <strong><?=$_SESSION['loginUserName'] ?></strong>&nbsp;<span>(<?=$_SESSION['loginUserID'] ?>)</span>&nbsp;&nbsp;&nbsp;
	    <button type="button" onClick="helpChat();" style="cursor:pointer;">실시간상담</button>
      <button type="button" onclick="top.location.href='/member/mypage.php'">개인정보변경</button>
    <?
				if($_SESSION['loginUserLevel'] < 9 ){
		?>
			<button type="button" onclick="window.open('https://modulearning.kr/admin')">관리자모드</button>
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
 
    <!-- <a href="/main/"><img src="../images/global/logoM.png" alt="로고" style="margin: 19px -19px -5px; height: 55px;"/></a> -->
    <a href="/"><img src="../images/global/logoM.png" alt="로고" style="margin: 19px -19px -5px; height: 55px;"/></a>
   
    <ul>
      <li style="text-align:center;">
        <h1 onclick="top.location.href='/about/'">교육원소개</h1>
        <ol>
          <li onclick="top.location.href='/about/'">모두의러닝<br/>(구, 한국안전교육기술원)<br/>소개</li>
          <li onclick="top.location.href='/about/organization.php'">조직도</li>
		  <li onclick="top.location.href='/about/csCenter.php'">운영시간안내</li>
		  <!--
		  <li onclick="top.location.href='/about/certification.php'">인증현황</li>
		  -->
          <li onclick="top.location.href='/about/location.php'">찾아오시는 길</li>
		  <li onclick="top.location.href='/bbs/mantomanNew.php'">교육상담 및 문의</li>
		  <!--
		  <li onclick="top.location.href='/about/tutor.php'">튜터모집</li>
		  -->
        </ol>
      </li>
<!--       <li>
        <h1 onclick="top.location.href='/eduinfo/'">교육안내</h1>
        <ol>
          <li onclick="top.location.href='/eduinfo/'">위탁교육안내</li>
          <li onclick="top.location.href='/eduinfo/logic.php'">교육진행절차</li>
          <li onclick="top.location.href='/eduinfo/goyong.php'">환급절차</li>
          <li onclick="top.location.href='/eduinfo/rule.php'">교육이용 안내</li>
        </ol>
      </li> -->
      <li class="lectureMenu" style="width:130px; text-align:center;">
        <h1>온라인교육</h1>
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
      <li style="width:115px; text-align:center;">
        <h1 onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1401'">플립러닝</h1>
        <ol>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1401'">IT/데이터</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1402'">디지털마케팅</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1403'">리더십</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1404'">비즈니스</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1405'">영업</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1406'">인사/노무</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1407'">재무/회계</li>
			<li onclick="top.location.href='/lecture/flipped_learning.php?sort02=lecture1408'">직급별</li>
        </ol>
      </li>
      <li style="width:115px">
        <h1 onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1301'">마이크로러닝</h1>
        <ol>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1301'">IT</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1302'">경영/직무</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1303'">라이프스타일</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1304'">리더십</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1305'">북리뷰</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1306'">비즈니스스킬</li>
          <li onclick="top.location.href='/lecture/micro_learning.php?sort02=lecture1307'">외국어</li>
        </ol>
      </li>
      <li style="width:170px">
        <h1 onclick="top.location.href='/kvoucher/intro_kvoucher.php'">비대면서비스바우처</h1>
        <ol>
          <li onclick="top.location.href='/kvoucher/intro_kvoucher.php'">비대면서비스바우처 소개</li>
          <li onclick="top.location.href='/kvoucher/intro_kvoucherPlatform.php'">비대면바우처플랫폼 소개</li>
          <li onclick="top.location.href='/lecture/kvoucher.php?sort02=lecture1501'">비대면서비스바우처과정</li>
		  <!-- <li onclick="top.location.href='/certify/ipin.php'">아이핀 발급방법</li> -->
        </ol>
      </li>
      <li>
        <h1 onclick="top.location.href='/bbs/?boardCode=1'">학습지원센터</h1>
        <ol>
          <li onclick="top.location.href='/bbs/?boardCode=1'">공지사항</li>
          <li onclick="top.location.href='/bbs/?boardCode=12'">시스템공지안내</li>
          <li onclick="top.location.href='/bbs/?boardCode=2'">자주묻는질문</li>
          <li onclick="top.location.href='/bbs/?boardCode=17'">학습자료실</li>
          <li onclick="top.location.href='/download'">뷰어 다운로드</li>
          <li onclick="top.location.href='/bbs/mantoman.php'">1:1 학습문의</li>
          <li onclick="top.location.href='/bbs/?boardCode=3'">수강후기</li>
		  <li onclick="window.open('https://939.co.kr/kiraedu')">PC 원격지원</li>
          <?php if($_SESSION['loginUserLevel'] == 5 || $_SESSION['loginUserLevel'] == 6){ ?>
          <li onclick="top.location.href='/bbs/?boardCode=10'">영업자 공지사항</li>
          <li onclick="top.location.href='/bbs/?boardCode=14'">영업자 정보 및<br/>자료게시판</li>
          <?php } ?>
          <li onclick="top.location.href='/eduinfo/'">위탁교육안내</li>
          <li onclick="top.location.href='/eduinfo/logic.php'">교육진행절차</li>
          <li onclick="top.location.href='/eduinfo/goyong.php'">환급절차</li>
          <li onclick="top.location.href='/eduinfo/rule.php'">교육이용 안내</li>
        </ol>
      </li>
      <li class="studyMenu" style="width:83px;">
        <h1 onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study'" <? }else{ ?> "top.location.href='/study/'" <? } ?>>내 강의실</h1>
        <ol>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study'" <? }else{ ?> "top.location.href='/study/'" <? } ?>>진행중인과정</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/history.php'" <? }else{ ?> "top.location.href='/study/history.php'" <? } ?>>학습종료과정</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/studyOrder.php'" <? }else{ ?> "top.location.href='/study/studyOrder.php'" <? } ?>>수강신청내역</li>
          <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study/mantoman.php'" <? }else{ ?> "top.location.href='/study/mantoman.php'" <? } ?>>상담신청내역</li>
		  <? if($_SESSION['loginUserID'] =="hahasonic" || $_SESSION['loginUserID'] =="esang1" || $_SESSION['loginUserID'] =="eungmin2"){?>
			<li onclick="top.location.href='/study/arguementSubject.php?boardCode=20'">토론게시판</li>
		  <?}?>
		  <li onclick=<? if($_SESSION['loginUserID'] == "" ){ ?> "top.location.href='/member/login.php?page=study'" <? }else{ ?> "top.location.href='/study/studyNote.php'" <? } ?>>나만의 학습노트</li>
            <li onclick="top.location.href='/study/customPayList.php'">개인/추가 결제</li>
		  <li onclick="top.location.href='/certify/index.php'">인증방법</li>
		  <li onclick="top.location.href='/certify/ipin_certify.php'">아이핀 인증방법</li>
		  <li onclick="top.location.href='/certify/ipin.php'">아이핀 발급방법</li>
        </ol>
      </li>
    </ul>
  </div>
</div>
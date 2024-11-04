<div id="LNB">
  <div class="menuArea">
    <h1>마이페이지<br /><span>My Page</span></h1>
    <ul>
	  <? if($_SESSION['loginUserID'] == "" ){ ?>
        <li onclick="top.location.href='/member/mypage.php'">회원가입</li>
      <? }else{ ?>
        <li onclick="top.location.href='/member/mypage.php'">개인정보변경</li>
        <li onclick="top.location.href='/member/withdrawal.php'">회원탈퇴</li>
      <? } ?>
    </ul>
  </div>
 <!--
  <div class="CSCenter">
    <h1>고객센터</h1>
    <h2></h2>
    <h3>팩 스 <strong></strong></h3>
    <ul>
      <li>
        <h1>운영시간</h1>
        <h2>
          평 &nbsp;일 09 : 00 ~ 18 : 00<br/>
          (점심시간 12 : 00 ~ 13 : 00)
        </h2>
      </li>
      <li>
        <h1><img src="/images/global/img_cscenter02.png" alt="문화가 있는날" style="margin-top:2px;"></h1>
        <h2>
          <strong>매월 마지막 수요일</strong><br/>
          09 : 00 ~ 14 : 00
        </h2>
      </li>
    </ul>
  </div>-->
    <? include '../include/csCenter.php' ?>
</div>
<div id="footer">
  <div>
    <img src="../images/global/logo_gnbM.jpg" style=" margin-top: -34px;height: 160px;" />
    <ul>
      <li onclick="top.location.href='/about/'">회사소개</li>
      <!--li>제휴문의</li-->
      <li onclick="top.location.href='/agreement/agree.php'">이용약관</li>
      <li onclick="top.location.href='/agreement/private.php'">개인정보 처리방침</li>
      <li onclick="top.location.href='/agreement/goyong.php'">사업주 지원교육 유의사항</li>
      <li onclick="top.location.href='/eduinfo/'">환급교육 안내</li>
    </ul>
    <address>
			<strong>주식회사 모두의러닝</strong>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>대표 : <?=$_ceo?></strong>&nbsp;&nbsp;|&nbsp;&nbsp;주소 : <?=$_address?><br />
			TEL : <?=$_csPhone?>&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호 : <?=$_companyCode?>&nbsp;&nbsp;|&nbsp;&nbsp;통신판매업번호 : 2020-서울금천-2107<br />
			COPYRIGHT 2018 <?=$_siteName?> ALLRIGHT &amp; RESERVED.
    </address>
  </div>
</div>

<style type="text/css">
	#floatdiv {position:fixed;right:50.5%; background-color: transparent; margin-right: -735px;padding:0;z-index:1000;}
	#floatdiv ul  { margin:0; padding:0; list-style: none; } 
	#floatdiv li  { margin-bottom:6px; text-align: center; } 
	#floatdiv a  { color: #5D5D5D; border: 0; text-decoration: none; display: block; } 
	#floatdiv .menu, #floatdiv .last    { margin-bottom: 0px; } 
	
	/*퀵*/
	#right_quick_con {position:fixed; bottom:0; right:50.5%; width:166px; z-index:999; border:1px solid #ccc; margin-right:-627px}
	#right_quick_con > .btn_con {height:44px; line-height:44px; background-color:#fff; text-align:center;}
	#right_quick_con > .btn_con > a {display:block;}
	#right_quick_con > .btn_con > img {vertical-align:middle;}
	#right_quick_con > .btn_con > span {font-size:17px; font-weight:800; color:#002060; vertical-align:middle;}

</style>
<!-- Enliple Tracker Start -->
<script type="text/javascript">
(function(a,g,e,n,t){a.enp=a.enp||function(){(a.enp.q=a.enp.q||[]).push(arguments)};n=g.createElement(e);n.async=!0;n.defer=!0;n.src="https://cdn.megadata.co.kr/dist/prod/enp_tracker_self_hosted.min.js";t=g.getElementsByTagName(e)[0];t.parentNode.insertBefore(n,t)})(window,document,"script");
enp('create', 'common', 'KIRAHRD20', { device: 'W' }); // W:웹, M: 모바일, B: 반응형
enp('send', 'common', 'KIRAHRD20');
</script>
<!-- Enliple Tracker End -->

<?
$includeArr = get_included_files();
if (in_array("/home/kiraedu/include/lnb_bbs.php",$includeArr) == false && 
	in_array("/home/kiraedu/include/lnb_study.php",$includeArr) == false) {
?>
<div class="floatdiv2">
	<div id="right_quick_con" class="w_con">
		<div class="btn_con">
			<!-- <a href="javascript:move_scroll('info05_con');"> -->
				<img src="/landing/img/quick_con_iconM.png" alt="상담신청" style="height: 20px;"/>
				<span>기업교육문의</span>
			<!-- </a> -->
		</div>

		<div class="btn01_con">
            <a href="https://www.modulearning.kr/main/page.jsp?pid=landing.landing">
            <!-- <a href="https://modulearning.kr/bbs/mantomanNew.php"> -->
				<img src="/images/global/landing.gif" alt="상담신청하기" />
			</a>
		</div>
	</div>
</div>
<? } ?>

<div id="floatdiv"> 
	<ul>
	<li><a href='https://hrd.go.kr/hrdp/mb/pmbao/PMBAO0100T.do?loginCallbackURI=%2Fhrdp%2Fps%2Fppsco%2FPPSCO0100L.do' target='_blank'>
	<img src="/images/quick_banner/hrd_net_new.jpg" border=0/></a> </li>
	<? if($_SESSION['loginUserID'] != '') { // 로그인시 노출하도록 요청 받아 수정 ?>
	<li onclick="top.location.href='/bbs/?boardCode=12&brdNo=33'"><img src="/images/study/img_progress.png" alt="진도율 반영이 안돼요"></li>
	<li onclick="top.location.href='/bbs/?boardCode=12&brdNo=35'"><img src="/images/study/img_video.png" alt="진도율 반영이 안돼요"></li>
	<li onclick="top.location.href='/bbs/?boardCode=12&brdNo=34'"><img src="/images/study/img_page.png" alt="진도율 반영이 안돼요"></li>
	<? } ?>
	<li onclick="top.location.href='/bbs/mantoman.php'"><img src="/images/quick_banner/Nmantoman.jpg" style="cursor:pointer;" alt="1:1문의"></li>
	<li onclick="window.open('https://939.co.kr/kiraedu')"><img src="/images/quick_banner/ezhelp.jpg" style="cursor:pointer;" alt="원격지원"></li>
	<li id='ezHelpChatdiv'></li>
	</ul> 
</div>

<? 

$brdNo = $_GET["brdNo"];
if($brdNo){
	echo "<script>$(window).load(function(){viewAct(".$brdNo.")});</script>";
}

?>


</body>
</html>
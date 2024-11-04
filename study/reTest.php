<!-- <script>document.domain="modulearning.kr";</script> -->
<? include '../include/header.php' ?>
<!-- 모바일 접근처리 -->
<script language="JavaScript" type="text/JavaScript">
	/*var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'MOT', 'SAMSUNG', 'SonyEricsson');
			for (var word in mobileKeyWords){
				if (navigator.userAgent.match(mobileKeyWords[word]) != null){
						parent.window.location.href='https://m.modulearning.kr';break;
				}
			}*/
</script>
<!--// 모바일 접근처리 -->

<script type="text/javascript">

if(loginUserID == ''){
	top.location.href = '/member/index.php?pid=1'
}
var loginUserBirth = "<?=$_SESSION['loginUserBirth']?>";
var page = '<?=$_GET[page]; ?>'; 
var seq = '<?=$_GET[seq]; ?>'; 
var lectureOpenSeq = '<?=$_GET[lectureOpenSeq]; ?>'; 
var contentsCode = '<?=$_GET[contentsCode]; ?>'; 
var captchaCnt = 8; //캡챠간격
var maxStudyCnt = 8; //최대진도
var captchaBanStart = '2018-12-14 13:00:00'; //캡챠미적용 시작시간
var captchaBanEnd = '2018-12-14 18:00:00'; //캡챠미적용 끝 시간
$(document).ready(function(){
	GNBAct('userGNB');  
});
</script>
<script type="text/javascript" src="../frontScript/_global.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/GNB.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/studyModal.js?ver=<?=date(ymdhi)?>"></script>
<script type="text/javascript" src="../frontScript/userReTest.js?ver=<?=date(ymdhi)?>"></script>



</head>

<body>

<div class="skip_nav">
	<a href="#gnb">메인메뉴로 이동</a>
	<a href="#container">본문으로 이동</a>
</div>

<div id="wrap" class="study">
<? include '../include/gnb.php' ?>
  <!--<div class="category_area">
		<ul class="category_list">
			<li id="intro01" class='on'><a href="temp_진행중인과정.html">진행중인 과정</a></li>
			<li id="intro02"><a href="temp_학습종료과정.html">학습종료과정</a></li>
			<li id="intro03"><a href="temp_수강신청내역.html">수강신청내역</a></li>
			<li id="intro04"><a href="temp_상담신청내역.html">상담신청내역</a></li>
			<li id="intro05"><a href="temp_토론게시판.html">토론게시판</a></li>
			<li id="intro06"><a href="temp_나만의학습노트.html">나만의 학습노트</a></li>
			<li id="intro07"><a href="temp_인증방법.html">인증방법</a></li>
			<li id="intro08"><a href="temp_아이핀인증방법.html">아이핀 인증방법</a></li>
			<li id="intro09"><a href="temp_아이핀발급방법.html">아이핀 발급방법</a></li>
		</ul>
	</div>

	<div class="path">
		<ol class="path_list">
			<li>나의 강의실</li>
			<li class="last">진행 중인 과정</li>
		</ol>
	</div>-->

				<!-- <h4 class="content_title">진행 중인 과정</h4> -->

  <? include '../include/lnb_study.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" />내 강의실<img src="../images/global/icon_triangle.png" alt="▶" /><strong>재응시 과정</strong></h2>
      <h1>재응시 과정</h1>
      <h3 class="study">현재 <strong><?=$_SESSION['loginUserName'] ?></strong>님은 <span>총 <strong class="blue">3</strong>개 과정의 학습이 진행 중입니다.</span></h3>
    </div>
    <div id="noticeArea">
      <img src="../images/study/icon_study.png" alt="강의 주의사항 아이콘">
      <div class="noticeArea02">
        <h1>재응시 주의사항</h1>
        <ul>
          <li>학습기간 내에 최종평가 응시 하신 분들 중 미수료 인원, 종료일 4일 후 4일간 <strong class="red01">1일 최대 1회</strong> 재응시 가능</li>          
		  <li>1일 최대 1회 09시~20시까지 재응시 가능합니다.</li>
        </ul>
        <!--<p>점수확인은 <strong>학습 종료일이 지난 후, 3~4일 이내</strong>에 확인할 수 있습니다. (주말 및 공휴일 제외)</p>-->
      </div>
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea">
    </div>
    <!-- //동작호출부 -->
  </div>
</div>


<? include '../include/footer.php' ?>

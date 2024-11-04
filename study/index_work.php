<? include '../include/header.php' ?>
<script type="text/javascript">
if(loginUserID == ''){
	top.location.href = '/main/'
}
var page = '<?=$_GET[page]; ?>'; //검색 페이지
var seq = '<?=$_GET[seq]; ?>'; //검색 페이지
$(document).ready(function(){
	GNBAct('userGNB');  
});
</script>
<script type="text/javascript" src="../frontScript/_global.js"></script>
<script type="text/javascript" src="../frontScript/GNB.js"></script>
<script type="text/javascript" src="../frontScript/studyModal_work.js"></script>
<script type="text/javascript" src="../frontScript/userStudy_work.js"></script>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2>이상에듀<img src="../images/global/icon_triangle.png" alt="▶" />내 강의실<img src="../images/global/icon_triangle.png" alt="▶" /><strong>진행중인 강의</strong></h2>
      <h1>진행중인 강의</h1>
      <h3 class="study">현재 <strong><?=$_SESSION['loginUserName'] ?></strong>님은 총 <strong class="blue">3</strong>개의 강의가 진행중입니다.</h3>
    </div>
    <div class="noticeArea">
      <img src="../images/study/img_notice.png" alt="주의" />
      <h1>강의 주의 사항</h1>
      <p>모든 수강과정의 평가응시와 과제제출은 진도율이 <strong>80% 이상</strong> 되어야 가능합니다.<br />교육생님의 부주의로 인한 <strong>평가 미응시</strong>와 <strong>과제 미제출</strong>에 관련해서는 <strong>재응시</strong>, <strong>다시제출</strong>이 불가능합니다.</p>
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea">
    </div>
    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>
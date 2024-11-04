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
<script type="text/javascript" src="../frontScript/userStudyHistory2.js"></script>
</head>

<body>
<? include '../include/gnb.php' ?>
<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>  
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$_siteName?><img src="../images/global/icon_triangle.png" alt="▶" />내 강의실<img src="../images/global/icon_triangle.png" alt="▶" /><strong>학습종료과정</strong></h2>
      <h1>학습종료과정</h1>
      <h3 class="study"><strong><?=$_SESSION['loginUserName'] ?></strong>님은 총 <strong class="blue">3</strong>개의 강의를 보셨습니다.</h3>
    </div>
    <div id="noticeArea">
      <img src="../images/study/icon_end.png" alt="강의 주의사항 아이콘">
      <div class="noticeArea02" style="margin-left:38px;">
        <h1>안내사항</h1>
        <ul>
          <li>점수확인은 학습종료일이 지난 후, <strong>3~4일</strong> 이내에 확인할 수 있습니다. (주말 및 공휴일 제외)</li>
          <li>수료증 발급은 학습종료일이 지난 후, <strong>4~5일</strong> 이후에 출력 가능합니다. (주말 및 공휴일 제외)</li>
          <li>수료결과보고서(교육증빙자료)는 학습종료일이 지난 후, <strong>2주~3주</strong> 이내에 교육담당자 메일로 발송됩니다.</li>
          <li>미수료로 인해 재수강 문의는 <strong>학습자 회사 내부 교육담당자</strong>에게 확인 부탁드립니다.</li>
        </ul>
        
      </div>
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea">
    </div>
    <!-- //동작호출부 -->
  </div>
</div>
<!--<iframe src='https://cont1.modulearning.kr/session/session.php?SESSID="--><?php //=$_COOKIE["PHPSESSID"];?><!--"' width=0 height=0></iframe>-->
<? include '../include/footer.php' ?>
<? include '../include/header.php';


$sort01 = "lecture07";


  $lecCode = $_GET["lecCode"];
  $lecName = $_GET["lecName"];
  $todayMonth = substr($inputDate,5,2);
  $todayDate = substr($inputDate,8,2);


 ?>


<script type="text/javascript">


var lecCode = '<?=$_GET[lecCode]; ?>';
var areaCode = '<?=$_GET[areaCode]; ?>';

var page = '<?=$_GET[page]; ?>';
var seq = '<?=$_GET[seq]; ?>';
var sort01 = '<?=$sort01; ?>';
var sort02 = '<?=$_GET[sort02]; ?>';
var contentsCode = '<?=$_GET[contentsCode]; ?>';
$(document).ready(function(){
	GNBAct('userGNB');
});
</script>
<script type="text/javascript" src="../frontScript/GNB.js"></script>
<script type="text/javascript" src="../frontScript/_global.js"></script>
<script type="text/javascript" src="../frontScript/_pager.js"></script>
<script type="text/javascript" src="../frontScript/_sendData.js"></script>
<script type="text/javascript" src="../frontScript/tab_all.js"></script>
<!-- <script type="text/javascript" src="../frontScript/userContents.js"></script> -->

<script>


	function listAct(){


	}


</script>
</head>

<body>

<? include '../include/gnb.php' ?>

<div id="wrap" class="<? echo $fileName[1] ?>">
  <? include '../include/lnb_'.$fileName[1].'.php' ?>
  <div id="contents">
    <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />교육과정<img src="../images/global/icon_triangle.png" alt="▶" /><strong>건설기계 조종사 안전교육</strong></h2>
      <h1>건설기계 조종사 안전교육(예약접수)과정</h1>
      <h3>과정신청은 신청기간에만 가능합니다. 상세보기를 누르시면 상세한 내용을 보실 수 있습니다.</h3>
    </div>

	<div style="padding:0 20px; margin-top:30px;">


		<!-- Tab links -->
		<div class="tab" id="mnuTab">
<!-- 			  <button class="tablinks" onclick="openCity(event, 'tab1')" id="defaultOpen">서울</button> -->

		</div>

		<!-- Tab content -->
		<div id="mnuTabCon">

		</div>





	</div>
    <!-- 동작호출부 -->
    <div id="contentsArea">

		<? include './incCalender.php' ?>
    </div>



    <!-- //동작호출부 -->
  </div>
</div>

<? include '../include/footer.php' ?>



<script type="text/javascript">
 //
</script>

<?
include '../include/header.php';
$pid = $_GET['pid'];
?>

<style>
    html{
        scrollbar-gutter: stable;
    }
	.float-banner .fb_inner {
		top: 400px;
	}
    .userIdModal{
        position: fixed;
        width:23%;
        height:24%;
        z-index: 6;
        background-color: #ffffff;
        text-align: center;
        box-shadow: 5px 5px 5px 5px #bebebebe;
        border: 2px solid #eeeeee;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        padding-top:20px;
        padding-bottom:2%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: none;
    }
    .userIdList{
        background-color: #f3f3f3;
        width:95%;
        height:65%;
        margin: auto;
        display: flex; /* Flexbox 사용 */
        justify-content: center; /* 가로 방향 가운데 정렬 */
        text-align: center;
        font-family: "NanumSquare";
        padding: 10px;
        overflow-y: auto;
    }
    #confirmBtn{
        margin-left:auto;
        margin-right: auto;
        width: 30%;
        height: 15%;
        display: block;
        position: absolute; 
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    #searchText{
        font-family: "NanumSquare";
        font-size: 20px;
        padding-bottom: 15px;
    }
    .no-scroll {
        height:100%; 
        min-height:100%; 
        overflow:hidden 
        !important; 
        touch-action:none;
    }
</style>

<script type="text/javascript">
  var mode = '<?=$_GET[mode]; ?>'
  var page = '<?=$_GET[page]; ?>'
  var pid = '<?=$_GET[pid]; ?>'
  mode = mode ? mode : '';

  $(document).ready(function() {
	  loginPage(mode,page);
	  loginScript();
  });
  //var loginUserID = "<?php //=$_SESSION['loginUserID'] ?>//";     	//로그인 유저 아이디
  var loginCompanyCode = "<?=$_SESSION['loginCompanyCode']?>";

  if (loginUserID != '' && pid == 1) {
      location.href='/main/';
  }
</script>
<script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../frontScript/login.js?ver=<?=date('Ymdhis')?>"></script>





    </head>
    <body>
<div class="skip_nav">
    <a href="#gnb">메인메뉴로 이동</a>
    <a href="#container">본문으로 이동</a>
</div>
<div id="wrap_main">
    <!-- 퀵메뉴 -->
    <? include '../include/quick_menu.php' ?>

    <? include '../include/gnb.php' ?>

    <div id="container">
        <div class="main_wrap">

			<div class="category_area">
                <ul class="category_list">
                    <li id="intro01" <? if ($_GET['pid'] == 1) { echo "class='on'"; } ?> ><a href="/member/index.php?pid=1">로그인</a></li>
                    <li id="intro02" <? if ($_GET['pid'] == 2) { echo "class='on'"; } ?>><a onclick="alert('회원가입은 전화로 문의 바랍니다.')" style="cursor:pointer">회원가입</a></li>
                    <li id="intro03" <? if ($_GET['pid'] == 3) { echo "class='on'"; } ?>><a href="/member/index.php?pid=3">아이디/비밀번호찾기</a></li>
                    <li id="intro04" <? if ($_GET['pid'] == 4) { echo "class='on'"; } ?>><a href="/member/index.php?pid=4">개인정보처리방침</a></li>
                    <li id="intro05" <? if ($_GET['pid'] == 5) { echo "class='on'"; } ?>><a href="/member/index.php?pid=5">이용약관</a></li>
					<li id="intro05" <? if ($_GET['pid'] == 6) { echo "class='on'"; } ?>><a href="/member/index.php?pid=6">환불규정</a></li>
                </ul>
            </div>

            <div class="content_area" style="width:1145px;">
                <? include "member0".$pid.".php"; ?>
            </div>
        </div>
    </div>
    <div class="userIdModal">
        <h1 id="searchText">아이디 조회 결과</h1>
        <div class="userIdList">
        </div>
        <button class="button gray" id="confirmBtn">확인</button>
    </div>
</div>




<? include '../include/footer.php' ?>

<?
include '../include/header.php';
$pid = $_GET['pid'];
?>
    <style>
        .float-banner .fb_inner {
            top: 400px;
        }
    </style>

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
                    <li id="intro01" <? if ($_GET['pid'] == 1) { echo "class='on'"; } ?> ><a href="/refund/index.php?pid=1">사업주지원 제도란?</a></li>
                    <li id="intro02" <? if ($_GET['pid'] == 2) { echo "class='on'"; } ?>><a href="/refund/index.php?pid=2">사업주지원 훈련절차</a></li>
                    <li id="intro03" <? if ($_GET['pid'] == 3) { echo "class='on'"; } ?>><a href="/refund/index.php?pid=3">환급절차 및 기간</a></li>
                    <li id="intro04" <? if ($_GET['pid'] == 4) { echo "class='on'"; } ?>><a href="/refund/index.php?pid=4">사업주 수강유의사항</a></li>
                    <li id="intro05" <? if ($_GET['pid'] == 5) { echo "class='on'"; } ?>><a href="/refund/index.php?pid=5">모사답안처리기준</a></li>				
					<li id="intro06" <? if ($_GET['pid'] == 6) { echo "class='on'"; } ?>><a href="/refund/index.php?pid=6">훈련과정 개발절차</a></li>
                </ul>
            </div>
			            
            <div class="content_area" style="width:1125px;">
                <? include "refund0".$pid.".html"; ?>
            </div>
        </div>
    </div>
</div>




<? include '../include/footer.php' ?>
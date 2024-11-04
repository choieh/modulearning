<?
include '../include/header.php';
$pid = $_GET['pid'];
if (!is_numeric($pid)) {
    exit;
}
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
                    <li id="intro01" <? if ($_GET['pid'] == 1) { echo "class='on'"; } ?> ><a href="/about/index.php?pid=1">모두의러닝</a></li>
                    <li id="intro02" <? if ($_GET['pid'] == 2) { echo "class='on'"; } ?>><a href="/about/index.php?pid=2">교육체계수립</a></li>
                    <li id="intro03" <? if ($_GET['pid'] == 3) { echo "class='on'"; } ?>><a href="/about/index.php?pid=3">교육운영서비스</a></li>
                    <li id="intro04" <? if ($_GET['pid'] == 4) { echo "class='on'"; } ?>><a href="/about/index.php?pid=4">교육시스템</a></li>
                    <li id="intro05" <? if ($_GET['pid'] == 5) { echo "class='on'"; } ?>><a href="/about/index.php?pid=5">찾아오시는길</a></li>				
                </ul>
            </div>
			            
            <div class="content_area">
                <? include "about0".$pid.".html"; ?>
            </div>
        </div>
    </div>
</div>




<? include '../include/footer.php' ?>
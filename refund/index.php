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
    <div id="__layout">
        <!-- 퀵메뉴 -->
        <? include '../include/quick_menu.php' ?>
        <? include '../include/gnb_v2.php' ?>

        <div class="container">
            <div class="refund__header">
                <? include '../include/containerDepth.php' ?>
            </div>
            <div class="content_area" style="width:1125px;">
                <? include "refund0".$pid.".html"; ?>
            </div>
        </div>
    </div>




    <? include '../include/footer.php' ?>
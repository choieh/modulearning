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
    <div id="layout">
        <!-- 퀵메뉴 -->
        <? include '../include/quick_menu.php' ?>
        <? include '../include/gnb_v2.php' ?>

        <div class="layout__container layout__container--owner-refund">
            <div class="owner-refund">
                <div class="refund__header">
                    <? include '../include/containerDepth.php' ?>
                </div>
                <div class="content_area">
                    <? include "refund0".$pid.".html"; ?>
                </div>
            </div>
        </div>
    </div>




    <? include '../include/footer.php' ?>
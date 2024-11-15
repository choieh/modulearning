<head>
    <? include '../include/header.php' ?>
</head>

<body>
    <? include '../include/gnb_v2.php' ?>

    <div class="container container-lecture">
        <div class="lecture__header">
            <? include './include/lectureContainerHeader.php' ?>
        </div>
        <div class="lecture__body">
            <div id=" contents">
                <div id="titleArea" style="background-image:url(../images/title_bg/study.png);">
                    <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
                    <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />교육과정<img
                            src="../images/global/icon_triangle.png" alt="▶" /><strong>경영,리더십과정</strong></h2>
                    <h1>경영,리더십과정</h1>
                    <h3>상세보기를 누르시면 과정의 세부 정보를 확인할 수 있습니다. </h3>
                </div>
                <!-- 동작호출부 -->
                <div id="contentsArea">
                </div>
                <!-- //동작호출부 -->
            </div>
        </div>
    </div>

    <? include '../include/footer.php' ?>

</body>

</html>
<head>
    <? include '../include/header.php' ?>
</head>

<body onselectstart="return false" ondragstart="return false">
    <? include '../include/gnb_v2.php' ?>

    <div class="container container-mypage">
        <div class="mypage__header">
            <? include '../include/containerDepth.php' ?>
        </div>
        <div class="mypage__body">
            <div class="mypage__lnb">
                <ul class="lnb">
                    <li class="lnb__item">
                        <a href="javascript:void(0);">마이프로필</a>
                    </li>
                    <li class="lnb__item">
                        <a href="javascript:void(0);">주문내역조회</a>
                    </li>
                    <li class="lnb__item is-active">
                        <a href="javascript:void(0);">취소/환불</a>
                    </li>
                </ul>
            </div>
            <div class="mypage__contents">
                <?php
                    // include './include/membership.php';
                    // include './include/CourseDetails.php';
                    include './include/refund.php';
                ?>
            </div>
        </div>
    </div>
    </div>

    <? include '../include/footer.php' ?>

    </html>
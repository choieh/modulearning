<head>
    <? include '../include/header.php' ?>
</head>

<body onselectstart="return false" ondragstart="return false">
    <div id="layout">
        <? include '../include/gnb_v2.php' ?>
        <div class="layout__container layout__container--mypage">
            <div class="mypage">
                <div class="layout__header">
                    <? include '../include/containerDepth.php' ?>
                </div>
                <div class="layout__body">
                    <div class="mypage__lnb">
                        <ul class="lnb">
                            <li class="lnb__item" data-page="profile">
                                <a href="javascript:void(0);">마이프로필</a>
                            </li>
                            <li class="lnb__item" data-page="order">
                                <a href="javascript:void(0);">주문내역조회</a>
                            </li>
                            <li class="lnb__item" data-page="refund">
                                <a href="javascript:void(0);">취소/환불</a>
                            </li>
                        </ul>
                    </div>
                    <div class="layout__contents" id="mypageContent">
                        <?php
                            $page = isset($_GET['page']) ? $_GET['page'] : 'profile';
                            switch($page) {
                                case 'profile':
                                    include './include/membership.php';
                                    break;
                                case 'order':
                                    include './include/CourseDetails.php';
                                    break;
                                case 'refund':
                                    include './include/refund.php';
                                    break;
                                default:
                                    include './include/membership.php';
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <? include '../include/footer.php' ?>
    </div>
</body>

</html>
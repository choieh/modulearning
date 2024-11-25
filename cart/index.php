<head>
    <? include '../include/header.php' ?>
</head>

<body onselectstart="return false" ondragstart="return false">
    <div id="__layout">
        <? include '../include/gnb_v2.php' ?>
        <div class="container container-cart">
            <div class="cart__header">
                <h2 class="cart__title">장바구니</h2>
            </div>
            <div class="cart__body">
                <div class="cart__contents">
                    <div class="table">
                        <ul class="table__header">
                            <li class="table__th table__checkbox">
                                <input type="checkbox" id="check-all">
                                <label for="check-all">전체선택하기</label>
                            </li>
                            <li class="table__th">
                                <span>강의</span>
                            </li>
                            <li class="table__th">
                                <span>수강기간</span>
                            </li>
                            <li class="table__th">
                                <span>금액</span>
                            </li>
                        </ul>
                        <ul class="table__body">
                            <li class="table__tr">
                                <div class="table__td table__checkbox">
                                    <input type="checkbox" id="check1">
                                    <label for="check1"></label>
                                </div>
                                <div class="table__td">
                                    <div class="img__wrap">
                                        <img src="/images/lecture/img_edu01_1.png"
                                            alt="[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육">
                                    </div>
                                </div>
                                <div class="table__td">
                                    <p>[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육</p>
                                </div>
                                <div class="table__td">
                                    <p>2024.10.15 ~ 2024.12.15</p>
                                </div>
                                <div class="table__td">
                                    <p>123,200원</p>
                                </div>
                                <div class="table__td">
                                    <button type="button" title="삭제"></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="table__payment">
                        <h3>총 결제금액</h3>
                        <dl>
                            <div class="payment__item">
                                <dt>금액</dt>
                                <dd>246,400원</dd>
                            </div>
                            <div class="payment__item">
                                <dt>할인금액</dt>
                                <dd>0원</dd>
                            </div>
                            <div class="payment__item">
                                <dt>총결제금액</dt>
                                <dd>246,400원</dd>
                            </div>
                        </dl>
                        <a href="javascript:void(0)" class="btn__payment">결제하기</a>
                    </div>
                </div>
            </div>
        </div>
        <? include '../include/footer.php' ?>
    </div>
</body>

</html>
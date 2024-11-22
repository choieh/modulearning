<head>
    <? include '../include/header.php' ?>
</head>

<body>
    <? include '../include/gnb_v2.php' ?>

    <div class="container container-lecture">
        <div class="lecture__header">
            <? include '../include/containerDepth.php' ?>
        </div>
        <div class="lecture__body">
            <div class="search__wrap">
                <div class="form__wrap">
                    <form id="search-form" name="search" role="search">
                        <legend class="blind">검색 영역</legend>
                        <div class="search__input-box">
                            <input id="search" name="search" type="search" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"
                                maxlength="255" autocomplete="off" class="search__input">
                        </div>
                        <button type="submit" class="btn-search">검색</button>
                    </form>
                </div>
            </div>
            <div class="sorting">
                <button type="button" class="recommend">추천순</button>
                <button type="button" class="new">최신순</button>
                <button type="button" class="title">제목순</button>
            </div>
            <div class="lecture__contents">
                <div class="card">
                    <div class="card__thumbnail">
                        <img src="/images/common/card_thumbnail.png" alt="[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육">
                    </div>
                    <div class="card__body">
                        <ul class="badge__wrap">
                            <li><span class="badge">사업주환급</span></li>
                        </ul>
                        <p class="card__title">[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육</p>
                        <dl class="card__detail">
                            <div class="card__item time">
                                <dt>학습기간:</dt>
                                <dd>20시간</dd>
                            </div>
                            <div class="card__item total">
                                <dt>총차시:</dt>
                                <dd>19차시</dd>
                            </div>
                            <div class="card__item cost">
                                <dt>총 교육비</dt>
                                <dd>64,564,135원</dd>
                            </div>
                            <div class="card__item cost-self">
                                <strong class="item__title">자부담금</strong>
                                <div>
                                    <dt>내일배움카드 일반</dt>
                                    <dd>104,700원</dd>
                                </div>
                                <div>
                                    <dt>국민취업지원 I</dt>
                                    <dd>0원</dd>
                                </div>
                                <div>
                                    <dt>국민취업지원 II</dt>
                                    <dd>52,230원</dd>
                                </div>
                                <div>
                                    <dt>근로장학급수급자</dt>
                                    <dd>104,700원</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <? include '../include/pagination.php' ?>
        </div>
    </div>

    <? include '../include/footer.php' ?>
</body>

</html>
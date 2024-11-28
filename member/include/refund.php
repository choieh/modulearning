<div class="purchase-history__filter">
    <div class="filter">
        <h3 class="filter__title">기간</h3>
        <div class="duration__calendar">
            <input type="text" class="date-range-picker" placeholder="기간 선택" onclick="dateRangePicker()">
        </div>
        <div class="duration__shortcut">
            <ul class="duration__shortcut--list">
                <li class="duration__shortcut--item">
                    <button type="button">오늘</button>
                </li>
                <li class="duration__shortcut--item">
                    <button type="button">1주</button>
                </li>
                <li class="duration__shortcut--item">
                    <button type="button">1개월</button>
                </li>
                <li class="duration__shortcut--item">
                    <button type="button">3개월</button>
                </li>
                <li class="duration__shortcut--item">
                    <button type="button">6개월</button>
                </li>
            </ul>
        </div>
    </div>
    <div class="btn__wrap">
        <button type="button" class="btn btn-search">검색</button>
        <button type="button" class="btn btn-reset">초기화</button>
    </div>
</div>
<div class="purchase-history">
    <ul class="purchase-history__list">
        <li class="purchase-history__item">
            <div class="purchase-history__contents">
                <div class="purchase-history__layout-left">
                    <div class="order-date">
                        <dl>
                            <div class="order-date__item">
                                <dt>주문번호</dt>
                                <dd>1644431414431</dd>
                            </div>
                            <div class="order-date__item">
                                <dt>주문일자</dt>
                                <dd>2024-10-26</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="order-detail">
                        <div class="thumbnail">
                            <img src="/images/lecture/img_edu01_1.png" alt="[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육">
                        </div>
                        <div class="title">
                            <p>[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육</p>
                        </div>
                    </div>
                </div>
                <div class="purchase-history__layout-right">
                    <a href="javascript:void(0);" class="link-help">문의하기 ➔</a>
                    <div class="refund-state">
                        <p>환불진행중</p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

<? include '../include/pagination.php' ?>
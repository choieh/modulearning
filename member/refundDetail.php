<head>
    <? include '../include/header.php' ?>
</head>

<body onselectstart="return false" ondragstart="return false">
    <div id="__layout">
        <? include '../include/gnb_v2.php' ?>
        <div class="container container-refund">
            <div class="refund__header">
                <? include '../include/containerDepth.php' ?>
            </div>
            <div class="refund__body">
                <div class="refund__contents">
                    <div class="refund">
                        <div class="refund__section">
                            <h4 class="refund__title">취소/환불안내</h4>
                            <p class="refund__description">수강기간 시작일로부터 7일 초과시 수강기간 또는 수강진도에 대비하여 아래 환불 규정에 따라 환불 신청이
                                가능합니다.</p>
                            <div class="refund__table">
                                <table class="refund__table-content">
                                    <thead class="refund__table-head">
                                        <tr>
                                            <th class="refund__table-header">환불요청일</th>
                                            <th class="refund__table-header">환불금액</th>
                                        </tr>
                                    </thead>
                                    <tbody class="refund__table-body">
                                        <tr class="refund__table-row">
                                            <td class="refund__table-data">수강기간 시작일로부터 7일 이내 3차시 이하 콘텐츠를 이용한 경우</td>
                                            <td class="refund__table-data">결제대금 전액</td>
                                        </tr>
                                        <tr class="refund__table-row">
                                            <td class="refund__table-data">수강기간 시작일로부터 7일 이내 4차시 이상 콘텐츠를 이용한 경우</td>
                                            <td class="refund__table-data">콘텐츠 수강 비율에 해당하는 수강료를 차감 후 환불 가능</td>
                                        </tr>
                                        <tr class="refund__table-row">
                                            <td class="refund__table-data">수강기간 또는 수강진도 1/3 경과 전</td>
                                            <td class="refund__table-data">결제대금의 2/3</td>
                                        </tr>
                                        <tr class="refund__table-row">
                                            <td class="refund__table-data">수강기간 또는 수강진도 2/3 경과 전</td>
                                            <td class="refund__table-data">결제대금의 1/3</td>
                                        </tr>
                                        <tr class="refund__table-row">
                                            <td class="refund__table-data">수강기간 또는 수강진도 2/3 경과 후</td>
                                            <td class="refund__table-data">없음</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <ul class="refund__notice-list">
                                <li class="refund__notice-item">
                                    ■ 콘텐츠의 전체 차시가 3차시 이하일 경우, 1차시의 진도율이 10% 이상이면 수강 완료로 간주하여 환불이 불가하오니 전체 차시를 확인 후 환불을
                                    신청해주세요.
                                </li>
                                <li class="refund__notice-item">
                                    ■ 수강기간이란 회사가 훈련생에게 유상으로 제공하는 이용기간을 의미합니다.
                                    <ul class="refund__notice-item-sub">
                                        <li>콘텐츠 차시가 10차시 미만일 경우 : 이용기간 30일</li>
                                        <li>콘텐츠 차시가 10차시 이상일 경우 : 이용기간 90일</li>
                                    </ul>
                                </li>
                                <li class="refund__notice-item">
                                    ■ 수강기간은 결제일자부터 시작합니다.
                                </li>
                                <li class="refund__notice-item">
                                    ■ 수강진도란 총 콘텐츠의 차시 중 이용한 콘텐츠 수의 비율을 의미합니다. 단 콘텐츠 차시별 일부 재생시 그 차시에 대하여 이용으로 간주합니다.
                                </li>
                                <li class="refund__notice-item">■ 환불 의사를 밝힌 다음날부터 계산하여 환불합니다.</li>
                                <li class="refund__notice-item">■ 패키지 상품은 강좌별 개별 환불이 불가합니다.</li>
                                <li class="refund__notice-item">■ 반환 사유 발생시 5~7일 이내 환불됩니다.(PG사와 카드사의 상황에 따라 환불이 지연될 수
                                    있습니다)</li>
                            </ul>
                        </div>

                        <div class="refund__section">
                            <h4 class="refund__title">취소/환불안내</h4>
                            <div class="refund__product">
                                <div class="refund__product-image">
                                    <img src="/images/lecture/img_edu01_1.png"
                                        alt="[모두의 TALK] 정성호의 리얼 법정교육토크쇼 직장내 성희롱 예방교육">
                                </div>
                                <div class="refund__product-info">
                                    <p class="refund__product-title"><span class="front">[모두의 TALK] 정성호의 리얼
                                            법정교육토크쇼</span>직장내 성희롱
                                        예방교육</p>
                                    <p class="refund__product-price">123,200원</p>
                                </div>
                            </div>
                            <div class="refund__reason">
                                <button class="refund__reason-button" aria-haspopup="listbox" aria-controls="li_sort"
                                    aria-expanded="false">
                                    취소/환불사유를 입력해주세요
                                </button>
                                <ul class="refund__reason-list" role="listbox" aria-labelledby="select_lb">
                                    <li class="refund__reason-item" id="cost__sort01" role="option" aria-selected="true"
                                        tabindex="0">단순변심</li>
                                    <li class="refund__reason-item" id="cost__sort02" role="option"
                                        aria-selected="false" tabindex="0">주문 실수</li>
                                    <li class="refund__reason-item" id="cost__sort03" role="option"
                                        aria-selected="false" tabindex="0">강의 내용 불일치</li>
                                    <li class="refund__reason-item" id="cost__sort04" role="option"
                                        aria-selected="false" tabindex="0">사유 직접 입력</li>
                                </ul>
                                <div class="refund__reason-textarea">
                                    <textarea name="refund-text" id="refund-text" placeholder="상세 사유 입력(선택)"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="refund__section">
                            <h4 class="refund__title">환불예정금액</h4>
                            <div class="refund__summary">
                                <dl class="refund__summary-list">
                                    <div class="refund__summary-item">
                                        <dt class="refund__summary-label">취소상품 총 금액합계</dt>
                                        <dd class="refund__summary-value">&#8361;<em>123,123,000</em></dd>
                                    </div>
                                    <div class="refund__summary-item">
                                        <dt class="refund__summary-label">차감금액</dt>
                                        <dd class="refund__summary-value">&#8361;<em>123,000,000</em></dd>
                                    </div>
                                    <div class="refund__summary-item">
                                        <dt class="refund__summary-label">총 환불액</dt>
                                        <dd class="refund__summary-value">&#8361;<em>123,000</em></dd>
                                    </div>
                                </dl>
                            </div>
                            <div class="refund__actions">
                                <button class="refund__action-button" type="button">신청하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <? include '../include/footer.php' ?>
    </div>
</body>

</html>
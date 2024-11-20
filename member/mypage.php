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
            <div class="link__wrap">
                <a href="javascript:void(0);" class="link__withdrawal">회원탈퇴</a>
            </div>
            <div class="mypage__lnb">
                <ul class="lnb">
                    <li class="lnb__item is-active">
                        <a href="javascript:void(0);">마이프로필</a>
                    </li>
                    <li class="lnb__item">
                        <a href="javascript:void(0);">주문내역조회</a>
                    </li>
                    <li class="lnb__item">
                        <a href="javascript:void(0);">취소/환불</a>
                    </li>
                </ul>
            </div>
            <div class="mypage__contents">
                <div class="form__wrap">
                    <form aria-labelledby="form-title">
                        <h2 id="form-title" class="blind">회원 정보 수정</h2>

                        <!-- 아이디 -->
                        <div class="form-group">
                            <label for="user-id">아이디</label>
                            <input type="text" id="user-id" name="user_id" value="00004569" readonly />
                        </div>

                        <!-- 이름 -->
                        <div class="form-group">
                            <label for="user-name">이름</label>
                            <input type="text" id="user-name" name="user_name" value="이지수" readonly />
                        </div>

                        <!-- 생년월일 -->
                        <div class="form-group">
                            <label for="birthdate">생년월일</label>
                            <input type="text" id="birthdate" name="birthdate" value="241002" readonly />
                        </div>

                        <!-- 휴대전화 -->
                        <div class="form-group">
                            <label for="phone">휴대전화</label>
                            <div class="phone-input">
                                <input type="text" id="phone-part1" name="phone_part1" value="010" readonly />
                                <span>-</span>
                                <input type="text" id="phone-part2" name="phone_part2" value="9456" readonly />
                                <span>-</span>
                                <input type="text" id="phone-part3" name="phone_part3" value="9456" readonly />
                            </div>
                        </div>

                        <!-- 이메일 -->
                        <div class="form-group">
                            <label for="email">이메일</label>
                            <input type="email" id="email" name="email" value="wsadafsg@gmail.com" readonly />
                        </div>

                        <!-- 비밀번호 변경 -->
                        <div class="form-group">
                            <label for="current-password">현재 비밀번호</label>
                            <input type="password" id="current-password" name="current_password" />
                        </div>
                        <div class="form-group">
                            <label for="new-password">새로운 비밀번호</label>
                            <input type="password" id="new-password" name="new_password" />
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">새로운 비밀번호 확인</label>
                            <input type="password" id="confirm-password" name="confirm_password" />
                        </div>

                        <!-- 정보 수신 -->
                        <div class="form-group">
                            <label>정보 수신</label>
                            <div class="checkbox-group">
                                <input type="checkbox" id="receive-email" name="info_receive" value="email" checked />
                                <label for="receive-email">Email</label>
                                <input type="checkbox" id="receive-sms" name="info_receive" value="sms" checked />
                                <label for="receive-sms">SMS</label>
                            </div>
                        </div>

                        <!-- 마케팅 수신 동의 -->
                        <div class="form-group">
                            <label for="marketing-consent">마케팅 수신 동의</label>
                            <select id="marketing-consent" name="marketing_consent">
                                <option value="yes">동의</option>
                                <option value="no">거부</option>
                            </select>
                        </div>

                        <!-- 저장 버튼 -->
                        <div class="form-actions">
                            <button type="submit">저장</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
    </div>

    <? include '../include/footer.php' ?>

    </html>
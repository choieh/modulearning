<div class="link__wrap">
    <a href="javascript:void(0);" class="link__withdrawal">회원탈퇴</a>
</div>

<div class="form__wrap">
    <form aria-labelledby="form-title" id="mypage-form" class="form">
        <fieldset class="fieldset">
            <legend class="blind">회원 정보 수정</legend>
            <!-- 아이디 -->
            <div class="form-group form__user-id">
                <label for="user-id" class="label">아이디</label>
                <span class="input__wrap">
                    <input type="text" id="user-id" name="user_id" value="00004569" maxlength="8" readonly />
                </span>
            </div>
            <!-- 이름 -->
            <div class="form-group form__user-name">
                <label for="user-name" class="label">이름</label>
                <span class="input__wrap">
                    <input type="text" id="user-name" name="user_name" value="이지수" readonly />
                </span>
            </div>
            <!-- 생년월일 -->
            <div class="form-group form__birthdate">
                <label for="birthdate" class="label">생년월일</label>
                <input type="text" id="birthdate" name="birthdate" value="241002" />
            </div>
            <!-- 휴대전화 -->
            <div class="form-group form__phone">
                <label for="phone" class="label">휴대전화</label>
                <div class="phone-input">
                    <input type="text" id="phone-part1" name="phone_part1" value="010" />
                    <span>-</span>
                    <input type="text" id="phone-part2" name="phone_part2" value="9456" />
                    <span>-</span>
                    <input type="text" id="phone-part3" name="phone_part3" value="9456" />
                </div>
            </div>
            <!-- 이메일 -->
            <div class="form-group form__email">
                <label for="email" class="label">이메일</label>
                <input type="email" id="email" name="email" value="wsadafsg@gmail.com" />
            </div>
            <!-- 비밀번호 변경 -->
            <div class="form-group form__password">
                <strong class="password label">비밀번호변경</strong>
                <div class="password__group">
                    <p class="password-input password-current">
                        <label for="current-password" class="label">비밀번호변경</label>
                        <input type="password" id="current-password" name="current_password"
                            placeholder="현재 비밀번호를 입력하세요" />
                    </p>
                    <p class="password-input password-new">
                        <label for="new-password" class="label">새로운 비밀번호</label>
                        <input type="password" id="new-password" name="new_password" placeholder="새로운 비밀번호를 입력하세요" />
                    </p>
                    <p class="password-input password-confirm">
                        <label for="confirm-password" class="label">새로운 비밀번호 재확인</label>
                        <input type="password" id="confirm-password" name="confirm_password"
                            placeholder="새로운 비밀번호를 다시 입력하세요" />
                    </p>
                </div>

            </div>
            <!-- 정보 수신 -->
            <div class="form-group form__info">
                <strong class="company-info label">정보수신</strong>
                <div class="checkbox__group-wrap">
                    <div class="checkbox__group">
                        <label for="receive-email" class="label">Email</label>
                        <div class="checkbox__switch">
                            <input type="checkbox" id="receive-email" name="info_receive" value="email" checked />
                            <label for="receive-email">
                                <span class="onf_btn"></span>
                            </label>
                        </div>
                    </div>
                    <div class="checkbox__group">
                        <label for="receive-sms" class="label">SMS</label>
                        <div class="checkbox__switch">
                            <input type="checkbox" id="receive-sms" name="info_receive" value="sms" checked />
                            <label for="receive-sms">
                                <span class="onf_btn"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 마케팅 수신 동의 -->
            <div class="form-group form__ad">
                <strong class="company-ad label">마케팅수신동의</strong>
                <div class="checkbox__group">
                    <div class="checkbox__switch">
                        <input type="checkbox" id="receive-ad" name="ad_receive" value="동의" checked />
                        <label for="receive-ad">
                            <span class="onf_btn"></span>
                        </label>
                    </div>
                </div>
            </div>
            <!-- 저장 버튼 -->
            <div class="form-submit form__btn">
                <button type="submit">저장하기</button>
            </div>
        </fieldset>
    </form>
</div>
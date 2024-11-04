// 은행
const BANK = {
    "국민": "국민",
    "신한": "신한",
    "우리": "우리",
    "하나": "하나",
    "SC제일": "SC제일",
    "씨티": "씨티",
    "산업": "산업",
    "중소기업": "중소기업",
    "기업": "기업",
    "수출입": "수출입",
    "농협": "농협",
    "수협": "수협",
    "대구": "대구",
    "부산": "부산",
    "경남": "경남",
    "광주": "광주",
    "전북": "전북",
    "제주": "제주",
    "케이뱅크": "케이뱅크",
    "카카오뱅크": "카카오뱅크",
    "토스뱅크": "토스뱅크"
}

// 이메일
const EMAIL = {
    "직접입력": "직접입력",
    "naver.com": "naver.com",
    "gmail.com": "gmail.com",
    "hanmail.net": "hanmail.net",
    "nate.com": "nate.com",
    "kakao.com": "kakao.com",
}

/**
 * @param {array} ids elements id
 * @param {array} vals selected value
 */
function setSelectValues(ids, vals) {
    const collator = new Intl.Collator('ko');

    for (let i=0; i<ids.length; i++) {
        const parent = document.getElementById(ids[i]);
        for (const child of parent.childNodes) {
            if (collator.compare(child.value, vals[i]) === 0) {
                const index = Array.from(parent.childNodes).indexOf(child);
                parent.options[index].selected = true;
                break;
            }
        }
    }
}

/**
 * @returns {string}
 * generateOption -> global.js
 */
function bankSelect() {
    return `<select id="bankName" name="bankName" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">${generateOption(BANK)}</select>`;
}

/**
 * @returns {string}
 */
function emailSelect() {
    return `<select id="email02" name="email02" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">${generateOption(EMAIL)}</select>`;
}
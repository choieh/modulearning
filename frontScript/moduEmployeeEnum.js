const codeApi = '../api/apiModuEmployeeCode.php';
let moduCode =  {};// getModuCode() 할당

async function getModuCode() {
    const response = await fetch(codeApi, { method: "GET" })
    return response.json();
}

// 모두의교육그룹 성별
const SEX = {
    여자: "여자",
    남자: "남자"
};
Object.freeze(SEX);


/**
 * generateOption() -> _global.js
 */

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
 */
function organiztionSelect() {
    return `<select id="organization" name="organization">${generateOption(moduCode.organization)}</select>`;
}

/**
 * @returns {string}
 */
function departmentSelect() {
    return `<select id="department" name="department">${generateOption(moduCode.department)}</select>`;
}

/**
 * @returns {string}
 */
function titleClassSelect() {
    return `<select id="titleClass" name="titleClass">${generateOption(moduCode.titleClass)}</select>`;
}

/**
 * @returns {string}
 */
function titleSelect() {
    return `<select id="title" name="title">${generateOption(moduCode.title)}</select>`;
}

/**
 * @returns {string}
 */
function sexSelect() {
    return `<select id="sex" name="sex">${generateOption(SEX)}</select>`;
}

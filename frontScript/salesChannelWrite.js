//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


let btnTextArr = ['사업자등록증', '계약서', '신분증', '통장사본'];

//게시판 보기 스크립트 시작
async function writeAct(writeSeq) {
    moduCode = await getModuCode();
    writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
    seq = writeSeq;

    //상단메뉴
    $('.searchArea').remove();

    //출력변수 지정
    let writer = '-';
    let vendor = '';
    let vendorName = '';
    let department = '';
    let companyCode = '';
    let companyName = '';
    let kind = '';
    let part = '';
    let ceoName = '';
    let calculator = '';
    let resno01 = '';
    let resno02 = '';
    let resno = '';
    let bankName = '';
    let bankUser = '';
    let bankNum = '';
    let mobile01 = '';
    let mobile02 = '';
    let mobile03 = '';
    let tel01 = '';
    let tel02 = '';
    let tel03 = '';
    let email01 = '';
    let email02 = '';
    let email03 = '';
    let postCode = '';
    let addr01 = '';
    let addr02 = '';
    let contractStart = '';
    let contractEnd = '';
    let calculateType = '';
    let status = '';
    let directCMS = '';
    let indirectCMS = '';
    let memo = '';
    let inputDate = '-';
    let attachFile01 = '';
    let attachFile01Name = '';
    let attachFile02 = '';
    let attachFile02Name = '';
    let attachFile03 = '';
    let attachFile03Name = '';
    let attachFile04 = '';
    let attachFile04Name = '';
    let attachURL = '';
    let vendorCloseDate = '';
    let partner = '';

    if (seq != '') {
        var writeAjax = $.get(useApi, {'seq': seq}, function (data) {
            attachURL = data.attachURL;
            $.each(data.vendor, function () {
                writer = this.writer ?? '';
                vendor = this.vendor ?? '';
                vendorName = this.vendorName ?? '';
                department = this.department ?? '';
                companyCode = this.companyCode ?? '';
                companyName = this.companyName ?? '';
                kind = this.kind ?? '';
                part = this.part ?? '';
                ceoName = this.ceoName ?? '';
                calculator = this.calculator ?? '';
                resno01 = this.resno01 ?? '';
                resno02 = this.resno02 ?? '';
                if (resno01 && resno02) {
                    resno = resno01 + '-' + resno02;
                }
                bankName = this.bankName ?? '';
                bankUser = this.bankUser ?? '';
                bankNum = this.bankNum ?? '';
                mobile01 = this.mobile01 ?? '';
                mobile02 = this.mobile02 ?? '';
                mobile03 = this.mobile03 ?? '';
                tel01 = this.tel01 ?? '';
                tel02 = this.tel02 ?? '';
                tel03 = this.tel03 ?? '';
                if (tel01 && tel02 && tel03) {
                    tel = tel01 + '-' + tel02 + '-' + tel03;
                }
                email01 = this.email01 ?? '';
                email02 = this.email02 ?? '';
                postCode = this.postCode ?? '';
                addr01 = this.addr01 ?? '';
                addr02 = this.addr02 ?? '';
                contractStart = this.contractStart ?? '';
                contractEnd = this.contractEnd ?? '';
                calculateType = this.calculateType ?? '';
                status = this.status ?? '';
                directCMS = this.directCMS ?? '';
                indirectCMS = this.indirectCMS ?? '';
                memo = this.memo ?? '';
                inputDate = this.inputDate ?? '';
                attachFile01 = this.attachFile01 ?? '';
                attachFile01Name = this.attachFile01Name ?? '';
                attachFile02 = this.attachFile02 ?? '';
                attachFile02Name = this.attachFile02Name ?? '';
                attachFile03 = this.attachFile03 ?? '';
                attachFile03Name = this.attachFile03Name ?? '';
                attachFile04 = this.attachFile04 ?? '';
                attachFile04Name = this.attachFile04Name ?? '';
                vendorCloseDate = this.vendorCloseDate ?? '';
                partner = this.partner ?? '';
            })
            writePrint();
        })
    } else {
        writePrint();
    }

    //게시판 생성
    function writePrint() {
        var writes = '';
        writes +=
            '<form class="writeForm">' +
            '<div><h2 style="border-bottom: none;">벤더정보</h2></div>' +
            '<div>' +
            '<div style="display: flex; justify-content: flex-start; width: fit-content; gap: 10px; font-size: 14px; border:1px solid #ccc; padding:10px 20px; background-color: #FFF1C1;">' +
            '<div style="border-right: 1px solid; padding: 1px 20px; font-weight: bold;">등록일</div>' +
            '<div style="padding: 1px 5px;">관리자</div>' +
            '<div style="padding: 1px 5px;">' + writer + '</div>' +
            '<div style="padding: 1px 5px;">' + inputDate + '</div>' +
            '</div>' +
            '</div>';
        writes +=
            '<div>' +
            '<div style="padding: 0 0 0 8px; margin: 3px 0; border-left: 5px solid #4a5359; font-size: 15px"><h3>기본정보</h3></div>' +
            '<div style="border-top: 1px solid #565656;">' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span class="vendorName" style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">벤더사명</span>' +
            '<input type="text" id="vendorName" name="vendorName" value="' + vendorName + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 30px; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">관리부서</span>' +
            `<span>${departmentSelect()}</span>` +
            `<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">파트너 여부</span>` +
            `<span>
                <select id="partner" name="partner" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">
                    <option value="">선택</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </span>` +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div>' +
            '<div style="padding: 0 0 0 8px; margin: 3px 0; border-left: 5px solid #4a5359; font-size: 15px"><h3>정산정보</h3></div>' +
            '<div style="border-top: 1px solid #565656;">' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">사업자번호</span>' +
            '<input type="text" id="companyCode" name="companyCode" value="' + companyCode + '" maxlength="12" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">사업자명</span>' +
            '<input type="text" id="companyName" name="companyName" value="' + companyName + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">업태</span>' +
            '<input type="text" id="kind" name="kind" value="' + kind + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">종목</span>' +
            '<input type="text" id="part" name="part" value="' + part + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">대표자</span>' +
            '<input type="text" id="ceoName" name="ceoName" value="' + ceoName + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">담당자</span>' +
            '<input type="text" id="calculator" name="calculator" value="' + calculator + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">대표 연락처</span>' +
            '<input type="text" name="tel01" value="' + tel01 + '" style="height: 26px; width: 50px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="3"> - ' +
            '<input type="text" name="tel02" value="' + tel02 + '" style="height: 26px; width: 50px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="4"> - ' +
            '<input type="text" name="tel03" value="' + tel03 + '" style="height: 26px; width: 50px; padding: 0 5px; margin-right: 9px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="4">' +
            '<span style="background: #bdc3c7; height: inherit; width: 450px;"></span>' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">주민번호</span>' +
            '<input type="text" id="resno" name="resno" value="' + resno + '" maxlength="14" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">은행명</span>' +
            bankSelect() +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">예금주</span>' +
            '<input type="text" id="bankUser" name="bankUser" value="' + bankUser + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">계좌번호</span>' +
            '<input type="text" id="bankNum" name="bankNum" value="' + bankNum + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            `<div id="email" style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">` +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">담당자 연락처</span>' +
            '<input type="text" name="mobile01" value="' + mobile01 + '" style="height: 26px; width: 50px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="3"> - ' +
            '<input type="text" name="mobile02" value="' + mobile02 + '" style="height: 26px; width: 50px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="4"> - ' +
            '<input type="text" name="mobile03" value="' + mobile03 + '" style="height: 26px; width: 50px; padding: 0 5px; margin-right: 9px; border: 1px solid #999; color: #666; vertical-align: middle;" maxlength="4">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">메일주소</span>' +
            '<input type="text" id="email01" name="email01" value="' + email01 + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;"> @ ' +
            emailSelect() +
            '<input type="text" id="email03" name="email03" value="" style="display:none; height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">사업장 주소</span>' +
            '︎<input type="text" id="postCode" name="postCode" value="' + postCode + '" style="height: 32px; width: 100px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle; background-color: #FFF1C1;" readonly>' +
            '<input type="text" id="addr01" name="addr01" value="' + addr01 + '" style="height: 32px; width: 480px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle; background-color: #FFF1C1;" readonly>' +
            '</div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">상세주소</span>' +
            '<input type="text" id="addr02" name="addr02" value="' + addr02 + '" style="height: 32px; width: 500px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<button type="button" id="zipCode" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 23px; height: 30px; padding: 0 10px; margin-left: 10px;">주소검색</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div style="padding: 0 0 0 8px; margin: 3px 0; border-left: 5px solid #4a5359; font-size: 15px"><h3>계약형태</h3></div>' +
            '<div style="border-top: 1px solid #565656;">' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">정산유형</span>' +
            '<span>' +
            '<input id="businessTax" type="checkbox" name="calculateType" value="businessTax"><label for="businessTax">사업소득세</label>' +
            '<input id="taxInvoice" type="checkbox" name="calculateType" value="taxInvoice"><label for="taxInvoice">세금계산서</label>' +
            '</span>' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">계약일자</span>' +
            '<input type="date" id="contractStart" name="contractStart" value="' + contractStart + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '<p style="display: inline-block; padding: 0 10px;"> ~ </p>' +
            '<input type="date" id="contractEnd" name="contractEnd" value="' + contractEnd + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">수수료</span>' +
            '<div style="display: inline-block;">' +
            '<span>' +
            '<input type="checkbox" name="chkCommission" id="directCMS"><label for="directCMS">계약의 업무</label>' +
            '<input type="text" id="directCMSval" name="directCMS" value="' + directCMS + '" style="width: 100px; padding: 1px;">%' +
            '</span>' +
            '<span style="padding-left: 15px;">' +
            '<input type="checkbox" name="chkCommission" id="indirectCMS"><label for="indirectCMS">영업의 업무</label>' +
            '<input type="text" id="indirectCMSval" name="indirectCMS" value="' + indirectCMS + '" style="width: 100px; padding: 1px;">%' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">계약해지일자</span>' +
            '<span>' +
            '<input type="date" name="vendorCloseDate" value="' + vendorCloseDate + '" style="height: 32px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</span>' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 30px; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">벤더등록번호</span>' +
            '<input type="text" id="vendor" name="vendor" value="' + vendor + '" style="height: 32px; width: 290px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle; background-color: #FFF1C1;" readonly>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div style="padding: 5px 30px; border-bottom: 1px dashed #ccc; line-height: 22px; min-width: 900px;">' +
            '<span style="display: inline-block; width: 115px; margin: 0 10px 0 0; padding: 0 10px 0 0; font-size: 13px; font-weight: bold; border-right: 2px solid #ccc; vertical-align: middle;">특이사항</span>' +
            '<input type="text" id="memo" name="memo" value="' + memo + '" style="height: 32px; width: 780px; padding: 0 5px; border: 1px solid #999; color: #666; vertical-align: middle;">' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div id="attachBox" style="display:flex;">' +
            '<span style="height: inherit;">' +
            '<input type="file" class="attachFile" id="attachFile01" name="attachFile01" style="display: none;">' +
            '<button type="button" onclick="uploadFile(this)" data-id="attachFile01" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 10px 10px 10px 0;">사업자등록증 파일첨부</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<input type="file" class="attachFile"  id="attachFile02" name="attachFile02" style="display: none;">' +
            '<button type="button" onclick="uploadFile(this)" data-id="attachFile02" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 10px 10px 10px 0;">계약서 파일첨부</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<input type="file" class="attachFile"  id="attachFile03" name="attachFile03" style="display: none;">' +
            '<button type="button" onclick="uploadFile(this)" data-id="attachFile03" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 10px 10px 10px 0;">신분증 파일첨부</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<input type="file" class="attachFile"  id="attachFile04" name="attachFile04" style="display: none;">' +
            '<button type="button" onclick="uploadFile(this)" data-id="attachFile04" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 10px 10px 10px 0;">통장사본 파일첨부</button>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div id="downloadBox" style="display:flex;">' +
            '<span style="height: inherit;">' +
            '<button type="button" data-file="attachFile01" style="background: #ffd457; color: #4d4d4f; font-weight: bold; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 0 10px 10px 0;">사업자등록증 내려받기</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<button type="button" data-file="attachFile02" style="background: #ffd457; color: #4d4d4f; font-weight: bold; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 0 10px 10px 0;">계약서 내려받기</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<button type="button" data-file="attachFile03" style="background: #ffd457; color: #4d4d4f; font-weight: bold; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 0 10px 10px 0;">신분증 내려받기</button>' +
            '</span>' +
            '<span style="height: inherit;">' +
            '<button type="button" data-file="attachFile04" style="background: #ffd457; color: #4d4d4f; font-weight: bold; border: none; vertical-align: middle; line-height: 30px; height: 40px; width: 230px; margin: 0 10px 10px 0;">통장사본 내려받기</button>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div style="display:flex; width: 100%;">' +
            '<div style="width: 10%">' +
            '<div style="display:flex; align-items: center; justify-content: center; background: #C8A227; color:white; width: 100%; height: 33px;">Guide</div>' +
            '</div>' +
            '<div style="width: 90%; padding: 0;">' +
            '<ul>' +
            '<li>필수입력 항목 : 사업자명/번호 or 대표자명/주민번호, 정산유형, 계약일자, 수수료지급율</li>' +
            '<li>사업자등록증 or 신분증, 계약서, 통장사본 파일첨부</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div style="margin-top: 60px; border-collapse: collapse; font-size:15px; width: 20%; min-width: 225px;">' +
            '<div>' +
            '<button type="button" onclick="getWorkHistory(' + seq + ')" style="background: #4d4d4f; color: #fff; border: none; vertical-align: middle; line-height: 23px; height: 30px; padding: 0 50px; margin-left: 10px;">변경이력 확인하기</button>' +
            '</div>' +
            '</div>';
        //버튼영역
        writes += '<div class="btnArea">';

        if (seq != '') {
            writes += `<button type="button" onClick="copyContract('${seq}')">복사하기</button>`;
            writes += '<button type="button" onClick="multipartSendData(\'U\')">';
            writes += '수정하기';
        } else {
            writes += '<button type="button" onclick="writeAct()">초기화</button>';
            writes += '<button type="button" onClick="multipartSendData()">';
            writes += '등록하기';
        }
        writes += '</button>'
        writes += '<button type="button" onClick="listAct(' + page + ')">목록보기</button>';
        writes += '</div>';
        writes += '</form>';
        writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'

        $('#contentsArea').removeAttr('class')
        $('#contentsArea').addClass('BBSWrite')
        $('#contentsArea').html(writes);
        document.getElementById('department').value = department;
        document.getElementById('partner').value = partner;
        setSelectValues(['bankName', 'email02'], [bankName, email02]);

        if (email01.length > 0 && document.getElementById('email02').value == '') {
            console.log(email02);
            document.getElementById('email02').value = '직접입력';
            const email03 = document.getElementById('email03');
            email03.style.display = 'inline';
            email03.value = email02;
        }

        // 이벤트 함수들
        document.getElementById('zipCode').addEventListener('click', () => {
            new daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var fullAddr = ''; // 최종 주소 변수
                    var extraAddr = ''; // 조합형 주소 변수

                    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        fullAddr = data.roadAddress;

                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        fullAddr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                    if (data.userSelectedType === 'R') {
                        //법정동명이 있을 경우 추가한다.
                        if (data.bname !== '') {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있을 경우 추가한다.
                        if (data.buildingName !== '') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    //document.getElementById('zipCodeArea').value = data.zonecode; //5자리 새우편번호 사용
                    document.getElementById('addr01').value = fullAddr;
                    document.getElementById('postCode').value = data.zonecode;

                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById('addr02').focus();
                }
            }).open({
                popupName: 'postcodePopup', //팝업 이름을 설정(영문,한글,숫자 모두 가능, 영문 추천)
            });
        });

        $('input[name=calculateType]').on('change', function () {
            $('input[name=calculateType]').not(this).prop('checked', false);
        });

        $('input[name=status]').on('change', function () {
            $('input[name=status]').not(this).prop('checked', false);
        });

        document.getElementById('email02').addEventListener('change', () => {
            const email02 = document.getElementById('email02');
            const email03 = document.getElementById('email03');
            if (email02.value == '직접입력') {
                email03.style.display = 'inline';
            } else {
                email03.style.display = 'none';
            }
        })

        document.getElementById('companyCode').addEventListener('keyup', () => {
            const companyCode = document.getElementById('companyCode');
            companyCode.value = companyCode.value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{2})(\d{5})/g, '$1-$2-$3');
        });

        document.getElementById('resno').addEventListener('keyup', () => {
            const resno = document.getElementById('resno');
            resno.value = resno.value.replace(/[^0-9\-]/g, "").replace(/(\d{6})(\d{7})/g, '$1-$2')
        });

        document.getElementById('bankNum').addEventListener('keyup', () => {
            const bankNum = document.getElementById('bankNum');
            bankNum.value = bankNum.value.replace(/[^0-9]/g, '');
        });

        document.querySelectorAll('#downloadBox button').forEach((el, index) => {
            el.addEventListener('click', () => {
                fileDownload(el, eval('attachFile0' + (index + 1)), attachURL)
            });
        });

        document.querySelectorAll('[name=chkCommission]').forEach(el => {
            el.addEventListener('change', () => {
                if (!$(el).is(':checked')) {
                    $(el).siblings('[name=' + el.id + ']').attr('placeholder', $(el).siblings('[name=' + el.id + ']').val());
                    $(el).siblings('[name=' + el.id + ']').val('');
                }
            })
        })

        if (status) $('input#' + status).prop('checked', true);

        if (calculateType) $('input#' + calculateType).prop('checked', true);

        if ($('#directCMSval').val() != '' && $('#directCMSval').val() != '0.0') $('#directCMS').prop('checked', true);

        if ($('#indirectCMSval').val() != '' && $('#indirectCMSval').val() != '0.0') $('#indirectCMS').prop('checked', true);

        document.querySelectorAll('#attachBox span').forEach(function (el, index, span) {
            if (eval('attachFile0' + (index + 1))) {
                el.childNodes.forEach(el => {
                    el.remove();
                })
                span[index].innerHTML = '<input type="hidden" id="delFile0' + (index + 1) + '" name="delFile0' + (index + 1) + '" value="N"><button type="button" data-id="attachFile0' + (index + 1) + '" ' +
                    'style="border:none; box-sizing: border-box; height: 40px; width: 230px; background: #4d4d4f; color: white; margin: 10px 10px 10px 0;" onclick="deleteFile(this)">' +
                    btnTextArr[index] + ' 삭제<i class="xi-close" style="color:red;  padding: 1px 0 0 4px; font-weight: bold;"></i></button>';
            }
        })
    }
}

//공통화를 위한 페이지 막음
function viewAct(seq) {
    writeAct(seq)
}

function checkFrom() {
    let flag = false;

    if (document.getElementById('partner').value == '') {
        document.getElementById('partner').focus();
        alert("파트너 여부를 확인해주세요.");
        return false;
    }

    // 사업자명/번호 -- 대표자명/주민번호
    // if ($('#companyName').val().length != 0 && $('#companyCode').val().length == 0) {
    //     $('#companyCode').focus();
    //     alert("사업자 번호를 입력해주세요.");
    //     return false;
    // }

    // if ($('#companyName').val().length == 0 && $('#companyCode').val().length != 0) {
    //     $('#companyName').focus();
    //     alert("사업자명을 입력해주세요.");
    //     return false;
    // }

    // if ($('#ceoName').val().length == 0) {
    //     $('#ceoName').focus();
    //     alert("대표자명을 입력해주세요.");
    //     return false;
    // }

    //정산유형
    $.each($("input[name=calculateType]"), function (index, el) {
        if ($(el).is(':checked')) flag = true;
    });

    if (!flag) {
        alert("정산 유형을 선택해주세요.");
        return false;
    }

    // 계약일자
    // if ($('#contractStart').val().length == 0 || $('#contractStart').val().length == 0) {
    //     $('#contractStart').focus();
    //     return false;
    // }

    // 수수료 지급율
    if (!$("#directCMS").is(':checked') && !$("#indirectCMS").is(':checked')) {
        alert("수수료를 설정해주세요.");
        return false;
    }

    if ($("#directCMS").is(':checked') && !$("#directCMSval").val()) {
        alert("계약의 업무 수수료 지급율을 설정해주세요.");
        return false;
    }

    if ($("#indirectCMS").is(':checked') && !$("#indirectCMSval").val()) {
        alert("영업의 업무 수수료 지급율을 설정해주세요.");
        return false;
    }

    // 파일 첨부검사
    // if (document.getElementById('attachFile01') || document.getElementById('attachFile01')) {
    //     if (!document.getElementById('attachFile01').value && !document.getElementById('attachFile03').value) {
    //         alert("사업자 등록증과 신분증, 둘 중 하나는 첨부 해야합니다.");
    //         return false;
    //     }
    // }
    //
    // if (document.getElementById('attachFile02')) {
    //     if (!document.getElementById('attachFile02').value) {
    //         alert("계약서를 첨부 해야합니다.");
    //         return false;
    //     }
    // }
    //
    // if (document.getElementById('attachFile04')) {
    //     if (!document.getElementById('attachFile04').value) {
    //         alert("통장사본을 첨부 해야합니다.");
    //         return false;
    //     }
    // }

    return true;
}

function multipartSendData(type) {
    if (!checkFrom()) return false;
    var form = $(".writeForm")[0];
    var formData = new FormData(form);
    if (type == 'U') {
        formData.append('seq', seq);
        formData.append('update', 'Y');
    }
    loadingAct();
    $.ajax({
        url: useApi,
        method: "POST",
        data: formData,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        success: function (data) {
            loadingAct();
            if (data.result == 'success') {
                alert("등록되었습니다.");
                listAct();
            } else if (data.result == 'exist') {
                alert("존재하는 등록번호 입니다.");
            } else if (data.result == 'date') {
                alert('계약일자를 확인해주세요.');
            } else {
                alert("등록에 실패했습니다.");
            }
        }
    });
}

function uploadFile(b) {
    $("#" + b.getAttribute("data-id")).click();
    $("#" + b.getAttribute("data-id")).on('change', function (e) {
        const file = e.target.files;
        document.getElementById(b.getAttribute("data-id")).files = file;
        let btn = '';
        if (file) {
            btn = document.querySelector("[data-id= " + e.target.id + "]");
            btn.innerHTML += '<i class="xi-file-image" style="font-size:16px; color: #55efc4;"></i>';
        }
    });
}

function fileDownload(el, attachFile, attachURL) {
    if (document.getElementById(el.getAttribute("data-file"))) {
        alert("등록된 파일이 없습니다.");
        return;
    } // 파일 등록이 안되어 있으면 중지
    let a = document.createElement('a');
    a.href = attachURL + attachFile;
    a.download = attachFile;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
}

function deleteFile(btn) {
    if (!confirm('파일을 삭제하시겠습니까?')) {
        return false;
    }

    let fileNum = btn.dataset.id.replace(/[^0-9]/g, '');
    var attach = 'attachFile' + fileNum;
    document.getElementById('delFile' + fileNum).value = 'Y';
    document.getElementById('delFile' + fileNum).parentNode.querySelector('button').remove();
    document.getElementById('delFile' + fileNum).parentNode.innerHTML +=
        '<input type="file" class="attachFile" id="' + attach + '" name="' + attach + '" style="display: none;">' +
        '<button type="button" data-id="' + attach + '" onclick="uploadFile(this)" ' +
        'style="border:none; box-sizing: border-box; height: 40px; width: 230px; background: #4d4d4f; color: white; margin: 10px 10px 10px 0;">' +
        btnTextArr[fileNum.replace(/[0]/g, '') - 1] + ' 파일첨부</button>';
}

function copyContract(seq) {
    let contractStart = '';
    let contractEnd = '';

    if (!seq) return false;

    let copyDialog = `
        <dialog id="copyDialog">
            <div style="display:flex; justify-content:space-between; font-size: 20px; margin-bottom: 10px;">
                <span>신규 계약기간 입력</span><i class="xi-close" onclick="closeDialog()"></i>
            </div>
            <div id="contractForm"><input type="date" name="contractStart"> ~ <input type="date" name="contractEnd"></div>
            <div class="btnArea">
                <button type="button" onclick="submitContract('${seq}')">입력</button>
                <button type="button" onclick="closeDialog()">취소</button>
            </div>
        </dialog>
        `;

    $('#contents').after(copyDialog);

    const dialog = document.getElementById('copyDialog');
    dialog.showModal();
}

function submitContract(seq) {
    let contractStart = document.querySelector('#contractForm input[name=contractStart]').value;
    let contractEnd = document.querySelector('#contractForm input[name=contractEnd]').value;
    copyAjax(seq, contractStart, contractEnd);
}

function copyAjax(seq, contractStart, contractEnd) {
    if (!confirm("복사하시겠습니까?")) return false;
    loadingAct();
    $.ajax({
        url: useApi,
        method: "POST",
        data: `copy=Y&seq=${seq}&contractStart=${contractStart}&contractEnd=${contractEnd}`,
        success: function (data) {
            loadingAct();
            if (data.result == 'success') {
                alert("복사되었습니다.");
                closeDialog();
                listAct();
            } else if(data.result == 'date') {
                alert("계약기간을 확인해주세요.");
            } else {
                alert("복사에 실패했습니다.");
            }
        }
    });
}


function closeDialog() {
    const dialog = document.getElementById('copyDialog');
    dialog.close();
}

function changeKeyToName(key) {
    const keyArr = {
        seq: '시퀀스', year: '년도', vendor: '벤더등록번호',
        vendorName: '벤더사명', department: '관리부서', partner: '파트너 여부',
        companyCode: '사업자 번호', companyName: '사업자명', kind: '업태',
        part: '종목', ceoName: '대표자', resno01: '주민번호1',
        resno02: '주민번호2', bankName: '은행명', bankUser: '예금주',
        bankNum: '계좌번호', mobile01: '핸드폰1', mobile02: '핸드폰2',
        mobile03: '핸드폰3', tel01: '대표번호1', tel02: '대표번호2',
        tel03: '대표번호3', email01: '이메일1', email02: '이메일2',
        postCode: '우편번호', addr01: '주소1', addr02: '주소2',
        contractStart: '계약시작일', contractEnd: '계약종료일', calculateType: '정산유형',
        vendorCloseDate: '계약만료일', directCMS: '계약의업무', indirectCMS: '영업의업무',
        memo: '특이사항', writer: '등록자', inputDate: '등록일',
        updateDate: '수정일', attachFile01: '첨부파일1', attachFile01Name: '첨부파일명1',
        attachFile02: '첨부파일2', attachFile02Name: '첨부파일명2', attachFile03: '첨부파일3',
        attachFile03Name: '첨부파일명3', attachFile04: '첨부파일4', attachFile04Name: '첨부파일명4',
        calculator: '정산자'
    };

    return keyArr[key];
}

// 문자열 '[key]=>value'에서 key, value 쌍으로 분리하여 배열에 추가
function workHistoryToArray(inputString) {
    const resultArray = [];
    const pairs = inputString.split('[').slice(1);
    for (const pair of pairs) {
        const [key, value] = pair.split(']=>');
        resultArray.push({ key, value });
    }

    return resultArray;
}

function getWorkHistory(seq) {
    if (!seq) return false;
    let modal = '';
    $.ajax({
        url: '../api/apiWorkHist.php',
        method: 'GET',
        data: 'vendor=Y&seq=' + seq,
        async: false,
        success: function (data) {
            if (data.totalCount == 0) {
                alert("이력이 없습니다.");
            }
            modal += '<div id="modal">';
            modal += '<div>';
            modal += '<h1><strong>변경이력</strong><button type="button" onClick="modalClose();"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
            modal += `<div style="overflow-y: auto; height: 800px;">
                <div style="display: flex; justify-content: space-around; 
                width: 800px; font-weight: bold; font-size:14px; border-bottom: 1px solid black; padding: 5px 0;">
                <span style="width: 100px; text-align: center;">구분</span>
                <span style="width: 150px; text-align: center;">이름/아이디</span>
                <span style="width: 150px; text-align: center;">변경일</span>
                </div>`;
            $.each(data.workHist, function () {
                let workBefore = this.workBefore.replace(/stdClass Object|\s|[()]/g, '');
                let workAfter = this.workAfter.replace(/stdClass Object|\s|[()]/g, '');
                workBefore = workHistoryToArray(workBefore);
                workAfter = workHistoryToArray(workAfter);

                modal += `
                    <div style="display: flex; justify-content: space-around; 
                    align-items: center; width: 800px; margin-top: 10px;">
                    <span style="width: 100px; text-align: center;">${this.menu2}</span>
                    <span style="width: 150px; text-align: center;">${this.userName} / ${this.inputID}</span>
                    <span style="width: 150px; text-align: center;">${this.inputDate}</span>
                    </div>
                `;

                modal += `<div style="display:flex; flex-direction: column; width: 800px; font-size: 14px;
                            border-bottom: 1px solid black; padding: 10px 0;">`;
                let count = workBefore.length;

                if (count == 0) {
                    modal += '<span>이력이 없습니다.</span>';
                }

                for (var i=0; i<count; i++) {
                    let keyName = '';
                    if (workBefore[i].value != workAfter[i].value) {
                        if (workBefore[i].value.length < 1) {
                            workBefore[i].value = 'NULL';
                        }

                        if (workAfter[i].value.length < 1) {
                            workAfter[i].value = 'NULL';
                        }
                        keyName = changeKeyToName(workBefore[i].key);
                        modal += `<div>
                        <span style="font-weight: bold;">${keyName}:</span> 
                        ${workBefore[i].value} ▶︎ ${workAfter[i].value}
                        </div>`;
                    }
                }
                modal += '</div>';
            });

            modal += '</div>';
            modal += '</div>';
            modal += '</div>';
            $('#contents').after(modal);
            modalAlign();
        }
    });
}


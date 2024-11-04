//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//게시판 보기 스크립트 시작
function writeAct(writeSeq, Types, testType) {
    pageMaxUp();
    writeSeq = writeSeq ? writeSeq : '';
    seq = writeSeq;
    Types = Types ? Types : writeType;
    writeType = Types;
    //testType = testType ? testType : '';
    //상단메뉴
    $('.searchArea').remove();

    //출력변수 지정 - 컨텐츠 등록 수정용
    var contentsCode = ''; // 차시 중복 사용가능
    var contentsName = ''; // 차시 중복 사용가능
    var previewImage = '';
    var chapter = ''; //차시 중복 사용 가능
    var contentsTime = '';
    var limited = '';
    var price = 0;
    var rPrice01 = '';
    var rPrice02 = '';
    var rPrice03 = '';
    var selfPrice = '';
    var selfPrice01 = '';
    var selfPrice02 = '';
    var selfPrice03 = '';
    var intro = '';
    var target = '';
    var goal = '';	//차시 중복사용 가능
    var professor = ''; //차시 중복사용 가능
    var passCode = '';
    var passProgress = '';
    var passTest = '';
    var passReport = '';
    var contentsPeriod = '';
    var contentsAccredit = '';
    var contentsExpire = '';
    var contentsGrade = '';
    var sort01 = '';
    var sort02 = '';
    var bookImage = '';
    var bookPrice = '';
    var bookIntro = '';
    var mobile = '';
    var contentsType = '';
    var serviceType = '';
    var sourceType = '';
    var cp = '';
    var commission = '';
    var testTime = '';
    var mid01EA = '';
    var mid02EA = '';
    var mid03EA = '';
    var mid04EA = '';
    var test01EA = '';
    var test02EA = '';
    var test03EA = '';
    var test04EA = '';
    var reportEA = '';
    var mid01Score = '';
    var mid02Score = '';
    var mid03Score = '';
    var mid04Score = '';
    var test01Score = '';
    var test02Score = '';
    var test03Score = '';
    var test04Score = '';
    var reportScore = '';
    var midRate = '';
    var testRate = '';
    var reportRate = '';
    var testAvailable = '';
    var enabled = '';
    var previewImageURL = ''; //미리보기 이미지
    var bookImageURL = ''; //교재 이미지
    var totalPassMid = '';
    var totalPassTest = '';
    var totalPassReport = '';
    var passScore = '';
    var progressCheck = '';
    var attachFile = '';
    var midTestChapter = '';
    var midTestProgress = '';
    var finalTestProgress = '';
    var memo = '';
    var previewChapter = '';
    var previewImageU = '';
    var bookImageU = '';
    var mainContents = '';
    var mainOrderBy = '';
    var orderByTotal = '';
    var progressCheckTime = '';
    var tutorPay = '';
    var keyword = ''; // 키워드등록
    var ssoCode = '';
    var hrdCode = '';
    var ncsCode = ''; //ncs코드 추가 2021-09-30
    var ncsName = '';
    var used = '';
    var simsaChapter = '';
    var simsaChapterY = '';
    var simsaChapterC = '';
    var dutyType = '';
    var dutyType2 = '';
    var eduLimit = '';
    var eduCeiling = '';
    var contract = '';
    var setSummary = '';
    var conWidth = '';
    var conHeight = '';
    var mobileSourceType = '';
    var supply = ''; //공급정도
    var coefficient = ''; //조정계수
    var contentsLocate = '';
    var applyLimit = '';
    var marketerYN = '';
    var trainingCard = '';
    var developeYear = '';
    let userAuth = '';
    let hrdPrice = 0;
    let hrdSelfPrice = 0;
    this.autoplay = 'N';
    var fileState = '';
    let fileStates = ['선택', '원본', '백업', '복사', '기타'];
    let fileStateMemo = '';
    var educenterLectureDay = '';

    //출력변수 지정 - 차시수정
    var chapterName = '';
    var content = '';
    var activity = '';
    var chapterPath = '';
    var chapterSize = '';
    var chapterTime = '';
    var chapterMobilePath = '';


    if (seq != '') {
        if (writeType == 'contentsWrite') {
            var writeAjax = $.get(useApi, {'seq': seq}, function (data) {
                previewImageURL = data.previewImageURL; //미리보기 이미지
                bookImageURL = data.bookImageURL; //교재 이미지
                orderByTotal = data.orderByTotal;

                $.each(data.contents, function () {
                    seq = this.seq
                    contentsCode = this.contentsCode;
                    contentsName = this.contentsName;
                    contentsType = this.contentsType;
                    contentsLocate = this.contentsLocate;

                    previewImage = this.previewImage;
                    chapter = this.chapter;
                    contentsTime = this.contentsTime;
                    limited = this.limited;
                    price = this.price ?? '0';
                    rPrice01 = this.rPrice01;
                    rPrice02 = this.rPrice02;
                    rPrice03 = this.rPrice03;
                    selfPrice = this.selfPrice;
                    selfPrice01 = this.selfPrice01;
                    selfPrice02 = this.selfPrice02;
                    selfPrice03 = this.selfPrice03;
                    intro = this.intro;
                    target = this.target;
                    goal = this.goal;
                    professor = this.professor;
                    if (this.passCode == null) {
                        passCode = '';
                    } else {
                        passCode = this.passCode;
                    }
                    passProgress = this.passProgress;
                    passTest = this.passTest;
                    passReport = this.passReport;
                    if (this.contentsPeriod == null) {
                        contentsPeriod = '';
                    } else {
                        contentsPeriod = this.contentsPeriod;
                    }
                    if (this.contentsAccredit == null) {
                        contentsAccredit = '';
                    } else {
                        contentsAccredit = this.contentsAccredit;
                    }
                    if (this.contentsExpire == null) {
                        contentsExpire = '';
                    } else {
                        contentsExpire = this.contentsExpire;
                    }
                    contentsGrade = this.contentsGrade;
                    sort01 = this.sort01;
                    sort02 = this.sort02;
                    bookImage = this.bookImage;
                    bookPrice = this.bookPrice;
                    bookIntro = this.bookIntro;
                    mobile = this.mobile;
                    serviceType = this.serviceType;
                    sourceType = this.sourceType;
                    cp = this.cp;
                    commission = this.commission;
                    testTime = this.testTime;
                    mid01EA = this.mid01EA;
                    mid02EA = this.mid02EA;
                    mid03EA = this.mid03EA;
                    mid04EA = this.mid04EA;
                    test01EA = this.test01EA;
                    test02EA = this.test02EA;
                    test03EA = this.test03EA;
                    test04EA = this.test04EA;
                    reportEA = this.reportEA;
                    mid01Score = this.mid01Score;
                    mid02Score = this.mid02Score;
                    mid03Score = this.mid03Score;
                    mid04Score = this.mid04Score;
                    test01Score = this.test01Score;
                    test02Score = this.test02Score;
                    test03Score = this.test03Score;
                    test04Score = this.test04Score;
                    reportScore = this.reportScore;
                    midRate = this.midRate;
                    testRate = this.testRate;
                    reportRate = this.reportRate;
                    testAvailable = this.testAvailable;
                    enabled = this.enabled;
                    totalPassMid = this.totalPassMid;
                    totalPassTest = this.totalPassTest;
                    totalPassReport = this.totalPassReport;
                    passScore = this.passScore;
                    progressCheck = this.progressCheck;
                    attachFile = this.attachFile;
                    midTestChapter = this.midTestChapter;
                    midTestProgress = this.midTestProgress;
                    finalTestProgress = this.finalTestProgress;
                    memo = this.memo;
                    previewChapter = this.previewChapter;
                    previewImageU = this.previewImageU;
                    bookImageU = this.bookImageU;
                    mainContents = this.mainContents;
                    mainOrderBy = this.mainOrderBy;
                    progressCheckTime = this.progressCheckTime;
                    tutorPay = this.tutorPay;
                    keyword = this.keyword;
                    contract = this.contract;
                    dutyType = this.dutyType;
                    dutyType2 = this.dutyType2;
                    eduLimit = this.eduLimit;
                    eduCeiling = this.eduCeiling;
                    applyLimit = this.applyLimit;
                    marketerYN = this.marketerYN;
                    trainingCard = this.trainingCard;
                    developeYear = this.developeYear;
                    userAuth = this.userAuth;
                    hrdPrice = this.hrdPrice ?? '0';
                    hrdSelfPrice = this.hrdSelfPrice ?? '0';
                    educenterLectureDay = this.educenterLectureDay ?? '';

                    if (this.hrdCode == null) {
                        hrdCode = '';
                    } else {
                        hrdCode = this.hrdCode;
                    }
                    if (this.ncsCode == null) {
                        ncsCode = '';
                    } else {
                        ncsCode = this.ncsCode;
                    }
                    if (this.ncsName == null) {
                        ncsName = '';
                    } else {
                        ncsName = this.ncsName;
                    }
                    used = this.used;
                    simsaChapter = this.simsaChapter;

                    if (this.simsaChapter != 0) {
                        simsaChapterY = simsaChapter.substring(0, 4);
                        simsaChapterC = simsaChapter.substring(4);
                    } else {
                        simsaChapterY = 0;
                        simsaChapterC = 0;
                    }
                    if (this.ssoCode == null) {
                        ssoCode = '';
                    } else {
                        ssoCode = this.ssoCode;
                    }
                    passCnt = this.passCnt;
                    nowCnt = this.nowCnt;
                    setSummary = this.setSummary;
                    conWidth = this.conWidth;
                    conHeight = this.conHeight;
                    mobileSourceType = this.mobileSourceType;
                    supply = this.supply;
                    coefficient = this.coefficient;
                    //mainView = this.mainView;
                    autoplay = this.autoplay;
                    fileState = this.fileState;
                    fileStateMemo = this.fileStateMemo;
                })
                writePrint(data)
            })
        } else if (writeType == 'chapterWrite' || writeType == 'testWrite' || writeType == 'reportWrite' || writeType == 'tracse') {
            var checkApi = '';
            if (writeType == 'chapterWrite') {
                checkApi = chapterApi;
            } else if (writeType == 'testWrite') {
                checkApi = testApi;
            } else if (writeType == 'reportWrite') {
                checkApi = reportApi;
            } else if (writeType == 'tracse') {
                checkApi = hrdCodeApi;
            }
            var writeAjax = $.get(checkApi, {'contentsCode': seq, 'testType': testType}, function (data) {
                contentsCode = data.contentsCode;
                contentsName = data.contentsName;
                writePrint()

            })
        } else {

        }
    } else {
        writePrint()
    }


    //게시판 생성
    function writePrint(data) {
        var writes = '';
        if (typeof (data) == 'object') {
            var chkData = data.contents[0];
        } else {
            var chkData = '';
        }

        if (writeType == 'contentsWrite') {
            //파일등록
            writes += '<h1>' + contentsName + '</h1>'
            writes += '<h2>파일로 업로드하기</h2>'
            writes += '<form class="fileUploadform" method="post" action="contentsUpload.php" enctype="multipart/form-data">';
            writes += '<ul>';
            writes += '<li>'
            writes += '<h1>등록양식</h1>'
            writes += '<button type="button" onclick="location.href=\'../attach/docs/contents(양식).xls\'">양식' +
                ' 내려받기</button>&nbsp;';
            writes += '<button type="button" onclick="location.href=\'../attach/docs/contents(샘플).xls\'">샘플보기</button>';
            writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
            writes += '</li>'
            writes += '</li>'
            writes += '<li>'
            writes += '<h1>파일등록</h1>'
            writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>'
            writes += '</li>'
            writes += '</ul>';
            writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
            writes += '</form>'

            writes += '<h2>파일로 업로드하기 (심사결과정보 반영)</h2>'
            writes += '<form class="fileUploadform" method="post" action="contentsPassUpload.php" enctype="multipart/form-data">';
            writes += '<ul>';
            writes += '<li>'
            writes += '<h1>등록양식</h1>'
            writes += '<button type="button" onclick="location.href=\'../attach/contents/심사반영(양식).xlsx\'">양식 내려받기</button>&nbsp;';
            writes += '<button type="button" onclick="location.href=\'../attach/contents/심사반영(샘플).xlsx\'">샘플보기</button>';
            writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
            writes += '</li>'
            writes += '</li>'
            writes += '<li>'
            writes += '<h1>파일등록</h1>'
            writes += '<input type="file" name="uploadFile2" />&nbsp;<button type="submit">파일업로드</button>'
            writes += '</li>'
            writes += '</ul>';
            writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
            writes += '</form>'
            /*
			if(seq == ''){
				writes += '<h1>'+contentsName+'</h1>'
				writes += '<h2>파일로 업로드하기</h2>'
				writes += '<form class="fileUploadform" method="post" action="contentsUpload.php" enctype="multipart/form-data">';
				writes += '<ul>';
				writes += '<li>'
				writes += '<h1>등록양식</h1>'
				writes += '<button type="button" onclick="location.href=\'../attach/docs/과정등록(양식).xlsx\'">양식 내려받기</button>&nbsp;';
				writes += '<button type="button" onclick="location.href=\'../attach/docs/과정등록(샘플).xlsx\'">샘플보기</button>';
				writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
				writes += '</li>'
				writes += '</li>'
				writes += '<li>'
				writes += '<h1>파일등록</h1>'
				writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>'
				writes += '</li>'
				writes += '</ul>';
				writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
				writes += '</form>'
			} else {
				writes += '<h2>파일로 업로드하기 (심사결과정보 반영)</h2>'
				writes += '<form class="fileUploadform" method="post" action="contentsPassUpload.php" enctype="multipart/form-data">';
				writes += '<ul>';
				writes += '<li>'
				writes += '<h1>등록양식</h1>'
				writes += '<button type="button" onclick="location.href=\'../attach/contents/심사반영(양식).xlsx\'">양식 내려받기</button>&nbsp;';
				writes += '<button type="button" onclick="location.href=\'../attach/contents/심사반영(샘플).xlsx\'">샘플보기</button>';
				writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
				writes += '</li>'
				writes += '</li>'
				writes += '<li>'
				writes += '<h1>파일등록</h1>'
				writes += '<input type="file" name="uploadFile2" />&nbsp;<button type="submit">파일업로드</button>'
				writes += '</li>'
				writes += '</ul>';
				writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
				writes += '</form>'
			}*/

            writes += '<h2>직접입력하기</h2>'
            writes += '<form class="writeform" method="POST" action="../api/apiContents.php" enctype="multipart/form-data">';

            //seq값 선언
            writes += '<input type="hidden" name="seq" value="' + seq + '" />';
            writes += '<input type="hidden" name="contentsCodeOrigin" value="' + contentsCode + '" />';
            writes += '<input type="hidden" name="used" value="N" />';

            //입력영역 시작
            writes += '<ul>';

            //등급,코드, 사이트노출
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>등급/과정코드</h1>';
            if (loginUserID == 'leehr0523') {
                writes += '<select name="contentsGrade" class="' + contentsGrade + '" onChange="priceCalculate();">' + optWrite['contentsGrade'] + '</select>'
            } else {
                writes += '<select name="contentsGrade" id="contentsGrade" class="' + contentsGrade + '"" onClick="getGradePrice()">' + optWrite['contentsGrade'] + '</select>'
            }
            if (seq == '') {
                writes += '&nbsp;/&nbsp;<strong class="price">과정코드는 신규등록시 자동생성됩니다.</strong>'
            } else {
                writes += '&nbsp;/&nbsp;<strong>' + contentsCode + '</strong>'
            }

            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>공개여부(사이트노출)</h1>';
            writes += '<select name="enabled" class="' + enabled + '">' + optWrite['enabled'] + '</select>';
            writes += '<h1 style="margin-left:30px; width:fit-content">영업자노출</h1>';
            writes += '<select name="marketerYN" class="">';
            if (marketerYN == "Y") {
                writes += '<option value="N">N</option>';
                writes += '<option value="Y" selected>Y</option>';
            } else {
                writes += '<option value="N" selected>N</option>';
                writes += '<option value="Y">Y</option>';
            }
            writes += '</select>';
            writes += '</div>';
            writes += '</li>';

            //직무 관련성, 직무법정과정
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>직무 관련성 과정</h1>';
            writes += '<select name="dutyType" class="' + dutyType + '">' + optWrite['dutyType'] + '</select>'
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>직무법정과정</h1>';
            writes += '<select name="dutyType2" id="dutyType2" class="' + dutyType2 + '" onChange="selDutyType2()">' + optWrite['dutyType'] + '</select>';
            writes += '<h1 style="margin-left:30px; width:fit-content">기업직업훈련카드</h1>';
            writes += '<select name="trainingCard" class="">';
            if (trainingCard == "Y") {
                writes += '<option value="N">N</option>';
                writes += '<option value="Y" selected>Y</option>';
            } else {
                writes += '<option value="N" selected>N</option>';
                writes += '<option value="Y">Y</option>';
            }
            writes += '</select>';
            writes += '</div>'
            writes += '</li>';

            //심사코드
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>심사코드</h1>';
            writes += '<input type="text" name="passCode" class="name" value="' + passCode + '" />';
            writes += '&nbsp;&nbsp;<strong class="price">한기대 과정등록 코드 입력</strong>'
            writes += '</div>';

            //컨텐츠 위치
            writes += '<div class="halfDiv">'
//			writes += '<h1>운영여부</h1>';
//			writes += '<select name="used" class="'+used+'">';
//			writes += '<option value="Y">Y</option>';
//			writes += '<option value="N">N</option>';
//			writes += '</select>';
            writes += '<h1>컨텐츠 위치</h1>';
            if (contentsLocate == "") {
                writes += '<span></span>';
            } else if (contentsLocate == 0) {
                writes += '<span>1 서버</span>'
            } else {
                writes += '<span>' + contentsLocate + ' 서버</span>'
            }
            writes += '</div>';
            writes += '</li>';

            //HRD-NET 과정코드 추가 (2018-08-27 강혜림)
            writes += '<li>'
            writes += '<div class="halfDiv">';
            writes += '<h1>HRD-NET 과정코드</h1>';
            writes += '<input type="text" name="hrdCode" class="name" value="' + hrdCode + '" maxlength="17"/>';
            writes += '</div>';

            writes += '<div class="halfDiv">';
            writes += '<h1>심사차수</h1>';
            writes += '<select name="simsaChapterY" class="' + simsaChapterY + '">';
            for (var nowYear = new Date().getFullYear() + 1; nowYear >= 2016; nowYear--) {
                writes += '<option value="' + nowYear + '">' + nowYear + '년</option>';
            }
            writes += '<option value="0">해당없음</option>';
            writes += '</select>&nbsp;&nbsp;';
            writes += '<select name="simsaChapterC" class="' + simsaChapterC + '">';
            for (var c = 1; c < 10; c++) {
                writes += '<option value="' + c + '">' + c + '차</option>';
            }
            writes += '<option value="0">해당없음</option>';
            writes += '</select>';
            writes += '</div>';
            writes += '</li>';

            //훈련유형, 수강방법
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>과정유형</h1>';
            writes += '<select id="contentsType" name="contentsType" class="' + contentsType + '" onchange="changeLectureType()">';
            writes += '<option value="1">사업주 환급</option>';
            writes += '<option value="2">내일배움카드</option>';
            writes += '<option value="3">비환급</option>';
            writes += '<option value="4">기업직업훈련</option>';
            writes += '<option value="5">Flex</option>';
			writes += '<option value="6">오프라인</option>';
            writes += '</select>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>수강방법</h1>';
            writes += '<select name="serviceType" class="' + serviceType + '">';
            writes += '<option value="1">환급</option>';
            writes += '<option value="2">내일배움카드</option>';
            writes += '<option value="3">일반</option>';
            writes += '<option value="5">산업안전</option>';
            writes += '<option value="4">Flex</option>';
            writes += '</select>';
            writes += '</div>'
            writes += '</li>';

            //과정분류, NCS코드
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>과정분류</h1>';
            writes += '<select id="sort01" name="sort01" class="' + sort01 + '" onchange="changeSortw2(this,\'\')"><option value="">대분류 선택</option>' + optWrite['lectureCode'] + '</select> ';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>개발 연도</h1>';
            writes += '<input type="text" name="developeYear" class="name" value="' + developeYear + '"/>';
            writes += '</div>'
            writes += '</li>'
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>NCS코드</h1>';
            writes += '<input type="text" id="ncsCode" name="ncsCode" class="name" value="' + ncsCode + '" onkeyup="getSupCoeff(this)" />';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>NCS명</h1>';
            writes += '<input type="text" id="ncsName" name="ncsName" class="name" value="' + ncsName + '"/ >';
            writes += '</div>'
            writes += '</li>';

            //과정명, 첨삭료
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>과정명</h1>';
            writes += '<input type="text" name="contentsName" class="subject" value="' + contentsName + '" />';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>수강생 인증</h1>'
            writes += '<select name="userAuth" class="' + userAuth + '">';
            writes += '<option value="N">N</option>';
            writes += '<option value="Y">Y</option>';
            writes += '</select>';
            writes += '</div>'
            writes += '</li>';


            //과정이미지
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>과정이미지</h1>';
            if (previewImage == '' || previewImage == null) {
                writes += '<input type="file" name="previewImage" />'
            } else {
                
                //writes += '<div id="previewImage" class="attachFile"><img src="'+previewImageURL+previewImage+'" style="width:100px;"><br /><button type="button" onclick="deleteFileAct(\'previewImage\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
                //writes += '<div id="previewImage" class="attachFile"><input type="hidden" name="previewImageU" value="'+encodeURI(previewImage)+'"/><img src="'+encodeURIComponent(previewImageURL+previewImage)+'" style="width:100px;"><br /><button type="button" onclick="deleteFileAct(\'previewImage\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
                
                writes += '<div id="previewImage" class="attachFile">' +
                        '<input type="hidden" name="previewImageU" value="' + previewImage + '"/>' +
                        '<img src="' + previewImageURL + encodeURIComponent(previewImage) + '" style="width:100px;">' +
                        '</div>' +
                        '<a href="' + previewImageURL + encodeURIComponent(previewImage) + '" download="' + previewImage + '">' +
                        '<button type="button" style="margin-left:5px;">이미지 다운로드</button>' +
                        '</a>' +
                        '<button type="button" style="margin-left:5px;" onclick="deleteFileAct(\'previewImage\')">이미지 삭제</button>' +
                        '<input type="checkbox" name="delFile01" value="Y" />';

                
                    // writes += '<div id="previewImage" class="attachFile">' +
                    //         '<input type="hidden" name="previewImageU" value="' + previewImage + '"/>' +
                    //         '<a href="' + previewImageURL + encodeURIComponent(previewImage) + '" download="' + previewImage + '">' +
                    //             '<img src="' + previewImageURL + encodeURIComponent(previewImage) + '" style="width:100px;">' +
                    //         '</a><br />' +
                    //         '<button type="button" onclick="deleteFileAct(\'previewImage\')">첨부파일삭제</button></div>' +
                    //     '<input type="checkbox" name="delFile01" value="Y" />';
                
            }
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>진도체크방식</h1>';
            writes += '<select name="progressCheck" class="' + progressCheck + '">';
            writes += '<option value="timeCheck">시간</option>';
            writes += '<option value="pageCheck">페이지</option>';
            writes += '</select>';
            writes += '</div>'
            writes += '</li>'

            //차시수 시간
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>차시수</h1>';
            writes += '<input type="text" name="chapter" class="month" value="' + chapter + '" /> 차시';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>교육시간</h1>';
            writes += '<input type="text" id="contentsTime" name="contentsTime" class="month" value="' + contentsTime + '" onkeyup="getSelfPrice(this)"/> 시간';
            writes += '</div>'
            writes += '</li>';

            /*
			//상한액
			writes += '<li>'
			writes += '<div class="halfDiv">'
			writes += '<h1>상한액</h1>';
			writes += '<input type="text" name="eduCeiling" class="price" value="'+eduCeiling+'" /> 원';
			writes += '</div>'

			//한도액
			writes += '<div class="halfDiv">'
			writes += '<h1>한도액</h1>';
			writes += eduLimit+'원';
			writes += '</div>'
			writes += '</li>';
			*/


            //지원한도 인원
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>지원한도 인원</h1>';
            writes += '<input type="text" class="price" name="applyLimit" id="applyLimit" value=' + applyLimit + '>명';
//			writes += '<h1 style="margin:0 0 0 250px;">등록가능 인원</h1>';
//			writes += '&nbsp;&nbsp;&nbsp;<a id="limitPrice"></a>';
            writes += '</div>'
            if (seq != '') {
                //수료인원
                writes += '<div class="halfDiv">'
                writes += '<h1>수료 인원</h1>';
                writes += passCnt + '명';
                writes += '<h1 style="margin:0 0 0 250px;">학습 중인 인원</h1>';
                writes += '&nbsp;&nbsp;&nbsp;' + nowCnt + '명';
                writes += '</div>'
                writes += '</li>';
            }

            //공급정도, 조정계수
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>공급정도</h1>';
            writes += '<input type="text" id="supply" name="supply" class="price" value="' + supply + '" onkeyup="setCoefficient(this)"/>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>조정계수</h1>';
            writes += '<input type="text" id="coefficient" name="coefficient" class="price" value="' + coefficient + '" />';
            writes += '</div>'
            writes += '</li>';

            //가격관련
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>교육비용</h1>';
            writes += '<input type="text" id="price" name="price" class="price" value="' + price + '" /> 원';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>표준훈련비</h1>';
            writes += '<input type="text" id="selfPrice" name="selfPrice" class="price" value="' + selfPrice + '" /> 원';
            writes += '</div>'
            writes += '</li>';

            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>내일배움카드<br>정부지원금</h1>';
            writes += '<input type="text" id="hrdPrice" name="hrdPrice"' +
                ' class="price" value="' + hrdPrice + '" /> 원';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>내일배움카드<br>자비지원금</h1>';
            // writes += '<input type="text" id="hrdSelfPrice" name="hrdSelfPrice" class="price" value="'+hrdSelfPrice+'" /> 원';
            writes += toPriceNum(eval(price) - eval(hrdPrice)) + '원';
            writes += ' <strong class="price">※ 0원 이상이면 수강신청 시 결제 요청이 이루어 집니다.</strong>';
            writes += '</div>'
            writes += '</li>';

            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>우선지원</h1>';
            writes += '<input type="text" id="rPrice01" name="rPrice01" class="price" value="' + rPrice01 + '" /> 원';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>자부담<br />우선지원</h1>';
            writes += '<input type="text" id="selfPrice01" name="selfPrice01" class="price" value="' + selfPrice01 + '" /> 원';
            writes += '</div>'
            writes += '</li>';

            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>대규모<br />1000인 미만</h1>';
            writes += '<input type="text" id="rPrice02" name="rPrice02" class="price" value="' + rPrice02 + '" /> 원';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>자부담 대규모<br />1000인 미만</h1>';
            writes += '<input type="text" id="selfPrice02" name="selfPrice02" class="price" value="' + selfPrice02 + '" /> 원';
            writes += '</div>'
            writes += '</li>';

            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>대규모<br />1000인 이상</h1>';
            writes += '<input type="text" id="rPrice03" name="rPrice03" class="price" value="' + rPrice03 + '" /> 원';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>자부담 대규모<br />1000인 이상</h1>';
            writes += '<input type="text" id="selfPrice03" name="selfPrice03" class="price" value="' + selfPrice03 + '" /> 원';
            writes += '</div>'
            writes += '</li>';


            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>내용전문가</h1>';
            writes += '<input type="text" name="professor" class="name" value="' + professor + '" />'
            writes += '</div>'
            //내용전문가 테스트
            writes += '<div class="halfDiv">'
            writes += '<h1>내용전문가 테스트</h1>';
            if (returnData(chkData.seq) != '') {
                writes += '<div class="textInputs" id="specialList"><strong>';
                if (typeof (chkData.specialList) != 'undefined') {
                    var spNum = 0;
                    $.each(chkData.specialList, function () {
                        if (spNum != 0) {
                            writes += ', '
                        }
                        writes += returnData(this.userName) + '(' + returnData(this.company) + ')';
                        spNum++;
                    })
                }
                writes += '</strong><button type="button" onclick="searchPop(\'specialList\',' + chkData.seq + ',\'' + chkData.contentsCode + '\')">내용전문가 검색</button></div>';
            } else {
                writes += '<strong class="red">내용전문가는 최초 정보 등록 완료 후 등록이 가능합니다.</strong>';
            }
            writes += '</li>';

            //컨텐츠 기간
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>컨텐츠 유효기간</h1>';
            writes += '<div class="datePicker"><input type="text" name="contentsPeriod" class="cal"  value="' + contentsPeriod + '" onkeyup="inputYMDNumber(this)"  /></div>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>인정만료일</h1>';
            writes += '<div class="datePicker"><input type="text" name="contentsAccredit" tabIndex="1" class="cal"  value="' + contentsAccredit + '" onkeyup="inputYMDNumber(this)" /> ~ </div>';
            writes += '<div class="datePicker">&nbsp;<input type="text" name="contentsExpire" tabIndex="2" class="cal"  value="' + contentsExpire + '" onkeyup="inputYMDNumber(this)"  /></div>';
            writes += '</div>'
            writes += '</li>';

            //CP사, CP수수료
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>CP사</h1>';
            // writes += '<input type="text" name="cp" class="name" value="'+cp+'" />';
            writes += '<select name="cp" class="' + cp + '">' + optWrite['cp'] + '</select>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>CP 수수료</h1>';
            writes += '<input type="text" name="commission" class="price" value="' + commission + '" /> %';
            writes += '</div>'
            writes += '</li>';

            //모바일지원, 플레이방법
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>모바일지원</h1>';
            writes += '<select name="mobile" class="' + mobile + '">' + optWrite['enabled'] + '</select>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>파일 형식</h1>';
            writes += '<select name="sourceType" class="' + sourceType + '">' + optWrite['sourceType'] + '</select>';
            writes += '</div>'
            writes += '</li>';

            //모바일 파일 형식, 학습창 크기 추가 2020-09-15 이화랑
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>학습창크기</h1>';
            writes += '<input type="text" name="conWidth" style="width:60px;" value="' + conWidth + '" /> x ';
            writes += '<input type="text" name="conHeight" style="width:60px;" value="' + conHeight + '" /><br />※ 가로 x 세로, 각각 0으로 입력 시 크기를 자동으로 설정합니다. 자동으로 설정되지 않는 경우 값을 입력해주세요.';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>모바일 파일 형식</h1>';
            writes += '<select name="mobileSourceType" class="' + mobileSourceType + '">' + optWrite['mobileSourceType'] + '</select>';
            writes += '</div>'
            writes += '</li>';

            //mp4 자동 페이지 넘김
            writes += '<li>'
            writes += '<h1>자동페이지 넘김(mp4 파일형식 지원)</h1>'


            if (autoplay == 'N') {
                writes += '<label><input type="radio" name="autoplay" checked value="N">N</label>'
                writes += '<label><input type="radio" name="autoplay" value="Y">Y</label>'
            } else {
                writes += '<label><input type="radio" name="autoplay" value="N">N</label>'
                writes += '<label><input type="radio" name="autoplay" value="Y" checked>Y</label>'
            }

            writes += '</li>';

            //학습자료 등록
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>학습자료 등록</h1>';
            if (attachFile == '' || attachFile == null) {
                writes += '<input type="file" name="attachFile" />'
            } else {
                //writes += '<div id="attachFile" class="attachFile"><a href="fileDownLoad.php?fileName='+attachFile+'&link='+previewImageURL+attachFile+'" target="_blank">'+attachFile+'</a><br /><button type="button" onclick="deleteFileAct(\'attachFile\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
                writes += '<div id="attachFile" class="attachFile"><input type="hidden" name="attachFileU" value="' + attachFile + '"/><a href="fileDownLoad.php?fileName=' + encodeURI(attachFile) + '&link=' + encodeURI(previewImageURL + attachFile) + '" target="_blank">' + attachFile + '</a><br /><button type="button" onclick="deleteFileAct(\'attachFile\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
            }
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>학급정원</h1>';
            writes += '<input type="text" name="limited" class="price" value="' + limited + '" /> 명';
            writes += '</div>'
            writes += '</li>'

            //참고도서 이미지
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>교재이미지</h1>';
            if (bookImage == '' || bookImage == null) {
                writes += '<input type="file" name="bookImage" />'
            } else {
                //writes += '<div id="bookImage" class="attachFile"><img src="'+bookImageURL+previewImage+'"><br /><button type="button" onclick="deleteFileAct(\'bookImage\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
                writes += '<div id="bookImage" class="attachFile"><input type="hidden" name="bookImageU" value="' + bookImage + '"/><img src="' + bookImageURL + bookImage + '" style="width:100px;"><br /><button type="button" onclick="deleteFileAct(\'bookImage\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
            }
            writes += '</div>'
            /*writes += '<div class="halfDiv">'
			writes += '<h1>교재비</h1>';
			writes += '<input type="text" name="bookPrice" class="price" value="'+bookPrice+'" /></select>';
			writes += '</div>'*/
            writes += '<div class="halfDiv">'
            writes += '<h1>첨삭료</h1>';
            writes += '<input type="text" name="tutorPay" class="price" value="' + tutorPay + '" /> 원';
            writes += '</div>'
            writes += '</li>';

            //참고도서설명
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>참고도서설명</h1>';
            writes += '<input type="text" name="bookIntro" class="subject" value="' + bookIntro + '" />';
            writes += '</div>'

            //미리보기 차시설정
            writes += '<div class="halfDiv">'
            writes += '<h1>미리보기 차시 설정</h1>';
            if (previewChapter != '') {
                writes += '<input type="text" name="previewChapter" class="month" value="' + previewChapter + '" /> 차시';
            } else {
                writes += '<input type="text" name="previewChapter" class="month" value="" /> 차시';
            }
            writes += '</div>'
            writes += '</li>'

            //문항관련
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:객관식 문항수</h1>';
            writes += '<input type="tel" name="mid01EA" class="year" value="' + mid01EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:객관식 배점</h1>';
            writes += '<input type="tel" name="mid01Score" class="year" value="' + mid01Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:단답형 문항수</h1>';
            writes += '<input type="tel" name="mid02EA" class="year" value="' + mid02EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:단답형 배점</h1>';
            writes += '<input type="tel" name="mid02Score" class="year" value="' + mid02Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:서술형 문항수</h1>';
            writes += '<input type="tel" name="mid03EA" class="year" value="' + mid03EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:서술형 배점</h1>';
            writes += '<input type="tel" name="mid03Score" class="year" value="' + mid03Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:진위형 문항수</h1>';
            writes += '<input type="tel" name="mid04EA" class="year" value="' + mid04EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간:진위형 배점</h1>';
            writes += '<input type="tel" name="mid04Score" class="year" value="' + mid04Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:객관식 문항수</h1>';
            writes += '<input type="tel" name="test01EA" class="year" value="' + test01EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:객관식 배점</h1>';
            writes += '<input type="tel" name="test01Score" class="year" value="' + test01Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:단답형 문항수</h1>';
            writes += '<input type="tel" name="test02EA" class="year" value="' + test02EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:단답형 배점</h1>';
            writes += '<input type="tel" name="test02Score" class="year" value="' + test02Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:서술형 문항수</h1>';
            writes += '<input type="tel" name="test03EA" class="year" value="' + test03EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:서술형 배점</h1>';
            writes += '<input type="tel" name="test03Score" class="year" value="' + test03Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:진위형 문항수</h1>';
            writes += '<input type="tel" name="test04EA" class="year" value="' + test04EA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종:진위형 배점</h1>';
            writes += '<input type="tel" name="test04Score" class="year" value="' + test04Score + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>레포트 문항수</h1>';
            writes += '<input type="tel" name="reportEA" class="year" value="' + reportEA + '" /> 문항';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>레포트 배점</h1>';
            writes += '<input type="tel" name="reportScore" class="year" value="' + reportScore + '" /> 점';
            writes += '</div>'
            writes += '</li>';
            //중간평가 시기 설정
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간평가 응시 차수</h1>';
            if (midTestChapter == null) {
                midTestChapter = chapter / 2;
            }
            writes += '<input type="tel" name="midTestChapter" class="year" value="' + midTestChapter + '" /> 차시 이후 부터 (값을 입력하지 않으면 1/2 지점으로 자동 등록)';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>중간평가 응시<br> 진도율</h1>';
            if (midTestProgress == null) {
                midTestProgress = 50;
            }
            writes += '<input type="tel" name="midTestProgress" class="year" value="' + midTestProgress + '" /> % 이상 응시 가능 (값을 입력하지 않으면 50%로 자동 등록)';
            writes += '</div>'
            writes += '</li>';
            //console.log(optWrite['contract']);

            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>계약 여부</h1>'; //계약여부
			// writes += '<select name="contract" class="'+contract+'">'+optWrite['contract']+'</select>';

            writes += '<select name="contract">';
            writes += '<option value="C"' + (contract === 'C' ? ' selected' : '') + '>도입</option>';
            writes += '<option value="B"' + (contract === 'B' ? ' selected' : '') + '>임대</option>';
            writes += '<option value="A"' + (contract === 'A' ? ' selected' : '') + '>자체</option>';
            writes += '</select>';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최종평가,레포트 응시<br> 진도율</h1>';
            if (finalTestProgress == null) {
                finalTestProgress = 80;
            }
            writes += '<input type="tel" name="finalTestProgress" class="year" value="' + finalTestProgress + '" /> % 이상 응시 가능 (값을 입력하지 않으면 80%로 자동 등록)';
            writes += '</div>'
            writes += '</li>';

            //시험제한시간
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>시험제한시간</h1>';
            writes += '<input type="tel" name="testTime" class="year" value="' + testTime + '" /> 분';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>최소진도반영시간</h1>';
            writes += '<input type="tel" name="progressCheckTime" class="year" value="' + progressCheckTime + '" /> 초 (차시당 학습시간을 충족해야 진도율이 반영되는 시간입니다.)';
            writes += '</div>'
            writes += '</li>'
            /*
			//메인노출여부
			writes += '<div class="halfDiv">';
			writes += '<h1>메인노출여부</h1>';
			writes += '<select name="mainView" class="'+mainView+'">';
			writes += '<option value="Y">사용</option>';
			writes += '<option value="N">미사용</option>';
			writes += '</select>';
			writes += '</div>';
			*/

            //수료기준
            writes += '<li>'
            writes += '<h1>수료기준</h1>';
            writes += '<div class="address">';
            writes += '<strong class="price">진도율</strong> : <input type="tel" name="passProgress"  class="year" value="' + passProgress + '" /> %이상&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'
            writes += '<strong class="price">중간평가</strong> : 총점 <input type="tel" name="totalPassMid"  class="year" value="' + totalPassMid + '" />&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'
            writes += '<strong class="price">최종평가</strong> : 총점 <input type="tel" name="totalPassTest"  class="year" value="' + totalPassTest + '" /> 점 중 <input type="tel" name="passTest"  class="year" value="' + passTest + '" /> 점 이상&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'
            writes += '<strong class="price">레포트</strong> : 총점 <input type="tel" name="totalPassReport"  class="year" value="' + totalPassReport + '" /> 점 중 <input type="tel" name="passReport"  class="year" value="' + passReport + '" /> 점 이상&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;'
            writes += '<strong class="price">총점</strong> : <input type="tel" name="passScore"  class="year" value="' + passScore + '" /> 점 이상 수료';
            writes += '</div>';
            writes += '</li>'

            //반영비율
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>반영비율</h1>';
            writes += '<strong class="price">중간평가</strong> : <input type="tel" id="midRate" name="midRate"  class="year" value="' + midRate + '" />%&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;';
            writes += '<strong class="price">최종평가</strong> : <input type="tel" id="testRate" name="testRate"  class="year" value="' + testRate + '" />%&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;';
            writes += '<strong class="price">레포트</strong> : <input type="tel" id="reportRate" name="reportRate"  class="year" value="' + reportRate + '" />%';
            writes += '</div>'
            writes += '<div class="halfDiv">'
            writes += '<h1>맞춤형자료제공</h1>';
            writes += '<select name="setSummary">';
            writes += '<option value="N"';
            if (setSummary == 'N') {
                writes += 'selected="selected"';
            }
            writes += '>사용하지 않음</option>';
            writes += '<option value="Y"';
            if (setSummary == 'Y') {
                writes += 'selected="selected"';
            }
            writes += '>사용</option>';
            writes += '</select>';
            writes += '&nbsp;<button type="button" onClick="summaryInsert(\'' + contentsCode + '\')">자료등록</button>';
            writes += '</div>'
            writes += '</li>';

            //키워드
            writes += '<li>'
            writes += '<div class="halfDiv">'
            writes += '<h1>키워드</h1>'
            if (keyword != null) {
                writes += '<input type="text" name="keyword" value="' + keyword + '"/>';
            } else {
                writes += '<input type="text" name="keyword" value=""/>';
            }
            writes += '</div>'

            writes += '<div class="halfDiv">';
            writes += '<h1>메인대표과정</h1>';
            writes += '<select name="mainContents" class="' + mainContents + '" onchange="changeMainOrder(this.value,\'' + mainOrderBy + '\')">' + optWrite['mainContents'] + '</select>'
            if (seq != '') {
                if (mainContents == 'Y') {
                    writes += '&nbsp;&nbsp;<input type="text" name="mainOrderBy" class="name" value="' + mainOrderBy + '" style="width:60px;"/><span id="totalSpan">번 (현재까지 등록된 순서 : ' + orderByTotal + '번 )</span>';
                }
            }
            writes += '</div>';
            writes += '</li>'

            //과정소개
            writes += '<li>'
            writes += '<h1>과정소개</h1>';
            writes += '<textarea name="intro">' + intro + '</textarea>';
            writes += '</li>'

            //교육대상
            writes += '<li>'
            writes += '<h1>교육대상</h1>';
            writes += '<textarea name="target">' + target + '</textarea>';
            writes += '</li>'

            //교육대상
            writes += '<li>'
            writes += '<h1>교육목표</h1>';
            writes += '<textarea name="goal">' + goal + '</textarea>';
            writes += '</li>'

            //메모
            if (memo == null) {
                memo = '';
            }
            writes += '<li>'
            writes += '<h1>메모</h1>';
            writes += '<textarea name="memo">' + memo + '</textarea>';
            writes += '</li>'

            //23.11.22 추가
            writes += '<li>';
            writes += '<h1>파일현황</h1>';
            writes += '<select name="fileState">';
            writes += fileStates.map((v, i) => {
                return `<option value="${i}" ${i == fileState ? 'selected' : ''}>${v}</option>`;
            }).join('')
            writes += '</select>';
            writes += '</li>';

            //파일현황 메모
            writes += '<li>'
            writes += '<h1>파일현황 메모</h1>';
            writes += '<textarea name="fileStateMemo">' + fileStateMemo + '</textarea>';
            writes += '</li>'

            //SSO 코드
            writes += '<li>'
            writes += '<h1>SSO코드</h1>';
            writes += '<input type="text" name="ssoCode" class="name" value="' + ssoCode + '" /> ※ 안전교육기술원 LMS 수강연동 시 전달받은 과정코드를 입력합니다.';
            writes += '</li>'

            writes += '<li>'
            writes += '<h1>인사쟁이 교육날짜</h1>';
            writes += '<input type="text" name="educenterLectureDay" class="name" placeholder="2024-01-01" value="' + educenterLectureDay + '" /> ※ 인사쟁이 교육 날짜 입력';
            writes += '</li>'

            writes += '</ul>';
            writes += '<div class="btnArea">';
            //writes += '<button type="button" onClick="multipartSendData(\'writeform\')">';
            writes += '<button type="button" onClick="resSubmit()">';
            if (seq == '') {
                writes += '등록하기';
            } else {
                writes += '수정하기';
            }
            writes += '</button>';
            writes += '<button type="button" onClick="deleteContents(\'' + contentsCode + '\')">삭제하기</button>';
            writes += '<button type="button" onClick="contentsCopy()">복사하기</button>';
            writes += '<button type="button" onClick="listAct()">목록보기</button>';
            writes += '</div>';
            writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
            writes += '</form>';
        } else if (writeType == 'chapterWrite' || writeType == 'testWrite' || writeType == 'reportWrite') {
            //과정 매핑등록
            /*
			writes += '<h1>'+contentsName+'&nbsp;<span>[&nbsp;'+contentsCode+'&nbsp;]</span></h1>';
			writes += '<h2>타 과정에서 가져오기</h2>'
			writes += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
			writes += '<select name="searchType">';
			writes += '<option value="contentsName">과정명</option>';
			writes += '<option value="contentsCode">과정코드</option>';
			writes += '<option value="phone">CP사</option>';
			writes += '</select>&nbsp;';
			writes += '<input type="text" class="subject" name="searchValue" />&nbsp;';
			writes += '</form>'
			writes += '&nbsp</div>';
			*/

            //등록차시 불러오기
            if (loginUserLevel != 7 && loginUserLevel != 9) {
                writes += '<h1>' + contentsName + '</h1><p>※ 수강을 했거나 진행중인 과정의 평가문항을 삭제하면 데이터 오류가 발생할 수 있습니다.</p>';
            }
            if (writeType == 'testWrite' || writeType == 'reportWrite') {
                if (writeType == 'testWrite') {
                    if (testType == 'mid') {
                        writes += '<h2>중간평가 문항보기</h2>'
                    } else {
                        writes += '<h2>최종평가 문항보기</h2>'
                    }
                    writes += '<div class="BBSList">'
                    writes += '<table class="sortArea" style="margin-bottom:5px;"><thead>';
                    writes += '<th style="width:20%">진위형 문항수 | 출제수</th>';
                    writes += '<th style="width:20%">객관식 문항수 | 출제수</th>';
                    writes += '<th style="width:20%">단답형 문항수 | 출제수</th>';
                    writes += '<th style="width:20%">서술형 문항수 | 출제수</th>';
                    writes += '<th style="width:20%">문제연결</th>';
                } else if (writeType == 'reportWrite') {
                    writes += '<h2>과제 문항보기</h2>'
                    writes += '<div class="BBSList">'
                    writes += '<table class="sortArea" style="margin-bottom:5px;"><thead>';
                    writes += '<th style="width:50%;">문항수</th>';
                    writes += '<th style="width:50%;">복사/삭제</th>';
                }
                writes += '</thead><tbody>';
                writes += '</tbody></table>';
            } else if (writeType == 'chapterWrite') {
                writes += '<h2>차시 정보</h2>';
                if (loginUserLevel != 7 && loginUserLevel != 9) {
                    writes += '<button class="chapterButton" type="button" onclick="allDelete2(\'' + contentsCode + '\',\'chapterWrite\');">전체삭제</button>';
                }
                writes += '<div style="clear:both;"></div>';
                writes += '<div class="BBSList">';
            }
            writes += '<table class="listArea"><thead>';
            if (writeType == 'chapterWrite') {
                writes += '<th style="width:50px">차시</th>';
                writes += '<th>차시명</th>';
                writes += '<th style="width:150px;">학습시간(초)</th>';
                writes += '<th style="width:150px;">미리보기</th>';
                if (loginUserLevel <= 4) {
                    writes += '<th style="width:180px;">복사/삭제</th>';
                }
            } else if (writeType == 'testWrite') {
                writes += '<th style="width:60px">문제번호</th>';
                writes += '<th style="width:80px;">문제유형</th>';
                writes += '<th>문제</th>';
                writes += '<th style="width:80px;">등록체크</th>';
                writes += '<th style="width:80px;">배점</th>';
                writes += '<th style="width:80px;">출처차시</th>';
                writes += '<th style="width:60px;">출제문제수</th>';
                writes += '<th style="width:180px;">복사/삭제</th>';
            } else if (writeType == 'reportWrite') {
                writes += '<th style="width:60px">문제번호</th>';
                writes += '<th>문제</th>';
                writes += '<th style="width:80px;">배점</th>';
                writes += '<th style="width:60px;">출처차시</th>';
                writes += '<th style="width:180px;">복사/삭제</th>';
            }
            writes += '</thead><tbody>';
            writes += '</tbody></table>';
            writes += '</div>';

            writes += '<div class="btnArea">';
            writes += '<button type="button" onClick="listAct()">목록보기</button>';
            writes += '</div>';

            if (loginUserLevel <= 4) {
                //파일등록
                writes += '<h2>파일로 업로드하기</h2>'
                if (writeType == 'chapterWrite') {
                    writes += '<form class="fileUploadform" method="post" action="chapterUpload.php" enctype="multipart/form-data">';
                } else if (writeType == 'testWrite') {
                    writes += '<form class="fileUploadform" method="post" action="testUpload.php" enctype="multipart/form-data">';
                } else if (writeType == 'reportWrite') {
                    writes += '<form class="fileUploadform" method="post" action="reportUpload.php" enctype="multipart/form-data">';
                }
                writes += '<ul>';
                writes += '<li>'
                writes += '<h1>등록양식</h1>'
                if (writeType == 'chapterWrite') {
                    //차시등록 xls예시
                    writes += '<button type="button" onclick="location.href=\'../attach/contents/차시등록(양식).xlsx\'">양식 내려받기</button>&nbsp;';
                    writes += '<button type="button" onclick="location.href=\'../attach/contents/차시등록(샘플).xlsx\'">샘플보기</button>&nbsp;';
                    writes += '<button type="button" onclick="excelAct(\'' + contentsCode + '\')">차시정보 내려받기</button>';
                    writes += '&nbsp;<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
                } else if (writeType == 'testWrite') {
                    //문제등록 xls예시
                    //writes += '<button type="button" onclick="location.href=\'../attach/contents/평가등록(양식).xlsx\'">양식 내려받기</button>&nbsp;';
                    writes += '<button type="button" onclick="location.href=\'../attach/contents/평가등록(샘플).xlsx\'">샘플보기</button>&nbsp;';
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}&testType=mid" style="
    text-decoration: none;
    color: black;
" target="_blank">중간평가</a></button>&nbsp;`;
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}&testType=final" style="
    text-decoration: none;
    color: black;
" target="_blank">최종평가</a></button>&nbsp;`;
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}" style="
    text-decoration: none;
    color: black;
" target="_blank">과제</a></button>&nbsp;`;
                    writes += '<strong>내려받기</strong>&nbsp;&nbsp;&nbsp;&nbsp;'
                    writes += '<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
                } else if (writeType == 'reportWrite') {
                    //과제등록 xls예시
                    writes += '<button type="button" onclick="location.href=\'../attach/contents/과제등록(양식).xlsx\'">양식 내려받기</button>&nbsp;';
                    writes += '<button type="button" onclick="location.href=\'../attach/contents/과제등록(샘플).xlsx\'">샘플보기</button>&nbsp;';
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}&testType=mid" style="
    text-decoration: none;
    color: black;
" target="_blank">중간평가</a></button>&nbsp;`;
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}&testType=final" style="
    text-decoration: none;
    color: black;
" target="_blank">최종평가</a></button>&nbsp;`;
                    writes += `<button type="button"><a href="/admin/CSVofReportOrTest.php?contentsCode=${contentsCode}" style="
    text-decoration: none;
    color: black;
" target="_blank">과제</a></button>&nbsp;`;
                    writes += '<strong>내려받기</strong>&nbsp;&nbsp;&nbsp;&nbsp;'
                    writes += '<strong class="price">(샘플파일 확인 후 등록하시기 바랍니다.)</strong>'
                }
                writes += '</li>'
                writes += '<li>'
                writes += '<h1>파일등록</h1>'
                writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit">파일업로드</button>'
                writes += '</li>'
                writes += '</ul>';
                writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
                writes += '</form>'

                if (writeType == 'chapterWrite') {
                    writes += '<h2>파일로 업로드하기(차시별 시간)     ex) 엑셀 7행부터 데이터 시작, 총재생시간 분: F열7행 / 초:G열7행 </h2>'
                    writes += '<form class="fileUploadform2" method="post" action="chapterTimeUpload.php" enctype="multipart/form-data">';
                    writes += '<input type="hidden" name="contentsCode" value="' + contentsCode + '" />';
                    writes += '<ul>';
                    writes += '<li>'
                    writes += '<h1>파일등록</h1>'
                    writes += '<input type="file" name="uploadFile2" />&nbsp;<button type="submit">파일업로드</button>'
                    writes += '</li>'
                    writes += '</ul>';
                    writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
                    writes += '</form>'
                }


                //개별등록,수정
                writes += '<h2><a name="bottom">개별등록/수정</a></h2>'
                if (writeType == 'chapterWrite') {
                    writes += '<form class="writeform" method="post" action="' + chapterApi + '" enctype="multipart/form-data">';
                } else if (writeType == 'testWrite') {
                    writes += '<form class="writeform" method="post" action="' + testApi + '" enctype="multipart/form-data">';
                } else if (writeType == 'reportWrite') {
                    writes += '<form class="writeform" method="post" action="' + reportApi + '" enctype="multipart/form-data">';
                }
                writes += '<input type="hidden" name="seq" />'
                writes += '<input type="hidden" name="contentsCode" value="' + contentsCode + '" />'
                writes += '<input type="hidden" name="testType" value="' + testType + '">';
                writes += '<ul>';

                if (writeType == 'chapterWrite') {
                    //차시번호
                    writes += '<li>';
                    writes += '<h1>차시번호</h1>';
                    writes += '<input type="tel" class="month" name="chapter" /> 차시';
                    writes += '</li>';
                    //차시명
                    writes += '<li>';
                    writes += '<h1>차시명</h1>';
                    writes += '<input type="text" class="subject" name="chapterName" />';
                    writes += '</li>';
                    //차시목표
                    writes += '<li>';
                    writes += '<h1>차시목표</h1>';
                    writes += '<textarea name="goal"></textarea>';
                    writes += '</li>';
                    //훈련내용
                    writes += '<li>';
                    writes += '<h1>훈련내용</h1>';
                    writes += '<textarea name="content"></textarea>';
                    writes += '</li>';
                    //학습활동
                    writes += '<li>';
                    writes += '<h1>학습활동</h1>';
                    writes += '<textarea name="activity"></textarea>';
                    writes += '</li>';
                    //내용전문가, 차시프레임수
                    writes += '<li>';
                    writes += '<div class="halfDiv">';
                    writes += '<h1>차시 페이지 수</h1>';
                    writes += '<input type="tel" class="year" name="chapterSize" />';
                    writes += '</div>';
                    writes += '<div class="halfDiv">';
                    writes += '<h1>모바일 페이지 수</h1>';
                    writes += '<input type="tel" class="year" name="chapterMobileSize" />';
                    writes += '</div>';
                    writes += '</li>';
                    //차시별 학습시간
                    writes += '<li>';
                    writes += '<h1>차시 학습시간</h1>';
                    writes += '<input type="text" class="subject" style="width:80px;" name="chapterTime" />';
                    writes += '</li>';
                    //모바일 데이터 용량
                    writes += '<li>';
                    writes += '<h1>모바일 데이터 용량</h1>';
                    writes += '약 <input type="tel" class="year" name="mobileDataSize" /> MB (모바일 수강 입장 시 데이터 용량을 알려줍니다.)';
                    writes += '</li>';
                    //플레이어 경로
                    writes += '<li>';
                    writes += '<h1>플레이어 경로</h1>';
                    writes += '<input type="text" class="subject" name="player" />';
                    writes += '</li>';
                    //서버경로
                    writes += '<li>';
                    writes += '<h1>서버경로</h1>';
                    writes += '<input type="text" class="subject" name="chapterPath" />';
                    writes += '</li>';
                    //모바일경로
                    writes += '<li>';
                    writes += '<h1>모바일경로</h1>';
                    writes += '<input type="text" class="subject" name="chapterMobilePath" />';
                    writes += '</li>';

                } else if (writeType == 'testWrite') {
                    //문제번호,문제분류
                    writes += '<li>';
                    writes += '<div class="halfDiv">'
                    writes += '<h1>문제번호</h1>';
                    writes += '<input type="tel" name="examNum" class="year">';
                    writes += '</div>'
                    writes += '<div class="halfDiv">'
                    writes += '<h1>문제분류</h1>';
                    writes += '<select name="examType" id="examType" onchange="changeInput(this);">' + optWrite['examType'] + '</select>';
                    writes += '</div>'
                    writes += '</li>';
                    //배점,출처차시
                    writes += '<li>';
                    writes += '<div class="halfDiv">'
                    writes += '<h1>배점</h1>';
                    writes += '<input type="tel" name="score" class="year">';
                    writes += '</div>'
                    writes += '<div class="halfDiv">'
                    writes += '<h1>출처차시</h1>';
                    writes += '<input type="tel" name="sourceChapter" class="year">';
                    writes += '</div>'
                    writes += '</li>';
                    //출처차시당 출제문제 갯수
                    writes += '<li>';
                    writes += '<h1>출제문제수</h1>';
                    writes += '<input type="tel" name="munNum" class="year">';
                    writes += '</li>';
                    //지문내용
                    writes += '<li><h1>지문내용<br /><br />';
                    writes += '<button type="button" onClick="editorOpen(\'' + testApi + '\',\'exam\',\'' + writeType + '\')">내용편집</button>';
                    writes += '</h1>'
                    writes += '<div class="textInputs">';
                    writes += '<div id="exam" class="examView" onClick="editorOpen(\'' + testApi + '\',\'exam\',\'' + writeType + '\')"></div>';
                    writes += '<textarea name="exam" style="display:none;"></textarea>'
                    writes += '</div>'
                    writes += '</li>';
                    //보기
                    for (i = 1; i < 6; i++) {
                        writes += '<li class="answerA"><h1>보기 ' + i + '.<br />';
                        writes += '[ 정답 : <input type="checkbox" name="answer" id="answer' + i + '" value="' + i + '" /><label for="answer' + i + '"></label>]<br />';
                        writes += '<button type="button" onClick="editorOpen(\'' + testApi + '\',\'example0' + i + '\')">내용편집</button>';
                        writes += '</h1>'
                        writes += '<div class="textInputs">';
                        writes += '<div id="example0' + i + '" class="examView" onClick="editorOpen(\'' + testApi + '\',\'example0' + i + '\')"></div>';
                        writes += '<textarea name="example0' + i + '" style="display:none;"></textarea>'
                        writes += '</div>';
                        writes += '</li>';
                    }
                    //해설내용
                    writes += '<li><h1>해설내용(채점기준)<br /><br />';
                    writes += '<button type="button" onClick="editorOpen(\'' + testApi + '\',\'commentary\')">내용편집</button>';
                    writes += '</h1>';
                    writes += '<div class="textInputs">';
                    writes += '<div id="commentary" class="examView" onClick="editorOpen(\'' + testApi + '\',\'commentary\')"></div>';
                    writes += '<textarea name="commentary" style="display:none;"></textarea>'
                    writes += '</div>';
                    writes += '</li>';
                    if (loginUserLevel == '7' || loginUserLevel < '4') {
                        //참고내용
                        /* 20230126 dhk remove reference
						writes += '<li><h1>채점 참고사항<br /><br />';
						writes += '<button type="button" onClick="editorOpen(\''+testApi+'\',\'reference\')">내용편집</button>';
						writes += '</h1>';
						writes += '<div class="textInputs">';
						writes += '<div id="reference" class="examView" onClick="editorOpen(\''+testApi+'\',\'reference\')"></div>';
						writes += '<textarea name="reference" style="display:none;"></textarea>'
						writes += '</div>';
						writes += '</li>';
						*/
                        // 20230126 end
                    }
                    //정답입력
                    //writes += '<li class="textInputs" style="display:none"><h1>정답입력</h1>';
                    //writes += '<textarea name="answerText"></textarea>';
                    //writes += '</li>';

                    //정답입력
                    writes += '<li><h1>정답입력<br /><br />';
                    writes += '<button type="button" onClick="editorOpen(\'' + testApi + '\',\'answerText\')">내용편집</button>';
                    writes += '</h1>';
                    writes += '<div class="textInputs">';
                    writes += '<div id="answerText" class="examView" onClick="editorOpen(\'' + testApi + '\',\'answerText\')"></div>';
                    writes += '<textarea name="answerText" style="display:none;"></textarea>'
                    writes += '</div>';
                    writes += '</li>';

                } else if (writeType == 'reportWrite') {
                    //문제번호, 출처차시
                    writes += '<li>';
                    writes += '<div class="halfDiv">';
                    writes += '<h1>문제번호</h1>';
                    writes += '<input type="text" class="year" name="examNum" /> 번';
                    writes += '</div>';
                    writes += '<div class="halfDiv">';
                    writes += '<h1>출처차시</h1>';
                    writes += '<input type="tel" class="year" name="sourceChapter" /> 차시';
                    writes += '</div>';
                    writes += '</li>';
                    //과제등록
                    writes += '<li>';
                    writes += '<h1>과제등록';
                    writes += '<button type="button" onClick="editorOpen(\'' + reportApi + '\',\'exam\',\'report\')">내용편집</button>';
                    writes += '</h1>';
                    writes += '<div class="textInputs">';
                    writes += '<input type="file" name="examAttach" /><br />';
                    writes += '<div id="exam" class="examView" onClick="editorOpen(\'' + reportApi + '\',\'exam\',\'report\')"></div>';
                    writes += '<textarea name="exam" style="display:none"></textarea>';
                    writes += '</li>';
                    //답안등록
                    writes += '<li>';
                    writes += '<h1>답안등록';
                    writes += '<button type="button" onClick="editorOpen(\'' + reportApi + '\',\'example\',\'report\')">내용편집</button>';
                    writes += '</h1>';
                    writes += '<div class="textInputs">';
                    writes += '<input type="file" name="exampleAttach" /><br />';
                    writes += '<div id="example" class="examView" onClick="editorOpen(\'' + reportApi + '\',\'example\',\'report\')"></div>';
                    writes += '<textarea name="example" style="display:none"></textarea>';
                    writes += '</li>';
                    if (loginUserLevel == '7' || loginUserLevel < '4') {
                        //참고내용
                        /* 20230126 dhk remove reference
						writes += '<li><h1>채점 참고사항';
						writes += '<button type="button" onClick="editorOpen(\''+reportApi+'\',\'reference\')">내용편집</button>';
						writes += '</h1>';
						writes += '<div class="textInputs">';
						writes += '<input type="file" name="referenceAttach" /><br />';
						writes += '<div id="reference" class="examView" onClick="editorOpen(\''+reportApi+'\',\'reference\',\'report\')"></div>';
						writes += '<textarea name="reference" style="display:none;"></textarea>'
						writes += '</div>';
						writes += '</li>';
						*/
                        //20230126dhk end
                    }
                    //답안등록
                    writes += '<li>';
                    writes += '<h1>채점기준';
                    writes += '<button type="button" onClick="editorOpen(\'' + reportApi + '\',\'rubric\',\'report\')">내용편집</button>';
                    writes += '</h1>';
                    writes += '<div class="textInputs">';
                    writes += '<input type="file" name="rubricAttach" /><br />';
                    writes += '<div id="rubric" class="examView" onClick="editorOpen(\'' + reportApi + '\',\'rubric\',\'report\')"></div>';
                    writes += '<textarea name="rubric" style="display:none"></textarea>';
                    writes += '</li>';
                    //답안등록
                    writes += '<li>';
                    writes += '<h1>점수</h1>';
                    writes += '<input type="tel" class="year" name="score">';
                    writes += '</li>';
                }
                writes += '</ul>';

                writes += '<div class="btnArea">';
                writes += '<button type="button" onClick="resetInput()">초기화</button>';
                writes += '<button type="button" onClick="sendContens(\'' + contentsCode + '\',\'' + writeType + '\', \'' + testType + '\')">등록하기</button>';
                writes += '<button type="button" onClick="listAct()">목록보기</button>';
                writes += '</div>';
                writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
                writes += '</form>';
            }
        }

        $('#contentsArea').removeAttr('class')
        $('.BBSList').remove();
        $('#contentsArea').addClass('BBSWrite')
        $('#contentsArea').html(writes);
//		if(writeType == 'contentsWrite' && seq != '') {
//			limitPrice();
//		}

        if (writeType == 'tracse') {
            var writes = '';

            writes += '<h1>' + testType + '</h1>'
            writes += '<h2>실시회차 등록</h2>'
            writes += '<form class="writeHrdform" method="post">';
            writes += '<ul>';
            writes += '<input type="hidden" id="writeContentsCode" value="' + writeSeq + '">'
            writes += '<li>';
            writes += '<div class="halfDiv">';
            writes += '<h1 id="writeHrdCodeS">HRD 코드</h1>';
            writes += '</div>';
            writes += '<div class="halfDiv">';
            writes += '<h1>개설용도</h1>';
            writes += '<select id="writeHrdServiceType"><option value="1">사업주지원(환급)</option><option value="3">비환급(평가없음)</option><option value="5">비환급(평가있음)</option></select>';
            writes += '</div>';
            writes += '</li>';
            writes += '<li>';
            writes += '<div class="halfDiv">';
            writes += '<h1>수강기간</h1>';
            writes += '<div class="datePicker"><input type="text" id="writeHrdStart" name="writeHrdStart" class="cal"  value="" readonly="readonly" /> ~ </div>';
            writes += '<div class="datePicker">&nbsp;<input type="text" id="writeHrdEnd" name="writeHrdEnd" class="cal"  value="" readonly="readonly" /></div>';
            writes += '</div>';
            writes += '<div class="halfDiv">';
            writes += '<h1>실시회차</h1>';
            writes += '<input type="text" id="writeOpenChapter" name="writeOpenChapter">';
            writes += '</div>';
            writes += '</li>';
            writes += '</ul>';
            writes += '<div class="btnArea">';
            writes += '<button type="button" onClick="writeHrd()">등록하기</button>';
            writes += '</div>';
            writes += '</form>';

            writes += '<h2>실시회차 조회</h2>'
            writes += '<form class="listform" method="post">';
            writes += '<ul>';
            writes += '<input type="hidden" id="hrdContentsCode" value="' + writeSeq + '">'
            writes += '<li>';
            writes += '<div class="halfDiv">';
            writes += '<h1 id="hrdCodeS">HRD 코드</h1>';
            writes += '</div>';
            writes += '<div class="halfDiv">';
            writes += '<h1>개설용도</h1>';
            writes += '<select id="hrdServiceType"><option value="1">사업주지원(환급)</option><option value="3">비환급(평가없음)</option><option value="5">비환급(평가있음)</option></select>';
            writes += '</div>';
            writes += '</li>';
            writes += '</ul>';
            writes += '<div class="btnArea">';
            writes += '<button type="button" onClick="searchHrdCode()">조회하기</button>';
            writes += '<button type="button" onClick="listAct()">목록보기</button>';
            writes += '</div>';
            writes += '</form>';

            var contents = '';
            contents += '<div id="hrdContents" class="BBSList">'
            contents += '<table><thead><tr>';
            contents += '<th style="width:10%;">번호</th>';
            contents += '<th style="width:15%;">HRD코드</th>';
            contents += '<th style="width:10%;">수업PK</th>';
            contents += '<th style="width:25%;">개설용도</th>';
            contents += '<th style="width:15%;">수강일</th>';
            contents += '<th style="width:10%;">실시회차</th>';
            contents += '<th style="width:15%;">수정 / 삭제</th>';
            contents += '</tr></thead><tbody><tr><td colspan=7>조회하기를 클릭해 주세요.</td></tr></tbody></table></div>';

            $('#contentsArea').removeAttr('class')
            $('#contentsArea').addClass('BBSWrite')
            $('#contentsArea').html(writes);
            $('#contentsArea').after(contents);
            contentsHrdCode(writeSeq);
            writeHrdCode(writeSeq);

        }

        matchingList(contentsCode, writeType, testType);
        findOpt();//selct 선택자 찾기
        emailSelect();//이메일 select 호출 사용시 같이 호출
        pickerAct();//데이트피커 사용
        fileformAct();//파일 첨부 사용시
        var mustInput = '&nbsp;&nbsp;<strong class="price">(*)</strong>';
        $('.mustCheck > h1').append(mustInput)//필수요소 사용
        changeSortw2(sort01, sort02, 1);
        changeLectureType();
    }
}

//카테고리 두번째 셀렉트박스 생성
function changeSortw2(obj, sort2value, v) {
    //alert(obj+'//'+sort2value);
    obj = (v == 1) ? obj : obj.options[obj.selectedIndex].value;
    sort2value = sort2value ? sort2value : '';

    $('select[name="sort02"]').remove();
    if (obj != '') {
        $.get(categoryApi, {'value01': obj, 'allType': 'ALL'}, function (data) {
            var selectWrite = '';
            selectWrite += ' <select name="sort02" class="' + sort2value + '" >';
            selectWrite += '<option value="">소분류 선택</option>';
            $.each(data.category, function () {
                if (this.value01 == sort2value) { // 2차 카테고리 선택 값 찾기
                    selectWrite += '<option value="' + this.value01 + '" selected>';
                } else {
                    selectWrite += '<option value="' + this.value01 + '">';
                }
                selectWrite += this.value02;
                selectWrite += ' </option>';
            })
            selectWrite += '</select>'
            //alert(selectWrite);
            $('select[name="sort01"]').after(selectWrite);

        })
    }
}

function changeMainOrder(orderV, mainOrderBy) {
    var chkApiRun = $.get(useApi, {'list': 0, 'page': 1}, function (data) {
        var nowChk = data.orderByTotal;
        if (orderV == 'Y') {
            $('select[name="mainContents"]').after('&nbsp;&nbsp;<span class="totalSpan" style="width:50px;">순서설정:</span> <input id="hiddenInput" type="text" name="mainOrderBy" class="name" value="' + mainOrderBy + '" style="width:60px;"/><span id="totalSpan"> 번 (현재까지 등록된 순서 : ' + nowChk + '번 )</span>');
        } else {
            $('#hiddenInput').remove();
            $('input[name="mainOrderBy"]').remove();
            $('#totalSpan').remove();
            $('.totalSpan').remove();
            $('#totalSpan').css('display', 'none');
            $('.totalSpan').css('display', 'none');
        }
    })
}

function viewAct(seq) {
    writeAct(seq)
}

function sampleID(contentsCode) {
    if (confirm('콘텐츠 심사용 아이디를 등록하시겠습니까?')) {
        $.ajax({
            url: sampleIDApi,
            type: 'POST',
            data: 'contentsCode=' + contentsCode,
            success: function () {
                alert('등록되었습니다.');
                ajaxAct();
            }
        })
    }
}

function changeInput(vals) {
    vals = vals.value;
    if (vals == 'A') {
        $('.answerB').css('display', 'none')
        $('.answerA').css('display', 'list-item')
    } else if (vals != 'A') {
        $('.answerA').css('display', 'none')
        $('.answerB').css('display', 'list-item')
    }
}

//챕터 리셋 등록
function writeChapter() {
    var sendData = $('.writeform').serialize();
    var contentsCodes = $('.writeform input[name="contentsCode"]').val();
    $.ajax({
        url: chapterApi,
        type: 'POST',
        data: sendData,
        success: function () {
            if ($('.writeform input[name="seq"]').val() == '') {
                alert('등록되었습니다.')
            } else {
                alert('수정되었습니다.')
            }
            chapterList(contentsCodes);
        }
    })
}

function resetInput() {
    if ($('.writeform input').prop('name') != 'contentsCode') {
        $('.writeform input[type="text"], .writeform input[type="tel"], .writeform input[name="seq"], .writeform input[type="file"]').val('');
        $('label.AttachFiles span').html('파일찾기')
        $('.writeform textarea, .writeform div.examView').html('');
        $('input[type="checkbox"]').prop('checked', false);
        $('div.attachFile').each(function () {
            var deleteDiv = $(this);
            var inputName = $(this).attr('id');
            deleteDiv.parent('div').children('input[type="checkbox"]').remove();
            var preLabel = '';
            preLabel += '<label class="AttachFiles"><span>파일찾기</span>';
            preLabel += '<input type="file" name="' + inputName + '" style="display:none" onchange="fileAddAct(this,\'' + inputName + '\')" />';
            preLabel += '</label>';
            deleteDiv.after(preLabel);
            deleteDiv.remove()
        });
    }
    $('.writeform button[type="submit"]').html('등록하기')
}

//챕터 불러오기
function matchingList(codes, types, testType) {
    testType = testType ? testType : '';
    testType = testType == 'undefined' ? '' : testType;
    var matchingApi = '';
    if (writeType == 'chapterWrite') {
        matchingApi = chapterApi;
    } else if (writeType == 'testWrite') {
        matchingApi = testApi;
    } else if (writeType == 'reportWrite') {
        matchingApi = reportApi;
    }
    var writeAjax = $.get(matchingApi, {'contentsCode': codes, 'testType': testType}, function (data) {
        var contentsCodes = data.contentsCode;
        var sortCount = data.totalCount;
        var chapterLists = '';
        var sortLists = '';
        var aTypeEA = '';
        var bTypeEA = '';
        var cTypeEA = '';
        var dTypeEA = '';
        var test01EA = '';
        var test02EA = '';
        var test03EA = '';
        var test04EA = '';
        if (types == 'testWrite') {
            aTypeEA = data.aTypeEA;
            bTypeEA = data.bTypeEA;
            cTypeEA = data.cTypeEA;
            dTypeEA = data.dTypeEA;
            if (testType == 'mid') {
                test01EA = data.mid01EA;
                test02EA = data.mid02EA;
                test03EA = data.mid03EA;
                test04EA = data.mid04EA;
            } else {
                test01EA = data.test01EA;
                test02EA = data.test02EA;
                test03EA = data.test03EA;
                test04EA = data.test04EA;
            }
        }
        if (sortCount != 0) {
            if (writeType == 'chapterWrite') {
                $.each(data.chapter, function () {
                    chapterLists += '<tr>';
                    chapterLists += '<td>';
                    //if(this.chapter >= 100){
                    //	chapterLists += '-';
                    //}else{
                    chapterLists += this.chapter;
                    //}
                    chapterLists += '</td>';
                    chapterLists += '<td class="left" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\')" style="cursor:pointer;">' + this.chapterName + '</td>'
                    chapterLists += '<td>' + this.chapterTime + '</td>';
                    chapterLists += '<td>';

                    if (data.sourceType == 'book') {
                        var Sid = data.contentsCode + '000000999999' + loginUserID;
                        var Chasi = this.chapter < 10 ? '0' + this.chapter : this.chapter;
                        var screenWidth = screen.width;
                        var screenHeight = screen.height;
                        var popupAddress = '/viewer/index.html?Sid=' + Sid + '&Code=' + contentsCodes + '&Chasi=' + Chasi + '&Page=99&MovePage=1&PreView=Y';
                        chapterLists += '<button type="button" onClick="window.open(\'' + popupAddress + '\',\'학습창\',\'top=0,left=0,height=\'+(screen.height-100)+\',width=\'+screen.width+\',location=yes,menubar=no,status=no,titlebar=yes,toolbar=no,scrollbars=no,resizeable=no,fullscreen=yes\',\'Study\')">PC</button>&nbsp;/&nbsp;';
                        if (data.mobile == 'Y') {
                            chapterLists += '<button type="button" onClick="window.open(\'' + popupAddress + '\',\'학습창\',\'top=0,left=0,width=600,height=880,location=no,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no\',\'Study\')">모바일</button>';
                        } else {
                            chapterLists += '-';
                        }
                    } else {
                        // var PCLink = this.player+'/player/popupConfirm.php?contentsCode='+contentsCodes+'&chapter='+this.chapter+'&sourceType='+data.sourceType;
                        // var mobileLink = 'mobilePreview.html?contentsCode='+contentsCodes+'&chapter='+this.chapter;
                        var PCLink = '/admin/studyPreview.php?contentsCode=' + contentsCodes + '&chapter=' + this.chapter + '&type=pc';
                        var mobileLink = '/admin/studyPreview.php?contentsCode=' + contentsCodes + '&chapter=' + this.chapter + '&type=mobile';
                        //var mp4Link = '../player/mp4_player_admin.php?contentsCode='+contentsCode+'&chapter='+this.chapter;
                        chapterLists += '<button type="button" onClick="window.open(\'' + PCLink + '\',\'학습창\',\'top=0,left=0,location=yes,menubar=no,status=no,titlebar=yes,toolbar=no,scrollbars=no,resizeable=no\',\'Study\')">PC</button>&nbsp;/&nbsp;';
                        if (data.mobile == 'Y') {
                            chapterLists += '<button type="button" onClick="window.open(\'' + mobileLink + '\',\'학습창\',\'top=0,left=0,location=no,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no\',\'Study\')">모바일</button>';
                        } else {
                            chapterLists += '-';
                        }
                    }

                    if (loginUserLevel <= 4) {
                        chapterLists += '<td>';
                        chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\')">수정</button>&nbsp;/&nbsp;';
                        chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'copy\')">복사</button>&nbsp;/&nbsp;';
                        chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'delete\')">삭제</button>';
                        chapterLists += '</td>'
                    }
                    chapterLists += '</tr>'
                })
            } else if (writeType == 'testWrite') {
                var examCheck = '';
                sortLists += '<tr>'
                sortLists += '<td>' + dTypeEA + ' | ' + test04EA + '</td>';
                sortLists += '<td>' + aTypeEA + ' | ' + test01EA + '</td>';
                sortLists += '<td>' + bTypeEA + ' | ' + test02EA + '</td>';
                sortLists += '<td>' + cTypeEA + ' | ' + test03EA + '</td>';
                sortLists += '<td>';
                sortLists += '<button type="button" onClick="allDelete(\'' + codes + '\',\'testWrite\',\'' + testType + '\')">전체삭제</button>&nbsp;/&nbsp;';
                sortLists += '<button type="button" onClick="modalAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ')">문제매핑</button>&nbsp;/&nbsp;';
                sortLists += '<button type="button" onClick="previewAct(\'' + codes + '\',\'' + types + '\',\'' + testType + '\')">전체보기</button>&nbsp;/&nbsp;';
                sortLists += '<button type="button" onClick="getGrandTotalScore(\'' + contentsCodes + '\')">산업안전 배점체크</button>';
                sortLists += '</td>';
                sortLists += '</tr>'
                $.each(data.test, function () {
                    chapterLists += '<tr class="line' + this.seq + '">';
                    chapterLists += '<td>' + this.examNum + '</td>';
                    chapterLists += '<td>';
                    if (this.examType == 'A') {
                        chapterLists += '객관식';
                        if (this.answer == '' || this.answer == null) {
                            examCheck = '정답누락';
                        }
                    } else if (this.examType == 'B') {
                        chapterLists += '단답형'
                        if (this.answerText == '' || this.answerText == null) {
                            examCheck = '정답누락';
                        }
                    } else if (this.examType == 'C') {
                        chapterLists += '서술형'
                        if (this.answerText == '' || this.answerText == null) {
                            examCheck = '정답누락';
                        }
                    } else if (this.examType == 'D') {
                        chapterLists += '진위형'
                        if (this.answer == '' || this.answer == null) {
                            examCheck = '정답누락';
                        }
                    }
                    if (this.commentary == '') {
                        examCheck += ' 해설누락';
                    }

                    if (examCheck == '') {
                        examCheck = '정상';
                    }

                    chapterLists += '</td>';
                    chapterLists += '<td class="left" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\',\'' + testType + '\')" style="cursor:pointer;">' + this.exam + '</td>';
                    chapterLists += '<td>' + examCheck + '</td>';
                    chapterLists += '<td>' + this.score + '</td>';
                    chapterLists += '<td>' + this.sourceChapter + '</td>';
                    chapterLists += '<td>' + this.munNum + '</td>';
                    chapterLists += '<td>';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\',\'' + testType + '\')">수정</button>&nbsp;/&nbsp;';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'copy\',\'' + testType + '\')">복사</button>&nbsp;/&nbsp;';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'delete\',\'' + testType + '\')">삭제</button>';
                    chapterLists += '</td>';
                    chapterLists += '</tr>';
                    examCheck = '';
                })
            } else if (writeType == 'reportWrite') {
                sortLists += '<tr>'
                sortLists += '<td>' + sortCount + '</td>';
                sortLists += '<td>';
                sortLists += '<button type="button" onClick="allDelete(\'' + codes + '\',\'reportWrite\',\'\')">전체삭제</button>&nbsp;/&nbsp;';
                sortLists += '<button type="button" onClick="modalAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ')">문제매핑</button>&nbsp;/&nbsp;';
                sortLists += '<button type="button" onClick="previewAct(\'' + codes + '\',\'' + types + '\',\'' + testType + '\')">전체보기</button>';
                sortLists += '</td>';
                sortLists += '</tr>'
                $.each(data.report, function () {
                    chapterLists += '<tr class="line' + this.seq + '">'
                    chapterLists += '<td>' + this.examNum + '</td>'
                    chapterLists += '<td class="left" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\')" style="cursor:pointer;">' + this.exam.replace(/\n/g, '<br />') + '</td>'
                    chapterLists += '<td>' + this.score + '</td>'
                    chapterLists += '<td>' + this.sourceChapter + '</td>'
                    chapterLists += '<td>';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'modify\')">수정</button>&nbsp;/&nbsp;';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'copy\')">복사</button>&nbsp;/&nbsp;';
                    chapterLists += '<button type="button" onClick="contentsAct(\'' + writeType + '\',\'' + contentsCodes + '\',' + this.seq + ',\'delete\')">삭제</button>';
                    chapterLists += '</td>'
                    chapterLists += '</tr>'
                })
            }
        } else {
            chapterLists += '<tr><td colspan="20">등록된 정보가 없습니다.</td></tr>';
        }
        if (writeType == 'testWrite' || writeType == 'reportWrite') {
            $('.BBSList table.sortArea tbody').html(sortLists)
        }
        $('.BBSList table.listArea tbody').html(chapterLists)
    })
}

function getGrandTotalScore(contentsCode) {
    $.ajax({
        url: '../api/apiGrandTotalScore.php?contentsCode=' + contentsCode, // 요청을 보낼 PHP 파일 경로
        type: 'GET', // HTTP 요청 방식 (GET 또는 POST)
        dataType: 'json', // 응답 데이터 타입 (JSON 형식으로 처리)
        success: function (data) {
            alert('배점 총합계: ' + data.grandTotalScore + ' 점');
        },
        error: function (xhr, status, error) {
            alert('error - 시스템에 문의 하세요.');
        }
    });
}

//챕터개별 등록,수정,복사
function contentsAct(contypes, codes, seqNum, action, testType) {
    testType = testType ? testType : '';
    var matchingApi = '';
    if (contypes == 'chapterWrite') {
        matchingApi = chapterApi;
    } else if (contypes == 'testWrite') {
        matchingApi = testApi;
    } else if (contypes == 'reportWrite') {
        matchingApi = reportApi;
    }
    $.get(matchingApi, {'seq': seqNum, 'contentsCode': codes, 'testType': testType}, function (data) {
        if (contypes == 'chapterWrite') {
            $.each(data.chapter, function () {
                if (action == 'copy') {
                    var copyDate = ''
                    copyDate += 'seq=&contentsCode=' + codes + '&';
                    copyDate += 'chapter=' + this.chapter + '&';
                    copyDate += 'chapterName' + this.chapterName.replace(/&/g, '%26') + '&';
                    copyDate += 'goal=' + this.goal.replace(/&/g, '%26') + '&';
                    copyDate += 'content=' + this.content.replace(/&/g, '%26') + '&';
                    copyDate += 'activity=' + this.activity.replace(/&/g, '%26') + '&';
                    copyDate += 'professor=' + this.professor.replace(/&/g, '%26') + '&';
                    copyDate += 'player=' + this.player.replace(/&/g, '%26') + '&';
                    copyDate += 'chapterPath=' + this.chapterPath.replace(/&/g, '%26') + '&';
                    copyDate += 'chapterSize=' + this.chapterSize.replace(/&/g, '%26') + '&';
                    copyDate += 'chapterTime=' + this.chapterTime.replace(/&/g, '%26') + '&';
                    copyDate += 'chapterMobilePath=' + this.chapterMobilePath.replace(/&/g, '%26') + '&';
                    copyDate += 'chapterMobileSize=' + this.chapterMobileSize.replace(/&/g, '%26') + '&';
                    copyDate += 'mobileDataSize=' + this.mobileDataSize.replace(/&/g, '%26') + '&';
                    copyAct(copyDate);
                } else if (action == 'modify') {
                    resetInput();
                    $('.writeform input[name="seq"]').val(this.seq);
                    $('.writeform input[name="chapter"]').val(this.chapter);
                    $('.writeform input[name="chapterName"]').val(this.chapterName);
                    $('.writeform textarea[name="goal"]').html(this.goal);
                    $('.writeform textarea[name="content"]').html(this.content);
                    $('.writeform textarea[name="activity"]').html(this.activity);
                    $('.writeform input[name="professor"]').val(this.professor);
                    $('.writeform input[name="player"]').val(this.player);
                    $('.writeform input[name="chapterPath"]').val(this.chapterPath);
                    $('.writeform input[name="chapterSize"]').val(this.chapterSize);
                    $('.writeform input[name="chapterTime"]').val(this.chapterTime);
                    $('.writeform input[name="chapterMobilePath"]').val(this.chapterMobilePath);
                    $('.writeform input[name="chapterMobileSize"]').val(this.chapterMobileSize);
                    $('.writeform input[name="mobileDataSize"]').val(this.mobileDataSize);
                    $('.writeform button[type="submit"]').html('수정하기');
                    top.location.href = '#bottom';
                }
            })
        } else if (contypes == 'testWrite') {
            $.each(data.test, function () {
                if (action == 'copy') {
                    var copyDate = ''
                    copyDate += 'seq=&contentsCode=' + codes + '&';
                    copyDate += 'examNum=' + this.examNum + '&';
                    copyDate += 'examType=' + this.examType + '&';
                    copyDate += 'exam=' + this.exam.replace(/&/g, '%26') + '&';
                    copyDate += 'testType=' + this.testType + '&';
                    if (this.chapterName != "" && this.chapterName != null && typeof this.chapterName !== 'undefined') {
                        copyDate += 'chapterName' + this.chapterName.replace(/&/g, '%26') + '&';
                    }
                    if (this.answerText != "" && this.answerText != null && typeof this.answerText !== 'undefined') {
                        copyDate += 'answerText=' + this.answerText.replace(/&/g, '%26') + '&';
                    }
                    if (this.example01 != "" && this.example01 != null && typeof this.example01 !== 'undefined') {
                        copyDate += 'example01=' + this.example01.replace(/&/g, '%26') + '&';
                    }
                    if (this.example02 != "" && this.example02 != null && typeof this.example02 !== 'undefined') {
                        copyDate += 'example02=' + this.example02.replace(/&/g, '%26') + '&';
                    }
                    if (this.example03 != "" && this.example03 != null && typeof this.example03 !== 'undefined') {
                        copyDate += 'example03=' + this.example03.replace(/&/g, '%26') + '&';
                    }
                    if (this.example04 != "" && this.example04 != null && typeof this.example04 !== 'undefined') {
                        copyDate += 'example04=' + this.example04.replace(/&/g, '%26') + '&';
                    }
                    copyDate += 'reference=' + this.reference + '&';
                    copyDate += 'answer=' + this.answer + '&';
                    copyDate += 'commentary=' + this.commentary.replace(/&/g, '%26') + '&';
                    copyDate += 'score=' + this.score + '&';
                    copyDate += 'sourceChapter=' + this.sourceChapter;
                    copyDate += 'munNum=' + this.munNum;
                    copyAct(copyDate);
                } else if (action == 'modify') {
                    resetInput();
                    qSeq = this.seq;
                    $('.writeform input[name="seq"]').val(this.seq);
                    $('.writeform input[name="examNum"]').val(this.examNum);
                    $('.writeform select[name="examType"]').val(this.examType);
                    $('#exam').html(this.exam.replace(/\n/g, '<br />'));
                    $('textarea[name="exam"]').val(this.exam.replace(/\n/g, '<br />'));
                    $('#reference').html(this.reference.replace(/\n/g, '<br />'));
                    $('textarea[name="reference"]').val(this.reference.replace(/\n/g, '<br />'));
                    $('#commentary').html(this.commentary.replace(/\n/g, '<br />'));
                    $('textarea[name="commentary"]').val(this.commentary.replace(/\n/g, '<br />'));
                    $('.writeform input[name="seq"]').val(this.seq);
                    $('.writeform input[name="examNum"]').val(this.examNum);
                    $('.writeform input[name="score"]').val(this.score);
                    $('.writeform input[name="sourceChapter"]').val(this.sourceChapter);
                    $('.writeform input[name="munNum"]').val(this.munNum);
                    if (this.examType == "A") {
                        $('input[type="checkbox"]').prop('checked', false);
                        $('textarea[name="answer"]').html('');
                        $('.answerA').css('display', 'list-item');
                        $('.answerB').css('display', 'none');
                        $('#example01').html(this.example01.replace(/\n/g, '<br />'));
                        $('#example02').html(this.example02.replace(/\n/g, '<br />'));
                        $('#example03').html(this.example03.replace(/\n/g, '<br />'));
                        $('#example04').html(this.example04.replace(/\n/g, '<br />'));
                        $('textarea[name="example01"]').val(this.example01.replace(/\n/g, '<br />'));
                        $('textarea[name="example02"]').val(this.example02.replace(/\n/g, '<br />'));
                        $('textarea[name="example03"]').val(this.example03.replace(/\n/g, '<br />'));
                        $('textarea[name="example04"]').val(this.example04.replace(/\n/g, '<br />'));
                        if (this.example05 != null) {
                            $('textarea[name="example05"]').val(this.example05.replace(/\n/g, '<br />'));
                            $('#example05').html(this.example05.replace(/\n/g, '<br />'));
                        }
                        $('#answer' + this.answer).prop('checked', true);

                    } else if (this.examType == "D") {
                        $('input[type="checkbox"]').prop('checked', false);
                        $('textarea[name="answer"]').html('');
                        $('.answerA').css('display', 'list-item');
                        $('.answerB').css('display', 'none');
                        $('#example01').html(this.example01.replace(/\n/g, '<br />'));
                        $('#example02').html(this.example02.replace(/\n/g, '<br />'));
                        $('textarea[name="example01"]').val(this.example01.replace(/\n/g, '<br />'));
                        $('textarea[name="example02"]').val(this.example02.replace(/\n/g, '<br />'));
                        $('#answer' + this.answer).prop('checked', true);

                    } else {
                        $('.answerA').css('display', 'none');
                        $('.answerB').css('display', 'list-item');
                        $('#answerText').html(this.answerText.replace(/\n/g, '<br />'));
                        $('input[type="checkbox"]').prop('checked', false);
                        $('textarea[name="answerText"]').val(this.answerText);
                    }
                }
                top.location.href = '#bottom';
            })
        } else if (contypes == 'reportWrite') {
            $.each(data.report, function () {
                if (action == 'copy') {
                    var copyDate = ''
                    copyDate += 'seq=&contentsCode=' + codes + '&';
                    copyDate += 'examNum=' + this.examNum + '&';
                    copyDate += 'sourceChapter=' + this.sourceChapter + '&';
                    if (this.chapterName != "" && this.chapterName != null && typeof this.chapterName !== 'undefined') {
                        copyDate += 'chapterName' + this.chapterName.replace(/&/g, '%26') + '&';
                    }
                    copyDate += 'exam=' + this.exam.replace(/&/g, '%26') + '&';
                    if (this.answerText != "" && this.answerText != null && typeof this.answerText !== 'undefined') {
                        copyDate += 'answerText=' + this.answerText.replace(/&/g, '%26') + '&';
                    }
                    if (this.examAttach != "" && this.examAttach != null && typeof this.examAttach !== 'undefined') {
                        copyDate += 'examAttach=' + this.examAttach.replace(/&/g, '%26') + '&';
                    }

                    copyDate += 'example=' + this.example.replace(/&/g, '%26') + '&';
                    if (this.exampleAttach != "" && this.exampleAttach != null && typeof this.exampleAttach !== 'undefined') {
                        copyDate += 'exampleAttach=' + this.exampleAttach.replace(/&/g, '%26') + '&';
                    }

                    copyDate += 'reference=' + this.reference.replace(/&/g, '%26') + '&';
                    if (this.referenceAttach != "" && this.referenceAttach != null && typeof this.referenceAttach !== 'undefined') {
                        copyDate += 'referenceAttach=' + this.referenceAttach.replace(/&/g, '%26') + '&';
                    }

                    copyDate += 'rubric=' + this.rubric.replace(/&/g, '%26') + '&';
                    if (this.rubricAttach != "" && this.rubricAttach != null && typeof this.rubricAttach !== 'undefined') {
                        copyDate += 'rubricAttach=' + this.rubricAttach.replace(/&/g, '%26') + '&';
                    }
                    copyDate += 'score=' + this.score.replace(/&/g, '%26');
                    copyAct(copyDate);
                } else if (action == 'modify') {
                    resetInput();
                    $('.writeform input[name="seq"]').val(this.seq);
                    $('.writeform input[name="examNum"]').val(this.examNum);
                    $('.writeform input[name="sourceChapter"]').val(this.sourceChapter);
                    if (this.exam) {
                        $('#exam').html(this.exam.replace(/\n/g, '<br />'));
                    }
                    if (this.answerText) {
                        $('#answerText').html(this.answerText.replace(/\n/g, '<br />'));
                    }
                    if (this.example) {
                        $('#example').html(this.example.replace(/\n/g, '<br />'));
                    }
                    if (this.reference) {
                        $('#reference').html(this.reference.replace(/\n/g, '<br />'));
                    }
                    if (this.rubric) {
                        $('#rubric').html(this.rubric.replace(/\n/g, '<br />'));
                    }
                    if (this.exam) {
                        $('.writeform textarea[name="exam"]').val(this.exam.replace(/\n/g, '<br />'));
                    }
                    if (this.answerText) {
                        $('.writeform textarea[name="answerText"]').val(this.answerText.replace(/\n/g, '<br />'));
                    }
                    if (this.example) {
                        $('.writeform textarea[name="example"]').val(this.example.replace(/\n/g, '<br />'));
                    }
                    if (this.reference) {
                        $('.writeform textarea[name="reference"]').val(this.reference.replace(/\n/g, '<br />'));
                    }
                    if (this.rubric) {
                        $('.writeform textarea[name="rubric"]').val(this.rubric.replace(/\n/g, '<br />'));
                    }
                    $('.writeform input[name="score"]').val(this.score);
                    var filePoint = 0;
                    if (this.examAttach != null) {
                        var files = '<div id="examAttach" class="attachFile"><a href="fileDownLoad.php?fileName=' + encodeURI(this.examAttach) + '&link=' + encodeURIComponent(this.examAttachLink) + '" target="_blank">' + this.examAttach + '</a><button type="button" onclick="deleteFileAct(\'examAttach\')">첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />';
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').after(files);
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').remove();
                    } else {
                        filePoint++;
                    }
                    if (this.exampleAttach != null) {
                        var files = '<div id="exampleAttach" class="attachFile"><a href="fileDownLoad.php?fileName=' + encodeURI(this.exampleAttach) + '&link=' + encodeURIComponent(this.exampleAttachLink) + '" target="_blank">' + this.exampleAttach + '</a><button type="button" onclick="deleteFileAct(\'exampleAttach\')">첨부파일삭제</button></div><input type="checkbox" name="delFile02" value="Y" />';
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').after(files);
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').remove();
                    } else {
                        filePoint++;
                    }
                    if (this.referenceAttach != null) {
                        var files = '<div id="referenceAttach" class="attachFile"><a href="fileDownLoad.php?fileName=' + encodeURI(this.referenceAttach) + '&link=' + encodeURIComponent(this.referenceAttachLink) + '" target="_blank">' + this.referenceAttach + '</a><button type="button" onclick="deleteFileAct(\'referenceAttach\')">첨부파일삭제</button></div><input type="checkbox" name="delFile04" value="Y" />';
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').after(files);
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').remove();
                    } else {
                        filePoint++;
                    }
                    if (this.rubricAttach != null) {
                        var files = '<div id="rubricAttach" class="attachFile"><a href="fileDownLoad.php?fileName=' + encodeURI(this.rubricAttach) + '&link=' + encodeURIComponent(this.rubricAttachLink) + '" target="_blank">' + this.rubricAttach + '</a><button type="button" onclick="deleteFileAct(\'rubricAttach\')">첨부파일삭제</button></div><input type="checkbox" name="delFile03" value="Y" />';
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').after(files);
                        $('.writeform label.AttachFiles:eq(' + filePoint + ')').remove();
                    }

                    top.location.href = '#bottom';
                }
            })
        }
    })

    function copyAct(copyDate) {
        $.ajax({
            url: matchingApi,
            data: copyDate,
            type: 'POST',
            success: function () {
                alert('복사가 완료되었습니다.')
                matchingList(codes, contypes, testType);
            }
        })
    }

    if (action == 'delete') {
        if (confirm('삭제하시겠습니까? 삭제 후 복구 하실 수 없습니다.')) {
            $.ajax({
                url: matchingApi,
                data: 'seq=' + seqNum,
                type: 'DELETE',
                dataType: 'text',
                success: function (data) {
                    if (data == '{"result" : "success"}') {
                        alert('삭제되었습니다.');
                        resetInput();
                        matchingList(codes, contypes, testType);
                    } else {
                        alert('삭제 중 문제가 발생하였습니다.')
                    }
                },
                done: function () {
                }
            })
        }
    }
}


function editorOpen(apiName, editPart, types) {
    var contentsCode = $('.writeform input[name="contentsCode"]').val();
    var testType = $('.writeform input[name="testType"]').val();
    var examNum = $('.writeform input[name="examNum"]').val();
    var editorText = $('#' + editPart).html();
    var modalWrite = ''
    modalWrite += '<div id="modal">';
    if (types == 'report') {
        modalWrite += '<div class="modalReportEditor">';
    } else {
        modalWrite += '<div class="modalEditor">';
    }
    modalWrite += '<h1>보기편집<button type="button" onClick="modalClose()"><img src="../../images/admin/btn_close.png" alt="닫기" /></button></h1>';
    modalWrite += '<div>'
    if (testType == 'final') {
        var testName = '최종평가';
    } else {
        var testName = '진행단계평가';
    }
    var exampleType = '';
    if (editPart == 'exam') {
        exampleType = '문제';
    } else if (editPart == 'commentary') {
        exampleType = '해설내용';
    } else if (editPart == 'example') {
        exampleType = '답안등록';
    } else if (editPart == 'reference') {
        exampleType = '참고사항';
    } else if (editPart == 'rubric') {
        exampleType = '채점기준';
    } else {
        exampleType = editPart.replace('example0', '') + '번 보기';
    }
    var examNumType = '';
    if (examNum != '') {
        examNumType = examNum + '번 문항';
    } else {
        examNumType = '신규문항';
    }
    modalWrite += '<h1>' + examNumType + '&nbsp;|&nbsp;' + exampleType + '</h1>';
    modalWrite += '<form class="editorArea" action="sample.php" method="post">';
    if (types == 'report') {
        modalWrite += '<textarea name="' + editPart + '" id="ir1" rows="10" cols="100" style="width:1054px; height:460px; display:none;">' + editorText + '</textarea>';
    } else {
        modalWrite += '<textarea name="' + editPart + '" id="ir1" rows="10" cols="100" style="width:827px; height:460px; display:none;">' + editorText + '</textarea>';
    }
    modalWrite += '</form>';
    modalWrite += '<div class="btnArea"><button type="button" onclick="submitContents(this,\'' + editPart + '\')">정보등록</button></div>';
    modalWrite += '</div>';
    modalWrite += '<button type="button" class="btnRefresh" style="display:none">새로고침</button>'
    //--모달테두리
    modalWrite += '</div>';
    $('#contents').after(modalWrite);
    $('.btnRefresh').click(function () {
        editorView()
    })
    //editorView();
    modalAlign();
    nhn.husky.EZCreator.createInIFrame({
        oAppRef: oEditors,
        elPlaceHolder: "ir1",
        sSkinURI: "../lib/SmartEditor/SmartEditor2Skin.html",
        htParams: {
            bUseToolbar: true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseVerticalResizer: false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
            bUseModeChanger: true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
            //aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
            fOnBeforeUnload: function () {
                //alert("완료!");
            }
        }, //boolean
        fOnAppLoad: function () {
            //예제 코드
            //oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
        },
        fCreator: "createSEditor2"
    });
}

//에디터 사용시 호출
var oEditors = [];

function submitContents(elClickedObj, changeID) {
    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.
    // 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById("ir1").value를 이용해서 처리하면 됩니다.
    try {
        var changeText = $('#ir1').val();
        $('div#' + changeID).html(changeText);
        $('textarea[name="' + changeID + '"]').val(changeText);
    } catch (e) {
    }
    modalClose();
}

function sendContens(codes, types, testType) {
    if (confirm('등록하시겠습니까?')) {
        $('.writeform').ajaxForm({
            dataType: 'JSON',
            beforeSubmit: function (data, form, option) {
                //console.log(option);
                return true;
            },
            success: function (data, status) {
                if (data.result != 'success') {
                    alert(data.result);
                } else {
                    alert("작성이 완료되었습니다.");
                    matchingList(codes, types, testType);
                    resetInput();
                    top.location.href = '#';
                }
            },
            error: function () {
                //에러발생을 위한 code페이지
                alert("작성중 문제가 생겼습니다..");
            }
        });
        $('.writeform').submit();
    }
}

function allDelete(codes, types, testType) {
    if (confirm('등록된 전체 문항을 삭제하시겠습니까? 삭제 후 복구 하실 수 없으며 수강을 진행했거나 진행중인 과정의 문항을 삭제 시 데이터 오류가 발생할 수 있습니다.')) {
        if (types == 'testWrite') {
            var apiSelect = testApi;
        } else {
            var apiSelect = reportApi;
        }
        $.ajax({
            url: apiSelect,
            type: 'DELETE',
            data: 'allDelete=Y&contentsCode=' + codes + '&testType=' + testType,
            success: function () {
                alert('삭제되었습니다.');
                matchingList(codes, types, testType);
            },
            error: function () {
                alert("오류가 발생하였습니다.");
                matchingList(codes, types, testType);
            }
        })
    }
}

function allDelete2(codes, types) {
    if (confirm('등록된 전체 차시를 삭제하시겠습니까? 삭제 후 복구 하실 수 없습니다.')) {
        $.ajax({
            url: chapterApi,
            type: 'DELETE',
            data: 'allDelete=Y&contentsCode=' + codes,
            dataType: 'text',
            success: function (data) {
                alert('삭제되었습니다.');
                matchingList(codes, types);
            },
            fail: function () {
                alert("오류가 발생하였습니다1.");
            }
        })
    }
}

function previewAct(codes, types, testType) {
    popupAddress = '_popup_contents.php?codes=' + codes + '&types=' + types + '&testType=' + testType + '&userLevel=' + loginUserLevel;
    window.open(popupAddress, "문제미리보기", "menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "previewContents")
}

function searchPop(types, seqs, contentsCode) {
    seqs = seqs ? seqs : '';
    contentsCode = contentsCode ? contentsCode : '';
    popupAddress = '../admin/contentsSearch.php?type=' + types + '&seq=' + seqs + '&contentsCode=' + contentsCode;
    var searchWindow = window.open(popupAddress, "conPopup", "menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "conPopup")
    searchWindow.focus();
}

function resSubmit() {
    var totalRate = eval($('#midRate').val()) + eval($('#testRate').val()) + eval($('#reportRate').val());
    multipartSendData('writeform');
    /*
	if(totalRate == 100 || totalRate == 200 || totalRate == 300){
		multipartSendData('writeform');
	}else{
		alert("반영비율을 다시 입력해 주세요.");
	}
	*/

}


//과정복사 (2017.09.04 강혜림 추가)
function contentsCopy() {
    if (confirm('복사하시겠습니까? 차시, 문제 모두 복사 됩니다.')) {
        var sendData = $('.writeform').serialize();
        var findMembers = $.ajax({
            method: 'POST',
            url: '../api/apiContents.php',
            data: 'contentsCopy=Y&' + sendData,
            dataType: 'text',
            success: function (data) {
                alert('복사가 완료되었습니다.');
                listAct();
            },
            fail: function () {
                alert('오류가 발생하였습니다.')
            }
        })
    }
}

function excelAct(contentsCode) {
    top.location.href = 'chapterDown.php?contentsCode=' + contentsCode;
}

function deleteContents(contentsCode) {
    if (confirm('정말 삭제하시겠습니까? 차시정보, 평가, 과제 같이 삭제 되며 삭제 후 복구할 수 없습니다.')) {
        $.ajax({
            method: 'DELETE',
            url: '../api/apiContents.php',
            data: 'contentsCode=' + contentsCode,
            dataType: 'JSON',
            success: function (data) {
                if (data.result == 'success') {
                    alert('삭제되었습니다.');
                } else {
                    alert(data.result);
                }
                listAct();
            },
            fail: function () {
                alert('오류가 발생하였습니다. 다시 시도해 주십시오.');
            }
        })
    }
}

function contentsHrdCode(contentsCode) {
    var cHrdCode = '';
    $.get(hrdCodeApi, {'contentsCode': contentsCode}, function (data) {
        var totalCount = data.contentsHrdCount;
        var hrdCodesub = '';
        $.each(data.contentsHrdCode, function () {
            if (this.hrdCode == null || this.hrdCode == '') {
                hrdCode = '';
                hrdCodeW = '코드없음';
            } else {
                hrdCode = this.hrdCode;
                hrdCodeW = this.hrdCode;
            }

            cHrdCode += '<input type="hidden" id="hrdCodeSelect" name="hrdCodeSelect" value="' + hrdCode + '" readonly="readonly"/>' + hrdCodeW;
        });
        $('#hrdCodeS').after(cHrdCode);
    });
}

function writeHrdCode(contentsCode) {
    var cHrdCode = '';
    $.get(hrdCodeApi, {'contentsCode': contentsCode}, function (data) {
        var totalCount = data.contentsHrdCount;
        var hrdCodesub = '';
        $.each(data.contentsHrdCode, function () {
            if (this.hrdCode == null || this.hrdCode == '') {
                hrdCode = '';
                hrdCodeW = '코드없음';
            } else {
                hrdCode = this.hrdCode;
                hrdCodeW = this.hrdCode;
            }

            cHrdCode += '<input type="hidden" id="writeHrdCodeSelect" name="writeHrdCodeSelect" value="' + hrdCode + '" readonly="readonly"/>' + hrdCodeW;
        });
        $('#writeHrdCodeS').after(cHrdCode);
    });
}

function searchHrdCode() {
    var hrdCode = $('#hrdCodeSelect').val();
    var contentsCode = $('#hrdContentsCode').val();
    var serviceType = $('#hrdServiceType').val();

    var lists = '';
    $.get(hrdCodeApi, {'hrdCode': hrdCode, 'serviceType': serviceType, 'contentsCode': contentsCode}, function (data) {
        var totalCount = data.hrdTotalCount;
        var i = totalCount;
        if (totalCount == undefined) {
            totalCount = 0;
        }
        if (totalCount != 0) {
            $.each(data.lectureHrd, function () {
                lists += '<tr>';
                lists += '<td>' + i + '</td>';
                if (this.hrdCode == null || this.hrdCode == '') {
                    this.hrdCode = '';
                }
                lists += '<td>' + this.hrdCode + '</td>';
                lists += '<td>' + this.classPK + '</td>';
                lists += '<td>' + this.serviceType + '</td>';
                lists += '<td>' + this.lectureStart + ' ~ ' + this.lectureEnd + '</td>';
                if (this.openChapter != null) {
                    var openChapter = this.openChapter;
                } else {
                    var openChapter = '';
                }
                lists += '<td><input type="text" id="openChapter' + this.seq + '" value="' + openChapter + '"></td>';
                lists += '<td>';
                lists += '<button type="button" onClick="hrdCodeUpdate(' + this.seq + ')">수정</button> / ';
                lists += '<button type="button" onClick="hrdCodeDelete(' + this.seq + ')">삭제</button>';
                lists += '</td></tr>';
                lists += '</tr>';
                i--;
            });
        } else {
            lists += '<tr><td class="notResult" colspan="20">검색 결과 등록된 데이터가 없습니다.</td></tr>';
        }
        $('.BBSList tbody').html(lists);
    });
}

function hrdCodeUpdate(seq) {
    var openChapter = $("#openChapter" + seq).val().trim();

    var regexp = /[^[0-9]/gi;
    if (openChapter == '') {
        alert("실시회차를 입력하세요.");
        return;
    } else if (regexp.test(openChapter)) {
        alert("숫자만 입력 가능합니다.");
        return;
    }
    if (confirm('실시회차를 수정하시겠습니까?')) {
        $.ajax({
            url: hrdCodeApi,
            type: 'POST',
            data: 'seq=' + seq + '&openChapter=' + openChapter,
            dataType: 'text',
            success: function (data) {
                if (data == "lectureOpen") {
                    alert('이미 존재하는 실시회차입니다.');
                } else {
                    alert('등록되었습니다.');
                }
            },
            fail: function (data) {
                alert("오류가 발생하였습니다.");
            }
        })
    }

}


function hrdCodeDelete(seq) {
    if (confirm('삭제하시겠습니까?')) {
        $.ajax({
            url: hrdCodeApi,
            type: 'DELETE',
            data: 'seq=' + seq,
            dataType: 'text',
            success: function (data) {
                if (data == "success") {
                    alert('삭제되었습니다.');
                } else if (data == "study") {
                    alert('수강생이 존재합니다.')
                } else {
                    alert('삭제 중 문제가 발생하였습니다.')
                }
            },
            done: function () {
            }
        })
    }

}

function writeHrd() {
    var lectureStart = $("#writeHrdStart").val().trim();
    var lectureEnd = $("#writeHrdEnd").val().trim();
    var openChapter = $("#writeOpenChapter").val().trim();
    var hrdCode = $("#writeHrdCodeSelect").val();
    var serviceType = $("#writeHrdServiceType").val();
    var contentsCode = $("#writeContentsCode").val();


    if (!lectureStart || !lectureEnd) {
        alert("수강기간을 입력해주세요.");
        return;
    } else if (!openChapter) {
        alert("실시회차를 입력해주세요.");
        return;
    }

    if (confirm('등록하시겠습니까?')) {
        $.ajax({
            url: hrdCodeApi,
            type: 'POST',
            data: 'contentsCode=' + contentsCode + '&hrdCode=' + hrdCode + '&serviceType=' + serviceType + '&lectureStart=' + lectureStart + '&lectureEnd=' + lectureEnd + '&openChapter=' + openChapter,
            dataType: 'text',
            success: function (data) {
                if (data == "lectureOpen") {
                    alert('이미 존재하는 실시회차입니다.');
                } else {
                    alert('등록되었습니다.');
                }
            },
            fail: function (data) {
                alert("오류가 발생하였습니다.");
            }
        })
    }
}

//function limitPrice(){
//	var limitCnt = $("#limitCnt").val();
//	var limitVal = parseInt(limitCnt)-(parseInt(passCnt)+parseInt(nowCnt));
//	$("#limitPrice").html(limitVal+'명');
//}

function summaryInsert(contentsCode) {
    popupAddress = '../admin/setSummary.php?contentsCode=' + contentsCode;
    var matchWindow = window.open(popupAddress, "summary", "width=860, height=600, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no", "summary")
    matchWindow.focus();
}

function priceCalculate() {
    var unitPrice = ''
    $("select[name=contentsGrade]").on("change", function () {
        if ($("select[name=conntentsGrade] option:selected").val() == 'A') {
            unitPrice = 6160;
            alert('a');
        } else if ($("select[name=conntentsGrade] option:selected").val() == 'B') {
            unitPrice = 4180;
            alert('b');
        } else if ($("select[name=conntentsGrade] option:selected").val() == 'C') {
            unitPrice = 2970;
            alert('c');
        }
    });
}


// ncs 자동 계산 함수 시작
function selDutyType2() { //직무법정과정
    var supply = $("#supply").val();
    var coefficient = $("#coefficient").val();
    var preSupply = $("#supply").data('pre');
    var preCoefficient = $("#coefficient").data('pre');
    if ($('#dutyType2').val() == 'Y') {
        //save supply & coefficient
        $("#supply").data('pre', supply);
        $("#coefficient").data('pre', coefficient);
        calAllPrice();
    } else {
        //load supply & coefficient
        $("#supply").val(preSupply);
        $("#coefficient").val(preCoefficient);
        calAllPrice();
    }
}

function getNcsData(ncsCode, coefficient, supply) { // 선택버튼 누를시 ncs 정보 가져옴
    $('#ncsCode').val(ncsCode);
    if ($('#contentsGrade').val() != 'A') {
        $('#coefficient').val(coefficient);
        $('#supply').val(supply);
    } else {
        $('#supply').val(4);
        $('#coefficient').val(1.0);
    }

    calAllPrice();
}

function getSupCoeff(ncsCode) { // ncsCode에따라 공긍정도, 조정계수 가져옴
    if (ncsCode.value.substr(0, 6) in ncsObj && $('#contentsGrade').val() != 'A') { // ncs코드 앞 6자리 비교
        $('#coefficient').val(ncsObj[ncsCode.value.substr(0, 6)].coefficient);
        $('#supply').val(ncsObj[ncsCode.value.substr(0, 6)].supply);
    } else { // DB에 등록되지 않은 ncs 코드는 공급정도 4, 조정계수 1로 고정
        $('#supply').val(4);
        $('#coefficient').val(1.0);
    }
    calAllPrice();
}

function getGradePrice() { //등급 코드에 따라 표준훈련비 계산
    var grade = $('#contentsGrade').val();
    $('#price').val(gradeObj[grade].value03);
    $('#selfPrice').val($('#contentsTime').val() * $('#price').val());
    if (grade == 'A') { // A등급은 별도 조정계수와 등급코드 적용
        $('#supply').val(4);
        $('#coefficient').val(1);
    } else {
        $('#supply').val(ncsObj[$('#ncsCode').val().substr(0, 6)].supply);
        $('#coefficient').val(ncsObj[$('#ncsCode').val().substr(0, 6)].coefficient);
    }
    calAllPrice();
}

function getSelfPrice(time) { // 표준훈련비 계산
    var selfPrice = time.value * $('#price').val();
    $('#selfPrice').val(selfPrice);
    calAllPrice();
}

function calAllPrice() { //모든 비용 계산
    var selfPrice = $("#selfPrice").val();
    var coefficient = $("#coefficient").val();
    if (selfPrice != '') {
        if ($('#dutyType2').val() == 'Y') {
            $("#supply").val(0);
            $("#coefficient").val(0.5);
            coefficient = $("#coefficient").val();
            $("#rPrice01").val(Math.floor(selfPrice * 0.5 / 10) * 10); //우선지원
            $("#selfPrice01").val(Math.ceil(selfPrice - $("#rPrice01").val())); //자부담우선지원
        } else {
            $("#rPrice01").val(Math.floor(selfPrice * coefficient * 0.9 / 10) * 10);
            $("#selfPrice01").val(Math.ceil(selfPrice - $("#rPrice01").val()));
        }
        $("#rPrice02").val(Math.floor((selfPrice * coefficient * 0.8 / 10)) * 10);
        $("#selfPrice02").val(Math.ceil(selfPrice - $("#rPrice02").val()));
        $("#rPrice03").val(Math.floor((selfPrice * coefficient * 0.4 / 10)) * 10);
        $("#selfPrice03").val(Math.ceil(selfPrice - $("#rPrice03").val()));
    }
}

function setCoefficient(sp) {
    var b = sp.value == 4 ? 4 : sp.value % 4;
    if (sp.value == 0) {
        $('#coefficient').val(0.5);
    } else {
        $('#coefficient').val(1 - ((4 - b) / 10));
    }
    calAllPrice();
}


function changeLectureType() {
    let contentsType = $('#contentsArea > form.writeform > ul > li:nth-child(5) > div:nth-child(1) > select option:selected')
    let contentsPrice = $('#contentsArea > form.writeform > ul')

    if (contentsType.text() == '기업직업훈련') {
        for (let i = 16; i < 18; i++) {
            contentsPrice.children(`li:nth-child(${i})`).css('display', 'none');
        }
    } else {
        for (let i = 16; i < 18; i++) {
            contentsPrice.children(`li:nth-child(${i})`).css('display', '');
        }
    }

    let lectureType = $('#contentsType').val();
    // $('select[name="sort01"]').remove();
    $('select[name="sort02"]').remove();

    let selectWrite = '';
    if (lectureType == '2') { //국민내일배움
        $('#ncsCode').val('');
        $('#ncsName').val('');
        selectWrite += '<option value="">대분류 선택</option>';
        selectWrite += '<option value="lecture21">주택관리사</option>';
        selectWrite += '<option value="lecture22">직업상담사 2급</option>';
        selectWrite += '<option value="lecture23">사회복지사 1급</option>';
        selectWrite += '<option value="lecture24">관광통역안내사</option>';
        selectWrite += '<option value="lecture25">일반과정</option>';
        selectWrite += '<option value="lecture26">경비지도사</option>';
        selectWrite += '<option value="lecture27">자동차정비기능사(산업기사)</option>';
        selectWrite += '<option value="lecture28">대기환경(산업)기사</option>';
        selectWrite += '<option value="lecture29">수질환경(산업)기사</option>';
        selectWrite += '<option value="lecture30">폐기물처리(산업)기사</option>';
        selectWrite += '<option value="lecture31">품질경영(산업)기사</option>';
        selectWrite += '<option value="lecture32">한국어교원양성과정</option>';
        selectWrite += '<option value="lecture33">신재생에너지발전설비기사(태양광)</option>';
        selectWrite += '<option value="lecture34">산업안전(산업)기사</option>';
        selectWrite += '<option value="lecture35">자격증</option>';
        selectWrite += '<option value="lecture36">전기(산업)기사</option>';
        selectWrite += '<option value="lecture37">소방설비(산업)기사</option>';
        selectWrite += '<option value="lecture38">사회조사분석사 2급</option>';
    } else {
        selectWrite += '<option value="">대분류 선택</option>';
        selectWrite += '<option value="lecture08">일반직무</option>';
        selectWrite += '<option value="lecture03">산업안전</option>';
        selectWrite += '<option value="lecture01">경영리더십</option>';
        selectWrite += '<option value="lecture02">업무스킬</option>';
        selectWrite += '<option value="lecture04">IT</option>';
        selectWrite += '<option value="lecture05">자격증</option>';
        selectWrite += '<option value="lecture06">외국어</option>';
        selectWrite += '<option value="lecture09">경비원 직무</option>';
        selectWrite += '<option value="lecture11">스틸전문</option>';
        selectWrite += '<option value="lecture12">법정필수</option>';
        selectWrite += '<option value="lecture14">플립러닝</option>';
        selectWrite += '<option value="lecture15">비대면바우처</option>';
        selectWrite += '<option value="lecture16">디지털융합</option>';
        selectWrite += '<option value="lecture17">전문직무</option>';
        selectWrite += '<option value="lecture18">직무</option>';
        selectWrite += '<option value="lecture19">소양</option>';
        selectWrite += '<option value="lecture20">기업직업훈련카드</option>';
        selectWrite += '<option value="lecture07">의료기관</option>';
        selectWrite += '<option value="lecture16">디지털융합</option>';
        selectWrite += '<option value="lecture41">AI영상제작서비스</option>';
		selectWrite += '<option value="lecture42">고객사검수용</option>';
    }

    selectWrite += '</select>';
    document.getElementById('sort01').innerHTML = '';
    document.getElementById('sort01').insertAdjacentHTML('beforeend', selectWrite);

}





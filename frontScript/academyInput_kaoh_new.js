//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


function listAct(){
	writeAct();
}

//게시판 보기 스크립트 시작
function writeAct(){
	academySeq = academySeq ? academySeq : ''; 
	var seq = '';
	seq = academySeq;	
	var country = '';
	var academyName = '';
	var companyCode = '';
	var zipCode = '';
	var address = '';
	var academyDate = '';
	var status = '';
	var type = '';
	var branch = '';
	var academyCEO = '';
	var membership = '';
	var bigCountry = '';
	var memberCount = '';
	
	if(seq != ''){
		var writeAjax = $.get('../api/apiAcademy.php',{'seq':seq},function(data){
			$.each(data.academy,function(){
				country = this.country;
				bigCountry = this.bigCountry;
				academyName = this.academyName;
				companyCode = this.companyCode;
				zipCode = this.zipCode;
				address = this.address;
				academyDate = this.academyDate;
				status = this.status;
				type = this.type;
				branch = this.branch;
				academyCEO = this.academyCEO;
				membership = this.membership;
				memberCount = this.memberCount;
			})
			writePrint();
		})
	} else {

		 /*$.ajax({
			 url : '../api/apiAcademy.php',
			 data : {'bigCountry' : memo,
					 'countryList' : 'Y'},
			 type : 'GET',
			 success : function(data){
				 // console.log(data);
				 countryOpt += '<option value=""></option>';
				 $.each(data.academy, function(){
					 countryOpt += '<option value="'+this.country+'">'+this.country+'</option>';
				 })
				 $("select[name='country']").html(countryOpt);
			 }
		 })*/
		writePrint();

		 var countryOpt= '';
		//console.log(memo);
		if(memo == '충남'){
			code = '34';
		}else if(memo == "세종"){
			code = '29';
		}else if(memo == "대전"){
			code = '25';
		}else if(memo == "전남"){
			code = '36';
		}else if(memo == "강원"){
			code = '32';
		}else if(memo == "충북"){
			code = '33';
		}
		
		if(code == '33') {
			//writes += optWrite['cbhyCountry'];
			countryOpt += '<option value=""></option>';
			countryOpt += '<option value="괴산군">괴산군</option>';
			countryOpt += '<option value="단양군">단양군</option>';
			countryOpt += '<option value="보은군">보은군</option>';
			countryOpt += '<option value="영동군">영동군</option>';
			countryOpt += '<option value="옥천군">옥천군</option>';
			countryOpt += '<option value="음성군">음성군</option>';
			countryOpt += '<option value="제천시">제천시</option>';
			countryOpt += '<option value="증평군">증평군</option>';
			countryOpt += '<option value="진천군">진천군</option>';
			countryOpt += '<option value="청주시">청주시</option>';
			countryOpt += '<option value="충주시">충주시</option>';			
		} else if (code == '25') {
			countryOpt += '<option value=""></option>';
			countryOpt += '<option value="대덕구">대덕구</option>';
			countryOpt += '<option value="동구">동구</option>';
			countryOpt += '<option value="서구">서구</option>';
			countryOpt += '<option value="유성구">유성구</option>';
			countryOpt += '<option value="중구">중구</option>';
		} else if (code == '29') { 
			countryOpt += '<option value="세종시">세종시</option>';
		} else {
			$.ajax({
				url : "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
				method : "GET",
				data : {
					consumer_key : '41dd479acfb3457ba63d',
					consumer_secret : '1bfd97e379e043ed9aa8'
				},
				dataType : 'json',
				async:false,
				success: function(data){
					// console.log(data.result.accessToken);
					var accessToken = data.result.accessToken;
					$.ajax({
						url:"https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
						method:'GET',
						data : {
							accessToken : accessToken,
							cd : code
						},
						dataType: 'json',
						async:false,
						success: function(data){
							// console.log(data);
							// var count = data.result.length;
							countryOpt += '<option value=""></option>';
							$.each(data.result,function(key, value){
								countryOpt += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
								// console.log(value['addr_name']);
							})
						}
					})
				}

			})
		}
		$("select[name='country']").html(countryOpt);
	}
	//게시판 생성
	function writePrint(){
		var writes ='';
		writes += '<div class="admin_joinform">';
		
		//if(loginUserID != 'kwhyAdmin2') {
		//파일등록
		writes += '<h2>파일로 업로드하기</h2>'			
		writes += '<form class="fileUploadform" method="post" action="academyInfoUpload.php" enctype="multipart/form-data">';
		writes += '<ul><li>';
		writes += '<label for="adminjoin11" class="width160">등록샘플</label>';
		/*if (memo == '충북') {
			writes += '<span class="btn_004 width150"><a href="../attach/docs/학원연합회_등록양식_충북.xlsx">양식 및 샘플 내려받기</a></span>';
		} else {
			writes += '<span class="btn_004 width150"><a href="../attach/docs/학원연합회_등록양식.xlsx">양식 및 샘플 내려받기</a></span>';
		}*/
		writes += '<span class="btn_004 width150"><a onclick="alert(\'해당기능이 제한이 되어 있으므로 학습지원센터 1544-9335로 문의 부탁드립니다.\');">양식 및 샘플 내려받기</a></span>';
		writes += '<span class="f_c_red">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</span>';
		writes += '</li>';
		writes += '<li>';
		writes += '<label for="adminjoin11" class="width160">파일등록(이름)</label>';
		//writes += '<input type="file" name="uploadFile" /><button class="btn_004 width150" type="submit" onClick="loadingAct();"><a>파일업로드</a></button>';
		writes += '<input type="file" name="uploadFile" />' +
			'<button class="btn_004 width150" type="button" onclick="alert(\'해당기능이 제한이 되어 있으므로 학습지원센터 1544-9335로 문의 부탁드립니다.\');">' +
			'파일업로드</button>';
		//writes += '<input type="file" name="uploadFile" /><button class="btn_004 width150" type=""><a>파일업로드</a></button>';
		writes += '</li></ul>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		writes += '</form>';

		//개별등록,수정
		writes += '<h2>개별 등록</h2>'
		writes += '<form class="writeform" method="post">';
		writes += '<ul>';

		writes += '<input type="hidden" name="bigCountry" value="'+memo+'">';
		writes += '<input type="hidden" name="seq" value="'+seq+'">';
		writes += '<li>';
		writes += '<label for="adminjoin1" class="width180">지역<span class="f_c_red">*</span></label>';
		writes += '<select name="country" class="width150 m_right10" id="adminjoin1"></select>';
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin2" class="width160">학원명<span class="f_c_red">*</span></label>';
		writes += '<input type="text" name="academyName" id="adminjoin2" class="width300" value="'+academyName+'"/>';   
		writes += '</li>';

		writes += '<li>';
		//writes += '<label for="adminjoin3" class="width160">사업자번호<span class="f_c_red">*</span></label>';
		writes += '<label for="adminjoin3" class="width160">사업자번호</label>';
		if(subDomain == 'djhy' || subDomain == 'cnhy' || subDomain == 'cbhy'){
			writes += '<input type="text" name="companyCode"' +
				// ' onKeyup="numCheck(this)" maxLength="10" id="adminjoin3" class="width300" value="'+companyCode+'" readonly onclick="alert(\'개별 등록 시 작성 할 수 없습니다.\')" />';
				' onKeyup="numCheck(this)" maxLength="10" id="adminjoin3" class="width300" value="'+companyCode+'"/>';
		} else {
			if (seq != "") {
				writes += '<input type="text" name="companyCode" onKeyup="numCheck(this)" maxLength="10" id="adminjoin3" class="width300" value="'+companyCode+'" readonly onclick="alert(\'사업자번호는 수정을 할 수 없습니다.\')"/>';		
			} else {
				writes += '<input type="text" name="companyCode" onKeyup="numCheck(this)" maxLength="10" id="adminjoin3" class="width300" value="'+companyCode+'"/>';		
			}	
		}
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin4" class="width160">주소<span class="f_c_red">*</span></label>';
		writes += '<div class=""><p>';
		writes += '<input type="text" name="address" id="addr" placeholder="주소" class="width300 m_right10" readonly="readonly" value="'+address+'"/>';
		writes += '<input type="text" name="zipCode" id="zipCode" placeholder="우편번호" class="width180 m_right10" readonly="readonly" value="'+zipCode+'"/>';
		writes += '<span class="btn_004 width100"><a href="javascript:daumPostcode()">주소검색</a></span></p>';
		writes += '<p><input type="text" name="address2" id="detailAddress" class="width400" placeholder="상세주소를 입력해주세요"/></p>';
		writes += '</div>';
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin5" class="width160">개원일</label>';
		writes += '<div class="datePicker"><input type="text" name="academyDate" class="cal" value="'+academyDate+'" readonly="readonly" class="width150"/></div>';
		writes += '<span class="btn_calendar"><a></a></span></li>';
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin6" class="width160">개원상태</label>';
		writes += '<select name="status" class="width150 m_right10" id="adminjoin6">';
		writes += '<option>개원</option>';
		writes += '<option>폐원</option>';
		writes += '<option>자진휴원(소)</option>';
		writes += '<option>개소</option>';
		writes += '<option>휴소</option>';
		writes += '<option>직권휴원(소)</option>';
		writes += '<option>자진휴원</option>';
		writes += '</select>';
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin7" class="width160">분야</label>';
		writes += '<input type="text" name="branch" id="adminjoin7" class="width300" value="'+branch+'">';
		writes += '</li>';
		
		writes += '<li>';
		writes += '<label for="adminjoin8" class="width160">종류</label>';
		writes += '<input type="text" name="type" id="adminjoin8" class="width300" value="'+type+'">';
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin9" class="width160">학원설립관리자<span class="f_c_red">*</span></label>';
		if (seq != "") {
			writes += '<input type="text" name="academyCEO" id="adminjoin9" class="width300" value="'+academyCEO+'" readonly onclick="alert(\'학원설립관리자는 수정을 할 수 없습니다.\')">';
		} else {		
			writes += '<input type="text" name="academyCEO" id="adminjoin9" class="width300" value="'+academyCEO+'">';
		}
		writes += '</li>';

		writes += '<li>';
		writes += '<label for="adminjoin10" class="width160">회원구분<span class="f_c_red">*</span></label>';
		writes += '<select name="membership" class="width150 m_right10" id="adminjoin10">';
		if(membership == 'Y'){
			writes += '<option value="">선택</option>';
			writes += '<option value="N">비회원</option>';
			writes += '<option value="Y" selected>정회원</option>';		
		} else if(membership == 'N'){
			writes += '<option value="">선택</option>';
			writes += '<option value="N" selected>비회원</option>';
			writes += '<option value="Y">정회원</option>';		
		} else {
			writes += '<option value="">선택</option>';
			writes += '<option value="N">비회원</option>';
			writes += '<option value="Y">정회원</option>';
		}
		writes += '</select>';
		writes += '</li>';
		
		if (memo == '충북') {
			writes += '<li>';
			writes += '<label for="memberCount" class="width160">추가인원설정</label>';
			writes += '<input type="number" name="memberCount" id="memberCount" class="width300" value="'+memberCount+'">';
			writes += '</li>';
		}

		writes += '</ul>';
		
		//writes += '<div class="btnArea">';
		if(seq != ''){
			writes += '<p class="btn_004 width200 m_right10"><a href="javascript:checkStudyForm()">수정하기</a></p>';			
			writes += '<p class="btn_005 width100"><a href="../adminKaoh/03_academyInfo.php?locaSel=1201">목록으로</a></p>';
			writes += '<br/>* 학원설립관리자는 수정을 할 수 없습니다.';
		} else {
			writes += '<p class="btn_004 width200 m_right10"><a href="javascript:checkStudyForm()">등록하기</a></p>';
			writes += '<p class="btn_005 width100"><a href="javascript:resetInput()">초기화</a></p>';
		}
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
		writes += '</form>';
		writes += '</div>';

		$('.admin_joinform').addClass('BBSWrite');
		$('.admin_tab').after(writes);
		pickerAct();//데이트피커 사용
		//ajaxAct();

        var code = '';
		var countryOpt = '';
		if(bigCountry == '충남'){
			code = '34';
		}else if(bigCountry == "세종"){
			code = '29';
		}else if(bigCountry == "대전"){
			code = '25';
		}else if(bigCountry == "전남"){
			code = '36';
		}else if(bigCountry == "강원"){
			code = '32';
		}else if(bigCountry == "충북"){
			code = '33';
		}
		/*
		if(code != '33') {
			$.ajax({
				url : "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
				method : "GET",
				data : {
					consumer_key : 'ad3fdd30090b4c3794d8',
					consumer_secret : '0eb630f252114e48b433'
				},
				dataType : 'json',
				async:false,
				success: function(data){
					 //console.log(data.result.accessToken);
					var accessToken = data.result.accessToken;
					$.ajax({
						url:"https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
						method:'GET',
						data : {
							accessToken : accessToken,
							cd : code
						},
						dataType: 'json',
						async:false,
						success: function(data){
							// console.log(data);
							// var count = data.result.length;
							countryOpt += '<option value=""></option>';
							$.each(data.result,function(key, value){
								countryOpt += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
								// console.log(value['addr_name']);
							})
						}
					})
				}

			})
		} else {
		*/
		if(code == '33') {
			//writes += optWrite['cbhyCountry'];
			countryOpt += '<option value=""></option>';
			countryOpt += '<option value="괴산군">괴산군</option>';
			countryOpt += '<option value="단양군">단양군</option>';
			countryOpt += '<option value="보은군">보은군</option>';
			countryOpt += '<option value="영동군">영동군</option>';
			countryOpt += '<option value="옥천군">옥천군</option>';
			countryOpt += '<option value="음성군">음성군</option>';
			countryOpt += '<option value="제천시">제천시</option>';
			countryOpt += '<option value="증평군">증평군</option>';
			countryOpt += '<option value="진천군">진천군</option>';
			countryOpt += '<option value="청주시">청주시</option>';
			countryOpt += '<option value="충주시">충주시</option>';
		}
		// writes += countryOpt;
		//console.log(countryOpt);
		$('select[name=country]').html(countryOpt);
        $('select[name=country]').find('option[value="'+country+'"]').attr("selected",true);

	}
}

//학원정보 개별 등록
function writeStudy(){
	var sendData = $('.writeform').serialize();
	$.ajax({
		url:'../api/apiAcademyInfo.php',
		type:'POST',
		data:sendData,
		success:function(data){
            //console.log(data);
            if(data.result == 'fail'){
                alert('등록에 실패하였습니다.')
            }else if(data.result == 'duplicate'){
				alert('기존 등록된 사업자번호가 있습니다.')
			}else{
                alert('등록 되었습니다.');
            }
			
		},
		fail:function(){
			alert('등록에 실패하였습니다.')
		}
	})
}

function resetInput(){
	$('.writeform input[type="text"]').val('');
	$('.writeform div.').html('')
	$('.writeform button[type="submit"]').html('등록하기')
}


//숫자만입력받기
function numCheck(el){
        
    var regNumber = /^[0-9]*$/;
    var temp = el.value;
    if(!regNumber.test(temp)){
        el.value = temp.replace(/[^0-9]/g,"");
        // console.log(el.value);
    }
}
//사업자번호검사
function checkCorporateRegistrationNumber(bizID) {


    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    bizID = bizID.replace(/-/gi,'');
    for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;
    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
    return false;
    }
//입력폼 체크
function checkStudyForm(){
    // console.log($('select[name="country"]'));
    var academyName = $('input[name="academyName"]').val();
    var companyCode = $('input[name="companyCode"]').val();
    var country = $('select[name="country"]').val();

    var address01 = $('input[name="address"]').val();

    var academyCEO = $('input[name="academyCEO"]').val();

    var membership = $('select[name="membership"]').val();
     
    // if($('input[name="country"]').val() == ""){
    //     alert('지역을 선택해주세요.');
    //     return;
    // }
	
    if(country == ""){
        alert('지역을 선택해주세요.');
        return;
    }
    if(academyName == ""){
        alert('학원명을 입력해주세요.');
        return;
    }
    /*if(memo != '대전'){
        if(checkCorporateRegistrationNumber(companyCode) != true || companyCode ==""){
            alert('잘못된 사업자번호입니다. 다시확인해주세요.');
            return;
        }else{
            $.ajax({
                url: "../api/apiAcademyInfo.php",
                data : {companyCode : companyCode},
                type : "GET",
                success : function(data){
                    // console.log(data);
                    if(data.result != "true"){
                        alert('입력하신 사업주번호는 이미 등록되어있는 번호입니다.');
                        return;
                    }
                }
            });
        }
    }else{
        if(checkCorporateRegistrationNumber(companyCode) != true){
            alert('잘못된 사업자번호입니다. 다시확인해주세요.');
            return;
        }else{
            $.ajax({
                url: "../api/apiAcademyInfo.php",
                data : {companyCode : companyCode},
                type : "GET",
                success : function(data){
                    if(data.result != "true"){
                        alert('입력하신 사업주번호는 이미 등록되어있는 번호입니다.');
                        return;
                    }
                }
            });
        }
    }*/
    
    if(address01 == ""){
        alert('주소를 입력해주세요.');
        return;
    }
    if(academyCEO == ""){
        alert('학원설립관리자를 입력해주세요.');
        return;
    }
    if(membership == ""){
        alert('회원구분을 선택해주세요.');
        return;
    }
    writeStudy();
}

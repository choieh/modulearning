//게시판 보기 스크립트 시작
var optWrite = new Array();

function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
	seq = writeSeq;

	//상단메뉴
	$('.searchArea').remove();	

	//출력변수 지정
	var pkSeq = '';
	var bigCountry = '';
    var country = '';
	var academyName = '';
    
	var companyCode = '';
	var academyCEO = '';
	var zipCode = '';
	var address01 = '';
    var address02 = '';

	var status = '';
    var branch = '';
    var type = '';
    var academyDate = '';
    var adminID = '';
    var membership = '';
    var membershipDate = '';
    var regStatus = '';
    

	if(seq != ''){
		var writeAjax = $.get(useApi,{'seq':seq},function(data){
            console.log(data);
			$.each(data.academy, function(){
				pkSeq = this.seq
                bigCountry = this.bigCountry;
                country = this.country;
				academyName = this.academyName;
				companyCode = this.companyCode;
				zipCode = this.zipCode;
				address01 = this.address;
				address02 = this.address2;
				status = this.status;
				branch = this.branch;
                type = this.type;
                academyDate = this.academyDate;
				academyCEO = this.academyCEO;
                adminID = this.adminID;
                membership =this.membership;
                membershipDate = this.membershipDate;
                regStatus = this.regStatus;
			})
			writePrint()
		})
	}else{
		writePrint()
	}
    
    

    
	//게시판 생성
	function writePrint(){
       
		var writes = '';
		writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';			
		//입력영역 시작
		writes += '<ul>';
		
		//회사규모, 사이버교육센터 사용여부
		writes += '<li>'
		writes += '<div class="halfDiv">';
		writes += '<h1>일련번호</h1>';
		writes += `<span>${pkSeq}</span>`
		writes += '</div>'
		writes += '</li>'
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>시,도구분</h1>';
        writes += '<select name="bigCountry" onChange="selectBigCountry(this)">';
        writes += '<option value="세종">세종</option>';
        writes += '<option value="충남">충남</option>';
        writes += '<option value="충북">충북</option>';
        writes += '<option value="강원">강원</option>';
        writes += '<option value="대전">대전</option>';
        writes += '<option value="전남">전남</option>';
        
        
        writes += '</select>';
		writes += '</div>'
		writes += '<div class="halfDiv">';
		writes += '<h1>지역</h1>';
		writes += '<select name="country" class="'+country+'">'+country+'</select>';
		writes += '</div>'			
		writes += '</li>';
		
		//회사명
		writes += '<li class="mustCheck"><h1>학원명</h1>';
		writes += '<input type="text" name="academyName" class="name" value="'+academyName+'" />';
		writes += '</li>';
		
		//사업자번호
        writes += '<li class="mustCheck"><h1>사업자번호</h1>';
        writes += '<input type="tel" name="companyCode" class="name" maxlength="10" value="'+companyCode+'"/>&nbsp;<button type="button" onclick="companyCodeCheck(\''+useApi+'\',\'companyCode\')">중복확인</button><input type="checkbox" name="companyCodeOK" value="Y" />';
		
        writes += '</li>';
        
		//사업주 아이디
        writes += '<li><h1>학원관리자 아이디</h1>';
        writes += '<input type="text" name="adminID" class="name" value="'+adminID+'">';
		
		writes += '</li>';
					
		//대표자명
		//writes += '<li class="mustCheck"><h1>대표자명</h1>';
		writes += '<li><h1>대표자명 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<input type="text" name="academyCEO" class="name" value="'+academyCEO+'" />';
		writes += '</li>';
		
		//주소입력
		writes += '<li><h1>주소 <span style="color:#c73333;"> (*)</span></h1><div class="address">';
		writes += '<input name="zipCode" class="name" type="tel" maxlength="5" id="zipCodeArea"  value="'+zipCode+'" readonly="readonly" />&nbsp;<button type="button" class="findZipCode">우편번호 찾기</button><br />';
		writes += '<input name="address01" class="subject" type="text" id="address01Area" value="'+address01+'" /><br />';
		writes += '<input name="address02" class="subject" type="text" id="address02Area" value="'+address02+'" />';
		writes += '</div></li>';
		//분야
		writes += '<li><h1>분야 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<input type="tel" name="branch" class="name" value="'+branch+'" />&nbsp;';
        writes += '</li>';
        //종류
        writes += '<li><h1>종류 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<input type="tel" name="type" class="name" value="'+type+'" />&nbsp;';
        writes += '</li>';

        //회원구분
        writes += '<li><h1>회원구분 <span style="color:#c73333;"> (*)</span></h1>';
        writes += '<select name="membership" onChange="membershipCheck(\''+membership+'\')">';
        if(membership != "정회원"){
            writes += '<option value="N" selected>비회원</option>';
            writes += '<option value="Y">정회원</option>';
        }else{
            writes += '<option value="Y" selected>정회원</option>';
            writes += '<option value="N">비회원</option>';
        }
        writes += '</select>';

        //회원구분
        if(seq != ''){
            writes += '<li><h1>관리자등록여부</span></h1>';
            writes += '<select name="regStatus">';
            if(regStatus != "Y"){
                writes += '<option value="N" selected>미등록</option>';
                writes += '<option value="Y">등록</option>';
            }else{
                writes += '<option value="Y" selected>등록</option>';
                writes += '<option value="N">미등록</option>';
            }
            writes += '</select>';
        }
       
        writes += '<input type="hidden" name="membershipChk" value="">';
        writes += '<span>'+membershipDate+'</span>';
        writes += '</li>';
        
		writes += '</ul>';
		
		//버튼영역
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkMemberForm()">';
		if(seq != ''){
			writes += '수정하기';
		}else{
			writes += '등록하기';
		}
		writes += '</button>'
		writes += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
		
		writes += '</form>';
		
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);
		findOpt();
		emailSelect();
		$('#zipCodeArea, .findZipCode').click(function(){zipCodeFind()})
		var	mustInput = '&nbsp;&nbsp;<strong class="price">(*)</strong>';
		$('.mustCheck > h1').append(mustInput)//필수요소 사용
		$('input[name="companyID"]').keydown(function(){keyCheck('numbEng',this)})
        $('input[type="tel"]').keyup(function(){keyCheck('numb',this)})

        
        //대지역 선택
        //지역분류
        var code = '';
        var countryOpt = '';
        switch (bigCountry) {
            case '충북':
                code = '33';
                break;
            case '충남':
                code = '34';
                break;
            case '세종':
                code = '29';
                break;
            case '강원':
                code = '32';
                break;
            case '대전':
                code = '25';
                break;
            case '전남':
                code = '36';
                break;
        }

		if(code != '33'){
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
							 console.log(data);
							// var count = data.result.length;

							$.each(data.result,function(key, value){
								countryOpt += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
								// console.log(value['addr_name']);
							})
						}
					})
				}

			})
		} else {
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
        $('select[name=country]').html(countryOpt);
        
        $('select[name=bigCountry]').find('option[value="'+bigCountry+'"]').attr("selected",true);
        $('select[name=country]').find('option[value="'+country+'"]').attr("selected",true);

		if (loginUserLevel == 5) {
			(function() {
		    searchSelect('marketerID',memberApi);
		    $('input[name="userName"]').attr('readonly', 'readonly');
		    $('select[name="marketerID"]').attr('disabled', 'disabled');
		}());
		}		
	}
}

//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}

//입력폼 체크
function checkMemberForm(){
	// console.log('1')
	$('.mustCheck > strong.price').remove();
	var checkFalse = 0;
	var companyCodeCheck ='';
    var companyIDCheck ='';
    var types = '';

    
	$.get(useApi,{'seq':seq},function(data){

		if(seq){				
			$.each(data.academy, function(){
				companyCodeCheck = this.companyCode;
            })
            types = 'update';
		}else{
            types = 'new';
        }
			
		$('.mustCheck input[type="tel"], .mustCheck input[type="text"]').each(function(){
			if($(this).val() == ''){
				checkFalse ++;
			}
		});
		/*
		if(seq==''){
			if($('input[name="companyID"]').val() == ''){
				$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="price">아이디를 입력해주세요</strong>')
				checkFalse ++;
			}else if($('input[name="idUseOk"]').prop('checked') == false){
				$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="price">아이디 중복체크를 해주세요</strong>')
				checkFalse ++;
			}
		}*/
		if($('input[name="companyName"]').val() == ''){
			$('input[name="companyName"]').after('&nbsp;&nbsp;<strong class="price">회사명을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if(seq ==''){
			if($('input[name="companyCode"]').val() == ''){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호를 입력해주세요.</strong>')
				checkFalse ++;
            }else if($('input[name="companyCodeOK"]').prop('checked') == false){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호 중복체크를 해주세요.</strong>')
				checkFalse ++;
			}
		} else {
			// if($('input[name="companyCode"]').val() == ''){
			// 	$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호를 입력해주세요.</strong>')
			// 	checkFalse ++;
			// } else if ($('input[name="companyCode"]').val().length <= 9){
				// $('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호 10자리를 입력해주세요.</strong>')
				// checkFalse ++; 
			// } else if ($('input[name="companyCode"]').val() != companyCodeCheck){
			// 	if($('input[name="companyCodeOK"]').prop('checked') == false){
			// 		$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
			// 		checkFalse ++; 
			// 	}
			// } else if ($('input[name="companyID"]').val() != companyIDCheck){
			// 	if ($('input[name="companyIDOk"]').prop('checked') == false){
			// 		$('input[name="companyIDOk"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
			// 		checkFalse ++; 
			// 	}
			// }
		}
		
		if(checkFalse == 0){
			sendData(useApi,'writeform',types);
		}
	})
}

function selectBigCountry(val){
    var bigCountry = val.value;
    var country ='';
    var code ='';
    switch (bigCountry) {
		case '충북':
			code = '33';
			break;
		case '충남':
			code = '34';
			break;
		case '세종':
			code = '29';
			break;
		case '강원':
			code = '32';
			break;
		case '대전':
			code = '25';
			break;
		case '전남':
			code = '36';
			break;
    }
	if(code != '33'){
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
    
                            $.each(data.result,function(key, value){
                                country += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
                                // console.log(value['addr_name']);
                            })
                        }
                    })
                }
    
            })
	} else {
		country += '<option value="괴산군">괴산군</option>';
		country += '<option value="단양군">단양군</option>';
		country += '<option value="보은군">보은군</option>';
		country += '<option value="영동군">영동군</option>';
		country += '<option value="옥천군">옥천군</option>';
		country += '<option value="음성군">음성군</option>';
		country += '<option value="제천시">제천시</option>';
		country += '<option value="증평군">증평군</option>';
		country += '<option value="진천군">진천군</option>';
		country += '<option value="청주시">청주시</option>';
		country += '<option value="충주시">충주시</option>';			
	}
    $('select[name="country"]').html(country);
}

function membershipCheck(membership){
    
        var currentVal = $('select[name="membership"] option:selected').text();
    
        if(currentVal == membership){
            $('input[name="membershipChk"]').val('');
        }else{
            $('input[name="membershipChk"]').val('change');
        }
}
//우편번호 API
function zipCodeFind(){
	new daum.Postcode({
		oncomplete: function(data) {
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
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipCodeArea').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('address01Area').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('address02Area').focus();
		}		
	}).open({
		popupName: 'postcodePopup', //팝업 이름을 설정(영문,한글,숫자 모두 가능, 영문 추천)
	});
}
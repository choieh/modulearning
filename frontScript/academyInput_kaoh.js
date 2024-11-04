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
	var startDate = '';
    var endDate = '';
     var countryOpt= '';
     $.ajax({
         url : '../api/apiAcademy.php',
         data : {'bigCountry' : memo,
                 'countryList' : 'Y'},
         type : 'GET',
         success : function(data){
             // console.log(data);
             $.each(data.academy, function(){
                 countryOpt += '<option value='+this.country+'>'+this.country+'</option>';
             })
             $("select[name='country']").html(countryOpt);
         }
     })
	writePrint();

	//게시판 생성
	function writePrint(){
        var code = '';
		var writes ='';

			//파일등록
			 writes += '<h2>파일로 업로드하기</h2>'
			
			 writes += '<form class="fileUploadform" method="post" action="academyInfoUpload.php" enctype="multipart/form-data">';
			 writes += '<ul>';
			 writes += '<li>';
			 writes += '<h1>등록샘플</h1>';
			 writes += '<button type="button" onclick="location.href=\'../attach/docs/학원연합회_등록양식.xlsx\'">양식 및 샘플 내려받기</button>&nbsp;';
			 writes += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
			 writes += '</li>';
			 writes += '<li>';
			 writes += '<h1>파일등록(이름)</h1>';
			 writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
			 writes += '</li>';
			 writes += '</ul>';
			 writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
			 writes += '</form>';

			//개별등록,수정
			writes += '<h2>개별 등록</h2>'
			writes += '<form class="writeform" method="post">';
			writes += '<ul>';
			//학원명
			// writes += '<li>';
			// writes += '<div class="halfDiv">';
			// writes += '<h1>학원명</h1>';
			// writes += '<div class="datePicker"><input type="text" name="lectureStart" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
			// writes += '<div class="datePicker"><input type="text" name="lectureEnd" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;';
            // writes += '</div>';
            // writes += '</li>';
            writes += '<input type="hidden" name="bigCountry" value="'+memo+'">';
            writes += '<li>';
			writes += '<div class="halfDiv">';
            writes += '<h1>* 지역</h1>';
            writes += '<select name="country">';
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
                                writes += '<option value="'+value['addr_name']+'">'+value['addr_name']+'</option>';
                                // console.log(value['addr_name']);
                            })
                        }
                    })
                }
    
            })
            
            
            // writes += countryOpt;
            writes += '</select>';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
            writes += '<h1>* 학원명</h1>';
            writes += '<input type="text" name="academyName"/>';   
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>* 사업자번호</h1>';
			writes += '<input type="text" name="companyCode" onKeyup="numCheck(this)" maxLength="10"/>';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>* 주소</h1>';
            writes += '<input type="text" name="address" id="addr" placeholder="주소" style="margin-right:10px;" readonly="readonly"/>';
            writes += '<input type="text" name="zipCode" id="zipCode" placeholder="우편번호" style="margin-top:8px;"readonly="readonly"/>&nbsp;<button type="button" onClick="daumPostcode();">주소검색</button> <br/>';
            writes += '<h1>상세주소</h1>';
            writes += '<input type="text" name="address2" id="detailAddress" stlye="margin-top: 8px;"/>';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>개원일</h1>';
			writes += '<div class="datePicker"><input type="text" name="academyDate" class="cal" value="'+startDate+'" readonly="readonly" /></div>';
            writes += '</div>';
            
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>개원상태</h1>';
            writes += '<select name="status">';
            writes += '<option>개원</option>';
            writes += '<option>폐원</option>';
            writes += '</select>';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>분야</h1>';
            writes += '<input type="text" name="branch">';
            writes += '</div>';
            writes += '</li>';
            
            writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>종류</h1>';
            writes += '<input type="text" name="type">';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
            writes += '<h1>* 학원설립관리자</h1>';
            writes += '<input type="text" name="academyCEO">';
            writes += '</div>';
            writes += '</li>';

            writes += '<li>';
			writes += '<div class="halfDiv">';
            writes += '<h1>* 회원구분</h1>';
            writes += '<select name="membership">';
            writes += '<option value="">선택</option>';
            writes += '<option value="N">비회원</option>';
            writes += '<option value="Y">정회원</option>';
            
            writes += '</select>';
            
            writes += '</div>';
            writes += '</li>';
            writes += '</ul>';
            

			writes += '<div class="btnArea">';
			writes += '<button type="button" onClick="checkStudyForm()">등록하기</button>';
			writes += '<button type="button" onClick="resetInput()">초기화</button>';
			writes += '</div>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			writes += '</form>';

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
		//ajaxAct();
	}
}

// function ajaxAct(listPage){
// 	listPage = listPage ? listPage : page ;
// 	page = listPage;
// 	var listAjax = $.get(useTempApi,'page='+page+'&list='+listCount,function(data){
// 		totalCount = data.totalCount;
// 		var lists = '';
// 		var j = totalCount;
// 		if(page != 1){
// 			j = (page-1) * listCount
// 		}
// 			if (totalCount != 0){
// 				j = totalCount;
// 				$.each(data.study,  function(){
// 					lists += '<tr>';
// 					lists += '<td>'+j+'</td>';
// 					lists += '<td>'+this.userID+'<br /><input type="text" name="userName" value="'+this.userName+'"></td>';
// 					lists += '<td><input type="text" name="birth" value="'+this.birth+'"><br /><input type="text" name="sex" value="'+this.sex+'"></td>';
// 					lists += '<td><input type="tel" name="mobile01" class="year" value="'+this.mobile01+'">-<input type="tel" name="mobile02" class="year" value="'+this.mobile02+'">-<input type="tel" name="mobile03" class="year" value="'+this.mobile03+'">';
// 					lists += '<br><input type="text" name="email01" class="name" value="'+this.email01+'">@<input type="text" name="email02" class="name" value="'+this.email02+'"></td>';
// 					lists += '<td><input type="text" name="companyCode" value="'+this.companyCode+'"><br />'+this.companyName+'</td>';
// 					lists += '<td><input type="text" name="lectureStart" value="'+this.lectureStart+'"><br /><input type="text" name="lectureEnd" value="'+this.lectureEnd+'"></td>';
// 					lists += '<td><input type="text" name="contentsCode" value="'+this.contentsCode+'"><br />'+this.contentsName+'</td>';
// 					lists += '<td><input type="text" name="tutor" value="'+this.tutor+'"><br />'+this.tutorName+'</td>';
// 					lists += '<td><input type="text" name="price" value="'+this.price+'"><br /><input type="text" name="rPrice" value="'+this.rPrice+'"></td>';
// 					lists += '<td><input type="text" name="serviceType" value="'+this.serviceType+'"><br />'+this.inputDate+'</td>';
// 					lists += '<td>'+this.lectureEA+'</td>';
// 					lists += '</tr>';
// 					//항목 옆에 유효성 체크 해줄것
// 					j--;
// 				})
// 			}
// 		$('.BBSWrite tbody').html(lists);
// 	})
// }



//학원정보 개별 등록
function writeStudy(){
	var sendData = $('.writeform').serialize();
	$.ajax({
		url:'../api/apiAcademyInfo.php',
		type:'POST',
		data:sendData,
		success:function(data){
            console.log(data);
            if(data.result == 'fail'){
                alert('등록에 실패하였습니다.')
            }else if(data.result == 'duplication'){
                alert('동일한 지역에 중복된 학원명이 존재합니다.\n지역과 학원명을 확인해주세요.');
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

function tempRegister(){
	window.open("tempRegister.php","임시등록","width=1300,height=800,top=0,left=0,scrollbar=yes,location=yes,menubar=no,status=no,titlebar=no,toolbar=no","kiraedu")
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
    // console.log(country);
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
    if(memo != '대전'){
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
    }
    
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

	// if(checkFalse == 0){
	// 	writeStudy();
	// }
}

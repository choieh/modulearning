function listAct(){
	writeAct();
}

//게시판 보기 스크립트 시작
function writeAct(){
	var startDate = '';
	var endDate = '';
    writePrint();
    
    
	//게시판 생성
	function writePrint(){
		var writes ='';

			//파일등록
			// writes += '<h2>파일로 업로드하기</h2>'
			
			// writes += '<form class="fileUploadform" method="post" action="studyUpload.php" enctype="multipart/form-data">';
			// writes += '<ul>';
			// writes += '<li>';
			// writes += '<h1>등록샘플</h1>';
			// writes += '<button type="button" onclick="location.href=\'../attach/docs/수강등록.xlsx\'">양식 및 샘플 내려받기</button>&nbsp;';
			// writes += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
			// writes += '</li>';
			// writes += '<li>';
			// writes += '<h1>파일등록(주민번호)</h1>';
			// writes += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
			// writes += '</li>';
			// writes += '<li>';
			// writes += '<h1>임시등록 데이터</h1>';
			// writes += '<span style="width:78%;" id="tempCheck"><span>';
			// writes += '</li>';
			// writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
			// writes += '</form>';

			//개별등록,수정
            writes += '<h2 style="font-size:18px;">수강생등록 및 수강신청</h2>';
            writes += '<div style="padding: 15px 0px; font-size:16px; color:#ff0000;"><strong>※ 법정의무교육을 이수할 학원 소속 인원을 등록합니다.</strong></div>';
            
			writes += '<form class="writeform" id="PAYINFO" action="02_studyKaoh_input.php" method="post">';
			writes += '<ul>';
			//기간설정
			writes += '<li>';
			// writes += '<div class="halfDiv">';
			// writes += '<h1>수강기간</h1>';
			// writes += '<div class="datePicker"><input type="text" name="lectureStart" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
			// writes += '<div class="datePicker"><input type="text" name="lectureEnd" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;';
			// writes += '</div>';
			// 과정선택
			// writes += '<li id="contentsCode">';
			// writes += '<h1>과정선택</h1>';
			// writes += '<input name="searchName" type="text" /> <button type="button" name="searchNameBtn" onClick="searchSelect(\'contentsCode\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
            // writes += '</li>';
            
            //수강인원 수
            writes += '<li id="userCount">';
			writes += '<h1>수강인원 수</h1>';
            writes += '<input type="text" name="userCount" onKeyup="numCheck(this)"/> <button type="button" onClick="studyCalcul()">확인</button>';
            writes += '<strong style="color:#ff0000;">&nbsp;수강 인원 수를 입력하고 확인 버튼을 누르면 입력창이 활성화됩나다.</strong>';
            
            if(joinURL != 'jnhy'){
                writes += '<li>- 한국학원총연합회 '+adminCountry+'지회 정회원은 학원 당 5명까지 추가비용 없이 수강신청 됩니다.</li>';

                if(joinURL != 'djhy'){
					if(joinURL == 'kwhy'){
						writes += '<li>※ 교육비 정책 : 정회원 5명까지 무료, 5명 초과 1인당 1만원</li>';
					} else {
						writes += '<li>※ 교육비 정책 : 사전 신청 정회원 5명 초과 1인당 1만원 / 비회원 1인당 3만원</li>';
					}
                }else{
                    writes += '<li>※ 교육비 정책 : 사전 신청 정회원 5명 초과 1인당 1만원</li>';
                }
            }
            
            
            
            writes += '</li>';
            
            writes += '</ul>';
            writes += '<div>';
            writes += '<h2 style="border-left: 3px solid #565656; padding-left: 8px !important;">수강신청정보 입력</h2>';
            writes += '<table style="width:100%; text-align:center;" class="inputStudyTable">';
            writes += '<thead style="background:#D9E5FF;">';
            writes += '<tr style=" height:50px;">';
            writes += '<th style="width:5%;">순번</th>';
            //전남시 직책 추가
            if(joinURL == 'jnhy'){
                writes += '<th style="width:5%;">직책</th>';
            }
            writes += '<th style="width:20%;">수강생 명</th>';
            writes += '<th style="width:20%;">휴대폰 번호<br/> <strong style="color:#ff0000;">※ 입력된 휴대폰번호로 수강아이디가 발송됩니다. 정확히 입력해주세요.</strong></th>';
            writes += '<th style="width:10%;">생년월일</th>';
            writes += '<th style="width:10%;">성별</th>';
            // writes += '<th style="width:10%;">삭제</th>';
            writes += '<th style="width:10%;">초기화</th>';
            writes += '</tr>';
            writes += '</thead>';
            
            writes += '<tbody>';
            writes += '</tbody>';

            writes += '</table>';

            writes += '<table style="width:100%; text-align:center; margin-top:50px;" class="totalPriceTable">';
            writes += '<tbody>';
            writes += '</tbody>';
            
            writes += '</table>';
            writes += '</div>';
            writes += '<div class="btnArea">';
            writes += '<button type="button" onClick="checkStudyForm()">등록하기</button>';
			
			// writes += '<button type="button" onClick="resetInput()">초기화</button>';
			writes += '</div>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
            // writes += '</form>';
            
            // writes += '<form method="post" id="LGD_PAYINFO" action="../../payments/payreq_crossplatform.php" style="display:none;">';
            // writes += '<form method="post" id="LGD_PAYINFO"  style="display:none;">';
            writes += '<input type="hidden" name="PayCheck" id="TEST" value="Y"/>';
            // writes += '<input type="hidden" name="CST_PLATFORM" id="CST_PLATFORM" value="test"/>';
            // writes += '<input type="hidden" name="CST_MID" id="CST_MID" value="kiraedu"/>'; 
            // writes += '<input type="hidden" name="LGD_BUYER" id="LGD_BUYER" value="홍길동"/>'; 
            // writes += '<input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value="학원연합회-법정의무교육"/>'; 
            // writes += '<input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value="1000"/>';   
            writes += '<input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value=""/>'; 
            // writes += '<input type="hidden" name="LGD_OID" id="LGD_OID" value="test_1234567890020"/>'; 
            writes += '<input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_CUSTOM_USABLEPAY" value="SC0010">';
            // writes += '<input type="hidden" name="LGD_WINDOW_TYPE" id="LGD_WINDOW_TYPE" value="iframe">';
            // writes += '<input type="hidden" name="LGD_CUSTOM_SWITCHINGTYPE" id="LGD_CUSTOM_SWITCHINGTYPE" value="IFRAME">';

            writes += '</form>';
        // console.log(loginUserID);
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
        tempCheck();
		//ajaxAct();
	}
}

function tempCheck(){
	var listAjax = $.get(useTempApi,function(data){
		if(data.totalCount == 0) {
			lists = '파일을 업로드 하세요.';
		} else {
			lists = '<span onClick="tempRegister()" style="cursor:pointer;">처리되지 않은 '+data.totalCount+'건의 데이터가 있습니다. (확인하기)</span>';
		}
		$('#tempCheck').html(lists);
	})
}


//수강인원 계산
function studyCalcul(){
    var noPay = 'N';
    var userCount = $('input[name="userCount"]').val();
    // alert(userCount);
    

    var priceRow = '';
    var inputRow = '';
    var totalPrice = 0;
    var membership = '';
    var userType = '';

    if(userCount == "" || userCount == 0){
        alert("수강인원을 입력해주세요!");
        $('input[name="userCount"]').focus();
        return;
    }
       
    for(var i=1;i<=userCount;i++){
        inputRow += '<tr class="inputRow'+i+'">';
        inputRow += '<td>'+i+'</td>';
        if(joinURL == 'jnhy'){
            inputRow += '<td>';
            inputRow += '<select name="department[]" style="padding:5px;">';
            inputRow += '<option value="학원설립운영자">학원설립운영자</option>';
            inputRow += '<option value="강사">강사</option>';
            inputRow += '<option value="일반직원">일반직원</option>';
            inputRow += '</select>';
            inputRow += '</td>';
        }
        inputRow += '<td><input type="text" name="userName[]"></td>';

        inputRow += '<td><input type="text" name="mobile01[]" maxLength="3" onKeyup="numCheck(this)" style="width:80px;" placeholder="예) 010"> - ';
        inputRow += '<input type="text" name="mobile02[]" maxLength="4" onKeyup="numCheck(this)" style="width:80px;" placeholder="예) 1234"> - '
        inputRow += '<input type="text" name="mobile03[]" maxLength="4" onKeyup="numCheck(this)" style="width:80px;" placeholder="예) 5678"></td>';

        inputRow += '<td><input type="text" name="resno01[]" maxLength="6" onKeyup="numCheck(this)" placeholder="주민등록번호 앞 6자리"></td>';
        inputRow += '<td><select name="sex[]" style="padding:5px;"><option value="1">남</option> <option value="2">여</option></select></td>';
        
        // inputRow += '<td><button type="button" onClick="delRow('+i+')">삭제</button></td>';
        inputRow += '<td><button type="button" onClick="removeRow('+i+')">초기화</button></td>';
        
        inputRow += '<tr>';
    }

    $.get('../api/apiAcademy.php', 'companyCode='+loginCompanyCode+'&countStudy=Y',function(data){
        $.each(data.academy,function(){
            var membership = this.membership;
            var countStudy = this.countStudy//등록된 수강 수
            
            var totalStudy = Number(countStudy)+Number(userCount);
           
            if(joinURL == 'djhy'){ //대전시 학원연합회 5명 이하 만 수강등록
                // console.log(totalStudy);
                if(totalStudy <= 5){
                    if(membership != 'N'){ //정회원이라면 5명 이후부터 1인당 교육비 1만원 추가
                        if(totalStudy > 5){
                        userType = "정회원";
                            var countCel = Number(totalStudy)-5;
                            totalPrice = Number(countCel*10000);
                            // console.log(this.countStudy);
                        }else{
                            noPay = 'Y';
                        }
                    }else{ //비회원이라면 1명당 교육비 3만원 추가
                            userType = "비회원";
                            var countCel = Number(userCount);
                            totalPrice = countCel*30000;
                    }
                }else{
                    alert('수강등록 가능한 인원을 초과하였습니다. 대전시학원연합회로 문의바랍니다.');
                    history.go(0);
                }

            }else{

                if(membership != 'N'){ //정회원이라면 5명 이후부터 1인당 교육비 1만원 추가
                    if(totalStudy > 5){
                    userType = "정회원";
                        var countCel = Number(totalStudy)-5;
                        totalPrice = Number(countCel*10000);
                        // console.log(this.countStudy);
                    }else{
                        noPay = 'Y';
                    }
                }else{ //비회원이라면 1명당 교육비 3만원 추가
                        userType = "비회원";
                        var countCel = Number(userCount);
                        totalPrice = countCel*30000;
                }
            }

        })
        priceRow += '<tr style="height:50px; border:1px solid #000;"><td style="width:15%; background:#F6F6F6; font-weight:bold;">회원구분</td>';
        priceRow += '<td style="width:15%; ">'+userType+'</td>';
        priceRow += '<td style="width:15%; background:#F6F6F6; font-weight:bold;">수강인원</td>';
        priceRow += '<td style="width:15%;" class="userCount">'+userCount+'</td>';
        priceRow += '<td style="width:15%; background:#F6F6F6; font-weight:bold;">수강료총액</td>';
        priceRow += '<td style="width:15%;" class="totalPrice">'+priceReplace(totalPrice)+'원</td></tr>';
        priceRow += '<input type="hidden" name="totalPrice" value="'+totalPrice+'">';
        priceRow += '<input type="hidden" name="membership" value="'+membership+'">';
        priceRow += '<input type="hidden" name="noPay" value="'+noPay+'">';
        
        
        $(".inputStudyTable tbody").html(inputRow);
        $(".totalPriceTable tbody").html(priceRow);
    })
        
     
        
    
    


}

//tosspayments 결제모듈연동
function LPad(digit, size, attatch)
{
	var add = "";
	digit = digit.toString();
	if (digit.length < size) 
	{
		var len = size - digit.length;
		for (i = 0; i < len; i++) 
		{
			add += attatch;
		}
	}
	return add + digit;
}

function makeoid()
{
	var now = new Date();
	var years = now.getFullYear();
	var months = LPad(now.getMonth() + 1, 2, "0");
	var dates = LPad(now.getDate(), 2, "0");
	var hours = LPad(now.getHours(), 2, "0");
	var minutes = LPad(now.getMinutes(), 2, "0");
	var seconds = LPad(now.getSeconds(), 2, "0");
	var timeValue = years + months + dates + hours + minutes + seconds; 
	// document.getElementById("LGD_OID").value = "test_" + timeValue;
}

/*
* 인증요청 처리 
*/
function doPay()
{
	// OID 생성
	makeoid();
    // 결제창 호출
    document.getElementById("PAYINFO").submit();
}
//모듈연동 끝

function numCheck(el){
        
        var regNumber = /^[0-9]*$/;
        var temp = el.value;
        if(!regNumber.test(temp)){
            el.value = temp.replace(/[^0-9]/g,"");
            // console.log(el.value);
        }
    }

function resetInput(){
	$('.writeform input[type="text"]').val('');
	$('.writeform div.').html('')
	$('.writeform button[type="submit"]').html('등록하기')
}

function tempRegister(){
	window.open("tempRegister.php","임시등록","width=1300,height=800,top=0,left=0,scrollbar=yes,location=yes,menubar=no,status=no,titlebar=no,toolbar=no","kiraedu")
}

//선택한 행 삭제
function delRow(val){
    $('.inputRow'+val).remove();
    var count= Number($('input[name=userCount]').val())-1;
    // console.log(count);
    $('input[name=userCount]').val(count);
    var membership = $('input[name=membership]').val();
    if(membership != 'N'){
        var memberCount = Number(count)-5;
        var totalPrice = memberCount*10000;
        $('.totalPrice').html(priceReplace(totalPrice)+"원");
        
    }else{
        var memberCount = Number(count);
        var totalPrice = memberCount*30000;
        $('.totalPrice').html(priceReplace(totalPrice)+"원");
    }

    $('.userCount').html(count);
    // studyCalcul();
}
//선택한 행 초기화
function removeRow(val){
    $('.inputRow'+val).children().children('input[type="text"]').val('');
}


//입력폼 체크
function checkStudyForm(){
    // console.log(joinURL);
    var check = false;
    var noPay = $('input[name="noPay"]').val();
    var userCount= $('input[name="userCount"]').val();
        $('.writeform strong.price').remove();
        
        if($('.writeform input[name="userCount"]').val() =='') {
            alert('수강인원을 입력해주세요.');
            return false;
        }

        var userName = new Array(userCount);
    var mobile01 = new Array(userCount);
    var mobile02 = new Array(userCount);
    var mobile03 = new Array(userCount);

    var resNo = new Array(userCount);
    

    if($('.writeform input[name="userCount"]').val() =='') {
        alert('수강인원을 입력해주세요.');
        return false;
    }
    var errorC = 0;
    for(var i=0;i<userCount;i++){

        userName[i] = $('input[name="userName[]"]')[i].value;
        mobile01[i] = $('input[name="mobile01[]"]')[i].value;
        mobile02[i] = $('input[name="mobile02[]"]')[i].value;
        mobile03[i] = $('input[name="mobile03[]"]')[i].value;
        resNo[i] = $('input[name="resno01[]"]')[i].value;
        
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

        // console.log(userName[i]);
        if( !(pattern_spc.test(userName[i])) && !(pattern_kor.test(userName[i])) ){
            alert((i+1)+'번 항목에 수강생이름을 입력해주세요. (영문 및 특수문자 불가)');
            return;
        }
        if(mobile01[i] == "" || mobile02[i] =="" || mobile03[i] == ""){
            alert((i+1)+'번 항목에 수강생 전화번호를 입력해주세요.');
            return;
        }
        if(resNo[i] == ""){
            alert((i+1)+'번 항목에 생년월일을 입력해주세요.');
            return;
        }
        (function(i){
            $.ajax({
                url : '../api/apiStudyAcademy.php',
                type : 'POST',
                data : {duplicate : 'Y',
                        userName : userName[i],
                        mobile01 : mobile01[i],
                        mobile02 : mobile02[i],
                        mobile03 : mobile03[i],
                        resNo : resNo[i]
                    },
                async: false,
                success:function(data){
                    if(data.result == 'duplicate'){
                        alert((i+1)+"번째 줄의 정보는 이미 존재하는 아이디입니다.");
                        // check = true;
                        errorC++;
                    }
                }
            });
            
        })(i);
        
        

    }
    if(errorC){
        return;
    }
    
    //세종시 결제금액 있을시 모듈실행
    if(joinURL == 'sjhy' || joinURL == 'kwhy'){  
        
        //토스페이먼츠 카드사심사
        if(noPay != 'Y'){

            //결제 할 금액이 있다면 결제모듈 실행
            //결제완료 후 수강등록 ../payments/pesres.php
            
            doPay();

        }else{
        //없다면 바로 수강등록
        // ../api/apiStudyAcademy.php

        var sendData = $('.writeform').serialize();
    //    console.log(sendData);
            $.ajax({
                url : '../api/apiStudyAcademy.php',
                data : sendData,
                type : 'POST',
                success:function(data){
                    //console.log(data);
                    if(data.result == 'success'){
                        alert(data.resultMsg);
                        location.href='/adminKaoh/01_studyKaoh.php?locaSel=1001';
                    }else{
                        //alert('입력하신 수강생의 정보가 이미 등록 되어있습니다. 다시확인바랍니다.');
                        alert('전제 중복 또는 전체 등록실패 입니다. 시스템팀에 문의 하세요.');
                    }
                    
                },
                fail:function(){
                    alert('등록에 실패하였습니다.')
                }

            })
        }

    }else{

            var sendData = $('.writeform').serialize();
        //    console.log(sendData);
            $.ajax({
                url : '../api/apiStudyAcademy.php',
                data : sendData,
                type : 'POST',
                success:function(data){
                    // console.log(data);
                    if(data.result == 'success'){
                        alert(data.resultMsg);
                        location.href='/adminKaoh/01_studyKaoh.php?locaSel=1001';
                    }else{
                        //alert('입력하신 수강생의 정보가 이미 등록 되어있습니다. 다시확인바랍니다.');
                        alert('전제 중복 또는 전체 등록실패 입니다. 시스템팀에 문의 하세요.');
                    }
                    
                },
                fail:function(){
                    alert('등록에 실패하였습니다.')
                }

            })
        // }
    }
    
	
}

function priceReplace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


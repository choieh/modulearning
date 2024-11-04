//보드 정보 선언
var useApi = '../api/apiEdumiJoin.php';

//출력변수 지정
var userID = '';
var userName = '';
var userLevel = '';
var birth = '';
var sex = '';
var sexName = '';
var phone01 = '';
var phone02 = '';
var phone03 = '';
var mobile01 = '';
var mobile02 = '';
var mobile03 = '';
var email01 = '';
var email02 = '';
var zipCode = '';
var address01 = '';
var address02 = '';
var smsReceive = '';
var emailReceive = '';
var oldGrade = '';
var oldLevel = '';
var changeDate= false;
var companyName = '';
var department = '';
var commission = '';
var bank = '';
var bankNum = '';

function agreeAct(){
	var agreeWrite = '';
	$.get('../api/apiSiteInfo.php',{},function(data){
		agreeWrite += '<div><h1>이용약관<input type="checkbox" id="checkAgree" name="checkAgree" /><label for="checkAgree">동의합니다.</label></h1>';
		agreeWrite += '<div>'+data.agreement+'</div>';
		agreeWrite += '</div>';
		agreeWrite += '<div><h1>개인정보처리방침<input type="checkbox" id="checkPrivate" name="checkPrivate" /><label for="checkPrivate">동의합니다.</label></h1>';
		agreeWrite += '<div>'+data.privacy+'</div>';
		agreeWrite += '</div>';
		agreeWrite += '<div class="btnArea"><button type="button" onclick="checkAgree()">교육신청 계속하기</button></div>';
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('agreementPage')
		$('#contentsArea').html(agreeWrite);
	})
}

function mobileCheck(names,birthNum,sexType){
	birthNum = birthNum ? birthNum : '';
	sexType = sexType ? sexType : '';
	$('.mobileArea h1 input[name="checkMobile"]').prop('checked',true);
	$('.mobileArea form:eq(0)').before('<strong class="blue">본인인증이 완료되었습니다</strong>')
	$('.mobileArea form').remove();
	userName = names;
	birth = birthNum.slice(2);
	sex = sexType;
	
}

function memberChk(){	
	if($('.agreementPage input[name="checkAgree"]').prop('checked') != true){
		alert('이용약관에 동의해주세요')
	}else if ($('.agreementPage input[name="checkPrivate"]').prop('checked') != true){
		alert('개인정보 처리방침에 동의해주세요')
	}else {
		$('#form_memChk div strong.red').remove();
		var checkFalse = 0;		
		if($('input[name="userName"]').val() == ''  ){
			$('input[name="userName"]').after('<strong class="red">&nbsp;&nbsp;이름을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if($('input[name="birth"]').val() == ''){
			$('input[name="birth"].span').after('strong class="red">&nbsp;&nbsp;<생년월일을 입력해주세요.</strong>')
			checkFalse ++;
		} else if ($('input[name="birth"]').val().length <= 5){
			$('input[name="birth"].span').after('<strong class="red">&nbsp;&nbsp;생년월일 6자리를 입력해주세요.</strong>')
			checkFalse ++; 
		}
		if($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == '' ){
			$('input[name="mobile03"]').after('<strong class="red">&nbsp;&nbsp;휴대폰 번호를 입력해주세요.</strong>')
			checkFalse ++;
		}
		if(checkFalse == 0){
			form_memChk.submit();
		}	
	}
}

function checkAgree(){
	if($('.agreementPage input[name="checkAgree"]').prop('checked') != true){
		alert('이용약관에 동의해주세요')
	}else if ($('.agreementPage input[name="checkPrivate"]').prop('checked') != true){
		alert('개인정보 보호정책에 동의해주세요')
	}else{
		viewMemberInfo();
	}
}

function viewMemberInfo(){
	//var seq=''
	//사용옵션 가져오기		
	if(loginUserID != ''){
		var writeAjax = $.get(useApi,{'userID':loginUserID},function(data){
			$.each(data.member, function(){
				seq = this.seq;
				userID = this.userID;
				userName = this.userName;
				userLevel = this.userLevel.userLevel;
				birth = this.birth;
				sex = this.sex;
				sexName = this.sexName;
				phone01 = this.phone01;
				phone02 = this.phone02;
				phone03 = this.phone03;
				mobile01 = this.mobile01;
				mobile02 = this.mobile02;
				mobile03 = this.mobile03;
				email01 = this.email01;
				email02 = this.email02;
				zipCode = this.zipCode;
				address01 = this.address01;
				address02 = this.address02;
				smsReceive = this.smsReceive;
				emailReceive = this.emailReceive;
				chageDate = this.userLevel.changeDate;
				oldGrade = this.userLevel.oldGrade;
				userGrade = this.userLevel.userGrade;
				companyName = this.company.companyName;
				department = this.company.department;
				commission = this.commission;
				bank = this.bank;
				bankNum = this.bankNum;	
			})	
			writePrint()
		})
	}else{
		seq = ''
		writePrint()
	}
	
	//게시판 생성
	function writePrint(){
		var writes ='';
		writes += '<form class="writeform" autocomplete="off">';
		
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';
		
		//입력영역 시작
		writes += '<ul>';
		
		//아이디 입력
		if(loginUserID==''){
			writes += '<li class="mustCheck">'
		}else{
			writes += '<li>'
		}
		writes += '<h1>아이디</h1>';
		if(loginUserID == ''){
			writes += '<input type="text" name="userID" class="name" imeMode="disabled" placeholder="영문 또는 숫자로 6~20자" />&nbsp;<button type="button" onclick="idUseCheckEdumi(\''+useApi+'\',\'userID\')">중복확인</button><input type="checkbox" name="idUseOk" value="Y" style="display:none;"/>';
		}else{
			writes += '<input type="hidden" name="userID" value="'+userID+'"><strong>'+userID+'</strong>';
		}
		writes += '</li>';
		writes += '<input type="hidden" name="sex" value="1">';
		writes += '<input type="hidden" name="birth" value="180212"/>';
		
		//이름입력
		writes += '<li class="mustCheck"><h1>이름</h1><input type="text" name="userName" class="name" maxlength="20" value="'+userName+'" /></li>';
	
		//비밀번호입력
		writes += '<li class="mustCheck"><h1>비밀번호</h1><input type="password" name="pwdCheck"  class="name" maxlength="20" value=""/></li>';
		writes += '<li class="mustCheck"><h1>비밀번호확인</h1><input type="password" name="pwd" class="name" maxlength="20" value=""/></li>';
	
		//
		writes += '<li class="mustCheck"><h1>회사명</h1><input type="text" name="companyName" class="name" value="" /></li>';

		//
		writes += '<li class="mustCheck"><h1>사업자번호</h1><input type="text" name="companyCode" class="name" maxlength="10" value="" onkeydown="showKeyCode(event)" /><span id="keyinfo"></span></li>';

		//휴대폰입력
		writes += '<li class="mustCheck"><h1>휴대전화</h1><select name="mobile01" class="'+mobile01+'">';
		writes += '<option value="010">010</option>';
		writes += '<option value="011">011</option>';
		writes += '<option value="016">016</option>';
		writes += '<option value="017">017</option>';
		writes += '<option value="018">018</option>';
		writes += '<option value="019">019</option>';
		writes += '</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="mobile02" maxlength="4" value="'+mobile02+'" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel" name="mobile03" type="tel" maxlength="4" value="'+mobile03+'" /></li>';
		
		//이메일 입력
		writes += '<li class="mustCheck"><h1>Email</h1><input class="name" name="email01" type="text" maxlength="20" value="'+email01+'" />&nbsp;@&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+email02+'" /></li>';

		writes += '</ul>';
		writes += '</form>';
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkMemberForm()">';
		if(loginUserID != ''){
			writes += '수정완료'
		}else{
			writes += '신청하기'
		}
		writes += '</button>';
		writes += '</div>';
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);		
		$('#titleArea').css('background-image','url(../images/studycenter/bg_member02.png)');
		
		findOpt();//selct 선택자 찾기
		emailSelect();//이메일 select 호출 사용시 같이 호출	
		$('#zipCodeArea, .findZipCode').click(function(){zipCodeFind()})
		var	mustInput = '&nbsp;&nbsp;<strong class="price">(*)</strong>';
		$('.mustCheck > h1').append(mustInput)//필수요소 사용
		$('input[name="userID"]').keydown(function(){keyCheck('numbEng',this)})
		$('input[name="phone02"],input[name="phone03"],input[name="mobile02"],input[name="mobile03"]').keyup(function(){keyCheck('numb',this)})
	}

}

//입력폼 체크
function checkMemberForm(){

	var regPwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	$('.mustCheck strong.red').remove();
	var checkFalse = 0;
	$('.mustCheck input[type="tel"], .mustCheck input[type="text"], .mustCheck input[type="password"]').each(function(){
		if($(this).val() == ''){
			checkFalse ++;
		}
	});
	if(seq==''){
		if($('input[name="userID"]').val() == ''){
			$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="red">아이디를 입력해주세요</strong>')
			checkFalse ++;
		}else if($('input[name="idUseOk"]').prop('checked') == false){
			$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="red">아이디 중복체크를 해주세요</strong>')
			checkFalse ++;
		}
	}
	if(seq != ''){
		var chageUserLevel = $('select[name="userLevel"]').val();
		var oriUserLevel = $('#changeGradeCheck').attr('class');
		if(chageUserLevel != oriUserLevel && $('#changeGradeCheck').prop('checked') == false){
			$('select[name="account"]').after('&nbsp;&nbsp;<strong class="red">변경체크를 해주셔야합니다.</strong>')
			checkFalse ++;
		}
		if($('input[name="userName"]').val() == ''){
			$('input[name="userName"]').after('&nbsp;&nbsp;<strong class="red">이름을 입력해주세요.</strong>')
			checkFalse ++;
		}	
		if($('input[name="birth"]').val() == ''){
			$('input[name="birth"]').after('&nbsp;&nbsp;<strong class="red">생년월일을 입력해주세요.</strong>')
			checkFalse ++;
		}
	}
	if( $.trim($('input[name="pwdCheck"]').val()) == ''){
		$('input[name="pwdCheck"]').after('&nbsp;&nbsp;<strong class="red">비밀번호를 입력해주세요</strong>')
		checkFalse ++;
	}else if(!regPwd.test( $.trim( $('input[name="pwdCheck"]').val() ) )){	//20170424 이응민 추가
		$('input[name="pwdCheck"]').after('&nbsp;&nbsp;<strong class="red">비밀번호를 영문,숫자 혼합하여 6~20자로 입력해주세요.</strong>')
		checkFalse ++;
	}else if($('input[name="pwd"]').val() == ''){
		$('input[name="pwd"]').after('&nbsp;&nbsp;<strong class="red">비밀번호를 확인해주세요</strong>')
		checkFalse ++;
	}else if($('input[name="pwdCheck"]').val() != $('input[name="pwd"]').val()){
		$('input[name="pwd"]').after('&nbsp;&nbsp;<strong class="red">비밀번호가 일치하지 않습니다.</strong>')
		checkFalse ++;
	}
	if($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == '' ){
		$('input[name="mobile03"]').after('&nbsp;&nbsp;<strong class="red">휴대폰 번호를 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="email01"]').val() == '' || $('input[name="email02"]').val() == '' ){
		$('input[name="email02"]').after('&nbsp;&nbsp;<strong class="red">이메일을 모두 입력해주세요.</strong>')
		checkFalse ++;
	}
	if($('input[name="companyName"]').val() == ''){
		$('input[name="companyName"]').after('&nbsp;&nbsp;<strong class="red">회사명을 입력해주세요.</strong>')
		checkFalse ++;
	}
	var email = $('input[name="email01"]').val()+'@'+$('input[name="email02"]').val();
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(exptext.test(email)==false){
		//이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우			
		$('input[name="email02"]').after('&nbsp;&nbsp;<strong class="red">이메일 형식이 올바르지 않습니다.</strong>')
		checkFalse ++;
	}
	if(checkFalse == 0){
		if($('input[name="userDelete"]').prop('checked') == true){
			sendDataEdumi(useApi,'writeform','delete');
		}else{
			if(seq != ''){
				sendDataEdumi(useApi,'writeform','new');
			}else{
				sendDataEdumi(useApi,'writeform','login');
			}
		}
	}
}

function sendDataEdumi(apiName,formClass,types){
	var sendSerial = $('form.'+formClass).serialize();
	if(confirm("신청하시겠습니까?")){
		$.ajax({
			url: apiName,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				
				if( data.indexOf("err") > -1 ){
					alert('신청 중 에러가 발생하였습니다. 다시 시도해 주세요 ');
					location.href='./mypage.php'
				}else{

					alert('신청되었습니다. 로그인 후 내강의실에서 학습가능합니다.');
					if(types == 'modal'){
						$('.btnRefresh').click();
					}else if(types == 'modalBoth'){
						$('.btnRefresh').click();
						ajaxAct()
					}else if(types == 'comment'){
						commentAct(seq)
					}else{
						if(seq != '' || types=='new'){
							viewAct(data);
						}else if(types=="delete"){
							listAct(page);
						}else if(types=="login"){
							location.href='./login.php'
						}else{
							ajaxAct()
						}
					}
				}
			},
			fail:function(){
				alert('신청에 실패하였습니다.')
			}
		})
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

function showKeyCode(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if( ( keyID >=48 && keyID <= 57 ) || ( keyID >=96 && keyID <= 105 ) )
	{
		//document.getElementById("keyinfo").innerHTML = keyID + " = 숫자키";
	}
	else
	{
		document.getElementById("keyinfo").innerHTML = " ※ 숫자만 입력하세요.";
	}
	/* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 */
}

function idUseCheckEdumi(useApi,checkKey){
	var checkValues = $('input[name="'+checkKey+'"]').val();
	var checkData = checkKey+'='+checkValues
	var idReg       =  /^[a-z0-9]{6,20}$/g;
	$('input[name="idUseOk"]').prop('checked',false);
	$.ajax({
		url:useApi,
		type:'PUT',
		data:checkData,
		dataType:'json',
		success: function(data){
			if(data.result == 'success'){
				if (checkValues == '') {	//20170424 이응민 수정
					alert('아이디를 입력해 주세요.');
					$('input[name="idUseOk"]').prop('checked',false);
				} else if (!idReg.test(checkValues)) {
					alert('아이디는 6~20자 영문 또는 숫자이어야 합니다.');
					$('input[name="idUseOk"]').prop('checked',false);
				} else {
					alert('사용가능한 아이디입니다.');
					$('input[name="idUseOk"]').prop('checked',true);
				}
			}else{
				alert('중복 또는 사용할 수 없는 아이디입니다.');
				$('input[name="idUseOk"]').prop('checked',false);
			}
			
			return false;
		}
	});
}
//보드 정보 선언
var useApi = '../api/apiMember.php';

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

var subDomain = '<?=$_SERVER[HTTP_HOST] ?>';
subDomain = subDomain.replace('.'+_siteURL,'');


function agreeAct(){
	var agreeWrite = '';
	$.get('../api/apiSiteInfo.php',{},function(data){
		agreeWrite += '<div><h1>이용약관<input type="checkbox" id="checkAgree" name="checkAgree" /><label for="checkAgree">동의합니다.</label></h1>';
		agreeWrite += '<div>'+data.agreement+'</div>';
		agreeWrite += '</div>';
		agreeWrite += '<div><h1>개인정보 처리방침<input type="checkbox" id="checkPrivate" name="checkPrivate" /><label for="checkPrivate">동의합니다.</label></h1>';
		agreeWrite += '<div>'+data.privacy+'</div>';
		agreeWrite += '</div>';
		agreeWrite += '<div><h1>ACS 안내<input type="checkbox" id="checkACS" name="checkACS" /><label for="checkACS">동의합니다.</label></h1>';
		agreeWrite += '<div>'+data.acs+'</div>';
		agreeWrite += '</div>';
		/*agreeWrite += '<div class="mobileArea"> <h1>본인인증하기<input type="checkbox" name="checkMobile" /></h1>';
		agreeWrite += '<form name="form_chk" method="post">';
		agreeWrite += '<input type="hidden" name="m" value="checkplusSerivce">';
		agreeWrite += '<input type="hidden" name="EncodeData" value="'+enc_data+'">';
		agreeWrite += '<input type="hidden" name="param_r1" value=""><input type="hidden" name="param_r2" value=""><input type="hidden" name="param_r3" value="">';
		agreeWrite += '<button type="button" onclick="fnPopup();" class="btnPhone">휴대폰인증하기</button>&nbsp;&nbsp;'+returnMsg+'</form>';
		agreeWrite += '<form name="form_ipin" method="post">';
		agreeWrite += '<input type="hidden" name="m" value="pubmain">';
		agreeWrite += '<input type="hidden" name="enc_data" value="'+sEncData+'">';
		agreeWrite += '<input type="hidden" name="param_r1" value="">';
		agreeWrite += '<input type="hidden" name="param_r2" value="">';
		agreeWrite += '<input type="hidden" name="param_r3" value="">';
		agreeWrite += '<button type="button" onClick="fnPopupipin();" class="btnIpin">아이핀인증하기</button>&nbsp;&nbsp;';
		agreeWrite += '<button type="button" onClick="window.open(\'https://www.niceipin.co.kr\')" class="btnIpin">민간아이핀센터 바로가기</button></form>';
		agreeWrite += '<br /><br /><span class="red ipinInfo">※ 타인 명의 휴대폰인 경우 민간아이핀을 발급 후 아이핀 인증으로 진행해 주시기 바랍니다. (아이핀/마이핀가입)</span><br /><br />';
		agreeWrite += '<form name="vnoform" method="post">';
		agreeWrite += '<input type="hidden" name="enc_data">';
		agreeWrite += '<input type="hidden" name="param_r1" value="">';
		agreeWrite += '<input type="hidden" name="param_r2" value="">';
		agreeWrite += '<input type="hidden" name="param_r3" value="">';
		agreeWrite += '</form>';
		agreeWrite += '</div>';*/
		agreeWrite += '<div class="btnArea"><button type="button" onclick="checkAgree()">회원가입 계속하기</button></div>';
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('agreementPage')
		$('#contentsArea').html(agreeWrite);
	})
}

function mobileCheck(names,birthNum,sexType){
	birthNum = birthNum ? birthNum : '';
	sexType = sexType ? sexType : '';
	$('.mobileArea h1 input[name="checkMobile"]').prop('checked',true);
	$('.mobileArea form:eq(0)').before('<strong class="blue">본인인증이 완료되었습니다.</strong>');
	$('.mobileArea form, .ipinInfo').remove();
	$('.memberCheck').css('display','none');
	userName = names;
	birth = birthNum.slice(2);
	sex = sexType;
}

function memberChk(){
	if($('.agreementPage input[name="checkAgree"]').prop('checked') != true){
		alert('이용약관에 동의해주세요.')
	}else if ($('.agreementPage input[name="checkPrivate"]').prop('checked') != true){
		alert('개인정보 처리방침에 동의해주세요.')
	}else if ($('.agreementPage input[name="checkACS"]').prop('checked') != true){
		alert('ACS 안내에 동의해주세요.')
	}else {
		$('#form_memChk div strong.red').remove();
		var checkFalse = 0;
		if($('input[name="userName"]').val() == ''  ){
			$('input[name="userName"]').after('<strong class="red">&nbsp;&nbsp;이름을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if($('input[name="birth"]').val() == ''){
			$('#birthSpan').after('<strong class="red">&nbsp;&nbsp;생년월일을 입력해주세요.</strong>')
			checkFalse ++;
		} else if ($('input[name="birth"]').val().length <= 5){
			$('#birthSpan').after('<strong class="red">&nbsp;&nbsp;생년월일 6자리를 입력해주세요.</strong>')
			checkFalse ++;
		}else if($('input[name="sex"]').val() == ''){
			$('#birthSpan').after('<strong class="red">&nbsp;&nbsp;주민등록번호 뒷 7자리 중 첫 자리를 입력해주세요.</strong>')
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

//회원중복체크
function findMember(){
	var sendData = $('#form_memChk').serialize();
	var findMembers = $.ajax({
		method:'POST',
		url:'../api/apiMember.php',
		data:sendData,
		dataType:'text',
		success:function(data){
			if(data == 'error'){
				alert('회원가입이 되어 있습니다.\n로그인 후 이용해주세요.');
				location.replace('login.php');
			}else{
				alert('회원가입이 되어 있지 않습니다. \n회원가입 진행을 위해 본인인증을 해주세요.');
				changeElement();
			}
		}
	})
}

function changeElement(){
	$('.mobileArea').css('display','block');
	$('.memberCheck h1 input[name="checkMember"]').prop('checked',true);
	//$('.memberCheck form:eq(0)').before('<strong class="blue">회원가입 여부가 확인되었습니다. 회원가입 진행을 위해 본인인증을 해주세요.</strong>');
	$('.memberCheck form:eq(0)').before('<strong class="blue">회원가입 진행을 위해 본인인증을 해주세요.</strong>');
	$('.memberCheck form').css('display','none');
}

function checkAgree(){
	if($('.agreementPage input[name="checkAgree"]').prop('checked') != true){
		alert('이용약관에 동의해주세요')
	}else if ($('.agreementPage input[name="checkPrivate"]').prop('checked') != true){
		alert('개인정보 보호정책에 동의해주세요')
	}else if ($('.agreementPage input[name="checkACS"]').prop('checked') != true){
		alert('ACS 안내에 동의 해주세요')
	}else
		/*if ($('.agreementPage input[name="checkMember"]').prop('checked') != true){
		alert('가입 여부를 확인해주세요.')
	}else if ($('.agreementPage input[name="checkMobile"]').prop('checked') != true){
		alert('휴대폰 또는 아이핀 본인인증을 해주세요.')
	}else*/{
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
		writes += '<form class="writeform">';

		//hidden값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';
//		writes += '<input type="hidden" name="subDomain" value="'+subDomain+'" />';
//		writes += '<input type="subDomain" name="name" value="'+subDomain+'" />';

		//입력영역 시작
		writes += '<ul>';

		//아이디 입력
		if(loginUserID==''){
			writes += '<li class="mustCheck">';
		}else{
			writes += '<li>';
		}
		writes += '<h1>아이디</h1>';
		if(loginUserID == ''){
			writes += '<input type="text" name="userID" class="name" imeMode="disabled" placeholder="영문 또는 숫자로 6~20자" />&nbsp;<button type="button" onclick="idUseCheck(\''+useApi+'\',\'userID\')">중복확인</button><input type="checkbox" name="idUseOk" value="Y" style="display:none;"/>';
		}else{
			writes += '<input type="hidden" name="userID" value="'+userID+'"><strong>'+userID+'</strong>';
		}
		writes += '</li>';

		/* 성별
		writes += '<li>';
		writes += '<h1>성별</h1><select name="sex" class="'+sex+'">';
		writes += '<option value="1">남</option>';
		writes += '<option value="2">여</option>';
		writes += '</select>';
		writes += '</li>';
		*/


		writes += '<li>';
		writes += '<h1>성별</h1>';
		/*if(loginUserID == ''){
			if(sex%2 == 0){
				var sexName='여성';
			}else{
				var sexName='남성';
			}
			writes += '<input type="hidden" name="sex" value="'+sex+'" readonly="readonly"><strong>'+sexName+'</strong>';
		}else{
			if(sex%2 == 0){
				var sexName='여성';
			}else{
				var sexName='남성';
			}
			writes += '<input type="hidden" name="sex" value="'+sex+'"><strong>'+sexName+'</strong>';
		}*/

		if(loginUserID == ''){
			writes += '<select name="sex" class="'+sex+'">';
			writes += '<option value="1">남</option>';
			writes += '<option value="2">여</option>';
			writes += '</select>';
		} else {
			writes += '<input type="hidden" name="sex" value="'+sex+'"><strong>'+sexName+'</strong>';
		}

		writes += '</li>';


		//이름입력
		if(userName == ''){
			writes += '<li class="mustCheck"><h1>이름</h1><input type="text" name="userName" class="name" maxlength="20" value="'+userName+'" /></li>';
		} else {
			writes += '<li class=""><h1>이름</h1><input type="hidden" name="userName" value="'+userName+'"><strong>'+userName+'</strong></li>';
		}


		//생년월일,성별
		writes += '<li class="mustCheck">';
		writes += '<h1>생년월일</h1><input type="text" name="birth" class="name" maxlength="6" value="'+birth+'" /> (ex:920101)';
		writes += '</li>';

		//비밀번호입력
		writes += '<li class="mustCheck"><h1>비밀번호</h1><input type="password" name="pwdCheck"  class="name" maxlength="20" placeholder="영문, 숫자 혼합하여 6~20자"/>';
		writes += '<li class="mustCheck"><h1>비밀번호 확인</h1><input type="password" name="pwd" class="name" maxlength="20" /></li>';

		//휴대폰입력
		writes += '<li class="mustCheck"><h1>휴대전화</h1><select name="mobile01" class="'+mobile01+'">';
		writes += '<option value="010">010</option>';
		writes += '<option value="011">011</option>';
		writes += '<option value="016">016</option>';
		writes += '<option value="017">017</option>';
		writes += '<option value="018">018</option>';
		writes += '<option value="019">019</option>';
		writes += '</select>&nbsp;-&nbsp;<input class="tel telCenter" type="tel" name="mobile02" maxlength="4" value="'+mobile02+'" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel telCenter" name="mobile03" type="tel" maxlength="4" value="'+mobile03+'" /></li>';

		//연락처입력
		writes += '<li><h1>연락처</h1><select name="phone01" class="'+phone01+' telCenter" >';
		writes += '<option value="02">02</option>';
		writes += '<option value="031">031</option>';
		writes += '<option value="032">032</option>';
		writes += '<option value="033">033</option>';
		writes += '<option value="041">041</option>';
		writes += '<option value="042">042</option>';
		writes += '<option value="043">043</option>';
		writes += '<option value="044">044</option>';
		writes += '<option value="051">051</option>';
		writes += '<option value="052">052</option>';
		writes += '<option value="053">053</option>';
		writes += '<option value="054">054</option>';
		writes += '<option value="055">055</option>';
		writes += '<option value="061">061</option>';
		writes += '<option value="062">062</option>';
		writes += '<option value="063">063</option>';
		writes += '<option value="064">064</option>';
		writes += '<option value="070">070</option>';
		writes += '</select>&nbsp;-&nbsp;<input class="tel telCenter" type="tel" name="phone02" maxlength="4" value="'+phone02+'" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel telCenter" name="phone03" type="tel" maxlength="4" value="'+phone03+'" style="ime-mode:disabled;" /></li>';

		//이메일 입력
		if(loginUserID != ''){
			writes += '<li ><h1>Email</h1><input class="name" name="email01" type="text" maxlength="20" value="'+email01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="email02" id="email02">';
			writes += '<option value="">직접입력</option>';
			writes += '<option value="naver.com">naver.com</option>';
			writes += '<option value="hanmail.net">hanmail.net</option>';
			writes += '<option value="nate.com">nate.com</option>';
			writes += '<option value="gmail.com">gmail.com</option>';
			writes += '<option value="cyworld.com">cyworld.com</option>';
			writes += '<option value="hotmail.com">hotmail.com</option>';
			writes += '<option value="dreamwiz.com">dreamwiz.com</option>';
			writes += '<option value="empal.com">empal.com</option>';
			writes += '<option value="empas.com">empas.com</option>';
			writes += '<option value="lycos.co.kr">lycos.co.kr</option>';
			writes += '<option value="netsgo.com">netsgo.com</option>';
			writes += '<option value="paran.com">paran.com</option>';
			writes += '</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+email02+'" /></li>';
		}else {
			writes += '<li class="mustCheck"><h1>Email</h1><input class="name" name="email01" type="text" maxlength="20" value="'+email01+'" />&nbsp;@&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+email02+'" /></li>';
		}

		//정보수신여부
		writes += '<li><h1>정보수신</h1>';
		if(emailReceive == 'N'){
			writes += '<input type="checkbox" id="sendEmail" name="emailReceive" value="Y" /><label for="sendEmail">Email</label>';
		}else{
			writes += '<input type="checkbox" id="sendEmail" name="emailReceive" value="Y" checked="checked" /><label for="sendEmail">Email</label>';
		}
		if(smsReceive == 'N'){
			writes += '<input type="checkbox" id="sendSMS" name="smsReceive" value="Y" /><label for="sendSMS">SMS</label>';
		}else{
			writes += '<input type="checkbox" id="sendSMS" name="smsReceive" value="Y" checked="checked" /><label for="sendSMS">SMS</label>';
		}
		//writes += '<span style="margin-left:15px; color:#999; font-weight:bold">* 수강 관련 정보는 수신 동의 여부와 상관없이 발송될 수 있습니다.</span>'
		writes += '</li>'

		//주소입력
		if(address01 == null){
			address01 = '';
		}
		if(address02 == null){
			address02 = '';
		}
		writes += '<li><h1>주소</h1><div class="address">';
		writes += '<input name="zipCode" class="name" type="tel" maxlength="5" id="zipCodeArea"  value="'+zipCode+'" readonly="readonly" />&nbsp;<button type="button" class="findZipCode">우편번호 찾기</button><br />';
		writes += '<input name="address01" class="subject" type="text" id="address01Area" value="'+address01+'" /><br />';
		writes += '<input name="address02" class="subject" type="text" id="address02Area" value="'+address02+'" />';
		writes += '</div></li>';

		writes += '</ul>';
		writes += '</form>';
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkMemberForm()">';
		if(loginUserID != ''){
			writes += '수정 완료'
			writes += '<input type="hidden" value="modify" id="modify">'
		}else{
			writes += '가입하기'
		}
		writes += '</button>';
		writes += '</div>';
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);
		if(email02 != ''){
			var exists = false;
			$('#email02 option').each(function(){
				if (this.value == email02) {
					exists = true;
					return false;
				}
			});

			if(exists == true){
				$('#email02').val(email02).prop('selected', true);
			}else{
				$('#email02 option:eq(0)').prop('selected', true);
			}
		}else{
			$('#email02 option:eq(0)').prop('selected', true);
		}

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
	if($('input[name="pwdCheck"]').val() == ''){
		$('input[name="pwdCheck"]').after('&nbsp;&nbsp;<strong class="red">비밀번호를 입력해주세요</strong>')
		checkFalse ++;
	}else if(!regPwd.test($('input[name="pwdCheck"]').val())){	//20170424 이응민 추가
		$('input[name="pwdCheck"]').after('&nbsp;&nbsp;<strong class="red">비밀번호를 영문, 숫자 혼합하여 6~20자로 입력해주세요.</strong>')
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
	var email = $('input[name="email01"]').val()+'@'+$('input[name="email02"]').val();
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(exptext.test(email)==false){
		//이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
		$('input[name="email02"]').after('&nbsp;&nbsp;<strong class="red">이메일 형식이 올바르지 않습니다.</strong>')
		checkFalse ++;
	}

	if($('#modify').val() == 'modify'){
		var type = 'modify';
	}else{
		var type = 'new';
	}

	if(checkFalse == 0){

		if($('input[name="userDelete"]').prop('checked') == true){
			types = 'delete';
			typesTxt = '삭제';
		}else if(seq == ''){
			types = 'new';
			typesTxt = '가입';
		}else{
            if(loginUserID != ''){
                types = 'update';
		    	typesTxt = '수정';
            }else{
                types = 'login';
                typesTxt = '로그인';
            }

		}

		if(confirm(typesTxt + " 하시겠습니까?")){
			$.ajax({
				url: '../api/apiMember.php',
				type:'POST',
				data:$('form.writeform').serialize(),
				dataType:'text',
				success:function(data){
					alert(typesTxt + ' 되었습니다.');

					if(seq == '' || types=='new'){
						top.location.href='/member/login.php'
					}else if(types=="delete"){
						listAct(page);
					}else if(types=="login"){
						top.location.href='/member/login.php'
					}else{
						ajaxAct()
					}

				},
				fail:function(){
					alert(typesTxt + ' 등록에 실패하였습니다.')
				}
			})
		}

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
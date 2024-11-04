//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//게시판 보기 스크립트 시작
function writeAct(writeSeq){
	seq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용

	//상단메뉴
	$('.searchArea').remove();

	//출력변수 지정
	var userID = '';
	var userName = '';
	var userLevel = '';
	var birth = '';
	var sex = '';
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
	var companyCode = '';
	var department = '';
	var commission = '';
	var bank = '';
	var bankNum = '';
	var memo = '';
	var nwIno = '';
	var trneeSe = '';
	var IrglbrSe = '';
    var resno = '';
    var joinURL = '';
	var tutorFinalFee01 = '';
	var tutorFinalFee02 = '';
	var tutorReportFee = '';
	var staff = '';
	var resno01 = '';
	var resno02 = '';
	var sso = '';
	var ssoKey = '';
	var joinDate = '';
	var retireDate = '';
	var marketing = '';
	var subdomain = '';
	var certSms = '';
	var landing = '';
	var landingTel = '';

	if(seq != ''){
		var writeAjax = $.get(useApi,{'seq':seq,'userLevel':userLevel},function(data){
			$.each(data.member, function(){
				userID = this.userID;
				userName = this.userName;
				userLevel = this.userLevel.userLevel;
				birth = this.birth;
				sex = this.sex;
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
				changeDate = this.userLevel.changeDate;
				oldGrade = this.userLevel.oldGrade;
				userGrade = this.userLevel.userGrade;
				companyName = this.company.companyName;
				companyCode = this.company.companyCode;
				department = this.company.department;
				commission = this.commission;
				marketing = this.marketing;
				certSms = this.certSms;
				bank = this.bank;
				bankNum = this.bankNum;
				staff = this.staff;
				resno01 = this.unResno01;
				resno02 = this.unResno02;
				sso = this.sso;
				if(this.memo == null) {
					memo = '';
				} else {
					memo = this.memo;
				}
				nwIno = this.nwIno;
				trneeSe = this.trneeSe;
				IrglbrSe = this.IrglbrSe;
				resno = this.resno;
                marketer = '';
                joinURL = this.joinURL;
				userRetire = this.userRetire;
				ssoKey = this.ssoKey;
				joinDate = this.joinDate ?? '';
				retireDate = this.retireDate ?? '';
				if(this.tutorFinalFee01 == null){
					tutorFinalFee01 = 0;
				} else {
					tutorFinalFee01 = this.tutorFinalFee01;
				}

				if(this.tutorFinalFee02 == null){
					tutorFinalFee02 = 0;
				} else {
					tutorFinalFee02 = this.tutorFinalFee02;
				}

				if(this.tutorReportFee == null){
					tutorReportFee = 0;
				} else {
					tutorReportFee = this.tutorReportFee;
				}
				subdomain = this.subdomain;
				landing = this.landing;
				landingTel = this.landingTel ?? '';



			})
			writePrint()
		})
	}else{
		writePrint()
	}

	//게시판 생성
	function writePrint(){
		var writes ='';
		writes += '<form class="writeform">';

		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';

		//입력영역 시작
		writes += '<ul>';

		//아이디 입력
		writes += '<li class="mustCheck">'
		writes += '<h1>아이디</h1>';
		if(seq == ''){
			writes += '<input type="text" name="userID" class="name" style="ime-mode:disabled" />&nbsp;<button type="button" onclick="idUseCheck(\''+useApi+'\',\'userID\')">중복확인</button><input type="checkbox" name="idUseOk" value="Y" />';
		}else{
			writes += '<input type="hidden" name="userID" value="'+userID+'"><input type="text" name="userIDChange" class="name" style="ime-mode:disabled" value="'+userID+'"/>&nbsp;<button type="button" onclick="idUseCheck(\''+useApi+'\',\'userIDChange\')">중복확인</button><input type="checkbox" name="idUseOk" value="Y" />';
			if(loginUserLevel < '5') {
				writes += '&nbsp;&nbsp;&nbsp;<input type="checkbox" name="userDelete" id="userDelete" value="Y" /><label for="userDelete">회원탈퇴처리</label>';
				if(userRetire == 'Y'){
					writes += '&nbsp;&nbsp;&nbsp;<input type="checkbox" name="userRetire" id="userRetire" value="Y" checked /><label for="userRetire">퇴사자처리</label>';
				} else {
					writes += '&nbsp;&nbsp;&nbsp;<input type="checkbox" name="userRetire" id="userRetire" value="Y" /><label for="userRetire">퇴사자처리</label>';
				}

			}
		}
		writes += '</li>';

		//이름입력
		writes += '<li class="mustCheck">';
		writes += '<div class="halfDiv mustCheck">';
		writes += '<h1>이름</h1><input type="text" name="userName" class="name" maxlength="60" value="'+userName+'" />';
		if(changeDate != false){
			writes += '&nbsp;&nbsp;&nbsp;&nbsp;( 회원레벨은 '+changeDate.substr(0,10)+'에&nbsp;'+oldGrade+'에서&nbsp;'+userGrade+'로 변경되었습니다.)';
		}
		writes += '</div>';

		if(seq == '') {
			writes += '<div class="halfDiv">';
			writes += '</div>';
			writes += '</li>';
		} else {
			writes += '<div class="halfDiv">';
			if(loginUserLevel != 8) { // 교육담당자는 비번 초기화 불가
				if(userLevel == 8){
					var textPwd= '※ 사업주번호 뒷자리 5자리로 변경됩니다.';
				}else {
					var textPwd= '※ 생일 4자리로 변경됩니다.';
				}
				writes += '<h1>비밀번호 초기화</h1><button type="button" onClick="pwdReset(\''+seq+'\',\''+birth.substr(2,4)+'\',\''+userLevel+'\',\''+companyCode+'\')">초기화</button>'+textPwd;
			}
			writes += '</div>';
			writes += '</li>';
		}

		//생년월일,성별
		// 2018-08-27 주민등록번호만 있을때 주민등록번호 수정폼 추가 (강혜림)
		if(seq == ''){
			writes += '<li>';
			writes += '<h1>주민등록번호</h1>';
			writes += '<input type="text" name="resno01" style="width:83px" maxlength="6" /> - <input type="text" style="width:83px" name="resno02" maxlength="7" />';
			writes += '</li>';
		}else{
			writes += '<li>';
			writes += '<input type="hidden" name="ssoCode" value="'+sso+'"/>';
			if(resno == 'Y'){
				writes += '<div class="halfDiv">';
				writes += '<input type="hidden" name="birth" value="'+birth+'" />';
				writes += '<input type="hidden" name="sex" value="'+sex+'" />';
				if (allowUserID.includes(loginUserID)) {
					writes += '<h1>생년월일</h1>'+birth+' - '+resno02;
				} else {
					writes += '<h1>생년월일</h1>'+birth+' - '+sex;
				}

//				writes += '<div class="halfDiv">';
//				writes += '<h1>주민등록번호</h1>';
//				writes += '<input type="text" name="resno01" style="width:83px" maxlength="6" /> - <input type="text" style="width:83px" name="resno02" maxlength="7" />';
//				writes += '</div>';
				writes += '</div>';
			}else{
				writes += '<div class="halfDiv mustCheck">';
				writes += '<h1>생년월일</h1><input type="text" name="birth" class="name" maxlength="6" value="'+birth+'" />';
				writes += '</div>';
				writes += '<div class="halfDiv">';
				writes += '<h1>성별</h1><select name="sex" class="'+sex+'">'+optWrite['sexType']+'</select>&nbsp;&nbsp;※ 홀수:남자/짝수:여자 (외국인포함)';
				writes += '</div>';
			}
			writes += '</li>';
		}

		writes += '</li>';

		//비밀번호입력
		writes += '<li ><div class="halfDiv"><h1>비밀번호</h1><input type="password" name="pwdCheck"  class="name" maxlength="20" />';
		if (seq == '') {
			writes += '&nbsp;&nbsp;* 비밀번호 미입력시 생일4자리로 등록 됩니다.';
		}
		writes += '</div>';
		writes += '<div class="halfDiv">';
		if(seq != ''){
			writes += '<h1>주민등록번호</h1>';
			writes += '<input type="text" name="resno01" style="width:83px" maxlength="6" /> - <input type="text" style="width:83px" name="resno02" maxlength="7" />';
		}
		writes += '</div>';
		writes += '</li>';
		writes += '<li ><h1>비밀번호확인</h1><input type="password" name="pwd" class="name" maxlength="20" /></li>';

		//2018-08-27 비용수급사업장 추가 (강혜림)
		if(seq == ''){
			writes += '<li ><h1>비용수급사업장</h1><input type="text" name="nwIno" class="name" maxlength="11" /> <span style="width:10%;"> (사업장 숫자 11자리만 입력)</span></li>';
			//훈련생 구분, 비정규직 구분
			writes += '<li>';
			writes += '<div class="halfDiv ">';
			writes += '<h1 >훈련생 구분</h1>';
			writes += '<select name="trneeSe" class="'+trneeSe+'">'+optWrite['trneeSe']+'</select>';
			writes += '</div>';
			writes += '<div class="halfDiv ">';
			writes += '<h1>비정규직 구분</h1>';
			writes += '<select name="IrglbrSe" class="'+IrglbrSe+'">'+optWrite['IrglbrSe']+'</select>';
			writes += '</div>';
			writes += '</li>';
		}else{
			if(resno == 'Y'){
				writes += '<li ><h1>비용수급사업장</h1><input type="text" name="nwIno" class="name" maxlength="11" value="'+nwIno+'"/> <span style="width:10%;">(사업장 숫자 11자리만 입력)</span></li>';

				//훈련생 구분, 비정규직 구분
				writes += '<li>';
				writes += '<div class="halfDiv ">';
				writes += '<h1 >훈련생 구분</h1>';
				writes += '<select name="trneeSe" class="'+trneeSe+'">'+optWrite['trneeSe']+'</select>';
				writes += '</div>';
				writes += '<div class="halfDiv ">';
				writes += '<h1>비정규직 구분</h1>';
				writes += '<select name="IrglbrSe" class="'+IrglbrSe+'">'+optWrite['IrglbrSe']+'</select>';
				writes += '</div>';
				writes += '</li>';
			}

		}

		//직급여부
		writes += '<li><h1>직급여부</h1><select name="staff" id="staff" class="'+staff+'">'+optWrite['staff']+'</select>';
		writes += '</li>';

		//회원등급 입력
		if(loginUserLevel <= 4) { //영업팀장 지정
			writes += '<li class="mustCheck"><h1>회원등급</h1><select name="userLevel" class="'+userLevel+'">'+optWrite['user']+optWrite['admin']+'</select>';
			if(seq != ''){
				writes += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class="'+userLevel+'" id="changeGradeCheck"><label for="changeGradeCheck">회원등급 변경시 꼭 체크하셔야 합니다.</label>';
			}
			writes += '</li>';
		}

		//휴대폰입력
		writes += '<li class="mustCheck"><h1>휴대전화</h1><select name="mobile01" class="'+mobile01+'">'+optWrite['mobile01']+'</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="mobile02" maxlength="4" value="'+mobile02+'" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel" name="mobile03" type="tel" maxlength="4" value="'+mobile03+'" /></li>';

		//연락처입력
		if(phone02 == null) {
			phone02 = '';
		}
		if(phone03 == null) {
			phone03 = '';
		}
		writes += '<li><h1>연락처</h1><select name="phone01" class="'+phone01+'" >'+optWrite['phone01']+'</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="phone02" maxlength="4" value="'+phone02+'" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel" name="phone03" type="tel" maxlength="4" value="'+phone03+'" style="ime-mode:disabled;" /></li>';

		//이메일 입력
		writes += '<li ><h1>Email</h1><input class="name" name="email01" type="text" maxlength="20" value="'+email01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="'+email02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+email02+'" /></li>';

		//정보수신여부
		writes += '<li><h1>정보수신</h1>';
		if(emailReceive == 'N'){
			writes += '<input type="checkbox" id="sendEmail" name="emailReceive" value="Y" /><label for="sendEmail">Email 정보</label>';
		}else{
			writes += '<input type="checkbox" id="sendEmail" name="emailReceive" value="Y" checked="checked" /><label for="sendEmail">Email 정보</label>';
		}
		if(smsReceive == 'N'){
			writes += '<input type="checkbox" id="sendSMS" name="smsReceive" value="Y" /><label for="sendSMS">SMS 정보</label>';
		}else{
			writes += '<input type="checkbox" id="sendSMS" name="smsReceive" value="Y" checked="checked" /><label for="sendSMS">SMS 정보</label>';
		}
		writes += '</li>'

		//주소입력
		if(zipCode == null) {
			zipCode = '';
		}
		if(address01 == null) {
			address01 = '';
		}
		if(address02 == null) {
			address02 = '';
		}
		writes += '<li><h1>주소</h1><div class="address">';
		writes += '<input name="zipCode" class="name" type="tel" maxlength="5" id="zipCodeArea"  value="'+zipCode+'" readonly="readonly" />&nbsp;<button type="button" class="findZipCode">우편번호 찾기</button><br />';
		writes += '<input name="address01" class="subject" type="text" id="address01Area" value="'+address01+'" /><br />';
		writes += '<input name="address02" class="subject" type="text" id="address02Area" value="'+address02+'" />';
		writes += '</div></li>';

		if(loginUserLevel < '5') {
			//기업소속명
			writes += '<li><h1>기업/소속명</h1>';
			writes += '<div id="companyCode" class="address"><input name="companyName" type="text" value="'+companyName+'" /> <button type="button" onClick="searchSelect(\'companyCode\',\''+companyApi+'\')">검색</button></div>';
			/*if(!sso){
				writes += '&nbsp;<input type="checkbox" id="sso" name="sso" value="Y" /><label for="sso">수강연동회원(사업주 선택 후 체크 해주세요)</label>';
			}else{
				writes += '&nbsp;<input type="checkbox" id="sso" name="sso" value="Y" checked="checked" /><label for="sso">수강연동회원(사업주 선택 후 체크 해주세요)</label>';
			}*/
			writes += '</li>';
		}
		
		writes += '<li><h1>수강연동회원</h1>';
		writes += '<select id="sso" name="sso" >';
		writes += '</select>'
		writes += '</li>';

		writes += '<li><h1>수강연동Key</h1>';
		writes += '<input type="text" id="ssoKey" name="ssoKey" value="'+ssoKey+'" /> *기업에서 사용하는 아이디';
		writes += '</li>';

/*
			//비용수급사업장
			writes += '<li ><h1>비용수급사업장</h1><input type="text" name="nwIno" class="name" maxlength="11" /> (사업장 숫자 11자리만 입력)</li>';

			//훈련생 구분, 비정규직 구분
			writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>훈련생 구분</h1>';
			writes += '<select name="trneeSe" class="'+trneeSe+'">'+optWrite['trneeSe']+'</select>';
			writes += '</div>';
			writes += '<div class="halfDiv">';
			writes += '<h1>비정규직 구분</h1>';
			writes += '<select name="IrglbrSe" class="'+IrglbrSe+'">'+optWrite['IrglbrSe']+'</select>';
			writes += '</div>';
			writes += '</li>';
*/
		if(loginUserLevel != '7') {
			if(department == null) {
				department = '';
			}
			//부서명 영업수수료
			writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>부서명</h1>';
			writes += '<input type="text" name="department" class="name" value="'+department+'">';
			writes += '</div>';
			writes += '<div class="halfDiv">';

			if(userLevel < 5) {
				writes += '<h1>영업수수료</h1>';
				writes += '<input type="tel" name="commission" class="tel" value="'+commission+'"> %';
			}

			writes += '</div>';
			writes += '</li>';
		}

		//계좌번호
		if(bankNum == null) {
			bankNum = '';
		}
		writes += '<li><h1>계좌번호</h1><select name="bank" class="'+bank+'" >'+optWrite['bankName']+'</select>&nbsp;<input type="tel" name="bankNum" class="name" value="'+bankNum+'" style="ime-mode:disabled;" /></li>';

		if(userLevel == 6) { //영업팀장 지정
			writes += '<li><h1>영업팀장 지정</h1>';
			writes += '<div id="marketer" class="address"><input name="marketerName" type="text" value="'+marketer+'" /> <button type="button" onClick="searchSelect(\'marketer\',\''+useApi+'\')">검색</button></div>';
			writes += '</li>';
		}

		if(loginUserLevel < '5') { // 메모 기능
			writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>메모</h1>';
			writes += '<textarea name="memo" style="width:500px; height:70px;">'+memo+'</textarea>';
			writes += '</div>';
			writes += '</li>';
        }

        if(loginUserLevel < '4') { // 학원연합회 학원분류 기능
			writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>소속학원</h1>';
            writes += '<select name="joinURL" value='+joinURL+'>';
            writes += '<option value="">없음</option>';
            writes += '<option value="jnhy">전남연합회</option>';
            writes += '<option value="cnhy">충남연합회</option>';
            writes += '<option value="djhy">대전연합회</option>';
            writes += '<option value="cbhy">충북연합회</option>';
            writes += '<option value="sjhy">세종연합회</option>';
            writes += '<option value="kwhy">강원연합회</option>';

            writes += '</select>';

			writes += '</div>';
			writes += '</li>';
		}

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>최종 단답형 수수료</h1>';
		writes += '<input type="text" name="tutorFinalFee01" value='+tutorFinalFee01+'>';
		writes += '</div>';
		writes += '<div class="halfDiv">';
		writes += '<h1>최종 서술형 수수료</h1>';
		writes += '<input type="text" name="tutorFinalFee02" value='+tutorFinalFee02+'>';
		writes += '</div>';
		writes += '</li>';
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>과제 수수료</h1>';
		writes += '<input type="text" name="tutorReportFee" value='+tutorReportFee+'>';
		writes += '</div>';
		writes += '</li>';
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>입사일</h1>';
		writes += '<input type="date" name="joinDate" value='+joinDate+'>';
		writes += '</div>';
		writes += '<div class="halfDiv">';
		writes += '<h1>퇴사일</h1>';
		writes += '<input type="date" name="retireDate" value='+retireDate+'>';
		writes += '</div>';
		writes += '</li>';

		//마케팅동의
		writes += '<li><h1>마케팅동의</h1><select name="marketing" id="marketing" class="'+marketing+'">'+optWrite['marketingYN']+'</select>';
		writes += '</li>';

		//산업안전 문자인증
		writes += '<li><h1>산업안전문자인증</h1><select name="certSms" id="certSms" class="'+certSms+'">'+optWrite['certSms']+'</select>';
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>연수원 서브도메인</h1>';
		writes += '<input type="text" name="subdomain" value='+subdomain+'>';
		writes += '</div>';
		writes += '</li>';
		
		writes += '<li>';
		/*writes += '<div class="halfDiv">';
		writes += '<h1>랜딩페이지</h1>';
		if(landing == 'N'){
			writes += '<input type="checkbox" id="landing" name="landing" value="Y" /><label for="landing">랜딩페이지(사용)</label>';
		}else{
			writes += '<input type="checkbox" id="landing" name="landing" value="Y" checked="checked" /><label for="landing">랜딩페이지(사용)</label>';
		}
		writes += '</div>';
		writes += '<div class="halfDiv">';*/
		writes += '<h1>랜딩페이지 고객문의</h1>';
		writes += '<input type="text" name="landingTel" value='+landingTel+'>';
		//writes += '</div>';
		writes += '</li>';

		writes += '</ul>';
		writes += '</form>';
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="checkMemberForm()">';
		if(seq != ''){
			writes += '수정하기'
		}else{
			writes += '등록하기'
		}
		writes += '</button>';
		writes += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
		writes += '</div>';
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);

		findOpt();//selct 선택자 찾기
		emailSelect();//이메일 select 호출 사용시 같이 호출
		$('#zipCodeArea, .findZipCode').click(function(){zipCodeFind()})
		var	mustInput = '&nbsp;&nbsp;<strong class="price">(*)</strong>';
		$('.mustCheck > h1').append(mustInput)//필수요소 사용
		$('input[name="userID"]').keydown(function(){keyCheck('numbEng',this)})
        $('input[name="phone02"],input[name="phone03"],input[name="mobile02"],input[name="mobile03"]').keyup(function(){keyCheck('numb',this)})

        $('select[name="joinURL"] option[value="'+joinURL+'"]').prop("selected", true);
		$('select[name="staff"] option[value="'+staff+'"]').prop("selected", true);
		$('select[name="marketing"] option[value="'+marketing+'"]').prop("selected", true);

		createOptions('sso', 'nynSso', 'ssoCode', 'ssoName', '해당없음', sso, condition = '');
	}

}
function viewAct(seq){
	writeAct(seq)
}

//입력폼 체크
function checkMemberForm(){
	$('.mustCheck > strong.price').remove();
	var checkFalse = 0;

	$.get(useApi,{'seq':seq},function(data){
		if(seq){
			$.each(data.member, function(){
				userID = this.userID;
			})
		}
		$('.mustCheck input[type="tel"], .mustCheck input[type="text"]').each(function(){
			if($(this).val() == ''){
				checkFalse ++;
			}
		});

		if(seq==''){
			if($('input[name="userID"]').val() == ''){
				$('input[name="idUseOk"]').after('<strong class="price">아이디를 입력해주세요</strong>')
				checkFalse ++;
			}else if($('input[name="idUseOk"]').prop('checked') == false){
				$('input[name="idUseOk"]').after('<strong class="price">아이디 중복체크를 해주세요</strong>')
				checkFalse ++;
			}
		}else {
			if($('input[name="userIDChange"]').val() == ''){
				$('input[name="idUseOk"]').after('<strong class="price">아이디를 입력해주세요</strong>')
				checkFalse ++;
			}else if($('input[name="userIDChange"]').val() != userID){
				if($('input[name="idUseOk"]').prop('checked') == false){
					$('input[name="idUseOk"]').after('<strong class="price">아이디 중복체크를 해주세요</strong>')
					checkFalse ++;
				}
			}
		}

		if(seq != ''){
			var chageUserLevel = $('select[name="userLevel"]').val();
			var oriUserLevel = $('#changeGradeCheck').attr('class');
			if(chageUserLevel != oriUserLevel && $('#changeGradeCheck').prop('checked') == false){
				$('select[name="userLevel"]').after('<strong class="price">변경체크를 해주셔야합니다.</strong>')
				checkFalse ++;
			}
		}

		if(seq == ''){
			/*if($('input[name="resno01"]').val() == '' && $('input[name="resno02"]').val() == ''){
				$('input[name="resno02"]').after('<strong class="price">주민등록번호를 입력해주세요.</strong>')
				checkFalse ++;
			}*/
			if($('input[name="pwdCheck"]').val() != $('input[name="pwd"]').val()){
				$('input[name="pwd"]').after('<strong class="price">입력한 비밀번호가 서로 일치하지 않습니다.</strong>')
				checkFalse ++;
			}
		}
		if($('input[name="userName"]').val() == ''){
			$('input[name="userName"]').after('<strong class="price">이름을 입력해주세요.</strong>')
			checkFalse ++;
		}

		if($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == '' ){
			$('input[name="mobile03"]').after('<strong class="price">휴대폰 번호를 입력해주세요.</strong>')
			checkFalse ++;
		}

		if($('input[name="birth"]').val() == '' && $('input[name="resno01"]').val() == ''){
			$('input[name="birth"]').after('<strong class="price">생년월일을 입력해주세요.</strong>')
			checkFalse ++;
		}

		/*
		if($('input[name="pwdCheck"]').val() == ''){
			$('input[name="pwdCheck"]').after('<strong class="price">비밀번호를 입력해주세요</strong>')
			checkFalse ++;
		}else if($('input[name="pwd"]').val() == ''){
			$('input[name="pwd"]').after('<strong class="price">비밀번호를 확인해주세요</strong>')
			checkFalse ++;
		*/

		if(checkFalse == 0){
			if($('input[name="userDelete"]').prop('checked') == true){
				sendData(useApi,'writeform','delete')
			}else{
				sendData(useApi,'writeform','new')
			}
		}
	})
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

function pwdReset(seqR,birthR,userLevel,companyCode){
	if (userLevel == 8) {
		var useTxt = '사업주번호 뒤5자리로 초기화 됩니다.';
	} else {
		var useTxt = '생일 4자리로 초기화 됩니다.';
	}
	if(confirm('비밀번호를 초기화 하시겠습니까? '+useTxt)) {
		$.ajax({
			url: useApi,
			type:'POST',
			data:'pwdReset=Y&seq='+seqR+'&birth='+birthR+'&userLevel='+userLevel+'&companyCode='+companyCode,
			dataType:'text',
			success:function(data){
				alert('비밀번호를 초기화 하였습니다.');
				//ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

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
	writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
	seq = writeSeq;

	//상단메뉴
	$('.searchArea').remove();

	//출력변수 지정
	var companyScale = '';
	var studyEnabled = '';
	var companyName = '';
	var companyCode = '';
	var companyCodeOld = '';
	var hrdCode = '';
	var companyID = '';
	var ceoName = '';
	var phone01 = '';
	var phone02 = '';
	var phone03 = '';
	var fax01 = '';
	var fax02 = '';
	var fax03 = '';
	var zipCode = '';
	var address01 = '';
	var address02 = '';
	var bank = '';
	var bankNum = '';
	var bankName = '';
	var kind = '';
	var part = '';
	var siteURL = '';
	var cyberURL = '';
	var managerName = '';
	var elecEmail01 = '';
	var elecEmail02 = '';
	var companyEmail01 = '';
	var companyEmail02 = '';
	var marketerName = '';
	var staffName = '';
	var memo = '';
	var kind2 = '';
	var smsReceive = '';
	var managerSms = '';
	var managerStudyUpload = '';
	var retakenWay = '';
	var offYN = '';

	if(loginUserLevel == '5') {
		marketerName = loginUserName;
		searchSelect('marketerID',memberApi);
	}

	if(seq != ''){
		var writeAjax = $.get(useApi,{'seq':seq},function(data){
			$.each(data.company, function(){
				companyScale = this.companyScale;
				studyEnabled = this.studyEnabled;
				companyName = this.companyName;
				companyCode = this.companyCode;
				companyCodeOld = this.companyCodeOld;
				hrdCode = this.hrdCode;
				companyID = this.companyID;
				ceoName = this.ceoName;
				phone01 = this.phone01;
				phone02 = this.phone02;
				phone03 = this.phone03;
				fax01 = this.fax01;
				fax02 = this.fax02;
				fax03 = this.fax03;
				zipCode = this.zipCode;
				address01 = this.address01;
				address02 = this.address02;
				bank = this.bank;
				bankNum = this.bankNum;
				bankName = this.bankName;
				kind = this.kind;
				part = this.part;
				siteURL = this.siteURL;
				cyberURL = this.cyberURL;
				managerName = this.manager.name;
				elecEmail01 = this.elecEmail01;
				elecEmail02 = this.elecEmail02;
				companyEmail01 = this.companyEmail01;
				companyEmail02 = this.companyEmail02;
				marketerName = this.marketer.name;
				staffName = this.staff.name;
				memo = this.memo;
				kind2 = this.kind2;
				smsReceive = this.smsReceive;
				managerSms = this.managerSms
				managerStudyUpload = this.managerStudyUpload;
		        retakenWay = this.retakenWay;
				offYN = this.offYN;
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
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>회사규모</h1>';
		writes += '<select name="companyScale" class="'+companyScale+'">'+optWrite['companyScale']+'</select>';
		writes += '</div>'
		writes += '<div class="halfDiv">';
		writes += '<h1>사이버 교육센터</h1>';
		writes += '<select name="studyEnabled">';
		if(studyEnabled == 'N') {
			var studyEnabledN = 'selected="selected"';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'Y') {
			var studyEnabledN = '';
			var studyEnabledY = 'selected="selected"';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YN') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = 'selected="selected"';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YA') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = 'selected="selected"';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YS') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = 'selected="selected"';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YF') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = 'selected="selected"';
			var studyEnabledYK = '';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YK') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = 'selected="selected"';
			var studyEnabledYE = '';
		} else if (studyEnabled == 'YE') {
			var studyEnabledN = '';
			var studyEnabledY = '';
			var studyEnabledYN = '';
			var studyEnabledYA = '';
			var studyEnabledYS = '';
			var studyEnabledYF = '';
			var studyEnabledYK = '';
			var studyEnabledYE = 'selected="selected"';
		}
		writes += '<option value="N" '+studyEnabledN+'>미사용</option>';
		writes += '<option value="Y" '+studyEnabledY+'>사용(구.ver)</option>';
		writes += '<option value="YN" '+studyEnabledYN+'>사용(NEW.ver)</option>';
		writes += '<option value="YA" '+studyEnabledYA+'>사용(제휴사.ver)</option>';
		writes += '<option value="YS" '+studyEnabledYS+'>사용(수강연동)</option>';
		writes += '<option value="YF" '+studyEnabledYF+'>사용(플렉스)</option>';
		writes += '<option value="YK" '+studyEnabledYK+'>사용(K디지털)</option>';
		writes += '<option value="YE" '+studyEnabledYE+'>사용(에듀센터)</option>';
		writes += '</select>';
		writes += '</div>'
		writes += '</li>';

		//회사명
		writes += '<li class="mustCheck">';
		writes += '<div class="halfDiv">';
		writes += '<h1>회사명</h1>';
		writes += '<input type="text" name="companyName" class="name" value="'+companyName+'" />';
		writes += '</div>';

    writes += '<div class="halfDiv">';
		writes += '<h1>재응시방법</h1>';
    writes += '<select name="retakenWay">'
    retakenWayObj = {0:'학습자의 재응시',1:'교육담당자의 재응시'};
    for ( x in retakenWayObj ){
        writes += `<option value='${x}' ${ x == retakenWay ? 'selected' : ''}>${retakenWayObj[x]}</option>`
    }
    writes += '</select>'
    writes += ' ※ 산업안전과정용 항목'
		writes += '</div>';
		//단체문자 수신여부 추가 2021-04-06 이화랑
		/*writes += '<div class="halfDiv">';
		writes += '<h1>단체문자 수신여부</h1>';
		writes += '<select name="smsReceive" class="'+smsReceive+'">';
		if(smsReceive == 'N') {
			var smsCheckN = 'selected="selected"';
			var smsCheckY = '';
		} else {
			var smsCheckY = 'selected="selected"';
			var smsCheckN = '';
		}
		writes += '<option value="Y" '+smsCheckY+'>수신(Y)</option>';
		writes += '<option value="N" '+smsCheckN+'>거부(N)</option>';
		writes += '</select> ※ 소속된 훈련생 전원 문자 수신을 거부할 수 있습니다.';
		writes += '</div>';
		writes += '</li>';*/

		//사업자번호
		if(seq==''){
			writes += '<li class="mustCheck"><h1>사업자번호</h1>';
			writes += '<input type="tel" name="companyCode" class="name" maxlength="10" />&nbsp;<button type="button" onclick="companyCodeCheck(\''+useApi+'\',\'companyCode\')">중복확인</button><input type="checkbox" name="companyCodeOK" value="Y" />';
		}else{
			writes += '<li class="mustCheck"><h1>사업자번호</h1>';
			writes += '<input type="hidden" name="companyCodeOld" class="name" maxlength="10" value="'+companyCode+'"/>';
			writes += '<input type="tel" name="companyCode" class="name" maxlength="10" value="'+companyCode+'"/>&nbsp;<button type="button" onclick="companyCodeCheck(\''+useApi+'\',\'companyCode\')">중복확인</button><input type="checkbox" name="companyCodeOK" value="Y" />';
		}
		writes += '</li>';

		//HRD번호
		writes += '<li><h1>HRD번호</h1>';
		writes += '<input type="tel" name="hrdCode" class="mail" value="'+hrdCode+'" />';
		writes += '</li>';

		//사업주 아이디
		if(seq==''){
			writes += '<li><h1>사업주 아이디</h1>';
			writes += '<input type="text" name="companyID" class="name">&nbsp; ※ 입력하지 않으면 사업자번호가 아이디로 등록됩니다.';
		}else{
			writes += '<li><h1>사업주 아이디</h1>';
			writes += '<input type="hidden" name="companyIDOld" class="name" maxlength="10" value="'+companyID+'"/>';
			writes += '<input type="text" name="companyID" class="name" value="'+companyID+'">&nbsp;<button type="button" onclick="companyIDCheck(\''+useApi+'\',\'companyID\')">중복확인</button><input type="checkbox" name="companyIDOk" value="Y" />';
		}
		writes += '</li>';

		//대표자명
		//writes += '<li class="mustCheck"><h1>대표자명</h1>';
		writes += '<li><h1>대표자명 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<input type="text" name="ceoName" class="name" value="'+ceoName+'" />';
		writes += '</li>';

		//대표 전화번호
		//writes += '<li class="mustCheck"><h1>대표 전화번호</h1>';
		writes += '<li><h1>대표 전화번호 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<select name="phone01" class="'+phone01+'">'+optWrite['phone01']+'</select>&nbsp;-&nbsp;';
		writes += '<input type="tel" name="phone02" class="tel" maxlength="4" value="'+phone02+'" />&nbsp;-&nbsp;';
		writes += '<input type="tel" name="phone03" class="tel" maxlength="4" value="'+phone03+'" />';
		writes += '</li>';

		//대표자명
		writes += '<li><h1>대표 팩스번호</h1>';
		writes += '<select name="fax01" class="'+fax01+'">'+optWrite['phone01']+'</select>&nbsp;-&nbsp;';
		writes += '<input type="tel" name="fax02" class="tel" maxlength="4" value="'+fax02+'" />&nbsp;-&nbsp;';
		writes += '<input type="tel" name="fax03" class="tel" maxlength="4" value="'+fax03+'" />';
		writes += '</li>';

		//주소입력
		writes += '<li><h1>주소 <span style="color:#c73333;"> (*)</span></h1><div class="address">';
		writes += '<input name="zipCode" class="name" type="tel" maxlength="5" id="zipCodeArea"  value="'+zipCode+'" readonly="readonly" />&nbsp;<button type="button" class="findZipCode">우편번호 찾기</button><br />';
		writes += '<input name="address01" class="subject" type="text" id="address01Area" value="'+address01+'" /><br />';
		writes += '<input name="address02" class="subject" type="text" id="address02Area" value="'+address02+'" />';
		writes += '</div></li>';

		//계좌번호
		writes += '<li><h1>계좌번호</h1>';
		writes += '<select name="bank" class="'+bank+'">'+optWrite['bankName']+'</select>&nbsp;';
		writes += '<input type="tel" name="bankNum" class="email" value="'+bankNum+'" />';
		writes += '</li>';

		//계좌번호
		writes += '<li><h1>예금주</h1>';
		writes += '<input type="text" name="bankName" class="name" value="'+bankName+'" />';
		writes += '</li>';

		//업태/업종
		//writes += '<li><h1>업태/업종/나야넷 업종 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<li><h1>업태/업종 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<input type="tel" name="kind" class="name" value="'+kind+'" />&nbsp;';
		writes += '<input type="tel" name="part" class="name" value="'+part+'" />&nbsp;';
		//writes += '<input type="tel" name="kind2" class="name" value="'+kind2+'" />';
		writes += '</li>';

		//홈페이지 주소
		writes += '<li><h1>홈페이지 주소</h1>';
		writes += '<input type="tel" name="siteURL" class="subject" value="'+siteURL+'" />&nbsp;';
		writes += '</li>';

		//사이버교육센터 주소
		writes += '<li><h1>교육사이트 주소 <img src="../images/global/qicon.jpg" style="width:15px;" title="문자 발송시 기입될 사이트 주소입니다."></h1>';
		writes += '<input type="tel" name="cyberURL" class="subject" value="'+cyberURL+'" />&nbsp;';
		writes += '</li>';

		// writes += '<li><h1>대표Email <span style="color:#c73333;"> (*)</span></h1>';
		// writes += '<input class="name" name="companyEmail01" type="text" maxlength="20" value="'+companyEmail01+'" />&nbsp;@&nbsp;';
		// writes += '<select name="companyEmail02Chk" class="'+companyEmail02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;';
		// writes += '<input type="text" name="companyEmail02" id="emails" class="name" value="'+companyEmail02+'" />';

		//전자세금계산서 메일, 사이트 메인 메일
		if(companyID != loginCompanyID){
			//writes += '<li class="mustCheck"><h1>전자세금계산서 Email</h1>';
			writes += '<li><h1>전자세금계산서 Email <span style="color:#c73333;"> (*)</span></h1>';
		} else {
			writes += '<li><h1>사이트 메인 Email</h1>';
		}
		writes += '<input class="name" name="elecEmail01" type="text" maxlength="20" value="'+elecEmail01+'" />&nbsp;@&nbsp;';
		writes += '<select name="elecEmail02Chk" class="'+elecEmail02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;';
		writes += '<input type="text" name="elecEmail02" id="emails" class="name" value="'+elecEmail02+'" />';
		writes += '</li>';

		//담당자명
		//writes += '<li class="mustCheck"><h1>회사 교육담당자명</h1>';
		writes += '<li><h1>회사 교육담당자명 <span style="color:#c73333;"> (*)</span></h1>';
		writes += '<div id="managerID" class="address"><input name="userName" type="text" value="'+managerName+'" />' +
			' <button type="button" class="button" onClick="searchSelect(\'managerID\',\''+memberApi+'\',8)">검색</button></div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
		writes += '</li>';

		//내부교육담당자명
		// writes += '<li><h1>운영담당자 <span style="color:#c73333;"> (*)</span></h1>';
		// writes += '<div id="staffID" class="address"><input name="userName" type="text" value="'+staffName+'" /> <button type="button" class="button" onClick="searchSelect(\'staffID\',\''+memberApi+'\')">검색</button></div>';
		// writes += '</li>';

		//개인정보책임자,영업담당자
		if(companyID != loginCompanyID){
			//writes += '<li class="mustCheck"><h1>영업담당자</h1>';
			writes += '<li><h1>영업담당자 <span style="color:#c73333;"> (*)</span></h1>';
		} else {
			writes += '<li><h1>개인정보책임자</h1>';
		}
		if(loginUserLevel == '5') {
			writes += '<div id="marketerID" class="address"><input name="userName" type="text" value="'+marketerName+'" /></div>';
		} else {
			writes += '<div id="marketerID" class="address"><input name="userName" type="text" value="'+marketerName+'" /> <button type="button" onClick="searchSelect(\'marketerID\',\''+memberApi+'\')">검색</button></div>';
		}
		//div의 아이디값과 새로 등록될 select 네임의 동일화
		writes += '</li>';

		//메모
		if(loginUserLevel < '5'){
			writes += '<li><h1>메모</h1>';
			writes += '<input type="text" name="memo" class="subject" value="'+memo+'" />&nbsp;';
			writes += '</li>';
		}

		if (seq != '') {
			writes += '<li>';
			writes += '<h1>콘텐츠 매핑</h1>';
			writes += `<button type="button" class="studyMap" onclick="contentsMap('${companyCode}')">과정등록하기</button>`;
			writes += '</li>';
		}

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>교육담당자 수료정보 알림톡 수신여부</h1>';
		writes += '<select name="managerSms" class="'+managerSms+'">';
		if(managerSms == 'N') {
			var managerSmsN = 'selected="selected"';
			var managerSmsY = '';
		} else {
			var managerSmsY = 'selected="selected"';
			var managerSmsN = '';
		}
		writes += '<option value="Y" '+managerSmsY+'>수신(Y)</option>';
		writes += '<option value="N" '+managerSmsN+'>거부(N)</option>';
		writes += '</select>';
		writes += '</div>';
		writes += '</li>';
		
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>교육담당자 직접 입과</h1>';
		writes += '<select name="managerStudyUpload" class="'+managerStudyUpload+'">';
		if(managerStudyUpload == 'Y') {
			var managerStudyUploadY = 'selected="selected"';
			var managerStudyUploadN = '';
		} else {
			var managerStudyUploadN = 'selected="selected"';
			var managerStudyUploadY = '';
		}
		writes += '<option value="N" '+managerStudyUploadN+'>미사용</option>';
		writes += '<option value="Y" '+managerStudyUploadY+'>사용</option>';
		writes += '</select>';
		writes += '</div>';
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>오프라인 교육 진행</h1>';
		writes += '<select name="offYN" class="'+offYN+'">';
		if(offYN == 'Y') {
			var offYN_Y = 'selected="selected"';
			var offYN_N = '';
		} else {
			var offYN_N = 'selected="selected"';
			var offYN_Y = '';
		}
		writes += '<option value="N" '+offYN_N+'>미진행</option>';
		writes += '<option value="Y" '+offYN_Y+'>진행</option>';
		writes += '</select>';
		writes += '</div>';
		writes += '</li>';



		writes += '</ul>';

		//버튼영역
		writes += '<div class="btnArea">';
		if (seq != '') {
			writes += `<a href="/admin/salesApplyBoard.php?locaSel=2601&companyName=${companyName}&companyCode=${companyCode}&elecEmail=${elecEmail01}@${elecEmail02}">
            <button type="button">입과게시판</button></a>`
		}
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

		if(loginUserLevel == '2'){
            writes += '<div class="btnArea"><button onClick="resetPass(\''+companyCode+'\')">비밀번호 일괄초기화</button><br/> ※ 사업주 소속 모든 수강생의 비밀번호가 초기화 됩니다.</div>';
        }

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
	console.log('1')
	$('.mustCheck > strong.price').remove();
	var checkFalse = 0;
	var companyCodeCheck ='';
	var companyIDCheck ='';

	$.get(useApi,{'seq':seq},function(data){
		if(seq){
			$.each(data.company, function(){
				companyCodeCheck = this.companyCode;
				companyIDCheck = this.companyID;
			})
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
			if($('input[name="companyCode"]').val() == ''){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호를 입력해주세요.</strong>')
				checkFalse ++;
			} else if ($('input[name="companyCode"]').val().length <= 9){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호 10자리를 입력해주세요.</strong>')
				checkFalse ++;
			} else if ($('input[name="companyCode"]').val() != companyCodeCheck){
				if($('input[name="companyCodeOK"]').prop('checked') == false){
					$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
					checkFalse ++;
				}
			} else if ($('input[name="companyID"]').val() != companyIDCheck){
				if ($('input[name="companyIDOk"]').prop('checked') == false){
					$('input[name="companyIDOk"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
					checkFalse ++;
				}
			}
		}

		if(checkFalse == 0){
			sendData(useApi,'writeform','new')
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

function resetPass(companyCode){
	if(!confirm("사업주 소속 모든 수강생의 비밀번호가 초기화 됩니다.\n초기화 하시겠습니까?")){
		return false;
	}
	loadingAct();
	$.ajax({
		url: '../api/apiResetPassCom.php',
		type:'POST',
		data:'companyCode='+companyCode,
		dataType:'JSON',
		success:function(data){
			loadingAct();
			if(data.result == 'success'){
				alert('초기화 되었습니다.');
            }else{
                alert('초기화에 실패하였습니다.');
            }

        }
	})
}

function contentsMap(companyCode) {
	// https://' + siteURL + '
	var companyMapLink = '/admin/02_companyContentsMap.php?companyCode=' + companyCode;
	window.open(companyMapLink, "location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no", "modulearning")
}

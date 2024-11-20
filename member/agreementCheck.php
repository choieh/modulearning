<?
include '../include/header.php';
include '../lib/dbConnectNew.php';
$domain = $_SERVER["HTTP_HOST"];
$subDomain = explode('.'.$_siteURL, $domain);

// nynCompany 테이블에서 studyEnabled 정보 가져오기
$sql = "SELECT studyEnabled FROM nynCompany WHERE companyID = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $subDomain[0]);
$stmt->execute();
$stmt->bind_result($studyEnabled);
$stmt->fetch();
$stmt->close();

// 링크 설정
$link = 'https://' . $_siteURL . '/main/';
if ($studyEnabled === "Y") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenter/';
} elseif ($studyEnabled === "YN") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenterV2/';
} elseif ($studyEnabled === "YA") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenterNew/';
}

// nynSiteInfo 테이블에서 사이트 정보 가져오기
$query = "SELECT agreement, privacy, caution, acs FROM nynSiteInfo WHERE seq = ?";
$stmt = $mysqli->prepare($query);
$seq = 2;
$stmt->bind_param("i", $seq);
$stmt->execute();
$stmt->bind_result($agreement, $privacy, $caution, $acs);
$stmt->fetch();
$stmt->close();
?>
<script type="text/javascript">

function agreeCheck(){
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	var regPwd = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

	if($('input[name="agreeUse"]').prop('checked') != true){
		alert('이용약관에 동의해주세요.')
	}else if($('input[name="agreePrivate"]').prop('checked') != true){
		alert('개인정보 취급방침에 동의해주세요.')
	}/*else if($('input[name="agreeThirdParty"]').prop('checked') != true) {
        alert('제3자 제공 동의에 동의해주세요.');
    }*/else if($('input[name="agreeACS"]').prop('checked') != true && $('input[name="agreeACS"]').val() != 1){		
		alert('ACS안내 사항에 동의해주세요.');		
	}else if($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == ''){
		alert('휴대폰 번호를 확인해주세요.')
	}else if($('input[name="passwordCheck"]').val() == ''){
		alert('새 비밀번호를 입력해주세요.')
	}else if(!regPwd.test($('input[name="passwordCheck"]').val())){	//20170822 강혜림추가
		alert('비밀번호를 영문,숫자 혼합하여 10~20자로 입력해주세요.')
	}else if($('input[name="pwd"]').val() == ''){
		alert('새 비밀번호 확인을 입력해주세요.')
	}else if($('input[name="pwd"]').val() == $('input[name="birth"]').val()){
		alert('초기 임시 비밀번호와 다른 비밀번호로 설정해 주세요.\n다음 로그인부터는 변경한 비밀번호로 로그인 하셔야 합니다.')
	}else if($('input[name="passwordCheck"]').val() != $('input[name="pwd"]').val()){
		alert('비밀번호 확인이 일치하지 않습니다.')
	}else if($('input[name="agree"]').prop('checked') != true){
		alert('개인정보 확인사항에 체크해주세요.')
	}else{
		var sendData = $('form.sendForm').serialize();
		
		// 선택 항목 체크 여부 추가
        //var agreeOptional = $('#agreeOptional').prop('checked') ? 'Y' : 'N';
        //sendData += '&agreeOptional=' + agreeOptional;

		$.post('../api/apiLoginUser.php',sendData,function(data){
			if(data.result == 'success'){
                var subDomain = '<?=$_SERVER["HTTP_HOST"] ?>';
                subDomain = subDomain.replace('.'+_siteURL,'');
                alert('정보가 반영되었습니다.\n이제부터 새로 설정한 비밀번호로 로그인 하시기 바랍니다.');
                if(subDomain[0] == "kwhy" || subDomain[0] == "sjhy" || subDomain[0] == "cbhy"){
                    top.location.href='../kaoh_main/login.php';
                }else{
                    top.location.href='<?=$link?>';
                }
			}else{
				alert('확인중 문제가 발생하였습니다.')
			}
		})
	}
}
</script>
</head>

<body id="agreementCheck">
<div class="titleArea">
  <div>
    <img src="../images/study/img_test01.png" />
    <h1>학습자 유의사항</h1>
    <h2 class="contentsName">이용약관 및 개인정보이용방침, 개인정보 확인을 해주셔야 학습을 하실 수 있습니다.</h2>
  </div>
</div>
<div class="agreeUse">
  <h1>이용약관</h1>
  <? if ($_SESSION['loginCompanyCode'] != "2148262315") { ?>
  <div>
  <?=$agreement?>
  </div>
</div>
<? } else { ?>
<div>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">1&nbsp;</span>장 총 칙&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">1&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>목적<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>이 이용약관<span style="font-family:함초롬바탕;">(</span>이하&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>약관<span style="font-family:함초롬바탕;">&rsquo;)</span>은 주식회사 모두의교육그룹<span style="font-family:함초롬바탕;">(</span>이하&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>회사<span style="font-family:함초롬바탕;">&rsquo;</span>라 합니다<span style="font-family:함초롬바탕;">)</span>과 이용 고객<span style="font-family:함초롬바탕;">(</span>이하&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>회원<span style="font-family:함초롬바탕;">&rsquo;)</span>간에 회사가 제공하는 서비스의 가입조건 및 이용에 관한 제반 사항과 경영지식몰의 상품 구입<span style="font-family:함초롬바탕;">,&nbsp;</span>기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">&nbsp;</span></p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">2&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>이용약관의 효력 및 변경<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>이 약관은 회사 웹사이트에서 온라인으로 공시함으로써 효력을 발생하며<span style="font-family:함초롬바탕;">,&nbsp;</span>합리적인 사유가 발생할 경우 관련법령에 위배되지 않는 범위 안에서 개정될 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>개정된 약관은 온라인에서 공지함으로써 효력을 발휘하며<span style="font-family:함초롬바탕;">,&nbsp;</span>이용자의 권리 또는 의무 등 중요한 규정의 개정은 사전에 공지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 합리적인 사유가 발생할 경우에는 이 약관을 변경할 수 있으며<span style="font-family:함초롬바탕;">,&nbsp;</span>약관을 변경할 경우에는 지체없이 이를 사전에 공시합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 공지<span style="font-family:함초롬바탕;">(</span>이용자에게 불리한 변경 또는 중대한 사항의 변경은&nbsp;<span style="font-family:함초롬바탕;">30</span>일 전부터 공지<span style="font-family:함초롬바탕;">)</span>합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>기존 회원에게 변경될 약관<span style="font-family:함초롬바탕;">,&nbsp;</span>적용일자 및 변경사유<span style="font-family:함초롬바탕;">(</span>중요내용에 대한 변경인 경우 이에 대한 설명을 포함<span style="font-family:함초롬바탕;">)</span>를 이메일 또는 문자메시지로 발송합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴<span style="font-family:함초롬바탕;">(</span>해지<span style="font-family:함초롬바탕;">)</span>를 요청할 수 있으며<span style="font-family:함초롬바탕;">,&nbsp;</span>변경된 약관의 효력 발생일로부터&nbsp;<span style="font-family:함초롬바탕;">7</span>일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">3&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>약관외 준칙<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>①이 약관은 회사가 제공하는 개별서비스에 관한 이용안내<span style="font-family:함초롬바탕;">(</span>이하&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>서비스별 안내<span style="font-family:함초롬바탕;">&rsquo;</span>라 합니다<span style="font-family:함초롬바탕;">)</span>와 함께 적용합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>②이 약관에 명시되지 아니한 사항에 대해서는 관계법령 및 서비스별 안내의 취지에 따라 적용할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">4&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>용어의 정의<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>①이 약관에서 사용하는 용어의 정의는 다음과 같습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&lsquo;</span>몰<span style="font-family:함초롬바탕;">&rsquo;</span>이라 함은 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며<span style="font-family:함초롬바탕;">,&nbsp;</span>아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">2.&lsquo;</span>회원<span style="font-family:함초롬바탕;">&rsquo;</span>이라 함은 회원제서비스를 이용하는 이용자를 말하며<span style="font-family:함초롬바탕;">, &ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 제공하는 서비스를 지속적으로 이용할 수 있는 자를 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">3.&lsquo;</span>이용계약<span style="font-family:함초롬바탕;">&rsquo;</span>이라 함은 서비스 이용과 관련하여 회사와 이용고객 간에 체결하는 계약을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">4.&lsquo;</span>이용자번호<span style="font-family:함초롬바탕;">(ID)&rsquo;</span>라 함은 이용고객의 식별과 이용고객의 서비스 이용을 위하여 이용고객이 선정하고 회사가 부여하는 문자와 숫자의 조합을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">5.&lsquo;</span>비밀번호<span style="font-family:함초롬바탕;">&rsquo;</span>라 함은 이용고객이 부여받은 이용자번호와 일치된 이용고객 임을 확인하고 이용고객의 권익보호를 위하여 이용고객이 선정한 문자와 숫자의 조합을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">6.&lsquo;</span>해지<span style="font-family:함초롬바탕;">&rsquo;</span>라 함은 회사 또는 회원이 이용계약을 해약하는 것을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">7.</span>회원등급<span style="font-family:함초롬바탕;">:&nbsp;</span>회사가 제공하는 서비스를 이용한 결과에 따라 일정한 기준에 따라 회사가 회원에게 부여하는 등급을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">8.</span>학점&nbsp;<span style="font-family:함초롬바탕;">:&nbsp;</span>회사가 제공하는 서비스를 이용한 결과에 따라 일정한 기준으로 부여하는 점수를 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p>②이 약관에서 사용하는 용어의 정의는 제<span style="font-family:함초롬바탕;">1</span>항에서 정하는 것을 제외하고는 관계법령 및 서비스별 안내에서 정하는 바에 의합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">2&nbsp;</span>장 이용계약 체결&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">5&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>이용 계약의 성립<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>이용계약은 이용고객의 본 이용약관 내용에 대한 동의와 이용신청에 대하여 회사의 이용승낙으로 성립합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>본 이용약관에 대한 동의는 이용신청 당시 해당 회사 웹의&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>동의함<span style="font-family:함초롬바탕;">&rsquo;&nbsp;</span>버튼을 누름으로써 의사표시를 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">6&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>서비스 이용 신청<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회원으로 가입하여 본 서비스를 이용하고자 하는 이용고객은 회사에서 요청하는 제반정보<span style="font-family:함초롬바탕;">(</span>이름<span style="font-family:함초롬바탕;">,&nbsp;</span>생년월일<span style="font-family:함초롬바탕;">,&nbsp;</span>연락처 등<span style="font-family:함초롬바탕;">)</span>를 제공하여야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>모든 회원은 반드시 회원 본인의 이름을 실명으로 제공하여야만 서비스를 이용할 수 있으며<span style="font-family:함초롬바탕;">,&nbsp;</span>실명으로 등록하지 않은 사용자는 일체의 권리를 주장할 수 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회원가입은 반드시 실명으로만 가입할 수 있으며 회사는 실명확인조치를 할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>타인의 명의<span style="font-family:함초롬바탕;">(</span>이름 및 생년월일<span style="font-family:함초롬바탕;">,&nbsp;</span>주민등록번호 등<span style="font-family:함초롬바탕;">)</span>를 도용하여 이용신청을 한 회원의 모든&nbsp;<span style="font-family:함초롬바탕;">ID</span>는 삭제되며<span style="font-family:함초롬바탕;">,&nbsp;</span>관계법령에 따라 처벌을 받을 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>회사는 본 서비스를 이용하는 회원에 대하여 등급별로 제공되는 서비스에 차등을 둘 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">7&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>개인정보의 보호 및 사용<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 관계법령이 정하는 바에 따라 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위해 노력합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이용자 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보 보호정책이 적용됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span>단<span style="font-family:함초롬바탕;">,&nbsp;</span>회사의 공식사이트 이외의 웹에서 링크된 사이트에서는 회사의 개인정보 보호정책이 적용되지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>또한 회사는 이용자의 귀책사유로 인해 노출된 정보에 대해서 일체의 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>제공된 개인 정보는 당해 이용자의 동의 없이 목적 외의 이용이나 제<span style="font-family:함초롬바탕;">3</span>자에게 제공할 수 없으며<span style="font-family:함초롬바탕;">,&nbsp;</span>이에 대한 모든 책임은&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 집니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>다음의 경우에는 예외로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">1.</span>배송업무상 배송업체에게 배송에 필요한 최소한의 이용자의 정보<span style="font-family:함초롬바탕;">(</span>성명<span style="font-family:함초롬바탕;">,&nbsp;</span>주소<span style="font-family:함초롬바탕;">,&nbsp;</span>전화번호<span style="font-family:함초롬바탕;">)</span>를 알려 주는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.</span>통계작성<span style="font-family:함초롬바탕;">,&nbsp;</span>학술 연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(3)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 제<span style="font-family:함초롬바탕;">2</span>항과 제<span style="font-family:함초롬바탕;">3</span>항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원<span style="font-family:함초롬바탕;">(</span>소속<span style="font-family:함초롬바탕;">,&nbsp;</span>성명 및 전화번호 기타 연락처<span style="font-family:함초롬바탕;">),&nbsp;</span>정보의 수집목적 및 이용목적<span style="font-family:함초롬바탕;">,&nbsp;</span>제<span style="font-family:함초롬바탕;">3</span>자에 대한 정보제공 관련사항<span style="font-family:함초롬바탕;">(</span>제공받는자<span style="font-family:함초롬바탕;">,&nbsp;</span>제공목적 및 제공할 정보의 내용<span style="font-family:함초롬바탕;">)</span>등 정보통신망이용촉진 및 정보보호 등에 관한 법률에 따라 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>이용자는 언제든지&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이에 대해 지체 없이 필요한 조치할 의무를 집니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이용자가 오류의 정정을 요구한 경우에는&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;&nbsp;</span>또는 그로부터 개인정보를 제공받은 제<span style="font-family:함초롬바탕;">3</span>자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체없이 파기합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">8&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>이용 신청의 승낙과 제한<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 제&nbsp;<span style="font-family:함초롬바탕;">6</span>조의 규정에 의한 이용신청고객에 대하여 업무 수행상 또는 기술상 지장이 없는 경우에 원칙적으로 접수순서에 따라 서비스 이용을 승낙합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 아래사항에 해당하는 경우에 대해서 승낙하지 아니 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>실명이 아니거나 타인의 명의를 이용하여 신청한 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>이용계약 신청서의 내용을 허위로 기재한 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>사회의 안녕과 질서<span style="font-family:함초롬바탕;">,&nbsp;</span>미풍양속을 저해할 목적으로 신청한 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>부정한 용도로 본 서비스를 이용하고자 하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 규정한 제반사항을 위반하며 신청하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>본 서비스와 경쟁관계에 있는 이용자가 신청하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 규정한 제반사항을 위반하며 신청하는 경우&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사가 설비의 여유가 없는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사의 기술상 지장이 있는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 회사의 귀책사유로 이용승낙이 곤란한 경우&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">9&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>이용자<span style="font-family:함초롬바탕;">ID&nbsp;</span>부여 및 변경 등<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 이용고객에 대하여 약관에 정하는 바에 따라 이용자&nbsp;<span style="font-family:함초롬바탕;">ID</span>를 부여합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>이용자<span style="font-family:함초롬바탕;">ID</span>는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경하고자 하는 경우에는 해당&nbsp;<span style="font-family:함초롬바탕;">ID</span>를 해지하고 재가입해야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>이용자<span style="font-family:함초롬바탕;">ID</span>는 다음 각 호에 해당하는 경우에는 이용고객 또는 회사의 요청으로 변경할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>이용자<span style="font-family:함초롬바탕;">ID</span>가 이용자의 전화번호 또는 주민등록번호 등으로 등록되어 사생활침해가 우려되는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>타인에게 혐오감을 주거나 미풍양속에 어긋나는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>기타 합리적인 사유가 있는 경우&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(4)</span>서비스 이용자<span style="font-family:함초롬바탕;">ID&nbsp;</span>및 비밀번호의 관리책임은 이용자에게 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이를 소홀이 관리하여 발생하는 서비스 이용상의 손해 또는 제<span style="font-family:함초롬바탕;">3</span>자에 의한 부정이용 등에 대한 책임은 이용자에게 있으며 회사는 그에 대한 책임을 일절 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>기타 이용자 개인정보 관리 및 변경 등에 관한 사항은 서비스별 안내에 정하는 바에 의합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">10&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>회원등급 및 평가제도<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 서비스 이용실적<span style="font-family:함초롬바탕;">,&nbsp;</span>기타 회사가 정하는 이용정책에서 정한 기준에 따라 상품을 거래했을 때 부과되는 학점을 기준으로 하여 회원등급 및 등급에 따른 일정 혜택 등을 회원에게 부여할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회원은 아래와 같이 일반회원<span style="font-family:함초롬바탕;">,&nbsp;</span>골드회원<span style="font-family:함초롬바탕;">,&nbsp;</span>골드<span style="font-family:함초롬바탕;">VIP</span>로 구분됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>일반회원&nbsp;<span style="font-family:함초롬바탕;">:&nbsp;</span>몰에서 상품구매 및 구매와 관련하여 제공되는 서비스를 이용할 수 있는 회원을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>골드회원&nbsp;<span style="font-family:함초롬바탕;">:&nbsp;</span>몰에서&nbsp;<span style="font-family:함초롬바탕;">50</span>만원 이상을 구매<span style="font-family:함초롬바탕;">(</span>학점기준&nbsp;<span style="font-family:함초롬바탕;">100</span>학점<span style="font-family:함초롬바탕;">)</span>하는 경우 그 댓가로 지속적 학습 지원을 위해 부여하는 평생회원을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>상품할인<span style="font-family:함초롬바탕;">,&nbsp;</span>강의초청등 다양한 혜택이 평생동안 제공됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>골드<span style="font-family:함초롬바탕;">VIP :&nbsp;</span>골드회원 중 회사가 정하는 일정 기준 이상의 상품구매 또는 서비스를 이용하는 경우&nbsp;<span style="font-family:함초롬바탕;">1</span>년간 부여되는 회원을 말합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>상품할인<span style="font-family:함초롬바탕;">,&nbsp;</span>강의초청 등 다양한 혜택이 제공됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>해당 회원이 자신에게 부여된 등급 구성요소에 대하여 이의를 제기하면 회사는 소명내용<span style="font-family:함초롬바탕;">,&nbsp;</span>해당 회원의 신용도 등 제반 상황을 고려하여 등급 구성요소의 전부 또는 일부를 조정할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>회원의 등급은 참고자료로 활용될 뿐이며<span style="font-family:함초롬바탕;">,&nbsp;</span>회원의 신용을 보증하거나 금융상의 신용상태를 의미하는 것은 아닙니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>회원이 회원등급 및 회원평가제도의 목적과 취지에 어긋나는 행위를 하면 회사는 해당 평가결과를 삭제하고 관련 회원에 대한 서비스 이용자격을 정지하는 등 제재를 가할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(6)</span>평생골드클래스 및 골드<span style="font-family:함초롬바탕;">VIP</span>회원이 된 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>새로운 상품<span style="font-family:함초롬바탕;">,&nbsp;</span>추가 할인혜택 등에 관한 정보를 골드클래스가 유지되는 동안 별도의 거부의사가 없을 시 수신 동의하는 것으로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">&nbsp;</span></p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">3&nbsp;</span>장 계약 당사자의 의무&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">11&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>회사의 의무<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 부득이한 사유가 없는 한 지체없이 이를 수리 또는 복구합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 약관의 내용과 상호<span style="font-family:함초롬바탕;">,&nbsp;</span>영업소 소재지<span style="font-family:함초롬바탕;">,&nbsp;</span>대표자의 성명<span style="font-family:함초롬바탕;">,&nbsp;</span>사업자등록번호<span style="font-family:함초롬바탕;">,&nbsp;</span>연락처<span style="font-family:함초롬바탕;">(</span>전화<span style="font-family:함초롬바탕;">,&nbsp;</span>전자우편 주소 등<span style="font-family:함초롬바탕;">)</span>을 이용자가 알 수 있도록 몰의 초기 서비스화면<span style="font-family:함초롬바탕;">(</span>전면<span style="font-family:함초롬바탕;">)</span>에 게시합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 약관의 규제에 관한 법률<span style="font-family:함초롬바탕;">,&nbsp;</span>전자문서 및 전자거래 기본법<span style="font-family:함초롬바탕;">,&nbsp;</span>전자서명법<span style="font-family:함초롬바탕;">,&nbsp;</span>정보통신망 이용촉진 및 정보보호 등에 관한 법률<span style="font-family:함초롬바탕;">,&nbsp;</span>방문판매 등에 관한 법률<span style="font-family:함초롬바탕;">,&nbsp;</span>전자상거래 등에서의 소비자보호에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(6)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만 이미 계약을 체결한 이용자가 계정약관 조항의 적용을 받기를 원하는 뜻을 제<span style="font-family:함초롬바탕;">3</span>항에 의한 개정약관의 공지기간 내에&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>에 송신하여&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>의 동의를 받은 경우에는 개정약관 조항이 적용됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(8)</span>몰에 관련하여 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 전자상거래 등에서의 소비자보호 지침 및 관계법령 또는 상관례에 따릅니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">12&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">이용자의 의무</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>이용자는 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며<span style="font-family:함초롬바탕;">,&nbsp;</span>허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회원은 본 약관에서 규정하는 사항과 기타 회사가 정한 제반 규정<span style="font-family:함초롬바탕;">,&nbsp;</span>공지사항 등 회사가 공지하는 사항 및 관계법령을 준수하여야 하며<span style="font-family:함초롬바탕;">,&nbsp;</span>기타 회사의 업무에 방해가 되는 행위<span style="font-family:함초롬바탕;">,&nbsp;</span>회사의 명예를 손상시키는 행위를 해서는 안됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회원은 주소<span style="font-family:함초롬바탕;">,&nbsp;</span>연락처<span style="font-family:함초롬바탕;">,&nbsp;</span>전자우편 주소 등 이용계약사항이 변경된 경우에 해당 절차를 거쳐 이를 회사에 즉시 알려야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>회사가 관계법령 및&nbsp;<span style="font-family:함초롬바탕;">&lsquo;</span>개인정보 보호정책<span style="font-family:함초롬바탕;">&rsquo;</span>에 의거하여 그 책임을 지는 경우를 제외하고 회원에게 부여된&nbsp;<span style="font-family:함초롬바탕;">ID</span>의 비밀번호 관리소홀<span style="font-family:함초롬바탕;">,&nbsp;</span>부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며<span style="font-family:함초롬바탕;">,&nbsp;</span>그 영업활동의 결과에 대해 회사는 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>또한 회원은 이와 같은 영업활동으로 회사가 손해를 입은 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>회원은 회사에 대해 손해배상의무를 지며<span style="font-family:함초롬바탕;">,&nbsp;</span>회사는 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(6)</span>회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한<span style="font-family:함초롬바탕;">,&nbsp;</span>기타 이용계약상의 지위를 타인에게 양도<span style="font-family:함초롬바탕;">,&nbsp;</span>증여할 수 없으며 이를 담보로 제공할 수 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(7)</span>회원은 회사 및 제&nbsp;<span style="font-family:함초롬바탕;">3</span>자의 지적 재산권을 침해해서는 안됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(8)</span>회원은 다음 각 호에 해당하는 행위를 하여서는 안되며<span style="font-family:함초롬바탕;">,&nbsp;</span>해당 행위를 하는 경우에 회사는 회원의 서비스 이용제한 및 적법 조치를 포함한 제재를 가할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>허위의 개인정보를 기재하거나 중복하여 가입하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>타인의 서비스 아이디 및 주민등록번호를 도용하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사의 운영진<span style="font-family:함초롬바탕;">,&nbsp;</span>직원 또는 관계자를 사칭하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>자신의 아이디 및 비밀번호를 유포하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>타인의 지적재산권을 침해하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>타인의 명예를 훼손하거나 사생활을 침해하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>고의 또는 과실로 허위의 정보를 공개 또는 유포하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>다량의 정보를 전송하거나<span style="font-family:함초롬바탕;">,&nbsp;</span>동일한 또는 유사한 내용의 정보를 반복적으로 게시하여 서비스의 안정적인 운영을 방해하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙없이 복제 또는 유통시키거나 상업적으로 이용하거나 배포하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>불법선거운동을 하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사로부터 특별한 권리를 부여받지 않고 회사의 클라이언트 프로그램을 변경하거나<span style="font-family:함초롬바탕;">,&nbsp;</span>회사의 서버를 해킹하거나<span style="font-family:함초롬바탕;">,&nbsp;</span>웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>공공질서 및 미풍양속에 위반되는 저속<span style="font-family:함초롬바탕;">,&nbsp;</span>음란한 내용의 정보<span style="font-family:함초롬바탕;">,&nbsp;</span>문장<span style="font-family:함초롬바탕;">,&nbsp;</span>도형<span style="font-family:함초롬바탕;">,&nbsp;</span>음향<span style="font-family:함초롬바탕;">,&nbsp;</span>동영상을 전송<span style="font-family:함초롬바탕;">,&nbsp;</span>게시<span style="font-family:함초롬바탕;">,&nbsp;</span>전자우편 또는 기타의 방법으로 타인에게 유포하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송<span style="font-family:함초롬바탕;">,&nbsp;</span>게시<span style="font-family:함초롬바탕;">,&nbsp;</span>전자우편 또는 기타의 방법으로 타인에게 유포하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>다른 이용자를 희롱 또는 위협하거나<span style="font-family:함초롬바탕;">,&nbsp;</span>특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>범죄와 결부된다고 객관적으로 판단되는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>본 약관을 포함하여 기타 회사가 정한 제반 규정 또는 이용 조건을 위반하는 행위&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 관계법령에 위배되는 행위&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(9)</span>회원은 회사의 사전 서면 동의 없이 서비스를 이용하여 영리적인 목적의 영업행위를 하여서는 안됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이를 위반한 영업행의의 결과에 대하여 회사<s>은</s><span style="font-family:함초롬바탕;">&nbsp;</span>책임을 지지 않으며<span style="font-family:함초롬바탕;">,&nbsp;</span>이와 같은 영업 행위의 결과로 회사에 손해가 발생한 경우 회원은 회사에 대하여 손해배상의 의무를 집니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(10)</span>회사는 만&nbsp;<span style="font-family:함초롬바탕;">14</span>세 미만의 회원에 대한 회원가입 신청을 받지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">4&nbsp;</span>장 서비스의 이용&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">13&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>서비스 이용 시간<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴<span style="font-family:함초롬바탕;">, 1</span>일&nbsp;<span style="font-family:함초롬바탕;">24</span>시간 운영을 원칙으로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>단<span style="font-family:함초롬바탕;">,&nbsp;</span>회사는 시스템 정기점검<span style="font-family:함초롬바탕;">,&nbsp;</span>증설 및 교체를 위해 회사가 정한 날이나 시간에 서비스를 일시중단할 수 있으며<span style="font-family:함초롬바탕;">,&nbsp;</span>예정되어 있는 작업으로 인한 서비스 일시중단은 회사 웹을 통해 사전에 공지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 긴급한 시스템 점검<span style="font-family:함초롬바탕;">,&nbsp;</span>증설 및 교체 등 부득이한 사유로 인하여 예고 없이 일시적으로 서비스를 중단할 수 있으며<span style="font-family:함초롬바탕;">,&nbsp;</span>새로운 서비스로의 교체 등 회사가 적절하다고 판단하는 사유에 의하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 국가비상사태<span style="font-family:함초롬바탕;">,&nbsp;</span>정전<span style="font-family:함초롬바탕;">,&nbsp;</span>서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만 이 경우 그 사유 및 기간 등을 회원에게 사전 또는 사후에 공지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>회사는 회사가 통제할 수 없는 사유로 인한 서비스 중단의 경우<span style="font-family:함초롬바탕;">(</span>시스템관리자의 고의<span style="font-family:함초롬바탕;">,&nbsp;</span>과실 없는 디스크 장애<span style="font-family:함초롬바탕;">,&nbsp;</span>시스템다운 등<span style="font-family:함초롬바탕;">)</span>에 사전통지가 불가능하며 타인<span style="font-family:함초롬바탕;">(PC&nbsp;</span>통신회사<span style="font-family:함초롬바탕;">,&nbsp;</span>기간통신사업자 등<span style="font-family:함초롬바탕;">)</span>의 고의<span style="font-family:함초롬바탕;">,&nbsp;</span>과실로 인한 시스템중단 등의 경우에는 통지하지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>회사는 서비스를 특정 범위로 분할하여 각 범위별로 이용가능시간을 별도로 지정할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만 이 경우 그 내용을 공지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(6)</span>회사은 서비스의 이용 제한을 하고자 하는 경우에는 그 사유<span style="font-family:함초롬바탕;">,&nbsp;</span>일시 및 기간을 정하여 이용자의 전자우편 또는 전화 등의 방법에 의하여 해당 이용자에게 통지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>회사이 긴급하게 이용을 정지할 필요가 있다고 인정하는 경우에는 그러하지 아니할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">14&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">몰의 서비스 제공</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)&quot;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 다음과 같은 업무를 수행합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>①&nbsp;재화 또는 용역에 대한 정보 제공 및 구매계약의 체결&nbsp;</p>
<p>②&nbsp;구매계약이 체결된 재화 또는 용역의 배송&nbsp;</p>
<p>③&nbsp;기타&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 정하는 업무&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(2)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 재화의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화<span style="font-family:함초롬바탕;">,&nbsp;</span>용역의 내용을 변경할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이 경우에는 변경된 재화<span style="font-family:함초롬바탕;">,&nbsp;</span>용역의 내용 및 제공일자를 명시하여 현재의 재화<span style="font-family:함초롬바탕;">,&nbsp;</span>용역의 내용을 게시한 곳에 그 제공일자 이전&nbsp;<span style="font-family:함초롬바탕;">7</span>일부터 공지합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이로 인하여 이용자가 입은 손해를 배상합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>단<span style="font-family:함초롬바탕;">, &ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;</span>에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">15&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">이용자</span><span style="font-family:함초롬바탕;font-weight:bold;">ID&nbsp;</span><span style="font-weight:bold;">관리</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>이용자<span style="font-family:함초롬바탕;">ID</span>와 비밀번호에 관한 모든 관리책임은 회원에게 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>자신의&nbsp;<span style="font-family:함초롬바탕;">ID</span>가 부정하게 사용된 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>회원은 반드시 그 사실을 회사에 전화 또는 전자우편으로 통보해야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 이용자&nbsp;<span style="font-family:함초롬바탕;">ID</span>에 의하여 제반 이용자 관리업무를 수행하므로 회원이 이용자&nbsp;<span style="font-family:함초롬바탕;">ID</span>를 변경하고자 하는 경우 회사가 인정할 만한 사유가 없는 한 이용자&nbsp;<span style="font-family:함초롬바탕;">ID</span>의 변경을 제한할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>이용고객이 등록한 이용자&nbsp;<span style="font-family:함초롬바탕;">ID&nbsp;</span>및 비밀번호에 의하여 발생되는 사용상의 과실 또는 제&nbsp;<span style="font-family:함초롬바탕;">3</span>자에 의한 부정사용 등에 대한 모든 책임은 해당 이용고객에게 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">16&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">게시물의 관리</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p>회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>다른 회원 또는 제&nbsp;<span style="font-family:함초롬바탕;">3</span>자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>불법복제 또는 해킹을 조장하는 내용인 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>영리를 목적으로 하는 광고일 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>범죄와 결부된다고 객관적으로 인정되는 내용일 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>다른 이용자 또는 제&nbsp;<span style="font-family:함초롬바탕;">3</span>자의 저작권 등 기타 권리를 침해하는 내용인 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>회사에서 규정한 게시물 원칙에 어긋나거나<span style="font-family:함초롬바탕;">,&nbsp;</span>게시판 성격에 부합하지 않는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 관계법령에 위배된다고 판단되는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>저작권에 문제의 소지가 있는 자료의 경우&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">17&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">게시물에 대한 저작권</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회원이 서비스 화면 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span>또한 회사는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만 비영리 목적인 경우는 그러하지 아니하며<span style="font-family:함초롬바탕;">,&nbsp;</span>또한 서비스내의 게재권을 갖습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회원은 서비스를 이용하여 취득한 정보를 임의 가공<span style="font-family:함초롬바탕;">,&nbsp;</span>판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 회원이 게시하거나 등록하는 서비스 내의 내용물<span style="font-family:함초롬바탕;">,&nbsp;</span>게시 내용에 대해 제&nbsp;<span style="font-family:함초롬바탕;">15</span>조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">18&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">정보 및 광고의 제공</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신우편 등의 방법으로 회원에게 제공할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인 정보를 요구할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">&nbsp;</span></p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">5&nbsp;</span><span style="font-weight:bold;">장 계약 해지 및 이용 제한&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">19&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">계약 변경 및 해지</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 회사 웹 내의&nbsp;<span style="font-family:함초롬바탕;">[</span>고객센터<span style="font-family:함초롬바탕;">]&nbsp;</span>메뉴를 이용해 가입해지를 해야 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회원이 다음 각호의 사유에 해당하는 경우<span style="font-family:함초롬바탕;">, &ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 회원 자격을 제한 및 정지시킬 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>가입 신청시에 허위 내용을 등록한 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2. &ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;</span>을 이용하여 구입한 재화<span style="font-family:함초롬바탕;">&middot;</span>용역 등의 대금<span style="font-family:함초롬바탕;">,&nbsp;</span>기타&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>다른 사람의&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;&nbsp;</span>이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">4. &ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;</span>을 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(3)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 회원자격을 제한<span style="font-family:함초롬바탕;">,&nbsp;</span>정지 시킨 후<span style="font-family:함초롬바탕;">,&nbsp;</span>동일한 행위가&nbsp;<span style="font-family:함초롬바탕;">2</span>회 이상 반복되거나&nbsp;<span style="font-family:함초롬바탕;">30</span>일 이내에 그 사유가 시정되지 아니하는 경우<span style="font-family:함초롬바탕;">, &ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 회원 자격을 상실 시킬 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>이 경우 회원에게 이를 통지하고<span style="font-family:함초롬바탕;">,&nbsp;</span>회원등록 말소 전에 소명할 기회를 부여합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">6&nbsp;</span><span style="font-weight:bold;">장 구매 및 대금결제</span><span style="font-family:함초롬바탕;font-weight:bold;">,&nbsp;</span><span style="font-weight:bold;">배송</span><span style="font-family:함초롬바탕;font-weight:bold;">,&nbsp;</span><span style="font-weight:bold;">취소</span><span style="font-family:함초롬바탕;font-weight:bold;">,&nbsp;</span><span style="font-weight:bold;">환불&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">20&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">구매신청</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이용자는&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;&nbsp;</span>상에서 이하의 방법에 의하여 구매를 신청합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>성명<span style="font-family:함초롬바탕;">,&nbsp;</span>주소<span style="font-family:함초롬바탕;">,&nbsp;</span>전화번호 입력&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>재화 또는 용역의 선택&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>결제방법의 선택&nbsp;</p>
<p><span style="font-family:함초롬바탕;">4.&nbsp;</span>이 약관에 동의한다는 표시<span style="font-family:함초롬바탕;">(</span>예<span style="font-family:함초롬바탕;">,&nbsp;</span>마우스 클릭<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-weight:bold;">제&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">21&nbsp;</span><span style="font-weight:bold;">조&nbsp;</span><span style="font-family:함초롬바탕;font-weight:bold;">(</span><span style="font-weight:bold;">계약의 성립</span><span style="font-family:함초롬바탕;font-weight:bold;">)&nbsp;</span></p>
<p>①<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 제<span style="font-family:함초롬바탕;">9</span>조와 같은 구매신청에 대하여 다음 각호에 해당하지 않는 한 승낙합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>신청 내용에 허위<span style="font-family:함초롬바탕;">,&nbsp;</span>기재누락<span style="font-family:함초롬바탕;">,&nbsp;</span>오기가 있는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>미성년자가 담배<span style="font-family:함초롬바탕;">,&nbsp;</span>주류등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>기타 구매신청에 승낙하는 것이&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;&nbsp;</span>기술상 현저히 지장이 있다고 판단하는 경우&nbsp;</p>
<p>&nbsp;</p>
<p>②<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>의 승낙이 제<span style="font-family:함초롬바탕;">12</span>조제<span style="font-family:함초롬바탕;">1</span>항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">22&nbsp;</span>조<span style="font-family:함초롬바탕;">(</span>지급방법<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의 하나로 할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>계좌이체&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>신용카드결제&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>온라인무통장입금&nbsp;</p>
<p><span style="font-family:함초롬바탕;">4. ARS</span>에 의한 결제&nbsp;</p>
<p><span style="font-family:함초롬바탕;">5.&nbsp;</span>마일리지에 의한 결제&nbsp;</p>
<p><span style="font-family:함초롬바탕;">6.&nbsp;</span>기타 방법에 의한 대금지급 등&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">23&nbsp;</span>조<span style="font-family:함초롬바탕;">(</span>수신확인통지<span style="font-family:함초롬바탕;">&middot;</span>구매신청 변경 및 취소<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>①<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>②수신확인통지를 받은 이용자는 의사표시의 불일치등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>③<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 배송전 이용자의 구매신청 변경 및 취소 요청이 있는 때에는 지체없이 그 요청에 따라 처리합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">24&nbsp;</span>조<span style="font-family:함초롬바탕;">(</span>배송<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이용자가 구매한 재화에 대해 배송수단<span style="font-family:함초롬바탕;">,&nbsp;</span>수단별 배송비용 부담자<span style="font-family:함초롬바탕;">,&nbsp;</span>수단별 배송기간 등을 명시합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>만약&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&quot;</span>의 고의<span style="font-family:함초롬바탕;">&middot;</span>과실로 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">25&nbsp;</span>조<span style="font-family:함초롬바탕;">(</span>환급<span style="font-family:함초롬바탕;">,&nbsp;</span>반품 및 교환<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p>①<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이용자가 구매신청한 재화 또는 용역이 품절 등의 사유로 재화의 인도 또는 용역의 제공을 할 수 없을 때에는 지체없이 그 사유를 이용자에게 통지하고<span style="font-family:함초롬바탕;">,&nbsp;</span>사전에 재화 또는 용역의 대금을 받은 경우에는 대금을 받은 날부터&nbsp;<span style="font-family:함초롬바탕;">3</span>일이내에<span style="font-family:함초롬바탕;">,&nbsp;</span>그렇지 않은 경우에는 그 사유발생일로부터&nbsp;<span style="font-family:함초롬바탕;">3</span>일 이내에 계약해제 및 환급 절차를 취합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>②다음 각호의 경우에는&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 배송된 재화일지라도 재화를 반품받은 다음 영업일 이내에 이용자의 요구에 따라 즉시 환급<span style="font-family:함초롬바탕;">,&nbsp;</span>반품 및 교환 조치를 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만 그 요구기한은 배송된 날로부터&nbsp;<span style="font-family:함초롬바탕;">20</span>일 이내로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>배송된 재화가 주문내용과 상이하거나&nbsp;<span style="font-family:함초롬바탕;">&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>이 제공한 정보와 상이할 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>배송된 재화가 파손<span style="font-family:함초롬바탕;">,&nbsp;</span>손상되었거나 오염되었을 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">3.&nbsp;</span>재화가 광고에 표시된 배송기간보다 늦게 배송된 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">4.&nbsp;</span>방문판매 등에 관한 법률 제<span style="font-family:함초롬바탕;">18</span>조에 의하여 광고에 표시하여야 할 사항을 표시하지 아니한 상태에서 이용자의 청약이 이루어진 경우&nbsp;</p>
<p>③회사의 책임있는 사유로 과오금이 발생한 경우 회사는 계약비용<span style="font-family:함초롬바탕;">,&nbsp;</span>수수료 등에 관계없이 과오금 전액을 환급합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>이용자의 책임 있는 사유로 과오금이 발생한 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>과오금의 환급에 소요되는 비용은 합리적인 범위 내에서 이용자가 부담합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>④회사와 컨텐츠 이용 계약을 체결한 이용자는 다음 각 호에서 정한 기간 내에 청약을 철회할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>회사가 이보다 더 장기의 기간을 이용자에게 부여한 경우에 이용자는 그 기간 내에 청약을 철회할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>계약서를 받은 날로부터&nbsp;<span style="font-family:함초롬바탕;">7</span>일<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>계약서를 받은 때보다 컨텐츠의 공급이 늦게 이루어진 경우에는 컨텐츠를 공급받거나 컨텐츠의 공급이 시작된 날로부터&nbsp;<span style="font-family:함초롬바탕;">7</span>일&nbsp;<span style="font-family:함초롬바탕;">(</span>단<span style="font-family:함초롬바탕;">,&nbsp;</span>컨텐츠 이용을 하지 않은 경우에 한하며<span style="font-family:함초롬바탕;">,&nbsp;</span>이용을 한 경우 과정별 환불규정을 적용함<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>계약서가 이용자에게 교부되지 않은 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>회사의 주소 등이 기재되지 않은 계약서를 교부 받은 경우 또는 회사의 주소 변경 등의 사유로 제&nbsp;<span style="font-family:함초롬바탕;">1</span>호의 기간 내에 청약철회를 할 수 없는 경우에는 그 주소를 안 날 또는 알 수 있었던 날로부터&nbsp;<span style="font-family:함초롬바탕;">7</span>일&nbsp;</p>
<p>⑤이용자는 다음 각 호의 어느 하나에 해당하는 사유가 있을 때에는 당해 컨텐츠를 이용할 수 있는 날로부터&nbsp;<span style="font-family:함초롬바탕;">3</span>월 이내 또는 그 사실을 안 날 또는 알 수 있었던 날로부터&nbsp;<span style="font-family:함초롬바탕;">30</span>일 이내에 컨텐츠 이용 계약에 대한 청약을 철회할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">1.&nbsp;</span>표시<span style="font-family:함초롬바탕;">,&nbsp;</span>광고된 내용과 다른 컨텐츠가 제공된 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">2.&nbsp;</span>계약내용과 다르게 이행된 경우&nbsp;</p>
<p>⑥회사는 컨텐츠를 반환 받은 날로부터&nbsp;<span style="font-family:함초롬바탕;">3</span>영업일 이내에 대금의 결제와 동일한 방법으로 대금을 환급하며<span style="font-family:함초롬바탕;">,&nbsp;</span>동일한 방법으로 환급이 불가능할 때에는 이용자가 원하는 방법으로 환급합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>다운로드한 온라인 컨텐츠 또는 스트리밍 방식의 온라인 컨텐츠의 경우 회사는 이용자의 청약철회의 의사표시를 받은 날로부터&nbsp;<span style="font-family:함초롬바탕;">3</span>영업일 이내에 대금을 환급합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">26&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>서비스 이용제한<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 회원이 서비스 이용내용에 있어서 본 약관 제&nbsp;<span style="font-family:함초롬바탕;">11</span>조 내용을 위반하거나<span style="font-family:함초롬바탕;">,&nbsp;</span>다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>미풍양속을 저해하는 비속한&nbsp;<span style="font-family:함초롬바탕;">ID&nbsp;</span>및 별명 사용&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>타 이용자에게 심한 모욕을 주거나<span style="font-family:함초롬바탕;">,&nbsp;</span>서비스 이용을 방해한 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>기타 정상적인 서비스 운영에 방해가 될 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">*&nbsp;</span>정보통신 윤리위원회 등 관련 공공기관의 시정 요구가 있는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">* 6</span>개월 이상 서비스를 이용한 적이 없는 경우&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(2)</span>상기 이용제한 규정에 따라 서비스를 이용하는 회원에게 서비스 이용에 대하여 별도 공지 없이 서비스 이용의 일시정지<span style="font-family:함초롬바탕;">,&nbsp;</span>초기화<span style="font-family:함초롬바탕;">,&nbsp;</span>이용계약 해지 등을 불량이용자 처리규정에 따라 취할 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">7&nbsp;</span>장 손해배상 및 기타사항&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">27&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>손해배상<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 서비스에서 무료로 제공하는 서비스의 이용과 관련하여 개인정보보호정책에서 정하는 내용에 해당하지 않는 사항에 대하여는 어떠한 손해도 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 컨텐츠의 하자<span style="font-family:함초롬바탕;">,&nbsp;</span>이용중지 또는 장애 등에 의하여 발생한 이용자의 손해에 대하여 자사 환불<span style="font-family:함초롬바탕;">/</span>취소 규정에 따라 처리합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">&nbsp;</span></p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">28&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>면책조항<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>회사는 천재지변<span style="font-family:함초롬바탕;">,&nbsp;</span>전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>회사는 서비스용 설비의 보수<span style="font-family:함초롬바탕;">,&nbsp;</span>교체<span style="font-family:함초롬바탕;">,&nbsp;</span>정기점검<span style="font-family:함초롬바탕;">,&nbsp;</span>공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(4)</span>회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(5)</span>회사는 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우<span style="font-family:함초롬바탕;">,&nbsp;</span>또는 회원이 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(6)</span>회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(7)</span>회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span>또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(8)</span>회사는 회원이 서비스에 게재한 각종 정보<span style="font-family:함초롬바탕;">,&nbsp;</span>자료<span style="font-family:함초롬바탕;">,&nbsp;</span>사실의 신뢰도<span style="font-family:함초롬바탕;">,&nbsp;</span>정확성 등 내용에 대하여 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(9)</span>회사는 이용자 상호간 및 이용자와 제&nbsp;<span style="font-family:함초롬바탕;">3</span>자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며<span style="font-family:함초롬바탕;">,&nbsp;</span>이로 인한 손해를 배상할 책임도 없습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(10)</span>회사에서 회원에게 무료로 제공하는 서비스의 이용과 관련해서는 어떠한 손해도 책임을 지지 않습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">29&nbsp;</span>조<span style="font-family:함초롬바탕;">(</span>분쟁해결<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치<span style="font-family:함초롬바탕;">&middot;</span>운영합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다<span style="font-family:함초롬바탕;">.&nbsp;</span>다만<span style="font-family:함초롬바탕;">,&nbsp;</span>신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)&ldquo;</span>몰<span style="font-family:함초롬바탕;">&rdquo;</span>과 이용자 간에 발생한 분쟁은 전자문서 및 전자거래 기본법에 따라 진행되며<span style="font-family:함초롬바탕;">,&nbsp;</span>설치된 전자문서<span style="font-family:함초롬바탕;">&middot;</span>전자거래분쟁조정위원회의 조정에 따를 수 있습니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">제&nbsp;<span style="font-family:함초롬바탕;">30&nbsp;</span>조&nbsp;<span style="font-family:함초롬바탕;">(</span>재판권 및 준거법<span style="font-family:함초롬바탕;">)&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(1)</span>이 약관에 명시되지 않은 사항은 전기통신사업법 등 관계법령과 상관습에 따릅니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(2)</span>회사의 정액 서비스 회원 및 기타 유료 서비스 이용 회원의 경우 회사가 별도로 정한 약관 및 정책에 따릅니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p><span style="font-family:함초롬바탕;">(3)</span>서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="line-height:160%;margin-left:0.0pt;margin-right:0.0pt;text-indent:0.0pt;margin-top:0.0pt;margin-bottom:0.0pt;text-align:justify;vertical-align:baseline;font-weight:bold;font-size:13px;color:#000000;">부칙&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family:함초롬바탕;">(1)&nbsp;</span>본 약관은&nbsp;<span style="font-family:함초롬바탕;">2024</span>년&nbsp;<span style="font-family:함초롬바탕;">6</span>월&nbsp;<span style="font-family:함초롬바탕;">11</span>일부터 적용됩니다<span style="font-family:함초롬바탕;">.&nbsp;</span></p>
<p>시행일자&nbsp;<span style="font-family:함초롬바탕;">: 2024</span>년&nbsp;<span style="font-family:함초롬바탕;">6</span>월&nbsp;<span style="font-family:함초롬바탕;">11</span>일&nbsp;</p>
</div>
<? } ?>
</div>

<div class="agreeArea">
  <input type="checkbox" name="agreeUse" id="agreeUse" />
  <label for="agreeUse">이용약관에 동의합니다.</label>
</div>

<div class="private">
  <h1>개인정보취급방침</h1>
  <? if ($_SESSION['loginCompanyCode'] != "2148262315") { ?>
  <div>
  	<?=$privacy?>
  </div>
</div>
  <? } ?>
</div>
<div class="agreeArea">
  <!-- <input type="checkbox" name="agreePrivate" id="agreePrivate" />
  <label for="agreePrivate">개인정보 취급방침에 동의합니다.</label> -->
  <input type="checkbox" name="agreePrivate" id="agreePrivate"><label for="agreePrivate"> (필수) 동의 사항에 동의합니다.</label>
  <!-- <input type="checkbox" name="agreeOptional" id="agreeOptional"><label for="agreeOptional"> (선택) Sales TM, 마케팅 및 광고 동의 사항에 동의합니다.</label>
  <input type="checkbox" name="agreeThirdParty" id="agreeThirdParty"><label for="agreeThirdParty">(필수) 제3자 제공 동의에 동의합니다.</label> -->
</div>

<? if ($_SESSION['loginCompanyCode'] != "2148262315") { ?>
<div class="ACS">
  <h1>ACS이용 안내</h1>
  <div><?=$acs?></div>
</div>
<div class="agreeArea">  
  <input type="checkbox" name="agreeACS" id="agreeACS" />
  <label for="agreeACS">ACS에 관하여 충분히 알았습니다.</label>
</div>
<? } else { ?>
	<input type="hidden" name="agreeACS" value="1" />
<? } 

$query = "SELECT A.*, B.value02
					FROM nynMember A
					LEFT OUTER
					JOIN nynCategory B
					ON A.userLevel=B.value01 AND B.division=
					(SELECT seq FROM nynCategory WHERE value01='userLevel')
					WHERE A.userID='".$_SESSION[loginUserID]."'";
$result = mysql_query($query);
?>
<form class="sendForm" action="javascript:sendData()">
	<h1>학습자 정보 확인</h1>
	<input type="hidden" name="agreement" value="Y">
	<input type="hidden" name="zipCode" value="00000">
	<ul>
		<li>
			<h1>학습자 성명</h1>
			<strong><?=mysql_result($result,0,'userName');?></strong>
		</li>
		<li>
			<h1>휴대폰 번호</h1>
			<select  name="mobile01">
				<option value="010">010</option>
			</select>
			&nbsp;-&nbsp;
			<input type="tel" name="mobile02" value="<?=mysql_result($result,0,'mobile02');?>" />
			&nbsp;-&nbsp;
			<input type="tel" name="mobile03" value="<?=mysql_result($result,0,'mobile03');?>" />
		</li>
		<li>
			<h1>새 비밀번호</h1>
			<input type="password" name="passwordCheck" placeholder="영문,숫자 혼합하여 10~20자" size="25"/> ※ 새로운 비밀번호를 입력해 주세요. 다음 로그인부터는 이 비밀번호로 로그인 하셔야 합니다.
		</li>
		<li>
	<h1>새 비밀번호 확인</h1>
	<input type="password" name="pwd" size="25"/>
	</li>
	</div></li>
	</li>
	</ul>
</form>
<div class="agreeArea">
  <input type="checkbox" name="agree" id="agree" />
  <label for="agree">휴대폰 정보가 일치하며, 새 비밀번호를 발급받았습니다.</label>
</div>
<div class="btnArea">
  <button onClick="agreeCheck()"><img src="../images/member/btn_ok.png" /></button>
</div>


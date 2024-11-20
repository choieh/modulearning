<?
include '../include/header.php';
$domain = $_SERVER["HTTP_HOST"];
$subDomain = explode('.' . $_siteURL, $domain);

$sql = "SELECT studyEnabled FROM nynCompany WHERE companyID='" . $subDomain[0] . "'";
$res = mysql_query($sql);
$row = mysql_fetch_array($res);
$link = 'https://' . $_siteURL . '/main/';

if ($row['studyEnabled'] == "Y") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenter/';
} else if ($row['studyEnabled'] == "YN") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenterV2/';
} else if ($row['studyEnabled'] == "YA") {
    $link = 'https://' . $subDomain[0] . '.' . $_siteURL . '/studyCenterNew/';
}
?>
<script type="text/javascript">

    function agreeCheck() {
        var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        var regPwd = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

        if ($('input[name="agreeUse"]').prop('checked') != true) {
            alert('이용약관에 동의해주세요.')
        } else if ($('input[name="agreePrivate"]').prop('checked') != true) {
            alert('개인정보 취급방침에 동의해주세요.')
        } else if ($('input[name="agreeACS"]').prop('checked') != true) {
            alert('ACS안내 사항에 동의해주세요.')
        } else if ($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == '') {
            alert('휴대폰 번호를 확인해주세요.')
        } else if ($('input[name="passwordCheck"]').val() == '') {
            alert('새 비밀번호를 입력해주세요.')
        } else if (!regPwd.test($('input[name="passwordCheck"]').val())) {	//20170822 강혜림추가
            alert('비밀번호를 영문,숫자 혼합하여 10~20자로 입력해주세요.')
        } else if ($('input[name="pwd"]').val() == '') {
            alert('새 비밀번호 확인을 입력해주세요.')
        } else if ($('input[name="pwd"]').val() == $('input[name="birth"]').val()) {
            alert('초기 임시 비밀번호와 다른 비밀번호로 설정해 주세요.\n다음 로그인부터는 변경한 비밀번호로 로그인 하셔야 합니다.')
        } else if ($('input[name="passwordCheck"]').val() != $('input[name="pwd"]').val()) {
            alert('비밀번호 확인이 일치하지 않습니다.')
        } else if ($('input[name="agree"]').prop('checked') != true) {
            alert('개인정보 확인사항에 체크해주세요.')
        } else if ($('input[name="auth"]').val() != 'Y') {
            alert('휴대폰 인증을 해주세요.');
        } else {
            var sendData = $('form.sendForm').serialize();

            $.post('../api/apiLoginUser.php', sendData, function (data) {
                if (data.result == 'success') {
                    var subDomain = '<?=$_SERVER["HTTP_HOST"] ?>';
                    subDomain = subDomain.replace('.' + _siteURL, '');
                    alert('정보가 반영되었습니다.\n이제부터 새로 설정한 비밀번호로 로그인 하시기 바랍니다.');
                    if (subDomain[0] == "kwhy" || subDomain[0] == "sjhy" || subDomain[0] == "cbhy") {
                        top.location.href = '../kaoh_main/login.php';
                    } else {
                        top.location.href = '<?=$link?>';
                    }
                } else {
                    alert('확인중 문제가 발생하였습니다.')
                }
            })
        }
    }

    function authUser() {
        window.open('../auth/loginAuth.php', '', 'width=300,height=300,top=200,left=200',)
    }
</script>
</head>

<body id="agreementCheck">
<div class="titleArea">
    <div>
        <img src="../images/study/img_test01.png"/>
        <h1>학습자 유의사항</h1>
        <h2 class="contentsName">이용약관 및 개인정보이용방침, 개인정보 확인을 해주셔야 학습을 하실 수 있습니다.</h2>
    </div>
</div>
<div class="agreeUse">
    <h1>이용약관</h1>
    <div><p><b><span style="font-size: 10pt;">제 1 장 총 칙&nbsp;</span></b></p>
        <p>&nbsp;</p>
        <p>제 1 조 (목적)&nbsp;</p>
        <p>이 이용약관(이하 '약관')은 주식회사 모두의러닝(이하 '회사'라 합니다)과 이용 고객(이하 '회원')간에 회사가 제공하는 서비스의 가입조건 및 이용에 관한 제반 사항과 경영지식몰의 상품 구입,
            기타 필요한 사항을 구체적으로 규정함을 목적으로 합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 2 조 (이용약관의 효력 및 변경)&nbsp;</p>
        <p>(1)이 약관은 회사 웹사이트에서 온라인으로 공시함으로써 효력을 발생하며, 합리적인 사유가 발생할 경우 관련법령에 위배되지 않는 범위 안에서 개정될 수 있습니다. 개정된 약관은 온라인에서
            공지함으로써 효력을 발휘하며, 이용자의 권리 또는 의무 등 중요한 규정의 개정은 사전에 공지합니다.&nbsp;</p>
        <p>(2)회사는 합리적인 사유가 발생될 경우에는 이 약관을 변경할 수 있으며, 약관을 변경할 경우에는 지체 없이 이를 사전에 공시합니다.&nbsp;</p>
        <p>(3)회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 사이트 초기화면에 그 적용일자 7일(이용자에게 불리한 변경 또는 중대한 사항의 변경은 30일) 이전부터 적용일자
            이후 상당한 기간 동안 공지하고, 기존 회원에게는 변경될 약관, 적용일자 및 변경사유(중요내용에 대한 변경인 경우 이에 대한 설명을 포함)를 이메일 또는 문자메시지로
            발송합니다.&nbsp;</p>
        <p>(4)회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의
            변경 사항에 동의한 것으로 간주됩니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 3 조 (약관외 준칙)&nbsp;</p>
        <p>①이 약관은 회사가 제공하는 개별서비스에 관한 이용안내(이하 서비스별 안내라 합니다)와 함께 적용합니다.&nbsp;</p>
        <p>②이 약관에 명시되지 아니한 사항에 대해서는 관계법령 및 서비스별 안내의 취지에 따라 적용할 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 4 조 (용어의 정의)&nbsp;</p>
        <p>①이 약관에서 사용하는 용어의 정의는 다음과 같습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1.'몰'이라 함은 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한
            가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.&nbsp;</p>
        <p style="margin-left: 40px;">2..'회원'이라 함은 회원제서비스를 이용하는 이용자를 말하며, "몰"이 제공하는 서비스를 지속적으로 이용할 수 있는 자를
            말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">3.'이용계약'이라 함은 서비스 이용과 관련하여 회사와 이용고객 간에 체결 하는 계약을 말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">4.'이용자번호(ID)'라 함은 이용고객의 식별과 이용고객의 서비스 이용을 위하여 이용고객이 선정하고 회사가 부여하는 문자와 숫자의 조합을
            말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">5.'비밀번호'라 함은 이용고객이 부여 받은 이용자번호와 일치된 이용고객 임을 확인하고 이용고객의 권익보호를 위하여 이용고객이 선정한 문자와 숫자의
            조합을 말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">6.'해지'라 함은 회사 또는 회원이 이용계약을 해약하는 것을 말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">7.회원등급: 회사가 제공하는 서비스를 이용한 결과에 따라 일정한 기준에 따라 회사가 회원에게 부여하는 등급을 말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">8.학점 : 회사가 제공하는 서비스를 이용한 결과에 따라 일정한 기준으로 부여하는 점수를 말합니다.&nbsp;</p>
        <p>②이 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계법령 및 서비스별 안내에서 정하는 바에 의합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><b><span style="font-size: 10pt;">제 2 장 이용계약 체결</span></b>&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 5 조 (이용 계약의 성립)&nbsp;</p>
        <p>(1)이용계약은 이용고객의 본 이용약관 내용에 대한 동의와 이용신청에 대하여 회사의 이용승낙으로 성립합니다.&nbsp;</p>
        <p>(2)본 이용약관에 대한 동의는 이용신청 당시 해당 회사 웹의 '동의함' 버튼을 누름으로써 의사표시를 합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 6 조 (서비스 이용 신청)&nbsp;</p>
        <p>(1)회원으로 가입하여 본 서비스를 이용하고자 하는 이용고객은 회사에서 요청하는 제반정보(이름, 생년월일, 이메일주소, 연락처 등)를 제공하여야 합니다.&nbsp;</p>
        <p>(2)모든 회원은 반드시 회원 본인의 이름을 실명으로 제공하여야만 서비스를 이용할 수 있으며, 실명으로 등록하지 않은 사용자는 일체의 권리를 주장할 수 없습니다.&nbsp;</p>
        <p>(3)회원가입은 반드시 실명으로만 가입할 수 있으며 회사는 실명확인조치를 할 수 있습니다.&nbsp;</p>
        <p>(4)타인의 명의(이름 및 주민등록번호)를 도용하여 이용신청을 한 회원의 모든 ID는 삭제되며, 관계법령에 따라 처벌을 받을 수 있습니다.&nbsp;</p>
        <p>(5)회사는 본 서비스를 이용하는 회원에 대하여 등급별로 제공되는 서비스에 차등을 둘 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 7 조 (개인정보의 보호 및 사용)&nbsp;</p>
        <p>(1)회사는 관계법령이 정하는 바에 따라 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위해 노력합니다. 이용자 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보 보호정책이
            적용됩니다. 단, 회사의 공식사이트이외의 웹에서 링크된 사이트에서는 회사의 개인정보 보호정책이 적용되지 않습니다. 또한 회사는 이용자의 귀책사유로 인해 노출된 정보에 대해서 일체의 책임을 지지
            않습니다.&nbsp;</p>
        <p>(2)제공된 개인 정보는 당해 이용자의 동의 없이 목적외의 이용이나 제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 "몰"이집니다. 다만, 다음의 경우에는 예외로 합니다.&nbsp;</p>
        <p style="margin-left: 40px;">1.배송업무상 배송업체에게 배송에 필요한 최소한의 이용자의 정보(성명, 주소, 전화번호)를 알려 주는 경우&nbsp;</p>
        <p style="margin-left: 40px;">2.통계작성, 학술 연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우&nbsp;</p>
        <p>(3)"몰"이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원(소속, 성명 및 전화번호 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공
            관련사항(제공받는자, 제공목적 및 제공할 정보의 내용)등 정보통신망이용촉진등에관한법률 제16조제3항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수
            있습니다.&nbsp;</p>
        <p>(4)이용자는 언제든지 "몰"이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 "몰"은 이에 대해 지체없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을
            요구한 경우에는 "몰"은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.&nbsp;</p>
        <p>(5)"몰" 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체없이 파기합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 8 조 (이용 신청의 승낙과 제한)&nbsp;</p>
        <p>(1)회사는 제 6조의 규정에 의한 이용신청고객에 대하여 업무 수행상 또는 기술상 지장이 없는 경우에 원칙적으로 접수순서에 따라 서비스 이용을 승낙합니다.&nbsp;</p>
        <p>(2)회사는 아래사항에 해당하는 경우에 대해서 승낙하지 아니 합니다.&nbsp;</p>
        <p style="margin-left: 40px;">* 실명이 아니거나 타인의 명의를 이용하여 신청한 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 이용계약 신청서의 내용을 허위로 기재한 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 사회의 안녕과 질서, 미풍양속을 저해할 목적으로 신청한 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 부정한 용도로 본 서비스를 이용하고자 하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 규정한 제반사항을 위반하며 신청하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 본 서비스와 경쟁관계에 있는 이용자가 신청하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 규정한 제반사항을 위반하며 신청하는 경우&nbsp;</p>
        <p>(3)회사는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">* 회사가 설비의 여유가 없는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 회사의 기술상 지장이 있는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 회사의 귀책사유로 이용승낙이 곤란한 경우&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 9 조 (이용자ID 부여 및 변경 등)&nbsp;</p>
        <p>(1)회사는 이용고객에 대하여 약관에 정하는 바에 따라 이용자 ID를 부여합니다.&nbsp;</p>
        <p>(2)이용자ID는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경 하고자 하는 경우에는 해당 ID를 해지하고 재가입해야 합니다.&nbsp;</p>
        <p>(3)이용자ID는 다음 각 호에 해당하는 경우에는 이용고객 또는 회사의 요청으로 변경할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 이용자ID가 이용자의 전화번호 또는 주민등록번호 등으로 등록되어 사생활침해가 우려되는 경우&nbsp;</p>
        <p style="margin-left: 40px;">2. 타인에게 혐오감을 주거나 미풍양속에 어긋나는 경우&nbsp;</p>
        <p style="margin-left: 40px;">3. 기타 합리적인 사유가 있는 경우&nbsp;</p>
        <p>(4)서비스 이용자ID 및 비밀번호의 관리책임은 이용자에게 있습니다. 이를 소홀이 관리하여 발생하는 서비스 이용상의 손해 또는 제3자에 의한 부정이용 등에 대한 책임은 이용자에게 있으며 회사는
            그에 대한 책임을 일절 지지 않습니다.&nbsp;</p>
        <p>(5)기타 이용자 개인정보 관리 및 변경 등에 관한 사항은 서비스별 안내에 정하는 바에 의합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 10 조 (회원등급 및 평가제도)&nbsp;</p>
        <p>(1)회사는 서비스 이용실적, 기타 회사가 정하는 이용정책에서 정한 기준에 따라 상품을 거래했을 때 부과되는 학점을 기준으로 하여 회원등급 및 등급에 따른 일정 혜택 등을 회원에게 부여할 수
            있습니다.&nbsp;</p>
        <p>(2)회원은 아래와 같이 일반회원, 골드회원, 골드VIP로 구분됩니다.&nbsp;</p>
        <p style="margin-left: 40px;">일반회원 : 몰에서 상품구매 및 구매와 관련하여 제공되는 서비스를 이용할 수 있는 회원을 말합니다.&nbsp;</p>
        <p style="margin-left: 40px;">골드회원 : 몰에서 50만원 이상을 구매(학점기준 100학점)하는 경우 그 댓가로 지속적 학습 지원을 위해 부여하는 평생회원을 말합니다. 상품할인,
            강의초청등 다양한 혜택이 평생동안 제공됩니다.&nbsp;</p>
        <p style="margin-left: 40px;">골드VIP : 골드회원 중 회사가 정하는 일정 기준 이상의 상품구매 또는 서비스를 이용하는 경우 1년간 부여되는 회원을 말합니다. 상품할인,
            강의초청 등 다양한 혜택이 제공됩니다.&nbsp;&nbsp;</p>
        <p>(3)해당 회원이 자신에게 부여된 등급 구성요소에 대하여 이의를 제기하면 회사는 소명내용, 해당 회원의 신용도 등 제반 상황을 고려하여 등급 구성요소의 전부 또는 일부를 조정할 수 있습니다.&nbsp;</p>
        <p>(4)회원의 등급은 참고자료로 활용될 뿐이며, 회원의 신용을 보증하거나 금융상의 신용상태를 의미하는 것은 아닙니다.&nbsp;</p>
        <p>(5)회원이 회원등급 및 회원평가제도의 목적과 취지에 어긋나는 행위를 하면 회사는 해당 평가결과를 삭제하고 관련 회원에 대한 서비스 이용자격을 정지하는 등 제재를 가할 수
            있습니다.&nbsp;</p>
        <p>(6)평생골드클래스 및 골드VIP회원이 된 경우, 새로운 상품, 추가 할인혜택 등에 관한 정보를 골드클래스가 유지되는 동안 별도의 거부의사가 없을 시 수신 동의하는 것으로
            합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><b><span style="font-size: 10pt;">제 3 장 계약 당사자의 의무&nbsp;</span></b></p>
        <p>&nbsp;</p>
        <p>제 11 조 (회사의 의무)&nbsp;</p>
        <p>(1)회사는 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다.&nbsp;</p>
        <p>(2)회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 부득이한 사유가 없는 한 지체없이 이를 수리 또는 복구합니다.&nbsp;</p>
        <p>(3)회사는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.&nbsp;</p>
        <p>(4)'몰'은 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등)을 이용자가 알 수 있도록 몰의 초기 서비스화면(전면)에 게시합니다.&nbsp;</p>
        <p>(5)"몰"은 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에 관한 법률, 방문판매에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수
            있습니다.&nbsp;</p>
        <p>(6)"몰"이 약관을 개정할 경우에는 적용일자 및 개정 사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.&nbsp;</p>
        <p>(7)"몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을
            체결한 이용자가 계정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 "몰"에 송신하여 "몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.&nbsp;</p>
        <p>(8)몰에 관련하여 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 전자상거래소비자보호지침 및 관계법령 또는 상관례에 따릅니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 12 조 (이용자의 의무)&nbsp;</p>
        <p>(1)이용자는 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수
            없습니다.&nbsp;</p>
        <p>(2)회원은 본 약관에서 규정하는 사항과 기타 회사가 정한 제반 규정, 공지사항 등 회사가 공지하는 사항 및 관계법령을 준수하여야 하며, 기타 회사의 업무에 방해가 되는 행위, 회사의 명예를
            손상시키는 행위를 해서는 안됩니다.&nbsp;</p>
        <p>(3)회원은 주소, 연락처, 전자우편 주소 등 이용계약사항이 변경된 경우에 해당 절차를 거쳐 이를 회사에 즉시 알려야 합니다.&nbsp;</p>
        <p>(4)회사가 관계법령 및 '개인정보 보호정책'에 의거하여 그 책임을 지는 경우를 제외하고 회원에게 부여된 ID의 비밀번호 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게
            있습니다.&nbsp;</p>
        <p>(5)회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동의 결과에 대해 회사는 책임을 지지 않습니다. 또한 회원은 이와 같은 영업활동으로 회사가 손해를 입은
            경우, 회원은 회사에 대해 손해배상의무를 지며, 회사는 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다.&nbsp;</p>
        <p>(6)회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며 이를 담보로 제공할 수 없습니다.&nbsp;</p>
        <p>(7)회원은 회사 및 제 3자의 지적 재산권을 침해해서는 안됩니다.&nbsp;</p>
        <p>(8)회원은 다음 각 호에 해당하는 행위를 하여서는 안되며, 해당 행위를 하는 경우에 회사는 회원의 서비스 이용제한 및 적법 조치를 포함한 제재를 가할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">* 허위의 개인정보를 기재하거나 중복하여 가입하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 타인의 서비스 아이디 및 주민등록번호를 도용하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 회사의 운영진, 직원 또는 관계자를 사칭하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 자신의 아이디 및 비밀번호를 유포하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 타인의 지적재산권을 침해하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 타인의 명예를 훼손하거나 사생활을 침해하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 고의 또는 과실로 허위의 정보를 공개 또는 유포하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 다량의 정보를 전송하거나, 동일한 또는 유사한 내용의 정보를 반복적으로 게시하여 서비스의 안정적인 운영을 방해하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙없이 복제 또는 유통시키거나 상업적으로 이용하거나 배포하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 불법선거운동을 하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 회사로부터 특별한 권리를 부여받지 않고 회사의 클라이언트 프로그램을 변경하거나, 회사의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분
            또는 전체를 임의로 변경하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게
            유포하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게
            유포하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 범죄와 결부된다고 객관적으로 판단되는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 본 약관을 포함하여 기타 회사가 정한 제반 규정 또는 이용 조건을 위반하는 행위&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 관계법령에 위배되는 행위&nbsp;</p>
        <p>(9)회원은 회사의 사전 서면 동의 없이 서비스를 이용하여 영리적인 목적의 영업행위를 하여서는 안됩니다. 이를 위반한 영업행의의 결과에 대하여 회사은 책임을 지지 않으며, 이와 같은 영업 행위의
            결과로 회사에 손해가 발생한 경우 회원은 회사에 대하여 손해배상의 의무를 집니다.&nbsp;</p>
        <p>(10)회사는 만 14세 미만의 회원에 대한 회원가입 신청을 받지 않습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><b><span style="font-size: 10pt;">제 4 장 서비스의 이용</span></b>&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 13 조 (서비스 이용 시간)&nbsp;</p>
        <p>(1)서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다. 단, 회사는 시스템 정기점검, 증설 및 교체를 위해 회사가 정한 날이나
            시간에 서비스를 일시중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시중단은 회사 웹을 통해 사전에 공지합니다.&nbsp;</p>
        <p>(2)회사는 긴급한 시스템 점검, 증설 및 교체 등 부득이한 사유로 인하여 예고없이 일시적으로 서비스를 중단할 수 있으며, 새로운 서비스로의 교체 등 회사가 적절하다고 판단하는 사유에 의하여 현재
            제공되는 서비스를 완전히 중단할 수 있습니다.&nbsp;</p>
        <p>(3)회사는 국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우, 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다. 다만 이
            경우 그 사유 및 기간 등을 회원에게 사전 또는 사후에 공지합니다.&nbsp;</p>
        <p>(4)회사는 회사가 통제할 수 없는 사유로 인한 서비스중단의 경우(시스템관리자의 고의,과실없는 디스크장애, 시스템다운 등)에 사전통지가 불가능하며 타인(PC통신회사, 기간통신사업자 등)의
            고의,과실로 인한 시스템중단 등의 경우에는 통지하지 않습니다.&nbsp;</p>
        <p>(5)회사는 서비스를 특정범위로 분할하여 각 범위별로 이용가능시간을 별도로 지정할 수 있습니다. 다만 이 경우 그 내용을 공지합니다.&nbsp;</p>
        <p>(6)회사은 서비스의 이용 제한을 하고자 하는 경우에는 그 사유, 일시 및 기간을 정하여 이용자의 전자우편 또는 전화 등의 방법에 의하여 해당 이용자에게 통지합니다. 다만, 회사이 긴급하게 이용을
            정지할 필요가 있다고 인정하는 경우에는 그러하지 아니할 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 14 조 (몰의 서비스 제공)&nbsp;</p>
        <p>(1)"몰"은 다음과 같은 업무를 수행합니다.&nbsp;</p>
        <p style="margin-left: 40px;">① 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결&nbsp;</p>
        <p style="margin-left: 40px;">② 구매계약이 체결된 재화 또는 용역의 배송&nbsp;</p>
        <p style="margin-left: 40px;">③ 기타 "몰"이 정하는 업무&nbsp;</p>
        <p>(2)'몰"은 재화의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화, 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화, 용역의 내용 및 제공일자를
            명시하여 현재의 재화, 용역의 내용을 게시한 곳에 그 제공일자 이전 7일부터 공지합니다.&nbsp;</p>
        <p>(3)"몰"이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화의 품절 또는 기술적 사양의 변경등의 사유로 변경할 경우에는 "몰"은 이로 인하여 이용자가 입은 손해를 배상합니다. 단,
            "몰"에 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 15 조 (이용자ID 관리)&nbsp;</p>
        <p>(1)이용자ID와 비밀번호에 관한 모든 관리책임은 회원에게 있습니다.&nbsp;</p>
        <p>(2)자신의 ID가 부정하게 사용된 경우, 회원은 반드시 그 사실을 회사에 전화 또는 전자우편으로 통보해야 합니다.&nbsp;</p>
        <p>(3)회사는 이용자 ID에 의하여 제반 이용자 관리업무를 수행 하므로 회원이 이용자 ID를 변경하고자 하는 경우 회사가 인정할 만한 사유가 없는 한 이용자 ID의 변경을 제한할 수 있습니다.&nbsp;</p>
        <p>(4)이용고객이 등록한 이용자 ID 및 비밀번호에 의하여 발생되는 사용상의 과실 또는 제 3자에 의한 부정사용 등에 대한 모든 책임은 해당 이용고객에게 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 16 조 (게시물의 관리)&nbsp;</p>
        <p>회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">* 다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 불법복제 또는 해킹을 조장하는 내용인 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 영리를 목적으로 하는 광고일 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 범죄와 결부된다고 객관적으로 인정되는 내용일 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 회사에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 관계법령에 위배된다고 판단되는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 저작권에 문제의 소지가 있는 자료의 경우&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 17 조 (게시물에 대한 저작권)&nbsp;</p>
        <p>(1)회원이 서비스 화면 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 회사는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지
            아니하며, 또한 서비스내의 게재권을 갖습니다.&nbsp;</p>
        <p>(2)회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.&nbsp;</p>
        <p>(3)회사는 회원이 게시하거나 등록하는 서비스 내의 내용물, 게시 내용에 대해 제 15조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수
            있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 18 조 (정보 및 광고의 제공)&nbsp;</p>
        <p>(1)회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신우편 등의 방법으로 회원에게 제공할 수 있습니다.&nbsp;</p>
        <p>(2)회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인 정보를 요구할 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><span style="font-size: 10pt;"><b>제 5 장 계약 해지 및 이용 제한&nbsp;</b></span></p>
        <p>&nbsp;</p>
        <p>제 19 조 (계약 변경 및 해지)&nbsp;</p>
        <p>(1)회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 회사 웹 내의 [고객센터] 메뉴를 이용해 가입해지를 해야 합니다.&nbsp;</p>
        <p>(2)회원이 다음 각호의 사유에 해당하는 경우, "몰"은 회원 자격을 제한 및 정지시킬 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 가입 신청시에 허위 내용을 등록한 경우&nbsp;</p>
        <p style="margin-left: 40px;">2. "몰"을 이용하여 구입한 재화·용역 등의 대금, 기타 "몰"이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우&nbsp;</p>
        <p style="margin-left: 40px;">3. 다른 사람의 "몰" 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">4. "몰"을 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우&nbsp;</p>
        <p>(3)"몰"이 회원자격을 제한, 정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우, "몰"은 회원 자격을 상실 시킬 수
            있습니다.&nbsp;</p>
        <p>(4)"몰"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 소명할 기회를 부여합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><b><span style="font-size: 10pt;">제 6 장 구매 및 대금결제, 배송,취소, 환불&nbsp;</span></b></p>
        <p>&nbsp;</p>
        <p>제 20 조 (구매신청)&nbsp;</p>
        <p>"몰"이용자는 "몰"상에서 이하의 방법에 의하여 구매를 신청합니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 성명, 주소, 전화번호 입력&nbsp;</p>
        <p style="margin-left: 40px;">2. 재화 또는 용역의 선택&nbsp;</p>
        <p style="margin-left: 40px;">3. 결제방법의 선택&nbsp;</p>
        <p style="margin-left: 40px;">4. 이 약관에 동의한다는 표시(예, 마우스 클릭)&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 21 조 (계약의 성립)&nbsp;</p>
        <p>①"몰"은 제9조와 같은 구매신청에 대하여 다음 각호에 해당하지 않는 한 승낙합니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 신청 내용에 허위, 기재누락, 오기가 있는 경우&nbsp;</p>
        <p style="margin-left: 40px;">2. 미성년자가 담배, 주류등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우&nbsp;</p>
        <p style="margin-left: 40px;">3. 기타 구매신청에 승낙하는 것이 "몰" 기술상 현저히 지장이 있다고 판단하는 경우&nbsp;</p>
        <p>②"몰"의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 22 조(지급방법)&nbsp;</p>
        <p>"몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의 하나로 할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 계좌이체&nbsp;</p>
        <p style="margin-left: 40px;">2. 신용카드결제&nbsp;</p>
        <p style="margin-left: 40px;">3. 온라인무통장입금&nbsp;</p>
        <p style="margin-left: 40px;">4. ARS에 의한 결제&nbsp;</p>
        <p style="margin-left: 40px;">5. 마일리지에 의한 결제&nbsp;</p>
        <p style="margin-left: 40px;">6. 기타 방법에 의한 대금지급 등&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 23 조(수신확인통지·구매신청 변경 및 취소)&nbsp;</p>
        <p>①"몰"은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.&nbsp;</p>
        <p>②수신확인통지를 받은 이용자는 의사표시의 불일치등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있습니다.&nbsp;</p>
        <p>③"몰"은 배송전 이용자의 구매신청 변경 및 취소 요청이 있는 때에는 지체없이 그 요청에 따라 처리합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 24 조(배송)&nbsp;</p>
        <p>"몰"은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 "몰"의 고의·과실로 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를
            배상합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 25 조(환급, 반품 및 교환)&nbsp;</p>
        <p>①"몰"은 이용자가 구매신청한 재화 또는 용역이 품절등의 사유로 재화의 인도 또는 용역의 제공을 할 수 없을 때에는 지체없이 그 사유를 이용자에게 통지하고, 사전에 재화 또는 용역의 대금을 받은
            경우에는 대금을 받은 날부터 3일이내에, 그렇지 않은 경우에는 그 사유발생일로부터 3일이내에 계약해제 및 환급절차를 취합니다.&nbsp;</p>
        <p>②다음 각호의 경우에는 "몰"은 배송된 재화일지라도 재화를 반품받은 다음 영업일 이내에 이용자의 요구에 따라 즉시 환급, 반품 및 교환 조치를 합니다. 다만 그 요구기한은 배송된 날로부터 20일
            이내로 합니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 배송된 재화가 주문내용과 상이하거나 "몰"이 제공한 정보와 상이할 경우&nbsp;</p>
        <p style="margin-left: 40px;">2. 배송된 재화가 파손, 손상되었거나 오염되었을 경우&nbsp;</p>
        <p style="margin-left: 40px;">3. 재화가 광고에 표시된 배송기간보다 늦게 배송된 경우&nbsp;</p>
        <p style="margin-left: 40px;">4. 방문판매등에관한법률 제18조에 의하여 광고에 표시하여야 할 사항을 표시하지 아니한 상태에서 이용자의 청약이 이루어진 경우&nbsp;</p>
        <p>③회사의 책임있는 사유로 과오금이 발생한 경우 회사는 계약비용, 수수료 등에 관계없이 과오금 전액을 환급합니다. 다만, 이용자의 책임 있는 사유로 과오금이 발생한 경우, 과오금의 환급에 소요되는
            비용은 합리적인 범위 내에서 이용자가 부담합니다.&nbsp;</p>
        <p>④회사와 컨텐츠 이용 계약을 체결한 이용자는 다음 각 호에서 정한 기간 내에 청약을 철회할 수 있습니다. 다만, 회사가 이 보다 더 장기의 기간을 이용자에게 부여한 경우에 이용자는 그 기간 내에
            청약을 철회할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 계약서를 받은 날로부터 7일. 다만, 계약서를 받은 때보다 컨텐츠의 공급이 늦게 이루어진 경우에는 컨텐츠를 공급받거나 컨텐츠의 공급이 시작된
            날로부터 7일 (단, 컨텐츠 이용을 하지 않은 경우에 한하며, 이용을 한 경우 과정별 환불규정을 적용함)&nbsp;</p>
        <p style="margin-left: 40px;">2. 계약서가 이용자에게 교부되지 않은 경우, 회사의 주소 등이 기재되지 않은 계약서를 교부 받은 경우 또는 회사의 주소 변경 등의 사유로 제
            1호의 기간 내에 청약철회를 할 수 없는 경우에는 그 주소를 안 날 또는 알 수 있었던 날로부터 7일&nbsp;</p>
        <p>⑤이용자는 다음 각 호의 어느 하나에 해당하는 사유가 있을 때에는 당해 컨텐츠를 이용할 수 있는 날로부터 3월 이내 또는 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 컨텐츠 이용
            계약에 대한 청약을 철회할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">1. 표시, 광고된 내용과 다른 컨텐츠가 제공된 경우&nbsp;</p>
        <p style="margin-left: 40px;">2. 계약내용과 다르게 이행된 경우&nbsp;</p>
        <p>⑥회사는 컨텐츠를 반환 받은 날로부터 3영업일 이내에 대금의 결제와 동일한 방법으로 대금을 환급하며, 동일한 방법으로 환급이 불가능할 때에는 이용자가 원하는 방법으로 환급합니다. 다만, 다운로드한
            온라인 컨텐츠 또는 스트리밍 방식의 온라인 컨텐츠의 경우 회사는 이용자의 청약철회의 의사표시를 받은 날로부터 3영업일 이내에 대금을 환급합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 26 조 (서비스 이용제한)&nbsp;</p>
        <p>(1)회사는 회원이 서비스 이용내용에 있어서 본 약관 제 11조 내용을 위반하거나, 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.&nbsp;</p>
        <p style="margin-left: 40px;">* 미풍양속을 저해하는 비속한 ID 및 별명 사용&nbsp;</p>
        <p style="margin-left: 40px;">* 타 이용자에게 심한 모욕을 주거나, 서비스 이용을 방해한 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 기타 정상적인 서비스 운영에 방해가 될 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 정보통신 윤리위원회 등 관련 공공기관의 시정 요구가 있는 경우&nbsp;</p>
        <p style="margin-left: 40px;">* 6개월 이상 서비스를 이용한 적이 없는 경우&nbsp;</p>
        <p>(2)상기 이용제한 규정에 따라 서비스를 이용하는 회원에게 서비스 이용에 대하여 별도 공지 없이 서비스 이용의 일시정지, 초기화, 이용계약 해지 등을 불량이용자 처리규정에 따라 취할 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p><b><span style="font-size: 10pt;">제 7 장 손해배상 및 기타사항&nbsp;</span></b></p>
        <p>&nbsp;</p>
        <p>제 27 조 (손해배상)&nbsp;</p>
        <p>(1)회사는 서비스에서 무료로 제공하는 서비스의 이용과 관련하여 개인정보보호정책에서 정하는 내용에 해당하지 않는 사항에 대하여는 어떠한 손해도 책임을 지지 않습니다.&nbsp;</p>
        <p>(2)회사는 컨텐츠의 하자, 이용중지 또는 장애 등에 의하여 발생한 이용자의 손해에 대하여 자사 환불/취소 규정에 따라 처리합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 28 조 (면책조항)&nbsp;</p>
        <p>(1)회사는 천재지변, 전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.&nbsp;</p>
        <p>(2)회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.&nbsp;</p>
        <p>(3)회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.&nbsp;</p>
        <p>(4)회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.&nbsp;</p>
        <p>(5)회사는 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우, 또는 회원이 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다.&nbsp;</p>
        <p>(6)회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.&nbsp;</p>
        <p>(7)회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다. 또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을
            지지 않습니다.&nbsp;</p>
        <p>(8)회사는 회원이 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 지지 않습니다.&nbsp;</p>
        <p>(9)회사는 이용자 상호간 및 이용자와 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.&nbsp;</p>
        <p>(10)회사에서 회원에게 무료로 제공하는 서비스의 이용과 관련해서는 어떠한 손해도 책임을 지지 않습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 29 조(분쟁해결)&nbsp;</p>
        <p>(1)"몰"은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.&nbsp;</p>
        <p>(2)"몰"은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해
            드립니다.&nbsp;</p>
        <p>(3)"몰"과 이용자간에 발생한 분쟁은 전자거래기본법 제28조 및 동 시행령 제15조에 의하여 설치된 전자거래분쟁조정위원회의 조정에 따를 수 있습니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>제 30 조 (재판권 및 준거법)&nbsp;</p>
        <p>(1)이 약관에 명시되지 않은 사항은 전기통신사업법 등 관계법령과 상관습에 따릅니다.&nbsp;</p>
        <p>(2)회사의 정액 서비스 회원 및 기타 유료 서비스 이용 회원의 경우 회사가 별도로 정한 약관 및 정책에 따릅니다.&nbsp;</p>
        <p>(3)서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.&nbsp;</p>
        <p>&nbsp;</p>
        <p>부칙&nbsp;</p>
        <p>(1) 본 약관은 2018년 3월 2일부터 적용됩니다.&nbsp;&nbsp;</p>
        <p>&nbsp;&nbsp;</p>
        <p>시행일자 : 2018년 3월 2일&nbsp;</p></div>
</div>
<div class="agreeArea">
    <input type="checkbox" name="agreeUse" id="agreeUse"/>
    <label for="agreeUse">이용약관에 동의합니다.</label>
</div>

<div class="private">
    <h1>개인정보취급방침</h1>
    <div><p style="margin: 0cm 0cm 0cm 0px; background: white;"><span style="font-family: " 맑은="" 고딕";="" font-size:=""
            10pt;"=""></span><span 맑은="" 고딕";="" font-size:="" 10pt;"="">모두의러닝</span><span lang="EN-US" 맑은="" 고딕";=""
            font-size:="" 10pt;"="">(</span><span 맑은="" 고딕";="" font-size:="" 10pt;"="">이하</span><span lang="EN-US"
                                                                                                       맑은="" 고딕";=""
            font-size:="" 10pt;"="">&nbsp;“</span><span 맑은="" 고딕";="" font-size:="" 10pt;"="">회사</span><span
                    lang="EN-US" 맑은="" 고딕";="" font-size:="" 10pt;"="">”)</span><span 맑은="" 고딕";="" font-size:=""
            10pt;"="">에서는 사업주 환급훈련 실시를 위한 행정 처리와 온라인 교육 진행 및 교육의 질 관리 등 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다</span>
        </p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;="" mso-bidi-font-family:arial"=""
            style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">1.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">수집하는 개인정보 항목</span></b><b><span lang="EN-US" 맑은="" 고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">“</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">회사<span lang="EN-US">”</span>는 회원가입<span
                    lang="EN-US">,&nbsp;</span>상담<span lang="EN-US">,&nbsp;</span>수강신청<span lang="EN-US">,&nbsp;</span>환급업무
            등을 위해 아래와 같은 개인정보를 수집합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">기본 수집항목<span lang="EN-US">:&nbsp;</span>성명<span lang="EN-US">,&nbsp;</span>아이디<span
                    lang="EN-US">,&nbsp;</span>비밀번호<span lang="EN-US">,&nbsp;</span>휴대전화번호<span
                    lang="EN-US">,&nbsp;</span>이메일<span lang="EN-US">,&nbsp;</span>직업<span lang="EN-US">,&nbsp;</span>부서<span
                    lang="EN-US">,&nbsp;</span>직책 등의 교육 제반 정보<span lang="EN-US">,&nbsp;</span>소속회사의 정보<span
                    lang="EN-US">(</span>사업자등록번호<span lang="EN-US">,&nbsp;</span>대표자명<span lang="EN-US">,&nbsp;</span>주소<span
                    lang="EN-US">,&nbsp;</span>전화번호<span lang="EN-US">,&nbsp;</span>업종<span lang="EN-US">)</span></span>
            <span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">자동 수집항목<span lang="EN-US">:&nbsp;</span>접속내역<span
                    lang="EN-US">,&nbsp;</span>수강기록<span lang="EN-US">,&nbsp;</span>쿠키<span lang="EN-US">,&nbsp;</span>접속<span
                    lang="EN-US">IP,&nbsp;</span>평가기록<span lang="EN-US">,&nbsp;</span>평가결과 등</span><span lang="EN-US"
                                                                                                         맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">결제관련 수집항목<span lang="EN-US">:&nbsp;</span>납부자명<span lang="EN-US">,&nbsp;</span>생년월일<span
                    lang="EN-US">,&nbsp;</span>사업자등록번호<span lang="EN-US">,&nbsp;</span>연락처<span lang="EN-US">, (</span>카드결제
            시<span lang="EN-US">)</span>카드번호<span lang="EN-US">/</span>유효기간<span lang="EN-US">, (</span>계좌이체 시<span
                    lang="EN-US">)</span>은행 명<span lang="EN-US">/</span>계좌번호<span lang="EN-US">/</span>예금주 명</span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">라)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">환급관련 수집항목<span lang="EN-US">:&nbsp;</span>성명<span lang="EN-US">,&nbsp;</span>주민등록번호<span
                    lang="EN-US">,&nbsp;</span>휴대전화번호<span lang="EN-US">,&nbsp;</span>소속회사의 정보<span
                    lang="EN-US">(</span>사업자등록번호<span lang="EN-US">,&nbsp;</span>사업장 관리 번호<span
                    lang="EN-US">,&nbsp;</span>은행 명<span lang="EN-US">,&nbsp;</span>계좌번호<span
                    lang="EN-US">,&nbsp;</span>예금주 명<span lang="EN-US">)</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;="" mso-bidi-font-family:arial"=""
            style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">2.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보의 수집 및 이용목적</span></b><b><span lang="EN-US" 맑은=""
                                                                                                    고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">“</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">회사<span lang="EN-US">”</span>는 수집한 개인정보를 다음의
            목적을 위해 활용합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산<span lang="EN-US">:&nbsp;</span>콘텐츠 제공<span
                    lang="EN-US">,&nbsp;</span>구매 및 요금 결제<span lang="EN-US">,&nbsp;</span>물품 배송 또는 청구지 등 발송</span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">회원관리<span lang="EN-US">:&nbsp;</span>회원제 서비스 이용에 따른 본인확인<span
                    lang="EN-US">,&nbsp;</span>개인식별<span lang="EN-US">,&nbsp;</span>가입의사확인<span
                    lang="EN-US">,&nbsp;</span>불만처리 등 민원처리<span lang="EN-US">,&nbsp;</span>고지사항 전달<span lang="EN-US">,&nbsp;</span>학습독려를
            위한 알림<span lang="EN-US">,&nbsp;</span>메시지<span lang="EN-US">(SMS/</span>카카오 알림 톡<span
                    lang="EN-US">)&nbsp;</span>발송 및 유선</span><span lang="EN-US" 맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">고용보험 환급<span lang="EN-US">:&nbsp;</span>고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출
            용도</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">라)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">산업안전보건법 제<span lang="EN-US">32</span>조의<span lang="EN-US">&nbsp;2(</span>등록기관의
            평가<span lang="EN-US">)</span>에 따른 교육기관 평가</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">마)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">그 외<span lang="EN-US">,&nbsp;</span>서비스 이용과정에서<span lang="EN-US">&nbsp;IP Adress /&nbsp;</span>쿠키<span
                    lang="EN-US">&nbsp;/&nbsp;</span>방문 일시<span lang="EN-US">&nbsp;/&nbsp;</span>결제기록<span lang="EN-US">&nbsp;/&nbsp;</span>서비스이용기록이
            자동으로 수집</span><span lang="EN-US" 맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 54pt; text-indent: -18pt; background: white;"><span 맑은="" 고딕";"=""
            style="font-size: 10pt;"><span style="font-size: 13.3333px; text-indent: -26.6667px;">바)&nbsp; &nbsp;마케팅 및 광고에 활용 : 이벤트 등 광고성 정보 전달</span>&nbsp;</span>
        </p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;="" mso-bidi-font-family:arial"=""
            style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">3.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보의 보유 및 이용기간<span lang="EN-US">&nbsp;</span></span>
            </b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
                mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">“</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">회사<span lang="EN-US">”</span>는 개인정보 수집 및 이용목적이
            달성된 후에는 해당 정보를 지체 없이 파기합니다<span lang="EN-US">.&nbsp;</span>단<span lang="EN-US">,&nbsp;</span>다음의 정보에 대해서는
            아래의 이유로 명시한 기간 동안 보존합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">웹사이트 접속 및 이용 기록<span lang="EN-US">: 6</span>개월<span lang="EN-US">&nbsp;(</span>통신비밀보호법<span
                    lang="EN-US">)</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">계약 또는 청약철회 등에 관한 기록<span lang="EN-US">: 5</span>년<span lang="EN-US">&nbsp;(</span>전자상거래
            등에서의 소비자보호에 관한 법률<span lang="EN-US">)</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">대금결제 및 재화 등의 공급에 관한 기록<span lang="EN-US">: 5</span>년<span
                    lang="EN-US">&nbsp;(</span>전자상거래 등에서의 소비자보호에 관한 법률<span lang="EN-US">)</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">라)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">소비자의 불만 또는 분쟁처리에 관한 기록<span lang="EN-US">: 3</span>년<span
                    lang="EN-US">&nbsp;(</span>전자상거래 등에서의 소비자보호에 관한 법률<span lang="EN-US">)</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">마)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">고용보험 환급 대상 주민등록번호<span lang="EN-US">:&nbsp;</span>비용지원 종료 후<span lang="EN-US">&nbsp;3</span>년<span
                    lang="EN-US">&nbsp;(</span>근로자직업능력 개발법<span lang="EN-US">)&nbsp;</span></span></p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;="" mso-bidi-font-family:arial"=""
            style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">4.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 자동 수집 장치의 설치<span lang="EN-US">/</span>운영 및 거부에 관한
                사항</span></b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"=""
                style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">“</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">회사<span lang="EN-US">”</span>는 이용자들에게 특화된
            맞춤서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는<span lang="EN-US">&nbsp;'</span>쿠키<span
                    lang="EN-US">(cookie)'</span>를 사용합니다<span lang="EN-US">.&nbsp;</span>쿠키는 웹사이트를 운영하는데 이용되는 서버<span
                    lang="EN-US">(HTTP)</span>가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의<span
                    lang="EN-US">&nbsp;PC&nbsp;</span>컴퓨터 내의 하드디스크에 저장되기도 합니다<span lang="EN-US">.</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">쿠키의 사용 목적<span lang="EN-US">:&nbsp;</span>이용자들이 방문한<span
                    lang="EN-US">&nbsp;“</span>회사<span lang="EN-US">”</span>의 각 서비스와 웹 사이트들에 대한 방문 및 이용형태<span
                    lang="EN-US">,&nbsp;</span>보안접속 여부<span lang="EN-US">,&nbsp;</span>이용자 규모 등을 파악하여 이용자에게 최적화된 정보 제공을
            위하여 사용합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">쿠키의 설치<span lang="EN-US">/</span>운영 및 거부<span lang="EN-US">:&nbsp;</span>이용자는 쿠키
            설치에 대한 선택권을 가지고 있습니다<span lang="EN-US">.&nbsp;</span>따라서<span lang="EN-US">,&nbsp;</span>이용자는 웹 브라우저에서 옵션을
            설정함으로써 모든 쿠키를 허용하거나<span lang="EN-US">,&nbsp;</span>쿠키가 저장될 때마다 확인을 거치거나<span lang="EN-US">,&nbsp;</span>아니면
            모든 쿠키의 저장을 거부할 수도 있습니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을
            거치거나<span lang="EN-US">,&nbsp;</span>모든 쿠키의 저장을 거부할 수 있습니다<span lang="EN-US">.</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">*</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">설정방법 예<span lang="EN-US">(</span>인터넷 익스플로어의
            경우<span lang="EN-US">):&nbsp;</span>웹 브라우저 상단의 도구&nbsp;<span lang="EN-US">&gt;&nbsp;</span>인터넷 옵션<span
                    lang="EN-US">&gt;&nbsp;</span>개인정보</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">다만<span
                    lang="EN-US">,&nbsp;</span>쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용에 어려움이 있을 수 있습니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast;mso-bidi-font-family:arial"="" style="font-size: 10pt;">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">5.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 제<span lang="EN-US">3</span>자 제공 안내</span>
            </b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
                minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">“</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">회사<span lang="EN-US">”</span>는 이용자의 개인정보를 원칙적으로
            외부에 제공하지 않습니다<span lang="EN-US">.&nbsp;</span>다만<span lang="EN-US">,&nbsp;</span>아래의 경우에는 예외로 합니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">이용자들이 사전에 동의한 경우</span><span lang="EN-US" 맑은="" 고딕";=""
            mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">법령의 규정에 의거하거나<span lang="EN-US">,&nbsp;</span>수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가
            있는 경우</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">서비스의 제공 및 법령에 정해진 책임의 준수를 위하여 회사가 보관하고 있는 개인정보가 제<span lang="EN-US">3</span>자에게 수집
            목적 범위 내에서 아래와 같이 제공될 수 있습니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <table class="MsoNormalTable __se_tbl_ext" border="1" cellspacing="0" cellpadding="0" width="674"
               style="margin-left: 26.7pt; border-collapse: collapse; border: none;">
            <tbody>
            <tr style="height: 11.8pt;">
                <td width="166"
                    style="width: 124.55pt; border: 1pt solid windowtext; padding: 0cm 5.4pt; height: 11.8pt;"><p
                            class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은=""
                            고딕";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"=""><b>제공목적<span lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 11.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>제공받는
                        자<span lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 11.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>제공정보<span
                                lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 11.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>보유 및 이용기간<span
                                lang="EN-US"><o:p></o:p></span></b></p></td>
            </tr>
            <tr style="height: 30pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 30pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">직업능력개발훈련
                    원격훈련모니터링<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                        style="margin: 0cm; font-size: 10pt; font-family: "
                                                                        맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"=""><span lang="EN-US">(</span>문자발송 등<span
                            lang="EN-US">)<o:p></o:p></span></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 30pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"="">한국산업인력공단<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 30pt;">
                    <p class="MsoNormal" align="center"
                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: " 맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>주민번호<span lang="EN-US">,&nbsp;</span>회사<span
                            lang="EN-US">,&nbsp;</span>연락처<span lang="EN-US">,&nbsp;</span>이메일<span
                            lang="EN-US">,&nbsp;</span>수강정보 등<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 30pt;">
                    <p class="MsoNormal" align="center"
                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: " 맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">수집 후<span
                            lang="EN-US">&nbsp;3</span>년<span lang="EN-US">,<o:p></o:p></span></p><p class="MsoNormal"
                                                                                                     style="margin: 0cm; text-align: justify; font-size: 10pt; font-family: "
                                                                                                     맑은="" 고딕";=""
                    line-height:="" normal;="" word-break:="" keep-all;"="">자료분석 후&nbsp;<span
                            lang="EN-US">5</span>년<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 25.4pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 25.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">교육기관 평가를 위한
                    만족도조사<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                     style="margin: 0cm; font-size: 10pt; font-family: "
                                                                     맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"="">등에 활용<span lang="EN-US"><o:p></o:p></span></p>
                </td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 25.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"="">한국산업안전보건공단<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 25.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>교육수료기관<span lang="EN-US">,&nbsp;</span>생년월일<span lang="EN-US">,&nbsp;</span>소속회사
                    정보<span lang="EN-US">(</span>지역<span lang="EN-US">/</span>업종<span lang="EN-US">/</span>직위<span
                            lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                  style="margin: 0cm; font-size: 10pt; font-family: "
                                                                  맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"=""><span lang="EN-US">/</span>이메일<span
                            lang="EN-US">/</span>전화번호<span lang="EN-US">(</span>휴대폰<span lang="EN-US">/</span>사무실<span
                            lang="EN-US">))<o:p></o:p></span></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 25.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">만족도 조사 및 결과
                    처리 즉시 폐기<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 36pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 36pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">계좌자동이체<span
                            lang="EN-US"><o:p></o:p></span></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><span
                            lang="EN-US">Toss</span>페이먼츠<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">거래정보<span
                            lang="EN-US">,&nbsp;</span>예금주<span lang="EN-US">,<o:p></o:p></span></p><p class="MsoNormal"
                                                                                                       align="center"
                                                                                                       style="margin: 0cm; font-size: 10pt; font-family: "
                                                                                                       맑은="" 고딕";=""
                    text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">계좌정보<span
                            lang="EN-US">,&nbsp;</span>생년월일<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">거래금액에
                    따라<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                  style="margin: 0cm; font-size: 10pt; font-family: "
                                                                  맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"=""><span lang="EN-US">1</span>년 또는<span
                            lang="EN-US">&nbsp;5</span>년<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 29.8pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 29.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"="">신용카드자동결제<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 29.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><span
                            lang="EN-US">Toss</span>페이먼츠<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 29.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">거래정보<span
                            lang="EN-US">,&nbsp;</span>카드번호<span lang="EN-US">,<o:p></o:p></span></p><p
                            class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은=""
                            고딕";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"="">유효기간<span lang="EN-US">,&nbsp;</span>생년월일<span lang="EN-US"><o:p></o:p></span></p>
                </td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 29.8pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">거래금액에
                    따라<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                  style="margin: 0cm; font-size: 10pt; font-family: "
                                                                  맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"=""><span lang="EN-US">1</span>년 또는<span
                            lang="EN-US">&nbsp;5</span>년<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 44.95pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 44.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">교육수강 안내 및 독려
                    알림톡<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 44.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">카카오<span
                            lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 44.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>주민번호<span lang="EN-US">,&nbsp;</span>회사<span
                            lang="EN-US">,&nbsp;</span>연락처<span lang="EN-US">,&nbsp;</span>이메일<span
                            lang="EN-US">,&nbsp;</span>수강정보 등<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 44.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">거래금액에
                    따라<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                  style="margin: 0cm; font-size: 10pt; font-family: "
                                                                  맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"=""><span lang="EN-US">1</span>년 또는<span
                            lang="EN-US">&nbsp;5</span>년<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 36.05pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 36.05pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">실명확인<span
                            lang="EN-US">,<o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                   style="margin: 0cm; font-size: 10pt; font-family: "
                                                                   맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"="">본인인증<span lang="EN-US"><o:p></o:p></span></p>
                </td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.05pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><span
                            lang="EN-US">NICE</span>평가정보㈜<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.05pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>주민등록번호<span lang="EN-US">,&nbsp;</span>휴대폰번호<span lang="EN-US"><o:p></o:p></span></p>
                </td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 36.05pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">별도의 개인정보 제공
                    동의<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            <tr style="height: 13.4pt;">
                <td width="166"
                    style="width: 124.55pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 13.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"="">직업능력개발훈련<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                                      style="margin: 0cm; font-size: 10pt; font-family: "
                                                                                      맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">원격훈련영상수강 및 수료증 제공<span
                            lang="EN-US"><o:p></o:p></span></p></td>
                <td width="141"
                    style="width: 105.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 13.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">㈜모두의러닝</p>
                </td>
                <td width="221"
                    style="width: 165.45pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 13.4pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>주민번호<span lang="EN-US">,&nbsp;</span>회사<span
                            lang="EN-US">,&nbsp;</span>연락처<span lang="EN-US">,&nbsp;</span>이메일<span
                            lang="EN-US">,&nbsp;</span>수강정보 등<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="147"
                    style="width: 110.25pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 13.4pt;">
                    <p class="MsoNormal" align="center"
                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: " 맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">수집 후<span
                            lang="EN-US">&nbsp;3</span>년<span lang="EN-US">,<o:p></o:p></span></p><p class="MsoNormal"
                                                                                                     align="center"
                                                                                                     style="margin: 0cm; font-size: 10pt; font-family: "
                                                                                                     맑은="" 고딕";=""
                    text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">자료분석 후<span
                            lang="EN-US">&nbsp;5</span>년<span lang="EN-US"><o:p></o:p></span></p></td>
            </tr>
            </tbody>
        </table>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">6.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">수집한 개인정보의 위탁</span></b><b><span lang="EN-US" 맑은="" 고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">“회사”는 다음과
            같이 개인정보 처리업무를 위탁하고 있습니다<span lang="EN-US">.&nbsp;</span>향후 수탁업체 및 위탁하는 업무의 내용이 변경될 경우 지체 없이 본 방침을 통해 고지하겠습니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <table class="MsoNormalTable __se_tbl_ext" border="1" cellspacing="0" cellpadding="0"
               style="margin-left: 28.1pt; border-collapse: collapse; border: none;">
            <tbody>
            <tr style="height: 10.95pt;">
                <td width="149"
                    style="width: 111.7pt; border: 1pt solid windowtext; padding: 0cm 5.4pt; height: 10.95pt;"><p
                            class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은=""
                            고딕";="" text-align:="" center;="" line-height:="" normal;="" word-break:=""
                    keep-all;"=""><b>위탁정보의 이용 목적<span lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="123"
                    style="width: 92pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 10.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>위탁대상<span
                                lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="201"
                    style="width: 151.1pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 10.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>위탁정보<span
                                lang="EN-US"><o:p></o:p></span></b></p></td>
                <td width="138"
                    style="width: 103.75pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 10.95pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"=""><b>보유 및 이용기간<span
                                lang="EN-US"><o:p></o:p></span></b></p></td>
            </tr>
            <tr style="height: 12.7pt;">
                <td width="149"
                    style="width: 111.7pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt; height: 12.7pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">고객상담 및<span
                            lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal" align="center"
                                                                  style="margin: 0cm; font-size: 10pt; font-family: "
                                                                  맑은="" 고딕";="" text-align:="" center;=""
                    line-height:="" normal;="" word-break:="" keep-all;"="">각종 서비스관련 안내<span lang="EN-US">, Sales TM, 마케팅 및 광고<o:p></o:p></span></p>
                </td>
                <td width="123"
                    style="width: 92pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 12.7pt;">
                    <p class="MsoNormal" align="center" style="margin: 0cm; font-size: 10pt; font-family: " 맑은="" 고딕
                    ";="" text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">㈜엘케이에스씨<span
                            lang="EN-US"><o:p></o:p></span></p></td>
                <td width="201"
                    style="width: 151.1pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 12.7pt;">
                    <p class="MsoNormal" align="center"
                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: " 맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">성명<span
                            lang="EN-US">,&nbsp;</span>주민번호<span lang="EN-US">,&nbsp;</span>아이디<span lang="EN-US">,&nbsp;</span>회사<span
                            lang="EN-US">,&nbsp;</span>연락처<span lang="EN-US">,&nbsp;</span>이메일<span
                            lang="EN-US">,&nbsp;</span>수강정보<span lang="EN-US"><o:p></o:p></span></p><p class="MsoNormal"
                                                                                                       align="center"
                                                                                                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: "
                                                                                                       맑은="" 고딕";=""
                    text-align:="" center;="" line-height:="" normal;="" word-break:="" keep-all;"="">그 외 고객 상담을 위한
                    정보<span lang="EN-US"><o:p></o:p></span></p></td>
                <td width="138"
                    style="width: 103.75pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt; height: 12.7pt;">
                    <p class="MsoNormal" align="center"
                       style="margin: 0cm 0cm 0cm 1.7pt; font-size: 10pt; font-family: " 맑은="" 고딕";="" text-align:=""
                    center;="" line-height:="" normal;="" word-break:="" keep-all;"="">위탁계약 종료 시 까지<span lang="EN-US"><o:p></o:p></span></p>
                </td>
            </tr>
            </tbody>
        </table>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">“회사”는
            수탁업체와의 위탁계약 체결 시 관련 법령에 따라 위탁업무 수행목적 외 개인정보 처리금지<span lang="EN-US">,&nbsp;</span>기술적•관리적•물리적 보호조치<span
                    lang="EN-US">,&nbsp;</span>위탁업무의 목적 및 범위<span lang="EN-US">,&nbsp;</span>재 위탁 제한<span lang="EN-US">,&nbsp;</span>개인정보에
            대한 접근제한 등 안전성 확보 조치에 관한 사항<span lang="EN-US">,&nbsp;</span>위탁업무와 관련하여 보유하고 있는 개인정보의 관리 현황 점검 등 감독에 관한
            사항<span lang="EN-US">,&nbsp;</span>수탁자가 준수하여야 할 의무를 위반한 경우의 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고<span
                    lang="EN-US">,&nbsp;</span>수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다<span lang="EN-US">.</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">&nbsp;</span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">7.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보의 파기절차 및 방법</span></b><b><span lang="EN-US" 맑은=""
                                                                                                    고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">“회사”는
            원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은=""
                                                                                                    고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">파기절차<span lang="EN-US">:&nbsp;</span>“회사”는 고객님께서 제공하신 모든 정보를 고객님께서 서비스를 제공받으시는 동안
            보유하며 서비스 제공을 위해서만 이용하게 됩니다<span lang="EN-US">.&nbsp;</span>또한<span lang="EN-US">,&nbsp;</span>고객님께서 회원탈퇴를
            요청한 경우 고객님의 개인정보는 재생 불가능한 방법으로 저장장치에서 완전히 삭제되며<span lang="EN-US">,&nbsp;</span>어떠한 방법으로도 열람 또는 이용할 수 없도록
            처리됩니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">파기방법<span lang="EN-US">:&nbsp;</span>전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
            삭제합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p class="MsoNormal" align="left" style="margin-left: 38pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">8.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">이용자 및 법정대리인의 권리와 그 행사방법</span></b><b><span lang="EN-US"
                                                                                                            맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">가)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입 해지를 요청할 수도 있습니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">나)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">이용자들의 개인정보 조회<span lang="EN-US">,&nbsp;</span>수정을 위해서는 ‘개인정보변경’<span
                    lang="EN-US">(</span>또는 ‘회원정보수정’ 등<span lang="EN-US">)</span>을 가입 해지<span
                    lang="EN-US">(</span>동의철회<span lang="EN-US">)</span>를 위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를 거치신 후 직접 열람<span
                    lang="EN-US">,&nbsp;</span>정정 또는 탈퇴가 가능합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은=""
                                                                                                      고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
            mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">다)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">고객님은 언제든지 등록되어 있는 고객님의 개인정보를 열람하거나 정정하실 수 있으며 회원탈퇴를 요청하실 수 있습니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">라)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">고객님의 개인 정보의 열람 및 정정은 모두의러닝 홈페이지의<span lang="EN-US">&nbsp;[</span>회원정보수정<span
                    lang="EN-US">]</span>메뉴에서 하실 수 있으며<span lang="EN-US">,&nbsp;</span>회원 탈퇴는 고객님의 성함과 아이디<span
                    lang="EN-US">,&nbsp;</span>주민등록번호를 이메일&nbsp;<span lang="EN-US">(<a
                        href="mailto:modulearning@modulearning.kr"><span
                            style="color: black; text-decoration-line: none;">modulearning@modulearning.kr</span></a>)</span>이나
            고객센터<span lang="EN-US">(02-1544-9335)</span>으로 통보해 주시면 처리됩니다<span lang="EN-US">.</span></span><span
                    lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 58pt; text-indent: -20pt; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">마)<span
                    times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal;
            font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span><span 맑은="" 고딕";"=""
            style="font-size: 10pt;">회원탈퇴 후<span lang="EN-US">,&nbsp;</span>고객님의 개인정보는 모두의러닝에서 완전히 삭제됩니다<span
                    lang="EN-US">.&nbsp;</span>개인정보에 관한 불만이나 의견이 있으신 분은 모두의러닝 고객센터<span
                    lang="EN-US">(02-1544-9335)</span>로 문의 주시면 접수 즉시 조치하고 처리결과를 통보해 드립니다<span
                    lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";=""
                mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">&nbsp;</span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">9.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            </b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 처리방침의 변경에 관한 사항</span></b><b><span lang="EN-US"
                                                                                                         맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:minor-fareast;=""
                mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보처리자가
            개인정보 처리방침을 변경하는 경우에는 변경 및 시행의 시기<span lang="EN-US">,&nbsp;</span>변경된 내용을 지속적으로 공개하여야 하며<span lang="EN-US">,&nbsp;</span>변경된
            내용은 정보주체가 쉽게 확인할 수 있도록 변경 전·후를 비교하여 공개하여야 합니다<span lang="EN-US">.</span></span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size:
            10pt;">
            <o:p></o:p>
            </span></p>
        <p class="a" style="line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">10.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height:
                normal;">&nbsp;&nbsp;</span></span></b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 안전성 확보조치에
                관한 사항</span></b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"=""
                style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p style="margin: 0cm 0cm 0cm 18pt; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 처리자는
            법 제<span lang="EN-US">29</span>조에 따라 다음 각 호의 안전성 확보 조치를 하여야 합니다<span lang="EN-US">.</span></span><b><span
                        lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
                minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">가)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보의 안전한 처리를 위한 내부 관리계획의 수립ㆍ시행<span lang="EN-US"><o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">나)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보에 대한 접근 통제 및 접근 권한의 제한 조치<span lang="EN-US"><o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">다)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보를 안전하게 저장ㆍ전송 할 수 있는 암호화 기술의 적용 또는 이에 상응하는 조치<span
                    lang="EN-US"><o:p></o:p></span></span></p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">라)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보 침해사고 발생에 대응하기 위한 접속기록의 보관 및 위조ㆍ변조 방지를 위한 조치<span
                    lang="EN-US"><o:p></o:p></span></span></p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">마)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보에 대한 보안프로그램의 설치 및 갱신<span lang="EN-US"><o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 58pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">바)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보의 안전한 보관을 위한 보관시설의 마련 또는 잠금 장치의 설치 등 물리적 조치<span
                    lang="EN-US"><o:p></o:p></span></span></p>
        <p class="a" style="line-height: normal;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">11.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height:
                normal;">&nbsp;&nbsp;</span></span></b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보
                보호책임자</span></b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
                mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 3.75pt 0cm 0cm 58pt; text-indent: -20pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="letter-spacing: -0.5pt; font-size: 10pt;">가)<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="letter-spacing: -0.5pt; font-size: 10pt;">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고<span lang="EN-US"
                                                                                                      style="font-size: 10pt;">,&nbsp;</span>개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다<span
                        lang="EN-US" style="font-size: 10pt;">.<o:p></o:p></span></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 7.5pt 0cm 0cm 78pt; text-indent: -20pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-family: Wingdings; letter-spacing: -0.5pt; font-size: 10pt;">l<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span>
            <span style="letter-spacing: -0.5pt; font-size: 10pt;">개인정보 보호책임자<span lang="EN-US"><o:p></o:p></span></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">성명</span><span lang="EN-US" style="font-size: 10pt;">:&nbsp;</span><span
                    style="font-size: 10pt;">임성준</span><span lang="EN-US"><o:p></o:p></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">부서</span><span lang="EN-US" style="font-size: 10pt;">:&nbsp;</span><span
                    style="font-size: 10pt;">IT팀</span><span lang="EN-US"><o:p></o:p></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">전화번호</span><span lang="EN-US" style="font-size: 10pt;">: 02-6084-2014<o:p></o:p></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">이메일</span><span lang="EN-US" style="font-size: 10pt;">: zkfmak16@modulearning.kr<o:p></o:p></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 78pt; line-height: normal; word-break: keep-all;"><span
                    style="font-size: 10pt;">※ 개인정보 보호 담당부서로 연결됩니다</span><span lang="EN-US" style="font-size: 10pt;">.<o:p></o:p></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 68pt; line-height: normal; word-break: keep-all;"><span lang="EN-US"
                                                                                                style="font-size: 10pt;">&nbsp;</span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 7.5pt 0cm 0cm 78pt; text-indent: -20pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-family: Wingdings; letter-spacing: -0.5pt; font-size: 10pt;">l<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;</span></span>
            <span style="letter-spacing: -0.5pt; font-size: 10pt;">개인정보 보호 담당부서<span lang="EN-US"><o:p></o:p></span></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">부서명</span><span lang="EN-US" style="font-size: 10pt;">:&nbsp;</span><span
                    style="font-size: 10pt;">교육운영팀</span><span lang="EN-US"><o:p></o:p></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">담당자</span><span lang="EN-US" style="font-size: 10pt;">:&nbsp;</span><span
                    style="font-size: 10pt;">남글하</span><span lang="EN-US"><o:p></o:p></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">전화번호</span><span lang="EN-US" style="font-size: 10pt;">: 02-6084-2014<o:p></o:p></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 96pt; text-indent: -18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="font-size: 10pt;">-<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span style="font-size: 10pt;">이메일</span><span lang="EN-US" style="font-size: 10pt;">:&nbsp;<a
                        href="mailto:woosh93@modulearning.kr"><span
                            style="color: windowtext; text-decoration-line: none; font-size: 10pt;">gelha0620@modulearning.kr</span></a><o:p></o:p></span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 1.5pt 0cm 0cm 86pt; line-height: normal; word-break: keep-all;"><span lang="EN-US"
                                                                                                style="font-size: 10pt;">&nbsp;</span>
        </p>
        <p class="MsoListParagraph" align="left"
           style="margin: 3.75pt 0cm 0cm 58pt; text-indent: -20pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US" style="letter-spacing: -0.5pt; font-size: 10pt;">나)<span times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 10pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-hansi-font-family:="" "맑은=""
            고딕";mso-hansi-theme-font:minor-fareast;letter-spacing:-.5pt;mso-bidi-font-weight:="" bold"=""><span
                    style="font-size: 10pt;">정보주체께서는 회사의 서비스</span><span lang="EN-US"
                                                                         style="font-size: 10pt;">(</span><span
                    style="font-size: 10pt;">또는 사업</span><span lang="EN-US" style="font-size: 10pt;">)</span><span
                    style="font-size: 10pt;">를 이용하시면서 발생한 모든 개인정보 보호 관련 문의</span><span lang="EN-US"
                                                                                       style="font-size: 10pt;">,&nbsp;</span><span
                    style="font-size: 10pt;">불만처리</span><span lang="EN-US" style="font-size: 10pt;">,&nbsp;</span><span
                    style="font-size: 10pt;">피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다</span><span lang="EN-US"
                                                                                                       style="font-size: 10pt;">.&nbsp;</span><span
                    style="font-size: 10pt;">회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다</span><span lang="EN-US"><span
                        style="font-size: 10pt;">.</span><o:p></o:p></span></span></p>
        <p class="MsoListParagraph" align="left"
           style="margin: 3.75pt 0cm 0cm 18pt; line-height: normal; word-break: keep-all;"><span
                    lang="EN-US">&nbsp;</span></p>
        <p style="margin: 0cm 0cm 0cm 18pt; text-indent: -18pt; background: white;"><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
                minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
                mso-bidi-font-family:"맑은="" 고딕";mso-bidi-theme-font:minor-fareast"="" style="font-size: 10pt;">12.<span
                        times="" new="" roman";"="" style="font-variant-numeric: normal; font-variant-east-asian:
                normal; font-weight: normal; font-stretch: normal; font-size: 7pt; line-height:
                normal;">&nbsp;&nbsp;</span></span></b><b><span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보침해에 대한 신고나
                상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다<span lang="EN-US">.</span></span></b><b><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
                minor-fareast;mso-hansi-theme-font:minor-fareast"="" style="font-size: 10pt;">
                <o:p></o:p>
                </span></b></p>
        <p class="a" style="margin-left: 60pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">가)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">개인정보분쟁조정 위원회<span lang="EN-US">&nbsp;(<a
                        href="http://www.1336.or.kr/1336"><span style="color: windowtext; text-decoration-line: none;">http://www.1336.or.kr/1336</span></a>)<o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 60pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">나)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">정보보호마크인증위원회<span lang="EN-US">&nbsp;(<a
                        href="http://www.eprivacy.or.kr/02-580-0533~4"><span
                            style="color: windowtext; text-decoration-line: none;">http://www.eprivacy.or.kr/02-580-0533~4</span></a>)<o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 60pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">다)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">대검찰청 인터넷범죄수사센터<span lang="EN-US">&nbsp;(<a
                        href="http://www.spo.go.kr/02-3480-2000"><span
                            style="color: windowtext; text-decoration-line: none;">http://www.spo.go.kr/02-3480-2000</span></a>)<o:p></o:p></span></span>
        </p>
        <p class="a" style="margin-left: 60pt; text-indent: -20pt; line-height: normal;"><span lang="EN-US" 맑은="" 고딕";"=""
            style="font-size: 10pt;">라)<span times="" new="" roman";"="" style="font-variant-numeric: normal;
            font-variant-east-asian: normal; font-stretch: normal; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span 맑은="" 고딕";"="" style="font-size: 10pt;">경찰청 사이버테러대응센터<span lang="EN-US">&nbsp;(<a
                        href="http://www.ctrc.go.kr/02-3150-2659"><span
                            style="color: windowtext; text-decoration-line: none;">http://www.ctrc.go.kr/02-3150-2659</span></a>)<o:p></o:p></span></span>
        </p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;mso-fareast-theme-font:=""
            minor-fareast;mso-hansi-theme-font:minor-fareast;mso-bidi-font-family:arial"="" style="font-size: 10pt;">&nbsp;</span>
        </p>
        <p style="margin: 0cm; background: white;"><span 맑은="" 고딕";"="" style="font-size: 10pt;">부칙<span lang="EN-US">&nbsp;</span></span>
            <span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:=""
            minor-fareast;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;=""
            mso-bidi-font-family:arial"="" style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin: 0cm; background: white;"><span lang="EN-US" 맑은="" 고딕";"="" style="font-size:
            10pt;">&nbsp;</span><span lang="EN-US" 맑은="" 고딕";mso-ascii-theme-font:minor-fareast;=""
            mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-fareast;="" mso-bidi-font-family:arial"=""
            style="font-size: 10pt;">
            <o:p></o:p>
            </span></p>
        <p style="margin-top: 0cm; margin-right: 0cm; margin-bottom: 0cm; background: white;"><span lang="EN-US" 맑은=""
                                                                                                    고딕";"=""
            style="font-size: 10pt;">[</span><span 맑은="" 고딕";"="" style="font-size: 10pt;">시행일<span
                    lang="EN-US">]&nbsp;</span>본 개인정보취급방침은<span lang="EN-US">&nbsp;2018</span>년&nbsp;<span lang="EN-US">3</span>월&nbsp;<span
                    lang="EN-US">2</span>일부터 적용됩니다<span lang="EN-US">.&nbsp;</span></span>&nbsp;</p>
        <p style="margin: 0cm 0cm 0cm 0px; background: white;">&nbsp; &nbsp;​ ​</p></div>
</div>
<div class="agreeArea">
    <input type="checkbox" name="agreePrivate" id="agreePrivate"/>
    <label for="agreePrivate">개인정보 취급방침에 동의합니다.</label>
</div>

<div class="ACS">
    <h1>ACS이용 안내</h1>
    <div>한국산업인력공단에서 원격훈련 모니터링과 관련하여 훈련실시 여부 등을 확인하는 문자를 발송합니다.<br><br>
        <table border="0" cellpadding="0" cellspacing="0"
               style="border:1px solid #cccccc; border-left:0; border-bottom:0;" class="__se_tbl">
            <tbody>

            <tr>
                <td style="border-width: 0px 0px 1px 1px; border-bottom-style: solid; border-left-style: solid; border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); width: 100px; height: 18px; background-color: rgb(255, 255, 255);"
                    class=""><p style="text-align: center; " align="center">문자내용</p></td>
                <td style="border-width: 0px 0px 1px 1px; border-bottom-style: solid; border-left-style: solid; border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); width: 300px; height: 18px; background-color: rgb(255, 255, 255);">
                    <p>한국산업인력공단 훈련품질향상센터에서 OOO님께 OO년 O월, OO과정의 원격훈련(이러닝) 수강여부를 확인중입니다.</p>
                    <p>위의 수강내용이 맞으면 숫자 '1', 틀리면 숫자 '2'를 OO까지 문자로 회신 주시면 감사하겠습니다.</p>
                    <p>- 이하생략 -</p></td>
            </tr>
            <tr>
                <td style="border-width: 0px 0px 1px 1px; border-bottom-style: solid; border-left-style: solid; border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); width: 180px; height: 18px; background-color: rgb(255, 255, 255);">
                    <p style="text-align: center;" align="center">관련규정</p></td>
                <td style="border-width: 0px 0px 1px 1px; border-bottom-style: solid; border-left-style: solid; border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); width: 614px; height: 18px; background-color: rgb(255, 255, 255);">
                    <p>-휴대전화번호 수집 규정</p>
                    <p>&nbsp;근로자직업능력개발법 제24조</p>
                    <p>&nbsp;사업주직업능력개발훈련 지원규정</p>
                    <p>&nbsp;제7조 제1항 제1호 별지 제2호 서식</p>
                    <p>-모니터링 대상 규정</p>
                    <p>&nbsp;직업능력개발훈련 모니터링업무지침 제2조</p>
                    <p>-휴대전화번호 모니터링 관련 사용 규정</p>
                    <p>&nbsp;직업능력개발훈련 모니터링에 관한 규정 제2조</p></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="agreeArea">
    <input type="checkbox" name="agreeACS" id="agreeACS"/>
    <label for="agreeACS">ACS에 관하여 충분히 알았습니다.</label>
</div>
<?
$query = "SELECT A.*, B.value02
					FROM nynMember A
					LEFT OUTER
					JOIN nynCategory B
					ON A.userLevel=B.value01 AND B.division=
					(SELECT seq FROM nynCategory WHERE value01='userLevel')
					WHERE A.userID='" . $_SESSION[loginUserID] . "'";
$result = mysql_query($query);
?>
<form class="sendForm" action="javascript:sendData()">
    <h1>학습자 정보 확인</h1>
    <input type="hidden" name="agreement" value="Y">
    <input type="hidden" name="zipCode" value="00000">
    <input type="hidden" name="auth" value="N">
    <ul>
        <li>
            <h1>학습자 성명</h1>
            <strong><?= mysql_result($result, 0, 'userName'); ?></strong>
        </li>
        <li>
            <h1>휴대폰 번호</h1>
            <input type="tel" name="mobile01" value="010">
            &nbsp;-&nbsp;
            <input type="tel" name="mobile02" value="<?= mysql_result($result, 0, 'mobile02'); ?>"/>
            &nbsp;-&nbsp;
            <input type="tel" name="mobile03" value="<?= mysql_result($result, 0, 'mobile03'); ?>"/>
            <button style="vertical-align: middle; background: #0780c2; padding: 5px 2px; color: white;"
                    type="button" onclick="authUser()">휴대폰 인증</button>
        </li>
        <li>
            <h1>새 비밀번호</h1>
            <input type="password" name="passwordCheck" placeholder="영문,숫자 혼합하여 10~20자" size="25"/> ※ 새로운 비밀번호를 입력해 주세요.
            다음 로그인부터는 이 비밀번호로 로그인 하셔야 합니다.
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
    <input type="checkbox" name="agree" id="agree"/>
    <label for="agree">휴대폰 정보가 일치하며, 새 비밀번호를 발급받았습니다.</label>
</div>
<div class="btnArea">
    <button onClick="agreeCheck()"><img src="../images/member/btn_ok.png"/></button>
</div>


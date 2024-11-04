<?php
header("Access-Control-Allow-Origin: *"); //allow cross origin
include '../lib/header.php';

if (!$_SESSION['loginUserID']) {
    echo "<script>alert('세션이 종료 되었습니다. 다시 로그인 해주세요.');window.close();opener.location.href='../member/login.php';</script>";
    exit;
}

$type = $_GET['type'];
$contentsCode = $_GET['contentsCode'];
$lectureOpenSeq = $_GET['lectureOpenSeq'];
$classCode = $contentsCode.','.$lectureOpenSeq;
$chapter = $_GET['chapter'];
$studySeq = $_GET['studySeq'];
$viewNew = $_GET['viewNew'];
$className = $_GET['className'];
$contents = $_GET['contents'];
if(strlen($chapter) < 2) {
    $chapterFormat = '0'.$chapter;
} else {
    $chapterFormat = $chapter;
}

$query = "SELECT mobile01, mobile02, mobile03 FROM nynMember WHERE userID='".$_SESSION['loginUserID']."'";
$result = mysql_query($query);
$res = mysql_fetch_array($result);
$userID = $_SESSION['loginUserID'];
$userName = $_SESSION['loginUserName'];
$userMobile = $res['mobile01'].$res['mobile02'].$res['mobile03'];
$userIP = $_SERVER["REMOTE_ADDR"];
$sessionID = session_id();

function getClassTme($lectureOpenSeq, $userID, $type) { // 평가 횟수 가져옴
    $queryT = "SELECT userID FROM nynTestHistory WHERE lectureOpenSeq = '".$lectureOpenSeq."' AND userID = '".$userID."' AND testType = '".$type."' ";
    $resultT = mysql_query($queryT);
    $count = mysql_num_rows($resultT);
    $count += 1;
    $classTme = $count;
    if(strlen($count) < 2) $classTme = '0'.strval($count);

    return $classTme;
}

switch($type) {
    case "start" : //입과
        $evalCD = "00";
        $evalType = "입과";
        $classTme = "00";
        break;

    case "study" : //진도
        $evalCD = "01";
        $evalType = "진도";
        $classTme = $chapterFormat;
        break;

    case "final" : //최종평가
        $evalCD = "02";
        $evalType = "시험";
        $classTme = getClassTme($lectureOpenSeq, $userID, 'test');
        break;

    case "report" : //과제
        $evalCD = "03";
        $evalType = "과제";
        $classTme = getClassTme($lectureOpenSeq, $userID, 'report');
        break;

    case "mid" : //중간평가
        $evalCD = "04";
        $evalType = "진행평가";
        $classTme = getClassTme($lectureOpenSeq, $userID, 'mid');
        break;

    default :
        $evalCD = "99";
        $evalType = "기타";
        $classTme = "00";
        break;
}

//휴대폰 본인인증
$sitecode   = "BF402";			 // NICE로부터 부여받은 사이트 코드
$sitepasswd = "YHFCAUOoNO1P";	 // NICE로부터 부여받은 사이트 패스워드
$authtype   = "M";      	     // 없으면 기본 선택화면, X: 공인인증서, M: 핸드폰, C: 카드
$popgubun 	= "N";		         // Y : 취소버튼 있음 / N : 취소버튼 없음
$customize 	= "";			     // 없으면 기본 웹페이지 / Mobile : 모바일페이지
$reqseq     = "REQ_0123456789";  // 요청 번호, 이는 성공/실패후에 같은 값으로 되돌려주게 되므로

// 업체에서 적절하게 변경하여 쓰거나, 아래와 같이 생성한다.
//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
$reqseq = get_cprequest_no($sitecode);
//} else {
//	$reqseq = "Module get_request_no is not compiled into PHP";
//}


// CheckPlus(본인인증) 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
$returnurl = "https://".$_SERVER['SERVER_NAME']."/member/checkplus_success.php";	// 성공시 이동될 URL
$errorurl = "https://".$_SERVER['SERVER_NAME']."/member/checkplus_fail.php";		// 실패시 이동될 URL


// reqseq값은 성공페이지로 갈 경우 검증을 위하여 세션에 담아둔다.
$_SESSION["REQ_SEQ"] = $reqseq;

// 입력될 plain 데이타를 만든다.
$plaindata =  "7:REQ_SEQ" . strlen($reqseq) . ":" . $reqseq .
    "8:SITECODE" . strlen($sitecode) . ":" . $sitecode .
    "9:AUTH_TYPE" . strlen($authtype) . ":". $authtype .
    "7:RTN_URL" . strlen($returnurl) . ":" . $returnurl .
    "7:ERR_URL" . strlen($errorurl) . ":" . $errorurl .
    "11:POPUP_GUBUN" . strlen($popgubun) . ":" . $popgubun .
    "9:CUSTOMIZE" . strlen($customize) . ":" . $customize ;

//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
$enc_data = get_encode_data($sitecode, $sitepasswd, $plaindata);
//} else {
//	$enc_data = "Module get_request_data is not compiled into PHP";
//}

if ($enc_data == -1) {
    $returnMsg = "암/복호화 시스템 오류입니다.";
    $enc_data  = "";
} else if ($enc_data== -2) {
    $returnMsg = "암호화 처리 오류입니다.";
    $enc_data  = "";
} else if ($enc_data== -3) {
    $returnMsg = "암호화 데이터 오류 입니다.";
    $enc_data  = "";
} else if ($enc_data== -9) {
    $returnMsg = "입력값 오류 입니다.";
    $enc_data  = "";
} else {
    $returnMsg = "";
}

//아이핀 인증
$sSiteCode	= "CX60"; // IPIN 서비스 사이트 코드		(NICE평가정보에서 발급한 사이트코드)
$sSitePw	= "kiraedu!@135"; // IPIN 서비스 사이트 패스워드	(NICE평가정보에서 발급한 사이트패스워드)
$sReturnURL	= "https://".$_SERVER['SERVER_NAME']."/member/ipin_process.php"; // 하단내용 참조
$sCPRequest	= ""; // 하단내용 참조

//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
$sCPRequest = get_request_no($sSiteCode);
//} else {
//	$sCPRequest = "Module get_request_no is not compiled into PHP";
//}

// 현재 예제로 저장한 세션은 ipin_result.php 페이지에서 데이타 위변조 방지를 위해 확인하기 위함입니다.
// 필수사항은 아니며, 보안을 위한 권고사항입니다.
$_SESSION['CPREQUEST'] = $sCPRequest;

$sEncData = ""; // 암호화 된 데이타
$sRtnMsg  = "";	// 처리결과 메세지

// 리턴 결과값에 따라, 프로세스 진행여부를 파악합니다.

//if (extension_loaded($module)) {/ 동적으로 모듈 로드 했을경우
$sEncData = get_request_data($sSiteCode, $sSitePw, $sCPRequest, $sReturnURL);
//} else {
//	$sEncData = "Module get_request_data is not compiled into PHP";
//}

// 리턴 결과값에 따른 처리사항
if ($sEncData == -9){
    $sRtnMsg = "입력값 오류 : 암호화 처리시, 필요한 파라미터값의 정보를 정확하게 입력해 주시기 바랍니다.";
} else {
    $sRtnMsg = "$sEncData 변수에 암호화 데이타가 확인되면 정상, 정상이 아닌 경우 리턴코드 확인 후 NICE평가정보 개발 담당자에게 문의해 주세요.";
}

?>
<!DOCTYPE html>
<html>
<head>

    <META charset="UTF-8">

    <!-- ###################################################################################################### -->
    <!-- Meta 설정환경을 아래와 같이 유지하여 주십시오.                                                                         -->
    <!-- ###################################################################################################### -->

    <!-- Cache 관리 Meta Tag : Cache는 No-Cache 정책을 유지하여 주십시오. -->
    <META http-equiv="Expires" content="-1">
    <META http-equiv="Pragma" content="no-cache">
    <META http-equiv="Cache-Control" content="No-Cache">

    <!-- IE 브라우저 사용자의 경우 최적의 성능을 위하여  IE=edge,chrome=1로 세팅되어 있어야 합니다. -->
    <META http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <!-- ###################################################################################################### -->
    <script type="text/javascript" src="https://fds.hrdkorea.or.kr/fdsService/hrdAPI/hrdFrameLoader.js"></script>
    <script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap&subset=korean" rel="stylesheet">
    <title><?=$_siteName?> HRD-OTP 인증</title>
</head>
<body>
<Table width="100%">
    <Tr height="50px">
        <Td width="100%" align="CENTER" style="padding:10px 0 15px;">
            <img src="img/otp_title_icon.png">
            <P class="otp_title"><font>OTP (One-Time Password) 인증</font></P>
            <P class="otp_txt"><font>올바른 수강을 위해 보안절차를 거치고 있습니다.</font></P>
        </Td>
    </Tr>
    <Tr>
        <Td width="100%" valign="TOP">
            <!--				<input type="button" value="OTP 호출 " onclick="javascript:checkifOtpStatus();">-->
            <!-- **************************************************************************************
                ** OTP 프레임 영역 세팅
                **하단 DIV 태그에 OTP 프레임이 위치하게 되므로 반드시 세팅되어 있어야 합니다.
                **Div id는 "hrdOtpFrame"으로 반드시 동일하게 설정되어 있어야합니다.
                **사이즈는 자율적으로 적용하여 주십시오.
            ************************************************************************************** -->
        </Td>
    </Tr>
    <Tr height="50px" style="">
        <Td width="100%">
            <div class="otpVal_wrap_all">
                <p class="otp_t1"><i class="fas fa-check-circle"></i><span>OTP</span> 비밀번호 입력</p>
                <div class="otpVal_wrap">
                    <input type="text" id="otpVal" pattern="\d*" maxlength="6"/>
                    <input type="button" class="otp_bt2" value="입력확인" onclick="sendOTP();"/>
                </div>
            </div>
        </Td>
    </Tr>
</Table>

<div style="margin-bottom:30px;">
    <div class="otpVal_wrap_all">
        <p class="otp_t1" style=""><i class="fas fa-check-circle"></i><span>OTP</span> 비밀번호 연속 오류(5회이상)인 경우<br />본인인증을 해주시기 바랍니다.</p>
        <div class="otp_wrap3">
            <input type="hidden" id="otpStatus">
            <input type="button" class="otp_bt4" value="휴대폰 인증" onclick="fnPopup()">
            <input type="button" class="otp_bt5" value="아이핀 인증" onclick="fnPopupipin()" style="margin-left:5px;">
        </div>
    </div>
</div>

<div class="otpVal_wrap_all">
    <a href="https://<?=$_siteURL?>/bbs/?boardCode=1&seq=651" target="_blank">
        <p class="otp_t1" style=""><span>MOTP 매뉴얼 및 설치링크(클릭)</span></p></a>
</div>

<form name="form_chk" method="post">
    <input type="hidden" name="m" value="checkplusSerivce">
    <input type="hidden" name="EncodeData" value="<?=$enc_data?>">
    <input type="hidden" name="param_r1" value="">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
</form>

<form name="form_ipin" method="post">
    <input type="hidden" name="m" value="pubmain">
    <input type="hidden" name="enc_data" value="<?=$sEncData?>">
    <input type="hidden" name="param_r1" value="">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
</form>

<form name="vnoform" method="post">
    <input type="hidden" name="enc_data">
    <input type="hidden" name="param_r1" value="">
    <input type="hidden" name="param_r2" value="">
    <input type="hidden" name="param_r3" value="">
</form>
</body>
<script type = "text/javascript">
    window.onload = function() {
        window.resizeTo(750,900);
    }
    var USER_NM = "<?= $userName ?>";
    var USER_TEL = "<?= $userMobile ?>";
    var OTPNO = '';
    var AGTID = 'kiraedu';
    var USRID = "<?= $userID ?>";
    var SESSIONID = "<?= $sessionID ?>";
    var EXIP = "<?= $userIP ?>";
    var COURSE_AGENT_PK = "<?= $contentsCode ?>";
    var CLASS_AGENT_PK = "<?= $classCode ?>";
    var EVAL_CD = "<?= $evalCD ?>";
    var EVAL_TYPE = "<?= $evalType ?>";
    var CLASS_TME = "<?= $classTme ?>";
    var USRDT = hrdFrame.getUT();
    var resultCode = ""; //OTP 인증 결과 코드

    // OTP 검증 시작
    function sendOTP(){

        OTPNO = document.getElementById('otpVal').value;
        if(OTPNO.length != 6){
            alert('OTP는 6자리를 입력해야합니다.');
            return false;
        }

        $.ajaxSetup({ cache: false });
        $.support.cors = true;

        $.ajax({
            type : 'POST',
            url : "https://emonotp.hrdkorea.or.kr/api/v2/otp_accredit",
            contentType : "application/x-www-form-urlencoded",
            data : {
                USER_NM : USER_NM,
                USER_TEL : USER_TEL,
                OTPNO : OTPNO,
                AGTID : AGTID,
                USRID : USRID,
                SESSIONID : SESSIONID,
                EXIP : EXIP,
                COURSE_AGENT_PK : COURSE_AGENT_PK,
                CLASS_AGENT_PK : CLASS_AGENT_PK,
                EVAL_CD : EVAL_CD,
                EVAL_TYPE : EVAL_TYPE,
                CLASS_TME : CLASS_TME,
                USRDT : USRDT
            },

            success : function(data){
                if(data.code == 200){
                    resultCode = '200';
                    $.ajax({
                        type : 'POST',
                        url : '../api/apiHrdMOTP.php',
                        data : {
                            USER_NM : USER_NM,
                            USER_TEL : USER_TEL,
                            OTPNO : OTPNO,
                            AGTID : AGTID,
                            USRID : USRID,
                            SESSIONID : SESSIONID,
                            EXIP : EXIP,
                            COURSE_AGENT_PK : COURSE_AGENT_PK,
                            CLASS_AGENT_PK : CLASS_AGENT_PK,
                            EVAL_CD : EVAL_CD,
                            EVAL_TYPE : EVAL_TYPE,
                            CLASS_TME : CLASS_TME,
                            USRDT : USRDT
                        },
                        success : function(data){
                            $.ajax({
                                url : '/api/apiCaptcha.php',
                                data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD },
                                type : 'POST',
                                success : function(){
                                    if(EVAL_CD == "00"){
                                        $(opener.document).find('div.mobileCert > ul form, .ipinInfo').remove();
                                        $(opener.document).find('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
                                        $(opener.document).find('input[name="certPass"]').val('Y');
                                        $(opener.document).find('#resultCode').val('2');
                                        window.close();
                                    } else if(EVAL_CD != "01"){
                                        opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
                                        if (USRID != 'zkfmak3785') {
                                            window.close();
                                        }
                                    } else {
//												opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
                                        opener.parent.openStudyDiv('<?=$className?>');
                                        window.close();
                                    }

                                }
                            })
                        }
                    })
                } else if(data.code == "AP001"){
                    alert('OTP 번호를 확인해주세요.');
                } else if(data.code == "AP009"){
                    resultCode = 'AP009';
                    alert('OTP 5회 이상 틀림으로 계정 잠금 상태, 본인 인증이 진행됩니다.');
                    fnPopup();
                } else if (data.code == 'IE001' || data.code == 'CE001' || data.code == 'CE002' || data.code == 'CE003'){
                    alert('HRD 서버 오류 발생, 본인 인증으로 대체합니다.');
                    fnPopup();
                } else if(data.code == "AP005"){
                    alert('등록되지 않은 사용자입니다. 1544-9335 고객센터로 문의주세요.'); //산인공앱과 lsm에서 등록된 정보 불일치할 경우도 있음(이름,폰번호)
                } else {
                    alert(data.code + ': 오류 발생, 고객 센터로 문의 바랍니다.');
                }
            },

            error : function(xhr, testStatus, error){
                alert('오류 발생, 고객 센터로 문의 바랍니다.');
            },

            beforeSend: function(){
//				loadingAct();
            },

            afterSend: function() {
//				loadingAct();
            }
        });

    }
    // OTP 검증 종료

    function fnPopup(){
        window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        document.form_chk.target = "popupChk";
        document.form_chk.submit();
    }
    var returnMsg = '<?= $returnMsg ?>';
    var enc_data = '<?= $enc_data ?>';

    function fnPopupipin(){
        window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        document.form_ipin.target = "popupIPIN2";
        document.form_ipin.action = "https://cert.vno.co.kr/ipin.cb";
        document.form_ipin.submit();
    }

    var sEncData = '<?= $sEncData ?>';

    function mobileCheck(userName,userBirth,sex,m_retCD,m_trnID,m_trnDT,mobile_no, authType) {
        var eval_cd = EVAL_CD;
        var eval_type = EVAL_TYPE;
        var class_tme = CLASS_TME;
        //2020-06-23 14:00 ~ 2020-06-23 15:30 EMON 서버점검 데이터 전송 예외처리
        var loginUserID = '<?=$_SESSION[loginUserID]?>';
        var banStartDate = new Date(2020, 5, 23, 14, 00);
        var banEndDate = new Date(2020, 5, 23, 15, 00);
        var inputDate = new Date();
        var loginUserBirth = '<?=$_SESSION[loginUserBirth]?>';
        if (userBirth.substring(2) != loginUserBirth) {
            alert('본인인증은 되었으나 등록된 회원정보와 일치하지 않습니다. 문제가 있는 경우 고객센터로 연락주시기 바랍니다.');
            $.ajax({
                method:"POST",
                url:"/api/apiSendHrd.php",
                dataType:"json",
                async:false,
                data: {
                    AGTID : "kiraedu",
                    USRID : USRID,
                    COURSE_AGENT_PK : COURSE_AGENT_PK,
                    CLASS_AGENT_PK : CLASS_AGENT_PK,
                    m_Ret : "F",
                    m_retCD : m_retCD,
                    m_trnID : m_trnID,
                    m_trnDT : m_trnDT,
                    EVAL_CD : eval_cd,
                    EVAL_TYPE : eval_type,
                    CLASS_TME : class_tme,
                    AUTH_TYPE : authType
                }
            })
        } else {
            if(resultCode == 'AP009'){
                resetOTP(m_retCD,m_trnID,m_trnDT);
            } else {
                hrdSendAct(m_retCD,m_trnID,m_trnDT,eval_cd, eval_type, class_tme);
            }
        }

    }

    //본인 인증 초기화 함수
    function resetOTP(m_retCD, m_trnID, m_trnDT){
        try {
            $.ajax({
                type : "POST",
                url  : "https://emonotp.hrdkorea.or.kr/api/v2/user_reset",
                crossDomain: true,
                data : {
                    AGTID : "kiraedu",
                    USER_NM : USER_NM,
                    USER_TEL : USER_TEL,
                    USRID : USRID,
                    M_RET : 'T',
                    M_RETCD : m_retCD,
                    M_TRNID : m_trnID,
                    M_TRNDT :m_trnDT
                },
                success : function(data) {
                    if(data.code == 200){
                        alert('인증 성공, 잠금 해제되었습니다.');
                        $.ajax({
                            type : 'POST',
                            url : '../api/apiSendHrd.php',
                            dataType : "json",
                            data : {
                                AGTID : "kiraedu",
                                USRID : USRID,
                                COURSE_AGENT_PK : COURSE_AGENT_PK,
                                CLASS_AGENT_PK : CLASS_AGENT_PK,
                                EVAL_CD : EVAL_CD,
                                EVAL_TYPE : EVAL_TYPE,
                                CLASS_TME : CLASS_TME,
                                m_Ret : "T",
                                m_retCD : m_retCD,
                                m_trnID : m_trnID,
                                m_trnDT : m_trnDT,
                                AUTH_TYPE : "103"
                            },
                            success : function(data){
                                $.ajax({
                                    url : '/api/apiCaptcha.php',
                                    data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD },
                                    type : 'POST',
                                    success : function(){
                                        if(EVAL_CD == "00"){
                                            $(opener.document).find('div.mobileCert > ul form, .ipinInfo').remove();
                                            $(opener.document).find('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
                                            $(opener.document).find('input[name="certPass"]').val('Y');
                                            $(opener.document).find('#resultCode').val(m_retCD);
                                            window.close();
                                        } else if(EVAL_CD != "01"){
                                            opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
                                            window.close();
                                        } else {
//												opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
                                            opener.parent.openStudyDiv('<?=$className?>');
                                            window.close();
                                        }

                                    }
                                })
                            }
                        })
                    } else if (data.code == "AP010"){
                        alert('인증 실패!');
                        $.ajax({
                            type : 'POST',
                            url : '../api/apiSendHrd.php',
                            dataType : "json",
                            data : {
                                AGTID : "kiraedu",
                                USRID : USRID,
                                COURSE_AGENT_PK : COURSE_AGENT_PK,
                                CLASS_AGENT_PK : CLASS_AGENT_PK,
                                EVAL_CD : EVAL_CD,
                                EVAL_TYPE : EVAL_TYPE,
                                CLASS_TME : CLASS_TME,
                                m_Ret : "F",
                                m_retCD : m_retCD,
                                m_trnID : m_trnID,
                                m_trnDT : m_trnDT,
                                AUTH_TYPE : "103"
                            },
                        })
                    } else {
                        console.log(data.code);
                        alert('오류 발생, 고객 센터로 문의 바랍니다.');
                    }
                },
                error : function(xhr, textStatus, error){
                    alert('오류 발생, 고객 센터로 문의 바랍니다.');
                }
            });
        } catch(e) {
            alert("오류발생 : " + e.message);
        }
    }

    //본인 인증 함수
    function hrdSendAct(m_retCD, m_trnID, m_trnDT, eval_cd, eval_type, class_tme) {
        try {
            $.ajax({
                type : "POST",
                url  : "https://emon.hrdkorea.or.kr/EAIServer/SOURCE/ExConn/LMS/pSubOtpLog.jsp",
                crossDomain: true,
                async:false,
                data : {
                    AGTID : "kiraedu",
                    USRID : USRID,
                    COURSE_AGENT_PK : COURSE_AGENT_PK,
                    CLASS_AGENT_PK : CLASS_AGENT_PK,
                    EVAL_CD : eval_cd,
                    EVAL_TYPE : eval_type,
                    CLASS_TME : class_tme,
                    m_Ret : "T",
                    m_retCD : m_retCD,
                    m_trnID : m_trnID,
                    m_trnDT : m_trnDT
                },
                dataType : "xml",
                success : function(xml) {
                    var RetVal = $(xml).find("RetVal").text();
                    var RetMsg = $(xml).find("RetMsg").text();
                    var Remark = $(xml).find("Remark").text();
                    if(RetVal == '101'){
                        alert("인증되었습니다.");
                        $.ajax({
                            method:"POST",
                            url:"/api/apiSendHrd.php",
                            dataType:"json",
                            async:false,
                            data: {
                                AGTID : "kiraedu",
                                USRID : USRID,
                                COURSE_AGENT_PK : COURSE_AGENT_PK,
                                CLASS_AGENT_PK : CLASS_AGENT_PK,
                                m_Ret : "T",
                                m_retCD : m_retCD,
                                m_trnID : m_trnID,
                                m_trnDT : m_trnDT,
                                EVAL_CD : eval_cd,
                                EVAL_TYPE : eval_type,
                                CLASS_TME : class_tme,
                                AUTH_TYPE : "102"
                            },
                            success : function(data){
                                $.ajax({
                                    url : '/api/apiCaptcha.php',
                                    data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':eval_cd },
                                    type : 'POST',
                                    async:false,
                                    success : function(){
                                        if(eval_cd == "00"){
                                            $(opener.document).find('div.mobileCert > ul form, .ipinInfo').remove();
                                            $(opener.document).find('div.mobileCert > ul h1').after('<strong class="blue">본인인증이 완료되었습니다.</strong>');
                                            $(opener.document).find('input[name="certPass"]').val('Y');
                                            $(opener.document).find('#resultCode').val(m_retCD);
                                            window.close();
                                        } else if(eval_cd != "01"){
                                            opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
                                            window.close();
                                        } else {
//												opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
                                            opener.parent.openStudyDiv('<?=$className?>');
                                            setTimeout(function() {
                                                window.close();
                                            }, 500);
                                        }

                                    }
                                })
                            },
                        })
                    } else {
                        alert('오류가 발생했습니다.');
                        $.ajax({
                            method:"POST",
                            url:"/api/apiSendHrd.php",
                            dataType:"json",
                            data: {
                                AGTID : "kiraedu",
                                USRID : USRID,
                                COURSE_AGENT_PK : COURSE_AGENT_PK,
                                CLASS_AGENT_PK : CLASS_AGENT_PK,
                                m_Ret : "F",
                                m_retCD : m_retCD,
                                m_trnID : m_trnID,
                                m_trnDT : m_trnDT,
                                EVAL_CD : eval_cd,
                                EVAL_TYPE : eval_type,
                                CLASS_TME : class_tme,
                                AUTH_TYPE : "102"
                            }
                        })
                    }
                }
            });
        } catch(e) {
            alert("오류발생 : " + e.message);
        }

    }

</script>
</html>
<style>
    #hrdOtpFrame{ height: auto!important; box-shadow: 2px 2px 7px rgba(0,0,0,0.1); }
    .otp_title{font-family: 'Noto Sans KR'; font-size: 30px; color: #262626; font-weight: 300; letter-spacing: -2px; margin: 0;}
    .otp_txt{ font-family: 'Noto Sans KR', ; font-size: 18px; color: #5c5c5c; letter-spacing: -1.5px; margin: 0;}
    .otp_t1{ font-size: 14px; color: #353535; font-family: 'Noto Sans KR'; font-weight: 400; letter-spacing: -0.5px; line-height: 17px;}
    .otp_t1 i{ color: #2174ff; margin-right: 10px;}
    .otp_t1 >span{ font-weight: 900; color: #0042af; }
    .otpVal_wrap_all{ width: 100%; background: #fff; padding:5px 0px 20px 0; margin-top: 15px; text-align: center; box-shadow: 2px 2px 7px rgba(0,0,0,0.1); }
    .otpVal_wrap{ width: 80%; margin: 0 auto; }
    .otpVal_wrap:after { content:""; display: block; clear:both; }
    .otpVal_wrap>input{ float: left; }
    #otpVal{ width: 60%; height: 32px;  border: 1px solid #ccc; border-radius: 5px;  }
    .otp_bt2{ width: 30%; height: 37px;margin-left:5px;  font-size: 13px; font-family: 'Noto Sans KR'; font-weight: 400;  background: linear-gradient(150deg, #816eff, #3982ff); color: #fff; border: 0; border-radius: 5px; cursor:pointer;  box-shadow: 5px 5px 10px rgba(102,102,255,0.4); }
    .otp_wrap2{ width: 50%; margin:0 auto; }
    .otp_bt3{ width: 100%; height: 37px; font-family: 'Noto Sans KR'; font-size: 13px; font-weight: 400;  background: linear-gradient(150deg, #f05138, #ee3a5b, #ed1375); color: #fff;  border:0; border-radius: 5px; cursor:pointer;  box-shadow: 5px 5px 10px rgba(237,19,117,0.2); }
    .otp_wrap3:after { content:""; display: block; clear:both; }
    .otp_wrap3{ width: 70%; margin:0 auto; }
    .otp_wrap3>input{ float: left; }
    .otp_bt4{ width: 48%; height: 37px; font-family: 'Noto Sans KR'; font-size: 13px; font-weight: 400; background: linear-gradient(150deg, #816eff, #3982ff); color: #fff; border: 0; border-radius: 5px; cursor:pointer; box-shadow: 5px 5px 10px rgba(102,102,255,0.4);  }
    .otp_bt5{ width: 48%; height: 37px; font-family: 'Noto Sans KR'; font-size: 13px; font-weight: 400;  background: linear-gradient(150deg, #fea735, #fe7235);  color: #fff; border: 0; border-radius: 5px; cursor:pointer; box-shadow:3px 3px 7px rgba(254,114,53,0.5); }
    #hrdKeyPad{ top:496px; left: 60px; }
    #hrdOtpFrame table{background: #fff!important; }

    .cssFont18, .cssFont17{ color: #2174ff; font-family: 'Noto Sans KR'; font-size: 14px; font-weight: 500; letter-spacing: -0.5px; line-height: 16px;}
    .cssFont16{ color: #333; font-family: 'Noto Sans KR'; font-size: 14px; font-weight: 400; letter-spacing: -0.5px; }
    #otpFrameLine{ display: none;}
    .btnType05{ height:40px!important; background: #1799a4; border-radius: 30px; font-family: 'Noto Sans KR'; font-size: 15px; font-weight: 300; letter-spacing: -0.5px;  transition: all 0.5s; box-shadow:3px 3px 7px rgba(0,0,0,0.4);  }
    #menuArea{ background: #fff; padding: 15px 10px; }
    .cssFont06{ background: #f9f9f9; color: #616161; font-family: 'Noto Sans KR'; font-size: 14px; font-weight: 400; letter-spacing: -0.5px; border-radius: 30px; padding: 6px 20px; transition: all 0.3s; }
    .cssFont06:hover{ background: #444; color: #fff; }
    .cssFont15{ color:#ff8f21; }
    #remainSec{ margin: 0; }
    .cssFont13{ color: #ff8f21!important;}
</style>

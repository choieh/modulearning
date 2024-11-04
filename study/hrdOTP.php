<?
include '../lib/header.php';

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


<title><?=$_siteName?> HRD-OTP 인증</title>


<?
$query = "SELECT mobile01, mobile02, mobile03 FROM nynMember WHERE userID='".$_SESSION['loginUserID']."'";
$result = mysql_query($query);
$res = mysql_fetch_array($result);

$chkSeq         = $_GET['chkSeq'];
$contentsCode   = $_GET['contentsCode'];
$lectureOpenSeq = $_GET['lectureOpenSeq'];
$type           = $_GET['type'];
$chapter        = $_GET['chapter'];
$studySeq       = $_GET['studySeq'];
$viewNew        = $_GET['viewNew'];
$userID         = $_SESSION['loginUserID'];
$userName = $_SESSION['loginUserName'];
$userMobile = $res['mobile01'].$res['mobile02'].$res['mobile03'];
$userIP = $_SERVER["REMOTE_ADDR"];
$className = $_GET['className'];

if(strlen($chapter) < 2) {
	$chapterFormat = '0'.$chapter;
} else {
	$chapterFormat = $chapter;	
}

function getClassTme($lectureOpenSeq, $userID, $type) { // 평가 횟수 가져옴
	$queryT = "SELECT userID FROM nynTestHistory WHERE lectureOpenSeq = '".$lectureOpenSeq."' AND userID = '".$userID."' AND testType = '".$type."' ";
	$resultT = mysql_query($queryT);
	$count = mysql_num_rows($resultT);
	$count += 1;

	if(strlen($count) < 2) $classTme = '0'.strval($count);

	return $classTme;
}

if (!$_SESSION['loginUserID']) {
	echo "<script>alert('세션이 종료 되었습니다. 다시 로그인 해주세요.');window.close();opener.location.href='../member/login.php';</script>";
	exit;
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


?>

	<!-- ### 한국산업인력공단 통합 API를 아래와 같이 로딩하여 주십시오. ######################################################## -->

	<script type="text/javascript" src="https://fds.hrdkorea.or.kr/fdsService/hrdAPI/hrdFrameLoader.js"></script>
	<script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap&subset=korean" rel="stylesheet">
	<!-- ################################################################################################## -->


	<script type="text/javascript">

		var COURSE_AGENT_PK = "<?=$contentsCode?>";
		var CLASS_AGENT_PK = "<?=$contentsCode?>,<?=$lectureOpenSeq?>";
		var EVAL_CD = "<?=$evalCD?>";
		var EVAL_TYPE = "<?=$evalType?>";
		var CLASS_TME = "<?=$classTme?>";
		var USER_NM = "<?= $userName ?>";
		var USER_TEL = "<?= $userMobile ?>";
		var EXIP = "<?= $userIP ?>";
		
		var UT = hrdFrame.getUT();

        window.name ="Parent_window";

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

        function mobileCheck(userName,userBirth,sex,m_retCD,m_trnID,m_trnDT,authType) {
            //2020-06-23 14:00 ~ 2020-06-23 15:30 EMON 서버점검 데이터 전송 예외처리
			var loginUserID = '<?=$_SESSION[loginUserID]?>';
			var banStartDate = new Date(2020, 5, 23, 14, 00);
			var banEndDate = new Date(2020, 5, 23, 15, 00);
            var inputDate = new Date();

			var eval_cd = EVAL_CD;
			var eval_type = EVAL_TYPE;
			var class_tme = CLASS_TME;

            var loginUserBirth = '<?=$_SESSION[loginUserBirth]?>';
            if (userBirth.substring(2) != loginUserBirth) {
                alert('본인인증은 되었으나 등록된 회원정보와 일치하지 않습니다. 문제가 있는 경우 고객센터로 연락주시기 바랍니다.');
            } else {
                if(inputDate >= banStartDate && inputDate <= banEndDate){
					hrdStopSendAct(m_retCD,m_trnID,m_trnDT);
                }else{
					hrdSendAct(m_retCD,m_trnID,m_trnDT,eval_cd,eval_type,class_tme);
				}
            }

        }

		/*
		  ++++ 한국산업인력공단 통합 API 로딩 +++++++++++++++++++++++++++++++++++++++++++++++++++
		  ** 페이지 로딩 시 호출.
		  ** 통합 API는 용량이 있으므로 최초 페이지 로딩이 완료된 후 바로 함수호출하여 로딩 시작하여 주십시오.
		  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		*/
		window.onload = function() {
						
			loadingAct();
			
			// isDebug가 true로 설정되어 있을 경우 오류 시 Alert 창이 표출됩니다.
			// Debug 시 true로 설정하여 주시고, 실 반영 시 false로 변경하여 주십시오.
			var isDebug = false;
			// 통합 API 로딩 프로세스 호출.
			// loadHrdFrame이 호출되지 않으면 다른 모든 함수가 정상 호출되지 않습니다.
			// 반드시 페이지 로딩 등 초기에 loadHrdFrame 함수가 1회 호출되어야 합니다.
			// 페이지 로딩 시 한번 호출하신 후 반복하여 호출하지 말아주십시오.
			hrdFrame.loadHrdFrame(isDebug);
			hrdFrame.loadFDS(AGTID, USRID, SESSIONID);
			window.resizeTo(750,900);
			checkifOtpStatus();
		}

		/*
		  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		*/


		/*
		--> 파라미터 : AGTID, USRID
		  ** AGTID : 훈련기관 이몬 로그인 ID
		  ** USRID : 훈련생 ID

		  ** AGTID, USRID 모두 Agent가 수집하는 LMS 데이터 값을 보내주셔야 합니다.
		  ** AGTID, USRID 모두 영문,숫자만 허용됩니다. (한글 절대 불가합니다)
		*/
		/* AGTID 및 USRID는 훈련기관에서 임의 변경하여 테스트하여 주십시오. */
		var AGTID     = "kiraedu";
		var USRID     = "<?=$_SESSION['loginUserID']?>";
		var SESSIONID = "<?=session_id()?>";


		// 1 단계 OTP 서비스 준비상태 및 OTP 단말기 상태 조회.
		function checkifOtpStatus() {

			try {
				/* No-Cache, 설정 및 CrossDomain 설정,  */
				$.ajaxSetup({ cache: false });
				$.support.cors = true;

				$.ajax({
					type : "POST",
					url  : "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/JSP/clientService/chkOtpDeviceStatus.jsp",
					crossDomain: true,
					timeout : 10000, /* Timeout 권고치 5~10초 */
					data : {
						AGTID : AGTID,
						USRID : USRID
					},
					dataType : "xml",
					success : function(xml) {
						/*
						--> 응답 값
						  ** ConnStatus : 서비스 준비상태. 101 - 서비스 이용 가능,  102 - 정상 서비스 불가
						     >> 101 : 정상적으로 OTP 호출
						     >> 102 : 한국산업인력공단이 제시하는 대체 인증수단 호출
						  ** OtpStatus : 단말상태. 101 - 정상등록, 102 - 비밀번호 연속오류로 인한 사용정지, 103 - 미등록 단말(최초 접근), 901 - 장애발생
						     >> 101, 103인 경우 정상적으로 OTP 호출.
						     >> 102인 경우 휴대폰인증을 통한 OTP 초기화 조치.
						     >> 901인 경우 재시도 또는 대체 인증수단 호출.
						*/
						var ConnStatus = $(xml).find("ConnStatus").text();
						var OtpStatus = $(xml).find("OtpStatus").text();
						var ErrCnt = $(xml).find("ErrCnt").text();
						var Remark = $(xml).find("Remark").text();
						$("#otpStatus").val(OtpStatus);

						if(ConnStatus == "101") {
							if(OtpStatus == "101" || OtpStatus == "103") {
								// 정상적으로 OTP 호출
								ExecuteOTP();								
							}
							else if(OtpStatus == "102") {
								// 비밀번호 연속오류로 OTP 이용 정지 상태
								// 본인인증 화면 표출. 본인인증 후 성공일 경우에 한하여 인증결과를 한국산업인력공단으로 전송.
								// 본인인증결과 전송 시 오류기록 초기화로 정상적인 OTP 사용 가능.								
								alert("비밀번호 연속 오류로 OTP 이용이 정지 되었습니다. 본인인증 후 자동 초기화 됩니다. 하단의 휴대폰인증이나 아이핀인증을 해주시기 바랍니다.");
								var errorMsg = '<div style="text-align:center">비밀번호 연속 오류로 OTP 이용이 정지</div>';
								$('#hrdOtpFrame').after(errorMsg);
							}
							else {
								// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
								alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
							}
						}
						else {
							// 정상적인 서비스 불가상태
							// 한국산업인력공단에서 제시한 대체 인증수단 호출
							alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
						}
					},
					error : function(xhr, textStatus, error) {
						// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
						alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
					}
				});
			} catch(e) {
				// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
				alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
			}
		}


		// OTP 비밀번호 연속오류로 인한 정지 시 본인인증을 통한 초기화 예시.
		//var m_retCD = "";     // 인증서비스 공급자(나이스 등)의 인증결과 코드 값
		//var m_trnID = "";     // 인증서비스 공급자가 부여한 인증거래 고유 아이디(일련번호)
		//var m_trnDT = "";     // 인증처리 일시 (YYYY-MM-DD HH24:MI:SS)
		//var m_Ret = "T";       // 본인인증 결과 : T/F  (T:성공, F:실패). T에 해당하는 경우만 호출.
		function hrdSendAct(m_retCD,m_trnID,m_trnDT,eval_cd,eval_type,class_tme) {
			var otpStatus = $("#otpStatus").val();
			if (otpStatus == "102") {	//초기화
				var sendUrl = "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/JSP/clientService/regiPhoneAuthLog.jsp";
				var AUTH_TYPE = "103";
			} else {	//대체인증
				var sendUrl = "https://emon.hrdkorea.or.kr/EAIServer/SOURCE/ExConn/LMS/pSubOtpLog.jsp";
				var AUTH_TYPE = "102";
			}

			try {
				$.ajax({
					type : "POST",
					url  : sendUrl,
					crossDomain: true,
					data : {
						AGTID : "kiraedu",
						USRID : USRID,
						m_Ret : "T",
						m_retCD : m_retCD,
						m_trnID : m_trnID,
						m_trnDT : m_trnDT,
						COURSE_AGENT_PK : COURSE_AGENT_PK,
						CLASS_AGENT_PK : CLASS_AGENT_PK,
						EVAL_CD : eval_cd,
						EVAL_TYPE : eval_type,
						CLASS_TME : class_tme
					},
					dataType : "xml",
					success : function(xml) {
						if($(xml).find("RetVal").text() == "102" && otpStatus == "102") {
							alert("오류가 발생하였습니다.");
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
											AUTH_TYPE : AUTH_TYPE
									  }
							})
						} else {
							if (otpStatus == "102") {
								alert("OTP 초기화가 성공적으로 이루어졌습니다.");
								window.location.reload();
							} else {
								alert("인증되었습니다.");
								//opener.parent.studyPop("<?=$studySeq?>","<?=$chapter?>","<?=$_GET['viewNew']?>","Y");
								$.ajax({
										method:"POST",
										url:"/api/apiSendHrd.php",
										dataType:"json",
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
											AUTH_TYPE : AUTH_TYPE
										}
								});
								if(EVAL_CD != "01"){
									
									$.ajax({
										url : '/api/apiCaptcha.php',
										data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD },
										type : 'POST',
										success : function(){											
											opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
											window.close();
										}
									})
									
								}else{
									
									$.ajax({
										url : '/api/apiCaptcha.php',
										data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD  },
										type : 'POST',
										success : function(){
											//alert("인증 성공!") //do something(인증 성공 처리)
//											opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
											opener.parent.openStudyDiv('<?=$className?>');
											window.close();
										}
									})
									
								}								
							}
						}
					},
					error : function(xhr, textStatus, error) {
						alert("오류발생 : " + error);
					}
				});
			} catch(e) {
				alert("오류발생 : " + e.message);
			}

		}

		//##################################################################################################
		//OTP 호출 및 비밀번호 생성 
		//################################################################################################## -->

		function ExecuteOTP() {  // 함수명은 자유롭게 설정하셔도 무방합니다.
			try {
				/*
				  ##### OTP 로딩 ######################################################
				  OTPTYPE : OTP 호출 방법
				  > 101 : 팝업으로 OTP 표출. 설치형 OTP 배포
				  > 102 : 프레임으로 OTP 표출. 설치형 OTP 배포안함.
				    모바일 및 Mac, Linux 등 설치형 배포대상이 아닐 경우 OTPTYPE이 101이더라도 프레임으로 표출함.
				  --> 주의) 현재 다수 훈련기관의 요청으로 팝업이 아닌 프레임 형태만 지원함.
				  --> 101(팝업) 지원 시 추후 별도 통보함.
				  ###################################################################
				*/

				var OTPTYPE = "102";
				hrdFrame.loadOTP(AGTID,USRID,SESSIONID,OTPTYPE);

			} catch(e) {
				// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
				alert('OTP 장애가 발생했습니다. 하단의 휴대폰,아이핀 인증으로 진행 해주시기 바랍니다.');
			}
		}

		/* hrdFrame.loadOTP 호출에 대한 Callback */
		function loadOtpReceiver(rtype, msg) { // Callback 함수로 반드시 동일한 함수명 및 파라미터 구조로 등록되어 있어야합니다.
			if (rtype == 102) {
				alert('OTP 장애가 발생했습니다. 하단의 휴대폰,아이핀 인증으로 진행 해주시기 바랍니다.');
			}
			/*
				rtype : 102 --> 장애 및 지연발생으로 OTP 호출 중단.
				한국산업인력공단에서 제시한 대체 인증수단 호출
			*/
		}

		//##################################################################################################
		//KEYPAD 제어
		//##################################################################################################

		function showKeypad(ele) {

			/*
			 ## padType : Layer/Frame
			  >> Layer : 세로타입
			  >> Frame : 가로타입
			 ## fWidth : Frame일 경우 넓이 (Layer일 경우 참조하지 않음)
			*/
			var padType = "Layer";
			var fWidth = "400px";

			hrdFrame.loadKeyPad(ele, padType, fWidth);
		}

		/* hrdFrame.loadKeyPad 호출에 대한 Callback */
		function loadKeypadReceiver(rtype, msg) { // Callback 함수로 반드시 동일한 함수명 및 파라미터 구조로 등록되어 있어야합니다.
			alert(rtype + " : " + msg);

			/*
			rtype : 102 --> 장애 및 지연발생으로 OTP 호출 중단.
			keypad 대신 일반 좌판을 통한 입력 허용

			예제)
			document.getElementById("otpVal").removeAttribute("onclick");
			*/
		}

		function hideKeypad() {
			hrdFrame.hideKeyPad();
		}

		//##################################################################################################
		//OTP 비밀번호 검증
		//##################################################################################################

		function validateOtp() {
			try {
				var oNo = document.getElementById("otpVal").value;
				if(oNo == null || oNo == "") {
					alert("otp 번호를 입력하여 주십시오.");
					return false;
				}
				console.log(AGTID, USRID, SESSIONID, oNo, COURSE_AGENT_PK,CLASS_AGENT_PK,EVAL_CD,EVAL_TYPE,CLASS_TME,UT);
				$.ajax({
					type : "POST",
					url  : "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/JSP/validateOtp/chkOtpResult.jsp",
					crossDomain: true,
					data : {
						AGTID : AGTID,
						USRID : USRID,
						SESSIONID : SESSIONID,
						OTPNO : oNo,
						COURSE_AGENT_PK : COURSE_AGENT_PK,
						CLASS_AGENT_PK : CLASS_AGENT_PK,
						EVAL_CD : EVAL_CD,
						EVAL_TYPE : EVAL_TYPE,
						CLASS_TME : CLASS_TME,
						UT : UT
					},
					dataType : "xml",
					success : function(xml) {
						if($(xml).find("RetVal").text() == "101") {
							$.ajax({
							type : 'POST',
								url : '../api/apiHrdMOTP.php',
								data : {
									USER_NM : USER_NM,
									USER_TEL : USER_TEL,
									OTPNO : oNo,
									AGTID : AGTID,
									USRID : USRID,
									SESSIONID : SESSIONID,
									EXIP : EXIP,
									COURSE_AGENT_PK : COURSE_AGENT_PK,
									CLASS_AGENT_PK : CLASS_AGENT_PK,
									EVAL_CD : EVAL_CD,
									EVAL_TYPE : EVAL_TYPE,
									CLASS_TME : CLASS_TME,
									USRDT : UT
								},
							})
							hideKeypad();
							//alert("OTP 인증이 성공적으로 이루어졌습니다.");
							//opener.parent.studyPop("<?=$studySeq?>","<?=$chapter?>","<?=$_GET['viewNew']?>","Y");
							//window.close();
							
							if(EVAL_CD != "01"){
									
								$.ajax({
									url : '/api/apiCaptcha.php',

									data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD  },
									type : 'POST',
									success : function(){
										opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
										window.close();
									}
								});
								
							}else{
								
								$.ajax({
									url : '/api/apiCaptcha.php',
									data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>','eval_cd':EVAL_CD  },
									type : 'POST',
									success : function(){
										//alert("인증 성공!") //do something(인증 성공 처리)
//										opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
										opener.parent.openStudyDiv('<?=$className?>');
										window.close();
									}
								})
								
							}

						} else {
							/* 키패드를 화면에서 제거함. */
							hideKeypad();
							alert("OTP 장애가 발생했습니다. 하단의 다른 인증으로 진행 해주시기 바랍니다.");
							/*
							 ## OTP 화면 갱신.
							  * OTP는 60초 단위의 시간 별 고유 키를 생성하여 검증함.
							  * 훈련생의 디바이스와 서버의 시간이 불일치할 경우 서로 다른 시간 대의 비밀번호를 생성하여 검증하는 경우가 발생할 수 있음.
							  * 이에 따른 오류를 최소화하기 위하여 OTP를 한번 더 로드시켜 시간 불일치로 인한 비밀번호 오류 위험을 최소화함.
							*/
							//ExecuteOTP();
							window.location.reload(); //가상키보드로 인해 오류 발생하여 리로드 처리함
							//alert("OTP 인증에 실패하였습니다. 비밀번호를 확인 후 다시 입력하여 주십시오.\r\n" + "연속오류 횟수 : " + $(xml).find("ErrCnt").text() + " / " + $(xml).find("RetMsg").text() + "\r\n" + $(xml).find("Remark").text());
							//alert("OTP 인증에 실패하였습니다. 비밀번호를 확인 후 다시 입력하여 주십시오.\r\n" + "연속오류 횟수 : " + $(xml).find("ErrCnt").text());
						}
					},
					error : function(xhr, textStatus, error) {
						hideKeypad();
						// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
						alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
					}
				});
			} catch(e) {
				hideKeypad();
				// 장애 발생 시 재시도 또는 한국산업인력공단에서 제시한 대체 인증수단 호출
				alert("OTP 장애가 발생했습니다. 하단의 캡차 인증으로 진행 해주시기 바랍니다.");
			}
		}
		
		function loadingAct(){

			var loadingScreen = '<div class="loadingScreen" style="text-align:center;"><img src="../images/global/loading.gif" alt="loading" border=0><span onclick="loadingAct()"></span></div>';
			if($('body').find('.loadingScreen').length == 0){
				$('#hrdOtpFrame').append(loadingScreen);
				//$('body').append(loadingScreen);
			}else{
				$('.loadingScreen').fadeOut('fast',function(){
					$(this).remove();
				});
			}
		}
		//checkifOtpStatus();

		//##################################################################################################

        function hrdStopSendAct(m_retCD,m_trnID,m_trnDT){
			var USRID = '<?=$userID?>';
            var AUTH_TYPE = "102";
            $.ajax({
                        method:"POST",
                        url:"/api/apiSendHrd.php",
                        dataType:"json",
                        data: {
                                        AGTID : "kiraedu",
                                        USRID : USRID,
                            COURSE_AGENT_PK : COURSE_AGENT_PK,
                            CLASS_AGENT_PK : CLASS_AGENT_PK,
                                        m_Ret : "T",
                                    m_retCD : m_retCD,
                                    m_trnID : m_trnID,
                                    m_trnDT : m_trnDT,
                                    EVAL_CD : EVAL_CD,
                                    EVAL_TYPE : EVAL_TYPE,
                                    CLASS_TME : CLASS_TME,
                                    AUTH_TYPE : AUTH_TYPE
                            },
                            error: function(error) {

                            },
                            success : function(data){
                                alert('인증되었습니다.');
                                if(EVAL_CD != "01"){
									
                                    $.ajax({
                                        url : '/api/apiCaptcha.php',
    
                                        data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>' },
                                        type : 'POST',
                                        success : function(){
                                            opener.parent.openStudyModal('<?=$type?>','<?=$contentsCode?>','<?=$lectureOpenSeq?>');
                                            window.close();
                                        }
                                    })
                                    
                                }else{
                                    
                                    $.ajax({
                                        url : '/api/apiCaptcha.php',
                                        data : { 'class_agent_pk': '<?=$contentsCode?>,<?=$lectureOpenSeq?>' },
                                        type : 'POST',
                                        success : function(){
                                            //alert("인증 성공!") //do something(인증 성공 처리)
//                                            opener.parent.studyPop('<?=$studySeq?>','<?=$chapter?>','<?=$_GET[viewNew]?>','Y');
											opener.parent.openStudyDiv('<?=$className?>');
                                            window.close();
                                        }
                                    })
                                    
                                }
                            }
                        });
        }

	</script>


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
				<Div id="hrdOtpFrame" style="width:100%"></Div>
			</Td>
		</Tr>
		<Tr height="50px" style="">
			<Td width="100%">
                <div class="otpVal_wrap_all">
                    <p class="otp_t1"><i class="fas fa-check-circle"></i><span>OTP</span> 비밀번호 입력</p>
                    <div class="otpVal_wrap">
                        <input type="text" id="otpVal" onclick="javascript:showKeypad(this);"/>
                        <input type="button" class="otp_bt2" value="입력확인" onclick="javascript:validateOtp();"/>
                    </div>
                </div>
			</Td>
		</Tr>
	</Table>

    <div style="margin-bottom:30px;">
        <div class="otpVal_wrap_all">
<!--             <p class="otp_t1"><i class="fas fa-check-circle"></i><span>OTP</span> 인증이 불가한 경우(장애발생 등) 캡챠 인증을<br />클릭해 주시기 바랍니다.</p> -->
<!--             <div class="otp_wrap2"> -->
			
<!-- //			if ($type == 'new' || $type == 'study') {  -->
<!-- 				$viewNew = '?chapter='.$chapter.'&viewNew='.$viewNew.'&contentsCode='.$contentsCode.'&lectureOpenSeq='.$lectureOpenSeq.'&className='.$className; -->
<!-- //			} -->
			
<!--             <input type="button" class="otp_bt3" value="캡챠인증" onclick="javascript:window.close();opener.parent.captchaRun('<?=$chkSeq?>','<?=$type?>','captcha.php<?=$viewNew?>');"> -->
<!--             </div> -->
        </div>
        <div class="otpVal_wrap_all">
    		<p class="otp_t1" style=""><i class="fas fa-check-circle"></i><span>OTP</span> 비밀번호 연속 오류(5회이상)인 경우<br />본인인증을 해주시기 바랍니다.</p>
            <div class="otp_wrap3">
    			<input type="hidden" id="otpStatus">
                <input type="button" class="otp_bt4" value="휴대폰 인증" onclick="javascript:fnPopup()">
                <input type="button" class="otp_bt5" value="아이핀 인증" onclick="javascript:fnPopupipin()" style="margin-left:5px;">
            </div>
        </div>
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


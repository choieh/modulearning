<? include '../include/header.php';

// error_reporting(E_ALL);

// ini_set("display_errors", 1);

?>
<?
header("Content-Type:text/html; charset=utf-8;");
$seq = $_GET['seq'];

if(!$_SESSION['loginUserID']) {
    echo "<script>
						alert('로그인이 필요합니다.');
						top.location.href='../main';
					</script>";
    exit;
}
$query = "SELECT * FROM nynCustomPay WHERE seq='".$seq."' AND userID='".$_SESSION['loginUserID']."'";
// echo $query;
// exit;
$result = mysql_query($query);
$rs = mysql_fetch_array($result);


if(!$rs['price']) {
    echo "<script>
							alert('잘못된 접근입니다.');
							top.location.href='../study/customPayList.php';
						</script>";
    exit;
}

if($rs['orderStatus'] == 'Y') {
    echo "<script>
							alert('이미 완료된 결제 입니다.');
							top.location.href='../study/customPayList.php';
						</script>";
    exit;
}



$queryM = "SELECT mobile01, mobile02, mobile03, email01,email02,companyCode FROM nynMember WHERE userID='".$_SESSION['loginUserID']."'";
$resultM = mysql_query($queryM);
$rsM = mysql_fetch_array($resultM);
$mobile = $rsM['mobile01'].$rsM['mobile02'].$rsM['mobile03'];
$email = $rsM['email01'].'@'.$rsM['email02'];

//사업주결제의 경우
if($rs['companyPay'] != "N"){
    $queryC = "SELECT companyName FROM nynCompany WHERE companyCode ='".$rsM['companyCode']."'";
    $resultC = mysql_query($queryC);
    $rsC = mysql_fetch_array($resultC);

    $buyer = $rsC['companyName'];
}else{
    $buyer = $_SESSION['loginUserName'];
}


if(!$seq) {


?>
<script>
    alert("잘못된 접근입니다.");
    top.location.href='../study/customPayList.php';
</script>

    <?
}
?>
<?
// session_start();
    /*
     * [결제 인증요청 페이지(STEP2-1)]
     *
     * 샘플페이지에서는 기본 파라미터만 예시되어 있으며, 별도로 필요하신 파라미터는 연동메뉴얼을 참고하시어 추가 하시기 바랍니다.
     */

    /*
     * 1. 기본결제 인증요청 정보 변경
     *
     * 기본정보를 변경하여 주시기 바랍니다.(파라미터 전달시 POST를 사용하세요)
     */

    $CST_PLATFORM               = "service";                        //토스페이먼츠 결제 서비스 선택(test:테스트, service:서비스)
    $CST_MID                    = "kiraedu";                                    //상점아이디(토스페이먼츠으로 부터 발급받으신 상점아이디를 입력하세요)
                                                                                 //테스트 아이디는 't'를 반드시 제외하고 입력하세요.
    $LGD_MID                    = (("test" == $CST_PLATFORM)?"t":"").$CST_MID;   //상점아이디(자동생성)
    $orderNum = date("ymd").substr(time().md5(microtime()),0,23); //주문번호 생성
    $LGD_OID                    = $orderNum;                             //주문번호(상점정의 유니크한 주문번호를 입력하세요)
    $LGD_AMOUNT                 = $rs['price'];
    // $LGD_AMOUNT                 = $_POST['totalPrice'];
    // $_POST["LGD_AMOUNT"];                          //결제금액("," 를 제외한 결제금액을 입력하세요)
    $LGD_BUYER                  = $buyer;
    // $_POST["LGD_BUYER"];                           //구매자명
    $LGD_PRODUCTINFO            = $rs['orderName'];
    // $_POST["LGD_PRODUCTINFO"];                     //상품명
    $LGD_BUYEREMAIL             = $email01.'@'.$email02;
    // $_POST["LGD_BUYEREMAIL"];                      //구매자 이메일
    $LGD_OSTYPE_CHECK           = "P";                                           //값 P: XPay 실행(PC 결제 모듈): PC용과 모바일용 모듈은 파라미터 및 프로세스가 다르므로 PC용은 PC 웹브라우저에서 실행 필요.
																				 //"P", "M" 외의 문자(Null, "" 포함)는 모바일 또는 PC 여부를 체크하지 않음
    //$LGD_ACTIVEXYN			= "N";											 //계좌이체 결제시 사용, ActiveX 사용 여부로 "N" 이외의 값: ActiveX 환경에서 계좌이체 결제 진행(IE)

    $LGD_CUSTOM_SKIN            = "red";                                         //상점정의 결제창 스킨
    // $LGD_CUSTOM_USABLEPAY       = $_POST["LGD_CUSTOM_USABLEPAY"];        	     //디폴트 결제수단 (해당 필드를 보내지 않으면 결제수단 선택 UI 가 노출됩니다.)
    $LGD_WINDOW_VER		        = "2.5";										 //결제창 버젼정보
    $LGD_WINDOW_TYPE            = "iframe";					 //결제창 호출방식 (수정불가)
    $LGD_CUSTOM_SWITCHINGTYPE   = "IFRAME";            //신용카드 카드사 인증 페이지 연동 방식 (수정불가)
    $LGD_CUSTOM_PROCESSTYPE     = "TWOTR";                                       //수정불가

    /* 가상계좌(무통장) 결제 연동을 하시는 경우 아래 LGD_CASNOTEURL 을 설정하여 주시기 바랍니다. */
    $LGD_CASNOTEURL				= "https://".$_SERVER["HTTP_HOST"]."/payments/cas_noteurl.php";

    /* LGD_RETURNURL 을 설정하여 주시기 바랍니다. 반드시 현재 페이지와 동일한 프로트콜 및  호스트이어야 합니다. 아래 부분을 반드시 수정하십시요. */
    $LGD_RETURNURL				= "https://".$_SERVER["HTTP_HOST"]."/payments/returnurl.php";
    $configPath                 = "/home/kiraedu/payments/lgdacom/";                                  //토스페이먼츠에서 제공한 환경파일("/conf/lgdacom.conf") 위치 지정.

    $LGD_ENCODING				    = "UTF-8";
    $LGD_ENCODING_NOTEURL			= "UTF-8";
    $LGD_ENCODING_RETURNURL			= "UTF-8";
    /*
     *************************************************
     * 2. MD5 해쉬암호화 (수정하지 마세요) - BEGIN
     *
     * MD5 해쉬암호화는 거래 위변조를 막기위한 방법입니다.
     *************************************************
     */
    require_once("../payments/lgdacom/XPayClient.php");
    $xpay = &new XPayClient($configPath, $CST_PLATFORM);
   	$xpay->Init_TX($LGD_MID);
	$LGD_TIMESTAMP = $xpay->GetTimeStamp();
    $LGD_HASHDATA = $xpay->GetHashData($LGD_MID,$LGD_OID,$LGD_AMOUNT,$LGD_TIMESTAMP);

    /*
     *************************************************
     * 2. MD5 해쉬암호화 (수정하지 마세요) - END
     *************************************************
     */

    $payReqMap['CST_PLATFORM']           = $CST_PLATFORM;				// 테스트, 서비스 구분
    $payReqMap['LGD_WINDOW_TYPE']        = $LGD_WINDOW_TYPE;			// 수정불가
    $payReqMap['CST_MID']                = $CST_MID;					// 상점아이디
    $payReqMap['LGD_MID']                = $LGD_MID;					// 상점아이디
    $payReqMap['LGD_OID']                = $LGD_OID;					// 주문번호
    $payReqMap['LGD_BUYER']              = $LGD_BUYER;					// 구매자
    $payReqMap['LGD_PRODUCTINFO']        = $LGD_PRODUCTINFO;			// 상품정보
    $payReqMap['LGD_AMOUNT']             = $LGD_AMOUNT;					// 결제금액
    $payReqMap['LGD_BUYEREMAIL']         = $email01.'@'.$email02;
    // $LGD_BUYEREMAIL;				// 구매자 이메일
    $payReqMap['LGD_CUSTOM_SKIN']        = $LGD_CUSTOM_SKIN;			// 결제창 SKIN
    $payReqMap['LGD_CUSTOM_PROCESSTYPE'] = $LGD_CUSTOM_PROCESSTYPE;		// 트랜잭션 처리방식
    $payReqMap['LGD_TIMESTAMP']          = $LGD_TIMESTAMP;				// 타임스탬프
    $payReqMap['LGD_HASHDATA']           = $LGD_HASHDATA;				// MD5 해쉬암호값
    $payReqMap['LGD_RETURNURL']   		 = $LGD_RETURNURL;				// 응답수신페이지
    $payReqMap['LGD_VERSION']         	 = "PHP_Non-ActiveX_Standard";	// 버전정보 (삭제하지 마세요)
    $payReqMap['LGD_CUSTOM_USABLEPAY']  	= $LGD_CUSTOM_USABLEPAY;	// 디폴트 결제수단
	$payReqMap['LGD_CUSTOM_SWITCHINGTYPE']  = $LGD_CUSTOM_SWITCHINGTYPE;// 신용카드 카드사 인증 페이지 연동 방식
	$payReqMap['LGD_OSTYPE_CHECK']          = "P";        // 값 P: XPay 실행(PC용 결제 모듈), PC, 모바일 에서 선택적으로 결제가능
	//$payReqMap['LGD_ACTIVEXYN']			= $LGD_ACTIVEXYN;			// 계좌이체 결제시 사용,ActiveX 사용 여부
    $payReqMap['LGD_WINDOW_VER'] 			= $LGD_WINDOW_VER;
    $payReqMap['LGD_DOMAIN_URL'] 			= "xpayvvip";
    $payReqMap['LGD_INSTALLRANGE']          = "0:2:3";

    $payReqMap['LGD_ENCODING']           = $LGD_ENCODING;
    $payReqMap['LGD_ENCODING_NOTEURL']   = $LGD_ENCODING_NOTEURL;
    $payReqMap['LGD_ENCODING_RETURNURL'] = $LGD_ENCODING_RETURNURL;


    // 가상계좌(무통장) 결제연동을 하시는 경우  할당/입금 결과를 통보받기 위해 반드시 LGD_CASNOTEURL 정보를 토스페이먼츠에 전송해야 합니다 .
    $payReqMap['LGD_CASNOTEURL'] = $LGD_CASNOTEURL;               // 가상계좌 NOTEURL

    //Return URL에서 인증 결과 수신 시 셋팅될 파라미터 입니다.*/
    $payReqMap['LGD_RESPCODE']           = "";
    $payReqMap['LGD_RESPMSG']            = "";
    $payReqMap['LGD_PAYKEY']             = "";


    $_SESSION['PAYREQ_MAP'] = $payReqMap;

?>

<!-- test일 경우 -->
<!-- <script language="javascript" src="https://pretest.tosspayments.com:9443/xpay/js/xpay_crossplatform.js" type="text/javascript"></script> -->
<!-- service일 경우 아래 URL을 사용 -->
<script language="javascript" src="https://xpayvvip.tosspayments.com/xpay/js/xpay_crossplatform.js" type="text/javascript"></script>

<script type="text/javascript" charset="utf-8">

/*
* 수정불가.
*/
	var LGD_window_type = '<?= $LGD_WINDOW_TYPE ?>';

/*
* 수정불가
*/
function launchCrossPlatform(){
	lgdwin = openXpay(document.getElementById('LGD_PAYINFO'), '<?= $CST_PLATFORM ?>', LGD_window_type, null, "", "");
}
/*
* FORM 명만  수정 가능
*/
function getFormObject() {
        return document.getElementById("LGD_PAYINFO");
}

/*
 * 인증결과 처리
 */
function payment_return() {
	var fDoc;

		fDoc = lgdwin.contentWindow || lgdwin.contentDocument;


	if (fDoc.document.getElementById('LGD_RESPCODE').value == "0000") {

			document.getElementById("LGD_PAYKEY").value = fDoc.document.getElementById('LGD_PAYKEY').value;
			document.getElementById("LGD_PAYINFO").target = "_self";
			document.getElementById("LGD_PAYINFO").action = "payres.php";
			document.getElementById("LGD_PAYINFO").submit();
	} else {
        var resCode = fDoc.document.getElementById('LGD_RESPCODE').value;
        if(resCode == 'S053'){
            alert('결제가 취소되었습니다.');
            closeIframe();
        }else{
            closeIframe();
        }
		console.log("LGD_RESPCODE (결과코드) : " + fDoc.document.getElementById('LGD_RESPCODE').value + "\n" + "LGD_RESPMSG (결과메시지): " + fDoc.document.getElementById('LGD_RESPMSG').value);
        // closeIframe();
        // window.history.back();
	}
}


</script>
<script>
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
	document.getElementById("LGD_OID").value = "kira_" + timeValue;
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
</script>



<form method="post" id="PAYINFO" action="customPay.php?seq=<?=$seq?>" style="display:none;">
    <input type="hidden" name="CST_MID" id="CST_MID" value="kiraedu"/>
    <!-- <input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO" value=""/> -->
    <!-- <input type="hidden" name="LGD_OID" id="LGD_OID" value="test_1234567890020"/> -->
    <!-- <input type="hidden" name="LGD_TIMESTAMP" id="LGD_TIMESTAMP" value="1234567890"/> -->
    <input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_CUSTOM_USABLEPAY" value="SC0010"/>
    <input type="hidden" name="LGD_WINDOW_TYPE" id="LGD_WINDOW_TYPE" value="iframe"/>
    <!-- <input type="hidden" name="LGD_BUYER" id="LGD_BUYER" value=""/> -->
    <!-- <input type="hidden" name="CST_PLATFORM" id="CST_PLATFORM" value="test"/> -->
    <!-- <input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL" value=""/> -->
    <!-- <input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT" value=""/> -->
</form>

<form method="post" name="LGD_PAYINFO" id="LGD_PAYINFO" action="payres.php">
<input type="hidden" name="userID" id="userID" value="'<?=$_SESSION['loginUserID']?>'"/>
<input type="hidden" name="paySeq" id="paySeq" value="'<?=$seq?>'"/>


<?php
  foreach ($payReqMap as $key => $value) {
    echo "<input type='hidden' name='$key' id='$key' value='$value'>";
  }
//   var_dump($_SESSION);
?>
</form>
<script>launchCrossPlatform();</script>

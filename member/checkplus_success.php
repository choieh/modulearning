
<?
header("Access-Control-Allow-Origin: *"); //allow cross origin
include '../lib/global.php'
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>NICE평가정보 - CheckPlus 본인인증</title>
</head>
<script type="text/javascrpt" src="../js/jquery-1.11.2.min.js" ></script>
<?
    //**************************************************************************************************************
    //NICE평가정보 Copyright(c) KOREA INFOMATION SERVICE INC. ALL RIGHTS RESERVED

    //서비스명 :  체크플러스 - 안심본인인증 서비스
    //페이지명 :  체크플러스 - 결과 페이지

    //보안을 위해 제공해드리는 샘플페이지는 서비스 적용 후 서버에서 삭제해 주시기 바랍니다.
    //**************************************************************************************************************

		/*****************************
	  //아파치에서 모듈 로드가 되지 않았을경우 동적으로 모듈을 로드합니다.

		if(!extension_loaded('CPClient')) {
			dl('CPClient.' . PHP_SHLIB_SUFFIX);
		}
		$module = 'CPClient';
		*****************************/

    $sitecode = "BF402";					// NICE로부터 부여받은 사이트 코드
    $sitepasswd = "YHFCAUOoNO1P";				// NICE로부터 부여받은 사이트 패스워드

    /*$enc_data = $_REQUEST["EncodeData"];		// 암호화된 결과 데이타
    $sReserved1 = $_REQUEST['param_r1'];
	$sReserved2 = $_REQUEST['param_r2'];
	$sReserved3 = $_REQUEST['param_r3'];*/

	// 크롬 80버전 이상부터는 GET으로 받아야 함
    $enc_data = $_GET["EncodeData"];		// 암호화된 결과 데이타
    $sReserved1 = $_GET['param_r1'];
	$sReserved2 = $_GET['param_r2'];
	$sReserved3 = $_GET['param_r3'];

	// 크롬 80이하 또는 타 브라우저인 경우 POST로 받음
	if($enc_data == '') {
		$enc_data = $_POST["EncodeData"];		// 암호화된 결과 데이타
		$sReserved1 = $_POST['param_r1'];
		$sReserved2 = $_POST['param_r2'];
		$sReserved3 = $_POST['param_r3'];
	}

		//////////////////////////////////////////////// 문자열 점검///////////////////////////////////////////////
    if(preg_match('~[^0-9a-zA-Z+/=]~', $enc_data, $match)) {echo "입력 값 확인이 필요합니다 : ".$match[0]; exit;} // 문자열 점검 추가.
    if(base64_encode(base64_decode($enc_data))!=$enc_data) {echo "입력 값 확인이 필요합니다"; exit;}

    if(preg_match("/[#\&\\+\-%@=\/\\\:;,\.\'\"\^`~\_|\!\/\?\*$#<>()\[\]\{\}]/i", $sReserved1, $match)) {echo "문자열 점검 : ".$match[0]; exit;}
    if(preg_match("/[#\&\\+\-%@=\/\\\:;,\.\'\"\^`~\_|\!\/\?\*$#<>()\[\]\{\}]/i", $sReserved2, $match)) {echo "문자열 점검 : ".$match[0]; exit;}
    if(preg_match("/[#\&\\+\-%@=\/\\\:;,\.\'\"\^`~\_|\!\/\?\*$#<>()\[\]\{\}]/i", $sReserved3, $match)) {echo "문자열 점검 : ".$match[0]; exit;}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////

    if ($enc_data != "") {

				//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
					$plaindata = get_decode_data($sitecode, $sitepasswd, $enc_data);// 암호화된 결과 데이터의 복호화
				//} else {
				//	$plaindata = "Module get_response_data is not compiled into PHP";
				//}

        //echo "[plaindata]  " . $plaindata . "<br>";
				//echo $_SESSION["REQ_SEQ"];  //2017.11.10 강혜림 (주민번호, 아이디 정보가 나온다하여 주석처리)
				//echo $_SESSION["loginUserID"];
        if ($plaindata == -1){
            $returnMsg  = "암/복호화 시스템 오류";
        }else if ($plaindata == -4){
            $returnMsg  = "복호화 처리 오류";
        }else if ($plaindata == -5){
            $returnMsg  = "HASH값 불일치 - 복호화 데이터는 리턴됨";
        }else if ($plaindata == -6){
            $returnMsg  = "복호화 데이터 오류";
        }else if ($plaindata == -9){
            $returnMsg  = "입력값 오류";
        }else if ($plaindata == -12){
            $returnMsg  = "사이트 비밀번호 오류";
        }else{
            $resultNumber = '000000';
            // 복호화가 정상적일 경우 데이터를 파싱합니다.

            $requestnumber = GetValue($plaindata , "REQ_SEQ");
            $responsenumber = GetValue($plaindata , "RES_SEQ");
            $authtype = GetValue($plaindata , "AUTH_TYPE");
            $name = GetValue($plaindata , "NAME");
            $name = iconv("euckr", "utf-8", $name);
            $birthdate = GetValue($plaindata , "BIRTHDATE");
            $gender = GetValue($plaindata , "GENDER");
            $nationalinfo = GetValue($plaindata , "NATIONALINFO");	//내/외국인정보(사용자 매뉴얼 참조)
            $dupinfo = GetValue($plaindata , "DI");
            $conninfo = GetValue($plaindata , "CI");
            $mobile_no = GetValue($plaindata , "MOBILE_NO"); //휴대폰번호 리턴 : 나신평에 휴대폰번호 리턴파라미터 요청

            if(strcmp($_SESSION["REQ_SEQ"], $requestnumber) != 0)
            {
            	/*echo "세션값이 다릅니다. 올바른 경로로 접근하시기 바랍니다.<br>";
                $requestnumber = "";
                $responsenumber = "";
                $authtype = "";
                $name = "";
            		$birthdate = "";
            		$gender = "";
            		$nationalinfo = "";
            		$dupinfo = "";
            		$conninfo = "";
								*/
            $requestnumber = GetValue($plaindata , "REQ_SEQ");
            $responsenumber = GetValue($plaindata , "RES_SEQ");
            $authtype = GetValue($plaindata , "AUTH_TYPE");
            $name = GetValue($plaindata , "NAME");
            $name = iconv("euckr", "utf-8", $name);
            $birthdate = GetValue($plaindata , "BIRTHDATE");
            $gender = GetValue($plaindata , "GENDER");
            $nationalinfo = GetValue($plaindata , "NATIONALINFO");	//내/외국인정보(사용자 매뉴얼 참조)
            $dupinfo = GetValue($plaindata , "DI");
            $conninfo = GetValue($plaindata , "CI");
            }
        }
    }
?>

<?
	function GetValue($str , $name)
    {
        $pos1 = 0;  //length의 시작 위치
        $pos2 = 0;  //:의 위치

        while( $pos1 <= strlen($str) )
        {
            $pos2 = strpos( $str , ":" , $pos1);
            $len = substr($str , $pos1 , $pos2 - $pos1);
            $key = substr($str , $pos2 + 1 , (int)$len);
            $pos1 = $pos2 + (int)$len + 1;
            if( $key == $name )
            {
                $pos2 = strpos( $str , ":" , $pos1);
                $len = substr($str , $pos1 , $pos2 - $pos1);
                $value = substr($str , $pos2 + 1 , (int)$len);
                return $value;
            }
            else
            {
                // 다르면 스킵한다.
                $pos2 = strpos( $str , ":" , $pos1);
                $len = substr($str , $pos1 , $pos2 - $pos1);
                $pos1 = $pos2 + (int)$len + 1;
            }
        }
    }


?>
<script language="javascript">

var userName = '<?= $name ?>';
var userBirth = '<?= $birthdate ?>';
var sex = '<?= $gender ?>';
var mobile_no = '<?=$mobile_no?>';

var m_retCD = '<?=$resultNumber?>';
var m_trnID = '<?=$responsenumber?>';
var m_trnDT = '<?=$inputDate?>';
var authType = '<?=$authtype?>';

//	opener.parent.mobileCheck(userName,userBirth,sex);
    try{
        opener.parent.mobileCheck(userName,userBirth,sex,m_retCD,m_trnID,m_trnDT,mobile_no,authType);
        window.open('','_self').close();
    } catch(e) {
        alert("오류발생 : " + e.message + location.hostname);
    }



</script>
<body>
<!--
    <center>
    <p><p><p><p>
    본인인증이 완료 되었습니다.<br>
    <table border=1>

        <tr>
            <td>요청 번호</td>
            <td><?= $requestnumber ?></td>
        </tr>
        <tr>
            <td>나신평응답 번호</td>
            <td><?= $responsenumber ?></td>
        </tr>
        <tr>
            <td>인증수단</td>
            <td><?= $authtype ?></td>
        </tr>
                <tr>
            <td>성명</td>
            <td><?= $name ?></td>
        </tr>
                <tr>
            <td>생년월일</td>
            <td><?= $birthdate ?></td>
        </tr>
                <tr>
            <td>성별</td>
            <td><?= $gender ?></td>
        </tr>
                <tr>
            <td>내/외국인정보</td>
            <td><?= $nationalinfo ?></td>
        </tr>
                <tr>
            <td>DI(64 byte)</td>
            <td><?= $dupinfo ?></td>
        </tr>
                <tr>
            <td>CI(88 byte)</td>
            <td><?= $conninfo ?></td>
        </tr>
        <tr>
          <td>RESERVED1</td>
          <td><?= $sReserved1 ?></td>
	      </tr>
	      <tr>
	          <td>RESERVED2</td>
	          <td><?= $sReserved2 ?></td>
	      </tr>
	      <tr>
	          <td>RESERVED3</td>
	          <td><?= $sReserved3 ?></td>
	      </tr>
    </table>
    </center>
-->
</body>
</html>

<?
header("Cache-Control: no-cache"); //# 캐쉬를 사용 안함
header("Pragma: no-cache");  //# 캐시를 사용 안함

$hostName = "222.239.119.8";
$DBuserName = "kiraedu";
$dbName = "kiradb";
$userPassword = "kira@185";
$bd = mysql_connect($hostName, $DBuserName, $userPassword) or die("db connect error");
mysql_select_db($dbName, $bd) or die("db connect errors");
mysql_query("set session character_set_connection=utf8;");
mysql_query("set session character_set_results=utf8;");
mysql_query("set session character_set_client=utf8;");

$emma_host = "222.239.119.8";
$emma_user = "kiraedu";
$emma_db = "emma";
$emma_passwd = "kira@185";

//카카오 알림톡
$kakao_host = "182.162.70.183";
$kakao_user = "tok_nayanet";
$kakao_db = "nayanet_tok";
$kakao_passwd = "nynadmin12#$";
?>
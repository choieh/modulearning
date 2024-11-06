<?
header("Cache-Control: no-cache"); //# 캐쉬를 사용 안함
header("Pragma: no-cache");  //# 캐시를 사용 안함

$hostName="222.239.119.8";
$DBuserName="kiraedu";
$dbName="kiradb";
$userPassword="kira@185";
// error 발생 시에 출력
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli($hostName, $DBuserName, $userPassword,$dbName) or die("db connect error");
$mysqli->query("set session character_set_connection=utf8;");
$mysqli->query("set session character_set_results=utf8;");
$mysqli->query("set session character_set_client=utf8;");

/*
usage prepare
    $stmt = $mysqli->prepare("Insert into nynSiteManager (service, code, url, name, phone, email, comment, regDate) values (?, ?, ?, ?, ?, ?, ?, now())");
    $stmt->bind_param("sssssss",$manager["service"],$manager["code"] ,$manager["url"],$manager["name"],$manager["phone"],$manager["email"],$manager["comment"]);
    $stmt->execute();
    -- when use select query
    $result = $selectStmt->get_result();            
    $results = $result->fetch_assoc();              // return array();          a row
    $results = $result->fetch_all(MYSQLI_ASSOC);    // return array( array() ); rows
    --
    $stmt->close();
    $mysqli->close();




usage mysqli
    $result=$mysqli->query("select idx,service,url,name,phone,email,comment,regDate from nynSiteManager where enable=1 order by idx");
    $managerList=$result->fetch_all(MYSQLI_ASSOC); //return array;
*/

$emma_host="222.239.119.8";
$emma_user="kiraedu";
$emma_db="emma";
$emma_passwd="kira@185";

//카카오 알림톡
$kakao_host   ="182.162.70.183";
$kakao_user   ="tok_nayanet";
$kakao_db     ="nayanet_tok";
$kakao_passwd ="nynadmin12#$";
?>

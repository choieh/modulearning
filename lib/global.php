<?php
define('DEV_IP', '115.93.211.44', true);
$PHP_SELF = $_SERVER['PHP_SELF'];
$PathUrls = urlencode($PHP_SELF);  // 현재 경로 encode
$PATH = explode("/",$PHP_SELF);
$method = $_SERVER["REQUEST_METHOD"]; // method 식별
date_default_timezone_set('Asia/Seoul');
$inputDate = date('Y-m-d H:i:s'); // 현재 시간
$userIP = $_SERVER["REMOTE_ADDR"]; // IP 출력
$searchType = "";
$searchType = $_GET["searchType"]; // 검색 요청 타입
$searchValue = $_GET["searchValue"]; // 검색 요청 값
$sortType = $_GET["sortType"]; // 정렬 타입
$sortValue = $_GET["sortValue"]; // 정렬 차순
$list = $_GET["list"]; // 리스트
$page = $_GET["page"]; // 페이지

$CompanyID = "kira"; // 회사코드
$_siteName = "모두의러닝"; // 사이트명
$_siteURL = "modulearning.kr"; // 도메인
$_adminMail = "kiraedu@".$_siteURL; // 관리자 메일
$_studyMail = "kira@".$_siteURL; // 수강관리 메일
$_csPhone = "1544-9335";  // 고객센터 전화번호
$_csFax = "02-6084-2015";  // 팩스
$_smsNumber = "15449335";  // 문자 발신번호
$_companyCode = "272-81-01049";  // 사업자번호
$_ceo = "이영신";
$_address = "(08506) 서울특별시 금천구 가산디지털1로 75-15, 하우스디와이즈타워 621~625호";
$_emonID = "kiraedu";
$_remoteURL = "939.co.kr"; // 원격지원 URL
$_mainContentsEA = "3";  // 대표과정 선정 수
$_kakaoSenderKey= "60ee58574823342f90c52d751b8a5cedeb201d70"; //카카오알림톡 발신키
$_encrypt = "9Fj7Xk3pE5";  //개인정보암호화코드

// 토스 은행코드
$tossBankCode = [
	'39' => '경남은행',
	'34' => '광주은행',
	'12' => '단위농협',
	'32' => '부산은행',
	'45' => '새마을금고',
	'64' => '산림조합',
	'88' => '신한은행',
	'48' => '신협',
	'27' => '씨티은행',
	'20' => '우리은행',
	'71' => '우체국예금보험',
	'50' => '저축은행중앙회',
	'37' => '전북은행',
	'35' => '제주은행',
	'90' => '카카오뱅크',
	'92' => '토스뱅크',
	'81' => '하나은행',
	'54' => '홍콩상하이은행',
	'03' => 'IBK기업은행',
	'06' => 'KB국민은행',
	'31' => 'DGB대구은행',
	'02' => 'KDB산업은행',
	'11' => 'NH농협은행',
	'23' => 'SC제일은행',
	'07' => 'Sh수협은행',
];

// 토스 api key
$testClientKey = 'test_ck_kZLKGPx4M3MovOJZ4qwrBaWypv1o';
$testSecretKey = 'test_sk_JQbgMGZzorzBxOvgJeDrl5E1em4d';

$liveClientKey = 'live_ck_LBa5PzR0ArnaxGYapPNVvmYnNeDM';
$liveSecretKey = 'live_sk_Wd46qopOB89p9NLp7dYrZmM75y0v';

//산인공 API_KEY
$hrdKey = 'FyHGf/jMwL8WtbswEmF4Sszt0l6DAoDWWNqM2Pyp1OE=';

//발송관련 New_다이렉트센드
$_dMail = "modulearning@modulearning.kr";
$_dName = "모두의러닝";
$_dUser = "modu2105";
$_dKey  = "MnwMAr9xEY14tnr";

//팝빌
$_LinkID = 'MODUGROUP';  //링크아이디
$_SecretKey = 'cBOQp8k4tjPJAM5k9arjY9pdd7br6WjAgsx8s/L1ukg=';  //발급 비밀키
$_CorpNum = '2098801773'; //사업자번호

//세션 관련 설정
$SesstionTimeOutMAX = 60 * 60 * 10;
$SesstionTimeOutMIN = 60 * 60 * 10;
$maxlifetime = $SesstionTimeOutMAX;
$minlifetime = $SesstionTimeOutMIN;

//======= sso연동 ==========================================

//sso연동 허용할 도메인 목록
$_allowedDomains = array(
	'ekcls.kr',
	'krcls.kr',
	'alpaedu.co.kr'
);

//연동고객 키 관리 (20자리랜덤)
$ssoKeySet = array(
	"AXAAVFjYN1oKANuA1HSW" => "alpaco", //알파코
	"3G8j7F6k9L1D4z2Q0s5P" => "edua", //에듀에이교육원
	"Ej7mW6PnQ3a2kVx8Z9Iy" => "novusmay", //노버스메이
	"OBlAidk6DPlyBTpcc1ze" => "cnbplus", //씨앤비플러스
    "HBKIZKusBpFXLuhfeM0Y" => "ekcls",
	"IMFmdonHJWDxEGF8RdYw" => "bitcampus" //비트캠퍼스
);

//=========================================================
?>

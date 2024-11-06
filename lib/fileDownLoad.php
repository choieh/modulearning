<?

header("Content-Type: text/html; charset=UTF-8");
//header("Cache-Control: private");
// 2017-10-13 추가 수정
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
ini_set("memory_limit", "512M"); // 231215 용량 업글

$fileName =  $_GET['fileName'];
$link = $_GET['link'];

// 20230125 dhk - request deny for filedownload attack
if(preg_match("/\.php|\.\./i", $link)){
	die();
}

preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
if(count($matches)<2){
	preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT'], $matches);
}
if (count($matches)>1){ 
	$version = $matches[1];//$matches변수값이 있으면 IE브라우저
	
	// 2017-10-13 주석처리
	// $link = iconv("utf-8", "euc-kr", $link);

	// 파일명만 한글로 변환
	//  $fileName = iconv("utf-8", "euc-kr",   $fileName);

	// ======== 2017-10-30 추가 수정 ================================================
	// /frontScript/boardView.js  의 241 줄 확인 ~!!!!
	$fileName = rawurlencode($fileName);
} else {
	$fileName = '"' . addslashes($fileName) . '"';
}


$link = $_SERVER['DOCUMENT_ROOT'].$link;

// zip파일 다운로드 오류 관련 추가 241015 박수정
$fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
if ($fileExtension == 'zip') {
    $fileName = rawurlencode($fileName);
}

if(eregi("(MSIE 5.0|MSIE 5.1|MSIE 5.5|MSIE 6.0)", $_SERVER["HTTP_USER_AGENT"])){ 
	 Header("Content-type: application/octet-stream");    
	 Header("Content-Length: ".filesize($link));     
	 header("Content-Disposition: attachment; filename=" . basename($fileName));
	 Header("Content-Transfer-Encoding: binary");     
	 header('Pragma: private');   
	 Header("Expires: 0");   
} else { 
	 Header("Content-type: file/unknown");     
	 Header("Content-Length: ".filesize($link)); 
	 header("Content-Disposition: attachment; filename=" . basename($fileName));
	 Header("Content-Description: PHP3 Generated Data"); 
	 Header("Pragma: no-cache"); 
	 Header("Expires: 0"); 
} 

$fp = fopen($link, "r"); 
if (!fpassthru($fp)) fclose($fp); 
?>
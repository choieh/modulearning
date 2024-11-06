<?php
//암호화 복호화
function encrypt($string, $key)
{
    $result = '';
    for ($i = 0; $i < strlen($string); $i++) {
        $char = substr($string, $i, 1);
        $keychar = substr($key, ($i % strlen($key)) - 1, 1);
        $char = chr(ord($char) + ord($keychar));
        $result .= $char;
    }
    return base64_encode($result);
}

function decrypt($string, $key)
{
    $result = '';
    $string = base64_decode($string);
    for ($i = 0; $i < strlen($string); $i++) {
        $char = substr($string, $i, 1);
        $keychar = substr($key, ($i % strlen($key)) - 1, 1);
        $char = chr(ord($char) - ord($keychar));
        $result .= $char;
    }
    return $result;
}

//$encrypted = encrypt("1234561234567", "nayanet@2010");
//$decrypted = decrypt("$encrypted", "nayanet@2010");

### 랜덤 코드 생성 (패스워드 초기화 및 과정코드 생성)
function generateRenStr($length, $type)
{
    $characters01 = "0123456789";
    $characters02 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    if ($type == "C") {  // C:contents, P:password
        $characters = $characters02;
    } else {
        $characters = $characters01;
    }

    $random_str = "";
    $loopNum = $length;
    while ($loopNum--) {
        $random_str .= $characters[mt_rand(0, strlen($characters))];
    }
    if (strlen($random_str) != 6) {
        $num = 6 - strlen($random_str);
        for ($i = 0; $i < $num; $i++) {
            $random_str = $random_str . "0";
        }
    }
    return $random_str;
}

### thumbnail 저장 함수
### 예) make_thumbnail($_SERVER['DOCUMENT_ROOT']."/attach/product/3_nell.jpg", 90, 80, $_SERVER['DOCUMENT_ROOT']."/attach/product/thumbnail.jpg");
function make_thumbnail($source_path, $width, $height, $thumbnail_path)
{
    list($img_width, $img_height, $type) = getimagesize($source_path);
    if ($type != 1 && $type != 2 && $type != 3 && $type != 15) return;
    if ($type == 1) $img_sour = imagecreatefromgif($source_path);
    else if ($type == 2) $img_sour = imagecreatefromjpeg($source_path);
    else if ($type == 3) $img_sour = imagecreatefrompng($source_path);
    else if ($type == 15) $img_sour = imagecreatefromwbmp($source_path);
    if ($img_width > $img_height) {
        $w = round($height * $img_width / $img_height);
        $h = $height;
        $x_last = round(($w - $width) / 2);
        $y_last = 0;
    } else {
        $w = $width;
        $h = round($width * $img_height / $img_width);
        $x_last = 0;
        $y_last = round(($h - $height) / 2);
    }
    if ($img_width < $width && $img_height < $height) {
        $img_last = imagecreatetruecolor($width, $height);
        $x_last = round(($width - $img_width) / 2);
        $y_last = round(($height - $img_height) / 2);

        imagecopy($img_last, $img_sour, $x_last, $y_last, 0, 0, $w, $h);
        imagedestroy($img_sour);
        $white = imagecolorallocate($img_last, 255, 255, 255);
        imagefill($img_last, 0, 0, $white);
    } else {
        $img_dest = imagecreatetruecolor($w, $h);
        imagecopyresampled($img_dest, $img_sour, 0, 0, 0, 0, $w, $h, $img_width, $img_height);
        $img_last = imagecreatetruecolor($width, $height);
        imagecopy($img_last, $img_dest, 0, 0, $x_last, $y_last, $w, $h);
        imagedestroy($img_dest);
    }
    if ($thumbnail_path) {
        if ($type == 1) imagegif($img_last, $thumbnail_path, 100);
        else if ($type == 2) imagejpeg($img_last, $thumbnail_path, 100);
        else if ($type == 3) imagepng($img_last, $thumbnail_path, 9);
        else if ($type == 15) imagebmp($img_last, $thumbnail_path, 100);
    } else {
        if ($type == 1) imagegif($img_last);
        else if ($type == 2) imagejpeg($img_last);
        else if ($type == 3) imagepng($img_last);
        else if ($type == 15) imagebmp($img_last);
    }
    imagedestroy($img_last);
}


### sms emma insert 함수
function insert_emma($receivePhone, $sendPhone, $message, $sendTime)
{

    global $emma_host, $emma_user, $emma_db, $emma_passwd;

    $emmaConnect = mysql_connect($emma_host, $emma_user, $emma_passwd) or die("db connect error");
    $conn2 = mysql_select_db($emma_db, $emmaConnect) or die("db select error");
    mysql_query("set session character_set_connection=utf8;");
    mysql_query("set session character_set_results=utf8;");
    mysql_query("set session character_set_client=utf8;");

    if (!$sendTime) {
        $sendTimeQ = " date_client_req=now(), ";
    } else {
        $sendTimeQ = " date_client_req='" . $sendTime . "', ";
    }

    if (strlen(iconv('UTF-8', 'CP949', $message)) <= 90) { // sms(단문) 발송
        $SMSQ = " INSERT INTO em_smt_tran SET	" . $sendTimeQ . "
									content='" . $message . "',
									callback='" . $sendPhone . "',
									service_type='0',
									broadcast_yn='N',
									msg_status='1',
									recipient_num='" . $receivePhone . "'";
    } else { // lms(장문) 발송
        $SMSQ = " INSERT INTO em_mmt_tran SET	" . $sendTimeQ . "
									subject='온라인교육 학습안내',
									content='" . $message . "',
									attach_file_group_key='0',
									callback='" . $sendPhone . "',
									service_type='3',
									broadcast_yn='N',
									msg_status='1',
									recipient_num='" . $receivePhone . "'";
    }
    mysql_query($SMSQ, $emmaConnect);
    mysql_close($emmaConnect);
    return;
}

### sms kakao insert 함수
function insert_kakao_sms($receivePhone, $sendPhone, $message, $sendTime, $userName = null, $companyName = null)
{

    global $kakao_host, $kakao_user, $kakao_db, $kakao_passwd;

    $kakaoConnect = mysql_connect($kakao_host, $kakao_user, $kakao_passwd) or die("db connect error");
    $conn2 = mysql_select_db($kakao_db, $kakaoConnect) or die("db select error");
    mysql_query("set session character_set_connection=utf8;");
    mysql_query("set session character_set_results=utf8;");
    mysql_query("set session character_set_client=utf8;");

    if (!$sendTime) {
        $sendTimeQ = " TRAN_DATE = now(), ";
    } else {
        $sendTimeQ = " TRAN_DATE = '" . $sendTime . "', ";
    }

    if (strlen(iconv('UTF-8', 'CP949', $message)) <= 90) {
        $TRAN_TABLE = "MTS_SMS_MSG";
    } else {
        $TRAN_TABLE = "MTS_MMS_MSG";
        $TRAN_TYPE = "TRAN_TYPE = 4, TRAN_SUBJECT ='모두의러닝', ";
    }

    //$SMSQ = " insert into ".$TRAN_TABLE."(TRAN_PHONE,TRAN_CALLBACK,TRAN_MSG,TRAN_DATE) values (".$receivePhone.",".$sendPhone.",".$message.",".$sendTimeQ.")";
    $SMSQ = "INSERT INTO " . $TRAN_TABLE . " SET	" . $sendTimeQ . "
								TRAN_ID='104',
								TRAN_CALLBACK ='" . $sendPhone . "',
								TRAN_PHONE ='" . $receivePhone . "',
								TRAN_MSG ='" . $message . "',
								" . $TRAN_TYPE . "
								TRAN_ETC3 = now(),
								TRAN_STATUS ='1',
								TRAN_ETC1 ='" . $userName . "',
								TRAN_ETC2 ='" . $companyName . "'";
    //echo $SMSQ;exit;
    mysql_query($SMSQ, $kakaoConnect);
    mysql_close($kakaoConnect);
    return;
}

### kakao atalk insert 함수
function insert_kakaoAtalk($receivePhone, $sendPhone, $message, $sendTime, $userName, $companyName, $template)
{

    global $kakao_host, $kakao_user, $kakao_db, $kakao_passwd;

    $kakaoConnect = mysql_connect($kakao_host, $kakao_user, $kakao_passwd) or die("db connect error");
    $conn2 = mysql_select_db($kakao_db, $kakaoConnect) or die("db select error");
    mysql_query("set session character_set_connection=utf8;");
    mysql_query("set session character_set_results=utf8;");
    mysql_query("set session character_set_client=utf8;");

    if (!$sendTime) {
        $sendTimeQ = " TRAN_DATE = now(), ";
    } else {
        $sendTimeQ = " TRAN_DATE = '" . $sendTime . "', ";
    }

    if (strlen(iconv('UTF-8', 'CP949', $message)) <= 90) {
        $TRAN_TYPE = "S";
    } else {
        $TRAN_TYPE = "L";
    }

    $SMSQ = " INSERT INTO MTS_ATALK_MSG SET	" . $sendTimeQ . "
								TRAN_ID='104',
								TRAN_SENDER_KEY ='60ee58574823342f90c52d751b8a5cedeb201d70',
								TRAN_TMPL_CD ='" . $template . "',
								TRAN_CALLBACK ='" . $sendPhone . "',
								TRAN_PHONE ='" . $receivePhone . "',
								TRAN_SUBJECT ='모두의러닝',
								TRAN_MSG ='" . $message . "',
								TRAN_TYPE ='5',
								TRAN_ETC3 = now(),
								TRAN_STATUS ='1',
								TRAN_REPLACE_TYPE ='" . $TRAN_TYPE . "',
								TRAN_ETC1 ='" . $userName . "',
								TRAN_ETC2 ='" . $companyName . "',
								TRAN_REPLACE_MSG ='" . $message . "'";

    mysql_query($SMSQ, $kakaoConnect);
    mysql_close($kakaoConnect);
//	print_r($result);
}


//#########################################################################################################
//*  웹메일 함수
//#########################################################################################################
/*
$var[usernm] 이름  #name#
$var[userid] 아이디 #id#
$var[phone]  핸드폰 #phone#
$var[pass]   패스워드 #pass#
$var[home]   홈페이지 #home#

$var[content] 내용 #content#
$var[reply]   답변 #reply#
$var[title]   제목 #title#
$var[gubun]   구분 #gubun#
$var[state]   처리상태 #state#

위 치환값은 얼마든지 추가할 수 있다.
$var[이름] 형태로 메일발송부분에 넣어주고...
발송되는 출력파일에서는 #이름# 형태로 넣어주면 되니까.
출력용 파일은 mail 디렉토리를 참조하시오

$files  실제첨부파일
$filenames 첨부파일명

$filepath 출력용 html 파일을 첨부할때 서버절대경로위치 로
*/

function mail_fsend($tos, $froms, $subject, $message, $addtion_header, $files, $filenames, $filepath, $var = array())
{

    //$files: 는 서버내의 파일을 지목할 때 사용
    //============================================== 기초 설정
    $boundary = "----=b" . md5(uniqid(time()));
    if (is_array($addtion_header)) {
        $content_type = $addtion_header['content_type'];    //기본내용형식 : 일반 text
    }
    if (empty($content_type)) $content_type = 'text/html';
    if (is_array($addtion_header)) {
        $char_set = $addtion_header['char_set'];
    }
    if (empty($char_set)) $char_set = 'utf-8';

    //=====================================================to 설정
    if (is_string($tos)) {
        $to = $tos;
    } else if (is_array($tos)) {
        $to = implode(', ', $tos);
    }
    //=====================================================subject 설정
    if (empty($subject)) {
        $subject = 'No title ' . date('Y-m-d H:i:s');
    }
    $subject = '=?utf-8?B?' . base64_encode($subject) . '?=';
    //$subject = '=?EUC-KR?B?'.base64_encode($subject).'?=';
    //$subject = '=?'.$char_set.'?B?'.base64_encode($subject).'?=';

    //=====================================================해더 설정

    $headers = array();
    $headers['mime_version'] = 'MIME-Version: 1.0';
    //$headers['content_type']="Content-type: multipart/alternative; boundary=\"{$boundary}\"";
    $headers['content_type'] = "Content-type: multipart/mixed; boundary=\"{$boundary}\"";

    if (!empty($addtion_header['from'])) {
        $headers[] = "From: " . $addtion_header['from'];
    } else {
        $headers[] = "From: " . $froms;
    }

    if (!empty($addtion_header['cc'])) {
        $headers[] = "cc: " . $addtion_header['cc'];
    }
    if (!empty($addtion_header['bcc'])) {
        $headers[] = "Bcc: " . $addtion_header['bcc'];
    }
    if (!empty($headers)) {
        $header = implode("\r\n", $headers) . "\r\n";
    } else {
        $header = '';
    }

    //======================================================== 메세지 인코딩
    $msg_content_type = "Content-type: {$content_type}; charset={$char_set}";

    $msg = '';

    //html 을 내용으로 발송시..$message 값은 무시한다.
    if ($filepath != "") {

        $fp = @fopen($filepath, "r");
        if ($fp) {
            $message = fread($fp, filesize($filepath));
            fclose($fp);
        }

        if ($var) {
            foreach ($var as $key => $val) {
                if ($key) { //혹시 키값 없이 입력된 것은 제외하자..
                    $chVal = "#" . $key . "#";
                    $message = str_replace($chVal, $val, $message);
                }
            }
        }

    }

    $msg .= mail_fsend_enc_msg($boundary, $message, $msg_content_type); //본문 메세지 처리
    //======================================================== 업로드 되는 첨부파일 인코딩

    if ($files != "") {
        $msg .= mail_fsend_enc_file($boundary, $files, $filenames, $var); //첨부파일 처리
    }
    //}
    /* 파일 여러개 첨부시..
        if(!empty($_FILES)){
            foreach($_FILES as $key=> $value){            $t = $key; break;        }
            $t_files = $_FILES[$t]['tmp_name'];
            $t_filenames = $_FILES[$t]['name'];
            $t_error = $_FILES[$t]['error'];
            if(!is_array($t_files)){$t_files=array($t_files);}
            if(!is_array($t_filenames)){$t_filenames=array($t_filenames);}
            if(!is_array($t_error)){$t_error=array($t_error);}
            for($i =0,$m=count($t_files);$i<$m;$i++){
                if($t_error[$i]==0){
                    $msg .= mail_fsend_enc_file($boundary,$t_files[$i],$t_filenames[$i]); //첨부파일 처리
                }
            }
        }
            */
    // 메세지 닫기
    $msg .= '--' . $boundary . "--";
    //메일 보내기

    $result = @mail($to, $subject, $msg, $header);
    return $result;
}

function mail_fsend_enc_msg($boundary, $msg = '', $content_type = 'Content-type: text/plain; charset=utf-8')
{
    //본문문자열 인코딩
    $re_str = '';
    $re_str = '--' . $boundary . "\r\n"; //바운드리 설정
    $re_str .= $content_type . "\r\n";
    $re_str .= 'Content-Transfer-Encoding: base64' . "\r\n" . "\r\n";
    // RFC 2045 에 맞게 $data를 형식화
    $new_msg = chunk_split(base64_encode($msg));
    $re_str .= $new_msg . "\r\n";
    return $re_str;
}

function mail_fsend_enc_file($boundary, $file, $filename = '', $var = array())
{

    //첨부파일 인코딩
    $content_type = 'Content-Type: application/octet-stream; charset=utf-8';
    $re_str = '';
    $re_str = '--' . $boundary . "\r\n"; //바운드리 설정
    $re_str .= $content_type . "\r\n";
    $re_str .= 'Content-Transfer-Encoding: base64' . "\r\n";
    if (strlen($filename) == 0) {
        $filename = basename($file);
    }

    $re_str .= "Content-Disposition: attachment; filename=\"" . '=?utf-8?B?' . base64_encode($filename) . '?=' . "\"" . "\r\n" . "\r\n";

    // RFC 2045 에 맞게 $data를 형식화
    $fp = @fopen($file, "r");
    if ($fp) {
        $msg = fread($fp, filesize($file));
        fclose($fp);
    }

    $new_msg = chunk_split(base64_encode($msg));
    $re_str .= $new_msg . "\r\n";

    return $re_str;
}

### 한글 카운트 자르기
function IsHangul($strSrc, $pos)
{
    $isHangul = 1;

    for ($i = 0; $i <= $pos; ++$i) {
        if (ord($strSrc[$i]) > 127)
            ++$isHangul;
        else
            $isHangul = -1;
    }

    return $isHangul % 2;
}

function ksubstr($strSrc, $start, $end = "")
{
    if ($start < 0)
        $start = strlen($strSrc) + $start;

    if (IsHangul($strSrc, $start) == 1)
        ++$start;

    if (!strlen($end))
        return substr($strSrc, $start);
    else {
        if ($end < 0) {
            $pos = $end + strlen($strSrc) - 1;

            if (IsHangul($strSrc, $pos) == 0)
                --$end;
        } else {
            $pos = $end + $start - 1;

            if (IsHangul($strSrc, $pos) == 0)
                --$end;
        }
    }

    return substr($strSrc, $start, $end);
}

//-----------------------------------------------------------------------
// 세션설정 유지/관리
//-----------------------------------------------------------------------

### 세션관련 함수
function sess_open($save_path, $session_name)
{
    global $sess_save_path, $sess_session_name;
    $sess_save_path = $save_path;
    $sess_session_name = $session_name;
    return true;
}

function sess_read($key)
{
    global $sess_save_path, $sess_session_name, $userIP, $minlifetime;
    $SQL = "SELECT count(*) cnt, max(value) value FROM nynSession WHERE sesskey='" . $key . "' AND expiry > " . time();
    $RS = mysql_query($SQL);
    //$RCnt = mysql_num_rows($RS);
    $rsI = mysql_fetch_assoc($RS);
    $RCnt = $rsI[cnt];

    // 세션이 존재 하면
    if ($RCnt == 1) {
        // 세션시간이 현재시간보다 크다면 정보를 가져온다.
        //$R = mysql_fetch_array($RS);
        return $rsI["value"];
    } else {
        $expiry = time() - $minlifetime;
        //  $SQL = "DELETE FROM nynSession WHERE expiry < ".$expiry;
        // $RS  = mysql_query($SQL);
        return false;
    }
}

function sess_write_renew($key, $sess_data)
{

    global $sess_save_path, $sess_session_name, $maxlifetime, $userIP;
    $ret = false;


    $expiry = time() + $maxlifetime;
    $value = addslashes($sess_data);

    // 세션정보가 존재하는지 체크 -
    $SQL = "SELECT count(*) cnt FROM nynSession WHERE sesskey='" . $key . "' AND value IS NOT NULL";
    $RS = mysql_query($SQL);
    //$RCnt = mysql_num_rows($RS);
    $rsI = mysql_fetch_assoc($RS);
    $RCnt = $rsI[cnt];


    if ($RCnt == 1) {// 세션업데이트 - DB의 시간이 현재시간보다 크면 계속 시간을 업데이트 시켜 세션을 유지.
        //$USQL = "UPDATE nynSession SET expiry='".$expiry."' WHERE security='O' AND sesskey='".$key."' "; // AND expiry > " . time() ;
        //$res = mysql_query($USQL);

        //if($res == true) {
        $ret = true;
        //}

    } else if ($Rcnt == 0) { // 세션정보가 없는 경우. DB에 세션을 추가한다.

        if ($sess_data) {

            if ($_SESSION['loginUserID']) {
                $uid = $_SESSION['loginUserID'];
            } else {
                $uid = "";
            }

            $security = "O";

            /// 이중 로그인 차단
            //$SSQL = "SELECT value, remoteIP FROM nynSession WHERE userID='".$uid."'" ;
            //$SRS = mysql_query($SSQL);
            //$SR = mysql_num_rows($SRS);
            //$Srs = mysql_fetch_array($SRS);

            $SSQL = "SELECT count(*) cnt FROM nynSession WHERE userID='" . $uid . "'";
            $SRS = mysql_query($SSQL);
            $SR = mysql_fetch_assoc($SRS);
            $SCnt = $SR[cnt];

            // 중복로그인을 검사하기 위한 필드. O 정상, X 중복로그인.
            if ($SCnt > 0) { //어라 다른 컴터에서 로그인 했네... 다른컴퓨터 차단시킴
                //접속차단 시킨다. $security = "X";
                $SQL = "UPDATE nynSession SET security='X' WHERE userID='" . $uid . "' and security='O'";
                mysql_query($SQL);

                //				if($Srs[1] != $remoteip) { // 중복 발견을 기록에 남기는 부분. 아이피가 다른 분만 등록 디비가 너무 많이 쌓임
                //					$Isql = "INSERT INTO nynOverlapLogin (userID,checkDate,remoteIP) values ('".$uid."','".$inputDate."','".$userIP."')";
                //					$r = mysql_query($Isql);
                //				}
            }
            // mysql_query("begin");

            // 세션추가 - 로그인했을 경우 $sess_data 정보가 한번 넘어온다. 그 때만 추가한다.
            if ($uid) {
                $ISQL = "INSERT INTO nynSession (sesskey, expiry, value, userID, security, remoteIP, inputDate) VALUES ('$key', '$expiry', '$value', '$uid', '$security', '$userIP', now())";
                $res = mysql_query($ISQL);
                if ($res == true) {
                    $ret = true;
                }
            }
        }
    }

    //if($ret == false  || $uid == '') {
    //	mysql_query("rollback");
    //} else {
    //	mysql_query("commit");
    return $ret;
    //}
}

function sess_write($key, $sess_data)
{
    global $sess_save_path, $sess_session_name, $maxlifetime, $userIP;
    $ret = false;

    $expiry = time() + $maxlifetime;
    $value = addslashes($sess_data);

    // 세션정보가 존재하는지 체크 -
    $SQL = "SELECT * FROM nynSession WHERE sesskey='" . $key . "' AND value IS NOT NULL";
    $RS = mysql_query($SQL);
    $RCnt = mysql_num_rows($RS);

    if ($RCnt == 1) {// 세션업데이트 - DB의 시간이 현재시간보다 크면 계속 시간을 업데이트 시켜 세션을 유지.
        $USQL = "UPDATE nynSession SET expiry='" . $expiry . "' WHERE security='O' AND sesskey='" . $key . "' AND expiry > " . time();
        $res = mysql_query($USQL);

        if ($res == true) {
            $ret = true;
        }

    } else if ($Rcnt == 0) { // 세션정보가 없는 경우. DB에 세션을 추가한다.
        if ($sess_data) {
            if ($_SESSION['loginUserID']) {
                $uid = $_SESSION['loginUserID'];
            } else {
                $uid = "";
            }

            $security = "O";

            /// 이중 로그인 차단
            $SSQL = "SELECT value, remoteIP FROM nynSession WHERE userID='" . $uid . "'";
            $SRS = mysql_query($SSQL);
            $SR = mysql_num_rows($SRS);
            $Srs = mysql_fetch_array($SRS);

            // 중복로그인을 검사하기 위한 필드. O 정상, X 중복로그인.
            if ($SR > 0) { //어라 다른 컴터에서 로그인 했네... 다른컴퓨터 차단시킴
                //접속차단 시킨다. $security = "X";
                $SQL = "UPDATE nynSession SET security='X' WHERE userID='" . $uid . "' ";

                $RS = mysql_query($SQL);

                if ($Srs[1] != $remoteip) { // 중복 발견을 기록에 남기는 부분. 아이피가 다른 분만 등록 디비가 너무 많이 쌓임
                    $Isql = "INSERT INTO nynOverlapLogin (userID,checkDate,remoteIP) values ('" . $uid . "','" . $inputDate . "','" . $userIP . "')";
                    $r = mysql_query($Isql);
                }
            }
            mysql_query("begin");

            // 세션추가 - 로그인했을 경우 $sess_data 정보가 한번 넘어온다. 그 때만 추가한다.
            if ($uid) {
                $ISQL = "INSERT INTO nynSession (sesskey, expiry, value, userID, security, remoteIP, inputDate) VALUES ('$key', '$expiry', '$value', '$uid', '$security', '$userIP', now())";
                $res = mysql_query($ISQL);
                if ($res == true) {
                    $ret = true;
                }
            }
        }
    }

    if ($ret == false || $uid == '') {
        mysql_query("rollback");
    } else {
        mysql_query("commit");
        return $ret;
    }
}


function sess_close()
{
    mysql_close();
    return true;
}

function sess_destroy($key)
{
    global $sess_save_path, $sess_session_name;
    $SQL = "DELETE FROM nynSession WHERE sesskey='" . $key . "'";
    $RS = mysql_query($SQL);
    return true;
}


/*********************************************
 * WARNING - You will need to implement some *
 * sort of garbage collection routine here. *
 *********************************************/
function sess_gc($maxlifetime)
{
//	$SQL = "DELETE FROM nynSession WHERE expiry  < " . time() ;
//	$RS  = mysql_query($SQL);
    return true;
}

function set_session_id($SESSID)
{
    if ($SESSID) @session_id($SESSID);
}

/* 모바일 기기 확인 반환 : 컴퓨터(PC), 모바일(해당 기종)*/
function rtn_mobile_chk()
{
    // 모바일 기종(배열 순서 중요, 대소문자 구분 안함)
    $ary_m = array("iPhone", "iPod", "IPad", "Android", "Blackberry", "SymbianOS|SCH-M\d+", "Opera Mini", "Windows CE", "Nokia", "Sony", "Samsung", "LGTelecom", "SKT", "Mobile", "Phone");
    for ($i = 0; $i < count($ary_m); $i++) {
        if (preg_match("/$ary_m[$i]/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return $ary_m[$i];
            break;
        }
    }
    return "PC";
}


#-- 회원로그인 정보 등록
function insert_logincheck($member_id)
{
    global $_SERVER, $_COOKIE;
    $queryA = " INSERT INTO nynMemberHistory
							SET userID = '" . $member_id . "',
							loginTime = now(),
							loginIP = '" . $_SERVER["REMOTE_ADDR"] . "'";
    $r = @mysql_query($queryA);
    return $r;
}

//작업내역 history
function workHistory($wMethod, $wType, $wTable, $wSeq, $menu1, $menu2, $before)
{

    if ($wMethod == "POST" || $wMethod == "PUT") {

        if ($wType == "insert") {
            $queryUp = mysql_query("SELECT * FROM " . $wTable . " WHERE seq = '" . $wSeq . "'");
            $rsUp = mysql_fetch_object($queryUp);
            $after = print_r($rsUp, true);
        } else {
            $wType = "update";
            $queryUp = mysql_query("SELECT * FROM " . $wTable . " WHERE seq = '" . $wSeq . "'");
            $rsUp = mysql_fetch_object($queryUp);
            $after = print_r($rsUp, true);
        }

    } else if ($wMethod == "DELETE") {

        $wType = "delete";
        $after = "";

    }

    $query = "INSERT INTO nynHistory
					  SET workType = '" . $wType . "',
						  menu1 = '" . $menu1 . "',
						  menu2 = '" . $menu2 . "',
						  workBefore = '" . $before . "',
						  workAfter = '" . $after . "',
						  inputID = '" . $_SESSION["loginUserID"] . "',
						  inputDate = now(),
						  inputIP = '" . $_SERVER["REMOTE_ADDR"] . "'
			  ";
    $result = mysql_query($query);
}

function workHistoryV1($wMethod, $wType, $wTable, $wSeq, $menu1, $menu2, $before)
{
    global $mysqli;
    if ($wMethod == "POST" || $wMethod == "PUT") {

        if ($wType == "insert") {
            $stmtUp = $mysqli->query("SELECT * FROM " . $wTable . " WHERE seq = '" . $wSeq . "'");
            $rsUp = $stmtUp->fetch_object();
            $after = print_r($rsUp, true);
        } else {
            $wType = "update";
            $stmtUp = $mysqli->query("SELECT * FROM " . $wTable . " WHERE seq = '" . $wSeq . "'");
            $rsUp = $stmtUp->fetch_object();
            $after = print_r($rsUp, true);
        }

    } else if ($wMethod == "DELETE") {
        $wType = "delete";
        $after = "";
    }

    $query = "INSERT INTO nynHistory
					  SET workType = '" . $wType . "',
						  menu1 = '" . $menu1 . "',
						  menu2 = '" . $menu2 . "',
						  workBefore = '" . $before . "',
						  workAfter = '" . $after . "',
						  inputID = '" . $_SESSION["loginUserID"] . "',
						  inputDate = now(),
						  inputIP = '" . $_SERVER["REMOTE_ADDR"] . "'
			  ";

    $mysqli->query($query);
}

//작업내역 history before
function workHistoryBefore($wTable, $wKey, $wVal)
{

    $query = "SELECT * FROM " . $wTable . " WHERE " . $wKey . " = '" . $wVal . "'";
    $result = mysql_query($query);
    $rs = mysql_fetch_object($result);
    $resultHistory = print_r($rs, true);

    return $resultHistory;

}

function workHistoryBeforeV1($wTable, $wKey, $wVal)
{
    global $mysqli;
    $query = "SELECT * FROM " . $wTable . " WHERE " . $wKey . " = '" . $wVal . "'";
    $result = $mysqli->query($query);
    $rs = $result->fetch_object();

    return print_r($rs, true);
}

//작업내역 history before all
function workHistoryBeforeAll($wTable, $wKey01, $wVal01, $wKey02, $wVal02, $wKey03, $wVal03, $wKey04, $wVal04)
{

    $query = "SELECT * FROM " . $wTable . " WHERE " . $wKey01 . " = '" . $wVal01 . "' AND " . $wKey02 . " = '" . $wVal02 . "' AND " . $wKey03 . " = '" . $wVal03 . "' AND " . $wKey04 . " = '" . $wVal04 . "' ";
    $result = mysql_query($query);
    $rs = mysql_fetch_object($result);
    $resultHistory = print_r($rs, true);

    return $resultHistory;

}

function workHistoryBeforeAllV1($wTable, $wKey01, $wVal01, $wKey02, $wVal02, $wKey03, $wVal03, $wKey04, $wVal04)
{
    global $mysqli;
    $query = "SELECT * FROM " . $wTable . " WHERE " . $wKey01 . " = '" . $wVal01 . "' AND " . $wKey02 . " = '" . $wVal02 . "' AND " . $wKey03 . " = '" . $wVal03 . "' AND " . $wKey04 . " = '" . $wVal04 . "' ";
    $result = $mysqli->query($query);
    $rs = $result->fetch_object();
    
    return print_r($rs, true);

}

//조회내역 history
function searchHistory($searchValue, $menu1, $menu2)
{

    $query = "INSERT INTO searchHistory SET searchValue='" . $searchValue . "', menu1='" . $menu1 . "', menu2='" . $menu2 . "', inputID='" . $_SESSION['loginUserID'] . "', inputIP='" . $_SERVER['REMOTE_ADDR'] . "', inputDate=now() ";

    $result = mysql_query($query);

}

//엑셀등록시 숫자,영문만 등록되게
function replaceChar($char)
{
    $regExp = "/[^a-zA-Z0-9_.]/s";
    return preg_replace($regExp, "", $char);
}

function fileCheck($fileName, $type)
{
    // 확장자 분리
    $tmp = explode('.', $fileName);
    $ext = array_pop($tmp);
    $ext = strtolower($ext);

    // 파일 형식 설정
    $haystack = array();
    switch ($type) {
        case 'img' :
            $haystack = array('jpg', 'jpeg', 'png', 'gif');
            break;
        case 'board' :
            $haystack = array('xlsx', 'xls', 'csv', 'hwp', 'hwpx', 'zip', '7z', 'png', 'jpg', 'jpeg', 'pdf', 'docx', 'txt', 'ppt', 'pptx');
            break;
        case 'report':
            $haystack = array('zip', 'hwp', 'txt', 'docx', 'xlsm', 'xlsx', 'pdf', 'accdb', 'ppt', 'pptx');
            break;
        case 'html':
            $haystack = array('jpg', 'jpeg', 'png', 'gif', 'html');
            break;
    }

    // 확장자 검증
    if (in_array(strtolower($ext), $haystack)) {
        // echo "123";
        return true;
    }
    return false;
}

function mailer($fname, $fmail, $to, $subject, $content, $type = 0, $file = "", $cc = "", $bcc = "")
{

    include '/home/kiraedu/lib/PHPMailer/PHPMailerAutoload.php';

    $toArr = explode(',', $to);

    for ($i = 0; $i < count($toArr); $i++) {

        if ($type != 1) $content = nl2br($content);
        // type : text=0, html=1, text+html=2
        $mail = new PHPMailer(); // defaults to using php "mail()"
        $mail->IsSMTP();
        //$mail->SMTPDebug = 2;
        $mail->SMTPSecure = "ssl";
        $mail->SMTPAuth = true;
        $mail->Host = "smtp.mail-server.kr";
        $mail->Port = 465;
        $mail->Username = "eungmin2@lksc.kr";
        $mail->Password = "myth2150^^";
        $mail->CharSet = 'UTF-8';
        $mail->From = $fmail;
        $mail->FromName = $fname;
        $mail->Subject = $subject;
        $mail->AltBody = ""; // optional, comment out and test
        $mail->msgHTML($content);
        $mail->addAddress($toArr[$i]);
        if ($cc)
            $mail->addCC($cc);
        if ($bcc)
            $mail->addBCC($bcc);
        if ($file != "") {
            foreach ($file as $f) {
                $mail->addAttachment($f['path'], $f['name']);
            }
        }
        //if ( $mail->send() ) return true;
        //return false;

        $mail->send();

    }

    return true;

}

function mailer2($fname, $fmail, $to, $subject, $content, $type = 0, $file = "", $cc = "", $bcc = "")
{

    include '/home/kiraedu/lib/PHPMailer/PHPMailerAutoload.php';

    if ($type != 1) $content = nl2br($content);
    // type : text=0, html=1, text+html=2
    $mail = new PHPMailer(); // defaults to using php "mail()"
    $mail->IsSMTP();
    //$mail->SMTPDebug = 2;
    $mail->SMTPSecure = "ssl";
    $mail->SMTPAuth = true;
    $mail->Host = "smtp.mail-server.kr";
    $mail->Port = 465;
    $mail->Username = "eungmin2@lksc.kr";
    $mail->Password = "myth2150^^";
    $mail->CharSet = 'UTF-8';
    $mail->From = $fmail;
    $mail->FromName = $fname;
    $mail->Subject = $subject;
    $mail->AltBody = ""; // optional, comment out and test
    $mail->msgHTML($content);
    $mail->addAddress($to);
    if ($cc)
        $mail->addCC($cc);
    if ($bcc)
        $mail->addBCC($bcc);
    if ($file != "") {
        foreach ($file as $f) {
            $mail->addAttachment($f['path'], $f['name']);
        }
    }
    //if ( $mail->send() ) return true;
    //return false;

    $mail->send();


    //return true;

}

//메일발송 NEW 버전
function sendMail($to, $subject, $content)
{

    $ch = curl_init();

    $subject = $subject;   //필수입력(템플릿 사용시 17 line 설명 참조)
    $body = $content;
    $sender = $_dMail;
    $sender_name = $_dName;
    $username = $_dUser;
    $key = $_dKey;

    $receiver = '[{"email":"' . $to . '"}]';
    $bodytag = '1';

    $mail_type = 'NORMAL';
    $start_reserve_time = date('Y-m-d H:i:s');
    $end_reserve_time = date('Y-m-d H:i:s');
    $remained_count = 1;

    $postvars = '"subject":"' . $subject . '"';
    $postvars = $postvars . ', "body":"' . $body . '"';
    $postvars = $postvars . ', "sender":"' . $sender . '"';
    $postvars = $postvars . ', "sender_name":"' . $sender_name . '"';
    $postvars = $postvars . ', "username":"' . $username . '"';
    $postvars = $postvars . ', "receiver":' . $receiver;

    $postvars = $postvars . ', "key":"' . $key . '"';
    $postvars = '{' . $postvars . '}';      //JSON 데이터

    $url = "https://directsend.co.kr/index.php/api_v2/mail_change_word";

    //헤더정보
    $headers = array(
        "cache-control: no-cache",
        "content-type: application/json; charset=utf-8"
    );

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);        //JSON 데이터
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);

    //curl 에러 확인
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    } else {
        print_R($response);
    }

    curl_close($ch);

}

//알림톡발송 NEW 버전
//function insert_kakao_sms($receivePhone,$sendPhone,$message,$sendTime,$userName,$companyName) {
function sendKakao($to, $subject, $content)
{
    $username = $_dUser;
    $key = $_dKey;
    $kakao_plus_id = "modulearning";
    $user_template_no = "directsend에 등록한 템플릿 번호";

    $sender = $_dMail;
    $sender_name = $_dName;
    $username = $_dUser;
    $key = $_dKey;
}

/**
 * 랜덤 숫자 6자리 생성
 * @return string
 */
function generateRandomDigits()
{
    $verificationCode = rand(000000, 999999);
    return str_pad($verificationCode, 6, '0', STR_PAD_LEFT);
}

function db2Connection()
{
//    $hostName2 = "222.239.119.9";
//    $DBuserName2 = "kiraedu";
//    $dbName2 = "kiradb";
//    $userPassword2 = "kira@185";

    $hostName2="222.239.119.8";
    $DBuserName2="kiraedu";
    $dbName2="kiradb";
    $userPassword2="kira@185";
    
    $bd2 = mysql_connect($hostName2, $DBuserName2, $userPassword2) or die("db connect error");
    mysql_select_db($dbName2, $bd2) or die("db connect errors");
    mysql_query("set session character_set_connection=utf8;");
    mysql_query("set session character_set_results=utf8;");
    mysql_query("set session character_set_client=utf8;");

    return $bd2;
}

// db2 mysqli connection
function db2ConnectionI()
{
//    $hostName2 = "222.239.119.9";
//    $DBuserName2 = "kiraedu";
//    $dbName2 = "kiradb";
//    $userPassword2 = "kira@185";

    $hostName2="222.239.119.8";
    $DBuserName2="kiraedu";
    $dbName2="kiradb";
    $userPassword2="kira@185";

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $mysqli = new mysqli($hostName2, $DBuserName2, $userPassword2, $dbName2) or die("db connect error");
    $mysqli->query("set session character_set_connection=utf8;");
    $mysqli->query("set session character_set_results=utf8;");
    $mysqli->query("set session character_set_client=utf8;");
    return $mysqli;
}

/**
 * exam) requestAPI('get', 'https://127.0.0.1/api/apiRecomm.php', $data);
 * @param string $method //GET & POST
 * @param string $url
 * @param Mixed $data // [ "searchType" => "recomm", "searchValue" => "test"]
 * @return string // default
 * @return Mixed // array(1) {  ["totalCount"]=>  int(575)  }
 *
 */

function requestAPI($method, $url, $data)
{

    // 이유는 모르겠으나 PHPSESSID넣으면 멈춤 => session_write_close로 해결
    $headers = [
        'Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'User-Agent: Mozilla/5.0 Chrome/113.0.0.0 Safari/537.36',
        'Cookie: whoami=apibot; PHPSESSID=' . $_COOKIE['PHPSESSID']
    ];

    // 'Cookie: whoami=apibot'

    $ch = curl_init();

    if (preg_match("/get/i", $method)) {
        $url .= "?";

        foreach ($data as $key => $value) {
            $url .= urlencode($key) . '=' . urlencode($value);
            $url .= "&";
        }

    } elseif (preg_match("/post/i", $method)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // POST data
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);   // set header
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method)); // set http method

    session_write_close(); // 없을 시 Cookie에 PHPSESSID 사용불가
    $response = curl_exec($ch);
    curl_close($ch);

    $convert = json_decode($response, true);  // Mixed(array) true옵션이 없으면 Mixed(stdClass)

    if (is_null($convert)) {
        return $response; //Return String  변환 실패 시
    }

    return $convert;
}

function cancelPay($amount, $secretKey, $cancelReason, $bank, $accountNumber, $holderName, $refundableAmount)
{

    $paymentKey = "";
    $cancelReason = "고객 변심";

    //부분 취소에서만 사용
    //$cancelAmount = 300;

    //refundReceiveAccount - 가상계좌 거래에 대해 입금후에 취소하는 경우만 필요
    //$bank = "신한";
    //$accountNumber = "12345678901234";
    //$holderName = "홍길동";

    //중복 취소를 막기위해 취소 가능금액을 전송
    $refundableAmount = 300;


    $secretKey = 'test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy';

    $url = 'https://api.tosspayments.com/v1/payments/' . $paymentKey . '/cancel';

    $data = ['cancelReason' => $cancelReason, 'cancelAmount' => $cancelAmount,
        'refundReceiveAccount' => ['bank' => $bank, 'accountNumber' => $accountNumber, 'holderName' => $holderName],
        'refundableAmount' => $refundableAmount];

    $credential = base64_encode($secretKey . ':');

    $curlHandle = curl_init($url);


    curl_setopt_array($curlHandle, [
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => [
            'Authorization: Basic ' . $credential,
            'Content-Type: application/json'
        ],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    $response = curl_exec($curlHandle);

    $httpCode = curl_getinfo($curlHandle, CURLINFO_HTTP_CODE);
    $isSuccess = $httpCode == 200;
    $responseJson = json_decode($response);

}

function sendDirectSendMail($to, $subject, $content)
{
    $ch = curl_init();

    $subject = $subject;   // 필수입력
    $body = $content;
    $sender = "modulearning@modulearning.kr";
    $sender_name = "모두의교육그룹";
    $username = "modu2105";
    $key = "MnwMAr9xEY14tnr";

    // 수신자 정보를 JSON 형식으로 생성
    $receiver = array(array("email" => $to));

    // JSON 데이터 생성
    $postvars = array(
        "subject" => $subject,
        "body" => $body,
        "sender" => $sender,
        "sender_name" => $sender_name,
        "username" => $username,
        "receiver" => $receiver,
        "key" => $key
    );

    $jsonData = json_encode($postvars);

    $url = "https://directsend.co.kr/index.php/api_v2/mail_change_word";

    // 헤더 정보 설정
    $headers = array(
        "cache-control: no-cache",
        "content-type: application/json; charset=utf-8"
    );

    // cURL 옵션 설정
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);  // JSON 데이터
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);

    // cURL 에러 확인
    //if (curl_errno($ch)) {
    //    echo 'Curl error: ' . curl_error($ch);
    //} else {
    //    print_r($response);
    //}

    curl_close($ch);
}
?>
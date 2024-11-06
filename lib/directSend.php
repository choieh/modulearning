<?php

// zip, exe 파일 등 몇몇 확장자 파일 첨부는 body 안에 들어가면 안됨, addFile 함수 사용
class DirectSend
{
    // 변수 설정
    private $sender = 'modulearning@modulearning.kr';
    private $sender_name = '모두의러닝';
    private $username = 'modu2105';
    private $key = 'MnwMAr9xEY14tnr';

    public $subject = '';
    public $body = '';
    public $receiver = '';
    public $fileUrl = '';
    public $fileName = '';

    public function addFile($fileUrl, $fileName)
    {
        // 첨부파일의 URL을 보내면 DirectSend에서 파일을 download 받아 발송처리를 진행합니다.
        // 첨부파일은 전체 10MB 이하로 발송을 해야 하며, 파일의 구분자는 '|(shift+\)'로 사용하며 5개까지만 첨부가 가능합니다.
        if (strlen($this->fileUrl) > 1) {
            $this->fileUrl .= '|' . $fileUrl;
            $this->fileName .= '|' . $fileName;
        } else {
            $this->fileUrl .= $fileUrl;
            $this->fileName .= $fileName;
        }
        return $this;
    }

    public function subject($subject)
    { // 제목
        $this->subject = $subject;
        return $this;
    }

    public function body($body)
    { //내용
        $this->body = $body;
        return $this;
    }

    public function receiver($name, $email)
    { //수신자
        if (strlen($this->receiver) > 1) {
            $this->receiver .= ', {"name":"' . $name . '", "email":"' . $email . '"}';
        } else {
            $this->receiver .= '{"name":"' . $name . '", "email":"' . $email . '"}';
        }
        return $this;
    }

    public function receivers($receiver)
    { // 수신자 다수 {"name":"홍길동", "email":"abcd@co.kr"},{"name2":"수신자", "email":"abcc@co.kr"}
        $this->receiver .= $receiver;
        return $this;
    }

    public function send($sendTime)
    { //발송 함수
        $ch = curl_init();

        $mail_type = 'NORMAL'; // NORMAL - 즉시발송 / ONETIME - 1회예약 / WEEKLY - 매주정기예약 / MONTHLY - 매월정기예약
        $start_reserve_time = $sendTime; // 발송 시간
        $end_reserve_time = $sendTime; // 발송이 끝나는 시간

        $this->receiver = '[' . $this->receiver . ']';      //JSON 데이터

        $bodytag = '1';  //HTML이 기본값 입니다. 메일 내용을 텍스트로 보내실 경우 주석을 해제 해주시기 바랍니다.

        // 실제 발송성공실패 여부를 받기 원하실 경우 아래 주석을 해제하신 후, 사이트에 등록한 URL 번호를 입력해주시기 바랍니다.
//		$return_url = 0;
        //open, click 등의 결과를 받기 원하실 경우 아래 주석을 해제하신 후, 사이트에 등록한 URL 번호를 입력해주시기 바랍니다.
        //등록된 도메인이 http://domain 와 같을 경우, http://domain?type=[click | open | reject]&mail_id=[MailID]&email=[Email]&sendtime=[SendTime]&mail_reserve_id=[MailReserveID] 과 같은 형식으로 request를 보내드립니다.
//		$option_return_url = 0;

//		$open = 1;	// open 결과를 받으려면 아래 주석을 해제 해주시기 바랍니다.
//		$click = 1;	// click 결과를 받으려면 아래 주석을 해제 해주시기 바랍니다.
//		$check_period = 3;	// 트래킹 기간을 지정하며 3 / 7 / 10 / 15 일을 기준으로 지정하여 발송해 주시기 바랍니다. (단, 지정을 하지 않을 경우 결과를 받을 수 없습니다.)

        // 예약발송 정보 추가
//		$mail_type = 'NORMAL'; // NORMAL - 즉시발송 / ONETIME - 1회예약 / WEEKLY - 매주정기예약 / MONTHLY - 매월정기예약
//		$start_reserve_time = date('Y-m-d H:i:s'); //  발송하고자 하는 시간(시,분단위까지만 가능) (동일한 예약 시간으로는 200회 이상 API 호출을 할 수 없습니다.)
//		$end_reserve_time = date('Y-m-d H:i:s'); //  발송이 끝나는 시간 1회 예약일 경우 $start_reserve_time = $end_reserve_time
        // WEEKLY | MONTHLY 일 경우에 시작 시간부터 끝나는 시간까지 발송되는 횟수 Ex) type = WEEKLY, start_reserve_time = '2017-05-17 13:00:00', end_reserve_time = '2017-05-24 13:00:00' 이면 remained_count = 2 로 되어야 합니다.
//		$remained_count = 1;
        // 예약 수정/취소 API는 소스 하단을 참고 해주시기 바랍니다.

        //필수안내문구 추가
        $agreement_text = '본메일은 ' . $sendTime . ' 기준, 회원님의 수신동의 여부를 확인한 결과 회원님께서 수신동의를 하셨기에 발송되었습니다.';
//		$deny_text = "메일 수신을 원치 않으시면 [" . '$DENY_LINK' . "]를 클릭하세요.\\nIf you don't want this type of information or e-mail, please click the [".'$EN_DENY_LINK'."]";
//		$sender_info_text = "사업자 등록번호:-- 소재지:ㅇㅇ시(도) ㅇㅇ구(군) ㅇㅇ동 ㅇㅇㅇ번지 TEL:--\\nEmail: <a href='mailto:test@directsend.co.kr'>test@directsend.co.kr</a>";
//		$logo_state = 1; // logo 사용시 1 / 사용안할 시 0
//		$logo_path = 'http://logoimage.com/image.png';  //사용하실 로고 이미지를 입력하시기 바랍니다.
//		$logo_sort = 'CENTER';      //로고 정렬 LEFT - 왼쪽 정렬 / CENTER - 가운데 정렬 / RIGHT - 오른쪽 정렬
//		$footer_sort = 'CENTER';      //메일내용, 풋터(수신옵션) 정렬 LEFT - 왼쪽 정렬 / CENTER - 가운데 정렬 / RIGHT - 오른쪽 정렬

        $postvars = '"subject":"' . $this->subject . '"';
        $postvars = $postvars . ', "body":"' . $this->body . '"';
        $postvars = $postvars . ', "sender":"' . $this->sender . '"';
        $postvars = $postvars . ', "sender_name":"' . $this->sender_name . '"';
        $postvars = $postvars . ', "username":"' . $this->username . '"';
        if (strlen($this->fileUrl) > 1) {
            $postvars = $postvars . ', "file_url":"' . $this->fileUrl . '"';
            $postvars = $postvars . ', "file_name":"' . $this->fileName . '"';
        }

        $postvars = $postvars . ', "receiver":' . $this->receiver;

        $postvars = $postvars . ', "key":"' . $this->key . '"';
        $postvars = '{' . $postvars . '}';      //JSON 데이터

        // URL
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
            return false;
        }

        curl_close($ch);

        return $response;
    }
}

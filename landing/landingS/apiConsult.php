<?php
	header('Content-Type:application/json; charset=utf-8');
?>
<? include 'lib/header.php'; ?>
<?
	if($method == "POST") { // 글 쓰기와 글 수정은 POST로 받음

		$company = $_POST['company'];
		$userName = $_POST['userName'];
		$phone01 = $_POST['phone01'];
		$phone02 = $_POST['phone02'];
		$phone03 = $_POST['phone03'];
		$email = $_POST['email'];
		$email01 = explode('@', $email)[0];
		$email02 = explode('@', $email)[1];
		$number = $_POST['number'];
		$content = $_POST['content'];
		$cType = $_POST['cType'];
		$smsNumber = $_POST['smsNumber'];
		$checkY = $_POST['checkY'];
		$adminCk = $_POST['adminCk'];
		$reply = $_POST['reply'];
		$replyName = $_POST['replyName'];
		$seq = $_POST['seq'];
		$subSms = $_POST['subSms'];
		$cName = $_POST['cName'];
		$in = $_POST['in'];

		if(preg_match('<script>',$content)){
			echo "Serror";
			exit;
		}

		if($adminCk == "Y"){
			if ($checkY == "Y") {
				$checkY = "C";
			} else {
				$checkY = "W";
			}
			$userID = $_POST['userID'];
			$query = "UPDATE nynConsultNew SET replyDate='".$inputDate."', status = '".$checkY."', replyName = '".$_SESSION['loginUserName']."', replyID = '".$_SESSION['loginUserID']."', reply = '".addslashes(trim($reply))."' WHERE seq=".$seq;
			//echo $query;exit;
			$result = mysql_query($query);

			if($result){
				echo $seq;
			} else {
				echo "error";
			}
			exit;
		}

		$queryQ = "userName='".$userName."',
							 company='".$company."',
							 phone01='".$phone01."',
							 phone02='".$phone02."',
							 phone03='".$phone03."',
							 email01='".$email01."',
							 email02='".$email02."',
							 addItem01='".$cType."',
							 addItem02='".$in."',
							 content='".addslashes(trim($content))."',
							 userIP='".$_SERVER['REMOTE_ADDR']."'";

		$query = "INSERT INTO nynConsultNew SET inputDate = now(),".$queryQ;
		$result = mysql_query($query);

		$msg = "[모두의러닝(부산지사) 랜딩-신규문의]\n";
		$msg .= "기업명 : ".$company."\n";
		$msg .= "담당자 : ".$userName."\n";
		$msg .= "연락처 : ".$phone01."-".$phone02."-".$phone03."\n";
		$msg .= "내용 : ".addslashes(trim($content));

		if ($subSms == 'Y') {
			$msg2 = "[모두의러닝(부산지사) 랜딩-신규문의 (".$cName.")]\n";
			$msg2 .= "기업명 : ".$company."\n";
			$msg2 .= "담당자 : ".$userName."\n";
			$msg2 .= "연락처 : ".$phone01."-".$phone02."-".$phone03."\n";
			$msg2 .= "내용 : ".addslashes(trim($content));
			//월~금 9시~18시까지만 문자발송
			$cdate = getdate(time());
			if( $cdate["wday"]>0 && $cdate["wday"]<6 && $cdate["hours"]>9 && $cdate["hours"]<18 )
			{
				//insert_kakao_sms('01087140731', '15449335', $msg, date('Y-m-d H:i:s')); //전아영 매니저
				//insert_kakao_sms('01047639349', '15449335', $msg, date('Y-m-d H:i:s')); //황광서 팀장
				//insert_kakao_sms('01043240718', '15449335', $msg2, date('Y-m-d H:i:s'));  //박광훈 부장
			}
		}

		if ($smsNumber != "") {
			insert_kakao_sms($smsNumber,'15449335',$msg,date('Y-m-d H:i:s'));
		} else {
			//월~금 9시~18시까지만 문자발송
			$cdate = getdate(time());
			if( $cdate["wday"]>0 && $cdate["wday"]<6 && $cdate["hours"]>9 && $cdate["hours"]<18 )
			{
				insert_kakao_sms('01075125810', '15449335', $msg, date('Y-m-d H:i:s'));
				//insert_kakao_sms('01087483724', '15449335', $msg, date('Y-m-d H:i:s'));
			}
			//mail_fsend('lksc@lksc.kr', 'kiraedu@'.$_siteURL , '신규문의 등록(' . $company . '/' . $userName . ')', $msg, '', '', '', '', '');
		}

		if($result){
			echo "success";
		} else {
			echo "error";
		}
		exit;

	} else if($method == "DELETE") { //글 삭제 시
			parse_str(file_get_contents("php://input"), $_DEL);
			$seq = $_DEL['seq'];
			$viewType = $_DEL['viewType'];

			if($_SESSION['loginUserLevel'] > 4) {
				$qDel = " AND userID='".$_SESSION['loginUserID']."'";
			} else {
				$qDel = "";
			}

			$query = "DELETE FROM nynConsult WHERE seq=".$seq.$qDel;
			$result = mysql_query($query);
			if($result){
				echo "success";
			} else {
				echo "error";
			}
			exit;

	} else if($method == "GET") { //게시판 데이터를 json 문서로 출력

			$seq = $_GET['seq'];
			$userName = $_GET['userName'];
			$subject = $_GET['subject'];
			$contents = $_GET['contents'];
			$boardType = $_GET['boardType'];
			$viewType = $_GET['viewType'];
			$addItem02 = $_GET['addItem02'];
			$addItem01 = $_GET['addItem01'];
			$category = $_GET['consult'];
			$status = $_GET['status'];
			$searchYear = $_GET['searchYear'];
			$searchMonth = $_GET['searchMonth'];
			$type = $_GET['type'];
			$qSearch = "";

			if($status != ""){
				$qSearch .= " AND status='".$status."'";
			}
			if($searchYear != ""){
				$qSearch .= " AND year(inputDate) = '".$searchYear."'";
			}
			if($searchMonth != ""){
				$qSearch .= " AND month(inputDate) = '".$searchMonth."'";
			}
			if($addItem01 != ""){
				$qSearch .= " AND addItem01 = '".$addItem01."'";
			}
			if($page == "") {
				$page = 1;
			}
			if($list == "") {
				$list = 10;
			}
			if($seq != "") {
				$qSearch .= " AND seq='".$seq."'";
			}
			if($userName != "") {
				$qSearch .= " AND userName LIKE '%".$userName."%'";
			}
			if($type == "mate") {
				$qSearch .= " AND addItem01='파트너/러닝메이트'";
			} else {
				$qSearch .= " AND addItem01!='파트너/러닝메이트'";
			}

			$que = "SELECT * FROM nynConsultNew WHERE 1=1 ".$qSearch;
			$res = mysql_query($que);
			$allPost = mysql_num_rows($res);
			$currentLimit = ($list * $page) - $list; //몇 번째의 글부터 가져오는지
			$sqlLimit = ' LIMIT '.$currentLimit.', '.$list; //limit sql 구문

			$query = "SELECT * FROM nynConsultNew WHERE 1=1 ".$qSearch." ORDER BY seq DESC ".$sortValue.$sqlLimit;
			if ($_SESSION['loginUserID'] == 'eungmin2') {
				//echo $query;exit;
			}
			$result = mysql_query($query);
			$count = mysql_num_rows($result);
			$a = 0;
			$adminapi[totalCount] = "$allPost";
			$adminapi[attachURL] = $attachURL;

			if($addItem01 != ""){
				$qAdditem01 .= " AND addItem01 = '".$addItem01."'";
			}

			$qCount = "SELECT
							(SELECT COUNT(*) FROM nynConsultNew WHERE status = 'W' ".$qAdditem01.") AS totalMeCount,
							(SELECT COUNT(*) FROM nynConsultNew WHERE 1=1 ".$qAdditem01.") AS totalCountN,
							(SELECT COUNT(*) FROM nynConsultNew WHERE status = 'C' ".$qAdditem01.") AS totalCountS
						";

			$resultCo = mysql_query($qCount);
			$rsCount = mysql_fetch_array($resultCo);

			$adminapi[totalMeCount] = $rsCount[totalMeCount];
			$adminapi[totalCountN] = $rsCount[totalCountN];
			$adminapi[totalCountS] = $rsCount[totalCountS];

			while($rs = mysql_fetch_array($result)) {
				$adminapi[consult][$a][seq] = $rs[seq];
				$adminapi[consult][$a][userName] = $rs[userName];
				$adminapi[consult][$a][phone01] = $rs[phone01];
				$adminapi[consult][$a][phone02] = $rs[phone02];
				$adminapi[consult][$a][phone03] = $rs[phone03];
				$adminapi[consult][$a][email01] = $rs[email01];
				$adminapi[consult][$a][email02] = $rs[email02];
				$adminapi[consult][$a][inputDate] = $rs[inputDate];
				$adminapi[consult][$a][company] = $rs[company];
				$adminapi[consult][$a][content] = stripslashes($rs[content]);
				$adminapi[consult][$a][replyID] = $rs[replyID];
				if($loginUserLevel > 8){
					$replyName = "답변";
				} else {
					$replyName =$rs[replyName];
				}
				$adminapi[consult][$a][replyName] = $replyName;
				$adminapi[consult][$a][reply] = stripslashes($rs[reply]);
				$adminapi[consult][$a][replyDate] = $rs[replyDate];
				$adminapi[consult][$a][status] = $rs[status];
				$adminapi[consult][$a][userIP] = $rs[userIP];
				$adminapi[consult][$a][addItem01] = $rs[addItem01];
				$adminapi[consult][$a][addItem02] = $rs[addItem02];
				$adminapi[consult][$a][refinement] = $rs[refinement];
				$adminapi[consult][$a][refinementDate] = $rs[refinementDate];
				$adminapi[consult][$a][refinementID] = $rs[refinementID];
				$adminapi[consult][$a][refinementName] = $rs[refinementName];
				$a++;
			}

			$json_encoded = json_encode($adminapi);
			print_r($json_encoded);
			exit;
		}
?>

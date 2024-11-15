<?php
	header('Content-Type:application/json; charset=utf-8');
?>
<? include '../../lib/header.php'; ?>
<?

	$mode = $_POST["mode"];


	if( $mode == "insert" ){


		
		$lecCode = $_POST['lecCode'];          
		$lecType = $_POST['lecType'];           
		$lecDate = $_POST['lecDate'];          
		$usrName = $_POST['usrName'];           
		$usrBirth = $_POST['usrBirth'];               
		$usrAddr = $_POST['usrAddr'];          
		$phone1 = $_POST['phone1'];           
		$phone2 = $_POST['phone2'];             
		$phone3 = $_POST['phone3'];             
		$areaCode = $_POST['areaCode'];  		
		$useCard = $_POST["useCard"]; 
		$useCardNum = $_POST["useCardNum"];  
		

		$oMobile = $phone1 ."-". $phone2 ."-". $phone3;

		$uName = trim($usrName); 
		$uMobile = trim($oMobile);
		

		$usrName = encrypt(trim($usrName), 'kspeaedu12!@');	
		$usrBirth = encrypt(trim($usrBirth), 'kspeaedu12!@');	
		$usrAddr = encrypt(trim($usrAddr), 'kspeaedu12!@');	 
		$oMobile = encrypt(trim($oMobile), 'kspeaedu12!@');		

		$qry = "select  olAreaIdx, olidx, olLecName, date_format(oILecDate, '%Y-%m-%d') oILecDate  from nynOffineLecture where oILecCode='".trim($lecCode)."'  and olLecType='".trim($lecType)."' and date_format(oILecDate, '%Y-%m-%d') ='".trim($lecDate)."' and olAreaIdx = '".$areaCode."'  ";
		$result = mysql_query($qry);

		if( $result ){

			$olidxR =  mysql_fetch_assoc($result); 
			$olidx = $olidxR['olidx'];  
			$olLecName = $olidxR['olLecName']; 
			$oILecDate = $olidxR['oILecDate']; 
			
			

			$qry = "select count(oIdx) oIdx from  nynOffineLecMem where  oLecCode='".trim($lecCode)."'  
								and oLecType='".trim($lecType)."'  and oMobile='". $oMobile ."' and oBirth='". $usrBirth ."'
								and olidx='". $olidx."'								
								"; 
			$result = mysql_query($qry);
		    $arrresult =  mysql_fetch_assoc($result);
			$oIdx = $arrresult['oIdx'];
			if( $oIdx == 0 ){

				$query = "insert nynOffineLecMem SET 
													 olidx = '".trim($olidx)."',
													 oLecCode='".trim($lecCode)."',
													 oName='".trim($usrName)."',
													 oBirth='".trim($usrBirth)."',
													 oAddress='".$usrAddr."',
													 oMobile='".$oMobile."',
													 useCard='".$useCard."',
													 useCardNum='".$useCardNum."',
													 oLecType='". trim($lecType) ."',
													 oRegDate= now()  ";

				$result = mysql_query($query);

				if($result){

					$message = $uName ."님의 교육이 정상적으로 신청완료 되었습니다.";	
					
					if ($areaCode == 1) {
						$ocAreaTxt = "서울";
						//$_smsNumber = "024200106";
					} else if ($areaCode == 2) {
						$ocAreaTxt = "부산";
						//$_smsNumber = "0517910106";
					} else if ($areaCode == 3) {
						$ocAreaTxt = "대구";
						$_smsNumber = "0539639855";
					} else if ($areaCode == 4) {
						$ocAreaTxt = "인천";
						//$_smsNumber = "0324218907";
					}

					if (trim($lecType) == 1) {
						$ocTimeTxt = "오전9:00~13:00";
					} else if (trim($lecType) == 2) {
						$ocTimeTxt = "오후14:00~18:00";
					} else if (trim($lecType) == 3) {
						$ocTimeTxt = "야간18:00~22:00";
					} 

					$message .= "\n* 신청지역 : ".$ocAreaTxt;
					$message .= "\n* 과정명 : ".$olLecName;
					$message .= "\n* 교육일정 : ".$oILecDate;
					$message .= "\n* 교육시간 : ".$ocTimeTxt;

					if ($areaCode == 3) {
						$message .= "\n* 교육원주소 : 대구 동구 이노밸리로 144(각산동, 대보빌딜) 3층 [각산동 1033]";
					}	

					insert_emma($uMobile, $_smsNumber, $message , "");

					echo '{"result":"success"}';
				}else{
					echo '{"result":"error"}';
				}

			}else{

				echo '{"result":"exist"}';
			}

		}else{
			echo '{"result":"error"}';
		}  
		exit;
	}


	if( $mode == "area" ){

		

			$query = "SELECT /* apiOffline.php */ ocIdx, ocArea, ocAddr, ocTel, ocMapUrl FROM nynOfflineArea A
							WHERE ocUseYn = 'Y' 
								ORDER BY ocOrder asc ";
			$result = mysql_query($query);
			$allPost = mysql_num_rows($result);
			$a = 0;
			$adminapi = array(); //DB 값이 없는 경우 배열선언 부분
			$adminapi[totalCount] = "$allPost"; //총인원

			while($rs = mysql_fetch_assoc($result)) {

				$adminapi['areaList'][$a]	= $rs; 
				$a++;
			}

			$json_encoded = json_encode($adminapi);
			print_r($json_encoded);

			exit;

	} else if($method == "PUT") { // 수료체크
		parse_str(file_get_contents("php://input"), $_PUT);
		$seq = $_PUT['seq'];
		$studyEnd = $_PUT['studyEnd'];

		$queryU = "UPDATE nynOffineLecMem SET 
			                                  studyEnd='".$studyEnd."'
											  WHERE seq='".$seq."'";

		$resultU = mysql_query($queryU);
		if($resultU){
			echo '{"result":"success"}';
		}else{
			echo '{"result":"error"}';
		}
		exit;
		
	} else if($method == "DEL") { // 본인이 직접 회원 탈퇴
			parse_str(file_get_contents("php://input"), $_DEL);

			$seq = $_DEL['seq'];

			if($seq == ""){
				echo "error";
				exit;
			}
		
			$query = "DELETE FROM nynOffineLecMem WHERE seq='".$seq."'";
			$result = mysql_query($query);

			if($result){
				echo '{"result":"success"}';
			} else {
				echo '{"result":"error"}';
			}
			exit;
			
	} else if($method == "GET") { // 교육 정보를 불러 옴

			$lecDate = str_replace('-', '', $_GET['lecDate'] );    
			$lecCode = $_GET['lecCode'];    
			$areaCode = $_GET['areaCode'];    
	

		 $query = "SELECT /* apiOffline.php */ olidx, oILecCode, oILecDate, olLecName, olLecType, olLecCnt,  day(oILecDate) day , 
							(select count(oIdx)	 from nynOffineLecMem where  olidx = A.olidx ) cnt
							FROM nynOffineLecture A
							WHERE   DATE_FORMAT( oILecDate , '%Y%m') = '". $lecDate ."' and oILecCode = '".$lecCode."'  
								and olAreaIdx = '".$areaCode."'  
								ORDER BY oILecDate, olLecType asc ";
			echo $query;exit;
			$result = mysql_query($query);
			$allPost = mysql_num_rows($result);
			$a = 0;
			$adminapi = array(); //DB 값이 없는 경우 배열선언 부분
			$adminapi[totalCount] = "$allPost"; //총인원

			while($rs = mysql_fetch_assoc($result)) {

				$adminapi['lecList'][$a]	= $rs; 
				$a++;
			}
			$json_encoded = json_encode($adminapi);
			print_r($json_encoded);
	}
?>
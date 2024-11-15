<?php

include $_SERVER['DOCUMENT_ROOT'].'/lib/global.php'; 
include $_SERVER['DOCUMENT_ROOT'].'/lib/dbConnect.php'; 
include $_SERVER['DOCUMENT_ROOT'].'/lib/function.php'; 
    /*
     * [최종결제요청 페이지(STEP2-2)]
	 *
	 * 매뉴얼 "5.1. XPay 결제 요청 페이지 개발"의 "단계 5. 최종 결제 요청 및 요청 결과 처리" 참조
     *
     * 토스페이먼츠으로 부터 내려받은 LGD_PAYKEY(인증Key)를 가지고 최종 결제요청.(파라미터 전달시 POST를 사용하세요)
     */
	
	/* ※ 중요
	* 환경설정 파일의 경우 반드시 외부에서 접근이 가능한 경로에 두시면 안됩니다.
	* 해당 환경파일이 외부에 노출이 되는 경우 해킹의 위험이 존재하므로 반드시 외부에서 접근이 불가능한 경로에 두시기 바랍니다. 
	* 예) [Window 계열] C:\inetpub\wwwroot\lgdacom ==> 절대불가(웹 디렉토리)
	*/
	
	$configPath = "/home/kiraedu/payments/lgdacom/"; //토스페이먼츠에서 제공한 환경파일("/conf/lgdacom.conf,/conf/mall.conf") 위치 지정. 

    /*
     *************************************************
     * 1.최종결제 요청 - BEGIN
     *  (단, 최종 금액체크를 원하시는 경우 금액체크 부분 주석을 제거 하시면 됩니다.)
     *************************************************
     */
    // $CST_PLATFORM               = $_POST["CST_PLATFORM"];
    $CST_PLATFORM               = "service";
    
    $CST_MID                    = $_POST["CST_MID"];
    $LGD_MID                    = (("test" == $CST_PLATFORM)?"t":"").$CST_MID;
    $LGD_PAYKEY                 = $_POST["LGD_PAYKEY"];
    $LGD_PRODUCTINFO            = $_POST["LGD_PRODUCTINFO"];
    $LGD_BUYERPHONE             = explode('-',$_POST["LGD_BUYERPHONE"]);
    $mobile01 = $LGD_BUYERPHONE[0];
    $mobile02 = $LGD_BUYERPHONE[1];
    $mobile03 = $LGD_BUYERPHONE[2];
    
    $contentsCode               = $_POST['contentsCode'];
    $lectureStart               = $_POST['studyStart'];
    $lectureEnd                 = $_POST['studyEnd'];
    $serviceType                = $_POST['serviceType'];
    $userID                     = $_POST['userID'];
    $address01                  = $_POST['address01'];
    $address02                  = $_POST['address02'];
    $zipCode                    = $_POST['zipCode'];
    $birth                      = $_POST['birth'];
    
    
    

    require_once("../payments/lgdacom/XPayClient.php");

	// (1) XpayClient의 사용을 위한 xpay 객체 생성
	// (2) Init: XPayClient 초기화(환경설정 파일 로드) 
	// configPath: 설정파일
	// CST_PLATFORM: - test, service 값에 따라 lgdacom.conf의 test_url(test) 또는 url(srvice) 사용
	//				- test, service 값에 따라 테스트용 또는 서비스용 아이디 생성
    $xpay = &new XPayClient($configPath, $CST_PLATFORM);
	
	// (3) Init_TX: 메모리에 mall.conf, lgdacom.conf 할당 및 트랜잭션의 고유한 키 TXID 생성
	$xpay->Init_TX($LGD_MID);    
    $xpay->Set("LGD_TXNAME", "PaymentByKey");
    $xpay->Set("LGD_PAYKEY", $LGD_PAYKEY);
    
    //금액을 체크하시기 원하는 경우 아래 주석을 풀어서 이용하십시요.

    $queryDB = "SELECT * FROM nynContents WHERE contentsCode ='".$contentsCode."'";
    $resultDB = mysql_query($queryDB);
    $rowDB = mysql_fetch_array($resultDB);
    
    if($serviceType == '3'){
        $DB_AMOUNT = $rowDB['price']; //반드시 위변조가 불가능한 곳(DB나 세션)에서 금액을 가져오십시요.
    }else if($serviceType == '1'){
        $DB_AMOUNT = '0'; //반드시 위변조가 불가능한 곳(DB나 세션)에서 금액을 가져오십시요.
    }
    
	//$xpay->Set("LGD_AMOUNTCHECKYN", "Y");
	//$xpay->Set("LGD_AMOUNT", $DB_AMOUNT);
	    
    /*
     *************************************************
     * 1.최종결제 요청(수정하지 마세요) - END
     *************************************************
     */

    /*
     * 2. 최종결제 요청 결과처리
     *
     * 최종 결제요청 결과 리턴 파라미터는 연동메뉴얼을 참고하시기 바랍니다.
     */
	// (4) TX: lgdacom.conf에 설정된 URL로 소켓 통신하여 최종 인증요청, 결과값으로 true, false 리턴
    if ($xpay->TX()) {
        //1)결제결과 화면처리(성공,실패 결과 처리를 하시기 바랍니다.)
        // echo "결제요청이 완료되었습니다.  <br>";
        // echo "TX 통신 응답코드 = " . $xpay->Response_Code() . "<br>";		//통신 응답코드("0000" 일 때 통신 성공)
        // echo "TX 통신 응답메시지 = " . $xpay->Response_Msg() . "<p>";
            
        // echo "거래번호 : " . $xpay->Response("LGD_TID",0) . "<br>";
        // echo "상점아이디 : " . $xpay->Response("LGD_MID",0) . "<br>";
        // echo "상점주문번호 : " . $xpay->Response("LGD_OID",0) . "<br>";
        // echo "결제금액 : " . $xpay->Response("LGD_AMOUNT",0) . "<br>";
        // echo "결과코드 : " . $xpay->Response("LGD_RESPCODE",0) . "<br>";	//LGD_RESPCODE 가 반드시 "0000" 일때만 결제 성공, 그 외는 모두 실패
        // echo "결과메세지 : " . $xpay->Response("LGD_RESPMSG",0) . "<p>";
            
        $keys = $xpay->Response_Names();
        // foreach($keys as $name) {
        //     echo $name . " = " . $xpay->Response($name, 0) . "<br>";
        // }
         $LGD_BUYEREMAIL = $xpay->Response("LGD_BUYEREMAIL",0);

         $email = explode('@',$LGD_BUYEREMAIL);
        
        echo "<p>";
        // exit;
		// (5) DB에 요청 결과 처리
        if( "0000" == $xpay->Response_Code() ) {
			//통신상의 문제가 없을시
         	//최종결제요청 결과 성공 DB처리(LGD_RESPCODE 값에 따라 결제가 성공인지, 실패인지 DB처리)
            // echo "최종결제요청 결과 성공 DB처리하시기 바랍니다.<br>";
            
            //신청과정이 비환급과정이라면 결제완료
        
            $cansleLimitDate = date("Y-m-d", strtotime($lectureStart." -3days"));
        if($serviceType == '1'){
            $orderStatus = 'N';
        }else if($serviceType == '3'){
            $orderStatus = 'Y';
        }
            $query = "INSERT INTO nynOrder 
                            SET orderNum = '".$xpay->Response("LGD_OID",0)."',
                                serviceType = '".$serviceType."',
                                cancelLimitDate = '".$cansleLimitDate."',
                                contentsCode = '".$contentsCode."',
                                orderName = '".$LGD_PRODUCTINFO."',
                                userID = '".$userID."',
                                orderDate ='".$inputDate."',
                                lectureStart ='".$lectureStart."',
                                lectureEnd = '".$lectureEnd."',
                                recipientName ='".$xpay->Response("LGD_BUYER",0)."',
                                recipientBirth = '".$birth."',
                                recipientMobile01 = '".$mobile01."',
                                recipientMobile02 = '".$mobile02."',
                                recipientMobile03 = '".$mobile03."',
                                recipientEmail01 = '".$email[0]."',
                                recipientEmail02 = '".$email[1]."',
                                recipientZipCode = '".$zipCode."',
                                recipientAddress01 = '".$address01."',
                                recipientAddress02 = '".$address02."',
                                educationPrice = '".$DB_AMOUNT."',
                                orderTotalPrice = '".$xpay->Response("LGD_AMOUNT",0)."',
                                orderType = '".$xpay->Response("LGD_PAYTYPE",0)."',
                                orderStatus = '".$orderStatus."',
                                LGD_TID = '".$xpay->Response("LGD_TID",0)."',
                                LGD_OID = '".$xpay->Response("LGD_OID",0)."'";
            // echo $query;exit;
            $result = mysql_query($query);

            $queCount = "SELECT COUNT(seq) AS countL
                                FROM nynLectureOpen
                                WHERE lectureStart='".$lectureStart."'
                                AND lectureEnd='".$lectureEnd."'
                                AND openChapter='1'
                                AND serviceType='".$serviceType."'
                                AND contentsCode='".$contentsCode."'";
                // echo $queCount;
            $queResult = mysql_query($queCount,$bd);
            $queLRow = mysql_fetch_assoc($queResult);

            $countL = $queLRow['countL'];


            if($countL == 0) { // 처음 개설한다면 추가.
                $sql="INSERT INTO nynLectureOpen
                            SET lectureStart='".$lectureStart."',
                                    lectureEnd='".$lectureEnd."',
                                    contentsCode='".$contentsCode[$j]."',
                                    openChapter='1',
                                    serviceType='".$serviceType."'";
                
                $result = mysql_query($sql,$bd);
                $lectureOpenSeq = mysql_insert_id();

            } else { // 이미 개설되어 있으면 값을 불러온다.
                $queryL = "SELECT seq
                                FROM nynLectureOpen
                                WHERE lectureStart='".$lectureStart."'
                                AND lectureEnd='".$lectureEnd."'
                                AND openChapter='1'
                                AND serviceType='".$serviceType."'
                                AND contentsCode='".$contentsCode."'";
                // echo $queryL;
                //  exit;
                $resultL = mysql_query($queryL,$bd);
                $lectureOpenSeq = $rsL['seq'];
            }

            $queryC = " SELECT contentsCode, contentsName, chapter, totalPassMid, totalPassTest, totalPassReport, price, rPrice01, rPrice02, rPrice03, sourceType
                            FROM nynContents WHERE contentsCode='".$contentsCode."'";
                    $resultC = mysql_query($queryC, $bd);
                    $rsC = mysql_fetch_assoc($resultC);
                    $chapter = $rsC[chapter];
                    $totalPassMid = $rsC[totalPassMid];
                    $totalPassTest = $rsC[totalPassTest];
                    $totalPassReport = $rsC[totalPassReport];
					$contentsName = $rsC[contentsName];
                    $price = $rsC[price];
                    $rPrice01 = $rsC[rPrice01];
                    $rPrice02 = $rsC[rPrice02];
                    $rPrice03 = $rsC[rPrice03];
                    $sourceType = $rsC[sourceType];
                    
                    if($totalPassMid > 0 ) {
                        $midStatusQ = "midStatus='N', ";
                    }
                    if($totalPassTest > 0 ) {
                        $testStatusQ = "testStatus='N', ";
                    }
                    if($totalPassReport > 0 ) {
                        $reportStatusQ = "reportStatus='N', ";
                    }
                    // 복습기간 계산
                    $lectureReStudy = date("Y-m-d", strtotime($lectureEnd."+2"));
                    
                    $studyKey = $lectureOpenSeq."_".$userID;
                    $queryQ =  "lectureOpenSeq=".$lectureOpenSeq.",
                                            contentsCode='".$contentsCode."',
                                            companyCode='".$_SESSION['loginCompanyCode']."',
                                            serviceType='".$serviceType."',
                                            userID='".$userID."',
                                            lectureStart='".$lectureStart."',
                                            lectureEnd='".$lectureEnd."',
                                            lectureReStudy='".$lectureReStudy."',
                                            openChapter='1',
                                            progress='0',
                                            ".$midStatusQ."
                                            ".$testStatusQ."
                                            ".$reportStatusQ."
                                            tutor='tutor',
                                            studyKey='".$studyKey."'";
                    
                    
                    $queryI = "INSERT INTO nynStudy SET ".$queryQ;

                    $resultI = mysql_query($queryI,$bd);
                    if (!$resultI) { 
                        $isDBOK = false; 
                        echo $queryI;
                        exit;
                    }else{
                        $isDBOK = true; 
                    }
            //최종결제요청 결과를 DB처리합니다. (결제성공 또는 실패 모두 DB처리 가능)
			//상점내 DB에 어떠한 이유로 처리를 하지 못한경우 false로 변경해 주세요.
          
          	if( !$isDBOK ) {
           		echo "<p>";
           		$xpay->Rollback("상점 DB처리 실패로 인하여 Rollback 처리 [TID:" . $xpay->Response("LGD_TID",0) . ",MID:" . $xpay->Response("LGD_MID",0) . ",OID:" . $xpay->Response("LGD_OID",0) . "]");            		            		
            		
                echo "TX Rollback Response_code = " . $xpay->Response_Code() . "<br>";
                echo "TX Rollback Response_msg = " . $xpay->Response_Msg() . "<p>";
            		
                if( "0000" == $xpay->Response_Code() ) {
                  	echo "자동취소가 정상적으로 완료 되었습니다.<br>";
                }else{
          			echo "자동취소가 정상적으로 처리되지 않았습니다.<br>";
                }
             } else{
                echo "<script>top.window.location = '../study/'</script>";
             }         	
        }else{
          	//통신상의 문제 발생(최종결제요청 결과 실패 DB처리)
         	echo "최종결제요청 결과 실패 DB처리하시기 바랍니다.<br>";            	            
        }
    }else {
        //2)API 요청실패 화면처리
        echo "결제요청이 실패하였습니다.  <br>";
        echo "TX Response_code = " . $xpay->Response_Code() . "<br>";
        echo "TX Response_msg = " . $xpay->Response_Msg() . "<p>";
            
        //최종결제요청 결과 실패 DB처리
        echo "최종결제요청 결과 실패 DB처리하시기 바랍니다.<br>";            	                        
    }
?>

<?
//휴대폰 본인인증
		$sitecode = "BF402";				// NICE로부터 부여받은 사이트 코드
    $sitepasswd = "YHFCAUOoNO1P";			// NICE로부터 부여받은 사이트 패스워드
    $authtype = "M";      	// 없으면 기본 선택화면, X: 공인인증서, M: 핸드폰, C: 카드
		$popgubun 	= "N";		//Y : 취소버튼 있음 / N : 취소버튼 없음
		$customize 	= "";			//없으면 기본 웹페이지 / Mobile : 모바일페이지
    $reqseq = "REQ_0123456789";     // 요청 번호, 이는 성공/실패후에 같은 값으로 되돌려주게 되므로
    
    // 업체에서 적절하게 변경하여 쓰거나, 아래와 같이 생성한다.
		//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
			$reqseq = get_cprequest_no($sitecode);
		//} else {
		//	$reqseq = "Module get_request_no is not compiled into PHP";
		//}
    
    // CheckPlus(본인인증) 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
    $returnurl = "https://".$_SERVER["HTTP_HOST"]."/member/checkplus_success.php";	// 성공시 이동될 URL
    $errorurl = "https://".$_SERVER["HTTP_HOST"]."/member/checkplus_fail.php";		// 실패시 이동될 URL
	
    // reqseq값은 성공페이지로 갈 경우 검증을 위하여 세션에 담아둔다.
    
    $_SESSION["REQ_SEQ"] = $reqseq;
    // 입력될 plain 데이타를 만든다.
    $plaindata =  "7:REQ_SEQ" . strlen($reqseq) . ":" . $reqseq .
									"8:SITECODE" . strlen($sitecode) . ":" . $sitecode .
									"9:AUTH_TYPE" . strlen($authtype) . ":". $authtype .
									"7:RTN_URL" . strlen($returnurl) . ":" . $returnurl .
									"7:ERR_URL" . strlen($errorurl) . ":" . $errorurl .
									"11:POPUP_GUBUN" . strlen($popgubun) . ":" . $popgubun .
									"9:CUSTOMIZE" . strlen($customize) . ":" . $customize ;
    
		//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
			$enc_data = get_encode_data($sitecode, $sitepasswd, $plaindata);
		//} else {
		//	$enc_data = "Module get_request_data is not compiled into PHP";
		//}

    if( $enc_data == -1 )
    {
        $returnMsg = "암/복호화 시스템 오류입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -2 )
    {
        $returnMsg = "암호화 처리 오류입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -3 )
    {
        $returnMsg = "암호화 데이터 오류 입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -9 )
    {
        $returnMsg = "입력값 오류 입니다.";
        $enc_data = "";
    } else {
			$returnMsg = "";
		}

//아이핀 인증	
	$sSiteCode					= "CX60";			// IPIN 서비스 사이트 코드		(NICE평가정보에서 발급한 사이트코드)
	$sSitePw					= "kiraedu!@135";			// IPIN 서비스 사이트 패스워드	(NICE평가정보에서 발급한 사이트패스워드)
	$sReturnURL					= "https://".$_SERVER["HTTP_HOST"]."/member/ipin_process.php";			// 하단내용 참조
	$sCPRequest					= "";			// 하단내용 참조
	
	//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
		$sCPRequest = get_request_no($sSiteCode);
	//} else {
	//	$sCPRequest = "Module get_request_no is not compiled into PHP";
	//}
	
	// 현재 예제로 저장한 세션은 ipin_result.php 페이지에서 데이타 위변조 방지를 위해 확인하기 위함입니다.
	// 필수사항은 아니며, 보안을 위한 권고사항입니다.
		$_SESSION['CPREQUEST'] = $sCPRequest;
    
    $sEncData					= "";			// 암호화 된 데이타
		$sRtnMsg					= "";			// 처리결과 메세지
	
	// 리턴 결과값에 따라, 프로세스 진행여부를 파악합니다.
  
		//if (extension_loaded($module)) {/ 동적으로 모듈 로드 했을경우
		$sEncData = get_request_data($sSiteCode, $sSitePw, $sCPRequest, $sReturnURL);
		//} else {
		//	$sEncData = "Module get_request_data is not compiled into PHP";
		//}
    
    // 리턴 결과값에 따른 처리사항
    if ($sEncData == -9)
    {
    	$sRtnMsg = "입력값 오류 : 암호화 처리시, 필요한 파라미터값의 정보를 정확하게 입력해 주시기 바랍니다.";
    } else {
    	$sRtnMsg = "$sEncData 변수에 암호화 데이타가 확인되면 정상, 정상이 아닌 경우 리턴코드 확인 후 NICE평가정보 개발 담당자에게 문의해 주세요.";
    }

?>
<? include '../include/testHeader2.php' ?>

	<style>
		.float-banner .fb_inner {
			top: 400px;
		}
	</style>

</head>
<body>

<div class="skip_nav">
	<a href="#gnb">메인메뉴로 이동</a>
	<a href="#container">본문으로 이동</a>
</div>
<div id="wrap_main" class="study">
	<!-- 퀵메뉴 -->
	<? include '../include/quick_menu.php' ?>

	<script type="text/javascript">
		//실시간상담 팝업창
		function helpChat(){
			var popUrl = "/include/helpChat.php";
			var popOption = "width=380, height=550, resizable=no, scrollbars=no, status=no;";
			window.open(popUrl,"",popOption);
		}
	</script>

	<div id="header" class="custom_header">

		<div class="global_tab">
			<ul class="global_tab_ul">
				<li id="GNB_CS"><a onclick="window.open('/admin')" style="cursor:pointer;color:#ffcb05;">관리자모드</a></li>
				<li class="active"><a href="/bbs/mantomanNew.php">1:1학습상담</a></li>
				<li id="GNB_CS"><a href="/bbs/?boardCode=1">고객만족센터</a></li>
				<li><a onclick="alert('현재 진행중인 이벤트가 없습니다.');" style="cursor:pointer">이벤트</a></li>                   
				<!-- <li><a href="/mypage/modify.jsp">회원정보</a></li> -->                                     
			</ul>
		</div>
		<div class="util_wrap">
			<h2 class="hide">유틸 메뉴</h2>
			<h1 class="logo">
				<a href="/main/testIndex.php" title="메인페이지로 이동">
					<img src="../images/common/logo.jpg" alt="모두의러닝 (moduLEARNING)" onerror="" />&nbsp;
				</a>
			</h1>
			<div class="h_search">
				<form name="form_search" action="../main/search.jsp" method="get" onsubmit="return goSearch(this);">
					<input type="text" name="s_keyword" class="search_txt" placeholder=""><button type="submit" class="search_btn"></button>
				</form>
			</div>
			<!-- <div class="h_call"><img src="../images/common/h_call.png"></div> -->
			<div class="util_menu">
				<ul>								
					<li><a href="/member/login.php" title="로그인페이지로 이동"><img src="../images/common/header_icon1.png"> 로그인</a></li>
					<li><a onclick="alert('현재 회원가입을 받고 있지 않습니다.');" style="cursor:pointer" title="회원가입 페이지로 이동"><img src="../images/common/header_icon2.png"> 회원가입</a></li>
				</ul>				
			</div>
		</div>
		<div class="inner">

			<div class="menu_wrap">
				<h2 class="hide">메인 메뉴</h2>
				<div class="hamburger">
					<span class="line"></span>
					<span class="line"></span>
					<span class="line"></span>
				</div>
				<ul id="gnb">                       
					<li id="GNB_INTRO">
						<a href="/about/testIndex.php?pid=1" title="고객센터 페이지로 이동">모두의러닝</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/about/testIndex.php?pid=1">모두의러닝</a></li>
							<li><a href="/about/testIndex.php?pid=2">교육체계수립</a></li>
							<li><a href="/about/testIndex.php?pid=3">교육운영서비스</a></li>
							<li><a href="/about/testIndex.php?pid=4">교육시스템</a></li>
							<li><a href="/about/testIndex.php?pid=5">찾아오시는길</a></li>
						</ul>
					</li>

					<li id="GNB_COURSE1">
						<a href="/course/course_list.jsp?cid=1&ch=course1" title="직무교육 페이지로 이동">직무교육</a>
						<ul class="gnb_sub" style="display: none;">
						</ul>
					</li>
					<!-- <li id="GNB_COURSE2">
						<a href="/course/course_list.jsp?cid=2&ch=course2" title="수강신청 페이지로 이동">마이크로러닝</a>
						<ul class="gnb_sub" style="display: none;">
							<li id="LNB_COURSE_8"><a href="/course/course_list.jsp?cid=8&ch=course2" title="직급별 페이지로 이동">직급별</a></li>
					<li id="LNB_COURSE_9"><a href="/course/course_list.jsp?cid=9&ch=course2" title="직무특화 페이지로 이동">직무특화</a></li>
					<li id="LNB_COURSE_10"><a href="/course/course_list.jsp?cid=10&ch=course2" title="직무공통 페이지로 이동">직무공통</a></li>
					<li id="LNB_COURSE_11"><a href="/course/course_list.jsp?cid=11&ch=course2" title="자기계발 페이지로 이동">자기계발</a></li>
					
						</ul>
					</li> -->
					<li id="GNB_COURSE3">
						<a href="/safe/index.php?pid=1" title="산업안전교육 페이지로 이동">산업안전교육</a>
						<ul class="gnb_sub" style="display: none;">                             
							<li><a href="/safe/index.php?pid=1">산업안전보건교육</a></li>
							<li><a href="/safe/index.php?pid=2">관리감독자교육</a></li>
						</ul>
					</li>
					<li id="GNB_LAW">
						<a href="/court/" title="법정필수교육 페이지로 이동">법정필수교육</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/court/">법정필수교육</a></li>                                                               
						</ul>
					</li>
					<li id="GNB_GOV">
						<a href="/govSupport/" title="정부지원사업 페이지로 이동">정부지원사업</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/govSupport/">비대면 바우처</a></li>
							<li id="GNB_WORKER"><a href="/hrdStudy/index.php?pid=1">국민내일배움카드</a></li>
							<li id="GNB_OWNER"><a href="/refund/index.php?pid=1">사업주 환급</a></li>
						</ul>
					</li>
					<li>
						<a href="" title="">학습지원센터</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/bbs/?boardCode=1">공지사항</a></li>
							<li><a href="/?boardCode=12">시스템 공지안내</a></li>
							<li><a href="/bbs/?boardCode=2">자주묻는 질문</a></li>
							<li><a href="/bbs/?boardCode=17">학습자료실</a></li>
							<li><a href="/download/">뷰어다운로드</a></li>
							<li><a href="/bbs/mantomanNew.php">1:1 학습문의</a></li>
							<li><a href="/bbs/?boardCode=3">수강후기</a></li>
							<li><a href="https://939.co.kr/kiraedu/">PC원격지원</a></li>
															<li><a href="/eduinfo/">위탁교육안내</a></li>
							<li><a href="/eduinfo/logic.php">교육진행절차</a></li>
							<li><a href="/eduinfo/goyong.php">환급절차</a></li>
							<li><a href="/eduinfo/rule.php">교육이용 안내</a></li>
						</ul>
					</li>
					<li id="GNB_MY">
														<a href="/member/login.php?page=study" title="나의강의실 페이지로 이동">나의강의실</a>
													

						<ul class="gnb_sub" style="display: none;">
								<li><a href="/member/login.php?page=study">진행중인 과정</a></li>
								<li><a href="/member/login.php?page=study">학습종료 과정</a></li>
								<li><a href="/member/login.php?page=study">수강신청 내역</a></li>
								<li><a href="/member/login.php?page=study">상담신청 내역</a></li>
								<li><a href="/member/login.php?page=study">토론게시판</a></li>
								<li><a href="/member/login.php?page=study">나만의 학습노트</a></li>
								<li><a href="/member/login.php?page=study">개인/추가 결제</a></li>
																						
						</ul>
						
					</li>
					<!--
					<li id="GNB_INTRO" class="first">
						<a href="/main/page.jsp?pid=intro.greeting" title="소개 페이지로 이동">사업주지원</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/main/page.jsp?pid=intro.greeting">사업주훈련안내</a></li>
							<li><a href="/main/page.jsp?pid=intro.greeting2">훈련절차</a></li>
							<li><a href="/main/page.jsp?pid=intro.greeting3">환급절차 및 기간</a></li>
							<li><a href="/main/page.jsp?pid=intro.greeting4">수강생 유의사항</a></li>
							<li><a href="/main/page.jsp?pid=intro.greeting5">모사답안처리기준</a></li>
							<li><a href="/main/page.jsp?pid=intro.greeting6">훈련과정개발절차</a></li>
							<li><a href="/main/formmail.jsp?ch=board">사업주위탁 훈련문의</a></li>
						</ul>
					</li>
					<li id="GNB_INFO">
						<a href="/main/page.jsp?pid=intro.worker01" title="근로자카드">근로자카드</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/main/page.jsp?pid=intro.worker01">근로자훈련안내</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker02">근로자카드 발급조건</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker03">근로자카드 발급절차</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker04">수강생 유의사항</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker05">모사답안처리기준</a></li>
						</ul>
					</li>
					<li id="GNB_CS">
						<a href="/board/index.jsp?code=notice" title="고객센터 페이지로 이동">고객센터</a>
						<ul class="gnb_sub" style="display: none;">
							<li><a href="/board/index.jsp?">공지사항</a></li>
							<li><a href="/board/index.jsp?code=faq">자주하는 질문</a></li>
							<li><a href="/board/index.jsp?code=qna">Q&A</a></li>
							<li><a href="/board/index.jsp?code=pds">자료실</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker06">다운로드</a></li>
							<li><a href="/main/page.jsp?pid=intro.worker07">학습장애 해결방법</a></li>
							<li><a href="/main/page.jsp?pid=intro.support5">원격지원요청</a></li>
						</ul>
					</li>
					-->
				</ul><!-- end_gnb -->
				<div class="all_list">
					<ul class="a_inner clear">                            
						<li class="al_bg">
							<p>모두의러닝</p>
							<ul>
								<li><a href="/about/testIndex.php?pid=1">모두의러닝</a></li>
								<li><a href="/about/testIndex.php?pid=2">교육체계수립</a></li>
								<li><a href="/about/testIndex.php?pid=3">교육운영서비스</a></li>
								<li><a href="/about/testIndex.php?pid=4">교육시스템</a></li>
								<li><a href="/about/testIndex.php?pid=5">찾아오시는길</a></li>
							</ul>
						</li>
						<li>
							<p>직무교육</p>
							<ul>
								<li id="LNB_COURSE_143"><a href="/course/course_list.jsp?cid=143&ch=course1" title="관리감독자 페이지로 이동">관리감독자</a></li>
								<li id="LNB_COURSE_4"><a href="/course/course_list.jsp?cid=4&ch=course1" title="직급별 페이지로 이동">직급별</a></li>
								<li id="LNB_COURSE_5"><a href="/course/course_list.jsp?cid=5&ch=course1" title="직무특화 페이지로 이동">직무특화</a></li>
								<li id="LNB_COURSE_6"><a href="/course/course_list.jsp?cid=6&ch=course1" title="직무공통 페이지로 이동">직무공통</a></li>
								<li id="LNB_COURSE_7"><a href="/course/course_list.jsp?cid=7&ch=course1" title="자기계발 페이지로 이동">자기계발</a></li>

							</ul>
						</li>

						<!-- <li class="al_bg">
							<p>마이크로러닝</p>
							<ul>
								<li id="LNB_COURSE_8"><a href="/course/course_list.jsp?cid=8&ch=course2" title="직급별 페이지로 이동">직급별</a></li>
								<li id="LNB_COURSE_9"><a href="/course/course_list.jsp?cid=9&ch=course2" title="직무특화 페이지로 이동">직무특화</a></li>
								<li id="LNB_COURSE_10"><a href="/course/course_list.jsp?cid=10&ch=course2" title="직무공통 페이지로 이동">직무공통</a></li>
								<li id="LNB_COURSE_11"><a href="/course/course_list.jsp?cid=11&ch=course2" title="자기계발 페이지로 이동">자기계발</a></li>
						
							</ul>
						</li> -->
						<li class="al_bg">
							<p>산업안전교육</p>
							<ul>
								<li><a href="/safe/">산업안전보건교육</a></li>
								<li><a href="/safe/">관리감독자교육</a></li>
							</ul>
						</li>
						<li>
							<p>법정필수교육</p>
							<ul>                                    
								<li><a href="/court/">법정필수교육</a></li>   
							</ul>
						</li>
						<li class="al_bg">
							<p>정부지원사업</p>
							<ul>
								<li><a href="/govSupport/">비대면 바우처</a></li>
								<li><a href="/hrdStudy/index.php?pid=1">국민내일배움카드</a></li>
								<li><a href="/refund/index.php?pid=1">사업주 환급</a></li>
							</ul>
						</li>
						<li>
							<p>학습지원센터</p>
							<ul>
								<li><a href="/bbs/?boardCode=1">공지사항</a></li>
								<li><a href="/?boardCode=12">시스템 공지안내</a></li>
								<li><a href="/bbs/?boardCode=2">자주묻는 질문</a></li>
								<li><a href="/bbs/?boardCode=17">학습자료실</a></li>
								<li><a href="/download/">뷰어다운로드</a></li>
								<li><a href="/bbs/mantomanNew.php">1:1 학습문의</a></li>
								<li><a href="/bbs/?boardCode=3">수강후기</a></li>
								<li><a href="https://939.co.kr/kiraedu/">PC원격지원</a></li>
								<li><a href="/eduinfo/">위탁교육안내</a></li>
								<li><a href="/eduinfo/logic.php">교육진행절차</a></li>
								<li><a href="/eduinfo/goyong.php">환급절차</a></li>
								<li><a href="/eduinfo/rule.php">교육이용 안내</a></li>
							</ul>
						</li>
						<li class="al_bg">
							<p>나의 강의실</p>
							<ul>
								<li><a href="/member/login.php?page=study">진행중인 과정</a></li>
								<li><a href="/member/login.php?page=study">학습종료 과정</a></li>
								<li><a href="/member/login.php?page=study">수강신청 내역</a></li>
								<li><a href="/member/login.php?page=study">상담신청 내역</a></li>
								<li><a href="/member/login.php?page=study">토론게시판</a></li>
								<li><a href="/member/login.php?page=study">나만의 학습노트</a></li>
								<li><a href="#">인증방법</a></li>
								<li><a href="#">아이핀 인증방법</a></li>
								<li><a href="#">아이핀 발급방법</a></li>										
							</ul>
						</li>
					</ul>
				</div><!-- end_all_list -->
			</div><!-- end_menu_wrap -->
		</div><!-- end_inner -->

	</div><!-- end_header -->

	<script>
		$(function() {
			$(".hamburger").click(function() {
				$('.all_list').finish().slideToggle();
				$(this).toggleClass("is-active");
			});
			$(".menu_wrap #gnb > li").mouseenter(function(){
				$(this).contents('.gnb_sub').finish().finish().stop().slideDown(300);
			});
			$(".menu_wrap #gnb > li").mouseleave(function(){
				$(this).contents('.gnb_sub').finish().finish().slideUp(300);
			});
			$(".gnb_sub").mouseenter(function(){
				$(this).finish().stop().css("display","block");
			});
		});
	</script>

	<div id="container">
		<div class="main_wrap">

			<div class="category_area">
				<ul class="category_list">
					<li id="intro01" class='on'><a href="temp_진행중인과정.html">진행중인 과정</a></li>
					<li id="intro02"><a href="temp_학습종료과정.html">학습종료과정</a></li>
					<li id="intro03"><a href="temp_수강신청내역.html">수강신청내역</a></li>
					<li id="intro04"><a href="temp_상담신청내역.html">상담신청내역</a></li>
					<li id="intro05"><a href="temp_토론게시판.html">토론게시판</a></li>
					<li id="intro06"><a href="temp_나만의학습노트.html">나만의 학습노트</a></li>
					<li id="intro07"><a href="temp_인증방법.html">인증방법</a></li>
					<li id="intro08"><a href="temp_아이핀인증방법.html">아이핀 인증방법</a></li>
					<li id="intro09"><a href="temp_아이핀발급방법.html">아이핀 발급방법</a></li>
				</ul>
			</div>
						
			<div class="content_area">
				<div class="path">
					<ol class="path_list">
						<li>나의 강의실</li>
						<li class="last">진행 중인 과정</li>
					</ol>
				</div>

				<h4 class="content_title">진행 중인 과정</h4>

				<div class="content_body">

					<h3 class="studyinfo">현재 <strong>이응민</strong>님은 <span>총 <strong class="blue">4</strong>개 과정의 학습이 진행 중입니다.</span></h3>

					<div id="noticeArea">
						<img src="../images/study/icon_study.png" alt="강의 주의사항 아이콘">
						<div class="noticeArea02">
						<h1>학습 주의사항</h1>
						<ul>
							<li>순차학습으로 진행되며, <strong class="red01">1일 최대 8차시까지만</strong> 학습이 가능합니다.</li>
							<li>중간평가, 최종평가, 과제는 <strong class="red01">최종제출 후에는 재응시 불가능</strong>합니다(<strong>1회만 응시 가능</strong>).</li>
							<li>최종평가는 <strong class="red01">응시 제한시간이 있으며,</strong> 응시 도중 접속종료를 하더라도 <strong class="red01">계속 시간이 흘러갑니다.</strong></li>
							<li>점수확인은 <strong>학습종료일이 지난 후, 1주일 이내</strong>에 확인할 수 있습니다(주말 및 공휴일 제외).</li>
						</ul>
						<!--<p>점수확인은 <strong>학습 종료일이 지난 후, 3~4일 이내</strong>에 확인할 수 있습니다. (주말 및 공휴일 제외)</p>-->
						</div>
					</div>

					<ul>
						<li class="list348394">
							<ol class="summuryArea" onclick="">
								<li><img src="../images/개인.PNG" alt="강의 이미지"></li>
								<li>
									<h3>카드뉴스로 보는 개인정보보호 교육</h3>
									<h4>수강기간 : 2021-10-21 ~ 2021-11-20</h4>
									<h5>
										첨삭강사 : 교강사
										<strong>모바일 학습 가능</strong>
										<button type="button" class="score" onclick="alert('점수 확인은 학습종료일(11월 20일) 이후 1주일 이내에 가능합니다')">점수확인안내</button>
									</h5>
								</li>
								<li>
									<div>
										<h4>남은 수강일</h4>
										<strong>21</strong>일
									</div>
									<div>
										<h4>차시 진도</h4>
										<strong>1</strong>/1
									</div>
									<div>
										<h4>진도율</h4>
										<strong class="totlaProgress01">100</strong>%
									</div>								
								</li>								
							</ol>
							<section>
								
								<ul class="progress">
									<li>
										<h4>권장 진도율<strong>30</strong></h4>
										<div><p style="width:30%"></p></div>
									</li>
									<li>
										<h4>내 진도율<strong class="totlaProgress02">100</strong></h4>
										<div><p style="width:100%"></p></div>
									</li>
									<li>
										<h4>평균 진도율<strong>48</strong></h4>
										<div><p style="width:48%"></p></div>
									</li>
								</ul>
								
								<ul class="passCheck">
									<li>
										<h4>수료기준</h4>
										<table>
											<tbody>
												<tr>
													<th>수강정원</th>
													<th>총 진도율</th>
													<th>중간평가</th>
													<th>최종평가</th>
													<th>과제</th>
												</tr>
												<tr>
													<td rowspan="2"><strong>0</strong>명</td>
													<td rowspan="2"><strong>100</strong>% 이상</td>
													<td>평가없음&nbsp;<strong></strong></td>
													<td>총&nbsp;<strong></strong></td>
													<td>과제 없음</td>
												</tr>
												<tr>
													<td colspan="3" class="rowSpan">반영된 평가 점수 합산  <strong>0</strong>점 이상 </td>
												</tr>
											</tbody>
										</table>
									</li>
									<li><a href="javascript:openDetail('EVD230')"><h1>교육과정</h1>상세보기</a></li>
								</ul>
								<ul class="testEval">
									<li onclick="alert('평가 없는 과정')">
										<h1>중간평가</h1>
										<strong class="red">평가 없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('평가 없는 과정')">
										<h1>최종평가</h1>
										<strong class="red">평가없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('과제가 없는 과정입니다.')">
										<h1>과제제출</h1>
										<strong class="red">과제 없음</strong><br>
										<span>과제가 없는 과정</span>
									</li>
								</ul>
								<form class="lectureForm348394" action="https://cont4.modulearning.kr/player/popupStudy.php" method="post" target="studyWindow">
									<input type="hidden" name="seq" value="348394">
									<input type="hidden" name="subDomains" value="">
									<input type="hidden" name="sourceType" value="html5">
									<input type="hidden" name="contentsCode" value="EVD230">
									<input type="hidden" name="lectureOpenSeq" value="7111">
									<input type="hidden" name="chapter" value="">
									<input type="hidden" name="types" value="">
									<ul class="classList">	

										<li class="lecture3483941">
											<h4>1차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

										<li class="lecture3483941">
											<h4>13차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

									</ul>
								</form>
							</section>
							<button class="showDetail" type="button" onclick="viewStudyDetail(348394,'EVD230',7111)"></button> <!-- -->
						</li>
						<li class="list348394">
							<ol class="summuryArea" onclick="">
								<li><img src="../images/개인.PNG" alt="강의 이미지"></li>
								<li>
									<h3>카드뉴스로 보는 개인정보보호 교육</h3>
									<h4>수강기간 : 2021-10-21 ~ 2021-11-20</h4>
									<h5>
										첨삭강사 : 교강사
										<strong>모바일 학습 가능</strong>
										<button type="button" class="score" onclick="alert('점수 확인은 학습종료일(11월 20일) 이후 1주일 이내에 가능합니다')">점수확인안내</button>
									</h5>
								</li>
								<li>
									<div>
										<h4>남은 수강일</h4>
										<strong>21</strong>일
									</div>
									<div>
										<h4>차시 진도</h4>
										<strong>1</strong>/1
									</div>
									<div>
										<h4>진도율</h4>
										<strong class="totlaProgress01">100</strong>%
									</div>								
								</li>								
							</ol>
							<section>
								
								<ul class="progress">
									<li>
										<h4>권장 진도율<strong>30</strong></h4>
										<div><p style="width:30%"></p></div>
									</li>
									<li>
										<h4>내 진도율<strong class="totlaProgress02">100</strong></h4>
										<div><p style="width:100%"></p></div>
									</li>
									<li>
										<h4>평균 진도율<strong>48</strong></h4>
										<div><p style="width:48%"></p></div>
									</li>
								</ul>
								
								<ul class="passCheck">
									<li>
										<h4>수료기준</h4>
										<table>
											<tbody>
												<tr>
													<th>수강정원</th>
													<th>총 진도율</th>
													<th>중간평가</th>
													<th>최종평가</th>
													<th>과제</th>
												</tr>
												<tr>
													<td rowspan="2"><strong>0</strong>명</td>
													<td rowspan="2"><strong>100</strong>% 이상</td>
													<td>평가없음&nbsp;<strong></strong></td>
													<td>총&nbsp;<strong></strong></td>
													<td>과제 없음</td>
												</tr>
												<tr>
													<td colspan="3" class="rowSpan">반영된 평가 점수 합산  <strong>0</strong>점 이상 </td>
												</tr>
											</tbody>
										</table>
									</li>
									<li><a href="javascript:openDetail('EVD230')"><h1>교육과정</h1>상세보기</a></li>
								</ul>
								<ul class="testEval">
									<li onclick="alert('평가 없는 과정')">
										<h1>중간평가</h1>
										<strong class="red">평가 없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('평가 없는 과정')">
										<h1>최종평가</h1>
										<strong class="red">평가없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('과제가 없는 과정입니다.')">
										<h1>과제제출</h1>
										<strong class="red">과제 없음</strong><br>
										<span>과제가 없는 과정</span>
									</li>
								</ul>
								<form class="lectureForm348394" action="https://cont4.modulearning.kr/player/popupStudy.php" method="post" target="studyWindow">
									<input type="hidden" name="seq" value="348394">
									<input type="hidden" name="subDomains" value="">
									<input type="hidden" name="sourceType" value="html5">
									<input type="hidden" name="contentsCode" value="EVD230">
									<input type="hidden" name="lectureOpenSeq" value="7111">
									<input type="hidden" name="chapter" value="">
									<input type="hidden" name="types" value="">
									<ul class="classList">	

										<li class="lecture3483941">
											<h4>1차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

										<li class="lecture3483941">
											<h4>13차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

									</ul>
								</form>
							</section>
							<button class="showDetail" type="button" onclick="viewStudyDetail(348394,'EVD230',7111)"></button> <!-- -->
						</li>

						<li class="list348394">
							<ol class="summuryArea" onclick="">
								<li><img src="../images/개인.PNG" alt="강의 이미지"></li>
								<li>
									<h3>카드뉴스로 보는 개인정보보호 교육</h3>
									<h4>수강기간 : 2021-10-21 ~ 2021-11-20</h4>
									<h5>
										첨삭강사 : 교강사
										<strong>모바일 학습 가능</strong>
										<button type="button" class="score" onclick="alert('점수 확인은 학습종료일(11월 20일) 이후 1주일 이내에 가능합니다')">점수확인안내</button>
									</h5>
								</li>
								<li>
									<div>
										<h4>남은 수강일</h4>
										<strong>21</strong>일
									</div>
									<div>
										<h4>차시 진도</h4>
										<strong>1</strong>/1
									</div>
									<div>
										<h4>진도율</h4>
										<strong class="totlaProgress01">100</strong>%
									</div>								
								</li>								
							</ol>
							<section>
								
								<ul class="progress">
									<li>
										<h4>권장 진도율<strong>30</strong></h4>
										<div><p style="width:30%"></p></div>
									</li>
									<li>
										<h4>내 진도율<strong class="totlaProgress02">100</strong></h4>
										<div><p style="width:100%"></p></div>
									</li>
									<li>
										<h4>평균 진도율<strong>48</strong></h4>
										<div><p style="width:48%"></p></div>
									</li>
								</ul>
								
								<ul class="passCheck">
									<li>
										<h4>수료기준</h4>
										<table>
											<tbody>
												<tr>
													<th>수강정원</th>
													<th>총 진도율</th>
													<th>중간평가</th>
													<th>최종평가</th>
													<th>과제</th>
												</tr>
												<tr>
													<td rowspan="2"><strong>0</strong>명</td>
													<td rowspan="2"><strong>100</strong>% 이상</td>
													<td>평가없음&nbsp;<strong></strong></td>
													<td>총&nbsp;<strong></strong></td>
													<td>과제 없음</td>
												</tr>
												<tr>
													<td colspan="3" class="rowSpan">반영된 평가 점수 합산  <strong>0</strong>점 이상 </td>
												</tr>
											</tbody>
										</table>
									</li>
									<li><a href="javascript:openDetail('EVD230')"><h1>교육과정</h1>상세보기</a></li>
								</ul>
								<ul class="testEval">
									<li onclick="alert('평가 없는 과정')">
										<h1>중간평가</h1>
										<strong class="red">평가 없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('평가 없는 과정')">
										<h1>최종평가</h1>
										<strong class="red">평가없음</strong><br>
										<span>평가 없는 과정</span>
									</li>
									<li onclick="alert('과제가 없는 과정입니다.')">
										<h1>과제제출</h1>
										<strong class="red">과제 없음</strong><br>
										<span>과제가 없는 과정</span>
									</li>
								</ul>
								<form class="lectureForm348394" action="https://cont4.modulearning.kr/player/popupStudy.php" method="post" target="studyWindow">
									<input type="hidden" name="seq" value="348394">
									<input type="hidden" name="subDomains" value="">
									<input type="hidden" name="sourceType" value="html5">
									<input type="hidden" name="contentsCode" value="EVD230">
									<input type="hidden" name="lectureOpenSeq" value="7111">
									<input type="hidden" name="chapter" value="">
									<input type="hidden" name="types" value="">
									<ul class="classList">	

										<li class="lecture3483941">
											<h4>1차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

										<li class="lecture3483941">
											<h4>13차시</h4>
											<div class="classInfo">
												<strong>개인정보보호 교육</strong><br>
												교육이수 시간 : 2021-10-26 16:08:55<br>
												접속아이피 : 211.108.232.23
											</div>
											<p>100%</p>
											<div class="btnSet">
												<button type="button" title="이어보기" onclick="studyPop(this,1)">이어보기</button>
												<button type="button" title="학습하기" onclick="studyPop(this,1,'new')">학습하기</button>
											</div>
										</li>	

									</ul>
								</form>
							</section>
							<button class="showDetail" type="button" onclick="viewStudyDetail(348394,'EVD230',7111)"></button> <!-- -->
						</li>

					</ul>

					<script>						

						document.querySelector(".content_body").addEventListener("click", 
							function(e){  

								let a;

								if( e.target.classList.contains("showDetail") )
									a = e.target;							
								else
									a = findClass(e.target, "summuryArea");


								if( a === null ) return;

								if( a.parentNode.classList.contains("openClass") )
									a.parentNode.classList.remove("openClass");
								else
									a.parentNode.classList.add("openClass");
									

						});

						function findClass(elem, className){

							let elemName = elem;

							while( !elemName.classList.contains(className) )
							{
								elem = elem.parentNode;

								if( elem === document ) return null;

								elemName = elem;
							}		
							
							return elem;
						}

					</script>					

					

				</div><!-- end_content_body -->

			</div><!-- end_content_area -->

		</div><!-- end_main_wrap -->
	</div><!-- end_container -->
</div><!-- end_wrap_main -->




<div id="footer" >
	<div class="foot_menu">
		<h2 class="hide">하단 메뉴</h2>
		<ul class="foot_list">
		<!-- <li class="first"><a href="/main/page.jsp?pid=intro.greeting" title="소개페이지로 이동" >소개</a></li> -->
			<li class="first"><a href="/member/index.php?pid=5" title="이용약관 페이지로 이동" >이용약관</a></li>
			<li><a href="/member/index.php?pid=4" title="개인정보처리방침 페이지로 이동" class="footer_privacy_policy">개인정보처리방침</a></li>
			<li><a href="/member/index.php?pid=6" title=" 페이지로 이동" >환불규정</a></li>
			<li><a href="/about/testIndex.php?pid=5" title="찾아오시는길 페이지로 이동" >찾아오시는길</a></li>
		</ul>
	</div>
	<div class="copy">
		<div class="foot_info">
			<!--  -->
			<p>주식회사 모두의러닝 |  대표자 : 이영신  |  주소 : 서울특별시 금천구 가산디지털1로 75-15, 6층 621-625호(가산동, 하우스디 와이즈타워)<br>
			TEL : 1544-9335  |  사업자등록번호 : 272-81-01049  |  통신판매업번호 : 2020-서울금천-2107 <br>
			개인정보 관리책임자 : 이영신(ceo@modulearning.kr) | 개인정보 보유기간: : 회원탈퇴시까지<br>
			COPYRIGHT 2021 주식회사 모두의러닝 ALLRIGHT & RESERVED. <br>
			</p>
		</div>
	</div>
</div><!-- end_footer -->
<iframe src="about:blank" name="sysfrm" id="sysfrm" width="100%" height="0" scrolling="no" frameborder="0"></iframe>


<div id="temp"></div>

</body>
</html>
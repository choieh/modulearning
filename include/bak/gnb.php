<script type="text/javascript">
	//실시간상담 팝업창
	function helpChat(){
	  var popUrl = "/include/helpChat.php";
	  var popOption = "width=380, height=550, resizable=no, scrollbars=no, status=no;";
		window.open(popUrl,"",popOption);
	}

	//임시 햄버거 버튼 이벤트
//	document.querySelector(".hamburger").addEventListener("click", function(){
//	  if( this.classList.contains("is-active") ){
//		this.classList.remove("is-active");
//		document.querySelector(".all_list").style.display = "none";
//	  }
//	  else{
//		this.classList.add("is-active");
//		document.querySelector(".all_list").style.display = "block";
//	  }  	
//	});

</script>

<div id="header" class="custom_header">
			<div class="global_tab">
				<ul class="global_tab_ul">
					<? if($_SESSION['loginUserLevel'] < 9 ) { ?>
					<li id="GNB_CS"><a onclick="window.open('/admin')" style="cursor:pointer;color:#ffcb05;">관리자모드</a></li>
					<? } ?>
					<li class="active"><a href="/bbs/mantoman.php">1:1학습상담</a></li>
					<!-- <li id="GNB_CS"><a href="/bbs/?boardCode=1">고객만족센터</a></li> -->
					<? if($_SESSION['loginUserID'] != "" ){ ?>	
					<li id="GNB_CS"><a href="/member/mypage.php">개인정보변경</a></li>					
					<? } ?>
					<li><a onclick="alert('현재 진행중인 이벤트가 없습니다.');" style="cursor:pointer">이벤트</a></li>					
					<!-- <li><a href="/mypage/modify.jsp">회원정보</a></li> -->										
				</ul>
			</div>
			<div class="util_wrap">
				<h2 class="hide">유틸 메뉴</h2>
				<h1 class="logo">
					<a href="/main/index.php" title="메인페이지로 이동">
						<img src="/images/common/logo.jpg" alt="모두의러닝 (moduLEARNING)" onerror="" />&nbsp;
					</a>
				</h1>
				<!--<div class="h_search">
					<form name="form_search" action="../main/search.jsp" method="get" onsubmit="return goSearch(this);">
						<input type="text" name="s_keyword" class="search_txt" placeholder=""><button type="submit" class="search_btn"></button>
					</form>
				</div>-->
				<!-- <div class="h_call"><img src="/html/images/common/h_call.png"></div> -->
				<div class="util_menu">
					<ul>	
					    <? if($_SESSION['loginUserID'] == "" ){ ?>							    
							<li><a href="/member/index.php?pid=1" title="로그인페이지로 이동"><img src="/images/common/header_icon1.png"> 로그인</a></li>
							<? if ($_SERVER["REMOTE_ADDR"] == "211.108.232.23" || $_SERVER["REMOTE_ADDR"] == "115.93.211.44") { ?>
								<li><a href="/member/mypage.php" style="cursor:pointer" title="회원가입 페이지로 이동"><img src="/images/common/header_icon2.png"> 회원가입</a></li>
							<? } else { ?>
								<li><a onclick="alert('현재 회원가입을 받고 있지 않습니다.');" style="cursor:pointer" title="회원가입 페이지로 이동"><img src="/images/common/header_icon2.png"> 회원가입</a></li>
							<? } ?>
						<? } else { ?>
							<li><a onclick="logOut();" style="cursor:pointer" title="로그아웃"><img src="/images/common/header_icon1.png"> 로그아웃</a></li>					
						<? } ?>
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
							<a href="/about/index.php?pid=1" title="고객센터 페이지로 이동">교육원소개</a>
							<ul class="gnb_sub" style="display: none;">
								<li><a href="/about/index.php?pid=1">모두의러닝</a></li>
								<li><a href="/about/index.php?pid=2">교육체계수립</a></li>
								<li><a href="/about/index.php?pid=3">교육운영서비스</a></li>
								<li><a href="/about/index.php?pid=4">교육시스템</a></li>
								<li><a href="/about/index.php?pid=5">찾아오시는길</a></li>
								<li><a href="/promotion/index.php?pid=1">홍보자료</a></li>
							</ul>
						</li>

						<li id="GNB_COURSE1">
							<a href="/lecture/?sort01=lecture07" title="직무교육 페이지로 이동">직무교육</a>
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
								<li><a href="/safe/index.php?pid=3">이용안내</a></li>
								<li><a href="/bbs/?boardCode=47">산업안전 자료실</a></li>
							</ul>
						</li>
						<li id="GNB_LAW">
							<a href="/court/" title="법정필수교육 페이지로 이동">법정필수교육</a>
							<ul class="gnb_sub" style="display: none;">
								<li><a href="/court/">법정필수교육</a></li>																
							</ul>
						</li>
						<li id="GNB_GOV">
							<a href="/digital/" title="정부지원사업 페이지로 이동">정부지원사업</a>
							<ul class="gnb_sub" style="display: none;">
								<!-- <li><a href="/govSupport/">비대면 바우처</a></li> -->
								<li><a href="/digital/">디지털융합</a></li>
								<li><a href="/trainingCard/">기업직업훈련카드</a></li>
								<li id="GNB_OWNER"><a href="/refund/index.php?pid=1">사업주 환급</a></li>
								<li id="GNB_WORKER"><a href="/hrdStudy/index.php?pid=1">국민내일배움카드</a></li>
							</ul>
						</li>
						<li>
							<a href="/bbs/?boardCode=1" title="">학습지원센터</a>
							<ul class="gnb_sub" style="display: none;">
								<li><a href="/bbs/?boardCode=1">공지사항</a></li>
								<li><a href="/bbs/?boardCode=12">시스템 공지안내</a></li>
								<li><a href="/bbs/?boardCode=162">뉴스레터</a></li>
								<li><a href="/bbs/?boardCode=2">자주묻는 질문</a></li>
								<li><a href="/bbs/?boardCode=17">학습자료실</a></li>
								<li><a href="/download/">뷰어다운로드</a></li>
								<li><a href="/bbs/mantoman.php">1:1 학습문의</a></li>
								<li><a href="/bbs/?boardCode=3">수강후기</a></li>
								<li><a href="https://939.co.kr/kiraedu/">PC원격지원</a></li>
								<?php if($_SESSION['loginUserLevel'] == 5 || $_SESSION['loginUserLevel'] == 6){ ?>
								<li><a href="/bbs/?boardCode=10">영업자 공지사항</a></li>
								<li><a href="/bbs/?boardCode=14">영업자정보 및 자료게시판</a></li>
								<?php } ?>
								<li><a href="/eduinfo/">위탁교육안내</a></li>
								<li><a href="/eduinfo/logic.php">교육진행절차</a></li>
								<li><a href="/eduinfo/goyong.php">환급절차</a></li>
								<li><a href="/eduinfo/rule.php">교육이용 안내</a></li>
							</ul>
						</li>
						<li id="GNB_MY">
							<? if ($_SESSION['loginUserID'] == "") { ?>
								<a href="/member/index.php?pid=1" title="나의강의실 페이지로 이동">나의강의실</a>
							<? } else { ?>
								<a href="/study/" title="나의강의실 페이지로 이동">나의강의실</a>
							<? } ?>							

							<ul class="gnb_sub" style="display: none;">
								<? if ($_SESSION['loginUserID'] == "") { ?>
									<li><a href="/member/index.php?pid=1">진행중인 과정</a></li>
									<li><a href="/member/index.php?pid=1">재응시 과정</a></li>
									<li><a href="/member/index.php?pid=1">학습종료 과정</a></li>
									<li><a href="/member/index.php?pid=1">수강신청 내역</a></li>
									<li><a href="/member/index.php?pid=1">상담신청 내역</a></li>
									<li><a href="/member/index.php?pid=1">토론게시판</a></li>
									<li><a href="/member/index.php?pid=1">나만의 학습노트</a></li>
									<li><a href="/member/index.php?pid=1">개인/추가 결제</a></li>
								<? } else { ?>
									<li><a href="/study/">진행중인 과정</a></li>
									<li><a href="/study/reTest.php">재응시 과정</a></li>
									<li><a href="/study/history.php">학습종료 과정</a></li>
									<li><a href="/study/studyOrder.php">수강신청 내역</a></li>
									<li><a href="/study/mantoman.php">상담신청 내역</a></li>
									<li><a href="/study/arguementSubject.php?boardCode=20">토론게시판</a></li>
									<li><a href="/study/studyNote.php">나만의 학습노트</a></li>
									<li><a href="/study/customPayList.php">개인/추가 결제</a></li>
									<li><a href="/certify/index.php">인증방법</a></li>
									<li><a href="/certify/ipin_certify.php">아이핀 인증방법</a></li>
									<li><a href="/certify/ipin.php">아이핀 발급방법</a></li>
								<? } ?>															
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
					</ul>
					<div class="all_list">
                        <ul class="a_inner clear">                            
                            <li class="al_bg">
                                <p>모두의러닝</p>
                                <ul>
									<li><a href="/about/index.php?pid=1">모두의러닝</a></li>
									<li><a href="/about/index.php?pid=2">교육체계수립</a></li>
									<li><a href="/about/index.php?pid=3">교육운영서비스</a></li>
									<li><a href="/about/index.php?pid=4">교육시스템</a></li>
									<li><a href="/about/index.php?pid=5">찾아오시는길</a></li>
									<li><a href="/promotion/index.php?pid=1">홍보자료</a></li>
                                </ul>
                            </li>
							<li id="onlineStudy">
                                <p>직무교육</p>
                                <ul>
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
									<li><a href="/safe/index.php?pid=1">산업안전보건교육</a></li>
									<li><a href="/safe/index.php?pid=2">관리감독자교육</a></li>
									<li><a href="/safe/index.php?pid=3">이용안내</a></li>
									<li><a href="/bbs/?boardCode=47">산업안전 자료실</a></li>
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
									<!-- <li><a href="/govSupport/">비대면 바우처</a></li> -->
									<li><a href="/digital/">디지털융합</a></li>
									<li><a href="/trainingCard/">기업직업훈련카드</a></li>
									<li><a href="/refund/index.php?pid=1">사업주 환급</a></li>
									<li><a href="/hrdStudy/index.php?pid=1">국민내일배움카드</a></li>
								</ul>
							</li>
							<li>
								<p>학습지원센터</p>
								<ul>
									<li><a href="/bbs/?boardCode=1">공지사항</a></li>
									<li><a href="/?boardCode=12">시스템 공지안내</a></li>
									<li><a href="/bbs/?boardCode=162">뉴스레터</a></li>
									<li><a href="/bbs/?boardCode=2">자주묻는 질문</a></li>
									<li><a href="/bbs/?boardCode=17">학습자료실</a></li>
									<li><a href="/download/">뷰어다운로드</a></li>
									<li><a href="/bbs/mantoman.php">1:1 학습문의</a></li>
									<li><a href="/bbs/?boardCode=3">수강후기</a></li>
									<li><a href="https://939.co.kr/kiraedu/">PC원격지원</a></li>
									<?php if($_SESSION['loginUserLevel'] == 5 || $_SESSION['loginUserLevel'] == 6){ ?>
									<li><a href="/bbs/?boardCode=10">영업자 공지사항</a></li>
									<li><a href="/bbs/?boardCode=14">영업자정보 및 자료게시판</a></li>
									<?php } ?>
									<li><a href="/eduinfo/">위탁교육안내</a></li>
									<li><a href="/eduinfo/logic.php">교육진행절차</a></li>
									<li><a href="/eduinfo/goyong.php">환급절차</a></li>
									<li><a href="/eduinfo/rule.php">교육이용 안내</a></li>
								</ul>
							</li>
							<li class="al_bg">
                                <p>나의 강의실</p>
                                <ul>
									<? if ($_SESSION['loginUserID'] == "") { ?>
										<li><a href="/member/index.php?pid=1">진행중인 과정</a></li>
										<li><a href="/member/index.php?pid=1">재응시 과정</a></li>
										<li><a href="/member/index.php?pid=1">학습종료 과정</a></li>
										<li><a href="/member/index.php?pid=1">수강신청 내역</a></li>
										<li><a href="/member/index.php?pid=1">상담신청 내역</a></li>
										<li><a href="/member/index.php?pid=1">토론게시판</a></li>
										<li><a href="/member/index.php?pid=1">나만의 학습노트</a></li>
										<li><a href="/member/index.php?pid=1">개인/추가 결제</a></li>
									<? } else { ?>
										<li><a href="/study/">진행중인 과정</a></li>
										<li><a href="/study/reTest.php">재응시 과정</a></li>
										<li><a href="/study/history.php">학습종료 과정</a></li>
										<li><a href="/study/studyOrder.php">수강신청 내역</a></li>
										<li><a href="/study/mantoman.php">상담신청 내역</a></li>
										<li><a href="/study/arguementSubject.php?boardCode=20">토론게시판</a></li>
										<li><a href="/study/studyNote.php">나만의 학습노트</a></li>
										<li><a href="top.location.href='/study/customPayList.php">개인/추가 결제</a></li>
										<li><a href="top.location.href='/certify/index.php">인증방법</a></li>
										<li><a href="top.location.href='/certify/ipin_certify.php">아이핀 인증방법</a></li>
										<li><a href="top.location.href='/certify/ipin.php">아이핀 발급방법</a></li>
									<? } ?>	
                                </ul>
                            </li>
                        </ul>
                    </div>
				</div>
			</div>
		</div>

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
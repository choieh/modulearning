<? include '../include/header_thumbnail.php' ?>
<script type="text/javascript" src="../frontScript/login.js?ver=<?=date('Ymdhis')?>"></script>
<script type="text/javascript" src="../frontScript/userMain.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
	  loginScript();
    //bannerScript();
		//setTimeout("mainModal()",3000);
  });
<?
 
	$today = substr($inputDate,0,10);
	$query = "SELECT * FROM nynPopup WHERE enabled='Y' AND (popupType='All' OR popupType='main') AND (startDate <= '".$today."' AND endDate >= '".$today."')";
	$result = mysql_query($query);
	$_top = 0;
	$_left = 0;
	while($rs = mysql_fetch_array($result)) {
?>
		$(window).load(function(){
			function getCookie(name){
					var nameOfCookie = name + "=";
					var x = 0;
					while (x <= document.cookie.length){
						var y = (x + nameOfCookie.length);
						if (document.cookie.substring(x, y) == nameOfCookie){
						if ((endOfCookie = document.cookie.indexOf(";", y)) == -1){
						endOfCookie = document.cookie.length;
						}
						return unescape (document.cookie.substring(y, endOfCookie));
						}
						x = document.cookie.indexOf (" ", x) + 1;
						if (x == 0) break;
					}
					return "";
				}
				if (getCookie("popname<?=$rs[seq];?>") != "done<?=(date('YmdH') <= '2018013118') ? 'z' : ''; ?>"){
					window.open("./popup.php?seq=<?=$rs[seq];?>","팝업<?=$rs[seq];?>","width=<?=$rs[width];?>,height=<?=$rs[height];?>,top=<?=$_top;?>,left=<?=$_left;?>,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","popup<?=$rs[seq];?>");
				}

		});
<?
		if($_left > 1280) {
			$_top = $_top+$rs[height];
			$_left = 0;
		} else {
			$_left = $_left+$rs[width];
		}
	}
?>
</script>

</head>
<body>
<style>
.float-banner .fb_inner{ top:400px;}
</style>
	<div class="skip_nav">
		<a href="#gnb">메인메뉴로 이동</a>
		<a href="#container">본문으로 이동</a>
	</div>
	<div id="wrap_main">
		<!-- 퀵메뉴 -->		
		<? include '../include/quick_menu.php' ?>
		
		<? include '../include/gnb.php' ?>
		
		<div id="container_m" class="main">

	<!-- <div class="main_realtime_wrap">
		<div class="main_title"><b>실시간 인기 과정</b></div>
		<div class="main_ment">가장 많은 분들이 선택하신 강의입니다.</div>
		<div class="main_inner">
			<div class="main_realtime mrt1">
				<h4>모두의러닝</h4>
				<ul>
					<li><b>1</b> 기획서 다이어트? 2page proposal <em class="up"></em></li>
					<li><b>2</b> 비주얼 스토리텔링의 힘, 인포그래픽 <em class="up"></em></li>
					<li><b>3</b> 언택트 시대, e-비즈니스 인사이트<em></em></li>
					<li><b>4</b> 초연결시대, 고객경험을 디자인하라 <em class="down"></em></li>
					<li><b>5</b> 스마트제조 레시피 <em></em></li>
				</ul>
			</div>
	
			<div class="main_realtime mrt2">
				<h4>직무교육</h4>
				<ul>
					<li><b>1</b> 팀장의 조건! <em class="up"></em></li>
					<li><b>2</b> 적게 일하라? 효과적인 업무를 위한<em class="down"></em></li>
					<li><b>3</b> 마케팅의 기초 <em class="up"></em></li>
					<li><b>4</b> 아동학대신고와 인식개선 <em></em></li>
					<li><b>5</b> 경영관리의 기초 <em></em></li>
				</ul>
			</div>
	
			<div class="main_realtime mrt3">
				<h4>법정교육</h4>
				<ul>
					<li><b>1</b> 조직의 미래를 만들어가는 중간 관리자 <em class="up"></em></li>
					<li><b>2</b> 스마트 공장 도입 및 추진 실무자 과정 <em class="up"></em></li>
					<li><b>3</b> PM(프로젝트 관리자)양성 과정 <em></em></li>
					<li><b>4</b> 스스로 성장하는 신입사원 <em class="down"></em></li>
					<li><b>5</b> After Effects CC2020 모션 그래픽 과정 <em></em></li>
				</ul>
			</div>
	
			<div class="main_realtime mrt4">
				<h4>산업안전</h4>
				<ul>
					<li><b>1</b> [안전제일] 산업안전보건교육(사무직 건설업) <em></em></li>
					<li><b>2</b> 카드뉴스로 보는 성희롱 예방교육 <em class="up"></em></li>
					<li><b>3</b> 카드뉴스로 보는 개인정보보호 교육 <em class="down"></em></li>
					<li><b>4</b> 카드뉴스로 보는 직장 내 괴롭힘 방지 교육 <em></em class="up"></li>
					<li><b>5</b> [안전제일] 산업안전보건교육(관리감독자)-제조업 <em></em></li>
				</ul>
			</div>
		</div>
	</div> -->

	<h2 class="hide">메인 배너</h2>
	<div class="main_visual" style="height:25px;">
		<div id="slides">
								
					<div class="slides_container">
						
						<div class="slide" style="background:url('/images/common/banner06.jpg') 50% 50% no-repeat;"><a target="_self"><img src="/images/common/blank.png" alt="모두의러닝-1위"/></a></div>

						<div class="slide" style="background:url('/images/common/banner08.jpg') 50% 50% no-repeat;"><a href="/landing/mate/" target="_self"><img src="/images/common/blank.png" alt="러닝메이트"/></a></div>



						<div class="slide" style="background:url('/images/common/lifelong.jpg') 50% 50% no-repeat;"><a href="https://lifelong.modulearning.kr/studyCenter/index.php" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인0"/></a></div>

						<div class="slide" style="background:url('/images/common/d966bb4bed9fd6b25c36f83cf7a3f651.jpg') 50% 50% no-repeat;"><a href="/landing/digital/" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인1"/></a></div>
						
						<div class="slide" style="background:url('/images/common/3e07ddbd37662b145c7349c710a1ba58.jpg') 50% 50% no-repeat;"><a href="/court/" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인2"/></a></div>
						
						<div class="slide" style="background:url('/images/common/8a76b950d2fb32effe6755835b9d8d4c.jpg') 50% 50% no-repeat;"><a href="/safe/index.php?pid=1" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인3"/></a></div>
						
						<div class="slide" style="background:url('/images/common/9c3f1afae8ffa8d3db0bf39ae3431124.jpg') 50% 50% no-repeat;"><a href="/govSupport/" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인4"/></a></div>

						<!-- <div class="slide" style="background:url('/images/common/7222059b37c942baecfb3c1a58f0b899.jpg') 50% 50% no-repeat;"><a href="https://www.hulam.co.kr/index.php" target="_self"><img src="/images/common/blank.png" alt="모두의러닝-메인4"/></a></div> -->
						
					</div>
					<ul class="pagination">
						
						<li class=""><a href="#self">모두의러닝-메인0</a></li>

						<li class=""><a href="#self">모두의러닝-메인0</a></li>

						<li class=""><a href="#self">모두의러닝-메인0</a></li>

						<li class=""><a href="#self">모두의러닝-메인1</a></li>
						
						<li class=""><a href="#self">모두의러닝-메인2</a></li>
						
						<li class=""><a href="#self">모두의러닝-메인3</a></li>

						<li class=""><a href="#self">모두의러닝-메인4</a></li>

						<!-- <li class=""><a href="#self">모두의러닝-메인4</a></li> -->
						
					</ul>
					
					
		</div>
		<script type="text/javascript">
			$(function(){
				$('#slides').slides({
					preload: true,
					play: 5000,
					pause: 2500,
					generatePagination: false,
					hoverPause: true
				});
			});
		</script>
	</div>

	<script type="text/javascript" src="/js/jquery.bxslider.min.js"></script>
			<script>
			$(document).ready(function(){
				if($('.main_hotcourse .horizontal_list li').length > 1) {
					$('.main_hotcourse .horizontal_list').bxSlider({
						auto: true,
						autoControls: false,
						controls: true,
						pager: false,
						speed:400,
						maxSlides: 4,
						minSlides: 4,
						moveSlides: 1,
						slideMargin: 26,
						slideWidth: 280,
						touchEnabled:0,
					});
				};
			});
			</script>

			<div class="bgWhite">
				<div class="main_title"><b>법정필수교육</b> 콘텐츠 </div>
				<div class="horizontal_wrap">
					<div class="main_hotcourse">
										<ul class="horizontal_list">
							<?
							$courtSql = mysql_query(" SELECT a.seq, a.previewImage, a.contentsName, a.contentsCode, a.chapter, a.contentsTime, a.price FROM nynContents a WHERE a.mainCourt = 'Y' ");
							while ($courtRow = mysql_fetch_array($courtSql)) {
							?>					
							<li class="first">
								<span class="img_box">
									<a href="/lecture/?seq=<?=$courtRow['seq']?>" title="<?=$courtRow['contentsName']?>" >
										<img src="/attach/contents/<?=$courtRow['previewImage']?>" alt="<?=$courtRow['contentsName']?>" class="course_image" onerror="ImageError(this, '/images/common/noimage_course.gif');"/>
									</a>
									
								</span>
								<a href="/lecture/?seq=<?=$courtRow['seq']?>" title="<?=$courtRow['contentsName']?>">
								<div class="list_ccont">							
									<span class="list_subject"><!--span class="label"></span--><?=$courtRow['contentsName']?></span>
									<span class="list_subtitle"></span>
									<span class="list_blt">
										<p><label>총차시</label> <?=$courtRow['chapter']?> 차시 </p>
										<p><label>학습시간</label> <?=$courtRow['contentsTime']?> 시간</p>
										<p><label>교육비</label> <?=number_format($courtRow['price'])?>원</p>
										<!-- 180일 -->
									</span>
									<span class="list_price"><?=number_format($courtRow['price'])?>원</span>
								</div>
								</a>
							</li>
							<? } ?>				
						</ul>
					</div>
				</div>
			</div>

	<div class="bgGray1">
		<ul class="main_banner">
			<li><a href="/bbs/?boardCode=25"><span class="main_ban1"></span>법정필수교육 자료실</a></li>
			<li><a href="contentsListExcel.php"><span class="main_ban2"></span>교육과정리스트</a></li>
			<li><a href="https://blog.naver.com/modulearning" target="_blank"><span class="main_ban3"></span>블로그</a></li>
			<li><a href="#"><span class="main_ban4"></span>카카오톡</a></li>
			<li><a href="moduPdf.pdf" target="_blank"><span class="main_ban5"></span>카달로그</a></li>
			<li><a href="javascript:alert('현재 진행중인 이벤트가 없습니다.')"><span class="main_ban6"></span>이벤트</a></li>
		</ul>
	</div>


	<div class="bgWhite">
		<div class="main_title"><b>신규</b> 콘텐츠</div>
		<div class="horizontal_wrap">
			<div class="mcourse_recomm" style="display:;">
				<!-- <ul class="main_course_tab">
					<li class="active" id="mc_tab1"><a href="javascript:CourseRecomm(1);">온라인교육</a></li>
					<li id="mc_tab2"><a href="javascript:CourseRecomm(2);">마이크로러닝</a></li>
					<li id="mc_tab3"><a href="javascript:CourseRecomm(3);">오프라인교육</a></li>
				</ul> -->
				<div class="main_course_info" id="mc_recom1">
									<ul class="horizontal_list">
					<?
					$newSql = mysql_query(" SELECT a.seq, a.previewImage, a.contentsName, a.contentsCode, a.chapter, a.contentsTime, a.price FROM nynContents a WHERE a.mainNew = 'Y' ");
					while ($newRow = mysql_fetch_array($newSql)) {
					?>
					<li class="first">
						<span class="img_box">
							<a href="/lecture/?seq=<?=$newRow['seq']?>" title="<?=$newRow['contentsName']?>" >
								<img src="/attach/contents/<?=$newRow['previewImage']?>" alt="<?=$newRow['contentsName']?>" class="course_image" onerror="ImageError(this, '/images/common/noimage_course.gif');"/>
							</a>
						</span>
						<a href="/lecture/?seq=<?=$newRow['seq']?>" title="<?=$newRow['contentsName']?>">
						<div class="list_ccont">							
							<span class="list_subject"><!--span class="label"></span--><?=$newRow['contentsName']?></span>
							<span class="list_subtitle"></span>
							<span class="list_blt">
								<p><label>총차시</label> <?=$newRow['chapter']?> 차시 </p>
								<p><label>학습시간</label> <?=$newRow['contentsTime']?> 시간</p>
								<p><label>교육비</label> <?=number_format($newRow['price'])?>원</p>
								<!-- 180일 -->
							</span>
							<span class="list_price"><?=number_format($newRow['price'])?>원</span>
						</div>
						</a>
					</li>
					<? } ?>
					
				</ul>
				</div>
				
			</div>

		</div>

	</div>

	<div class="bgWhite">
		<div class="main_title"><b>인기</b> 콘텐츠</div>
		<div class="horizontal_wrap">
			<ul class="horizontal_list">
				
				<?
				$bestSql = mysql_query(" SELECT a.seq, a.previewImage, a.contentsName, a.contentsCode, a.chapter, a.contentsTime, a.price FROM nynContents a WHERE a.mainBest = 'Y' ");
				while ($bestRow = mysql_fetch_array($bestSql)) {
				?>					
				<li class="first">
					<span class="img_box">
						<a href="/lecture/?seq=<?=$bestRow['seq']?>" title="<?=$bestRow['contentsName']?>" >
							<img src="/attach/contents/<?=$bestRow['previewImage']?>" alt="<?=$bestRow['contentsName']?>" class="course_image" onerror="ImageError(this, '/images/common/noimage_course.gif');"/>
						</a>
					</span>
					<a href="/lecture/?seq=<?=$bestRow['seq']?>" title="<?=$bestRow['contentsName']?>">
					<div class="list_ccont">							
						<span class="list_subject"><!--span class="label"></span--><?=$bestRow['contentsName']?></span>
						<span class="list_subtitle"></span>
						<span class="list_blt">
							<p><label>총차시</label> <?=$bestRow['chapter']?> 차시 </p>
							<p><label>학습시간</label> <?=$bestRow['contentsTime']?> 시간</p>
							<p><label>교육비</label> <?=number_format($bestRow['price'])?>원</p>
							<!-- 180일 -->
						</span>
						<span class="list_price"><?=number_format($bestRow['price'])?>원</span>
					</div>
					</a>
				</li>
				<? } ?>	
						
			</ul>
		</div>
	</div>

	<div class="bgGray">
			<div class="main_title">
				<b>수강후기</b>
			</div>
			<div class="review_wrap">
				<div class="review_slider">
					<?
					$reviewSql = "select subject, content, addItem02 from nynBoard where boardCode = 3 and addItem02 in (4,5) order by rand() limit 16";
					$reviewRes = mysql_query($reviewSql);
					while ($reviewRow = mysql_fetch_array($reviewRes)) {
					?>
					<div class="review-in" onclick="location.href='/bbs/?boardCode=3'" style="cursor:pointer;">
						<div class="review_in_box">
							<img src="/images/common/<?=$reviewRow['addItem02']?>star.png" alt="scope">
							<strong><?=$reviewRow['subject']?></strong>
							<p><?=$reviewRow['content']?></p>
						</div>
					</div>
					<? } ?>
				</div>
			</div>
		</div>
		<script>
			$(function() {
				$('.review_slider').slick({
					rows: 2,
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: true,
                    arrows : false,
					infinite:true
				});
			});
		</script>

	<div class="bgWhite" >
		<ul class="main_bottom_banner">
			<li>
			<a href="/safe/index.php?pid=3">
				<span class="mainb_ban1"></span>
				<h2>오프라인교육 시설 </h2>
				<p>오프라인 교육시설 안내입니다.</p>
				<p class="mainb_btn">바로가기</p>
			</a>
			</li>
			<li>
			<a onclick="javascript:alert('현재 코로나로 인하여 오프라인교육은\n진행하고 있지 않습니다.\n교육진행시 공지로 안내 드리겠습니다.');" style="cursor:pointer">
				<span class="mainb_ban2"></span>
				<h2>오프라인교육 편성표</h2>
				<p>교육일정을 한 눈에 보기 쉽게 안내합니다. </p>
				<p class="mainb_btn">바로가기</p>

			</a>
			</li>
			<li>
			<a href="/about/index.php?pid=5">
				<span class="mainb_ban3"></span>
				<h2>찾아오시는 길</h2>
				<p>직접 찾아오시면 친절히 안내해드립니다.</p>
				<p class="mainb_btn">바로가기</p>
			</a>
			</li>
			<li>
			<a href="/safe/index.php?pid=2">
				<span class="mainb_ban4"></span>
				<h2>관리감독자 교육</h2>
				<p>관리감독자 교육과정 안내입니다.</p>
				<p class="mainb_btn">바로가기</p>
			</a>
			</li>
		</ul>
	</div>

	<div class="bgGray2 main_last">
		<div class="square_wrap">
			<div class="main_board">
				<div class="mboard">
					<div class="mboard_title">
						<span>공지사항</span>
						<div class="mboard_more"><a href="/bbs/?boardCode=1">더보기</a></div>
					</div>
					<div class="BBSArea">																
						<ul class="list_top">
						
						<?						
						$boardSql = mysql_query("select seq, subject from nynBoard where boardCode = 1 order by seq desc limit 5");
						while ($boardRow = mysql_fetch_array($boardSql)) {							
							echo "<li><a href=\"/bbs/?boardCode=1&seq=".$boardRow['seq']."\">".$boardRow['subject']."</a></li>";
						}
						?>	
							
						</ul>
					</div>
				</div>
			</div>

			<div class="main_cs">
				<h3 class="top_title">학습지원센터</h3>
				<div class="mcs_text">
					<p class="mcs_tel">1544-9335</p>
					<span>
						평일 09:00~18:00(점심시간 12:00~13:00)
					</span>
				</div>
				<ul>
					<li><a href="/bbs/?boardCode=2">자주하는 질문 모음</a></li>
					<li><a href="/bbs/mantomanNew.php">1:1 학습문의</a></li>
					<li><a href="/bbs/?boardCode=12">학습장애해결안내</a></li>
					<li><a onclick="javascript:alert('현재 진행중인 이벤트가 없습니다.')" style="cursor:pointer">이벤트</a></li>
				</ul>
			</div>

			<div class="main_qr">
				<h3 class="top_title">계좌 정보</h3>
				<!-- <div class="qr_img"><img src="/images/common/qr2.png"></div> -->
				<div class="mqr_cont">
					<p><a>하나은행 : 주식회사 모두의러닝</a></p>
					<p>계좌번호 : 332-910046-85504</p>
				</div>
			</div>
		</div>
	</div>

	<style>
	.fix-banner { position:fixed; z-index:99999; left:0; bottom:0px; width:100%;height:60px;margin:0px;padding:0px;text-align:center;border:none;  }
	.fix-banner .wrap {position:relative;width:1200px;height:60px; margin:0px auto;padding:15px 75px 15px 15px; text-align:right;background:#fff;border:1px #c2c2c2 solid;border-bottom:none;border-radius:20px 20px 0px 0px;box-sizing:border-box; line-height:30px;font-family:"NanumSquare";font-size:16px;font-weight:500;color:#000;}
	.fix-banner .btn_bform { display:inline-block; width:auto;height:27px;line-height:27px;margin-left:10px;padding:0px 15px;border-radius:5px;background:#ffcb05;color:#000;font-size:15px;}
	.fix-banner .close-btn {position:absolute; right:15px; top:15px; width:30px; height:30px; background:url('/images/common/fix_ban_close.png') no-repeat; text-indent:-99999px; cursor:pointer;}
	.fix-banner.no-fix { position:relative;}
	.fix-banner .is-hide{display:none;}
	.fix-banner .fix_open { display:none;}
	#ft.is-top-layer{z-index:9999999;}
	.fix-banner.fix2 {position:fixed;bottom:250px;left:50%;border:none;margin-left:650px;width:92px !important;height:92px !important;}
	.fix-banner.fix2 .wrap{display:none;}
	.fix-banner.fix2 .fix_open {display:inline-block;;width:92px !important;height:92px !important;border-radius:50%;border:none;background: url('/images/common/fix2.png') no-repeat;}
	</style>
	<div class="fix-banner">
		<div class="wrap">
			우리기업에 필요한 교육을 원하신다면?
			<a href="/landing/" class="btn_bform">상담문의</a>
			<button type="button" class="close-btn" id="fix_banner_close">X</button>
		</div>
		<button class="fix_open"></button>
	</div>
	<script src="/js/fix_ban.js"></script>

</div>

<script language="JavaScript" type="text/JavaScript">
function CourseRecomm(no) {
	var tabCount = 10;
	for(var i=1; i<=tabCount; i++) {
		if(i == no) {
			$("#mc_recom" + i).show();
			$("#mc_tab" + i).addClass("active");
		} else {
			$("#mc_recom" + i).hide();
			$("#mc_tab" + i).removeClass("active");
		}
	}
}
</script>

		
<? include '../include/footer.php' ?>

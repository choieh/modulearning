<?
include '../include/header.php';
$pid = $_GET['pid'];
?>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/trainingCard.css">
	
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
<div id="wrap_main">
    <!-- 퀵메뉴 -->
    <? include '../include/quick_menu.php' ?>

    <? include '../include/gnb.php' ?>

    <div id="container">
        <div class="main_wrap">

			<div class="category_area">
                <ul class="category_list">
                    <li><a href="/govSupport/">비대면바우처</a></li>
					<li><a href="/digital/">디지털융합</a></li>
					<li class="on"><a href="/trainingCard/">기업직업훈련카드</a></li>                    
					<li><a href="/refund/index.php?pid=1">사업주환급</a></li>    
                    <li><a href="/hrdStudy/index.php?pid=1">국민내일배움카드</a></li>                
                </ul>
            </div>
			            
            <div class="content_area">
                <div class="path">
                    <ol class="path_list">
                        <li>정부지원사업</li>
                        <li class="last">기업직업훈련카드</li>
                    </ol>
                </div>
				<div class="d-wrap">
					<h2>기업직업훈련카드</h2>
					<div class="sec1">
						<img src="img/con1.png" alt="기업직업훈련카드 사업이란">
						<a href="https://www.hrd4u.or.kr/hrd4u_new/bbs/view/B0000051/58.do?menuNo=0401" target='_blank' class="btn_img"><span>기업직업훈련카드 모집 공고 바로가기</span></a>
					</div>
					<div class="sec2">
						<div class="sec-in">
							<h2 class="hidden">기업직업훈련카드 기존 사업주훈련과 다른 점</h2>
						</div>
					</div>
					<div class="sec3">
						<h3><img src="img/con3_title.png" alt="기업직원훈련카드 지원금액"></h3>
						<img src="img/con3.png" alt="지원금액">
					</div>
				</div>
				<div class="sec4">
					<h3><img src="img/con4_title.png" alt="중소기업 기업직업훈련카드 바우처지급"></h3>
					<img src="img/con4.png" alt="바우처 지급" usemap="#set4_02btn">
                    <map name="set4_02btn" id="set4_02btn">
                        <area shape="rect" coords="253,245,769,284" href="https://www.hrd4u.or.kr/hrd4u/main.do" alt="신청방법" target='_blank'>
                    </map>
					<a href="https://www.hrd4u.or.kr/hrd4u/main.do" target='_blank' class="btn_img"><span>기업직업훈련카드 신청 바로가기</span></a>
				</div>		

            </div>
        </div>
    </div>
</div>




<? include '../include/footer.php' ?>
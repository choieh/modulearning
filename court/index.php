<?
include '../include/header.php';
$pid = $_GET['pid'];
?>
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
                    <li id="intro01" class="on"><a href="/court/index.php">법정필수교육</a></li>
                </ul>
            </div>
			            
            <div class="content_area">
					<div class="path">
						<ol class="path_list">
							<li>법정필수교육</li>
							<li class="last">법정필수교육</li>
						</ol>
					</div>
					<h4 class="content_title">법정필수교육</h4>
					<div class="content_body">	
						<div class="sub_top_title">
							<h2>법정의무교육이란</h2>
							<p>법정의무교육은 관련 법에 따라 근로자들을 대상으로 사업주가 <span>매년 의무적으로 시행해야하는 교육</span>으로<br>
							미이행시 <span>과태료의 대상</span>이 됩니다. 모두의러닝은 법정 교육 최다 과정 보유 및 매년 최신 과정을 공급하고 있습니다.</p>
						</div>

						<div class="sub_bgWhite">
							<div class="sub_inner">
								<p class="sub_mb"><img src="/html/images/common/sub_law1.png"></p>
								<p><img src="/html/images/common/sub_law2.png"></p>
							</div>
						</div>

						<div class="sub_bgGray">
							<div class="sub_inner">
								<p><img src="/html/images/common/sub_law3.png"></p>
								<p class="sub_btn"><a href="/lecture/?sort01=lecture12"><img src="/html/images/common/sub_law_btn1.png"></a></p>
							</div>
						</div>

						<div class="sub_bgBrown">
							<div class="sub_inner">
								<p><img src="/html/images/common/sub_law4.png"></p>
							</div>
						</div>
						<div class="sub_bgWhite">
							<div class="sub_inner">
								<p><img src="/html/images/common/sub_law5.png"></p>
								<p class="sub_btn"><a href="/landing/"><img src="/html/images/common/sub_law_btn2.png"></a></p>
							</div>
						</div>
						
					</div>

				</div>

        </div>
    </div>
</div>




<? include '../include/footer.php' ?>
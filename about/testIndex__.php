<?
include '../include/testHeader.php';
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

    <? include '../include/testGnb.php' ?>

    <div id="container">
        <div class="main_wrap">
            <div class="left_area lnb03">
                <h3 class="hide">lnb영역</h3>
                <h3 class="lnb_title">모두의러닝</h3>
                <ul class="lnb_list">
                    <li id="intro01" <? if ($_GET['pid'] == 1) { echo "class='on'"; } ?> ><a href="/about/testIndex.php?pid=1">모두의러닝</a></li>
                    <li id="intro02" <? if ($_GET['pid'] == 2) { echo "class='on'"; } ?>><a href="/about/testIndex.php?pid=2">교육체계수립</a></li>
                    <li id="intro03" <? if ($_GET['pid'] == 3) { echo "class='on'"; } ?>><a href="/about/testIndex.php?pid=3">교육운영서비스</a></li>
                    <li id="intro04" <? if ($_GET['pid'] == 4) { echo "class='on'"; } ?>><a href="/about/testIndex.php?pid=4">교육시스템</a></li>
                    <li id="intro05" <? if ($_GET['pid'] == 5) { echo "class='on'"; } ?>><a href="/about/testIndex.php?pid=5">찾아오시는길</a></li>
                </ul>
                <!--                  <div class="sp_center">
                 <h3 class="top_title">고객센터</h3>
                 <p class="top_text">편한 시간에 문의주시면<br>친절하게 응답하겠습니다.</p>
                 <div class="mcs_text">
                     <p class="mcs_tel">02-6265-2020</p>
                     <span>
                         평일 : 09:00~18:00<br>
                         토/일, 공휴일 휴무
                     </span>
                 </div>
             </div> -->
            </div>
            <div class="content_area">
                <?
                if ($pid == 1) {
                    include 'about01.html';
                } else if ($pid == 2) {
                ?>
                    <div class="path">
                        <ol class="path_list">
                            <li>모두의러닝</li>
                            <li class="last">교육체계수립</li>
                        </ol>
                    </div>
                    <h4 class="content_title">교육체계수립</h4>
                    <div class="content_body content_body_intro">

                        <!--
                        <div class="sub_in_title">
                            <h2>인사말</h2>
                            <p>모두의러닝 모든 임직원은 창조와 혁신을 통하여 새로운 교육을 만들어 갑니다.</p>
                        </div>
                        -->
                        <div class="sub_bgWhite" style="padding-top:0px;">
                            <div class="sub_inner">
                                <img src="/html/images/sub/intro02_1.png">
                            </div>
                        </div>


                        <div class="sub_bgGray">
                            <div class="sub_inner">
                                <div class="sub_in_title">
                                    <h2><img src="/html/images/sub/intro02_2tit.png"></h2>
                                    <p>역량기반학습은 구체적인 기술을 가르치는 학습입니다. 역량기반학습은 조직의 전략적 목표 달성에 필요한 개인별 필수 역량 수준을 향상시켜 성과를
                                        창출하는데 중점을 둡니다.<br>
                                        개인별 역량 수준은 고객사의 다양한 이해관계자들의 직무 역량 기대치를 종합하여<br>
                                        모두의러닝에서 제공하는 직무 역량 진단시스템을 통해 결정되며, 학습자는 각 역량 기준에 따라 평가됩니다.<br>
                                        역량기반학습은 학습자 중심이며 독립적인 학습에 적합하여 학습자가 자신의 속도로 공부하고, 필요에 따라 도전적인 학습 결과를 검토 또는 연습하고,
                                        <br>
                                        더 높은 수준의 학습으로 연계됩니다. 또한 역량 프레임 워크를 통해 자신에게 필요한 현재와 미래의 역할에 필요한 역량을 명확하게 제공받을 수
                                        있습니다. <br>
                                        <em>* 직무 역량진단시스템 적용이론 : ROE(Return on Expectations), ROI(Return on
                                            Investment)</em>
                                    </p>

                                </div>
                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_2.png"></div>
                            </div>
                        </div>

                        <div class="sub_bgWhite">
                            <div class="sub_inner">
                                <div class="sub_in_title">
                                    <h2><img src="/html/images/sub/intro02_3tit.png"></h2>
                                    <p>역량기반학습은 직무 역량 중심, 결과 중심, 평가 중심의 학습이기 때문입니다.<br>
                                        직무 역량은 주어진 업무를 수행하는데 필요한 지식, 기술 및 태도를 표현하는 능력입니다.<br>
                                        모두의러닝 HRD의 역량기반학습은 개인별 직무 역량을 높이는데 가장 효율적인 학습입니다.<br>
                                        <em>• <b>학습자 중심</b> : 역량기반학습은 개별 학습자에게 초점을 맞춥니다. 각 개인이 자신의 속도로 학습을 하고 다른 사람들과
                                            협력할 수 있는 기회를 제공합니다.<br>
                                            • <b>결과 중심</b> : 역량기반학습은 잘 정의된 학습 결과에서 시작됩니다. 결과에 초점을 맞추면 단기 및 장기 목표를 쉽게 개발할
                                            수 있습니다.<br>
                                            • <b>평가 중심</b> : 역량기반학습의 필수 특성은 교육 후 성공적 역량 입증을 기반으로 업무 성과를 측정하는 평가 도구로 개발할
                                            수 있습니다.<br>
                                        </em>
                                    </p>
                                </div>
                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_3.png"></div>
                            </div>
                        </div>

                        <div class="sub_bgGray">
                            <div class="sub_inner">
                                <div class="sub_in_title">
                                    <h2><img src="/html/images/sub/intro02_4tit.png"></h2>
                                    <p>역량기반학습은 각 학습 결과 또는 기술에 대한 숙달이 필요하므로 많은 기술과 능력을 별도로 평가해야 하는 기업 교육에 적합합니다.<br>
                                        개인의 역량 개발을 위해서는 정형 학습 형태의 포멀러닝과 업무를 통한 경험적 학습 및 타인을 통해 배우는 비정형 학습 형태인 인포멀러닝의 모든
                                        부분이 충족되는 학습 방법을 적용해야합니다. 이를 위해 702010 학습 모델을 기준으로 한 학습 방법을 운영하고 있습니다.
                                    </p>

                                </div>
                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_4.png"></div>
                            </div>
                        </div>

                        <div class="sub_bgBrown2" style="padding-bottom:0px;">
                            <div class="sub_inner">
                                <img src="/html/images/sub/intro02_5.png">
                            </div>
                        </div>

                        <div class="sub_bgWhite">
                            <div class="sub_inner">
                                <img src="/html/images/sub/intro02_6.png">

                                <div class="sub_in_btn"><a href="/main/formmail.jsp"><img
                                                src="/html/images/sub/intro_btn1.png"></a></div>
                            </div>
                        </div>
                    </div>
                <? } ?>
            </div>
            <!--				<div class="content_area">-->
            <!--					<div class="path">-->
            <!--                        <ol class="path_list">-->
            <!--                            <li>모두의러닝</li>-->
            <!--                            <li class="last">교육체계수립</li>-->
            <!--                        </ol>-->
            <!--	                </div>-->
            <!--	                <h4 class="content_title">교육체계수립</h4>-->
            <!--                    <div class="content_body content_body_intro">-->
            <!---->
            <!--                        <!---->
            <!--                        <div class="sub_in_title">-->
            <!--                            <h2>인사말</h2>-->
            <!--                            <p>모두의러닝 모든 임직원은 창조와 혁신을 통하여 새로운 교육을 만들어 갑니다.</p>-->
            <!--                        </div>-->
            <!--                        -->-->
            <!--                        <div class="sub_bgWhite" style="padding-top:0px;">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <img src="/html/images/sub/intro02_1.png">-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!---->
            <!---->
            <!--                        <div class="sub_bgGray">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <div class="sub_in_title">-->
            <!--                                    <h2><img src="/html/images/sub/intro02_2tit.png"></h2>-->
            <!--                                    <p>역량기반학습은 구체적인 기술을 가르치는 학습입니다. 역량기반학습은 조직의 전략적 목표 달성에 필요한 개인별 필수 역량 수준을  향상시켜 성과를 창출하는데 중점을 둡니다.<br>-->
            <!--                개인별 역량 수준은 고객사의 다양한 이해관계자들의 직무 역량 기대치를 종합하여<br>-->
            <!--                모두의러닝에서 제공하는 직무 역량 진단시스템을 통해 결정되며, 학습자는 각 역량 기준에 따라 평가됩니다.<br>-->
            <!--                역량기반학습은 학습자 중심이며 독립적인 학습에 적합하여 학습자가 자신의 속도로 공부하고, 필요에 따라 도전적인 학습 결과를 검토 또는 연습하고, <br>-->
            <!--                더 높은 수준의 학습으로 연계됩니다. 또한 역량 프레임 워크를 통해 자신에게 필요한 현재와 미래의 역할에 필요한 역량을 명확하게 제공받을 수 있습니다. <br>-->
            <!--                                        <em>* 직무 역량진단시스템 적용이론 : ROE(Return on Expectations), ROI(Return on Investment)</em>-->
            <!--                                    </p>-->
            <!---->
            <!--                                </div>-->
            <!--                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_2.png"></div>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!---->
            <!--                        <div class="sub_bgWhite">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <div class="sub_in_title">-->
            <!--                                    <h2><img src="/html/images/sub/intro02_3tit.png"></h2>-->
            <!--                                    <p>역량기반학습은 직무 역량 중심, 결과 중심, 평가 중심의 학습이기 때문입니다.<br>-->
            <!--                                        직무 역량은 주어진 업무를 수행하는데 필요한 지식, 기술 및 태도를 표현하는 능력입니다.<br>-->
            <!--                                        모두의러닝 HRD의 역량기반학습은 개인별 직무 역량을 높이는데 가장 효율적인 학습입니다.<br>-->
            <!--                                        <em>• <b>학습자 중심</b> : 역량기반학습은 개별 학습자에게 초점을 맞춥니다. 각 개인이 자신의 속도로 학습을 하고 다른 사람들과 협력할 수 있는 기회를 제공합니다.<br>-->
            <!--                                            • <b>결과 중심</b> : 역량기반학습은 잘 정의된 학습 결과에서 시작됩니다. 결과에 초점을 맞추면 단기 및 장기 목표를 쉽게 개발할 수 있습니다.<br>-->
            <!--                                            • <b>평가 중심</b> : 역량기반학습의 필수 특성은 교육 후 성공적 역량 입증을 기반으로 업무 성과를 측정하는 평가 도구로 개발할 수 있습니다.<br>-->
            <!--                                        </em>-->
            <!--                                    </p>-->
            <!--                                </div>-->
            <!--                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_3.png"></div>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!---->
            <!--                        <div class="sub_bgGray">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <div class="sub_in_title">-->
            <!--                                    <h2><img src="/html/images/sub/intro02_4tit.png"></h2>-->
            <!--                                    <p>역량기반학습은 각 학습 결과 또는 기술에 대한 숙달이 필요하므로 많은 기술과 능력을 별도로 평가해야 하는 기업 교육에 적합합니다.<br>-->
            <!--                                        개인의 역량 개발을 위해서는 정형 학습 형태의 포멀러닝과 업무를 통한 경험적 학습 및 타인을 통해 배우는 비정형 학습 형태인 인포멀러닝의 모든 부분이 충족되는 학습 방법을 적용해야합니다. 이를 위해 702010 학습 모델을 기준으로 한 학습 방법을 운영하고 있습니다.-->
            <!--                                    </p>-->
            <!---->
            <!--                                </div>-->
            <!--                                <div class="sub_in_cont"><img src="/html/images/sub/intro02_4.png"></div>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!---->
            <!--                        <div class="sub_bgBrown2" style="padding-bottom:0px;">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <img src="/html/images/sub/intro02_5.png">-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!---->
            <!--                        <div class="sub_bgWhite">-->
            <!--                            <div class="sub_inner">-->
            <!--                                <img src="/html/images/sub/intro02_6.png">-->
            <!---->
            <!--                                <div class="sub_in_btn"><a href="/main/formmail.jsp"><img src="/html/images/sub/intro_btn1.png"></a></div>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--				</div>-->


        </div>
    </div>
</div>




<? include '../include/testFooter.php' ?>
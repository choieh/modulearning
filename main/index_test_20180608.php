<? 
//	SetCookie("userIDSave", "aaasdasdasd",0,"/");
//	echo $_COOKIE['userIDSave'];

?>
<? include '../include/header.php' ?>
<script type="text/javascript" src="../frontScript/login_test_20180608.js?ver=<?=date('Ymdhis')?>"></script>
<script type="text/javascript" src="../frontScript/userMain.js"></script>
<script type="text/javascript" src="../js/rollingBanner.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
	  loginScript();
    //bannerScript();
		setTimeout("mainModal()",3000);
  });

</script>
<script type="text/javascript">
  /*
    function bannerScript(){
        var imgArr = ['../images/main/img_topbanner02.png'];//,'../images/main/img_topbanner01.png'
        var imgUrl = ['../event/20170308.php'];//,'../safety/'
        var fadeCount = 0;

        setInterval(function(){
            if(fadeCount == 0){
                $('#topBannerArea > a').fadeOut(300,function(){
                    $(this).attr('href',imgUrl[0]).fadeIn(300);
                    fadeCount = 1;
                });
                $('#topBannerArea > a > img').fadeOut(300,function(){
                    $(this).attr('src',imgArr[0]).fadeIn(300);
                    fadeCount = 1;
                });
            }else{
                $('#topBannerArea > a').fadeOut(300,function(){
                    $(this).attr('href',imgUrl[1]).fadeIn(300);
                    fadeCount = 0;
                });
                $('#topBannerArea > a > img').fadeOut(300,function(){
                    $(this).attr('src',imgArr[1]).fadeIn(300);
                    fadeCount = 0;
                });
            }
        },5000)

    }
	*/
</script>
</head>

<body>
<div id="topBannerArea">
  <img src="../images/main/img_topbanner01.png" alt="상단 베너" />
</div>
<? include '../include/gnb.php' ?>
<div id="main_contents">
  <ul>
    <? if($_SESSION['loginUserName'] == "" ){ ?>
      <li class="loginArea">
        <h1><strong>Member</strong> Login</h1>
        <form id="login" action="javascript:actLogin()">
          <button type="submit" tabindex="3">로그인</button>
          <img src="../images/main/icon_id.png" alt="아이디"><input type="text" name="userID" value="<?=$_COOKIE['userIDSave'];?>" placeholder="아이디" tabindex="1" />
		      <br />
          <img src="../images/main/icon_pw.png" alt="비밀번호" style="margin-top:6px"><input type="text" name="pwd" value="" placeholder="비밀번호" tabindex="2"  style="margin-top:6px"/>
          <div>
            <label class="idSave"><input type="checkbox" name="userIDSave" value="Y" tabindex="1" <? if($_COOKIE['userIDSave']) echo 'checked="checked"' ?> />아이디저장</label>
            <button type="button" class="useInfo" onClick="top.location.href='/eduinfo/rule.php'">이용안내</button>
            <button type="button" class="login_btn" onClick="top.location.href='/member/mypage.php'">회원가입</button>
            <button type="button" class="login_btn" onClick="top.location.href='/member/login.php?mode=findID'">아이디/비밀번호 찾기</button>
          </div>
        </form>
      </li>
    <? }else{ ?>
      <li class="myInformation">
        <h1><strong><?=$_SESSION['loginUserName'] ?></strong>님 환영합니다.&nbsp;&nbsp;
					<button type="button" onClick="logOut();">로그아웃</button>
					<? if($_SESSION['loginUserLevel'] < 9) { ?>
						<button type="button" style="margin: 15px 5px 0px 0px;" onClick="window.open('http://modulearning.kr/admin');"><?=$_SESSION['loginUserLevelName'] ?>모드</button>
					<? } ?>
				</h1>
        <ul>
          <li onClick="top.location.href='/study/'"><img src="../images/main/icon_login01.png" alt="내 강의실"><br/>내 강의실</li>
          <li onClick="helpDesk()"><img src="../images/main/icon_login02.png" alt="내 강의실"><br/>학습도움말</li>
          <li onClick="top.location.href='/member/mypage.php'"><img src="../images/main/icon_login03.png" alt="내 강의실"><br/>개인정보변경</li>
        </ul>
      </li>
    <? } ?>
    <li class="slideArea">
      <button class="btn_prev"><img src="../images/main/btn_rollingleft.png" alt="앞으로" /></button>
      <button class="btn_next"><img src="../images/main/btn_rollingright.png" alt="앞으로" /></button>
      <div class="rolling_banner">
        <ul style="cursor:pointer;">
        <!--
          <li onClick="top.location.href='/lecture/?seq=220'"><img src="../images/default/mainrolling02.jpg" alt="의료인을 위한 스마트한 길잡이" /></li>
          <li onClick="top.location.href='/lecture/?seq=300'"><img src="../images/default/mainrolling05.jpg" alt="전 직원이 들어야 할 법정필수교육" /></li>
          <li onClick="top.location.href='/lecture/?seq=279'"><img src="../images/default/mainrolling03.jpg" alt="근로자 산업안전 보건교육" /></li>
          <li onClick="top.location.href='../lecture/?sort01=lecture01'"><img src="../images/default/mainrolling04.jpg" alt="매달 1일부터 25일까지 이상에듀 온라인 교육 신청 기간" /></li>
        -->
          <!-- <li onClick="window.open('http://www.hrd.go.kr/jsp/HRDH/HRDH900/HRDH9B0/guide_main.jsp')"><img src="../images/default/mainrolling03.jpg" alt="사업주 지원카드" /></li> -->
          <?
               $queryA = "SELECT * FROM nynMainImage ORDER BY orderBy";
               $resultA = mysql_query($queryA);

               while($rsA = mysql_fetch_array($resultA)) {
                   $imagePath = $rsA[imagePath];
                   $imageLink = $rsA[imageLink];
                   $imageTarget = $rsA[imageTarget];
                   $orderBy = $rsA[orderBy];

                   if($imageLink != "") { // 링크 주소가 있으면
                       if($imageTarget == "_blank") { // 여는 방식이 새창인 경우
                           $imageLinkOn = "window.open('".$imageLink."')\" style='cursor:pointer;'";
                       } else {
                           $imageLinkOn = "top.location.href='".$imageLink."'\" style='cursor:pointer;'";
                       }
                   }
            ?>
               <li onClick="<?=$imageLinkOn?>"><img src="<?=$imagePath?>" alt="mainImage" style="width:833px; height:467px;" /></li>
            <?
               }
            ?>
       </ul>
      </div>
    </li>
<!--
    <h1 style="margin: 0;
				padding: 0 20px;
				background: #0780c2;
				color: #dee9f4;
				font-size: 14px;
				cursor: pointer;
				line-height: 56px; width=408px;"><center><strong style="font-size: 20px;">점수확인</strong></center></h1>
-->
    <li class="BBSArea">
      <h1>
        공지사항<span>Notice</span>
        <button type="button" class="btnMore" onClick="top.location.href='/bbs/?boardCode=1'"><img src="../images/main/btn_more.png" /></button>
      </h1>
      <table>
        <colgroup>
          <col width="290px" />
          <col width="78px" />
        </colgroup>
        <tbody>
        </tbody>
      </table>
    </li>
    <li class="mainModal" onClick="mainModal()"><img src="../images/default/main_modal.jpg" alt="교육 사칭 주의 모달"></li>
  </ul>
  <div>
    <div>
      <h1>BEST 추천 콘텐츠</h1>
      <h2>BEST Suggest Contents</h2>
    </div>
    <ul>
		<?
			$queryA = " SELECT A.seq, A.contentsName, A.previewImage, B.value02 AS sort01Name, C.value02 AS sort02Name, A.mainOrderBy, A.mainContentsRow
									FROM nynContents AS A
									LEFT OUTER
									JOIN nynCategory AS B ON A.sort01=B.value01
									LEFT OUTER
									JOIN nynCategory AS C ON A.sort02=C.value01
									WHERE A.mainContents='Y'
									ORDER BY A.mainOrderBy";
			  $resultA = mysql_query($queryA);

			  $queryRow = "SELECT mainContentsRow FROM nynContents WHERE mainOrderBy = '1' ";
			  $resultRow = mysql_query($queryRow);
			  $rsRow = mysql_fetch_array($resultRow);
			  if($rsRow['mainContentsRow'] == '3') {
					$liWidth = "width:400px;";
			  } else {
					$liWidth = "width:295px;";
			  }

			while($rsA = mysql_fetch_array($resultA)) {
		?>
      <li onClick="top.location.href='/lecture/?seq=<?=$rsA[seq]?>'" style="<?=$liWidth?>">
        <!--img src="../images/main/icon_bestbadge.png" /-->
        <div><img src="/attach/contents/<?=$rsA[previewImage]?>" alt="과정이미지" /></div>
        <h1><?=$rsA[contentsName]?></h1>
        <h2><?=$rsA[sort01Name]?><img src="../images/global/icon_triangle.png" alt="화살표" /><?=$rsA[sort02Name]?></h2>
      </li>
		<?
			}
		?>
    </ul>
  </div>
  <ul>
    <li class="CSCenter" onclick="top.location.href='/about/csCenter.php'">
      <h1>고객센터</h1>
      <h2></h2>
      <h3>FAX &nbsp; <strong></strong></h3>
      <ul>
        <li>
          <h1>운영시간</h1>
          <h2>
            평 &nbsp;일<br/>
            09 : 00 ~ 18 : 00<br/>
            (점심시간 12 : 00 ~ 13 : 00)
          </h2>
        </li>
        <li>
          <h1><img src="/images/main/img_cscenter01.png" alt="문화가 있는날" style="margin-top:3px;"></h1>
          <h2>
            <strong>매월 마지막 수요일 (문화가 있는날)</strong><br/>
            09 : 00 ~ 15 : 00
          </h2>
        </li>
      </ul>
      <button type="button" onclick="top.location.href='/about/csCenter.php'"><img src="/images/main/btn_cscenter01.png" alt="고객센터 운영시간 안내"></button>
    </li>
    <li class="BankInfo">
      <h1>계좌번호 안내<span>Banking Account Info</span></h1>
      <div>
        <img src="../images/main/img_bankwoori.png" alt="우리은행로고" />
        <h1>우리은행 : (주)나야넷</h1>
        <p>계좌번호 : 1005-802-899927</p>
      </div>
      <div>
        <img src="../images/main/img_bankhana.png" alt="하나은행로고" />
        <h1>하나은행 : (주)나야넷</h1>
        <p>계좌번호 : 332-910030-38504</p>
      </div>
      <div>
        <img src="../images/main/img_bankkb.png" alt="국민은행로고" />
        <h1>국민은행 : (주)나야넷</h1>
        <p>계좌번호 : 360101-04-160403</p>
      </div>
    </li>
    <li class="downloadArea">
      <a href="./contentsListExcel.php"><img src="../images/main/img_download01.png" alt="다운로드 버튼" /></a>
      <h1>교육과정 리스트 다운로드</h1>
      <h2>Download Lecture Lists</h2>
    </li>
    <br />
    <li class="downloadArea">
      <a href="/attach/docs/기업회원_교육신청_양식.zip"><img src="../images/main/img_download02.png" alt="다운로드 버튼" /></a>
      <h1>기업회원 교육신청 양식</h1>
      <h2>Request Document Form</h2>
    </li>
  </ul>
</div>
<? include '../include/footer.php' ?>

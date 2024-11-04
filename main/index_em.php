<? include '../include/header.php' ?>
<script type="text/javascript" src="../frontScript/login.js?ver=<?=date('Ymdhis')?>"></script>
<script type="text/javascript" src="../frontScript/userMain.js"></script>
<script type="text/javascript" src="../js/rollingBanner.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
	  loginScript();
    //bannerScript();
		setTimeout("mainModal()",3000);
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

	function actLogin(nextPage){
		
	nextPage = nextPage ? nextPage : '';
	var loginData = $('#login').serialize();
	//alert(loginData)
	var actLogins = $.ajax({
		method:'POST',
		url:'../api/apiLogin_test_20180608.php',
		data:loginData,
		dataType:'text',
		success:function(data){
			alert(data)
			
			if($("[name=userIDSave]").prop("checked")){
				if($('input[name=userID]').val()){
					setLoginCookie('userIDSave',$('input[name=userID]').val(),365);
				}
			}else{
				deleteLoginCookie('userIDSave');
			}
			

			if (data == 'error'){
				//alert('로그인에 실패하였습니다.\n\n 아이디 또는 비밀번호를 확인 바랍니다.');
				if(confirm('로그인에 실패하였습니다.\n\n아이디 또는 비밀번호를 확인 바랍니다.\n\n비밀번호 찾기로 이동하시겠습니까?')){
					var hostname = window.location.hostname;
					hostname = hostname.split('.');
					if(hostname[0] == 'security'){
						top.location.href='../security/login.php?mode=findPW';					
					}else{
						top.location.href='../member/login.php?mode=findPW';
					}
					
				}
			}else if(data == 'agreement'){
				top.location.href='../member/agreementCheck.php';
			}else if(data == 'agreement2'){
				//alert('다른 기기에서 로그인 중이거나 기록이 남아있어\n다른 기기 사용자를 로그아웃하였습니다.')
				top.location.href='../member/agreementCheck.php';
			}else{
			//  alert(pageMode);
				if(pageMode=='userPage' || pageMode=='studyCenterPage' || pageMode=='securityPage'){
					if (data == 'duplication'){
						//alert('다른 기기에서 로그인 중이거나 기록이 남아있어\n다른 기기 사용자를 로그아웃하였습니다.')
						window.location.reload();
					}else{
						if(pageMode=='userPage'){
                            if(data != 'cbhy' && data != 'cbhyAdmin' && data != 'cbhyPartner'){
                                if(nextPage != ''){
                                    nextPage = '/'+nextPage
                                    //alert(nextPage)
                                    top.location.href= nextPage
                                }else{
                                    top.location.href= '/main/';
                                }
                            }else{
                                if(data == 'cbhyAdmin'){
                                    window.location ='http://admin.modulearning.kr/adminCbhy/00_index.php';
                                }else if(data == 'cbhy'){
                                    alert('학원연합회 교육생은 연합회페이지로 이동됩니다.');
                                   window.location ='http://cbhy.modulearning.kr/studyCenterCbhy/';
                                }else{
                                    window.location ='http://admin.modulearning.kr/adminCbhy/00_index.php';
                                }
                            }
							
						}else{
							if(nextPage != ''){
								top.location.href= nextPage;
							}else{
								top.location.href= 'index.php';
							}
						}
					}
				}else if(pageMode=='mobilePage'){
					top.location.href='../m/study.html';
				}else if(pageMode=='appPage'){
					top.location.href='../app/study.html';
				}else if(pageMode=='mobileSecurity'){
					top.location.href='m_study.php';
				}else{
					if(data == 'cbhyAdmin'){
						window.location ='http://admin.modulearning.kr/adminCbhy/00_index.php';
					}else if(data == 'cbhyPartner'){
                        alert('학원연합회 관리자페이지로 이동됩니다.');
                       window.location ='http://admin.modulearning.kr/adminCbhy/00_index.php';
                    }else{
						top.location.href='../admin/00_index.php';
					}
					
				}
			}
		},
		error:function(request,status,error){
			alert('시스템 에러 관리자에게 문의하세요.')
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	})
}
</script>
<style>
#floatdiv { top:180px!important; }
#study { top:584px!important; }
</style>
</head>

<body>
<!--
<div id="topBannerArea">
  <img src="../images/main/img_topbanner01.png" alt="상단 베너" />
</div>
-->
<? include '../include/gnb.php' ?>
<div id="main_contents">
  <ul>
    <? if($_SESSION['loginUserName'] == "" ){ ?>
      <li class="loginArea">
        <h1><strong>Member</strong> Login</h1>
        <form id="login">
          <button type="button" onclick="actLogin()" tabindex="3">로그인</button>
          <img src="../images/main/icon_id.png" alt="아이디"><input type="text" name="userID" value="<?=$_COOKIE['userIDSave'];?>" placeholder="아이디" tabindex="1" />
		      <br />
          <img src="../images/main/icon_pw.png" alt="비밀번호" style="margin-top:6px"><input type="text" name="pwd" value="" placeholder="비밀번호" tabindex="2"  style="margin-top:6px"/>
          <div>
            <label class="idSave"><input type="checkbox" name="userIDSave" value="Y" tabindex="3" <? if($_COOKIE['userIDSave']) echo 'checked="checked"' ?> />아이디저장</label>
            <button type="button" class="useInfo" onClick="top.location.href='/eduinfo/rule.php'">이용안내</button>
            <button type="button" class="login_btn" onClick="alert('회원가입은 전화로 문의 바랍니다.')">회원가입</button>
            <button type="button" class="login_btn" onClick="top.location.href='/member/login.php?mode=findID'">아이디/비밀번호 찾기</button>
          </div>
        </form>
      </li>
    <? }else{ ?>
      <li class="myInformation">
        <h1><strong><?=$_SESSION['loginUserName'] ?></strong>님 환영합니다.&nbsp;&nbsp;
					<button type="button" onClick="logOut();">로그아웃</button>
					<? if($_SESSION['loginUserLevel'] < 9) { ?>
						<!--<button type="button" style="margin: 15px 5px 0px 0px;" onClick="window.open('http://modulearning.kr/admin');"><?=$_SESSION['loginUserLevelName'] ?>모드</button>-->
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
	<!--
    <li class="mainModal" onClick="mainModal()"><img src="../images/default/main_modal.jpg" alt="교육 사칭 주의 모달"></li>
	-->
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
    <li class="CSCenter" onclick="top.location.href='/bbs/mantoman.php'">
      <h1></h1>
      <h2></h2>
      <h2></h2>
	  <h4></h1>
      <ul>
        <li>
          <h1></h1>
          <h2></h2>
        </li>
      </ul>
      <!-- <button type="button" onclick="top.location.href='/about/csCenter.php'"><img src="/images/main/btn_cscenter01.png" alt="고객센터 운영시간 안내"></button> -->
    </li>
	<!--li class="ezhelp">
		<a href="http://<?=$_remoteURL?>" target="_blank">
			<img src="../images/main/bottom_img.jpg" alt="원격지원" />
		</a>
    </li-->

    <li class="BankInfo">
	  <table>
		<tr>
			<td><a href="/lecture/intro_duty_education.php"><img src="../images/main/duty_education_quick.jpg" /></a></td>
			<td><a href="/lecture/intro_safety_education.php"><img src="../images/main/safety_education_quick.jpg" /></a></td>
		</tr>
	  </table>
      <h1>계좌번호 안내<span>Banking Account Info</span></h1>
      <div>
        <img src="../images/main/img_ibk.png" alt="기업은행로고" />
        <h1>기업은행 : 주식회사 한국안전교육기술원</h1>
        <p>계좌번호 : 666-032115-01-029</p>
      </div>
    </li>


    <li class="downloadArea">
      <a href="./contentsListExcel.php"><img src="../images/main/img_download01.png" alt="다운로드 버튼" /></a>
      <!--<a href="#" onclick="alert('준비 중입니다.');"><img src="../images/main/img_download01.png" alt="다운로드 버튼" /></a>-->
      <h1>교육과정 리스트 다운로드</h1>
      <h2>Download Lecture Lists</h2>
    </li>
    <br />
    <li class="downloadArea">
      <a href="/attach/docs/기업회원_교육신청_양식.zip"><img src="../images/main/img_download02.png" alt="다운로드 버튼" /></a>
      <!--<a href="#" onclick="alert('준비 중입니다.');"><img src="../images/main/img_download02.png" alt="다운로드 버튼" /></a>-->
      <h1>기업회원 교육신청 양식</h1>
      <h2>Request Document Form</h2>
    </li>
  </ul>
</div>
<? include '../include/footer.php' ?>

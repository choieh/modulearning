<? 
include '../lib/header.php';

if( !preg_match("/modulearning.kr/",$_SERVER["SERVER_NAME"]) ){

    $moduDomain = str_replace('kiraedu.kr','modulearning.kr', $_SERVER["SERVER_NAME"] );
    header("Location: https://$moduDomain".$_SERVER["REQUEST_URI"]);
    exit;

}

if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
//    header('Location: https://'.$_siteURL.$_SERVER['PHP_SELF']);
} else {
    header('Location: https://'.$_siteURL.$_SERVER['PHP_SELF']);
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>

<title>모두의러닝 - 모두를 위한 교육, 모두의교육그룹</title>
<meta http-equiv="X-UA-Compatible" content="IE=EDGE"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<link rel="canonical" href="https://<?=$_siteURL?>/main/"/>
<meta name="author" content="<?=$_siteURL?>"/>
<meta name="title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹"/>
<meta name="description" content="모두의러닝, 법정의무교육, 산업안전보건교육, 직무교육, 마이크로러닝, 플립러닝, 비대면서비스바우처, 사업주환급, 모두의교육그룹, AI 영상제작 스튜디오"/>
<meta name="keywords" content="모두의러닝, moduLEARNING">

<meta property="og:type" content="website">
<meta property="og:title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹">
<meta property="og:description" content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격, 모두의교육그룹, AI 영상제작 스튜디오">
<meta property="og:url" content="https://<?=$_siteURL?>">
<meta property="og:image" content="https://<?=$_siteURL?>/images/global/moduOG_img.jpg">

<link rel="stylesheet" type="text/css" href="/css/testUserStyle.css"/>
<link rel="stylesheet" type="text/css" href="/css/skin2.css"/>
<link rel="stylesheet" type="text/css" href="/css/custom.css"/>
<link rel="stylesheet" type="text/css" href="/css/reset.css">
<link rel="stylesheet" type="text/css" href="/css/review.css">
<link rel="stylesheet" type="text/css" href="/css/slick.css">
<link rel="stylesheet" type="text/css" href="/css/slick-theme.css">
<link rel="shortcut icon" type="image/png" sizes="16x16" href="https://<?=$_siteURL?>/favicon/favicon-16x16M.png">

<script language="javascript" type="text/javascript" src="/js/jquery-1.12.4.min.js"></script>
<script language="javascript" type="text/javascript" src="/js/slides.min.jquery.js"></script>
<script language="javascript" type="text/javascript" src="/js/slick.min.js"></script>
<script language="javascript" type="text/javascript" src="/js/common.js"></script>
<script language="javascript" type="text/javascript" src="/js/validate.js"></script>
<script type="text/javascript" src="/js/style.js"></script>
<!--<script type="text/javascript" src="../js/links.js?q=20210929"></script>-->

<!-- <script type="text/javascript" src="//wcs.naver.net/wcslog.js"> </script> -->
<script type="text/javascript">
	const loginUserID = "<?=$_SESSION['loginUserID'] ?>";     	//로그인 유저 아이디
	var loginUserName = "<?=$_SESSION['loginUserName'] ?>"; 	//로그인 유저 이름
	var loginUserLevel = "<?=$_SESSION['loginUserLevel'] ?>";  //로그인 유저 아이디
	var loginCompanyCode = "<?=$_SESSION['loginCompanyCode']?>";
	var pageMode = 'userPage';
	var subDomain = '<?=$_SERVER["HTTP_HOST"] ?>';
	var foot_companyID = '<?=$CompanyID ?>';
	var _siteURL = '<?=$_siteURL?>';
	var remoteURL = '<?=$_remoteURL?>';
	subDomain = subDomain.replace('.' + _siteURL, '');
	if (subDomain == _siteURL) {
		subDomain = '';
	}

	// 로그인 체크
	function overlap_loginchk() {
		//jsloginchk.src="../api/crossLogin.php";
		$.ajax({
			url: '../api/crossLogin.php',
			dataType: 'JSON',
			success: function (data) {
				if (data.result != 'success') {
					alert(data.result);
					logOut();
				}
			}
		})
		window.setTimeout("overlap_loginchk()", 100000);
	}
	
</script>
<script type="text/javascript" src="/js/userUI.js"></script>
<script type="text/javascript" id="crossLogin"></script>



<style>
    html{
        scrollbar-gutter: stable;
    }
	.float-banner .fb_inner {
		top: 400px;
	}
    .userIdModal{
        position: fixed;
        width:23%;
        height:24%;
        z-index: 6;
        background-color: #ffffff;
        text-align: center;
        box-shadow: 5px 5px 5px 5px #bebebebe;
        border: 2px solid #eeeeee;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        padding-top:20px;
        padding-bottom:2%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: none;
    }
    .userIdList{
        background-color: #f3f3f3;
        width:95%;
        height:65%;
        margin: auto;
        display: flex; /* Flexbox 사용 */
        justify-content: center; /* 가로 방향 가운데 정렬 */
        text-align: center;
        font-family: "NanumSquare";
        padding: 10px;
        overflow-y: auto;
    }
    #confirmBtn{
        margin-left:auto;
        margin-right: auto;
        width: 30%;
        height: 15%;
        display: block;
        position: absolute; 
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    #searchText{
        font-family: "NanumSquare";
        font-size: 20px;
        padding-bottom: 15px;
    }
    .no-scroll {
        height:100%; 
        min-height:100%; 
        overflow:hidden 
        !important; 
        touch-action:none;
    }
</style>

<script type="text/javascript">
  var mode = '<?=$_GET[mode]; ?>'
  var page = '<?=$_GET[page]; ?>'
  var pid = '<?=$_GET[pid]; ?>'
  mode = mode ? mode : '';

  $(document).ready(function() {
	  loginPage(mode,page);
	  loginScript();
  });
  //var loginUserID = "<?php //=$_SESSION['loginUserID'] ?>//";     	//로그인 유저 아이디
  var loginCompanyCode = "<?=$_SESSION['loginCompanyCode']?>";

  if (loginUserID != '' && pid == 1) {
      location.href='/main/';
  }
</script>
<script type="text/javascript" src="../../js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../../frontScript/login.js?ver=<?=date('Ymdhis')?>"></script>





    </head>
    <body>
<div class="skip_nav">
    <a href="#gnb">메인메뉴로 이동</a>
    <a href="#container">본문으로 이동</a>
</div>
<div id="wrap_main">


    <div id="container">
        <div class="main_wrap">

            <div class="content_area" style="width:1145px;">
                								
				<h4 class="content_title">랜딩 관리자 로그인</h4>
				<div class="content_body">
					<div class="tb_top">
					</div>
					<div class="login_box">
						
							<h5 class="log_tt"><img src="/html/images/common/login_tt.png" alt="아이디와 비밀번호를 입력해주세요">&nbsp;&nbsp; 아이디와 비밀번호를 입력해주세요</h5>
														
								<form name="login" id="login" method="post" target="sysfrm">
								<input type="hidden" name="returl" value="/landingS/manager/">
								<div class="log_in">
									<div class="iparea ip_id"><input type="text" name="userID" id="id" placeholder="아이디" hname="아이디" required="Y"></div>
									<div class="iparea ip_pass"><input type="password" name="pwd" id="passwd" placeholder="비밀번호" hname="비밀번호" required="Y"></div>
								</div>
								<div class="ip_submit"><input type="submit" onclick="actLoginManager()" class="button btn_login" value="로그인"></div>
								</form>
						
					</div>
				</div>
								
            </div>
        </div>
    </div>
    
</div>

<script>
function actLoginManager(){

			var loginData = $('#login').serialize();
			var actLogins = $.ajax({
				method:'POST',
				url:'../api/apiLogin.php',
				data:loginData,
				dataType:'json',
				async:false,
				success:function(data){

					/*if($("[name=userIDSave]").prop("checked")){
						if($('input[name=userID]').val()){
							setLoginCookie('userIDSave',$('input[name=userID]').val(),365);
						}
					}else{
						deleteLoginCookie('userIDSave');
					}*/
					
					if (data == 'error'){
						alert('로그인에 실패하였습니다.\n\n 아이디 또는 비밀번호를 확인 바랍니다.');						
					}else{					 
						location.href='/landingS/manager/';
					}
				},
				error:function(request,status,error){
					alert('시스템 에러 관리자에게 문의하세요.')
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			})
		}
</script>


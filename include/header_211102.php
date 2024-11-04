<? include '../lib/header.php'; ?>
<?
	$geturl = explode(".",$_SERVER["HTTP_HOST"]);
	if($geturl[0] == 'm'){
		header("location:/m/");
    }
    if(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {

    } else {
        header('Location: https://'.$_siteURL.$_SERVER['PHP_SELF']);
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=1280, user-scalable=yes">
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
<title><?=$_siteName?></title>
<link rel="stylesheet" href="../css/userStyle.css?ver=<?=date(Ymdhi)?>" />

<meta name="description" content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격">
<meta property="og:type" content="website">
<meta property="og:title" content="모두의러닝 (구, 한국안전교육기술원)">
<meta property="og:description" content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격">
<meta property="og:url" content="https://modulearning.kr">
<meta property="og:image" content="https://modulearning.kr/images/global/logoM.png">


<link rel="canonical" href="https://www.modulearning.kr" />


<!--
<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
<link rel="manifest" href="/favicon/manifest.json">
-->
<!-- <meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"> -->
<!-- <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"> -->
<link rel="shortcut icon" type="image/png" sizes="16x16" href="https://modulearning.kr/favicon/favicon-16x16M.png">



<script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
  var loginUserID = "<?=$_SESSION['loginUserID'] ?>";     	//로그인 유저 아이디
  var loginUserName = "<?=$_SESSION['loginUserName'] ?>"; 	//로그인 유저 이름
  var loginUserLevel = "<?=$_SESSION['loginUserLevel'] ?>";  //로그인 유저 아이디
  var loginCompanyCode = "<?=$_SESSION['loginCompanyCode']?>";
  var pageMode = 'userPage';
  var subDomain = '<?=$_SERVER["HTTP_HOST"] ?>';
	var foot_companyID = '<?=$CompanyID ?>';
	var _siteURL = '<?=$_siteURL?>';
	var remoteURL = '<?=$_remoteURL?>';
	subDomain = subDomain.replace('.'+_siteURL,'');
  if (subDomain == _siteURL){
	  subDomain = '';
  }

  // 로그인 체크
//  function overlap_loginchk(){
//	  //jsloginchk.src="../api/crossLogin.php";
//	  $.ajax({
//		  url:'../api/crossLogin.php',
//		  dataType:'JSON',
//		  success:function(data){
//			  if(data.result != 'success'){
//				  alert(data.result);
//				  logOut();
//			  }
//		  }
//	  })
//	  window.setTimeout("overlap_loginchk()",120000);
//  }
//  $(document).ready(function(){
//	  overlap_loginchk()
//  })


  //GNB 교육과정메뉴 출력
  $(window).load(function(){
	  $.get('../api/apiCategory.php',{'value01':'lectureCode'},function(data){
        var topMenu = ''
        topMenu += '<li onclick="top.location.href=\'/lecture/intro_duty_education.php\'">법정의무교육 소개</li>';
		topMenu += '<li onclick="top.location.href=\'/lecture/intro_safety_education.php\'">산업안전보건교육 소개</li>';
		topMenu += '<li onclick="top.location.href=\'/lecture/intro_job_education.php\'">직무교육 소개</li>';
		
        $.each(data.category, function(){
			if(this.value01 != 'lecture13' && this.value01 != 'lecture14'){
				topMenu += '<li onclick="top.location.href=\'/lecture/?sort01='+this.value01+'\'">';
            	topMenu += this.value02+'과정';
            	topMenu += '</li>';
			} 
        })
		
        $('#GNB li.lectureMenu > h1').attr('onClick','top.location.href="/lecture/?sort01='+data.category[0].value01+'"');
        $('#GNB li.lectureMenu ol').html(topMenu);
	  })
	  .done(function(){
		  $.get('../api/apiCompany.php',{'companyID':foot_companyID},function(data){
			  var companySel = data.company[0]
			  foot_companyNames = companySel.companyName;
			  foot_companyAddress = companySel.zipCode+' ) '+companySel.address01+'&nbsp;'+companySel.address02;

			  var companyphone01 = ''
			  var companyphone02 = ''
			  if(companySel.phone01 != null && companySel.phone01 != ''){
				  companyphone01 = '+82-'+companySel.phone01.replace("0","")+'-';
				  companyphone02 = companySel.phone01+'.';
			  }
			  foot_companyTel = companyphone01+companySel.phone02+'-'+companySel.phone03;
			  CS_companyTel = companyphone02+companySel.phone02+'.'+companySel.phone03;

			  var companyfax01 = ''
			  var companyfax02 = ''
			  if(companySel.fax01 != null && companySel.fax01 != ''){
				  companyfax01 = '+82-'+companySel.fax01.replace("0","")+'-';
				  companyfax02 = companySel.fax01+'.';
			  }
			  foot_companyFax = companyfax01+companySel.fax02+'-'+companySel.fax03;
			  CS_companyFax = companyfax02+companySel.fax02+'.'+companySel.fax03;

			  var footerAddress = '';
			  /*
			  footerAddress +='<strong>'+foot_companyNames+'</strong>&nbsp;&nbsp;|&nbsp;&nbsp;'+foot_companyAddress+'<br />';
			  footerAddress +='tel : '+foot_companyTel+'&nbsp;&nbsp;|&nbsp;&nbsp;fax : '+foot_companyFax+'&nbsp;&nbsp;|&nbsp;&nbsp;';
			  footerAddress +='copyright '+foot_companyNames+' allright &amp; reserved';
			  //$('#footer address').html(footerAddress)
			  $('.CSCenter > h2').html(CS_companyTel)
			  $('.CSCenter > h3 strong').eq(0).html(CS_companyFax)
			  */
		  })
	  })
  })
</script>
<script type="text/javascript" src="../js/userUI.js"></script>
<script type="text/javascript" id="crossLogin"></script>
<!--<script type="text/javascript" src="../frontScript/GNB.js"></script>
<script type="text/javascript" src="../js/adminUI.js"></script>-->

<?$fileName = explode("/",$_SERVER['PHP_SELF']);?>


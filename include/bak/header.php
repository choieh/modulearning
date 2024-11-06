<? include '../lib/header.php'; ?>
<?
$geturl = explode(".", $_SERVER["HTTP_HOST"]);
if ($geturl[0] == 'm') {
    header("location:/m/");
}

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

<!-- Google Tag Manager -->
<!-- <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PK297RLF');</script> -->
<!-- End Google Tag Manager -->

    <title>모두의러닝 - 모두를 위한 교육, 모두의교육그룹</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <link rel="canonical" href="https://<?=$_siteURL?>/main/"/>
    <meta name="author" content="<?=$_siteURL?>"/>
    <meta name="title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹"/>
    <meta name="description" content="모두의러닝, 법정의무교육, 산업안전보건교육, 직무교육, 마이크로러닝, 플립러닝, 비대면서비스바우처, 사업주환급, 모두의교육그룹, AI 영상제작 스튜디오"/>
    <meta name="keywords" content="모두의러닝, moduLEARNING">

    <!-- <meta property="og:type"  content="website" data-dynamic="true" />
    <meta property="og:title" content="모두의러닝(moduLEARNING)" data-dynamic="true" />
    <meta property="og:description" content="모두의러닝, 법정의무교육, 산업안전보건교육, 직무교육, 마이크로러닝, 플립러닝, 비대면서비스바우처, 사업주환급" data-dynamic="true" />
    <meta property="og:url"   content="https://www.modulearning.kr" data-dynamic="true" />
    <meta property="og:image" content="https://www.modulearning.kr/html/images/thumbnail.png" />
    <meta property="og:image:secure_url" content="https://www.modulearning.kr/html/images/thumbnail.png"  /> -->

    <!-- <meta name="description" content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격, 모두의교육그룹"> -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="모두의러닝 - 모두를 위한 교육, 모두의교육그룹">
    <meta property="og:description" content="모두의러닝, 법정직무교육, 장애인 인식개선, 성희롱 예방, 병원인증, 환급교육, 근로자카드, 우편원격, 모두의교육그룹, AI 영상제작 스튜디오">
    <meta property="og:url" content="https://<?=$_siteURL?>">
    <meta property="og:image" content="https://<?=$_siteURL?>/images/global/moduOG_img.jpg">

    <link rel="stylesheet" type="text/css" href="../css/testUserStyle.css"/>
    <link rel="stylesheet" type="text/css" href="../css/skin2.css"/>
    <link rel="stylesheet" type="text/css" href="../css/custom.css"/>
    <link rel="stylesheet" type="text/css" href="../css/reset.css">
    <link rel="stylesheet" type="text/css" href="../css/review.css">
    <link rel="stylesheet" type="text/css" href="../css/slick.css">
    <link rel="stylesheet" type="text/css" href="../css/slick-theme.css">
    <link rel="stylesheet" type="text/css" href="../dist/css/main.css">
    <link rel="shortcut icon" type="image/png" sizes="16x16" href="https://<?=$_siteURL?>/favicon/favicon-16x16M.png">

    <script language="javascript" type="text/javascript" src="../js/jquery-1.12.4.min.js"></script>
    <script language="javascript" type="text/javascript" src="../js/slides.min.jquery.js"></script>
    <script language="javascript" type="text/javascript" src="../js/slick.min.js"></script>
    <!--<script language="javascript" type="text/javascript" src="../js/cheditor.js" charset="utf-8"></script>-->
    <script language="javascript" type="text/javascript" src="../js/common.js"></script>
    <script language="javascript" type="text/javascript" src="../js/validate.js"></script>
    <script type="text/javascript" src="../js/style.js"></script>
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

        $(document).ready(function () {
            //overlap_loginchk(); //230321 test
        })


        //GNB 교육과정메뉴 출력
        $(window).load(function () {
            $.get('../api/apiCategory.php', {'value01': 'lectureCode', 'value03': '사업주'}, function (data) {
                var topMenu = '';
                var topMenu2 = '';
                //topMenu += '<li onclick="top.location.href=\'/lecture/intro_duty_education.php\'">법정의무교육 소개</li>';
                //topMenu += '<li onclick="top.location.href=\'/lecture/intro_safety_education.php\'">산업안전보건교육 소개</li>';
                //topMenu += '<li onclick="top.location.href=\'/lecture/intro_job_education.php\'">직무교육 소개</li>';

                $.each(data.category, function () {
                    /*if(this.value01 != 'lecture13' && this.value01 != 'lecture14'){
                        topMenu += '<li onclick="top.location.href=\'/lecture/?sort01='+this.value01+'\'">';
                        topMenu += this.value02+'과정';
                        topMenu += '</li>';
                    }*/
                    if (this.value01 != 'lecture03' && this.value01 != 'lecture12') {
                        topMenu2 += '<li><a href="/lecture/?sort01=' + this.value01 + '">';
                        topMenu2 += this.value02 + '과정';
                        topMenu2 += '</a></li>';
                    }
                })

                $('#GNB li.lectureMenu > h1').attr('onClick', 'top.location.href="/lecture/?sort01=' + data.category[0].value01 + '"');
                //$('#GNB li.lectureMenu ol').html(topMenu);

                $('#gnb #GNB_COURSE1 .gnb_sub').html(topMenu2);
                $('.all_list #onlineStudy ul').html(topMenu2);
            })
                .done(function () {
                    $.get('../api/apiCompany.php', {'companyID': foot_companyID}, function (data) {
                        var companySel = data.company[0];
                        foot_companyNames = companySel.companyName;
                        foot_companyAddress = companySel.zipCode + ' ) ' + companySel.address01 + '&nbsp;' + companySel.address02;

                        var companyphone01 = ''
                        var companyphone02 = ''
                        if (companySel.phone01 != null && companySel.phone01 != '') {
                            companyphone01 = '+82-' + companySel.phone01.replace("0", "") + '-';
                            companyphone02 = companySel.phone01 + '.';
                        }
                        foot_companyTel = companyphone01 + companySel.phone02 + '-' + companySel.phone03;
                        CS_companyTel = companyphone02 + companySel.phone02 + '.' + companySel.phone03;

                        var companyfax01 = ''
                        var companyfax02 = ''
                        if (companySel.fax01 != null && companySel.fax01 != '') {
                            companyfax01 = '+82-' + companySel.fax01.replace("0", "") + '-';
                            companyfax02 = companySel.fax01 + '.';
                        }
                        foot_companyFax = companyfax01 + companySel.fax02 + '-' + companySel.fax03;
                        CS_companyFax = companyfax02 + companySel.fax02 + '.' + companySel.fax03;

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
        //window.open('/errpop.php', 'err', 'top=10, left=10, width=500, height=720, status=no, menubar=no, resizable=no');


    </script>
    <script type="text/javascript" src="../js/userUI.js"></script>
    <script type="text/javascript" id="crossLogin"></script>





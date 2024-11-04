<?php
include $_SERVER['DOCUMENT_ROOT'] . '/lib/v1/header.php';
header('Content-Type:text/html; charset:utf-8');
//ini_set('display_errors', 1);

$seq = $_GET['seq'];
$chapterName = $_GET['chapterName'];
$changeDept = $_GET['changeDept'];
$birthDay = $_GET['birthDay'];

if ($_SESSION['loginUserID'] == '') {
    echo "<script>alert('로그인 해주세요.');</script>";
    echo "<script>window.close();</script>";
}

try {
    $query = "
        SELECT ns.seq, ns.serviceType, ns.lectureStart, ns.lectureEnd, nm.userName, nm.birth, ncs.contentsTime, ncs.contentsName, ncs.sort01,
        ncs.sort02, nc.companyName, ncs.contentsCode, nm.department, ns.testSaveTime, nm.userID, ncrt.inputDate, nc.companyCode
        FROM nynStudy ns
        JOIN nynMember nm on ns.userID = nm.userID
        JOIN nynCompany nc on ns.companyCode = nc.companyCode
        JOIN nynContents ncs ON ns.contentsCode = ncs.contentsCode
        LEFT JOIN nynCertification ncrt ON ncrt.studySeq = ns.seq
    ";

    if ($chapterName == 'Y') {
        $query .= 'JOIN nynChapter nh ON ns.contentsCode = nh.contentsCode';
    }

    // $query .= ' LEFT JOIN nynCertification ncr on ns.seq = ncr.studySeq';

    $query .= " WHERE ns.passOK='Y' AND ns.seq = ? ";

    $query .= " GROUP BY ns.contentsCode, ns.lectureStart, ns.lectureEnd, ns.userID";

    if ($_COOKIE['test'] == 'test') {
//        echo $query; exit;
    }
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('s', $seq);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($result->num_rows == 0) {
        echo '
            <script>
            alert("수료건수가 없습니다.");
            window.close();
            </script>
        ';
    }

} catch (mysqli_sql_exception $e) {
    echo $_SERVER['REMOTE_ADDR'] == DEV_IP
        ? $e->getMessage()
        : '오류가 발생했습니다.';
}

?>
    <!DOCTYPE>
    <html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css">
        <title>교육수료증</title>
        <script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
        <style type="text/css">
            /* @import url(https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css); */
            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

            @font-face {
                font-family: 'NanumSquareRoundOTFL';
                src: url('/font/NanumSquareRoundOTFL.otf') format('truetype');
            }

            @page {
                size: A4;
                margin: 10mm;
            }

            .printArea {
                position: relative;
                height: 1040px;
                padding: 0;
                margin-top: 25px;
                font-family: 'Pretendard';
                width: 718.9px;
            }

            .printArea + .printArea {
                page-break-before: always;
            }

            .printArea > h1, .printArea > h2, .printArea > p, .printArea > ul, .printArea > h3 {
                position: relative;
            }

            .printArea > h1, .printArea > h2, .printArea > p {
                text-align: center;
            }

            .printArea > h1 {
                margin: 0;
                padding-top: 1cm;
                font-size: 35pt;
                text-align: center;
            }

            .printArea > ul, div#printArea > ul li {
                margin: 0;
                padding: 0;
                font-size: 14pt;
                list-style: none;
            }

            .printArea > ul {
                overflow: hidden; /*height:13.8cm;*/
                margin-top: 2cm;
                margin-left: 2.5cm;
                margin-right: 2.5cm;
                min-height: 420px;
                font-size: 17px;
            }

            .printArea > ul li {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .printArea > ul li h1 {
                padding-right: 5pt;
                font-size: 14pt;
                width: 100px;
                height: 21.8px;
                text-align: justify;
            }

            .printArea > ul li h1::after {
                content: "";
                width: 100%;
                display: inline-block;
            }

            .printArea > ul li h1 {
                overflow: hidden;
            }

            .printArea > ul li span {
                width: 500px;
            }

            .printArea > p {
                margin-top: 1cm;
                font-size: 18pt;
                line-height: 150%;
                font-weight: bold;
                text-align: center;
            }

            .printArea > h2 {
                margin-top: 5%;
                padding: 0 11%;
                text-align: center;
                font-size: 16pt;
                z-index: 999;
            }

            .printArea > h3 {
                text-align: center;
                font-size: 18pt;
            }

            .printArea > h3 img {
                width: 2cm;
                margin-left: 5px;
                vertical-align: middle;
            }

            .printArea > img {
                position: absolute;
                width: 96%;
                margin: 0 2%;
            }

            .printArea > h4 {
                font-size: 18px;
                position: relative;
                padding-top: 3%;
                font-weight: bold;
                margin-left: 14%;
                margin-top: 0;
            }

            #printBtnArea {
                position: fixed;
                top: 10px;
                left: 10px;
            }

            #printBtnArea > button {
                all: unset;
                background: tomato;
                color: white;
                height: 40px;
                padding: 0 10px;
                border-radius: 5px;
            }

            #chapterNameLi {
                align-items: flex-start;
            }

            #chapterNameLi > span {
                margin-top: 12px;
            }

            @media print {
                #printBtnArea {
                    display: none;
                }
            }

            @keyframes spinner {
                0% {
                    transform: translate3d(-50%, -50%, 0) rotate(0deg);
                }
                100% {
                    transform: translate3d(-50%, -50%, 0) rotate(360deg);
                }
            }

            /* .printArea > h4 {font-size:18px; font-weight: bold;margin-left:14%;} */

        </style>
        <script>
            function printCertificate() {
                window.print();
            }

            function resizeChapterName(num) {
                let chapterLi = document.getElementsByClassName(`li${num}`)[0];
                if (chapterLi) {
                    if (chapterLi.offsetHeight >= 400) {
                        document.querySelector(`.li${num} span`).style.fontSize = '11px';
                    } else if (chapterLi.offsetHeight >= 300 && chapterLi.offsetHeight < 400) {
                        document.querySelector(`.li${num} span`).style.fontSize = '13px';
                    } else if (chapterLi.offsetHeight > 250 && chapterLi.offsetHeight < 300) {
                        document.querySelector(`.li${num} span`).style.fontSize = '14px';
                    } else if (chapterLi.offsetHeight > 200 && chapterLi.offsetHeight <= 250) {
                        document.querySelector(`.li${num} span`).style.fontSize = '15px';
                    }
                }
            }
        </script>
    </head>
    <body>
    <?php
    $num = 0;
    while ($rs = $result->fetch_assoc()) {
        // 여러 과정 수료증을 뽑는 경우 불필요한 쿼리 실행 방지
        $chapter = [];
        if ($chapterName == 'Y') {
            if (!in_array($rs['contentsCode'], $chapter)) {
                $queryC = "SELECT chapterName FROM nynChapter WHERE contentsCode = ?";
                $stmtC = $mysqli->prepare($queryC);
                $stmtC->bind_param('s', $rs['contentsCode']);
                $stmtC->execute();
                $resultC = $stmtC->get_result();
                $rsC = $resultC->fetch_all();
                $countC = count($rsC);

                if ($countC <= 30) {
                    $tempArr = [];
                    for ($i = 0; $i < $countC; $i++) {
                        $tempArr[] = $rsC[$i];
                    }
                    $chapter[$rs['contentsCode']] = $tempArr;
                }
            }
        }

        $birth = $rs['birth'];
        $year = substr($birth, 0, 2);
        $year < 40 ? $year = '20' . $year : $year = '19' . $year;
        $month = substr($birth, 2, 2);
        $day = substr($birth, 4, 2);

        if ($rs['serviceType'] == 1) {
            $resultDate00 = date("Y-m-d", strtotime($rs['lectureEnd'] . '+ 8 days'));
        } elseif ($rs['contentsCode'] == 'TY5OVE' && $rs['testSaveTime'] != NULL) { //요청게시판 587 특정 과정의 기준
            $resultDate00 = date("Y-m-d", strtotime($rs['testSaveTime']));
        } else {
            $resultDate00 = substr($inputDate, 0, 10);
        }

        if ($_COOKIE['test'] == 'test') {
            // var_dump(substr($inputDate, 0, 10));
            // exit;
        }

        $resultDate01 = substr($resultDate00, 0, 4);
        $resultDate02 = substr($resultDate00, 5, 2);
        $resultDate03 = substr($resultDate00, 8, 2);
        $resultDate = $resultDate01 . "년 " . $resultDate02 . "월 " . $resultDate03 . "일";

        if ($changeDept == 'Y') {
            $companyName = $rs['department'] ?: $rs['companyName'];
        } else {
            $companyName = $rs['companyName'];
        }

        $passDate = $rs['inputDate'] != NULL ? date("Y-m-d", strtotime($rs['inputDate'])) : NULL;

        ?>
        <div class="printArea">
            <?php
            $start00 = substr($rs['lectureStart'], 0, 4);
            $start01 = substr($rs['lectureStart'], 5, 2);
            $serviceType = '0' . $rs['serviceType'];
            $seq = str_pad($rs['seq'], 7, '0', STR_PAD_LEFT);

            $combinationCode = "제 $start00-$start01$serviceType-$seq 호";
            ?>

            <div style="position:absolute; top:30px; left:120px; z-index:9;"><?= $combinationCode ?></div>
            <img src="../images/study/print_img01.jpg" alt="" style="z-index:-2;"/>
            <br/><br/>
            <h1>수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;료&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;증</h1>
            <ul>
                <li><h1>이 름:</h1><span><?= $rs['userName'] ?></span></li>
                <?php
                if ($birthDay != 'N') {
                    ?>
                    <li><h1>생 년 월 일:</h1><span><?= $year . '년 ' . $month . '월 ' . $day . '일' ?></span></li>
                    <?
                }
                ?>
                <li><h1>소 속 기 관:</h1><span><?= $companyName ?></span></li>
                <li><h1>훈 련 과 정:</h1><span><?= $rs['contentsName'] ?></span></li>
                <li><h1>훈 련 기 간:</h1>
                    <span><?= $rs['lectureStart'] . ' ~ ' . $rs['lectureEnd'] . '(' . $rs['contentsTime'] . '시간)' ?></span>
                </li>
                <?php if ($passDate != NULL) { ?>
                    <li><h1>수 료 일:</h1><span><?= $passDate ?></span></li>
                <?php } ?>
                <?php if ($chapterName == 'Y' && $countC <= 30) { ?>
                    <li id="chapterNameLi" class="<?= 'li' . $num ?>">
                        <h1>차 시 명:</h1>
                        <span>
            <?php for ($i = 0; $i < $countC; $i++) { ?>
                <?php echo ($i + 1) . '. ' . $chapter[$rs['contentsCode']][$i][0];
                if ($countC <= 10) echo '<br>'; ?>
            <?php } ?>
                </span>
                    </li>
                <?php } ?>
            </ul>
            <?php if ($rs['sort01'] == 'lecture03') { //산업안전보건교육?>
                <!-- <p>위 사람은 산업안전보건법 제 31조의<br />법령에 의하여 위의 과정을<br />수료하였으므로 이 증서를 수여합니다.</p> -->
                <p>위 사람은 상기 과정을 수료하였기에<br/>이 증서를 수여합니다.</p>
            <?php } else if ($rs['sort01'] == 'lecture12') { ?>
                <?php if ($rs['sort02'] == 'lecture0102' || $rs['sort02'] == 'lecture0110') { //성희롱예방교육?>
                    <p>위 사람은 남녀고용평등법 및 <br/>일과 가정의 양립지원에 관한 법률 제 13조의<br/>법령에 의하여 위 교육과정을<br/>수료하였으므로 이 증서를 수여합니다.</p>
                <?php } else if ($rs['sort02'] == 'lecture0103') { //개인정보보호교육?>
                    <p>위 사람은 개인정보보호법 제 28조의 <br/>법에 의하여 위 교육과정을<br/>수료하였으므로 이 증서를 수여합니다.</p>
                <?php } else if ($rs['sort02'] == 'lecture0104') { //장애인식개선교육?>
                    <p>위 사람은 장애인고용촉진 및 직업재활법<br/>제 5조 2항에 의하여 위 교육과정을<br/>수료하였으므로 이 증서를 수여합니다.</p>
                <?php } else if ($rs['sort02'] == 'lecture0105') { //괴롭힘예방교육?>
                    <p>위 사람은 근로기준법 직장 내 괴롭힘 금지법 제 6장의 2에<br/>의하여 위 교육과정을<br/>수료하였으므로 이 증서를 수여합니다.</p>
                <?php } else { ?>
                    <p>위 사람은 상기 과정을 수료하였기에<br/>이 증서를 수여합니다.</p>
                <?php } ?>
            <?php } else { ?>
                <p>위 사람은 상기 과정을 수료하였기에<br/>이 증서를 수여합니다.</p>
            <?php } ?>
            <h2><?= $resultDate ?></h2>

			<?php if ($rs['companyCode'] == '0000000072') { ?>
                <h3 style="padding-left:15px; text-align: center;">
                    <img src="/studyCenterEC/img/logo.png"
                style="margin:0; margin-top: 60px; width:50%; z-index:10;"/>
                </h3>

            <?php } else { ?>
                <h3 style="padding-left:15px;"><?= changeSiteName($companyName) ?>
                    <img widht="76" height="76" src="../attach/print/print_img02.png" alt="직인이미지"/>
                </h3>
                <img src="/images/common/symbol.png"
                     style="margin:0; position: absolute; left:35%; top:35%; width:30%; z-index:-1; opacity:0.2;"/>
                <div style="font-size:10px; width:100%; margin:0; position: absolute; text-align:center; bottom:5.5%; z-index:-1; font-family:'NanumSquareRoundOTFL';">
                    모두의러닝은 주식회사 모두의교육그룹의 교육기관 브랜드입니다.
                </div>
            <?php } ?>

        </div>
        <script>
            resizeChapterName(<?=$num?>);
        </script>
        <?php
        $num++;
    }
    ?>
    <div id="printBtnArea">
        <button type="button" onclick="printCertificate()">출력하기</button>
    </div>
    </body>
    </html>

<?php
function changeSiteName($companyName)
{
    global $_siteName;
    switch ($companyName) {
        case '주식회사 순환':
            $_siteName = '(주)모두의교육그룹';
            break;
    }
    return $_siteName;
}

?>
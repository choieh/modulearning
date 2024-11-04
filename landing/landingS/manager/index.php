<?php 
include $_SERVER['DOCUMENT_ROOT'].'../..//include/header.html';
include '../../lib/global.php';
include '../../lib/dbConnect.php';
include '../../lib/function.php';
include '../../lib/passwordHash.php';

session_set_cookie_params(0, "/", "." . $_siteURL);
ini_set('session.gc_maxlifetime', 28800);
ini_set('session.cache_limiter', 'nocache, must-revalidate-revalidate');
session_start();

if (!$_SESSION['loginUserID']) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>모두의러닝 문의</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
		<script src="../js/jquery-3.7.1.min.js"></script>
		<script src="../../frontScript/loginManager.js"></script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                    <div class="card px-0 pt-4 pb-0 mt-3 mb-3">
                        <h1>로그인</h1>
                        <form name="login" id="login" method="post" target="sysfrm">
                            <input type="hidden" name="returl" value="/landingS/manager">
                            <input type="hidden" name="pageMode" value="landingManager">
                            <input type="text" name="userID" id="id" placeholder="아이디" hname="아이디" required="Y" value=""><br/><br/>
                            <input type="password" name="pwd" id="passwd" placeholder="비밀번호" hname="비밀번호" required="Y"><br/>
                            <button type="submit" onclick="actLogin()" class="btn btn-primary mt-2">로그인</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// 로그인 상태일 경우 데이터 로드
if (isset($_POST['ajax']) && $_POST['ajax'] == 'true') {
    $limit = 20;
    $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;

    $sql = "SELECT * FROM nynConsultLandingS WHERE marketerID = '".$_SESSION['loginUserID']."' ORDER BY seq DESC LIMIT $offset, $limit";
    $result = mysql_query($sql);

    $data = [];
    while ($row = mysql_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모두의러닝 문의</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f7f7f7;
        }
        h2 {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .table-wrapper {
            margin: 20px auto;
            width: 90%;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
        }
        .fl-table {
            width: 100%;
            border-collapse: collapse;
        }
        .fl-table th, .fl-table td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: left;
            font-size: 14px;
            color: #333;
        }
        .fl-table th {
            background-color: #4FC3A1;
            color: white;
        }
        .fl-table tr:hover {
            background-color: #f1f1f1;
        }
        #load-more {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4FC3A1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #load-more:hover {
            background-color: #45b097;
        }
    </style>
</head>
<body>
    <h2>문의 목록</h2>
    
    <div class="table-wrapper">
        <table class="fl-table">
            <thead>
                <tr><th>번호</th><th>기업명</th><th>담당자</th><th>연락처</th><th>등록일</th></tr>
            </thead>
            <tbody id="consultation-list">
                <!-- 데이터가 여기에 추가됩니다. -->
            </tbody>
        </table>
    </div>
    
    <button id="load-more">더보기</button>

    <script src="../js/jquery-3.7.1.min.js"></script>
    <script>
		let offset = 0;
		const limit = 20;

		function loadConsultations() {
			$.ajax({
				url: '',
				type: 'POST',
				data: {
					ajax: 'true',
					offset: offset
				},
				success: function (response) {
					const data = JSON.parse(response);
					if (data.length > 0) {
						data.forEach(item => {
							$('#consultation-list').append(`
								<tr>
									<td>${item.seq}</td>
									<td>${item.company}</td>
									<td>${item.userName}</td>
									<td>${item.tel}</td>
									<td>${item.inputDate}</td>
								</tr>
							`);
						});
						offset += limit;

						// 데이터가 limit보다 적으면 더보기 버튼 숨기기
						if (data.length < limit) {
							$('#load-more').hide();
						} else {
							$('#load-more').show(); // 데이터가 더 있으면 버튼 표시
						}
					} else {
						$('#load-more').hide(); // 데이터가 없을 경우 버튼 숨기기
					}
				}
			});
		}

		$(document).ready(function () {
			loadConsultations(); // 초기 데이터 로드

			$('#load-more').on('click', function () {
				loadConsultations(); // 더보기 버튼 클릭 시 추가 데이터 로드
			});
		});
	</script>

</body>
</html>

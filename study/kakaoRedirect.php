<?php include '../lib/global.php'; ?>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>모두의러닝 (moduLEARNING)</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />
<script>
	const siteURL = "<?= $_siteURL ?>";

	function copyLink(){
		let address = "";
		let link = window.location.href;
		link = link.replace("https://", "");
		if(link.split('.')[0] === "m"){
			address = "https://m."+siteURL;
		} else {
			address = "https://"+link.split('/')[0];
		}

		const input = document.createElement('input');
		input.value = address;
		input.style.position = 'absolute';
		input.style.left = '-999px';
		document.body.appendChild(input);
		input.select();

		document.execCommand('copy');
		document.body.removeChild(input);
		alert("복사됐습니다.\n"+address);

	}
</script>
</head>
<body style="height:100vh; background:#4d4d4f; color:white">
	<div style="display:flex; width:100%; height:80%; margin:auto; align-items:center;">
		<div style="line-height:170%; padding:0px 30px; font-weight:500;">
			<h1 style="font-size:20px; margin-bottom:10px;">이용안내</h1>
			카카오톡에서는 수강에 어려움이 있습니다.<br>
			아래 버튼을 클릭해 주소 복사 후, <br>
			다른 인터넷 브라우저를 사용해주시기 바랍니다.<br>
			<div style="margin-top:30px;">
				<button style="width:100%; background:#ffd457; border:1px solid #ffd457; border-radius:5px; color:#4d4d4f; font-weight:700; padding:14px 0px; font-size:16px;" onClick="copyLink()">
					주소 복사
				</button>
			</div>
		</div>
	</div>
</body>
</html>
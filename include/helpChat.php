

<?
header('Location: /main/');
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
<title>실시간 채팅 상담 - 키라에듀</title>

<script src='/js/jquery-1.11.2.min.js' charset='utf-8'></script>
</head>
<body>
	<div id='ezHelpChatdiv'></div>
	<script src='https://hiserver.co.kr/runezchat.js' charset='utf-8'></script>
	<script>
			runezHelpChat({
					 divid:'ezHelpChatdiv', //설치될 div id
					 userid:'kiraedu' //유저id
			});


			// 2017-10-10 채팅창 확대 처리  - kes
			$(window).load(function() {
				 ezchatsize('z');
			});
			
	</script>
</body>
</html>
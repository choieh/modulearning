<? include '../lib/header.php'; ?>
<!DOCTYPE html>
<html>
	<meta charset="utf-8">
	<head>
	<?
		$seq = $_GET['seq'];
	?>
	<script language='javascript'>
		function setCookie(name, value, expiredays){
			var todayDate = new Date();
				todayDate.setDate (todayDate.getDate() + expiredays);
				document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
			}
	 
			function closePop(){
				setCookie("popname<?=$seq;?>", "done", 7);
				self.close();
		}
	</script>
  <style type="text/css">
    @import url(//cdn.jsdelivr.net/font-nanum/1.0/nanumgothic/nanumgothic.css);
	  body, div { margin:0; padding:0; zoom:1; font-family:'Nanum Gothic', sans-serif; }
	  a, a img { margin:0; padding:0; border:none; outline:none; }
    .culture { overflow:hidden; width:400px; height:500px; margin:0 auto; text-align:center; background:url(../images/main/bg_culture.png) 0 0 no-repeat; }
    .culture p { margin:172px 0 0; font-size:16px; line-height:22px; color:#375593; letter-spacing:-0.5px; }
    .culture p strong { display:inline-block; margin-bottom:8px; font-size:23px; color:#17336a;  }
    .culture h1 { margin:65px 0 0; font-size:16px; line-height:25px; color:#fff; letter-spacing:-0.5px; }
    .culture h1 strong { font-size:18px; color:#fff; }
    .culture h2 { margin:8px 0 0; font-size:19px; color:#fff;  }
	</style>
<?
	$today = substr($inputDate,0,10);
	$query = "SELECT * FROM nynPopup WHERE enabled='Y' AND (startDate <= '".$today."' AND endDate >= '".$today."') AND seq='".$seq."'";
	$result = mysql_query($query);
	$rs = mysql_fetch_array($result);
	$popupURL = $rs['popupURL'];
?>

	</head>
	<body>
		<form name="frm">
			<div class="PopupWindow">
				<div class="culture">
				  <p>
            <strong>매월 마지막 수요일은</strong><br/>
            문화가 있는 날 행사로 인하여<br/>
            이상에듀의 업무시간이 단축되며,<br/>
            아래의 업무시간 외에는 통화가 되지 않습니다.<br/>
            많은 양해 부탁드립니다.
          </p>
          <h1><strong>2018년 6월 27일 수요일</strong><br/>(문화가 있는 날)</h1>
          <h2>업무시간 : 오전 9시 ~ 오후 3시</h2>
				</div>
				<div class="PopupBottom"> 
					<button type="button" onClick="closePop();" style="width:100%; height:40px; border:none; background:#565656; color:#efefef; cursor:pointer;">일주일간 이창을 열지 않음</button>
				</div>
			</div>
		</form>
	</body>
</html>
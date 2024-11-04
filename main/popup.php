<? include '../lib/header.php'; ?>
<!DOCTYPE html>
<html>
	<meta charset="utf-8">
	<head>
	<?
		$seq = $_GET['seq'];

        if (!is_numeric($seq)) {
            exit;
        }

        if ($seq < 0) {
            exit;
        }
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
	  body, div { margin:0; padding:0; zoom:1; }
	  a, a img { margin:0; padding:0; border:none; outline:none; }
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
				<div>
				<? if($popupURL) { ?>
					<a href="<?=$popupURL;?>" target="<?=$rs['popupTarget'];?>"><img src="../attach/popup/<?=$rs['attachFile'];?>"></a>
				<? } else {?>
					<img src="../attach/popup/<?=$rs['attachFile'];?>">
				<? } ?>
				</div>
				<div class="PopupBottom"> 
					<button type="button" onClick="closePop();" style="width:100%; height:40px; border:none; background:#565656; color:#efefef; cursor:pointer;">일주일간 이창을 열지 않음</button>
				</div>
			</div>
		</form>
	</body>
</html>
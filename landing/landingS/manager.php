<?
include '/lib/header.php';
$sql = "select userName from nynMember where userID = 'eungmin2'";
$res = mysql_query($sql);
echo mysql_result($res,0,"userName");
?>
<?
// nynSession Delete 실행 페이지
// 서버에서 cron으로 실행 2017-12-14 진영하

	include 'dbConnect.php'; 

	$query = "DELETE FROM nynSession WHERE inputDate < date_add(now(), interval -9 hour)";
	mysql_query($query);
	@mysql_close();
?>
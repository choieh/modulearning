<? include '../lib/header.php'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>이상에듀</title>
<link rel="stylesheet" href="../css/userStyle.css" />
<script type="text/javascript" src="../js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../js/userUI.js"></script>
<script type="text/javascript">
  var loginUserID = "<?=$_SESSION['loginUserID'] ?>";     	//로그인 유저 아이디
  var loginUserName = "<?=$_SESSION['loginUserName'] ?>"; 	//로그인 유저 이름
  var loginUserLevel = "<?=$_SESSION['loginUserLevel'] ?>";  //로그인 유저 아이디
  var pageMode = 'userPage';
  var subDomain = '<?=$_SERVER["HTTP_HOST"] ?>';
  var seq = '<?=$_GET[seq]; ?>'; 
  var addItem01 = '<?=$_GET[addItem01]; ?>'; 
</script>
<? $fileName = explode("/",$_SERVER['PHP_SELF']); ?>
<script type="text/javascript">
$(document).ready(function(){
  noticePopup();
})

function noticePopup(){
  $.get('../api/apiBoard.php',{'boardCode':'20','addItem01':addItem01,'seq':seq},function(data){
      var view = '';
      $.each(data.board,function(){
          view += '<div class="titleArea">';
          view += '<h1>'+this.subject+'</h1>';
          view += '<h2><strong class="date">'+this.inputDate.substr(0,10)+'</strong><strong class="hit">'+this.hits+'</strong></h2>';
          view += '</div>';
          //첨부파일 소팅
          if(this.attachFile01Name != null){
            view += '<div class="fileArea">';
            view += '<a href="../lib/fileDownLoad.php?fileName='+eval('this.attachFile01Name')+'&link='+data.attachURL+eval('this.attachFile0i')+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('this.attachFile01Name')+'</a>';
            view += '</div>'
          }
          view += '<div class="BBSContents">'+this.content+'</div>';
      })
      $('.BBSView').html(view);
  })
}
</script>
</head>
<body>
<div class="BBSView">
</div>
</body>
</html>
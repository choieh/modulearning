<? include '../include/header.php' ?>
<script type="text/javascript" src="../frontScript/_pager.js"></script>
<script type="text/javascript">
  var types = '<?=$_GET["type"] ?>';
  var contentsCode = '<?=$_GET["contentsCode"] ?>';
  var page = 1;
  var listCount = 10;
  var totalCount = 0;
  var pagerCount = 10;
  
  var typeTitle = '스크랩'
  if(types == 'linkMent'){
	  typeTitle = '의견공유'
  }
  window.resizeTo(640,640)
  $(document).ready(function(){
	  $('body > h1').html(typeTitle);
	  ajaxAct(contentsCode);

  });
  
  //스크랩관련
  function ajaxAct(){
	  var useApi = '../api/bookMtxt.php';
	  if(types == 'linkMent'){
		  useApi = '../api/bookShare.php';
	  }
	  var ajaxRun = $.get(useApi,{'Code':contentsCode,'page':page,'list':listCount},function(data){
		  totalCount = data.totalCount;
		  var lists = '';
		  if(totalCount != 0){
			  $.each(data.board,function(){
				  if(types == 'scrab'){
					  lists += '<li>';
					  lists += '<ul>';
					  lists += '<li><h1>'+this.Chasi+'</h1>차시 / <h1>'+this.Page+'</h1>페이지</li>';
					  lists += '<li>'+this.wdate.substr(0,10)+'</li>';
					  lists += '<li><h2>'+this.userName+'</h2></li>';
					  lists += '<li><h3>'+this.userID+'</h3></li>';
					  lists += '</ul>';
					  lists += '<div>';
					  if(this.viewer_code=='scrap') { //사용자의 드래그 스크랩인 경우
						  lists += '<b>'+this.etc1+'</b><br /><br />'; //제목 출력
					  }
					  lists += this.val+'</div>';
					  if(eval(2) >= eval(loginUserLevel) || this.userID == loginUserID){
						  lists += '<div class="btnArea">';
						  lists += '<button type="button" onClick="deleteData(\'../api/bookMtxt.php\','+this.seq+')">삭제</button>';	
						  lists += '</div>'
					  }
					  lists += '</li>';
				  }else{
					  //lists += '<li onClick="shareAct(\''+this.imageURL+'\')">';
            lists += '<li>';
					  lists += '<div style="cursor:pointer; background-image:url('+this.thumbnail+')" onclick="imgView(\''+this.imageURL+'\')"></div>';
					  lists += '<ul>';
					  lists += '<li><h1>'+this.Chasi+'</h1>차시 / <h1>'+this.Page+'</h1>페이지</li>';
					  lists += '<li><h2>'+this.Title+'</h2></li>';
					  lists += '<li><h3><strong>'+this.userName+'</strong> / '+this.userID+'</h3></li>';
					  lists += '<li>'+this.wdate.substr(0,10)+'</li>';
					  lists += '</ul>';
					  lists += '</li>';
				  }
			  })
		  }else{
			  lists += '<li class="noList">아직 등록된 내용이 없습니다.</li>';
		  }
		  $('#contentsArea ul').html(lists);
		  $('#contentsArea ul').addClass(types);
		  pagerAct();
	  })	  
  }
  
function imgView(imageURL){
  var openAddress = 'book_img.php?imageURL='+imageURL;
  var imgView = window.open(openAddress,"imgView","top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizable=yes","study");
  imgView.focus();
}
</script>
</head>

<body id="bookPop">
  <h1></h1>
  <div id="contentsArea">
    <ul></ul>
  </div>
</body>
</html>
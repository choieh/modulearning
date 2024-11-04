<? include '../include/header.php' ?>
<script type="text/javascript">
  var imageURL = '<?=$_GET["imageURL"] ?>';
  $(document).ready(function(){
    window.resizeTo(850,screen.width)
    $('body').html('<img src="'+imageURL+'" alt="의견 이미지">')
  })
</script>
</head>

<body style="text-align:center;">

</body>
</html>
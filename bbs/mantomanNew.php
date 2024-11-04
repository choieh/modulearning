<? include '../include/header.php' ?>
<script type="text/javascript">
var boardType = 'site';
var modes = 'writeMode';
var page = '<?=$_GET[page]; ?>'; //검색 페이지
var seq = '<?=$_GET[seq]; ?>'; //검색 페이지
$(document).ready(function(){
	GNBAct('userGNB');
});
</script>
<script type="text/javascript" src="../frontScript/GNB.js"></script>
<script type="text/javascript" src="../lib/SmartEditor/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="../frontScript/_global.js"></script>
<script type="text/javascript" src="../frontScript/_category.js"></script>
<script type="text/javascript" src="../frontScript/_sendData.js"></script>
<script type="text/javascript" src="../frontScript/_pager.js"></script>
<!-- <script type="text/javascript" src="../frontScript/mantoman.js"></script>
<script type="text/javascript" src="../frontScript/mantomanList.js"></script>
<script type="text/javascript" src="../frontScript/mantomanWrite.js"></script>
<script type="text/javascript" src="../frontScript/mantomanView.js"></script> -->
</head>

<body>

<div class="skip_nav">
	<a href="#gnb">메인메뉴로 이동</a>
	<a href="#container">본문으로 이동</a>
</div>

<div id="wrap" class="study">
<? include '../include/gnb.php' ?>
  <? include '../include/lnb_bbs.php' ?>  
  <div id="contents">
    <div id="titleArea" style="height:300px;padding:0;">
	  <img src="../images/about/consultNewBanner2.jpg" style="width:973px;height:300px" />
      <!-- 페이지 네비게이션 h2, 페이지 타이틀 h1, 일반 내용출력 h3 -->
      <!-- <h2><?=$siteName?><img src="../images/global/icon_triangle.png" alt="▶" />교육원소개<img src="../images/global/icon_triangle.png" alt="▶" /><strong>교육상담 및 문의</strong></h2>	  
      <h1>교육상담 및 문의</h1> -->
    </div>
    <!-- 동작호출부 -->
    <div id="contentsArea" class="BBSWrite">
		<form class="writeForm" action="javascript:checkData('writeForm')">			
			<ul>
				<li>
					<h1>기업명</h1>
					<input type="text" name="company" id="company" />
				</li>	
				<li>
					<h1>담당자명</h1>
					<input type="text" name="userName" id="userName" />
				</li>
				<li>
					<h1>연락처</h1>
					<select name="phone01" class="year">
						<option value="010">010</option>
						<option value="02">02</option>
						<option value="031">031</option>
						<option value="032">032</option>
						<option value="033">033</option>
						<option value="041">041</option>
						<option value="042">042</option>
						<option value="043">043</option>
						<option value="044">044</option>
						<option value="051">051</option>
						<option value="052">052</option>
						<option value="053">053</option>
						<option value="054">054</option>
						<option value="055">055</option>
						<option value="061">061</option>
						<option value="062">062</option>
						<option value="063">063</option>
						<option value="064">064</option>
					</select>&nbsp;-&nbsp;
					<input type="tel" name="phone02" id="phone02" pattern="[0-9]+" class="year" maxlength="4" />&nbsp;-&nbsp;
					<input type="tel" name="phone03" id="phone03" pattern="[0-9]+" class="year" maxlength="4" />
				</li>
				<li>
					<h1>문의 내용</h1>
					<textarea name="content" id="content" placeholder="ex) 10명 인원 법정의무교육/직무교육 상담 요청"></textarea>
				</li>		
			</ul>
			<div class="btnArea">
				<button type="submit" style="background-color:navy">문의하기</button>		
			</div>
		</form>

    </div>
    <!-- //동작호출부 -->
  </div>
</div>

	<!-- Enliple Tracker Start
	<script type="text/javascript">
	(function(a,g,e,n,t){a.enp=a.enp||function(){(a.enp.q=a.enp.q||[]).push(arguments)};n=g.createElement(e);n.defer=!0;n.src="https://cdn.megadata.co.kr/dist/prod/enp_tracker_self_hosted.min.js";t=g.getElementsByTagName(e)[0];t.parentNode.insertBefore(n,t)})(window,document,"script");
	//enp('create', 'conversion', 'KIRAHRD20', { device: '디바이스 타입', convType: '전환유형', productName: '광고주에서 커스텀 할 상품명'}); // 디바이스 타입  W:웹, M: 모바일, B: 반응형
	//enp('send', 'conversion', 'KIRAHRD20', { device: '디바이스 타입', convType: '전환유형', productName: '광고주에서 커스텀 할 상품명'});
	</script>
	Enliple Tracker End -->

<script>
	function checkData(writeclass){
		var company = $('#company').val();
		var userName = $('#userName').val();
		var phone02 = $('#phone02').val();
		var phone03 = $('#phone03').val();
		var content = $('#content').val();

		if (company == '') {
			alert('기업명을 입력해 주세요');
			return;
		}
		if (userName == '') {
			alert('담당자명을 입력해 주세요');
			return;
		}
		if (phone02 == '' || phone03 == '') {
			alert('전화번호를 입력해 주세요');
			return;
		}				
		if (content == '') {
			alert('문의내용을 입력해 주세요');
			return;
		}
					
		var sendSerial = $('form.'+writeclass).serialize();
		if(confirm('등록하시겠습니까?')){
			$.ajax({
				url: '/api/apiConsultNew.php',
				type:'POST',
				data:sendSerial,
				dataType:'text',
				success:function(data){	
					if (data == 'success') {
						alert('상담 문의가 등록되었습니다. 담당자 확인 후 연락 드리겠습니다.');		
						enp('create', 'conversion', 'KIRAHRD20', { device: 'W', convType: 'etc', productName: 'join'}); // 디바이스 타입  W:웹, M: 모바일, B: 반응형
						enp('send', 'conversion', 'KIRAHRD20', { device: 'W', convType: 'etc', productName: 'join'});
						top.location.reload();
					} else {
						alert('등록에 실패하였습니다.')
					}
				},
				fail:function(){
					alert('등록에 실패하였습니다.')
				}
			})
		}
		
	}
</script>

<? include '../include/footer.php' ?>
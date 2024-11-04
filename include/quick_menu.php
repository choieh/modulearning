<div class="quickmenu">
	<script>
	$(function(){
		// 플로팅 가입배너
		var $float_banner = $('#float_banner');
		var float_banner_top = $float_banner.offset().top;
		$(window).scroll(function() {
			if (float_banner_top < $(document).scrollTop() + 50) {
				$float_banner.addClass('fixed');
			} else {
				$float_banner.removeClass('fixed');
			}
		});
	});
	</script>

	<div class="float-banner">
		<div class="fb_inner">
			<ul class="banner" id="float_banner">
				<!-- <li class="qm_01"><a href="/study/">수강현황</a></li> -->
				<li class="qm_02"><a href="/bbs/?boardCode=12">학습장애해결</a></li>
				<li class="qm_03"><a href="/bbs/mantoman.php">1:1학습상담</a></li>
				<li class="qm_04"><a href="https://939.co.kr/kiraedu/">원격지원</a></li>				
				<li class="qm_05"><a href="/bbs/?boardCode=17">자료실</a></li>
				<li class="qm_06"><a href="/attach/docs/company_edu.zip" style="padding:43px 0px 10px 0px;">기업교육<br/>신청양식</a></li>
				<li class="qm_07" style="background-color:white"><div id="chat-channel-button"></div></li>
			</ul>
		</div>
	</div>
</div>


<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
  integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh" crossorigin="anonymous"></script>
<script>
  Kakao.init('0f564446261bb62d440ca1bdb4c7ae97'); // 사용하려는 앱의 JavaScript 키 입력
</script>

<script>
  Kakao.Channel.createChatButton({
    container: '#chat-channel-button',
    channelPublicId: '_rssxdj',
		supportMultipleDensities: false
  });
$('#chat-channel-button img').css('width','77px');
$('#chat-channel-button img').css('margin','-20px 5px');
</script>
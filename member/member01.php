
<h3 class="hide">컨텐츠 내용</h3>
<div class="path">
	<ol class="path_list">
		<li>회원서비스</li>
		<li class="last">로그인</li>
	</ol>
</div>
<h4 class="content_title">로그인</h4>
<div class="content_body">
	<div class="tb_top">
	</div>
	<div class="login_box">
		<div class="log_form">
			<h5 class="log_tt"><img src="/html/images/common/login_tt.png" alt="아이디와 비밀번호를 입력해주세요">&nbsp;&nbsp; 아이디와 비밀번호를 입력해주세요</h5>
			
			<div class="log_area">
				<form name="login" id="login" method="post" target="sysfrm">
				<input type="hidden" name="returl" value="">
				<div class="log_in">
					<div class="iparea ip_id"><input type="text" name="userID" id="id" placeholder="아이디" hname="아이디" required="Y"></div>
					<div class="iparea ip_pass"><input type="password" name="pwd" id="passwd" placeholder="비밀번호" hname="비밀번호" required="Y"></div>
				</div>
				<div class="ip_submit"><input type="submit" onclick="actLogin()" class="button btn_login" value="로그인"></div>
				</form>

			</div>
			
			
		</div>
		<div class="log_find">
			<dl>
				<dt>로그인 정보를 잊으셨나요?</dt>
				<dd><input type="button" class="button gray medium" onclick="location.href='index.php?pid=3'" value="아이디/비밀번호 찾기"></dd>
			</dl>
			<dl>
				<dt>처음 방문이신가요?</dt>
				<dd><input type="button" class="button gray medium" onclick="alert('회원가입은 전화로 문의 바랍니다.')" value="회원 가입하기"></dd>
			</dl>
		</div>
	</div>
</div>
				
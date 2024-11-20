
	<h3 class="hide">컨텐츠 내용</h3>
	<div class="path">
		<ol class="path_list">
			<li>회원서비스</li>
			<li class="last">아이디/비밀번호 찾기</li>
		</ol>
	</div>
	<h4 class="content_title">아이디/비밀번호 찾기</h4>
	<div class="content_body">
		
		<div class="tab_wrap">
			<ul class="tab_tt">								
				<li class="tab_title on"><a href="#self">아이디 찾기</a></li>
				<li class="tab_title"><a href="#self">비밀번호 찾기</a></li>
			</ul>

			<div class="tab_con_wrap">
				<div class="tab_con" style="display: block;">
					<form name="login" id="login" method="POST" target="sysfrm">

					<h4 class="find_subtitle">아이디 찾기</h4>
					<div class="find_box" style="display:flex; flex-direction: column; font-size:18px;">	
						<div style="display:flex; flex-direction:row; width:500px; margin:auto; align-items: center;">
							<div style="width:100px;">성명</div>
							<div><input type="text" name="userName" style="border-radius:3px; padding:15px 2px;"
                                        maxlength="30" required></div>
						</div>
						<div style="display:flex; flex-direction:row; width:500px; margin:15px auto; align-items:center;">
							<div style="width:100px;">생년월일</div>
							<div><input type="text" name="birth01" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="90" maxlength="2" required></div>년&nbsp;
							<div><input type="text" name="birth02" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="08" maxlength="2" required></div>월&nbsp;
							<div><input type="text" name="birth03" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="20" maxlength="2" required></div>일
						</div>
						<div style="display:flex; flex-direction:row; width:500px; margin:auto; align-items:center;">
							<div style="width:100px;">휴대폰</div>
							<div><input type="text" name="mobile01" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="4" required></div>&nbsp;-&nbsp;
							<div><input type="text" name="mobile02" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="5" required></div>&nbsp;-&nbsp;
							<div><input type="text" name="mobile03" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="5" required></div>
						</div>
						<div style="padding-top:20px;">
							<input type="button" class="button gray" style="padding:10px 50px; font-size:14px;" onclick="findMember('ID')" value="찾기">
						</div>
						<div style="padding-top:20px;">* 회원가입시 작성하였던 정보와 일치해야 아이디를 찾을 수 있습니다.</div>
					</div>
					</form>


					
				</div>

				<script>
				function goFindId() {
					var f = document.forms['form1'];
					if(!validate(f)) return;
					f.submit();
					return;
				}
				function sendIdSmsAuthNo() {
					var f = document.forms['form2'];
					f['mode'].value = "sms_authno";
					f['auth_no'].removeAttribute("REQUIRED");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				function sendIdSmsNewPasswd() {
					var f = document.forms['form2'];
					f['mode'].value = "sms_passwd";
					f['auth_no'].setAttribute("REQUIRED", "Y");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				
				</script>
				
				<div class="tab_con" style="display: none;">
					<form id="loginpw" name="loginpw" method="POST" target="sysfrm">

					<h4 class="find_subtitle">비밀번호 찾기</h4>
					<div class="find_box" style="display:flex; flex-direction: column; font-size:18px;">
					<div style="display:flex; flex-direction:row; width:500px; margin:auto; align-items: center;">
						<div style="width:100px;">아이디</div>
							<div><input type="text" name="userID" style="border-radius:3px; padding:15px 2px;" maxlength="30" required></div>
						</div>
						<div style="display:flex; flex-direction:row; width:500px; margin:0px auto; margin-top:15px; align-items: center;">
							<div style="width:100px;">성명</div>
							<div><input type="text" name="userName" style="border-radius:3px; padding:15px 2px;"
                                        maxlength="30" required></div>
						</div>
						<div style="display:flex; flex-direction:row; width:500px; margin:15px auto; align-items:center;">
							<div style="width:100px;">생년월일</div>
							<div><input type="text" name="birth01" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="90" maxlength="2" required></div>년&nbsp;
							<div><input type="text" name="birth02" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="08" maxlength="2" required></div>월&nbsp;
							<div><input type="text" name="birth03" style="border-radius:3px; padding:15px 2px; width:50px;" placeholder="20" maxlength="2" required></div>일
						</div>
						<div style="display:flex; flex-direction:row; width:500px; margin:auto; align-items:center;">
							<div style="width:100px;">휴대폰</div>
							<div><input type="text" name="mobile01" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="4" required></div>&nbsp;-&nbsp;
							<div><input type="text" name="mobile02" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="5" required></div>&nbsp;-&nbsp;
							<div><input type="text" name="mobile03" style="border-radius:3px; width:80px; padding:15px 2px;" maxlength="5" required></div>
						</div>
						<div style="padding-top:20px;">
							<input type="button" class="button gray" style="padding:10px 50px; font-size:14px;" onclick="findMember('PW')" value="찾기">
						</div>
						<div style="padding-top:20px;">* 비밀번호는 회원가입시 입력하신 휴대폰으로 초기화되어 전송됩니다.</div>
					</div>
					</form>
					
					
				</div>

				<script>
				function sendEmailAuthNo() {
					var f = document.forms['form4'];
					f['mode'].value = "email_authno";
					f['auth_no'].removeAttribute("REQUIRED");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				function sendEmailNewPasswd() {
					var f = document.forms['form4'];
					f['mode'].value = "email_passwd";
					f['auth_no'].setAttribute("REQUIRED", "Y");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				function sendSmsAuthNo() {
					var f = document.forms['form5'];
					f['mode'].value = "sms_authno";
					f['auth_no'].removeAttribute("REQUIRED");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				function sendSmsNewPasswd() {
					var f = document.forms['form5'];
					f['mode'].value = "sms_passwd";
					f['auth_no'].setAttribute("REQUIRED", "Y");
					if(!validate(f)) return;
					f.submit();
					f['mode'].value = "";
				}
				function setMtype(v) {
					document.forms['form3']['mtype'].value = v;
				}
				</script>

			</div>
		</div>
	</div>

function actLogin(nextPage){
	nextPage = nextPage ? nextPage : '';
	var loginData = $('#login').serialize();
	//alert(loginData)
	var actLogins = $.ajax({
		method:'POST',
		url:'../api/apiLogin.php',
		data:loginData,
		dataType:'text',
		success:function(data){
			//alert(data)
			if (data == 'error'){
				//alert('로그인에 실패하였습니다.\n\n 아이디 또는 비밀번호를 확인 바랍니다.');
				//if(confirm('로그인에 실패하였습니다.\n\n아이디 또는 비밀번호를 확인 바랍니다.\n\n비밀번호 찾기로 이동하시겠습니까?')){
				//	loginPage('findID', '');
					
				//}
				alert('로그인에 실패하였습니다.\n\n 아이디 또는 비밀번호를 확인 바랍니다.');
			}else if(data == 'agreement'){
				top.location.href='../member/agreementCheck.php'
			}else if(data == 'agreement2'){
				//alert('다른 기기에서 로그인 중이거나 기록이 남아있어\n다른 기기 사용자를 로그아웃하였습니다.')
				top.location.href='../member/agreementCheck.php'
			}else{
			 //alert(pageMode);
				if(pageMode=='userPage' || pageMode=='studyCenterPage' || pageMode=='securityPage'){
					if (data == 'duplication'){
						//alert('다른 기기에서 로그인 중이거나 기록이 남아있어\n다른 기기 사용자를 로그아웃하였습니다.')
						window.location.reload();
					}else{
						if(pageMode=='userPage'){
							if(nextPage != ''){
								nextPage = '/'+nextPage
								//alert(nextPage)
								top.location.href= nextPage
							}else{
								top.location.href= '/main/';
							}
						}else{
							if(nextPage != ''){
								top.location.href= nextPage;
							}else{
								top.location.href= 'index.php';
							}
						}
					}
				}else if(pageMode=='mobilePage'){
					top.location.href='../m/study.html';
				}else if(pageMode=='appPage'){
					top.location.href='../app/study.html';
				}else if(pageMode=='mobileSecurity'){
					top.location.href='m_study.php';
				}else{
					top.location.href='../admin/00_index.php';
				}
			}
		},
		error:function(request,status,error){
			alert('시스템 에러 관리자에게 문의하세요.')
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	})
}

//아이디 비번찾기
function findMember(findObj){
	$('input[type="text"]').each(function(){
        if($(this).val().length == 1){
			nuNumber = '0'+$(this).val();
			$(this).val(nuNumber)
		}
    });
	sendData = $('#login').serialize();
	var findMembers = $.ajax({
		method:'PUT',
		url:'../api/apiLogin.php',
		data:sendData,
		dataType:'text',
		success:function(data){
			if(findObj == 'ID'){
				if(data != 'error'){
					alert('찾으시는 아이디는 '+data+' 입니다.')
				}else{
					alert('찾으시는 아이디가 없습니다.')
				}
			}else{
				if(data != 'error'){
					alert('입력하신 휴대폰으로\n임시 비밀번호(생일 4자리)가 발송되었습니다.');
					top.location.href='/app/login.html'
				}else{
					alert('일치하는 정보가 없습니다.')
				}
			}
		},
		error:function(request,status,error){
			alert('시스템 에러 관리자에게 문의하세요.')
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	})
}

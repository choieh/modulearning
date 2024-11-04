//	관리자 UI 퍼포먼스, 레이아웃 스크립트
//	작성자 : 서영기
//

function loginScript(){
  $('input[name="userID"]').bind({
	  focus:function(){
		  if($(this).val()=='아이디'){
			  $(this).val('')
		  }
	  },
	  blur:function(){
		  if($(this).val()=='' || $(this).val()=='아이디'){
			  $(this).val('아이디')
		  }
	  }
  })
  $('input[name="pwd"]').bind({
	  focus:function(){
		  if($(this).attr('type')=='text'|| $(this).val()=='비밀번호'){
			  $(this).val('');
			  $(this).attr('type','password')
		  }
	  },
	  blur:function(){
		  if($(this).val()=='비밀번호' || $(this).val()==''){
			  $(this).attr('type','text')
			  $(this).val('비밀번호');
		  }
	  }
  })
}

function logOut(){
	$.ajax({
		url:'../api/apiLogin.php',
		type:'DELETE',
		dataType:'text',
		success: function(data){
			//alert('로그아웃되었습니다.');
			//window.location.reload();
			window.location.href = '../main/index.php';
		},
		error:function(){
			alert('로그아웃이 실패하였습니다.');
		}
	})
}

function joinLogOut(){
	$.ajax({
		url:'../api/apiLogin.php',
		type:'DELETE',
		dataType:'text',
		success: function(data){
			window.close();
		},
		error:function(){
		}
	})
}

function helpDesk(targetSite){
	targetSite =  targetSite ? targetSite : '';//사이트 체크를 통한 해당 안내 상황 호출
	if(targetSite != ''){
		targetSite = 'http://'+targetSite+'/';
	}else{
		targetSite = '../'
	}
	//window.open(targetSite+"study/helpdesk.php","모두의러닝안내","top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no","esangStudy")
}
function remoteHelp(){
	//window.open("http://939.co.kr/nayanet","이상에듀원격지원센터","top=0,left=0,width=1080,height=700,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no","esangStudy")
}

function mainModal(){
    $('.mainModal').remove();
}

function gnbAct(type){
    if(type == 'open'){
      $('.GNBBg').fadeIn(150,function(){
        $('nav').animate({"left":"0"},200)
      })
    }else{
      $('nav').animate({"left":"-264px"},200,function(){
        $('.GNBBg').fadeOut(200)
      })
    }
}
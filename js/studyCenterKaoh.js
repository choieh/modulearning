$(document).ready(function(){
	gnbAct()
})

// var studyCenterApi = $.get('/api/apiStudyCenter02.php',{'companyID':subDomain},function(data){
//     var lecturePlay = '';
// 	var CSWrite = '';


//     lecturePlay += '<div class="lectureTitle"><span><h1 class="titleRedBold">주요 교육과정 </h1><h1> 수강하기</h1></div>';
//     lecturePlay += '<div class="lectureContents" onClick="location.href=\'./login.php\'">';
//         lecturePlay += '<span>충청북도학원연합회</span>';
//         lecturePlay += '<span>법정 의무교육</span>';
//     lecturePlay += '</div>';

// 	CSWrite += '<h1>고객센터</h1><h2>00.0000.0000</h2>';
// 	CSWrite += '<table>';
// 	CSWrite += '<tr><th>팩스</th><td>00.0000.0000</td></tr>';
// 	CSWrite += '<tr><th>운영시간</th><td>평일 09:00 ~ 18:00<br />(점심시간 12:00 ~ 13:00)</td></tr>';
// 	CSWrite += '</table>';

// 	$('#GNB > div > a').html('<img src="/attach/studyCenter/logo_'+subDomain+'.png" alt="logo" />');

// 	if(subDomain != 'hangun') {
// 		$('.contents02 > .ison > h1 img').attr('src','/attach/studyCenter/logo_'+subDomain+'.png');
// 	} else {
// 		$('.contents02 > .ison > h1 img').attr('src','/attach/studyCenter/hangun_logo1.png');
// 	}

// 	$('#main_contents > img').attr('src','/attach/studyCenter/image_'+subDomain+'.jpg');

//     $('#main_contents .lecturePlay').html(lecturePlay);
//     $('#main_contents .CSCenter').html(CSWrite);



// 	//$('head title').html(data.studyCenter[0].companyName+' 사이버교육센터에 오신것을 환영합니다.');
// })
// .done(function(data){
	// contentsMapping = data.studyCenter[0].contentsMapping;
	// $(document).ready(function(){
	// 	var designType = data.studyCenter[0].studyColor;
	// 	if(designType <= 9){
	// 		designType = '0' + designType;
	// 	}
	// 	designType = 'type'+ designType;
	// 	$('body').addClass(designType);
	// 	if (typeof seq != 'undefined' || typeof page != 'undefined' ){
	// 		if(seq == ''){
	// 			listAct();
	// 		}else if(seq != ''){
	// 			viewAct(seq);
	// 		}
	// 	}
	// })
// })
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
			window.location.href = `https://${subDomain}.modulearning.kr/kaoh_main`;
		},
		error:function(){
			alert('로그아웃이 실패하였습니다.');
		}
	})
}

function addFavorite(){
	var bookmarkURL = window.location.href;
	var bookmarkTitle = document.title;
	var triggerDefault = false;

	if (window.sidebar && window.sidebar.addPanel) {
		// Firefox version < 23
		window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
	} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
		// Firefox version >= 23 and Opera Hotlist
		var $this = $(this);
		$this.attr('href', bookmarkURL);
		$this.attr('title', bookmarkTitle);
		$this.attr('rel', 'sidebar');
		$this.off(e);
		triggerDefault = true;
	} else if (window.external && ('AddFavorite' in window.external)) {
		// IE Favorite
		window.external.AddFavorite(bookmarkURL, bookmarkTitle);
	} else {
		// WebKit - Safari/Chrome
		alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
	}

	return triggerDefault;
}

function gnbAct(){
	var divHeight = 81;
	var olHeight = '';
	$("#GNB ul").bind({
		mouseenter:function() {
			$('#GNB ol').each(function(){
				if(olHeight <= $(this).outerHeight()){
					olHeight = $(this).outerHeight();
				}
			})
			$("#GNB div:not(:animated)").animate({'height':divHeight+olHeight+'px'},250);
		},
		mouseleave:function() {
			$("#GNB div").animate({'height':divHeight+'px'},120);
		}
	});
}

function snbSel(selNum){
   	$('#snb li:nth-child('+selNum+')').addClass('select');
}

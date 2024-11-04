$(document).ready(function(){
	gnbAct()
})

var studyCenterApi = $.get('/api/apiStudyCenter.php',{'companyID':subDomain},function(data){
	var footerWrite = '';
	var CSWrite = '';

	if (subDomain == 'lifelong') {
		CSWrite += '<h1>고객센터</h1><h2>1544-9335</h2>';
	} else {
		CSWrite += '<h1>고객센터</h1><h2>'+data.studyCenter[0].phone01+'.'+data.studyCenter[0].phone02+'</h2>';
	}
	CSWrite += '<table>';
	CSWrite += '<tr><th>팩스</th><td>'+data.studyCenter[0].fax01+'.'+data.studyCenter[0].fax02+'.'+data.studyCenter[0].fax03+'</td></tr>';
	CSWrite += '<tr><th>운영시간</th><td>' + data.studyCenter[0].workTime +'<br />';
	// CSWrite += '(점심시간 '+data.studyCenter[0].eatStartTime01+':'+data.studyCenter[0].eatStartTime02+' ~ '+data.studyCenter[0].eatEndTime01+':'+data.studyCenter[0].eatEndTime02+')</td></tr>';
	CSWrite += '</table>';

	if(data.studyCenter[0].footerEnabled == 'Y'){
		//footerWrite += '<img src="../images/global/logo_gnb.png" alt="키라에듀" />';
		footerWrite += '<img src="../images/global/logo_gnbM.jpg" style=" margin-top: -34px;" alt="모두의러닝" />';
		footerWrite += '<ul>';
		footerWrite += '<li onclick="top.location.href=\'about.php\'">회사소개</li>';
		footerWrite += '<li onclick="top.location.href=\'agree.php\'">이용약관</li>';
		footerWrite += '<li onclick="top.location.href=\'private.php\'">개인정보 취급방침</li>';
		if (subDomain != 'lifelong') {
		footerWrite += '<li onclick="top.location.href=\'eduinfo.php\'">환급교육 안내</li>';
		}
		footerWrite += '</ul>';
		footerWrite += '<address><strong>주식회사 모두의교육그룹</strong>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>대표 : 이영신</strong>&nbsp;&nbsp;|&nbsp;&nbsp;주소 : (08056) 서울특별시 금천구 가산디지털1로 75-15, 하우스디와이즈타워 621~625호<br />';
		footerWrite += 'TEL : 1544-9335&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호 : 209-88-01773&nbsp;&nbsp;|&nbsp;&nbsp;통신판매업번호 : 2020-서울금천-2107<br />';
		footerWrite += 'COPYRIGHT 2018 모두의교육그룹(구, 한국안전교육기술원) ALLRIGHT & RESERVED.</address>';

		// CSWrite += '<h1>고객센터</h1><h2>02.6084.2015</h2>';
		// CSWrite += '<table>';
		// CSWrite += '<tr><th>팩스</th><td>02.6280.2015</td></tr>';
		// CSWrite += '<tr><th>운영시간</th><td>평일 09:00 ~ 18:00<br />(점심시간 11:30 ~ 12:30)</td></tr>';
		// CSWrite += '</table>';

		$('#GNB > div > a').html('<img src="/attach/studyCenter/logo_'+subDomain+'.png" style="height:81px;" alt="logo" />');
		$('#main_contents > img').attr('src','/attach/studyCenter/image_'+subDomain+'.jpg');
	}
	$('#footer > div').html(footerWrite)
	//$('#main_contents .CSCenter').html('<img src="/attach/studyCenter/image_3551661553.jpg"');
	$('#main_contents .CSCenter').html(CSWrite);

})
.done(function(data){
	contentsMapping = data.studyCenter[0].contentsMapping;
	$(document).ready(function(){
		var designType = data.studyCenter[0].studyColor;
		if(designType <= 9){
			designType = '0' + designType;
		}
		designType = 'type'+ designType;
		$('body').addClass(designType);
		if (typeof seq != 'undefined' || typeof page != 'undefined' ){
			if(seq == ''){
				listAct();
			}else if(seq != ''){
				viewAct(seq);
			}
		}
	})
})
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
			window.location.reload();
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

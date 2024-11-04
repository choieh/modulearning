//	관리자 UI 퍼포먼스, 레이아웃 스크립트
//	작성자 : 서영기
//

$(document).ready(function(){
	if (loginUserID != 'eungmin22') {
		GNBAct('adminGNB')//관리자:adminGNB, 사용자:userGNB;
	} else {
		if ( page != 'undefined') {
			pageAct()
		} else {
			listAct()
		}
	}
    //pageLayout();
});
/*
$(window).bind('resize', function(){
    window.resizeEvt;
    $(window).resize(function(){
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function(){
			pageLayout()
        }, 250);
    });
});

function pageLayout() {
	var docuHeight = $('body').outerHeight();
	var windowHeight = $(window).height();
	var headerHeight = $('#header').outerHeight();
	var subHeightMin = windowHeight - headerHeight;
	var subHeightMax = docuHeight - headerHeight;
	//alert(docuHeight+'/'+windowHeight)
	if( docuHeight < windowHeight ){
		$('#subMenu').outerHeight(subHeightMin);
	}else{
		$('#subMenu').outerHeight(subHeightMax);
	}
}
*/
function logOutAcademy(){
	$.ajax({
		url:'../api/apiLoginAcademy.php',
		type:'DELETE',
		dataType:'text',
		success: function(data){
        alert('로그아웃되었습니다.');
        //    var domain = window.location.hostname;
        //    var subDomain = domain.split('.');

        top.location.href='/kaoh_main';
           
			
		},
		error:function(){
			alert('로그아웃이 실패하였습니다.');
		}
	})
}

function logOut(){
	$.ajax({
		url:'../api/apiLogin.php',
		type:'DELETE',
		dataType:'text',
		success: function(data){
            alert('로그아웃되었습니다.');
           var domain = window.location.hostname;
           var subDomain = domain.split('.');
           if(subDomain[0] == 'kaoh' && loginUserLevel == '8'){ //학원관리자모드
            top.location.href='http://'+joinURL+'.'+siteURL+'/kaoh_main/login.php';
           }else if(subDomain[0] == 'kaoh' && loginUserLevel == '4'){
               var subUrl = '';
                switch (memo) {
                    case "세종":
                        subUrl += 'sjhy'; 
                        break;
                    case "충북":
                        subUrl += 'cbhy'; 
                        break;
                    case "충남":
                        subUrl += 'cnhy'; 
                        break;
                    case "강원":
                        subUrl += 'kwhy'; 
                        break;
                    case "대전":
                        subUrl += 'djhy'; 
                        break;
                }   
            
                 top.location.href='http://'+subUrl+'.'+siteURL+'/kaoh_main/login.php';
                 
           }else{
            top.location.href='../admin/00_login.php';
           }
			
		},
		error:function(){
			alert('로그아웃이 실패하였습니다.');
		}
	})
}
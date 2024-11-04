//	관리자 UI 퍼포먼스, 레이아웃 스크립트
//	작성자 : 서영기
//
var GNBApi = '../api/apiCategory.php'

function GNBAct(type){
	var GNBS = '';

	if(type=="adminGNB"){
		var GNBSelect = locaSel.substr(0,2);
		var SubmenuSelect = locaSel.substr(2,2);
		//메인메뉴 출력
		var GNBAction = $.get(GNBApi,{'value01':type},function(data){
			if ((loginUserLevel == 5 && loginUserID == 'hreducenter') || loginUserID == 'eungmin22') {
				GNBS +='<li id="966" onClick="top.location.href=\'/admin/03_member.php?locaSel=0311\'">';
				GNBS += '인사드림 회원 내역';
				GNBS += '</li>';

				GNBS +='<li id="965" onClick="top.location.href=\'/admin/04_offline_history.php?locaSel=3001\'">';
				GNBS += '인사드림 신청 내역';
				GNBS += '</li>';

				GNBS += '<li id="943" onclick="top.location.href=\'/admin/04_handle_offline_pass.php?locaSel=0427\'">오프라인 교육 수료관리</li>';
				GNBS += '<li id="969" onclick="top.location.href=\'/admin/06_mantoman_manager.php?locaSel=3201\'">오프라인 문의관리</li>';
				
			} else if (loginUserLevel == 8 && loginSubdomain == 'educenter') {
				
				GNBS += '<li id="965" onClick="top.location.href=\'/admin/04_offline_history.php?locaSel=3001\'">인사드림 신청 내역</li>';
				GNBS += '<li id="966" onClick="top.location.href=\'/admin/04_study_input_manager.php?locaSel=0403\'">수강등록</li>';
				GNBS += '<li id="973" onClick="top.location.href=\'/admin/06_board.php?locaSel=0907&boardCode=212\'">사업자등록증 등록</li>';

			} else {
				$.each(data.category, function(){
					var GNBSel = this.value01.substr(0,2);
					var GNBFirstPermit = Number(this.value01.substr(2,1));
					var GNBLastPermit = Number(this.value01.substr(3,1));
					if(this.enabled != 'N' && GNBFirstPermit <= loginUserLevel && GNBLastPermit >= loginUserLevel){
						GNBS +='<li id="'+this.seq+'" onClick="top.location.href=\''+this.value03+'\'"'
						if(GNBSel == GNBSelect){
							GNBS += 'class="select"';
						}
						GNBS +='>';
						GNBS += this.value02;
						GNBS += '</li>';
					}
				})
			}
			$('.apiGNB').html(GNBS);
		})
		.done(function(){
			var subPrint = $('.apiGNB li.select').attr('id');
			//서브메뉴 출력
			var subMenuAction = $.get(GNBApi,{'seq':subPrint},function(data){
				var subMenus = '';
				$.each(data.category,function(){
					var subSel = this.value01.substr(0,2);
					var subFirstPermit = Number(this.value01.substr(2,1));
					var subLastPermit = Number(this.value01.substr(3,1));
					if(this.enabled != 'N' && subFirstPermit <= loginUserLevel &&  subLastPermit >= loginUserLevel ){
						subMenus += '<li id="'+this.seq+'" onClick="top.location.href=\''+this.value03+'\'"';
						if(subSel == SubmenuSelect){
							subMenus += 'class="select"';
						}
						subMenus += '>';
						subMenus += this.value02;
						subMenus += '</li>';
					}
					if(loginUserID == 'hhtmc12' && this.enabled == 'N' && this.value03 == '../admin/04_study_sms.php?locaSel=0402'){ //가산TM센터에 한해 학습참여독려 알림톡(문자)전송기능 활성화 20200128 이화랑
						subMenus += '<li id="'+this.seq+'" onClick="top.location.href=\''+this.value03+'\'"';
						if(subSel == SubmenuSelect){
							subMenus += 'class="select"';
						}
						subMenus += '>';
						subMenus += this.value02;
						subMenus += '</li>';
					}
				})
								
				/*<? if ($_SESSION['loginUserID'] == 'eungmin2_test') { ?>
					<li class="<?= $onSelect ?>" onClick="top.location.href='';$(this).addClass('select');">수강등록</li>
				<? } ?>*/

				//휴램제휴 기간동안 노무상담서비스 메뉴 생성 
				// if ((subPrint == 89 || subPrint == 427) && loginMarketerID != 'finecaredu') {
				// 	subMenus += '<li onClick="top.location.href=\'http://pf.kakao.com/_bhFuj/chat\'"><b style="color:blue">노무상담서비스연결<b/></li>';
				// }

				$('.apiSubMenu').html(subMenus);
				var pageTitleSeq = $('.apiSubMenu li.select').attr('id')
				var pageTitleAction = $.get(GNBApi,{'seq':pageTitleSeq},function(data){
					var pageTitle = '';
					if(data.totalCount != 0){
//						$.each(data.category,function(){
//							if(this.value01 == 'title'){
//								pageTitle += this.value02 + '<span>' + this.value03  + '</span>';
//							}
//						})
						// $('#contents > h1').html(pageTitle);
					}
				})
			})
		})
		.always(function(){
			pageMode == 'adminPage';
			if(typeof page != 'undefined' && typeof seq != 'undefined' ){
				if(seq != ''){
					viewAct(seq)
				}else{
					listAct(page)
				}
			}else{
				pageAct()
			}
		})
	}if(type=="userGNB"){
		pageMode == 'userPage';
		/*
		var currentPage = document.location.href;
		currentPage = currentPage.slice(7);
		var filearr = currentPage.split("/");
		var selectFile = filearr.length -1;
		var selectFolder = filearr.length - 2;
		var currentFile = filearr[selectFile];
		var currentFolder = filearr[selectFolder];
		*/
		if(seq != ''){
			viewAct(seq)
		}else{
			listAct(page)
		}
	}
}

$(document).ready(function(){
	ajaxAct();
})

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		var totalCount = data.totalCount;
        var lists = '';
        //console.log(data.academyLaw[0]);
		if (totalCount != 0){
			lists += '<div class="tab_con">';
            if(data.academyLaw[0].joinURL == 'jnhy'){
                lists += '<article>';
                lists += '<div onClick="location.href=\'../studyCenterKaoh/academyLaw.php\'" style="height:65px;">';
                lists += '<button type="button" title="버튼"></button>';
                lists += '<h1>학원법 개정사항 및 감사 주요 지적사항 실무안내</h1>';
                if(data.academyLaw[0].inputDate != ""){
                    lists += '<h2>확인시간 : '+data.academyLaw[0].inputDate+'</h2>';
                }
                lists += '</div>';
                lists += '</article>';

                lists += '<article>';
                lists += '<div onClick="window.open(\'https://youtu.be/GFP917jIuMw\')" style="height:65px;">';
                lists += '<button type="button" title="버튼"></button>';
                lists += '<h1>감염병(코로나19) 방역체계 구축 및 대처 방안</h1>';
                lists += '<h2>* 질병관리청 공식유튜브 채널 [소중한 생활을 지키는 올바른 소독방법! - 사업장] 편으로 링크됩니다. </h2>';
                lists += '</div>';
                lists += '</article>';
            }
			
			$.each(data.study, function(){
				lists += '<article id="list'+this.seq+'">';
				//상단 타이틀
				lists += '<div class="tab_con" ';
				if(this.mobile == 'Y' || (loginUserLevel == '12' && this.userName == "콘텐츠심사")){
					if(this.serviceType != 8){
                        if(data.academyLaw[0].joinURL=='jnhy' && data.academyLaw[0].inputDate == "" && data.academyLaw[0].department =="학원설립운영자"){
                            lists += 'onclick="alert(\'학원법 개정사항을 읽으셔야 수강을 들으실수 있습니다.\')"';
                        }else{
                            lists += 'onclick="viewStudyDetail('+this.seq+',\''+this.contentsCode+'\','+this.lectureOpenSeq+')"';
                        }
					    
					}else{
						lists += 'onclick="joinLMS('+this.seq+',\'study\')"';
					}
				}else{
					lists += ' onclick="alert(\'모바일을 지원하지 않는 과정입니다.\\n\\nPC로 수강하시기 바랍니다.\')"';
				}
				lists += '>';
				/*lists += '<button type="button" title="버튼"></button>';
				lists += '<h1>'+this.contentsName+'</h1>';
				lists += '<h2>수강기간 : '+this.lectureStart+' ~ '+this.lectureEnd+'</h2>';
				lists += '<ul>';
				lists += '<li>남은 수강일 <strong>'+this.leftDate+'</strong>일</li>';
				lists += '<li>차시 진도 <strong>'+this.nowChapter+'</strong>/'+this.allChapter+'</li>';
				lists += '<li>진도율 <strong>'+this.progress+'</strong>%</li>';
				lists += '</ul>';
				lists += '</div>';
				lists += '</article>';*/
				lists += '<div class="mypage_lclist">';
				lists += '<div class="contentinfo1">';
				lists += '<strong class="info_title">';
				lists += '<h1>'+this.contentsName+'</h1>';
				lists += '</strong>';
				lists += '<p class="info_date"><span class="tc_blue">상시</span>'+this.lectureStart+'~'+this.lectureEnd+'</p>';
				lists += '</div>';
				lists += '<div class="my_btn_wrap">';
				if(this.mobile == 'Y'){
					lists += '<a href="studyDetail.php?seq='+this.seq+'&contentsCode='+this.contentsCode+'&lectureOpenSeq='+this.lectureOpenSeq+'"><button type="button" class="my_btn_join">강의실 입장</button></a>';
				} else {
					lists += '<button type="button" class="my_btn_join">모바일을 지원하지 않는 과정입니다.</button>';
				}
				lists += '</div>';
				lists += '</div>';
				lists += '</div>';
            })
            /*lists += '<article><div onClick="window.open(\'https://trafficedu.koroad.or.kr:8443/home/main/index\')" style="height:65px;">';
            // lists += '<a href="https://trafficedu.koroad.or.kr:8443/home/main/index"><h5>[도로교통공단] 어린이 통학버스 동승보호자 교육<br/>* 도로교통공단 이러닝센터로 링크됩니다.</h5></a>';
            lists += '<button type="button" title="버튼"></button>';
            lists += '<h1>[도로교통공단] 어린이 통학버스 동승보호자 교육</h1>';
            lists += '<h2>* 도로교통공단 이러닝센터로 링크됩니다.</h2>';
            lists += '</div></article>';

            lists += '<article><div onClick="window.open(\'http://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/SDIJKM5116.html?menuSeq=127\')">';
            lists += '<button type="button" title="버튼"></button>';
            lists += '<h1>[국민재난안전포털] 화재 발생 시 국민행동요령 교육</h1>';
            lists += '<h2>* 국민재난안전포털 사회재난행동요령 페이지로 링크됩니다. <br/>행정안전부가 창작한 국민재난안전포털 저작물은<br/>공공누리(출처표시-상업적 이용금지- 변경금지)" 조건에 따라 이용할 수 있습니다.</h2>';
            // lists += '<a href=""><h5>[국민재난안전포털] 화재 발생 시 국민행동요령 교육<br/>* 국민재난안전포털 사회재난행동요령 페이지로 링크됩니다. <br/>행정안전부가 창작한 국민재난안전포털 저작물은<br/>공공누리(출처표시-상업적 이용금지- 변경금지)" 조건에 따라 이용할 수 있습니다.</h5></a>';
            lists += '</div></article>';

            lists += '</div>';*/

			lists += '<div class="mypage_lclist">';
			lists += '<div class="contentinfo1">';
			lists += '<strong class="info_title">[도로교통공단] 어린이 통학버스 동승보호자 교육</strong>';
			lists += '<p class="info_date">* 도로교통공단 이러닝센터로 링크됩니다.</p>';
			lists += '</div>';
			lists += '<div class="my_btn_wrap">';			
			lists += '<button type="button" class="my_btn_join" onClick="window.open(\'https://trafficedu.koroad.or.kr:8443/home/main/index\')">이동</button>';			
			lists += '</div>';
			lists += '</div>';
			lists += '</div>';

			lists += '<div class="mypage_lclist">';
			lists += '<div class="contentinfo1">';
			lists += '<strong class="info_title">[국민재난안전포털] 화재 발생 시 국민행동요령 교육</strong>';
			lists += '<p class="info_date">* 국민재난안전포털 사회재난행동요령 페이지로 링크됩니다. <br/>행정안전부가 창작한 국민재난안전포털 저작물은<br/>공공누리(출처표시-상업적 이용금지- 변경금지)" 조건에 따라 이용할 수 있습니다.</p>';
			lists += '</div>';
			lists += '<div class="my_btn_wrap">';			
			lists += '<button type="button" class="my_btn_join" onClick="window.open(\'http://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/SDIJKM5116.html?menuSeq=127\')">이동</button>';			
			lists += '</div>';
			lists += '</div>';
			lists += '</div>';

		} else {
			//lists += '<article class="noList">강의가 없습니다.</article>';
			lists += '<div class="mypage_lclist">등록된 과정이 없습니다.</div>';
			lists += '</div>';
		}
		
		//$('#studyPage > section').html(lists);
		$('.progress').append(lists);
		//$('#studyPage hgroup h1 strong').html(totalCount);

		/*if(contentsCode != ''){
			viewStudyDetail(studySeq,contentsCode,lectureOpenSeq)
			top.location.href='#list'+studySeq;
		}*/
	})
}

function viewStudyDetail(studySeq,contentsCode,lectureOpenSeq,renew){

	studySeq = studySeq ? studySeq : '';
	contentsCode = contentsCode ? contentsCode : '';
	lectureOpenSeq = lectureOpenSeq ? lectureOpenSeq : '';
	var studyBlock = $('#list'+studySeq);

	if (studyBlock.has('ol').length != 0 && renew != 'Y'){
		studyBlock.children('ol').remove();
		studyBlock.removeClass('openStudy');
	}else{
		var studyDetails = $.get(chapterApi,'contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq,function(data){
			var totalCount = data.totalCount;
			var ContentsCode = data.contentsCode;
			var lectureOpenSeq = data.lectureOpenSeq;
			var studyDetails = '';
			var useMidTest = data.midStatus;
			var useFinTest = data.testStatus;
			var useReport = data.reportStatus;
			var sourceType = data.sourceType;
			var mobileSourceType = data.mobileSourceType;
			var midTerm = data.midTestChapter;
			var progressCheck = data.progressCheck;
			//2018-04-18 본인인증 1일 1회(강혜림 추가)
			//if(loginUserID != 'leehr0523' && loginUserID != 'dnthdgml' && loginUserID != 'cds334'){
			//	var certDate = data.certDate; 
			//	if(certDate){
			//		certDate = certDate.substr(0,10);
			//	}
			//}
			//var certDate = data.certDate; 
			//if(certDate){
			//	certDate = certDate.substr(0,10);
			//}
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd
			} 
			if(mm<10) {
				mm='0'+mm
			} 
			today = yyyy+'-'+mm+'-'+dd;

			if (totalCount != 0){
				//2018-04-18 본인인증 1일 1회(강혜림 추가)
				//if(loginUserID == 'leehr0523' || loginUserID == 'dnthdgml' || loginUserID == 'cds334'){
					var certPassQuery = (((data.serviceType == '1' || data.serviceType == '2') && data.certPass == 'Y'));
				//} else {
				//	var certPassQuery = ((data.serviceType == '1' && today == certDate));
				//}
				if(certPassQuery || data.serviceType == '3' || data.serviceType == '9' || data.serviceType == '5'){
					studyDetails += '<ol>';

					//강의 활성용 오늘날짜 호출
					var today = new Date(data.nowTime);
					var today2 = data.nowTime;
					var dd = today.getDate();
					if(dd <= 9){ dd = '0'+dd }
					var mm = today.getMonth()+1; //January is 0!
					if(mm <= 9){ mm = '0'+mm }
					var yy = today.getFullYear();
					today = yy+'-' + mm+'-'+dd;
					var todayCount = 0;
					var btnUse = 'Y';
					var btnUse2 = 'Y';
					//var i = 0;
					var Sid = data.contentsCode + data.lectureStart.substr(2,2) + data.lectureStart.substr(5,2) + data.lectureStart.substr(8,2) + data.lectureEnd.substr(8,2);

					/*진도율, 랭킹 출력*/
					studyDetails +='<ul class="progress">';
					studyDetails +='<li class="type01"><h1>권장진도율<strong>'+data.suggestProgress+'<span>%</span></strong></h1><div><p style="width:'+data.suggestProgress+'%"></p></div></li>';
					studyDetails +='<li class="type02"><h1>내 진도율<strong>'+data.totalProgress+'<span>%</span></strong></h1><div><p style="width:'+data.totalProgress+'%"></p></div></li>';
					studyDetails +='<li class="type03"><h1>평균진도율<strong>'+data.aveProgress+'<span>%</span></strong></h1><div><p style="width:'+data.aveProgress+'%"></p></div></li>';
					studyDetails +='</ul>';

					for (i = 0 ; i<totalCount; i++){
						if(data.progress[i].endTime != null){
							if(data.progress[i].endTime.substr(0,10) == today){
								todayCount ++;
							}
						}
						if(data.progress[i].lastPage == null) {
							var lastPage = 1;
						} else {
							var lastPage = data.progress[i].lastPage;
						}
						if(data.progress[i].mobileLastPage == null) {
							var mobileLastPage = 1;
						} else {
							var mobileLastPage = data.progress[i].mobileLastPage;
						}

						if (data.serviceType == 1 || data.serviceType == 9){  // 환급 과정일때만 평가 항목 출력
							if(i == midTerm){
								if(data.midStatus != 'Y'){
									btnUse = 'N'
								}
							}
							
							if( btnUse == 'Y' && todayCount <= 8 ){
								if(i%8 == 0 || i == 0){
									if(today2 >= '2018-12-14 13:00:00' && today2 <= '2018-12-14 18:00:00') {	//캡차 제외 처리
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									} else {
										if(data.serviceType == 1) {	
											studyDetails += '<li onclick="top.location.href=\'hrdOTP_mobile.php?mobileYN=Y&type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'&progressCheck='+progressCheck+'&lectureStart='+data.lectureStart+'\'">';											
										//	studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'\'">';
											
										} else {
											studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
										}
										//studyDetails += '<li onclick="top.location.href=\'captcha.php?type=study&chapter='+data.progress[i].chapter+'&contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&studySeq='+studySeq+'\'">';
									}
								} else {
									if(data.progress[i].progress != 0){
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}else{
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}
								}

								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
							}else{
								if(i == midTerm){
									if(data.midStatus == 'N' && midTerm!=0){ //2017-07-03 서영기
										studyDetails += '<li onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									}else{
                                        if(data.progress[i].progress != 0){
	                                        studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
                                            studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
                                        }else{
                                            studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
                                            studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
                                        }
                                    }
								} else {
									if(todayCount >= 8) {
										studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									} else {
										if(data.midStatus == 'N'){
											studyDetails += '<li onclick="alert(\'중간평가는 총 진도율 50% 이상 응시 가능하므로, 이전 차시 진도율이 100%가 되도록 학습을 해주세요.\')">';
										}else{
											studyDetails += '<li onclick="alert(\'이전 차시 진도율이 80% 이상 되도록 학습을 해주세요.\')">';
										}										
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									}
								}
							}
          
							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}
           
						} else if( data.serviceType == 5 ){  // 김재욱 비환급 요청 추가
							if(i == midTerm){
								if(data.midStatus != 'Y'){
									btnUse2 = 'N'
								}
								if(data.midStatus == null){
									btnUse2 = 'Y'
								}
							}
							if( btnUse2 == 'Y'){
								if(i >0){
									if(data.progress[i-1].progress == 100){
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}else{
										studyDetails += '<li onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">';
									}
								}else{
									if(data.progress[i].progress != 0){
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}else{
										studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									}			
								}
								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';

							}else{
								if(i == midTerm){
									if(data.midStatus == 'N' && midTerm != 0){ //2017-07-03 서영기
										studyDetails += '<li onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">';
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									}else{
											if(data.progress[i].progress != 0){
												studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
													studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
											}else{
													studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
													studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
											}
									}
								} else {
									//if(todayCount >= 8) {
									//	studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
									//	studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									//} else {
										if(data.midStatus == 'N'){
											studyDetails += '<li onclick="alert(\'중간평가 응시 완료 후 다음 차시 학습이 가능합니다. 평가 응시는 PC에서만 가능합니다.\')">';
										}else{
											studyDetails += '<li onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">';
										}										
										studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
									//}
								}
								if(data.midStatus != 'N' && midTerm != 0){
									btnUse2 = 'Y';
								}
							}
          
							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}
           						
						}else { // 비환급
							/*if(btnUse == 'Y'){
								if(data.progress[i].progress != 0){
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}else{
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}
								studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
							}else{
								//if(todayCount >= 8) {
								//	studyDetails += '<li onclick="alert(\'사업주 직업능력개발훈련 지원규정 1일 학습 가능한 차시(8차시)를 초과하였습니다.\')">';
								//	studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								//} else {
									studyDetails += '<li onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">';
									studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
								//}
							}

							if(data.progress[i].progress != 0){
								studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
							}else{
								studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
							}
							studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';

							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}*/
							if(i >0){
								if(data.progress[i-1].progress == 100){
									//studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+sourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}else{
									studyDetails += '<li onclick="alert(\'이전 차시 및 모든 차시 진도율이 100%가 되도록 학습해 주세요.\')">';
								}
							}else{
								if(data.progress[i].progress != 0){
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}else{
									studyDetails += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+data.progress[i].chapter+'\',\''+lectureOpenSeq+'\',\'\',\''+mobileSourceType+'\',\''+Sid+'\',\''+lastPage+'\',\''+mobileLastPage+'\')">';
								}			
							}
							studyDetails += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';

							studyDetails += '<h3><strong>'+data.progress[i].chapter+'</strong>차시<br /><span>'+data.progress[i].progress+'</span>%</h3>';
							studyDetails += '<h1>'+data.progress[i].chapterName+'</h1>';
							if(data.progress[i].endTime != null){
								studyDetails += '<h2>교육이수 시간 : '+data.progress[i].endTime+'</h2>';
							}
						}
						studyDetails += '</li>';
						if(data.progress[i].progress <= 79){
							btnUse = 'N'
						}else{
							//if (data.serviceType == 1 || data.serviceType == 9){  // 환급 과정일때만 평가 항목 출력
								if(todayCount >= 8){
									btnUse = 'N'
								} else {
									btnUse = 'Y'
								}
							//}
						}
					}
					studyDetails += '</ol>';
				} else {
					//alert('최초 수강 시 본인인증절차를 거쳐야 합니다. 본인인증은 PC로만 가능합니다. PC로 접속하여 본인인증을 진행해주시기 바랍니다.');
                    //certPassModal(data.lectureStart,studySeq,contentsCode,lectureOpenSeq);
					alert('수강 시 본인인증 절차를 거쳐야 합니다.');
					certMove(lectureOpenSeq,data.lectureStart,ContentsCode);
				}
			}else{
				alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
				location.href="/m/login.html";
			}
			if (renew == 'Y'){
				studyBlock.children('ol').remove();
			}
			studyBlock.addClass('openStudy');
			studyBlock.children('div').after(studyDetails);
			//특수차시
			var prologue = ''
			var epilogue = ''

			$.each(data.progress,function(){
				if(this.chapter >= 100 && this.chapter <= 109){
					prologue += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
					prologue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					prologue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					prologue += '<h1>'+this.chapterName+'</h1>';
					prologue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					prologue += '</li>';
				}else if(this.chapter >= 110 && this.chapter <= 119){
					prologue += '<li onclick="studyPlay(\''+studySeq+'\',\''+ContentsCode+'\',\''+this.chapter+'\',\''+lectureOpenSeq+'\',\'check\',\''+mobileSourceType+'\',\''+Sid+'\',\''+data.progress[i].lastPage+'\')">';
					epilogue += '<button type="button"><img src="../images/mobile/btn_play.png"></button>';
					epilogue += '<h3><strong>-</strong><br /><span>'+this.progress+'</span>%</h3>';
					epilogue += '<h1>'+this.chapterName+'</h1>';
					epilogue += '<h2>교육이수 시간 : '+this.endTime+'</h2>';
					epilogue += '</li>';
				}
			})
			if(prologue != ''){
				studyBlock.children('ol').prepend(prologue);
			}
			if(epilogue != ''){
				studyBlock.children('ol').append(epilogue);
			}
		})
	}
}

function studyPlay(studySeq, contentsCode, chapter, lectureOpenSeq, check, mobileSourceType, Sid, MovePage, Page){
	$.get('../api/apiLoginUser.php',function(data){		
		if(data.userID == '') {
			alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
			location.href="/m/login.html";

		} else {		
			/*if(sourceType = 'html5'){
				sourceType ='flash';
			}
			if(sourceType=='book') {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.')==true){
						check = check
					}else{
						check = ''
						return;
					}
				}

				var Chasi = chapter < 10 ? '0' + chapter : chapter;
				var linkAddress = '/viewer/index.html?Sid='+Sid+'&Code='+contentsCode+'&Chasi='+Chasi+'&Page='+Page+'&MovePage='+MovePage+'&LectureOpenSeq='+lectureOpenSeq+'&PreView=N';
				top.location.href = linkAddress;

			}*/
			if(mobileSourceType=='html5') {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				var linkAddress = 'study_html.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				top.location.href = linkAddress;

			} else {
				if(check != ''){
					if(confirm('3G/4G 환경에서는 데이터 요금이 발생할 수 있습니다.\n\n이어보기를 하시겠습니까?')==true){
						check = check
					}else{
						check = ''
					}

				}
				var linkAddress = 'study_view.html?studySeq='+studySeq+'&contentsCode='+contentsCode+'&chapter='+chapter+'&lectureOpenSeq='+lectureOpenSeq+'&check='+check;
				top.location.href = linkAddress;
			}
		}
	})
}

function certMove(lectureOpenSeq, lectureStart, ContentsCode){
	top.location.href='../m/mobileCerti.php?lectureOpenSeq='+lectureOpenSeq+'&lectureStart='+lectureStart+'&contentsCode='+ContentsCode;
}

//oneedu LMS 연동
function joinLMS(seqs,type){
	setSSO = window.open('http://oneedu.co.kr/api/apiSSO.php','studyJoin','top=0,left=0,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no','학습연동')

    $.get(useApi,{'seq':seqs},function(data){
        var totalCount = data.totalCount;
        var lists = '';
        var studyBlock = $('#list'+seqs);

		lists += '<form class="joinForm" action="http://oneedu.co.kr/api/apiSSO.php" method="post" target="studyJoin">';
		lists += '<input type="hidden" name="ssoSite" value="kiraedu">';
		lists += '<input type="hidden" name="memID" value="'+data.study[0].userID+'">';
		lists += '<input type="hidden" name="type" value="'+type+'">';
		lists += '<input type="hidden" name="lectureStart" value="'+data.study[0].lectureStart+'">';
		lists += '<input type="hidden" name="lectureEnd" value="'+data.study[0].lectureEnd+'">';
		lists += '<input type="hidden" name="ssoCode" value="'+data.study[0].ssoCode+'">';
		lists += '</form>'
        studyBlock.children('div').after(lists);
		studyBlock.children('form.joinForm').submit();
		//progressCheck(seqs,data.study[0].contentsCode,data.study[0].lectureOpenSeq,0)
		setSSO.focus();
		studyBlock.children('form.joinForm').remove();
    })
}
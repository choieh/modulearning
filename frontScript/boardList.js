//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//리스트 소팅
var categoryLink = ''//카테고리 사용시 선택 메뉴탭

function listAct(listPage){
	var boardInfo = $.get('../api/apiBoardInfo.php',{'seq':boardCode},function(data){
		$.each(data.boardInfo, function(){
			boardName = this.boardName;
			boardMode = this.boardMode;
			useName = this.useName;
			useEmail = this.useEmail;
			usePhone = this.usePhone;
			usePassword = this.usePassword;
			useSecret = this.useSecret;
			useTop = this.useTop;
			useCategory = this.useCategory;
			useReply = this.useReply;
			useComment = this.useComment;
			useFile = this.useFile;
			useSearch = this.useSearch;
			useDateView = this.useDateView;
			useHitView = this.useHitView;
			memo = this.memo;

			if (boardCode == 2) {
				titleHtml = boardName +'<span>'+ memo +' (조회수 항목을 클릭하면 조회수가 많은 순으로 정렬 됩니다)</span>';
			} else {
				titleHtml = boardName +'<span>'+ memo +'</span>';
			}
		})
	}).done(function(){
		$.get('../api/apiBoardPermit.php',{'boardCode':boardCode},function(data){
			$.each(data.boardPermit, function(){
				listPermit = this.listPermit;
				viewPermit = this.viewPermit;
				writePermit = this.writePermit;
				replyPermit = this.replyPermit;
				deletePermit = this.deletePermit;
				commentPermit = this.commentPermit;
				secretPermit = this.secretPermit;
				topPermit = this.topPermit;
			})
		})
		.done(function(){
			listPage = listPage ? listPage : 1;
			page = listPage;
			//상단 액션 부분
			if(pageMode=='adminPage'){
				$('#contents > h1').html(titleHtml);
			}else{
				$('#titleArea > h2 > strong').html(boardName);
				$('#titleArea > h1').html(boardName);
			}
			//상단 액션 부분
			if(useSearch == "Y"){
				var actionArea = '';
				actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
				actionArea += '<input type="hidden" name="hitOrderBy">';
                if(boardMode == 9){
                    actionArea += '<button type="button" class="fRight" onClick="writeAct()">입과신청</button>';
                } else if(eval(writePermit) >= eval(loginUserLevel) && eval(boardMode) != 7){
					actionArea += '<button type="button" class="fRight" onClick="writeAct()">새글쓰기</button>';
				}

				if(boardMode == 9){
					actionArea += '<button type="button" class="fRight" onClick="printContents()">과정목록</button>';
				}

				if(boardMode == 9){
					actionArea += '<select name="searchType">';
					actionArea += '<option value="company">사업주명</option>';
					actionArea += '<option value="userName">작성자 이름</option>';
					actionArea += '<option value="userID">작성자 아이디</option>';
					actionArea += '<option value="subject">과정명</option>';
					actionArea += '</select>&nbsp;';
					actionArea += '<input name="searchValue" id="board9SearchVal" type="text" />&nbsp;';
                    actionArea += '<select name="searchDate">';
                    actionArea += '<option value="startDate">시작날짜</option>';
                    actionArea += '<option value="writeDate">작성날짜</option>';
                    actionArea += '</select>&nbsp;';
					actionArea += '<input name="date" id="board9Date" type="text" placeholder="2000-11-11" onkeyup="inputYMDNumber(this)"></span>';
					actionArea += '<button type="button" onClick="searchAct()">검색하기</button><span>';
                    actionArea += '<span style="padding: 0 10px;">페이지 수</span>';
                    actionArea += '<select name="listCount" onchange="updateListCount(this.value);">';
                    actionArea += '<option value="10">10개</option>';
                    actionArea += '<option value="50">50개</option>';
                    actionArea += '<option value="100">100개</option>';
                    actionArea += '</select>';

                    actionArea += '<span style="padding-left: 20px; font-size:14px;">처리상태</span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'\')">전체</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'W\')">대기</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'C\')">접수</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'R\')">보완</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'N\')">처리중</button></span>';
                    actionArea += '<span style="margin-left:5px;"><button type="button" onClick="searchAct2(\'Y\')">완료</button></span>';
                    if(loginUserLevel == 2){
                        actionArea += '<span style="padding-left: 20px; font-size:14px;">일괄변경</span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'C\');">접수</button></span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'R\');">보완</button></span>';
                        actionArea += '<span style="margin-left:5px;"><button type="button" onClick="changeAllStatus(\'Y\');">완료</button></span>';
                    }

				} else {
					actionArea += '<select name="searchType">';
					actionArea += '<option value="subject">제목</option>';
					actionArea += '<option value="userName">이름</option>';
					actionArea += '<option value="userID">아이디</option>';
					actionArea += '</select>&nbsp;';
					actionArea += '<input name="searchValue" type="text" />&nbsp;';
					actionArea += '<button type="button" onClick="searchAct()">검색하기</button><span>';
				}

				//actionArea += '조회수별 순위 - '+boardHit;
				// var boardInfo = $.get('../api/apiBoardHit.php',function(data){
				// 	$.each(data.boardHit, function(){
				// 		actionArea += this.category+'/';
				// 		actionArea += this.totalHit;
				// 	})
				// })


				actionArea += '</span></form></div>';
				if(pageMode=='adminPage'){
					$('#contents > h1').after(actionArea);
				}else{
					$('#contentsArea').before(actionArea);
				}
			}

			if(useCategory == "Y"){
				var categorys = ''
				if(pageMode == 'studyCenterPage'){
					categorys += '<ul class="tabMenu">'
				}else{
					categorys += '<ul class="BBSCategory">'
				}
				var categorySort = $.get(categoryApi,{'value01':'boardCategory','divisionValue':boardCode},function(data){
					categorys += '<li id="cat" class="select">전체</li>';
					if(data.totalCount != 0){
						$.each(data.category,function(){
							if(this.enabled == 'Y'){
								categorys += '<li id="cat'+this.seq+'">'+this.value02+'</li>';
							}
						})
					}
					categorys += '</ul>'
					$('#contentsArea').before(categorys);
					//카테고리 선택시 액션
					$('.BBSCategory li, .tabMenu li').bind({
						click:function(){
							$('.BBSCategory li, .tabMenu li').removeClass('select')
							$(this).addClass('select')
							categoryLink = $(this).attr('id')
							categoryLink = '&categorySeq='+categoryLink.slice(3);
							//alert(categoryLink)
							ajaxAct();
						}
					})
				})
			}
			//게시판 상단 제목열 세팅
			var contents = ''
			if(boardMode == 1  || boardMode == 4 || boardMode == 8 || boardMode == 9 || boardMode == 10){
				contents += '<table><thead><tr>';
				contents += '<th style="width:10%">번호</th>';
				if (useCategory == 'Y'){
					contents += '<th style="width:10%;">카테고리</th>';
				}
				if(boardMode == 9){
					contents += '<th style="width:15%;">사업주명/과정명/날짜</th>';
				} else {
					contents += '<th style="width:50%">제목</th>';
				}

				if (boardMode == 8){
					contents += '<th style="width:15%;">공개</th>';
				}
				if (useName == 'Y'){
					contents += '<th style="width:15%;">작성자</th>';
				}
				if (useDateView == 'Y'){
					if (boardCode == 20) {
						contents += '<th style="width:10%">토론기간</th>';
					} else {
						contents += '<th style="width:10%">작성일</th>';
					}

				}
				if(boardMode == 9){
					contents += '<th style="width:10%">처리상태</th>';
					if(loginUserLevel == 2){
                    	contents += '<th style="width:10%">상태변경</th>';
					}
				}
				if (useHitView == 'Y' || loginUserLevel == 2){
					contents += '<th style="width:10%" onClick="globalModalAct(\'boardHit\')">조회수</th>';
				}
				contents += '</tr></thead><tbody>';
				contents += '</tbody></table>';

			}else{
				contents += '<ul></ul>';
			}
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSList')
			$('#contentsArea').html(contents);
			ajaxAct();
			//pickerAct2();//데이트피커 사용
			dateAct();//데이트피커 사용

			if (boardMode == 9) {
				document.getElementById('board9Date').addEventListener('keydown', (e) => {
					if (e.keyCode == 13) {
						searchAct();
					}
				});

				document.getElementById('board9SearchVal').addEventListener('keydown', (e) => {
					if (e.keyCode == 13) {
						searchAct();
					}
				});
			}
		})
	})
}

function ajaxAct(sortDatas){
	//게시물 소팅부분
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var lists = '';
    param = 'boardCode='+boardCode+'&page='+page+'&list='+listCount+sortData+categoryLink;
	var listAjax = $.get(useApi, param, function(data){
		totalCount = data.totalCount;
		var attachURL = data.attachURL;
		var hitOrderBy = data.hitOrderBy;
		if(eval(boardMode) == 1 || eval(boardMode) == 4){
			//초기 공지사항
			if(useTop == "Y"){
				if( eval(data.topCount) != 0 || eval(data.topCount) != ''){
					$.each(data.boardTop, function(){
						lists += '<tr ';
						if(eval(boardMode) == 4){
							lists += 'id="line'+this.seq+'"'
						}
						lists += 'class="notice">';
						lists += '<td>[공지]</td>';
						if (useCategory == 'Y'){
							lists += '<td>'+this.categoryName+'</td>';
						}
						lists += '<td class="left" ';
						if(eval(boardMode) == 1){
							if(this.secret != "Y" || loginUserLevel < 4 || loginUserID == this.userID){
								lists += 'onclick="viewAct('+this.seq +')"';
							}else{
								lists += 'onclick="alert(\'a\')"'//'onclick="modalAct(\''+useApi+'\','+this.seq+')"';
							}
						}else if(eval(boardMode) == 4){
							lists += 'onclick="openView('+this.seq+')"';
						}
						lists += ' style="cursor:pointer">';
						if(this.replySeq != 0){
							lists += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;'
						}
						if(this.secret == 'Y'){
							lists += '<img src="../images/admin/icon_secret.png" />&nbsp;&nbsp;'
						}
						lists += this.subject;
						if(this.commentCount >= 1){
							lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
						}
						if(this.attachFile01Name != null || this.attachFile02Name != null ){
							lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
						}
						lists += '</td>';
						if (useName == 'Y'){
							lists += '<td>'+this.userName+'</td>';
						}
						if (useDateView == 'Y'){
							lists += '<td>'+this.inputDate.substring(0,10)+'</td>';
						}
						if (useHitView == 'Y' || loginUserLevel == 2){
							lists += '<td>'+this.hits+'</td>';
						}
						lists += '</tr>';
					})
				}
			};

			if(eval(data.totalCount) != 0){
				var i = 1
				if(page == 1){
					i = 1
				}else{
					i = page * listCount + 1
				}

				limit = (page - 1) * listCount;
				i = data.totalCount - limit; //2017.1.25 게시글번호 역순처리

				$.each(data.board, function(){
					lists += '<tr ';
					if(eval(boardMode) == 4){
						lists += 'id="line'+this.seq+'"'
					}
					lists += '">';
					lists += '<td>'+i+'</td>';
					if (useCategory == 'Y'){
						lists += '<td>'+this.categoryName+'</td>';
					}
					lists += '<td class="left" ';
					if(eval(boardMode) == 1){
						if(this.secret != "Y" || loginUserLevel < 4 || loginUserID == this.userID ){
							lists += 'onclick="viewAct('+this.seq +')"';
						}else{
							lists += 'onclick="modalAct(\''+useApi+'\','+this.seq+',\'viewCheck\')"';
						}
					}else if(eval(boardMode) == 4){
						lists += 'onclick="openView('+this.seq+')"';
					}
					lists += ' style="cursor:pointer">';
					if(this.replySeq != 0){
						lists += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;'
					}
					if(this.secret == 'Y'){
						lists += '<img src="../images/admin/icon_secret.png" />&nbsp;&nbsp;'
					}
					lists += this.subject;
					if(this.commentCount >= 1){
						lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
					}
					if(this.attachFile01Name != null || this.attachFile02Name != null ){
						lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
					}
					lists += '</td>';
					if (useName == 'Y'){
						lists += '<td>'+this.userName+'</td>';
					}
					if (useDateView == 'Y'){
						if (boardCode == 20) {
							lists += `<td>${this.startDate}~${this.endDate}</td>`;
						} else {
							lists += '<td>'+this.inputDate.substring(0,10)+'</td>';
						}
					}
					if (useHitView == 'Y' || loginUserLevel == 2){
						lists += '<td>'+this.hits+'</td>';
					}
					lists += '</tr>';
					i--
				})
			}else{
				lists += '<tr><td class="notResult" colspan="100%">게시글이 없습니다.</td></tr>'
			}
		}else if(eval(boardMode) == 2){ //겔러리형
		}else if(eval(boardMode) == 3){ //웹진형
		}else if(eval(boardMode) == 6){ //이벤트 게시판
			$.each(data.board, function(){
				if(pageMode == 'adminPage'){
					lists += '<li onclick="viewAct('+this.seq+')">'
				}else{
					if(subDomain != '') { // 사이버교육센터인경우 경로 수정
						var eventContent = this.content.split('/');
						lists += '<li onclick="top.location.href=\''+eventContent[2]+'\'">'
					} else {
						lists += '<li onclick="top.location.href=\''+this.content+'\'">'
					}
				}
				lists += '<img src="'+attachURL+this.attachFile01+'" alt="'+this.subject+'">'
				lists += '<h1>'+this.subject+'</h1>'
				lists += '<h2>'+this.addItem01+' ~ '+this.addItem02+'</h1>'
				if(pageMode == 'adminPage'){
					lists += '<button type="button" onclick="top.location.href=\''+this.content+'\'">이벤트미리보기</button>'
				}
				if(servTime >= this.addItem01+' 00:00' && servTime <= this.addItem02+' 00:00' ){
					lists += '<h3>이벤트가 진행중입니다.</h3>'
				}else{
					lists += '<h4>이벤트가 종료되었습니다.</h4>'
				}
				lists += '</li>'
			})
			$('.BBSList ul').addClass('eventList')
		}else if(eval(boardMode) == 7){ //수강후기
            var i = 1
            if(page == 1){
                i = 1
            }else{
                i = page * listCount + 1
            }
            limit = (page - 1) * listCount;
            i = data.totalCount - limit; //게시글 번호 역순

            lists += '<li class="reviewTitle">';
            lists += '<h1 style="width:5.5%">번호</h1>'
            lists += '<h1 style="width:15%">별점</h1>'
            lists += '<h1>과정명 / 내용</h1>'
            lists += '</li>';
            if(data.totalCount != 0 ){
                $.each(data.board, function(){
                    lists += '<li onclick="reviewAct(this)">';
                    lists += '<h1>'+i+'</h1>';
                    lists += '<h2 class="scroe'+this.addItem02+'">[ <strong>'+this.addItem02+'</strong>/5점 ]</h2>';
                    lists += '<div>';
                    lists += '<h1>['+this.subject+']</h1>';
                    lists += '<p>'+this.content+'</p>'
                    lists += '</div>';
                    lists += '</li>';
                    i--
                });
            }else{
                lists += '<li class="noList">게시글이 없습니다.</li>'
            }
            $('.BBSList ul').addClass('reviewList')
        } else if(eval(boardMode) == 8){	//영업자 선택 게시판
			if(eval(data.totalCount) != 0){
				var i = 1
				if(page == 1){
					i = 1
				}else{
					i = page * listCount + 1
				}

				limit = (page - 1) * listCount;
				i = data.totalCount - limit; //2017.1.25 게시글번호 역순처리

				$.each(data.board, function(){
                    lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td class="left" ';
					if(this.secret != "Y" || loginUserLevel < 4 || loginUserID == this.userID){
						lists += 'onclick="viewAct('+this.seq +')"';
					}else{
						lists += 'onclick="modalAct(\''+useApi+'\','+this.seq+',\'viewCheck\')"';
					}
					lists += ' style="cursor:pointer">';
					if(this.replySeq != 0){
						lists += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;'
					}
					if(this.secret == 'Y'){
						lists += '<img src="../images/admin/icon_secret.png" />&nbsp;&nbsp;'
					}
					lists += this.subject;
					if(this.commentCount >= 1){
						lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
					}
					if(this.attachFile01Name != null || this.attachFile02Name != null ){
						lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
					}
					lists += '</td>';
					if(this.addItem01){
						lists += '<td>'+this.managerID+'('+this.managerName+'/'+this.managerCompany+')</td>';
					}else{
						lists += '<td>전체</td>';
					}
					if (useName == 'Y'){
						lists += '<td>'+this.userName+'</td>';
					}
					if (useDateView == 'Y'){
						lists += '<td>'+this.inputDate.substring(0,10)+'</td>';
					}
					if (useHitView == 'Y'){
						lists += '<td>'+this.hits+'</td>';
					}
					lists += '</tr>';
					i--
				})
			}else{
				lists += '<tr><td class="notResult" colspan="20">게시글이 없습니다.</td></tr>'
			}
		}else if(eval(boardMode) == 9){	//입과 게시판
			var endDate = '';
			var sub = '';
			if(eval(data.totalCount) != 0){
				var i = 1
				if(page == 1){
					i = 1
				}else{
					i = page * listCount + 1
				}

				limit = (page - 1) * listCount;
				i = data.totalCount - limit;

				$.each(data.board, function(){
                    lists += '<tr';
                    if(this.status == 'Y'){
                        lists += ' style="background:#ecf0f1;"';
                    }
                    lists += '>';
					lists += '<td>'+i+'</td>';
					lists += '<td class="left" ';
					if(this.secret != "Y" || loginUserLevel < 4 || loginUserID == this.userID){
						lists += 'onclick="viewAct('+this.seq +')"';
					}else{
						lists += 'onclick="modalAct(\''+useApi+'\','+this.seq+',\'viewCheck\')"';
					}
					lists += ' style="cursor:pointer">';
					if(this.replySeq != 0){
						lists += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;'
					}
					if(this.secret == 'Y'){
						lists += '<img src="../images/admin/icon_secret.png" />&nbsp;&nbsp;'
					}
					lists += '<strong>사업주명 : ' + this.company + '</strong><br>과정명 : ' + this.subject + '<br>' + this.addItem01 + ' ~ ' + this.addItem02;
					if(this.commentCount >= 1){
						lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
					}
					if(this.attachFile01Name != null || this.attachFile02Name != null ){
						lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
					}
					lists += '</td>';
					if (useName == 'Y'){
						lists += '<td>'+this.userName+'<br>'+this.userID+'</td>';
					}
					if (useDateView == 'Y'){
						lists += '<td>'+this.inputDate+'</td>';
					}

					if(this.status == 'N'){ // 입과게시판 처리 상태
						lists += '<td style="color:blue;">처리중</td>';
					} else if(this.status == 'Y') {
						lists += '<td>입과완료</td>';
					} else if(this.status == 'C'){
						lists += '<td style="color:green;">접수완료</td>';
					} else if(this.status == 'W') {
						lists += '<td>대기</td>';
					} else if(this.status == 'R'){
						lists += '<td style="color:red;">보완</td>';
					} else if(this.status == 'X'){
						lists += '<td style="color:red;">입과취소</td>';
					}
					if(loginUserLevel == 2){
						lists += '<td>';
						lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
							'onclick="changeApplicationStatus(\''+this.seq+'\', \'C\', \'L\')">접수</button>&nbsp;';
						lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
							'onclick="changeApplicationStatus(\''+this.seq+'\', \'R\', \'L\')">보완</button>&nbsp;';
						lists += '<button type="button" style="background: #4d4d4f; color: white; border:none; width: 25%;" ' +
							'onclick="changeApplicationStatus(\''+this.seq+'\', \'Y\', \'L\')">완료</button>';
						lists += '</td>';
					}
					if (useHitView == 'Y'){
						lists += '<td>'+this.hits+'</td>';
					}
					lists += '</tr>';
					i--
				})
			}else{
				lists += '<tr><td class="notResult" colspan="20">게시글이 없습니다.</td></tr>'
			}
		} else if(eval(boardMode) == 10) {
			if(eval(data.totalCount) != 0){
				var i = 1
				if(page == 1){
					i = 1
				}else{
					i = page * listCount + 1
				}

				limit = (page - 1) * listCount;
				i = data.totalCount - limit;

				$.each(data.board, function(){
					lists += '<tr';
					if(this.status == 'Y'){
						lists += ' style="background:#ecf0f1;"';
					}
					lists += '>';
					lists += '<td>'+i+'</td>';
					lists += '<td ';
					if(this.secret != "Y" || loginUserLevel < 4 || loginUserID == this.userID){
						lists += 'onclick="viewAct('+this.seq +')"';
					}else{
						lists += 'onclick="modalAct(\''+useApi+'\','+this.seq+',\'viewCheck\')"';
					}
					lists += ' style="cursor:pointer">';
					if(this.replySeq != 0){
						lists += '<img src="../images/admin/icon_reply.png" />&nbsp;&nbsp;'
					}
					if(this.secret == 'Y'){
						lists += '<img src="../images/admin/icon_secret.png" />&nbsp;&nbsp;'
					}
					lists += this.subject;
					if(this.commentCount >= 1){
						lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
					}
					if(this.attachFile01Name != null || this.attachFile02Name != null ){
						lists += '&nbsp;&nbsp;<img src="../images/admin/icon_addfile.png" />'
					}
					lists += '</td>';
					if (useName == 'Y'){
						lists += '<td>'+this.userName+'<br>'+this.userID+'</td>';
					}
					if (useDateView == 'Y'){
						lists += '<td>'+this.inputDate+'</td>';
					}

					if (useHitView == 'Y'){
						lists += '<td>-</td>';
					} else {
						lists += '<td>-</td>';
					}
					lists += '</tr>';
					i--
				})
			}else{
				lists += '<tr><td class="notResult" colspan="20">게시글이 없습니다.</td></tr>'
			}
		}


		if(eval(boardMode) != 2 && eval(boardMode) != 3 && eval(boardMode) != 7){
			$('.BBSList tbody').html(lists)
		}else{
			$('.BBSList ul').html(lists)
		}
		pagerAct();
		pageMaxUp();
	})

}

function printContents(){
	loadingAct();
	let modal = '';
	modal += '<div id="modal">';
	modal += '<div style="width:50%; height:90%; margin:auto; overflow-y: scroll;" class="BBSList">';
	modal += `<div style="position:sticky; top:0; text-align:right; background:#4d4d4f; padding-right:15px; overflow:hidden;"><img src="../images/admin/btn_close.png" alt="닫기" style="cursor:pointer;" onClick="modalClose()"></div>`;
	modal += `<div style="font-size:14px;">
	<form action="" method="" style="width:80%; display:flex; align-items:center;">
	<input type="hidden" name="printCon" value="Y">
	<span>과정 검색&nbsp;</span>
	<select name="searchType" style="padding: 5px 2px;">
	<option value="lecture16" selected>디지털융합</option>
	<option value="lecture07">의료기관</option>
	<option value="lecture10">영유아교사</option>
	<option value="lecture09">경비원직무</option>
	<option value="lecture01">경영리더십</option>
	<option value="lecture02">업무스킬</option>
	<option value="lecture08">일반직무</option>
	<option value="lecture04">IT</option>
	<option value="lecture05">자격증</option>
	<option value="lecture06">외국어</option>
	<option value="lecture11">스틸전문</option>
	<option value="lecture14">플립러닝</option>
	<option value="lecture17">전문직무</option>
	<option value="lecture18">직무</option>
	<option value="lecture19">소양</option>
	<option value="card">기업직업훈련카드</option>
	<option value="lecture03">산업안전</option>
	<option value="lecture12">일반비환급</option>
	</select>&nbsp;
	<input type="text" name="searchValue" style="padding: 5px 2px; width:30%;">&nbsp;
	<button type="button" style="background:#4d4d4f; color:white; border:none; height:29px;" onClick="searchContents(this);">검색</button></form></div>`;
	modal += '<table style="width:100%; text-align:center;">';
	modal += '<thead><tr><th style="width:40%;">과정명</th><th>표준훈련비</th><th style="width:10%;">지정한도 인원</th><th style="width:10%;">수강인원</th></tr></thead>';
	modal += '<tbody id="modalBody" style="font-size:14px;">';
	$.ajax({
		url:'../api/apiContents.php',
		method:'GET',
		data:{printCon:'Y', searchType:'lecture16'},
		success: function(data){
			if(data.totalCount != 0){
				$.each(data.contents, function(){
				modal += `<tr><td style="width:50%;"><span style="color:black;">${this.contentsName}</span>
				<button type="button" style="background:#4d4d4f; color:white; border-radius:3px;" onClick="copyColumn(this)">복사</button></td>`;
				modal += `<td>${Number(this.selfPrice).toLocaleString()}원</td>`;
				if(Number(this.applyLimit) === 0){
					modal += `<td style="width:10%; color:red;">미지정</td>`;
				} else {
					modal += `<td style="width:10%;">${this.applyLimit}</td>`;
				}
				modal += `<td>${this.currentStudy}</td></tr>`;
				})
			}

			modal += '</tbody>';
			modal += '</table>';
			modal += '</div>';
			modal += '</div>';
			$('#contents').after(modal);
			modalAlign();
			loadingAct();
		}
	})


}

function copyColumn(btn){
	let context = $(btn).siblings()[0].innerHTML;
    console.log(context);
	navigator.clipboard.writeText(context)
        .then(()=>{

        });
}

function searchContents(btn){
	loadingAct();
	let modal = '';
	$.ajax({
		url:'../api/apiContents.php',
		method:'GET',
		data:$(btn).parent().serialize(),
		success: function(data){
			if(data.totalCount != 0){
				$.each(data.contents, function(){
				modal += `<tr><td style="width:50%;"><span style="color:black;">${this.contentsName}</span>
				<button type="button" style="background:#4d4d4f; color:white; border-radius:3px;" onClick="copyColumn(this)">복사</button></td>`;
				modal += `<td>${Number(this.selfPrice).toLocaleString()}원</td>`;
				if(Number(this.applyLimit) === 0){
					modal += `<td style="width:10%; color:red;">미지정</td>`;
				} else {
					modal += `<td style="width:10%;">${this.applyLimit}</td>`;
				}
				modal += `<td>${this.currentStudy}</td></tr>`;
				})
			} else {
				modal += '<tr><td class="noResult" colspan="10">검색결과가 없습니다.</td></tr>'
			}
			modal += '</table>';
			modal += '</div>';
			modal += '</div>';
			$('#modalBody').empty();
			$('#modalBody').html(modal);
			modalAlign();
			loadingAct();
		}
	})
}

function searchAct2(status){
	searchValue = $('.searchForm').serialize();
	searchValue = '&' + searchValue;
	searchValue += '&status='+status;
	page = 1;
	ajaxAct(searchValue);
}

function changeApplicationStatus(seq, status, flag){
    if(!confirm("변경하시겠습니까?")){
        return false;
    }
    loadingAct();
    $.ajax({
        url: useApi,
        method: 'POST',
        data: {seq:seq, status:status, boardCode:'16'},
        async: false,
        success:function(data){
            if(data.result == 'success'){
                alert('변경됐습니다.');
                if(flag == 'L'){
                    ajaxAct(param);
                } else if(flag == 'V'){
                    viewAct(seq);
                }
            } else {
                alert('오류가 발생했습니다.');
            }
            loadingAct();
        }

    });
}

function changeAllStatus(status){
    let searchValue = document.getElementsByName('searchValue')[0].value;
    let dates = document.getElementsByName('date')[0].value;

    if(searchValue == '' && dates == ''){
        alert("검색 후 일괄 변경 가능합니다.");
        return false;
    }

    if(!confirm("일괄 변경 하시겠습니까? ")){
        return false;
    }

    loadingAct();
    $.ajax({
        url: useApi,
        method: "PUT",
        data: param + '&status=' + status,
        async: false,
        success: function(data){
            if(data.result == 'success'){
                alert('변경 성공');
            } else {
                alert('오류가 발생했습니다.');
            }
            ajaxAct(param);
            loadingAct();
        }
    });
}

function updateListCount(value){
    listCount = value;
}

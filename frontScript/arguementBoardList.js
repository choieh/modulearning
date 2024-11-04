//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

if(loginUserID == ""){
	alert("로그인 후 이용 가능합니다.");
	top.location.href="../main/";
}
//리스트 소팅
var categoryLink = ''//카테고리 사용시 선택 메뉴탭
var sortData = ''; // 넘길 url값
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
			//상단 액션 부분	
			var today = new Date();
			var urlDate = $.urlParam('addItem01');
			var urlTitle = decodeURI($.urlParam('subject').replace(/\+/g,' '));
			if(urlTitle.length > 12){
				urlTitle = urlTitle.substring(0,12)+'...';
			}
			var titleHtml =  urlDate+'<span>'+ urlTitle +'</span>';
				
			if(pageMode=='adminPage'){
				$('#contents > h1').html(titleHtml);
			}else{
				$('#titleArea > h2 > strong').html(urlDate);
				$('#titleArea > h1').html(urlTitle);
			}
		
			listPage = listPage ? listPage : 1;
			page = listPage;
			//상단 액션 부분
			if(useSearch == "Y"){
				var actionArea = '';
				actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
				actionArea += '<input type="hidden" name="hitOrderBy">';
				if(eval(writePermit) >= eval(loginUserLevel) && eval(boardMode) != 7){
					if(checkDate > endDate[0] && endDate[1] > checkDate){ 
						actionArea += '<button type="button" class="fRight" onClick="writeAct()">새글쓰기</button>';
					}
				}
				actionArea += '<select name="searchType">';
				actionArea += '<option value="subject">제목</option>';
				actionArea += '</select>&nbsp;';
				actionArea += '<input name="searchValue" type="text" />&nbsp;';
				actionArea += '<button type="button" onClick="searchAct()">검색하기</button><span>';

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
			if(boardMode == 1  || boardMode == 4 || boardMode == 8 || boardMode == 9){
				contents += '<table><thead><tr>';
				contents += '<th style="width:50px">번호</th>';
				if (useCategory == 'Y'){
					contents += '<th style="width:10%;">카테고리</th>';
				}
				contents += '<th class="left">제목</th>';
				if (boardMode == 9){
					contents += '<th style="width:15%;">수강시작일</th>';
				}
				if (boardMode == 8){
					contents += '<th style="width:15%;">공개</th>';
				}
				if (useName == 'Y'){
					contents += '<th style="width:15%;">작성자</th>';
				}
				if (useDateView == 'Y'){
					contents += '<th style="width:120px">작성일</th>';
				}
				if (useHitView == 'Y' || loginUserLevel == 2){
					contents += '<th style="width:80px" onClick="globalModalAct(\'boardHit\')">조회수</th>';
				}
				contents += '</tr></thead><tbody>';
				contents += '</tbody></table>';

			}else{
				contents += '<ul></ul>';
			}
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSList')
			$('#contentsArea').html(contents);
			sortData = '&addItem02='+$.urlParam('addItem02');
			ajaxAct(sortData);
		})
	})
}

function ajaxAct(sortData){
	//게시물 소팅부분
	sortData = sortData ? sortData : '';//검색을 위한 소팅
	var lists = '';
	var listAjax = $.get(useApi,'boardCode='+boardCode+'&page='+page+'&list='+listCount+'&addItem02='+option+sortData+categoryLink,function(data){
		
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
							if(this.secret != "Y" ){ //|| loginUserType == 'admin' || loginUserID == this.userID
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
					if(this.titleSubject =='Y'){
						lists += '<tr class="notice"><td>토론주제</td>';
						lists += '<td onclick="viewAct('+this.seq+')"><b>'+this.subject+'</b>';
						lists += '- '+this.addItem01+'</td>';
						if(this.commentCount >= 1){
							lists += '&nbsp;&nbsp;<span>['+this.commentCount+']</span>'
						}
						lists += '<td>'+this.userName+'</td>';
						lists += '<td>'+this.inputDate.substring(0,10)+'</td>';
						if (useHitView == 'Y' || loginUserLevel == 2){
						lists += '<td>'+this.hits+'</td>';
						}	
						lists += '</tr>';
						i--;
					}else if(this.titleSubject == 'N'){
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
						if(this.secret != "Y" || loginUserType == 'admin' || loginUserID == this.userID ){
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
						if (this.userName.length == 2){
							lists += '<td class="category">'+this.userName.substring(0,1)+'*';
						}else if( this.userName.length == 3){
							lists += '<td class="category">'+this.userName.substring(0,1)+'*'+this.userName.substring(2,3);					
						}else{
							var aa = '';
							for(j=0;this.userName.length-2 > j; j++){
								aa += '*';	
							}
							lists += '<td class="category">'+this.userName.substring(0,1)+aa+this.userName.substring(this.userName.length-1,this.userName.length);
						}
					}
					if (useDateView == 'Y'){
						lists += '<td>'+this.inputDate.substring(0,10)+'</td>';						
					}
					if (useHitView == 'Y' || loginUserLevel == 2){
						lists += '<td>'+this.hits+'</td>';
					}
					lists += '</tr>';
					i--
					}
				})
			}else{
				lists += '<tr><td class="notResult" colspan="20">게시글이 없습니다.</td></tr>'
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
					if(this.secret != "Y" || loginUserType == 'admin' || loginUserID == this.userID){
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
		}else if(eval(boardMode) == 9){	//수강요청 게시판
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
					lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td class="left" ';
					if(this.secret != "Y" || loginUserType == 'admin' || loginUserID == this.userID){
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
					lists += '<td>'+this.addItem02+'</td>';	
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

// //조회수별 정렬
// function boardHitOrderBy(){
// 	searchValue = "&hitOrderBy=DESC";
// 	page = 1;
// 	ajaxAct(searchValue);
// }
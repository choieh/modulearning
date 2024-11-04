//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅

function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
    var year= today.getFullYear();
    var mon = (today.getMonth()+1)>9 ? ''+(today.getMonth()+1) : '0'+(today.getMonth()+1);
    var day = today.getDate()>9 ? ''+today.getDate() : '0'+today.getDate();
    var todayDate = year + '-' + mon + '-' + day;
    //var searchDate = todayDate;
	//var startDate = '';
	//var endDate = '';
	var today = new Date();
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div>';
	actionArea += '<span>기간</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+todayDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+todayDate+'" readonly="readonly" /></div>';
	actionArea += '</div><div>';
	actionArea += '<span>발송구분</span>';
	actionArea += '<select name="sendMethod">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="sms">SMS(문자)</option>';
	actionArea += '<option value="email">E-MAIL(이메일)</option>';
	actionArea += '<option value="kakaoAtalk">카카오 알림톡</option>';
    actionArea += '</select>&nbsp;';
	actionArea += '<span>수강생</span>';
    actionArea += '<input type="text" style="width:100px;" name="userName">';
    actionArea += '<span>사업주</span>';
    actionArea += '<input type="text" style="width:100px;" name="companyName">';
    actionArea += '<span>과정명</span>';
    actionArea += '<input type="text" style="width:100px;" name="contentsName"> ';
	actionArea += '</div>';
	actionArea += '<button type="submit" class="allWidth">검색</button></form>';
	actionArea += '</form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	pickerAct();//데이트피커 사용

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:150px;">발송정보</th>';
	contents += '<th style="width:200px;">학습자 정보</th>';
	contents += '<th>과정명<br />수강기간</th>';
	contents += '<th style="width:190px;">내용보기<br />수신예정시간</th>';
	contents += '<th style="width:200px;">수신 / 발신</th>';
	contents += '<th style="width:200px;">발송자<br />등록시간</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="7">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&gubun='+gubun+'&list='+listCount+sortData,function(data){
		console.log(data);
		//alert(useApi);
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.sendLog,  function(){
					lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td>'+this.sendMethod+'<br />'+this.sendType+'</td>';
					lists += '<td>'
					lists += '<a href="javascript:globalModalAct(\'companyView\',\'\','+this.companyCode+')">'+this.companyName+'</a><br />';
					lists += '<a href="javascript:globalModalAct(\'memberView\',\'\',\''+this.userID+'\')">'+this.userID+'<br/>'+this.userName+'</a></td>';
					lists += '<td onClick="globalModalAct(\'contentsView\',\'\',\''+this.contentsCode+'\')" style="cursor:pointer;">'+this.contentsName+'<br/>';
					lists += this.lectureStart+' ~ '+this.lectureEnd+'</td>';
					lists += '<td><button type="button" onclick=viewMessage('+this.seq+')>내용보기</button><br />'+this.sendDate+'</td>';
					lists += '<td>수신 : '+this.receiveTarget+'<br />발신 : '+this.sendTarget+'</td>';
					lists += '<td>'+this.sendID+'<br >'+this.inputDate+'</td>';
					lists += '</tr>';
					i--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="10">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="10">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}

function viewMessage(viewSeq){
	var modalWrite =''
	modalWrite +='<div id="modal">';
	modalWrite += '<div class="messageView">';
	modalWrite += '<h1>발송메세지 확인<button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
	modalWrite += '<div class="BBSWrite">'
	modalWrite += '<h1>메세지 내용</h1>'
	modalWrite += '<ul>'
	modalWrite += '</ul>'
	modalWrite += '<div class="btnArea">'
	modalWrite += '<button type="button" onclick="modalClose()">닫기</button>'
	modalWrite += '</div>'
	modalWrite +='</div>';
	$('#contents').after(modalWrite)
	modalAlign();
	viewMessageType(viewSeq)
}
function viewMessageType(viewSeq){
	var messageWrite = ''
	$.get(useApi,{'seq':viewSeq},function(data){
		var types = data.sendLog[0].sendMethod;
		messageWrite += '<li><h1>학습자 (아이디)</h1>'+data.sendLog[0].userName+'<span>&nbsp;('+data.sendLog[0].userID+')</span></li>'
		if(types == 'sms'){
			messageWrite += '<li><h1>발송방식</h1>문자메세지</li>';
		}else if (types == 'kakaoAtalk') {
			messageWrite += '<li><h1>발송방식</h1>카카오 알림톡</li>';
		}else{
			messageWrite += '<li><h1>발송방식</h1>이메일발송</li>';
		}
		messageWrite += '<li><h1>연락처</h1>'+data.sendLog[0].receiveTarget+'</li>';
		messageWrite += '<li>'
		messageWrite += '<textarea name="sendMessage" readonly="readonly">'+data.sendLog[0].message+'</textarea>';
		messageWrite += '</li>'
		$('#modal div.BBSWrite ul').html(messageWrite)
	})
}





function listAct(page){
	//상단 액션 부분	
	var actionArea = '';
	
    var today = new Date();
    var year= today.getFullYear();
    var mon = (today.getMonth()+1)>9 ? ''+(today.getMonth()+1) : '0'+(today.getMonth()+1);
    var day = today.getDate()>9 ? ''+today.getDate() : '0'+today.getDate();
    var todayDate = year + '-' + mon + '-' + day;
    var searchDate = todayDate;

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div>'
    actionArea += '발신 일자 : <div class="datePicker"><input type="text" name="searchDate" class="cal" value="'+searchDate+'" readonly="readonly" /></div>';
	actionArea += '전체실패건<input type="checkbox" id="allError" name="allError" value="Y"><label for="allError"></label>';
    actionArea += '&nbsp;&nbsp;이름 : <input type="text" name="userName">';	
    //actionArea += '<button type="button" class="fRight">문자 재발송</button>'
    actionArea += '</div>'
    actionArea += '<button type="submit" class="allWidth">검색</button>';
	actionArea += '</form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
    pickerAct();//데이트피커 사용

	//게시물 소팅부분
	var contents = '';
	contents += '<table>';
    contents += '<colgroup>';
    contents += '<col style="width:60px">';
    contents += '<col style="width:100px">';
	contents += '<col style="width:100px">';
	contents += '<col style="width:160px">';
    contents += '<col style="width:100px">';
    contents += '<col style="width:120px">';
    contents += '<col style="width:320px">';
    contents += '<col style="width:100px">';
    contents += '</colgroup>'
    contents += '<thead><tr>';
	contents += '<th>번호</th>';
    contents += '<th>실패사유</th>';
	contents += '<th>문자전송유무</th>';
	contents += '<th>소속</th>';
    contents += '<th>이름</th>';
	contents += '<th>연락처</th>';
    contents += '<th>내용</th>';
    contents += '<th>발신시간</th>';
    //contents += '<th><input type="checkbox" id="resend"><label for="resend">재발송</label></th>';
	contents += '</tr></thead><tbody>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(sortDatas){
    sortDatas = sortDatas ? sortDatas : '';
    if(sortDatas != ''){
		sortData = sortDatas
	}
    $.get('../api/apiKakaoLog2.php','&page='+page+'&list='+listCount+sortData,function(data){
        var lists = '';
        totalCount = data.totalCount;
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
        if(totalCount != 0){ 
            $.each(data.sendLog, function(){
                lists += '<tr>';
                lists += '<td>'+i+'</td>';
                lists += '<td>'+this.errorMessage+'</td>';
				if ( this.smsMessage != '알림톡 수신완료' ) {
					lists += '<td><span style="color:red">'+this.smsMessage+'</span></td>';
				} else {
					lists += '<td>'+this.smsMessage+'</td>';
				}				
				lists += '<td>'+this.companyName+'</td>';
                lists += '<td>'+this.userName+'</td>';
				lists += '<td>'+this.phone+'</td>';
                lists += '<td class="left">'+this.msg+'</td>';
                lists += '<td>'+this.sendDate+'</td>';
                lists += '</tr>';
                i--;
            })
        }else{
            lists = '<tr><td colspan="8">검색 결과가 없습니다.</td></tr>';
        }
        $('.BBSList tbody').html(lists);
        pagerAct();

    })
}
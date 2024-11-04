function listAct(page){
	//상단 액션 부분
	var actionArea = '';
	var messageType = '';

    var today = new Date();
    var year= today.getFullYear();
    var mon = (today.getMonth()+1)>9 ? ''+(today.getMonth()+1) : '0'+(today.getMonth()+1);
    var day = today.getDate()>9 ? ''+today.getDate() : '0'+today.getDate();
    var todayDate = year + '-' + mon + '-' + day;
    var searchDate = todayDate;

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div>';
    actionArea += '<span>예약일자</span><div class="datePicker"><input type="text" name="searchDate" class="cal" value="'+searchDate+'" readonly="readonly" /></div>';
	actionArea += '<input type="radio" name="messageType" value="ATALK" id="ATALK" checked="checked"><label for="ATALK" style="margin-left:10px;">알림톡</label>';
    actionArea += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="messageType" value="SMS" id="smt"><label for="smt">단문</label>';
    actionArea += '<input type="radio" name="messageType" value="MMS" id="mmt"><label for="mmt" style="margin-right:10px;">장문</label>';
	actionArea += '&nbsp;&nbsp;&nbsp;&nbsp;<span>이름</span><input type="text" name="userName" style="width:100px">';
	//actionArea += '&nbsp;&nbsp;&nbsp;&nbsp;<span>영업담당자</span><input type="text" name="marketerName" style="width:100px">';
	actionArea += '<span>업체명</span><input type="text" name="companyName">';
	actionArea += '<span>페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
	actionArea += '</select>';
	actionArea += '<button type="submit" class="allWidth" style="width:auto;font-weight:normal;margin-left:5px;">검색</button>';
	actionArea += '<button type="button" class="fRight" onClick="monthDelete()">전체삭제</button>'
	actionArea += '<button type="button" class="fRight" onClick="selectDelete()">선택삭제</button>'
	actionArea += '<div>';
	actionArea += '</form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
    pickerAct();//데이트피커 사용

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;"><input type="checkbox" id="rslCheck" onChange="checkboxAllCheck(\'rslCheck\')" /><label for="rslCheck"></label></th>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:150px;">발신시간</th>';
	contents += '<th style="width:150px;">예약일자</th>';
	contents += '<th style="width:140px;">소속</th>';
	//contents += '<th style="width:140px;">영업자</th>';
	contents += '<th style="width:140px;">학습자</th>';
	contents += '<th>내용보기<br />수신예정시간</th>';
	contents += '<th style="width:80px;">삭제</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="8">검색값을 선택하세요.</td></tr>';
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
    $.get('../api/apiReserveKakao.php','&page='+page+'&list='+listCount+sortData,function(data){
        var lists = '';
        totalCount = data.totalCount;
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
        if(totalCount != 0){
            $.each(data.reserveKakao, function(){
				lists += '<tr>';
				lists += '<td><input type="checkbox" class="rslCheck" id="rslCheck_'+this.TRAN_PR+'" name="rslCheck[]" value="'+this.TRAN_PR+'" /><label for="rslCheck_'+this.TRAN_PR+'"></label></td>';
                lists += '<td>'+i+'</td>';
                lists += '<td>'+this.requestDate+'</td>';
				lists += '<td>'+this.sendDate+'</td>';
				lists += '<td>'+this.companyName+'</td>';
				//lists += '<td><a href="javascript:globalModalAct(\'memberView\',\'\',\''+this.marketerID+'\')">'+this.marketerName+'('+this.marketerID+')</a></td>';
				lists += '<td>'+this.userName+'</td>';
				//lists += '<td>'+this.companyName+'<br>'+this.userName+'<br>'+this.recipient_num+'</td>';
                lists += '<td>'+this.msg+'</td>';
                lists += '<td><button type="button" onClick="kakaoDelete(\''+this.TRAN_PR+'\')">삭제</button></td>';
                lists += '</tr>';
                i--;
            })
        }else{
            lists = '<tr><td colspan="8">검색 결과가 없습니다.</td></tr>';
        }
        $('.BBSList tbody').html(lists);
        pagerAct();
		loadingAct();
    })
}

function kakaoDelete(TRAN_PR){
	var messageType = $('input[name=messageType]:checked').val();
	if(confirm('해당 정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: '../api/apiReserveKakao.php',
			type:'DELETE',
			data:'kakaoDelete=Y&TRAN_PR='+TRAN_PR+'&messageType='+messageType,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

function monthDelete(){
	var delData = $('form.searchForm').serialize();
	//console.log(delData)
	if(confirm('예약발송내역을 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: '../api/apiReserveKakao.php',
			type:'DELETE',
			data:delData,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

function selectDelete() {
	var items=[];
	var messageType = $('input[name="messageType"]:radio:checked').val();
	$('input[name="rslCheck[]"]:checkbox:checked').each(function(){
		items.push('\''+$(this).val()+'\'');
	});
	var rslData = items.join(',');
	//alert(messageType);
	if(confirm("선택된 예약발송내역을 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.")){
		$.ajax({
			method:'DELETE',
			url:'../api/apiReserveKakao.php',
			dataType:'text',
			data: {'rslData':rslData,'selectDel':'Y',messageType:messageType},
			success:function(data){
				alert('선택된 예약발송내역이 삭제 되었습니다.')
				ajaxAct()
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}
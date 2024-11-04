
//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var optSort01 = '';
	var division ='';
		/*
		optSort01 += '<option value="all">전체</option>';
		$.each(data.category,function(){
			division = this.division;
			optSort01 += '<option value="'+this.value01+'">';
			optSort01 += this.value02;
			optSort01 += '</option>'
		})
		*/


		var today = new Date();
		var year= today.getFullYear();
		var mon = (today.getMonth()+1)>9 ? ''+(today.getMonth()+1) : '0'+(today.getMonth()+1);
		var day = today.getDate()>9 ? ''+today.getDate() : '0'+today.getDate();
		var todayDate = year + '-' + mon + '-' + day;
		var startDate = todayDate;
		var endDate = todayDate;

		actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:ajaxAct()">';
		actionArea += '<div>';

		actionArea += '<div class="searchChangeArea">'
		actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" />';
		actionArea += '<label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
		actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchMonth" value="searchMonth" onChange="searchTypeSelect(this.value)" />';
		actionArea += '<label for="searchMonth">월별검색</label>&nbsp;&nbsp;&nbsp;'
		actionArea += '<div id="monthDiv" style="display:inline;">';
		actionArea += '<select name="searchYear">';
		var i= '';
		var thisYear = today.getFullYear();
		for (i= 2015; i <= thisYear; i++) {
			if (i != thisYear) {
				actionArea += '<option value="'+i+'">'+i+'년</option>';
			} else {
				actionArea += '<option value="'+i+'" selected="selected">'+i+'년</option>';
			}
		}
		actionArea += '</select>';
		actionArea += '<select name="searchMonth">';
		//actionArea += '<option value="0">전체</option>';
		var h= '';
		var thisMonth = today.getMonth()+1; //January is 0!
		for (h = 1; h <= 12; h++) {
			if (h != thisMonth) {
				actionArea += '<option value="'+h+'">'+h+'월</option>';
			} else {
				actionArea += '<option value="'+h+'" selected="selected">'+h+'월</option>';
			}
		}
		actionArea += '</select>';
		actionArea += '</div>';
		actionArea += '<div id="dateDiv" style="display:inline;">';
		actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" style="cursor:pointer"/></div>&nbsp;~&nbsp;';
		actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal" value="'+endDate+'" readonly="readonly" style="cursor:pointer"/></div>';
		actionArea += '</div>';
		actionArea += '<input type="hidden" name="tranId" value="211" >';
		actionArea += '<input type="hidden" name="division" value="211" >';
		actionArea += '<button type="submit" style="margin-left:20px;">검색</button>';
		actionArea += '</div>';

		actionArea += '</div></form></div>';
		$('#contents > h1').after(actionArea);
		pickerAct();//데이트피커 사용

		//게시물 소팅부분
		var contents = '';
		contents += '<table><thead><tr>';
		contents += '<th colspan="3" style="width:200px;">성공건수</th>';
		contents += '<th colspan="4" style="width:200px;">공급가액 (알림톡 무료건수 5,500건) </th>';
		contents += '<th rowspan="2" style="width:200px;">부가세</th>';
		contents += '<th rowspan="2" style="width:200px;">총금액 (기본료 50,000원)</th>';
		contents += '</tr><tr>';
		contents += '<th style="width:200px;">알림톡</th>';
		contents += '<th style="width:200px;">SMS</th>';
		contents += '<th style="width:200px;">LMS</th>';
		contents += '<th style="width:200px;">알림톡</th>';
		contents += '<th style="width:200px;">SMS</th>';
		contents += '<th style="width:200px;">LMS</th>';
		contents += '<th style="width:200px;">소계</th>';
		contents += '</tr></thead><tbody>';
		contents += '<tr><td class="notResult" colspan="12">검색값을 선택하세요.</td></tr>'	;
		contents += '</tbody></table>';
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		searchTypeSelect('searchDate');
}

function ajaxAct(){
	loadingAct();
	var serializeData = $('.searchForm').serialize();

	$.ajax({
		type : 'GET',
		url : '/api/apiKakaoTotalPrice.php',
		data : serializeData,
		dataType : "json",
		jsonp : "callback",
		jsonpCallback:"callbackData",
		success: function(data) {
			var lists = '';
			lists += '<tr>';
			lists += '    <td>'+toPriceNum(data.totalAtalk)+'</td>';
			lists += '    <td>'+toPriceNum(data.totalSms)+'</td>';
			lists += '    <td>'+toPriceNum(data.totalLms)+'</td>';
			lists += '    <td>'+toPriceNum(data.priceA)+'</td>';
			lists += '    <td>'+toPriceNum(data.priceB)+'</td>';
			lists += '    <td>'+toPriceNum(data.priceC)+'</td>';
			lists += '    <td>'+toPriceNum(data.totalPrice)+'</td>';
			lists += '    <td>'+toPriceNum(data.totalBu)+'</td>';
			lists += '    <td>'+toPriceNum(data.totalAllPrice)+'</td>';
			lists += '</tr>';

			$('.BBSList tbody').html(lists);
			pagerAct();
			loadingAct();
		}
	});
}

function searchTypeSelect(type) {
	if (type == 'searchDate') {
		$('#dateDiv').show();
		$('#monthDiv').hide();
	} else {
		$('#dateDiv').hide();
		$('#monthDiv').show();
	}
}

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

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
    actionArea += '<span>기간검색</span>'
	actionArea += '<select name="searchYear">';
	actionArea += '<option value="">전체</option>';
	var i= '';
	var thisYear = today.getFullYear();
	for (i= 2015; i <= thisYear; i++) {
		if (i != thisYear) {
			actionArea += '<option>'+i+'년</option>';
		} else {
			actionArea += '<option selected="selected">'+i+'년</option>';
		}

	}
    actionArea += '</select>';
	actionArea += '<select name="searchMonth">';
	actionArea += '<option value="">전체</option>';
	var h= '';
	var thisMonth = today.getMonth()+1; //January is 0!
	for (h = 1; h <= 12; h++) {
		if (h != thisMonth) {
			actionArea += '<option>'+h+'월</option>';
		} else {
			actionArea += '<option selected="selected">'+h+'월</option>';
		}

	}
	actionArea += '</select>';
	//actionArea += '<span style="width:70px;">환급/비환급</span>';
	//actionArea += '<select name="serviceType">';
	//actionArea += '<option value="">전체</option>';
	//actionArea += '<option value="1">환급</option>';
	//actionArea += '<option value="3,5">비환급</option>';
	//actionArea += '</select>';
	if (loginUserLevel <= 8) {
		actionArea += '<button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
	}
	actionArea += '&nbsp;&nbsp;<button type="submit">검색</button></form>';
	actionArea += '</div>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	// contents += '<table><thead><tr>';
	// contents += '<th style="width:50px;">번호</th>';
	// contents += '<th style="width:70px;">대분류</th>';
	// contents += '<th style="width:70px;">소분류</th>';
	// contents += '<th style="width:170px;">수강기간</th>';
	// contents += '<th style="width:203px;">교육명</th>';
	// contents += '<th style="width:50px">수강인원</th>';
	// contents += '<th style="width:50px">수료인원</th>';
	// contents += '<th style="width:70px">교육비</th>';
	// contents += '<th style="width:70px">환급비</th>';
	// contents += '<th style="width:70px">구분</th>';
	// contents += '<th style="width:143px">사업자명<br />사업자번호</th>';
	// contents += '<th style="width:50px">대표<br/>이사명</th>';
	// contents += '<th style="width:150px">사업장주소</th>';
	// contents += '<th style="width:100px">업종<br />업태</th>';
	// contents += '<th style="width:80px">세금계산서용<br/>Email</th>';
	// contents += '<th style="width:80px">교육담당자<br/>Email</th>';
	// contents += '</tr></thead><tbody>';
	// contents += '</tbody></table>';

	contents += '<table><thead><tr>';
	contents += '<th style="width:2%;">번호</th>';
	contents += '<th style="width:5%;">대분류</th>';
	contents += '<th style="width:5%;">소분류</th>';
	contents += '<th style="width:7%;">수강기간</th>';
	contents += '<th style="width:13%;">교육명</th>';
	contents += '<th style="width:2%">수강인원</th>';
	contents += '<th style="width:2%">수료인원</th>';
	contents += '<th style="width:4%">교육비</th>';
	contents += '<th style="width:4%">환급비</th>';
	contents += '<th style="width:4%">구분</th>';
	contents += '<th style="width:10.5%">사업자명<br/>사업자번호</th>';
	contents += '<th style="width:6.25%">대표<br/>이사명</th>';
	contents += '<th style="width:10.5%">사업장주소</th>';
	contents += '<th style="width:12.25%">업종<br />업태</th>';
	contents += '<th style="width:6.25%">세금계산서용<br/>Email</th>';
	contents += '<th style="width:6.25%">교육담당자<br/>Email</th>';
	contents += '</tr></thead><tbody>';
	contents += '</tbody></table>';

	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='taxExcel.php?'+searchValue;
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var midStatus = '';
		var testStatus = '';
		var reportStatus = '';
		var totalScore = '';
		var testCopy = '';
		var reportCopy = '';
		var passOK = '';
		var serviceType = '';
		var j = totalCount;
		var testOverTime ='';
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			$.each(data.tax, function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.sort01+'</td>';
				lists += '<td>'+this.sort02+'</td>';
				lists += '<td>'+this.lectureStart+' ~ '+this.lectureEnd+'-'+this.lectureEndDay+'</td>';
				lists += '<td>'+this.contentsName+'</td>';
				//if (this.serviceType == '1') {
				//	lists += '<td>환급</td>';
				//} else {
				//	lists += '<td>비환급</td>';
				//}
				lists += '<td>'+this.countUser+'</td>';
				lists += '<td>'+this.passOK+'</td>';
				lists += '<td>'+toPriceNum(this.totalPrice)+'</td>';
				/*if (this.serviceType == '1') {
					lists += '<td>'+this. +'</td>';
					lists += '<td>'+toPriceNum(this.passNoPrice1)+'</td>';
				} else {
					lists += '<td>'+this.passNO3+'</td>';
					lists += '<td>'+toPriceNum(this.passNoPrice3)+'</td>';
				}*/
				lists += '<td>'+toPriceNum(this.totalrPrice1)+'</td>';
				var gubun = '';
				if(this.serviceType == '1') {
					gubun = '환급';
				} else {
					gubun = '비환급';
				}
				lists += '<td>'+gubun+'</td>';
				lists += '<td>'+this.companyName+'<br />'+this.companyCode+'</td>';
				lists += '<td>'+this.ceoName+'</td>';
				if(this.address02) {
					lists += '<td>'+this.address01+' '+this.address02+'</td>';
				}else {
					lists += '<td>'+this.address01+'</td>';
				}
				lists += '<td>'+this.part+'<br />'+this.kind+'</td>';
				if (this.elecEmail01) {
					lists += '<td>'+this.elecEmail01+'@'+this.elecEmail02+'</td>';
				} else {
					lists += '<td></td>';
				}
				if (this.email01) {
					lists += '<td>'+this.userName+'<br />'+this.email01+'@'+this.email02+'</td>';
				} else {
					lists += '<td></td>';
				}
				lists += '</tr>';
				j --;
			});
		}else{
			lists += '<tr><td class="notResult" colspan="14">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		//pagerAct();
		loadingAct();
	})
}




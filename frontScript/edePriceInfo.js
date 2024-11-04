//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var useApi = '../api/apiEduPriceInfo.php';
var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = listCount ? listCount :10;
var pagerCount = 10; //페이저카운트


optWrite = new Array();


//리스트 소팅
function listAct(page){
	//상단 액션 부분
	var actionArea='';
	$.get(categoryApi,{'value01':'lectureCode'},function(data){
		var optSort01 = '';
		optSort01 += '<option value="all">전체</option>';
		$.each(data.category,function(){
			optSort01 += '<option value="'+this.value01+'">';
			optSort01 += this.value02;
			optSort01 += '</option>'
		})
	var sort01='';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()"  >';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<span>과정검색</span><input type="text" name="contentsName" placeholder="과정명 입력">';
	actionArea += '<span>과정검색</span><input type="text" name="contentsCode" placeholder="과정코드 입력">';
	actionArea += '<span>기간</span><select name="searchYear">';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear+5; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}
	}
	actionArea += '</select>';

	actionArea += '<span>수강여부</span><select name="studyCheck">';
	actionArea += '<option value="all">전체</option>';
	actionArea += '<option value="Y">등록</option>';
	actionArea += '</select>';

	actionArea += '<span>공개여부</span><select name="enabled">';
	actionArea += '<option value="all">전체</option>';
	actionArea += '<option value="Y">공개</option>';
	actionArea += '<option value="N">비공개</option>';
	actionArea += '</select>';

	actionArea += '<span>대분류</span><select name="sort01" onchange="changeSort2(this,\'\');">'+optSort01+'</select> ';

	actionArea += '<button style="margin-left:10px; float:right;" type="button" onClick="eduPriceExcel()" >엑셀 다운로드</button>';
	actionArea += '<button style="float:right;"type="submit">검색</button>'
	actionArea += '</div>';
	
	
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);
	$('#contents').removeAttr('class');
	$('#contents').addClass('BBSWrite');

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';

	contents += '<th style="width:40px;">번호</th>';
	contents += '<th style="width:70px;">과정코드</th>';
	contents += '<th style="width:110px;">대분류<br/>소분류</th>';
	contents += '<th style="width:300px;">과정명</th>';
	contents += '<th style="width:54px;">총차시</th>';
	contents += '<th style="width:54px;">교육시간</th>';
	contents += '<th style="width:100px;">한도액</th>';
	contents += '<th style="width:100px;">현재 교육비</th>';
	contents += '<th style="width:100px;">신청가능 교육비</th>';
	contents += '<th style="width:100px;">신청가능 교육비<br/>(수료기준)</th>';
	contents += '<th style="width:100px;">신청가능 교육비<br/>(미수료차감)</th>';
	contents += '<th style="width:70px;">콘텐츠 유효기간</th>';
	contents += '<th style="width:90px;">인정만료일</th>';

	//if(loginUserLevel < 5){
	//  contents += '<th style="width:50px;">삭제</th>';
	//}
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="15">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>'
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	})
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.contents, function(){
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.contentsCode+'</td>';

				if(this.sort01Name == null || this.sort01Name == ""){
					lists += '<td>대분류 미지정<br/>소분류 미지정</td>';					
				}else if (this.sort02Name == null || this.sort02Name == ""){
					lists += '<td>'+this.sort01Name+'<br/>소분류 미지정</td>';
				}else{
					lists += '<td>'+this.sort01Name+'<br/>'+this.sort02Name+'</td>';
				}

				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td>'+this.chapter+'</td>';
				lists += '<td>'+this.contentsTime+'</td>';

				//한도액
				if(this.eduLimitPay ==0 || this.eduLimitPay ==null || this.eduLimitPay == ''){
					lists += '<td>미지정</td>';
				}else{
					lists += '<td>'+toPriceNum(this.eduLimitPay)+'</td>';
				}

				//현재 교육비
				if(this.studyPrice != null){
				lists += '<td>'+toPriceNum(this.studyPrice)+'</td>';
				}else{
				lists += '<td>0</td>';	
				}
				//신청가능 교육비
				if(this.eduLimitPay-this.studyPrice > 0){
					lists += '<td>'+toPriceNum(this.eduLimitPay-this.studyPrice)+'</td>';
				}else if(this.eduLimitPay ==0 || this.eduLimitPay ==null || this.eduLimitPay == '' || this.studyPrice == 0){
					lists += '<td>-</td>';
				}else{
					lists += '<td style="color:red;">초과</td>';
				}

				// 수료기준 신청가능 교육비
				//console.log(this.studying);
				if(this.eduLimitPay-this.passOKPrice-this.studying > 0){
					lists += '<td>'+toPriceNum(this.eduLimitPay - this.passOKPrice - this.studying)+'</td>';
				}else if(this.eduLimitPay ==0 || this.eduLimitPay ==null || this.eduLimitPay == '' || this.studyPrice == 0){
					lists += '<td>-</td>';
				}else{
					lists += '<td style="color:red;">초과</td>';
				}
				
				if(this.eduLimitPay-this.noPassOKPrice > 0){
					lists += '<td>'+toPriceNum(this.eduLimitPay-this.noPassOKPrice)+'</td>';
				}else if(this.eduLimitPay ==0 || this.eduLimitPay ==null || this.eduLimitPay == '' || this.studyPrice == 0){
					lists += '<td>-</td>';
				}else{
					lists += '<td style="color:red;">초과</td>';
				}
				
				if(this.contentsPeriod == null || this.contentsPeriod == ""){
					lists += '<td>미지정</td>';
				}else{
					lists += '<td>'+this.contentsPeriod+'</td>';
				}
					
				if(this.contentsExpire == null || this.contentsExpire == ""){
					lists += '<td>미지정</td>';
				}else{
					lists += '<td>'+this.contentsExpire+'</td>';
				}
					

				lists += '</tr>';
				j--;
			})

		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="14">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="14">검색 결과가 없습니다.</td></tr>'
		}

		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}

function changeSort2(obj){
	obj = obj.options[obj.selectedIndex].value;
	sort02s = '';
	$('select[name="sort02"] , span[name="a"]').remove();
	if(obj != ''){
		$.get(categoryApi,{'value01':obj},function(data){
			var selectWrite = '';
			//selectWrite += '<select name="sort02" id="sort02" onchange="ajaxAct('+page+',\''+obj+'\',this.value)">';
			selectWrite += '<span name="a">소분류</span><select name="sort02" id="sort02">';
			selectWrite += '<option value="">선택하세요</option>';
			$.each(data.category,function(){
				selectWrite += '<option value="'+this.value01+'">';
				selectWrite += this.value02;
				selectWrite += '</option>';
			})
			selectWrite += '</select>'
			$('select[name="sort01"]').after(selectWrite)
		})
	}
}

function eduPriceExcel(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='eduPriceInfo.php?'+searchValue;
}


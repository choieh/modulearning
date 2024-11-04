//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
var studyCondApi = '../api/apiStudyCond2.php';
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:studyConditionAJAX()">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked"/><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';
	
	actionArea += '<select name="searchYear" >';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear+1; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}
	}
    actionArea += '</select>';
	actionArea += '<select name="searchMonth">';
	actionArea += '<option value="0" selected="selected">전체</option>';
	var h= '';
	var thisMonth = today.getMonth()+1; //January is 0!
	for(h = 1; h <= 12; h++){
		if(h != thisMonth){
			actionArea += '<option>'+h+'월</option>';
		}else{
			actionArea += '<option>'+h+'월</option>';
		}

	}
	actionArea += '</select>';
	actionArea += '&nbsp;&nbsp;<button type="submit">검색</button>';
	//actionArea += '&nbsp;&nbsp;<button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
	actionArea += '</div>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:200px;">수강기간</th>';
	contents += '<th style="width:310px;">수강 회사명</th>';
	contents += '<th style="width:100px;">교육비</th>';
	contents += '<th style="width:150px;">수강 구분<br />(환급/비환급/무료)</th>';
	contents += '<th style="width:80px;">수강인원</th>';
	contents += '<th style="width:80px;">진도 0%</th>';
	contents += '<th style="width:80px;">진도 1%~49%</th>';
	contents += '<th style="width:80px;">진도 50%~79%</th>';
	contents += '<th style="width:80px;">진도 80% 이상</th>';
	contents += '<th style="width:80px;">평가 응시대상자<br/>(중간/최종/과제)</th>';
	contents += '<th style="width:80px;">중간평가<br/>(응시 / 미응시)</th>';
	contents += '<th style="width:80px;">최종평가<br/>(응시 / 미응시)</th>';
	contents += '<th style="width:80px;">과제<br/>(제출 / 미제출)</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="14">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();
	/*
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
	*/
}

function excelAct(){
	//searchValue = $('.searchForm').serialize();
	//searchValue = '&'+searchValue;
	//top.location.href='progress.php?'+searchValue;
}



function studyConditionAJAX(){
	var yy = $('select[name="searchYear"]').val().substr(0,4);

	var ddd = $('select[name="searchMonth"]').val().length;
		
	var dd = '';
	var studyStart ='';
	var studyEnd ='';
	if( ddd == 1 ){
		dd = '';
	}else if( ddd == 2){
		dd = $('select[name="searchMonth"]').val().substr(0,1);
		dd = "0"+dd;
	}else{
		dd = $('select[name="searchMonth"]').val().substr(0,2);
	}
	
	if( dd  != '' ){
		//studyStart = yy+"-"+dd+"-01 00:00:00";
		//studyEnd = yy+"-"+dd+"-31 23:59:59";
		studyStart = yy+"-"+dd+"-01";
		studyEnd = yy+"-"+dd+"-31";
	}else{
		//studyStart = yy+"-01-01 00:00:00";
		//studyEnd = yy+"-12-31 23:59:59";
		studyStart = yy+"-01-01";
		studyEnd = yy+"-12-31";
	}

	var listAjax = $.get(studyCondApi,{'loginUserID':loginUserID,'studyStart':studyStart,'studyEnd':studyEnd},function(data){
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if (totalCount != 0){
			$.each(data.studyCond, function(){
				lists += '<tr>';
				lists += '<td style="width:30px;">'+j+'</td>';
				lists += '<td>'+this.lectureStart+'</td>'; //학습기간
				lists += '<td>'+this.companyName+'</td>'; //위탁회사명
				lists += '<td>'+this.price+'원</td>'; //교육비
				lists += '<td>'+this.rPrice+'명 / '+this.rPrice2+'명 /'+this.rPriceNo+'명 </td>'; //수강인원(환급/비환급/무료)
				lists += '<td>'+this.studyCount+'명</td>'; // 총 수강인원 
				lists += '<td>'+this.progressZero+'명</td>'; //진도0%
				lists += '<td>'+this.progressTwo+'명</td>'; //진도1%~49%
				lists += '<td>'+this.progressThird+'명</td>'; //진도50%~79%
				lists += '<td>'+this.progressEnd+'명</td>'; //진도80% 이상
				lists += '<td>'+this.midCountAll+'명 /'+this.testCountAll+'명 /'+this.reportsCountAll+'명</td>'; // 평가 응시대상자
				lists += '<td>'+this.midCount+'명 /'+this.midCountNo+'명</td>'; //중간평가 응시자/미응시자
				lists += '<td>'+this.testCount+'명 /'+this.testCountNo+'명</td>'; //최종평가 응시자/미응시자
				if(this.reportsCountNull == 0){
					lists += '<td>'+this.reportsCount+'명 /'+this.reportsCountNo+'명</td>'; //과제 응시자/미응시자
				}else{
					lists += '<td>과제 없는 과정</td>';//과제 없을때
				}
				lists += '</tr>';
				j--;
			})

		}else{
			lists += '<tr><td class="notResult" colspan="14">내역이 없습니다.</td></tr>'
		}

		$('#contentsArea tbody').html(lists);
	}) 
}





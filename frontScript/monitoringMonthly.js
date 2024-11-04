//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//보드 정보 선언
var sortData = '';
var useApi = '../api/apiMonitoringMonthly.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;'
  
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
	var i= '';
	var thisYear = today.getFullYear();
	for(i= 2015; i <= thisYear; i++){
		if(i != thisYear){
			actionArea += '<option>'+i+'년</option>';
		}else{
			actionArea += '<option selected="selected">'+i+'년</option>';
		}

	}
    actionArea += '</select>';
//	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
//	actionArea += '<option value="0" selected="selected">전체</option>';
//	var h= '';
//	var thisMonth = today.getMonth()+1; //January is 0!
//	for(h = 1; h <= 12; h++){
//		if(h != thisMonth){
//			actionArea += '<option>'+h+'월</option>';
//		}else{
//			actionArea += '<option>'+h+'월</option>';
//		}
//
//	}
//    actionArea += '</select>';
	actionArea += '</div>';
	actionArea += '<span>강사명</span>';
	actionArea += '<input type="text" style="width:100px;margin-right:5px;" name="tutorName" />';
	actionArea += '<span>강사ID</span>';
	actionArea += '<input type="text" style="width:100px;margin-right:5px;" name="tutorID" />';
	actionArea += '<span>구분</span>';
	actionArea += '<select name="division">';
	actionArea += '<option value="test">평가시험</option>';
    actionArea += '<option value="report">과제</option>';	
    actionArea += '</select>&nbsp;&nbsp;';
	actionArea += '<button type="button" onClick="excelAct()" >엑셀 다운로드</button> ';	
	actionArea += '<button type="submit">검색</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:100px;">강사ID</th>';
	contents += '<th style="width:100px;">강사명</th>';
	contents += '<th style="width:120px;">1월</th>';
	contents += '<th style="width:120px;">2월</th>';
	contents += '<th style="width:120px;">3월</th>';
	contents += '<th style="width:120px;">4월</th>';
	contents += '<th style="width:120px;">5월</th>';
	contents += '<th style="width:120px;">6월</th>';
	contents += '<th style="width:120px;">7월</th>';
	contents += '<th style="width:120px;">8월</th>';
	contents += '<th style="width:120px;">9월</th>';
	contents += '<th style="width:120px;">10월</th>';
	contents += '<th style="width:120px;">11월</th>';
	contents += '<th style="width:120px;">12월</th>';
	contents += '<th style="width:130px;">총합계</th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="16">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>'
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//ajaxAct();

	//2017.01.25 주석처리 되어있던부분
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)

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
		var reason = '';
		var reason1 = '';
		var reason2 = '';
		var reason3 = '';
		var reason4 = '';
		var reason5 = '';
		var reason6 = '';
		var reTotal = '';
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		//if (totalCount != 0 && loginUserLevel <= userLevel){

		
		var arrTr = new Array();
	
		$('.BBSList tbody').html("");

		if (data.totalCount != 0 ){
			
			
			var k=-1;
			$.each(data.monthly,  function(){


					lists = '<tr id="'+ this.tutorID +'"  val="Y" >';
					lists += '<td>'+ j +'</td>';
					lists += '<td>'+ this.tutorID +'</td>';
					lists += '<td>'+ this.tutorName +'</td>';

					for(var z=1 ; z < 14 ; z++){
						if( z == 13 ){
							lists += '<td id="'+ this.tutorID +"_"+ z +'" style="text-align:right" >-</td>';
						}else{
							lists += '<td id="'+ this.tutorID +"_"+ z +'" >-</td>';
						}
					}
					
					lists += '</tr>';

					if( arrTr.indexOf(this.tutorID) == -1 ){
						$('.BBSList tbody').append( lists );
					}

					arrTr.push( this.tutorID );

					j--;
			});

			
			lists = '<tr>';
			lists += '<td colspan="3"><strong>총합계</strong></td>';

			
			for(var z=1 ; z < 13 ; z++){
				lists += '<td><strong id="tot_'+ z +'">-</strong>';
				lists += '</td>';
			}
			
			lists += '<td><strong >총합 0건</strong></td>';
			lists += '</tr>';



		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="16">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="16">검색 결과가 없습니다.</td></tr>'
		}


		$('.BBSList tbody').append(lists);


		pagerAct();
		loadingAct();

		bindData(data);
	})
}



function bindData(data){


	if (data.totalCount != 0 ){

		var arrReason = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var arrTutor = new Array();
		var arrCnt = new Array( new Array(), new Array(), new Array() );
		var totReason = 0;


		$.each(data.monthly,  function(){

			var html = "";
			var html2="";
			
			arrTutor.push(this.tutorID);
			arrCnt.push(this.tutorID);

			for(var z=1 ; z < 13 ; z++){
				if( z == this.month ){
					
						arrReason[z] += Number(this.total);

						if( Number(this.total) > 0 ) {


							if( typeof( arrCnt[this.tutorID] ) == "undefined" || arrCnt[this.tutorID].length == 0 ){
								arrCnt[this.tutorID] = [0,0,0,0,0];
								console.log(this.tutorID);
							}

							html += "<b>전체 "+ this.total +" 건</b>";
							if( Number(this.reason1) > 0 ) {
								html += "<br>점수배정오류 : "+ this.reason1 +" 건";
								arrCnt[this.tutorID][0] += Number(this.reason1);
							}

							if( Number(this.reason2) > 0 ) {
								html += "<br>첨삭지도내용오류 : "+ this.reason2 +" 건";
								arrCnt[this.tutorID][1] += Number(this.reason2);
							}

							if( Number(this.reason3) > 0 ) { 
								html += "<br>답안재검토 : "+ this.reason3 +" 건";
								arrCnt[this.tutorID][2] += Number(this.reason3);
							}

							if( Number(this.reason4) > 0 ) {
								html += "<br>오타 : "+ this.reason4 +" 건";
								arrCnt[this.tutorID][3] += Number(this.reason4);
							}

							if( Number(this.reason5) > 0 ) { 
								html += "<br>기타 : "+ this.reason5 +" 건";
								arrCnt[this.tutorID][4] += Number(this.reason5);
							}

						}else{
							html += '-';
						}

						$("#"+ this.tutorID +"_"+ z).html( html );
				}
			}

		});

		var html2 = "";
		var tutor = "";
		var totalCnt = 0;
		for(var c = 0 ; c < arrTutor.length ; c++){
			
			tutor = arrTutor[c];
			totalCnt = 0;

			for(var z=1 ; z < 13 ; z++){	
				if( Number(arrReason[z]) > 0 ) $("#tot_"+ z).html( "<b>총 "+ arrReason[z] +"건</b>" );	
			}
			
			for(var e=0 ; e < 5 ; e++){
				totalCnt += Number( arrCnt[tutor][e] );
			}

			

			html2 = "총 "+ totalCnt +" 건";
		
			if( Number(arrCnt[tutor][0]) > 0 ) {
				html2 += "<br>점수배정오류 : "+ arrCnt[tutor][0] +" 건";
			}

			if( Number(arrCnt[tutor][1]) > 0 )  {
				html2 += "<br>첨삭지도내용오류 : "+ arrCnt[tutor][1] +" 건";
			}

			if( Number(arrCnt[tutor][2]) > 0 ) { 
				html2 += "<br>답안재검토 : "+ arrCnt[tutor][2] +" 건";
			}

			if( Number(arrCnt[tutor][3]) > 0 ) {
				html2 += "<br>오타 : "+ arrCnt[tutor][3] +" 건";
			}

			if( Number(arrCnt[tutor][4]) > 0 ) { 
				html2 += "<br>기타 : "+ arrCnt[tutor][4] +" 건";
			}


			$("#"+ tutor +"_13").html( html2 );

		}
	}

}


//검색관련

function searchTypeSelect(types){
	$('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"]').remove();
	var chageSearch =''
	if(types == 'searchDate'){
		chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
		var today = new Date();
		var i= '';
		var thisYear = today.getFullYear();
		for(i= 2015; i <= thisYear; i++){
			if(i != thisYear){
				chageSearch += '<option>'+i+'년</option>';
			}else{
				chageSearch += '<option selected="selected">'+i+'년</option>';
			}

		}
		chageSearch += '</select>';

		chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
		var h= '';
		var thisMonth = today.getMonth()+1; //January is 0!
		for(h = 1; h <= 12; h++){
			if(h != thisMonth){
				chageSearch += '<option>'+h+'월</option>';
			}else{
				chageSearch += '<option selected="selected">'+h+'월</option>';
			}

		}
		chageSearch += '</select>';



	}else if(types == 'searchCompany'){
		chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
	}
	$('.searchArea div.searchChangeArea').append(chageSearch)
	if(types == 'searchDate'){
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth()+1; //January is 0!
		if(thisMonth <= 9){
			thisMonth = '0'+thisMonth;
		}
		var checkDate = thisYear +'-'+thisMonth;
		searchStudy('lectureDay',checkDate)
	}
	//actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types,vals){
	if(types=='lectureDay'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
//		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
//			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
//		}else{
//			dateChain += $('select[name="searchMonth"]').val().replace('월','');
//		}
	}
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='tutorMonthly.php?'+searchValue;
}
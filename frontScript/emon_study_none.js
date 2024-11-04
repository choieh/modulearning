//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var chainsearchApi = '../api/apiSearch.php';
var useApi = '../api/apiEmonStudyNone.php';

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var startDate = '';
	var endDate = '';
	var today = new Date();

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchChangeArea">'
	actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';	
	actionArea += '(<input type="radio" name="searchDayType" id="searchDayTypeStart" value="start" checked="checked" onChange="searchTypeSelect(\'searchDate\', \'start\')" /><label for="searchDayTypeStart">시작일기준</label>&nbsp;&nbsp;&nbsp;/';
	actionArea += '<input type="radio" name="searchDayType" id="searchDayTypeEnd" value="end" onChange="searchTypeSelect(\'searchDate\', \'end\')" /><label for="searchDayTypeEnd">종료일기준 )</label>&nbsp;&nbsp;&nbsp;';
	actionArea += '|&nbsp;<input type="radio" name="selectSearch" id="searchCompany" value="searchCompany" id="searchCompany" onChange="searchTypeSelect(this.value)" /><label for="searchCompany">사업주검색</label>&nbsp;&nbsp;&nbsp;&nbsp;';
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
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
	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
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
	actionArea += '</div>';
    actionArea += '<select name="searchType">';
	actionArea += '<option value="userName">이름</option>';
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button>';
	actionArea += '</div>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:100px;">회원PK(아이디)</th>';
	contents += '<th style="width:100px;">회원이름</th>';
	contents += '<th style="width:100px;">과정PK(과정코드)</th>';
	contents += '<th style="width:200px;">과정명</th>';
	contents += '<th style="width:100px;">수업PK</th>';	
	contents += '<th style="width:80px;">수료여부</th>';
	contents += '<th style="width:80px;">수강확정여부</th>';
	contents += '<th style="width:120px;">수강마감일</th>';
	contents += '<th style="width:80px;">전송버튼</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="10">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	pickerAct();//데이트피커 사용
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	listCount = 30;
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		
		if(totalCount != 0){
			$.each(data.emon,  function(){
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.userID+'</td>';
				lists += '<td>'+this.userName+'</td>';
				lists += '<td>'+this.contentsCode+'</td>';
				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td>'+this.contentsCode+','+this.lectureOpenSeq+'</td>';
				lists += '<td>'+this.passOK+'</td>';
				lists += '<td>'+this.passFlag+'</td>';
				lists += '<td>'+this.studyEndDate+'</td>';
				lists += '<td><button type="button" onclick="emonDataBtn('+this.seq+');">데이터전송</button></td>';

				lists += '</tr>';
				i--;
			})
		}else{			
			lists += '<tr><td class="notResult" colspan="10">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
		loadingAct();
	})
}


function emonDataBtn(seq){
	if(confirm('모니터링 데이터를 다시 전송하시겠습니까?')) {
		$.ajax({
			url: useApi,
			type:'POST',
			data:'seq='+seq,
			dataType:'JSON',
			success:function(data){
				if(data.result == 'success'){
					alert('데이터 전송이 완료되었습니다. 이몬사이트에서 확인 부탁드립니다.');
				} 
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}
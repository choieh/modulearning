//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var chainsearchApi = '../api/apiSearch.php';
var useApi = '../api/apiEmonMemberNone.php';

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var startDate = '';
	var endDate = '';
	var today = new Date();

	//actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
	actionArea += '<span>가입일</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;&nbsp;';
    actionArea += '<select name="searchType">';
	actionArea += '<option value="userName">이름</option>';
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchCheck()">검색하기</button>';
	actionArea += '</div>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:100px;">회원PK<br>회원이름</th>';
	contents += '<th style="width:60px;">생년월일<br>(주민번호)</th>';	
	contents += '<th style="width:200px;">사업자번호<br>소속명</th>';
	contents += '<th style="width:100px;">이메일</th>';
	contents += '<th style="width:80px;">핸드폰번호<br>연락처</th>';
	contents += '<th style="width:50px;">우편번호</th>';
	contents += '<th style="width:80px;">비용수급사업장</th>';
	contents += '<th style="width:50px;">훈련생구분</th>';
	contents += '<th style="width:50px;">비정규직구분</th>';
	contents += '<th style="width:80px;">등록일</th>';
	contents += '<th style="width:80px;">정보수정일</th>';
	contents += '<th style="width:80px;">전송버튼</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>'	;
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
				lists += '<td>'+this.userID+'<br>'+this.userName+'</td>';
				lists += '<td>'+this.resno01+'</td>';
				lists += '<td>'+this.companyCode+'<br>'+this.companyName+'</td>';
				lists += '<td>'+this.email+'</td>';
				lists += '<td>'+this.mobile+'<br>'+this.phone+'</td>';
				lists += '<td>'+this.zipCode+'</td>';
				lists += '<td>'+this.nwIno+'</td>';
				lists += '<td>'+this.trneeSe+'</td>';
				lists += '<td>'+this.IrglbrSe+'</td>';
				lists += '<td>'+this.inputDate+'</td>';
				lists += '<td>'+this.infoUpdate+'</td>';	
				lists += '<td><button type="button" onclick="emonDataBtn('+this.seq+');">데이터전송</button></td>';
				lists += '</tr>';
				i--;
			})
		}else{			
			lists += '<tr><td class="notResult" colspan="13">검색 결과가 없습니다.</td></tr>'
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



function searchCheck(){
	var startDate = $('input[name="startDate"]').val();
	var endDate = $('input[name="endDate"]').val();

	if(startDate == '' && endDate == ''){
		alert('가입일을 입력해주세요.');
	}else if(startDate == ''){
		alert('가입일을 입력해주세요.');
	}else if(endDate == ''){
		alert('가입일을 입력해주세요.');
	}else{
		searchAct();
	}
}
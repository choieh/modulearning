

userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var sortData = '';

function listAct(){
	
	//상단 액션 부분	
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	/*if(loginUserLevel < '5') {
		// actionArea += '<button type="button" class="fRight" onClick="writeAct()">신규등록</button>';
		actionArea += '<button type="button" class="fRight" onClick="excelAct()">엑셀 다운로드</button>';
    }*/  
	actionArea += '<button type="button" class="fRight" onClick="writeAct()">신규등록</button>';
    actionArea += '<input type="text" name="countryName" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:30px;">번호</th>';
	contents += '<th style="width:50px;">지회ID</th>';
	contents += '<th style="width:100px;">지회명</th>';
	contents += '<th style="width:200px;">지회담당자/연락처</th>';
    contents += '<th style="width:100px;">정회원/비회원 검색여부</th>';
    contents += '<th style="width:100px;">정회원/비회원<br />5명 이하 교육비</th>';
    contents += '<th style="width:100px;">정회원/비회원<br />5명 이상 교육비</th>';
    contents += '<th style="width:80px;">지회 오픈여부</th>';
    contents += '<th style="width:100px;">지회 오픈시간</th>';
    contents += '<th style="width:100px;">지회 닫는시간</th>';
    contents += '<th style="width:80px;">수정</th>';
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
		sortData = sortDatas;
	}

	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			$.each(data.academyManage,  function(){
                // console.log(data);
                
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.countryID+'</td>';
				lists += '<td>'+this.countryName+'</td>';
				lists += '<td>'+this.countryManagerText+'</td>';
                lists += '<td>'+this.membershipSearchYN+' / '+this.noMembershipSearchYN+'</td>';
                lists += '<td>'+this.membershipPrice_down+' 원 / '+this.noMembershipPrice_down+' 원</td>';
				lists += '<td>'+this.membershipPrice_up+' 원 / '+this.noMembershipPrice_up+' 원</td>';
                lists += '<td>'+this.academyOpenYN+'</td>';
                lists += '<td>'+this.academyOpenTime+'</td>';
                lists += '<td>'+this.academyCloseTime+'</td>';
                lists += '<td><button type="button" onClick="writeAct('+this.seq+')">수정</button></td>';
				lists += '</tr>';
				i--;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="10">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
	})
}

//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}


/*function deleteAcademy(seq){
    // var confirm = confirm("삭제 되었습니다.");
    $.ajax({
        url: useApi,
        data : {seq : seq},
        type : "DELETE",
        dataType : "text",
        success : function(data){
            if(data != "success"){
                alert('삭제에 실패하였습니다.');
            }else{
                alert('삭제되었습니다.');
                ajaxAct();
            }
        }

    })
}*/

/*function excelAct() {
    searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='academyExcel.php?'+searchValue;   
}*/

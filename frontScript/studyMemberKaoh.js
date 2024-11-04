
var sortData = '';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = listCount ? listCount :10;
var pagerCount = 10; //페이저카운트
//리스트 소팅
var useApi = "../api/apiLawCheck.php";
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<button type="button" class="fRight" onClick="excelAct(\''+subDomain+'\')">엑셀출력하기</button>';
	
    actionArea += '<select name="searchType">';
	// if(userLevel == 8) {
	// 	actionArea += '<option value="companyName">사업주</option>';
	// 	actionArea += '<option value="userName">이름</option>';
	// } else {
		actionArea += '<option value="userName">이름</option>';
		actionArea += '<option value="companyName">사업주</option>';
	// }
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	//contents += '<th style="width:50px;"><input type="checkbox" id="checkAll" onChange="checkboxAllCheck(\'checkAll\')" /><label for="checkAll"></label></th>';
	contents += '<th style="width:60px;">번호</th>';
    contents += '<th>아이디/이름</th>';
    contents += '<th>직책</th>';
    contents += '<th style="width:200px;">사업주</th>';
    contents += '<th style="width:200px;">사업주번호</th>';
    
	contents += '<th style="width:120px;">지회</th>';
	contents += '<th style="width:200px;">지역</th>';
	// contents += '<th style="width:140px;">가입일</th>';
	contents += '<th style="width:140px;">학원법교육 이수확인여부</th>';
	contents += '<th style="width:120px;">학원법교육 이수확인일시</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(sortDatas){
	// loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}

	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+'&joinURL='+joinURL+sortData,function(data){
        console.log(data);
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.member,  function(){
				if(this.userDelete.userDelete != 'Y'){
					lists += '<tr>';
					//lists += '<td><input type="checkbox" name="check['+this.seq+']" id="check'+this.seq+'" class="checkAll" /><label for="check'+this.seq+'"></label></td>';
                    lists += '<td>'+i+'</td>';
                    lists += '<td>'+this.userID+'/'+this.userName+'</td>';
                    lists += '<td>'+this.department+'</td>';
                    lists += '<td>'+this.companyName+'</td>';
                    lists += '<td>'+this.companyCode+'</td>';
                    lists += '<td>'+this.bigCountry+'</td>';
                    lists += '<td>'+this.country+'</td>';
                    // lists += '<td>'+this.inputDate+'</td>';
                    lists += '<td>'+this.lawCheck+'</td>';
                    lists += '<td>'+this.lawDate+'</td>';
					lists += '</tr>';
					i--;
				}
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
		// loadingAct();
	})
}


function excelAct(joinURL){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue+'&joinURL='+joinURL;
	top.location.href='studyMemberExcel_Kaoh.php?'+searchValue;
}

//보드 정보 선언
var sortData = '';
var useApi = '../api/apiMemberInsurance.php';
var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = '';
var seq = seq ? seq : '' ;
var page = page ? page : 1;


function listAct(page){
	//상단 액션 부분
	var actionArea='';
	$.get(categoryApi,{'value01':'lectureCode'},function(data){
		var sort01='';
		var today = new Date();

		actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()"  >';
		actionArea += '<div class="searchChangeArea">';
		actionArea += '<span>기간</span><select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
		var i= '';
		var thisYear = today.getFullYear();
		for(i= 2015; i <= thisYear; i++){
			if(i != thisYear){
				actionArea += '<option value='+i+'>'+i+'년</option>';
			}else{
				actionArea += '<option selected="selected" value='+i+'>'+i+'년</option>';
			}
		}
		actionArea += '</select>';
		actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
		var j='';
		var thisMon = today.getMonth();
		for(j=1; j<=12; j++){
			if(i != thisMon){
				actionArea += '<option value='+j+'>'+j+'월</option>';
			}else{
				actionArea += '<option selected="selected" value='+j+'>'+j+'월</option>';
			}
		}
		actionArea += '</select>';
		actionArea += '</div>';
		actionArea += '<div>';
		actionArea += '<span>이름</span><input type="text" name="userName" style="width:100px">'
		actionArea += '&nbsp;&nbsp;&nbsp;<button style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>';
		actionArea += '</div>';
		actionArea += '</form></div>';
		actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		actionArea += '</form>';
		$('#contents > h1').after(actionArea);
		$('#contents').removeAttr('class');
		$('#contents').addClass('BBSWrite');

		//게시물 소팅부분
		var contents = '';
		contents += '<div class="scrollArea" style="min-width:1360px; ">';
		contents += '<table style=""><thead><tr>';
		contents += '<th style="width:40px;">번호</th>';
		contents += '<th style="width:200px;">학습기간</th>';
		contents += '<th style="width:200px;">회사명</th>';
		contents += '<th style="width:200px;">아이디/이름</th>';
		contents += '<th style="width:200px;">생년월일</th>';
		contents += '<th style="width:200px;">고용보험</th>';
		contents += '</tr></thead><tbody>'	;
		contents += '<tr><td class="notResult" colspan="30">검색값을 선택하세요.</td></tr>'	;
		contents += '</tbody></table>';
		
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth()+1; //January is 0!
		if(thisMonth <= 9){
			thisMonth = '0'+thisMonth;
		}
		var checkDate = thisYear +'-'+thisMonth;
		searchStudy('lectureDay',checkDate)
	})
}


function ajaxAct(sortData){
	loadingAct();
	sortData = sortData ? sortData : '';
	var listAjax = $.get(useApi,'page='+page+sortData, function(data){
		var totalCount = data.totalCount;
		var lists = '';
		var i = 1;
		if(totalCount != 0){
			$.each(data.info, function(){
				lists += '<tr>';
				lists += '<td class="py-4">'+i+'</td>';
				lists += '<td class="py-4">'+this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td>'+this.companyName+'</td>';
				lists += '<td>'+this.userID+'<br>'+this.userName+'</td>';
				lists += '<td>'+this.birth+'</td>';
				if(this.insurance == 'Y'){
					lists += '<td id='+i+'><button id='+i+' onclick="changeInsurance(this, \'N\', \''+this.userID+'\');">현재상태:유효</button></td>';
				} else {
					lists += '<td id='+i+'><button id='+i+' onclick="changeInsurance(this, \'Y\', \''+this.userID+'\');">현재상태:만료</button></td>';
				}
				
				lists += '</tr>';
				i++;
			});
			$('.BBSList tbody').html(lists);
			loadingAct();
		} else {
			alert('검색 결과가 없습니다.');
			loadingAct();
		}
		
	});
}


function changeInsurance(data, insurance, userID){
	if(!confirm('고용보험 상태를 바꾸시겠습니까?')) return false;
	var btnID = data.getAttribute('id');
	$.post(useApi, {insurance:insurance, change: 'Y', userID: userID}, function(data){
		if(data.result == 'Y'){
			$('td#'+btnID).empty();
			$('td#'+btnID).append('<button id='+btnID+' onclick="changeInsurance(this, \'N\', \''+userID+'\');">현재상태:유효</button>');
		} else if(data.result == 'N'){
			$('td#'+btnID).empty();
			$('td#'+btnID).append('<button id='+btnID+' onclick="changeInsurance(this, \'Y\', \''+userID+'\');">현재상태:만료</button>');
		} else {
			alert('오류 발생');
		}
	});
}

function searchStudy(types,vals){
	if(types=='lectureDay'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"], select[name="autoContentsCode"]').remove();
		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}
		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printCompany\',this);searchAct();">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="searchMonth"]').after(selectWrite)
		})
	}else if(types=='company'){
		$('select[name="companyCode"], strong.noticeSearch, select[name="autoContentsCode"]').remove();
		var searchName = vals.value
		if( searchName != ''&& searchName != ' ' ){
			$.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
				var selectWrite = ''
				if(data.totalCount !=0){
					$('select[name="companyCode"]').remove();
					selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct();">';
					selectWrite += '<option value="">사업주를 선택하세요</option>'
					$.each(data.searchResult, function(){
						selectWrite += '<option value="'+this.searchCode+'">'+this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'</option>';
					})
					selectWrite += '</select>'
				}else{
					selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
				}
				$('input[name="searchCompany"]').after(selectWrite)

			})
		}else{
			$('.searchChangeArea select, strong.noticeSearch').remove();
		}
	}else if(types=='printCompany'){
		$('strong.noticeSearch, select[name="companyCode"], select[name="contentsCode"], select[name="autoContentsCode"]').remove();
		var searchDate = vals.value
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct();">';
				selectWrite += '<option value="">사업주를 선택하세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.companyCode+'/'+searchDate+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}else if(types=='printContents'){
		$('strong.noticeSearch, select[name="autoContentsCode"]').remove();
		var companyCode = vals.value;
	
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})
	}else if(types=='printDate'){
		$('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
		var companyCode = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){				
				selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
				selectWrite += '<option value="">기간을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+companyCode+'/'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="companyCode"]').after(selectWrite)
		})	
	}else if(types=='printContents2'){
		$('strong.noticeSearch, select[name="autoContentsCode"]').remove();
		var searchDate = vals.value;
		$.get(chainsearchApi,{'searchMode':'study', 'lectureDate':searchDate, 'type':'contents'},function(data){
			var selectWrite = ''
			if(data.totalCount !=0){
				selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
				selectWrite += '<option value="">과정을 선택해주세요</option>'
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
				})
				selectWrite += '</select>'
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
			}
			$('select[name="lectureDay"]').after(selectWrite)
		})
	}
}
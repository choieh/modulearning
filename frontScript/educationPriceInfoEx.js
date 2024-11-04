//보드 정보 선언
var sortData = '';
var useApi = '../api/apiEducationPriceInfo.php';
var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = '';
var seq = seq ? seq : '' ;
var page = page ? page : 1;
var topIndex = '';

$(document).ready(function(){
	$("thead > tr > th").css('position', 'sticky');
	$("thead > tr > th").css('top', '0');
})

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
		actionArea += '<span>기준</span><select name="selectStandard">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="eduCostDepositDay">교육비 입금일</option>';
		actionArea += '<option value="costApplicationDay">비용 신청일</option>';
		actionArea += '<option value="costGiveDay">비용 지급일</option>';
		actionArea += '</select>&nbsp;&nbsp;';
		actionArea += '<input type="date" name="getStandard"/>&nbsp;';
		actionArea += '<span>훈련유형</span><select name="serviceType">';
		actionArea += '<option value="">전체';
		actionArea += '<option value="1">환급';
		actionArea += '<option value="3">비환급';
		actionArea += '</select>';
		actionArea += '<span>영업담당자</span><input type="text" name="marketer"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		actionArea += '<button style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>';
		actionArea += '<button type="button" onClick="excelAct()" >엑셀 다운로드</button>';
		actionArea += '</div>';
		actionArea += '</form></div>';
		actionArea += '<h2>파일 업로드(미구현)</h2>'
		actionArea += '<form class="fileUploadform" method="post" action="" enctype="multipart/form-data" style="margin-bottom:16px;">';
		actionArea += '<ul>';
		actionArea += '<li>';
		actionArea += '<h1>등록샘플</h1>';
		actionArea += '<button type="button" onclick="">양식 및 샘플 내려받기</button>&nbsp;';
		actionArea += '&nbsp;<strong class="price">(첨부파일다운로드 확인후 작성해서 올려 주세요.)</strong>';
		actionArea += '</li>';
		actionArea += '<li>';
		actionArea += '<h1>파일등록</h1>';
		actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
		actionArea += '</li>';
		actionArea += '</ul>';
		actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		actionArea += '</form>';
		$('#contents > h1').after(actionArea);
		$('#contents').removeAttr('class');
		$('#contents').addClass('BBSWrite');

		//게시물 소팅부분
		var contents = '';
		contents += '<div class="scrollArea">';
		contents += '<table style="min-width:1360px;"><thead><tr>';

		contents += '<th style="width:40px;">번호</th>';
		contents += '<th style="width:200px;">학습기간</th>';
		contents += '<th style="width:200px;">회사명</th>';
		contents += '<th style="width:300px;">과정명</th>';
		contents += '<th style="width:80px;">수강인원</th>';
		contents += '<th style="width:80px;">수강비</th>';
		contents += '<th style="width:100px;">수강비 합계</th>';
		contents += '<th style="width:100px;">자부담비 함계</th>';
		contents += '<th style="width:40px;">훈련유형</th>';
		contents += '<th style="width:100px;">영업자</th>';
		contents += '<th style="width:60px;">CP사</th>';
		contents += '<th style="width:80px;"><input type="button" value="전체복사" onclick="copyAllTableRow(this)"></th>';

		//if(loginUserLevel < 5){
		//  contents += '<th style="width:50px;">삭제</th>';
		//}
		contents += '</tr></thead><tbody>'	;
		contents += '<tr><td class="notResult" colspan="11">검색값을 선택하세요.</td></tr>'	;
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
		totalCount = data.totalCount;
		var lists = '';
		var i = 1;
		var allUser = 0;
		var allPrice = 0;
		var allSelfPrice = 0;
		if(data.serviceType == '3'){
			var contents = '';
			contents += '<div class="scrollArea">';
			contents += '<table style=""><thead><tr style="position: sticky; top: 0;">';
			contents += '<th style="width:40px;" onClick="restoreTd(this)">번호</th>';
			contents += '<th style="width:200px;" onClick="hideTd(this)">학습기간</th>';
			contents += '<th style="width:200px;" onClick="hideTd(this)">회사명</th>';
			contents += '<th style="width:300px;" onClick="hideTd(this)">과정명</th>';
			contents += '<th style="width:80px;" onClick="hideTd(this)">수강인원</th>';
			contents += '<th style="width:80px;" onClick="hideTd(this)">수강비</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수강비 합계</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">자부담비 함계</th>';
			contents += '<th style="width:40px;" onClick="hideTd(this)">훈련유형</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">영업자</th>';
			contents += '<th style="width:60px;" onClick="hideTd(this)">CP사</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">교육비 입금일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수수료 지급일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">계산서 발행일자</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">1인당 교육비</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">교육비</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수료증 발송일자</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수강인원</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수료인원</th>';
			contents += '<th style="width:80px;" onClick="hideTd(this)"><input type="button" value="전체복사" onclick="copyAllTableRow(this)"></th>';
			contents += '</tr></thead><tbody>';
			contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>'	;
			contents += '</tbody></table>';
			$('#contentsArea').html(contents);
		} else {
			var contents = '';
			contents += '<div class="scrollArea" style="min-width:1360px; height:900px; overflow:auto; white-space:nowrap">';
			contents += '<table style=""><thead><tr style="position: sticky; top: 0;">';
			contents += '<th style="width:40px;" onClick="restoreTd(this)">번호</th>';
			contents += '<th style="width:200px;" onClick="hideTd(this)">학습기간</th>';
			contents += '<th style="width:200px;" onClick="hideTd(this)">회사명</th>';
			contents += '<th style="width:300px;" onClick="hideTd(this)">과정명</th>';
			contents += '<th style="width:80px;" onClick="hideTd(this)">수강인원</th>';
			contents += '<th style="width:80px;" onClick="hideTd(this)">수강비</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수강비 합계</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">자부담비 함계</th>';
			contents += '<th style="width:40px;" onClick="hideTd(this)">훈련유형</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">영업자</th>';
			contents += '<th style="width:60px;" onClick="hideTd(this)">CP사</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">교육비 입금일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용신청일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용입금일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">1차 계산서 발행일자</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">2차 계산서 발행일자</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수수료 지급일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">자부담액</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수수료 환급액</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">산인공 확정 환급액</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용 신청 관리 대상</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용 신청 준비</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용 신청일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">비용지급일</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수료증 발송일자</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수료율</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">수강인원</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">환급인원</th>';
			contents += '<th style="width:100px;" onClick="hideTd(this)">cp료</th>';
			contents += '<th style="width:80px;"><input type="button" value="전체복사" onclick="copyAllTableRow(this)"></th>';
			contents += '</tr></thead><tbody>'	;
			contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>'	;
			contents += '</tbody></table>';
			$('#contentsArea').html(contents);
			
		}
		if(totalCount != 0){
			$.each(data.edu, function(){
				lists += '<tr id='+i+' ondblClick="copyTableRow(this)">';
				lists += '<td class="py-4">'+i+'</td>';
				lists += '<td class="py-4">'+this.lectureStart+'~'+this.lectureEnd+'</td>';
				lists += '<td>'+this.companyName+'</td>';
				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td>'+Number(this.totalUser).toLocaleString('ko-KR')+'</td>';
				if(this.serviceType == '1'){
					allUser += Number(this.totalUser);
					allPrice += Number(this.totalPrice);
					allSelfPrice += Number(this.totalSelfPrice);
					lists += '<td>'+Number(this.selfPrice).toLocaleString('ko-KR')+'</td>';
					lists += '<td>'+Number(this.totalPrice).toLocaleString('ko-KR')+'</td>';
					lists += '<td>'+Number(this.totalSelfPrice).toLocaleString('ko-KR')+'</td>';
				}else{
					allUser += Number(this.totalUser);
					allPrice += Number(this.price);
					lists += '<td>0</td>';	
					lists += '<td>'+Number(this.price).toLocaleString('ko-KR')+'</td>';
					lists += '<td>0</td>';		
				}
				if(this.serviceType == '1'){
					lists += '<td>환급</td>';	
				} else {
					lists += '<td>비환급</td>';	
				}
				lists += '<td>'+this.marketer+'</td>';
				lists += '<td>'+this.cp+'</td>';
				if(this.serviceType == '1'){
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><button type="button" style="width:90%;">수정</button></td>';
					lists += '</tr>';
				} else {
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><input type="text" name="" style="width:150px;"></td>';
					lists += '<td><button type="button" style="width:90%;">수정</button></td>';
					lists += '</tr>';
				}
				i++;
			});
			lists += '<tr>';
			lists += '<td colspan=50><span style="font-size:medium; color:black;">총 수강인원 : '+allUser.toLocaleString('ko-KR')+'명</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 수강비 : '+allPrice.toLocaleString('ko-KR')+'원</span>,&nbsp;&nbsp; <span style="font-size:medium; color:black;">총 자부담비 : '+allSelfPrice.toLocaleString('ko-KR')+'원</span></td>'
			lists += '</tr>';
			$('.BBSList tbody').html(lists);
			loadingAct();
		} else {
			alert('검색 결과가 없습니다.');
			loadingAct();
		}
	});
}

function hideTd(td){
    let a = Array.from(td.parentNode.children).indexOf(td) + 1;
    if(topIndex == '' || topIndex < a){
		topIndex = a;
    }
    $("thead > tr > th:nth-child(n+5):nth-child(-n+"+a+")").css('display', 'none');
    $("tbody > tr > td:nth-child(n+5):nth-child(-n+"+a+")").css('display', 'none');
}

function restoreTd(td){
    if(topIndex == ''){
		return false;
    }
    $("thead > tr > th:nth-child(n+5):nth-child(-n+"+topIndex+")").css('display', 'table-cell');
    $("tbody > tr > td:nth-child(n+5):nth-child(-n+"+topIndex+")").css('display', 'table-cell');
	topIndex = '';
}

function excelAct(){ // 미구현
	let year = document.getElementsByName('searchYear')[0].value;
	let month = document.getElementsByName('searchMonth')[0].value;
	if(month < 10){
		month = '0'+month;
	}
	let lectureStart = year+'-'+month;
//	let lectureStart = document.getElementsByName('searchStart')[0].value; 이거 쓸꺼임 위에는 임시
	let serviceType = document.getElementsByName('serviceType')[0].value;
	let companyName = document.getElementsByName('companyName')[0].value;
	let contentsName = document.getElementsByName('contentsName')[0].value;
}


//function extend(tr){
//	let a = document.getElementById(tr.id+'_box');
//	if(a.style.display=='none'){
//		a.style.display = 'table-row';
//		tr.value = '숨김';
//	} else {
//		a.style.display = 'none';
//		tr.value = '확장';
//	}
//}

function copyTableRow(tr){ // 테이블 한 줄의 정보를 복사, 더블 클릭시 복사
	var children = tr.childNodes;
	var newStr = '';
	children.forEach(td=>{
		newStr += td.innerText;
		newStr += '\u0009';
	})
	navigator.clipboard.writeText(newStr);
	alert('복사됐습니다.');
}

function copyAllTableRow(btn){// 전체 테이블 정보를 복사
	var thead = btn.parentNode.parentNode.parentNode;
	var tbody = thead.nextElementSibling;
	var tr = tbody.childNodes
	var newStr = '';
	tr.forEach(function(thr, index){
			thr.childNodes.forEach(td=>{
				newStr += td.innerText;
				newStr += '\u0009';
			})
			newStr += '\n';
	})
	navigator.clipboard.writeText(newStr);
	alert('복사됐습니다.');
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
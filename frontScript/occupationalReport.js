
var useApi = '../api/apiOccupationalReport.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트

function pageAct() {
  listAct();
}

//리스트 소팅
function listAct(page) {

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();
  actionArea += '<h1>산업안전교육 결과보고서</h1>';
	actionArea += '<div class="searchArea" style="padding: 10px 10px 5px 70px;">'
  actionArea += '<form class="searchForm" action="javascript:searchAct()" style="border-bottom:none;">';
	actionArea += '<div class="searchChangeArea" style="border-bottom:none;">'
  actionArea += '<span>과정검색</span>';
	actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';

	var thisYear = today.getFullYear();
	for (var i= 2015; i <= thisYear; i++) {
		if (i != thisYear) {
			actionArea += '<option value="'+i+'">'+i+'년</option>';
		} else {
			actionArea += '<option value="'+i+'" selected="selected">'+i+'년</option>';
		}
	}
  actionArea += '</select>';
	actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
	actionArea += '<option value="0">전체</option>';

	var thisMonth = today.getMonth()+1;
	for (var h = 1; h <= 12; h++) {
		if (h != thisMonth) {
			actionArea += '<option value="'+h+'">'+h+'월</option>';
		} else {
			actionArea += '<option value="'+h+'" selected="selected">'+h+'월</option>';
		}
	}
  actionArea += '</select>';
  actionArea += '<button type="button" onClick="searchAct()" style="margin-left:10px;">검색</button>';
  actionArea += '<input type = "hidden" name="lectureStart">'
  actionArea += '<input type = "hidden" name="lectureEnd">'
	actionArea += '<input type = "hidden" class="totalCnt">';
	actionArea += '</div>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="scrollArea">';
	contents += '<table style="min-width:1360px;"><thead><tr>';
	contents += '<th style="width:50px;" rowspan="2">번호</th>';
	contents += '<th rowspan="2">수강기간</th>';
	contents += '<th rowspan="2">과정명</th>';
  contents += '<th rowspan="2">결과보고서</th>';
  contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="20">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>'

	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);

	var thisYear  = today.getFullYear();
	var thisMonth = today.getMonth()+1;
	if (thisMonth <= 9) {
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)

}

function ajaxAct(type) {

	var pageMove = false;
	if (type == 'pageMove') {
		pageMove = true;
	}
	loadingAct();
  lectureValue();
  var formData = $('.searchForm').serialize();
  formData += '&page=' + page + '&list=' + listCount + '&pageMove=' + pageMove;
  var listAjax = $.get(useApi,formData,function(data) {
    lists ='';
		totalCount = data.totalCount;
		if(totalCount != 0) {
			$('.totalCnt').val(totalCount);
		} else {
			totalCount = $('.totalCnt').val();
		}
		
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0) {
			$.each(data.occupationalData, function() {
				lists += '<tr>';
				lists += '<td>'+j+'</td>';
				lists += '<td>'+this.lectureStart+'~'+this.lectureEnd+'</td>'; //수강기간
				lists += '<td>'+this.contentsName+'</td>'; // 과정명
				lists += '<td><form method="POST" action="printOccupational.php">';
        lists += '<input type="hidden" name="lectureOpenSeq" value="'+this.lectureOpenSeq+'">';
        lists += '<input type="hidden" name="lectureStart" value="'+this.lectureStart+'">';
        lists += '<input type="hidden" name="lectureEnd" value="'+this.lectureEnd+'">';
        lists += '<button type="submit">결과보고서</button>';
        lists += '</form></td>';
				lists += '</tr>';
				j--;
			})
		} else {
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}


function searchStudy(types){
	
	if(types=='lectureDay'){

		$('select[name="lectureDay"], strong.noticeSearch').remove();
		$('input[name="lectureStart"], input[name="lectureEnd"]').val('');

		var dateChain = ''
		dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
		if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
			dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
		}else{
			dateChain += $('select[name="searchMonth"]').val().replace('월','');
		}

		$.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain, 'serviceType':5},function(data){
			var selectWrite = ''

			if(data.totalCount !=0){
				selectWrite += '<select name="lectureDay">';
				selectWrite += '<option value="">기간을 선택해주세요</option>';
				$.each(data.searchResult,function(){
					selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
				})
				selectWrite += '</select>';
			}else{
				selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>';
			}

			$('select[name="searchMonth"]').after(selectWrite);

		})
	}
}

// select한 기간 start,end 값으로 나눠서 폼에 담기
function lectureValue() {
	$('input[name="lectureStart"]').val('');
	$('input[name="lectureEnd"]').val('');
  let lectureDay = $('select[name="lectureDay"]').val();
	if(lectureDay !== '' && lectureDay != undefined) {
		let [lectureStart, lectureEnd] = lectureDay.split('~').map(date => date.trim());
		if(lectureStart !== undefined && lectureEnd !== undefined) {
			$('input[name="lectureStart"]').val(lectureStart);
			$('input[name="lectureEnd"]').val(lectureEnd);
  	}
	}
}

function pagerAct() {
	var allPagerCnt = Math.ceil(totalCount / listCount) + 1;
	var nowPage = Math.floor(page / pagerCount);
	var startPage = nowPage * pagerCount;
	var endPage = startPage + pagerCount;
	
	if (endPage > allPagerCnt) {
			endPage = allPagerCnt
	}

	var nextPage = endPage;
	var prevPage = startPage - pagerCount;
	if (prevPage <= 0) {
			prevPage = 1
	}

	var pagerArea = ''
	if (startPage >= pagerCount) {
			if (pageMode == 'mobilePage') {
					pagerArea += '<button type="button" title="이전" onClick="pageMove(' + prevPage + ')"><img src="../images/mobile/btn_prev.png"></button>';
			} else {
					pagerArea += '<button type="button" title="이전" onClick="pageMove(1)"><img src="../images/admin/pager_prev_ver2.png" /></button>';
					pagerArea += '<button type="button" title="이전" onClick="pageMove(' + prevPage + ')"><img src="../images/admin/pager_prev.png" /></button>';
			}
	}

	for (i = (startPage + 1); i < endPage; i++) {
			if (i != page) {
					pagerArea += '<a href="javascript:pageMove(' + i + ')">' + i + '</a>'
			} else {
					pagerArea += '<b>' + i + '</b>'
			}
	}
	if (endPage < allPagerCnt) {
			if (pageMode == 'mobilePage') {
					pagerArea += '<button type="button" title="다음" onClick="pageMove(' + nextPage + ')"><img src="../images/mobile/btn_next.png"></button>';
			} else {
					pagerArea += '<button type="button" onClick="pageMove(' + nextPage + ')"><img src="../images/admin/pager_next.png" /></button>';
					pagerArea += '<button type="button" onClick="pageMove(' + ( allPagerCnt - 1 ) + ')"><img src="../images/admin/pager_next_ver2.png" /></button>';

			}
	}
	
	if ($('body').find('div.pager').length == 0) {
			$('#contentsArea').append('<div class="pager"></div>')
			$('.pager').html(pagerArea)
	} else {
			$('.pager').html(pagerArea)
	}
	$(window).scrollTop(0);
}

function pageMove(pageNum) {
	page = pageNum
	ajaxAct('pageMove');
}
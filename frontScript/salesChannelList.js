
//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	if(loginUserLevel < '5') {
		actionArea += '<button type="button" class="fRight" onClick="writeAct()">신규등록</button>';
		actionArea += '<button type="button" class="fRight" onClick="excelAct()">엑셀 다운로드</button>';
	}

    actionArea += '<select name="searchType">';
    actionArea += '<option value="vendorName">벤더사명</option>';
	actionArea += '<option value="vendor">등록번호</option>';
    actionArea += '<option value="companyCode">사업자번호</option>';
	actionArea += '<option value="ceoName">대표자명</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';

	actionArea += '<span>페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
	actionArea += '<option value="10">10개</option>';
	actionArea += '<option value="30">30개</option>';
	actionArea += '<option value="50">50개</option>';
	actionArea += '<option value="100">100개</option>';
	actionArea += '<option value="150">150개</option>';
	actionArea += '<option value="200">200개</option>';
	actionArea += '<option value="300">300개</option>';
	actionArea += '</select>&nbsp;';

	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th>번호</th>';
	contents += '<th>벤더사명</th>';
	contents += '<th>벤더등록번호</th>';
	contents += '<th>연락처</th>';
	contents += '<th>계약시작일</th>';
	contents += '<th>계약종료일</th>';
    contents += '<th>벤더상태</th>';
	contents += '<th>수정/삭제</th>';
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

		let vendorName = '';
		let vendor = '';
		let mobile01 = '';
		let mobile02 = '';
		let mobile03 = '';
		let contractStart = '';
		let contractEnd = '';

		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}

		if (totalCount != 0){
			$.each(data.vendor,  function(){
				vendorName = this.vendorName ?? '미등록';
				vendor = this.vendor ?? '미등록';
				mobile01 = this.mobile01 ?? '미등록';
				mobile02 = this.mobile02 ?? '미등록';
				mobile03 = this.mobile03 ?? '미등록';
				contractStart = this.contractStart ? this.contractStart : '미등록';
				contractEnd = this.contractEnd ? this.contractEnd : '미등록';

				lists += '<tr>';
				lists += `<td>${i}</td>`;
				lists += `<td>${vendorName}</td>`;
				lists += `<td>${vendor}</td>`;
				lists += `<td>${mobile01}-${mobile02}-${mobile03}</td>`;
				lists += `<td>${contractStart}</td>`;
				lists += `<td>${contractEnd}</td>`;
				if (this.vendorCloseDate !== null) {
					if(new Date(this.vendorCloseDate) < new Date()){
						lists += '<td>만료</td>';
					} else if (new Date(this.contractEnd) >= new Date()) {
						lists += '<td>진행중</td>';
					} else {
						lists += '<td>만료</td>';
					}
				} else {
					lists += '<td>진행중</td>';
				}

				lists += '<td>';
				lists += '<button type="button" onClick="writeAct('+this.seq+')">수정</button>&nbsp;';
				lists += '<button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button>';
				lists += '</td>';

				lists += '</tr>';
				i--
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
	})
}

function marketerChangePost(i){
	var sendSerial = $('form.marketerChangeForm_'+i).serialize();
		$.ajax({
			url: '/api/apiMarketerChange.php',
			type:'POST',
			data:sendSerial,
			dataType:'json',
			success:function(data){
				alert(data.result);
				ajaxAct();
			},
			fail:function(){
				alert(data.result);
			}
		})
}

function deleteData(apiName, sendSeq){
	if(confirm("정말 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.")){
		loadingAct();
		$.ajax({
			url: apiName,
			type:'DELETE',
			data:{'seq':sendSeq},
			success:function(data){
				loadingAct();
                if(data.result == "success"){
                    alert('삭제되었습니다.');
                }else if(data.result == 'error'){
					alert('삭제에 실패하였습니다.');
                }else{
					alert('오류가 발생했습니다.');
                }

                if(seq != ''){
					ajaxAct();
                } else{
                    ajaxAct()
                }

			},
			fail:function(){
				alert('삭제에 실패하였습니다.')
			}
		})
	}
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='vendorExcel.php?'+searchValue;
}



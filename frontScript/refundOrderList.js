//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	var lectureStart = '';
	var startDate = '';
	var endDate = '';
	var today = new Date();
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	actionArea += '<input type="hidden" name="serviceType" value="0" />';
	actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
	actionArea += '<span>신청일</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;';
	actionArea += '<span style="margin-left:50px;">수강시작일</span>';
	actionArea += '<div class="datePicker"><input type="text" name="lectureStart" class="cal" value="'+lectureStart+'" readonly="readonly" /></div>';
	//actionArea += '<span style="margin-left:50px;">신청구분</span>';
	//actionArea += '<select name="serviceType">';
    //actionArea += '<option value="">전체</option>';
    //actionArea += '<option value="0">사업주(개별)</option>';
    //actionArea += '</select>&nbsp;';
	actionArea += '<span style="margin-left:50px;">신청대상명</span>';
    actionArea += '<input type="text" style="width:100px;" name="userName">';
   /* actionArea += '<span>결제상태</span>';
	actionArea += '<select name="orderStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">결제완료</option>';
	actionArea += '<option value="N">결제대기</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<span>결제방식</span>';
	actionArea += '<select name="orderType">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="C">카드</option>';
    actionArea += '<option value="D">무통장입금</option>';
    actionArea += '<option value="V">가상계좌</option>';
	actionArea += '</select>&nbsp;';*/
	actionArea += '<span>페이지 수</span>';
	actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
	actionArea += '</select>';
	actionArea += '<button type="button" onClick="excelAct()" style="margin:0 15px;">엑셀 다운로드</button> &nbsp;';
	actionArea += '<button type="button" onClick="rnDelete()" style="margin:0 -5px;">주민번호 파기</button> &nbsp;';
	actionArea += '</div>';
	actionArea += '<button type="submit" style="width:100%;">검색</button></form>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);
	pickerAct();//데이트피커 사용

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:50px;"><input type="checkbox" id="rnCheck" onChange="checkboxAllCheck(\'rnCheck\')" /><label for="rnCheck"></label></th>';
	contents += '<th style="width:50px;">번호</th>';
	contents += '<th style="width:80px;">신청구분</th>';
	contents += '<th style="width:120px;">ID / 이름</th>';
	contents += '<th style="width:180px;">소속</th>';
	contents += '<th style="min-width:30%;">신청내역 / 수강기간</th>';
	contents += '<th style="width:150px;">신청일</th>';
	contents += '<th style="width:100px;">주민번호유무</th>';
	if(loginUserLevel < '5') {
		contents += '<th style="width:80px;">삭제</th>';
	}
	contents += '</tr></thead><tbody>';
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
	var today = new Date();
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	//searchStudy('lectureDay',checkDate)
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+'&serviceType=0'+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.order,  function(){
					lists += '<tr>';
					lists += '<td><input type="checkbox" class="rnCheck" id="rnCheck_'+this.seq+'" name="rnCheck[]" value="'+this.orderNum+'" /><label for="rnCheck_'+this.seq+'"></label></td>';
					lists += '<td>'+i+'</td>';
					lists += '<td>'+this.serviceTypeName+'</td>';

					if(this.serviceType == '1') {
						lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+'<br/>';
						lists += this.companyName+'</td>';
					} else if(this.serviceType == '4') {
						lists += '<td onClick="globalModalAct(\'memberB2CView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+'<br/>';
						lists += this.userName+'</td>';
					} else if(this.serviceType == '0') {
						lists += '<td>'+this.userID+'<br/>';
						lists += this.recipientName+'</td>';
					} else {
						lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+'<br/>';
						lists += this.userName+'</td>';
					}

					lists += '<td onClick="globalModalAct(\'companyView\',\'\',\''+this.company.companyCode+'\')" style="cursor:pointer;">'+this.company.companyName+'<br/>';
					lists += this.company.cyberURL+'</td>';
					lists += '<td onClick="globalModalAct(\'order\',\'\',\''+this.orderNum+'\')" style="cursor:pointer;">'+this.orderName+'<br/>';
					if(this.lectureStart == '0000-00-00') {
						var lectureDay = '기간 : 승인일로부터 1개월';
					} else {
						var lectureDay = this.lectureStart+' ~ '+this.lectureEnd;
					}
					lists += lectureDay+'</td>';
					//lists += '<td>'+this.orderStatusName+'</td>';
					lists += '<td>'+this.orderDate+'</td>';
					if (this.RRN01) {
						lists += '<td>O</td>';
					} else {
						lists += '<td>-</td>';
					}
					if(loginUserLevel < '5') {
						lists += '<td><button type="button" onClick="deleteData(useApi,'+this.seq+')">삭제</button></td>';
					}
					lists += '</tr>';
					i--;
			})
		}else if(loginUserLevel > userLevel){
			lists += '<tr><td class="notResult" colspan="11">조회 권한이 없습니다.</td></tr>'
		}else{
			lists += '<tr><td class="notResult" colspan="11">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
	})
}

function excelAct() {
	searchValue = $('.searchForm').serialize();
	top.location.href='refund.php?'+searchValue;
}

function rnDelete() {
	var items=[];
	$('input[name="rnCheck[]"]:checkbox:checked').each(function(){
		items.push('\''+$(this).val()+'\'');
	});
 	var rnData = items.join(',');
	//alert(rnData);
	if(confirm("선택된 주민번호를 정말 파기 하겠습니까?")){
		$.ajax({
			method:'POST',
			url:'../api/apiOrderRRN.php',
			dataType:'text',
			data: {'rnData':rnData},
			success:function(data){
				alert('선택된 주민번호가 파기 되었습니다.')
				ajaxAct()
			},
			fail:function(){
				alert('정상적으로 처리되지 않았습니다.')
			}
		})
	}

}
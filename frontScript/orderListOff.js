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
	actionArea += '<div style="margin-bottom:7px; padding-bottom:7px; border-bottom:1px dashed #ccc;">';
	actionArea += '<span>신청일</span>';
	actionArea += '<div class="datePicker"><input type="text" name="startDate" class="cal" value="'+startDate+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
	actionArea += '<div class="datePicker"><input type="text" name="endDate" class="cal"  value="'+endDate+'" readonly="readonly" /></div>&nbsp;&nbsp;';
	/*actionArea += '<span style="margin-left:106px;">수강시작일</span>';
	actionArea += '<div class="datePicker"><input type="text" name="lectureStart" class="cal" value="'+lectureStart+'" readonly="readonly" /></div>';
	actionArea += '</div>';
	actionArea += '<span>신청구분</span>';
	actionArea += '<select name="serviceType">';
    actionArea += '<option value="">전체</option>';
	actionArea += '<option value="1">사업주</option>';
    actionArea += '<option value="3">비환급</option>';
    actionArea += '</select>&nbsp;';*/
	actionArea += '<span>이름</span>';
    actionArea += '<input type="text" style="width:100px;" name="userName">';
    actionArea += '<span>결제상태</span>';
	actionArea += '<select name="orderStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">결제완료</option>';
	actionArea += '<option value="N">결제대기</option>';
    actionArea += '</select>&nbsp;';
	actionArea += '<span>주차등록상태</span>';
	actionArea += '<select name="parkingStatus">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="Y">주차등록</option>';
	actionArea += '<option value="N">주차미등록</option>';
    actionArea += '</select>&nbsp;';
    /*actionArea += '<span>결제방식</span>';
	actionArea += '<select name="orderType">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="C">카드</option>';
    actionArea += '<option value="D">무통장입금</option>';
    actionArea += '<option value="V">가상계좌</option>';
    actionArea += '</select>&nbsp;';*/
	//actionArea += '<button type="button" onClick="excelAct()" style="margin:0 15px;">엑셀 다운로드</button>';
	actionArea += '<button type="button" onClick="searchAct()">검색</button></form>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);
	pickerAct();//데이트피커 사용	
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th>번호</th>';
	//contents += '<th style="width:80px;">신청구분</th>';
	contents += '<th>이름</th>';
	contents += '<th>연락처</th>';
	contents += '<th>이메일</th>';
	contents += '<th>차량번호</th>';
	contents += '<th>결제여부</th>';
	contents += '<th>신청일</th>';
	if(loginUserLevel < '3') {
		contents += '<th>삭제</th>';
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
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+'&serviceType='+serviceType+sortData,function(data){
        // console.log(data);
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.order,  function(){
					lists += '<tr>';
					lists += '<td>'+i+'</td>';
					lists += '<td>'+this.userName+'</td>';
					lists += '<td>'+this.phone+'</td>';
					lists += '<td>'+this.email+'</td>';
					if (this.parkingStatus == 'Y') {
						lists += '<td><b style="color:blue;cursor:pointer" onclick="statusChangeAct(\'parkingStatus\',\'N\','+this.seq+')">'+this.carNum+' 등록완료</b></td>';
					} else {
						if (this.carNum) {
							lists += '<td><b style="color:red;cursor:pointer" onclick="statusChangeAct(\'parkingStatus\',\'Y\','+this.seq+')">'+this.carNum+'</b></td>';
						} else {
							lists += '<td>-</td>';
						}
					}					
					if (this.orderStatus == 'Y') {
						lists += '<td><b style="color:blue;cursor:pointer" onclick="statusChangeAct(\'orderStatus\',\'N\','+this.seq+')">입금완료</b></td>';
					} else {
						lists += '<td><b style="color:red;cursor:pointer" onclick="statusChangeAct(\'orderStatus\',\'Y\','+this.seq+')">입금대기</b></td>';
					}
					lists += '<td>'+this.orderDate+'</td>';					
					if(loginUserLevel < '3') {
						lists += '<td><button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
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

function excelAct(){
	searchValue = $('.searchForm').serialize();
	top.location.href='admission.php?'+searchValue;
}

function statusChangeAct(statusType,status,seq){
       
	if (statusType == 'parkingStatus') {
		var statusTxt = '주차등록';		
	} else {
		var statusTxt = '결제';
	}
		
	if(confirm(statusTxt+' 상태를 변경하겠습니까?')){
		$.ajax({
			url: useApi,
			type:'POST',
			data:{'seq':seq,'statusType':statusType,'status':status},
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('변경 완료!!!');
					searchAct();
				}else{
					alert('변경 실패!!! 시스템에 문의 주세요.');
				}	
			},
			fail:function(){
				alert('변경 실패!!! 시스템에 문의 주세요.')
			}
		})
	}
    
}


var sortData = '';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = listCount ? listCount :10;
var pagerCount = 10; //페이저카운트
function listAct(page){
	
	var i = '';

	//상단 액션 부분
	var actionArea = '';
	var today = new Date();

	actionArea += `<div class="search_box2" style="width:100%; min-width: 1250px;"><form class="searchForm" action="javascript:searchAct()">`;
    actionArea += '<p><label for="search01" class="m_right10 width80">회원구분</label>';
    actionArea += '<select name="membership" id="search01" class="width100 m_right10">';
    actionArea += '<option value="">선택</option>';
    actionArea += '<option value="Y">정회원</option>';
    actionArea += '<option value="N">비회원</option>';    
    actionArea += '</select>';
    actionArea += '<span class="bg_line"></span></p>';

    actionArea += '<p><label for="search02" class="m_right10 width80">이름검색</label>';
	actionArea += '<select name="searchType" class="width100 m_right10" id="search02">';
	actionArea += '<option value="searchAcName">학원명</option>';
	actionArea += '<option value="searchAcAdmin">관리자명</option>';
	actionArea += '</select>';
	actionArea += '<input type="text" name="searchValue" class="width180 m_right10" />';
    actionArea += '<span class="bg_line"></span></p>';

    actionArea += '<p><label for="search03" class="m_right10 width80">페이지수</label>';
	actionArea += '<select name="listCount" class="width100 m_right10" id="search03" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select></p>';
	actionArea += '<p class="btn_005 width130"><a href="javascript:excelAct()">엑셀 다운로드</a></p>'
	actionArea += `<p class="btn_005 width180" style="padding-left: 10px"><a href="javascript:searchAct()" style="background: #61564b">검색하기</a></p>`
	actionArea += '</form></div>';
	$('.admin_tab').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<div class="admin_table">';
	contents += '<table cellpadding="0" cellspacing="0" width="100%" class="BBSList">';
	contents += '<colgroup>';
	contents += '<col width="6%"/>';
	contents += '<col width="8%"/>';
	contents += '<col width="10%"/>';
	contents += '<col width="10%"/>';
	contents += '<col width="12%"/>';
	contents += '<col width="8%"/>';
	contents += '<col width="8%"/>';
	contents += '<col width="34%"/>';
	contents += '<col width="8%"/>';
	contents += '</colgroup>';
	contents += '<thead><tr>';
	contents += '<th>일련번호</th>';
    contents += '<th>구분</th>';
    contents += '<th>정회원변경일</th>';
    contents += '<th>학원명</th>';
	contents += '<th>학원관리자<br />ID/이름</th>';
	contents += '<th>학원설립<br />운영자</th>';
	contents += '<th>지역</th>';
	contents += '<th>주소</th>';
	contents += '<th>수정</th>';
	contents += '</tr></thead><tbody>';
	contents += '<tr><td class="notResult" colspan="9">검색값을 선택하세요.</td></tr>';
	contents += '</tbody></table>';
	contents += '</div>';
	$('.search_box2').after(contents);
	//ajaxAct();
	/*
	var thisYear = today.getFullYear();
	var thisMonth = today.getMonth()+1; //January is 0!
	if(thisMonth <= 9){
		thisMonth = '0'+thisMonth;
	}
	var checkDate = thisYear +'-'+thisMonth;
	searchStudy('lectureDay',checkDate)
	*/
}
function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	// alert(sortDatas);
	if(sortDatas != ''){
		sortData = sortDatas;
	}
	// alert(sortData);
	var listAjax = $.get('../api/apiAcademy.php','page='+page+'&list='+listCount+sortData,function(data){
        // console.log(data);
        resultData=data.result;
		if(resultData =='logout'){
			location.reload();
		}
		totalCount = data.totalCount;
		var lists = '';
		var j = totalCount;
		if(page != 1){
			j = totalCount - ((page-1)*listCount);
		}
		
		if (totalCount != 0 && loginUserLevel <= userLevel){
			$.each(data.academy,  function(){
                lists += '<tr>';
                lists += '<td>'+this.seq+'</td>';

				if(this.adminID != '' && this.adminID != null){
					var adminID = this.adminID;
				} else {
					var adminID = '미등록';
				}
				if(this.adminName != '' && this.adminName != null){
					var adminName = this.adminName;
				} else {
					var adminName = '미등록';
				}
                lists += '<td><select class="width100" onChange="membershipChg(\''+this.seq+'\',this);">';
                if(this.membership != 'Y'){
					var membershipDate = '';
                    lists += '<option value="N" selected>비회원</option>';
                    lists += '<option value="Y">정회원</option>';
                }else{
					var membershipDate = this.membershipDate;
                    lists += '<option value="Y" selected>정회원</option>';
                    lists += '<option value="N">비회원</option>';
                }
                lists +='</select></td>';
                lists += '<td>'+membershipDate+'</td>';
                lists += '<td>'+this.academyName+'</td>';
                lists += '<td>'+adminID+'<br/>'+adminName+'</td>';
                lists += '<td>'+this.academyCEO+'</td>';
                lists += '<td>'+this.country+'</td>';
                lists += '<td>'+this.address+'</td>';
                //lists += '<td><p class="btn_004 width50"><a href="javascript:alert(\'준비중\')">수정</a></p></td>';
                lists += '<td><p class="btn_004 width50"><a href="../adminKaoh/03_academyInput.php?locaSel=1202&academySeq='+this.seq+'">수정</a></p></td>';
                
                
				lists += '</tr>';
				j--;
                
			})
		}
            $('.BBSList tbody').html(lists);
            pagerAct();
		    loadingAct();
        
    })
}

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='academyExcel.php?'+searchValue;
}

function membershipChg(seq, membership) {

    var membershipVal = membership.value;
    var confirmMem = confirm("정말 수정하시겠습니까?");
    
    if(confirmMem == true){
        $.ajax({
            type : 'POST',
            url : '../api/apiAcademy.php',
            data : {'seq' : seq, 
                    'membership' : membershipVal,
                },
            dataType : 'text',
            success : function(data){
                alert('수정되었습니다');
                ajaxAct();
            }
    
        });
    }else{
        ajaxAct();
    }
}
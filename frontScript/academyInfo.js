
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

	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div>';
    actionArea += '<span>회원구분</span>';
    actionArea += '<select name="membership">';
    actionArea += '<option value="">선택</option>';
    actionArea += '<option value="Y">정회원</option>';
    actionArea += '<option value="N">비회원</option>';

    
    actionArea += '</select>';

    actionArea += '<span>이름검색</span>';
	actionArea += '<select name="searchType">';
	actionArea += '<option value="searchAcName">학원명</option>';
	actionArea += '<option value="searchAcAdmin">관리자명</option>';
	actionArea += '</select>';
	actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';
	
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
    actionArea += '&nbsp;&nbsp;<button type="button" onClick="excelAct()">엑셀 다운로드</button>';

	actionArea += '</div>';
	/*actionArea += '<div>';
	actionArea += '<span>과정명</span>';
    actionArea += '<select name="contentSel"></select>';
	actionArea += '</div>';*/
	actionArea += '<button type="submit" style="width:100%">검색</button>';
	actionArea += '</form></div>';
	$('#contents > h1').after(actionArea);

	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
    contents += '<th style="width:50px;">번호</th>';
    contents += '<th style="width:50px;">구분</th>';
    contents += '<th style="width:50px;">정회원변경일</th>';
	contents += '<th style="width:80px;">ID<br />이름</th>';
	contents += '<th style="width:200px;">학원명</th>';
	contents += '<th style="width:80px;">지역</th>';
	contents += '<th style="width:150px;">주소</th>';
	contents += '<th style="width:100px;">우편번호</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	// ajaxAct();
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
                lists += '<td>'+j+'</td>';
                // if(this.membership != 'Y'){
                //     var membership = "비회원";
                // }else{
                //     var membership = "정회원";
                // }
                lists += '<td><select onChange="membershipChg(\''+this.seq+'\',this);">';
                if(this.membership != 'Y'){
                    lists += '<option value="N" selected>비회원</option>';
                    lists += '<option value="Y">정회원</option>';
                }else{
                    lists += '<option value="Y" selected>정회원</option>';
                    lists += '<option value="N">비회원</option>';
                }
                lists +='</select></td>';
                lists += '<td>'+this.membershipDate+'</td>';
                lists += '<td>'+this.academyCEO+'</td>';
                lists += '<td>'+this.academyName+'</td>';
                lists += '<td>'+this.country+'</td>';
                lists += '<td>'+this.address+'</td>';
                lists += '<td>'+this.zipCode+'</td>';
                
                
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
    


    // console.log("학원번호"+seq+"선택한구분"+membership.value);
}
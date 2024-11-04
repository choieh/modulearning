//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
function listAct(){
	
	//상단 액션 부분	
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';	
	actionArea += '<button type="button" class="fRight" onClick="writeAct()">신규등록</button>';
	
    actionArea += '<select name="searchType">';	
    actionArea += '<option value="companyName">설문명</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';	
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:5%">번호</th>';
	contents += '<th style="width:20%">설문코드</th>';
	contents += '<th style="width:35%">설문명</th>';
	contents += '<th style="width:10%">설정</th>';
	contents += '<th style="width:10%">등록일</th>';
    contents += '<th style="width:10%">수정 / 삭제</th>';
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

	var listAjax = $.get('../api/apiSurveySet.php','page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		var department = '';
		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			
			$.each(data.surveySet,  function(){
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.seq+'</td>';
				lists += '<td>'+this.surveySet+'</td>';
				lists += '<td><button type="button" onClick="surveySetDetail('+this.seq+',\''+this.surveySet+'\')">설정</button></td>';
				lists += '<td>'+this.inputDate+'</td>';
				lists += '<td>';
				lists += '<button type="button" onClick="writeAct('+this.seq+')">수정</button>&nbsp;';
				lists += '<button type="button" onClick="deleteData(\'../api/apiSurveySet.php\','+this.seq+')">삭제</button>';
				lists += '</td>';

				lists += '</tr>';
				i--
			})
		}else{
			lists += '<tr><td class="notResult" colspan="7">검색 결과가 없습니다.</td></tr>'
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
		$.ajax({
			url: apiName,
			type:'DELETE',
			data:{'seq':sendSeq},
			dataType:'text',
			success:function(data){
                if(data == "success"){
                    alert('삭제되었습니다.');
                }else if(data == 'member'){
                    alert('해당 사업주정보로 등록된 회원정보가 있습니다.');
                }else{
                    alert('삭제에 실패하였습니다.')
                }
                if(seq != ''){
                    listAct(page);
                }else{
                    ajaxAct()
                }
				
			},
			fail:function(){
				alert('삭제에 실패하였습니다.')
			}
		})
	}
}

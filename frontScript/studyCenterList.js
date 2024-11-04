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
    actionArea += '<select name="searchType">';	
    actionArea += '<option value="companyName">사업주명</option>';
    //actionArea += '<option value="companyID">아이디</option>';
    actionArea += '<option value="companyCode">사업자번호</option>';
	actionArea += '<option value="ceoName">대표자명</option>';
	if(loginUserLevel < '5') {
    actionArea += '<option value="marketerName">영업담당자</option>';
	}
	actionArea += '<option value="phone">연락처</option>';
    //actionArea += '<option value="hrdCode">HRD번호</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
	if(loginUserID == 'leehr0523'){
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
	}
	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:60px;">번호</th>';
	contents += '<th style="width:120px;">사업자번호</th>';
	contents += '<th>사업주명</th>';
	contents += '<th style="width:120px;">회사규모</th>';
	contents += '<th style="width:200px;">교육담당자</th>';
	/*if(loginUserLevel == '5') { //영업팀장만 설정 기능 보임
		contents += '<th style="width:200px;">영업담당자설정</th>';
	} else if(loginUserLevel < '5') {
		contents += '<th style="width:200px;">영업담당자</th>';
	}*/
	contents += '<th style="width:90px;">내부운영담당자</th>';
	
		contents += '<th style="width:100px;">교육문의</th>';
		contents += '<th style="width:100px;">공지사항</th>';
	if(loginUserLevel <= '5') {
		contents += '<th style="width:100px;">연수원설정</th>';
	}
		contents += '<th style="width:100px;">등록일</th>';	

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
		var department = '';
		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			$.each(data.company,  function(){
				var oriMktID = this.marketer.ID;
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.companyCode+'</td>';
				lists += '<td onClick="globalModalAct(\'companyView\','+this.seq+')" style="cursor:pointer;">'+this.companyName+'</td>';
				lists += '<td>';
				if(this.companyScale == 'A'){
					lists += '대규모 1000인 이상'
				}else if(this.companyScale =='B'){
					lists += '대규모 1000인 미만'
				}else if(this.companyScale =='C'){
					lists += '우선지원대상'
				}
				lists += '</td>';
				lists += '<td>'+this.manager.name+'<br />'+this.manager.mobile+'<br />'+this.manager.email+'</td>';
				/*if(loginUserLevel == '5') { //영업팀장만 설정 기능 보임
					var mktList = '';
					lists += '<td>현재 담당자 : '+this.marketer.name;
					lists += '<form class="marketerChangeForm_'+i+'" method="post" action="javascript:marketerChangePost(\''+i+'\')">';
					lists += '<input type="hidden" name="companyCodeMkt" value="'+this.companyCode+'">';
					lists += '<select class="marketerChange" name="marketerChange">';
					$.get('../api/apiMarketerChange.php','companyCode='+this.marketer.companyCode+'&userID='+loginUserID,function(data){
						$.each(data.marketer, function(){
							//if(oriMktID == this.userID) {
								//mktList += '<option value="'+this.userID+'" selected="selected">'+this.userName+' / '+this.department+'</option>';								
							//} else {
								if(this.department == null) {
									department = '';
								} else {
									department = ' / '+this.department;
								}

								mktList += '<option value="'+this.userID+'">'+this.userName+department+'</option>';
							//}
						})
						$('.marketerChange').html(mktList);
					})
					lists += '</select>&nbsp;<button type="submit">적용</button></form>';					
					lists += '</td>';
				} else {
					if(loginUserLevel < '5') {
						lists += '<td>'+this.marketer.name+'</td>';
					}
				}*/
				lists += '<td>'+this.staff.name+'</td>';
				
					lists += '<td><b onclick="detailPop(\'consult\',\''+this.companyID+'\')" style="cursor:pointer;">교육문의</b></td>';
					if (this.boardCode != '') {
						//lists += '<td><a href="/admin/06_board.php?locaSel=0907&boardCode='+this.boardCode+'&studyCenter=Y">공지사항</a></td>'
						lists += '<td><b onclick="detailPop(\'bbs\',\''+this.boardCode+'\')" style="cursor:pointer;">공지사항</b></td>';
					} else {
						lists += '<td><button type="button" onClick="writeBoard(\''+this.companyID+'\',\''+this.companyName+'\')">공지사항생성</button></td>'
					}					
					//lists += '<td><a href="/admin/06_board.php?locaSel=0907&boardCode='+this.boardCode+'&studyCenter=Y">공지사항</a></td>'
				if(loginUserLevel <= '5') {
					lists += '<td>'				
					if(this.studyEnabled != 'N' ){ 
						lists += '<button type="button" onClick="writeCenter(\''+this.companyID+'\')">설정</button>'
					}else{
						lists += '사용안함'
					}
					lists += '</td>';
				}
					lists += '<td>'+this.inputDate.substr(0,10)+'</td>';
				
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

function detailPop(gubun,pvalue) {

	if (gubun == 'consult') {
		$('#popup_base').attr('src','/admin/06_mantoman_studyCenter_pop.php?companyID='+pvalue);
	} else if (gubun == 'bbs') {
		$('#popup_base').attr('src','/admin/06_board_studyCenter.php?boardCode='+pvalue+'&studyCenter=Y');
	}	
	$('#popup_base').fullPopupOn({
		//companyCode:companyCode,
		//lectureOpenSeq:lectureOpenSeq
	}); 	
	
}

function writeBoard(companyID,companyName) {	
	
	$.ajax({
		url: '/api/apiStudyCenter.php',
		type:'POST',
		data:{'companyID':companyID,'companyName':companyName,'newBoard':'Y'},
		dataType:'text',
		success:function(data){
	
			if (data == 'success') {
				alert('게시판이 생성 되었습니다.');
				ajaxAct();
			} else {
				alert('게시판 생성에 실패 하였습니다.');
			}	
		},
		fail:function(){
			alert('게시판 생성에 실패 하였습니다.');
		}
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

function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='companyExcel.php?'+searchValue;
}

function excelPark(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='companyExcelPark.php?'+searchValue;
}




function excelActJob(){
	var year = prompt("년도를 기입해 주세요(예. 2017)", "검색년도 기입");
	location.href='/api/apiCompanyStudyStatsJob.php?year='+year;
}

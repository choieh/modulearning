//리스트액션
function listAct(page){
	
		countList = $.get(useApi,{},function(data){
			var actionArea = '';
			var consult = '';
			var status = '';
			var learnCount = '';
			var systemCount = '';
			var registerCount = '';
			var tendinousCount = '';
			var allianceCount = '';
			var etcCount = '';
			var today = new Date();
			var i= '';
			var thisYear = today.getFullYear();
			var h= '';
			var thisMonth = today.getMonth()+1; //January is 0!

			actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
			if(pageMode != 'userPage'){
				actionArea += '<select name="addItem01">';
				actionArea += '<option value="">== 구분전체 ==</option>';
				actionArea += '<option value="관리감독자">관리감독자</option>';
				actionArea += '<option value="법정의무교육">법정의무교육</option>';
				actionArea += '<option value="기업직업훈련카드">기업직업훈련카드</option>';
				actionArea += '<option value="패키지A">패키지A</option>';
				actionArea += '<option value="패키지B">패키지B</option>';
				actionArea += '<option value="패키지C">패키지C</option>';
				actionArea += '<option value="패키지D">패키지D</option>';
				actionArea += '<option value="패키지E">패키지E</option>';
				actionArea += '<option value="정기산업안전보건교육">정기산업안전보건교육+신규채용시교육</option>'
				actionArea += '<option value="직장 내 성희롱 예방교육">직장 내 성희롱 예방교육</option>';
				actionArea += '<option value="직장 내 장애인 인식개선 교육">직장 내 장애인 인식개선 교육</option>';
				actionArea += '<option value="직장 내 괴롭힘 방지 교육">직장 내 괴롭힘 방지 교육</option>';
				actionArea += '<option value="개인정보보호교육">개인정보보호교육</option>';
				actionArea += '<option value="퇴직연금 교육">퇴직연금 교육</option>';
				actionArea += '<option value="산업안전 관리감독자">산업안전 관리감독자</option>';
				actionArea += '<option value="기타">기타</option>';  				
				actionArea += '</select>&nbsp;';

				actionArea += '<select name="status" class="'+status+'"><option value="">== 상태 ==</option>'+optWrite['status']+'</select>';
				actionArea += '<select name="searchType">';
				actionArea += '<option value="userName">이름</option>';
				actionArea += '</select>&nbsp;';
				actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';				
				actionArea += '<option value="">전체</option>';				
				for(i= 2018; i <= thisYear; i++){
					if(i != thisYear){
						actionArea += '<option value="'+i+'">'+i+'년</option>';
					}else{
						actionArea += '<option value="'+i+'" selected="selected">'+i+'년</option>';
					}
				}
				actionArea += '</select>';
				actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
				actionArea += '<option value="">전체</option>';				
				for(h = 1; h <= 12; h++){
					//if(h != thisMonth){
						actionArea += '<option value="'+h+'">'+h+'월</option>';
					//}else{
					//	actionArea += '<option value="'+h+'" selected="selected">'+h+'월</option>';
					//}
					
				}
				actionArea += '</select>&nbsp;&nbsp;&nbsp;';
			}
			actionArea += '<input type="text" name="searchValue" />&nbsp;<button type="button" onClick="searchAct()">검색하기</button>';
			
			if(loginUserLevel < 5) {
				actionArea += ' <button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
				actionArea += '<div style="margin:15px 0 0; padding-bottom:15px; ">';
				actionArea += '<span class="searchSpan" style="font-size: 20px;font-weight: bold;color: gray;" onClick="searchAct()">전체(총 '+data.totalCountN+'건)</span>';
				actionArea += '<span class="searchSpan" style="font-size: 20px;font-weight: bold;color: blue;" onClick="searchAct2(\'C\')">완료건(총 '+data.totalCountS+'건)</span>';
				actionArea += '<span class="searchSpan" style="font-size: 20px;font-weight: bold;color: red;" onClick="searchAct2(\'W\')">미 처리건(총 '+data.totalMeCount+'건)</span>';				
				actionArea += '</div>';
			}
			
			actionArea += '</form>';
			actionArea += '</div>';
			
			if(pageMode == 'userPage'){
				$('#titleArea').after(actionArea);
			}else{
				$('#contents > h1').after(actionArea);
				$('#contents > h1').html('1:1상담');
			}
		})
			
		var contents = '';
		contents += '<table><thead><tr>';
		contents += '<th>번호</th>';
		contents += '<th>구분</th>';
		contents += '<th>구분상세</th>';
		contents += '<th>기업명</th>';
		contents += '<th>담당자</th>';		
		contents += '<th>연락처</th>';
		contents += '<th>이메일</th>';
		contents += '<th>등록일</th>';		
		contents += '<th>상태</th>';
		contents += '<th>처리자</th>';
		contents += '</tr></thead><tbody>';		
		contents += '</tbody></table>';		
		$('#wrap').removeAttr('class');
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		ajaxAct();
	
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	var type = '';
	if(pageMode == 'adminPage'){
		type='admin';
	}
	var listAjax = $.get(useApi,'viewType='+type+'&page='+page+'&list='+listCount+'&boardType='+boardType+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = '';
		if (page != 1){
			i = (page-1)*listCount;
		}else{
			i = 1;
		}

		limit = (page - 1) * listCount; 
		i = data.totalCount - limit; //2017.1.25 게시글번호 역순처리

		if (totalCount != 0){
			$.each(data.consult, function(){
				if(this.status == 'C'){
					lists += '<tr style="color:#adadad;cursor:pointer" onClick="viewAct(\'' + this.seq + '\',\'' + this.addItem02 + '\')">';
				}else{
					lists += '<tr style="cursor:pointer" onClick="viewAct(\'' + this.seq + '\',\'' + this.addItem02 + '\')">';
				}	
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.addItem01+'</td>';
				lists += '<td>'+this.addItem02+'</td>';
				lists += '<td>'+this.company+'</td>';
				lists += '<td>'+this.userName+'</td>';
				if (loginUserID == '10004ok') {
					lists += '<td>'+this.phone01+'-'+this.phone02+'-****</td>';
				} else {
					lists += '<td>'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</td>';
				}
				lists += '<td>'+this.email+'</td>';
				lists += '<td>'+this.inputDate+'</td>';				
				var status = '';
				var replyName = '';
				if(this.status == 'W'){
					status = '<span style="color:red"><b>대기</b></span>';
				}else if(this.status == 'C'){
					status = '완료';
				}
				if(this.replyName){

                    var uLength = this.replyName.length;
					for (var u =0; u < uLength; u++){
						replyName += u != 1 ? this.replyName.charAt(u) : '*';
					}
				}else{
					replyName = '';
				}
				lists += '<td>'+status+'</td>';
				lists += '<td>'+replyName+'</td>';
				lists += '</tr>';
				i--;
			})

		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 글이 없습니다.</td></tr>';
		}
		$('.BBSList > table > tbody').html(lists);
		pagerAct();
	})
}

//리스트형태 검색 search Ajax
function searchAct2(status){
	if (status) {
		searchValue = '&status='+status;
	}
	page = 1;
	ajaxAct(searchValue);
}

//리스트형태 검색 search Ajax
function searchAct3(){
	val = $('input[name="searchValue"]').val();
	searchValue = '&consult='+val;
	page = 1;
	ajaxAct(searchValue);
}

//엑셀다운
function excelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='mantomanExcelEkcls.php?'+searchValue;
}

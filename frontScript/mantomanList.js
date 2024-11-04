//리스트액션
function listAct(page){
	if( modes != 'writeMode'){
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
				actionArea += '<span>문의종류</span>'
				actionArea += '<select name="consult" class="'+consult+'"><option value="">전체</option>'+optWrite['consult']+'</select>'
				actionArea += '<select name="status" class="'+status+'"><option value="">전체</option>'+optWrite['status']+'</select>';
				actionArea += '<select name="searchType">';
				actionArea += '<option value="userName">이름</option>';
				actionArea += '<option value="subject">제목</option>';
				actionArea += '</select>&nbsp;';
				actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
				actionArea += '<option value="">전체</option>';
				for(i= 2018; i <= thisYear; i++){
					if(i != thisYear){
						actionArea += '<option>'+i+'년</option>';
					}else{
						actionArea += '<option selected="selected">'+i+'년</option>';
					}

				}
				actionArea += '</select>';
				actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';
				actionArea += '<option value="">전체</option>';
				for(h = 1; h <= 12; h++){
					if(h != thisMonth){
						actionArea += '<option>'+h+'월</option>';
					}else{
						actionArea += '<option selected="selected">'+h+'월</option>';
					}

				}
				actionArea += '</select>&nbsp;&nbsp;&nbsp;';
			}
			actionArea += '<input type="text" name="searchValue" />&nbsp;<button type="button" onClick="searchAct()">검색하기</button>';

			if(pageMode != 'userPage'){
				if(loginUserLevel < 5) {
					actionArea += ' <button type="button" onClick="excelAct()" style="margin-left:10px">엑셀 다운로드</button>';
					actionArea += '<div style="margin:15px 0 0; padding-bottom:15px; ">';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'learn\')">학습질의(총 '+data.learnCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'contents\')">콘텐츠 오류(총 '+data.contentCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'progress\')">진도율 관련(총 '+data.progressCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'system\')">시스템 관련(총 '+data.systemCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'testAll\')">평가 관련(총 '+data.testAllCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'passOK\')">수료 관련(총 '+data.passOKCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'score\')">성적 이의신청(총 '+data.scoreCount+'건)</span>';
					actionArea += '<span class="searchSpan" onClick="searchAct2(\'tendinous\')">건의사항(총 '+data.tendinousCount+'건)</span>';
					actionArea += '<span class="searchSpan" style="border-right:none;" onClick="searchAct2(\'etc\')">기타(총 '+data.etcCount+'건)</span>';
					actionArea += '</div>';
				}
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
		contents += '<th style="width:60px;">번호</th>';
		contents += '<th style="width:90px;">문의종류</th>';
		if(pageMode !='userPage' && pageMode !='studyCenterPage'){
			contents += '<th style="width:100px;">이름</th>';
			contents += '<th style="width:140px;">연락처</th>';
			contents += '<th class="left" >상담제목</th>';
		} else {
			contents += '<th class="left">상담제목</th>';
		}
		
		contents += '<th style="width:120px;">등록일</th>';
		contents += '<th style="width:80px;">답변</th>';
		contents += '<th>답변자</th>';
		contents += '</tr></thead><tbody>';
		contents += '</tbody></table>';
		if(pageMode == 'userPage' || pageMode == 'studyCenterPage'){
		  contents += '<div class="btnArea"><button type="button" onClick="writeAct()" class="fRight">문의하기</button></div>';
		}
		$('#wrap').removeAttr('class');
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		ajaxAct();
	}else{
		writeAct();
	}
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
    if(flag == 'sjhy'){
        flagData = "&flag=sjhy";
    } else if(flag == 'djhy'){
        flagData = "&flag=djhy";
    } else if(flag == 'cbhy'){
        flagData = "&flag=cbhy";
    } else if(flag == 'cnhy'){
        flagData = "&flag=cnhy";
    }else {
        flagData = '';
    }
	var type = '';
	if(pageMode == 'adminPage'){
		type='admin';
	}
	
	var listAjax = $.get(useApi,'viewType='+type+'&page='+page+'&list='+listCount+'&boardType='+boardType+sortData+flagData,function(data){
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
					lists += '<tr style="color:#adadad">';
				}else{
					lists += '<tr>';
				}
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.categoryName+'</td>';
				if(pageMode != 'userPage' && pageMode !='studyCenterPage'){
					lists += '<td onClick="globalModalAct(\'memberView\',\'\',\''+this.userID+'\')" style="cursor:pointer;">'+this.userName+'</td>';
					lists += '<td>'+this.phone01+'-'+this.phone02+'-'+this.phone03+'</td>';
				}
				lists += '<td class="Left" onClick="viewAct('+this.seq+')" style="cursor:pointer;">'+this.subject+'</td>';
				lists += '<td>'+this.inputDate.substr(0,10)+'</td>';
				var status = '';
				var replyName = '';
				if(this.status == 'W'){
					status = '대기';
				}else if(this.status == 'D'){
					status = '보류';
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
			lists += '<tr><td class="notResult" colspan="6">아직 등록된 글이 없습니다.</td></tr>';
		}
		$('.BBSList > table > tbody').html(lists);
		pagerAct();
	})
}

//리스트형태 검색 search Ajax
function searchAct2(val){
	searchValue = '&consult='+val;
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
	top.location.href='mantomanExcel.php?'+searchValue;
}

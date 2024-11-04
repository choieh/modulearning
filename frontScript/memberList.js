//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

const allowUserID = [
    'eungmin2', 'zkfmak3785', 'dr2201', 'hh19', 'sseul0613', 'dnthdgml', 'want314', 'by1644', 'wlth5704'
];

//리스트 소팅
function listAct(page){

	//상단 액션 부분
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	if(loginUserLevel < 5) {
		//actionArea += '<button type="button" class="fRight">엑셀출력하기</button>';
		actionArea += '<button type="button" class="fRight" onClick="writeAct()">회원등록</button>';
		//actionArea += '<button type="button" class="fRight">선택메일</button>';
		//actionArea += '<button type="button" class="fRight">전체메일</button>';
	}
	if (loginUserLevel <= 2 && loginUserLevel != '') {
		actionArea += '<button type="button" class="fRight" onClick="excelAct('+userLevel+')">엑셀출력하기</button>';
	}
    /*actionArea += '<select name="searchType">';
	if(userLevel == 8) {
		// actionArea += '<option value="companyName">사업주</option>';
		actionArea += '<option value="userName">이름</option>';
	} else {
		actionArea += '<option value="userName">이름</option>';
		// actionArea += '<option value="companyName">사업주</option>';
	}
    actionArea += '<option value="userID">아이디</option>';
    actionArea += '<option value="mobile">연락처</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
    actionArea += '&nbsp;&nbsp;사업주 : <input type="text" name="companyName">&nbsp;';*/

	actionArea += '<span>이름/ID</span>';
	actionArea += '<input type="text" name="userSearch" />&nbsp;';
	actionArea += '<span>연락처</span>';
	actionArea += '<input type="text" name="mobileSearch" />&nbsp;';
	actionArea += '<span>사업주</span>';
	actionArea += '<input type="text" name="companySearch" />&nbsp;';
	if (loginUserID != 'hreducenter') {
		actionArea += '<span>수강연동</span>';
		actionArea += '<select id="sso" name="sso" >';
		actionArea += '</select>&nbsp;'
		actionArea += '<span>수강연동key없음</span>';
		actionArea += '<input type="checkbox" id="ssoKeyCheck" name="ssoKeyCheck" value="Y" /><label for="ssoKeyCheck"></label>';
		actionArea += '</select>&nbsp;'
	}


	// actionArea += '<button type="submit" onClick="searchAct()">검색하기</button></form>';
	actionArea += '<button type="submit">검색하기</button></form>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);

	if (loginUserID != 'hreducenter') {
		createOptions('sso', 'nynSso', 'ssoCode', 'ssoName', '해당없음', sso, condition = '');
	}

	//게시물 소팅부분
	var contents = '';

	contents += '<table><thead><tr>';
	//contents += '<th style="width:50px;"><input type="checkbox" id="checkAll" onChange="checkboxAllCheck(\'checkAll\')" /><label for="checkAll"></label></th>';
	contents += '<th style="width:60px;">번호</th>';
	contents += '<th>아이디/이름</th>';
	contents += '<th style="width:200px;">사업주</th>';
	contents += '<th style="width:120px;">생년월일/성별</th>';
	if(allowUserID.includes(loginUserID)){
		contents += '<th style="width:140px;">주민번호</th>';
	}
	contents += '<th style="width:200px;">연락처/E-mail</th>';
	contents += '<th style="width:140px;">가입일</th>';
	contents += '<th style="width:140px;">최근 로그인</th>';
	if (loginUserID != 'hreducenter') {
		contents += '<th style="width:120px;">비번 초기화</th>';
	}

	contents += '<th style="width:80px;">수정</th>';
	if(loginUserLevel < 5){
	  contents += '<th style="width:80px;">삭제</th>';
	}
	contents += '</tr></thead><tbody>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(sortDatas){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	if(loginUserLevel == 4) {
		useApi = useApiB2C;
		var typeView = 'memberB2CView';
	} else {
		var typeView = 'memberView';
	}
	var listAjax = $.get(useApi,'page='+page+'&userLevel='+userLevel+'&list='+listCount+'&joinURL='+joinURL+sortData,function(data){
		totalCount = data.totalCount;
		//alert(totalCount)
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.member,  function(){
				if(this.userDelete.userDelete != 'Y'){
					lists += '<tr>';
					//lists += '<td><input type="checkbox" name="check['+this.seq+']" id="check'+this.seq+'" class="checkAll" /><label for="check'+this.seq+'"></label></td>';
					lists += '<td>'+i+'</td>';
					if(this.userRetire == 'Y'){
						lists += '<td onClick="globalModalAct(\''+typeView+'\','+this.seq+',\''+this.userID+'\')" style="cursor:pointer; color:red;">'+this.userID+'<br />'+this.userName+'(퇴사자)</td>';
					} else{
						lists += '<td onClick="globalModalAct(\''+typeView+'\','+this.seq+',\''+this.userID+'\')" style="cursor:pointer;">'+this.userID+' / '+this.userName;
						if (this.ssoName) {
							lists += ' <br/><span style="color:blue">(수강연동: '+this.ssoName+' / 기업ID : '+this.ssoKey+')</span>';			
						}
						lists += '</td>';
					}
					lists += '<td onClick="globalModalAct(\'companyView\','+this.company.companySeq+',\''+this.company.companyCode+'\')" style="cursor:pointer;">'+this.company.companyName+'</td>';
					lists += '<td>'+this.birth+'<br />'+this.sexName+'</td>';
					if(allowUserID.includes(loginUserID)){
						lists += '<td>';
						if (this.unResno01 || this.unResno02) {
							lists += this.unResno01+'-'+this.unResno02;
						}
						lists += '</td>';
					}

					lists += '<td>'+this.mobile01+'-'+this.mobile02+'-'+this.mobile03+'<br />';
					if(this.email01 != '' || this.email01 != null){
						lists += this.email01+'@'+this.email02;
					}else{
						lists += '미등록';
					}
					lists += '<td>';
					if(this.inputDate != null){
						//lists += this.inputDate.substr(0,10)
						lists += this.inputDate;
					}else{
						lists += '-';
					}
					lists += '</td>';
					lists += '<td>';
					if(this.loginTime != null){
						//lists += this.loginTime.substr(0,10)
						lists += this.loginTime;
					}else{
						lists += '-';
					}
					lists += '</td>';
					if(loginUserLevel < '5'){
						//lists += '<td><button type="button" onClick="pwdReset(\''+this.seq+'\',\''+this.birth.substr(2,4)+'\')">초기화</button></td>';
						lists += '<td><button type="button"' +
							' onClick="pwdReset(\''+this.seq+'\',\''+this.birth.substr(2,4)+'\',\''+this.userLevel.userLevel+'\',\''+this.company.companyCode+'\')">초기화</button></td>';
					}
					if(loginUserLevel <= this.userLevel){
						lists += '<td><button type="button" onClick="writeAct('+this.seq+')">수정</button></td>';
					}
					if(loginUserLevel < '5'){
						lists += '<td><button type="button" onClick="memDelete(\''+this.userID+'\')">삭제</button></td>';
					}

					lists += '</tr>';
					i--;
				}
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
		loadingAct();
	})
}

function memDelete(memID){
	if(confirm('회원정보를 삭제하시겠습니까? 삭제 후 복구하실 수 없습니다.')) {
		$.ajax({
			url: useApi,
			type:'DELETE',
			data:'memDel=Y&memID='+memID,
			dataType:'text',
			success:function(data){
				if(data == 'success'){
					alert('삭제되었습니다.');
				} else if(data == 'no') {
					alert('수강내역이 존재합니다. 수강내역이 없는 회원만 삭제할 수 있습니다.');
				}
				ajaxAct();
			},
			fail:function(){
				alert('오류가 발생하였습니다.')
			}
		})
	}
}

function excelAct(userLevel){
	searchValue = $('.searchForm').serialize()
	if (!userLevel) {
		userLevel = '';
	}
	searchValue = '&'+searchValue+'&userLevel='+userLevel;
	top.location.href='memberExcel.php?'+searchValue;
}

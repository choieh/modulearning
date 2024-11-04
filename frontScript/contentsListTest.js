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
	//pageMaxUp();
	$('.BBSList').remove();

	$.get(categoryApi,{'value01':'lectureCode'},function(data){
		var optSort01 = '';
		optSort01 += '<option value="">전체</option>';
		$.each(data.category,function(){
			optSort01 += '<option value="'+this.value01+'">';
			optSort01 += this.value02;
			optSort01 += '</option>'
		})
		tmpSort01 = optSort01;
		var actionArea = '';
		actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
		actionArea += '<div>';
		if(loginUserLevel <= 4) {
			actionArea += '<button type="button" onClick="writeAct(\'\',\'contentsWrite\')" class="fRight">과정추가</button>';
			//actionArea += '<button type="button" onClick="location.href=\'contentsListExcelA.php?enabled='+enabled+'\'" class="fRight">엑셀 다운로드</button>';
			//actionArea += '<button type="button" onClick="location.href=\'contentsListExcelB.php?enabled='+enabled+'\'" class="fRight">엑셀 다운로드</button>';
			actionArea += '<button type="button" onClick="contentsListexcelAct()" class="fRight">엑셀 다운로드</button>';

		}

		actionArea += '<select name="searchType">';
		actionArea += '<option value="contentsName">과정명</option>';
		actionArea += '<option value="contentsCode">과정코드</option>';
		actionArea += '<option value="cp">CP사</option>';
        actionArea += '<option value="chapterName">차시명</option>';
		actionArea += '</select>&nbsp;';
		actionArea += '<input type="text" name="searchValue" />&nbsp;';
		if(loginUserLevel <= 3){
			actionArea += '<span style="margin-left:40px;">서버위치</span>';
			actionArea += '<select name="server">';
			actionArea += '<option value="">전체';
			actionArea += '<option value="cont0">0서버';
			actionArea += '<option value="cont2">2서버';
			actionArea += '<option value="cont3">3서버';
			actionArea += '<option value="cont4">4서버';
			actionArea += '<option value="cont5">5서버';
			actionArea += '<option value="cont6">6서버';
			actionArea += '<option value="cont7">7서버';
			actionArea += '<option value="cont8">8서버';
			actionArea += '</select>';
		}
		actionArea += '<span style="margin-left:40px;">과정분류</span>';
		actionArea += '<select name="sort01" onchange="changeSort2(this);ajaxAct('+page+',this,\'\')">'+optSort01+'</select>';

		if(sort01 != '') {
		actionArea += '<span style="margin-left:40px;">과정분류</span>';
		actionArea += '<input type="hidden" name="sort01">';
		}

		if(loginUserLevel <= 3) {
		actionArea += '<span style="margin-left:40px;">공개여부</span>';
		actionArea += '<select name="enabled" onchange="searchAct()">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="Y">공개</option>';
		actionArea += '<option value="N">비공개</option>';
		actionArea += '</select>&nbsp;';

		/*actionArea += '<span style="margin-left:40px;">운영여부</span>';
		actionArea += '<select name="used" onchange="searchAct()">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="Y">운영</option>';
		actionArea += '<option value="N">비운영</option>';
		actionArea += '</select>&nbsp;';*/

		actionArea += '<span style="margin-left:40px;">훈련유형</span>';
		actionArea += '<select name="serviceType" >';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="1">환급</option>';
		actionArea += '<option value="3">비환급</option>';
		actionArea += '<option value="7">수강연동</option>';
		actionArea += '</select>&nbsp;';

		actionArea += '<span style="margin-left:40px;">심사차수</span>';
		actionArea += '<select name="simsaChapterY" onchange="searchAct()">';
		actionArea += '<option value="">전체 (연도)</option>';
		for(var nowYear = new Date().getFullYear(); nowYear>=2016; nowYear--) {
			actionArea += '<option value="'+nowYear+'">'+nowYear+'년</option>';
		}
		actionArea += '<option value="0">해당없음</option>';
		actionArea += '</select>';
		actionArea += '<select name="simsaChapterC" onchange="searchAct()">'
		actionArea += '<option value="">전체 (차수)</option>';
		for(var c = 1; c<10; c++) {
			actionArea += '<option value="'+c+'">'+c+'차</option>';
		}
		actionArea += '<option value="0">해당없음</option>';
		actionArea += '</select>';
		/*
		actionArea += '<span style="margin-left:40px;">대표과정</span>';
		actionArea += '<select name="main" onchange="searchAct()">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="Y">대표과정만</option>';
		actionArea += '</select>&nbsp;';
		*/
		}

		actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
		actionArea += '<option value="10">10개</option>';
		actionArea += '<option value="30">30개</option>';
		actionArea += '<option value="50">50개</option>';
		actionArea += '<option value="100">100개</option>';
		actionArea += '<option value="150">150개</option>';
		actionArea += '<option value="200">200개</option>';
		actionArea += '</select>';

		actionArea += '</div>';
		actionArea += '<div>';
		actionArea += '<span>기간검색</span>';
		actionArea += '<select name="dateSearchOption" style="margin-right:5px;">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="period">컨텐츠유효기간</option>';
		actionArea += '<option value="expire">과정인정만료기간</option>';
		actionArea += '</select>';
		actionArea += '<div class="datePicker">';
		actionArea += '<input type="text" name="optionStartDate" class="cal" readonly="readonly" />&nbsp;~&nbsp;';
		actionArea += '<input type="text" name="optionEndDate" class="cal" readonly="readonly" />';
		actionArea += '<span>훈련카드</span>';
		actionArea += '<select name="trainingCard">';
		actionArea += '<option value="">전체</option>';
		actionArea += '<option value="Y">지원</option>';
		actionArea += '<option value="N">미지원</option>';
		actionArea += '</select>';
		actionArea += '</div>&nbsp;';
		actionArea += '<button type="submit">검색하기</button>';
		actionArea += '</div>';
		actionArea += '</form>';
		actionArea += '<div>';
		if(loginUserLevel <= 4) {
			actionArea += '<button type="button" onClick="sizeCheck(8);" class="fRight">콘텐츠8 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(7);" class="fRight">콘텐츠7 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(6);" class="fRight">콘텐츠6 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(5);" class="fRight">콘텐츠5 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(4);" class="fRight">콘텐츠4 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(3);" class="fRight">콘텐츠3 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(2);" class="fRight">콘텐츠2 서버 용량</button>';
			actionArea += '<button type="button" onClick="sizeCheck(0);" class="fRight">콘텐츠 서버 용량</button>';
		}
		actionArea += '</div>';
		actionArea += '</div>';
		/*
		$.ajax({
			url:'http://cont1.modulearning.kr/api/apiHDDStatus.php',
			type:'GET',
			dataType:'jsonp',
			data:'callback=?',
			success: function(data){
				colsole.log(data.totalDisk);
			}
		})
		*/
		$('#contents > h1').after(actionArea);
		pickerAct();

		//게시물 소팅부분
		var contents = '';
		contents += '<table><thead><tr>';
		contents += '<th style="width:60px;">번호</th>';
        contents += '<th style="width: 80px">과정유형</th>';
		contents += '<th>과정등급/코드/과정명</th>';
		contents += '<th style="width:100px">심사차수</th>';
		contents += '<th>메모</th>';
		contents += '<th style="width:120px;">총차시/교육시간</th>';
		contents += '<th style="width:300px;">교육비</th>';
		contents += '<th style="width:130px;">HRD/e-simsa 코드</th>';
		contents += '<th style="width:80px;">모바일</th>';
		contents += '<th style="width:100px;">공개여부</th>';
		/*if(loginUserLevel <= 3) {
			contents += '<th style="width:100px;">대표과정</th>';
		}*/
		contents += '<th style="width:120px;">유효기간/인정만료</th>';
		if(loginUserLevel <= 4) {
			contents += '<th style="width:120px;">수정/상세</th>';
		}
		if(loginUserLevel <= 3) {
			contents += '<th style="width:80px;">실시회차</th>';
			contents += '<th style="width:90px;">강의계획서</th>';
		}
		contents += '</tr></thead><tbody>'	;
		contents += '</tbody></table>';
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSList');
		$('#contentsArea').html(contents);
		changeSort2(sort01);
		ajaxAct(page,sort01,'');
	})
}

function ajaxAct(sortDatas,sort01,sort02){
	loadingAct();
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	if(sortData == 1) {
		sortData = '';
	}
	sort01 = sort01 ? sort01 : '';
	sort02 = sort02 ? sort02 : '';

	if(enabled != ''){
		sortData += '&enabled='+enabled;
	}
	if(contentsCode2 != ''){
		sortData += '&contentsCode='+contentsCode2;
	}
	if(sort01 != ''){
		//sort01 = sort01.options[sort01.selectedIndex].value;
		sort01s = '&sort01='+sort01
	}
	if(sort02 != ''){
		sort02 = sort02.options[sort02.selectedIndex].value;
		sort02s = '&sort02='+sort02
	}
	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData+sort01s+sort02s,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = 1;
		var contentsGrade = '';
		var hrdCode = '';
		var passCode = '';
		var contentsPeriod = '';
		var contentsExpire = '';
		var lectureStart = '';
		var midEA = '';
		var testEA = '';
		var reportEA = '';
		var BBSListBg = '';
		var i = totalCount;
		//alert(page);
		if(page != 1){
			i = totalCount - ((page-1)*listCount)
		}
		if (totalCount != 0){
			$.each(data.contents, function(){
				if(this.enabled == 'N'){
					BBSListBg = 'class="BBSListBg"';
				}
				lists += '<tr '+BBSListBg+'>';
				BBSListBg = '';

				//번호
				lists += '<td>'+i+'</td>';

                //과정유형
                lists += '<td>';
                if(this.contentsType == '1'){
                    lists += '사업주';
                } else if(this.contentsType == '3'){
                    lists += '비환급';
                } else if(this.contentsType == '4'){
                    lists += '기업직업훈련';
                }
                lists += '</td>';
				//등급,코드,과정명
				lists += '<td class="left">';
				if(this.contentsGrade == null || this.contentsGrade == '' || this.contentsPeriod == '') {
					contentsGrade = '등급 미등록';
				} else {
					contentsGrade = this.contentsGrade+' 등급';
				}
				if(this.hrdCode == null || this.hrdCode == '') {
					hrdCode = 'HRD-NET코드 미등록';
				} else {
					hrdCode = this.hrdCode;
				}
				if(this.passCode == null || this.passCode == ' ') {
					passCode = 'E-SIMSA코드 미등록';
				} else {
					passCode = this.passCode;
				}
				if(this.sort01Name == null) {
					var sort01Name = '대분류 미등록';
				} else {
					var sort01Name = this.sort01Name;
				}
				if(this.sort02Name == null) {
					var sort02Name = '소분류 미등록';
				} else {
					var sort02Name = this.sort02Name;
				}
				lists += ':: '+sort01Name+' >> '+sort02Name+'<br />';
				lists += '[&nbsp;'+contentsGrade+'&nbsp;]&nbsp;'; //과정등급
				lists += this.contentsCode+'<br />';
				lists += '<strong  onClick="globalModalAct(\'contentsView\',\'\',\''+this.contentsCode+'\')" style="cursor:pointer;">'+this.contentsName+'</strong><br />';
				if (this.ncsCode) {
					lists += 'NCS코드 : '+this.ncsCode+'<br/>';
				}
				if(loginUserLevel <= 4) {
					lists += '<button type="button" onClick="writeAct('+this.seq+',\'contentsWrite\')">과정정보 수정하기</button>';
					lists += '&nbsp;<button type="button" onclick="noticeModalAct(\''+this.contentsCode+'\')">게시판 관리</button>';
				}
				lists += '</td>';

				//심사차수
				lists += '<td>';
				if(this.simsaChapter == 0) {
					lists += '해당없음';
				}else if(this.simsaChapter != null) {
					lists += '<a href="https://www.e-simsa.or.kr/guide/simsa2018.do" target="_blank">'+this.simsaChapter.substr(0,4)+'년 '+this.simsaChapter.substr(4,2)+'차</a>';
				} else {
					lists += '';
				}
				if(this.previewImage == null || this.previewImage == '') {
				lists += '<br /><img src="../attach/contents/noImg.jpg" style="width:90px; height:70px;">';
				} else {
				lists += '<br /><img src="../attach/contents/'+this.previewImage+'" style="width:90px; height:70px; border:1px solid;">';
				}
				lists += '</td>';

				//메모
				lists += '<td>';
				if (this.memo == null){
					memo = '';
				} else {
					lists += this.memo;
				}
				lists += '</td>';

				//총차시
				lists += '<td>';
				lists += this.chapter+'차시&nbsp;/&nbsp;'+this.contentsTime+'시간<br />';
				lists += '<button type="button" onClick="writeAct(\''+this.contentsCode+'\',\'chapterWrite\')">차시보기</button><br />';
				lists += '</td>';

				//교육비
				lists += '<td class="right">';
				lists +='[표준 훈련비] '+toPriceNum(this.selfPrice)+'원</br>';
				lists +='[우선지원 지원금 | 자부담] '+toPriceNum(this.rPrice01)+'원 | '+toPriceNum(this.selfPrice01)+'원</br>';
				lists +='[1000인 미만 지원금 | 자부담] '+(this.contentsType == '4' ? '0' : toPriceNum(this.rPrice02))+'원 | '+(this.contentsType == '4' ? '0' : toPriceNum(this.selfPrice02))+'원</br>';
				lists +='[1000인 이상 지원금 | 자부담] '+(this.contentsType == '4' ? '0' : toPriceNum(this.rPrice03))+'원 | '+(this.contentsType == '4' ? '0' : toPriceNum(this.selfPrice03))+'원';
				lists += '</td>';

				//등급/심사코드
				lists += '<td>';
				lists += hrdCode+'<br />'+passCode;
				lists += '<button onClick="window.open(\'../contentsPrint/?code='+this.contentsCode+'\')">과정상세</button>'
				lists += '</td>';

				//모바일
				lists += '<td>';
				if(this.mobile =='Y'){
					lists += '지원';
				}else{
					lists += '미지원';
				}
				lists += '</td>';

				//사이트공개
				lists += '<td>';
				if(this.enabled =='Y'){
					lists += '공개';
				}else{
					lists += '비공개';
				}
				/*	lists += '<br />';
				if(this.used =='Y'){
					lists += '운영';
				}else{
					lists += '비운영';
				}*/
				lists += '</td>';

				//대표과정
				/*if (loginUserLevel <= 3){
					lists += '<td>';
					if(this.mainContents =='Y'){
						lists += '선정됨<br />순번 : '+this.mainOrderBy;
					}else{
						lists += '<button type="button" onClick="mainContents(\''+this.seq+'\')">선정하기</button></td>';
					}
					lists += '</td>';
				}	*/


				//유효기간/인정만료
				if(this.contentsPeriod == null || this.contentsPeriod == '') {
					contentsPeriod = '미등록';
				} else {
					contentsPeriod = this.contentsPeriod;
				}
				if(this.contentsExpire == null || this.contentsExpire == '') {
					contentsExpire = '미등록';
				} else {
					contentsExpire = this.contentsExpire;
				}
				if(this.lectureStart == null || this.lectureStart == '') {
					lectureStart = '생성하기';
				} else {
					lectureStart = this.lectureStart;
				}
				lists += '<td>'+contentsPeriod+'<br />'+contentsExpire+'<br />';
				if(loginUserLevel <= 4) {
					lists += '<button type="button" onClick="sampleID(\''+this.contentsCode+'\')">ID:'+lectureStart+'</button></td>';
				}

				//교육비
				midEA = parseInt(this.mid01EA)+parseInt(this.mid02EA)+parseInt(this.mid03EA)+parseInt(this.mid04EA);
				testEA = parseInt(this.test01EA)+parseInt(this.test02EA)+parseInt(this.test03EA)+parseInt(this.test04EA);
				reportEA = parseInt(this.reportEA);

				//수정/상세
				if(loginUserLevel <= 4) {
					lists += '<td>'
					lists += '<button type="button" onClick="writeAct(\''+this.contentsCode+'\',\'testWrite\',\'mid\')">중간평가 : '+midEA+'</button><br />';
					lists += '<button type="button" onClick="writeAct(\''+this.contentsCode+'\',\'testWrite\',\'final\')">최종평가 : '+testEA+'</button><br />';
					lists += '<button type="button" onClick="writeAct(\''+this.contentsCode+'\',\'reportWrite\')">과제관리 : '+reportEA+'</button><br />';
					lists += '</td>';
				}

				if(loginUserLevel <= 3) {
					lists += '<td>'
					lists += '<button type="button" onClick="writeAct(\''+this.contentsCode+'\',\'tracse\',\''+this.contentsName+'\')">회차보기</button><br />';
					lists += '</td>';
					lists += '<td>'
					lists += `<button type="button" onclick="window.open('contentsPrint2.php?contentsCode=${this.contentsCode}')">강의계획서</button><br />`;
					lists += '</td>';
				}

				lists += '</tr>';
				i--;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>';
		}
		$('.BBSList tbody').html(lists);
		pagerAct();
		loadingAct();
	})
}
/*
function changeSort2(obj){
	obj = obj.options[obj.selectedIndex].value;
	sort02s = '';
	$('select[name="sort02"]').remove();
	if(obj != ''){
		$.get(categoryApi,{'value01':obj},function(data){
			var selectWrite = '';
			selectWrite += '<select name="sort02" onchange="ajaxAct('+page+',\'\',this)">';
			selectWrite += '<option value="">전체</option>';
			$.each(data.category,function(){
				selectWrite += '<option value="'+this.value01+'">';
				selectWrite += this.value02;
				selectWrite += '</option>';
			})
			selectWrite += '</select>'
			$('select[name="sort01"]').after(selectWrite)
		})
	}
}
*/
function changeSort2(obj){
	//obj = obj.options[obj.selectedIndex].value;
	sort02s = '';
	$('select[name="sort02"]').remove();
	if(obj != ''){
		$.get(categoryApi,{'value01':obj},function(data){
			var selectWrite = '';
			selectWrite += '<select name="sort02" onchange="ajaxAct('+page+',\'\',this)">';
			selectWrite += '<option value="">소분류</option>';
			$.each(data.category,function(){
				selectWrite += '<option value="'+this.value01+'">';
				selectWrite += this.value02;
				selectWrite += '</option>';
			})
			selectWrite += '</select>';
			$('input[name="sort01"]').after(selectWrite);
		})
	}
}
//게시판 보기
function mainContents(seq){
	if(confirm('대표과정으로 선정하시겠습니까? 현재 순번이 첫번째인 과정은 대표과정에서 제외되고 두번째 과정이 첫번째로 변경됩니다.')) {
		$.ajax({
			url:useApi,
			type:'POST',
			data:'main=Y&seq='+seq,
			dataType:'JSON',
			success:function(data){
				alert(data.result);
				ajaxAct();
			}
		})
	}
}

function sizeCheck(serverNum){
	popupAddress = 'https://cont'+serverNum+'.'+siteURL+'/info.php';
	window.open(popupAddress,"결과보기","top=0, left=0, width=300, height=200, menubar=no, status=no, titlebar=no, toolbar=no, scrollbars=yes, resizeable=no","reviewPop")
}

function contentsListexcelAct(){
	searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='/admin/contentsListExcelB.php?'+searchValue;
}

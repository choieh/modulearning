//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var optWrite = [];
makeOption('companyScale','','')
makeOption('enabled','','')
makeOption('phone01','','')
makeOption('mobile01','','')
makeOption('email02','','')
makeOption('bankName','','')

//게시판 보기 스크립트 시작
function writeCenter(companyID){
	//상단메뉴
	$('.searchArea').remove();

	//출력변수 지정


	if(companyID != ''){
		var writeAjax = $.get(centerApi,{'companyID':companyID},function(data){
			$.each(data.studyCenter, function(){
				seq = this.seq;
				companyID = this.companyID;
				attachURL = this.attachURL;
				studyColor = this.studyColor;
				studyRequestStart = this.studyRequestStart ? this.studyRequestStart : '1900-01-01';
				studyRequestEnd = this.studyRequestEnd ? this.studyRequestEnd : '1900-01-01';
				studyStart = this.studyStart ? this.studyStart : '1900-01-01';
				studyEnd = this.studyEnd ? this.studyEnd : '1900-01-01';
				studyColor = this.studyColor;
				studyLogo = this.studyLogo;
				studyMainImg = this.studyMainImg;
				contentsMapping = this.contentsMapping;
				phone01 = this.phone01;
				phone02 = this.phone02;
				phone03 = this.phone03;
				fax01 = this.fax01;
				fax02 = this.fax02;
				fax03 = this.fax03;
				startTime01 = this.startTime01;
				startTime02 = this.startTime02;
				endTime01 = this.endTime01;
				endTime02 = this.endTime02;
				eatStartTime01 = this.eatStartTime01;
				eatStartTime02 = this.eatStartTime02;
				eatEndTime01 = this.eatEndTime01;
				eatEndTime02 = this.eatEndTime02;
				managerName = this.managerName;
				managerTel = this.managerTel;
				footerEnabled = this.footerEnabled;
				inputStudyType = this.inputStudyType;
				if(this.mainContents != null){
					contentsCode = this.mainContents[0].contentsCode;
					contentsName = this.mainContents[0].contentsName;
				}else {
					contentsCode ='';
					contentsName ='';
                }

				if(this.mainContents02 != null){
					contentsCode2 = this.mainContents02[0].contentsCode;
					contentsName2 = this.mainContents02[0].contentsName;
				}else {
					contentsCode2 ='';
					contentsName2 ='';
                }

                if(this.mainContents03 != null){
					contentsCode3 = this.mainContents03[0].contentsCode;
					contentsName3 = this.mainContents03[0].contentsName;
				}else {
					contentsCode3 ='';
					contentsName3 ='';
                }

                if(this.mainContents04 != null){
					contentsCode4 = this.mainContents04[0].contentsCode;
					contentsName4 = this.mainContents04[0].contentsName;
				}else {
					contentsCode4 ='';
					contentsName4 ='';
                }
                if(this.mainContents05 != null){
					contentsCode5 = this.mainContents05[0].contentsCode;
					contentsName5 = this.mainContents05[0].contentsName;
				}else {
					contentsCode5 ='';
					contentsName5 ='';
                }

                if(this.mainContents06 != null){
					contentsCode6 = this.mainContents06[0].contentsCode;
					contentsName6 = this.mainContents06[0].contentsName;
				}else {
					contentsCode6 ='';
					contentsName6 ='';
				}
			})
			writePrint()
		})
	}else{
		writePrint()
	}

	//게시판 생성
	function writePrint(){
		var writes = '';
		var startDate = '';
		var endDate = '';

		writes += '<form class="writeform" method="post" action="'+centerApi+'" enctype="multipart/form-data">';
		//seq값 선언
		writes += '<input type="hidden" name="seq" value="'+seq+'" />';
		writes += '<input type="hidden" name="companyID" value="'+companyID+'" />';
		//입력영역 시작
		writes += '<ul>';

		//사이트주소
		writes += '<li>';
		writes += '<h1>사이트 URL</h1>';
		if(companyID == '6108212084') {
			writes += '<a href="https://kdh.'+siteURL+'" target="_blank">kdh.'+siteURL+'</a>';
		}else if(companyID == '1058665151'){
			writes += '<a href="https://steelnsteel.'+siteURL+'" target="_blank">'+'https://steelnsteel.'+siteURL+'</a>';
		} else {
			writes += '<a href="https://'+companyID+'.'+siteURL+'" target="_blank">'+companyID+'.'+siteURL+'</a>';
		}
		writes += '</li>';

		//로고 등록
		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>로고 등록<br />(size자유, png)</h1>';
		if(studyLogo == 'N' || studyLogo == null){
			//writes += '<input type="file" name="studyLogo" class="name" value="'+studyLogo+'" />';
			writes += '<input type="file" name="studyLogo" class="name" />'
		}else{
			writes += '<div id="studyLogo" class="attachFile"><img src="'+attachURL+studyLogo+'" style="width:100px;"><br /><button type="button" >등록이미지</button></div>';
			writes += '<input type="file" name="studyLogo" class="name" />';
		}

		writes += '</div>';

		//메인이미지 등록
		writes += '<div class="halfDiv">';
		writes += '<h1>메인이미지 등록<br />(1,000x275, jpg)</h1>';
		if(studyMainImg == 'N' || studyMainImg == null){
			writes += '<input type="file" name="studyMainImg" class="name" />'
		}else{
			writes += '<div id="studyMainImg" class="attachFile"><img src="'+attachURL+studyMainImg+'" style="width:100px;"><br /><button type="button">등록이미지</button></div>';
			writes += '&nbsp;<input type="file" name="studyMainImg" class="name" />';
		}
		writes += '</div>';
		writes += '</li>';

		//자동입과
		var inputStudyType01 = '';
		var inputStudyType02 = '';
		var inputStudyType03 = '';
		if(inputStudyType == 'n') {
			inputStudyType01 = 'selected="selected"';
		} else if(inputStudyType == 'appInput') {
			inputStudyType02 = 'selected="selected"';
		} else if(inputStudyType == 'payInput') {
			inputStudyType03 = 'selected="selected"';
		}
		writes += '<li>';
		writes += '<h1>자동입과</h1>';
		writes += '<select name="inputStudyType" id="inputStudyType">';
		writes += '<option value="n" '+inputStudyType01+'>사용안함</option>';
		writes += '<option value="appInput" '+inputStudyType02+'>신청 후 입과</option>';
		writes += '<option value="payInput" '+inputStudyType03+'>결제 후 입과</option>';
		writes += '</select>';
		writes += '</li>';

		var selected01 = '';
		var selected02 = '';
		var selected03 = '';
		var selected04 = '';
		var selected05 = '';
		var mapping01 = '';
		var mapping02 = '';
		var Fenabled01 = '';
		var Fenabled02 = '';

		if(studyColor == '1') {
			selected01 = 'selected="selected"';
		} else if(studyColor == '2') {
			selected02 = 'selected="selected"';
		} else if(studyColor == '3') {
			selected03 = 'selected="selected"';
		} else if(studyColor == '4') {
			selected04 = 'selected="selected"';
		}  else if(studyColor == '5') {
			selected05 = 'selected="selected"';
		}

		if(contentsMapping == 'N') {
			mapping01 = 'selected="selected"';
		} else if(contentsMapping == 'Y') {
			mapping02 = 'selected="selected"';
		}

		if(footerEnabled == 'N') {
			Fenabled01 = 'selected="selected"';
		} else if(footerEnabled == 'Y') {
			Fenabled02 = 'selected="selected"';
		}

		//1 - 녹색
		//5 - 파검

		//배경색 지정
		writes += '<li>';
		writes += '<h1>배경색 지정</h1>';
		writes += '<select name="studyColor" id="studyColor" class="">';
		writes += '<option>선택하세요</option>';
		writes += '<option value="1" '+selected01+'>녹</option>';
		writes += '<option value="2" '+selected02+'>파랑</option>';
		writes += '<option value="5" '+selected05+'>파랑/검정</option>';
		writes += '</select>';
		writes += '</li>';


		//신청 기간
		writes += '<li>';
		writes += '<h1>신청 기간</h1>';
		writes += '<div class="datePicker"><input type="text" name="studyRequestStart" class="cal" value="'+studyRequestStart+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
		writes += '<div class="datePicker"><input type="text" name="studyRequestEnd" class="cal"  value="'+studyRequestEnd+'" readonly="readonly" /></div>&nbsp;';
		writes += '</li>';

		//수강 기간
		writes += '<li>';
		writes += '<h1>수강 기간</h1>';
		writes += '<div class="datePicker"><input type="text" name="studyStart" class="cal" value="'+studyStart+'" readonly="readonly" /></div>&nbsp;~&nbsp;';
		writes += '<div class="datePicker"><input type="text" name="studyEnd" class="cal"  value="'+studyEnd+'" readonly="readonly" /></div>&nbsp;';
		writes += '</li>';

		writes += '<li><h1>메인 콘텐츠 1</h1>';
		writes += '<div id="mainContents" class="address">';
		if(contentsName == null || contentsName == ''){
			contentsName ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
		writes += '</li>';

		writes += '<li><h1>메인 콘텐츠 2</h1>';
		writes += '<div id="mainContents02" class="address">';
		if(contentsName2 == null || contentsName2 == ''){
			contentsName2 ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName2;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents02\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
        writes += '</li>';

        if(companyID == 'steelnsteel'){


        writes += '<li><h1>메인 콘텐츠 3</h1>';
		writes += '<div id="mainContents03" class="address">';
		if(contentsName3 == null || contentsName3 == ''){
			contentsName3 ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName3;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents03\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
        writes += '</li>';

        writes += '<li><h1>메인 콘텐츠 4</h1>';
		writes += '<div id="mainContents04" class="address">';
		if(contentsName4 == null || contentsName4 == ''){
			contentsName4 ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName4;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents04\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
        writes += '</li>';

        writes += '<li><h1>메인 콘텐츠 5</h1>';
		writes += '<div id="mainContents05" class="address">';
		if(contentsName5 == null || contentsName5 == ''){
			contentsName5 ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName5;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents05\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
        writes += '</li>';

        writes += '<li><h1>메인 콘텐츠 6</h1>';
		writes += '<div id="mainContents06" class="address">';
		if(contentsName6 == null || contentsName6 == ''){
			contentsName6 ="현재 추천 과정이 없습니다.";
		}
		writes += '현재 과정 : '+contentsName6;
		writes += '<br /><input name="searchName" type="text" />&nbsp;';
		writes += '<button type="button" onClick="searchSelect(\'mainContents06\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '</div>';
		//div의 아이디값과 새로 등록될 select 네임의 동일화
        writes += '</li>';
        }

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>콘텐츠 매핑<br>사용여부</h1>';
		writes += '<select name="contentsMapping" id="contentsMapping" onChange="contentsMappingS(this.value,\''+companyID+'\')">';
		writes += '<option>선택하세요</option>';
		writes += '<option value="N" '+mapping01+' >미사용</option>';
		writes += '<option value="Y" '+mapping02+' >사용</option>';
		writes += '</select>';
		writes += '</div>';
		writes += '<div id="append" class="halfDiv">';
		if(seq != ''){
			if(contentsMapping == 'Y'){
				writes += '<div>';
				writes +='<h1>콘텐츠 매핑</h1>';
				writes +='<button type="button" class="studyMap" onclick="studyMap(\''+companyID+'\')">과정등록하기</button>';
				writes += '</div>';
			}
		}
		writes += '</div>';
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>교육담당자명</h1>';
		writes += '<input name="managerName" type="text" value="'+managerName+'" />';
		writes += '</div>';
		writes += '<div class="halfDiv">';
		writes += '<h1>담당자 연락처</h1>';
		writes += '<input name="managerTel" type="text" value="'+managerTel+'" />';
		writes += '</div>';
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>CS 전화번호</h1>';
		writes += '<select name="phone01" class="'+phone01+'">'+optWrite['phone01']+'</select> - ';
        writes += '<input type="tel"  class="tel" name="phone02" value="'+phone02+'" /> - <input type="tel"  class="tel" name="phone03" value="'+phone03+'" />';
		writes += '</div>';
		writes += '<div class="halfDiv">';
		writes += '<h1>CS 팩스번호</h1>';
		writes += '<select name="fax01" class="'+fax01+'">'+optWrite['phone01']+'</select> - ';
		writes += '<input type="tel"  class="tel" name="fax02" value="'+fax02+'" /> - <input type="tel"  class="tel" name="fax03" value="'+fax03+'" />';
		writes += '</div>';
		writes += '</li>';

		writes += '<li>';
		writes += '<div class="halfDiv">';
		writes += '<h1>CS 운영시간</h1>';
		writes += '평일 <input type="text" class="tel" name="startTime01" maxlength="2" value="'+startTime01+'" />:<input type="text" class="tel" name="startTime02" maxlength="2" value="'+startTime02+'" /> ~ <input type="text" class="tel" maxlength="2" name="endTime01" value="'+endTime01+'" />:<input type="text" class="tel" maxlength="2" name="endTime02" value="'+endTime02+'" />';
		writes += '</div>';
		writes += '<div class="halfDiv">';
		writes += '<h1>CS 점심시간</h1>';
		writes += '점심시간 <input type="text" class="tel" maxlength="2" name="eatStartTime01" value="'+eatStartTime01+'" />:<input type="text" class="tel" maxlength="2" name="eatStartTime02" value="'+eatStartTime02+'" /> ~ <input type="text" class="tel" maxlength="2" name="eatEndTime01" value="'+eatEndTime01+'" />:<input type="text" class="tel" maxlength="2" name="eatEndTime02" value="'+eatEndTime02+'" />';
		writes += '</div>';
		writes += '</li>';

		if(loginUserID == 'leehr0523'){
			/*writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>CS 운영시간</h1>';
			writes += '평일 <input type="text" class="tel" name="startTime01" maxlength="2" value="'+startTime01+'" />:<input type="text" class="tel" name="startTime02" maxlength="2" value="'+startTime02+'" /> ~ <input type="text" class="tel" maxlength="2" name="endTime01" value="'+endTime01+'" />:<input type="text" class="tel" maxlength="2" name="endTime02" value="'+endTime02+'" />';
			writes += '</div>';
			writes += '<div class="halfDiv">';
			writes += '<h1>CS 점심시간</h1>';
			writes += '점심시간 <input type="text" class="tel" maxlength="2" name="eatStartTime01" value="'+eatStartTime01+'" />:<input type="text" class="tel" maxlength="2" name="eatStartTime02" value="'+eatStartTime02+'" /> ~ <input type="text" class="tel" maxlength="2" name="eatEndTime01" value="'+eatEndTime01+'" />:<input type="text" class="tel" maxlength="2" name="eatEndTime02" value="'+eatEndTime02+'" />';
			writes += '</div>';
			writes += '</li>';

			//팝업
			writes += '<li>';
			writes += '<div class="halfDiv">';
			writes += '<h1>팝업등록</h1>';
			writes += '<button type="button" onClick="globalModalAct(\'studyCenterPopup\',\'\',\'\',\'\',\''+companyID+'\')">팝업등록</button>';
			writes += '</div>';

			//footer 사용여부
			writes += '<div class="halfDiv">';
			writes += '<h1>하단 내용 사용여부</h1>';
			writes += '<select name="footerEnabled" id="footerEnabled">';
			writes += '<option>선택하세요</option>';
			writes += '<option value="N" '+Fenabled01+' >미사용</option>';
			writes += '<option value="Y" '+Fenabled02+' >사용</option>';
			writes += '</select>';
			writes += '</div>';
			writes += '</li>';*/
		}


		/*
		//메인 콘텐츠
		writes += '<li><h1>메인 콘텐츠</h1>';
		writes += '<div id="mainContents" class="address"><input name="searchName" type="text" value="'+contentsName+'" />';
		writes += '<button type="button" onClick="searchSelect(\'mainContents\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
		writes += '<input name="mainContents" type="text" value="'+contentsName+'/'+contentsCode+'"  readonly="readonly" style="width:330px; margin-left:10px;"/></div>';
		writes += '</li>';
		*/

		//버튼영역
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="multipartSendData(\'writeform\')">';
		if(seq != ''){
			writes += '수정하기';
		}else{
			writes += '등록하기';
		}
		writes += '</button>'
		writes += '<button type="button" onClick="listAct('+page+')">목록보기</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'

		writes += '</form>';

		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);
		pickerAct();//데이트피커 사용
		findOpt();
		emailSelect();
        mapping(companyID); // 과정 맵핑 노출
		$('#zipCodeArea, .findZipCode').click(function(){zipCodeFind()})
		var	mustInput = '&nbsp;&nbsp;<strong class="price">(*)</strong>';
		$('.mustCheck > h1').append(mustInput)//필수요소 사용
		$('input[name="companyID"]').keydown(function(){keyCheck('numbEng',this)});
		$('input[type="tel"]').keyup(function(){keyCheck('numb',this)});
	}

    function mapping(companyID){
        var allCount = '';
        $.get('../api/apiContents.php', function(data){
            allCount = data.totalCount;
        }).done(function(){
            $.get('../api/apiContentsMapping.php','companyID='+companyID+'',function(data){
                var totalCount = data.totalCount;
                if (totalCount != 0){
                    $('.studyMap').after('<span>&nbsp;현재 <strong class="red" style="padding:0;">'+totalCount+'</strong>개 과정이 등록되어있습니다.</span>')
                }else if(totalCount == allCount){
                    $('.studyMap').after('<span>&nbsp;현재 전체 과정이 등록되어있습니다.</span>')
                }else{
                    $('.studyMap').after('<span>&nbsp;현재 등록된 과정이 없습니다.</span>')
                }
            })
        })
    }
}

function contentsMappingS(type,companyID){
	if(type == 'Y'){
		$('.writeform li #append').append('<div><h1>콘텐츠 매핑</h1><button type="button" class="studyMap" onclick="studyMap(\''+companyID+'\')">과정등록하기</button></div>');
	}else{
		$('.writeform li #append div').remove();
	}
}
//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}

function studyMap(companyID){
    var companyMapLink = 'https://'+siteURL+'/admin/02_companyMap.php?companyID='+companyID+'&mapping=Y';
    window.open(companyMapLink,"location=yes,menubar=no,status=no,titlebar=no,toolbar=no,scrollbar=no,resizeable=no","esangStudy")
}

//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//게시판 보기 스크립트 시작
function writeAct(writeSeq,writeReply){
	writeSeq = writeSeq ? writeSeq : ''; //파일관련 스크립트 사용
	writeReply = writeReply ? writeReply : '';

	//댓글일 경우
	var replySeq = '';
	var replySecret = '';
	var replyTop = '';
	var replySubject = '';
	var replyContents = '';
	var replyCategorySeq = '';

	//기존,신규글
	var writeseq = '';
	var writeUserName = '';
	var writeUserID = '';
	var writePhone01 = loginMoblie01;
	var writePhone02 = loginMoblie02;
	var writePhone03 = loginMoblie03;
	var writeEmail01 = loginEmail01;
	var writeEmail02 = loginEmail02;
	var writeCategorySeq = '';
	var writeSubject = '';
	var writeContent = '';
	var writeAttachFile01 = '';
	var writeAttachFile01Name = '';
	var writeAttachFile02 = '';
	var writeAttachFile02Name = '';
	var writeAttachFile03 = '';
	var writeAttachFile03Name = '';
	var writeAttachFile04 = '';
	var writeAttachFile04Name = '';
    var writeAttachFile05 = '';
    var writeAttachFile05Name = '';
	var writeSecret = '';
	var writeTop = '';
	var attachURL = '';
	var writeUserID = loginUserID ? loginUserID : 'guest';
	var replyOrderBy = '';
    var addItem01 = '';
    var addItem02 = '';
    var addItem03 = '';
    var addItem04 = '';
    var addItem05 = '';
	var company = '';

	if(writeReply != ''){
		replySeq = writeSeq;
		seq = '';
		writeSeq = '';
		var replyAjax = $.get(useApi,{'seq':replySeq, 'boardCode':boardCode},function(data){
			$.each(data.board, function(){
				replySecret = this.secret;
				replyTop = this.top;
				replySubject = this.subject;
				replyContents = this.content;
				replyCategorySeq = this.categorySeq;
				replyOrderBy = this.replyOrderBy;
			})
			writePrint()
		})
	}else{
		seq = writeSeq;
		//상단메뉴
		$('#contents > h1').html(titleHtml);
		$('.searchArea, .BBSCategory').remove();

		if(seq != ''){
			var writeAjax = $.get(useApi,{'seq':seq, 'boardCode':boardCode},function(data){
				attachURL = data.attachURL;
				$.each(data.board, function(){
					writeseq = this.seq;
					writeUserName = this.userName;
					writeUserID = this.userID;
					writePhone01 = this.phone01;
					writePhone02 = this.phone02;
					writePhone03 = this.phone03;
					writeEmail01 = this.email01;
					writeEmail02 = this.email02;
					writeCategorySeq = this.categorySeq;
					writeSubject = this.subject;
					writeContent = this.content;
					writeAttachFile01 = this.attachFile01;
					writeAttachFile01Name = this.attachFile01Name;
					writeAttachFile02 = this.attachFile02;
					writeAttachFile02Name = this.attachFile02Name;
					writeAttachFile03 = this.attachFile03;
					writeAttachFile03Name = this.attachFile03Name;
					writeAttachFile04 = this.attachFile04;
					writeAttachFile04Name = this.attachFile04Name;
                    writeAttachFile05 = this.attachFile05;
                    writeAttachFile05Name = this.attachFile05Name;
					writeSecret = this.secret;
					writeTop = this.top;
					addItem01 = this.addItem01;
					addItem02 = this.addItem02;
                    addItem03 = this.addItem03 ?? '';
                    addItem04 = this.addItem04 ?? '';
                    addItem05 = this.addItem05 ?? '';
                    managerID = this.managerID;
                    managerName = this.managerName;
                    managerCompany = this.managerCompany;
					company = this.company;
				})
				writePrint()
			})
		}else{
			writePrint()
		}
	}
	//게시판 생성
	function writePrint(){
		var writes ='';

		if(boardMode != 6 && boardMode != 8 && boardMode != 9){
			writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
			writes += '<input type="hidden" name="userID" value="'+writeUserID+'" />';
			writes += '<input type="hidden" name="replySeq" value="'+replySeq+'" />';
			writes += '<input type="hidden" name="seq" value="'+writeSeq+'" />';
			writes += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
			writes += '<ul>';
			writes += '<li><h1>제목</h1>';
			if(useSecret == 'Y'){
				writes += '<input id="useSecret" name="secret" value="Y" type="checkbox"'
				if(writeSecret == 'Y' || replySecret == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useSecret">비밀글</label>'
			}
			if(useTop == 'Y'){
				writes += '<input name="top" id="useTop" value="Y" type="checkbox"'
				if(writeTop == 'Y' || replyTop == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useTop">공지글</label>'
			}
			writes += '<input type="text" class="subject" name="subject" value="';
			if(writeReply != ''){
				writes += '[댓글]'+replySubject;
			}else{
				writes += writeSubject;
			}
			writes += '" />'
			writes += '</li>'
			if(useCategory == 'Y'){
				writes += '<li><h1>카테고리</h1>';
				writes += '<select name="categorySeq" class="';
				if(writeReply != ''){
					writes += replyCategorySeq;
				}else{
					writes += writeCategorySeq;
				}
				writes += '"></select></li>';
				var categorySort = $.get(categoryApi,{'value01':'boardCategory','divisionValue':boardCode},function(data){
					optionWrite = '';
					if(data.totalCount != 0){
						$.each(data.category,function(){
							optionWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
						})
					}
					$('select[name="categorySeq"]').html(optionWrite)
				})
			}
			if(useName == 'Y'){
				writes += '<li><h1>작성자</h1>';
				if(loginUserName != '' || seq != ''){
					writes += loginUserName;
					writes += '<input type="hidden" name="userName" value="'+loginUserName+'" />';
				}else{
					writes += '<input type="text" name="userName" value="'+writeUserName+'" />';
				}
			}
			writes += '</li>';

			if (boardCode == 20) {
				writes += '<li><h1>토론 기간</h1>';
				writes += `<input type="text" name="startDate"value="" onkeyup="inputYMDNumber(this)">~
						<input type="text" name="endDate" value="" onkeyup="inputYMDNumber(this)">`
				writes += '</li>';
			}
			if(loginUserID == ''){
				writes += '<li><h1>비밀번호</h1><input class="name" type="password" name="pwd" /></li>'
			}
			if(usePhone == 'Y'){
				writes += '<li><h1>연락처</h1><select type="tel" name="phone01" class="'+writePhone01+'">'+optWrite['mobile01']+optWrite['phone01']+'</select>  - <input type="tel"  class="tel" name="phone02" value="'+writePhone02+'"> - <input type="tel" class="tel" name="phone03" value="'+writePhone03+'"></li>'
			}
			if(useEmail == 'Y'){
				writes += '<li><h1>이메일</h1><input class="name" name="email01" type="text" maxlength="20" tabindex="1" value="'+writeEmail01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="'+writeEmail02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+writeEmail02+'" /></li>'
			}
			if(useFile != 0){
				for(i=1;i <= eval(useFile) ; i++){
					writes += '<li><h1>첨부파일';
					if(useFile != 1){writes += i;}
					writes += '</h1>'
					if(eval('writeAttachFile0'+i) == '' || eval('writeAttachFile0'+i) == null){
						writes += '<input name="attachFile0'+i+'" type="file" />'
					}else{
						writes += '<div id="attachFile0'+i+'" class="attachFile"><a href="'+attachURL+eval('writeAttachFile0'+i)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('writeAttachFile0'+i+'Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile0'+i+'\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0'+i+'" value="Y" />';
					}
					writes += '</li>';
				}
			}
			writes += '<form action="sample.php" method="post"><textarea name="content" id="ir1" rows="10" cols="100" style="display:none;">';
			writes += writeContent;
			writes += '<br /><br />';
			if(writeReply != ''){
				if(replyOrderBy == 0){
					writes += '[원본]<br />'
					writes += replyContents;
				}else{
					writes += replyContents;
				}
			}
			writes += '</textarea></form>';


			writes += '</ul>'
			writes += '</form>'
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			if(seq==''){
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this,\'new\');">작성완료</button>';
			}else{
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this);">수정완료</button>';
			}
			writes += '<button type="button" onClick="listAct('+page+')">목록보기</button></div>';
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSWrite')
			$('#contentsArea').html(writes);
			findOpt();//selct 선택자 찾기
			emailSelect();//이메일 select 호출 사용시 같이 호출
			fileformAct();//파일 첨부 사용시

			nhn.husky.EZCreator.createInIFrame({
				oAppRef: oEditors,
				elPlaceHolder: "ir1",
				sSkinURI: "../lib/SmartEditor/SmartEditor2Skin.html",
				htParams : {
					bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
					//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
					fOnBeforeUnload : function(){
						//alert("완료!");
					}
				}, //boolean
				fOnAppLoad : function(){
					//예제 코드
					//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
				},
				fCreator: "createSEditor2"
			});
		}else if(boardMode == 9){	//2017-07-11 이응민 추가 (수강요청파일 업로드)
			writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
			writes += '<input type="hidden" name="userID" value="'+writeUserID+'" />';
			writes += '<input type="hidden" name="replySeq" value="'+replySeq+'" />';
			writes += '<input type="hidden" name="seq" value="'+writeSeq+'" />';
			writes += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
			writes += '<ul>';
			writes += '<li><h1>과정명</h1>';
			if(useSecret == 'Y'){
				writes += '<input id="useSecret" name="secret" value="Y" type="checkbox"'
				if(writeSecret == 'Y' || replySecret == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useSecret">비밀글</label>'
			}
			if(useTop == 'Y'){
				writes += '<input name="top" id="useTop" value="Y" type="checkbox"'
				if(writeTop == 'Y' || replyTop == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useTop">공지글</label>'
			}
			writes += '<input type="text" class="subject" name="subject" value="';
			if(writeReply != ''){
				writes += '[댓글]'+replySubject;
			}else{
				writes += writeSubject;
			}
			writes += '" />';
			writes += '<button type="button" class="fRight" onClick="printContents()">과정 목록</button>';
			writes += '</li>';
			if(useCategory == 'Y'){
				writes += '<li><h1>카테고리</h1>';
				writes += '<select name="categorySeq" class="';
				if(writeReply != ''){
					writes += replyCategorySeq;
				}else{
					writes += writeCategorySeq;
				}
				writes += '"></select></li>';
				var categorySort = $.get(categoryApi,{'value01':'boardCategory','divisionValue':boardCode},function(data){
					optionWrite = '';
					if(data.totalCount != 0){
						$.each(data.category,function(){
							optionWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
						})
					}
					$('select[name="categorySeq"]').html(optionWrite)
				})
			}
			writes += '<li><h1>기업명</h1><input type="text" class="subject" name="company" value="'+company+'"></li>'
			if(useName == 'Y'){
				writes += '<li><h1>작성자</h1>';
				if(loginUserName != '' && seq == ''){
					writes += loginUserName;
					writes += '<input type="hidden" name="userName" value="'+loginUserName+'" />';
				}else{
                    writes += writeUserName;
					writes += '<input type="hidden" name="userName" value="'+writeUserName+'" />';
				}
			}
			writes += '</li>';
			if(loginUserID == ''){
				writes += '<li><h1>비밀번호</h1><input class="name" type="password" name="pwd" /></li>'
			}
			if(usePhone == 'Y'){
				writes += '<li><h1>연락처</h1><select type="tel" name="phone01" class="'+writePhone01+'">'+optWrite['mobile01']+optWrite['phone01']+'</select>  - <input type="tel"  class="tel" name="phone02" value="'+writePhone02+'"> - <input type="tel" class="tel" name="phone03" value="'+writePhone03+'"></li>'
			}
			if(useEmail == 'Y'){
				writes += '<li><h1>이메일</h1><input class="name" name="email01" type="text" maxlength="20" tabindex="1" value="'+writeEmail01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="'+writeEmail02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+writeEmail02+'" /></li>'
			}

			writes += '<li>';
			writes += '<h1>수강시작날짜</h1>';
			writes += '<div class="datePicker"><input type="text" name="addItem01" class="cal" value="'+addItem01+'" readonly="readonly" /></div>';
			writes += '</li>';

            writes += '<li>';
            writes += '<h1>수강구분</h1>';
            writes += '<input id="service1" type="checkbox" name="service1" value="service1"><label for="service1">환급</label>';
            writes += '<input id="service2" type="checkbox" name="service2" value="service2"><label for="service2">비환급(서비스)</label>';
            writes += '<input id="service3" type="checkbox" name="service3" value="service3"><label for="service3">비환급(판매)</label>';
            writes += '<input id="service4" type="checkbox" name="service4" value="service4"><label for="service4">환급+비환급</label>';
            writes += '</li>'

            writes += '<li>';
            writes += '<h1>계산서 메일</h1><input type="text" style="width: 200px;" name="billEmail" value="'+addItem04+'">';
            writes += '</li>';

            writes += '<li>';
            writes += '<h1>금액</h1><input type="text" name="price" value="'+addItem05+'"> <span style="color: red;">* 비환급(판매)인 경우에만 입력해주세요.</span>';
            writes += '</li>';


			writes += '<li>';
			writes += '<h1>비고</h1><input type="text" class="subject" name="content" value="'+writeContent+'" placeholder="수강기간이 한달이 아닐 경우 or 특이사항을 적어주세요.">';
			writes += '</li>';

			if(useFile != 0){
				for(i=1;i <= eval(useFile) ; i++){
					writes += '<li><h1>첨부파일';
					if(useFile != 1){writes += i;}
					writes += '</h1>'
					if(eval('writeAttachFile0'+i) == '' || eval('writeAttachFile0'+i) == null){
						writes += '<input name="attachFile0'+i+'" type="file" />'
					}else{
						writes += '<div id="attachFile0'+i+'" class="attachFile"><a href="'+attachURL+eval('writeAttachFile0'+i)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('writeAttachFile0'+i+'Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile0'+i+'\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0'+i+'" value="Y" />';
					}
					// const fileInfo = ['계약서', '개인정보동의서', '사업자등록증', '훈련생명부', '사이버연수원생성 요청 시 로고'];
					// writes += `<span style="margin-left:10px;">${fileInfo[i-1]}</span>`;
					writes += '</li>';
				}
			}

			writes += '</ul>'
			writes += '</form>'
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			if(seq==''){
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this,\'mode9\');">작성완료</button>';
			}else{
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this);">수정완료</button>';
			}
			writes += '<button type="button" onClick="listAct('+page+')">목록보기</button></div>';
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSWrite')
			$('#contentsArea').html(writes);
			findOpt();//selct 선택자 찾기
			emailSelect();//이메일 select 호출 사용시 같이 호출
			pickerAct2();//데이트피커 사용
			fileformAct();//파일 첨부 사용시
            serviceSelect(addItem03); // 수강 구분 선택 데이터 있을 시
            dragAndDrop();
		}else if(boardMode == 8){	//영업자 선택형 게시판
			writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
			writes += '<input type="hidden" name="userID" value="'+writeUserID+'" />';
			writes += '<input type="hidden" name="replySeq" value="'+replySeq+'" />';
			writes += '<input type="hidden" name="seq" value="'+writeSeq+'" />';
			writes += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
			writes += '<ul>';
			writes += '<li><h1>제목</h1>';
			if(useSecret == 'Y'){
				writes += '<input id="useSecret" name="secret" value="Y" type="checkbox"'
				if(writeSecret == 'Y' || replySecret == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useSecret">비밀글</label>'
			}
			if(useTop == 'Y'){
				writes += '<input name="top" id="useTop" value="Y" type="checkbox"'
				if(writeTop == 'Y' || replyTop == 'Y'){
					 writes += 'checked="checked"'
				}
				writes += '><label for="useTop">공지글</label>'
			}
			writes += '<input type="text" class="subject" name="subject" value="';
			if(writeReply != ''){
				writes += '[댓글]'+replySubject;
			}else{
				writes += writeSubject;
			}
			writes += '" />'
			writes += '</li>'
			if(useCategory == 'Y'){
				writes += '<li><h1>카테고리</h1>';
				writes += '<select name="categorySeq" class="';
				if(writeReply != ''){
					writes += replyCategorySeq;
				}else{
					writes += writeCategorySeq;
				}
				writes += '"></select></li>';
				var categorySort = $.get(categoryApi,{'value01':'boardCategory','divisionValue':boardCode},function(data){
					optionWrite = '';
					if(data.totalCount != 0){
						$.each(data.category,function(){
							optionWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
						})
					}
					$('select[name="categorySeq"]').html(optionWrite)
				})
			}
			if(useName == 'Y'){
				writes += '<li><h1>작성자</h1>';
				if(loginUserName != '' || seq != ''){
					writes += loginUserName;
					writes += '<input type="hidden" name="userName" value="'+loginUserName+'" />';
				}else{
					writes += '<input type="text" name="userName" value="'+writeUserName+'" />';
				}
			}
			writes += '</li>';
			if(loginUserID == ''){
				writes += '<li><h1>비밀번호</h1><input class="name" type="password" name="pwd" /></li>'
			}
			if(usePhone == 'Y'){
				writes += '<li><h1>연락처</h1><select type="tel" name="phone01" class="'+writePhone01+'">'+optWrite['mobile01']+optWrite['phone01']+'</select>  - <input type="tel"  class="tel" name="phone02" value="'+writePhone02+'"> - <input type="tel" class="tel" name="phone03" value="'+writePhone03+'"></li>'
			}
			if(useEmail == 'Y'){
				writes += '<li><h1>이메일</h1><input class="name" name="email01" type="text" maxlength="20" tabindex="1" value="'+writeEmail01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="'+writeEmail02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+writeEmail02+'" /></li>'
			}
			if(useFile != 0){
				for(i=1;i <= eval(useFile) ; i++){
					writes += '<li><h1>첨부파일';
					if(useFile != 1){writes += i;}
					writes += '</h1>'
					if(eval('writeAttachFile0'+i) == '' || eval('writeAttachFile0'+i) == null){
						writes += '<input name="attachFile0'+i+'" type="file" />'
					}else{
						writes += '<div id="attachFile0'+i+'" class="attachFile"><a href="'+attachURL+eval('writeAttachFile0'+i)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('writeAttachFile0'+i+'Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile0'+i+'\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0'+i+'" value="Y" />';
					}
					writes += '</li>';
				}
			}
			writes += '<li id="selectManager"><h1>공개여부</h1>';
			writes += '<input type="radio" name="selectType" value="all" id="selAll" checked="checked" onChange="typeSelect(this.value)" /><label for="selAll">전체</label>&nbsp;&nbsp;&nbsp;'
		    writes += '|&nbsp;<input type="radio" name="selectType" value="manager" id="selManager" onChange="typeSelect(this.value)" /><label for="selManager">영업자선택</label>&nbsp;&nbsp;&nbsp;&nbsp;';
			writes += '</li>';
			writes += '<form action="sample.php" method="post"><textarea name="content" id="ir1" rows="10" cols="100" style="display:none;">';
			writes += writeContent;
			writes += '<br /><br />';
			if(writeReply != ''){
				if(replyOrderBy == 0){
					writes += '[원본]<br />'
					writes += replyContents;
				}else{
					writes += replyContents;
				}
			}
			writes += '</textarea></form>';
			writes += '</ul>'
			writes += '</form>'
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			if(seq==''){
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this,\'new\');">작성완료</button>';
			}else{
				writes += '<div class="btnArea"><button type="button" onClick="submitContents(this);">수정완료</button>';
			}
			writes += '<button type="button" onClick="listAct('+page+')">목록보기</button></div>';
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSWrite')
			$('#contentsArea').html(writes);

			if(addItem01 != ''){
				$('#selManager').prop("checked",true);
				typeSelect('manager',addItem01);
			}
			findOpt();//selct 선택자 찾기
			emailSelect();//이메일 select 호출 사용시 같이 호출
			fileformAct();//파일 첨부 사용시

			nhn.husky.EZCreator.createInIFrame({
				oAppRef: oEditors,
				elPlaceHolder: "ir1",
				sSkinURI: "../lib/SmartEditor/SmartEditor2Skin.html",
				htParams : {
					bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
					//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
					fOnBeforeUnload : function(){
						//alert("완료!");
					}
				}, //boolean
				fOnAppLoad : function(){
					//예제 코드
					//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
				},
				fCreator: "createSEditor2"
			});
		}else{
			writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
			writes += '<input type="hidden" name="userID" value="'+writeUserID+'" />';
			writes += '<input type="hidden" name="replySeq" value="'+replySeq+'" />';
			writes += '<input type="hidden" name="seq" value="'+writeSeq+'" />';
			writes += '<input type="hidden" name="boardCode" value="'+boardCode+'" />';
			writes += '<ul>'
			writes += '<li>';
			writes += '<h1>제목</h1>';
			writes += '<input type="text" class="subject" name="subject" value="'+writeSubject+'" />';
			writes += '</li>';
			if(useFile != 0){
				for(i=1;i <= eval(useFile) ; i++){
					writes += '<li><h1>목록이미지';
					if(useFile != 1){writes += i;}
					writes += '</h1>'
					if(eval('writeAttachFile0'+i) == '' || eval('writeAttachFile0'+i) == null){
						writes += '<input name="attachFile0'+i+'" type="file" />'
					}else{
						writes += '<div id="attachFile0'+i+'" class="attachFile"><a href="'+attachURL+eval('writeAttachFile0'+i)+'" target="_blank"><img src="../images/admin/icon_addfile.png">'+eval('writeAttachFile0'+i+'Name')+'</a><button type="button" onclick="deleteFileAct(\'attachFile0'+i+'\')">첨부파일삭제</button></div><input type="checkbox" name="delFile0'+i+'" value="Y" />';
					}
					writes += '</li>';
				}
			}
			writes += '<li>';
			writes += '<h1>이벤트시작일</h1>';
			writes += '<div class="datePicker"><input type="text" name="addItem01" class="cal" value="'+addItem01+'" readonly="readonly" /></div>';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>이벤트종료일</h1>';
			writes += '<div class="datePicker"><input type="text" name="addItem02" class="cal" value="'+addItem02+'" readonly="readonly" /></div>';
			writes += '</li>';
			writes += '<li>';
			writes += '<h1>이벤트링크</h1>';
			writes += '<input type="text" class="subject" name="content" value="'+writeContent+'" />';
			writes += '</li>';
			writes += '</ul>'
			writes += '</form>';
			writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
			if(seq==''){
				writes += '<div class="btnArea"><button type="button" onClick="multipartSendData(\'writeform\',\'new\');">작성완료</button>';
			}else{
				writes += '<div class="btnArea"><button type="button" onClick="multipartSendData(\'writeform\');">수정완료</button>';
			}
			writes += '<button type="button" onClick="listAct('+page+')">목록보기</button></div>';
			$('#contentsArea').removeAttr('class')
			$('#contentsArea').addClass('BBSWrite')
			$('#contentsArea').html(writes);
			fileformAct();//파일 첨부 사용시
			pickerAct();//데이트피커 사용
		}
	}
}


//에디터 사용시 호출
var oEditors = [];

function submitContents(elClickedObj,type) {
	if(boardMode == 9){
		if($('input[name=subject]').val() == ''){
			alert('과정명을 입력해주세요.');
			return false;
		}

		if($('input[name=company]').val() == ''){
			alert('사업주명을 입력해주세요.');
			return false;
		}

		if($('input[name=addItem01]').val() == ''){
			alert('수강날짜를 선택해주세요.');
			return false;
		}
	}

	if (boardMode != 9) {
		oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.
	}

	// 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById("ir1").value를 이용해서 처리하면 됩니다.
	try {
		elClickedObj.form.submit();
	} catch(e) {}
	//multipartSendData('writeform',type);
    if(boardMode != 9){
        multipartSendData('writeform','board');
    } else {
        multipartSendData('writeform','mode9');
    }
}

function typeSelect(types){
//	alert(addItem01);
	$('#selectManager input[type="text"], #selectManager button[type="button"], #selectManager select').remove();
	var chageSelect =''
	if(types == 'all'){
		chageSelect += '';
	}else if(types == 'manager'){
		//chageSelect += '<input name="selectManager" type="text" value="'+managerName+'"/> <button type="button" name="selectManagerBtn" onClick="searchSelect(\'selectManager\',\'../api/apiMember.php\',\'manager\')">검색</button>';
        chageSelect += '<button type="button" name="selectManagerBtn" onClick="searchSelect(\'selectManager\',\'../api/apiMember.php\',\'manager\')">영업자검색</button>';
        if(seq){
			searchSelect('selectManager','../api/apiMember.php','manager&userID='+managerID);
		}
	}
	$('#selectManager').append(chageSelect)
}

function serviceSelect(service){
    if(service == ''){
        return;
    }

    let checkedService = service.split('.');
    checkedService.forEach(check => {
        const checkbox = document.getElementById(check);
        checkbox.checked = true;
    })
}

function dragAndDrop(){
    let writeForm = document.getElementsByClassName("writeform")[0];

    writeForm.ondragover = function (e) {
        e.preventDefault();
    }

    writeForm.ondragleave = function (e) {
        e.preventDefault();
    }

    writeForm.ondrop = function (e) {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        let countExistFile = 0;

        for(var i=1; i<=5; i++){
            if(document.getElementById("attachFile0" + i) != null){
                countExistFile++;
            }
        }

        if(files.length > 5 - countExistFile){
            alert("최대 "+ (5 - countExistFile) +"개까지 첨부 가능합니다.");
            return false;
        }

        let a = 1; // input용 변수
        let b = 0; // 드랍 파일용 변수
        while (a <= 5 && b < files.length){
            const dataTrans = new DataTransfer();
            dataTrans.items.add(files[b])
            const file = dataTrans.files;
            const inputFile = document.getElementsByName("attachFile0" + a);

            if(inputFile[0] != null){
                inputFile[0].previousSibling.innerText = files[b].name;
                inputFile[0].files = file;
                a++;
                b++;
            } else {
                a++;
            }

        }
    }
}



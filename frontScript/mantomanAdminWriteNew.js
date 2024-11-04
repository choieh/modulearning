//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기


//게시판 보기 스크립트 시작
function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용
	
	//상단메뉴	
	$('.searchArea').remove();	
	
	var userID = '';
	var userName = '';
	var phone01 = '';
	var phone02 = '';
	var phone03 = '';
	var email01 = '';
	var email02 = '';
	var subject = '';
	var content = '';
	var consult = '';
		
	var writeAjax = $.get(useApi,{'seq':seq,'boardType':boardType,'viewType':viewType},function(data){
		$.each(data.consult, function(){ 
			//맴버정보 기록
			 userID = this.userID;
			 userName = this.userName;
			 phone01 = this.phone01;
			 phone02 = this.phone02;
			 phone03 = this.phone03;
			 email01 = this.email01;
			 email02 = this.email02;
			 subject = this.subject;
			 content = this.content;
			 consult = this.category;		
		})
		writePrint();
	})	

	function writePrint(){
		var writes = ''
		//입력영역 시작
		writes += '<form class="writeForm" action="javascript:checkData(\'writeForm\')">';
		writes += '<input type="hidden" name="boardType" value="'+boardType+'">'
		writes += '<input type="hidden" name="seq" value="'+seq+'">'
		writes += '<input type="hidden" name="userName" value="'+userName+'">'
		writes += '<input type="hidden" name="userID" value="'+userID+'">'	
		writes += '<ul>';
		
		//이름
		writes += '<li><h1>이름</h1>';
		writes += ''+userName;
		writes += '</li>';
		
		//아이디
		writes += '<li><h1>아이디</h1>'+userID+'</li>';

		//카테고리
		writes += '<li><h1>문의종류</h1>';
		writes += '<select name="consult" class="'+consult+'">'+optWrite['consult']+'</select>'
		writes += '</li>'

		writes += '<li><h1>연락처</h1>';
		/*writes += '<select name="phone01" class="'+phone01+'">'+optWrite['mobile01']+'</select>&nbsp;-&nbsp;'
		writes += '<input type="tel" name="phone02" class="year" value="'+phone02+'" />&nbsp;-&nbsp;';
		writes += '<input type="tel" name="phone03" class="year" value="'+phone03+'" />';*/
		writes += phone01+'-'+phone02+'-'+phone03+'</li>'
		
		writes += '<li><h1>이메일</h1>';
		/*writes += '<input class="name" name="email01" type="text" maxlength="20" value="'+email01+'" />&nbsp;@&nbsp;<select name="email02Chk" class="'+email02+'" id="email02">'+optWrite['email02']+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+email02+'" />';*/
		writes += email01+'@'+email02+'</li>';
		//writes += '<li><h1>제목</h1><input type="text" name="subject" class="subject" value="'+subject+'" /></li>';
		writes += '<li><h1>제목</h1>'+subject+'</li>';
		//writes += '<li><h1>문의 내용</h1><textarea name="content">'+content+'</textarea></li>';
		writes += '<li><h1>문의 내용</h1>'+content+'</li>';
		writes += '</ul>'
		writes += '<div class="btnArea">';
		writes += '<button type="submit">';
		if(seq != ''){
			writes += '수정하기'
		}else{
			writes += '문의하기'
		}
		writes += '</button>'
		/*if(seq != ''){
			writes += '<button type="button" onClick="deleteData('+seq+')">삭제하기</button>'
		}*/
		if(modes != 'writeMode'){
			writes += '<button type="button" onclick="listAct(page)">목록으로</button>'
		}
		writes += '</div>';
		writes += '</form>';
		$('#wrap').removeAttr('class');
		$('#contentsArea').removeAttr('class')
		$('#contentsArea').addClass('BBSWrite')
		$('#contentsArea').html(writes);
		findOpt();//selct 선택자 찾기
		emailSelect();//이메일 select 호출 사용시 같이 호출	
	}	
}


function checkData(writeclass){
	var sendSerial = $('form.'+writeclass).serialize();
	if(confirm("수정하시겠습니까?")){
		$.ajax({
			url: useApi,
			type:'POST',
			data:'adminConsult=Y&'+sendSerial,
			dataType:'text',
			success:function(data){
				alert('문의종류가 수정되었습니다.');
				top.location.reload();
			},
			fail:function(){
				alert('등록에 실패하였습니다.')
			}
		})
	}
} 
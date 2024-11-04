//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiSendMessage.php'
var page = '';

//리스트액션
function listAct(){	
	var writes = '';

	writes += '<div class="messageText"><p></p>';
	writes += '<h3>아래 키워드를 사용하면 해당 메시지가 적용됩니다.</h3>';
	writes += '<ul>';
	writes += '<li>{시작} : 수강시작일 | 예) 2018-01-01 </li>';
	writes += '<li>{종료} : 수강종료일 | 예) 2018-01-31 </li>';
	writes += '<li>{회사명} : 발송 시 앞에 붙는 기관명 | 예) 한국산업인재융합교육원 </li>';
	writes += '<li>{소속업체명} : 학습자가 소속된 업체명 | 예) SK텔레콤 </li>';
	writes += '<li>{도메인} : 학습사이트주소 | 예) http://modulearning.kr  </li>';
	writes += '<li>{아이디} : 학습자아이디 | 예) abc900101  </li>';
	writes += '<li>{이름} : 학습자이름 | 예) 손흥민 </li>';
	writes += '<li>{과정명} : 수강중인 과정명 예) 직무필수교육</li>';
	writes += '<li>{학습종료과정위치} : 학습종료과정 위치 예) 내강의실-학습종료과정  </li>';
	writes += '<li>{교육담당자메일} : 교육담당자메일 | 예) kira_system@modulearning.kr  </li>';
	writes += '<li>{교육담당자아이디} : 교육담당자아이디 | 예) abc900101  </li>';
	writes += '<li>{전자계산서메일} : 전자계산서메일 | 예) kira_system@modulearning.kr </li>';
	writes += '</ul>';
	writes += '<p><a href="/attach/docs/kakaoAtalkGuide.pdf" target="_blank" style="font-size:15px;">카카오 알림톡 검수 가이드 (다운로드 클릭)</a></p>';
	writes += '</div>'; 

	

		$.get(useApi,{'manager':'Y'},function(data){	
			$.each(data.sendLog, function(data){
				var seq = this.seq;
				var message1 = this.message;
				var device = this.device;
				var sendType = this.sendType;

				//내용 시작
				writes += '<div class="smsSetting">';
				writes += '<form class="writeform" name="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';			
				//seq값 선언
				writes += '<input type="hidden" name="seq" value="'+seq+'" />';
				writes += '<h1>'+device+' : '+sendType+'</h1>';

				//입력영역 시작			
				writes += '<div class="textInputs">';
				writes += '<textarea name="message" id="ir1">'+message1+'</textarea>';
				writes += '<input type="button" onClick="sendData2('+seq+',ir1.value)" value="정보수정" />';
				writes += '<div class="clear"></div>'; 
				writes += '</div>'; 
				
				writes += '</form>'; 
				writes += '</div>'; 
				
			})
			$('#contentsArea').removeAttr('class');
			$('#contentsArea').addClass('BBSWrite');
			$('#contentsArea').html(writes);
	})
}

function sendData2(seq,message){
	var sendData = ''	
	sendData = {'seq':seq,'message':message};

	if(confirm('수정하시겠습니까?' ) == true){
		$.post(useApi,sendData,function(data){
			if(data.result == 'success'){
				alert('수정이 완료되었습니다.')
			}else{
				alert('수정 되지 않았습니다.')
			}
		})
	}
}


function runEvent(apiName){
	var sendData = $('#eventInput').serialize() //반드시 코딩시 이벤트 영역에 ID는 eventInput으로 정의
	var chkCnt = 0;
	$('#eventInput input.mustChk, #eventInput textarea.mustChk').each(function(){ //유효성 검사시 필수항목은 class=mustChk선언 경고메세지는 title로 입력
		if($(this).val() == '' || $(this).val() == '' ){
			alert($(this).attr('title')+'이 입력되지 않았습니다.')
			$(this).focus();
			chkCnt ++
			return
		}
	})
	if(chkCnt == 0){
		var sendFormData = $('#eventInput').serialize();
	
		$.ajax({
			url:apiName,
			type:'POST',
			dataType:"json",
			data:sendFormData,
			success: function(data){ 
			  if(data.result =='success'){
				  alert('정상적으로 처리되었습니다.')
				  top.location.href='../bbs/?boardCode=9';
				  //top.location.href='../studyCenter/bbs.php?boardCode=9';
			  }else{
				  alert('시스템에러 잠시 후 다시 시도해주세요.')
			  }
			}
		})
	}	
}
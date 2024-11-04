var catArray='';
var categoryArr = new Array();

//게시판 보기 스크립트 시작
function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용
    runVals('globalCode');

    catArray.done(function(){
		var writeAjax = $.get(useApi,{'seq':seq},function(data){
		writePrint(data);
	})
	})
}

function writePrint(data){	
    if(typeof(data) == 'object'){
		var chkData = data
	}else{
		var chkData = '';
	}
    var writes = ''

    //입력영역 시작
    writes += '<form class="writeForm" action="javascript:checkData(\'writeForm\')">';
    writes += '<input type="hidden" name="seq" value="'+seq+'">'
    writes += '<input type="hidden" name="userID" value="'+data.note[0].userID+'">'
    writes += '<ul>';
    writes += '<li><h1>내용</h1><textarea name="noteContent" style="height:511px">'+data.note[0].content+'</textarea></li>';
    writes += '</ul>'
    writes += '<div class="btnArea">';
    writes += '<button type="submit">수정하기</button>';
    writes += '<button type="button" onClick="deleteData('+seq+')">삭제하기</button>';
    writes += '<button type="button" onclick="listAct(page)">목록으로</button>';
    writes += '</div>';
    writes += '</form>';
    $('#wrap').removeAttr('class');
    $('#contentsArea').removeAttr('class')
    $('#contentsArea').addClass('BBSWrite')
    $('#contentsArea').html(writes);
    emailSelect();//이메일 select 호출 사용시 같이 호출	
}

function checkData(writeclass){
	var sendSerial = $('form.'+writeclass).serialize();
	console.log(sendSerial);
	if(confirm("등록하시겠습니까?")){
		$.ajax({
			url: useApi,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				alert('수정 됐습니다.');
				top.location.reload();
			},
			fail:function(){
				alert('등록 실패하였습니다.')
			}
		})
	}
    
}

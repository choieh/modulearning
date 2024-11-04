// 일반 form 등록 : sendData()
// 테이블 열 등록 : lineSendData(seq,등록/수정)
// 데이터 삭제    : deleteData(seq)
//
//	작성자 : 서영기

//공통선언 -  등록
function sendData(apiName,formClass,types){
	var sendSerial = $('form.'+formClass).serialize();
	if(types == 'modify'){
		var confirmText = '내 정보를 변경하시겠습니까?';
		var text = '변경되었습니다.';
	}else if(types == 'update'){
        var confirmText = '수정하시겠습니까?';
        var text = '수정되었습니다.';
    }else{
		var confirmText = '등록하시겠습니까?';
		var text = '등록되었습니다.';
	}

	if(confirm(confirmText)){
		$.ajax({
			url: apiName,
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(data){
				alert(text);
				if(types == 'modal'){
					$('.btnRefresh').click();
				}else if(types == 'modalBoth'){
					$('.btnRefresh').click();
					ajaxAct()
				}else if(types == 'comment'){
					commentAct(seq)
				}else{
					if(seq != '' || types=='new'){
						viewAct(data);
					}else if(types=="delete"){
						listAct(page);
					}else if(types=="login"){
						top.location.href='/member/login.php'
					}else{
						ajaxAct()
					}
				}
			},
			fail:function(){
				alert('등록에 실패하였습니다.')
			}
		})
	}
}

function lineSendData(apiName,sendSeq,acts,types){
	//type= copys, modifys
	var sendSeq = sendSeq ? sendSeq : '' ;
	var sendData = '';
	var sendObj = '';
	if(types != 'modal'){
		sendObj = $('.line'+sendSeq+'>td');
	}else{
		sendObj = $('.modalLine'+sendSeq+'>td')
	}

	var sendSerial = sendObj.each(function(){
		var inputs = $(this).find('input, select');
		if($(this).has('input, select').length){
			sendData += inputs.attr('name');
			sendData += '=';
			sendData += inputs.val().replace(/&/g,'%26');
			sendData += '&';
		}
	})
	if(acts =="copys"){
		sendData += 'seq=';
	}else{
		sendData += 'seq='+sendSeq;
	}

	var msg = ''
	var resultMsg = ''
	if(acts =="copys"){
		msg = '복사하시겠습니까?'
		resultMsg = '복사되었습니다.'
	}else{
		msg = '수정하시겠습니까?'
		resultMsg = '수정되었습니다.'
	}
	//alert(sendData)
	if(confirm(msg)){
		$.ajax({
			method:'POST',
			url:apiName,
			dataType:'text',
			data: sendData,
			success:function(data){
				alert(resultMsg);
				if(types == 'modal'){
					$('.btnRefresh').click();
				}else{
					if(seq != ''){
						viewAct(data);
					}else{
						ajaxAct()
					}
				}
			},
			fail:function(){
				alert('정상적으로 처리되지 않았습니다.')
			}
		})
	}
}


//작성완료
function multipartSendData(formName,types,mode9seq){
	var formName = $('form.'+formName);
	formName.ajaxForm({
		dataType:'text',
		beforeSubmit: function (data,form,option) {
			return true;
		},
		success: function(data,status){
			if(data == 'noBoard'){
                alert("첨부하신 파일은 업로드 할 수 없는 파일입니다.");
            }else if(data == "noImg"){
                alert("첨부하신 파일은 이미지 파일이 아닙니다.");
            }else if(data == "noReport"){
                alert("첨부하신 파일은 문서 파일이 아닙니다.");
            }else{
				alert("처리되었습니다.");
				if(types == 'modal'){
					$('.btnRefresh').click();
				}else if(types == 'mode9'){
					writeAct();
				}else{
					if(types == 'board'){
						listAct(page);
					}else if (seq != '' || types == 'new') {
						//listAct(page);
					}else if(types == 'delete'){
						listAct(page);
					}else{
						ajaxAct();
					}
				}
			}
		},
		error: function(){
			//에러발생을 위한 code페이지
			alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
		}
	});
	formName.submit();

};

//공통선언 - 삭제
function deleteData(apiName, sendSeq, types, mode9seq){
	if(confirm("정말 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.")){
		if(types == 'mode9'){
			var delFileAll = 'Y';
		}
		$.ajax({
			url: apiName,
			type:'DELETE',
			data:{'seq':sendSeq,'delFileAll':delFileAll},
			dataType:'text',
            async: false,
			success:function(data){
				if (data === 'child') {
					alert('대댓글이 존재하여 삭제가 불가능 합니다.');
					return;
				}
				alert('삭제되었습니다.');
				if(types == 'modal'){
					$('.btnRefresh').click();
				}else if(types == 'comment'){
					commentAct(seq);
				}else if(types == 'mode9'){
					// viewAct(mode9seq);
					listAct(page);
				}else if(types == 'application'){
					ajaxAct(searchValue);
				}else if(types == 'studyPopup'){
					modalClose();
					globalModalAct('studyCenterPopup','','','','');
				}else{
					if(seq != ''){
						listAct(page);
					}else{
						ajaxAct()
					}
				}
			},
			fail:function(){
				alert('삭제에 실패하였습니다.')
			}
		})
	}
}

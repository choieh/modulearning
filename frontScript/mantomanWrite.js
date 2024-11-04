var catArray='';
var categoryArr = new Array();

//게시판 보기 스크립트 시작
function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	seq = writeSeq //파일관련 스크립트 사용
    runVals('globalCode');

    catArray.done(function(){
		if( seq != ''){
            var writeAjax = $.get(useApi,{'seq':seq,'boardType':boardType},function(data){
				writePrint(data);
			})
        } else {
            var writeAjax = $.get('../api/apiLoginUser.php',{'userID':loginUserID},function(data){
				writePrint(data);
			})
        }
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
	writes += '<input type="hidden" name="subdomain" value="'+subdomain+'">';
    writes += '<input type="hidden" name="boardType" value="'+boardType+'">'
    writes += '<input type="hidden" name="seq" value="'+seq+'">'

    if(returnData(chkData.userID) != ''){
        writes += '<input type="hidden" name="userName" value="'+data.userName+'">'
        writes += '<input type="hidden" name="userID" value="'+data.userID+'">'
    }else if(seq != '') {
		writes += '<input type="hidden" name="userName" value="'+data.consult[0].userName+'">'
        writes += '<input type="hidden" name="userID" value="'+data.consult[0].userID+'">'
    }else{
        writes += '<input type="hidden" name="userID" value="guest">'
    }
    writes += '<ul>';
    
    //이름
    writes += '<li><h1>이름</h1>';
    if(returnData(chkData.userID) != ''){
        writes += returnData(chkData.userName)
    }else if(seq != ''){
		writes += returnData(chkData.consult[0].userName)
    }else{
        writes += '<input type="text" class="userName" />';
    }
    writes += '</li>';
    
    //아이디
    //if(returnData(chkData.userID) != ''){
    //    writes += '<li><h1>아이디</h1>'+returnData(chkData.userID)+'</li>';
    //}
    //카테고리
    writes += '<li><h1>문의종류</h1>';
	if(seq != ''){
		writes += '<select name="consult" type="select">'+returnSelect('consult',returnData(chkData.consult[0].category))+'</select>'
	}else{
		writes += '<select name="consult" type="select">'+returnSelect('consult')+'</select>'
	}    
    writes += '</li>'

    writes += '<li><h1>휴대전화</h1>';
	if(seq != ''){
		writes += '<select name="phone01">'+returnSelect('mobile01',returnData(chkData.consult[0].phone01))+'</select>&nbsp;-&nbsp;'
		writes += '<input type="tel" name="phone02" class="year" value="'+returnData(chkData.consult[0].phone02)+'" />&nbsp;-&nbsp;';
		writes += '<input type="tel" name="phone03" class="year" value="'+returnData(chkData.consult[0].phone03)+'" />';
	}else{
		writes += '<select name="phone01">'+returnSelect('mobile01',returnData(chkData.mobile01))+'</select>&nbsp;-&nbsp;'
		writes += '<input type="tel" name="phone02" class="year" value="'+returnData(chkData.mobile02)+'" />&nbsp;-&nbsp;';
		writes += '<input type="tel" name="phone03" class="year" value="'+returnData(chkData.mobile03)+'" />';
	}   
    writes += '<span style="margin-left:20px; color:#888;font-weight:700;">* 휴대전화로 답변 알림 문자가 발송되오니, 정보를 확인해 주세요.</span>'
    writes += '</li>'
    
    writes += '<li><h1>이메일</h1>';
	if(seq != ''){
		writes += '<input class="name" name="email01" type="text" maxlength="20" value="'+returnData(chkData.consult[0].email01)+'" />&nbsp;@&nbsp;<select name="email02Chk" id="email02">'+returnSelect('email02',returnData(chkData.consult[0].email02))+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+returnData(chkData.consult[0].email02)+'" />';
	}else{
		writes += '<input class="name" name="email01" type="text" maxlength="20" value="'+returnData(chkData.email01)+'" />&nbsp;@&nbsp;<select name="email02Chk" id="email02">'+returnSelect('email02',returnData(chkData.email02))+'</select>&nbsp;<input type="text" name="email02" id="emails" class="name" value="'+returnData(chkData.email02)+'" />';
	}
    writes += '</li>';
	if(seq != ''){
		writes += '<li><h1>제목</h1><input type="text" name="subject" class="subject" value="'+returnData(chkData.consult[0].subject)+'" /></li>';
	}else{
		writes += '<li><h1>제목</h1><input type="text" name="subject" class="subject" value="'+returnData(chkData.subject)+'" /></li>';
	}
    if(seq != ''){
		writes += '<li><h1>문의 내용</h1><textarea name="content">'+returnData(chkData.consult[0].content)+'</textarea></li>';
	}else{
		writes += '<li><h1>문의 내용</h1><textarea name="content">'+returnData(chkData.content)+'</textarea></li>';
	}
    writes += '</ul>'
    writes += '<div class="btnArea">';
    writes += '<button type="submit">';
    if(seq != ''){
        writes += '수정하기'
        writes += '<input type="hidden" value="modify" id="modify">'
    }else{
        writes += '문의하기'
    }
    writes += '</button>'
    if(seq != ''){
        writes += '<button type="button" onClick="deleteData('+seq+viewType+')">삭제하기</button>'
    }
    if(modes != 'writeMode'){
        writes += '<button type="button" onclick="listAct(page)">목록으로</button>'
    }
    writes += '</div>';
    writes += '</form>';
    $('#wrap').removeAttr('class');
    $('#contentsArea').removeAttr('class')
    $('#contentsArea').addClass('BBSWrite')
    $('#contentsArea').html(writes);
    emailSelect();//이메일 select 호출 사용시 같이 호출	
}

function checkData(writeclass){
    //input 검사
    var $writeChk = $('.writeForm input[type="text"], .writeForm input[type="tel"], .writeForm textarea, .writeForm select[name="consult"], .writeForm select[name="phone01"]')//20170810 서영기 select항목 각각 등록
    var checkFalse = 0
    $writeChk.each(function(){
        if($(this).val() == ''){
            var chk = $(this).closest('li').children('h1').text()
			if(chk == '문의종류'){
				alert('[ '+chk+' ] 항목을 선택해주세요.')
			}else{
				alert('[ '+chk+' ] 항목을 작성해주세요.')
			}            
            checkFalse ++;
            return false;  
        }
    })
    
    //select 검사
    if(checkFalse == 0){
        var selectFalse = 0;
        //var $writeChk = $('.writeForm select option:selected') // 20170810 서영기 중복 변수선언 삭제
        //$writeChk.not('select[name="email02Chk"] option').each(function(){  // 20170810 서영기 상단 변수 재정의로 not제외
		$writeChk.each(function(){  // 20170810 서영기 상단 변수 재정의로 not제외
            if($(this).val() == ''){
                var chk = $(this).closest('li').children('h1').text()
                alert('[ '+chk+' ] 항목을 선택해주세요.')
                selectFalse ++;
                return false;  
            }
        })
	}
    
    //등록
    if(selectFalse == 0){
		if($('#modify').val() == 'modify'){
			var text = '수정하시겠습니까?';
		}else{
			var text = '등록하시겠습니까?';
		}
        var sendSerial = $('form.'+writeclass).serialize();
        if(confirm(text)){
            $.ajax({
                url: useApi,
                type:'POST',
                data:sendSerial,
                dataType:'text',
                success:function(data){
					if(text == 'modify'){
						alert('문의 내용이 수정되었습니다. 답변 등록 시 휴대전화로 알림 문자가 발송됩니다.');
					}else{
						alert('상담 문의가 등록되었습니다. 답변 등록 시 휴대전화로 알림 문자가 발송됩니다.');
					}                    
                    top.location.reload();
                },
                fail:function(){
                    alert('등록에 실패하였습니다.')
                }
            })
	    }
    }
}

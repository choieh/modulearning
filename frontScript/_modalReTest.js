function globalModalActMore(types,modalSeq,eachID,option,option2) {
	modalClose();
	globalModalAct(types,modalSeq,eachID,option,option2);
}

function modalReTest(lectureOpenSeq,userID){

	var modalWrite =''
	modalWrite +='<div id="modal">';


		modalWrite += '<div class="memberView" >';
		modalWrite += '<h1><strong>재응시 내역</strong><button type="button" onClick="modalClose()"><img src="../images/admin/btn_close.png" alt="닫기" /></button></h1>';
		modalWrite += '<div>';
		$.get('../api/apiModalRetest.php',{'lectureOpenSeq':lectureOpenSeq,'userID':userID},function(data){

			modalWrite +='<div class="BBSList">';
			modalWrite +='<h1>재응시 내역</h1>';
			modalWrite +='<table><thead><tr>';
			modalWrite +='<th style="width:60px;">번호</th>';
			modalWrite +='<th>초기화 날짜</th>';
			modalWrite +='<th>응시 날짜</th>';
			modalWrite +='<th style="width:60px;">평가점수</th>';
			modalWrite +='<th style="width:60px;">구분</th>';
			modalWrite +='</tr></thead><tbody>';

			var i = data.totalCount;

			if(data.totalCount != 0){
				$.each(data.reTest,function(){
					modalWrite +='<tr>';
					modalWrite +='<td>'+i+'</td>';
					modalWrite +='<td>'+this.resetDate+'</td>';
					modalWrite +='<td>'+this.testDate+'</td>';
					if (this.testScore == '') {
						this.testScore = '-';
					} else {
						this.testScore = this.testScore+'점';
					}
					modalWrite +='<td>'+this.testScore+'</td>';
					if (this.testType == 'mid') {
						this.testType = '중간';
					} else if(this.testType == 'test') {
						this.testType = '최종';
					} else {
            this.testType = '과제';
          }
					modalWrite +='<td>'+this.testType+'</td>';
					modalWrite +='</tr>';
					i --;
				})

			}else{
				modalWrite +='<tr><td colspan="100%">재응시 이력이 없습니다.</td></tr>';
			}

				/*modalWrite +='<tr>';
				modalWrite +='<td>2</td>';
				modalWrite +='<td>2021-01-27 05:00:00</td>';
				modalWrite +='<td>2021-01-27 10:12:23</td>';
				modalWrite +='<td>20점</td>';
				modalWrite +='</tr>';

				modalWrite +='<tr>';
				modalWrite +='<td>1</td>';
				modalWrite +='<td>2021-01-26 05:00:00</td>';
				modalWrite +='<td>2021-01-26 13:34:34</td>';
				modalWrite +='<td>48점</td>';
				modalWrite +='</tr>';*/

			modalWrite +='</tbody></table>';
			modalWrite += '<div>';
			modalWrite +='</div></div>';
			$('#contents').after(modalWrite);
			modalAlign();
		})
}

//초기화
function resetInput(){
	$('.studyCenterPopupFrom input[type="text"]').val('');
	$('.studyCenterPopupFrom .AttachFiles span').text('파일찾기');
	$('.studyCenterPopupFrom #useless').prop('checked','checked');
	$('.studyCenterPopupFrom #btnText').text('등록하기');
	$('.studyCenterPopupFrom #attachFile').remove();
	if($('.studyCenterPopupFrom .attachFileTe').hasClass('attachFile')){
		console.log('true');
	}else{
		$('.studyCenterPopupFrom input[name="delFile01"]').remove();
		var inputFind = $('.studyCenterPopupFrom .attachFileTe').children('input');
		if(inputFind.length == 0){
			$('.studyCenterPopupFrom .attachFileTe').append('<input class="fileFind" type="file" name="attachFile" />');
		}

	}

}

function popupWrite(seq){
	$('#btnText').text('수정하기');
	$.get(studyCenterPopupApi,{'seq':seq},function(data){
		var imageURL = data.imageURL;
		$.each(data.popup, function(){
			$('input[name="seq"]').val(this.seq);
			$('input[name="subject"]').val(this.subject);
			$('input[name="width"]').val(this.width);
			$('input[name="height"]').val(this.height);
			$('input[name="popupURL"]').val(this.popupURL);
			$('input[name="startDate"]').val(this.startDate);
			$('input[name="endDate"]').val(this.endDate);
			if(this.enabled == 'Y'){
				$('#use').prop('checked','checked');
			}else{
				$('#useless').prop('checked','checked');
			}
			if(this.attachFile != ''){
				$('.attachFileTe input').remove();
				$('.attachFileTe').append('<div id="attachFile" class="attachFile"><button type="button" onclick="delFileAct(\'attachFile\')">'+this.attachFile+' 첨부파일삭제</button></div><input type="checkbox" name="delFile01" value="Y" />');
			}
		})
	})
}

//파일 첨부 삭제
function delFileAct(inputName){
	var deleteDiv = $('#'+inputName)
	deleteDiv.parent('li, td, div').children('input[type="checkbox"]').prop('checked',true);
	deleteDiv.after('<input class="fileFind" type="file" name="attachFile" />');
	deleteDiv.remove()
}

function popupBtn(){
	var startDate = $('input[name="startDate"]').val();
	var endDate = $('input[name="endDate"]').val();
	var width = $('input[name="width"]').val();
	var height = $('input[name="height"]').val();

	if(startDate == '' || endDate == ''){
		alert('사용기간을 등록해주세요.');
		return;
	}else if($('input[name="subject"]').val() == ''){
		alert('제목을 입력해주세요.');
		return;
	}else if(width == '' || height == ''){
		alert('사이즈를 입력해주세요.');
		return;
	}else {
		if(confirm("팝업을 등록하시겠습니까?")){
			var formName = $('form.studyCenterPopupFrom');
			formName.ajaxForm({
				dataType:'JSON',
				beforeSubmit: function (data,form,option) {
					return true;
				},
				success: function(data,status){
					if(data.result == 'success'){
						alert("처리되었습니다.");
						modalClose();
						globalModalAct('studyCenterPopup','','','','');
					}else{
						alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
					}
				},
				error: function(){
					//에러발생을 위한 code페이지
					alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
				}
			});
			formName.submit();
		}
	}
}


function checkStudyForm(){
	$('.applicationFrom .price').remove();
	var checkFalse = 0;

	if($('.applicationFrom select[name="companyScale"]').val() == '' ){
		$('.applicationFrom select[name="companyScale"]').after('<strong class="price" style="margin-left:20px;"> 사업주규모를 선택해주세요.</strong>')
		checkFalse ++;
	}
	if($('.applicationFrom select[name="serviceType"]').val() == ''){
		$('.applicationFrom select[name="serviceType"]').after('<strong class="price" style="margin-left:20px;"> 서비스타입을 선택해주세요.</strong>')
		checkFalse ++;
	}
	if(!$('.applicationFrom input[name="openChapter"]').val()){
		$('.applicationFrom input[name="openChapter"]').after('<strong class="price" style="margin-left:20px;"> 실시회차를 입력해주세요.</strong>')
		checkFalse ++;
	}
	if(checkFalse == 0){
		applictionStudy();
	}
}

function applictionStudy(){
	if(confirm("수강등록하시겠습니까?")){
		var sendSerial = $('form.applicationFrom').serialize();
			$.ajax({
				url: '../api/apiApplicationStudy.php',
				type:'POST',
				data:sendSerial+'&study=Y',
				dataType:'JSON',
				success:function(data){
					if(data.result != 'success'){
						alert('오류가 발생하였습니다.');
					}else{
						alert('수강등록 되었습니다. \n수강관리-학습현황에서 확인해주세요.');
						modalClose();
						ajaxAct(searchValue);
					}
				},
				fail:function(){
					alert('오류가 발생하였습니다.')
				}
			})
	}
}

function CompanionF(){
	$("#Companion").val("Y");
    paymentApprovals('1');
}

function reScore(apiName){
	if(confirm("첨삭강사가 다시 채점을 할 수 있도록 하시겠습니까?")){
		var sendSerial = $('form.tutorGrade').serialize();
			$.ajax({
				url: apiName,
				type:'POST',
				data:sendSerial+'&reScore=Y',
				dataType:'text',
				success:function(data){
					alert('재채점 처리 되었습니다.');
					modalClose();
					ajaxAct();
				},
				fail:function(){
					alert('오류가 발생하였습니다.')
				}
			})
	}
}

function tempGrade(apiName,types){
	var sendSerial = $('form.tutorGrade').serialize();
		$.ajax({
			url: apiName,
			type:'POST',
			data:sendSerial+'&temp=Y',
			dataType:'text',
			success:function(data){
				alert('임시저장 되었습니다.');
				modalClose();
				ajaxAct();
			},
			fail:function(){
				alert('임시저장 오류가 발생하였습니다.')
			}
		})
}

function tutorGrade(apiName,types,lectureEnd,today,marketerID){
	var sendSerial = $('form.tutorGrade').serialize();
	var contentsCode = $('.tutorGrade input[name="contentsCode"]').val();
	var lectureOpenSeq = $('.tutorGrade input[name="lectureOpenSeq"]').val();
	var userID = $('.tutorGrade input[name="userID"]').val();
	/*
	if(lectureEnd >= today) {
		alert('채점완료는 '+lectureEnd+' 이후 가능합니다. 임시저장 하시기 바랍니다.');
		return;
	}
	*/
	if($('input[name="copyCheck"]').prop('checked')==true || types == 'tests'){
		var bTypeCnt = 0;
		var cTypeCnt = 0;
		var cTypeMsg = '';

		if(types == 'reports') { // 과제 첨삭 검사
			if($('input[name="return"]').prop('checked')==true){
				alert('반려 상태에서는 채점완료 하실 수 없습니다. 임시저장 하시기 바랍니다.');
				return;
			}else if($('select[name="reportScore[]"]').val() == ''){
				alert('점수를 입력해 주시기 바랍니다.');
				return;
			}else if($('textarea[name="comment[]"]').val() == ''){
				alert('첨삭지도를 작성해 주시기 바랍니다.');
				return;
			}else if($('textarea[name="comment[]"]').val().length < 100 && loginUserID != 'zkfmak_tutor'){
				alert('100자 이상 작성해주세요. 채점 기준에 맞게 감점 점수 및 감점사유를 적어 주시고, 학습자의 답안이 우수한 경우에도 문제에서 요구하는 핵심 내용을 다시 한번 요약해 주시기 바랍니다.');
				return;
			}

		} else { // 중간, 최종평가 첨삭 검사
			$('#modal select[name="rightAnswer[]"]').each(function(){
				if(($(this).length) != 0 && $(this).val() == ''){
					bTypeCnt ++
				}
			})
			var o=0;
			var textareaSelect = '';
			$('#modal select[name="cTypeScore[]"]').each(function(){

				//var textareaSelect = $(this).parent('td').parent('tr').parent('tbody').find('textarea[name="correct[]"]')
				var textareaSelect = $('textarea[name="correct[]"]')
				textareaSelectLen = textareaSelect.val().replace( /(\s*)/g, "");//모든공백을 제거
				$.trim(textareaSelectLen);

				var scoreCheck = $('input[name="scoreCheck[]"]').eq(o).val();

				//console.log(textareaSelectLen.length);
				if($(this).val() == ''){
					cTypeMsg = '서술형 점수를 입력해 주세요!';
					cTypeCnt ++;
					return false;
				}else if(textareaSelect.val() == ''){
					cTypeMsg = '첨삭지도를 작성해 주시기 바랍니다.';
					cTypeCnt ++;
					return false;
				}else if(textareaSelectLen.length < 100){
					cTypeMsg = '100자 이상 작성해주세요. 채점 기준에 맞게 감점 점수 및 감점사유를 적어 주시고, 학습자의 답안이 우수한 경우에도 문제에서 요구하는 핵심 내용을 다시 한번 요약해 주시기 바랍니다. ';
					cTypeCnt ++;
					return false;
				}else if($(this).val() != scoreCheck){
					cTypeMsg = '채점한 점수와 점수확인에 입력한 점수가 다릅니다. 다시 확인해 주시기 바랍니다.';
					cTypeCnt ++;
					return false;
				}
				o++;
			})
		}

		if(bTypeCnt == 0 && cTypeCnt == 0){
			if(confirm("채점완료 하시겠습니까? 완료 후에는 수정하실 수 없습니다.")){
				$.ajax({
					url: apiName,
					type:'POST',
					data:sendSerial,
					dataType:'text',
					success:function(data){
						if (data != 'success') {
							alert(data);
							return;
						} else {
							//수강연동 평가데이터 전송	(2018-06-22 최종평가 데이터 한번더 전송)
							/*if(marketerID == 'oneedu'){
								var check= $.get('../api/apiStudyChapterSSO.php','contentsCode='+contentsCode+'&lectureOpenSeq='+lectureOpenSeq+'&userID='+userID,function(data){
								var sendAddress = data.sso;
								var sendData = {'userID':data.userID,'ssoCode':data.contentsCode,'lectureStart':data.lectureStart,'lectureEnd':data.lectureEnd,'progress':data.totalProgress,'midProgress':data.midProgress,'testProgress':data.testProgress,'reportProgress':data.reportProgress,'midSaveTime':data.midSaveTime,'testSaveTime':data.testSaveTime,'reportSaveTime':data.reportSaveTime}
									$.ajax({
										url:sendAddress,
										type:'GET',
										dataType:'jsonp',
										data:sendData
									})
								});
							}*/
							alert('채점 반영되었습니다.');
							modalClose();
							ajaxAct();
						}
					},
					fail:function(){
						alert('채점에 실패하였습니다.')
					}
				})
			}
		}else{
			if(bTypeCnt != 0){
				alert('단답형 채점이 안된 항목이 있습니다.')
				return;
			}else if(cTypeCnt != 0){
				alert(cTypeMsg)
				return;
			}
		}

	}else{
		alert('모사율 조회하기 실행 후 첨삭완료가 가능합니다.')
		return;
	}

}

function autoResult(){
	var sendSerial = $('form.tutorGrade').serialize();
	var contentsCode = $('.tutorGrade input[name="contentsCode"]').val();
	var lectureOpenSeq = $('.tutorGrade input[name="lectureOpenSeq"]').val();
	var userID = $('.tutorGrade input[name="userID"]').val();

	if(confirm('자동채점을 진행합니다.')){
		$.ajax({
			url: '/api/apiStudyAutoResult.php',
			type:'POST',
			data:sendSerial,
			dataType:'json',
			success:function(data){
				if (data.result != 'success') {
					alert(data);
					return;
				} else {
					alert('자동채점 되었습니다.');
					modalClose();
					ajaxAct();
				}
			},
			fail:function(){
				alert('오류가 발생하였습니다.');
			}
		})
	}
}

function paymentApprovals(s){
    if(s!=1){
        var sendSerial = $('form.paymentApproval').serialize();
        if(confirm("결제상태를 변경하시겠습니까?")){
            $.ajax({
                url: '/api/apiStudy.php',
                type:'POST',
                data:sendSerial,
                dataType:'text',
                success:function(){
                    alert('변경되었습니다.');
                    modalClose();
                    ajaxAct();
                },
                fail:function(){
                    alert('변경실패.');
                }
            })
        }
    }

}


function keyCheck(event){
	if (loginUserID != '87140731' && loginUserID != '59487609' && loginUserID != '93030339') {
		if (event.keyCode == 86 && event.ctrlKey){
			alert('붙여넣기는 불가능합니다.\r\r(한국산업인력공단 규정내용 : 교강사가 첨삭을 진행할 때 복사 및 붙여넣기 기능이 동작되지 않도록 유도)');
			event.returnValue = false;
		}
	}
}

function mosaCheckTest(seq){
	$.ajax({
		type:"POST",
		url:'../api/apiTestCopyCheck.php',
		dataType:'JSON',
		data:{'seq':seq},
		success: function(data){
			alert(data.result);
		},
		error: function(xhr, status) {
			XMLLoader.error(xhr, status)
		}
    });
}

function _mosaCheck(uri){
	$.ajax({
		type:"GET",
		dataType:"xml",
		url:'../api/copyKiller/get_copykiller_info.php',
		data:{'uri':uri},
		success: function(data){
			mosaNum = $(data).find('disp_total_copy_ratio').text();
			$('.btnReportCopy').before('<strong class="red">모사율 : '+mosaNum+'&nbsp;&nbsp;|&nbsp;&nbsp;</strong>')
			$('input[name="copyCheck"]').prop('checked',true)
		},
		error: function(xhr, status) {
			XMLLoader.error(xhr, status)
		}
    });
}

function mosaCheck(seq){
	$.ajax({
		type:"POST",
		url:'../api/apiReportCopyCheck.php',
		dataType:'JSON',
		data:{'seq':seq},
		success: function(data){
			alert(data.result);
			$('input[name="copyCheck"]').prop('checked',true);
		},
		error: function(xhr, status) {
			XMLLoader.error(xhr, status)
		}
    });
}

function mosaDetail(uri){
	var mosaUrl = '../api/copyKiller/get_copykiller_info_with_sentence.php?uri='+uri;
	window.open(mosaUrl,"모사답안 검사","top=0,left=0,width=1080,height=700,menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes,resizeable=no","esangStudy")
}


function certPassOK(userID, lectureStart, adminID){
	if(confirm('인증제외처리 하시겠습니까? \r\r사유가 될 수 있는 자료를 보관하시기 바랍니다.')) {
		$.ajax({
			url:'../api/apiStudyChapter.php',
			type:'POST',
			data:{'userID':userID,'lectureStart':lectureStart,'certPass':'Y','adminID':adminID},
			success:function(){
				alert('인증처리 되었습니다.');
				modalClose();
			}
		})
	}
}



// 180502 한상민(수료/미수료 처리)
function passOKSave(lectureOpenSeq, userID){
	var memo = $('#passOKMemo').val();
	var beforePassOkStatus = $('#beforePassOkStatus').val();
	var passOkStatus = $('#passOkStatus').val();
	if(memo == null || memo == ""){
		alert("메모를 입력해주세요.");
		return;
	}
	if(passOkStatus=="Y" && beforePassOkStatus=="W"){
		alert("변경 불가합니다.");
		return;
	}
	var sendSerial = $('form.passOKForm').serialize()+'&lectureOpenSeq='+lectureOpenSeq+"&userID="+userID;
	if(confirm("저장 하시겠습니까?")){
		$.ajax({
			url: '../api/apiPassOK.php',
			type:'POST',
			data:sendSerial,
			dataType:'text',
			success:function(){
				alert('변경되었습니다.');
				modalClose();
				ajaxAct();
			},
			fail:function(){
				alert('변경실패.');
			}
		})
	}
}

function findExam(obj){
	var links = '#'+obj.value;
	window.location.href = links;
	var scrollTops = $(window).scrollTop();
	var plusHeight = $('#contentsNav').height();
	$(window).scrollTop(scrollTops - plusHeight);
}


function studyInfoUpdate(name,seq){
	var inputVal = $('input[name="'+name+'"]').val();
	var studyInfo = 'Y';
	var api = "../api/apiStudy.php";
	if(name=='openChapter'){
		studyInfo = 'hrd';
		var api = "../api/apiContentsHrd.php";
	}

	if(confirm("수정 하시겠습니까?")){
		$.ajax({
			url: api,
			type:'POST',
			data:{'studyInfoSeq':seq,'studyInfoName':name,'studyInfoVal':inputVal,'studyInfoUpdate':studyInfo},
			dataType:'text',
			success:function(data){
				if(data=="error"){
					alert('변경에 실패했습니다.');
				}else{
					alert('변경되었습니다.');
				}
				//modalClose();
				//ajaxAct();
			},
			fail:function(){
				//alert('변경실패.');
			}
		})
	}
}

function resignation(lectureStartR, lectureEndR, serviceTypeR, contentsCodeR, userIDR) {
	var resignVal = $('select[name="resignation"]').val();
	$.ajax({
		url: '../api/apiStudy.php',
		type: 'POST',
		data: {'resignation':resignVal, 'lectureStartR':lectureStartR, 'lectureEndR':lectureEndR, 'serviceTypeR':serviceTypeR, 'contentsCodeR':contentsCodeR, 'userIDR':userIDR},
		dataType: 'text',
		success: function(data) {
			if(data == 'error') {
				alert('변경 실패! 다시 시도해주세요.');
			} else {
				alert('변경 완료했습니다.');
				modalClose();
				ajaxAct();
			}
		},
		fail: function() {
			alert('변경실패');
		}
	})
}

function categoryCS(type,vals){
	if(type == 'call01'){
		$('select[name="call02"], select[name="call03"], select[name="call04"], select[name="call05"]').remove();
		var searchName = vals.value;
		$.get('../api/apiCategoryCS.php',{'subSeq':searchName},function(data){
			$('select[name="call01"]').remove();
			var selectWrite = '';
			selectWrite += '<select name="call01" id="call01" onChange="categoryCS(\'call02\',this);" style="margin-left:10px;">';
			selectWrite += '<option value="">선택</option>'
			$.each(data.category, function(){
				selectWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
			})
			selectWrite += '</select>'
			$('select[name="csHistory"]').after(selectWrite);

			$('#call01').change(function() {
				checkValue =  $("#call01 option:selected").val();
				$('input[name="csTypeSeq"]').val(checkValue);
			})
		})
	}else if(type == 'call02'){
		$('select[name="call03"], select[name="call04"], select[name="call05"]').remove();
		var searchName = vals.value;
		$.get('../api/apiCategoryCS.php',{'subSeq':searchName},function(data){
			$('select[name="call02"]').remove();
			var selectWrite = '';
			selectWrite += '<select name="call02" id="call02" onChange="categoryCS(\'call03\',this);" style="margin-left:10px;">';
			selectWrite += '<option value="">선택</option>'
			$.each(data.category, function(){
				selectWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
			})
			selectWrite += '</select>'
			$('select[name="call01"]').after(selectWrite);

			$('#call02').change(function() {
				checkValue =  $("#call02 option:selected").val();
				$('input[name="csTypeSeq"]').val(checkValue);
			})
		})
	}else if(type == 'call03'){
		$('select[name="call04"], select[name="call05"]').remove();
		var searchName = vals.value;
		$.get('../api/apiCategoryCS.php',{'subSeq':searchName},function(data){
			$('select[name="call03"]').remove();
			var selectWrite = '';
			selectWrite += '<select name="call03" id="call03" onChange="categoryCS(\'call04\',this);" style="margin-left:10px;">';
			selectWrite += '<option value="">선택</option>'
			$.each(data.category, function(){
				selectWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
			})
			selectWrite += '</select>'
			$('select[name="call02"]').after(selectWrite);

			$('#call03').change(function() {
				checkValue =  $("#call03 option:selected").val();
				$('input[name="csTypeSeq"]').val(checkValue);
			})
		})
	}else if(type == 'call04'){
		$('select[name="call05"]').remove();
		var searchName = vals.value;
		$.get('../api/apiCategoryCS.php',{'subSeq':searchName},function(data){
			$('select[name="call04"]').remove();
			var selectWrite = '';
			selectWrite += '<select name="call04" id="call04" onChange="categoryCS(\'call05\',this);" style="margin-left:10px;">';
			selectWrite += '<option value="">선택</option>'
			$.each(data.category, function(){
				selectWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
			})
			selectWrite += '</select>'
			$('select[name="call03"]').after(selectWrite);

			$('#call04').change(function() {
				checkValue =  $("#call04 option:selected").val();
				$('input[name="csTypeSeq"]').val(checkValue);
			})
		})
	}else if(type == 'call05'){
		var searchName = vals.value;
		$.get('../api/apiCategoryCS.php',{'subSeq':searchName},function(data){
			$('select[name="call05"]').remove();
			var selectWrite = '';
			selectWrite += '<select name="call05" id="call05" style="margin-left:10px;">';
			selectWrite += '<option value="">선택</option>'
			$.each(data.category, function(){
				selectWrite += '<option value="'+this.seq+'">'+this.value02+'</option>';
			})
			selectWrite += '</select>'
			$('select[name="call04"]').after(selectWrite);

			$('#call05').change(function() {
				checkValue =  $("#call05 option:selected").val();
				$('input[name="csTypeSeq"]').val(checkValue);
			})
		})
	}
}

function openInfo(id,btn)
{
	if($('#'+id).css('display') == 'none'){
		$('#'+id).show();
		$(btn).text('접기');
	} else {
		$('#'+id).hide();
		$(btn).text('펼치기');
	}
}

function csMemberSearch() {
	$('#userIDadd').html('&nbsp;불러오고 있습니다. 잠시만 기다려 주세요.');

	var userName = $('#userName').val();
	var csSearch = '';
	var csMemberReg = '';

	$.get('../api/apiMember.php','&userName='+userName,function(data){
		if(data.totalCount != 0){
			$.each(data.member, function(){
				csSearch += '<option value="'+this.userID+'">';
				csSearch += this.userName+'&nbsp;|&nbsp;'+this.userID+'&nbsp;|&nbsp;'+ this.company.companyName+'&nbsp;';
				csSearch += '</option>';
			})
			if($(document).find('select[name="userID"]').index() == -1){
				$('#userIDadd').html('&nbsp;<select name="userID" style="height:30px;"></select>');
				$('#csMemberReg').html('&nbsp;<button type="button" name="csMemberReg" style="height:30px;" onClick="csMemberRegister();">선택된 회원으로 등록하기</button>');
			}
			$('select[name="userID"]').html(csSearch);

		}else{
			$('#userIDadd').html('');
			$('#csMemberReg').html('');
			alert('검색결과가 없습니다.');
		}
	})
}

function csMemberRegister() {
	var userIDcs = $('select[name="userID"]').val();
	modalClose();
	if(userIDcs != '') {
		globalModalAct('memberView','',userIDcs);
	}
}

function csUpdateForm(seq,userID){

	if(userID == '_guest') {
		var guestName = document.getElementById("guestName" + seq);
		var updateGuestName = document.getElementById("updateGuestName" + seq);
		var userTel = document.getElementById("userTel" + seq);
		var updateUserTel = document.getElementById("updateUserTel" + seq);

		guestName.style.display="none";
		userTel.style.display="none";
		updateGuestName.style.display="";
		updateUserTel.style.display="";

		//값 selected
	}

	var category = document.getElementById("category" + seq);
	var updateCategory = document.getElementById("updateCategory" + seq);
	var content = document.getElementById("content" + seq);
	var updateContent = document.getElementById("updateContent" + seq);
	var csUpdateForm = document.getElementById("csUpdateForm" + seq);
	var csUpdate = document.getElementById("csUpdate" + seq);

	category.style.display="none";
	content.style.display="none";
	updateCategory.style.display="";
	updateContent.style.display="";
	csUpdateForm.style.display="none";
	csUpdate.style.display="";

	$('#updateCategoryForm'+seq).val(document.getElementById("categoryValue"+seq).value).prop("selected", true);
}


function csSaveAct(){

	var valiMsg = '';

	if( $('textarea[name=content]').val() == '' || $('textarea[name=content]').val() == '처리 내역'){
		valiMsg = '처리 내역을 입력해주세요.';
	}

	if( $('textarea[name=question]').val() == '' || $('textarea[name=question]').val() == '문의 내역'){
		valiMsg = '문의 내역을 입력해주세요.';
	}

	if( $('#category').val() == '' ){
		valiMsg = '문의 분류를 선택해주세요.';
	}

	/*else if( $('input[name=studySeq]').val() == '' ){
		valiMsg = '상담강의를 선택해주세요.';
	}else if($('input[name="csTypeSeq"]').val() == ''){
		valiMsg = '상담이력을 선택해주세요.';
	}*/

	if(valiMsg != ''){
		alert(valiMsg);
		return false;
	}

	if(confirm('입력하신 상담내용을 저장하시겠습니까?')) {

		$.ajax({
			url:'../api/apiCS.php',
			type:'POST',
			data: $('.BBSCsForm').serialize(),
			success:function(data){

				modalClose();

				//재조회
				globalModalAct(typesRefresh,modalSeqRefresh,eachIDRefresh,optionRefresh);

			}
		});


	}
}


function csUpdateAct(seq,csTypeSeq,userID,guest){

	var valiMsg = '';

	if( $('input[name=content'+seq+']').val() == '' ){
		valiMsg = '상담내용을 입력해주세요.';
	}/*else if( $('input[name=actionContent'+seq+']').val() == '' ){
		valiMsg = '조치사항을 입력해주세요.';
	}*/
	/*else if($('input[name="csTypeSeq"]').val() == ''){
		valiMsg = '상담이력을 선택해주세요.';
	}*/

	if(valiMsg != ''){
		alert(valiMsg);
		return false;
	}

	var adviserID = document.getElementById("adviserID").value;
	var content = document.getElementById("updateContentForm"+seq).value;
	var seq = document.getElementById("seq"+seq).value;
	var category = document.getElementById("updateCategoryForm"+seq).value;

	if(userID == '_guest') {
		var guestName = document.getElementById("updateGuestNameForm"+seq).value;
		var userTel = document.getElementById("updateUserTelForm"+seq).value;
		var userID = '_guest';

	} else {
		var guestName = '';
		var userTel = '';
		var userID = userID;
	}


	/*if(csType){
		csType = csType;
	}else{
		csType= $('#modal input[name="csType"]').val();
	}*/

	var csTypeSeqV= $('#modal input[name="csTypeSeq"]').val();

	if(csTypeSeqV){
		csTypeSeq = csTypeSeqV;
	}else{
		csTypeSeq = csTypeSeq;
	}

	if(confirm('입력하신 상담내용을 저장하시겠습니까?')) {
		$.ajax({
			url:'../api/apiCS.php',
			type:'POST',
			data:  {
					'adviserID': adviserID,
					'guestName': guestName,
					'userTel': userTel,
					'category': category,
					'content': content,
					'userID': userID,
					'seq': seq,
					'csTypeSeq':csTypeSeq
					},
			success:function(data){
				if(userID == '_guest') {
					$('#guestName'+seq).text(guestName);
					$('#guestName'+seq).css('display','');
					$('#userTel'+seq).text(userTel);
					$('#userTel'+seq).css('display','');
					$('#updateGuestName'+seq).css('display','none');
					$('#updateUserTel'+seq).css('display','none');
				}

				$('#category'+seq).text(category);
				$('#category'+seq).css('display','');
				$('#updateCategory'+seq).css('display','none');
				$('#content'+seq).text(content);
				$('#content'+seq).css('display','');
				$('#updateContent'+seq).css('display','none');
				$('#csUpdate'+seq).css('display','none');
				$('#csUpdateForm'+seq).css('display','');

				//재조회
				modalClose();
				if(guest == 'Y') {
					globalModalAct('guestCS','','_guest');
				} else {
					globalModalAct('memberView','',userID);
					//alert(userID);
				}
			}

		});

	}
}


function csDelete(seq){
	if(confirm('입력하신 상담내용을 삭제 하시겠습니까?')) {
		$.ajax({
			url:'../api/apiCS.php',
			type:'DELETE',
			data:  {
					'seq': seq
					},
			success:function(data){

				modalClose();
				//재조회
				globalModalAct(typesRefresh,modalSeqRefresh,eachIDRefresh,optionRefresh);

			}

		});

	}
}

function hiddenCss(csType){
	var talbeCss = $('#modal #csHistory').css('display');
	if(talbeCss == 'none'){
		$('#modal #csHistory').css('display','inline-block');
	}else {
		$('#modal #csHistory').css('display','none');
	}
}

function studyInOrder(num,companyCode,lectureStart,lectureEnd) {

	if (num == 0) {
		var cfTxt = "교육 순차학습(환급우선) 설정을 해제 하시겠습니까?";
	} else {
		var cfTxt = "교육 순차학습(환급우선)을 설정 하시겠습니까?";
	}

	if(confirm(cfTxt)) {
		$.ajax({
			url:'../api/apiStudyInOrder.php',
			type:'POST',
			data:  {
					'num': num,
					'companyCode': companyCode,
					'lectureStart': lectureStart,
					'lectureEnd': lectureEnd
					},
			success:function(data){
				if (data.result == 'success') {
					alert('처리 되었습니다.');
					modalClose();
					globalModalAct(typesRefresh,modalSeqRefresh,eachIDRefresh,optionRefresh);
				} else {
					alert('처리 오류 입니다.');
				}
			}

		});

	}

}


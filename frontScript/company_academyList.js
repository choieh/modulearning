

userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var sortData = '';

//데이트 피커사용용
// function dateAct(){
// 	function closePicker(){
// 		$('#datePicker').remove();
// 		$('.picked').removeClass('picked');		
// 	}
// 	function todaySel(){
// 		$('#datePicker').remove();
// 		var today = new Date();
// 		var dd = today.getDate();
// 		var mm = today.getMonth()+1; //January is 0!
// 		var yy = today.getFullYear();
// 		if(dd<10) {
// 			dd='0'+dd
// 		} 
// 		if(mm<10) {
// 			mm='0'+mm
// 		} 
// 		today = yy+'-' + mm+'-'+dd;
// 		$('.picked').val(today);
// 		$('.picked').removeClass('picked');
// 	}
// 	$('#datePicker').append('<p><button type="button" class="todaySel">오늘선택</button>&nbsp;&nbsp;<button type="button" class="pickerClose">닫기</button></p>')
// 	$('.pickerClose').click(function(){closePicker()})
// 	$('.todaySel').click(function(){todaySel()})
// 	$('#calendarTable').children('tbody').children('tr').children('td').click(function(){
// 		var dateSel = $(this).attr('id');
// 		$('.picked').val(dateSel);
// 		closePicker();
// 	})
// };

function listAct(){
	
	//상단 액션 부분	
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
	if(loginUserLevel < '5') {
		// actionArea += '<button type="button" class="fRight" onClick="writeAct()">신규등록</button>';
		actionArea += '<button type="button" class="fRight" onClick="excelAct()">엑셀 다운로드</button>';
    }
    
    actionArea += '<select name="bigCountry">';
    actionArea += '<option value="">전체</option>';
    actionArea += '<option value="충남">충남</option>';
    actionArea += '<option value="충북">충북</option>';
    actionArea += '<option value="세종">세종</option>';
    actionArea += '<option value="강원">강원</option>';
    actionArea += '<option value="대전">대전</option>';
    actionArea += '<option value="전남">전남</option>';
    
    
    actionArea += '</select>';
    actionArea += '<select name="searchType">';	
    
    actionArea += '<option value="academyName">학원명</option>';
    actionArea += '<option value="companyCode">사업자번호</option>';
    actionArea += '<option value="academyCEO">학원설립운영자명</option>';
    actionArea += '<option value="adminID">관리자아이디</option>';
    actionArea += '</select>&nbsp;';
    actionArea += '<input type="text" name="searchValue" />&nbsp;';
    
    

	actionArea += '<button type="button" onClick="searchAct()">검색하기</button></form>';
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:30px;">번호</th>';
	contents += '<th style="width:120px;">사업자번호</th>';
	contents += '<th style="width:200px;">사업주명</th>';
	contents += '<th style="width:100px;">학원설립자</th>';
    contents += '<th style="width:90px;">관리자아이디</th>';
    contents += '<th style="width:90px;">회원등록일</th>';
    contents += '<th style="width:100px;">주소<br/>우편번호</th>';
    contents += '<th style="width:100px;">회원구분</th>';
    contents += '<th style="width:100px;">수정/삭제</th>';
    
    
    

	contents += '</tr></thead><tbody>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct();
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas : '';
	if(sortDatas != ''){
		sortData = sortDatas;
	}

	var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var i = totalCount;
		if(page != 1){
			i = totalCount - ((page-1)*listCount);
		}
		if (totalCount != 0){
			$.each(data.academy,  function(){
                // console.log(data);
                
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.companyCode+'</td>';
				lists += '<td>'+this.academyName+'</td>';
				lists += '<td>'+this.academyCEO+'</td>';
                lists += '<td>'+this.adminID+'</td>';
                lists += '<td>'+this.memberInputDate+'</td>';
				lists += '<td>'+this.address+'<br/>('+this.zipCode+')</td>';
                lists += '<td>'+this.membership+'</td>';
                lists += '<td><button type="button" onClick="writeAct('+this.seq+')">수정</button></br>';
                lists += '<button type="button" onClick="deleteAcademy('+this.seq+')">삭제</button></td>';
				lists += '</tr>';
				i--;
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">검색 결과가 없습니다.</td></tr>'
		}
		$('.BBSList tbody').html(lists)
		pagerAct();
	})
}

//공통화를 위한 페이지 막음

function viewAct(seq){
	writeAct(seq)
}

//입력폼 체크
function checkMemberForm(){
	// console.log('1')
	$('.mustCheck > strong.price').remove();
	var checkFalse = 0;
	var companyCodeCheck ='';
	var companyIDCheck ='';
	
	$.get(useApi,{'seq':seq},function(data){
		if(seq){				
			$.each(data.company, function(){
				companyCodeCheck = this.companyCode;
				companyIDCheck = this.companyID;
			})
		}
			
		$('.mustCheck input[type="tel"], .mustCheck input[type="text"]').each(function(){
			if($(this).val() == ''){
				checkFalse ++;
			}
		});
		/*
		if(seq==''){
			if($('input[name="companyID"]').val() == ''){
				$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="price">아이디를 입력해주세요</strong>')
				checkFalse ++;
			}else if($('input[name="idUseOk"]').prop('checked') == false){
				$('input[name="idUseOk"]').after('&nbsp;&nbsp;<strong class="price">아이디 중복체크를 해주세요</strong>')
				checkFalse ++;
			}
		}*/
		if($('input[name="companyName"]').val() == ''){
			$('input[name="companyName"]').after('&nbsp;&nbsp;<strong class="price">회사명을 입력해주세요.</strong>')
			checkFalse ++;
		}
		if(seq ==''){
			if($('input[name="companyCode"]').val() == ''){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호를 입력해주세요.</strong>')
				checkFalse ++;
			}else if($('input[name="companyCodeOK"]').prop('checked') == false){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호 중복체크를 해주세요.</strong>')
				checkFalse ++;
			}
		} else {
			if($('input[name="companyCode"]').val() == ''){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호를 입력해주세요.</strong>')
				checkFalse ++;
			} else if ($('input[name="companyCode"]').val().length <= 9){
				$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">사업자번호 10자리를 입력해주세요.</strong>')
				checkFalse ++; 
			} else if ($('input[name="companyCode"]').val() != companyCodeCheck){
				if($('input[name="companyCodeOK"]').prop('checked') == false){
					$('input[name="companyCodeOK"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
					checkFalse ++; 
				}
			} else if ($('input[name="companyID"]').val() != companyIDCheck){
				if ($('input[name="companyIDOk"]').prop('checked') == false){
					$('input[name="companyIDOk"]').after('&nbsp;&nbsp;<strong class="price">중복체크를 해주세요.</strong>')
					checkFalse ++; 
				}
			}
		}
		
		if(checkFalse == 0){
			sendData(useApi,'writeform','new')
		}
	})
}
function deleteAcademy(seq){
    // var confirm = confirm("삭제 되었습니다.");
    $.ajax({
        url: useApi,
        data : {seq : seq},
        type : "DELETE",
        dataType : "text",
        success : function(data){
            if(data != "success"){
                alert('삭제에 실패하였습니다.');
            }else{
                alert('삭제되었습니다.');
                ajaxAct();
            }
        }

    })
}
//우편번호 API
function zipCodeFind(){
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;

			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipCodeArea').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('address01Area').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('address02Area').focus();
		}		
	}).open({
		popupName: 'postcodePopup', //팝업 이름을 설정(영문,한글,숫자 모두 가능, 영문 추천)
	});
}

function excelAct() {
    searchValue = $('.searchForm').serialize();
	searchValue = '&'+searchValue;
	top.location.href='academyExcel.php?'+searchValue;   
}

//보드 정보 선언
var useApi = '../api/apiNcsCode.php';
var categoryApi = '../api/apiCategory.php';
var seq = '';
var page = '';
var totalCount = '';
var writeSeq = '';
var contentsGrade = '';
var dutyType2 = '';
var ncsCode = '';
var sort02 = '';
var chapter = '';
var contentsTime = '';
var price = '';
var selfPrice = '';
var rPrice01 = '';
var selfPrice01 = '';
var rPrice02 = '';
var selfPrice02 = '';
var rPrice03 = '';
var selfPrice03 = '';
var coefficient = '';
var supply = '';
var ncsObj = {};
var gradeObj = {};


// 등급코드 별 교육비용 gradeObj 객체에 저장
$.get(categoryApi, {'value01':'contentsGrade'}, function(data){
	$.each(data.category, function(){
		gradeObj[this.value01] = {"value03":this.value03};
	})
});

//사용옵션 가져오기
optWrite = new Array();
makeOption('contentsGrade','','');
makeOption('dutyType', '', '');
//리스트 소팅

function listAct(){
	var actionArea = '';
	actionArea += '<div class="inputArea"><form class="writeform"><table>';
	actionArea += `<tr><th>기준날짜</th><th>소분류명</th><th>소분류 코드</th><th>조정계수</th><th>공급정도</th><td rowspan="2"><button type="button" onClick="sendData(\''+useApi+'\',\'writeform\')">등록</button></tr>`;
	actionArea += `<tr><td><input type="text" name="applyDate"></td><td><input type="text" name="ncsName" /></td><td><input type="text" name="ncsCode" /></td><td><input type="text" name="coefficient" /></td><td><input type="text" name="supply" /></td></tr>`
	actionArea += '</table></form></div>';
	
	$('div.inputArea').remove();
	$('#contents > h1').after(actionArea);
	
	var contents = '';	
	contents += '<table><thead><tr>';
	contents += '<th style="width:5%;">순번</th>';
	contents += '<th style="width:15%;">기준날짜</th>';
	contents += '<th style="width:15%;">소분류명</th>';
	contents += '<th style="width:15%;">소분류 코드</th>';
	contents += '<th style="width:15%;">조정계수</th>';
	contents += '<th style="width:15%;">공급정도</th>';
	contents += '<th style="width:20%;">수정</th>';
	contents += '</tr></thead><tbody>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	// $('#contentsArea1').addClass('BBSWrite');
	$('#contentsArea').html(contents);
	//게시물 소팅부분
	ajaxAct();
}

function ajaxAct(){
	var listAjax = $.get(useApi,function(data){
		totalCount = data.totalCount;
		var lists = '';
		var lists1 = '';
		if (totalCount != 0){
			$.each(data.ncs, function(){
				ncsObj[this.ncsCode] = {"supply":this.supply, "coefficient":this.coefficient}; //ncs코드 별 공급정도, 조정계수 ncsObj 객체에 저장
				lists += '<tr class="line'+this.seq+'">';
				lists += '<td><span style="width:40px;">'+this.seq+'</span></td>';
				lists += `<td><input type="text" name="applyDate" value="${this.applyDate}" style="width:100px;"></td>`;
				lists += '<td><input type="text" name="ncsName" value="'+this.ncsName+'" style="width:140px;" /></td>';
				lists += '<td><input type="text" name="ncsCode" value="'+this.ncsCode+'" style="width:100px;" /></td>';
				lists += '<td><input type="text" name="coefficient" value="'+this.coefficient+'" style="width:80px;" /></td>';
				lists += '<td><input type="text" name="supply" value="'+this.supply+'" style="width:80px;" /></td>';		
				lists += '<td><button type="button"  onClick="lineSendData(\''+useApi+'\','+this.seq+',\'modifys\')">수정</button> / <button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
				lists += '</tr>';
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 목록이 없습니다.</td></tr>';
		}
		lists += '</tbody></table>';
		$('#contentsArea tbody').html(lists);
		// lists1 += '<form id="writeForm"><ul>';
		// lists1 += '<input type="hidden" name="ncsUpdate" value="Y">';
		// lists1 += '<li><div class="halfDiv"><h1>등급코드</h1><select id="contentsGrade" name="contentsGrade" class="'+contentsGrade+'" onClick="getGradePrice()">'+optWrite['contentsGrade']+'</select></div>';
		// lists1 += '<div class="halfDiv"><h1>직무법정과정</h1><select id="dutyType2" name="dutyType2" class="'+dutyType2+'" onClick="selDutyType2()">'+optWrite['dutyType']+'</select></div></li>';
		//
		// lists1 += '<li><h1>NCS 코드</h1><input id="ncsCode" type="text" name="ncsCode" class="'+ncsCode+'" onkeyup="getSupCoeff(this)"></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>차시</h1><input id="chapter" type="text" style="width:80px;" name="chapter" class="'+chapter+'"></div>';
		// lists1 += '<div class="halfDiv"><h1>교육시간</h1><input id="contentsTime" type="text" style="width:80px;" name="contentsTime" class="'+contentsTime+'" onkeyup="getSelfPrice(this)"></div></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>공급정도</h1><input id="supply" type="text" name="supply" class="'+supply+'" onkeyup="setCoefficient(this)"></div>';
		// lists1 += '<div class="halfDiv"><h1>조정계수</h1><input id="coefficient" type="text" name="coefficient" class="'+coefficient+'"></div></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>교육비용</h1><input id="price" type="text" name="price" class="'+price+'"></div>';
		// lists1 += '<div class="halfDiv"><h1>표준훈련비</h1><input id="selfPrice" type="text" name="selfPrice" class="'+selfPrice+'"></div></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>우선지원</h1><input id="rPrice01" type="text" name="rPrice01" class="'+rPrice01+'"></div>';
		// lists1 += '<div class="halfDiv"><h1>자부담 우선지원</h1><input id="selfPrice01" type="text" name="selfPrice01" class="'+selfPrice01+'"></div></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>대규모 1000인 미만</h1><input id="rPrice02" type="text" name="rPrice02" class="'+rPrice02+'"></div>';
		// lists1 += '<div class="halfDiv"><h1>자부담 대규모 1000인 미만</h1><input id="selfPrice02" type="text" name="selfPrice02"  class="'+selfPrice02+'"></div></li>';
		//
		// lists1 += '<li><div class="halfDiv"><h1>대규모 1000인 이상</h1><input id="rPrice03" type="text" name="rPrice03" class="'+rPrice03+'"></div>';
		// lists1 += '<div class="halfDiv"><h1>자부담 대규모 1000인 이상</h1><input id="selfPrice03" type="text" name="selfPrice03"  class="'+selfPrice03+'"></div></li>';
		// lists1 += '<li><div class="fullDiv" style="padding-top:5px; padding-bottom:5px;"><button type="button" onClick="updateContNcsInfo()">수정</button></div></li>';
		// lists1 += '</ul></form>';
		// $('#contentsArea1').html(lists1);
	})
}





// function selDutyType2(){ //직무법정과정 체크
// 	var selfPrice = $("#selfPrice").val();
// 	var coefficient = $("#coefficient").val();
// 	if($('#dutyType2').val() == 'Y'){
// 		$("#rPrice01").val(Math.floor(selfPrice * 0.5 / 10) * 10);
// 		$("#selfPrice01").val(Math.ceil(selfPrice - $("#rPrice01").val()));
// 	} else{
// 		$("#rPrice01").val(Math.floor(selfPrice * coefficient * 0.9 / 10) * 10);
// 		$("#selfPrice01").val(Math.ceil(selfPrice - $("#rPrice01").val()));
// 	}
// }
//
// function getNcsData(ncsCode, coefficient, supply){ // 선택버튼 누를시 ncs 정보 가져옴
// 	$('#ncsCode').val(ncsCode);
// 	if($('#contentsGrade').val() != 'A'){
// 		$('#coefficient').val(coefficient);
// 		$('#supply').val(supply);
// 	} else {
// 		$('#supply').val(4);
// 		$('#coefficient').val(1.0);
// 	}
//
// 	calAllPrice();
// }
//
// function getSupCoeff(ncsCode){ // ncsCode에따라 공긍정도, 조정계수 가져옴
// 	if(ncsCode.value.substr(0, 6) in ncsObj && $('#contentsGrade').val() != 'A'){ // ncs코드 앞 6자리 비교
// 		$('#coefficient').val(ncsObj[ncsCode.value.substr(0, 6)].coefficient);
// 		$('#supply').val(ncsObj[ncsCode.value.substr(0, 6)].supply);
// 	}else{ // DB에 등록되지 않은 ncs 코드는 공급정도 4, 조정계수 1로 고정
// 		$('#supply').val(4);
// 		$('#coefficient').val(1.0);
// 	}
// 	calAllPrice();
// }
//
// function getGradePrice(){ //등급 코드에 따라 표준훈련비 계산
// 	var grade = $('#contentsGrade').val();
// 	$('#price').val(gradeObj[grade].value03);
// 	$('#selfPrice').val($('#contentsTime').val() * $('#price').val());
// 	if(grade == 'A'){ // A등급은 별도 조정계수와 등급코드 적용
// 		$('#supply').val(4);
// 		$('#coefficient').val(1.0);
// 	} else{
// 		$('#supply').val(ncsObj[$('#ncsCode').val().substr(0, 6)].supply);
// 		$('#coefficient').val(ncsObj[$('#ncsCode').val().substr(0, 6)].coefficient);
// 	}
// 	calAllPrice();
// }
//
// function getSelfPrice(time){ // 표준훈련비 계산
//     var selfPrice = time.value * $('#price').val();
//     $('#selfPrice').val(selfPrice);
// 	calAllPrice();
// }
//
// function calAllPrice(){ //모든 비용 계산
// 	var selfPrice = $("#selfPrice").val();
// 	var coefficient = $("#coefficient").val();
// 	if(selfPrice != ''){
// 		selDutyType2(); //rPrice01, selfPrice01
// 		$("#rPrice02").val(Math.floor((selfPrice * coefficient * 0.8 / 10)) * 10);
// 		$("#selfPrice02").val(Math.ceil(selfPrice - $("#rPrice02").val()));
// 		$("#rPrice03").val(Math.floor((selfPrice * coefficient * 0.4 / 10)) * 10);
// 		$("#selfPrice03").val(Math.ceil(selfPrice - $("#rPrice03").val()));
// 	}
// }
//
// function setCoefficient(sp){
// 	var b = sp.value == 4 ? 4 : sp.value % 4;
// 	if(sp.value == 0){
// 		$('#coefficient').val(0.5);
// 	} else{
// 		$('#coefficient').val(1 - ((4 - b) / 10));
// 	}
// 	calAllPrice();
// }
//
// function updateContNcsInfo(){ // ncs 일괄 업데이트
// 	var sendData = $('#writeForm').serialize();
// 	$.ajax({
// 		url: useApi,
// 		data: sendData,
// 		type: "POST",
// 		success: function(data){
// 			alert(data.result);
// 		},
// 		fail: function(){
// 			alert('실패했습니다.');
// 		}
// 	});
// }

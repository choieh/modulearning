//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//공통선언
var useApi = '../api/apiMainImage.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = '';
var page = '';
var seq = '';
var writeSeq = '';

//리스트액션
function tracse_listAct(writeSeqNum){
	writeSeqNum = writeSeqNum ? writeSeqNum : '';
	writeSeq = writeSeqNum;
	var writes ='';
		
	writes += '<h1>메인 이미지 (인기)</h1>'
	writes += '<form class="writeform" method="post">';
	writes += '<ul>';
	writes += '<li>';
	writes += '<h1>분&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;류</h1>';
	writes += '<select id="category" onchange="categoryChange(this.value)"><option value="popular">인기</option><option value="new">신규</option></select>';		
	writes += '</li>';
	writes += '<li>';
	writes += '<h1>순&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;번</h1>';
	writes += '<select id="orderBy_popular" style="display:;"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>';
	writes += '<select id="orderBy_new" style="display:none;"><option value="1">1</option><option value="2">2</select>';	
	writes += '</li>';
	writes += '<li id="contentsCode">';
	writes += '<h1>과정선택</h1>';
	writes += '<input name="searchName" type="text" /> <button type="button" onClick="searchSelect(\'contentsCode\',\''+chainsearchApi+'\',\'contents\')">검색</button>';
	writes += '</li>';
	writes += '<li>';
	writes += '<h1>링크방식</h1>';
	writes += '<select name="imageTarget"><option value="_self">현재창</option><option value="_blank">새창</option></select>';		
	writes += '</li>';
	writes += '</ul>';
	writes += '<div class="btnArea">';
	writes += '<button type="button" onClick="writeMainImg()">등록하기</button>';
	writes += '<button type="button" onClick="resetInput()">초기화</button>';
	writes += '</div>';
	writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
	writes += '</form>';

	$('#contents').addClass('BBSWrite');	
	$('#contents > h1').after(writes);

	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:10%;">분류</th>';
	contents += '<th style="width:10%;">순번</th>';
	contents += '<th style="width:25%;">과정 이미지</th>';
	contents += '<th style="width:30%;">과정명</th>';
	contents += '<th style="width:10%;">링크방식</th>';
	contents += '<th style="width:15%;">수정 / 삭제</th>';
	contents += '</tr></thead><tbody>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	//게시물 소팅부분
	ajaxAct()
}

function ajaxAct(){
	var listAjax = $.get(useApi,{'seq':writeSeq},function(data){
		totalCount = data.totalCount;
		var lists = ''
		if (totalCount != 0){
			$.each(data.mainImg, function(){
				lists += '<tr class="line'+this.seq+'">';
				lists += '<td>'+this.category+'</td>';
				if(this.orderBy==1){
					var order01 = 'selected="seleted"';
				}else if(this.orderBy==2){
					var order02 = 'selected="seleted"';
				}else if(this.orderBy==3){
					var order03 = 'selected="seleted"';
				}else{
					var order04 = 'selected="seleted"';
				}
				lists += '<td><select name="orderBy" style="display:;"><option value="1" '+order01+'>1</option><option value="2" '+order02+'>2</option>';
				if(this.category=="인기"){
					lists += '<option value="3"'+order03+'>3</option><option value="4"'+order04+'>4</option>';
				}
				lists += '</select></td>';
				lists += '<td><img src="'+this.imagePath+'" style="width:253px; height:175px;"></td>';
				if(this.imageTarget == '_self') {
					var _self = 'selected="seleted"';
				} else {
					var _blank = 'selected="seleted"';
				}
				lists += '<td>'+this.contentsName+'</td>';
				lists += '<td><select name="imageTarget"><option value="_self" '+_self+'>현재창</option><option value="_blank" '+_blank+'>새창</option></select></td>';
				lists += '<td><button type="button"  onClick="lineSendData(\''+useApi+'\','+this.seq+',\'modifys\')">수정</button> / <button type="button" onClick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button></td>';
				lists += '</tr>';
			})
		}else{
			lists += '<tr><td class="notResult" colspan="20">아직 등록된 목록이 없습니다.</td></tr>';
		}
		lists += '</tbody></table>';
		$('.BBSList tbody').html(lists);
	})
}

function categoryChange(value){
	
	if(value=="new"){
		document.getElementById("orderBy_popular").style.display="none";
		document.getElementById("orderBy_new").style.display="";
		
	}else{
		document.getElementById("orderBy_popular").style.display="";
		document.getElementById("orderBy_new").style.display="none";
	}
}

function writeMainImg(){
	var category = document.getElementById("category").value;
	if(category=="popular"){
		var orderBy = document.getElementById("orderBy_popular").value;
	}else{
		var orderBy = document.getElementById("orderBy_new").value;
	}

	var commit = confirm("등록 하시겠습니까?");
	if(commit==false){
		return;
	};

	var sendData = $('.writeform').serialize()+"&category="+category+"&orderBy="+orderBy;
	console.log(sendData);
	$.ajax({
		url:useApi,
		type:'POST',
		data:sendData,
		dataType:'text',
		success:function(data){
			alert('등록 되었습니다.');
			ajaxAct();
		},
		fail:function(){
			alert('등록에 실패하였습니다.');
		}
	})
}

function resetInput(){
	$('.writeform input[type="text"]').val('');
	$('.writeform div.').html('')
	$('.writeform button[type="submit"]').html('등록하기')
}

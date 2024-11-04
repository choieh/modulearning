//보드 정보 선언
var useApi = '../api/apiSpecialist.php';
var memberApi = '../api/apiMember.php';

var seq = seq ? seq : '' ;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var totalCount = ''; //전체 페이지 카운트
var sortData = '';

//사용옵션 가져오기
optWrite = new Array();
makeOption('sexType','','')

function listAct(){
	var actionArea = '';
	actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';

	actionArea += '<button type="button" onClick="writeAct(\'\')" class="fRight">강사추가</button>';

	actionArea += '<select name="searchType">';	
	actionArea += '<option value="userName">강사명</option>';
	actionArea += '</select>&nbsp;';
	actionArea += '<input type="text" name="searchValue" />&nbsp;';
	actionArea += '<button type="submit">검색하기</button>';
	actionArea += '</form>'
	actionArea += '</div>';
	$('#contents > h1').after(actionArea);
	
	//게시물 소팅부분
	var contents = '';
	contents += '<table><thead><tr>';
	contents += '<th style="width:60px;">번호</th>';
	contents += '<th style="width:200px;">강사명</th>';
	contents += '<th>소속</th>';
	contents += '<th style="width:63%;">강사이력</th>';
	contents += '<th style="width:130px;">관리</th>';
	contents += '</tr></thead><tbody>'	;
	contents += '</tbody></table>';
	$('#contentsArea').removeAttr('class');
	$('#contentsArea').addClass('BBSList');
	$('#contentsArea').html(contents);
	ajaxAct(sortData);
}

function ajaxAct(sortDatas){
	sortDatas = sortDatas ? sortDatas :'';
	if(sortDatas != ''){
		sortData = sortDatas
	}
	$.get(useApi,'list='+listCount+'&page='+page+sortData,function(data){
		var lists = '';
		var i= data.totalCount - ((page-1)*listCount);
		if(data.totalCount != 0){			
			$.each(data.specialist, function(){
				lists += '<tr>';
				lists += '<td>'+i+'</td>';
				lists += '<td>'+this.userName+'</td>';
				lists += '<td>'+this.company+'</td>';
				lists += '<td>'+this.content+'</td>';
				lists += '<td>';
				lists += '<button type="button" onclick="writeAct('+this.seq+')">수정</button> / ';
				lists += '<button type="button" onclick="deleteData(\''+useApi+'\','+this.seq+')">삭제</button>';
				lists += '</td>';
				lists += '</tr>';
				i--;
			})
		}else{
			lists += '<tr><td colspan="20">등록된 데이터가 없습니다.</td></tr>'
		}
		$('.BBSList > table > tbody').html(lists);
	})
}

function writeAct(writeSeq){
	writeSeq = writeSeq ? writeSeq : '';
	$('.searchArea').remove();
	var specialists = $.get(useApi,{'seq':writeSeq},function(data){

		var chkData = '';
		if(writeSeq != ''){
			chkData = data.specialist[0];
		}
		var writes = '';
		writes += '<form class="writeform" method="post" action="'+useApi+'" enctype="multipart/form-data">';
		writes += '<input type="hidden" name="seq" value="'+returnData(chkData.seq)+'">';
		writes += '<ul>';
		//강사명
		writes += '<li>';
		writes += '<h1>강사명</h1>';
		writes += '<input type="text" name="userName" class="name" value="'+returnData(chkData.userName)+'">';
		writes += '</li>';
		writes += '<li>';
		writes += '<h1>소속</h1>';
		writes += '<input type="text" name="company" class="name" value="'+returnData(chkData.company)+'" maxlength="6">';
		writes += '</li>';
		writes += '<li>';
		writes += '<h1>강사소개</h1>';
		writes += '<div class="textInputs">';
		writes += '<textarea name="content" id="ir1" rows="10" cols="100" style="display:none;">'+returnData(chkData.content)+'</textarea>';
		writes += '</div>';
		writes += '</li>';
		writes += '</ul>';
		writes += '<div class="btnArea">';
		if(writeSeq != ''){
			writes += '<button type="button" onclick="submitContents(\'writeform\')">수정하기</button>';
		}else{			
			writes += '<button type="button" onclick="submitContents(\'writeform\')">정보등록</button>';
		}		
		writes += '<button type="button" onclick="listAct()">목록으로</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>'
		writes += '</form>';
		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);
		
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "ir1",
			sSkinURI: "../lib/SmartEditor/SmartEditor2Skin.html",
			htParams : {
				bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : false,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
				fOnBeforeUnload : function(){
					//alert("완료!");
				}
			}, //boolean
			fOnAppLoad : function(){
				//예제 코드
				//oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
			},
			fCreator: "createSEditor2"
		});	
	})
}

var oEditors = [];

function submitContents(target) {
	oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.	
	var formName = $('form.'+target);
	formName.ajaxForm({
		dataType:'json',
		beforeSubmit: function (data,form,option) {
			return true;
		},
		success: function(data,status){
			alert("처리되었습니다.");
			writeAct(data.result);
		},
		error: function(){
			//에러발생을 위한 code페이지
			alert("처리중 문제가 발생하였습니다. 다시 시도해주세요.");
		}
	});
	formName.submit();
}

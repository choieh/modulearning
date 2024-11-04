//보드 정보 선언
var useApi = '../api/apiContents.php';
var licenseApi = '../api/apiLicense.php';
var cpApi = '../api/apiMember.php';
var conApi = '../api/apiContents.php'
var specialListApi = '../api/apiSpecialist.php';
var conSpecialListApi = '../api/apiContentsSpecialist.php'; // 내용전문가 매핑 api 
var listCount = 999; //한페이지 게시물 소팅개수
var totalCount = ''; //전체 페이지 카운트
var sortData = '';

function pageAct(){
}
//데이트 피커사용용

function runConSearch(){
	window.resizeTo(960,640);
	var areaHeight = 0;
	var areaHeight2 = 0;
	var placeHolder = 'userName#내용전문가 이름 입력';
	var placeHolderVal = placeHolder.split('#');
	var actionArea = '';
	var listArea = '';

	$('#contents > h2').html('내용전문가 검색');
	listArea += '<div id="searchDiv">';
	listArea += '<h2>검색영역</h2>';
	listArea += '<div class="searchArea">';
	listArea += '<form class="searchForm" action="javascript:conSearch()">';	
	listArea += '<input name="'+placeHolderVal[0]+'" type="text" placeholder="'+placeHolderVal[1]+'" />&nbsp;';
	listArea += '<button type="submit">검색하기</button>';
	listArea += '</form></div>';
	listArea += '<ul class="searchList">';
	listArea += '<li class="noList">검색해주세요</li>';
	listArea += '</ul>';
	listArea += '</div>';
	listArea += '<div id="dataDiv">';
	listArea += '<h2>등록영역</h2>';
	listArea += '<ul class="searchDiv">';
	listArea += '</ul>';
	listArea += '</div>';

	$('#contentsArea').html(listArea);
	areaHeight = $(window).height()-$('#contents > h2').outerHeight()-$('#contentsArea h2').outerHeight()-$('#contents div.searchArea').outerHeight()-30;
	areaHeight2 = $(window).height()-$('#contents > h2').outerHeight()-$('#contentsArea h2').outerHeight()-26;
	$('#searchDiv ul').css({'height':areaHeight+'px','overflow-y':'scroll'});
	$('#dataDiv ul').css({'height':areaHeight2+'px','overflow-y':'scroll'});
	dataAct(seq)
}

function conSearch(){
	var runApi = specialListApi;
	var placeHolder = '';

	var sortData = '&'+$('form.searchForm').serialize();
	$.get(runApi,'page='+1+'&list='+999+sortData,function(data){
		var lists = '';
		var lists2 = '';
		if(data.totalCount != 0){
			$.each(data.specialist, function(){
				lists += '<li>'
				lists += '<strong>'+this.userName+'</strong><span>'+this.company+'</span>';
				lists += '<button type="button" onclick="sendVal(\''+this.userName+'\',\''+this.seq+'\',\''+contentsCode+'\')">추가하기</button>'
				lists += '</li>'
			})
		}else{
			lists += '<li class="noList">검색 결과가 없습니다.</li>'
		}
		$('#searchDiv ul').html(lists);
		dataAct();
	})
}

function dataAct(){
	$.get(conSpecialListApi,{'contentsCode':contentsCode},function(data){
		var lists = '';
		if(data.totalCount != 0){
			$.each(data.contentsSpecialist, function(){
				  lists += '<li>'
				  lists += '<strong>'+this.userName+'</strong><span>'+this.company+'</span>';
				  lists += '<button type="button" onclick="delVal(\''+this.mappingSeq+'\')">삭제하기</button>'
				  lists += '</li>'
			})
		}else{
			lists += '<li class="noList">등록된 강사가 없습니다.</li>'
		}
		$('#dataDiv ul').html(lists);
	})
}

function sendVal(viewVal,sendVal,contentsCode){
	$.post(conSpecialListApi,{'speciallistSeq':sendVal,'contentsCode':contentsCode},function(data){
		alert('등록되었습니다.');
	})
	.done(function(){
		renewData()
	})	
}

function delVal(sendVal){
	$.ajax({
		url: conSpecialListApi,
		type:'DELETE',
		data:{'seq':sendVal},
		dataType:'text',
		success:function(data){
			alert('삭제 되었습니다.');
			dataAct();
			renewData()
		},
		fail:function(){
			alert('삭제 되지 않았습니다.')
		}
	})
}

function renewData(){
	$.get(conApi,{'seq':seq},function(data){
		var sendVal = ''
		var i = 0;
		$.each(data.contents[0].specialList, function(){
			if(i != 0){
				sendVal += ', '
			}
			sendVal += this.userName+'('+this.company+')';
			i++
		})
		alert(type)
		$(opener.document).find('div#'+type).children('strong').html(sendVal);
		dataAct();
	})
}
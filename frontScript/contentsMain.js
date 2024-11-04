//	게시판 뷰페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

var chainsearchApi = '../api/apiSearch.php';
var contentsApi    = '../api/apiContentsMain.php';

function listAct(){
	writePrint()
}

//게시판 생성
function writePrint(){
	$.get(contentsApi,function(data){
		var totalCount      = data.totalCount ? data.totalCount : "";
		var mainContentsRow = data.contentsMain[0].mainContentsRow ? data.contentsMain[0].mainContentsRow : 3;

		var writes ='';
		writes += '<h2>메인콘텐츠관리</h2>';
		writes += '<form class="contentsIntroform" method="post">';
		writes += '<ul>';

		//가로배열 갯수 지정
		writes += '<li id="reContents">';
		writes += '<h1>가로배열</h1>';
		writes += '<select id="contentsMainRow" name="contentsMainRow" onChange="changeContents(\'row\',this.value)">';
		writes += '<option value="3">3개</option>';
		writes += '<option value="4">4개</option>';
		writes += '</select>';
		writes += '</li>';

		//콘텐츠 갯수 지정
		writes += '<li id="reContents">';
		writes += '<h1>노출 콘텐츠 수</h1>';
		writes += '<select id="contentsMainNum" name="contentsMainNum" onChange="changeContents(\'len\',this.value)">';
		for(i=1;i<=20;i++){
			writes += '<option value="'+i+'">'+i+'개</option>';
		}
		writes += '</select>';
		writes += '</li>';

		//콘텐츠 목록
		writes += '<li>';
		writes += ' <div id="contentsMain">';
		writes += '  <ul id="contentsMainData">';
		writes += '  </ul>';
		writes += ' </div>';
		writes += '</li>';

		writes += '</ul>';
		writes += '<div class="btnArea">';
		writes += '<button type="button" onClick="writeContentsMain()">등록하기</button>';
		writes += '</div>';
		writes += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
		writes += '</form>';

		$('#contentsArea').removeAttr('class');
		$('#contentsArea').addClass('BBSWrite');
		$('#contentsArea').html(writes);

		if (totalCount > 0) {
			$('#contentsMainRow').val(mainContentsRow);
			$('#contentsMainNum').val(totalCount);
			changeContents('len',totalCount);
			changeContents('row',mainContentsRow);

			var j = 1;
			$.each(data.contentsMain, function(){
				$('#searchName'+j).val(this.contentsName);
				searchContents('mainContents'+j,chainsearchApi,'contents',j);
				$('#contentsImg'+j).attr('src','/attach/contents/'+this.previewImage);
				j++;
			})
		}
	})
}

function writeContentsMain(){
	var sendData = $('.contentsIntroform').serialize();
	$.ajax({
		url:contentsApi,
		type:'POST',
		data:sendData,
		success: function(data){
			alert('등록 되었습니다.');
		},
		fail:function(){
			alert('등록에 실패하였습니다.')
		}
	})
	alert('등록 되었습니다.');
	top.location.href = "01_contents_main.php?locaSel=0107";
}

function changeContents(type,val) {
	if (type == 'row') {
		if(val == '3') {
			$('#contentsMain > ul > li').css('width','400px');
		} else {
			$('#contentsMain > ul > li').css('width','295px');
		}
	} else {
		$('#contentsMainData > li').remove();
		var addWrites = '';
		for(j=1;j<=val;j++) {
			addWrites += '<li>';
			addWrites += ' <div><img id="contentsImg'+j+'" src="/attach/contents/" /></div>';
			addWrites += ' <div id="mainContents'+j+'" style="text-align:center;">';
			addWrites += '  <input id="searchName'+j+'" name="searchName'+j+'" type="text" value=""/> <button type="button" onClick="searchContents(\'mainContents'+j+'\',\''+chainsearchApi+'\',\'contents\','+j+')">검색</button>';
			addWrites += ' </div>';
			addWrites += '</li>';
		}
		$('#contentsMain > ul').append(addWrites);
		$.get(contentsApi,function(data){
			if(data.totalCount > 0) {
				var k = 1;
				$.each(data.contentsMain, function(){
					$('#searchName'+k).val(this.contentsName);
					searchContents('mainContents'+k,chainsearchApi,'contents',k);
					$('#contentsImg'+k).attr('src','/attach/contents/'+this.previewImage);
					k++;
				})
			}
		})
		changeContents('row',$('#contentsMainRow').val());
	}
}

function searchContents(obj,apiName,optValue,num){
	var searchValue = '';

	$('#'+obj+'>input').each(function(){
		if($(this).val() != ''){
			searchValue += $(this).attr('name');
			searchValue += '=';
			searchValue += encodeURIComponent($(this).val());
			searchValue += '&searchNum='+num;

			if(typeof(optValue) != 'undefined') {
				searchValue += '&';
				searchValue += 'searchMode='+optValue;
			}

			$.get(apiName,searchValue,function(data){
				var makeSelect = ''
				if(data.totalCount != 0){
					$.each(data.searchResult, function(){
						makeSelect += '<option value="'+this.searchCode+'">'
						makeSelect += this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'&nbsp;';
						makeSelect += '</option>'
					})
					if($(document).find('select[name="'+obj+'"]').index() == -1){
						$('#'+obj).append('&nbsp;<select name="'+obj+'"></select>');
					}
					$('select[name="'+obj+'"]').html(makeSelect);
				}else{
					alert('검색결과가 없습니다.')
				}
			})
		}else{
			alert('검색어를 입력해주세요')
		}
    });
}


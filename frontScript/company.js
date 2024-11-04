//보드 정보 선언
var useApi = '../api/apiCompany.php';
var memberApi = '../api/apiMember.php';
var chainsearchApi = '../api/apiSearch.php';
var centerApi = '../api/apiStudyCenter.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
var sortData = '';

//사용옵션 가져오기
var optWrite = [];
makeOption('companyScale','','')
makeOption('enabled','','')
makeOption('phone01','','')
makeOption('mobile01','','')
makeOption('email02','','')
makeOption('bankName','','')

//데이트 피커사용용
function dateAct(){
	function closePicker(){
		$('#datePicker').remove();
		$('.picked').removeClass('picked');
	}
	function todaySel(){
		$('#datePicker').remove();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		}
		if(mm<10) {
			mm='0'+mm
		}
		today = yy+'-' + mm+'-'+dd;
		$('.picked').val(today);
		$('.picked').removeClass('picked');
	}
	$('#datePicker').append('<p><button type="button" class="todaySel">오늘선택</button>&nbsp;&nbsp;<button type="button" class="pickerClose">닫기</button></p>')
	$('.pickerClose').click(function(){closePicker()})
	$('.todaySel').click(function(){todaySel()})
	$('#calendarTable').children('tbody').children('tr').children('td').click(function(){
		var dateSel = $(this).attr('id');
		$('.picked').val(dateSel);
		closePicker();
	})
};
/*
		// 해시가 변경되었을 때 실행합니다.
		$(window).on('hashchange', function () {
				goToFromHash();
		});

		// 윈도우가 모드 로드되었을 때 실행합니다.
		// goToFromHash() 함수에 매개변수를 넣음으로써 윈도우 로드 후 가장 처음 실행되는 함수임을 알립니다.
		// 매개변수를 전달함으로써 해시가 변경되지 않는 상황에 대처할 수 있습니다.
		$(window).on('load', function () {
				goToFromHash('onload');
		});

		// 해시를 분석하여 적당한 페이지로 이동할 때 사용하는 함수입니다.
		function goToFromHash (a)
		{
				// 해시태그에서 맨 앞의 #을 제거하고 공백을 %20으로 치환합니다.
				// 해시태그를 쉽게 분석하기 위한 작업니다.
				var hashtag = location.hash.substring(1, location.hash.length).replace(/ /gi, '%20');

				// 태그 페이지의 이중 주소 정규표현식입니다.
				var tag = /^tag\/([\s|0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝|\-|\_]+)$/i;

				// 글 목록 페이지의 이중 주소 정규표현식입니다.
				var archive = /^archive\/([0-9]+)$/i;
				var category = /^category\/([\s|0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝|\%|\/]+)$/i;

				// 검색 페이지의 이중 주소 정규표현식입니다.
				var s = /^search\/([\s|0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝|\%|\/|\-|\_|\[|\]]+)$/i;

				// 스크립트에서 정한 해시를 입력한 경우에만 해시체인지 함수를 실행하도록 합니다. (보안)
				// 자바스크립트에서 정규표현식을 어떻게 적용하는지 주의깊게 살펴봅니다.
				if (hashtag == 'writeAct' ||
						tag.test(hashtag) ||
						archive.test(hashtag) ||
						s.test(hashtag)
						) {
						// ID가 content인 블럭의 내용을 해당 해시에 맞는 내용으로 바꿉니다. (실시간)
						writeAct();

						// 내용이 변경되었으니 스크롤바를 최상단으로 옮깁니다.
						jQuery(window).scrollTop(0);
				} else if (category.test(hashtag) || hashtag == 'category') {
						// 글 목록 페이지를 이동시킬 때 실행되는 작업입니다. 이중 주소를 처리합니다.
						jQuery('#content').load('http://www.erzsamatory.net/'+hashtag+' #content');
						jQuery(window).scrollTop(0);
				} else if (hashtag == 'home') {
						// 해시가 home일 때 실행합니다.
						listAct();
						//jQuery('#content').load('http://www.erzsamatory.net/ #content');
						jQuery(window).scrollTop(0);
				} else if (hashtag == '') {
						location.href='#home';
				} else if (!hashtag && a != 'onload') {
						// 매개변수로 'onload'가 입력되지 않았을 때,
						// 해시가 비어있을 때 새로고침합니다.
						// 해시가 없는 페이지로 뒤로가기를 하였을 때를 대처하기 위한 스크립트입니다.
						location.reload();
				}
		}
		*/

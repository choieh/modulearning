//보드 정보 선언
var useApi = '../api/apiUserHist.php';
var seq = seq ? seq : '' ;
//userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = 10; //한페이지 게시물 소팅개수
var pagerCount = 10; //페이저카운트
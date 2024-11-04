//보드 정보 선언
var sortData = '';
var useApi = '../api/apiStudyV1.php';
var smsApi = '../api/apiSMS2.php';
var chainsearchApi = '../api/apiSearch.php';
var seq = seq ? seq : '' ;
userLevel = userLevel ? userLevel :9;
var page = page ? page : 1;
var totalCount = '';
var listCount = listCount ? listCount :30;
var pagerCount = 10; //페이저카운트
var nextCount = '';
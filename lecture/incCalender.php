<?
  $lecCode = $_GET["lecCode"];
  $lecName = $_GET["lecName"];
  $todayMonth = substr($inputDate,5,2);
  $todayDate = substr($inputDate,8,2);

//echo decrypt("LO8PXP8ZUe8RUR2m+FcOAE8WEYRhtLML8++To1Dw/oRgwMsN1e9eJu1N+vhhxrYOzPdg+h2BlpSpXmNScZw=", 'kspeaedu12!@');

 ?>


<style>


.cls01 { background-color: rgb(140, 197, 251); cursor:pointer }
.cls02 { background-color: rgb(175, 249, 213); cursor:pointer }
.cls03 { background-color: rgb(255, 255, 254); }
 #calendarTable .sun { color:#c73333; }
#calendarTable .sat { color:#338ac7; }
/* 수강신청 -신청하기 -월간일정*/
.sche_header { overflow:hidden; width:100%; margin-bottom:20px; }
.sche_header .s_today {/* float:left; *//* width:200px; */display: inline;}
.sche_header .s_today span { font-size:12px; color:#2665ae;  display:block; margin-bottom:5px; text-align:left;}
.sche_header .s_today p { font-size:24px; font-weight: bold; font-family: 'NanumSquare'; padding:0; margin:0;}
.sche_header .s_tit {text-align:center; padding-left: -200px;display: inline;}
.sche_header .s_tit p {font-size:30px;font-weight: bold;font-family: 'NanumSquare';color:#2665ae; margin-top: -30px;}
.sche_wrap { background:#f7f7f7; height:128px; margin-bottom:15px; }
p,ul {margin:0; padding:0; }
.sche_wrap a { text-decoration:none; color:#000;}
.sche_wrap li { list-style: none;}
.sche_wrap .sche_month_inner {}
.sche_wrap .sche_month_inner .sche_year { width:300px; margin:0 auto;  overflow:hidden; margin-bottom:15px; padding-top:20px; color:#566375;}
.sche_wrap .sche_month_inner .sche_year li { float:left; font-size:24px; font-weight:bold;}
.sche_wrap .sche_month_inner .sche_year li a { display:inline-block;  }
.sche_wrap .sche_month_inner .sche_year li a img {}
.sche_wrap .sche_month_inner .sche_year li a.y_prev { margin-right:20px;}
.sche_wrap .sche_month_inner .sche_year li a.y_next { margin-left:20px; }
.sche_wrap .sche_month_inner .sche_m { background:url(../images/default/sche_m_bg.gif) 0 0 repeat-x; height:28px; width:98%; margin:0 1%; display:table; }
.sche_wrap .sche_month_inner .sche_m li { display:table-cell; width:8%; text-align:center; line-height:37px; font-size:15px; cursor:pointer; }
.sche_wrap .sche_month_inner .sche_m li span{ font-weight:800; font-size:17px; }
.sche_wrap .sche_month_inner .sche_m li:hover { color:#1f66c6;}
.sche_wrap .sche_month_inner .sche_m li a { font-size:17px;}
.sche_wrap .sche_month_inner .sche_m li.on { color:#fff; background:url(../images/default/sche_m_on.png) center 0 no-repeat; height:50px; }
.sche_wrap .sche_month_inner .sche_m li.on:hover { color:#fff075; }
.sche_cale { }
.sche_cale p { text-align:right; margin-bottom:5px; font-size:13px;}
.sche_cale .tbl_cale { border-top:2px solid #2665ae; border-bottom:1px solid #ccc;}
.sche_cale .tbl_cale table { padding:0; margin:0; border-collapse: collapse; border-spacing: 0; width:893px;}
.sche_cale .tbl_cale table caption { text-indent:-9999em; position:absolute;}
.sche_cale .tbl_cale table thead {border-bottom:1px solid #ccc;}
.sche_cale .tbl_cale table thead tr th {background:#f7f7f7; border-right:1px solid #ccc; ; padding:10px 0; text-align:center; font-size:17px; }
.sche_cale .tbl_cale table thead tr th.sday {color:#ff2929 }
.sche_cale .tbl_cale table thead tr th:first-child, .sche_cale .tbl_cale table tbody tr td:first-child { border-left:1px solid #ccc}
.sche_cale .tbl_cale table tbody {}
.sche_cale .tbl_cale table tbody tr { border-bottom:1px solid #ccc;}
.sche_cale .tbl_cale table tbody tr:last-child { border-bottom:0;}
.sche_cale .tbl_cale table tbody tr td { height:120px; vertical-align:top; position:relative; border-right:1px solid #ccc; }
.sche_cale .tbl_cale table tbody tr td div#calendar_day em{ font-style:normal; display:inline-block; width:33px; height:30px; line-height:30px; text-align:center; position:relative; z-index:5; }
.sche_cale .tbl_cale table tbody tr td div#calendar_day span{ display:inline-block; position:absolute; top:5px; left:5px; z-index:2; width:25px; height:25px; border-radius:50%;background:#f2f2f2; }
.sche_cale .tbl_cale table tbody tr td:first-child div#calendar_day span{ background:#ffdede; }
.sche_cale .tbl_cale table tbody tr td:first-child div#calendar_day em{ color:#ff2929; }
.sche_cale .tbl_cale table tbody tr td div#lecture {  font-size:15px; }
/*.sche_cale .tbl_cale table tbody tr td div#lecture { margin:5px 5px 0 0; font-size:15px; }*/
.sche_cale .tbl_cale table tbody tr td div#lecture > div > span { position:absolute; right:5px; top:5px; font-size:13px; color:#999; }
.sche_cale .tbl_cale table tbody tr td div#lecture > div > span em{ font-style:normal; color:#ff2929; }
.sche_cale .tbl_cale table tbody tr td div#lecture .class{ font-size:14px; overflow:hidden; border-radius:5px; width:120px; margin:0 auto; }
.sche_cale .tbl_cale table tbody tr td div#lecture .class .className{ padding:5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:block; height:30px; line-height:20px; background:gold; margin-top:-10px; box-sizing:border-box; -webkit-box-sizing:border-box; }
.sche_cale .tbl_cale table tbody tr td div#lecture .class .className.blue{ background:#A9BCF5; }
.sche_cale .tbl_cale table tbody tr td div#lecture .class .className.pink{ background:pink; }
.sche_cale .tbl_cale table tbody tr td div#lecture .class .className.green{ background:#2faf62; }
.sche_cale .tbl_cale table tbody tr td div .reCk { padding:15px 10px 0 0;}
.sche_cale .tbl_cale table tbody tr td div .reCk .reOn { color:#f66;}
.sche_cale .tbl_cale table tbody tr td div span.sday { background:url(../images/default/s_day.gif) 0 0 no-repeat; color:#ff2929;}
.sche_cale .tbl_cale table tbody tr td div div { padding-top:10px; text-align:center; margin-bottom:10px;}
.sche_cale .tbl_cale table tbody tr td div div a { text-align:left; background:#2665AE url(/images/default/edu_arr.png) no-repeat 90% center /10%; padding:0 3px 0 10px; box-sizing:border-box; -webkit-box-sizing:border-box; display:block; height:30px; line-height:30px;  text-decoration:none; opacity:.8; color:#fff; font-size:14px; font-weight:bold; }
.sche_cale .tbl_cale table tbody tr td.end div div a{ background-color:#ccc; }
.sche_cale .tbl_cale table tbody tr td div div a:hover { opacity:1;}
.sche_cale .tbl_cale table tbody tr td div div a.edu01_gn { background:#dbf29c; border-top-left-radius:5px;border-top-right-radius:5px; }
.sche_cale .tbl_cale table tbody tr td div div a.edu01_bl { background:#9ccef2; border-top-left-radius:5px;border-top-right-radius:5px;}
.sche_cale .tbl_cale table tbody tr td div div a.edu01_pk { background:#ffb3e5;border-top-left-radius:5px;border-top-right-radius:5px; }
.sche_cale .tbl_cale table tbody tr td div div a.edu_form { background:#003b71 url(../images/default/edu_arr.png) 90% center no-repeat; border-bottom-left-radius:5px;border-bottom-right-radius:5px; color:#fff; font-size:14px; text-align:left; padding-left:13px; width:94px;}
.sche_cale .tbl_cale table tbody tr td div div a.edu_end { background:#aaa url(../images/default/edu_arr.png) 90% center no-repeat!important; }

.mor_m{ display: inline-block; width: 7px; height: 10px; background: #c00000; margin-right:3px}
.mor_a{ display: inline-block; width: 7px; height: 10px; background: #2e75b6; margin-right:3px}
.mor_n{ display: inline-block; width: 7px; height: 10px; background: #01DF74; margin-right:3px}

#myBtn01{ border: 0; outline: 0; width:41px; line-height: 25px; border-radius: 14px; font-size: 14px; color: #fff; margin-right: 5px; font-weight:600;}
.calendar_bold{font-weight:800; color:#000;}
.calendar_bold:hover{text-decoration: underline;}

.myBtn{ background: #ff5252; border: 0; outline: 0; padding: 3px 3px; border-radius: 5px; font-size: 13px; color: #fff; margin-left: 3px;}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px 40px 40px 40px;
  border: 1px solid #888;
  width: 45%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size:45px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.title_wrap{ text-align: center;}
.title_wrap h2{ font-size: 25px; font-weight: 700; position: relative; display: inline-block; font-size: 40px; text-align: center; height: 62px; z-index: 1; clear: both;}
.titleline{background: #ffc000; display: block; position: absolute; content: ''; bottom: 15px; width: 100%; height: 12px; z-index: -1; left: 50%; transform: translate(-50%,0);}
.modal_table{ width: 100%; border-top: 1px solid #333;  border-collapse: collapse; border-spacing: 0px; margin: 0px; padding: 0px; }
.modal_table th{padding:15px 20px; background-color: #fafafa; border-bottom: 1px solid #e1e1e1; font-weight: 700; text-align: left; font-size: 13px; letter-spacing: 0px; }
.modal_table th span{color: red;}
.modal_table td{  padding: 9px; border-bottom: 1px solid #e1e1e1;}
.modal_table td .form-control{ height: 32px; text-indent: 5px; outline: none;border: 1px solid #ccc; padding: 4px 2px;}
.modal_table td input::placeholder { color: #999; }
.con_t{ font-size: 14px; font-weight: 400; margin: 10px 0 40px; color: #353535;}
.submit_bt {display: inline-block; text-align: center; background-color: #228be6; width: 218px; height: 52px; line-height: 52px; font-size: 15px; color: #fff; border: none; }



</style>



<script type="text/javascript">


var fullNowDate = '';
var testDate = new Date();
var today = new Date();
var date = new Date();
var targetType = "<?=$targetType?>";
var lineType = "<?=$lineType?>";
var sortType = "<?=$sortType?>";
var lectureStart1 = new Array();
var lectureStart2 = new Array();
var useApi =  '../api/apiEduInfo.php';
var orderApi = '../api/apiStudyOrder.php';

  var fCDay = "";


//이전 년도
function prevCalendar() {
   today = new Date(today.getFullYear()-1, 0, 1);
   $('.sche_m li').removeClass('on');
   buildCalendar();

}

//다음 년도
function nextCalendar() {
     today = new Date(today.getFullYear()+1, 0, 1);
     $('.sche_m li').removeClass('on');
     buildCalendar();

}

//현재 달 달력 만들기
function buildCalendar(month){


   $("#calendarBody").empty();



  if(typeof month == 'undefined') { //현재 달로 달력을 생성
    doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
  } else { //지정한 달로 달력을 생성
    doMonth = new Date(today.getFullYear(),month-1,1);
    lastDate = new Date(today.getFullYear(),month,0);
  }



//  console.log("doMonth = "+ today.getFullYear());

  var rowCount = doMonth.getDay()+lastDate.getDate();
  rowCount = rowCount/7;

  var firstDay = doMonth.getDay();
  var lastDay = lastDate.getDate();
  var setCalendar = "";
  var regColor = ['#A9BCF5','#2faf62', 'pink'];


// 오늘 날짜 비교를 위해 필요
  var nowYear = date.getFullYear();
  var nowMonth = (date.getMonth()+1) < 10 ?  '0'+ (date.getMonth()+1) : (date.getMonth()+1);
  var nowDay = date.getDate();
  var fNowDay = nowYear +''+   nowMonth +''+   nowDay;


  // 선택한 날짜
  var cYear = today.getFullYear() ;
  var cMonth = (doMonth.getMonth()+1) < 10 ?  '0'+ (doMonth.getMonth()+1) : (doMonth.getMonth()+1);
  var cDay = date.getDate();
  fCDay = cYear +''+   cMonth;
  fullNowDate = cYear +''+ cMonth +''+ cDay;


  //console.log( "fNowDay = "+ fNowDay +"// "+ nowYear +"//"+  cYear );


  if( nowYear > cYear ) {
	  today = new Date();
	  return;
  }



//  if( Number(cYear) )



  for(var i=0;i<rowCount;i++) {

    setCalendar += "<tr>";
    for(var j=0 ;j < 7 ; j++) {


		 setCalendar += "<td>";



		 setCalendar += "<div id='calendar_day'>";
         setCalendar += "<em></em>";
         setCalendar += "</div>";
         //setCalendar += "</div>";
         setCalendar += "<div id='lecture' style='cursor:pointer'>";
         setCalendar += "</div>";
         setCalendar += "</td>";
       }
      setCalendar += "</tr>";
    }

    $(".sche_cale .tbl_cale #calendar tbody").html(setCalendar);
    $(".sche_wrap .sche_year .yearTxt").html(today.getFullYear()+"년&nbsp;");

    var daycount = 1;
    var classCount = 1;
    var classDay = "";
    var tdDay = $(".sche_cale .tbl_cale #calendar tbody tr td div#calendar_day > em");
    var tdDay2 = $(".sche_cale .tbl_cale #calendar tbody tr td div#calendar_day");
    var lectureDay = $(".sche_cale .tbl_cale #calendar tbody tr td div#lecture");
    var classM = "";


    if((doMonth.getMonth()+1) < 10) {
      classM = '0'+(doMonth.getMonth()+1);
    } else {
      classM = (doMonth.getMonth()+1);
    }

	$(".sche_wrap .sche_year .monthTxt").text( classM +"월");


    var classYm = doMonth.getFullYear()+'-'+classM;
    lectureClass = new Array();

	var rowCnt = 1;
	var srtRowCnt = 1;


	var prvDay =  1;
	var preDayChk = false;
	var dayCnt = 0;
	var htm ='';
	var dd='';

    for(var i = doMonth.getDay(); i < Number(doMonth.getDay()) + Number( lastDate.getDate() ) ; i++){




		tdDay.eq(i).html( daycount );
        tdDay2.eq(i).append('<span></span>');

		if( daycount == 1 &&  rowCnt == 1 && ( i % 7 > 2 ) ){
		   // 첫주의 일 시작이 화요일 보다 크다면 패스
		   srtRowCnt = 2;
		}



		dayCnt =  (daycount < 10 ?  '0'+ daycount : daycount );
		

//		htm = " <p style='margin-bottom:10px;'>\n";
//		htm += " 	<p  id='reg_1_"+ dayCnt +"' style='padding-left:2px;text-align:left;display:none' onclick=\"goRegist('1', '"+ (classYm +"-"+ dayCnt ) +"')\"'><span class='mor_m'></span><span style='font-size: 12px;'>오전 <span id='cnt_1_"+ dayCnt +"'>0</span>명/ <span id='all_1_"+ dayCnt +"'>0</span>명</span><button id='myBtn'>신청</button></p>";
//
//		htm += " 	<p  id='reg_2_"+ dayCnt +"' style='padding-left:2px;text-align:left;display:none'  onclick=\"goRegist('2', '"+ (classYm +"-"+ dayCnt) +"')\"'><span class='mor_a'></span><span style='font-size: 12px;'>오후 <span id='cnt_2_"+ dayCnt +"'>0</span>명 /<span id='all_2_"+ dayCnt +"'>0</span>명</span><button id='myBtn'>신청</button></p>";
//		htm += " </p>";

		dd = classYm.replace(/\-/g, '')  +""+ dayCnt; 


		htm = '';
		//if( Number(fNowDay)+1 >  Number(dd) ){
			
			//console.log(  Number(fNowDay) +"=="+  Number(dd) );

		//}else{



			htm = "<p id='reg_1_"+ dayCnt +"' style='padding-left:2px;text-align:left;display:none' onclick=\"goRegist('1', '"+ (classYm +"-"+ dayCnt ) +"',\'cnt_1_"+ dayCnt +"\',\'all_1_"+ dayCnt +"\')\"'> \n";
			htm += " 	<button id='myBtn01' class='myBtn' style='background:#ff7979;'>오전</button><span><span id='cnt_1_"+ dayCnt +"' class='calendar_bold'>0명</span>/<span id='all_1_"+ dayCnt +"'>0</span>명</span> \n";
			htm += " </p>\n";

			htm += " <p id='reg_2_"+ dayCnt +"' style='padding-left:2px;text-align:left;display:none'  onclick=\"goRegist('2', '"+ (classYm +"-"+ dayCnt) +"',\'cnt_2_"+ dayCnt +"\',\'all_2_"+ dayCnt +"\')\"'>\n";
			htm += " 	<button id='myBtn01' class='myBtn' style='background:#96b5ea;'>오후</button><span><span id='cnt_2_"+ dayCnt +"' class='calendar_bold'>0명</span>/<span id='all_2_"+ dayCnt +"'>0</span>명</span>\n";
			htm += " </p>\n";

			htm += " <p id='reg_3_"+ dayCnt +"' style='padding-left:2px;text-align:left;display:none'  onclick=\"goRegist('3', '"+ (classYm +"-"+ dayCnt) +"',\'cnt_3_"+ dayCnt +"\',\'all_3_"+ dayCnt +"\')\"'>\n";
			htm += " 	<button id='myBtn01' class='myBtn' style='background:#01DF74;'>야간</button><span><span id='cnt_3_"+ dayCnt +"' class='calendar_bold'>0명</span>/<span id='all_3_"+ dayCnt +"'>0</span>명</span>\n";
			htm += " </p>\n";

		//}




		 lectureDay.eq(i).append( htm );


		if( i % 7 == 6 ){
		   rowCnt++;
		}


        if(classCount < 10) {
          classDay = '0'+classCount;
        } else {
          classDay = classCount;
        }

        lectureDay.eq(i).addClass(classYm+'-'+(classDay));

		daycount++
        classCount++;
   }


	  $('.sche_m li').removeClass('on');
	  $('.sche_m li:eq('+doMonth.getMonth()+')').addClass('on');
	  $('.sche_m li').click(function(e){
		  $('.sche_m li').removeClass('on');
		  $(this).addClass('on');
	  });



	getCnt( fCDay , lecCode , areaCode );


}




function getCnt(lecDate, lecCode, areaCode){
	

	 $.get("./api/apiOffline.php", {"mode":"lecInfo", "lecDate": lecDate , "lecCode": lecCode , "areaCode": areaCode }, function(data) {
        var day='';
		if( typeof( data.lecList ) != "undefined" ){
			
			
			$.each(data.lecList, function(d) {

				day = ( Number(this.day) < 10 ) ? '0'+ Number(this.day) : Number(this.day);
				

				//console.log( fCDay  +"_"+ fullNowDate  +"_"+ dd  );

				//if( Number(fullNowDate) <  Number(dd) )	return;
				
				// 신청인원 셋팅
				$("#reg_"+ this.olLecType +"_"+ day +" #cnt_"+ this.olLecType +"_"+ day ).text( this.cnt );



				// 전체인원 셋팅
				$("#reg_"+ this.olLecType +"_"+ day +" #all_"+ this.olLecType +"_"+ day ).text( this.olLecCnt );


				if( Number(this.olLecCnt) == 0 ){

					$("#reg_"+ this.olLecType +"_"+ day  ).attr("onclick",  "alert('교육 가능한 인원이 없습니다.');");

				}


				// 레이어 show				
				$("#reg_"+ this.olLecType +"_"+ day ).show();


			});

		}

	 });
}




// 신청 모달 창

function goRegist(lecType, lecDate, cnt, allCnt ){

	if (eval($('#'+cnt).text()) >= eval($('#'+allCnt).text())) {
		alert('정원이 초과 하여 신청하실 수 없습니다.');
		return;
	}

	//console.log( " lecType = "+ lecType +" // lecDate = "+ lecDate );
    $("#lecType").val( lecType );
    $("#lecCode").val( lecCode );
    $("#lecDate").val( lecDate );
    $("#areaCode").val( areaCode );
	
	if (lecType == '1') {
		$("#lecDateTxt").text( lecDate + ' 오전 : 09:00~13:00 ' );
	} else if (lecType == '2') {
		$("#lecDateTxt").text( lecDate + ' 오후 : 14:00~18:00 ' );
	} else {
		$("#lecDateTxt").text( lecDate + ' 야간 : 18:00~22:00 ' );
	}
    //$("#lecDateTxt").text( lecDate + ' '+ ((lecType == '1') ? '오전 : 09:00~13:00 ' : '오후 14:00~18:00') );


	$("#myModal").show();

}



function regLecture(){

	if( $.trim( $("#lecType").val() ) == ""){
		alert("오전/오후/야간 값이 없습니다.");
		return false;
	}

	if( $.trim( $("#lecCode").val() ) == ""){
		alert("콘텐츠 고유값이 없습니다.");
		return false;
	}

	if( $.trim( $("#lecDate").val() ) == ""){
		alert("교육일자 값이 없습니다.");
		return false;
	}


	if( $.trim( $("#usrName").val() ) == ""){
		alert("이름을 기입해 주세요.");
		$("#usrName").focus();
		return false;
	}


	if( $.trim( $("#usrBirth").val() ) == ""){
		alert("생년월일을 기입해 주세요.");
		$("#usrBirth").focus();
		return false;
	}

	if( $.trim( $("#usrAddr").val() ) == ""){
		alert("주소를 기입해 주세요.");
		$("#usrAddr").focus();
		return false;
	}

	if( $.trim( $("#phone1").val() ) == "" || $.trim( $("#phone2").val() ) == "" || $.trim( $("#phone3").val() ) == ""){
		alert("연락처를 기입해 주세요.");
		$("#phone1").focus();
		return false;
	}

	if( $.trim( $("#useCardNum").val() ) == ""){
		alert("면허번호를 기입해 주세요.");
		$("#useCardNum").focus();
		return false;
	}

	if(  $("#agree1").is(":checked") == false ){
		alert("개인정보의 수집ㆍ이용 및 제공에 관한 동의를 해주세요.");
		$("#agree1").focus();
		return false;
	}

	$.post("./api/apiOffline.php", $("#frmLec").serialize() , function(jsonData) {

		//console.log(jsonData.result  );
		if( jsonData.result == 'success' ){
			alert("신청이 완료되었습니다.");
			$("#myModal").hide();
		}else if( jsonData.result == 'exist' ){
			alert("이미 신청하신 내역이 있습니다.");
			$("#myModal").hide();
		}else{
			alert("신청중 에러가 발생하였습니다.");
			$("#myModal").hide();
		}


		getCnt( fCDay , lecCode , areaCode);
	});
}


$(document).ready(function(){

	$("#myModalClose").bind('click', function(){
		$("#frmLec")[0].reset();
		$("#myModal").hide();
	});

	buildCalendar();

	$.post("./api/apiOffline.php", "mode=area" , function(jsonData) {

		if( jsonData.totalCount > 0 ){

			var idName='';
			var html='';
			$.each( jsonData.areaList, function(i) {

				idName = "";
				if( i == 0 ) {
					idName = "defaultOpen";
					areaCode = this.ocIdx;
				}

				$("#mnuTab").append("<button class='tablinks' onclick=\"openCity(event, 'tab"+ i +"', '"+ this.ocIdx +"')\" id='"+ idName +"'>"+ this.ocArea +"</button>");

				html = "<div id='tab"+ i +"' class='tabcontent' id='mnuTabCon'>";
				//html += "<p class='ad_title'><span>주소</span>"+ this.ocAddr +"</p>";
                html += "<p class='tel_title'><span>주소</span>"+ this.ocAddr +"</p>";
				html += "<p class='tel_title'><span>연락처</span>"+ this.ocTel +"</p>";
                html += "<button id='btnMap' class='myBtn btnMap' onclick='map("+ i +")' style='float:right;width:100px;height:50px;margin-top:-90px' >지도 숨기기</button>";
				//html += "<div id='map' class='map'><iframe src='"+ this.ocMapUrl +"' width='100%' height='400' frameborder='0' style='border:0;' allowfullscreen=''></iframe></div>";
                html += this.ocMapUrl;
				html += "</div>";

				$("#mnuTabCon").append( html );


			});


			document.getElementById("defaultOpen").click();

		}


	});


});




function map(v){


 $(".map").eq(v).slideToggle("fast", function(){

    if( $(".map").eq(v).css("display") == 'none' ){
		$(".btnMap").eq(v).text("지도 펼치기");
	}else{
		$(".btnMap").eq(v).text("지도 숨기기");
	}
 });
}


</script>





	<a name="regist"></a>

	  <!-- 서브페이지 컨텐츠 시작줄 -->
      <div class="sub_wrap" style="padding-top:0px">
        <div class="sche_header">
          <div class="s_today" style="text-align:right">
		  <h1 class="sub_tit01" style="float:left">교육 신청하기 - <?=$lecName?></h1>
            <!--span style="text-align:right">Today</span>
            <p>
            <?=$todayMonth;?>월 <?=$todayDate;?>일-->
            </p>
          </div>

        </div>



        <div class="sche_wrap">
          <div class="sche_month_inner">
            <ul class="sche_year">
              <li><a href="javascript:prevCalendar()" class="y_prev"><img src="../images/default/y_prev.png" alt="이전년도"></a></li>
              <li class="yearTxt"></li>&nbsp;&nbsp;<li class="monthTxt"></li>
              <li><a href="javascript:nextCalendar()" class="y_next"><img src="../images/default/y_next.png" alt="다음년도"></a></li>
            </ul>
            <ul class="sche_m">

       		<?
				for( $i=1 ; $i <= 12 ; $i++){
					$n = ( $i < 10 ) ? "0".$i : $i;
			 ?>

              <li onClick="buildCalendar(<?=$i?>)"><span><?=$n?></span>월</a></li>

			  <?}?>
            </ul>
          </div>
        </div>


        <!--//sche_wrap-->
        <div class="sche_cale">

		 <div style="margin-bottom:10px;">
			<span class="mor_m"></span><span  style="font-size: 16px;">오전 : 09:00~13:00</span>
			<span class="mor_a" style="margin-left:10px;"></span><span style="font-size: 16px;">오후 : 14:00~18:00</span>
			<span class="mor_n" style="margin-left:10px;"></span><span style="font-size: 16px;">야간 : 18:00~22:00</span>
		</div>


          <!--p style="float:left"><font color=red><b>15인 이하일 경우 폐강됩니다.</b></font></p-->

          <p><font color=blue>* 원하시는 날짜 오전/오후 신청버튼을 클릭하세요.</font></p>
          <div class="tbl_cale">
            <table id="calendar">
              <caption>한국안전교육기술원 관리감독자 정기교육 일정입니다.</caption>
              <colgroup>
                <col width="130px">
                <col width="130px">
                <col width="130px">
                <col width="130px">
                <col width="130px">
                <col width="130px">
                <col width="130px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="row" class="sday">일</th>
                  <th scope="row">월</th>
                  <th scope="row">화</th>
                  <th scope="row">수</th>
                  <th scope="row">목</th>
                  <th scope="row">금</th>
                  <th scope="row">토</th>
                </tr>
              </thead>
              <tbody id="calendarBody">
              </tbody>
            </table>
          </div>
        </div>
   	  </div>




<script type="text/javascript" src="../frontScript/modal.js"></script>



    <!-- The Modal -->


    <div id="myModal" class="modal"  style="padding:0;">

	 <form id="frmLec" name="frmLec" method="post">

	   <input type="hidden" name="mode" id="mode" value="insert">
	   <input type="hidden" name="lecType" id="lecType" value="">
	   <input type="hidden" name="lecCode" id="lecCode" value="">
	   <input type="hidden" name="lecDate" id="lecDate" value="">
	   <input type="hidden" name="areaCode" id="areaCode" value="">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" id="myModalClose">&times;</span>
        <div class="title_wrap">
			<h2>교육신청<span class="titleline"></span></h2>
		</div>


            <table class="modal_table">
                <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                </colgroup>
                <tr>
                    <th>신청과정</th>
                    <td><span><?=$lecName?></span></td>
                </tr>

				  <tr>
                    <th>교육 신청일자</th>
                    <td><span id="lecDateTxt"></span></td>
                </tr>


                <tr>
                    <th><span>*&nbsp;</span>이름</th>
                    <td><input type="text" name="usrName" id="usrName"  class="form-control" value=""></td>
                </tr>
                <tr>
                    <th><span>*&nbsp;</span>생년월일</th>
                    <td><input type="text" name="usrBirth" id="usrBirth" class="form-control" placeholder="예) 19820705" maxlength="8"  value="" ></td>
                </tr>
                <tr>
                    <th><span>*&nbsp;</span>주소</th>
                    <td><input type="text" name="usrAddr"  id="usrAddr"  style="width:400px" class="form-control"  value="" ></td>
                </tr>
                <tr>
                    <th><span>*&nbsp;</span>연락처</th>
                    <td>
						<input id="phone1" name="phone1" style="width:50px" class="form-control" type="text" value="" size="2" maxlength="3">
                        <span class="hyphen">-</span>
						<input id="phone2" name="phone2" style="width:70px" class="form-control" type="text" value="" size="6" maxlength="4">
                        <span class="hyphen">-</span>
						<input id="phone3" name="phone3" style="width:70px" class="form-control" type="text" value="" size="6" maxlength="4">
					</td>
                </tr>
				<tr>
                    <th><span>*&nbsp;</span>면허번호</th>
                    <td><input type="text" name="useCardNum" id="useCardNum" style="width:400px" class="form-control" placeholder="예) 대구 01-2009-1234-56" value=""></td>
                </tr>
				<tr>
                    <th>소유 면허 종류</th>
                    <td><input type="text" name="useCard" id="useCard" class="form-control" placeholder="예) 굴삭기, 지게차 등" value="" ></td>
                </tr>				
            </table>
            <section id="agree_wrap1">
                <h3 class="agree_title">개인정보의 수집ㆍ이용 및 제공에 관한 동의서</h3>
                <div class="agree_text_box">
                    사)한국건설안전기술사회 교육원은 건설기계관리법령에 따른 건설기계 조종사 안전교육 지정기관으로서 교육생의 교육 신청 및 수료관리 등과 관련하여 귀하의 개인정보를 아래와 같이 수집∙이용 및 제3자 제공을 하고자 합니다. 다음 사항에 대해 충분히 읽어 보신 후, 서명해주시기 바랍니다.<br /><br />

                    <b>가. 개인정보 수집∙이용 동의</b><br />
                    <table class="agree_table">
                        <colgroup>
                            <col width="33.4%">
                            <col width="33.3%">
                            <col width="33.3%">
                        </colgroup>
                        <tr>
                            <th>수집ㆍ이용하는 개인정보 항목</th>
                            <th>개인정보 수집ㆍ이용 목적</th>
                            <th>개인정보 이용 및 보유 기간</th>
                        </tr>
                        <tr>
                            <td>
                                성명, 생년월일, 주소, 전화번호, 소지면허(면허명∙코드∙면허번호∙발급일자), 이메일, 교육 이수일 등 교육 관련 정보
                            </td>
                            <td>교육신청, 이수증 발급 및 이수 관리 등</td>
                            <td>5년</td>
                        </tr>
                    </table>

                    <b>나. 개인정보의 제3자 제공 동의</b><br />
                    해당 정보는 건설기계관리법에 따른 건설기계 조종사 안전교육 수료 여부 등을 관리하는 주무부처인 국토교통부 및 전산시스템 운영·관리업체인 ㈜나야넷에 제공됩니다.
                    <table class="agree_table">
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <tr>
                            <th>제공 받는 자</th>
                            <th>제공 항목</th>
                            <th>개인정보 제공 목적</th>
                            <th>제공된 개인정보 보유 및 이용 기간</th>
                        </tr>
                        <tr>
                            <td>
                                국토교통부
                            </td>
                            <td>
                                성명, 생년월일, 주소, 전화번호, 소지면허(면허명∙코드∙면허번호∙발급일자), 이메일, 교육 이수일 등 교육 관련 정보
                            </td>
                            <td>
                                건설기계관리법에 따른 건설기계 조종사 안전교육 이수관리 등
                            </td>
                            <td>10년</td>
                        </tr>
                        <tr>
                            <td>
                                ㈜나야넷<br />(교육 전산시스템 운영·관리업체)
                            </td>
                            <td>
                                성명, 생년월일, 주소, 전화번호, 소지면허(면허명∙코드∙면허번호∙발급일자), 이메일, 교육 이수일 등 교육 관련 정보
                            </td>
                            <td>
                                전산시스템 운영·관리
                            </td>
                            <td>전산시스템  운영·관리 계약기간 (5년 이내)</td>
                        </tr>
                    </table>

                   <b>다. 동의를 거부할 권리와 거부에 따른 불이익</b><br />
                     위의 개인정보 수집, 이용 및 제3자 제공에 관한 동의를 거부하실 수 있으나, 거부하실 경우, 교육 신청, 수료증 발급 및 이수 관리 등이 곤란할 수 있습니다.
                </div>
                <fieldset class="text-right agree_ck">
                    <label for="agree1">개인정보의 수집ㆍ이용 및 제공에 관한 동의서 내용에 동의합니다.</label>
                    <input type="checkbox" name="agree1" value="1" id="agree1">
                </fieldset>
            </section>
            <p class="con_t">※해당 내용을 확인 하였으며 교육과정을 신청합니다.</p>
             <div style="text-align:center;"><button type="button" value="수강신청"  onclick="regLecture()" class="submit_bt">수강신청</button></div>

      </div>

	     </form>
    </div>

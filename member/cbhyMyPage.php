<?
		$sitecode = "BF402";				// NICE로부터 부여받은 사이트 코드
    $sitepasswd = "YHFCAUOoNO1P";			// NICE로부터 부여받은 사이트 패스워드
    
    $authtype = "M";      	// 없으면 기본 선택화면, X: 공인인증서, M: 핸드폰, C: 카드
    	
		$popgubun 	= "N";		//Y : 취소버튼 있음 / N : 취소버튼 없음
		$customize 	= "";			//없으면 기본 웹페이지 / Mobile : 모바일페이지
		
		 
    $reqseq = "REQ_0123456789";     // 요청 번호, 이는 성공/실패후에 같은 값으로 되돌려주게 되므로
    
    // 업체에서 적절하게 변경하여 쓰거나, 아래와 같이 생성한다.
		//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
			$reqseq = get_cprequest_no($sitecode);
		//} else {
		//	$reqseq = "Module get_request_no is not compiled into PHP";
		//}
    
    // CheckPlus(본인인증) 처리 후, 결과 데이타를 리턴 받기위해 다음예제와 같이 http부터 입력합니다.
    $returnurl = "http://".$_SERVER["HTTP_HOST"]."/member/checkplus_success.php";	// 성공시 이동될 URL
    $errorurl = "http://".$_SERVER["HTTP_HOST"]."/member/checkplus_fail.php";		// 실패시 이동될 URL
	
    // reqseq값은 성공페이지로 갈 경우 검증을 위하여 세션에 담아둔다.
    
    $_SESSION["REQ_SEQ"] = $reqseq;
    // 입력될 plain 데이타를 만든다.
    $plaindata =  "7:REQ_SEQ" . strlen($reqseq) . ":" . $reqseq .
									"8:SITECODE" . strlen($sitecode) . ":" . $sitecode .
									"9:AUTH_TYPE" . strlen($authtype) . ":". $authtype .
									"7:RTN_URL" . strlen($returnurl) . ":" . $returnurl .
									"7:ERR_URL" . strlen($errorurl) . ":" . $errorurl .
									"11:POPUP_GUBUN" . strlen($popgubun) . ":" . $popgubun .
									"9:CUSTOMIZE" . strlen($customize) . ":" . $customize ;
    
    
		//if (extension_loaded($module)) {// 동적으로 모듈 로드 했을경우
			$enc_data = get_encode_data($sitecode, $sitepasswd, $plaindata);
		//} else {
		//	$enc_data = "Module get_request_data is not compiled into PHP";
		//}

    if( $enc_data == -1 )
    {
        $returnMsg = "암/복호화 시스템 오류입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -2 )
    {
        $returnMsg = "암호화 처리 오류입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -3 )
    {
        $returnMsg = "암호화 데이터 오류 입니다.";
        $enc_data = "";
    }
    else if( $enc_data== -9 )
    {
        $returnMsg = "입력값 오류 입니다.";
        $enc_data = "";
    } else {
			$returnMsg = "";
		}

//보안을 위해 제공해드리는 샘플페이지는 서비스 적용 후 서버에서 삭제해 주시기 바랍니다. 

?>
<? include '../include/header.php' ?>
<!-- 우편번호 -->
<script language='javascript'>
	window.name ="Parent_window";
	
	function fnPopup(){
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}
	var returnMsg = '<?= $returnMsg ?>';
    var enc_data = '<?= $enc_data ?>';
    
    document.addEventListener("DOMContentLoaded", function(){
        $('input[name=EncodeData]').val(enc_data);
    });
    
    function mobileCheck(names,birthNum,sexType){
        birthNum = birthNum ? birthNum : '';
        sexType = sexType ? sexType : '';
        var userName = names;
        var birth = birthNum.slice(2);
        var sex = sexType;

        $('input[name=academyAdmin]').val(userName);
        $('input[name=birth]').val(birth);
        $('input[name=sex]').val(sex);
        
        // alret('ok');
        $('.mobileArea h1 input[name="checkMobile"]').prop('checked',true);
        $('.mobileArea form:eq(0)').before('<button type="button" class="btnPhone successMobile" onclick="alert(\'이미 인증하셨습니다.\');">휴대폰인증하기</button>');
        $('.mobileArea form, .ipinInfo').remove();
        $('.memberCheck').css('display','none');
        $('#form_memChk').css('display', 'block');
        
        
    }
	
	var sEncData = '<?= $sEncData ?>';
    

    function checkAcademy(academy){
        var seq = academy.value;
        var obj = document.getElementsByName("academyCheck");

        for(var i=0; i<obj.length; i++){

            if(obj[i] != academy){

                obj[i].checked = false;

            }

        }
        $.get('../api/apiAcademy.php','seq='+seq,function(data){
            $.each(data.academy, function(){
                $(".academyName").val(this.academyName);
                $("input[name=academyName]").val(this.academyName);
                $("input[name=academyCEO]").val(this.academyCEO);
                $("input[name=zipCode]").val(this.zipCode);
                $("input[name=address]").val(this.address);
                
            });
            // console.log(data);
        });
        
    }
    function ajaxAct(sortDatas){
        loadingAct();
        sortDatas = sortDatas ? sortDatas : '';
        if(sortDatas != ''){
            sortData = sortDatas
        }
        
        var listAjax = $.get('../api/apiAcademy.php',sortData,function(data){
        // console.log(data.academy);
        totalCount = data.totalCount;
        var lists = '';
		var j = totalCount;
        if(page != 1){
			j = totalCount - ((page-1)*listCount);
        }
        
        if (totalCount != 0){
            $.each(data.academy, function(){
                lists += '<tr><td>'+this.academyName+'</td>';
                lists += '<td>'+this.address+'</td>';
                lists += '<td>'+this.branch+'</td>';
                lists += '<td>'+this.academyCEO+'</td>';
                lists += '<td> <input type="checkbox" value="'+this.seq+'" name="academyCheck" onClick="checkAcademy(this);"></td>';
                lists += '</tr>';
                
            })

        }        

        $('.academyTable tbody').html(lists);
        loadingAct();
        pagerAct();
        })
    }
    
    function memberChk(){	
        
        var sendData = $('#form_memChk').serialize();
        // console.log(sendData);
        $.ajax({
            method:'POST',
            url:'../api/apiAcademy.php',
            data:sendData,
            dataType:'text',
            success:function(data){
                if(data == 'error1'){
                    alert('이미 등록된 관리자가 있습니다.');
                }else{
                    alert('회원관리자로 등록되었습니다.');
                    //console.log(data);
                    location.replace('/studyCenterCbhy/login.php');
                }
            }
	    })
            // $('#form_memChk div strong.red').remove();
            // var checkFalse = 0;		
            // if($('input[name="userName"]').val() == ''  ){
            //     $('input[name="userName"]').after('<strong class="red">&nbsp;&nbsp;이름을 입력해주세요.</strong>')
            //     checkFalse ++;
            // }
            // if($('input[name="birth"]').val() == ''){
            //     $('#birthSpan').after('<strong class="red">&nbsp;&nbsp;생년월일을 입력해주세요.</strong>')
            //     checkFalse ++;
            // } else if ($('input[name="birth"]').val().length <= 5){
            //     $('#birthSpan').after('<strong class="red">&nbsp;&nbsp;생년월일 6자리를 입력해주세요.</strong>')
            //     checkFalse ++; 
            // }else if($('input[name="sex"]').val() == ''){
            //     $('#birthSpan').after('<strong class="red">&nbsp;&nbsp;주민등록번호 뒷 7자리 중 첫 자리를 입력해주세요.</strong>')
            //     checkFalse ++;
            // }
            // if($('input[name="mobile02"]').val() == '' || $('input[name="mobile03"]').val() == '' ){
            //     $('input[name="mobile03"]').after('<strong class="red">&nbsp;&nbsp;휴대폰 번호를 입력해주세요.</strong>')
            //     checkFalse ++;
            // }
            // if(checkFalse == 0){
            //   $('#form_memChk').submit();
            // }	
    }
    
function changeElement(){
	$('.mobileArea').css('display','block');
	$('.memberCheck h1 input[name="checkMember"]').prop('checked',true);
	//$('.memberCheck form:eq(0)').before('<strong class="blue">회원가입 여부가 확인되었습니다. 회원가입 진행을 위해 본인인증을 해주세요.</strong>');
	$('.memberCheck form:eq(0)').before('<strong class="blue">회원가입 진행을 위해 본인인증을 해주세요.</strong>');
	$('.memberCheck form').css('display','none');
}
//회원중복체크
function findMember(){
    var userID = $('input[name=userID]').val();
    if(userID != ""){
            $.ajax({
            method:'POST',
            url:'../api/apiAcademy.php',
            data: { userID : userID,
                    memCheck : 'Y'},
            dataType:'text',
            success:function(data){
                if(data == 'error'){
                    alert('사용가능한 아이디입니다.');
                    // location.replace('/studyCenterCbhy/login.php');
                }else{
                    alert('이미 사용중인 아이디입니다.');
                    
                    // changeElement();
                }
            }
        })
    }else{
        alert('아이디를 입력해주세요.');
    }
	
}

function checkAgree(){
	/*if($('.agreementPage input[name="checkAgree"]').prop('checked') != true){
		alert('이용약관에 동의해주세요')
	}else if ($('.agreementPage input[name="checkPrivate"]').prop('checked') != true){
		alert('개인정보 보호정책에 동의해주세요')
	}else if ($('.agreementPage input[name="checkACS"]').prop('checked') != true){
		alert('ACS 안내에 동의 해주세요')
	}else */if ($('.agreementPage input[name="checkMember"]').prop('checked') != true){
		alert('가입 여부를 확인해주세요.')
	}else if ($('.agreementPage input[name="checkMobile"]').prop('checked') != true){
		alert('휴대폰 또는 아이핀 본인인증을 해주세요.')
	}else{
		viewMemberInfo();
	}
}
    
</script>

<!--<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>-->
<!--<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>-->
<!-- <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script> -->
<!-- //우편번호 -->
<script type="text/javascript" src="../frontScript/_global.js"></script>
<script type="text/javascript" src="../frontScript/_sendData.js"></script>
<script type="text/javascript" src="../frontScript/_category.js"></script>

<html>
    <head>
    <style>
        .mainArea{ margin :30px 300px;}
        .mainArea > h1{ font-size: 30px;}
        .mainArea > span{ font-size: 16px; margin:5px 0px;}
        
        .mainArea > .subArea {margin:20px 0px 10px 0px; }

        .academyInfo > .academyTable{width: 100%; text-align:center;}
        .academyInfo > .academyTable > thead{ background:#cce1ff; color:#000;}
        
        .academyInfo > .academyTable > thead > tr{ height:50px;}
        .academyInfo > .academyTable > tbody > tr{ background: #fff;}

        .mobileArea button { padding:0 25px 0 60px; width:200px; height:60px; border:none; background-position:20px center; background-repeat:no-repeat; background-color:#444ffb; color:#fff; font-size:15px; font-weight:bold; }
        .mobileArea button.successMobile {padding:0 25px 0 60px; width:200px; height:60px; border:none; background-position:20px center; background-repeat:no-repeat; background-color:#666; color:#fff; font-size:15px; font-weight:bold;}
        .mobileArea button.btnPhone { background-image:url(../images/member/icon_phone.png); }
        .mobileArea > h1 { margin : 30px 0px 30px 0px;}
        .mobileArea > div { margin-bottom : 15px;}

        #form_memChk { margin-top:50px;}
        #form_memChk > .formRow{ display:flex;}
        #form_memChk > .formRow > .formSubject { width:120px;}
        #form_memChk > .formRow > .formContents > input { margin:10px;}
        
        #form_memChk > .submitMemberBtn { width:200px; height:60px; margin:20px 0px; background-color:#444ffb; color:#fff; border:none;}
        
    </style>
    </head>
    <body>
    <div class="mainArea">
        <h1>등록하고자 하는 학원을 검색합니다.</h1>
        <span>※검색결과에 등록하고자 하는 학원이 나오지 않는 경우, 학원연합회로 연락하여 문의하시기 바랍니다. (충청북도학원연합회 000-000-0000/09시~17시)</span>
        <div class="subArea">
        <form class="searchForm" action="javascript:searchAct();">
            <label>시.군 선택
                <select name="country">
                    <option value="">전체</option>
                    <option value="청주">청주시</option>
                    <option value="충주">충주시</option>
                    <option value="제천">제천시</option>
                    <option value="보은">보은군</option>
                    <option value="옥천">옥천군</option>
                    <option value="영동">영동군</option>
                    <option value="증평">증평군</option>
                    <option value="진천">진천군</option>
                    <option value="괴산">괴산군</option>
                    <option value="음성">음성군</option>
                    <option value="단양">단양군</option>
                </select>
            </label>
            <label>
                검색어
                <input type="text" name="searchAddr">
            </label>
        <button type="submit">학원검색</button>
        </form>

        </div>
    

    
        <div class="academyInfo">
            <table class="academyTable">
                <thead>  
                    <tr>
                        <th style="width:20%;">학원명</th>
                        <th style="width:50%;">주소지</th>
                        <th style="width:10%;">분야</th>
                        <th style="width:10%;">학원설립운영자</th>
                        <th style="width:10%;">선택</th>                
                    </tr>
                </thead>
                <tbody>
                

                </tbody>
            </table> 
        </div>
        
        
		<div class="mobileArea">
            <h1>학원회원정보 등록</h1>
                <div>
                    <input type="text" class="academyName" readonly="readonly"> 관리자님 본인의 휴대폰 인증을 진행해주세요.
                </div>
                <form name="form_chk" method="post">
                    <input type="hidden" name="m" value="checkplusSerivce">
                    <input type="hidden" name="EncodeData" value="">
                    <input type="hidden" name="param_r1" value="">
                    <input type="hidden" name="param_r2" value="">
                    <input type="hidden" name="param_r3" value="">
                    <button type="button" onclick="fnPopup();" class="btnPhone">휴대폰인증하기</button>&nbsp;&nbsp;
                    <br/>
                    <br/>
                    
                   <span> ※휴대폰 본인인증 후 기본정보를 입력해주세요. </span>
                </form>
        </div>


        <form id ="form_memChk" name="form_memChk" style="display:none;">
        <h2>기본정보</h2>
        <div class="formRow">
            <div class="formSubject">
               <h3><span style="color:red">*</span>아이디</h3>
            </div>
            <div class="formContents">
                <input type="text" name="userID">
                <button type="button" onclick="findMember();">중복체크</button>
                *영문,숫자만 입력가능합니다.
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>비밀번호</h3>
            </div>
            <div class="formContents">
                <input type="text" name="userPwd">
                * 비밀번호는 8~20자리로 지정해주세요. (영문,숫자,특수문자~!@#$%^&*()?_만허용) 혼용
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>비밀번호확인</h3>
            </div>
            <div class="formContents">
                <input type="text" name="userPwd2">
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>학원명</h3>
            </div>
            <div class="formContents">
                <input type="text" name="academyName" style="background:#D4F4FA; border:none;" readonly>
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>대표자명</h3>
            </div>
            <div class="formContents">
                <input type="text" name="academyCEO" style="background:#D4F4FA; border:none;" readonly>
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>사업자등록번호</h3>
            </div>
            <div class="formContents">
                <input type="text" name="companyCode">
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>학원관리자명</h3>
            </div>
            <div class="formContents">
                <input type="text" name="academyAdmin">
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>휴대폰번호</h3>
            </div>
            <div class="formContents">
                <input type="text" name="mobile01">-
                <input type="text" name="mobile02">-
                <input type="text" name="mobile03">
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>이메일</h3>
            </div>
            <div class="formContents">
                <input type="text" name="email01">
                @
                <input type="text" name="email02">
                

            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>우편번호</h3>
            </div>
            <div class="formContents">
                <input type="text" name="zipCode" style="background:#D4F4FA; border:none;" readonly>
            </div>
        </div>

        <div class="formRow">
            <div class="formSubject">
                <h3><span style="color:red">*</span>주소</h3>
            </div>
            <div class="formContents">
                <input type="text" name="address" style="background:#D4F4FA; border:none;" readonly>
            </div>
        </div>

        <input type="hidden" name="birth"/>
        <input type="hidden" name="sex"/>
        
		<!-- <input type="hidden" name="memCheck" value="Y"/>
		<div class="floatLeft"><div><h2>이름</h2><input type="text" name="userName" class="name" maxlength="20" /></div>
		<div><h2>생년월일</h2><input type="text" name="birth" class="name" maxlength="6"> - <input type="text" name="sex" class="sex" maxlength="1" style="width:21px;"><span id="birthSpan">&nbsp;&nbsp;(예시 : 751026-1 )</span></div>
		<div><h2>휴대전화</h2><select name="mobile01" class="mobile01">
		<option value="010">010</option>
		<option value="011">011</option>
		<option value="016">016</option>
		<option value="017">017</option>
		<option value="018">018</option>
		<option value="019">019</option>
		</select>&nbsp;-&nbsp;<input class="tel" type="tel" name="mobile02" maxlength="4" style="ime-mode:disabled;" />&nbsp;-&nbsp;<input class="tel" name="mobile03" type="tel" maxlength="4"/></div></div>
        <div class="floatLeft"><button type="button" onclick="memberChk();">확인하기</button>
        </div> -->
        <button type="button" class="submitMemberBtn" onclick="memberChk();">회원등록하기</button>
        </form>
    </div>

    </body>
</html>
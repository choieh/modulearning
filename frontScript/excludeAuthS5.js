//	게시판 리스트페이지 스크립트
//
//	1.게시판 소팅관련된 부분은 Success프로세스에 표시한다.
//	2.게시판 퍼포먼스관련 부분은 done프로세스에서 표시한다.
//	3.기타액션은 always에서 표시한다.
//	4,2중 always는 사용을 자제하도록 한다.
//
//	작성자 : 서영기

//리스트 소팅
const useApi = '../api/apiExcludeAuthS5.php';
const chainsearchApi = '../api/apiSearch.php';
const contentsApi = '../api/apiContentSel.php';
var page = page ? page : 1;
var listCount = listCount ? listCount : 10;
let totalCount = '';
let pagerCount = 10; //페이저카운트
function listAct(page){

    //상단 액션 부분
    var actionArea = '';
    var today = new Date();
    actionArea += '<h2>산업안전 훈련생 본인여부 확인 관리</h2>';
    actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()">';
    actionArea += '<div class="searchChangeArea">'
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" checked="checked" onChange="searchTypeSelect(this.value)" /><label for="searchDate">기간검색</label>&nbsp;&nbsp;&nbsp;';

    actionArea += '<select name="searchYear" onchange="searchStudy(\'lectureDay\')">';
    var i= '';
    var thisYear = today.getFullYear();
    for(i= 2015; i <= thisYear; i++){
        if(i != thisYear){
            actionArea += `<option value="${i}">${i}년</option>`;
        }else{
            actionArea += `<option value="${i}" selected="selected">${i}년</option>`;
        }
    }
    actionArea += '</select>';
    actionArea += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\')">';

    var h= '';
    var thisMonth = today.getMonth()+1; //January is 0!
    for(h = 1; h <= 12; h++){
        if(h != thisMonth){
            actionArea += `<option value="${h}">${h}월</option>`;
        }else{
            actionArea += `<option value="${h}" selected="selected">${h}월</option>`;
        }

    }
    actionArea += '</select>';
    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += '<span>이름,ID</span>';
    actionArea += '<select name="searchType">';
    actionArea += '<option value="searchUserName">수강생</option>';
    actionArea += '</select>';
    actionArea += '<input type="text" style="width:100px;margin-left:5px;" name="searchValue">';

    actionArea += '</div>';
    actionArea += '<div>';
    actionArea += '<span>과정명</span>';
    actionArea += '<input type="text" style="width:570px;" name="contentsName">';

    actionArea += '<span>페이지 수</span>';
    actionArea += '<select name="listCount" onchange="listCountUpdate(this.value)">';
    actionArea += '<option value="10">10개</option>';
    actionArea += '<option value="30">30개</option>';
    actionArea += '<option value="50">50개</option>';
    actionArea += '<option value="100">100개</option>';
    actionArea += '<option value="150">150개</option>';
    actionArea += '<option value="200">200개</option>';
    actionArea += '<option value="300">300개</option>';
    actionArea += '</select>';
    actionArea += '</div>';
    /*actionArea += '<div>';
    actionArea += '<span>과정명</span>';
    actionArea += '<select name="contentSel"></select>';
    actionArea += '</div>';*/
    actionArea += '<button type="submit" style="width:100%">검색</button>';
    actionArea += '</form></div>';
    $('#contents > h1').after(actionArea);
    // contentsPrint();

    //게시물 소팅부분
    var contents = '';
    contents += '<table><thead><tr>';
    contents += '<th style="width:310px;">과정명</th>';
    contents += '<th style="width:80px;">ID<br />이름</th>';
    contents += '<th style="width:80px;">담당자 이름</th>';
    contents += '<th style="width:250px;">사유</th>';
    contents += '<th style="width:250px;">본인여부 확인</th>';
    contents += '</tr></thead><tbody>'	;
    contents += '<tr><td class="notResult" colspan="13">검색값을 선택하세요.</td></tr>'	;
    contents += '</tbody></table>';
    $('#contentsArea').removeAttr('class');
    $('#contentsArea').addClass('BBSList');
    $('#contentsArea').html(contents);

    var checkDate = thisYear +'-'+thisMonth;
    searchStudy('lectureDay',checkDate)
}

function ajaxAct(sortDatas){
    loadingAct();
    sortDatas = sortDatas ? sortDatas : '';
    if(sortDatas != ''){
        sortData = sortDatas
    }
    let listAjax = $.get(useApi,'page='+page+'&list='+listCount+'&companyCode='+loginCompanyCode+sortData,function(data){
        totalCount = data.totalCount;
        let lists = '';
        let i = 1;
        if (totalCount > 0) {
            $.each(data.study, function (){
                lists += `<tr id="seq${i}">`;
                lists += `
                    <input type="hidden" name="lectureStart" value="${this.lectureStart}">
                    <input type="hidden" name="lectureEnd" value="${this.lectureEnd}">
                    <input type="hidden" name="contentsCode" value="${this.contentsCode}">
                    <input type="hidden" name="userID" value="${this.userID}">
                    <input type="hidden" name="lectureOpenSeq" value="${this.lectureOpenSeq}">
                `;
                lists += `<td>${this.contentsName}</td>`;
                lists += `<td>${this.userID}<br>${this.userName}</td>`;

                if (this.auth == 1) {
                    lists += `<td><input type="text" id="eduManager" name="eduManager" value="${this.eduManager}"
                                    style="background: #ecf0f1" readonly></td>`;
                    lists += '<td>';
                    lists += `<select id="reason" name="reason" onchange="displayInput('${i}')" disabled>`;
                    lists += '<option value="">선택</option>';
                    lists += '<option value="1"';
                    if (this.reason == 1) {
                        lists += ' selected'
                    }
                    lists += '>휴대폰 없음</option>';

                    lists += '<option value="2"';
                    if (this.reason == 2) {
                        lists += ' selected'
                    }
                    lists += '>핸드폰 명의가 다름</option>';

                    lists += '<option value="3"';
                    if (this.reason == 3) {
                        lists += ' selected'
                    }
                    lists += '>직접입력</option>';
                    lists += '</select>';

                    if (this.reason == 3) {
                        lists += `<input type="text" id="manualReason" name="manualReason" value="${this.manualReason}"
                                    style="display:inline-block; width: 200px; margin-left: 5px; background: #ecf0f1" readonly>`;
                    } else {
                        lists += '<input type="text" id="manualReason" name="manualReason" style="display:none; width: 200px; margin-left: 5px;">';
                    }

                    lists += '</td>';
                    lists += `<td><button type="button" onclick="include('${i}')">확인</button></td>`;
                    lists += '</tr>';
                } else if (this.auth == 0) {
                    lists += `<td><input type="text" id="eduManager" name="eduManager" value="${loginUserName}"></td>`;
                    lists += '<td>';
                    lists += `<select id="reason" name="reason" onchange="displayInput('${i}')">`;
                    lists += '<option value="">선택</option>';
                    lists += '<option value="1">휴대폰 없음</option>';
                    lists += '<option value="2">핸드폰 명의가 다름</option>';
                    lists += '<option value="3">직접입력</option>';
                    lists += '</select>';
                    lists += `<input type="text" id="manualReason" name="manualReason"
                                style="display:none; width: 200px; margin-left: 5px;">`;
                    lists += '</td>';
                    lists += `<td><button type="button" onclick="exclude('${i}', 'exclude')">미확인</button></td>`;
                    lists += '</tr>';
                }
                i++;
            })
        } else {
            lists += '<tr><td class="notResult" colspan="13">검색결과가 없습니다.</td></tr>'	;
        }


        $('.BBSList tbody').html(lists);
        pagerAct();
        loadingAct();
    })
}

//검색관련
function searchTypeSelect(types, searchDayType){

    $('.searchArea div.searchChangeArea select, .searchArea div.searchChangeArea input[type="text"], .searchArea div.searchChangeArea span').remove();
    var chageSearch =''
    if(types == 'searchDate'){
        chageSearch += '<select name="searchYear" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
        var today = new Date();
        var i= '';
        var thisYear = today.getFullYear();
        for(i= 2015; i <= thisYear; i++){
            if(i != thisYear){
                chageSearch += '<option>'+i+'년</option>';
            }else{
                chageSearch += '<option selected="selected">'+i+'년</option>';
            }

        }
        chageSearch += '</select>';
        chageSearch += '<select name="searchMonth" onchange="searchStudy(\'lectureDay\',\'\',\''+searchDayType+'\')">';
        var h= '';
        var thisMonth = today.getMonth()+1; //January is 0!
        for(h = 1; h <= 12; h++){
            if(h != thisMonth){
                chageSearch += '<option>'+h+'월</option>';
            }else{
                chageSearch += '<option selected="selected">'+h+'월</option>';
            }

        }
        chageSearch += '</select>';
    }else if(types == 'searchCompany'){
        chageSearch += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)">';
    }else if(types == 'searchAcademy'){
        chageSearch += '<span>지회구분</span>';
        chageSearch += '<select name="bigCountry">';
        chageSearch += '<option value="sjhy">세종</option>';
        chageSearch += '<option value="djhy">대전</option>';
        chageSearch += '<option value="cnhy">충남</option>';
        chageSearch += '<option value="cbhy">충북</option>';
        chageSearch += '<option value="kwhy">강원</option>';
        chageSearch += '<option value="jnhy">전남</option>';
        chageSearch += '</select>';
        chageSearch += '&nbsp;<input type="text" name="searchAcCompany">';
        chageSearch += '<select name="searchYear">';
        var today = new Date();
        var thisYear = today.getFullYear();
        for(i= 2015; i <= thisYear; i++){
            if(i != thisYear){
                chageSearch += '<option>'+i+'년</option>';
            }else{
                chageSearch += '<option selected="selected">'+i+'년</option>';
            }

        }
        chageSearch += '</select>'
        chageSearch += '<select name="searchMonth">';
        var h= '';
        var thisMonth = today.getMonth()+1; //January is 0!
        for(h = 1; h <= 12; h++){
            if(h != 1){
                chageSearch += '<option>'+h+'월</option>';
            }else{
                chageSearch += '<option selected="selected">'+h+'월</option>';
            }
        }
        chageSearch += '</select>';
    }
    $('.searchArea div.searchChangeArea').append(chageSearch)
    if(types == 'searchDate'){
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth()+1; //January is 0!
        if(thisMonth <= 9){
            thisMonth = '0'+thisMonth;
        }
        var checkDate = thisYear +'-'+thisMonth;
        searchStudy('lectureDay',checkDate,searchDayType)
    }
    //actionArea += '<input type="text" name="searchCompany" onkeyup="searchStudy(\'company\',this)" />'
}

function searchStudy(types,vals,searchDayType){
    if(searchDayType == '') {
        searchDayType = $('select[name="searchDayType"]').val();
    }
    if(types=='lectureDay'){
        $('select[name="lectureDay"], strong.noticeSearch, select[name="companyCode"]').remove();
        var dateChain = ''
        dateChain += $('select[name="searchYear"]').val().replace('년','') +'-';
        if(eval($('select[name="searchMonth"]').val().replace('월','')) < 10){
            dateChain += '0'+$('select[name="searchMonth"]').val().replace('월','');
        }else{
            dateChain += $('select[name="searchMonth"]').val().replace('월','');
        }
        $.get(chainsearchApi,{'searchMode':types, 'searchDay':dateChain, 'searchDayType':searchDayType},function(data){
            var selectWrite = ''
            if(data.totalCount !=0){
                selectWrite += '<select name="lectureDay" onChange="searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>';
                $.each(data.searchResult,function(){
                    selectWrite += '<option value="'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
                })
                selectWrite += '</select>'
            }else{
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="searchMonth"]').after(selectWrite)
        })
    }else if(types=='company'){
        $('select[name="companyCode"], strong.noticeSearch').remove();
        var searchName = vals.value
        if( searchName != ''&& searchName != ' ' ){
            $.get(chainsearchApi,{'searchMode':types, 'searchName':searchName},function(data){
                var selectWrite = ''
                if(data.totalCount !=0){
                    $('select[name="companyCode"]').remove();
                    selectWrite += '<select name="companyCode" onChange="searchStudy(\'printDate\',this);searchAct()">';
                    selectWrite += '<option value="">사업주를 선택하세요</option>'
                    $.each(data.searchResult, function(){
                        selectWrite += '<option value="'+this.searchCode+'">'+this.searchName+'&nbsp;|&nbsp;'+this.searchCode+'</option>';
                    })
                    selectWrite += '</select>'
                }else{
                    selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
                }
                $('input[name="searchCompany"]').after(selectWrite)

            })
        }else{
            $('.searchChangeArea select, strong.noticeSearch').remove();
        }
    }else if(types=='printCompany'){
        $('strong.noticeSearch, select[name="companyCode"],select[name="contentsCode"]').remove();
        var searchDate = vals.value
        $.get(chainsearchApi,{'searchMode':'study', 'lectureDay':searchDate},function(data){
            var selectWrite = ''
            if(data.totalCount !=0){
                selectWrite += '<select name="companyCode" onChange="searchStudy(\'printContents\',this);searchAct()">';
                selectWrite += '<option value="">사업주를 선택하세요</option>'
                $.each(data.searchResult,function(){
                    selectWrite += '<option value="'+this.companyCode+'/'+searchDate+'">'+this.companyName+'&nbsp;|&nbsp;'+this.companyCode+'</option>';
                })
                selectWrite += '</select>'
            }else{
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    }else if(types=='printContents'){
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var companyCode = vals.value;

        $.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode, 'type':'contents'},function(data){
            var selectWrite = ''
            if(data.totalCount !=0){
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult,function(){
                    selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
                })
                selectWrite += '</select>'
            }else{
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    }else if(types=='printDate'){
        $('select[name="lectureDay"], strong.noticeSearch, select[name="contentsCode"]').remove();
        var companyCode = vals.value;
        $.get(chainsearchApi,{'searchMode':'study', 'companyCode':companyCode},function(data){
            var selectWrite = ''
            if(data.totalCount !=0){
                selectWrite += '<select name="lectureDay" onChange="searchStudy(\'printContents2\',this);searchAct()">';
                selectWrite += '<option value="">기간을 선택해주세요</option>'
                $.each(data.searchResult,function(){
                    selectWrite += '<option value="'+companyCode+'/'+this.lectureStart+'~'+this.lectureEnd+'">'+this.lectureStart+'~'+this.lectureEnd+'</option>';
                })
                selectWrite += '</select>'
            }else{
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="companyCode"]').after(selectWrite)
        })
    }else if(types=='printContents2'){
        $('strong.noticeSearch, select[name="autoContentsCode"]').remove();
        var searchDate = vals.value;
        $.get(chainsearchApi,{'searchMode':'study', 'lectureDate':searchDate, 'type':'contents'},function(data){
            var selectWrite = ''
            if(data.totalCount !=0){
                selectWrite += '<select name="autoContentsCode" onChange="searchAct()">';
                selectWrite += '<option value="">과정을 선택해주세요</option>'
                $.each(data.searchResult,function(){
                    selectWrite += '<option value="'+this.contentsCode+'">'+this.contentsName+'</option>';
                })
                selectWrite += '</select>'
            }else{
                selectWrite += '<strong class="noticeSearch price">&nbsp;&nbsp;&nbsp;검색결과가 없습니다.</option>'
            }
            $('select[name="lectureDay"]').after(selectWrite)
        })
    }
}

function selectOption(seq, val) {
    const reason = document.querySelector(`#seq${seq} #reason`);
    if (val > 1) {
        reason.options[val-1].selected = true;
    }

}

function displayInput(seq) {
    const reason = document.querySelector(`#seq${seq} #reason`);
    const manualReason = document.querySelector(`#seq${seq} #manualReason`);

    if (reason.value == '3') {
        manualReason.style.display = "inline-block";
    } else {
        manualReason.style.display = "none";
    }
}

function validate(seq) {
    const eduManager = document.querySelector(`#seq${seq} #eduManager`);
    const reason = document.querySelector(`#seq${seq} #reason`);
    const manualReason = document.querySelector(`#seq${seq} #manualReason`);

    if (eduManager.value.replaceAll(' ', '').length < 2) {
        alert("담당자명을 확인해주세요.");
        return false;
    }

    if (reason.value == '') {
        alert("사유를 선택해주세요.");
        return false;
    }

    if (reason.value == '3' && manualReason.value.replaceAll(' ', '').length < 4) {
        alert("사유는 4글자 이상 입니다.");
        return false;
    }

    return true;
}

function include(seq) {
    if (!confirm("확인 해제 하시겠습니까? ")) return false;

    const lectureStart = document.querySelector(`#seq${seq} input[name=lectureStart]`);
    const lectureEnd = document.querySelector(`#seq${seq} input[name=lectureEnd]`);
    const contentsCode = document.querySelector(`#seq${seq} input[name=contentsCode]`);
    const userID = document.querySelector(`#seq${seq} input[name=userID]`);

    const formData = new FormData();
    formData.append('userID', userID.value);
    formData.append('lectureStart', lectureStart.value);
    formData.append('lectureEnd', lectureEnd.value);
    formData.append('contentsCode', contentsCode.value);

    fetch(useApi, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString(),
    })
        .then( res => res.json())
        .then(data => {
            if (data.result === 'success') {
                alert(data.message);
                ajaxAct();
            } else if (data.result === 'error') {
                alert(data.message);
            }
        })
        .catch( () => {
            alert("오류가 발생했습니다.");
        })
}

function exclude(seq) {
    if (!validate(seq)) return false;

    if (!confirm("본인 여부 확인하시겠습니까?")) return false;

    const eduManager = document.querySelector(`#seq${seq} #eduManager`);
    const reason = document.querySelector(`#seq${seq} #reason`);
    const manualReason = document.querySelector(`#seq${seq} #manualReason`);
    const lectureStart = document.querySelector(`#seq${seq} input[name=lectureStart]`);
    const lectureEnd = document.querySelector(`#seq${seq} input[name=lectureEnd]`);
    const contentsCode = document.querySelector(`#seq${seq} input[name=contentsCode]`);
    const userID = document.querySelector(`#seq${seq} input[name=userID]`);
    const lectureOpenSeq = document.querySelector(`#seq${seq} input[name=lectureOpenSeq]`);

    const formData = new FormData();
    formData.append('userID', userID.value);
    formData.append('eduManager', eduManager.value);
    formData.append('reason', reason.value);
    formData.append('manualReason', manualReason.value);
    formData.append('lectureStart', lectureStart.value);
    formData.append('lectureEnd', lectureEnd.value);
    formData.append('contentsCode', contentsCode.value);
    formData.append('lectureOpenSeq', lectureOpenSeq.value);

    fetch(useApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString(),
    })
        .then( res => res.json())
        .then( data => {
            if (data.result === 'success') {
                alert(data.message);
                ajaxAct();
            } else if (data.result === 'error') {
                alert(data.message);
            }
        })
        .catch( () => {
            alert("오류가 발생했습니다.");
        })
}



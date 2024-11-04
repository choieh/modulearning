//보드 정보 선언
var sortData = '';
var useApi = '../api/apiCalculateInfo.php';
var categoryApi = '../api/apiCategory.php';
var chainsearchApi = '../api/apiSearch.php';
var totalCount = 0;
var seq = seq ? seq : '' ;
var page = page ? page : 1;

function listAct(page){
    //상단 액션 부분
    var actionArea='';
    $.get(categoryApi,{'value01':'lectureCode'},function(data){
        var sort01='';
        var today = new Date();

        actionArea += '<div class="searchArea"><form class="searchForm" action="javascript:searchAct()"  >';
        actionArea += '<div class="searchChangeArea">'
        actionArea += '<span>지급년월</span>&nbsp;&nbsp;&nbsp;';
        actionArea += '<select name="searchYear">';
        var i= '';
        var thisYear = today.getFullYear();
        for(i= 2015; i <= thisYear; i++){
            if(i != thisYear){
                actionArea += '<option value='+i+'>'+i+'년</option>';
            }else{
                actionArea += '<option value='+i+' selected="selected">'+i+'년</option>';
            }
        }
        actionArea += '</select>';
        actionArea += '<select name="searchMonth">';
        var h= '';
        var thisMonth = today.getMonth()+1; //January is 0!
        for(h = 1; h <= 12; h++){
            if(h != thisMonth){
                actionArea += '<option value='+h+'>'+h+'월</option>';
            }else{
                actionArea += '<option value='+h+' selected="selected">'+h+'월</option>';
            }

        }
        actionArea += '</select>';
        actionArea += '</div>';
        actionArea += '<div>';
        actionArea += '<span>영업담당자</span><input type="text" name="marketer"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        actionArea += '<button style="margin-right:10px; padding: 0px 15px;" type="submit">검색</button>';
        actionArea += '<a href="../attach/docs/정산업로드.xlsx" download><button type="button">양식 다운로드</button></a>';

        actionArea += '</div>';
        actionArea += '</form></div>';
        actionArea += '<div id="fileUpload">';
        actionArea += '<h2>환급파일 업로드</h2>'
        actionArea += '<form class="fileUploadform" method="post" action="uploadCalculateInfo.php" enctype="multipart/form-data" style="margin-bottom:16px;">';
        actionArea += '<ul>';
        actionArea += '<li>';
        actionArea += '<h1>파일등록</h1>';
        actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
        actionArea += '&nbsp;&nbsp;<span style="color: red;">* 파일 업로드 시에 수식 삭제 및 서식 텍스트로 변환해야 합니다.</span>';
        actionArea += '</li>';
        actionArea += '</ul>';
        actionArea += '</form>';
        actionArea += '<h2>비환급파일 업로드</h2>'
        actionArea += '<form class="fileUploadform" method="post" action="uploadCalculateInfo2.php" enctype="multipart/form-data" style="margin-bottom:16px;">';
        actionArea += '<ul>';
        actionArea += '<li>';
        actionArea += '<h1>파일등록</h1>';
        actionArea += '<input type="file" name="uploadFile" />&nbsp;<button type="submit" onClick="loadingAct();">파일업로드</button>';
        actionArea += '&nbsp;&nbsp;<span style="color: red;">* 파일 업로드 시에 수식 삭제 및 서식 텍스트로 변환해야 합니다.</span>';
        actionArea += '</li>';
        actionArea += '</ul>';
        actionArea += '</form>';
        actionArea += '</div>';
        actionArea += '<script type="text/javascript" src="../js/jquery.form.min.js"></script>';
        $('#contents > h1').after(actionArea);
        $('#contents').removeAttr('class');
        $('#contents').addClass('BBSWrite');

        //게시물 소팅부분
        var contents = '';
        contents += '<div class="scrollArea" style="min-width:1360px; height:900px; overflow:auto; white-space:nowrap">';
        contents += '<table style=""><thead><tr>';
        // contents += '<th style="width:40px;">보기</th>';
        contents += '<th style="width:40px;">번호</th>';
        contents += '<th style="width:40px;">고유번호</th>';
        contents += '<th style="width:200px;">학습날짜</th>';
        contents += '<th style="width:200px;">회사명</th>';
        contents += '<th style="width:200px;">과정명</th>';
        contents += '<th style="width:100px;">영업자</th>';
        contents += '<th style="width:100px;">산인공 확정 환급액</th>';
        contents += '<th style="width:100px;">총 비용 환급액</th>';
        contents += '<th style="width:100px;">비용신청일</th>';
        contents += '<th style="width:100px;">비용지급일</th>';
        contents += '<th style="width:70px;">계약관계자</th>';
        contents += '<th style="width:70px;">영업자 수수료율</th>';
        contents += '<th style="width:70px;">소개자 수수료율</th>';
        contents += '<th style="width:100px;">영업자 수수료</th>';
        contents += '<th style="width:100px;">소개자 수수료</th>';
        contents += '</tr></thead><tbody>'	;
        contents += '<tr><td class="notResult" colspan="50">검색값을 선택하세요.</td></tr>'	;
        contents += '</tbody></table>';

        $('#contentsArea').removeAttr('class');
        $('#contentsArea').addClass('BBSList');
        $('#contentsArea').html(contents);
        var thisYear = today.getFullYear();
        var thisMonth = today.getMonth()+1; //January is 0!
        if(thisMonth <= 9){
            thisMonth = '0'+thisMonth;
        }
        var checkDate = thisYear +'-'+thisMonth;
    })
}


function ajaxAct(sortData){
    loadingAct();
    sortData = sortData ? sortData : '';
    var listAjax = $.get(useApi,'page='+page+sortData, function(data){
        totalCount = data.totalCount;
        var lists = '';
        var i = 1;
        if(totalCount != 0){
            $.each(data.cal, function(){
                lists += `<tr onclick="paymentStatement('${this.marketerName}')">`;
                // lists += `<td><button onclick="viewAct(${this.seq})">상세보기</button></td>`;
                lists += `<td>${i}</td>`;
                lists += `<td>${this.excelSeq}</td>`;
                lists += `<td>${this.lectureStart}~${this.lectureEnd}</td>`;
                lists += `<td>${this.companyName}</td>`;
                lists += `<td>${this.contentsName}</td>`;
                lists += `<td>${this.marketerName}</td>`;
                lists += `<td>${Number(this.hrdReturnPrice).toLocaleString('ko-KR')}</td>`;
                lists += `<td>${Number(this.totalReturnPrice).toLocaleString('ko-KR')}</td>`;
                lists += `<td>${this.costApplyDate}</td>`;
                lists += `<td>${this.costPayDate}`;
                if(this.costPayGroup != ''){
                    lists += `/${this.costPayGroup}`;
                }
                lists += '</td>';
                lists += `<td>${this.contractParty}</td>`;
                lists += `<td>${this.marketerCmsPer}%</td>`;
                lists += `<td>${this.recommenderCmsPer}%</td>`;
                lists += `<td>${Number(this.marketerCms).toLocaleString('ko-KR')}</td>`;
                lists += `<td>${Number(this.recommenderCms).toLocaleString('ko-KR')}</td>`;
                lists += '</tr>'
                i++;
            });
            $('.BBSList tbody').html(lists);
            loadingAct();
        } else {
            alert('검색 결과가 없습니다.');
            loadingAct();
        }
    });
}

function paymentStatement(marketer){
    var searchYear = document.getElementsByName('searchYear')[0].value;
    var searchMonth = document.getElementsByName('searchMonth')[0].value;

    window.open(`paymentStatement.php?marketer=${marketer}&searchYear=${searchYear}&searchMonth=${searchMonth}`);
}










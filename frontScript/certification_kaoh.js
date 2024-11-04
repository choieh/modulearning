var useApi = '/api/apiKaohCert.php';

function listAct() {
    let actionArea = '';

    actionArea += '<div class="search_box">';
    actionArea += '<form class="searchForm" action="javascript:searchAct()">';
    actionArea += `<input type="hidden" name="companyCode" value="${loginCompanyCode}">`
    actionArea += '<ul><li class="searchChangeArea">';
    actionArea += '<p>';
    actionArea += '<input type="radio" name="selectSearch" id="searchDate" value="searchDate" class="m_right10" checked="checked" onChange="searchTypeSelect(this.value)"/>';
    actionArea += '<label for="searchDate">기간검색</label><span class="bg_line"></span>';
    actionArea += '</p>';

    actionArea += '<p>';
    actionArea += '<div class="search_group1">';
    actionArea += '<select name="searchYear" class="width100 m_right10">';
    var i = '';
    var today = new Date();
    var thisYear = today.getFullYear();
    for (i = 2015; i <= thisYear; i++) {
        if (i != thisYear) {
            actionArea += '<option>' + i + '년</option>';
        } else {
            actionArea += '<option selected="selected">' + i + '년</option>';
        }
    }
    actionArea += '</select>'
    actionArea += `<a style="display: inline-block; text-align: center;
        background-color: #61564b; color:white; width:100px; padding: 9px 10px" href="javascript:searchAct()">검색하기</a>`
    actionArea += '</p></li>'
    actionArea += '<p class="btn_004 width180"></p>';
    actionArea += '</form></div>';

    $('.admin_tab').after(actionArea);

    var contents = '';
    contents += '<div class="admin_table">';
    contents += '<table cellpadding="0" cellspacing="0" width="100%" class="BBSList">';
    contents += '<colgroup>';
    contents += '<col width="40%"/>';
    contents += '<col width="15%"/>';
    contents += '<col width="15%"/>';
    contents += '<col width="15%"/>';
    contents += '<col width="15%"/>';
    contents += '</colgroup>';

    contents += '<thead><tr>';
    contents += '<th>과정명</th>';
    contents += '<th>수강인원</th>';
    contents += '<th>수료인원</th>';
    contents += '<th>미수료인원</th>';
    contents += '<th>수료증</th>';

    contents += '</tr></thead><tbody>'	;
    contents += '<tr><td class="notResult" colspan="8">검색값을 선택하세요.</td></tr>';
    contents += '</tbody></table>';
    contents += '</div>';

    $('.search_box').after(contents);
}

function ajaxAct(sortDatas) {
    sortDatas = sortDatas ? sortDatas : '';
    if(sortDatas != ''){
        sortData = sortDatas
    }

    var listAjax = $.get(useApi,'page='+page+'&list='+listCount+sortData,function(data){
        var lists = '';
        if (data.result == 'success') {
            if (data.data.length > 0) {
                $.each(data.data, function(){
                    lists += '<tr>';
                    lists += `<td>${this.contentsName}</td>`;
                    lists += `<td>${this.studyUser}명</td>`;
                    lists += `<td>${this.passOkUser}명</td>`;
                    lists += `<td>${this.passNotUser}명</td>`;
                    lists += `<td><button type="button" onclick="printCertification('${this.contentsCode}')">수료증</button></td>`;
                    lists += '</tr>';
                })
            }

            if (data.data.length == 0) {
                lists += '<tr><td class="notResult" colspan="12">검색 결과가 없습니다.</td></tr>'
            }

        }

        if (data.result == 'error') {
            lists += '<tr><td class="notResult" colspan="12">오류가 발생했습니다.</td></tr>'
        }

        $('.BBSList tbody').html(lists);
    })
}

function printCertification(contentsCode) {
    window.open(`/admin/certificateNew.php?${searchValue}&contentsCode=${contentsCode}`, '_blank');
}
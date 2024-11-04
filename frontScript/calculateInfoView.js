//게시판 보기 스크립트 시작
function viewAct(writeSeq){
    writeSeq = writeSeq ? writeSeq : '';
    seq = writeSeq //파일관련 스크립트 사용

    //상단메뉴
    $('.searchArea').remove();
    $('#fileUpload').remove();
    var type = '';
    if(pageMode == 'adminPage'){
        type='admin';
    }

    viewAjax = $.get(useApi,{'seq':seq},function(data){
        var writes ='';
        var attachURL = data.attachURL
        $.each(data.cal,function(){

            //입력영역 시작
            writes += '<div class="titleArea">';


            writes += '</div>'
            writes += '<div class="BBSContents">';

            writes += '</div>'
            writes += '<div class="btnArea">';
            writes += '<button type="button" onClick="listAct('+page+')">목록으로</button>';
            writes += '</div>';
        })
        $('#wrap').removeClass('study')
        $('#contentsArea').removeAttr('class')
        $('#contentsArea').addClass('BBSView')
        $('#contentsArea').html(writes);
    });
}

$(document).ready(function(){
    newNotice();
    newContents();
});

function newNotice(){
	$.get('/api/apiBoard.php',{'boardCode':'1','list':'5'},function(data){
		var lists = ''
		$.each(data.board, function(){
			lists += '<li onClick="top.location.href=\'/bbs/?boardCode=1&seq='+this.seq+'\'">'
			lists += '<h1>'+this.subject+'</h1>';
			lists += this.inputDate.substr(0,10);
			lists += '</li>'
		})
		//alert(lists)
		$('.BBSArea ul').html(lists)
	})
}

function newContents(){
	
}
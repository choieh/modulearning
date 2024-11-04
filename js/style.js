$(document).ready(function(){
	$('.path_list > li:last-child').addClass('last');
	$('.info_btn > li:first-child').addClass('first');
	$('table.buy_book tbody tr:last-child td').addClass("last");
	$('.faq > dt > a').click(function(){
		$(this).parent().parent().toggleClass('on');
		$(this).parent().next('dd').slideToggle('fast');
	});
/*	
	$('#find_postcode').click(function(){
	var hg = $("#wrap").height();
		$('#pop_bg').css("height", hg).show();

		window.onkeydown = function(event) {
			if(event.keyCode == 27) {
				$('#post_pop').hide();
			}
		}

	});
	$('.pop_closed').click(function(){
		$('#pop_bg').hide();
	});
*/	
/*
	$('.horizontal_list > li > .img_box > a').mouseover(function(){
		$(this).children("span.show").slideDown()
	});
	$('.horizontal_list > li > .img_box > a').mouseleave(function(){
		$(this).children("span.show").stop().slideUp()
	});
*/
	$('.tab_con_wrap > div.tab_con').hide();
	$('.tab_con_wrap > div.tab_con').eq(0).show();
	$('ul.tab_tt > li > a').each(function(i){
		$(this).click(function(event){
			$('ul.tab_tt > li').removeClass('on');
			$(this).parent().addClass('on');
			var $section = $('div.tab_con_wrap').children('div.tab_con');
			$section.each(function(){
				$(this).hide();
				$section.eq(i).show();
			});
		});
	});
});
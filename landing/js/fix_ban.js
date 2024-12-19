// main
$(function(){
	
    // 띠배너 고정,해제
    var $target_box = $('.wrap_in');
    var $fix_banner = $('.fix-banner');
    $(window).scroll(function() {
        var target_box_bottom = $target_box.offset().top + $target_box.height();
        var target_y = target_box_bottom + $fix_banner.height();
        var curr_y = $(window).height() + $(document).scrollTop();

        if (curr_y >= target_y) {
            $fix_banner.addClass('no-fix');
        } else {
            $fix_banner.removeClass('no-fix');
        }
    });
    // 띠배너 닫기
    $('#fix_banner_close').on('click', function(e) {
        e.preventDefault();
        $('#ft').addClass('is-top-layer');
        if ($fix_banner.hasClass('no-fix')) {
            $fix_banner.addClass('fix2');
        } else {
           $fix_banner.addClass('fix2');
        }
        setCookie('fix_banner_hide', 1, 1);
    });

	$('.fix_open').on('click', function(e) {
        
            $fix_banner.removeClass('fix2');
        
    });

	$(window).ready(function() {
		//setTimeout(page_scroll, 700);
	});
});

function videoIframeInit() {
    // video 높이 비율에 맞게 세팅
    var $videoIframe = document.getElementById('video');
    var responsiveHeight = $videoIframe.offsetWidth * 0.5625;
    $videoIframe.setAttribute('height', responsiveHeight);

    //브라우저 리사이즈 시 iframe 높이값 비율에 맞게 세팅
    window.addEventListener('resize', function () {
        responsiveHeight = $videoIframe.offsetWidth * 0.5625;
        $videoIframe.setAttribute('height', responsiveHeight);
    });
}




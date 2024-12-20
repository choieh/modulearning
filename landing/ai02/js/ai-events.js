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

// .fix-banner가 .footer에 도달했을 때 위치 조정
function updateFixBannerPosition() {
    const fixBanner = document.querySelector('.fix-banner');
    const footer = document.querySelector('footer');
    if (!fixBanner || !footer) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const footerOffset = footer.offsetTop;
    const bannerHeight = fixBanner.offsetHeight;
    const windowHeight = window.innerHeight;
    const translateX = `-50%`;

    if (scrollY + windowHeight >= footerOffset) {
        const overlap = scrollY + windowHeight - footerOffset;
        fixBanner.style.transform = `translateY(-${overlap}px) translateX(${translateX})`;
    } else {
        fixBanner.style.transform = `translateY(0) translateX(${translateX})`;
    }
}

// 초기 실행
updateFixBannerPosition();

// 스크롤 이벤트에 연결
window.addEventListener('scroll', updateFixBannerPosition);
// 리사이즈 이벤트에도 연결하여 창 크기 변경 시에도 대응
window.addEventListener('resize', updateFixBannerPosition);



var swiperClasses = [".customSwiper1", ".customSwiper2", ".customSwiper3"];
var swiperContents = [
    {
        customSwiper1: [
            {
                name: "AI-HUMAN 영상제작 서비스",
                url: "https://modulearning.kr/landing/ai02/",
                imgSrc: "/images/common/main_banner_01.png"
            },
            {
                name: "관리감독자교육",
                url: "https://modulearning.kr/landing/manager-edu/",
                imgSrc: "/images/common/main_banner_02.png"
            },
            {
                name: "법정의무교육",
                url: "https://modulearning.kr/landing/legal-edu/",
                imgSrc: "/images/common/main_banner_03.png"
            },
            {
                name: "모두의러닝 파트너&모두의러닝 메이트 모집",
                url: "https://modulearning.kr/landing/mate/",
                imgSrc: "/images/common/main_banner_04.png"
            }
        ],
        customSwiper2: [
            {
                type: "비환급",
                title: '[모두의 TALK]'+'<br>'+'정성호의 리얼 법정교육토크쇼',
                desc: "천의 목소리를 가진 SNL크루 정성호와 상큼발랄 매력만점 박하윤 아나운서가 함께하는 직장인 리얼 토크쇼!",
                cource: [
                    {
                        name: "개인정보보호교육",
                        url: ""
                    },
                    {
                        name: "직장 내 괴롭힘 예방교육",
                        url: ""
                    },
                    {
                        name: "직장 내 장애인 인식개선교육",
                        url: ""
                    },
                    {
                        name: "직장 내 성희롱 예방교육",
                        url: ""
                    },
                ]
            },
            {
                type: "비환급",
                title: '[모두의 TALK]'+'<br>'+'정성호의 리얼 법정교육토크쇼',
                desc: "천의 목소리를 가진 SNL크루 정성호와 상큼발랄 매력만점 박하윤 아나운서가 함께하는 직장인 리얼 토크쇼!",
                cource: [
                    {
                        name: "개인정보보호교육",
                        url: ""
                    },
                    {
                        name: "직장 내 괴롭힘 예방교육",
                        url: ""
                    },
                    {
                        name: "직장 내 장애인 인식개선교육",
                        url: ""
                    },
                    {
                        name: "직장 내 성희롱 예방교육",
                        url: ""
                    },
                ]
            }
        ],
        customSwiper3: [
            {
                type: "사업주환급",
                name: "소통과 공감으로 조질을 활성화하라",
                total: "19", //총 차시
                time: "20", // 학습시간
                cost: "123,200", // 비용
                url: "",
                imgSrc: "/images/common/card_01.png"
            },
            {
                type: "사업주환급",
                name: "일잘러들의 업무파트너, 쳇GPT 스마트하게 일하라",
                total: "19", //총 차시
                time: "20", // 학습시간
                cost: "123,200", // 비용
                url: "",
                imgSrc: "/images/common/card_02.png"
            },
            {
                type: "사업주환급",
                name: "VUCA 시대 빛나는 코칭리더쉽",
                total: "19", //총 차시
                time: "20", // 학습시간
                cost: "123,200", // 비용
                url: "",
                imgSrc: "/images/common/card_03.png"
            },
            {
                type: "사업주환급",
                name: "IT 세일즈 마스터의 시장 분석과 고객중심 비지니스 전략",
                total: "19", //총 차시
                time: "20", // 학습시간
                cost: "123,200", // 비용
                url: "",
                imgSrc: "/images/common/card_04.png"
            },
        ],
        customSwiper4: [
            {
                companyLogo: "/images/common/logo.jpg",
                user: "1교육담당자",
                review: "실제 업무를 할 때 필요한 업무들에 대해 자세히 내용이 구성되어 있어서 좋았습니다. 적극 추천합니다."
            },
            {
                companyLogo: "/images/common/logo.jpg",
                user: "2교육담당자",
                review: "실제 업무를 할 때 필요한 업무들에 대해 자세히 내용이 구성되어 있어서 좋았습니다. 적극 추천합니다."
            },
            {
                companyLogo: "/images/common/logo.jpg",
                user: "3교육담당자",
                review: "실제 업무를 할 때 필요한 업무들에 대해 자세히 내용이 구성되어 있어서 좋았습니다. 적극 추천합니다."
            },
            {
                companyLogo: "/images/common/logo.jpg",
                user: "4교육담당자",
                review: "실제 업무를 할 때 필요한 업무들에 대해 자세히 내용이 구성되어 있어서 좋았습니다. 적극 추천합니다."
            },
        ]
    }
];

const swiperWrapper1 = document.querySelector(".customSwiper1 .swiper-wrapper");
const swiperWrapper2 = document.querySelector(".customSwiper2 .swiper-wrapper");
const swiperWrapper3 = document.querySelector(".customSwiper3 .swiper-wrapper");

function customSwiper1() {
    swiperContents[0].customSwiper1.forEach(item => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        
        slide.innerHTML = `
            <a href="${item.url}" target="_blank" style="background: url(${item.imgSrc}) no-repeat center / cover;">
                <img src="${item.imgSrc}" alt="${item.name}" style="visibility: hidden;" />
            </a>
        `;
        
        swiperWrapper1.appendChild(slide);
    });
}

function customSwiper2() {
    swiperContents[0].customSwiper2.forEach(item => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
    
        slide.innerHTML = `
            <div class="slide-content">
                <div class="thumbnail">
                    <ul class="thumbnail__list">
                        ${item.cource.map(() => `
                            <li class="thumbnail__item">
                                <img src="/images/common/thumnail_test.png" alt="${item.title}">
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="contents">
                    <div class="badge__wrap">
                        <span class="badge">${item.type}</span>
                    </div>
                    <div class="contents__info">
                        <strong class="contents__title">${item.title}</strong>
                        <p class="contents__desc">${item.desc}</p>
                        <a href="javascript:void(0);" class="btn-more">더보기+</a>
                        <ul class="lecture__list">
                            ${item.cource.map(course => `
                                <li class="lecture__item">
                                    <a href="${course.url}" class="lecture__link">${course.name}</a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        swiperWrapper2.appendChild(slide);
    });
}

function customSwiper3() {
    swiperContents[0].customSwiper3.forEach(item => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        
        slide.innerHTML = `
            <div class="slide-content">
                <div class="card">
                    <div class="card__thumbnail">
                        <img src="${item.imgSrc}" alt="${item.name}">
                    </div>
                    <div class="card__body">
                        <ul class="badge__wrap">
                            <li><span class="badge">${item.type}</span></li>
                        </ul>
                        <p class="card__title">${item.name}</p>
                        <dl class="card__detail">
                            <div class="card__item total">
                                <dt>총차시</dt>
                                <dd>${item.total}차시</dd>
                            </div>
                            <div class="card__item time">
                                <dt>학습시간</dt>
                                <dd>${item.time}시간</dd>
                            </div>
                            <div class="card__item cost">
                                <dt>교육비</dt>
                                <dd>${item.cost}원</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        `;
        
        swiperWrapper3.appendChild(slide);
    });
}

customSwiper1();
customSwiper2();
customSwiper3();

swiperClasses.forEach(swiperClass => {

    let options = {};
    if(swiperClass.includes('.customSwiper3')) {
        options = {
            slidesPerView: 4,
            spaceBetween: 0,
            loop: true,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    } else {
        options = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            // autoplay: {
            //     delay: 5000,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    }

    new Swiper(swiperClass, options);
});


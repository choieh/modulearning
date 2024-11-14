var sitemapCource = [
    {
        title : "산업특화교육",
        detail: [
            {
                name: "경비원직무교육",
                url: ""
            },
            {
                name: "의료기관과정",
                url: ""
            },
            {
                name: "영유아교사과정",
                url: ""
            },
            {
                name: "스틸전문과정",
                url: ""
            },
            {
                name: "전문직과정",
                url: ""
            },
        ]
    },
    {
        title : "직급별교육",
        detail: [
            {
                name: "경영리더쉽과정",
                url: "",
                subDetail: [
                    {
                        name: "공통가치",
                        url: ""
                    },
                    {
                        name: "경영전략",
                        url: ""
                    },
                    {
                        name: "CS",
                        url: ""
                    },
                    {
                        name: "마케팅",
                        url: ""
                    },
                    {
                        name: "리더쉽",
                        url: ""
                    },
                    {
                        name: "인사노무",
                        url: ""
                    },
                    {
                        name: "재무회계",
                        url: ""
                    },
                    {
                        name: "경영일반",
                        url: ""
                    },
                    {
                        name: "경제학",
                        url: ""
                    },
                    {
                        name: "투자",
                        url: ""
                    },
                    {
                        name: "성과관리",
                        url: ""
                    },
                    {
                        name: "4차산업혁명",
                        url: ""
                    },
                ]
            },
            {
                name: "업무스킬과정",
                url: ""
            },
            {
                name: "일반직무과정",
                url: ""
            },
            {
                name: "소양과정",
                url: ""
            },
        ]
    },
    {
        title : "트렌디교육",
        detail: [
            {
                name: "IT과정",
                url: ""
            },
            {
                name: "자격증과정",
                url: ""
            },
            {
                name: "외국어과정",
                url: ""
            },
            {
                name: "디지털융합과정",
                url: ""
            },
        ]
    },
];

function displaySitemap() {
    const sitemapBody = document.querySelector('.sitemap__body');

    sitemapCource.forEach(courceItem => {
        const sitemapBox = document.createElement('div');
        const courceTitle = document.createElement('h3');
        const courceBody = document.createElement('ul');

        sitemapBox.classList.add('sitemap__box');
        courceTitle.classList.add('sitemap-cource__title');
        courceBody.classList.add('sitemap-cource__body');

        courceTitle.textContent = courceItem.title;

        sitemapBox.appendChild(courceTitle);

        if (courceItem.detail.length > 0) {
            courceItem.detail.forEach(detailItem => {
                const courceBodyItem = document.createElement('li');
                const courceLink = document.createElement('a');
                courceBodyItem.classList.add('sitemap-cource__item');
                courceLink.classList.add('sitemap-cource__link');

                courceLink.href = detailItem.url !== "" ? detailItem.url : 'javascript:void(0)';
                courceLink.textContent = detailItem.name;

                courceBodyItem.appendChild(courceLink);

                // subDetail이 존재하고 배열인 경우 처리
                if (detailItem.subDetail && Array.isArray(detailItem.subDetail)) {
                    const detailMenuList = document.createElement('ul');
                    detailMenuList.classList.add('sitemap-cource__detail');

                    detailItem.subDetail.forEach(subItem => {
                        const detailMenuItem = document.createElement('li');
                        const detailMenuLink = document.createElement('a');

                        detailMenuItem.classList.add('sitemap-detail__item');
                        detailMenuLink.classList.add('sitemap-detail__link');
                        detailMenuLink.href = subItem.url !== "" ? subItem.url : 'javascript:void(0)';
                        detailMenuLink.textContent = subItem.name;

                        detailMenuItem.appendChild(detailMenuLink);
                        detailMenuList.appendChild(detailMenuItem);
                    });
                    courceBodyItem.appendChild(detailMenuList);
                }

                courceBody.appendChild(courceBodyItem);
            });
        }

        sitemapBox.appendChild(courceBody);
    sitemapBody.append(sitemapBox);

    });
}
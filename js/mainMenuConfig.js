var mainMenu = [
    {
        title: "교육원소개",
        detail: [
            {
                name: "소개",
                url: ""
            },
            {
                name: "인증",
                url: ""
            },
            {
                name: "찾아오는길",
                url: ""
            }
        ]
    },
    {
        title: "법정의무교육",
        detail: [
            {
                name: "법정의무교육",
                url: ""
            }
        ]
    },
    {
        title: "정부지원교육",
        detail: [
            {
                name: "기업직업훈련카드",
                url: ""
            },
            {
                name: "사업주환급",
                url: ""
            }
        ]
    },
    {
        title: "학습지원센터",
        detail: [
            {
                name: "공지사항",
                url: ""
            },
            {
                name: "자주묻는질문",
                url: ""
            },
            {
                name: "뷰어다운로드",
                url: ""
            },
            {
                name: "PC원격지원",
                url: ""
            },
        ]
    },
    {
        title: "나의강의실",
        detail: [
            {
                name: "진행중인과정",
                url: ""
            },
            {
                name: "재응시과정",
                url: ""
            },
            {
                name: "학습종료과정",
                url: ""
            },
            {
                name: "상담신청내역",
                url: ""
            },
            {
                name: "토론게시판",
                url: ""
            },
            {
                name: "나만의 학습노트",
                url: ""
            },
            {
                name: "개인/추가결제",
                url: ""
            },
        ]
    }
];

function displayMainMenu() {
    const mainMenuBody = document.querySelector('.main-menu__body');
    const mainMenuList = document.createElement('ul');

    mainMenu.forEach(menuItem => {
        const mainMenuListItem = document.createElement('li');
        const mainMenuTitle = document.createElement('a');

        mainMenuList.classList.add('main-menu__list');
        mainMenuTitle.classList.add('main-menu__title');
        mainMenuTitle.href = 'javascript:void(0)';
        mainMenuTitle.textContent = menuItem.title;

        mainMenuListItem.appendChild(mainMenuTitle);

        if (menuItem.detail.length > 0) {
            const subMenuList = document.createElement('ul');
            subMenuList.classList.add('sub-menu__list');

            menuItem.detail.forEach(subItem => {
                const subMenuListItem = document.createElement('li');

                const subMenuLink = document.createElement('a');
                subMenuLink.classList.add('sub-menu__link');
                subMenuLink.href = subItem.url !== "" ? subItem.url : 'javascript:void(0)';
                subMenuLink.textContent = subItem.name;

                subMenuListItem.appendChild(subMenuLink);
                subMenuList.appendChild(subMenuListItem);
            });

            mainMenuListItem.appendChild(subMenuList);
            mainMenuList.appendChild(mainMenuListItem);

        }
    });
    mainMenuBody.append(mainMenuList);
}
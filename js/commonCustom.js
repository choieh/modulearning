window.onload = (event) => {
    displayMainMenu();
    displaySitemap();
    toggleSitemap();
    customSelectBox();
    popup();
    thumbnailView();
    checkboxAll();
    initDateRangePicker();
    initRefundReason();
    initMypageLnb();
};

function toggleSitemap() {
    const sitemapBtn = document.querySelector('.sitemap-edu__button');
    const btnClose = document.querySelector('.btn--close');
    const sitemapArea = document.querySelector('.sitemap-edu');

    if (!sitemapBtn || !btnClose || !sitemapArea) {
        return;
    }

    sitemapBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!sitemapArea.classList.contains('is-active')) {
            sitemapArea.classList.add('is-active');
        }
    });

    btnClose.addEventListener('click', () => {
        if (sitemapArea.classList.contains('is-active')) {
            sitemapArea.classList.remove('is-active');
        }
    });
}

function customSelectBox() {
    const selectButton = document.querySelector('.cost__btn--select');
    const dropdown = document.querySelector('.cost__list');
    
    if (!selectButton || !dropdown) {
        return;
    }

    const options = document.querySelectorAll('.cost__list--item');
    
    if (!options.length) {
        return;
    }

    selectButton.addEventListener('click', () => {
        const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
        selectButton.setAttribute('aria-expanded', !isExpanded);
        dropdown.style.display = isExpanded ? 'none' : 'block';
    });

    options.forEach(option => {
        option.addEventListener('click', (event) => {
            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));

            const selectedOption = event.target.closest('.cost__list--item');
            if (!selectedOption) return;
            
            selectedOption.setAttribute('aria-selected', 'true');

            selectButton.textContent = selectedOption.textContent;

            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.style.display = 'none';
        });
    });

    document.addEventListener('click', (event) => {
        if (!selectButton.contains(event.target) && !dropdown.contains(event.target)) {
            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.style.display = 'none';
        }
    });
}

function popup() {
    const popup = document.querySelector('.popup');
    const popupClose = document.querySelector('.popup__close');
    const btnSub = document.querySelector('.btn--sub');

    if (!popup || !popupClose || !btnSub) {
        return;
    }

    btnSub.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

function thumbnailView() {
    const thumbnails = document.querySelectorAll('.thumbnail--sm img');
    const largeImage = document.getElementById('lgImg');

    if (!thumbnails.length || !largeImage) {
        return;
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            largeImage.src = thumbnail.src;
            largeImage.alt = thumbnail.alt;
        });
    });
}

function checkboxAll() {
    const checkAllBox = document.getElementById("check-all");
    
    if (!checkAllBox) {
        return;
    }

    checkAllBox.addEventListener("change", function(event) {
        const isChecked = event.target.checked;
        const checkboxes = document.querySelectorAll(".table__checkbox input[type='checkbox']");
        
        if (checkboxes.length > 0) {
            checkboxes.forEach((checkbox) => {
                checkbox.checked = isChecked;
            });
        }
    });
}

function initDateRangePicker() {
    const dateInputs = document.querySelectorAll('.date-range-picker');
    
    if (!dateInputs.length) return;

    const today = new Date();
    
    flatpickr(dateInputs, {
        locale: {
            weekdays: {
                shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            }
        },
        dateFormat: 'Y-m-d',
        defaultDate: today,
        disableMobile: true,
        prevArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path opacity="0.262481" fill-rule="evenodd" clip-rule="evenodd" d="M8.22638 2.18075L3.46864 6.61741L7.9053 11.3751L6.4573 12.7254L0.67035 6.51969L6.87609 0.732743L8.22638 2.18075Z" fill="#8C96AB"/>
        </svg>`,
        nextArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path opacity="0.262481" fill-rule="evenodd" clip-rule="evenodd" d="M0.773621 2.18075L5.53136 6.61741L1.0947 11.3751L2.5427 12.7254L8.32965 6.51969L2.12391 0.732743L0.773621 2.18075Z" fill="#8C96AB"/>
        </svg>`,
        onReady: function(selectedDates, dateStr, instance) {
            instance.calendarContainer.classList.add('custom-calendar');
        },
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 1) {
                if (instance.element.id === 'startDate') {
                    document.getElementById('endDate')._flatpickr.set('minDate', dateStr);
                } else {
                    document.getElementById('startDate')._flatpickr.set('maxDate', dateStr);
                }
            }
        }
    });
}

function initRefundReason() {
    const selectButton = document.querySelector('.refund__reason-button');
    const dropdown = document.querySelector('.refund__reason-list');
    const textarea = document.querySelector('.refund__reason-textarea');
    
    if (!selectButton || !dropdown) {
        return;
    }

    const options = document.querySelectorAll('.refund__reason-item');
    
    if (!options.length) {
        return;
    }

    selectButton.addEventListener('click', () => {
        const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
        selectButton.setAttribute('aria-expanded', !isExpanded);
        dropdown.classList.toggle('is-active');
    });

    options.forEach(option => {
        option.addEventListener('click', (event) => {
            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));

            const selectedOption = event.target;
            selectedOption.setAttribute('aria-selected', 'true');

            selectButton.textContent = selectedOption.textContent;

            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.classList.remove('is-active');

            if (selectedOption.id === 'cost__sort04') {
                textarea.style.display = 'block';
            } else {
                textarea.style.display = 'none';
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!selectButton.contains(event.target) && !dropdown.contains(event.target)) {
            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.classList.remove('is-active');
        }
    });
}

function initMypageLnb() {
    const lnbItems = document.querySelectorAll('.lnb__item');
    const contentContainer = document.getElementById('mypageContent');
    
    if (!lnbItems.length || !contentContainer) {
        return;
    }

    // URL에서 현재 페이지 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('page') || 'profile';

    // 페이지 컨텐츠 로드 함수
    async function loadPageContent(page) {
        try {
            // 메인 컨텐츠 로드
            const response = await fetch(`./include/${getPageFileName(page)}.php`);
            if (!response.ok) throw new Error('페이지를 불러오는데 실패했습니다.');
            
            let content = await response.text();

            // profile 페이지가 아닌 경우 페이지네이션 추가
            if (page !== 'profile') {
                const paginationResponse = await fetch('../include/pagination.php');
                if (paginationResponse.ok) {
                    const paginationContent = await paginationResponse.text();
                    content += paginationContent;
                }
            }

            contentContainer.innerHTML = content;

            // 메뉴 활성화 상태 업데이트
            lnbItems.forEach(item => {
                if (item.dataset.page === page) {
                    item.classList.add('is-active');
                } else {
                    item.classList.remove('is-active');
                }
            });

            // 페이지 로드 후 필요한 초기화 함수들 실행
            initDateRangePicker();
            initRefundReason();
            checkboxAll();
            
        } catch (error) {
            console.error('페이지 로드 오류:', error);
            alert('페이지를 불러오는데 실패했습니다.');
        }
    }

    // 초기 페이지 활성화
    loadPageContent(currentPage);

    // 클릭 이벤트 처리
    lnbItems.forEach(item => {
        item.addEventListener('click', async () => {
            const page = item.dataset.page;
            
            // URL 업데이트
            const newUrl = `${window.location.pathname}?page=${page}`;
            history.pushState({page}, '', newUrl);
            
            await loadPageContent(page);
        });
    });

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', async (event) => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'profile';
        
        await loadPageContent(page);
    });
}

function getPageFileName(page) {
    switch(page) {
        case 'profile':
            return 'membership';
        case 'order':
            return 'CourseDetails';
        case 'refund':
            return 'refund';
        default:
            return 'membership';
    }
}
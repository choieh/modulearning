window.onload = (event) => {
    displayMainMenu();
    displaySitemap();
    toggleSitemap();
    customSelectBox();
    thumbnailView();
    checkboxAll();
};

function toggleSitemap() {
    const sitemapBtn = document.querySelector('.sitemap-edu__button');
    const btnClose = document.querySelector('.btn__close');
    const sitemapArea = document.querySelector('.sitemap-edu');

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
    const selectButton = document.querySelector('.cost__btn-select');
    const dropdown = document.querySelector('.cost__list');
    const options = dropdown.querySelectorAll('li');

    // 드롭다운 열기/닫기 토글
    selectButton.addEventListener('click', () => {
        const isExpanded = selectButton.getAttribute('aria-expanded') === 'true';
        selectButton.setAttribute('aria-expanded', !isExpanded);
        dropdown.style.display = isExpanded ? 'none' : 'block';
    });

    // 옵션 클릭 시 선택
    options.forEach(option => {
        option.addEventListener('click', (event) => {
            // 모든 옵션의 aria-selected를 false로 초기화
            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));

            // 클릭한 옵션을 선택 상태로 설정
            const selectedOption = event.target;
            selectedOption.setAttribute('aria-selected', 'true');

            // 버튼 텍스트 업데이트
            selectButton.textContent = selectedOption.textContent;

            // 드롭다운 닫기
            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.style.display = 'none';
        });
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener('click', (event) => {
        if (!selectButton.contains(event.target) && !dropdown.contains(event.target)) {
            selectButton.setAttribute('aria-expanded', 'false');
            dropdown.style.display = 'none';
        }
    });
}

function thumbnailView() {
    const thumbnails = document.querySelectorAll('.thumbnail--sm img');
    const largeImage = document.getElementById('lgImg');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            largeImage.src = thumbnail.src;
            largeImage.alt = thumbnail.alt;
        });
    });
}

function checkboxAll() {
    document.getElementById("check-all").addEventListener("change", function(event) {
        const isChecked = event.target.checked;
        const checkboxes = document.querySelectorAll(".table__checkbox input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
        });
    });
}
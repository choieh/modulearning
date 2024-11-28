window.onload = (event) => {
    displayMainMenu();
    displaySitemap();
    toggleSitemap();
    customSelectBox();
    popup();
    thumbnailView();
    checkboxAll();
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

function dateRangePicker() {
    document.addEventListener('DOMContentLoaded', function() {
        const dateRangePicker = document.querySelector('.date-range-picker');
        
        if (!dateRangePicker) {
            return;
        }

        flatpickr('.date-range-picker', {
            locale: 'ko',
            mode: 'range',
            dateFormat: 'Y-m-d',
            defaultDate: [new Date(), new Date()],
            disableMobile: true,
            theme: 'material_orange'
        });
    });
}
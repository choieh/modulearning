window.onload = (event) => {
    displayMainMenu();
    displaySitemap();
    toggleSitemap();
    popularTabMenu();
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

function popularTabMenu() {
    const tabs = document.querySelectorAll(".tab__item");
    const contents = document.querySelectorAll(".tab-content");

    if (tabs.length > 0 && contents.length > 0) {
        tabs[0].classList.add("is-active");
        contents[0].classList.add("is-active");
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("is-active"));
            contents.forEach(content => content.classList.remove("is-active"));

            tab.classList.add("is-active");

            const targetContent = document.getElementById(tab.dataset.tab);
            targetContent.classList.add("is-active");
        });
    });
}
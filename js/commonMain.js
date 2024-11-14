window.onload = (event) => {
    displayMainMenu();
    displaySitemap();
    toggleSitemap();
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
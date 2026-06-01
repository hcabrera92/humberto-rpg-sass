let currentLang = localStorage.getItem('lang') || 'en';
let translations = {};

async function loadTranslations(lang) {
    const response = await fetch(`./locales/${lang}.json`);
    translations = await response.json();
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updateSwitcher();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
        if (value) el.textContent = value;
    });
}

function updateSwitcher() {
    document.querySelectorAll('.lang-switcher__option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

document.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-switcher__option');
    if (option) {
        loadTranslations(option.dataset.lang);
    }
});

window.loadTranslations = loadTranslations;
window.applyTranslations = applyTranslations;

loadTranslations(currentLang);
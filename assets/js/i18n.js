let currentLang = localStorage.getItem('lang') || 'en';
let translations = {};

function getLocalesPath() {
    const isInCaseStudies = window.location.pathname.includes('case-studies');
    return isInCaseStudies ? '../locales/' : './locales/';
}

async function loadTranslations(lang) {
    const response = await fetch(`${getLocalesPath()}${lang}.json`);
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

    document.querySelectorAll('[data-lang-content]').forEach(el => {
        const lang = el.getAttribute('data-lang-content');
        el.style.display = lang === currentLang ? 'block' : 'none';
    });
}

function updateSwitcher() {
    document.querySelectorAll('.lang-switcher__option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
}

document.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-switcher__option');
    if (option) {
        const lang = option.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
            loadTranslations(lang);
        }
    }
});

window.loadTranslations = loadTranslations;
window.applyTranslations = applyTranslations;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadTranslations(currentLang));
} else {
    loadTranslations(currentLang);
}
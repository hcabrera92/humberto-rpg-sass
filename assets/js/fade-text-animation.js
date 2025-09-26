const originalTexts = new Map();

function initFadeAnimations() {
    document.querySelectorAll('.chapter1__info__description__text').forEach(el => {
        if (!originalTexts.has(el)) originalTexts.set(el, el.innerHTML);

        if (!el.dataset.spanned) {
            const nodes = Array.from(el.childNodes);
            el.innerHTML = '';

            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split('').forEach(char => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.display = char === ' ' ? 'inline' : 'inline-block';
                        span.style.opacity = '0';
                        span.style.textShadow = '0 0 0 rgba(255,255,255,0)';
                        el.appendChild(span);
                    });
                } else {
                    el.appendChild(node);
                }
            });

            el.dataset.spanned = 'true';
        }

        const spans = el.querySelectorAll('span');

        function animateSpans() {
            spans.forEach((span, index) => {
                span.style.transition = `opacity 0.7s ease ${index * 0.03}s, text-shadow 0.7s ease ${index * 0.03}s`;
                span.style.opacity = '1';
                span.style.textShadow = '0 0 20px rgba(255,255,255,0.9)';
            });
        }

        animateSpans();
    });
}

function resetAndAnimate() {
    originalTexts.forEach((text, el) => {
        el.innerHTML = text;
        el.dataset.spanned = '';
    });
    initFadeAnimations();
}

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        resetAndAnimate();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initFadeAnimations();
});

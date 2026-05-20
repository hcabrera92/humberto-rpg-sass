function initFadeAnimations() {
    document.querySelectorAll('.chapter1__info__description__text').forEach(el => {
        if (el.dataset.spanned) return;

        const nodes = Array.from(el.childNodes);
        el.innerHTML = '';

        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.trim().split(' ').forEach((word, i, arr) => {
                    if (!word) return;
                    const span = document.createElement('span');
                    span.textContent = i < arr.length - 1 ? word + ' ' : word + ' ';
                    span.style.opacity = '0';
                    span.style.display = 'inline';
                    el.appendChild(span);
                });
            } else {
                el.appendChild(node);
            }
        });

        el.dataset.spanned = 'true';

        const spans = el.querySelectorAll('span');
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transition = 'opacity 0.4s ease, text-shadow 0.4s ease';
                span.style.opacity = '1';
                span.style.textShadow = '0 0 20px rgba(255,255,255,0.9)';
            }, index * 80);
        });
    });
}

document.addEventListener('DOMContentLoaded', initFadeAnimations);
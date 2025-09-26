function initSkillAnimations() {
    function animateScores(container, duration = 2000) {
        const elements = container.querySelectorAll(".chapter4__item-skill__ability__value");

        elements.forEach(el => {
            if (el.dataset.animating === "true") return;

            const target = parseInt(el.dataset.target || el.textContent);
            let start = 0;

            el.dataset.target = target;
            el.dataset.animating = "true";
            el.textContent = "0%";

            const stepTime = Math.abs(Math.floor(duration / target));
            const timer = setInterval(() => {
                start++;
                el.textContent = start + "%";
                if (start >= target) {
                    clearInterval(timer);
                    el.dataset.animating = "false";
                }
            }, stepTime);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateScores(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll(".chapter4__item-skill").forEach(section => {
        observer.observe(section);
    });
}

window.initSkillAnimations = initSkillAnimations;

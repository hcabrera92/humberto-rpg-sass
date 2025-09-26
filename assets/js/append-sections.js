async function loadComponent(id, file, callback) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
    if (callback) callback();
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "sections/header.html", () => {
        toggleMenu();
    });
    loadComponent("chapter1", "sections/chapter1.html", () => {
        initFadeAnimations();
    });
    loadComponent("chapter2", "sections/chapter2.html");
    loadComponent("chapter3", "sections/chapter3.html", () => {
        carouselAnimation();
    });
    loadComponent("chapter4", "sections/chapter4.html", () => {
        initSkillAnimations();
    });
    loadComponent("chapter5", "sections/chapter5.html");
    loadComponent("footer", "sections/footer.html");
});

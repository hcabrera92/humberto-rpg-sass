function toggleMenu() {
    const toggle = document.querySelector(".header__toggle");
    const menu = document.querySelector(".header__menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        toggle.innerHTML = menu.classList.contains("active") ? "✖" : "☰";
    });
}
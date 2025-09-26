function carouselAnimation() {
    const grid = document.querySelector(".chapter3 .grid");
    const cards = document.querySelectorAll(".chapter3__card");

    if (!grid || cards.length === 0) return;

    let dotsContainer = grid.parentElement.querySelector(".carousel-dots");
    if (dotsContainer) dotsContainer.remove();

    dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel-dots");

    cards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    grid.parentElement.appendChild(dotsContainer);

    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;
        grid.style.transform = `translateX(-${100 * index}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    let startX = 0;
    grid.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    grid.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50 && currentIndex < cards.length - 1) goToSlide(currentIndex + 1);
        else if (endX - startX > 50 && currentIndex > 0) goToSlide(currentIndex - 1);
    });
}

window.carouselAnimation = carouselAnimation;

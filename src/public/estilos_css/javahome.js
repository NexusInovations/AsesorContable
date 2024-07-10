document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector('.hamburger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    hamburgerMenu.addEventListener('click', function() {
        dropdownMenu.classList.toggle('visible');
        hamburgerMenu.classList.toggle('open');
    });

    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselInner = document.querySelector('.carousel-inner');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000);

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    function updateIndicators(currentSlide) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
});

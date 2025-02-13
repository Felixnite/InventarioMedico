document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('doctorCarousel');
    const slides = carousel.querySelector('.flex');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    let currentIndex = 0;
    const totalSlides = slides.children.length;
    const slideWidth = slides.children[0].offsetWidth;

    const updateCarousel = () => {
        const offset = -currentIndex * slideWidth;
        slides.style.transform = `translateX(${offset}px)`;
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    // Event Listeners
    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    // Auto-rotate every 5 seconds
    setInterval(showNext, 5000);

    // Responsive adjustments
    window.addEventListener('resize', () => {
        slideWidth = slides.children[0].offsetWidth;
        updateCarousel();
    });
});
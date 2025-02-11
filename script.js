document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialTrack');
    let currentIndex = 0;
    let intervalId;
    const intervalTime = 5000;

    function updateTrackPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function moveTestimonial(direction) {
        currentIndex = (currentIndex + direction + track.children.length) % track.children.length;
        updateTrackPosition(); 
        resetInterval(); 
    }

    function startCarousel() {
        intervalId = setInterval(() => {
            moveTestimonial(1);
        }, intervalTime);
    }

    function resetInterval() {
        clearInterval(intervalId); 
        startCarousel(); 
    }

    startCarousel(); 

    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startCarousel);

    let touchStartX = null;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(intervalId);
    });

    track.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
    });

    track.addEventListener('touchend', (e) => {
        if (!touchStartX) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) {
            moveTestimonial(diffX > 0 ? 1 : -1); 
        }
        touchStartX = null;
        startCarousel();
    });
});
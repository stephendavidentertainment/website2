let slideIndex = 1;
let slideTimer = 4000;
let isPaused = false;
let slideInterval = setInterval(() => plusSlides(1), slideTimer); 
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    fadeOutSlide(slideIndex, () => {
        showSlides(slideIndex += n);
        if (!isPaused) {
            resetSlideInterval();
        }
    });
}

// Thumbnail image controls
function currentSlide(n) {
    fadeOutSlide(slideIndex, () => {
        showSlides(slideIndex = n);
        if (!isPaused) {
            resetSlideInterval();
        }
    });
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    if (!isPaused) {
        slideInterval = setInterval(() => plusSlides(1), slideTimer);
    }
}

function fadeOutSlide(index, callback) {
    let slides = document.getElementsByClassName("mySlides");
    if (slides[index - 1]) {
        slides[index - 1].style.transition = "opacity 0.5s";
        slides[index - 1].style.opacity = 0;
        setTimeout(() => {
            slides[index - 1].style.opacity = 1;
            callback();
        }, 500); // Match the duration of the fade-out transition
    } else {
        callback();
    }
}

function togglePause() {
    isPaused = !isPaused;
    resetSlideInterval();
    console.log(`Slideshow is now ${isPaused ? 'paused' : 'running'}`);
}

// Example usage: Call togglePause() to pause or resume the slideshow
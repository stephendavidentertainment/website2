const video = document.getElementById('video-background');
const logo = document.querySelector('img');

// Check if the video can play
video.addEventListener('canplay', () => {
    console.log('Video can play');
});

// Check for any errors
video.addEventListener('error', (e) => {
    console.error('Error loading video:', e);
});

logo.addEventListener('animationend', () => {
    video.style.opacity = 1;
    document.body.style.background = 'none';
    video.play(); // Ensure the video is played

    // Fade out the logo after the video starts playing
    setTimeout(() => {
        logo.style.animation = 'fadeOut 3s ease-in-out forwards';
    }, 500); // Delay to ensure video starts playing
});

let slideIndex = 1;
let slideInterval = setInterval(() => plusSlides(1), 4000); // Automatically advance the slide every 4 seconds
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    fadeOutSlide(slideIndex, () => {
        showSlides(slideIndex += n);
        resetSlideInterval();
    });
}

// Thumbnail image controls
function currentSlide(n) {
    fadeOutSlide(slideIndex, () => {
        showSlides(slideIndex = n);
        resetSlideInterval();
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
    slideInterval = setInterval(() => plusSlides(1), 4000);
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



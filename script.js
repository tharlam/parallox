const navBar = document.querySelector('.main-nav');
const background = document.querySelector('.parallax-background');
const bannerContent = document.querySelector('.banner-content');

const revealElementsSection2 = document.querySelectorAll('#section-2 .animated-element');
const revealElementsSection3 = document.querySelectorAll('#section-3 .animated-element');

// Add a flag to track if the animation has been triggered
let section2Animated = false;
let section3Animated = false;

// Function to handle the staggered animation for a given section
function animateSection(elements, isAnimatedFlag) {
    // Check if the animation has already run
    if (isAnimatedFlag) {
        return;
    }

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });

    // Set the flag to true to prevent re-running the animation
    if (elements === revealElementsSection2) {
        section2Animated = true;
    } else {
        section3Animated = true;
    }
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Nav Bar Logic
    if (scrollPosition > 50) {
        navBar.classList.add('visible');
    } else {
        navBar.classList.remove('visible');
    }

    // Banner Zoom and Text Parallax Logic
    const scaleValue = 1 + scrollPosition * 0.0005;
    // Corrected string interpolation using backticks (`)
    background.style.transform = `scale(${scaleValue})`;
    const textMove = scrollPosition * 0.3;
    bannerContent.style.transform = `translateY(${textMove}px)`;

    // Staggered Animation Logic
    // Section 2 - Check if the section is in view and if it hasn't been animated yet
    if (scrollPosition > window.innerHeight - 300) { // Adjusted the offset for better timing
        animateSection(revealElementsSection2, section2Animated);
    }

    // Section 3
    if (scrollPosition > (window.innerHeight * 2) - 300) { // Adjusted the offset
        animateSection(revealElementsSection3, section3Animated);
    }
});
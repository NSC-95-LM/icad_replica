// ================================================== MAINBAR - NAV SECTION ==================================================

const navShip = document.getElementById("navShip");

navShip.addEventListener("click", (e) => {
    const navBeam = e.target.closest(".navBeam");
    if (!navBeam) return;

    const navStarboard = navBeam.querySelector(".navStarboard");
    const navRudder = navBeam.querySelector(".navRudder");
    const navPort = navBeam.querySelector(".navPort");
    const wasOpen = !navPort.classList.contains("grid-rows-[0fr]", "opacity-0");


    navShip.querySelectorAll('.navPort').forEach(navPortArr => {
        navPortArr.classList.add('grid-rows-[0fr]', 'opacity-0');
        navPortArr.classList.remove('grid-rows-[1fr]', 'opacity-100', 'border', 'border-gray-200');
    });

    navShip.querySelectorAll('.navStarboard').forEach(navStarboardArr => {
        navStarboardArr.classList.remove('text-orange-500');
    });

    navShip.querySelectorAll('.navRudder').forEach(navRudderArr => {
        navRudderArr.classList.remove('rotate-180');    
    });

    if (!wasOpen) {
        navStarboard.classList.add('text-orange-500');
        navPort.classList.remove('grid-rows-[0fr]', 'opacity-0');
        navPort.classList.add('grid-rows-[1fr]', 'opacity-100', 'border', 'border-gray-200');
        navRudder.classList.add('rotate-180')
    };
});

// ================================================== IMAGES CAROUSEL - SECTION ==================================================

const slides = Array.from(document.querySelectorAll('.slide'));
const totalSlides = slides.length;
let currentIndex = 0;
let isTransitioning = false; // Prevents animation overlapping glitches

function showNextSlide(targetIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentSlide = document.querySelector(`.slide[data-index="${currentIndex}"]`);
    const nextSlide = document.querySelector(`.slide[data-index="${targetIndex}"]`);

    // 1. Fade out current active slide and push it down the Z-index stack
    currentSlide.classList.replace('opacity-100', 'opacity-0');
    currentSlide.classList.replace('z-10', 'z-0');

    // 2. Fade in target slide and pull it up the Z-index stack
    nextSlide.classList.replace('opacity-0', 'opacity-100');
    nextSlide.classList.replace('z-0', 'z-10');

    // 3. Update global tracking index
    currentIndex = targetIndex;

    // Release the transition lock after Tailwind's duration-700 finishes
    setTimeout(() => {
        isTransitioning = false;
    }, 700);
}

// Arrow Button Click Handlers
document.getElementById('rightArrow').addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % totalSlides; // Loops 6 back to 0
    showNextSlide(nextIndex);
});

document.getElementById('leftArrow').addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loops 0 back to 6
    showNextSlide(prevIndex);
});

setInterval(() => {
    const nextIndex = (currentIndex + 1) % totalSlides; // Loops 6 back to 0
    showNextSlide(nextIndex);
}, 5000);

// ================================================== STATS - SECTION ==================================================

document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.getElementById("statsSection");

    // 1. Define the actual Counter Animation code inside a single function
    function runCounters() {
        // ============================== DECLARATIONS ==============================
        const stat1 = document.getElementById("stat1");
        const stat2 = document.getElementById("stat2");
        const stat3 = document.getElementById("stat3");
        const stat4 = document.getElementById("stat4");

        let startNum = 0;       
        const desNum = 774;
        let startNum2 = 0;       
        const desNum2 = 5467;
        let startNum3 = 0;       
        const desNum3 = 6;
        let startNum4 = 0;       
        const desNum4 = 568;

        // ============================== COUNTER-1 ==============================
        const counterInterval =  setInterval(() => {
            // 1. Calculate how far away we are from the goal
            const distanceRemaining = desNum - startNum;

            if (distanceRemaining <= 0) {
                // BREAK AWAY: We reached or passed the target, so stop!
                stat1.innerHTML = desNum; // Ensure it locks exactly on 774
                clearInterval(counterInterval);
            } 
            // 2. If we are within the nearest tens boundary, count by 1 slowly
            else if (distanceRemaining <= 10) {
                stat1.innerHTML = startNum;
                startNum += 1;
            } 
            // 3. If we are still far away, fly by 10s
            else {
                stat1.innerHTML = startNum;
                startNum += 10;
            }
        }, 15); 

        // ============================== COUNTER-2 ==============================
        const counterInterval2 = setInterval(() => {
            const distanceRemaining = desNum2 - startNum2;
            if(distanceRemaining <= 0){stat2.innerHTML = desNum2; clearInterval(counterInterval2)}
            else if(distanceRemaining <= 25){stat2.innerHTML = startNum2; startNum2 += 1;}
            else{stat2.innerHTML = startNum2; startNum2 += 25;};
        }, 5);

        // ============================== COUNTER-3 ==============================
        const counterInterval3 = setInterval(() => {
            const distanceRemaining = desNum3 - startNum3;
            if(distanceRemaining <= 0){stat3.innerHTML = desNum3; clearInterval(counterInterval3)}
            else{stat3.innerHTML = startNum3; startNum3 += 1;};
        }, 100);

        // ============================== COUNTER-4 ==============================
        const counterInterval4 = setInterval(() => {
            const distanceRemaining = desNum4 - startNum4;
            if(distanceRemaining <= 0){stat4.innerHTML = desNum4; clearInterval(counterInterval4)}
            else if(distanceRemaining <= 10){stat4.innerHTML = startNum4; startNum4 += 1;}
            else{stat4.innerHTML = startNum4; startNum4 += 10;};
        }, 15);
    }

    // 2. Setup the structural Viewport Camera (Observer)
    const observerOptions = {
        root: null, // Watch the main browser viewport window
        rootMargin: "0px 0px -10% 0px", // The '10dvh' rule: pulls the trigger zone 10% up from the bottom boundary
        threshold: 0 // Fires the absolute microsecond the top edge crosses that margin line
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            // Check if the container has crossed inside our visible zone
            if (entry.isIntersecting) {
                // DELAY THE ENGINE: Wait 1500ms for AOS cascade to become highly visible
                setTimeout(() => {
                    runCounters(); // Launch the loops!
                }, 1500);  // Launch the counter loops!
                
                // CRITICAL: Stop watching this element so it doesn't re-trigger if the user scrolls up and down again
                observerInstance.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 3. Command the observer to target your specific HTML section
    observer.observe(statsSection);
});

// ================================================== FAQ - SECTION ==================================================

const faqShip = document.getElementById("faqShip");

faqShip.addEventListener("click", (e) => {

    const faqBeam = e.target.closest('.faqBeam');
    if (!faqBeam) return;

    const faqBow = faqBeam.querySelector('.faqBow');
    const faqStarboard = faqBeam.querySelector('.faqStarboard');
    const faqStern = faqBeam.querySelector('.faqStern');
    const faqPort = faqBeam.querySelector('.faqPort');
    const faqRudder = faqBeam.querySelector('.faqRudder');
    const wasOpen = !faqPort.classList.contains('grid-rows-[0fr]', 'opacity-0');

    faqShip.querySelectorAll('.faqPort').forEach(faqPortArr => {
        faqPortArr.classList.add('grid-rows-[0fr]', 'opacity-0');
        faqPortArr.classList.remove('grid-rows-[1fr]', 'border-b', 'border-gray-300', 'py-[0.75rem]', 'px-[1.5rem]');
    });

    faqShip.querySelectorAll('.faqRudder').forEach(faqRudderArr => {
        faqRudderArr.classList.remove('rotate-180');    
    });


    faqShip.querySelectorAll('.faqStarboard').forEach(faqStarboardArr => {
        faqStarboardArr.classList.remove('bg-orange-500', 'text-white');
        faqStarboardArr.classList.add('border-b', 'border-gray-300');    
    });

    if (!wasOpen) {
        faqPort.classList.remove('grid-rows-[0fr]', 'opacity-0');
        faqPort.classList.add('grid-rows-[1fr]', 'opacity-100', 'border-b', 'border-gray-300', 'py-[0.75rem]', 'px-[1.5rem]');
        faqStarboard.classList.add('bg-orange-500', 'text-white');
        faqStarboard.classList.remove('border-b', 'border-gray-300');
        faqRudder.classList.add('rotate-180')
    };
})
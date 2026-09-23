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
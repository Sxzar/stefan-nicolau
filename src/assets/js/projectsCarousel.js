const cards = document.querySelectorAll('.custom-card');
const section = document.querySelector('#selectedProjects');
const totalCards = cards.length;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const relativeScroll = scrollTop - sectionTop;

    const step = sectionHeight / (totalCards + 0.5); // 0.8 = linger on last card

    cards.forEach((card, i) => {
        const trigger = (i - 0.8) * step;

        if (scrollTop < sectionTop) {
            // 👇 Keep first card visible before scroll reaches section
            if (i === 0) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        } else if (relativeScroll > trigger) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });
});

// 🔁 Initial trigger (show first card on page load if user is already scrolled)
window.dispatchEvent(new Event('scroll'));

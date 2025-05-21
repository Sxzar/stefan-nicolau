function setupAllVerticalCarousels() {
    const carousels = document.querySelectorAll('.verticalCarousel');

    carousels.forEach((carousel) => {
        const cards = carousel.querySelectorAll('.verticalCarousel--card');
        const totalCards = cards.length;

        function handleScroll() {
            const scrollTop = window.scrollY;
            const sectionTop = carousel.offsetTop;
            const sectionHeight = carousel.offsetHeight;
            const relativeScroll = scrollTop - sectionTop;
            const step = sectionHeight / (totalCards + 0.5);

            cards.forEach((card, i) => {
                const trigger = (i - 0.8) * step;

                if (scrollTop < sectionTop) {
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
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initial run
    });
}

document.addEventListener('DOMContentLoaded', setupAllVerticalCarousels);

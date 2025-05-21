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
                        card.classList.add('translate-y-[40px]', 'opacity-100');
                        card.classList.remove(
                            'translate-y-[100px]',
                            'opacity-0'
                        );
                    } else {
                        card.classList.add('translate-y-[100px]', 'opacity-0');
                        card.classList.remove(
                            'translate-y-[40px]',
                            'opacity-100'
                        );
                    }
                } else if (relativeScroll > trigger) {
                    card.classList.add('translate-y-[40px]', 'opacity-100');
                    card.classList.remove('translate-y-[100px]', 'opacity-0');
                } else {
                    card.classList.add('translate-y-[100px]', 'opacity-0');
                    card.classList.remove('translate-y-[40px]', 'opacity-100');
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initial run
    });
}

document.addEventListener('DOMContentLoaded', setupAllVerticalCarousels);

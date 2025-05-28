const delay = 5000;

class AutoplayCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dots = container.querySelectorAll('.dot');
        this.track = container.querySelector('.slides-container');
        this.current = 0;
        this.timeout = null;

        this.setup();
    }

    setup() {
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);

        firstClone.classList.add('clone');
        lastClone.classList.add('clone');

        this.track.appendChild(firstClone);
        this.track.insertBefore(lastClone, this.slides[0]);

        this.slides = this.track.querySelectorAll('.slide');
        this.current = 1;

        this.track.style.transform = `translateX(-${this.current * 100}%)`;

        this.track.addEventListener('transitionend', () => {
            if (this.slides[this.current].classList.contains('clone')) {
                this.track.style.transition = 'none';

                if (this.current === 0) {
                    this.current = this.slides.length - 2;
                } else if (this.current === this.slides.length - 1) {
                    this.current = 1;
                }

                this.track.style.transform = `translateX(-${this.current * 100}%)`;
                this.track.offsetHeight; // force reflow
                this.track.style.transition = 'transform 0.5s ease-in-out';
            }
        });

        this.dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                this.showSlide(parseInt(dot.dataset.index) + 1);
            });
        });

        this.container.addEventListener('mouseenter', () => this.stop());
        this.container.addEventListener('mouseleave', () => this.start());

        this.enableSwipe();

        this.start();
    }
    showSlide(index) {
        if (index >= this.slides.length) {
            index = this.slides.length - 1;
        } else if (index < 0) {
            index = 0;
        }

        this.track.style.transition = 'transform 0.5s ease-in-out';
        this.track.style.transform = `translateX(-${index * 100}%)`;
        this.current = index;

        const visibleIndex =
            (this.current - 1 + this.dots.length) % this.dots.length;
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === visibleIndex);
        });

        this.stop();
        this.timeout = setTimeout(() => this.start(), delay);
    }

    nextSlide() {
        if (this.current >= this.slides.length - 1) return;
        this.showSlide(this.current + 1);
    }

    start() {
        this.stop();
        this.timeout = setTimeout(() => {
            this.nextSlide();
            this.start(); // recursively restart
        }, delay);
    }

    stop() {
        clearTimeout(this.timeout);
    }

    prevSlide() {
        this.showSlide(this.current - 1);
    }

    enableSwipe() {
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            const deltaX = endX - startX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    // Swipe left
                    this.nextSlide();
                } else {
                    // Swipe right
                    this.prevSlide();
                }
            }

            // Reset
            startX = 0;
            endX = 0;
        });
    }
}

document.querySelectorAll('.autoplayCarousel').forEach((el) => {
    new AutoplayCarousel(el);
});

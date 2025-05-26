const baseDepth = 200;

const sections = document.querySelectorAll('.curve-section');

window.addEventListener('scroll', () => {
    sections.forEach((section) => {
        const path = section.querySelector('.curvePath');
        if (!path) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const progress = Math.min(
            Math.max((windowHeight - rect.top) / windowHeight, 0),
            1
        );

        const curveDepth = baseDepth - progress * baseDepth;

        path.setAttribute(
            'd',
            `M0,0 Q500,${curveDepth} 1000,0 L1000,100 L0,100 Z`
        );
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.tag-filter');
    const cards = document.querySelectorAll('.project-card');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedTag = btn.getAttribute('data-tag');

            // Update active button styles
            filterButtons.forEach((b) =>
                b.classList.remove('bg-stone-400', 'text-white')
            );
            btn.classList.add('bg-stone-400', 'text-white');

            // Filter cards
            cards.forEach((card) => {
                const tags = card.getAttribute('data-tags')?.split(',') || [];

                const shouldShow =
                    selectedTag === 'all' || tags.includes(selectedTag);

                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
});

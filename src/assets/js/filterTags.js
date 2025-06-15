document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.tag-filter');
    const gridContainer = document.querySelector('#project-grid');

    const layoutPatterns = [
        ['md:w-1/3', 'md:w-2/3'],
        ['md:w-1/3', 'md:w-1/3', 'md:w-1/3'],
        ['md:w-2/3', 'md:w-1/3']
    ];

    // Step 1: Store all cards
    const originalCards = Array.from(
        document.querySelectorAll('.project-card')
    ).map((card) => {
        return {
            element: card.cloneNode(true),
            tags: (card.getAttribute('data-tags') || '')
                .split(',')
                .map((t) => t.trim())
        };
    });

    gridContainer.innerHTML = '';

    // Step 2: Function to re-render mosaic layout
    function renderGrid(cards) {
        gridContainer.innerHTML = '';
        let index = 0;
        let patternIndex = 0;

        while (index < cards.length) {
            const row = document.createElement('div');
            row.className = 'mx-auto mb-2 flex max-w-screen-lg flex-wrap';

            const currentPattern =
                layoutPatterns[patternIndex % layoutPatterns.length];

            currentPattern.forEach((widthClass) => {
                if (index >= cards.length) return;

                const cardWrapper = document.createElement('div');
                cardWrapper.className = `${widthClass} w-full p-2 project-card`;
                cardWrapper.setAttribute(
                    'data-tags',
                    cards[index].tags.join(',')
                );

                // Clone and append content
                const clonedContent = cards[index].element.cloneNode(true);
                cardWrapper.innerHTML = clonedContent.innerHTML;

                row.appendChild(cardWrapper);
                index++;
            });

            gridContainer.appendChild(row);
            patternIndex++;
        }
    }

    // Step 3: Initial render
    renderGrid(originalCards);

    // Step 4: Filter logic
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedTag = btn.getAttribute('data-tag');

            filterButtons.forEach((b) => b.classList.remove('text-primary'));
            btn.classList.add('text-primary');

            const filtered =
                selectedTag === 'all'
                    ? originalCards
                    : originalCards.filter((card) =>
                          card.tags.includes(selectedTag)
                      );

            renderGrid(filtered); // restart from patternIndex 0 every time
        });
    });
});

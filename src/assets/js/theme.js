(function () {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const THEME_KEY = 'theme';
    const DARK = 'dark';

    function applyTheme(theme) {
        if (theme === DARK) {
            root.classList.add(DARK);
            toggleBtn.setAttribute('aria-pressed', 'true');
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
            toggleBtn.classList.add('dark');
        } else {
            root.classList.remove(DARK);
            toggleBtn.setAttribute('aria-pressed', 'false');
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            toggleBtn.classList.remove('dark');
        }
    }

    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY);
    }

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? DARK
            : 'light';
    }

    function getCurrentTheme() {
        return getSavedTheme() || getSystemTheme();
    }

    function toggleTheme() {
        const newTheme = root.classList.contains(DARK) ? 'light' : DARK;
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    }

    // Initial theme setup
    applyTheme(getCurrentTheme());

    // Respond to system changes if no saved preference
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
            if (!getSavedTheme()) {
                applyTheme(e.matches ? DARK : 'light');
            }
        });

    // Set up toggle button
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
})();

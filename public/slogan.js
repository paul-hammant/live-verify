(() => {
    const roots = document.querySelectorAll('[data-slogan-root]');
    if (!roots.length) return;

    if (!document.getElementById('slogan-style')) {
        const style = document.createElement('style');
        style.id = 'slogan-style';
        style.textContent = `
            [data-slogan-root] {
                font-size: 0.98em;
                opacity: 0.95;
                line-height: 1.6;
                margin: 8px 0 18px;
            }
            [data-slogan-toggle] {
                background: transparent;
                border: 0;
                padding: 0;
                margin-left: 10px;
                color: rgba(255, 255, 255, 0.95);
                text-decoration: underline;
                cursor: pointer;
                font-size: 0.85em;
                opacity: 0.9;
            }
            [data-slogan-toggle]:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    function wire(root) {
        const termEl = root.querySelector('[data-slogan-term]');
        if (!termEl) return;

        let toggleEl = root.querySelector('[data-slogan-toggle]');
        if (!toggleEl) {
            toggleEl = document.createElement('button');
            toggleEl.setAttribute('data-slogan-toggle', '');
            toggleEl.type = 'button';
            root.appendChild(toggleEl);
        }

        let state = 'live_text';

        function render() {
            if (state === 'google_lens') {
                termEl.textContent = 'Google Lens';
                toggleEl.textContent = 'iOS: Live Text';
                toggleEl.setAttribute('aria-label', 'Switch slogan term to Live Text');
            } else {
                termEl.textContent = 'Live Text';
                toggleEl.textContent = 'Android: Google Lens';
                toggleEl.setAttribute('aria-label', 'Switch slogan term to Google Lens');
            }
        }

        toggleEl.addEventListener('click', () => {
            state = state === 'google_lens' ? 'live_text' : 'google_lens';
            render();
        });

        render();
    }

    roots.forEach(wire);
})();


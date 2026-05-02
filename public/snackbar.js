(function (global) {
    'use strict';

    var container = null;

    function getContainer() {
        if (!container) {
            container = document.createElement('div');
            container.id = 'snackbar-container';
            document.body.appendChild(container);
        }
        return container;
    }

    var ICONS = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

    global.showSnackbar = function (message, type) {
        type = type || 'info';
        var c = getContainer();
        var el = document.createElement('div');
        el.className = 'snackbar snackbar-' + type;
        el.innerHTML =
            '<span class="snackbar-icon">' + (ICONS[type] || ICONS.info) + '</span>' +
            '<span class="snackbar-msg">' + message + '</span>' +
            '<button class="snackbar-close" aria-label="Dismiss">&#x2715;</button>';
        c.appendChild(el);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () { el.classList.add('snackbar-show'); });
        });

        function dismiss() {
            el.classList.remove('snackbar-show');
            el.classList.add('snackbar-hide');
            setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
        }

        el.querySelector('.snackbar-close').addEventListener('click', dismiss);
        setTimeout(dismiss, 4500);
    };
}(window));

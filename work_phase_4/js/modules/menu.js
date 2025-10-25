const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');
let menuOpen = false;

// --- Hamburger toggle ---
menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', menuOpen);
});

// --- Hover dropdown logic (only active on desktop) ---
function enableHoverDropdowns() {
    document.querySelectorAll('.top-nav details').forEach((detail) => {
        const summary = detail.querySelector('summary');
        const dropdown = detail.querySelector('ul.dropdown');
        let isHovering = false;
        let closeTimeout;

        function openMenu() {
            clearTimeout(closeTimeout);
            detail.setAttribute('open', '');
            isHovering = true;
        }

        function closeMenu() {
            isHovering = false;
            closeTimeout = setTimeout(() => {
                if (!isHovering) detail.removeAttribute('open');
            }, 50);
        }

        summary.addEventListener('mouseenter', openMenu);
        summary.addEventListener('mouseleave', closeMenu);
        dropdown.addEventListener('mouseenter', openMenu);
        dropdown.addEventListener('mouseleave', closeMenu);
    });
}

// Only enable hover dropdowns if screen width > 768px (desktop)
if (window.innerWidth > 768) {
    enableHoverDropdowns();
}

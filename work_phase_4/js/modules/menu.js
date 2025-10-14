const toggleButton = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');


if (toggleButton && navMenu) {
toggleButton.addEventListener('click', () => {
const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
toggleButton.setAttribute('aria-expanded', !expanded);
navMenu.style.display = expanded ? 'none' : 'flex';
});

}
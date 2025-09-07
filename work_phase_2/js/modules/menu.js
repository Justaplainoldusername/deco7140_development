// Toggle menu on mobile
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Handle active link styling
links.forEach((link) => {
    link.addEventListener("click", function () {
        links.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
        navLinks.classList.remove("active"); // close menu after selection on mobile
    });
});

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("back-top");
const contactForm = document.getElementById("contact-form");
const typingText = document.getElementById("typing-text");

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("open");
    const icon = menuIcon.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        const icon = menuIcon.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveNav() {
    let current = "home";

    sections.forEach(section => {
        const top = section.offsetTop - 180;
        if (window.scrollY >= top) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

window.addEventListener("scroll", () => {
    updateActiveNav();

    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const roles = [
    "Aspiring Data Analyst",
    "Power BI Enthusiast",
    "SQL Developer",
    "Python Data Explorer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    const role = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = role.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === role.length) {
            deleting = true;
            setTimeout(typeRole, 1500);
            return;
        }
    } else {
        typingText.textContent = role.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, deleting ? 45 : 80);
}

typeRole();

contactForm.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thank you! Your message has been received. Connect this form to Formspree or EmailJS to receive real emails.");
    contactForm.reset();
});

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

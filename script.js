// ===== CONFIG =====
const SCROLL_COOLDOWN_MS = 800;

// ===== SECTION SNAP LOGIC =====
const sections = Array.from(document.querySelectorAll(".section"));
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    currentIndex = index;

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, SCROLL_COOLDOWN_MS);
}

// Mouse wheel control
window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(currentIndex + 1);
    } else if (e.deltaY < 0) {
        scrollToSection(currentIndex - 1);
    }
}, { passive: true });

// Keyboard navigation
window.addEventListener("keydown", (e) => {
    if (isScrolling) return;

    if (e.key === "ArrowDown" || e.key === "PageDown") {
        scrollToSection(currentIndex + 1);
    }

    if (e.key === "ArrowUp" || e.key === "PageUp") {
        scrollToSection(currentIndex - 1);
    }
});

// ===== NAV HIGHLIGHT =====
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );
                });

                currentIndex = sections.indexOf(entry.target);
            }
        });
    },
    {
        threshold: 0.6
    }
);

sections.forEach(section => observer.observe(section));

// ===== NAV CLICK OVERRIDE =====
navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToSection(index);
    });
});

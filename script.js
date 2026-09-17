// Typing effect for the tagline
const phrases = [
  "Full-Stack Developer",
  "MERN Stack Developer",
  "DevOps Practitioner",
  "React.js | Node.js | MongoDB",
  "Docker | Kubernetes | AWS",
];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typedEl.textContent = current.slice(0, charIndex);

  let delay = deleting ? 40 : 80;
  if (!deleting && charIndex === current.length) {
    delay = 1600;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// Scroll-reveal for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Back-to-top button
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active nav link highlighting while scrolling
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const navObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === "#" + entry.target.id
              ? "var(--accent)"
              : "";
        });
      }
    }
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

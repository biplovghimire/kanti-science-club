/* Shared behavior: theme toggle, mobile nav, small helpers */
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("ksc-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("ksc-theme", next);
      });
    }

    const navToggle = document.getElementById("navToggle");
    const header = document.getElementById("siteHeader");
    if (navToggle && header) {
      navToggle.addEventListener("click", () => {
        const open = header.classList.toggle("menu-open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      header.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => header.classList.remove("menu-open"));
      });
    }

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();

/* Fallback placeholder for any image that fails to load (e.g. before you add
   your own photos). Generates a simple lettered tile so layouts never break. */
function kscImgFallback(img, label) {
  img.onerror = null;
  const initials = (label || "KSC")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
    <rect width="300" height="300" fill="#E7EBE1"/>
    <text x="50%" y="53%" font-family="IBM Plex Mono, monospace" font-size="64"
      fill="#3C5266" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}


/* ==========================================================
   TESTIMONIAL CAROUSEL
========================================================== */

const slider = document.getElementById("testimonialSlider");
const slides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
const dots = document.querySelectorAll(".testimonial-dots .dot");

let current = 0;
let autoSlide;

/* ---------- Update Slider ---------- */

function updateSlider() {

    slider.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[current].classList.add("active");

}

/* ---------- Next ---------- */

function nextSlide() {

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    updateSlider();

}

/* ---------- Previous ---------- */

function prevSlide() {

    current--;

    if (current < 0) {
        current = slides.length - 1;
    }

    updateSlider();

}

/* ---------- Buttons ---------- */

nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAuto();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAuto();
});

/* ---------- Dots ---------- */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        current = index;
        updateSlider();
        restartAuto();

    });

});

/* ---------- Auto Slide ---------- */

function startAuto() {

    autoSlide = setInterval(() => {
        nextSlide();
    }, 5000);

}

function stopAuto() {

    clearInterval(autoSlide);

}

function restartAuto() {

    stopAuto();
    startAuto();

}

/* ---------- Pause on Hover ---------- */

slider.addEventListener("mouseenter", stopAuto);
slider.addEventListener("mouseleave", startAuto);

/* ---------- Touch Swipe ---------- */

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", e => {

    touchStartX = e.changedTouches[0].screenX;

});

slider.addEventListener("touchend", e => {

    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) {

        nextSlide();
        restartAuto();

    }

    if (touchEndX - touchStartX > 50) {

        prevSlide();
        restartAuto();

    }

});

/* ---------- Initialize ---------- */

updateSlider();
startAuto();
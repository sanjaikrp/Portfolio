/* ===== Navigation Menu ===== */
const navLinks = document.getElementById("nav-links");
const menuBtn = document.getElementById("menu-btn");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

/* ===== Scroll Reveal Animations ===== */
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// Header container
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// About container
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .about__btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// Service container
ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 400,
});

// Experience container
ScrollReveal().reveal(".experience__card", {
  ...scrollRevealOption,
  interval: 300,
});

// Filter menu
ScrollReveal().reveal(".filter__menu", {
  ...scrollRevealOption,
  interval: 300,
});

// Work timeline
ScrollReveal().reveal(".work__card", {
  ...scrollRevealOption,
  interval: 300,
});

// Portfolio container
ScrollReveal().reveal(".portfolio__card", {
  duration: 1000,
  interval: 400,
});

/* ===== Experience Filter Logic ===== */
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".experience__card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active class from all
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ===== Achievements Carousel Logic ===== */
const slides = document.querySelectorAll(".achievements__card");
const prevBtn = document.querySelector(".arrow.left");
const nextBtn = document.querySelector(".arrow.right");

let index = 0;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "prev", "next");

    if (i === index) {
      slide.classList.add("active");
    } else if (i === (index - 1 + slides.length) % slides.length) {
      slide.classList.add("prev");
    } else if (i === (index + 1) % slides.length) {
      slide.classList.add("next");
    }
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlides();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Initialize
updateSlides();

/* ===== Achievements Carousel Height Sync ===== */
const slideshowEl = document.querySelector(".achievements__slideshow");

function syncAchievementsHeight() {
  const active = document.querySelector(".achievements__card.active");
  if (active && slideshowEl) {
    slideshowEl.style.height = active.offsetHeight + "px";
  }
}

// Run after each slide change
const _updateSlides = updateSlides;
updateSlides = function () {
  _updateSlides();
  syncAchievementsHeight();
};

// Also update on window resize
window.addEventListener("resize", syncAchievementsHeight);

// Call on load
syncAchievementsHeight();

/* ===== Modal & Form Logic ===== */
const modal = document.getElementById("hireModal");
const openBtn = document.querySelector(".header__btn .btn");
const closeBtn = modal.querySelector(".close");
const form = modal.querySelector(".popup-form");
const mainContent = document.getElementById("about"); // adjust main container id if needed

let scrollPosition = 0;

// Function to lock scroll
function lockScroll() {
  scrollPosition = window.pageYOffset;
  document.body.style.overflow = "hidden";
  mainContent.classList.add("blur-bg"); // blur main content
}

// Function to unlock scroll
function unlockScroll() {
  document.body.style.overflow = "";
  mainContent.classList.remove("blur-bg"); // remove blur
  window.location.hash = ""; // ensures modal closes
}

// Open modal
openBtn.addEventListener("click", () => {
  lockScroll();
});

// Close modal on × button
closeBtn.addEventListener("click", () => {
  unlockScroll();
});

/* ===== EmailJS Form Handling ===== */

// Initialize EmailJS
emailjs.init("G1IdO1P9S34WcEv5W"); // replace with your EmailJS public key

// Email validation function
function isValidEmail(email) {
  // Basic regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailField = this.querySelector('input[type="email"]');
  const emailValue = emailField.value.trim();

  if (!isValidEmail(emailValue)) {
    alert("❌ Please enter a valid email address!");
    emailField.focus();
    return;
  }

  emailjs
    .sendForm("service_ps8jt39", "template_su9brrr", this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset();
      unlockScroll(); // close modal after sending
    })
    .catch((err) => {
      alert("❌ Error sending message: " + JSON.stringify(err));
    });
});
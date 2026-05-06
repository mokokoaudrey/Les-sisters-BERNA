const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

const setMenuState = (isOpen) => {
  navMenu.classList.toggle("is-open", isOpen);
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  document.body.classList.toggle("menu-open", isOpen);
};

const toggleMenu = () => {
  setMenuState(!navMenu.classList.contains("is-open"));
};

const closeMenu = () => {
  setMenuState(false);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showFormMessage = (message, isError = false) => {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
};

navToggle.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const clickInsideMenu = navMenu.contains(event.target);
  const clickOnToggle = navToggle.contains(event.target);

  if (!clickInsideMenu && !clickOnToggle && navMenu.classList.contains("is-open")) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !message) {
    showFormMessage("Merci de compléter tous les champs avant l’envoi.", true);
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage("Merci d’indiquer une adresse email valide.", true);
    return;
  }

  showFormMessage("Votre demande est prête. Merci, Les Sister’s BERNA vous répondra rapidement.");
  contactForm.reset();
});

currentYear.textContent = new Date().getFullYear();

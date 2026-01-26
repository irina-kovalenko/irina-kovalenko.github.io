// ===== Mobile menu =====
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// ===== Form validation =====
const form = document.getElementById("leadForm");
const hint = document.getElementById("formHint");

function setHint(text, ok) {
  if (!hint) return;
  hint.textContent = text;
  hint.style.color = ok ? "rgba(15,23,42,.75)" : "#b42318";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();

    if (name.length < 2) return setHint("Please enter your name.", false);
    if (!email.includes("@") || !email.includes(".")) return setHint("Please enter a valid email.", false);

    setHint("Thanks! We will contact you soon. ✅", true);
    form.reset();
  });
}

// ===== Cookie consent (localStorage) =====
const cookie = document.getElementById("cookie");
const KEY = "cookie_consent_exam";

if (cookie) {
  const saved = localStorage.getItem(KEY);
  if (saved) cookie.hidden = true;

  document.getElementById("cookieAccept")?.addEventListener("click", () => {
    localStorage.setItem(KEY, "accepted");
    cookie.hidden = true;
  });

  document.getElementById("cookieDecline")?.addEventListener("click", () => {
    localStorage.setItem(KEY, "declined");
    cookie.hidden = true;
  });
}

// ===== Video modal =====
const modal = document.getElementById("demoModal");
const watchBtn = document.getElementById("watchDemoBtn");
const closeBtn = document.getElementById("closeModalBtn");

if (watchBtn && modal) {
  watchBtn.addEventListener("click", () => {
    if (typeof modal.showModal === "function") modal.showModal();
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => modal.close());
}

if (modal) {
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const inside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!inside) modal.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.close();
  });
}

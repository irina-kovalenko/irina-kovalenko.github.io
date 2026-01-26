// Mobile menu
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}

// Form validation
const form = document.getElementById("leadForm");
const hint = document.getElementById("formHint");

function showHint(text, ok) {
  if (!hint) return;
  hint.textContent = text;
  hint.style.color = ok ? "rgba(15,23,42,.75)" : "#b42318";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();

    if (name.length < 2) return showHint("Please enter your name.", false);
    if (!email.includes("@") || !email.includes(".")) return showHint("Please enter a valid email.", false);

    showHint("Thanks! We will contact you soon. ✅", true);
    form.reset();
  });
}

// Cookies (localStorage)
const cookie = document.getElementById("cookie");
const KEY = "cookie_consent_exam";

if (cookie) {
  if (localStorage.getItem(KEY)) cookie.hidden = true;

  document.getElementById("cookieAccept")?.addEventListener("click", () => {
    localStorage.setItem(KEY, "accepted");
    cookie.hidden = true;
  });

  document.getElementById("cookieDecline")?.addEventListener("click", () => {
    localStorage.setItem(KEY, "declined");
    cookie.hidden = true;
  });
}

// Video modal
const modal = document.getElementById("demoModal");
const watch = document.getElementById("watchDemoBtn");
const close = document.getElementById("closeModalBtn");

watch?.addEventListener("click", () => modal?.showModal?.());
close?.addEventListener("click", () => modal?.close());

modal?.addEventListener("click", (e) => {
  const r = modal.getBoundingClientRect();
  const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
  if (!inside) modal.close();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal?.close();
});

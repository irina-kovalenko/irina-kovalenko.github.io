// ===== Helpers =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ===== Footer year ===== */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ===== Mobile menu ===== */
const burger = $(".burger");
const mobileMenu = $(".mobile-menu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });

  // close on click
  $$(".mobile-menu a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    })
  );
}

/* ===== Desktop dropdown (Solutions) ===== */
const dd = document.querySelector("[data-dd]");
if (dd) {
  const btn = dd.querySelector(".nav-dd__btn");
  const menu = dd.querySelector(".nav-dd__menu");
  if (!btn || !menu) {
    // If markup changes, avoid runtime errors
  } else {
    const close = () => {
      btn.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    };
    const open = () => {
      btn.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    };

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });

    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      close();
    });

    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }
}

/* ===== How section steps (simple interactive) ===== */
const pills = $$(".pill");
const badge = $("#howBadge");
const stepText = {
  1: "Step 1: Improve rating visibility",
  2: "Step 2: Catch negative feedback early",
  3: "Step 3: Bring customers back with reminders",
};

pills.forEach((btn) => {
  btn.addEventListener("click", () => {
    pills.forEach((x) => x.classList.remove("is-active"));
    btn.classList.add("is-active");

    const step = btn.dataset.step || "1";
    const raw = stepText[step] || stepText["1"];
    const msg = raw.split(": ")[1] || raw;

    if (badge) badge.innerHTML = `<strong>Step ${step}:</strong> ${msg}`;
  });
});

/* ===== Cookie consent (localStorage) ===== */
const cookie = $("#cookie");
const KEY = "demo_cookie_consent";

let saved = null;
try {
  saved = localStorage.getItem(KEY);
} catch {}

if (cookie) {
  if (saved) cookie.style.display = "none";

  $("#cookieAccept")?.addEventListener("click", () => {
    try { localStorage.setItem(KEY, "accepted"); } catch {}
    cookie.style.display = "none";
  });

  $("#cookieDecline")?.addEventListener("click", () => {
    try { localStorage.setItem(KEY, "declined"); } catch {}
    cookie.style.display = "none";
  });
}

/* ===== Form validation (client side) ===== */
const form = $("#leadForm");
const hint = $("#formHint");

function setHint(text, ok = true) {
  if (!hint) return;
  hint.textContent = text;
  hint.style.color = ok ? "rgba(15,23,42,.75)" : "#b42318";
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const type = String(data.get("type") || "").trim();
    const privacy = data.get("privacy") === "on";

    if (name.length < 2) return setHint("Please enter your name.", false);
    if (!email.includes("@") || !email.includes(".")) return setHint("Please enter a valid email.", false);
    if (!type) return setHint("Please select a business type.", false);
    if (!privacy) return setHint("Please accept the privacy policy checkbox.", false);

    setHint("Thanks! Form is valid (demo). You can connect this to any backend later ✅", true);
    form.reset();
  });
}

/* ===== Demo modal ===== */
const modal = $("#demoModal");

$("#watchDemoBtn")?.addEventListener("click", () => {
  if (modal?.showModal) modal.showModal();
});

$("[data-close]")?.addEventListener("click", () => modal?.close());

// close when clicking on the backdrop (outside the dialog content)
modal?.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

/* ===== Close mobile menu on desktop resize ===== */
window.addEventListener("resize", () => {
  if (!burger || !mobileMenu) return;
  if (window.innerWidth > 760) {
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  }
});

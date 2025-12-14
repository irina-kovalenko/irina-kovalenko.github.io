const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

let idx = 0;

function setActive(i) {
  idx = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));

  // dots
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));

  // update URL hash (nice for bookmarking)
  history.replaceState(null, "", `#${slides[idx].id}`);
}

function buildDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.title = s.dataset.title ? `${i + 1}. ${s.dataset.title}` : `Slide ${i + 1}`;
    b.addEventListener("click", () => setActive(i));
    dotsWrap.appendChild(b);
  });
}

function next() { setActive(idx + 1); }
function prev() { setActive(idx - 1); }

buildDots();

// start from hash if present
const hash = (location.hash || "").replace("#", "");
const startIndex = slides.findIndex(s => s.id === hash);
setActive(startIndex >= 0 ? startIndex : 0);

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") next();
  if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") prev();
});

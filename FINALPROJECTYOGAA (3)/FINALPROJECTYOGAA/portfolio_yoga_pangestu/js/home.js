/* ==========================================================================
   SKRIP BERANDA — link media sosial & carousel kartu 3D
   Membutuhkan SOCIAL_URLS dari js/config.js
   ========================================================================== */
(() => {
  "use strict";

  /* ---------- Link media sosial ---------- */
  const isPlaceholder = (url) => !url || /USERNAME|XXXXXXXXXX/.test(url);

  document.querySelectorAll("[data-social]").forEach((link) => {
    const key = link.dataset.social;
    const url = SOCIAL_URLS[key];

    link.href = isPlaceholder(url) ? "#" : url;
    link.addEventListener("click", (event) => {
      if (!isPlaceholder(url)) return;
      event.preventDefault();
      alert(`Ganti link ${key} di file js/config.js dengan link akun kamu terlebih dahulu.`);
    });
  });

  /* ---------- Carousel kartu ---------- */
  const carousel = document.getElementById("carousel");
  const pauseButton = document.getElementById("pauseButton");
  const cards = [...document.querySelectorAll(".portfolio-card")];
  if (!carousel || !cards.length) return;

  const SPEED = 0.012;           // kecepatan putar otomatis
  const DRAG_SENSITIVITY = 0.22; // sensitivitas geser
  const DRAG_THRESHOLD = 6;      // jarak (px) sebelum dianggap menggeser, bukan mengklik
  const mobileQuery = window.matchMedia("(max-width: 650px)");

  let angle = 0;
  let lastTime = 0;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pointerX = null;
  let startX = 0;
  let dragging = false;
  let justDragged = false;

  function layoutCards() {
    const mobile = mobileQuery.matches;
    const radiusX = Math.min(window.innerWidth * (mobile ? 0.56 : 0.36), mobile ? 230 : 420);
    const radiusZ = mobile ? 105 : 155;
    const radiusY = mobile ? 12 : 18;

    cards.forEach((card, index) => {
      const a = (angle + index * (360 / cards.length)) * Math.PI / 180;
      const x = Math.sin(a) * radiusX;
      const z = Math.cos(a) * radiusZ;
      const y = Math.sin(a * 2) * radiusY;
      const depth = (z + radiusZ) / (2 * radiusZ);   // 0 = belakang, 1 = depan

      card.style.zIndex = String(Math.round(100 + z));
      card.style.opacity = String(0.68 + depth * 0.32);
      card.style.transform =
        `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) ` +
        `rotateY(${-Math.sin(a) * 12}deg) rotateZ(${-Math.sin(a) * 5}deg) ` +
        `scale(${0.76 + depth * 0.24})`;
    });
  }

  function animate(time) {
    if (!lastTime) lastTime = time;
    const delta = Math.min(time - lastTime, 40);
    lastTime = time;

    if (!paused && !dragging) angle = (angle + delta * SPEED) % 360;
    layoutCards();
    requestAnimationFrame(animate);
  }

  /* Geser dengan mouse / jari — boleh dimulai dari atas kartu.
     Klik biasa tetap membuka kartu; klik setelah menggeser diabaikan. */
  carousel.addEventListener("pointerdown", (event) => {
    pointerX = startX = event.clientX;
    justDragged = false;
  });

  carousel.addEventListener("pointermove", (event) => {
    if (pointerX === null) return;

    if (!dragging) {
      if (Math.abs(event.clientX - startX) < DRAG_THRESHOLD) return;
      dragging = true;
      carousel.setPointerCapture?.(event.pointerId);
    }
    angle += (event.clientX - pointerX) * DRAG_SENSITIVITY;
    pointerX = event.clientX;
  });

  function endDrag() {
    justDragged = dragging;
    dragging = false;
    pointerX = null;
  }
  carousel.addEventListener("pointerup", endDrag);
  carousel.addEventListener("pointercancel", endDrag);

  carousel.addEventListener("click", (event) => {
    if (!justDragged) return;
    event.preventDefault();
    event.stopPropagation();
    justDragged = false;
  }, true);

  carousel.addEventListener("dragstart", (event) => event.preventDefault());

  pauseButton?.addEventListener("click", () => {
    paused = !paused;
    pauseButton.textContent = paused ? "LANJUTKAN PUTARAN" : "JEDA PUTARAN";
    pauseButton.setAttribute("aria-pressed", String(paused));
  });

  window.addEventListener("resize", layoutCards);
  requestAnimationFrame(animate);
})();

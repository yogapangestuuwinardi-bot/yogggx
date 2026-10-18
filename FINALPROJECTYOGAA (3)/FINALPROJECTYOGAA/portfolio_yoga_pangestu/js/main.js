/* ==========================================================================
   SKRIP BERSAMA — dipakai di semua halaman
   ========================================================================== */
(() => {
  "use strict";

  // Sembunyikan gambar opsional yang filenya belum ada,
  // sehingga desain dasar / petunjuk tetap terlihat.
  document.querySelectorAll("img[data-optional]").forEach((img) => {
    const hide = () => { img.style.display = "none"; };
    if (img.complete && img.naturalWidth === 0) hide();
    else img.addEventListener("error", hide, { once: true });
  });

  // Isi tahun otomatis di footer.
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Layar overlay: dipakai oleh loading awal & motivasi bunga ---------- */
  const root = document.documentElement;
  const isHome = document.body.classList.contains("page-home");

  function openOverlay(html) {
    const overlay = document.createElement("div");
    overlay.className = "loader";
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    document.body.classList.add("is-loading");
    return overlay;
  }

  function closeOverlay(overlay, after) {
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("is-loading");
      if (after) after();
    }, 450);
  }

  function markSeen() {
    try { sessionStorage.setItem("splashSeen", "1"); } catch (e) {}
  }

  /* ---------- 1. Loading awal: "SABAR YAH OM" + bar, tampil saat web baru dibuka ---------- */
  const LOAD_MS = 3800;   // lama loading (ms)

  if (isHome && root.classList.contains("has-splash")) {
    const overlay = openOverlay(
      '<p class="loader-text">SABAR YAH OM,<br>LAGI LOADING…</p>' +
      '<div class="loader-bar" aria-hidden="true"><div class="loader-fill"></div></div>' +
      '<span class="loader-percent">0%</span>'
    );
    overlay.classList.add("show");                 // langsung tampil, tanpa kilatan halaman
    root.classList.remove("has-splash");

    const fill = overlay.querySelector(".loader-fill");
    const percent = overlay.querySelector(".loader-percent");
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / LOAD_MS, 1);
      const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;   // pelan–cepat–pelan
      const value = Math.round(eased * 100);
      fill.style.width = value + "%";
      percent.textContent = value + "%";
      if (t < 1) return requestAnimationFrame(tick);
      setTimeout(() => { markSeen(); closeOverlay(overlay, () => window.scrollTo({ top: 0 })); }, 500);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- 2. Klik bunga ✿: hanya motivasi sekilas, lalu kembali ke web utama ---------- */
  const flower = document.querySelector(".top-mark");
  if (flower) {
    const QUOTE_MS = 3500;                          // lama motivasi tampil (ms)
    const homeUrl = isHome ? null : "../index.html"; // dari halaman lain → ke beranda
    let showing = false;

    flower.removeAttribute("aria-hidden");
    flower.setAttribute("role", "button");
    flower.setAttribute("tabindex", "0");
    flower.setAttribute("aria-label", "Tampilkan motivasi");

    function showQuote() {
      if (showing) return;
      showing = true;
      const overlay = openOverlay(
        '<figure class="loader-quote">' +
          '<blockquote>“Jangan takut mencoba, takutlah jika tak pernah berusaha.”</blockquote>' +
          '<figcaption>Terinspirasi dari QS. An-Najm ayat 39</figcaption>' +
        '</figure>'
      );
      requestAnimationFrame(() => overlay.classList.add("show"));

      setTimeout(() => {
        if (homeUrl) { markSeen(); window.location.href = homeUrl; return; }   // tanpa loading lagi
        closeOverlay(overlay, () => { showing = false; window.scrollTo({ top: 0 }); });
      }, QUOTE_MS);
    }

    flower.addEventListener("click", showQuote);
    flower.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showQuote(); }
    });
  }
})();

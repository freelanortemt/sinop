// Freela Norte — Link in Bio
(() => {
  const $ = (s, p=document) => p.querySelector(s);

  // Year
  const y = new Date().getFullYear();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(y);

  // Background preload swap
  const bg = document.querySelector(".bg");
  const hq = document.querySelector(".bg-hq");
  if (hq) {
    if (hq.complete) bg?.classList.add("ready");
    else hq.addEventListener("load", () => bg?.classList.add("ready"));
  }

  // Copy page URL
  const btnCopy = $("#btnCopy");
  btnCopy?.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copiado ✅");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast("Link copiado ✅");
    }
  });

  // Modal
  const modal = $("#modal");
  const openModal = $("#openModal");
  const closeModal = () => {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
  };
  const showModal = () => {
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
  };

  openModal?.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Minimal toast
  let toastEl = null;
  function toast(msg) {
    if (toastEl) toastEl.remove();
    toastEl = document.createElement("div");
    toastEl.textContent = msg;
    toastEl.style.position = "fixed";
    toastEl.style.left = "50%";
    toastEl.style.bottom = "18px";
    toastEl.style.transform = "translateX(-50%)";
    toastEl.style.padding = "10px 14px";
    toastEl.style.borderRadius = "999px";
    toastEl.style.border = "1px solid rgba(255,255,255,.18)";
    toastEl.style.background = "rgba(12, 16, 34, .88)";
    toastEl.style.backdropFilter = "blur(10px)";
    toastEl.style.color = "rgba(238,243,255,.92)";
    toastEl.style.fontFamily = "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
    toastEl.style.fontWeight = "800";
    toastEl.style.fontSize = "13px";
    toastEl.style.boxShadow = "0 18px 50px rgba(0,0,0,.45)";
    toastEl.style.zIndex = "20";
    document.body.appendChild(toastEl);
    setTimeout(() => { toastEl?.remove(); toastEl = null; }, 1800);
  }
})();

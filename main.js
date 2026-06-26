/* ============================================================
   Portfolio — interactions
   - RU/EN language toggle (data-ru / data-en text + data-*-attr)
   - Scroll-reveal, footer year
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";
  var supported = ["ru", "en"];

  /* ---------- Language ---------- */
  // replay the page entrance animation (used on language switch)
  function playEnter() {
    var m = document.querySelector("main");
    if (!m) return;
    m.style.animation = "none";
    void m.offsetWidth;   // force reflow so the animation restarts
    m.style.animation = "";
  }

  function applyLang(lang, animate) {
    if (supported.indexOf(lang) === -1) lang = "en";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-ru][data-en]").forEach(function (el) {
      var next = el.getAttribute("data-" + lang);
      if (next !== null) el.textContent = next;
    });

    document.querySelectorAll("*").forEach(function (el) {
      for (var i = 0; i < el.attributes.length; i++) {
        var attr = el.attributes[i];
        var m = attr.name.match(/^data-(ru|en)-(.+)$/);
        if (m && m[1] === lang) el.setAttribute(m[2], attr.value);
      }
    });

    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
    });

    if (animate) playEnter();
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var saved = "en";
    try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) {}
    applyLang(saved);   // initial: CSS plays the load animation
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.dataset.lang, true); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header hairline on scroll ---------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 4); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile burger menu ---------- */
  function initBurger() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.querySelector(".nav-menu");
    if (!burger || !menu) return;
    function setOpen(o) {
      menu.classList.toggle("open", o);
      burger.setAttribute("aria-expanded", o ? "true" : "false");
    }
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !burger.contains(e.target)) setOpen(false);
    });
  }

  /* ---------- Portrait carousel (About) ---------- */
  function initPortrait() {
    document.querySelectorAll("[data-portrait]").forEach(function (root) {
      var slides = root.querySelectorAll(".portrait-slide");
      var dots = root.querySelectorAll(".dot");
      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          slides.forEach(function (s, j) { s.classList.toggle("active", i === j); });
          dots.forEach(function (d, j) { d.classList.toggle("active", i === j); });
        });
      });
    });
  }

  /* ---------- Modal / drawer ---------- */
  function initModal() {
    var openBtns = document.querySelectorAll("[data-modal-open]");
    if (!openBtns.length) return;
    var current = null;

    function open(id) {
      var m = document.getElementById(id);
      if (!m) return;
      m.classList.add("open");
      document.body.style.overflow = "hidden";
      current = m;
    }
    function close() {
      if (!current) return;
      current.classList.remove("open");
      document.body.style.overflow = "";
      current = null;
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", function () { open(btn.getAttribute("data-modal-open")); });
    });

    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
      // click outside the panel closes
      overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
      var closeBtn = overlay.querySelector(".modal-close");
      if (closeBtn) closeBtn.addEventListener("click", close);

      // mobile: swipe the sheet down to close
      var sheet = overlay.querySelector(".modal");
      if (!sheet) return;
      var startY = 0, dy = 0, dragging = false;
      sheet.addEventListener("touchstart", function (e) {
        if (sheet.scrollTop > 0) return;          // let content scroll first
        dragging = true; startY = e.touches[0].clientY; dy = 0;
        sheet.style.transition = "none";
      }, { passive: true });
      sheet.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        dy = e.touches[0].clientY - startY;
        if (dy > 0) sheet.style.transform = "translateY(" + dy + "px)";
      }, { passive: true });
      sheet.addEventListener("touchend", function () {
        if (!dragging) return;
        dragging = false;
        sheet.style.transition = "";
        sheet.style.transform = "";
        if (dy > 110) close();
      });
    });

    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initReveal();
    initHeader();
    initBurger();
    initPortrait();
    initModal();
    initYear();
  });
})();

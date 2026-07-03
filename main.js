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
      // desktop: a click anywhere dismisses the modal; mobile sheet: only the
      // backdrop closes, so you can still scroll/tap inside the sheet
      overlay.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 640px)").matches) {
          if (e.target === overlay) close();
        } else {
          close();
        }
      });

      // mobile: swipe the sheet down to close
      var sheet = overlay.querySelector(".modal");
      if (!sheet) return;
      var SPRING = "transform .32s cubic-bezier(.22,.61,.36,1)";
      var startY = 0, dy = 0, dragging = false;

      // clears the inline styles left behind by a drag so the next open is clean
      function resetSheet() {
        sheet.style.transition = "";
        sheet.style.transform = "";
      }

      // drag can start anywhere on the sheet; only from the top of its
      // scroll so a pull-down closes instead of fighting content scroll
      sheet.addEventListener("touchstart", function (e) {
        if (sheet.scrollTop > 0) { dragging = false; return; }
        dragging = true; startY = e.touches[0].clientY; dy = 0;
        sheet.style.transition = "none";          // follow the finger 1:1
      }, { passive: true });

      sheet.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        dy = e.touches[0].clientY - startY;
        if (dy > 0) {
          sheet.style.transform = "translateY(" + dy + "px)";
          if (e.cancelable) e.preventDefault();   // own the gesture — no content/page scroll under it
        } else {
          sheet.style.transform = "";
        }
      }, { passive: false });

      sheet.addEventListener("touchend", function () {
        if (!dragging) return;
        dragging = false;

        if (dy <= 0) { resetSheet(); return; }    // no downward drag — nothing to animate

        sheet.style.transition = SPRING;
        if (dy > 90) {
          // slide fully out, then close once the animation settles
          sheet.style.transform = "translateY(100%)";
          sheet.addEventListener("transitionend", function onEnd() {
            sheet.removeEventListener("transitionend", onEnd);
            resetSheet();
            close();
          });
        } else {
          // spring back into place
          sheet.style.transform = "";
          sheet.addEventListener("transitionend", function onBack() {
            sheet.removeEventListener("transitionend", onBack);
            sheet.style.transition = "";
          });
        }
      });
    });

    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Footer logo easter egg (squish + juice bits) ---------- */
  // Клик по чернике в футере: она хлопается к центру и пружинисто вырастает
  // обратно, попутно разбрасывая пару черничных брызг. Тач = тот же click,
  // так что работает и на десктопе, и на мобилке.
  function initBerry() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".legal-logo").forEach(function (logo) {
      logo.setAttribute("role", "button");
      logo.setAttribute("tabindex", "0");
      logo.setAttribute("title", "🫐");
      logo.draggable = false;

      // раскидываем несколько маленьких кружков из центра логотипа
      function burst() {
        var rect = logo.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var n = 6;
        for (var i = 0; i < n; i++) {
          var bit = document.createElement("span");
          bit.className = "berry-bit";
          var angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.7;
          var dist = 24 + Math.random() * 22;
          var size = 4 + Math.random() * 4;
          bit.style.left = cx + "px";
          bit.style.top = cy + "px";
          bit.style.width = bit.style.height = size.toFixed(1) + "px";
          bit.style.setProperty("--dx", (Math.cos(angle) * dist).toFixed(1) + "px");
          bit.style.setProperty("--dy", (Math.sin(angle) * dist).toFixed(1) + "px");
          bit.addEventListener("animationend", function () { this.remove(); });
          document.body.appendChild(bit);
        }
      }

      function squish() {
        logo.classList.remove("squish");
        void logo.offsetWidth;               // reflow — чтобы анимация проигралась заново
        logo.classList.add("squish");
        if (!reduce) setTimeout(burst, 200);  // брызги — в момент «хлопка» (точка схлопывания)
      }

      logo.addEventListener("click", squish);
      logo.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); squish(); }
      });
      logo.addEventListener("animationend", function () { logo.classList.remove("squish"); });
    });
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
    initBerry();
    initYear();
  });
})();

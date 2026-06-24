/* Linganore Technologies — site behavior
   Theme toggle (persisted), sticky-nav border, mobile menu, scroll reveals. */

(function () {
  "use strict";

  /* ── Theme ── */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("lt-theme"); } catch (e) {}
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }

  function syncToggleLabel() {
    var t = root.getAttribute("data-theme");
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
      var sun = btn.querySelector(".i-sun");
      var moon = btn.querySelector(".i-moon");
      if (sun && moon) {
        sun.style.display = t === "dark" ? "block" : "none";
        moon.style.display = t === "dark" ? "none" : "block";
      }
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("lt-theme", next); } catch (err) {}
    syncToggleLabel();
  });

  /* ── Mobile menu ── */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-menu-toggle]");
    if (!btn) return;
    var menu = document.getElementById("mobile-menu");
    if (!menu) return;
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ── Sticky nav border on scroll ── */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Reveal on scroll ── */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Year stamp ── */
  function stampYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function init() { syncToggleLabel(); onScroll(); initReveals(); stampYear(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();

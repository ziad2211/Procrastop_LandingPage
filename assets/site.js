/*
 * Fills the shared values from config.js into every page, then adds the one
 * piece of motion the site uses. Everything here degrades to a working page
 * if it fails: the HTML already carries real text, so this only replaces it.
 */
(function () {
  "use strict";

  var config = window.APP_CONFIG || {};

  function fill(selector, apply) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) apply(nodes[i]);
  }

  if (config.primaryColor) {
    document.documentElement.style.setProperty("--accent", config.primaryColor);
  }

  if (config.name) fill("[data-app-name]", function (el) { el.textContent = config.name; });
  if (config.developerName) fill("[data-developer-name]", function (el) { el.textContent = config.developerName; });
  if (config.updatedAt) fill("[data-updated-at]", function (el) { el.textContent = config.updatedAt; });

  if (config.supportEmail) {
    fill("[data-support-email]", function (el) {
      el.href = "mailto:" + config.supportEmail;
      // Links that already read "Contact" keep their label; the ones that
      // print the address get the address.
      if (el.textContent.indexOf("@") !== -1) el.textContent = config.supportEmail;
    });
  }

  var tagline = document.querySelector("[data-tagline]");
  if (tagline && config.tagline) tagline.textContent = config.tagline;

  var description = document.querySelector("[data-description]");
  if (description && config.description) description.textContent = config.description;

  // Every App Store button on the page. Without a real link they stay inert
  // rather than sending anyone to a dead URL.
  fill("[data-app-store-link]", function (el) {
    if (config.appStoreUrl && config.appStoreUrl !== "#") {
      el.href = config.appStoreUrl;
      el.rel = "noopener";
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
    }
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Sections fade up once as they arrive. Anyone who has asked for less
  // motion, or whose browser lacks the observer, simply sees them already in
  // place: the CSS handles the first case and this handles the second.
  var wantsMotion = !window.matchMedia || !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");

  if (!wantsMotion || !("IntersectionObserver" in window)) {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add("is-in");
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

  for (var j = 0; j < reveals.length; j++) observer.observe(reveals[j]);
})();

(function () {
  const config = window.APP_CONFIG || {};
  document.documentElement.style.setProperty("--accent", config.primaryColor || "#5b5ce2");
  document.querySelectorAll("[data-app-name]").forEach((element) => { element.textContent = config.name || "Your App"; });
  document.querySelectorAll("[data-developer-name]").forEach((element) => { element.textContent = config.developerName || "Your company or name"; });
  document.querySelectorAll("[data-support-email]").forEach((element) => { element.textContent = config.supportEmail || "support@example.com"; element.href = `mailto:${config.supportEmail || "support@example.com"}`; });
  document.querySelectorAll("[data-updated-at]").forEach((element) => { element.textContent = config.updatedAt || ""; });
  const tagline = document.querySelector("[data-tagline]"); if (tagline) tagline.textContent = config.tagline || "";
  const description = document.querySelector("[data-description]"); if (description) description.textContent = config.description || "";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && document.body.dataset.page === "home" && config.description) metaDescription.content = config.description;
  const storeLink = document.querySelector("[data-app-store-link]");
  if (storeLink && config.appStoreUrl && config.appStoreUrl !== "#") storeLink.href = config.appStoreUrl;
  // Procrastop is not on the App Store yet, so the primary action is a label,
  // not a link.
  else if (storeLink) { storeLink.removeAttribute("href"); storeLink.setAttribute("aria-disabled", "true"); }
  document.title = document.title.replace("Your App", config.name || "Your App");

  // Shared task links are Universal Links: `…/Procrastop/?title=…&due=…&time=…`.
  // When Procrastop is installed iOS opens the app and this page never loads.
  // Reaching this code means the app is not installed, so the page names the
  // task the sender meant to pass on. It deliberately offers no second link —
  // that one URL is the whole mechanism.
  const query = new URLSearchParams(window.location.search);
  const sharedTitle = (query.get("title") || "").trim();
  const sharedDue = query.get("due") || "";
  const sharedTime = query.get("time") || "";
  const hasDue = /^\d{4}-\d{2}-\d{2}$/.test(sharedDue);
  const hasTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(sharedTime);

  if (sharedTitle && hasDue && tagline) {
    const due = new Date(`${sharedDue}T${hasTime ? sharedTime : "00:00"}`);
    let when = sharedDue;
    if (!isNaN(due.getTime())) {
      when = due.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
      if (hasTime) when += ` at ${due.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    }
    tagline.textContent = `Someone shared a task with you: “${sharedTitle}”, due ${when}. Procrastop is not installed on this device — once it is, opening this link again adds the task to your list.`;
  }
})();

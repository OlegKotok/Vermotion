async function loadLocale(lang = 'ua') {
  try {
    const res = await fetch(`./locales/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const keys = key.split(".");
      let value = translations;
      for (const k of keys) {
        if (value[k] === undefined) return;
        value = value[k];
      }
      el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[key]) {
        el.placeholder = translations[key];
      }
    });

  } catch (error) {
    console.error("Помилка завантаження мови:", error);
  }
}

// Завантаження мови при старті
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ua";
  loadLocale(savedLang);
});
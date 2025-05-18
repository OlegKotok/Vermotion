document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const submitBtn = form.querySelector("button[type=submit]");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Надсилається...";
    }
  });
}

// Language selector dropdown logic
const langToggle = document.getElementById("lang-toggle");
const langDropdown = document.querySelector(".language-dropdown");

if (langToggle && langDropdown) {
  langToggle.addEventListener("click", () => {
    langDropdown.style.display =
      langDropdown.style.display === "none" || !langDropdown.style.display
        ? "flex"
        : "none";
  });

  document.addEventListener("click", (e) => {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.style.display = "none";
    }
  });

  // Language button click handler
  document.querySelectorAll(".language-dropdown button[data-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedLang = btn.getAttribute("data-lang");
      localStorage.setItem("lang", selectedLang);

      // Update flag on toggle button
      const flagImg = btn.querySelector("img");
      if (flagImg) {
        langToggle.querySelector("img").src = flagImg.src;
        langToggle.querySelector("img").alt = flagImg.alt;
      }

      langDropdown.style.display = "none";

      // Uncomment if i18n implemented
      if (typeof loadLocale === "function") {
        loadLocale(selectedLang);
      }
    });
  });
}

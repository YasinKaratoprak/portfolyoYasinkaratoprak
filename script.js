/* ============================================================
   PORTFOLIO — script.js
   Handles: Language toggle (EN/TR), SPA-style navigation,
            mobile menu, and active link tracking
   ============================================================ */

// ——————————————————————————————————————————————
// 1. TRANSLATIONS — All translatable strings
// ——————————————————————————————————————————————
const translations = {
  en: {
    nav_home: "Homepage",
    nav_about: "About",
    nav_presentations: "Presentations",
    nav_blog: "Blog",
    nav_contact: "Contact",
    home_subtitle: "[ Security Researcher & Developer ]",
    home_text:
      "This website contains my projects and personal information. You can navigate to the 'Blog' section to read my posts. You can also follow me on the social media platforms listed below.",
    about_label_name: "Name",
    about_label_uni: "University",
    about_label_focus: "Focus",
    about_uni: "Yaşar University — Computer Engineering",
    about_focus: "Web Security & Low-Level Security",
    about_text:
      "I have been involved in computer security since I was 16. I am a Computer Engineering student at Yaşar University. I am currently interested in web security and low-level security. In my spare time, I develop open-source tools and create content.",
    pres_title: "IDOR Workshop",
    pres_desc: "Detection and Analysis of IDOR Vulnerabilities",
    pres_meta: "Yaşar University Cybersecurity Society",
    contact_label: "email",
    footer_rights: "All rights reserved.",
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımda",
    nav_presentations: "Sunumlar",
    nav_blog: "Blog",
    nav_contact: "İletişim",
    home_subtitle: "[ Güvenlik Araştırmacısı & Geliştirici ]",
    home_text:
      "Bu web sitesi projelerimi ve kişisel bilgilerimi içermektedir. Yazılarımı okumak için 'Blog' bölümüne gidebilirsiniz. Ayrıca beni aşağıda listelenen sosyal medya platformlarından da takip edebilirsiniz.",
    about_label_name: "İsim",
    about_label_uni: "Üniversite",
    about_label_focus: "İlgi Alanı",
    about_uni: "Yaşar Üniversitesi — Bilgisayar Mühendisliği",
    about_focus: "Web Güvenliği & Düşük Seviye Güvenlik",
    about_text:
      "16 yaşımdan beri bilgisayar güvenliği ile ilgileniyorum. Yaşar Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Şu anda web güvenliği ve düşük seviye güvenlik alanlarıyla ilgileniyorum. Boş zamanlarımda açık kaynaklı araçlar geliştiriyor ve içerik üretiyorum.",
    pres_title: "IDOR Atölyesi",
    pres_desc: "IDOR Zafiyetlerinin Tespiti ve Analizi",
    pres_meta: "Yaşar Üniversitesi Siber Güvenlik Topluluğu",
    contact_label: "e-posta",
    footer_rights: "Tüm hakları saklıdır.",
  },
};

// ——————————————————————————————————————————————
// 2. STATE
// ——————————————————————————————————————————————
let currentLang = "en"; // Default language
let currentTheme = localStorage.getItem("theme") || "dark"; // Default theme

// ——————————————————————————————————————————————
// 3. DOM REFERENCES
// ——————————————————————————————————————————————
const langToggle = document.getElementById("lang-toggle");
const langLabel = langToggle.querySelector(".lang-label");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const allNavLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
const sections = document.querySelectorAll(".section");

// ——————————————————————————————————————————————
// 4. LANGUAGE SWITCHING
// ——————————————————————————————————————————————

/**
 * Apply translations for the selected language to every
 * element that carries a [data-i18n] attribute.
 */
function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Update the <html> lang attribute for accessibility
  document.documentElement.lang = lang;

  // Update the toggle button label: show the *other* language option
  langLabel.textContent = lang === "en" ? "TR" : "EN";
}

/** Toggle between EN and TR */
langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "tr" : "en");
});

// ——————————————————————————————————————————————
// 5. SPA-STYLE NAVIGATION
// ——————————————————————————————————————————————

/**
 * Show only the target section and update active states
 * on both desktop and mobile nav links.
 */
function navigateTo(sectionId) {
  // Hide all sections, show the target
  sections.forEach((s) => s.classList.remove("section--active"));
  const target = document.getElementById(sectionId);
  if (target) target.classList.add("section--active");

  // Update active class on nav links
  allNavLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("data-section") === sectionId);
  });

  // Close mobile menu if open
  closeMobileMenu();

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Attach click handlers to every nav link that has a data-section
allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const sectionId = link.getAttribute("data-section");
    // Only handle internal section links; let Blog (href="#") pass through
    if (sectionId) {
      e.preventDefault();
      navigateTo(sectionId);
    }
  });
});

// ——————————————————————————————————————————————
// 6. MOBILE MENU
// ——————————————————————————————————————————————

function closeMobileMenu() {
  mobileNav.classList.remove("open");
  mobileNav.setAttribute("aria-hidden", "true");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open");
  mobileNav.setAttribute("aria-hidden", !isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// ——————————————————————————————————————————————
// 7. THEME TOGGLE
// ——————————————————————————————————————————————

/**
 * Apply the given theme to the page.
 * Sets data-theme on <html> and updates the toggle icon.
 */
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  // ☀ = currently dark, click to switch to light
  // ☽ = currently light, click to switch to dark
  themeIcon.textContent = theme === "dark" ? "☀" : "☽";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

// ——————————————————————————————————————————————
// 8. INITIALISATION
// ——————————————————————————————————————————————
// Set default language on first load
applyLanguage("en");
// Apply saved or default theme
applyTheme(currentTheme);

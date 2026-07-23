/* ============================================================
   PORTFOLIO — script.js
   Theme (system-aware), language (EN/TR), contact-form status
   ============================================================ */

// ——————————————————————————————————————————————
// 1. TRANSLATIONS
// ——————————————————————————————————————————————
const translations = {
  en: {
    nav_about: "About", nav_projects: "Projects", nav_talks: "Talks", nav_contact: "Contact",
    hero_role: "Security Researcher & Developer",
    hero_text: "I work on web security, AI security, and network security, build open-source tools, and write about what I learn on my blog.",
    about_title: "About",
    about_text: "I have been involved in computer security since I was 16. I am a Computer Engineering student at Yaşar University. I am currently interested in web security, AI security, and network security. In my spare time, I develop open-source tools and create content.",
    about_label_uni: "University", about_uni: "Yaşar University — Computer Engineering",
    about_label_focus: "Focus", about_focus: "Web, AI & Network Security",
    projects_title: "Projects",
    proj_csrfpoc_desc: "An automated CSRF PoC Generator extension built for the modern Burp Suite Montoya API. It parses HTTP history requests to dynamically compile cross-origin exploit payloads. Supports standard urlencoded forms, text/plain JSON encapsulation bypasses, and multipart/form-data multi-file upload simulations using asynchronous JS Fetch and Blob arrays. Includes a native JDialog UI popup with instant clipboard staging.",
    proj_repoverse_desc: "Repoverse is a web-based utility built to eliminate the friction of setting up new systems and testing environments. Supporting Ubuntu, Arch, Fedora, macOS, and Windows, it generates customized scripts to install developer tools, offensive security packages, and daily applications with a single command. Whether you are provisioning a fresh Linux environment or preparing a dedicated red teaming virtual machine, Repoverse instantly compiles the necessary package manager commands (apt, pacman, yay, brew, etc.) and readies them for immediate execution.",
    talks_title: "Talks",
    pres_title: "IDOR Workshop",
    pres_desc: "Detection and Analysis of IDOR Vulnerabilities",
    pres_meta: "Yaşar University Cybersecurity Society",
    contact_title: "Contact",
    contact_text: "Questions, collaboration ideas, or anything security-related — send a message and I'll get back to you.",
    form_name: "Name", form_name_ph: "Your name",
    form_email: "Email", form_email_ph: "you@example.com",
    form_subject: "Subject", form_subject_ph: "What is this about?",
    form_message: "Message", form_message_ph: "Write your message…",
    form_send: "Send message",
    form_sent: "Your message has been sent. Thanks — I'll get back to you soon.",
  },
  tr: {
    nav_about: "Hakkımda", nav_projects: "Projeler", nav_talks: "Sunumlar", nav_contact: "İletişim",
    hero_role: "Güvenlik Araştırmacısı & Geliştirici",
    hero_text: "Web güvenliği, yapay zeka güvenliği ve ağ güvenliği üzerine çalışıyorum; açık kaynak araçlar geliştiriyor, öğrendiklerimi blogumda paylaşıyorum.",
    about_title: "Hakkımda",
    about_text: "16 yaşımdan beri bilgisayar güvenliği ile ilgileniyorum. Yaşar Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Şu anda web güvenliği, yapay zeka güvenliği ve ağ güvenliği alanlarıyla ilgileniyorum. Boş zamanlarımda açık kaynaklı araçlar geliştiriyor ve içerik üretiyorum.",
    about_label_uni: "Üniversite", about_uni: "Yaşar Üniversitesi — Bilgisayar Mühendisliği",
    about_label_focus: "İlgi Alanı", about_focus: "Web, Yapay Zeka & Ağ Güvenliği",
    projects_title: "Projeler",
    proj_csrfpoc_desc: "Modern Burp Suite Montoya API mimarisi için geliştirilmiş otomasyon odaklı CSRF PoC jeneratör eklentisi. Gelen HTTP isteklerini analiz ederek amaca yönelik sömürü betikleri hazırlar; standart form verilerini, zayıf yapılandırılmış backend kontrol mekanizmalarını atlatmak için text/plain tabanlı JSON sarmalamalarını ve asenkron JS Fetch/Blob nesneleri kullanan çok parçalı (multipart) dosya yükleme senaryolarını destekler. Tek tıkla panoya kopyalama özellikli yerel JDialog arayüzü barındırır.",
    proj_repoverse_desc: "Repoverse, yeni bir sistem veya test ortamı kurarken harcanan zamanı en aza indirmek için tasarlanmış web tabanlı bir araçtır. Ubuntu, Arch, Fedora, macOS ve Windows işletim sistemlerini destekleyerek; geliştirici araçlarını, siber güvenlik yazılımlarını ve günlük uygulamaları tek bir komutla kurmanızı sağlayan özel terminal betikleri üretir. İster yeni bir Linux ortamını kişiselleştiriyor olun, ister bir red teaming sanal makinesini hazırlıyor olun, Repoverse ihtiyaç duyduğunuz tüm paket yöneticisi (apt, pacman, yay, brew vb.) komutlarını saniyeler içinde oluşturup doğrudan kopyalamanıza olanak tanır.",
    talks_title: "Sunumlar",
    pres_title: "IDOR Atölyesi",
    pres_desc: "IDOR Zafiyetlerinin Tespiti ve Analizi",
    pres_meta: "Yaşar Üniversitesi Siber Güvenlik Topluluğu",
    contact_title: "İletişim",
    contact_text: "Sorularınız, iş birliği fikirleriniz veya güvenlikle ilgili her konu için mesaj gönderebilirsiniz; en kısa sürede dönüş yaparım.",
    form_name: "İsim", form_name_ph: "Adınız Soyadınız",
    form_email: "E-posta", form_email_ph: "siz@ornek.com",
    form_subject: "Konu", form_subject_ph: "Konu nedir?",
    form_message: "Mesaj", form_message_ph: "Mesajınızı yazın…",
    form_send: "Mesaj gönder",
    form_sent: "Mesajınız gönderildi. En kısa sürede dönüş yapacağım.",
  },
};

const root = document.documentElement;
const $ = (s) => document.querySelector(s);

// ——————————————————————————————————————————————
// 2. THEME — follows system preference unless overridden
// ——————————————————————————————————————————————
const themeToggle = $("#theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function effectiveTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}
function renderThemeToggle() {
  themeToggle.textContent = effectiveTheme() === "dark" ? "☀" : "☾";
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || storedTheme === "light") root.dataset.theme = storedTheme;

themeToggle.addEventListener("click", () => {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  renderThemeToggle();
});
systemDark.addEventListener("change", renderThemeToggle);
renderThemeToggle();

// ——————————————————————————————————————————————
// 3. LANGUAGE
// ——————————————————————————————————————————————
const langToggle = $("#lang-toggle");
let currentLang =
  localStorage.getItem("lang") ||
  ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en");

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  root.lang = lang;
  langToggle.textContent = lang === "en" ? "TR" : "EN";
}
langToggle.addEventListener("click", () => {
  const next = currentLang === "en" ? "tr" : "en";
  localStorage.setItem("lang", next);
  applyLanguage(next);
});
applyLanguage(currentLang);

// ——————————————————————————————————————————————
// 4. CONTACT FORM — success notice after FormSubmit redirect
// ——————————————————————————————————————————————
if (new URLSearchParams(location.search).has("sent")) {
  const status = $("#form-status");
  if (status) status.hidden = false;
  history.replaceState(null, "", location.pathname + "#contact");
}

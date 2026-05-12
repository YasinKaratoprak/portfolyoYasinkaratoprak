/* ============================================================
   PORTFOLIO — script.js  ·  ELITE HACKER v2
   Matrix rain + particle network hybrid, typewriter,
   decrypt hover, language, SPA nav, theme
   ============================================================ */

// ——————————————————————————————————————————————
// 1. TRANSLATIONS
// ——————————————————————————————————————————————
const translations = {
  en: {
    nav_home: "Homepage", nav_about: "About", nav_projects: "Projects",
    proj_repoverse_title: "Repoverse",
    proj_repoverse_desc: "Repoverse is a web-based utility built to eliminate the friction of setting up new systems and testing environments. Supporting Ubuntu, Arch, Fedora, macOS, and Windows, it generates customized scripts to install developer tools, offensive security packages, and daily applications with a single command. Whether you are provisioning a fresh Linux environment or preparing a dedicated red teaming virtual machine, Repoverse instantly compiles the necessary package manager commands (apt, pacman, yay, brew, etc.) and readies them for immediate execution",
    proj_repoverse_link: "https://repoverse.yasinkaratoprak.com/",
    nav_presentations: "Presentations", nav_blog: "Blog", nav_contact: "Contact",
    home_subtitle: "[ Security Researcher & Developer ]",
    home_text: "This website contains my projects and personal information. You can navigate to the 'Blog' section to read my posts. You can also follow me on the social media platforms listed below.",
    about_label_name: "Name", about_label_uni: "University", about_label_focus: "Focus",
    about_uni: "Yaşar University — Computer Engineering",
    about_focus: "Web Security & Low-Level Security",
    about_text: "I have been involved in computer security since I was 16. I am a Computer Engineering student at Yaşar University. I am currently interested in web security and low-level security. In my spare time, I develop open-source tools and create content.",
    pres_title: "IDOR Workshop", pres_desc: "Detection and Analysis of IDOR Vulnerabilities",
    pres_meta: "Yaşar University Cybersecurity Society",
    contact_label: "email", footer_rights: "All rights reserved.",
    status_sys: "SYS:ONLINE", status_sec: "SEC:ARMED", status_threat: "THREAT:MONITORING",
  },
  tr: {
    nav_home: "Ana Sayfa", nav_about: "Hakkımda", nav_projects: "Projeler",
    proj_repoverse_title: "Repoverse",
    proj_repoverse_desc: "Repoverse, yeni bir sistem veya test ortamı kurarken harcanan zamanı en aza indirmek için tasarlanmış web tabanlı bir araçtır. Ubuntu, Arch, Fedora, macOS ve Windows işletim sistemlerini destekleyerek; geliştirici araçlarını, siber güvenlik yazılımlarını ve günlük uygulamaları tek bir komutla kurmanızı sağlayan özel terminal betikleri üretir. İster yeni bir Linux ortamını kişiselleştiriyor olun, ister bir red teaming sanal makinesini hazırlıyor olun, Repoverse ihtiyaç duyduğunuz tüm paket yöneticisi (apt, pacman, yay, brew vb.) komutlarını saniyeler içinde oluşturup doğrudan kopyalamanıza olanak tanır",
    proj_repoverse_link: "https://repoverse.yasinkaratoprak.com/",
    nav_presentations: "Sunumlar", nav_blog: "Blog", nav_contact: "İletişim",
    home_subtitle: "[ Güvenlik Araştırmacısı & Geliştirici ]",
    home_text: "Bu web sitesi projelerimi ve kişisel bilgilerimi içermektedir. Yazılarımı okumak için 'Blog' bölümüne gidebilirsiniz. Ayrıca beni aşağıda listelenen sosyal medya platformlarından da takip edebilirsiniz.",
    about_label_name: "İsim", about_label_uni: "Üniversite", about_label_focus: "İlgi Alanı",
    about_uni: "Yaşar Üniversitesi — Bilgisayar Mühendisliği",
    about_focus: "Web Güvenliği & Düşük Seviye Güvenlik",
    about_text: "16 yaşımdan beri bilgisayar güvenliği ile ilgileniyorum. Yaşar Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Şu anda web güvenliği ve düşük seviye güvenlik alanlarıyla ilgileniyorum. Boş zamanlarımda açık kaynaklı araçlar geliştiriyor ve içerik üretiyorum.",
    pres_title: "IDOR Atölyesi", pres_desc: "IDOR Zafiyetlerinin Tespiti ve Analizi",
    pres_meta: "Yaşar Üniversitesi Siber Güvenlik Topluluğu",
    contact_label: "e-posta", footer_rights: "Tüm hakları saklıdır.",
    status_sys: "SİSTEM:AKTİF", status_sec: "GÜVENLİK:HAZIR", status_threat: "TEHDİT:İZLENİYOR",
  },
};

// ——————————————————————————————————————————————
// 2. STATE & DOM
// ——————————————————————————————————————————————
let currentLang = "en";
let currentTheme = localStorage.getItem("theme") || "dark";
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const langToggle = $("#lang-toggle");
const langLabel = langToggle.querySelector(".lang-label");
const themeToggle = $("#theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const menuToggle = $("#menu-toggle");
const mobileNav = $("#mobile-nav");
const allNavLinks = $$(".nav-link, .mobile-nav-link");
const sections = $$(".section");

// ——————————————————————————————————————————————
// 3. LANGUAGE
// ——————————————————————————————————————————————
function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
      if (el.hasAttribute("data-decrypt")) el.setAttribute("data-original", dict[key]);
    }
  });
  document.documentElement.lang = lang;
  langLabel.textContent = lang === "en" ? "TR" : "EN";
}
langToggle.addEventListener("click", () => applyLanguage(currentLang === "en" ? "tr" : "en"));

// ——————————————————————————————————————————————
// 4. SPA NAVIGATION
// ——————————————————————————————————————————————
function navigateTo(id) {
  sections.forEach((s) => s.classList.remove("section--active"));
  const t = document.getElementById(id);
  if (t) t.classList.add("section--active");
  allNavLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("data-section") === id));
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("data-section");
    if (id) { e.preventDefault(); navigateTo(id); }
  });
});

// ——————————————————————————————————————————————
// 5. MOBILE MENU
// ——————————————————————————————————————————————
function closeMobileMenu() {
  mobileNav.classList.remove("open");
  mobileNav.setAttribute("aria-hidden", "true");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  const o = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open");
  mobileNav.setAttribute("aria-hidden", !o);
  menuToggle.setAttribute("aria-expanded", o);
});

// ——————————————————————————————————————————————
// 6. THEME
// ——————————————————————————————————————————————
function applyTheme(t) {
  currentTheme = t;
  document.documentElement.setAttribute("data-theme", t);
  themeIcon.textContent = t === "dark" ? "☀" : "☽";
  localStorage.setItem("theme", t);
}
themeToggle.addEventListener("click", () => applyTheme(currentTheme === "dark" ? "light" : "dark"));

// ——————————————————————————————————————————————
// 7. TYPEWRITER
// ——————————————————————————————————————————————
function typeWriter(el, text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0; el.textContent = "";
    const p = el.closest(".terminal-prompt");
    if (p) p.classList.add("typed");
    (function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i); i++;
        setTimeout(tick, speed + Math.random() * 25);
      } else resolve();
    })();
  });
}
function initTypewriter() {
  const t = $("#typed-target"), p = $("#welcome-prompt");
  if (t && p) { p.classList.add("typed"); typeWriter(t, "cat /home/yasin/welcome.txt", 45); }
  $$(".terminal-prompt:not(#welcome-prompt)").forEach((el) => el.classList.add("typed"));
}

// ——————————————————————————————————————————————
// 8. DECRYPT HOVER
// ——————————————————————————————————————————————
const GLITCH = "0123456789ABCDEFabcdef$%&#!@^*?><{}|/\\~±§µ";
function decryptEffect(el) {
  if (el._d) return; el._d = true;
  const orig = el.getAttribute("data-original") || el.textContent;
  if (!el.getAttribute("data-original")) el.setAttribute("data-original", orig);
  let iter = 0; const max = orig.length * 3;
  const iv = setInterval(() => {
    el.textContent = orig.split("").map((c, i) =>
      i < iter / 2.5 ? orig[i] : GLITCH[Math.floor(Math.random() * GLITCH.length)]
    ).join("");
    if (++iter > max) { clearInterval(iv); el.textContent = orig; el._d = false; }
  }, 18);
}
$$("[data-decrypt]").forEach((el) => {
  const txt = el.querySelector("span") || el;
  txt.setAttribute("data-original", txt.textContent);
  el.addEventListener("mouseenter", () => decryptEffect(txt));
});

// ——————————————————————————————————————————————
// 9. MATRIX RAIN + PARTICLE NETWORK HYBRID
// ——————————————————————————————————————————————
function initBackground() {
  const canvas = $("#particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles, columns, drops, mouse = { x: null, y: null };

  const P_COUNT = 60;
  const MAX_DIST = 150;
  const FONT_SIZE = 14;
  const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / FONT_SIZE);
    drops = new Array(columns).fill(1).map(() => Math.random() * h / FONT_SIZE);
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < P_COUNT; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.5,
      });
    }
  }

  function drawMatrixRain() {
    // Very faint matrix rain
    ctx.fillStyle = "rgba(0, 255, 65, 0.04)";
    ctx.font = FONT_SIZE + "px monospace";
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.97) { // Sparse rain
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.95) drops[i] = 0;
        drops[i] += 0.5;
      }
    }
  }

  function drawNetwork() {
    // Connections between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const a = (1 - dist / MAX_DIST) * 0.12;
          ctx.strokeStyle = `rgba(0, 255, 65, ${a})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles + mouse interaction
    for (const p of particles) {
      // Mouse connection
      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const a = (1 - dist / 220) * 0.3;
          ctx.strokeStyle = `rgba(0, 229, 255, ${a})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      // Particle glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, "rgba(0, 255, 65, 0.6)");
      grad.addColorStop(1, "rgba(0, 255, 65, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
      // Dot
      ctx.fillStyle = "rgba(0, 255, 65, 0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      // Move
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
    }
  }

  function isLight() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

  function draw() {
    // Fade trail — use transparent clear for light mode, dark overlay for dark mode
    if (isLight()) {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "rgba(3, 3, 5, 0.08)";
      ctx.fillRect(0, 0, w, h);
    }
    drawMatrixRain();
    drawNetwork();
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  resize();
  createParticles();
  // Initial clear
  if (!isLight()) {
    ctx.fillStyle = "rgba(3, 3, 5, 1)";
    ctx.fillRect(0, 0, w, h);
  }
  draw();
}

// ——————————————————————————————————————————————
// 10. INIT
// ——————————————————————————————————————————————
applyLanguage("en");
applyTheme(currentTheme);
initTypewriter();
initBackground();

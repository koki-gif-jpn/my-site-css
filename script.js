// script.js

/* =========================
 * 1. FAQ アコーディオン
 * ========================= */
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    // 初期状態：全部閉じる
    btn.setAttribute("aria-expanded", "false");
    answer.setAttribute("aria-hidden", "true");
    answer.style.display = "none";

    btn.addEventListener("click", function () {
      const isOpen = btn.classList.contains("is-open");

      // いったん全部閉じる
      faqItems.forEach(function (otherItem) {
        const otherBtn = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (!otherBtn || !otherAnswer) return;

        otherBtn.classList.remove("is-open");
        otherBtn.setAttribute("aria-expanded", "false");
        otherAnswer.style.display = "none";
        otherAnswer.setAttribute("aria-hidden", "true");
      });

      // さっき押したやつが閉じていたら開く
      if (!isOpen) {
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.display = "block";
        answer.setAttribute("aria-hidden", "false");
      }
    });
  });
});

/* =========================
 * 2. アンカー用スクロール
 *    （ヘッダー高さに自動対応）
 * ========================= */

// 共通スクロール関数
function scrollToWithHeader(target, behavior) {
  console.log("scrollToWithHeader:", target.id); // 動作確認用

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;
  const margin = 0; // ← ここを変えると上下の余白が変わる

  const rect = target.getBoundingClientRect();
  const y = window.scrollY + rect.top - headerHeight - margin;

  window.scrollTo({
    top: y,
    behavior: behavior,
  });
}

// 同一ページ内リンククリック時
document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      scrollToWithHeader(target, "smooth");
    });
  });
});

// 別ページから #付きで来たとき（読み込み後に一度だけ）
window.addEventListener("load", function () {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  scrollToWithHeader(target, "auto");
});

/* =========================
 * 3. スマホメニュー開閉
 * ========================= */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".js-menu-toggle");
  const globalNav = document.getElementById("global-nav");

  if (menuToggle && globalNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.classList.toggle("is-open");
      globalNav.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});

/* =========================
 * 4. ページ先頭に戻るボタン
 * ========================= */
document.addEventListener("DOMContentLoaded", function () {
  const pageTopBtn = document.querySelector(".page-top-btn");
  if (!pageTopBtn) return;

  const SHOW_POSITION = 300; // これ以上スクロールしたら表示

  window.addEventListener("scroll", function () {
    if (window.scrollY > SHOW_POSITION) {
      pageTopBtn.classList.add("is-visible");
    } else {
      pageTopBtn.classList.remove("is-visible");
    }
  });

  pageTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================
 * 5. カードのフェードイン
 * ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach((c) => observer.observe(c));
});

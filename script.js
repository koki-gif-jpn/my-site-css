// script.js

document.addEventListener("DOMContentLoaded", function () {
  /* =========================
   * 1. FAQ アコーディオン（改良版）
   *    - クリックした項目だけ開く
   *    - 他は自動で閉じる
   *    - aria 属性でスクリーンリーダー対応
   * ========================= */
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

      // まずは全ていったん閉じる
      faqItems.forEach(function (otherItem) {
        const otherBtn = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (!otherBtn || !otherAnswer) return;

        otherBtn.classList.remove("is-open");
        otherBtn.setAttribute("aria-expanded", "false");
        otherAnswer.style.display = "none";
        otherAnswer.setAttribute("aria-hidden", "true");
      });

      // さっきクリックしたやつが「閉じていた」場合だけ開く
      if (!isOpen) {
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.display = "block";
        answer.setAttribute("aria-hidden", "false");
      }
      // isOpen だった場合は「全部閉じた状態」で終了
    });
  });

  /* =========================
   * 2. スムーススクロール
   *    - href が "#○○" のものだけ対象
   *    - href="#" はデフォルト動作
   * ========================= */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const rect = target.getBoundingClientRect();
      const offset = window.pageYOffset + rect.top - 8; // 少し上に余白

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });

  /* =========================
   * 3. スマホメニュー開閉
   *    - .js-menu-toggle と #global-nav のクラス連動
   * ========================= */
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
// ============================
// ページ先頭に戻るボタン
// ============================
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
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((c) => observer.observe(c));
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
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
// ページ読み込み後に、ハッシュ付きで来たときの位置をもう一度合わせる
window.addEventListener("load", () => {
  // ★ スマホ（〜820px）は何もしない → CSSのanchor-adjustだけを使う
  if (!window.matchMedia("(min-width: 821px)").matches) {
    return;
  }

  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;

  // ★ PC用に調整して「-160」がちょうど良かったのでそのまま採用
  const extraOffset = -160;

  const rect = target.getBoundingClientRect();
  const scrollY = window.scrollY + rect.top - headerHeight - extraOffset;

  window.scrollTo({
    top: scrollY,
    behavior: "auto",
  });
});

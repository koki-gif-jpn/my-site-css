// script.js

document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     1. FAQ アコーディオン（改良版）
     - クリックした項目だけ開く
     - 他は自動で閉じる
     - aria 属性を付けてスクリーンリーダー対応
  ========================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    // 初期状態：全部閉じる
    btn.setAttribute("aria-expanded", "false");
    answer.setAttribute("aria-hidden", "true");

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
      // もし isOpen だった場合は「全部閉じた状態」で終了
    });
  });

  /* =========================
     2. スムーススクロール（ちょい堅牢版）
     - href が "#○○" のものだけ対象
     - href="#" はそのまま（何もしない）
     - ちょっとだけ上に余白を残してスクロール
  ========================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // href が「#」だけなら、ブラウザ標準の動きのままにする
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
     3. スマホメニュー開閉（将来のハンバーガー用）
     - .js-menu-toggle ボタンと
       .global-nav のクラス連動
  ========================== */
  const menuToggle = document.querySelector(".js-menu-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (menuToggle && globalNav) {
    menuToggle.addEventListener("click", function () {
      globalNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open");
    });
  }
});
// script.js

document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".js-menu-toggle");
  var globalNav = document.getElementById("global-nav");

  // ▼ ハンバーガーメニューの開閉
  if (menuToggle && globalNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.classList.toggle("is-open");
      globalNav.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ▼ FAQ（もし使う場合）：質問クリックで開閉
  var faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.nextElementSibling;
      var isOpen = btn.classList.toggle("is-open");
      if (answer) {
        answer.style.display = isOpen ? "block" : "none";
      }
    });
  });
});

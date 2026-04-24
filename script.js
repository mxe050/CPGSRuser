document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const overlay = document.getElementById('overlay');
  const progressFill = document.getElementById('progressFill');
  const scrollTop = document.createElement('button');

  // スクロールトップボタンの設定
  scrollTop.className = 'scroll-top';
  scrollTop.innerHTML = '↑';
  scrollTop.setAttribute('aria-label', 'トップへ戻る');
  document.body.appendChild(scrollTop);

  // モバイルメニュー制御
  const toggleMenu = () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  };
  const openSidebar = () => {
    if (!sidebar.classList.contains('show')) toggleMenu();
  };
  const closeSidebar = () => {
    if (sidebar.classList.contains('show')) toggleMenu();
  };

  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // ページ遷移ロジック
  const pages = document.querySelectorAll('.page');
  const tocBtns = document.querySelectorAll('.toc-btn');
  const prevBtns = document.querySelectorAll('.nav-prev');
  const nextBtns = document.querySelectorAll('.nav-next');

  // 履歴スタック（ブラウザの戻る／進むと連動）
  // 初期表示は page-0。history.state で管理。
  function showPage(index, opts = {}) {
    const fromPopState = opts.fromPopState === true;

    pages.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    // TOCボタンはdata-idxで照合（配列順序に依存しない）
    tocBtns.forEach(btn => {
      const btnIdx = parseInt(btn.getAttribute('data-idx'));
      btn.classList.toggle('active', btnIdx === index);
    });

    // プログレスバー更新
    // Primer (25) = 表紙相当、JAMA UG (26-28) = 本編の後に続く扱い
    let visibleIdx;
    if (index === 25) visibleIdx = 0;
    else if (index >= 26) visibleIdx = index - 1; // 26→25, 27→26, 28→27
    else visibleIdx = index;
    const totalPages = 28; // Ch0-24 (25) + JAMA UG 3章 = 28
    const progress = ((visibleIdx + 1) / totalPages) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;

    // ブラウザ履歴に push（戻るボタンで前のページへ戻れるようにする）
    if (!fromPopState) {
      const currentState = history.state;
      // 既に同じページの state なら push しない（連打対策）
      if (!currentState || currentState.page !== index) {
        history.pushState({ page: index }, '', `#page-${index}`);
      }
    }

    // スクロールをトップへ
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // モバイルメニューを閉じる
    if (sidebar.classList.contains('show')) toggleMenu();
  }

  // グローバルに公開
  window.showPage = showPage;

  // ブラウザの戻る／進むに対応
  window.addEventListener('popstate', (e) => {
    const page = (e.state && typeof e.state.page === 'number') ? e.state.page : 0;
    showPage(page, { fromPopState: true });
  });

  // 初期 state を登録（初回ロード時のページ 0）+ URL ハッシュ対応
  const initialHash = window.location.hash.match(/^#page-(\d+)$/);
  const initialIdx = initialHash ? parseInt(initialHash[1], 10) : 0;
  history.replaceState({ page: initialIdx }, '', `#page-${initialIdx}`);
  if (initialIdx !== 0) showPage(initialIdx, { fromPopState: true });

  // 目次ボタンイベント
  tocBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'));
      showPage(idx);
    });
  });

  // 前へ・次へボタンイベント
  prevBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const currentIdx = Array.from(pages).findIndex(p => p.classList.contains('active'));
      if (currentIdx > 0) showPage(currentIdx - 1);
    });
  });

  nextBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const currentIdx = Array.from(pages).findIndex(p => p.classList.contains('active'));
      if (currentIdx < pages.length - 1) showPage(currentIdx + 1);
    });
  });

  // --------------------------------------------
  // 各ページ先頭にインライン目次ボタンを動的挿入
  // --------------------------------------------
  function injectTopMenuButton(pageEl) {
    // すでに挿入済みならスキップ
    if (pageEl.querySelector(':scope > .in-page-menu-bar')) return;

    const bar = document.createElement('div');
    bar.className = 'in-page-menu-bar';
    bar.innerHTML = `
      <button type="button" class="in-page-menu-btn" aria-label="目次を開く">
        <span class="ipm-icon">☰</span>
        <span class="ipm-label">目次を開く</span>
      </button>
    `;
    bar.querySelector('button').addEventListener('click', openSidebar);
    // 先頭に挿入
    pageEl.insertBefore(bar, pageEl.firstChild);
  }

  pages.forEach(injectTopMenuButton);

  // --------------------------------------------
  // 既存 .chapter-nav の中央に目次ボタンを挿入
  // --------------------------------------------
  function injectMiddleMenuButton(navEl) {
    if (navEl.querySelector(':scope > .chapter-nav-menu')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chapter-nav-menu';
    btn.innerHTML = '<span aria-hidden="true">📋</span> 目次';
    btn.setAttribute('aria-label', '目次を開く');
    btn.addEventListener('click', openSidebar);

    // 子ボタンが 2 つあれば間に挟む、1 つなら右側に追加
    const btns = navEl.querySelectorAll(':scope > button');
    if (btns.length >= 2) {
      navEl.insertBefore(btn, btns[1]);
    } else {
      navEl.appendChild(btn);
    }
  }

  document.querySelectorAll('.chapter-nav').forEach(injectMiddleMenuButton);

  // スクロールトップボタン表示制御
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  });

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // タブ切り替えロジック
  function switchTab(btn, tabIndex) {
    const page = btn.closest('.page');
    if (!page) return;

    const nav = btn.closest('.tabs-nav');
    const btns = nav.querySelectorAll('.tab-btn');
    const content = page.querySelector('.tab-content');
    const panes = content.querySelectorAll('.tab-pane');

    // ボタンの状態更新
    btns.forEach((b, i) => b.classList.toggle('active', i === tabIndex));
    // パネの状態更新
    panes.forEach((p, i) => p.classList.toggle('active', i === tabIndex));

    // スムーズにタブの先頭へスクロール（ヘッダー考慮）
    const headerOffset = 130;
    const elementPosition = nav.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  window.switchTab = switchTab;

  // RR 閾値計算機ロジック (Chapter 8 用)
  function calculateRR() {
    const absMidInput = document.getElementById('abs-mid');
    const baseRiskInput = document.getElementById('base-risk');
    const resultDiv = document.getElementById('calc-result');

    if (!absMidInput || !baseRiskInput || !resultDiv) return;

    const absMid = parseFloat(absMidInput.value);
    const baseRisk = parseFloat(baseRiskInput.value);

    if (isNaN(absMid) || isNaN(baseRisk) || baseRisk === 0) {
      resultDiv.innerHTML = '<span style="color: #ef4444;">⚠️ 有効な数値を入力してください（ベースラインリスクは0以外）。</span>';
      resultDiv.classList.remove('hidden');
      return;
    }

    const rrr = absMid / baseRisk;
    let rrThreshold = 1 - rrr;
    const rrrPercent = (rrr * 100).toFixed(1);

    // アニメーション効果を伴う結果表示
    resultDiv.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #e0e7ff; padding-bottom: 4px;">計算結果:</div>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li>・相対リスク減少率 (RRR) ≒ <strong>${rrrPercent}%</strong></li>
        <li style="margin-top: 8px;">・相対リスク閾値 (RR) = <strong>${rrThreshold.toFixed(2)}</strong></li>
      </ul>
      <div style="margin-top: 12px; background: #eef2ff; padding: 10px; border-radius: 8px; font-size: 0.85rem; color: #4338ca; font-weight: bold;">
        👉 フォレストプロットの <strong>RR = ${rrThreshold.toFixed(2)}</strong> の位置に縦線を引いて評価します。
      </div>
    `;
    resultDiv.classList.remove('hidden');
  }

  window.calculateRR = calculateRR;
});

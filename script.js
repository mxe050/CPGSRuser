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

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // ページ遷移ロジック
  const pages = document.querySelectorAll('.page');
  const tocBtns = document.querySelectorAll('.toc-btn');
  const prevBtns = document.querySelectorAll('.nav-prev');
  const nextBtns = document.querySelectorAll('.nav-next');

  function showPage(index) {
    pages.forEach((p, i) => {
      p.classList.toggle('active', i === index);
      if (tocBtns[i]) tocBtns[i].classList.toggle('active', i === index);
    });

    // プログレスバー更新
    const progress = ((index + 1) / pages.length) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;

    // スクロールをトップへ
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // モバイルメニューを閉じる
    if (sidebar.classList.contains('show')) toggleMenu();
  }

  // グローバルに公開
  window.showPage = showPage;

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

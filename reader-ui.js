// Shared, progressively enhanced reading controls. No network requests.
(() => {
  let dialogState = null;
  const configurations = {
    learningMapModal: { image: 'learningMapModalImg', zoom: 'learningMapZoomBtn' },
    cpgOverviewModal: { image: 'cpgOverviewImg', zoom: 'cpgOverviewZoomBtn' }
  };
  function closeDialog() {
    if (!dialogState) return;
    const { modal, previous, inertStates } = dialogState;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.querySelector('img')?.classList.remove('zoomed');
    document.body.classList.remove('cpg-overview-open');
    inertStates.forEach(([element, inert]) => { element.inert = inert; });
    dialogState = null;
    previous?.focus({ preventScroll: true });
  }
  function openDialog(id, trigger) {
    closeDialog();
    const modal = document.getElementById(id);
    if (!modal) return;
    const inertStates = [...document.body.children].filter(el => el !== modal).map(el => [el, el.inert]);
    dialogState = { modal, previous: trigger || document.activeElement, inertStates };
    inertStates.forEach(([el]) => { el.inert = true; });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cpg-overview-open');
    const config = configurations[id];
    const zoom = document.getElementById(config.zoom);
    zoom.textContent = '拡大';
    zoom.setAttribute('aria-pressed', 'false');
    zoom.focus({ preventScroll: true });
    const body = modal.querySelector('.cpg-overview-modal-body');
    body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  function toggleZoom(id) {
    const config = configurations[id];
    const zoomed = document.getElementById(config.image)?.classList.toggle('zoomed');
    const button = document.getElementById(config.zoom);
    if (button) { button.textContent = zoomed ? '縮小' : '拡大'; button.setAttribute('aria-pressed', String(zoomed)); }
  }
  window.openLearningMap = trigger => openDialog('learningMapModal', trigger);
  window.closeLearningMap = closeDialog;
  window.toggleLearningMapZoom = () => toggleZoom('learningMapModal');
  window.openCPGOverview = trigger => openDialog('cpgOverviewModal', trigger);
  window.closeCPGOverview = closeDialog;
  window.toggleCPGOverviewZoom = () => toggleZoom('cpgOverviewModal');
  document.addEventListener('keydown', event => {
    if (!dialogState) return;
    if (event.key === 'Escape') { event.preventDefault(); closeDialog(); }
    if (event.key === 'Tab' && dialogState) {
      const buttons = [...dialogState.modal.querySelectorAll('button')];
      const index = buttons.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); buttons.at(-1).focus(); }
      else if (!event.shiftKey && index === buttons.length - 1) { event.preventDefault(); buttons[0].focus(); }
    }
  });
  function storage(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch { /* Reading works when storage is unavailable. */ }
  }
  function setSize(large) {
    document.documentElement.classList.toggle('reader-large', large);
    document.querySelectorAll('[data-reader-size]').forEach(button => button.setAttribute('aria-pressed', String((button.dataset.readerSize === 'large') === large)));
  }
  function makeTools() {
    const nav = document.createElement('nav');
    nav.className = 'reader-tools';
    nav.setAttribute('aria-label', '読みやすさと共有');
    nav.innerHTML = '<span>文字サイズ</span><button type="button" data-reader-size="normal">標準</button><button type="button" data-reader-size="large">大きく</button><button type="button" data-reader-copy>リンクをコピー</button><button type="button" data-reader-print>印刷</button><span class="reader-copy-status" role="status"></span>';
    nav.addEventListener('click', async event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.readerSize) { setSize(button.dataset.readerSize === 'large'); storage('cpgsr-reader-size', button.dataset.readerSize); }
      if (button.hasAttribute('data-reader-print')) window.print();
      if (button.hasAttribute('data-reader-copy')) {
        const status = nav.querySelector('[role="status"]');
        try { await navigator.clipboard.writeText(location.href); status.textContent = 'このページのリンクをコピーしました。'; }
        catch { status.textContent = 'アドレスバーのURLをコピーしてください。'; }
      }
    });
    return nav;
  }
  function addContents(page) {
    const body = page.querySelector('.page-body');
    if (!body) return;
    const headings = [...body.querySelectorAll('h2')].filter(h => !h.closest('details'));
    if (headings.length < 3) return;
    const toc = document.createElement('details');
    toc.className = 'reader-section-toc';
    const summary = document.createElement('summary');
    summary.textContent = `この章の内容（${headings.length}項目）`;
    toc.append(summary);
    const list = document.createElement('ol');
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `read-${page.dataset.contentId}-${index + 1}`;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      li.append(link); list.append(li);
    });
    toc.append(list);
    body.prepend(toc);
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.page[data-content-id]').forEach(page => {
      if (page.dataset.contentId !== 'home') { page.prepend(makeTools()); addContents(page); }
    });
    const independent = document.querySelector('body:not(:has(.page)) main');
    if (independent) independent.prepend(makeTools());
    setSize(storage('cpgsr-reader-size') === 'large');
    const resume = document.getElementById('reader-resume');
    const lastId = storage('cpgsr-last-page');
    const lastPage = [...document.querySelectorAll('.page')].find(page => page.dataset.contentId === lastId);
    if (resume && lastPage && lastId !== 'home') {
      resume.href = '#' + lastPage.id;
      resume.textContent = '前回の続き：' + (lastPage.querySelector('h1, h2')?.textContent || '学習ページ');
      resume.hidden = false;
    }
    document.querySelectorAll('main table').forEach(table => {
      if (table.closest('.table-wrap, .table-scroll, .reader-table-scroll, .adv-table-wrap, .lp-table-wrap')) return;
      const wrap = document.createElement('div'); wrap.className = 'reader-table-scroll';
      wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', '表（横にスクロールできます）');
      table.before(wrap); wrap.append(table);
    });
    document.querySelectorAll('.doc-map-wrap').forEach(wrap => {
      wrap.querySelectorAll('.doc-map-tab').forEach(tab => {
        tab.setAttribute('aria-pressed', String(tab.classList.contains('active')));
        tab.addEventListener('click', () => {
          wrap.querySelectorAll('.doc-map-tab').forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-pressed', String(t === tab)); });
          wrap.querySelectorAll('.doc-map-panel').forEach(panel => panel.classList.toggle('active', panel.id === tab.dataset.panel));
        });
      });
    });
    // A dynamically generated chapter contents anchor must also work on a fresh load.
    if (location.hash.startsWith('#read-') && window.showContent) window.showContent(location.hash, { fromHistory: true });
    document.querySelectorAll('.ref-popover, .gloss-tip').forEach(el => el.remove());
  });
  document.addEventListener('reader:change', event => {
    closeDialog();
    if (event.detail.contentId !== 'home') storage('cpgsr-last-page', event.detail.contentId);
    document.querySelectorAll('.reader-copy-status').forEach(el => { el.textContent = ''; });
  });
})();

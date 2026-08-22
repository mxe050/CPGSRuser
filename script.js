document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const progressFill = document.getElementById('progressFill');
  const routeNotFound = document.getElementById('reader-route-not-found');
  const pages = [...document.querySelectorAll('.page[data-content-id]')];
  const tocButtons = [...document.querySelectorAll('button.toc-btn[data-content-id]')];
  const scrollTop = document.createElement('button');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pagesByContentId = new Map();
  const pagesByLegacyPageId = new Map();
  const pagesByLegacyIndex = new Map();
  const pagesByDomIndex = new Map();
  let routingFromHistory = false;

  scrollTop.className = 'scroll-top';
  scrollTop.innerHTML = '↑';
  scrollTop.type = 'button';
  scrollTop.setAttribute('aria-label', 'トップへ戻る');
  document.body.appendChild(scrollTop);

  pages.forEach((page, domIndex) => {
    const record = {
      contentId: page.dataset.contentId,
      legacyPageId: page.dataset.legacyPageId || page.id,
      legacyIndex: page.dataset.legacyIndex || null,
      page,
      domIndex
    };
    pagesByContentId.set(record.contentId, record);
    pagesByLegacyPageId.set(record.legacyPageId, record);
    pagesByDomIndex.set(domIndex, record);
    if (record.legacyIndex !== null) pagesByLegacyIndex.set(record.legacyIndex, record);
  });

  const scrollBehavior = () => reducedMotion.matches ? 'auto' : 'smooth';

  const toggleMenu = () => {
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
  };
  const openSidebar = () => {
    if (sidebar && !sidebar.classList.contains('show')) toggleMenu();
  };
  const closeSidebar = () => {
    if (sidebar && sidebar.classList.contains('show')) toggleMenu();
  };

  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  function resolveTarget(target) {
    if (target === undefined || target === null) return null;
    if (typeof target === 'number') {
      return pagesByLegacyIndex.get(String(target)) || pagesByLegacyPageId.get('page-' + target) || pagesByDomIndex.get(target) || null;
    }

    const value = String(target).trim().replace(/^#/, '');
    if (!value) return pagesByContentId.get('home') || null;
    if (pagesByContentId.has(value)) return pagesByContentId.get(value);
    if (pagesByLegacyPageId.has(value)) return pagesByLegacyPageId.get(value);
    if (/^\d+$/.test(value)) {
      return pagesByLegacyIndex.get(value) || pagesByLegacyPageId.get('page-' + value) || pagesByDomIndex.get(Number(value)) || null;
    }

    const anchor = document.getElementById(value);
    const page = anchor && anchor.closest('.page[data-content-id]');
    if (page) return { ...pagesByContentId.get(page.dataset.contentId), anchor };
    return null;
  }

  function updateTocState(contentId) {
    tocButtons.forEach((button) => {
      const isCurrent = button.dataset.contentId === contentId;
      button.classList.toggle('active', isCurrent);
      if (isCurrent) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function updateProgress(record) {
    if (!progressFill) return;
    const indexes = [...pagesByLegacyIndex.keys()].map(Number).sort((left, right) => left - right);
    const position = record.legacyIndex === null ? -1 : indexes.indexOf(Number(record.legacyIndex));
    progressFill.style.width = position < 0 ? '0%' : String(((position + 1) / indexes.length) * 100) + '%';
  }

  function showRouteNotFound(fragment) {
    pages.forEach((page) => page.classList.remove('active'));
    updateTocState('');
    if (!routeNotFound) return;
    routeNotFound.hidden = false;
    routeNotFound.dataset.requestedFragment = fragment || '';
    routeNotFound.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }

  function hideRouteNotFound() {
    if (routeNotFound) routeNotFound.hidden = true;
  }

  function setHistory(record, options) {
    if (options.fromHistory || options.keepHash) return;
    const hash = '#' + record.legacyPageId;
    const state = { contentId: record.contentId, legacyPageId: record.legacyPageId };
    if (options.replace) {
      history.replaceState(state, '', hash);
      return;
    }
    if (!history.state || history.state.contentId !== record.contentId || window.location.hash !== hash) {
      history.pushState(state, '', hash);
    }
  }

  function showContent(target, options = {}) {
    const record = typeof target === 'object' && target.page ? target : resolveTarget(target);
    if (!record) {
      showRouteNotFound(typeof target === 'string' ? target.replace(/^#/, '') : String(target));
      return false;
    }

    hideRouteNotFound();
    pages.forEach((page) => page.classList.toggle('active', page === record.page));
    updateTocState(record.contentId);
    updateProgress(record);
    setHistory(record, options);
    closeSidebar();

    const anchor = options.anchor || record.anchor;
    window.requestAnimationFrame(() => {
      if (anchor) anchor.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
      else window.scrollTo({ top: 0, behavior: scrollBehavior() });
      record.page.setAttribute('tabindex', '-1');
      record.page.focus({ preventScroll: true });
    });
    return true;
  }

  // Existing inline showPage(number) calls remain compatible through legacy data-idx values.
  window.showPage = (legacyTarget, options = {}) => showContent(legacyTarget, {
    fromHistory: options.fromPopState === true,
    replace: options.replaceState === true
  });
  window.showContent = showContent;

  function routeFromLocation(options = {}) {
    const fragment = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    if (!fragment) return showContent('home', { ...options, replace: true });
    const record = resolveTarget(fragment);
    if (!record) {
      showRouteNotFound(fragment);
      return false;
    }
    const anchor = record.anchor || (fragment !== record.legacyPageId ? document.getElementById(fragment) : null);
    return showContent(record, { ...options, anchor, keepHash: Boolean(anchor) });
  }

  tocButtons.forEach((button) => {
    button.addEventListener('click', () => showContent(button.dataset.contentId));
  });
  document.querySelectorAll('[data-home-route]').forEach((button) => {
    button.addEventListener('click', () => showContent('home'));
  });

  window.addEventListener('popstate', (event) => {
    routingFromHistory = true;
    const record = event.state && event.state.contentId ? resolveTarget(event.state.contentId) : resolveTarget(window.location.hash);
    if (record) showContent(record, { fromHistory: true });
    else showRouteNotFound(window.location.hash.replace(/^#/, ''));
    routingFromHistory = false;
  });
  window.addEventListener('hashchange', () => {
    if (!routingFromHistory) routeFromLocation({ fromHistory: true });
  });

  routeFromLocation({ fromHistory: true });

  function injectTopMenuButton(pageElement) {
    if (pageElement.querySelector(':scope > .in-page-menu-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'in-page-menu-bar';
    bar.innerHTML = '<button type="button" class="in-page-menu-btn" aria-label="目次を開く"><span class="ipm-icon">☰</span><span class="ipm-label">目次を開く</span></button>';
    bar.querySelector('button').addEventListener('click', openSidebar);
    pageElement.insertBefore(bar, pageElement.firstChild);
  }
  pages.forEach(injectTopMenuButton);

  function injectMiddleMenuButton(navElement) {
    if (navElement.querySelector(':scope > .chapter-nav-menu')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chapter-nav-menu';
    button.innerHTML = '<span aria-hidden="true">📋</span> 目次';
    button.setAttribute('aria-label', '目次を開く');
    button.addEventListener('click', openSidebar);
    const buttons = navElement.querySelectorAll(':scope > button');
    if (buttons.length >= 2) navElement.insertBefore(button, buttons[1]);
    else navElement.appendChild(button);
  }
  document.querySelectorAll('.chapter-nav').forEach(injectMiddleMenuButton);

  window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('show', window.scrollY > 300);
  });
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });

  function switchTab(button, tabIndex) {
    const page = button.closest('.page');
    const nav = button.closest('.tabs-nav');
    const content = page && page.querySelector('.tab-content');
    if (!page || !nav || !content) return;
    const buttons = nav.querySelectorAll('.tab-btn');
    const panes = content.querySelectorAll('.tab-pane');
    buttons.forEach((item, index) => {
      const isActive = index === tabIndex;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    panes.forEach((pane, index) => {
      const isActive = index === tabIndex;
      pane.classList.toggle('active', isActive);
      pane.setAttribute('aria-hidden', String(!isActive));
    });
    const offset = nav.getBoundingClientRect().top + window.pageYOffset - 130;
    window.scrollTo({ top: offset, behavior: scrollBehavior() });
  }
  window.switchTab = switchTab;

  function calculateRR() {
    const absMidInput = document.getElementById('abs-mid');
    const baseRiskInput = document.getElementById('base-risk');
    const resultDiv = document.getElementById('calc-result');
    if (!absMidInput || !baseRiskInput || !resultDiv) return;

    const absMid = Number.parseFloat(absMidInput.value);
    const baseRisk = Number.parseFloat(baseRiskInput.value);
    if (!Number.isFinite(absMid) || !Number.isFinite(baseRisk) || baseRisk === 0) {
      resultDiv.innerHTML = '<span style="color: #ef4444;">⚠️ 有効な数値を入力してください（ベースラインリスクは0以外）。</span>';
      resultDiv.classList.remove('hidden');
      return;
    }

    const relativeRiskReduction = absMid / baseRisk;
    const riskRatioThreshold = 1 - relativeRiskReduction;
    resultDiv.innerHTML =
      '<div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #e0e7ff; padding-bottom: 4px;">計算結果:</div>' +
      '<ul style="list-style: none; padding: 0; margin: 0;">' +
      '<li>・相対リスク減少率 (RRR) ≒ <strong>' + (relativeRiskReduction * 100).toFixed(1) + '%</strong></li>' +
      '<li style="margin-top: 8px;">・相対リスク閾値 (RR) = <strong>' + riskRatioThreshold.toFixed(2) + '</strong></li>' +
      '</ul><div style="margin-top: 12px; background: #eef2ff; padding: 10px; border-radius: 8px; font-size: 0.85rem; color: #4338ca; font-weight: bold;">' +
      '👉 フォレストプロットの <strong>RR = ' + riskRatioThreshold.toFixed(2) + '</strong> の位置に縦線を引いて評価します。</div>';
    resultDiv.classList.remove('hidden');
  }
  window.calculateRR = calculateRR;

  // The registry is the audit source of truth. Static IDs permit legacy routes before it loads.
  fetch('data/content-registry.json', { cache: 'no-cache' })
    .then((response) => response.ok ? response.json() : null)
    .then((registry) => {
      if (!registry || !Array.isArray(registry.items)) return;
      window.CPGSRContentRegistry = registry;
      document.documentElement.dataset.contentRegistry = 'loaded';
    })
    .catch(() => {
      document.documentElement.dataset.contentRegistry = 'unavailable';
    });
});

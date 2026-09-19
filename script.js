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
  const mobileLayout = window.matchMedia('(max-width: 768px)');
  const baseTitle = document.title;
  let menuReturnFocus = null;
  let currentRecord = null;

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
    if (!mobileLayout.matches) {
      sidebar.scrollTo({ top: 0, behavior: scrollBehavior() });
      sidebar.querySelector('.toc-btn.active')?.focus();
      return;
    }
    const isOpen = sidebar.classList.toggle('show');
    overlay.classList.toggle('show', isOpen);
    sidebar.inert = !isOpen;
    document.body.classList.toggle('reader-menu-open', isOpen);
    menuToggle?.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      menuReturnFocus = document.activeElement;
      sidebar.querySelector('summary, a, button')?.focus();
    }
  };
  const openSidebar = () => {
    if (sidebar && !sidebar.classList.contains('show')) toggleMenu();
  };
  const closeSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('show');
    overlay?.classList.remove('show');
    sidebar.inert = mobileLayout.matches;
    document.body.classList.remove('reader-menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);
  mobileLayout.addEventListener('change', closeSidebar);
  closeSidebar();
  document.addEventListener('keydown', (event) => {
    if (!sidebar?.classList.contains('show')) return;
    if (event.key === 'Escape') {
      closeSidebar();
      menuReturnFocus?.focus();
    }
    if (event.key === 'Tab') {
      const focusable = [menuToggle, ...sidebar.querySelectorAll('button, a, summary')].filter(el => el?.getClientRects().length);
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0]?.focus(); }
    }
  });

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
      if (isCurrent) {
        button.setAttribute('aria-current', 'page');
        const zone = button.closest('.nav-zone');
        if (zone) zone.open = true;
      } else button.removeAttribute('aria-current');
    });
  }

  function updateProgress(record) {
    if (!progressFill) return;
    currentRecord = record;
    const top = record.page.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(1, record.page.offsetHeight - window.innerHeight + 80);
    const percent = Math.max(0, Math.min(100, Math.round((window.scrollY - top + 80) / length * 100)));
    progressFill.style.width = percent + '%';
    progressFill.parentElement.setAttribute('role', 'progressbar');
    progressFill.parentElement.setAttribute('aria-label', 'このページを読んだ位置');
    progressFill.parentElement.setAttribute('aria-valuenow', String(percent));
    progressFill.parentElement.setAttribute('aria-valuemin', '0');
    progressFill.parentElement.setAttribute('aria-valuemax', '100');
  }

  function showRouteNotFound(fragment) {
    closeSidebar();
    currentRecord = null;
    if (progressFill) {
      progressFill.style.width = '0%';
      progressFill.parentElement.setAttribute('aria-valuenow', '0');
    }
    document.title = 'ページが見つかりません | CPGSR Reader';
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
    if (options.fromHistory) return;
    const hash = '#' + (options.anchor?.id || record.anchor?.id || record.legacyPageId);
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
    const heading = record.page.querySelector('h1, .jph-title, h2')?.textContent.trim();
    document.title = record.contentId === 'home' ? baseTitle : `${heading || '学習ページ'} | CPGSR Reader`;
    document.dispatchEvent(new CustomEvent('reader:change', { detail: { contentId: record.contentId, page: record.page } }));

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
    let fragment;
    try { fragment = decodeURIComponent(window.location.hash.replace(/^#/, '')); }
    catch { return showRouteNotFound(window.location.hash.slice(1)); }
    if (!fragment) return showContent('home', { ...options, replace: true });
    if (fragment === 'mainContent') {
      showContent('home', { fromHistory: true });
      document.getElementById('mainContent').focus();
      return true;
    }
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

  // The URL is authoritative, including section anchors when navigating Back/Forward.
  window.addEventListener('popstate', () => routeFromLocation({ fromHistory: true }));
  window.addEventListener('hashchange', () => routeFromLocation({ fromHistory: true }));

  routeFromLocation({ fromHistory: true });
  const main = document.getElementById('mainContent');
  main.setAttribute('tabindex', '-1');
  document.querySelector('.app-skip-link')?.addEventListener('click', event => {
    event.preventDefault(); main.focus();
  });

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
    if (currentRecord) updateProgress(currentRecord);
  }, { passive: true });
  window.addEventListener('resize', () => { if (currentRecord) updateProgress(currentRecord); });
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });



});

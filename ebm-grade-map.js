(() => {
  function contentTarget(element) {
    return element.dataset.mapTarget || element.dataset.contentTarget || '';
  }

  function navigateWithinReader(element, event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = contentTarget(element);
    if (!target || typeof window.showContent !== 'function') return;
    event.preventDefault();
    const anchorId = element.dataset.contentAnchor;
    const anchor = anchorId ? document.getElementById(anchorId) : null;
    window.showContent(target, anchor ? { anchor } : {});
  }

  function flattenNavigation(navigation) {
    const sequence = [];
    const seen = new Set();
    const zoneByContentId = new Map();

    function add(contentId, zone) {
      if (!contentId) return;
      if (!zoneByContentId.has(contentId)) zoneByContentId.set(contentId, zone);
      if (!seen.has(contentId)) {
        sequence.push(contentId);
        seen.add(contentId);
      }
    }

    function visit(item, zone) {
      if (typeof item === 'string') {
        add(item, zone);
        return;
      }
      if (!item || typeof item !== 'object') return;
      add(item.contentId, zone);
      (item.children || []).forEach((child) => visit(child, zone));
    }

    (navigation.zones || []).forEach((zone) => {
      (zone.items || []).forEach((item) => visit(item, zone));
    });
    return { sequence, zoneByContentId };
  }

  function makeRouteButton(label, contentId, itemsById) {
    const button = document.createElement('a');
    button.textContent = label;
    const item = itemsById.get(contentId);
    button.href = item?.href || 'learning-index.html';
    // Standalone pages must use normal links, not the single-page router.
    if (document.querySelector(`.page[data-content-id="${CSS.escape(contentId)}"]`)) button.dataset.contentTarget = contentId;
    return button;
  }

  function injectLocationBars(registry, navigation) {
    if (!registry || !Array.isArray(registry.items) || !navigation) return;
    const itemsById = new Map(registry.items.map((item) => [item.contentId, item]));
    const { sequence, zoneByContentId } = flattenNavigation(navigation);

    document.querySelectorAll('.page[data-content-id]').forEach((page) => {
      if (page.querySelector(':scope > .reader-location-bar')) return;
      const contentId = page.dataset.contentId;
      const item = itemsById.get(contentId);
      const zone = zoneByContentId.get(contentId);
      const position = sequence.indexOf(contentId);
      const bar = document.createElement('nav');
      bar.className = 'reader-location-bar';
      bar.setAttribute('aria-label', '現在地と前後の学習項目');

      const location = document.createElement('span');
      location.innerHTML = '<strong>' + (zone ? zone.label : 'CPGSR Reader') + '</strong> / ' +
        (item ? item.navLabel || item.titleJa : contentId);
      bar.appendChild(location);

      const spacer = document.createElement('span');
      spacer.className = 'reader-location-spacer';
      spacer.setAttribute('aria-hidden', 'true');
      bar.appendChild(spacer);

      if (position > 0) bar.appendChild(makeRouteButton('前へ', sequence[position - 1], itemsById));
      bar.appendChild(makeRouteButton('全体図へ', 'home', itemsById));
      if (position >= 0 && position < sequence.length - 1) {
        bar.appendChild(makeRouteButton('次へ', sequence[position + 1], itemsById));
      }

      const menuBar = page.querySelector(':scope > .in-page-menu-bar');
      if (menuBar) menuBar.insertAdjacentElement('afterend', bar);
      else page.insertBefore(bar, page.firstChild);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
      const route = event.target.closest('[data-map-target], [data-content-target]');
      if (route) navigateWithinReader(route, event);
    });

    Promise.all([
      fetch('data/content-registry.json', { cache: 'no-cache' }).then((response) => response.ok ? response.json() : null),
      fetch('data/navigation-structure.json', { cache: 'no-cache' }).then((response) => response.ok ? response.json() : null)
    ]).then(([registry, navigation]) => injectLocationBars(registry, navigation)).catch(() => {});
  });
})();

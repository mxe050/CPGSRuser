(() => {
  let learningMapReturnFocus = null;

  function modalElements() {
    return {
      modal: document.getElementById('learningMapModal'),
      image: document.getElementById('learningMapModalImg'),
      zoom: document.getElementById('learningMapZoomBtn')
    };
  }

  window.openLearningMap = (trigger) => {
    const { modal, image, zoom } = modalElements();
    if (!modal) return;
    learningMapReturnFocus = trigger || document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cpg-overview-open');
    if (image) image.classList.remove('zoomed');
    if (zoom) {
      zoom.textContent = '拡大';
      zoom.focus({ preventScroll: true });
    }
  };

  window.closeLearningMap = () => {
    const { modal, image } = modalElements();
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cpg-overview-open');
    if (image) image.classList.remove('zoomed');
    if (learningMapReturnFocus && typeof learningMapReturnFocus.focus === 'function') {
      learningMapReturnFocus.focus({ preventScroll: true });
    }
  };

  window.toggleLearningMapZoom = () => {
    const { image, zoom } = modalElements();
    if (!image) return;
    const isZoomed = image.classList.toggle('zoomed');
    if (zoom) zoom.textContent = isZoomed ? '縮小' : '拡大';
  };

  function contentTarget(element) {
    return element.dataset.mapTarget || element.dataset.contentTarget || '';
  }

  function navigateWithinReader(element, event) {
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

  function makeRouteButton(label, contentId) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.dataset.contentTarget = contentId;
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

      if (position > 0) bar.appendChild(makeRouteButton('前へ', sequence[position - 1]));
      bar.appendChild(makeRouteButton('全体図へ', 'home'));
      if (position >= 0 && position < sequence.length - 1) {
        bar.appendChild(makeRouteButton('次へ', sequence[position + 1]));
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const { modal } = modalElements();
        if (modal && modal.classList.contains('open')) window.closeLearningMap();
      }
    });

    Promise.all([
      fetch('data/content-registry.json', { cache: 'no-cache' }).then((response) => response.ok ? response.json() : null),
      fetch('data/navigation-structure.json', { cache: 'no-cache' }).then((response) => response.ok ? response.json() : null)
    ]).then(([registry, navigation]) => injectLocationBars(registry, navigation)).catch(() => {});
  });
})();

// glossary.js — 用語集ツールチップ
// 本文中の .gloss 要素にツールチップを表示

(function(){
  let glossData = null;
  let tip = null;

  async function load(){
    try {
      const res = await fetch('data/glossary.json');
      glossData = await res.json();
      attach();
    } catch(e){
      console.warn('Glossary load failed:', e);
    }
  }

  function attach(){
    if (!glossData?.terms) return;
    document.querySelectorAll('.gloss').forEach(el => {
      if (el.dataset.glossAttached) return; // 二重バインド回避
      const term = el.getAttribute('data-term') || el.textContent.trim();
      if (glossData.terms[term]){
        el.addEventListener('click', e => onClick(e, term));
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `${term}の説明`);
        el.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e, term); }
        });
        el.style.cursor = 'help';
        el.style.borderBottom = '1px dotted #e67e22';
        el.dataset.glossAttached = '1';
      }
    });
  }

  function onClick(e, term){
    e.stopPropagation();
    removeTip();
    const g = glossData.terms[term];
    if (!g) return;
    tip = document.createElement('div');
    tip.className = 'gloss-tip';
    tip.innerHTML = `
      <div class="gloss-tip-header">
        <strong>${g.term}</strong>
        ${g.full ? `<span class="gloss-full">${g.full}</span>` : ''}
        <button type="button" class="gloss-close" aria-label="用語の説明を閉じる">×</button>
      </div>
      <div class="gloss-tip-body">${g.definition}</div>
      ${g.related && g.related.length ? `<div class="gloss-related">関連：${g.related.join('、')}</div>` : ''}
    `;
    document.body.appendChild(tip);
    const rect = e.currentTarget.getBoundingClientRect();
    tip.style.position = 'fixed';
    tip.style.top = (rect.bottom + 6) + 'px';
    tip.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - 360)) + 'px';
    tip.style.top = Math.max(10, Math.min(rect.bottom + 6, window.innerHeight - tip.offsetHeight - 12)) + 'px';
    tip.querySelector('.gloss-close').addEventListener('click', removeTip);
  }

  function onDocClick(e){
    if (tip && !tip.contains(e.target)) removeTip();
  }

  function removeTip(){
    if (tip){ tip.remove(); tip = null; }
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') removeTip(); });
  document.addEventListener('reader:change', removeTip);

  window.CPGSR_Glossary = { load, attach };
  document.addEventListener('click', onDocClick);
  document.addEventListener('DOMContentLoaded', load);
})();

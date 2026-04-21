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
    document.querySelectorAll('.gloss').forEach(el => {
      if (el.dataset.glossAttached) return; // 二重バインド回避
      const term = el.getAttribute('data-term') || el.textContent.trim();
      if (glossData.terms[term]){
        el.addEventListener('click', e => onClick(e, term));
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
        <button class="gloss-close">×</button>
      </div>
      <div class="gloss-tip-body">${g.definition}</div>
      ${g.related && g.related.length ? `<div class="gloss-related">関連：${g.related.join('、')}</div>` : ''}
    `;
    document.body.appendChild(tip);
    const rect = e.currentTarget.getBoundingClientRect();
    tip.style.position = 'fixed';
    tip.style.top = (rect.bottom + 6) + 'px';
    tip.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - 360)) + 'px';
    tip.querySelector('.gloss-close').addEventListener('click', removeTip);
    setTimeout(()=>document.addEventListener('click', onDocClick, { once:true }), 0);
  }

  function onDocClick(e){
    if (tip && !tip.contains(e.target)) removeTip();
  }

  function removeTip(){
    if (tip){ tip.remove(); tip = null; }
  }

  // MutationObserverで動的追加にも対応
  function observe(){
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
  }

  window.CPGSR_Glossary = { load, attach };
  document.addEventListener('DOMContentLoaded', load);
})();

// references.js — 参考文献の引用ポップオーバー
// 本文中の [U17] [M1] などを自動検出してクリック時に詳細をポップアップ表示

(function(){
  let refsData = null;
  let popover = null;

  let wrapped = false;
  async function loadReferences(){
    try {
      if (!refsData){
        const res = await fetch('data/references.json');
        refsData = await res.json();
      }
      if (!wrapped){ wrapCitationsInText(); wrapped = true; }
    } catch(e){
      console.warn('References load failed:', e);
    }
  }

  function wrapCitationsInText(){
    // 本文中の [U12] [M1] [G2] [T1] [C1] [V1] [L1] 形式を span.ref-cite に変換
    const container = document.querySelector('.main-content') || document.body;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        if (node.parentElement && (
          node.parentElement.tagName === 'SCRIPT' ||
          node.parentElement.tagName === 'STYLE' ||
          node.parentElement.classList.contains('ref-cite')
        )) return NodeFilter.FILTER_REJECT;
        return /\[([UMGTCVL]\d+)\]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const targets = [];
    let n;
    while((n = walker.nextNode())) targets.push(n);
    targets.forEach(textNode => {
      const frag = document.createDocumentFragment();
      const parts = textNode.nodeValue.split(/(\[[UMGTCVL]\d+\])/g);
      parts.forEach(part => {
        const m = part.match(/^\[([UMGTCVL]\d+)\]$/);
        if (m){
          const span = document.createElement('span');
          span.className = 'ref-cite';
          span.setAttribute('data-ref', m[1]);
          span.textContent = part;
          span.addEventListener('click', onCiteClick);
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function onCiteClick(e){
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('data-ref');
    if (!refsData) return;
    const ref = refsData.references[id];
    if (!ref) return;
    showPopover(e.currentTarget, id, ref);
  }

  function showPopover(anchor, id, ref){
    removePopover();
    popover = document.createElement('div');
    popover.className = 'ref-popover';
    const authors = ref.authors || ref.title || '(著者未登録)';
    const year = ref.year ? `(${ref.year})` : '';
    const title = ref.title || '';
    const journal = ref.journal ? `<em>${ref.journal}</em>` : (ref.publisher || '');
    const vol = ref.vol || '';
    const url = ref.url || '';
    const note = ref.note ? `<div class="ref-note">${ref.note}</div>` : '';
    popover.innerHTML = `
      <div class="ref-popover-header">
        <span class="ref-badge">${id}</span>
        <button class="ref-close" aria-label="閉じる">×</button>
      </div>
      <div class="ref-popover-body">
        <div><strong>${authors}</strong> ${year}</div>
        <div class="ref-title">${title}</div>
        <div class="ref-journal">${journal} ${vol}</div>
        ${url ? `<div><a href="${url}" target="_blank" rel="noopener">${url}</a></div>` : ''}
        ${note}
      </div>
    `;
    document.body.appendChild(popover);
    const rect = anchor.getBoundingClientRect();
    popover.style.position = 'fixed';
    popover.style.top = (rect.bottom + 6) + 'px';
    popover.style.left = Math.max(10, Math.min(rect.left, window.innerWidth - 420)) + 'px';
    popover.querySelector('.ref-close').addEventListener('click', removePopover);
    setTimeout(()=>document.addEventListener('click', onDocClick, { once:true }), 0);
  }

  function onDocClick(e){
    if (popover && !popover.contains(e.target)) removePopover();
  }

  function removePopover(){
    if (popover){ popover.remove(); popover = null; }
  }

  window.CPGSR_References = { load: loadReferences };
  document.addEventListener('DOMContentLoaded', loadReferences);
})();

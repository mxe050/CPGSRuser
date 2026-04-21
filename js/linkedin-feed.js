// linkedin-feed.js — Ch23 Guyatt LinkedIn ピックアップカード描画

(function(){
  async function load(){
    const mount = document.getElementById('linkedin-feed');
    if (!mount) return;
    try {
      const res = await fetch('data/linkedin-picks.json');
      const data = await res.json();
      render(mount, data);
    } catch(e){
      mount.innerHTML = '<div style="padding:1em;color:#c0392b;">LinkedInピックアップの読み込みに失敗しました。</div>';
    }
  }

  function render(mount, data){
    const topics = [...new Set(data.picks.map(p => p.topic))].sort();
    let html = `
      <div class="lnk-intro">
        <p><strong>出典</strong>：<a href="${data.sourceUrl}" target="_blank" rel="noopener">Gordon Guyatt 先生のLinkedIn</a></p>
        <p>スナップショット日：${data.snapshotDate}　件数：${data.picks.length}</p>
        <div class="lnk-filters">
          <button class="lnk-filter active" data-topic="all">すべて</button>
          ${topics.map(t => `<button class="lnk-filter" data-topic="${t}">${t}</button>`).join('')}
        </div>
      </div>
      <div class="lnk-cards" id="lnk-cards">
    `;
    data.picks.forEach(p => {
      html += renderCard(p);
    });
    html += '</div>';
    mount.innerHTML = html;
    mount.querySelectorAll('.lnk-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        mount.querySelectorAll('.lnk-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const t = btn.getAttribute('data-topic');
        mount.querySelectorAll('.lnk-card').forEach(card => {
          card.style.display = (t === 'all' || card.getAttribute('data-topic') === t) ? '' : 'none';
        });
      });
    });
  }

  function renderCard(p){
    const when = p.daysAgo < 7 ? `${p.daysAgo}日前` : p.daysAgo < 30 ? `${Math.floor(p.daysAgo/7)}週間前` : `${Math.floor(p.daysAgo/30)}ヶ月前`;
    const chap = p.relatedChapter ? `<span class="lnk-chap">関連：${p.relatedChapter}</span>` : '';
    const link = p.externalUrl ? `<a href="${p.externalUrl}" target="_blank" rel="noopener" class="lnk-ext">🔗 ${p.externalTitle || 'リンク'}</a>` : '';
    return `
      <div class="lnk-card" data-topic="${p.topic}">
        <div class="lnk-card-head">
          <span class="lnk-topic">${p.topic}</span>
          <span class="lnk-when">${when}</span>
          ${chap}
        </div>
        <div class="lnk-comment">${p.comment}</div>
        ${link}
      </div>
    `;
  }

  window.CPGSR_LinkedIn = { load };
  document.addEventListener('DOMContentLoaded', load);
})();

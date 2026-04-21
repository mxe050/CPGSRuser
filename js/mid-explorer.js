// mid-explorer.js — Ch7 閾値早見表

(function(){
  let data = null;

  async function load(){
    try {
      const res = await fetch('data/mid-thresholds.json');
      data = await res.json();
      render();
    } catch(e){
      console.warn('MID load failed:', e);
    }
  }

  function render(){
    const mount = document.getElementById('mid-explorer');
    if (!mount || !data) return;
    const levels = data.thresholdLevels;
    let html = '<div class="mid-intro"><p><strong>' + data.description + '</strong></p></div>';
    html += '<div class="mid-legend">';
    levels.forEach(l => {
      html += `<span class="mid-chip" style="background:${l.color};color:white;">${l.label}</span> <span class="mid-desc">${l.description}</span> `;
    });
    html += '</div>';
    html += '<table class="mid-table"><thead><tr><th>アウトカム</th><th>重要度</th>';
    levels.forEach(l => { html += `<th style="background:${l.color}20;">${l.label}</th>`; });
    html += '</tr></thead><tbody>';
    data.examples.forEach((ex, i) => {
      html += `<tr class="mid-row" data-idx="${i}"><td class="mid-outcome"><strong>${ex.outcome}</strong></td>`;
      html += `<td class="mid-importance">${ex.importance}</td>`;
      levels.forEach(l => {
        const v = ex.thresholds[l.level] || '-';
        html += `<td>${v}</td>`;
      });
      html += '</tr>';
      if (ex.note){
        html += `<tr class="mid-note-row" data-parent="${i}" style="display:none;"><td colspan="${levels.length + 2}" class="mid-note">${ex.note}</td></tr>`;
      }
    });
    html += '</tbody></table>';
    html += `<div class="mid-key-message"><strong>キーメッセージ：</strong>${data.keyMessage}</div>`;
    mount.innerHTML = html;

    // クリックで注釈を展開
    mount.querySelectorAll('.mid-row').forEach(row => {
      row.addEventListener('click', () => {
        const idx = row.getAttribute('data-idx');
        const note = mount.querySelector(`.mid-note-row[data-parent="${idx}"]`);
        if (note) note.style.display = note.style.display === 'none' ? 'table-row' : 'none';
      });
    });
  }

  window.CPGSR_MID = { load };
  document.addEventListener('DOMContentLoaded', load);
})();

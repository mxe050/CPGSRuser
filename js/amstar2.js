// amstar2.js — Ch18 AMSTAR 2 16項目簡易チェッカー
// Shea BJ et al. BMJ 2017;358:j4008

(function(){
  const items = [
    {id:1, text:'研究の質問とinclusion criteriaにPICO要素が含まれているか', critical:false},
    {id:2, text:'プロトコルが事前に設定されたことが明示的に述べられ、重要な点で登録プロトコルからの逸脱が正当化されているか', critical:true},
    {id:3, text:'レビューで含めた研究デザインの選択が、選択基準に基づいて説明されているか', critical:false},
    {id:4, text:'包括的な文献検索戦略が使用されているか', critical:true},
    {id:5, text:'研究選択が重複して行われているか', critical:false},
    {id:6, text:'データ抽出が重複して行われているか', critical:false},
    {id:7, text:'除外された研究のリストが提示され、除外理由が正当化されているか', critical:true},
    {id:8, text:'含まれた研究が十分に詳細に記述されているか', critical:false},
    {id:9, text:'個別の研究のバイアスリスク（RoB）評価に満足のいく手法が用いられているか', critical:true},
    {id:10, text:'資金源が各研究について報告されているか', critical:false},
    {id:11, text:'メタ分析を行う場合、統計的統合のために適切な手法が用いられているか', critical:true},
    {id:12, text:'メタ分析を行う場合、個々の研究のRoBが統合結果や他の分析に与える潜在的影響を評価しているか', critical:false},
    {id:13, text:'結果の解釈／議論で個別研究のRoBを考慮しているか', critical:true},
    {id:14, text:'結果に観察された異質性について、合理的な説明と議論が行われているか', critical:false},
    {id:15, text:'定量的統合を行う場合、出版バイアス（小規模研究バイアス）の可能性を適切に評価し、その結果がレビュー結果への影響について議論されているか', critical:true},
    {id:16, text:'著者がレビュー実施に資金提供を含む潜在的なCOI源を報告しているか', critical:false}
  ];

  function render(){
    const mount = document.getElementById('amstar2-check');
    if (!mount) return;
    let html = `
      <div class="am-intro">
        <p>AMSTAR 2（Shea 2017）は、SRの方法論的質を評価する16項目ツール。★は<strong>重要（critical）項目</strong>で、ここに欠陥があると総合評価が大きく下がる。</p>
      </div>
      <div class="am-items">
    `;
    items.forEach(it => {
      html += `
        <div class="am-item ${it.critical ? 'critical' : ''}">
          <div class="am-item-head">
            <span class="am-num">${it.id}${it.critical ? ' ★' : ''}</span>
            <span class="am-text">${it.text}</span>
          </div>
          <div class="am-choices">
            <label><input type="radio" name="am${it.id}" value="yes"> Yes</label>
            <label><input type="radio" name="am${it.id}" value="partial"> Partial Yes</label>
            <label><input type="radio" name="am${it.id}" value="no"> No</label>
          </div>
        </div>
      `;
    });
    html += `
      </div>
      <div class="am-result-area">
        <button class="am-judge-btn" id="am-judge">総合評価</button>
        <div class="am-result" id="am-result" style="display:none;"></div>
      </div>
    `;
    mount.innerHTML = html;
    document.getElementById('am-judge').addEventListener('click', judge);
  }

  function judge(){
    const out = document.getElementById('am-result');
    let criticalWeaknesses = 0;
    let nonCriticalWeaknesses = 0;
    const unanswered = [];
    items.forEach(it => {
      const checked = document.querySelector(`input[name="am${it.id}"]:checked`);
      if (!checked){ unanswered.push(it.id); return; }
      if (checked.value === 'no' || checked.value === 'partial'){
        if (it.critical) criticalWeaknesses++;
        else nonCriticalWeaknesses++;
      }
    });
    let html = '';
    if (unanswered.length){
      html += `<div class="am-warn">未回答の項目：${unanswered.join(', ')}</div>`;
    }
    let verdict, color;
    if (criticalWeaknesses > 1){
      verdict = '<strong>Critically Low（批判的に低い）</strong>：重要項目に複数の欠陥あり。このSRは利用可能なSRの正確で包括的な要約を提供しない可能性が高い。';
      color = '#c0392b';
    } else if (criticalWeaknesses === 1){
      verdict = '<strong>Low（低い）</strong>：重要項目に1つの欠陥。このSRは正確で包括的な要約を提供しない可能性がある。';
      color = '#e67e22';
    } else if (nonCriticalWeaknesses > 1){
      verdict = '<strong>Moderate（中程度）</strong>：重要項目の欠陥はないが、複数の非重要項目に欠陥。正確で包括的な要約を提供しうるが限界あり。';
      color = '#f39c12';
    } else {
      verdict = '<strong>High（高い）</strong>：重要項目に欠陥なし、非重要項目の欠陥も0-1個。このSRは利用可能研究の正確で包括的な要約を提供する。';
      color = '#27ae60';
    }
    html += `
      <div class="am-verdict" style="border-left:4px solid ${color};padding:12px 16px;background:${color}10;">
        <div class="am-counts">重要項目の欠陥: ${criticalWeaknesses} / 非重要項目の欠陥: ${nonCriticalWeaknesses}</div>
        <div>${verdict}</div>
      </div>
    `;
    out.innerHTML = html;
    out.style.display = 'block';
    out.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  window.CPGSR_AMSTAR2 = { render };
  document.addEventListener('DOMContentLoaded', render);
})();

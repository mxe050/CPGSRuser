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
        <p>AMSTAR 2の16項目を学ぶための簡易チェックです。★は原著が提案する<strong>重要項目</strong>。合計点による採点は行いません。実際の評価は<a href="https://amstar.ca/Amstar_Checklist.php" target="_blank" rel="noopener">公式の項目別基準</a>と<a href="https://amstar.ca/Amstar-2.php" target="_blank" rel="noopener">総合評価の指針</a>を確認してください。</p>
        <p>Partial Yesは選択可能な項目だけに表示します。項目9のRCT・非RCT別の詳細判定は公式票で行ってください。重要項目の選択はレビューの文脈に応じて事前に検討します。</p>
      </div>
      <div class="am-items">
    `;
    items.forEach(it => {
      html += `
        <fieldset class="am-item ${it.critical ? 'critical' : ''}">
          <legend class="am-item-head">
            <span class="am-num">${it.id}${it.critical ? ' ★' : ''}</span>
            <span class="am-text">${it.text}</span>
          </legend>
          <div class="am-choices">
            <label><input type="radio" name="am${it.id}" value="yes"> Yes</label>
            ${[2,4,7,8,9].includes(it.id) ? `<label><input type="radio" name="am${it.id}" value="partial"> Partial Yes</label>` : ''}
            <label><input type="radio" name="am${it.id}" value="no"> No</label>
            ${[11,12,15].includes(it.id) ? `<label><input type="radio" name="am${it.id}" value="na"> メタ分析なし</label>` : ''}
          </div>
        </fieldset>
      `;
    });
    html += `
      </div>
      <div class="am-result-area">
        <button type="button" class="am-judge-btn" id="am-judge">回答を確認して評価の目安を見る</button>
        <div class="am-result" id="am-result" role="status" aria-live="polite" style="display:none;"></div>
      </div>
    `;
    mount.innerHTML = html;
    document.getElementById('am-judge').addEventListener('click', judge);
    mount.addEventListener('change', () => { document.getElementById('am-result').style.display = 'none'; });
  }

  function judge(){
    const out = document.getElementById('am-result');
    let criticalWeaknesses = 0;
    let nonCriticalWeaknesses = 0;
    const unanswered = [];
    const partial = [];
    const notApplicable = [];
    items.forEach(it => {
      const checked = document.querySelector(`input[name="am${it.id}"]:checked`);
      if (!checked){ unanswered.push(it.id); return; }
      if (checked.value === 'partial') partial.push(it.id);
      if (checked.value === 'na') notApplicable.push(it.id);
      if (checked.value === 'no'){
        if (it.critical) criticalWeaknesses++;
        else nonCriticalWeaknesses++;
      }
    });
    let html = '';
    if (unanswered.length){
      out.innerHTML = `<div class="am-warn"><strong>評価は保留です。</strong>未回答の項目：${unanswered.join(', ')}。全項目を確認してください。</div>`;
      out.style.display = 'block';
      return;
    }
    if (partial.length){
      out.innerHTML = `<div class="am-warn"><strong>総合評価は保留です。</strong>Partial Yesの項目：${partial.join(', ')}。部分的な充足を一律にNoとせず、欠けている要素が重要な欠陥に当たるか、公式基準とレビューの文脈から判断してください。</div>`;
      out.style.display = 'block';
      return;
    }
    if (notApplicable.length && notApplicable.length !== 3) {
      out.innerHTML = '<div class="am-warn"><strong>回答を確認してください。</strong>「メタ分析なし」を選んだ場合は、項目11・12・15の適用範囲を揃えて確認してください。</div>';
      out.style.display = 'block';
      return;
    }
    let verdict, color;
    if (criticalWeaknesses > 1){
      verdict = '<strong>Critically low（極めて低い）</strong>：重要項目に複数の欠陥があります。';
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
        <p><strong>既定の重要項目に基づく暫定的な目安</strong></p>
        <div class="am-counts">重要項目の欠陥: ${criticalWeaknesses} / 非重要項目の欠陥: ${nonCriticalWeaknesses}</div>
        <div>${verdict}</div>
        <p>複数の非重要項目の弱点が重大な場合は、ModerateからLowへ下げる判断もありえます。この表示だけで最終評価を確定しないでください。</p>
      </div>
    `;
    out.innerHTML = html;
    out.style.display = 'block';
    out.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  window.CPGSR_AMSTAR2 = { render };
  document.addEventListener('DOMContentLoaded', render);
})();

// trustworthy-check.js — Ch16 信頼できるCPGの6質問チェックリスト
// Lima-Mirza-Guyatt 2023（J Anesth Analg Crit Care 3:9）準拠

(function(){
  const questions = [
    {
      id: 'q1',
      title: '1. 推奨は明確か？',
      detail: '推奨の方向（賛成／反対）と強さ（強い／条件付き）が明記されているか。対象患者集団、介入、比較対照、設定が具体的か。',
      good: '「重症COVID-19患者には全身性ステロイドを推奨する（強い推奨）」のように、PICOすべてが明確。',
      bad: '「レムデシビルを推奨する」のみで患者重症度や比較対照が不明。'
    },
    {
      id: 'q2',
      title: '2. パネルはすべての代替案を検討したか？',
      detail: '臨床医が実際に検討する代替選択肢すべてが推奨で扱われているか。プラセボではなく標準治療との比較が望ましい。',
      good: 'SSCG小児敗血症性ショックで、血管作動薬各種（ノルアドレナリン優先など）を個別に推奨。',
      bad: 'NICE小児敗血症ガイドで血管作動薬間の優先順位が示されず、臨床医がどれを選ぶか迷う。'
    },
    {
      id: 'q3',
      title: '3. すべての患者重要アウトカムを検討したか？',
      detail: '死亡・主要疾患イベント・QOL・機能・痛み等の患者重要アウトカムが扱われ、利益と害の両方が示されているか。サロゲート（血圧・HbA1c等）のみでないか。',
      good: 'サロゲートを用いる場合も対応する患者重要アウトカムを明示し、間接性を認める。',
      bad: '喉頭下吸引によるVAP予防推奨で、処置関連合併症（気道閉塞・嚥下障害）への言及がない。'
    },
    {
      id: 'q4',
      title: '4. 最新のSRに基づいているか？',
      detail: 'ガイドライン作成時点の最新エビデンスを反映しているか。重要な新規試験後の更新が行われているか。',
      good: 'Living guideline（例：WHO COVID-19）で新RCTごとに更新。',
      bad: '2021 ESC心不全GLでSGLT2阻害薬のHFpEF使用を推奨せず、直後の大規模RCT後も更新されない（2023年時点）。'
    },
    {
      id: 'q5',
      title: '5. 推奨の強さはエビデンスの確実性と整合しているか？',
      detail: '低い確実性に対し「強い推奨」を出す場合、例外（生命を脅かす状況等）に該当するか。整合性は「強い推奨は全員が同じ選択」「条件付きは多数派が推奨選択、一部は異なる選択」と解釈される。',
      good: '確実性の高さだけで推奨の強さを決めず、利益・害・負担と価値観を説明する。低い確実性で強く推奨するときは理由を明示する。',
      bad: 'POCUS小児GLで28/39推奨が中等度確実性と報告されるが、参照されるRCTは7件のみで評価不能。'
    },
    {
      id: 'q6',
      title: '6. COIは推奨に影響していないか？ 管理されているか？',
      detail: '財政的・知的COIの開示と管理方針が明文化されているか。個別推奨への影響評価が行われているか。',
      good: 'COI宣言、管理ポリシー、影響評価が透明。',
      bad: 'COI宣言なし、または開示のみで管理手順が不明。乳がんスクリーニングGLで放射線科医がパネルに入ることでルーチンスクリーニング推奨が6倍増加した実例も。'
    }
  ];

  function render(){
    const mount = document.getElementById('trustworthy-check');
    if (!mount) return;
    let html = `
      <div class="tw-intro">
        <p>Lima-Mirza-Guyatt (2023) が提唱する<strong>信頼できるCPGを見分ける6つの質問</strong>。
        評価したいガイドラインを思い浮かべ、各質問に回答してください。例は2023年の論文を踏まえた教育用の説明で、現在の個別疾患の推奨を示すものではありません。</p>
      </div>
      <div class="tw-questions">
    `;
    questions.forEach(q => {
      html += `
        <fieldset class="tw-q" data-qid="${q.id}">
          <legend class="tw-q-title"><strong>${q.title}</strong></legend>
          <div class="tw-q-detail">${q.detail}</div>
          <details class="tw-q-examples">
            <summary>👁 良い例 / 問題例を見る</summary>
            <div class="tw-example good"><strong>✅ 良い例：</strong>${q.good}</div>
            <div class="tw-example bad"><strong>⚠ 問題例：</strong>${q.bad}</div>
          </details>
          <div class="tw-q-answer">
            <label><input type="radio" name="${q.id}" value="yes"> はい</label>
            <label><input type="radio" name="${q.id}" value="partial"> 部分的に</label>
            <label><input type="radio" name="${q.id}" value="no"> いいえ</label>
            <label><input type="radio" name="${q.id}" value="unclear"> 不明</label>
          </div>
        </fieldset>
      `;
    });
    html += `
      </div>
      <div class="tw-result-area">
        <p>6つの質問は読者が根拠を確認する枠組みです。「はい」の数で信頼性を認定する採点尺度ではありません。</p>
        <button type="button" class="tw-judge-btn" id="tw-judge">確認結果と次に読む箇所を整理</button>
        <div class="tw-result" id="tw-result" role="status" aria-live="polite" style="display:none;"></div>
      </div>
    `;
    mount.innerHTML = html;
    document.getElementById('tw-judge').addEventListener('click', judge);
    mount.addEventListener('change', () => { document.getElementById('tw-result').style.display = 'none'; });
  }

  function judge(){
    const out = document.getElementById('tw-result');
    const counts = { yes:0, partial:0, no:0, unclear:0 };
    const unanswered = [];
    const followUp = [];
    questions.forEach(q => {
      const checked = document.querySelector(`input[name="${q.id}"]:checked`);
      if (!checked){ unanswered.push(q.title); return; }
      counts[checked.value]++;
      if (checked.value !== 'yes') followUp.push(q.title);
    });
    let html = '';
    if (unanswered.length){
      out.innerHTML = `<div class="tw-warn"><strong>確認は未完了です。</strong><br>${unanswered.join('<br>')}</div>`;
      out.style.display = 'block';
      return;
    }
    let verdict, color;
    if (followUp.length) {
      verdict = '<strong>追加確認が必要な箇所</strong><ul>' + followUp.map(title => `<li>${title}</li>`).join('') + '</ul><p>本文・SR・EtD・COI管理の付録を照合し、どの推奨の根拠に影響するかを確認します。</p>';
      color = '#a45e16';
    } else {
      verdict = '<strong>6項目を確認できました。</strong><p>これは信頼性の認定ではありません。根拠の妥当性と更新状況を確認し、<a href="#page-20">目の前の患者への適用可能性</a>を検討してください。</p>';
      color = '#246b60';
    }
    html += `
      <div class="tw-verdict" style="border-left:4px solid ${color};padding:12px 16px;background:${color}10;">
        <div class="tw-counts">はい:${counts.yes} / 部分的:${counts.partial} / いいえ:${counts.no} / 不明:${counts.unclear}</div>
        <div class="tw-verdict-text">${verdict}</div>
      </div>
    `;
    out.innerHTML = html;
    out.style.display = 'block';
    out.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  window.CPGSR_Trustworthy = { render };
  document.addEventListener('DOMContentLoaded', render);
})();

// RR 閾値計算機 (Chapter 8)
function calculateRR() {
    const absMid = parseFloat(document.getElementById('abs-mid').value);
    const baseRisk = parseFloat(document.getElementById('base-risk').value);
    const resultDiv = document.getElementById('calc-result');

    if (isNaN(absMid) || isNaN(baseRisk) || baseRisk === 0) {
        resultDiv.innerHTML = '<span style="color: red;">⚠️ 有効な数値を入力してください。</span>';
        resultDiv.style.display = 'block';
        return;
    }

    const rrr = (absMid / baseRisk) * 100;
    const rrThreshold = 1 - (absMid / baseRisk);

    resultDiv.innerHTML = `
        <div style="font-weight: bold; color: #1e40af;">計算結果:</div>
        <p style="margin: 5px 0;">・相対リスク減少率 (RRR) ≒ <b>\${rrr.toFixed(1)}%</b></p>
        <p style="margin: 5px 0;">・相対リスク閾値 (RR) = <b>\${rrThreshold.toFixed(2)}</b></p>
        <p style="margin-top: 10px; font-size: 13px; color: #4338ca;">👉 フォレストプロットの <b>RR = \${rrThreshold.toFixed(2)}</b> の位置に縦線を引いて評価します。</p>
    `;
    resultDiv.style.display = 'block';
}

// グローバルに公開
window.calculateRR = calculateRR;
window.switchTab = function(btn, index) {
    const page = btn.closest('.page');
    const tabs = page.querySelectorAll('.tab-btn');
    const panes = page.querySelectorAll('.tab-pane');
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));
    panes.forEach((p, i) => p.classList.toggle('active', i === index));
};

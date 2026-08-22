import fs from 'node:fs';

const file = 'index.html';
const pageContent = {
  'page-0': ['home', '0'],
  'page-1': ['ebm-cpg-sr-basics', '1'],
  'page-2': ['grade-overview', '2'],
  'page-3': ['certainty-levels', '3'],
  'page-4': ['recommendation-strength', '4'],
  'page-5': ['summary-of-findings', '5'],
  'page-6': ['effect-measures-absolute', '6'],
  'page-7': ['thresholds-mid', '7'],
  'page-8': ['risk-of-bias', '8'],
  'page-9': ['inconsistency', '9'],
  'page-10': ['indirectness', '10'],
  'page-11': ['imprecision', '11'],
  'page-12': ['dissemination-bias', '12'],
  'page-13': ['nrsi-systematic-review', '13'],
  'page-14': ['qualitative-cerqual', '14'],
  'page-15': ['alternative-recommendations', '15'],
  'page-16': ['trustworthy-cpg', '16'],
  'page-17': ['cpg-quality-examples', '17'],
  'page-18': ['sr-reporting-and-appraisal', '18'],
  'page-20': ['clinical-applicability', '19'],
  'page-21': ['values-shared-decision', '20'],
  'page-22': ['glossary-qa', '21'],
  'page-23': ['guyatt-lectures', '22'],
  'page-24': ['references', '23'],
  'page-25': ['beginner-primer', '24'],
  'page-26': ['jama-sr-ma', '25'],
  'page-28': ['jama-network-meta-analysis', '26'],
  'page-29': ['legacy-japanese-cpg-pitfalls', null]
};

const contentByDataIndex = Object.fromEntries(
  Object.entries(pageContent)
    .filter(([, value]) => value[1] !== null)
    .map(([, value]) => [value[1], value[0]])
);

function replaceOnce(text, before, after, label) {
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly one match, found ${count}`);
  return text.replace(before, after);
}

let html = fs.readFileSync(file, 'utf8');
if (html.includes('data-content-id="home"')) throw new Error('content IDs already present; migration is intentionally one-time');

let pageCount = 0;
html = html.replace(/<div class="page( active)?" id="(page-\d+)">/g, (source, active, pageId) => {
  const definition = pageContent[pageId];
  if (!definition) return source;
  pageCount += 1;
  const [contentId, legacyIndex] = definition;
  const legacyIndexAttribute = legacyIndex === null ? '' : ` data-legacy-index="${legacyIndex}"`;
  return `<div class="page${active || ''}" id="${pageId}" data-content-id="${contentId}" data-legacy-page-id="${pageId}"${legacyIndexAttribute}>`;
});
if (pageCount !== Object.keys(pageContent).length) throw new Error(`page mapping: expected ${Object.keys(pageContent).length}, found ${pageCount}`);

let tocCount = 0;
html = html.replace(/(<button\b[^>]*\bclass="[^"]*\btoc-btn\b[^"]*"[^>]*\bdata-idx=")(\d+)(")/g, (source, prefix, dataIndex, suffix) => {
  const contentId = contentByDataIndex[dataIndex];
  if (!contentId) return source;
  tocCount += 1;
  return `${prefix}${dataIndex}${suffix} data-content-id="${contentId}"`;
});
if (tocCount !== Object.keys(contentByDataIndex).length) throw new Error(`TOC mapping: expected ${Object.keys(contentByDataIndex).length}, found ${tocCount}`);

const primerItem = '      <li class="toc-item"><button class="toc-btn" data-idx="24" data-content-id="beginner-primer"><span class="toc-num">📚</span><span class="toc-text">EBM・SR・CPG 徹底解説<span class="en">Beginner\'s Primer</span></span></button></li>';
const indexItem = '      <li class="toc-item"><a class="toc-btn toc-link" href="learning-index.html" data-content-id="learning-index"><span class="toc-num">⌕</span><span class="toc-text">索引：論文を読む順番／トピック・Guyattから探す<span class="en">Learning index</span></span></a></li>';
html = replaceOnce(html, primerItem, `${primerItem}\n${indexItem}`, 'learning index sidebar insertion');

const pitfallsButton = '      <li class="toc-item"><button class="toc-btn" data-idx="27"><span class="toc-num">特</span><span class="toc-text">本邦CPGトホホ集<span class="en">Japanese CPG Pitfalls</span></span></button></li>';
const pitfallsLink = '      <li class="toc-item"><a class="toc-btn toc-link" href="japan-cpg-tohoho.html" data-content-id="japanese-cpg-pitfalls"><span class="toc-num">特</span><span class="toc-text">本邦CPGトホホ集<span class="en">Japanese CPG Pitfalls</span></span></a></li>';
html = replaceOnce(html, pitfallsButton, pitfallsLink, 'Japanese CPG pitfalls sidebar route');

const finalReferenceItem = '      <li class="toc-item"><button class="toc-btn" data-idx="23" data-content-id="references"><span class="toc-num">25</span><span class="toc-text">参考文献一覧<span class="en">References</span></span></button></li>';
const deepLearningItems = `      <li class="toc-section toc-section-major">さらに深く勉強するために</li>
      <li class="toc-item"><a class="toc-btn toc-link" href="advanced-statistics.html" data-content-id="advanced-statistics"><span class="toc-num">数</span><span class="toc-text">統計学・因果推論<span class="toc-detail">推定対象・CI・設計・統合</span><span class="en">Statistics & Causal Inference</span></span></a></li>
      <li class="toc-item"><a class="toc-btn toc-link" href="non-rct-observational-studies.html" data-content-id="nonrct-observational"><span class="toc-num">観</span><span class="toc-text">非RCT・観察研究<span class="toc-detail">因果質問・交絡・調整</span><span class="en">Non-randomized Studies</span></span></a></li>
      <li class="toc-item"><a class="toc-btn toc-link" href="oncology-outcomes.html" data-content-id="oncology-outcomes"><span class="toc-num">癌</span><span class="toc-text">がんアウトカム<span class="toc-detail">生存・PRO・代替指標</span><span class="en">Oncology Outcomes</span></span></a></li>
      <li class="toc-item"><a class="toc-btn toc-link" href="meta-analysis-methods.html" data-content-id="meta-analysis-methods"><span class="toc-num">MA</span><span class="toc-text">メタ分析の数理と現代的方法<span class="en">Meta-analysis Methods</span></span></a></li>
      <li class="toc-item"><a class="toc-btn toc-link" href="guyatt-methodology-atlas.html" data-content-id="guyatt-methodology-atlas"><span class="toc-num">G</span><span class="toc-text">Guyatt方法論アトラス<span class="en">Methods Atlas</span></span></a></li>`;
html = replaceOnce(html, finalReferenceItem, `${finalReferenceItem}\n\n${deepLearningItems}`, 'deep learning sidebar insertion');

const mainOpening = '  <main class="main-content" id="mainContent">';
const noScriptNavigation = `  <noscript>\n    <nav class="no-script-nav" aria-label="JavaScriptなしで使う主な導線">\n      <strong>主要な学習ページ：</strong>\n      <a href="learning-index.html">索引：論文を読む順番／トピック・Guyattから探す</a>\n      <a href="advanced-statistics.html">統計学・因果推論</a>\n      <a href="non-rct-observational-studies.html">非RCT・観察研究</a>\n      <a href="oncology-outcomes.html">がんアウトカム</a>\n      <a href="japan-cpg-tohoho.html">本邦CPGトホホ集</a>\n    </nav>\n  </noscript>\n\n${mainOpening}`;
html = replaceOnce(html, mainOpening, noScriptNavigation, 'no-script navigation insertion');

const mainEndPattern = /  <\/main>\r?\n\r?\n<\/div><!-- \/\.app-body -->/;
const mainEndMatch = html.match(mainEndPattern);
if (!mainEndMatch || html.match(new RegExp(mainEndPattern.source, 'g')).length !== 1) {
  throw new Error('not-found route insertion: expected exactly one app-body closing marker');
}
const routeNotice = `    <section id="reader-route-not-found" class="reader-route-not-found" hidden tabindex="-1" aria-labelledby="reader-route-not-found-title">\n      <h1 id="reader-route-not-found-title">この教材内の場所を見つけられませんでした</h1>\n      <p>URLの末尾を確認するか、索引から目的のテーマを探してください。既存の章は削除されていません。</p>\n      <p><a href="learning-index.html">索引：論文を読む順番／トピック・Guyattから探す</a> <button type="button" data-home-route>最初のページへ戻る</button></p>\n    </section>\n\n${mainEndMatch[0]}`;
html = html.replace(mainEndPattern, routeNotice);
html = replaceOnce(html, 'script.js?v=7.2', 'script.js?v=8.0', 'script cache version');

fs.writeFileSync(file, html, 'utf8');
console.log(`Mapped ${pageCount} SPA pages and ${tocCount} sidebar buttons.`);

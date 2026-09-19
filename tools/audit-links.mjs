// Audit every published HTML page and JSON data source. No third-party packages.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const external = new Map();
const brokenLocal = [];
const htmlFiles = fs.readdirSync(root).filter(file => file.endsWith('.html'));
const unescape = value => value.replaceAll('&amp;', '&');
const ids = new Map(htmlFiles.map(file => [file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]))]));
let localCount = 0;

function record(value, source) {
  value = unescape(value);
  if (/^https?:\/\//.test(value)) {
    const url = new URL(value); url.hash = '';
    const key = url.href;
    if (!external.has(key)) external.set(key, new Set());
    external.get(key).add(source);
    return;
  }
  if (!value || /^(?:mailto:|tel:|data:|javascript:)/.test(value)) return;
  localCount++;
  const [rawFile, rawHash] = value.split('#');
  const file = rawFile.split('?')[0] || (source.endsWith('.html') ? source : 'index.html');
  if (!fs.existsSync(path.join(root, file))) brokenLocal.push({ source, target: value, reason: 'missing file' });
  else if (rawHash && file.endsWith('.html')) {
    let fragment;
    try { fragment = decodeURIComponent(rawHash); } catch { fragment = rawHash; }
    if (!(ids.get(file) || new Set()).has(fragment)) brokenLocal.push({ source, target: value, reason: 'missing anchor' });
  }
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) record(match[1], file);
}
function walk(value, file, key = '') {
  if (Array.isArray(value)) value.forEach(v => walk(v, file, key));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walk(v, file, k));
  else if (typeof value === 'string' && /(?:url|href)$/i.test(key)) record(value, file);
}
for (const file of fs.readdirSync('data').filter(f => f.endsWith('.json'))) walk(JSON.parse(fs.readFileSync(path.join('data', file), 'utf8')), 'data/' + file);

const report = { checkedAt: new Date().toISOString(), htmlFiles: htmlFiles.length, localCount, brokenLocal, externalCount: external.size, results: [] };
if (process.argv.includes('--online')) {
  const queue = [...external.entries()];
  async function worker() {
    while (queue.length) {
      const [url, sources] = queue.shift();
      const result = { url, sources: [...sources] };
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'CPGSR-LinkAudit/1.0' } });
        result.status = response.status;
        result.finalUrl = response.url;
        result.state = response.ok ? 'reachable' : [404, 410].includes(response.status) ? 'missing-candidate' : 'needs-review';
        await response.body?.cancel();
      } catch (error) {
        result.state = 'needs-review'; result.error = error.cause?.code || error.name;
      }
      report.results.push(result);
      if (report.results.length % 25 === 0) console.log(`Checked ${report.results.length}/${external.size} external URLs`);
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
} else report.results = [...external].map(([url, sources]) => ({ url, sources: [...sources], state: 'not-requested' }));
report.results.sort((a, b) => a.url.localeCompare(b.url));
const output = process.argv.find(arg => arg.startsWith('--output='))?.slice(9) || 'docs/link-audit-2026-09-19.json';
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output, pages: htmlFiles.length, localCount, brokenLocal, externalCount: external.size, states: report.results.reduce((counts, r) => { counts[r.state] = (counts[r.state] || 0) + 1; return counts; }, {}) }, null, 2));
if (brokenLocal.length) process.exitCode = 1;

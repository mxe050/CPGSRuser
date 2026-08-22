import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'BASELINE_CONTENT_MANIFEST.json'), 'utf8'));
const failures = [];
const notes = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}
function idsIn(html) {
  return new Set([...html.matchAll(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map((match) => match[1] ?? match[2] ?? ''));
}
function count(html, expression) {
  return (html.match(expression) || []).length;
}
function totals(html) {
  return {
    figures: count(html, /<figure\b/gi),
    tables: count(html, /<table\b/gi),
    videos: count(html, /<(video|iframe)\b/gi),
    details: count(html, /<details\b/gi),
    externalLinks: count(html, /<a\b[^>]*\bhref\s*=\s*(?:"https?:\/\/|'https?:\/\/)/gi)
  };
}

for (const file of baseline.htmlFiles) {
  const absolutePath = path.join(root, file.path);
  check(fs.existsSync(absolutePath), 'baseline HTML file is missing: ' + file.path);
  if (!fs.existsSync(absolutePath)) continue;

  const current = fs.readFileSync(absolutePath, 'utf8');
  const currentIds = idsIn(current);
  const missingIds = file.ids.map((item) => item.id).filter((id) => !currentIds.has(id));
  check(missingIds.length === 0, file.path + ': baseline IDs removed: ' + missingIds.join(', '));

  const currentTotals = totals(current);
  for (const key of ['figures', 'tables', 'videos', 'details']) {
    check(currentTotals[key] >= file.totals[key], file.path + ': baseline ' + key + ' were removed (' + file.totals[key] + ' -> ' + currentTotals[key] + ')');
  }

  const localAssets = file.assets.filter((asset) => asset.kind === 'local').map((asset) => asset.value.split('?')[0]);
  const missingAssets = localAssets.filter((asset) => !current.includes(asset));
  check(missingAssets.length === 0, file.path + ': baseline local assets removed: ' + missingAssets.join(', '));

  notes.push(file.path + ': retained ' + file.ids.length + ' baseline IDs, ' + localAssets.length + ' local asset references, and all baseline media minima.');
}

if (failures.length) {
  console.error('Content preservation verification failed (' + failures.length + '):');
  failures.forEach((failure) => console.error('- ' + failure));
  process.exit(1);
}
console.log('Content preservation verification passed.');
notes.forEach((message) => console.log('- ' + message));

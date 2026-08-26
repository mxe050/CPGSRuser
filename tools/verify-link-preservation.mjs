import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'BASELINE_CONTENT_MANIFEST.json'), 'utf8'));
const failures = [];
let checked = 0;

function attributeValues(html, attribute) {
  const expression = new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'giu');
  return new Set([...html.matchAll(expression)].map((match) => match[1] ?? match[2] ?? ''));
}

function withoutVersion(value) {
  return value.split(/[?#]/u)[0];
}

for (const file of baseline.htmlFiles ?? []) {
  const absolutePath = path.join(root, file.path);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`baseline HTML file is missing: ${file.path}`);
    continue;
  }

  const html = fs.readFileSync(absolutePath, 'utf8');
  const hrefs = attributeValues(html, 'href');
  const srcs = attributeValues(html, 'src');

  for (const link of file.links ?? []) {
    checked += 1;
    if (!hrefs.has(link.href)) failures.push(`${file.path}: baseline href removed: ${link.href}`);
  }

  for (const asset of file.assets ?? []) {
    checked += 1;
    const values = asset.tag === 'link' ? hrefs : srcs;
    const retained = asset.kind === 'local'
      ? [...values].some((value) => withoutVersion(value) === withoutVersion(asset.value))
      : values.has(asset.value);
    if (!retained) failures.push(`${file.path}: baseline ${asset.tag} asset removed: ${asset.value}`);
  }
}

if (failures.length) {
  console.error(`Link preservation verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Link preservation verification passed: ${checked} baseline links and assets retained.`);


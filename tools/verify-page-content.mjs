import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'BASELINE_CONTENT_MANIFEST.json'), 'utf8'));
const failures = [];
const notes = [];

function stripHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/gu, ' ')
    .replace(/<(script|style|nav)\b[\s\S]*?<\/\1>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&nbsp;|&#160;/giu, ' ')
    .replace(/&amp;/giu, '&')
    .replace(/&lt;/giu, '<')
    .replace(/&gt;/giu, '>')
    .normalize('NFKC')
    .replace(/\s+/gu, ' ')
    .trim();
}

function idsIn(html) {
  return new Set([...html.matchAll(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/giu)].map((match) => match[1] ?? match[2] ?? ''));
}

function normalizedHeadingText(value) {
  return stripHtml(value).toLocaleLowerCase('ja-JP');
}

for (const file of baseline.htmlFiles ?? []) {
  const absolutePath = path.join(root, file.path);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`baseline HTML file is missing: ${file.path}`);
    continue;
  }

  const html = fs.readFileSync(absolutePath, 'utf8');
  const ids = idsIn(html);
  const missingIds = (file.ids ?? []).map((item) => item.id).filter((id) => !ids.has(id));
  if (missingIds.length) failures.push(`${file.path}: baseline IDs removed: ${missingIds.join(', ')}`);

  const headings = new Set([...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/giu)].map((match) => normalizedHeadingText(match[1])));
  const missingHeadings = (file.headings ?? [])
    .map((heading) => typeof heading === 'string' ? heading : (heading.text ?? heading.value ?? ''))
    .filter(Boolean)
    .filter((heading) => !headings.has(normalizedHeadingText(heading)));
  if (missingHeadings.length) failures.push(`${file.path}: baseline headings removed: ${missingHeadings.slice(0, 8).join(' / ')}`);

  const currentLength = stripHtml(html).length;
  const minimumLength = Math.floor((file.normalizedTextLength ?? 0) * 0.98);
  if (currentLength < minimumLength) {
    failures.push(`${file.path}: normalized text decreased beyond tolerance (${file.normalizedTextLength} -> ${currentLength}).`);
  }
  notes.push(`${file.path}: text ${file.normalizedTextLength} -> ${currentLength}; ${missingIds.length} missing IDs.`);
}

if (failures.length) {
  console.error(`Page content verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Page content verification passed for ${notes.length} baseline HTML files.`);
notes.forEach((note) => console.log(`- ${note}`));

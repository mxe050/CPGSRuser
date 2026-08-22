import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const ignoredDirectories = new Set(['.git', 'node_modules', '.github']);
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function normalizeText(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).normalize('NFKC').replace(/\s+/g, ' ').trim();
}

function plainText(html) {
  return normalizeText(html).replace(/\s+/g, ' ').trim();
}

function getAttributes(tagSource) {
  const attributes = {};
  const expression = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = expression.exec(tagSource))) {
    const name = match[1].toLowerCase();
    if (name === 'div' || name === 'section' || name === 'article' || name === 'main' || name === 'a' || name === 'button') continue;
    attributes[name] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function listFiles(directory, predicate) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) result.push(...listFiles(path.join(directory, entry.name), predicate));
    } else if (predicate(entry.name)) {
      result.push(path.join(directory, entry.name));
    }
  }
  return result;
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function startTags(html) {
  const result = [];
  const expression = /<([a-zA-Z][\w:-]*)(\s[^>]*?)?>/g;
  let match;
  while ((match = expression.exec(html))) {
    const tag = match[1].toLowerCase();
    const source = match[0];
    result.push({ tag, source, attributes: getAttributes(source), start: match.index, end: expression.lastIndex, selfClosing: /\/>$/.test(source) || voidTags.has(tag) });
  }
  return result;
}

function collectSections(html) {
  const tokens = [];
  const expression = /<\/?([a-zA-Z][\w:-]*)(\s[^>]*?)?>/g;
  let match;
  while ((match = expression.exec(html))) {
    const source = match[0];
    const closing = source.startsWith('</');
    const tag = match[1].toLowerCase();
    tokens.push({ source, closing, tag, attributes: closing ? {} : getAttributes(source), start: match.index, end: expression.lastIndex, selfClosing: /\/>$/.test(source) || voidTags.has(tag) });
  }

  const stack = [];
  const sections = [];
  const ordinalByName = new Map();
  for (const token of tokens) {
    if (!token.closing && !token.selfClosing) {
      stack.push(token);
      continue;
    }
    if (!token.closing) continue;
    for (let index = stack.length - 1; index >= 0; index -= 1) {
      if (stack[index].tag !== token.tag) continue;
      const opening = stack[index];
      stack.splice(index);
      const classes = (opening.attributes.class || '').split(/\s+/).filter(Boolean);
      const isCandidate = ['main', 'article', 'section'].includes(opening.tag)
        || classes.includes('page')
        || classes.includes('page-body')
        || Boolean(opening.attributes.id);
      if (isCandidate) {
        const name = opening.attributes.id || `${opening.tag}.${classes.join('.') || 'element'}`;
        const ordinal = (ordinalByName.get(name) || 0) + 1;
        ordinalByName.set(name, ordinal);
        const raw = html.slice(opening.start, token.end);
        const text = normalizeText(raw);
        sections.push({
          sectionKey: opening.attributes.id || `${name}#${ordinal}`,
          tag: opening.tag,
          id: opening.attributes.id || null,
          classes,
          normalizedTextLength: text.length,
          normalizedTextSha256: sha256(text),
          figures: (raw.match(/<figure\b/gi) || []).length,
          tables: (raw.match(/<table\b/gi) || []).length,
          videos: (raw.match(/<(video|iframe)\b/gi) || []).length,
          details: (raw.match(/<details\b/gi) || []).length,
          externalLinks: (raw.match(/<a\b[^>]*\bhref\s*=\s*["']https?:\/\//gi) || []).length
        });
      }
      break;
    }
  }
  return sections.sort((left, right) => left.sectionKey.localeCompare(right.sectionKey));
}

function collectHeadings(html) {
  const headings = [];
  const expression = /<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = expression.exec(html))) {
    const attributes = getAttributes(`<h${match[1]} ${match[2]}>`);
    headings.push({ level: Number(match[1]), id: attributes.id || null, text: plainText(match[3]) });
  }
  return headings;
}

function collectIds(html) {
  return startTags(html).map(({ tag, attributes }) => attributes.id ? { id: attributes.id, tag } : null).filter(Boolean);
}

function collectLinks(html) {
  const links = [];
  const expression = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = expression.exec(html))) {
    const attributes = getAttributes(`<a ${match[1]}>`);
    if (!attributes.href) continue;
    const href = attributes.href;
    links.push({
      href,
      text: plainText(match[2]),
      kind: /^(https?:|mailto:|tel:)/i.test(href) ? 'external' : 'internal',
      target: attributes.target || null,
      rel: attributes.rel || null
    });
  }
  return links;
}

function collectAssets(html) {
  const assets = [];
  for (const item of startTags(html)) {
    const value = item.attributes.src || ((item.tag === 'link' || item.tag === 'iframe') ? item.attributes.href : null);
    if (!value) continue;
    assets.push({ tag: item.tag, value, kind: /^(https?:|data:|#)/i.test(value) ? 'external-or-inline' : 'local' });
  }
  return assets;
}

function collectCitationKeys(html) {
  return [...new Set([...html.matchAll(/\[([A-Z][A-Z0-9-]*(?:\d+|-[A-Z0-9-]+)?)\]/g)].map((match) => match[1]))].sort();
}

function findPageModel(indexHtml) {
  const tags = startTags(indexHtml);
  const pages = tags
    .filter((item) => item.tag === 'div' && (item.attributes.class || '').split(/\s+/).includes('page') && item.attributes.id)
    .map((item, domIndex) => ({ domIndex, pageId: item.attributes.id, sourceOffset: item.start }));
  const tocButtons = [];
  const buttonExpression = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  let button;
  while ((button = buttonExpression.exec(indexHtml))) {
    const attributes = getAttributes(`<button ${button[1]}>`);
    if (!(attributes.class || '').split(/\s+/).includes('toc-btn')) continue;
    tocButtons.push({
      dataIdx: attributes['data-idx'] || null,
      text: plainText(button[2]),
      sourceOffset: button.index
    });
  }
  const tocByIndex = new Map();
  for (const toc of tocButtons) {
    if (!tocByIndex.has(toc.dataIdx)) tocByIndex.set(toc.dataIdx, []);
    tocByIndex.get(toc.dataIdx).push(toc.text);
  }
  return {
    pages: pages.map((page) => ({
      ...page,
      directLegacyIndex: /^page-(\d+)$/.test(page.pageId) ? Number(page.pageId.slice(5)) : null,
      hash: `#${page.pageId}`,
      sidebarEntries: tocByIndex.get(page.pageId.replace(/^page-/, '')) || []
    })),
    tocButtons
  };
}

function currentCommit() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const htmlFiles = listFiles(root, (name) => name.toLowerCase().endsWith('.html')).sort();
const files = htmlFiles.map((filePath) => {
  const html = fs.readFileSync(filePath, 'utf8');
  const normalized = normalizeText(html);
  const links = collectLinks(html);
  return {
    path: relative(filePath),
    bytes: Buffer.byteLength(html),
    normalizedTextLength: normalized.length,
    normalizedTextSha256: sha256(normalized),
    ids: collectIds(html),
    headings: collectHeadings(html),
    links,
    assets: collectAssets(html),
    citationKeys: collectCitationKeys(html),
    sections: collectSections(html),
    totals: {
      figures: (html.match(/<figure\b/gi) || []).length,
      tables: (html.match(/<table\b/gi) || []).length,
      videos: (html.match(/<(video|iframe)\b/gi) || []).length,
      details: (html.match(/<details\b/gi) || []).length,
      externalLinks: links.filter((link) => link.kind === 'external').length
    }
  };
});

const chapters = JSON.parse(fs.readFileSync(path.join(root, 'data', 'chapters.json'), 'utf8'));
const references = JSON.parse(fs.readFileSync(path.join(root, 'data', 'references.json'), 'utf8'));
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const pageModel = findPageModel(indexHtml);
const chapterIds = chapters.chapters.map((chapter) => chapter.idx);
const pageNumbers = pageModel.pages.map((page) => page.directLegacyIndex).filter((value) => value !== null);
const missingPageIdsForChapters = chapterIds.filter((idx) => !pageNumbers.includes(idx));
const pageIdsNotInChapters = pageNumbers.filter((idx) => !chapterIds.includes(idx));
const bodyCitationKeys = [...new Set(files.flatMap((file) => file.citationKeys))].sort();
const referenceKeys = Object.keys(references.references).sort();
const citationKeysMissingFromReferences = bodyCitationKeys.filter((key) => !referenceKeys.includes(key));
const unreferencedReferenceKeys = referenceKeys.filter((key) => !bodyCitationKeys.includes(key));

const manifest = {
  schemaVersion: '1.0',
  generatedAt: new Date().toISOString(),
  baselineCommit: currentCommit(),
  normalizer: 'NFKC, HTML text extraction excluding comments/script/style/nav, whitespace collapse',
  htmlFiles: files,
  indexNavigation: pageModel,
  chapters: {
    source: 'data/chapters.json',
    chapterIndexes: chapterIds,
    missingPageIdsForChapters,
    pageIdsNotInChapters
  },
  references: {
    source: 'data/references.json',
    keys: referenceKeys,
    bodyCitationKeys,
    citationKeysMissingFromReferences,
    unreferencedReferenceKeys
  }
};

const auditLines = [
  '# Baseline navigation audit',
  '',
  `- Baseline commit: \`${manifest.baselineCommit || 'unavailable'}\``,
  `- Generated: ${manifest.generatedAt}`,
  `- HTML files inventoried: ${files.length}`,
  '',
  '## Legacy page mapping',
  '',
  '| DOM order | Page ID | Legacy hash | Direct numeric ID | Sidebar entries |',
  '| --- | --- | --- | --- | --- |',
  ...pageModel.pages.map((page) => `| ${page.domIndex} | \`${page.pageId}\` | \`${page.hash}\` | ${page.directLegacyIndex ?? 'none'} | ${page.sidebarEntries.map((text) => text.replace(/\|/g, '\\|')).join('<br>') || 'none'} |`),
  '',
  '## Detected differences',
  '',
  `- Chapter indexes without an exact \`page-N\` element: ${missingPageIdsForChapters.length ? missingPageIdsForChapters.join(', ') : 'none'}.`,
  `- \`page-N\` elements not represented in \`data/chapters.json\`: ${pageIdsNotInChapters.length ? pageIdsNotInChapters.join(', ') : 'none'}.`,
  `- Sidebar buttons: ${pageModel.tocButtons.length}.`,
  `- Body citation keys missing from \`data/references.json\`: ${citationKeysMissingFromReferences.length ? citationKeysMissingFromReferences.join(', ') : 'none'}.`,
  `- Reference keys not detected as bracket citations in HTML: ${unreferencedReferenceKeys.length ? unreferencedReferenceKeys.join(', ') : 'none'}.`,
  '',
  '## Routing risk recorded before changes',
  '',
  'The existing script opens `.page` elements by NodeList position. The sidebar uses `data-idx`, while DOM order and page IDs contain special pages. A stable content registry and compatibility layer are required before new indexed content is introduced.',
  '',
  '## Baseline files',
  '',
  'The machine-readable inventory, including IDs, headings, links, asset references, section-level normalized text hashes, and media counts, is in `BASELINE_CONTENT_MANIFEST.json`.'
];

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(path.join(docsDir, 'BASELINE_CONTENT_MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(docsDir, 'BASELINE_NAVIGATION_AUDIT.md'), `${auditLines.join('\n')}\n`, 'utf8');

console.log(`Baseline written for ${files.length} HTML files.`);

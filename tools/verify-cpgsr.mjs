import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const notes = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}
function note(message) {
  notes.push(message);
}
function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}
function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}
function attribute(source, name) {
  const needle = name.toLowerCase() + '=';
  const lowered = source.toLowerCase();
  const start = lowered.indexOf(needle);
  if (start < 0) return null;
  const rest = source.slice(start + needle.length).trimStart();
  const quote = rest.charAt(0);
  if (quote === '"' || quote === "'") {
    const end = rest.indexOf(quote, 1);
    return end < 0 ? null : rest.slice(1, end);
  }
  return rest.split(/[\s>]/)[0] || null;
}
function idsIn(html) {
  return [...html.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)].map((match) => match[1] ?? match[2] ?? '');
}
function hrefsIn(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
}
function localPath(relativeFile, href) {
  const beforeHash = href.split('#')[0];
  const pathname = beforeHash.split('?')[0];
  if (!pathname) return relativeFile;
  if (!pathname.toLowerCase().endsWith('.html')) return null;
  return path.relative(root, path.resolve(path.dirname(path.join(root, relativeFile)), pathname)).split(path.sep).join('/');
}
function fragmentOf(href) {
  const index = href.indexOf('#');
  return index < 0 ? '' : decodeURIComponent(href.slice(index + 1));
}
function verifyPageLinks(relativeFile, html, pageIds) {
  for (const tag of hrefsIn(html)) {
    const href = attribute(tag, 'href');
    const target = attribute(tag, 'target');
    const rel = attribute(tag, 'rel') || '';
    if (target === '_blank') check(/\bnoopener\b/.test(rel), relativeFile + ': target=_blank link lacks rel=noopener (' + (href || 'no href') + ')');
    if (!href || /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const targetFile = localPath(relativeFile, href);
    if (!targetFile) continue;
    check(fs.existsSync(path.join(root, targetFile)), relativeFile + ': missing internal HTML target ' + href);
    const fragment = fragmentOf(href);
    if (!fragment || !fs.existsSync(path.join(root, targetFile))) continue;
    const ids = pageIds.get(targetFile) || new Set(idsIn(read(targetFile)));
    check(ids.has(fragment), relativeFile + ': missing anchor ' + href);
  }
}

const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html')).sort();
const htmlByFile = new Map(htmlFiles.map((file) => [file, read(file)]));
const pageIds = new Map();

for (const [file, html] of htmlByFile) {
  const ids = idsIn(html);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  check(duplicateIds.length === 0, file + ': duplicate id values: ' + duplicateIds.join(', '));
  pageIds.set(file, new Set(ids));
  verifyPageLinks(file, html, pageIds);
}

const independentPages = [
  'advanced-statistics.html',
  'non-rct-observational-studies.html',
  'oncology-outcomes.html',
  'learning-index.html',
  'guyatt-methodology-atlas.html',
  'meta-analysis-methods.html'
];
for (const file of independentPages) {
  const html = htmlByFile.get(file);
  check(Boolean(html), 'missing independent page ' + file);
  if (!html) continue;
  check(/<title>[^<]+CPGSR Reader/i.test(html), file + ': missing CPGSR Reader title');
  check((html.match(/<h1\b/gi) || []).length === 1, file + ': expected exactly one h1');
  check(/class="cpgsr-brand"/.test(html), file + ': missing common CPGSR Reader brand');
  check(/class="cpgsr-breadcrumb"/.test(html), file + ': missing breadcrumb');
  check(/class="cpgsr-skip-link"/.test(html), file + ': missing skip link');
  check(/meta name="viewport"/i.test(html), file + ': missing mobile viewport metadata');
}

for (const file of ['guyatt-methodology-atlas.html', 'meta-analysis-methods.html']) {
  const html = htmlByFile.get(file);
  const sourceStrips = (html.match(/methods-source-strip/g) || []).length;
  const statuses = (html.match(/methods-source-strip"><span class="methods-status /g) || []).length;
  const verifiedDates = (html.match(/methods-verified-date/g) || []).length;
  check(sourceStrips > 0, file + ': no source strips');
  check(statuses === sourceStrips, file + ': each source strip must show a source status');
  check(verifiedDates === sourceStrips, file + ': each source strip must show a verification date');
}

const metaHtml = htmlByFile.get('meta-analysis-methods.html');
for (let module = 1; module <= 19; module += 1) {
  check(metaHtml.includes('id="module-' + module + '"'), 'meta-analysis-methods.html: missing module-' + module);
}
const atlasHtml = htmlByFile.get('guyatt-methodology-atlas.html');
for (const suffix of ['081903', '081904', '081905', '083864', '083865', '083866', '083867']) {
  check(atlasHtml.includes('bmj-2024-' + suffix), 'guyatt-methodology-atlas.html: missing Core GRADE ' + suffix + ' link');
}

const registry = readJson('data/content-registry.json');
const registryIds = new Set(registry.items.map((item) => item.contentId));
const references = readJson('data/references.json').references;
for (const item of registry.items) {
  check(item.contentId && item.href, 'content registry: item without contentId or href');
  const targetFile = localPath('learning-index.html', item.href);
  check(Boolean(targetFile) && fs.existsSync(path.join(root, targetFile)), 'content registry: missing target for ' + item.contentId);
  const fragment = fragmentOf(item.href);
  if (targetFile && fragment && fs.existsSync(path.join(root, targetFile))) {
    const ids = pageIds.get(targetFile) || new Set(idsIn(read(targetFile)));
    check(ids.has(fragment), 'content registry: missing anchor for ' + item.contentId + ' (' + item.href + ')');
  }
  for (const related of item.relatedContentIds || []) {
    check(registryIds.has(related), 'content registry: ' + item.contentId + ' references unknown related content ' + related);
  }
  for (const refId of item.referenceIds || []) {
    check(Boolean(references[refId]), 'content registry: ' + item.contentId + ' references unknown source ' + refId);
  }
}
note('Content registry entries: ' + registry.items.length);

const citationKeys = new Set();
for (const [file, html] of htmlByFile) {
  for (const match of html.matchAll(/\[([UMGTCRVL]\d+)\]/g)) citationKeys.add(match[1]);
}
for (const key of citationKeys) {
  const reference = references[key];
  check(Boolean(reference), 'citation key missing from data/references.json: ' + key);
  if (reference) check(reference.verificationStatus === 'verified', 'citation key is not verified and must not be interactive: ' + key);
}
for (const [key, reference] of Object.entries(references)) {
  check(['verified', 'incomplete', 'non-formal'].includes(reference.verificationStatus), 'reference ' + key + ': invalid verificationStatus');
  if (reference.verificationStatus === 'verified') {
    for (const required of ['authors', 'year', 'title', 'url', 'verifiedOn']) {
      check(Boolean(reference[required]), 'verified reference ' + key + ': missing ' + required);
    }
  }
}
const referencesJs = read('js/references.js');
check(referencesJs.includes("ref.verificationStatus === 'verified'"), 'references.js must only create interactive citations for verified sources');

const learningJs = read('learning-index.js');
const workflowCount = (learningJs.match(/\{ id: '[^']+', number: '\d+'/g) || []).length;
const topicCount = (learningJs.match(/\{ id: '[^']+', title: '[^']+', description:/g) || []).length;
check(workflowCount === 12, 'learning-index.js: expected 12 workflow stages, found ' + workflowCount);
check(topicCount === 17, 'learning-index.js: expected 17 topic groups, found ' + topicCount);
for (const token of ['history.replaceState', 'popstate', "'mid'", "'imprecision'", "'rmst'", "'prisma'", "'amstar'", "'guyatt'"]) {
  check(learningJs.includes(token), 'learning-index.js: missing search or history support for ' + token);
}

const indexHtml = htmlByFile.get('index.html');
const indexWithoutPendingReferences = indexHtml.replace(/<details class="ref-pending">[\s\S]*?<\/details>/g, '');
const formalReferenceKeys = [...indexWithoutPendingReferences.matchAll(/<span class="ref-id">([^<]+)<\/span>/g)].map((match) => match[1]);
for (const key of formalReferenceKeys) {
  if (references[key]) check(references[key].verificationStatus !== 'incomplete', 'index.html: incomplete source appears in the formal reference list: ' + key);
}
for (const requiredText of ['PRISMA 2020', 'AMSTAR 2', 'ROBIS', 'IOM 8基準', 'M1、M2、M7、M8']) {
  check(indexHtml.includes(requiredText), 'index.html: expected corrected terminology not found: ' + requiredText);
}
for (const prohibitedText of ['OISは400', 'CIがMIDをまたぐ場合は不精確さ', '条件付き推奨では共同意思決定が必須']) {
  check(!indexHtml.includes(prohibitedText), 'index.html: obsolete fixed rule remains: ' + prohibitedText);
}
const readerScript = read('script.js');
for (const requiredText of ['window.showPage', 'popstate', 'hashchange', 'reader-route-not-found']) {
  check(readerScript.includes(requiredText), 'script.js: missing legacy route or history support: ' + requiredText);
}

for (const cssFile of ['learning-index.css', 'methods-library.css']) {
  const css = read(cssFile);
  check(css.includes('@media'), cssFile + ': missing responsive rules');
  check(!css.includes('clamp('), cssFile + ': viewport-scaled typography is not permitted here');
}
check(read('methods-library.css').includes('.methods-status.draft'), 'methods-library.css: missing a distinct draft source style');

if (failures.length) {
  console.error('CPGSR static verification failed (' + failures.length + '):');
  failures.forEach((failure) => console.error('- ' + failure));
  process.exit(1);
}
console.log('CPGSR static verification passed.');
notes.forEach((message) => console.log('- ' + message));

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data', 'content-registry.json'), 'utf8'));
const codes = new Map(registry.items.map((item) => [item.contentId, item.navCode]));
const files = [
  path.join(root, 'tools', 'snippets', 'ebm-grade-sidebar.html'),
  path.join(root, 'index.html')
];

function replaceRegisteredNumbers(source, file) {
  let replacements = 0;
  const updated = source.replace(
    /(<(?:button|a)\b[^>]*\bdata-content-id="([^"]+)"[^>]*>[\s\S]*?<span class="toc-num">)([^<]*)(<\/span>)/g,
    (match, prefix, contentId, previous, suffix) => {
      const code = codes.get(contentId);
      if (!code) throw new Error(`${file}: unknown data-content-id ${contentId}`);
      if (previous !== code) replacements += 1;
      return `${prefix}${code}${suffix}`;
    }
  );
  return { updated, replacements };
}

for (const file of files) {
  let source = fs.readFileSync(file, 'utf8');
  source = source.replace(
    'href="y-sensei-ebm-practice-links.html"><span class="toc-num">',
    'href="y-sensei-ebm-practice-links.html" data-content-id="y-sensei-ebm-practice-links"><span class="toc-num">'
  );
  source = source.replaceAll('本邦CPGトホホ集（旧URL）', '本邦CPGトホホ集（本体内資料）');
  source = source.replaceAll('Legacy route', 'Built-in reader page');

  const { updated, replacements } = replaceRegisteredNumbers(source, file);
  let finalSource = updated
    .replace(/(<a\b[^>]*href="https:\/\/mxe050\.github\.io\/GRADE-tanken\/"[^>]*>[\s\S]*?<span class="toc-num">)[^<]*(<\/span>)/, '$1R5$2')
    .replace(/(<a\b[^>]*href="https:\/\/chatgpt\.com\/g\/[^\"]+"[^>]*>[\s\S]*?<span class="toc-num">)[^<]*(<\/span>)/, '$1R6$2');

  if (/<span class="toc-num">旧/.test(finalSource)) {
    throw new Error(`${file}: visible old numbering remains.`);
  }
  fs.writeFileSync(file, finalSource);
  console.log(`${path.relative(root, file)}: ${replacements} registered numbers updated.`);
}

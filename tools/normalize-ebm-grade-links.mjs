import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacyHashes = {
  home: 'page-0',
  'ebm-cpg-sr-basics': 'page-1',
  'grade-overview': 'page-2',
  'certainty-levels': 'page-3',
  'recommendation-strength': 'page-4',
  'summary-of-findings': 'page-5',
  'effect-measures-absolute': 'page-6',
  'thresholds-mid': 'page-7',
  'risk-of-bias': 'page-8',
  inconsistency: 'page-9',
  indirectness: 'page-10',
  imprecision: 'page-11',
  'dissemination-bias': 'page-12',
  'nrsi-systematic-review': 'page-13',
  'qualitative-cerqual': 'page-14',
  'alternative-recommendations': 'page-15',
  'trustworthy-cpg': 'page-16',
  'cpg-quality-examples': 'page-17',
  'sr-reporting-and-appraisal': 'page-18',
  'clinical-applicability': 'page-20',
  'values-shared-decision': 'page-21',
  'glossary-qa': 'page-22',
  'guyatt-lectures': 'page-23',
  references: 'page-24',
  'beginner-primer': 'page-25',
  'jama-sr-ma': 'page-26',
  'jama-network-meta-analysis': 'page-28',
  'legacy-japanese-cpg-pitfalls': 'page-29'
};

const files = [
  'index.html',
  'tools/snippets/ebm-grade-home-map.html',
  'tools/snippets/ebm-grade-hubs.html'
];

for (const relativePath of files) {
  const absolutePath = path.join(projectRoot, relativePath);
  let source = fs.readFileSync(absolutePath, 'utf8');

  for (const [contentId, legacyHash] of Object.entries(legacyHashes)) {
    source = source.replaceAll(`href="#${contentId}"`, `href="#${legacyHash}"`);
  }

  source = source
    .split(/\r?\n/u)
    .map((line) => line.replace(/[\t ]+$/u, ''))
    .join('\n');

  if (!source.endsWith('\n')) source += '\n';
  fs.writeFileSync(absolutePath, source, 'utf8');
}

console.log(`Normalized legacy fallbacks in ${files.length} files.`);

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registryPath = path.join(root, 'data', 'content-registry.json');
const chaptersPath = path.join(root, 'data', 'chapters.json');
const navigationPath = path.join(root, 'data', 'navigation-structure.json');
const verifiedDate = '2026-08-26';

function placement(primaryPlacement, relatedPlacements, mapStage, topicGroups, navLabel) {
  return { primaryPlacement, relatedPlacements, mapStage, topicGroups, navLabel };
}

const placements = {
  home: placement('start.map', [], 'overview', ['start'], 'EBMからGRADEへ：全体マップ'),
  'beginner-primer': placement('start.primer', ['ebm-basic.foundations'], 'overview', ['start', 'ebm-basic'], 'EBM・SR・CPG 徹底解説'),
  'learning-index': placement('resources.index', ['start.index'], 'resource', ['resources'], '学習索引'),
  'ebm-cpg-sr-basics': placement('ebm-basic.foundations', ['main-map.question'], 'question', ['ebm-basic'], 'EBMとCPG・SRの読み方'),
  'jama-sr-ma': placement('ebm-basic.critical-appraisal', ['main-map.synthesis', 'topics.trustworthiness'], 'synthesis', ['ebm-basic', 'T4', 'T6'], "JAMA Users' Guides：SR／MAを監査する"),
  'grade-overview': placement('main-map.overview', ['topics.core-grade'], 'overview', ['grade', 'T1'], 'GRADEアプローチの概要'),
  'certainty-levels': placement('main-map.certainty', ['main-map.sof'], 'certainty', ['grade'], '確実性4段階と開始点'),
  'risk-of-bias': placement('main-map.certainty', ['topics.nonrct', 'topics.trustworthiness'], 'certainty', ['grade', 'T2', 'T6'], 'Risk of Bias'),
  inconsistency: placement('main-map.certainty', ['topics.meta-analysis'], 'certainty', ['grade', 'T4'], '不一致性'),
  indirectness: placement('main-map.certainty', ['topics.oncology', 'main-map.apply-assess'], 'certainty', ['grade', 'T5'], '非直接性'),
  imprecision: placement('main-map.certainty', ['main-map.sof', 'topics.statistics'], 'certainty', ['grade', 'T9'], '不精確さ'),
  'dissemination-bias': placement('main-map.certainty', ['topics.trustworthiness'], 'certainty', ['grade', 'T6'], 'Dissemination bias'),
  'summary-of-findings': placement('main-map.sof', ['main-map.outcomes', 'main-map.etd'], 'sof', ['grade'], 'SoF表・Evidence Profile'),
  'effect-measures-absolute': placement('main-map.sof', ['main-map.etd', 'topics.meta-analysis'], 'sof', ['T4'], '相対効果と絶対効果'),
  'thresholds-mid': placement('main-map.sof', ['main-map.certainty', 'main-map.etd'], 'sof', ['T9'], '閾値とMID'),
  'recommendation-strength': placement('main-map.recommendation', ['main-map.etd'], 'recommendation', ['grade'], '推奨の方向と強さ'),
  'clinical-applicability': placement('main-map.apply-assess', ['main-map.etd'], 'apply-assess', ['ebm-basic'], '患者への適用'),
  'values-shared-decision': placement('main-map.apply-assess', ['main-map.outcomes', 'main-map.etd'], 'apply-assess', ['ebm-basic'], '共同意思決定と価値観'),
  'nrsi-systematic-review': placement('topics.nonrct', ['main-map.certainty', 'main-map.synthesis'], 'certainty', ['T2'], '非RCT・観察研究・因果推論'),
  'nonrct-observational': placement('topics.nonrct', ['main-map.certainty'], 'topic', ['T2'], '非RCT・観察研究を詳しく読む'),
  'nonrct-target-trial': placement('topics.nonrct', ['main-map.question'], 'question', ['T2', 'T9'], 'target trialとtime zero'),
  'nonrct-propensity-score': placement('topics.nonrct', ['topics.statistics'], 'topic', ['T2', 'T9'], '傾向スコアと調整診断'),
  'advanced-causal-variables': placement('topics.nonrct', ['topics.statistics'], 'topic', ['T2', 'T9'], '因果効果を読むための変数選択'),
  'qualitative-cerqual': placement('topics.cerqual', ['main-map.outcomes', 'main-map.etd'], 'topic', ['T3'], '定性研究・GRADE-CERQual'),
  'meta-analysis-methods': placement('topics.meta-analysis', ['main-map.synthesis', 'main-map.certainty'], 'synthesis', ['T4'], 'メタ分析の数理と現代的方法'),
  'jama-network-meta-analysis': placement('topics.meta-analysis', ['main-map.synthesis'], 'synthesis', ['T4'], 'ネットワークメタアナリシス'),
  'oncology-outcomes': placement('topics.oncology', ['main-map.outcomes', 'main-map.certainty'], 'outcomes', ['T5'], 'がんアウトカム・生存時間'),
  'advanced-survival': placement('topics.oncology', ['topics.statistics'], 'topic', ['T5', 'T9'], 'HR・非比例ハザード・RMST'),
  'trustworthy-cpg': placement('topics.trustworthiness', ['main-map.apply-assess'], 'apply-assess', ['T6'], '信頼できるCPGの6つの質問'),
  'cpg-quality-examples': placement('topics.trustworthiness', ['topics.japan', 'main-map.apply-assess'], 'topic', ['T6', 'T10'], 'CPG品質の実例'),
  'sr-reporting-and-appraisal': placement('topics.trustworthiness', ['main-map.synthesis'], 'synthesis', ['T6'], 'AMSTAR 2・PRISMA 2020・ROBIS'),
  'alternative-recommendations': placement('topics.alternative', ['main-map.etd', 'main-map.recommendation'], 'recommendation', ['T7'], '単一推定値なし・GPS・net benefit'),
  'guyatt-methodology-atlas': placement('topics.guyatt', ['topics.core-grade', 'resources.references'], 'topic', ['T8'], 'Guyatt方法論アトラス'),
  'guyatt-lectures': placement('topics.guyatt', ['topics.core-grade', 'resources.references'], 'topic', ['T8'], 'Guyatt先生講演'),
  'advanced-statistics': placement('topics.statistics', ['main-map.question', 'main-map.certainty'], 'topic', ['T9'], '統計学・因果推論'),
  'advanced-estimand': placement('topics.statistics', ['main-map.question'], 'question', ['T9'], 'estimand'),
  'japanese-cpg-pitfalls': placement('topics.japan', ['topics.trustworthiness'], 'topic', ['T10'], '本邦CPGトホホ集'),
  'legacy-japanese-cpg-pitfalls': placement('topics.japan', ['topics.trustworthiness'], 'topic', ['T10'], '本邦CPGトホホ集（旧URL）'),
  'glossary-qa': placement('resources.glossary', [], 'resource', ['resources'], '用語集・Q&A'),
  references: placement('resources.references', [], 'resource', ['resources'], '参考文献一覧')
};

function hub(contentId, titleJa, titleEn, summaryJa, primaryPlacement, mapStage, relatedContentIds, topicGroups, navLabel, badges = ['学習ハブ']) {
  return {
    contentId,
    titleJa,
    titleEn,
    summaryJa,
    href: `index.html#${contentId}`,
    displayNumber: null,
    legacyTargets: [],
    aliases: [titleJa, titleEn, navLabel],
    contentType: 'hub',
    documentTypes: ['mixed'],
    workflowStages: mapStage ? [mapStage] : ['orientation'],
    topics: topicGroups,
    authors: [],
    level: 'entry',
    sourceStatus: 'educational',
    relatedContentIds,
    referenceIds: [],
    lastVerified: verifiedDate,
    badges,
    primaryPlacement,
    relatedPlacements: [],
    mapStage,
    topicGroups,
    navLabel,
    legacyDisplayNumber: null
  };
}

const newItems = [
  hub('ebm-basics-hub', 'EBM BASIC：GRADEへ進む前の土台', 'EBM basics hub', '最良の研究エビデンス、臨床専門性、患者の価値観・選好、臨床状況を一つの判断へ統合するEBMの入口。', 'ebm-basic.overview', 'overview', ['ebm-cpg-sr-basics', 'beginner-primer', 'jama-sr-ma'], ['ebm-basic'], 'EBMの基本'),
  hub('ebm-critical-appraisal', '批判的吟味：妥当性・結果・適用可能性', 'Critical appraisal', '研究方法と結果を分け、妥当性、効果の大きさ、患者への適用可能性を順に読む入口。', 'ebm-basic.critical-appraisal', 'synthesis', ['jama-sr-ma', 'risk-of-bias', 'clinical-applicability'], ['ebm-basic'], '批判的吟味'),
  hub('map-clinical-question', 'MAP 1 Clinical Question（PICO）', 'Clinical question and PICO', '誰に、何を、何と比べ、どのアウトカムを、いつまで評価するかを定める入口。', 'main-map.question', 'question', ['ebm-cpg-sr-basics', 'grade-overview', 'beginner-primer', 'advanced-estimand', 'nonrct-target-trial'], ['main-map'], 'MAP 1 Clinical Question（PICO）'),
  hub('map-important-outcomes', 'MAP 2 重要アウトカム', 'Important outcomes', '患者に重要な利益と害を選び、代替アウトカムや測定可能性との違いを確認する入口。', 'main-map.outcomes', 'outcomes', ['grade-overview', 'summary-of-findings', 'oncology-outcomes', 'qualitative-cerqual', 'values-shared-decision'], ['main-map'], 'MAP 2 重要アウトカム'),
  hub('map-evidence-synthesis', 'BRIDGE 批判的吟味からSR・メタ分析へ', 'From critical appraisal to evidence synthesis', '個別研究の批判的吟味から、検索、選択、統合、メタ分析へ進むときの問いを整理する入口。', 'main-map.synthesis', 'synthesis', ['jama-sr-ma', 'sr-reporting-and-appraisal', 'meta-analysis-methods', 'jama-network-meta-analysis', 'learning-index'], ['main-map'], 'BRIDGE 批判的吟味→SR・メタ分析'),
  hub('map-certainty', 'MAP 3 エビデンスの確実性評価', 'Certainty of evidence', 'アウトカムごとの効果推定値について、真の効果が閾値のどちら側または範囲内にある確信を評価する入口。', 'main-map.certainty', 'certainty', ['certainty-levels', 'risk-of-bias', 'inconsistency', 'indirectness', 'imprecision', 'dissemination-bias'], ['main-map'], 'MAP 3 エビデンスの確実性'),
  hub('map-sof', 'SoF：効果の大きさと確実性をまとめる', 'Summary of findings', '相対効果、絶対効果、MID・閾値、確実性をアウトカムごとに一つの表へまとめて読む入口。', 'main-map.sof', 'sof', ['effect-measures-absolute', 'thresholds-mid', 'summary-of-findings'], ['main-map'], 'SoF 効果の大きさと確実性'),
  hub('map-etd', 'MAP 4 Evidence to Decision（EtD）', 'Evidence to Decision', '利益と害、確実性、価値観、資源などを、推奨判断へ透明につなぐ入口。', 'main-map.etd', 'etd', ['recommendation-strength', 'values-shared-decision', 'clinical-applicability', 'qualitative-cerqual', 'alternative-recommendations'], ['main-map'], 'MAP 4 Evidence to Decision'),
  hub('map-recommendation', 'MAP 5 推奨の方向と強さ', 'Direction and strength of recommendations', '推奨する・しないという方向と、強い・条件付きという強さを分けて読む入口。', 'main-map.recommendation', 'recommendation', ['recommendation-strength', 'alternative-recommendations', 'guyatt-methodology-atlas'], ['main-map'], 'MAP 5 推奨の方向と強さ'),
  hub('map-recommendation-patterns', '4つの推奨パターン', 'Four recommendation patterns', '方向2通りと強さ2通りを組み合わせた4つの推奨パターンを確認する入口。', 'main-map.recommendation', 'recommendation', ['recommendation-strength', 'values-shared-decision'], ['main-map'], '4つの推奨パターン'),
  hub('map-ebm-crosswalk', 'MAP 6 EBM 5A × Core GRADE', 'EBM 5A and Core GRADE crosswalk', 'Ask、Acquire、Appraise、Apply、Assessと、Core GRADEの判断工程の対応を確認する入口。', 'main-map.apply-assess', 'apply-assess', ['ebm-cpg-sr-basics', 'clinical-applicability', 'values-shared-decision', 'trustworthy-cpg'], ['main-map', 'ebm-basic'], 'MAP 6 EBM 5A × Core GRADE'),
  hub('map-apply-assess', 'Apply・Assess：推奨を患者に使い、振り返る', 'Apply and assess', '推奨を目の前の患者へ適用し、共同意思決定と実装後の評価へ進む入口。', 'main-map.apply-assess', 'apply-assess', ['clinical-applicability', 'values-shared-decision', 'trustworthy-cpg', 'cpg-quality-examples'], ['main-map'], 'MAP 6 Apply・Assess'),
  hub('topics-index', 'TOPICS：図に入りきらない方法論を探す', 'Topics index', '研究デザイン、統計、がんアウトカム、CPG信頼性などを、GRADE工程へ無理に押し込まず探す入口。', 'topics.index', 'topic', ['topic-core-grade', 'nonrct-observational', 'meta-analysis-methods', 'oncology-outcomes', 'advanced-statistics'], ['topics'], 'TOPICS一覧'),
  hub('topic-core-grade', 'Core GRADEとは', 'What is Core GRADE?', 'GRADE Working Group、G3、GRADE Book、Core GRADE 2025、Guyatt、Schünemannの関係を資料の種類と公式性から整理する。', 'topics.core-grade', 'overview', ['grade-overview', 'guyatt-methodology-atlas', 'guyatt-lectures'], ['T1'], 'T1 Core GRADEとは', ['方法論トピック']),
  hub('resources-index', 'RESOURCES：索引・用語集・文献・演習', 'Resources index', '学習索引、用語集、参考文献、演習サイト、リンク集へ進む常設入口。', 'resources.index', 'resource', ['learning-index', 'glossary-qa', 'references'], ['resources'], 'RESOURCES一覧')
];

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const newItemIds = new Set(newItems.map((item) => item.contentId));
const sourceItems = registry.items.filter((item) => !newItemIds.has(item.contentId));
const unmapped = sourceItems.filter((item) => !placements[item.contentId]).map((item) => item.contentId);
if (unmapped.length) throw new Error(`Missing placement metadata: ${unmapped.join(', ')}`);

registry.items = sourceItems.map((item) => ({
  ...item,
  ...placements[item.contentId],
  legacyDisplayNumber: item.displayNumber ?? null
}));
for (const item of newItems) registry.items.push(item);
registry.schemaVersion = '2.0';
registry.updated = verifiedDate;
fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

const navigation = {
  schemaVersion: '2.0',
  updated: verifiedDate,
  canonicalRegistry: 'data/content-registry.json',
  hotspots: 'data/map-hotspots.json',
  zones: [
    { id: 'start', label: 'START', titleJa: '最初に全体像を見る', items: [
      { contentId: 'home', label: 'EBMからGRADEへ：全体マップ' },
      { contentId: 'beginner-primer', label: 'EBM・SR・CPG 徹底解説' },
      { contentId: 'learning-index', label: '学習索引' }
    ] },
    { id: 'ebm-basic', label: 'EBM BASIC', titleJa: 'GRADEへ進む前の土台', items: [
      { contentId: 'ebm-basics-hub', label: 'EBMの基本' },
      { contentId: 'ebm-cpg-sr-basics', label: 'EBMとCPG・SRの読み方' },
      { contentId: 'ebm-critical-appraisal', label: '批判的吟味' },
      { contentId: 'jama-sr-ma', label: "JAMA Users' Guides：SR／MAを監査する" },
      { contentId: 'map-ebm-crosswalk', label: 'EBM 5A × Core GRADE' }
    ] },
    { id: 'main-map', label: 'EBM → GRADE MAIN MAP', titleJa: '図の順に学ぶ', items: [
      { contentId: 'grade-overview', label: 'GRADEアプローチの概要' },
      { contentId: 'map-clinical-question', label: 'MAP 1 Clinical Question（PICO）' },
      { contentId: 'map-important-outcomes', label: 'MAP 2 重要アウトカム' },
      { contentId: 'map-evidence-synthesis', label: 'BRIDGE 批判的吟味→SR・メタ分析' },
      { contentId: 'map-certainty', label: 'MAP 3 エビデンスの確実性', children: ['certainty-levels', 'risk-of-bias', 'inconsistency', 'indirectness', 'imprecision', 'dissemination-bias'] },
      { contentId: 'map-sof', label: 'SoF 効果の大きさと確実性', children: ['effect-measures-absolute', 'thresholds-mid', 'summary-of-findings'] },
      { contentId: 'map-etd', label: 'MAP 4 Evidence to Decision' },
      { contentId: 'map-recommendation', label: 'MAP 5 推奨の方向と強さ', children: ['recommendation-strength', 'map-recommendation-patterns'] },
      { contentId: 'map-apply-assess', label: 'MAP 6 Apply・Assess', children: ['clinical-applicability', 'values-shared-decision'] }
    ] },
    { id: 'topics', label: 'TOPICS', titleJa: '図に無理に入れない詳細分野', items: [
      { contentId: 'topics-index', label: 'TOPICS一覧' },
      { contentId: 'topic-core-grade', label: 'T1 Core GRADEとは' },
      { contentId: 'nrsi-systematic-review', label: 'T2 非RCT・観察研究・因果推論', children: ['nonrct-observational', 'nonrct-target-trial', 'nonrct-propensity-score', 'advanced-causal-variables'] },
      { contentId: 'qualitative-cerqual', label: 'T3 定性研究・CERQual' },
      { contentId: 'meta-analysis-methods', label: 'T4 メタ分析・NMA', children: ['jama-network-meta-analysis'] },
      { contentId: 'oncology-outcomes', label: 'T5 がんアウトカム・生存時間', children: ['advanced-survival'] },
      { contentId: 'trustworthy-cpg', label: 'T6 CPG・SRの信頼性', children: ['cpg-quality-examples', 'sr-reporting-and-appraisal'] },
      { contentId: 'alternative-recommendations', label: 'T7 単一推定値なし・GPS・net benefit' },
      { contentId: 'guyatt-methodology-atlas', label: 'T8 Guyatt方法論', children: ['guyatt-lectures'] },
      { contentId: 'advanced-statistics', label: 'T9 統計学・新しい方法', children: ['advanced-estimand'] },
      { contentId: 'japanese-cpg-pitfalls', label: 'T10 日本のCPG事例', children: ['legacy-japanese-cpg-pitfalls'] }
    ] },
    { id: 'resources', label: 'RESOURCES', titleJa: '索引・用語集・文献・演習', items: [
      { contentId: 'resources-index', label: 'RESOURCES一覧' },
      { contentId: 'learning-index', label: '学習索引' },
      { contentId: 'glossary-qa', label: '用語集・Q&A' },
      { contentId: 'references', label: '参考文献' },
      { href: 'y-sensei-ebm-practice-links.html', label: 'Y先生のEBM実践リンク集' },
      { href: 'https://mxe050.github.io/GRADE-tanken/', label: 'GRADE 探検', external: true },
      { href: 'https://chatgpt.com/g/g-6a085bf7d5bc8191970e6c5eb8949a09-zhen-liao-kaitorainxin-lai-xing-tietukagpt', label: '既存CPGチェックGPT', external: true }
    ] }
  ]
};
fs.writeFileSync(navigationPath, `${JSON.stringify(navigation, null, 2)}\n`, 'utf8');

const chapters = JSON.parse(fs.readFileSync(chaptersPath, 'utf8'));
chapters.version = '2.1';
chapters.updated = verifiedDate;
chapters.navigationStructure = 'data/navigation-structure.json';
chapters.hubContentIds = newItems.map((item) => item.contentId);
if (!chapters.notes.includes('旧25章を本文の正本として維持し、新しいハブと5分類から到達させる。')) {
  chapters.notes.push('旧25章を本文の正本として維持し、新しいハブと5分類から到達させる。');
}
fs.writeFileSync(chaptersPath, `${JSON.stringify(chapters, null, 2)}\n`, 'utf8');

console.log(`Registry enriched: ${registry.items.length} items; ${newItems.length} additive hubs.`);

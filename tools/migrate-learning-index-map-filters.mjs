import fs from 'node:fs';

const file = 'learning-index.js';
let source = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

function replaceOnce(before, after, label) {
  if (!source.includes(before)) throw new Error(`Missing learning-index anchor: ${label}`);
  source = source.replace(before, after);
}

replaceOnce(
  '  const synonymGroups = [',
  `  const zones = [
    { id: 'ebm-basic', title: 'EBM BASIC' },
    { id: 'main-map', title: 'EBM → GRADE MAIN MAP' },
    { id: 'topics', title: 'TOPICS' },
    { id: 'resources', title: 'RESOURCES' }
  ];

  const mapStages = [
    { id: 'question', title: 'PICO' },
    { id: 'outcomes', title: '重要アウトカム' },
    { id: 'synthesis', title: '批判的吟味→SR・メタ分析' },
    { id: 'certainty', title: '確実性' },
    { id: 'sof', title: 'SoF' },
    { id: 'etd', title: 'EtD' },
    { id: 'recommendation', title: '推奨' },
    { id: 'apply-assess', title: 'Apply・Assess' },
    { id: 'overview', title: '全体像' }
  ];

  const topicGroups = [
    { id: 'T1', title: 'T1 Core GRADE' },
    { id: 'T2', title: 'T2 非RCT・観察研究・因果推論' },
    { id: 'T3', title: 'T3 定性研究・CERQual' },
    { id: 'T4', title: 'T4 メタ分析・NMA' },
    { id: 'T5', title: 'T5 がんアウトカム・生存時間' },
    { id: 'T6', title: 'T6 CPG・SRの信頼性' },
    { id: 'T7', title: 'T7 単一推定値なし・特殊な統合' },
    { id: 'T8', title: 'T8 Guyatt方法論' },
    { id: 'T9', title: 'T9 統計学・新しい方法' },
    { id: 'T10', title: 'T10 日本のCPG事例' }
  ];

  const synonymGroups = [`,
  'definitions'
);

replaceOnce(
  "  const author = document.getElementById('learning-index-author');\n  const stage = document.getElementById('learning-index-stage');",
  "  const author = document.getElementById('learning-index-author');\n  const zone = document.getElementById('learning-index-zone');\n  const mapStage = document.getElementById('learning-index-map-stage');\n  const topicGroup = document.getElementById('learning-index-topic-group');\n  const stage = document.getElementById('learning-index-stage');",
  'filter elements'
);

replaceOnce(
  "      item.titleJa, item.titleEn, item.summaryJa, ...(item.aliases || []), ...(item.topics || []), ...(item.documentTypes || []), ...(item.authors || [])",
  "      item.titleJa, item.titleEn, item.summaryJa, item.primaryPlacement, item.mapStage, item.navLabel, ...(item.aliases || []), ...(item.topics || []), ...(item.topicGroups || []), ...(item.documentTypes || []), ...(item.authors || [])",
  'search fields'
);

replaceOnce(
  "      author: author.value,\n      stage: stage.value,",
  "      author: author.value,\n      zone: zone.value,\n      mapStage: mapStage.value,\n      topicGroup: topicGroup.value,\n      stage: stage.value,",
  'selected filters'
);

replaceOnce(
  "    if (selected.author === 'not-guyatt' && hasGuyatt) return false;\n    if (selected.stage) {",
  `    if (selected.author === 'not-guyatt' && hasGuyatt) return false;
    if (selected.zone) {
      const placements = [item.primaryPlacement, ...(item.relatedPlacements || [])].filter(Boolean);
      if (!placements.some((value) => value === selected.zone || value.startsWith(selected.zone + '.'))) return false;
    }
    if (selected.mapStage && item.mapStage !== selected.mapStage) return false;
    if (selected.topicGroup && !(item.topicGroups || []).includes(selected.topicGroup)) return false;
    if (selected.stage) {`,
  'map filters'
);

replaceOnce(
  "    author.value = parameters.get('author') || '';\n    stage.value = parameters.get('stage') || '';",
  "    author.value = parameters.get('author') || '';\n    zone.value = parameters.get('zone') || '';\n    mapStage.value = parameters.get('mapStage') || '';\n    topicGroup.value = parameters.get('topicGroup') || '';\n    stage.value = parameters.get('stage') || '';",
  'query restore'
);

replaceOnce(
  '  populateSelect(stage, workflow);\n  populateSelect(topic, topics);',
  '  populateSelect(zone, zones);\n  populateSelect(mapStage, mapStages);\n  populateSelect(topicGroup, topicGroups);\n  populateSelect(stage, workflow);\n  populateSelect(topic, topics);',
  'select population'
);

fs.writeFileSync(file, source, 'utf8');
console.log('Learning index map filters added.');

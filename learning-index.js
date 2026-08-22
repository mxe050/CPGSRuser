(() => {
  const workflow = [
    { id: 'question', number: '1', title: '臨床疑問とPICO／文書種別を確認する', question: 'これは原著、SR、CPGのどれで、どの患者・比較・アウトカムを問う文書か。', stages: ['question', 'document-type', 'orientation'] },
    { id: 'design', number: '2', title: '研究デザインを同定する', question: 'RCTか、観察研究か、診断・予後研究か。比較は何によって決まったか。', stages: ['design'] },
    { id: 'protocol', number: '3', title: 'プロトコル、登録、検索、選択過程を確認する', question: '事前に決めた方法があり、見つかった研究を再現可能に選んだか。', stages: ['protocol'] },
    { id: 'risk-of-bias', number: '4', title: 'Risk of Biasを評価する', question: '結果を歪める経路を、研究とアウトカムごとに追えるか。', stages: ['risk-of-bias'] },
    { id: 'effect', number: '5', title: '効果指標、時間軸、estimand、絶対効果を読む', question: '何を、いつまでの効果として推定し、患者にとって何人の差になるか。', stages: ['effect'] },
    { id: 'threshold', number: '6', title: '95%CI、MID、意思決定閾値、不精確さを読む', question: '判断が変わる線は何か。CIは利益・害・重要でない差のどこまでを含むか。', stages: ['threshold', 'imprecision'] },
    { id: 'consistency', number: '7', title: '異質性、不一致性、非直接性、欠測エビデンスを読む', question: '研究間の違いと、目の前の患者へのずれを説明できるか。', stages: ['inconsistency', 'directness', 'reporting-bias'] },
    { id: 'synthesis', number: '8', title: 'メタ分析／NMAの統合方法を読む', question: '同じestimandを統合しているか。モデル、仮定、依存性は説明されているか。', stages: ['synthesis'] },
    { id: 'certainty', number: '9', title: 'GRADE certaintyを読む', question: 'どのアウトカムについて、何への確信を、どの理由で評価したか。', stages: ['certainty'] },
    { id: 'recommendation', number: '10', title: 'EtDと推奨の方向・強さを読む', question: 'certainty、利益害、価値観、負担がどのように推奨へつながったか。', stages: ['recommendation'] },
    { id: 'applicability', number: '11', title: '自分の患者への適用可能性と共同意思決定を考える', question: 'ベースラインリスク、負担、患者の価値観は、この患者でどう違うか。', stages: ['applicability', 'shared-decision'] },
    { id: 'source-check', number: '12', title: '原著・SR・CPG相互の整合性を確認する', question: '引用元、補遺、SoF、EtDまでたどり、結論の鎖を検証できるか。', stages: ['source-check', 'trustworthiness'] }
  ];

  const topics = [
    { id: 'ebm-basics', title: 'EBMの基本思想', description: '臨床疑問、証拠、専門性、患者の価値観を分けずに考える。', tags: ['ebm-basics', 'learning-route'] },
    { id: 'patient-important-outcomes', title: '患者に重要なアウトカム', description: '生存、症状、機能、QOL、重大な害を、代替指標と区別して読む。', tags: ['patient-important-outcomes', 'surrogate', 'oncology'] },
    { id: 'absolute-effect', title: '相対効果・絶対効果・NNT', description: 'RR、OR、HRの意味と、ベースラインリスクを使う絶対効果を読む。', tags: ['effect-measures', 'absolute-effect', 'nnt'] },
    { id: 'mid', title: 'MID、MIC、意思決定閾値', description: '用語の違い、群間差、変化量、CIと不精確さの関係を整理する。', tags: ['mid', 'threshold', 'imprecision'] },
    { id: 'grade', title: 'GRADE certaintyの5領域', description: 'RoB、不一致性、非直接性、不精確さ、報告バイアスを横断する。', tags: ['grade', 'certainty', 'risk-of-bias', 'inconsistency', 'indirectness', 'reporting-bias'] },
    { id: 'recommendation', title: '強い推奨と条件付き推奨', description: 'certaintyを含むEtDの判断が推奨へどう関わるかを読む。', tags: ['recommendation', 'etd', 'good-practice-statement'] },
    { id: 'values', title: '価値観・選好・共同意思決定', description: '患者ごとの利益害の受け止め方を、推奨と個別判断へつなぐ。', tags: ['values', 'shared-decision', 'etd'] },
    { id: 'rct', title: 'RCTの批判的吟味', description: 'バイアス、早期中止、サブグループ、欠測、解析集団を読む。', tags: ['rct', 'risk-of-bias', 'statistics'] },
    { id: 'nrsi', title: '非RCT・観察研究・因果推論', description: 'target trial、time zero、DAG、交絡、傾向スコアを確認する。', tags: ['nrsi', 'causal-inference', 'confounding', 'propensity-score', 'target-trial'] },
    { id: 'oncology', title: 'がんアウトカム・生存時間解析', description: 'OS、PFS、RMST、競合リスク、PRO、surrogateを患者重要性から読む。', tags: ['oncology', 'survival', 'time-to-event', 'rmst', 'surrogate'] },
    { id: 'meta-analysis', title: 'メタ分析', description: 'estimand、重み、異質性、稀なイベント、依存効果量を読む。', tags: ['meta-analysis', 'heterogeneity', 'statistics'] },
    { id: 'network-meta-analysis', title: 'ネットワークメタ分析', description: 'transitivity、consistency、ランキングの不確実性を確認する。', tags: ['network-meta-analysis', 'meta-analysis'] },
    { id: 'systematic-review', title: 'SRの信頼性', description: '報告の透明性、批判的吟味、Risk of Biasを同じものとして扱わない。', tags: ['systematic-review', 'reporting-guideline', 'appraisal-tool', 'trustworthiness'] },
    { id: 'cpg', title: 'CPGの信頼性', description: 'PICOから推奨までの根拠の鎖、EtD、COI、更新を追う。', tags: ['cpg', 'trustworthiness', 'recommendation'] },
    { id: 'reporting-guideline', title: '報告ガイドラインと評価ツールの違い', description: 'PRISMAなどの報告ガイドラインと、AMSTAR 2・ROBISなどの役割を分ける。', tags: ['reporting-guideline', 'appraisal-tool', 'risk-of-bias'] },
    { id: 'guyatt', title: 'Guyattの主要方法論', description: '人物紹介ではなく、読み手の問いを解く原著と現行ガイダンスへ進む。', tags: ['guyatt', 'grade', 'ebm-basics', 'threshold'] },
    { id: 'new-methods', title: '新しい／発展中の方法', description: 'estimand-aware synthesis、living evidence、AI、transportabilityを区別して読む。', tags: ['estimand', 'statistics', 'causal-inference', 'meta-analysis'] }
  ];

  const synonymGroups = [
    ['mid', 'mcid', 'mic', '最小重要差', '最小臨床的重要差', 'minimal important difference'],
    ['imprecision', '不精確さ', 'precision', 'confidence interval', '信頼区間', 'ci'],
    ['propensity score', 'propensity', '傾向スコア', 'ps', 'iptw'],
    ['rmst', '制限平均生存時間', 'restricted mean survival time'],
    ['nma', 'network meta analysis', 'network meta-analysis', 'ネットワークメタアナリシス'],
    ['prisma', '報告ガイドライン', 'reporting guideline'],
    ['amstar', 'amstar 2', 'critical appraisal', '評価ツール'],
    ['guyatt', 'gordon guyatt', 'ガイアット'],
    ['sr', 'systematic review', 'システマティックレビュー'],
    ['cpg', 'clinical practice guideline', '診療ガイドライン']
  ];

  const levelLabels = { entry: '入口', standard: '標準', advanced: '発展', mixed: '複合' };
  const statusLabels = {
    'official-guidance': '公式ガイダンス',
    'peer-reviewed-methods': '査読済み方法論',
    'reporting-guideline': '報告ガイドライン',
    'appraisal-tool': '評価ツール',
    'draft-guidance': 'ドラフト',
    preprint: '探索的・プレプリント',
    lecture: '教育講演',
    educational: '教育コンテンツ'
  };

  const form = document.getElementById('learning-index-form');
  const search = document.getElementById('learning-index-search');
  const type = document.getElementById('learning-index-type');
  const level = document.getElementById('learning-index-level');
  const status = document.getElementById('learning-index-status');
  const author = document.getElementById('learning-index-author');
  const stage = document.getElementById('learning-index-stage');
  const topic = document.getElementById('learning-index-topic');
  const resultCount = document.getElementById('learning-index-result-count');
  const empty = document.getElementById('learning-index-empty');
  const workflowContainer = document.getElementById('learning-index-workflow-results');
  const topicContainer = document.getElementById('learning-index-topic-results');
  const viewButtons = [...document.querySelectorAll('[data-index-view]')];
  const panels = [...document.querySelectorAll('[data-index-panel]')];
  const purposeLinks = [...document.querySelectorAll('[data-index-view-link]')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let registryItems = [];
  let activeView = 'workflow';

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function normalize(value) {
    return String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function itemText(item) {
    return normalize([
      item.titleJa, item.titleEn, item.summaryJa, ...(item.aliases || []), ...(item.topics || []), ...(item.documentTypes || []), ...(item.authors || [])
    ].join(' '));
  }

  function queryMatches(item, query) {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return true;
    const haystack = itemText(item);
    const matchingGroup = synonymGroups.find((group) => group.some((term) => normalizedQuery.includes(normalize(term))));
    if (matchingGroup) return matchingGroup.some((term) => haystack.includes(normalize(term)));
    return normalizedQuery.split(' ').filter(Boolean).every((term) => haystack.includes(term));
  }

  function filters() {
    return {
      q: search.value,
      type: type.value,
      level: level.value,
      status: status.value,
      author: author.value,
      stage: stage.value,
      topic: topic.value
    };
  }

  function matches(item, selected) {
    if (!queryMatches(item, selected.q)) return false;
    if (selected.type && !(item.documentTypes || []).includes(selected.type)) return false;
    if (selected.level && item.level !== selected.level && item.level !== 'mixed') return false;
    if (selected.status && item.sourceStatus !== selected.status) return false;
    const hasGuyatt = (item.authors || []).some((name) => normalize(name).includes('guyatt'));
    if (selected.author === 'Guyatt' && !hasGuyatt) return false;
    if (selected.author === 'not-guyatt' && hasGuyatt) return false;
    if (selected.stage) {
      const chosen = workflow.find((definition) => definition.id === selected.stage);
      if (chosen && !chosen.stages.some((stageName) => (item.workflowStages || []).includes(stageName))) return false;
    }
    if (selected.topic) {
      const chosen = topics.find((definition) => definition.id === selected.topic);
      if (chosen && !chosen.tags.some((tag) => (item.topics || []).includes(tag))) return false;
    }
    return true;
  }

  function displayMeta(item) {
    const documentTypes = (item.documentTypes || []).filter((value) => value !== 'mixed').join(' / ');
    const badges = [
      '<span class="index-badge status-' + escapeHtml(item.sourceStatus) + '">' + escapeHtml(statusLabels[item.sourceStatus] || item.sourceStatus) + '</span>',
      '<span class="index-badge">' + escapeHtml(levelLabels[item.level] || item.level) + '</span>'
    ];
    if (documentTypes) badges.push('<span class="index-badge">' + escapeHtml(documentTypes) + '</span>');
    if ((item.authors || []).some((name) => normalize(name).includes('guyatt'))) badges.push('<span class="index-badge">Guyatt関連</span>');
    return '<div class="index-meta">' + badges.join('') + '</div>';
  }

  function renderLinks(items) {
    if (!items.length) return '<p class="index-no-match">現在の条件に合う教材はありません。</p>';
    return '<ul class="index-content-list">' + items.map((item) =>
      '<li><a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.titleJa) +
      '<span>' + escapeHtml(item.summaryJa || '') + '</span>' + displayMeta(item) + '</a></li>'
    ).join('') + '</ul>';
  }

  function itemsForStages(items, stageDefinition) {
    return items.filter((item) => stageDefinition.stages.some((stageName) => (item.workflowStages || []).includes(stageName)));
  }

  function itemsForTopic(items, topicDefinition) {
    return items.filter((item) => topicDefinition.tags.some((tag) => (item.topics || []).includes(tag)));
  }

  function sortItems(items) {
    const rank = { entry: 0, standard: 1, mixed: 2, advanced: 3 };
    return [...items].sort((left, right) => (rank[left.level] - rank[right.level]) || left.titleJa.localeCompare(right.titleJa, 'ja'));
  }

  function renderWorkflow(items, selected) {
    const definitions = selected.stage ? workflow.filter((definition) => definition.id === selected.stage) : workflow;
    workflowContainer.innerHTML = definitions.map((definition) => {
      const matched = sortItems(itemsForStages(items, definition));
      return '<article class="index-stage">' +
        '<span class="index-card-number">段階 ' + escapeHtml(definition.number) + '</span>' +
        '<h3>' + escapeHtml(definition.title) + '</h3>' +
        '<p class="index-reader-question"><strong>自問すること：</strong>' + escapeHtml(definition.question) + '</p>' +
        renderLinks(matched) +
      '</article>';
    }).join('');
  }

  function renderTopics(items, selected) {
    const definitions = selected.topic ? topics.filter((definition) => definition.id === selected.topic) : topics;
    topicContainer.innerHTML = definitions.map((definition) => {
      const matched = sortItems(itemsForTopic(items, definition));
      return '<article class="index-topic">' +
        '<span class="index-card-number">トピック</span>' +
        '<h3>' + escapeHtml(definition.title) + '</h3>' +
        '<p>' + escapeHtml(definition.description) + '</p>' +
        renderLinks(matched) +
      '</article>';
    }).join('');
  }

  function writeQueryState() {
    const selected = filters();
    const parameters = new URLSearchParams();
    parameters.set('view', activeView);
    Object.entries(selected).forEach(([key, value]) => {
      if (value) parameters.set(key, value);
    });
    const query = parameters.toString();
    const anchor = activeView === 'workflow' ? '#workflow' : '#topics';
    history.replaceState({ view: activeView }, '', window.location.pathname + (query ? '?' + query : '') + anchor);
  }

  function setView(view, updateUrl = true) {
    activeView = view === 'topics' ? 'topics' : 'workflow';
    viewButtons.forEach((button) => {
      const selected = button.dataset.indexView === activeView;
      button.setAttribute('aria-selected', String(selected));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.indexPanel !== activeView;
    });
    if (updateUrl) writeQueryState();
  }

  function render() {
    const selected = filters();
    const matched = registryItems.filter((item) => matches(item, selected));
    renderWorkflow(matched, selected);
    renderTopics(matched, selected);
    resultCount.textContent = matched.length + '件の教材が、現在の検索・絞り込み条件に合います。';
    empty.hidden = matched.length !== 0;
    writeQueryState();
  }

  function populateSelect(select, definitions) {
    definitions.forEach((definition) => {
      const option = document.createElement('option');
      option.value = definition.id;
      option.textContent = definition.title;
      select.appendChild(option);
    });
  }

  function restoreQueryState() {
    const parameters = new URLSearchParams(window.location.search);
    search.value = parameters.get('q') || '';
    type.value = parameters.get('type') || '';
    level.value = parameters.get('level') || '';
    status.value = parameters.get('status') || '';
    author.value = parameters.get('author') || '';
    stage.value = parameters.get('stage') || '';
    topic.value = parameters.get('topic') || '';
    setView(parameters.get('view') || (window.location.hash === '#topics' ? 'topics' : 'workflow'), false);
  }

  populateSelect(stage, workflow);
  populateSelect(topic, topics);
  restoreQueryState();

  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      setView('workflow', false);
      render();
    });
  });
  viewButtons.forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.indexView));
  });
  purposeLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setView(link.dataset.indexViewLink);
      document.getElementById(link.dataset.indexViewLink).scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  window.addEventListener('popstate', () => {
    restoreQueryState();
    if (registryItems.length) render();
  });

  fetch('data/content-registry.json', { cache: 'no-cache' })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('registry unavailable')))
    .then((registry) => {
      registryItems = registry.items || [];
      render();
    })
    .catch(() => {
      resultCount.textContent = '索引データを読み込めませんでした。最初のページから各章へ進んでください。';
      empty.hidden = false;
      empty.textContent = '索引データを読み込めません。ページを再読み込みしてください。';
    });
})();

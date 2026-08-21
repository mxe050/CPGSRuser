document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('statistics-search');
  const level = document.getElementById('statistics-level');
  const topic = document.getElementById('statistics-topic');
  const count = document.getElementById('statistics-result-count');
  const empty = document.getElementById('statistics-empty');
  const modules = Array.from(document.querySelectorAll('.adv-module[data-topic]'));
  const chapterBands = Array.from(document.querySelectorAll('.adv-chapter-band'));

  const normalize = (value) => value.toLocaleLowerCase('ja-JP').replace(/\s+/g, ' ').trim();

  const applyFilters = () => {
    const query = normalize(search.value);
    const selectedLevel = level.value;
    const selectedTopic = topic.value;
    let visible = 0;

    modules.forEach((module) => {
      const inText = !query || normalize(module.textContent).includes(query);
      const inLevel = selectedLevel === 'all' || module.dataset.level.split(' ').includes(selectedLevel);
      const inTopic = selectedTopic === 'all' || module.dataset.topic.split(' ').includes(selectedTopic);
      const matches = inText && inLevel && inTopic;
      module.hidden = !matches;
      if (matches) visible += 1;
    });

    chapterBands.forEach((band) => {
      band.hidden = !Array.from(band.querySelectorAll('.adv-module')).some((module) => !module.hidden);
    });
    count.textContent = `${visible}件の学習モジュールを表示しています。`;
    empty.hidden = visible !== 0;
  };

  search.addEventListener('input', applyFilters);
  [level, topic].forEach((control) => control.addEventListener('change', applyFilters));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.activeElement === search && search.value) {
      search.value = '';
      applyFilters();
    }
  });

  applyFilters();
});

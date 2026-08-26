import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data', 'content-registry.json'), 'utf8'));
const navigation = JSON.parse(fs.readFileSync(path.join(root, 'data', 'navigation-structure.json'), 'utf8'));
const hotspotData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'map-hotspots.json'), 'utf8'));
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sidebarHtml = fs.readFileSync(path.join(root, 'tools', 'snippets', 'ebm-grade-sidebar.html'), 'utf8');
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const items = registry.items ?? [];
const contentIds = items.map((item) => item.contentId);
const knownIds = new Set(contentIds);
const navCodes = items.map((item) => item.navCode);
const zoneIds = new Set((navigation.zones ?? []).map((zone) => zone.id));
const navigationIds = new Set();

check(contentIds.length === knownIds.size, 'content-registry.json contains duplicate contentId values.');
check(navCodes.every((code) => typeof code === 'string' && code.length > 0), 'Every registry item must have a navCode.');
check(navCodes.length === new Set(navCodes).size, 'content-registry.json contains duplicate navCode values.');
check(zoneIds.size === 5, `navigation must contain exactly five zones (found ${zoneIds.size}).`);
for (const expected of ['start', 'ebm-basic', 'main-map', 'topics', 'resources']) {
  check(zoneIds.has(expected), `navigation is missing zone: ${expected}`);
}

for (const item of items) {
  check(typeof item.primaryPlacement === 'string' && item.primaryPlacement.length > 0, `${item.contentId}: primaryPlacement is missing.`);
  check(Array.isArray(item.relatedPlacements), `${item.contentId}: relatedPlacements must be an array.`);
  check(typeof item.mapStage === 'string' && item.mapStage.length > 0, `${item.contentId}: mapStage is missing.`);
  check(Array.isArray(item.topicGroups) && item.topicGroups.length > 0, `${item.contentId}: topicGroups are missing.`);
  check(typeof item.navLabel === 'string' && item.navLabel.length > 0, `${item.contentId}: navLabel is missing.`);

  const placementZone = item.primaryPlacement.split('.')[0];
  check(zoneIds.has(placementZone), `${item.contentId}: primaryPlacement uses unknown zone ${placementZone}.`);
  for (const relatedId of item.relatedContentIds ?? []) {
    check(knownIds.has(relatedId), `${item.contentId}: relatedContentIds references missing item ${relatedId}.`);
  }
}

function verifyNavigationEntry(entry, zoneId) {
  if (entry.contentId) {
    check(knownIds.has(entry.contentId), `${zoneId}: navigation references missing item ${entry.contentId}.`);
    navigationIds.add(entry.contentId);
  } else {
    check(typeof entry.href === 'string' && entry.href.length > 0, `${zoneId}: navigation entry needs contentId or href.`);
  }
  for (const childId of entry.children ?? []) {
    check(knownIds.has(childId), `${zoneId}: navigation child references missing item ${childId}.`);
    navigationIds.add(childId);
  }
}

for (const zone of navigation.zones ?? []) {
  for (const entry of zone.items ?? []) verifyNavigationEntry(entry, zone.id);
}

for (const contentId of knownIds) {
  check(navigationIds.has(contentId), `navigation does not expose registry item ${contentId}.`);
}

const menuIds = new Set([...indexHtml.matchAll(/\bdata-content-id="([^"]+)"/g)].map((match) => match[1]));
for (const contentId of knownIds) {
  check(menuIds.has(contentId), `index sidebar does not expose registry item ${contentId}.`);
}
for (const contentId of menuIds) {
  check(knownIds.has(contentId), `index sidebar references missing registry item ${contentId}.`);
}

const registeredRootHtml = new Set(
  items
    .map((item) => String(item.href ?? '').split(/[?#]/)[0])
    .filter((href) => href.endsWith('.html') && !href.includes('/') && !href.includes('\\'))
);
const rootHtml = fs.readdirSync(root).filter((file) => file.endsWith('.html'));
for (const file of rootHtml) {
  check(registeredRootHtml.has(file), `root HTML is not registered: ${file}.`);
}
for (const file of registeredRootHtml) {
  check(fs.existsSync(path.join(root, file)), `registered root HTML does not exist: ${file}.`);
}

check(!/<span class="toc-num">旧/.test(indexHtml), 'index.html still contains visible old numbering.');
check(!/<span class="toc-num">旧/.test(sidebarHtml), 'sidebar snippet still contains visible old numbering.');

const hotspots = hotspotData.hotspots ?? [];
check(hotspots.length === 14, `clickable map must define 14 hotspots (found ${hotspots.length}).`);
check(new Set(hotspots.map((hotspot) => hotspot.id)).size === hotspots.length, 'map-hotspots.json contains duplicate hotspot IDs.');
for (const hotspot of hotspots) {
  check(knownIds.has(hotspot.targetContentId), `${hotspot.id}: targetContentId does not exist: ${hotspot.targetContentId}.`);
  check(typeof hotspot.fallbackHref === 'string' && hotspot.fallbackHref.length > 0, `${hotspot.id}: fallbackHref is missing.`);
  const rect = hotspot.rectPct ?? {};
  for (const key of ['left', 'top', 'width', 'height']) {
    check(Number.isFinite(rect[key]) && rect[key] >= 0 && rect[key] <= 100, `${hotspot.id}: invalid rectPct.${key}.`);
  }
  check((rect.left ?? 101) + (rect.width ?? 101) <= 100.01, `${hotspot.id}: hotspot exceeds image width.`);
  check((rect.top ?? 101) + (rect.height ?? 101) <= 100.01, `${hotspot.id}: hotspot exceeds image height.`);
}

if (failures.length) {
  console.error(`Navigation coverage verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Navigation coverage verification passed: ${items.length} registered items, ${navigationIds.size} navigable items, ${rootHtml.length} root HTML files, ${zoneIds.size} zones, ${hotspots.length} hotspots.`);

// Explicitly reviewed corrections, not a new baseline or a blanket waiver.
import fs from 'node:fs';
const file = 'docs/maintenance-changes-2026-09-19.json';
const record = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
export const replacements = record.replacements || [];
export const headings = record.headings || [];
export function retiredAsset(file, value) {
  return (record.removedAssets || []).some(item => item.file === file && item.value === value.split('?')[0] && item.reason);
}

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CPGSR_BASE_URL || 'http://127.0.0.1:4173';
const output = process.env.CPGSR_QA_OUTPUT || 'docs/qa-2026-09-19';
fs.mkdirSync(output,{recursive:true});
const browser = await chromium.launch({headless:true,...(process.env.CPGSR_BROWSER_CHANNEL ? {channel:process.env.CPGSR_BROWSER_CHANNEL} : {})});
const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page = await context.newPage();
const errors = [];
const missing = [];
const failures = [];
const checks = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => {if(response.url().startsWith(origin) && response.status()>=400) missing.push(response.url());});
async function test(name, fn) {
  try { await fn(); checks.push(name); console.log('PASS '+name); }
  catch(error) { failures.push({name,error:error.message}); console.log('FAIL '+name+': '+error.message.slice(0,300)); }
}
async function goto(file='index.html') { await page.goto(origin+'/'+file,{waitUntil:'networkidle'}); }
async function route(id) {
  await page.evaluate(id=>window.showContent(id),id);
  await page.waitForFunction(id=>document.querySelector('.page.active')?.dataset.contentId===id,id);
}
async function overflow() {
  return page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(el=>{
    if(!el.getClientRects().length || el.closest('.reader-table-scroll, .table-wrap, .table-scroll, .adv-table-wrap, .lp-table-wrap, .cpg-overview-modal'))return false;
    const r=el.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+2 || r.left < -2);
  }).slice(0,8).map(el=>({tag:el.tagName,cls:el.className,text:el.textContent.slice(0,70)}))}));
}
try {
  await goto();
  const routes = await page.locator('.page[data-content-id]').evaluateAll(els=>els.map(el=>({id:el.id,key:el.dataset.contentId})));
  await test('All reader routes and per-page navigation targets',async()=>{
    for(const item of routes){
      await route(item.key);
      assert.equal(await page.locator('.page.active').count(),1,item.key);
      const links=await page.locator('.page.active .reader-location-bar a').evaluateAll(els=>els.map(el=>({href:el.getAttribute('href'),target:el.dataset.contentTarget})));
      for(const link of links)if(link.target)assert(routes.some(r=>r.key===link.target),'Unknown navigation '+link.target);
    }
  });
  await test('Forward navigation opens standalone learning index',async()=>{
    await route('beginner-primer');
    const next=page.locator('.page.active .reader-location-bar a').filter({hasText:'次へ'});
    assert.match(await next.getAttribute('href'),/learning-index\.html/);
    await next.click(); await page.waitForURL('**/learning-index.html');
  });
  await test('Legacy inline page controls all resolve to an existing reader page',async()=>{
    await goto();
    const targets=await page.locator('[onclick]').evaluateAll(els=>[...new Set(els.flatMap(el=>[...el.getAttribute('onclick').matchAll(/showPage\((\d+)\)/g)].map(m=>Number(m[1]))))]);
    for(const target of targets){
      const ok=await page.evaluate(value=>window.showPage(value),target);
      assert(ok,'Unresolved legacy index '+target);
      assert.equal(await page.locator('.page.active').count(),1);
    }
  });
  await test('Home search surfaces new guidance in the learning index',async()=>{
    await goto(); await page.locator('#home-search').fill('PRISMA-C');
    await page.locator('.reader-search button').click();
    await page.waitForURL('**/learning-index.html?**');
    await page.locator('[data-index-panel]:not([hidden]) a[href="updates.html"]').first().waitFor();
    assert(await page.locator('[data-index-panel]:not([hidden]) a[href="updates.html"]').count()>0);
  });
  await test('Empty search and reset',async()=>{
    await page.locator('#learning-index-search').fill('存在しない教材xyz987');
    assert.match(await page.locator('#learning-index-result-count').innerText(),/^0件/);
    await page.locator('button[type="reset"]').click();
    await page.waitForFunction(()=>!document.querySelector('#learning-index-result-count').textContent.startsWith('0件'));
  });
  await test('Skip link keeps current page and moves focus to main',async()=>{
    await goto('index.html#page-8');
    await page.locator('.app-skip-link').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'mainContent');
    assert.equal(await page.locator('.page.active').getAttribute('id'),'page-8');
  });
  await test('Section links retain their hash through Back and reload',async()=>{
    await goto('index.html#page-4');
    await page.evaluate(()=>document.querySelector('#recommendation-gps').scrollIntoView());
    await page.evaluate(()=>window.showContent('recommendation-strength',{anchor:document.getElementById('recommendation-gps')}));
    assert.equal(new URL(page.url()).hash,'#recommendation-gps');
    await route('risk-of-bias');await page.goBack();
    assert.equal(new URL(page.url()).hash,'#recommendation-gps');
    assert.equal(await page.locator('.page.active').getAttribute('id'),'page-4');
    await page.reload();assert.equal(await page.locator('.page.active').getAttribute('id'),'page-4');
    await page.locator('.page.active .reader-section-toc').evaluate(el=>{el.open=true;});
    const generated=page.locator('.page.active .reader-section-toc a[href^="#read-"]').first();
    await generated.click(); const hash=new URL(page.url()).hash;
    await page.reload();assert.equal(new URL(page.url()).hash,hash);
    assert.equal(await page.locator('.page.active').getAttribute('id'),'page-4');
  });
  await test('Malformed and unknown hashes are recoverable',async()=>{
    await goto('index.html#%E0%A4%A');assert(await page.locator('#reader-route-not-found').isVisible());
    await page.locator('[data-home-route]').click();assert.equal(await page.locator('.page.active').getAttribute('id'),'page-0');
  });
  await test('AMSTAR: incomplete, partial, critical flaws, and no meta-analysis',async()=>{
    await goto('index.html#page-18');
    await page.locator('#am-judge').click();
    assert.match(await page.locator('#am-result').innerText(),/評価は保留/);
    assert.doesNotMatch(await page.locator('#am-result').innerText(),/High/);
    assert.equal(await page.locator('#amstar2-check input[value="partial"]').count(),5);
    assert.equal(await page.locator('#amstar2-check input[value="na"]').count(),3);
    for(let i=1;i<=16;i++)await page.locator(`input[name="am${i}"][value="yes"]`).check();
    await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/High/);
    await page.locator('input[name="am2"][value="no"]').check();assert(!await page.locator('#am-result').isVisible());
    await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/Low（低い）/);
    await page.locator('input[name="am4"][value="no"]').check();await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/Critically low/);
    await page.locator('input[name="am2"][value="partial"]').check();await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/総合評価は保留/);
    for(const i of [2,4])await page.locator(`input[name="am${i}"][value="yes"]`).check();
    await page.locator('input[name="am11"][value="na"]').check();await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/回答を確認/);
    for(const i of [12,15])await page.locator(`input[name="am${i}"][value="na"]`).check();
    await page.locator('#am-judge').click();assert.match(await page.locator('#am-result').innerText(),/High/);
  });
  await test('CPG checklist does not certify trustworthiness by score',async()=>{
    await goto('index.html#page-16');await page.locator('#tw-judge').click();
    assert.match(await page.locator('#tw-result').innerText(),/未完了/);
    for(const input of await page.locator('#trustworthy-check input[value="yes"]').all())await input.check();
    await page.locator('#tw-judge').click();
    assert.match(await page.locator('#tw-result').innerText(),/信頼性の認定ではありません/);
    await page.locator('#trustworthy-check input[value="unclear"]').first().check();
    await page.locator('#tw-judge').click();assert.match(await page.locator('#tw-result').innerText(),/追加確認が必要/);
  });
  await test('Reference and glossary controls work by keyboard',async()=>{
    await goto('index.html#page-4');
    const cite=page.locator('.page.active .ref-cite').first();await cite.focus();await page.keyboard.press('Enter');
    assert(await page.locator('.ref-popover').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('.ref-popover').count(),0);
    await route('glossary-qa');await page.locator('.page.active .gloss').first().focus();await page.keyboard.press('Enter');
    assert(await page.locator('.gloss-tip').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('.gloss-tip').count(),0);
  });
  await test('MID notes are keyboard accessible',async()=>{
    await route('thresholds-mid');const button=page.locator('.mid-note-toggle').first();await button.focus();await page.keyboard.press('Enter');
    assert.equal(await button.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Enter');assert.equal(await button.getAttribute('aria-expanded'),'false');
  });
  await test('Reading size persists and print contains only the current chapter',async()=>{
    await route('risk-of-bias');await page.locator('.page.active [data-reader-size="large"]').click();
    await page.reload();assert(await page.locator('html').evaluate(el=>el.classList.contains('reader-large')));
    await page.emulateMedia({media:'print'});assert.equal(await page.locator('.page:visible').count(),1);
    assert.equal(await page.locator('.page:visible').getAttribute('id'),'page-8');
    await page.emulateMedia({media:'screen'});await page.locator('.page.active [data-reader-size="normal"]').click();
  });
  await test('Desktop screenshots',async()=>{
    await goto();await page.screenshot({path:path.join(output,'home-desktop.png')});
    await goto('updates.html');await page.screenshot({path:path.join(output,'updates-desktop.png'),fullPage:true});
  });
  await page.setViewportSize({width:390,height:844});
  await test('Mobile menu and both image dialogs restore focus',async()=>{
    await goto();assert(await page.locator('#sidebar').evaluate(el=>el.inert));
    await page.locator('#menuToggle').click();assert.equal(await page.locator('#menuToggle').getAttribute('aria-expanded'),'true');
    await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'menuToggle');
    assert(await page.locator('#sidebar').evaluate(el=>el.inert));
    await page.locator('.ebm-grade-map-zoom').click();assert(await page.locator('#learningMapModal').evaluate(el=>el.classList.contains('open')));
    assert(await page.locator('.app-body').evaluate(el=>el.inert));
    await page.keyboard.press('Tab');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'learningMapZoomBtn');
    await page.keyboard.press('Escape');assert(await page.locator('.ebm-grade-map-zoom').evaluate(el=>el===document.activeElement));
    await page.evaluate(()=>window.openCPGOverview());assert.equal(await page.locator('#cpgOverviewModal').getAttribute('aria-hidden'),'false');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#cpgOverviewModal').getAttribute('aria-hidden'),'true');
    assert(!await page.locator('.app-body').evaluate(el=>el.inert));
  });
  const htmlFiles=fs.readdirSync('.').filter(file=>file.endsWith('.html'));
  await test('All standalone pages and all reader chapters fit mobile width',async()=>{
    for(const file of htmlFiles){
      await goto(file);
      if(file==='index.html')for(const item of routes){await route(item.key);const result=await overflow();assert(result.scrollWidth<=result.width+2,JSON.stringify({file,key:item.key,...result}));}
      else {const result=await overflow();assert(result.scrollWidth<=result.width+2,JSON.stringify({file,...result}));}
    }
  });
  await test('Mobile screenshots',async()=>{
    await goto();await page.screenshot({path:path.join(output,'home-mobile.png')});
    await goto('index.html#page-8');await page.screenshot({path:path.join(output,'chapter-mobile.png')});
    await goto('updates.html');await page.screenshot({path:path.join(output,'updates-mobile.png')});
  });
  await test('Small phone, tablet and laptop widths contain every chapter',async()=>{
    for(const width of [320,768,1024]){
      await page.setViewportSize({width,height:900});
      for(const file of htmlFiles){
        await goto(file);
        if(file==='index.html')for(const item of routes){await route(item.key);const result=await overflow();assert(result.scrollWidth<=width+2,JSON.stringify({file,key:item.key,...result}));}
        else {const result=await overflow();assert(result.scrollWidth<=width+2,JSON.stringify({file,...result}));}
      }
    }
  });
  await test('No JavaScript errors or missing local resources',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);});
} finally {
  await browser.close();
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({origin,checkedAt:new Date().toISOString(),checks,failures,errors,missing},null,2)+'\n');
}
if(failures.length)process.exitCode=1;

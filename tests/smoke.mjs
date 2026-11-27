/**
 * Smoke tests: open the real page in headless Chromium and check it works.
 *
 *     npm test
 *
 * Runs in CI on every push and pull request.
 */

import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import { chromium } from 'playwright';
import { serve } from '../scripts/serve.mjs';

let browser, server, url;

before(async () => {
  ({ server, base: url } = await serve());
  url += '/index.html';
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.close();
});

async function open(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url);
  await page.waitForSelector('.digit-wrapper .word');
  return { page, errors, context };
}

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`renders cleanly at ${width}px`, async () => {
    const { page, errors, context } = await open({ viewport: { width, height: 900 } });
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      offscreen: [...document.querySelectorAll('.controls > *, .header-links a')]
        .filter(el => {
          const b = el.getBoundingClientRect();
          return b.left < 0 || b.right > window.innerWidth;
        }).length,
      digits: document.querySelectorAll('.digit-wrapper').length,
      sparse: [...document.querySelectorAll('.digit-wrapper')]
        .filter(w => w.querySelectorAll('.word').length < 15).length,
    }));
    assert.deepEqual(errors, [], 'no JavaScript errors');
    assert.ok(r.overflow <= 0, `no sideways scrolling (page is ${r.overflow}px too wide)`);
    assert.equal(r.offscreen, 0, 'every control and link is on screen');
    assert.equal(r.digits, 10, 'all ten digits drawn');
    assert.equal(r.sparse, 0, 'every digit is filled with words');
    await context.close();
  });
}

test('Roboto Black is loaded before the digits are measured', async () => {
  const { page, context } = await open();
  assert.equal(await page.evaluate(() => document.fonts.check('900 384px Roboto')), true);
  await context.close();
});

test('custom words are shown as text, never run as code', async () => {
  const { page, errors, context } = await open();
  for (const word of ['<img src=x onerror="window.__pwned=1">', 'R&D']) {
    await page.click('#add-word-btn');
    await page.fill('#word-text-input', word);
    await page.press('#word-text-input', 'Enter');
  }
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => ({
    pwned: Boolean(window.__pwned),
    injected: document.querySelectorAll('.digits-grid img').length,
    digits: document.querySelectorAll('.digit-svg').length,
  }));
  assert.equal(r.pwned, false);
  assert.equal(r.injected, 0);
  assert.equal(r.digits, 10, 'an "&" does not break any digit');
  assert.deepEqual(errors, []);
  await context.close();
});

test('keyboard: Tab reaches a digit and Enter reshuffles it', async () => {
  const { page, context } = await open();
  const first = page.locator('.digit-wrapper').first();
  await first.focus();
  const before = await first.innerHTML();
  await page.keyboard.press('Enter');
  assert.notEqual(await first.innerHTML(), before);
  await context.close();
});

test('settings are remembered on reload', async () => {
  const { page, context } = await open();
  await page.click('label:has(#toggle-bg)');
  await page.click('#palette-btn');
  await page.reload();
  await page.waitForSelector('.digit-wrapper .word');
  assert.equal(await page.evaluate(() => document.body.classList.contains('bg-light')), true);
  assert.equal(await page.textContent('#palette-label'), 'Cool');
  await context.close();
});

test('reduced motion: animation starts switched off', async () => {
  const { page, context } = await open({ reducedMotion: 'reduce' });
  assert.equal(await page.isChecked('#toggle-anim'), false);
  await context.close();
});

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = (process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:5187/lucid-ui').replace(/\/$/, '');
const OUT_DIR = path.join(ROOT, '.playwright/screenshot/ui-audit');
const serve = process.argv.includes('--serve');
let vite;
let serverClosed;
let browser;
const result = { checks: [], consoleErrors: [], pageErrors: [] };

async function startServer() {
  const url = new URL(BASE_URL);
  assert(['127.0.0.1', 'localhost'].includes(url.hostname), '--serve requires a local URL');
  vite = spawn(
    'pnpm',
    ['--filter', '@pandaworks-sw/demo', 'exec', 'vite', '--host', url.hostname, '--port', url.port, '--strictPort'],
    { cwd: ROOT, stdio: 'pipe' }
  );
  serverClosed = new Promise((resolve) => vite.once('close', resolve));
  let output = '';
  let startError;
  vite.on('error', (error) => {
    startError = error;
  });
  vite.stdout.on('data', (data) => {
    output += data;
  });
  vite.stderr.on('data', (data) => {
    output += data;
  });
  // Wait for our process to bind. Never audit an unrelated server on an occupied port.
  for (let attempt = 0; attempt < 150; attempt++) {
    if (startError) throw startError;
    if (vite.exitCode !== null) throw new Error(`Demo server exited: ${output}`);
    if (output.includes('Local:')) return;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Demo server did not start: ${output}`);
}

async function check(name, action) {
  try {
    await action();
    result.checks.push({ name, pass: true });
  } catch (error) {
    result.checks.push({ name, pass: false, error: String(error) });
  }
}

async function run() {
  if (serve) await startServer();
  await fs.mkdir(OUT_DIR, { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme: theme,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => result.pageErrors.push(String(error)));
    page.on('console', (message) => {
      if (message.type() === 'error') result.consoleErrors.push(message.text());
    });
    await check(`${theme}: button names and loading`, async () => {
      await page.goto(`${BASE_URL}/#/button`);
      await page.getByRole('heading', { name: 'Button', exact: true }).waitFor();
      assert.equal(await page.getByRole('button', { name: 'Edit Atlas project', exact: true }).count(), 1);
      assert.equal(
        await page.getByRole('button', { name: 'Save', exact: true }).first().getAttribute('aria-busy'),
        'true'
      );
      assert.equal(
        await page.locator('html').evaluate((element) => element.classList.contains('dark')),
        theme === 'dark'
      );
      await page.screenshot({ path: path.join(OUT_DIR, `button-${theme}.png`) });
    });
    await check(`${theme}: modal keyboard dismissal and focus return`, async () => {
      await page.goto(`${BASE_URL}/#/modal`);
      const trigger = page.getByRole('button', { name: 'Open Modal', exact: true }).first();
      await trigger.click();
      await page.getByRole('dialog', { name: 'Edit Profile', exact: true }).waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      await page.waitForFunction(() => document.activeElement?.textContent === 'Open Modal');
      assert(await trigger.evaluate((element) => element === document.activeElement));
    });
    await check(`${theme}: sheet opens and closes`, async () => {
      await page.goto(`${BASE_URL}/#/sheet`);
      await page.getByRole('button', { name: 'Open right', exact: true }).click();
      const sheet = page.getByRole('dialog', { name: 'Sheet from right' });
      await sheet.waitFor();
      await page.waitForFunction(() => {
        const element = document.querySelector('[role="dialog"]');
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= 6 && rect.right <= innerWidth - 6 && rect.bottom <= innerHeight - 6;
      });
      assert(await sheet.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopLeftRadius) >= 12));
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
    });
    await check(`${theme}: dropdown keyboard dismissal`, async () => {
      await page.goto(`${BASE_URL}/#/dropdown-menu`);
      await page.getByRole('button', { name: 'Open Menu', exact: true }).click();
      await page.getByRole('menu').waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('menu').waitFor({ state: 'hidden' });
    });
    await check(`${theme}: card and table content`, async () => {
      await page.goto(`${BASE_URL}/#/card`);
      await page.getByText('Employee Overview', { exact: true }).first().waitFor();
      await page.goto(`${BASE_URL}/#/table`);
      await page.getByRole('cell', { name: 'EMP-001', exact: true }).first().waitFor();
    });
    await check(`${theme}: popover opens and closes`, async () => {
      await page.goto(`${BASE_URL}/#/popover`);
      await page.getByRole('button', { name: 'Open Popover', exact: true }).click();
      await page.locator('[data-slot="popover-content"]').waitFor();
      await page.keyboard.press('Escape');
      await page.locator('[data-slot="popover-content"]').waitFor({ state: 'hidden' });
    });
    await check(`${theme}: SaaS account menu`, async () => {
      await page.goto(`${BASE_URL}/saas-showcase`);
      await page.getByRole('button', { name: 'Account', exact: true }).click();
      await page.getByRole('menu').waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('menu').waitFor({ state: 'hidden' });
    });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of ['dashboard', 'projects']) {
        await check(`${theme} ${width}: ${route} layout`, async () => {
          await page.goto(`${BASE_URL}/pure-showcase#/${route}`);
          const heading = page.getByRole('heading', {
            name: route === 'dashboard' ? 'Workspace' : 'Projects',
            exact: true,
          });
          await heading.waitFor();
          await page.screenshot({ path: path.join(OUT_DIR, `${route}-${theme}-${width}.png`) });
          const dimensions = await page.evaluate(() => ({
            viewport: innerWidth,
            document: document.documentElement.scrollWidth,
          }));
          assert(dimensions.document <= dimensions.viewport, `${route}: horizontal page overflow at ${width}px`);
          assert(
            await heading.evaluate((element) => parseFloat(getComputedStyle(element).fontSize) >= 24),
            'Page titles must be at least 24px'
          );
          if (route === 'projects') {
            assert.equal(
              await page.getByRole('button', { name: 'New project', exact: true }).count(),
              1,
              'Projects must have one New project action'
            );
            assert.equal(
              await page.getByRole('button', { name: 'Sort projects', exact: true }).count(),
              1,
              'Hidden columns must remain sortable'
            );
            const names = () => page.locator('tbody tr td:first-child button:first-child').allTextContents();
            const beforeSort = await names();
            assert(beforeSort.length > 0, 'Project names must exist before checking sorting');
            await page.getByRole('button', { name: 'Sort projects', exact: true }).click();
            await page.getByRole('menuitem', { name: 'Progress', exact: true }).click();
            const afterSort = await names();
            assert.notDeepEqual(afterSort, beforeSort, 'Progress sort must change project order');
            await page.getByRole('button', { name: 'Sort projects', exact: true }).click();
            await page.getByRole('menuitem', { name: 'Due date', exact: true }).click();
            assert.notDeepEqual(await names(), afterSort, 'Due date sort must change project order');
            const actions = await page.getByRole('button', { name: 'Row actions', exact: true }).first().boundingBox();
            assert(actions && actions.x + actions.width <= width, 'Row actions must stay in view');
          } else {
            assert(
              await page
                .locator('[data-slot="stat-card"] [data-slot="animated-number"]')
                .first()
                .evaluate((element) => parseFloat(getComputedStyle(element).fontSize) >= 28),
              'Short headline metrics must be at least 28px'
            );
          }
        });
        if (width === 1440) {
          await check(`${theme}: ${route} accessibility`, async () => {
            const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
            const violations = scan.violations.filter(
              (item) => item.impact === 'serious' || item.impact === 'critical'
            );
            assert.deepEqual(
              violations.map((item) => ({
                id: item.id,
                impact: item.impact,
                nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
              })),
              [],
              'No serious or critical accessibility violations'
            );
          });
        }
      }
    }
    await check(`${theme}: mobile component navigation`, async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/#/button`);
      await page.getByRole('heading', { name: 'Button', exact: true }).waitFor();
      const menu = page.getByRole('button', { name: 'Browse components', exact: true });
      assert.equal(await menu.count(), 1, 'Mobile gallery needs a component navigation control');
      await menu.click();
      const navigation = page.getByRole('dialog', { name: 'Components', exact: true });
      await navigation.waitFor();
      await navigation.getByRole('button', { name: 'Input', exact: true }).click();
      await navigation.waitFor({ state: 'hidden' });
      await page.getByRole('heading', { name: 'Input', exact: true }).waitFor();
      await page.screenshot({ path: path.join(OUT_DIR, `gallery-${theme}-390.png`) });
    });
    await context.close();
  }
}

try {
  await run();
} catch (error) {
  result.pageErrors.push(String(error));
} finally {
  await browser?.close();
  if (vite?.pid && vite.exitCode === null && vite.signalCode === null) {
    vite.kill('SIGTERM');
  }
  await serverClosed;
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUT_DIR, 'results.json'), JSON.stringify(result, null, 2));
}
const failed = result.checks.filter((entry) => !entry.pass);
process.stdout.write(
  `${result.checks.length - failed.length} browser checks passed; ${failed.length} failed; ${result.pageErrors.length} page errors; ${result.consoleErrors.length} console errors\n`
);
if (failed.length || result.pageErrors.length || result.consoleErrors.length) {
  process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = 1;
}

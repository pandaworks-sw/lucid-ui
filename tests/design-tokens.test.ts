import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('packages/registry/src/styles.css', 'utf8');
const root = css.match(/:root\s*\{([\s\S]*?)\n {2}\}/)?.[1] ?? '';
const dark = css.match(/\.dark\s*\{\s*color-scheme: dark;([\s\S]*?)\n {2}\}/)?.[1] ?? '';
const declarations = (block: string) =>
  Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]));

function palette(theme: 'light' | 'dark') {
  const tokens = { ...declarations(root), ...(theme === 'dark' ? declarations(dark) : {}) };
  function resolve(token: string): string {
    const value = tokens[token];
    if (!value) throw new Error(`Missing token: ${token}`);
    const reference = value.match(/^var\((--[\w-]+)\)$/);
    return reference ? resolve(reference[1]) : value;
  }
  return resolve;
}

function luminance(hex: string) {
  const rgb = hex
    .replace('#', '')
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);
  if (!rgb || rgb.length !== 3) throw new Error(`Expected a six-digit hex color: ${hex}`);
  const linear = rgb.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (high + 0.05) / (low + 0.05);
}

for (const theme of ['light', 'dark'] as const) {
  describe(`${theme} contrast contracts`, () => {
    const color = palette(theme);
    for (const surface of ['--card', '--background', '--input-bg']) {
      it(`keeps supporting text readable on ${surface}`, () => {
        expect(contrast(color('--muted-foreground'), color(surface))).toBeGreaterThanOrEqual(4.5);
      });
      it(`keeps brand action text readable on ${surface}`, () => {
        expect(contrast(color('--brand-text'), color(surface))).toBeGreaterThanOrEqual(4.5);
      });
      it(`keeps the keyboard focus ring visible on ${surface}`, () => {
        expect(contrast(color('--ring'), color(surface))).toBeGreaterThanOrEqual(3);
      });
    }
  });
}

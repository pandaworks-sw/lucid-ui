#!/usr/bin/env node
// Post-processes the built registry JSONs in public/r so every file installs into
// `components/lucid/` regardless of the consumer's `aliases.ui`. Three
// changes per item: (1) set an explicit `target` path so shadcn doesn't fall back
// to the alias, (2) rewrite any `@/components/ui/*` imports inside the content to
// `@/components/lucid/*` so cross-component references resolve to siblings,
// (3) rewrite bare local names in `registryDependencies` to full raw.githubusercontent
// URLs so shadcn-cli fetches dependents from this registry instead of falling back
// to ui.shadcn.com (which fails for any component shadcn doesn't ship). Hooks
// (`@/hooks/*`) and utils (`@/lib/utils`) are intentionally left untouched — those
// still resolve via the consumer's standard aliases.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, '..', 'public', 'r');

const NAMESPACE_DIR = 'components/lucid';
const OLD_PREFIX = '@/components/ui/';
const NEW_PREFIX = '@/components/lucid/';
const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/pandaworks-sw/lucid-ui/main/public/r';

const files = readdirSync(outputDir).filter((f) => f.endsWith('.json') && f !== 'registry.json');

// Build the set of local component names so we know which registryDependencies
// entries should be rewritten to full URLs. Anything else (e.g. shadcn primitives
// that happen to share a name) is left alone.
const localNames = new Set(files.map((f) => f.replace(/\.json$/, '')));

let itemCount = 0;
let fileCount = 0;
let importRewriteCount = 0;
let depRewriteCount = 0;

for (const filename of files) {
  const filePath = resolve(outputDir, filename);
  const item = JSON.parse(readFileSync(filePath, 'utf8'));

  if (Array.isArray(item.registryDependencies)) {
    item.registryDependencies = item.registryDependencies.map((dep) => {
      if (typeof dep === 'string' && localNames.has(dep)) {
        depRewriteCount++;
        return `${REGISTRY_BASE_URL}/${dep}.json`;
      }
      return dep;
    });
  }

  if (!Array.isArray(item.files)) {
    writeFileSync(filePath, JSON.stringify(item, null, 2) + '\n');
    continue;
  }
  itemCount++;

  for (const file of item.files) {
    fileCount++;

    const fileBasename = basename(file.path);
    file.target = `${NAMESPACE_DIR}/${fileBasename}`;

    // Switch ui types to component so shadcn respects `target` instead of falling
    // back to `aliases.ui`. Other types (registry:hook, registry:lib) stay as-is.
    if (file.type === 'registry:ui') {
      file.type = 'registry:component';
    }

    if (typeof file.content === 'string' && file.content.includes(OLD_PREFIX)) {
      file.content = file.content.replaceAll(OLD_PREFIX, NEW_PREFIX);
      importRewriteCount++;
    }
  }

  writeFileSync(filePath, JSON.stringify(item, null, 2) + '\n');
}

console.log(
  `[rewrite-namespace] ${itemCount} items, ${fileCount} files, ${importRewriteCount} import rewrites, ${depRewriteCount} dep rewrites`
);

# lucid-ui

Shared component library for Pandahrms frontend projects. Built with React 19, Tailwind CSS v4 (OKLCH), and Radix UI primitives.

Internal-only — distributed as the `@pandaworks-sw/ui` npm package via GitHub Packages.

## Installation

The package lives on GitHub Packages, so consumers need an `.npmrc` that points the `@pandaworks-sw` scope at GitHub's registry.

**1. Create a GitHub personal access token (classic) with the `read:packages` scope.** Set it as an environment variable on your machine (e.g. `~/.zshrc`):

```bash
export GITHUB_TOKEN=ghp_xxx_with_read_packages
```

**2. Add an `.npmrc` to the consumer project root (commit it — it has no secret in it):**

```
@pandaworks-sw:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**3. Install:**

```bash
pnpm add @pandaworks-sw/ui
```

Required peer dependencies:

```bash
pnpm add react react-dom lucide-react react-hook-form tailwindcss
```

CI: set `GITHUB_TOKEN` (or a dedicated `read:packages` PAT) in the workflow env so `pnpm install` can resolve the scope.

## Usage

```tsx
import { Button, Badge, Modal, StatCard } from '@pandaworks-sw/ui';
```

Tailwind v4 must be configured in the consumer with the same design tokens (`--primary`, `--brand`, `--success`, `--info`, `--warning`, `--muted`, …). Copy `apps/demo/src/index.css` from this repo as a reference if starting from scratch.

## Available Components

### Layout
`app-shell` `page-header` `detail-page` `modal` `separator`

### Forms
`button` `input` `textarea` `label` `checkbox` `radio-group` `select` `select-picker` `switch` `slider` `date-picker` `date-range-picker` `form` `search-input` `attachment-input` `split-button` `filter-bar`

### Data Display
`card` `table` `badge` `avatar` `calendar` `skeleton` `progress` `code-label` `animated-number` `expandable-text` `selectable-card`

### Feedback
`alert` `alert-dialog` `sonner` `loading-page` `connection-banner` `error-fallback`

### Overlay
`dialog` `sheet` `dropdown-menu` `tooltip` `popover` `command`

### Navigation
`tabs` `accordion` `breadcrumb` `collapsible` `pagination` `scroll-area` `stepper` `toggle` `toggle-group`

## AI Agent Reference

For AI agents consuming this library, see [`public/llms.txt`](public/llms.txt) for complete component API documentation and machine-readable changelog.

For deeper component docs, see [`public/docs/`](public/docs/).

## Development

```bash
pnpm install          # Install dependencies
pnpm dev              # Start demo showcase
pnpm build            # Build npm package + demo
pnpm lint             # Lint demo app
```

## License

Private — Pandaworks Sdn Bhd

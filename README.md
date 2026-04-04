# pandaworks-ui

Shared [shadcn/ui](https://ui.shadcn.com) component registry for Pandahrms frontend projects.

Built with React 19, Tailwind CSS v4 (OKLCH), and Radix UI primitives.

## Using the Registry

### 1. Add the registry to your project

In your project's `components.json`, add the `@pandawork` registry:

```json
{
  "registries": {
    "@pandawork": {
      "url": "https://raw.githubusercontent.com/pandaworks-software-plt/pandaworks-ui/main/public/r/{name}.json"
    }
  }
}
```

### 2. Install components

```bash
# Install a single component
npx shadcn@latest add @pandawork/button

# Install multiple components
npx shadcn@latest add @pandawork/button @pandawork/card @pandawork/input

# Update an existing component
npx shadcn@latest add @pandawork/button --overwrite --yes
```

### Alternative: Install via direct URL

If you prefer not to configure the registry, install components directly:

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/pandaworks-software-plt/pandaworks-ui/main/public/r/button.json
```

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

For AI agents consuming this registry, see [`public/llms.txt`](public/llms.txt) for complete component API documentation and a machine-readable changelog.

## Development

```bash
pnpm install          # Install dependencies
pnpm dev              # Start demo showcase
pnpm registry:build   # Build registry JSON
pnpm build            # Build everything
```

## License

Private -- Pandaworks Software PLT

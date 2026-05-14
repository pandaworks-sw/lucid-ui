# ThemeToggle

Icon-only dropdown that switches the app between three theme modes (`light` / `dark` / `system`). Persists the choice in `localStorage` and re-applies it on every mount. When the mode is `system`, the component also listens for `prefers-color-scheme` changes so the page follows the OS preference live.

The component manipulates `document.documentElement` (toggles the `.dark` class) — it does not own any styling state of its own. Make sure your Tailwind config + CSS variables already react to that class (every other lucid-ui component does, so the default registry styles already cover this).

## Usage

```tsx
import { ThemeToggle } from "@pandaworks-sw/lucid-ui";

<ThemeToggle />
```

The trigger is a Button styled with `variant="outline"` and `size="icon"` by default. The active mode is reflected by the trigger icon — `Sun` for light, `Moon` for dark, `Monitor` for system. Inside the menu, three radio items let the user pick.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `storageKey` | `string` | `"lucid-theme"` | localStorage key for the persisted choice. Override if you need to avoid collisions with another app on the same origin. |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Forwards to `DropdownMenuContent` `align` so the menu stays inside the viewport when the trigger sits near a corner. |
| `variant` | Button variant | `"outline"` | Forwards to the trigger Button. |
| `size` | Button size | `"icon"` | Forwards to the trigger Button. Stick to icon sizes (`icon`, `icon-sm`, `icon-lg`) unless you also pass `children` for a text trigger. |
| `className` | `string` | — | Merged onto the trigger Button. |

All other props are forwarded to the underlying Button.

## Avoiding the flash of incorrect theme

When the page loads, `document.documentElement` does not have the `.dark` class until React mounts. That means a dark-mode user briefly sees the light theme. To fix it, call the named helper in your app entry **before** React renders:

```tsx
// src/main.tsx
import { applyStoredTheme } from "@pandaworks-sw/lucid-ui";

applyStoredTheme();          // uses the default key "lucid-theme"
// applyStoredTheme("my-app-theme");   // or pass a custom key

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

`applyStoredTheme()` reads the stored mode (falling back to `system`) and applies the right `.dark` class before the first paint.

If you override `storageKey` on the `ThemeToggle`, pass the same key to `applyStoredTheme()`.

## Patterns

- **App header**: pin `<ThemeToggle />` in the top-right of your `AppShellHeader`. Default `align="end"` keeps the menu inside the viewport.
- **Settings page**: pair with a `SettingsRow` so users can change theme alongside other preferences without leaving the page.
- **Marketing site**: pass `variant="ghost"` on a transparent hero to soften the trigger.

## What it doesn't do

- It does not manage palette tokens (use the registry `styles.css` for that).
- It does not honour `meta[name="color-scheme"]` — set that in your HTML head if you need form-control auto-styling.
- It does not multicast across tabs. If you need that, listen for `storage` events on the same key and call `applyStoredTheme()` from the handler.

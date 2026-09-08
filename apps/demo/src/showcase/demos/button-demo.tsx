import { useState } from 'react';
import { Mail, ArrowRight, Heart, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoSection, ComponentSection } from '@/showcase/component-page';

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection
        title="Variants"
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Ghost hover"
        code={`{/* Ghost buttons no longer paint a background box on hover.
   Instead the content lights up to the brand color, the button
   scales up a little, and a click scales it down so it feels pressed. */}
<Button variant="ghost">Ghost</Button>
<Button variant="ghost" icon={Pencil} size="icon" tooltip="Edit" />
<Button variant="ghost" icon={Trash2} size="icon" tooltip="Delete" />
<Button variant="ghost" icon={MoreHorizontal} size="icon-sm" tooltip="More" />`}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Hover a ghost button: no background box — the content lights up to the brand color and the button scales up
            a little. Click it to feel the press (scale-down) animation.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="ghost">Ghost</Button>
            <Button variant="ghost" icon={Pencil} size="icon" tooltip="Edit" />
            <Button variant="ghost" icon={Trash2} size="icon" tooltip="Delete" />
            <Button variant="ghost" icon={MoreHorizontal} size="icon-sm" tooltip="More" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Icon Sizes"
        code={`<Button action="create" size="icon-sm" />
<Button action="create" size="icon" />
<Button action="create" size="icon-lg" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button action="create" size="icon-sm" />
          <Button action="create" size="icon" />
          <Button action="create" size="icon-lg" />
        </div>
      </DemoSection>

      <DemoSection
        title="With Icon Prop"
        code={`<Button icon={Mail}>Login with Email</Button>
<Button icon={Heart} variant="outline">Favorite</Button>
<Button icon={ArrowRight} variant="secondary">Continue</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={Mail}>Login with Email</Button>
          <Button icon={Heart} variant="outline">
            Favorite
          </Button>
          <Button icon={ArrowRight} variant="secondary">
            Continue
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Loading"
        code={`<Button loading>Saving...</Button>
<Button action="save" loading />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            Click to load
          </Button>
          <Button action="save" loading />
          <Button variant="outline" loading>
            Processing...
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="link" disabled>
            Link
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Action Presets"
        code={`<Button action="create" />
<Button action="edit" />
<Button action="save" />
<Button action="delete" />
<Button action="cancel" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button action="create" />
          <Button action="edit" />
          <Button action="save" />
          <Button action="delete" />
          <Button action="cancel" />
        </div>
      </DemoSection>

      <DemoSection
        title="As Child (link styled as button)"
        code={`<Button asChild variant="ghost" size="sm">
  <a href="/somewhere">
    <Heart className="h-3 w-3" />
    Open
  </a>
</Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <a href="#aschild-ghost">
              <Heart className="h-3 w-3" />
              Open
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#aschild-outline">External link</a>
          </Button>
          <Button asChild variant="default">
            <a href="#aschild-default">
              <ArrowRight className="h-3.5 w-3.5" />
              Continue
            </a>
          </Button>
        </div>
      </DemoSection>

      <ComponentSection title="When to use">
        <p>
          Use <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Button</code> for any action the user
          takes — submit, save, cancel, open a dialog. Pick the <strong>variant</strong> by importance:
        </p>
        <ul className="ml-4 list-disc space-y-1">
          <li>
            <strong>default</strong> — the one primary action on a surface (Save, Create).
          </li>
          <li>
            <strong>outline / secondary</strong> — supporting actions next to a primary one (Cancel, Edit).
          </li>
          <li>
            <strong>ghost / link</strong> — low-emphasis or inline actions (row actions, "View").
          </li>
          <li>
            <strong>destructive</strong> — only for irreversible actions (Delete). Pair it with an Alert Dialog to
            confirm.
          </li>
        </ul>
        <p>
          Prefer the <strong>action presets</strong> over hand-picking icon + variant + label, so the same action looks
          the same across the app. Match the <strong>size</strong> to the surrounding density, not to preference.
        </p>
      </ComponentSection>

      <DemoSection
        title="Accessible icon actions"
        code={`<Button action="edit" size="icon" />
<Button action="edit" size="icon" aria-label="Edit Atlas project" />`}
      >
        <div className="flex items-center gap-3">
          <Button action="edit" size="icon" />
          <Button action="edit" size="icon" aria-label="Edit Atlas project" />
        </div>
      </DemoSection>

      <ComponentSection title="Accessibility">
        <ul className="ml-4 list-disc space-y-1">
          <li>
            Every variant renders a visible <strong>focus ring</strong> on keyboard focus (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">focus-visible:ring-2</code>), which clears
            the WCAG 1.4.11 non-text 3:1 minimum.
          </li>
          <li>
            <strong>Icon-only action buttons have an automatic accessible name.</strong> The tooltip or action preset
            supplies it. Use <code>aria-label</code> or <code>aria-labelledby</code> for a more specific name. Custom
            icons without a tooltip or preset still need an explicit label. With <code>asChild</code>, label the child
            element.
          </li>
          <li>
            <strong>loading</strong> and <strong>disabled</strong> both set the native{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">disabled</code> attribute, so the button
            leaves the tab order and cannot be triggered twice while an action is in flight. Loading also exposes
            aria-busy.
          </li>
        </ul>
      </ComponentSection>
    </div>
  );
}

import { useState } from "react";
import { Mail, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoSection } from "@/showcase/component-page";

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection title="Variants" code={`<Button variant="default">Default</Button>
<Button variant="brand">Brand</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="brand">Brand</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSection>

      <DemoSection title="Icon Sizes" code={`<Button action="create" size="icon-sm" />
<Button action="create" size="icon" />
<Button action="create" size="icon-lg" />`}>
        <div className="flex flex-wrap items-center gap-3">
          <Button action="create" size="icon-sm" />
          <Button action="create" size="icon" />
          <Button action="create" size="icon-lg" />
        </div>
      </DemoSection>

      <DemoSection title="With Icon Prop" code={`<Button icon={Mail}>Login with Email</Button>
<Button icon={Heart} variant="outline">Favorite</Button>
<Button icon={ArrowRight} variant="secondary">Continue</Button>`}>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={Mail}>Login with Email</Button>
          <Button icon={Heart} variant="outline">Favorite</Button>
          <Button icon={ArrowRight} variant="secondary">Continue</Button>
        </div>
      </DemoSection>

      <DemoSection title="Loading" code={`<Button loading>Saving...</Button>
<Button action="save" loading />`}>
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
          <Button variant="outline" loading>Processing...</Button>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="brand" disabled>Brand</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="ghost" disabled>Ghost</Button>
          <Button variant="link" disabled>Link</Button>
        </div>
      </DemoSection>

      <DemoSection title="Action Presets" code={`<Button action="create" />
<Button action="edit" />
<Button action="save" />
<Button action="delete" />
<Button action="cancel" />`}>
        <div className="flex flex-wrap items-center gap-3">
          <Button action="create" />
          <Button action="edit" />
          <Button action="save" />
          <Button action="delete" />
          <Button action="cancel" />
        </div>
      </DemoSection>
    </div>
  );
}

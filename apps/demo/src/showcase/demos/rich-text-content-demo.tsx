import { RichTextContent } from '@/components/ui/rich-text-content';
import { DemoSection } from '@/showcase/component-page';

const STATEMENT = `<p>By acknowledging, I confirm that I understand:</p>
<ul>
  <li>The <strong>areas of concern</strong> raised in this plan.</li>
  <li>The <em>timeline</em> and what is expected of me.</li>
</ul>
<p>See the <a href="https://example.com/policy">company policy</a> for details.</p>`;

// Contains an unsafe <script> + an onclick handler. The renderer strips both.
const UNSAFE = `<p>Looks fine.</p><script>alert('xss')</script><p onclick="alert('x')">Click me</p>`;

export default function RichTextContentDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Render stored statement" code={`<RichTextContent html={statementHtml} />`}>
        <div className="rounded-md border border-border p-4">
          <RichTextContent html={STATEMENT} />
        </div>
      </DemoSection>

      <DemoSection
        title="Unsafe HTML is sanitised"
        code={`// Input contains <script> and onclick — both removed before render.
<RichTextContent html={untrustedHtml} />`}
      >
        <div className="rounded-md border border-border p-4">
          <RichTextContent html={UNSAFE} />
        </div>
      </DemoSection>

      <DemoSection
        title="Empty fallback"
        code={`<RichTextContent html="" emptyFallback={<span className="text-muted-foreground">No statement yet.</span>} />`}
      >
        <div className="rounded-md border border-border p-4">
          <RichTextContent html="" emptyFallback={<span className="text-muted-foreground">No statement yet.</span>} />
        </div>
      </DemoSection>
    </div>
  );
}

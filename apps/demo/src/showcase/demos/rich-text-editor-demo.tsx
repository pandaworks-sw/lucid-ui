import { useState } from 'react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Label } from '@/components/ui/label';
import { DemoSection } from '@/showcase/component-page';

const SAMPLE = '<p>We agree to the <strong>improvement plan</strong> and its timeline.</p>';

export default function RichTextEditorDemo() {
  const [empty, setEmpty] = useState('');
  const [filled, setFilled] = useState(SAMPLE);
  const [readOnly] = useState(SAMPLE);

  return (
    <div className="space-y-8">
      <DemoSection
        title="Default"
        code={`const [html, setHtml] = useState("");

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Write the agreement statement…"
/>`}
      >
        <div className="space-y-1">
          <Label htmlFor="rte-empty">Agreement statement</Label>
          <RichTextEditor
            id="rte-empty"
            value={empty}
            onChange={setEmpty}
            placeholder="Write the agreement statement…"
          />
        </div>
      </DemoSection>

      <DemoSection title="With content" code={`<RichTextEditor value={html} onChange={setHtml} />`}>
        <RichTextEditor value={filled} onChange={setFilled} />
      </DemoSection>

      <DemoSection title="Disabled (read-only)" code={`<RichTextEditor value={html} onChange={setHtml} disabled />`}>
        <RichTextEditor value={readOnly} onChange={() => {}} disabled />
      </DemoSection>

      <DemoSection title="Invalid" code={`<RichTextEditor value={html} onChange={setHtml} aria-invalid />`}>
        <RichTextEditor value={empty} onChange={setEmpty} aria-invalid placeholder="This field is required…" />
      </DemoSection>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { InlineEditableField } from '@/components/ui/inline-editable-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DemoSection } from '@/showcase/component-page';

export default function InlineEditableFieldDemo() {
  const [name, setName] = useState('Kyson Teh');
  const [draftName, setDraftName] = useState(name);

  const [notes, setNotes] = useState('');
  const [draftNotes, setDraftNotes] = useState(notes);

  return (
    <>
      <DemoSection
        title="Single-line text"
        code={`<InlineEditableField
  label="Lead"
  display={value}
  onSave={async () => { await save(draft); setValue(draft); }}
  editor={({ save, cancel }) => (
    <Input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') cancel();
      }}
    />
  )}
/>`}
      >
        <Card>
          <CardContent className="p-6">
            <InlineEditableField
              label="Lead"
              display={name}
              onSave={() => setName(draftName)}
              onCancel={() => setDraftName(name)}
              editor={({ save, cancel }) => (
                <Input
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') save();
                    if (e.key === 'Escape') cancel();
                  }}
                  autoFocus
                />
              )}
            />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Multiline (Textarea) with empty state"
        code={`<InlineEditableField
  label="Special Notes"
  display={notes}
  emptyText="Not set"
  editor={() => <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} />}
  onSave={async () => { await save(draft); setNotes(draft); }}
/>`}
      >
        <Card>
          <CardContent className="p-6">
            <InlineEditableField
              label="Special Notes"
              display={notes}
              emptyText="Not set"
              onSave={() => setNotes(draftNotes)}
              onCancel={() => setDraftNotes(notes)}
              editor={() => (
                <Textarea
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  rows={4}
                  placeholder="Customer-specific context..."
                />
              )}
            />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Disabled (read-only)"
        code={`<InlineEditableField label="Lead" display="Kyson Teh" disabled onSave={() => {}} editor={() => null} />`}
      >
        <Card>
          <CardContent className="p-6">
            <InlineEditableField label="Lead" display="Kyson Teh" disabled onSave={() => {}} editor={() => null} />
          </CardContent>
        </Card>
      </DemoSection>
    </>
  );
}

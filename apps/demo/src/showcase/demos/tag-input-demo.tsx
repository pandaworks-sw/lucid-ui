import { useState } from 'react';
import { TagInput } from '@/components/ui/tag-input';
import { Label } from '@/components/ui/label';
import { DemoSection } from '@/showcase/component-page';

const SKILLS = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Node.js',
  'PostgreSQL',
  'Playwright',
  'Vitest',
  'Storybook',
  'Figma',
];

export default function TagInputDemo() {
  const [freeForm, setFreeForm] = useState<string[]>(['onboarding', 'beta']);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);
  const [strict, setStrict] = useState<string[]>([]);
  const [capped, setCapped] = useState<string[]>(['priority-1']);
  const [validated, setValidated] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      <DemoSection
        title="Free-form (default)"
        code={`const [tags, setTags] = useState<string[]>(["onboarding", "beta"]);

<TagInput
  value={tags}
  onChange={setTags}
  placeholder="Type and press Enter…"
/>`}
      >
        <div className="space-y-1">
          <Label htmlFor="freeform-tags">Project labels</Label>
          <TagInput id="freeform-tags" value={freeForm} onChange={setFreeForm} placeholder="Type and press Enter…" />
        </div>
      </DemoSection>

      <DemoSection
        title="With suggestions (free-form + allowlist)"
        code={`<TagInput
  value={skills}
  onChange={setSkills}
  suggestions={SKILLS}
  placeholder="Search or add a skill…"
/>`}
      >
        <div className="space-y-1">
          <Label htmlFor="skill-tags">Skills</Label>
          <TagInput
            id="skill-tags"
            value={skills}
            onChange={setSkills}
            suggestions={SKILLS}
            placeholder="Search or add a skill…"
          />
          <p className="text-xs text-muted-foreground">
            Type to filter, click a suggestion to add, or press Enter to add a new skill.
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Allowlist only (allowFreeForm={false})"
        code={`<TagInput
  value={strict}
  onChange={setStrict}
  suggestions={SKILLS}
  allowFreeForm={false}
  placeholder="Pick from the list…"
/>`}
      >
        <div className="space-y-1">
          <Label htmlFor="strict-tags">Required skills (allowlist only)</Label>
          <TagInput
            id="strict-tags"
            value={strict}
            onChange={setStrict}
            suggestions={SKILLS}
            allowFreeForm={false}
            placeholder="Pick from the list…"
          />
        </div>
      </DemoSection>

      <DemoSection title="Max items (3 maximum)" code={`<TagInput value={capped} onChange={setCapped} max={3} />`}>
        <TagInput value={capped} onChange={setCapped} max={3} placeholder="Up to 3 priorities…" />
      </DemoSection>

      <DemoSection
        title="With validation"
        code={`<TagInput
  value={validated}
  onChange={setValidated}
  validate={(v) => (v.length < 3 ? "Tag must be at least 3 characters" : null)}
/>`}
      >
        <TagInput
          value={validated}
          onChange={setValidated}
          validate={(value) => (value.length < 3 ? 'Tag must be at least 3 characters' : null)}
          placeholder="Try typing a 1-character tag…"
        />
      </DemoSection>

      <DemoSection title="Disabled" code={`<TagInput value={["read-only"]} onChange={() => {}} disabled />`}>
        <TagInput value={['read-only']} onChange={() => {}} disabled />
      </DemoSection>
    </div>
  );
}

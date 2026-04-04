import { DemoSection } from "@/showcase/component-page";
import { ExpandableText } from "@/components/ui/expandable-text";

const LONG_TEXT = `This is the first line of a long paragraph.
Second line continues here with more detail.
Third line adds even more context to the content.
Fourth line is where the text starts to overflow.
Fifth line should be hidden when collapsed.
Sixth line is definitely beyond the default limit.
Seventh line for good measure.`;

const SHORT_TEXT = `This is a short text.
It only has two lines.`;

const WRAPPED_TEXT =
  "This is a very long single line of text that should wrap naturally when it exceeds the container width. It demonstrates that the component handles both explicit newline characters and CSS-wrapped long lines correctly. The expandable behavior should work seamlessly in both cases.";

export default function ExpandableTextDemo() {
  return (
    <>
      <DemoSection
        title="Default (3 lines)"
        code={`import { ExpandableText } from "@/components/ui/expandable-text"

<ExpandableText>
  {\`Line 1\\nLine 2\\nLine 3\\nLine 4\\nLine 5\`}
</ExpandableText>`}
      >
        <ExpandableText>{LONG_TEXT}</ExpandableText>
      </DemoSection>

      <DemoSection title="Custom visible lines (2)">
        <ExpandableText visibleLines={2}>{LONG_TEXT}</ExpandableText>
      </DemoSection>

      <DemoSection title="Custom visible lines (5)">
        <ExpandableText visibleLines={5}>{LONG_TEXT}</ExpandableText>
      </DemoSection>

      <DemoSection title="Short text (no toggle)">
        <ExpandableText>{SHORT_TEXT}</ExpandableText>
      </DemoSection>

      <DemoSection title="Long wrapping text">
        <ExpandableText visibleLines={2}>{WRAPPED_TEXT}</ExpandableText>
      </DemoSection>

      <DemoSection title="Custom labels">
        <ExpandableText
          visibleLines={2}
          showMoreLabel="Read more..."
          showLessLabel="Read less..."
        >
          {LONG_TEXT}
        </ExpandableText>
      </DemoSection>
    </>
  );
}

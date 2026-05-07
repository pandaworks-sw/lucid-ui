import { CheckCircle2, Clock, Sparkles, Triangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { IconBadge } from '@/components/ui/icon-badge';
import { DemoSection } from '@/showcase/component-page';

export default function IconBadgeDemo() {
  return (
    <>
      <DemoSection
        title="Tones"
        code={`<IconBadge tone="primary"><Sparkles /></IconBadge>
<IconBadge tone="success"><CheckCircle2 /></IconBadge>
<IconBadge tone="warning"><Clock /></IconBadge>
<IconBadge tone="destructive"><Triangle /></IconBadge>`}
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-6">
            <IconBadge tone="primary">
              <Sparkles />
            </IconBadge>
            <IconBadge tone="info">
              <Sparkles />
            </IconBadge>
            <IconBadge tone="success">
              <CheckCircle2 />
            </IconBadge>
            <IconBadge tone="warning">
              <Clock />
            </IconBadge>
            <IconBadge tone="destructive">
              <Triangle />
            </IconBadge>
            <IconBadge tone="muted">
              <Sparkles />
            </IconBadge>
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<IconBadge size="sm"><Sparkles /></IconBadge>
<IconBadge size="md"><Sparkles /></IconBadge>
<IconBadge size="lg"><Sparkles /></IconBadge>`}
      >
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 p-6">
            <IconBadge size="sm" tone="primary">
              <Sparkles />
            </IconBadge>
            <IconBadge size="md" tone="primary">
              <Sparkles />
            </IconBadge>
            <IconBadge size="lg" tone="primary">
              <Sparkles />
            </IconBadge>
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Shapes"
        code={`<IconBadge shape="rounded"><Sparkles /></IconBadge>
<IconBadge shape="circle"><Sparkles /></IconBadge>
<IconBadge shape="square"><Sparkles /></IconBadge>`}
      >
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 p-6">
            <IconBadge shape="rounded" tone="primary">
              <Sparkles />
            </IconBadge>
            <IconBadge shape="circle" tone="primary">
              <Sparkles />
            </IconBadge>
            <IconBadge shape="square" tone="primary">
              <Sparkles />
            </IconBadge>
          </CardContent>
        </Card>
      </DemoSection>
    </>
  );
}

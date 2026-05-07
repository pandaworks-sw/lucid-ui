import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardGroup } from '@/components/ui/card-group';
import { DemoSection } from '@/showcase/component-page';

function PlaceholderCard({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{body}</CardContent>
    </Card>
  );
}

export default function CardGroupDemo() {
  return (
    <>
      <DemoSection
        title="3-column responsive grid"
        code={`<CardGroup columns={3}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</CardGroup>`}
      >
        <CardGroup columns={3}>
          <PlaceholderCard title="Lead" body="Kyson Teh" />
          <PlaceholderCard title="Success Looks Like" body="System running smoothly post go-live." />
          <PlaceholderCard title="Special Notes" body="Customer is on Pandahrms v3.2." />
        </CardGroup>
      </DemoSection>

      <DemoSection
        title="With shared title and trailing action"
        code={`<CardGroup
  columns={2}
  title="Project Meta"
  action={<Button size="sm" action="edit">Edit</Button>}
>
  <Card>...</Card>
  <Card>...</Card>
</CardGroup>`}
      >
        <CardGroup
          columns={2}
          title="Project Meta"
          action={
            <Button size="sm" action="edit">
              Edit
            </Button>
          }
        >
          <PlaceholderCard title="Internal Team" body="3 members" />
          <PlaceholderCard title="Customer Contacts" body="2 contacts" />
        </CardGroup>
      </DemoSection>
    </>
  );
}

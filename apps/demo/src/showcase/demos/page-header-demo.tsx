import { Download, Plus, Pencil, Trash2 } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';

export default function PageHeaderDemo() {
  return (
    <>
      <DemoSection
        title="List page"
        code={`import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

<PageHeader
  title="Employees"
  description="Manage your team members."
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>
        <Plus className="size-4 mr-2" />
        Add Employee
      </Button>
    </>
  }
/>`}
      >
        <PageHeader
          title="Employees"
          description="Manage your team members and their information."
          actions={
            <>
              <Button variant="outline">
                <Download className="size-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="size-4 mr-2" />
                Add Employee
              </Button>
            </>
          }
        />
      </DemoSection>

      <DemoSection title="Detail page">
        <PageHeader
          title="John Doe"
          description="Software Engineer -- Engineering Department"
          actions={
            <>
              <Button variant="outline">
                <Pencil className="size-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="size-4 mr-2" />
                Delete
              </Button>
            </>
          }
        />
      </DemoSection>

      <DemoSection title="Title only">
        <PageHeader title="Settings" />
      </DemoSection>

      <DemoSection title="With description, no actions">
        <PageHeader title="Dashboard" description="Overview of key metrics and recent activity." />
      </DemoSection>
      <DemoSection
        title="Long title and wrapping actions"
        code={`<PageHeader title="Regional workforce planning and operations" description="Review staffing across every location." actions={<><Button action="export" /><Button action="create">Add employee</Button></>} />`}
      >
        <div className="max-w-sm">
          <PageHeader
            title="Regional workforce planning and operations"
            description="Review staffing across every location."
            actions={
              <>
                <Button action="export" />
                <Button action="create">Add employee</Button>
              </>
            }
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Page titles use 24px Comfortaa. Long titles and actions wrap within the available width.
        </p>
      </DemoSection>
    </>
  );
}

import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { Button } from "@/components/ui/button";

export default function ActionButtonDemo() {
  const [saveLoading, setSaveLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection
        title="All Action Presets"
        code={`<Button action="create" />
<Button action="edit" />
<Button action="save" />
<Button action="delete" />
<Button action="cancel" />
<Button action="view" />
<Button action="export" />
<Button action="import" />
<Button action="archive" />
<Button action="duplicate" />
<Button action="print" />
<Button action="link" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button action="create" onClick={() => {}} />
          <Button action="edit" onClick={() => {}} />
          <Button action="save" onClick={() => {}} />
          <Button action="delete" onClick={() => {}} />
          <Button action="cancel" onClick={() => {}} />
          <Button action="view" onClick={() => {}} />
          <Button action="export" onClick={() => {}} />
          <Button action="import" onClick={() => {}} />
          <Button action="archive" onClick={() => {}} />
          <Button action="duplicate" onClick={() => {}} />
          <Button action="print" onClick={() => {}} />
          <Button action="link" onClick={() => {}} />
        </div>
      </DemoSection>

      <DemoSection
        title="Icon-Only Mode (for table rows)"
        code={`<Button action="view" size="icon-sm" />
<Button action="edit" size="icon-sm" />
<Button action="duplicate" size="icon-sm" />
<Button action="delete" size="icon-sm" />`}
      >
        <div className="flex items-center gap-1">
          <Button action="view" size="icon-sm" onClick={() => {}} />
          <Button action="edit" size="icon-sm" onClick={() => {}} />
          <Button action="duplicate" size="icon-sm" onClick={() => {}} />
          <Button action="delete" size="icon-sm" onClick={() => {}} />
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Labels"
        code={`<Button action="create">Add Employee</Button>
<Button action="save">Submit Form</Button>
<Button action="delete">Remove Record</Button>`}
      >
        <div className="flex items-center gap-3">
          <Button action="create" onClick={() => {}}>Add Employee</Button>
          <Button action="save" onClick={() => {}}>Submit Form</Button>
          <Button action="delete" onClick={() => {}}>Remove Record</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Loading States"
        code={`<Button action="save" loading={isSaving} />
<Button action="export" loading={isExporting} />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            action="save"
            loading={saveLoading}
            onClick={() => {
              setSaveLoading(true);
              setTimeout(() => setSaveLoading(false), 2000);
            }}
          />
          <Button
            action="export"
            loading={exportLoading}
            onClick={() => {
              setExportLoading(true);
              setTimeout(() => setExportLoading(false), 2000);
            }}
          />
          <span className="text-sm text-muted-foreground">
            Click to simulate 2s loading
          </span>
        </div>
      </DemoSection>

      <DemoSection
        title="Override Variant"
        code={`// action sets icon + label, but you can override the variant
<Button action="edit" variant="default" />
<Button action="cancel" variant="ghost" />
<Button action="delete" variant="outline" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button action="edit" variant="default" onClick={() => {}} />
          <Button action="cancel" variant="ghost" onClick={() => {}} />
          <Button action="delete" variant="outline" onClick={() => {}} />
        </div>
      </DemoSection>

      <DemoSection
        title="Icon Sizes"
        code={`<Button action="create" size="icon-sm" />
<Button action="create" size="icon" />
<Button action="create" size="icon-lg" />`}
      >
        <div className="flex flex-wrap items-end gap-3">
          <Button action="create" size="icon-sm" onClick={() => {}} />
          <Button action="create" size="icon" onClick={() => {}} />
          <Button action="create" size="icon-lg" onClick={() => {}} />
        </div>
      </DemoSection>

      <DemoSection title="HRMS Example: Table Row Actions">
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Department</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Doe", dept: "Engineering", status: "Active" },
                { name: "Jane Smith", dept: "Marketing", status: "Active" },
                { name: "Bob Wilson", dept: "Sales", status: "Inactive" },
              ].map((emp) => (
                <tr key={emp.name} className="border-b">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.dept}</td>
                  <td className="p-3">{emp.status}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button action="view" size="icon-sm" onClick={() => {}} />
                      <Button action="edit" size="icon-sm" onClick={() => {}} />
                      <Button action="duplicate" size="icon-sm" onClick={() => {}} />
                      <Button action="delete" size="icon-sm" onClick={() => {}} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoSection>

      <DemoSection title="HRMS Example: Page Header Actions">
        <div className="flex items-center justify-between rounded-md border p-4">
          <div>
            <h3 className="text-lg font-semibold">Edit Employee</h3>
            <p className="text-sm text-muted-foreground">
              Update employee information
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button action="cancel" onClick={() => {}} />
            <Button action="delete" onClick={() => {}} />
            <Button action="save" onClick={() => {}} />
          </div>
        </div>
      </DemoSection>
    </div>
  );
}

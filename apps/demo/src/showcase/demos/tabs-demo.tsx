import { User, Settings, CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DemoSection } from "@/showcase/component-page";

export default function TabsDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Default Variant" code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Account settings here.
  </TabsContent>
  <TabsContent value="password">
    Password settings here.
  </TabsContent>
</Tabs>`}>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Change your password and security settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Configure your application preferences.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection title="Line Variant">
        <Tabs defaultValue="profile" className="w-full max-w-md">
          <TabsList variant="line">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Edit your public profile information.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Choose what notifications you receive.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Manage your billing and subscription.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection title="With Icons">
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">
              <User />
              Account
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard />
              Billing
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Manage your account details.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                View and manage your billing information.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Adjust your application settings.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection title="Vertical Orientation">
        <Tabs
          defaultValue="general"
          orientation="vertical"
          className="w-full max-w-md"
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                General application configuration.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Security and access control settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="integrations">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Manage third-party integrations.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection title="Vertical Line Variant">
        <Tabs
          defaultValue="overview"
          orientation="vertical"
          className="w-full max-w-md"
        >
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                A high-level summary of your data.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Detailed analytics and metrics.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reports">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Generate and view reports.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection title="Disabled Tab">
        <Tabs defaultValue="active" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                This tab is active. The middle tab is disabled.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="other">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Another active tab.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DemoSection>
    </div>
  );
}

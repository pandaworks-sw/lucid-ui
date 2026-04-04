import { useState } from "react";
import { Building2, AlertCircle } from "lucide-react";
import { DemoSection } from "@/showcase/component-page";
import {
  DetailPage,
  DetailPageHeader,
  DetailPageMain,
  DetailPageContent,
  DetailPageSidebar,
  DetailPageMetaItem,
} from "@/components/ui/detail-page";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SelectableCard } from "@/components/ui/selectable-card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SplitButton } from "@/components/ui/split-button";

function OrganizationDetailDemo() {
  const [membership, setMembership] = useState("unlimited");

  return (
    <DetailPage>
      <DetailPageHeader
        backHref="#"
        backLabel="Organizations"
        icon={<Building2 className="size-6" />}
        title="Pandaworks"
        subtitle="0 members"
        actions={
          <>
            <Button variant="outline" size="sm">
              Show JSON
            </Button>
            <SplitButton size="sm">
              Actions
            </SplitButton>
          </>
        }
      />

      <Tabs defaultValue="settings">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <DetailPageMain className="mt-6">
          <DetailPageContent>
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Organization profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Profile content goes here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membership limit</CardTitle>
                  <CardDescription>
                    Edit Organization membership limit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={membership}
                    onValueChange={setMembership}
                    className="grid gap-3"
                  >
                    <SelectableCard value="unlimited">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Unlimited members</p>
                          <Badge variant="outline">Add-on</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Allow this organization to have an unlimited number of
                          members and pending invitations.
                        </p>
                      </div>
                    </SelectableCard>
                    <SelectableCard value="limited">
                      <div>
                        <p className="font-medium">Limited members</p>
                        <p className="text-sm text-muted-foreground">
                          Limit this organization to the following number of
                          members, including pending invitations.
                        </p>
                      </div>
                    </SelectableCard>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Roles</CardTitle>
                      <CardDescription>
                        Manage default roles for this organization
                      </CardDescription>
                    </div>
                    <Select defaultValue="default">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">
                          Default role set
                        </SelectItem>
                        <SelectItem value="custom">Custom role set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Permissions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div>
                            <p className="font-medium">Admin</p>
                            <p className="text-sm text-muted-foreground">
                              Role with elevated permissions in the
                              organization.
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell className="font-mono text-sm">
                          org:admin
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary">Manage domains</Badge>
                            <span className="text-sm text-muted-foreground">
                              +7 more
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Member</p>
                              <Badge variant="outline">Default role</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Role with non-privileged permissions in the
                              organization.
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell className="font-mono text-sm">
                          org:member
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary">Read members</Badge>
                            <span className="text-sm text-muted-foreground">
                              +1 more
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </DetailPageContent>

          <DetailPageSidebar>
            <DetailPageMetaItem
              label="Org ID"
              value="org_3APXw...9IHNe0EhU"
              copyable
            />
            <DetailPageMetaItem
              label="Slug"
              value="pandaworks"
              copyable
            />
            <DetailPageMetaItem
              label="Created by"
              value={
                <span className="flex items-center gap-1.5 text-destructive">
                  <AlertCircle className="size-3.5" />
                  Not assigned
                </span>
              }
            />
            <DetailPageMetaItem
              label="Max allowed memberships"
              value="Unlimited"
            />
            <DetailPageMetaItem label="Created" value="Mar 3, 2026" />
            <DetailPageMetaItem
              label="Organization updated"
              value="4m ago"
            />
          </DetailPageSidebar>
        </DetailPageMain>
      </Tabs>
    </DetailPage>
  );
}

export default function DetailPageDemo() {
  return (
    <>
      <DemoSection title="Organization detail page" code={`import {
  DetailPage, DetailPageHeader, DetailPageMain,
  DetailPageContent, DetailPageSidebar,
  DetailPageMetaItem,
} from "@/components/ui/detail-page"
import { Building2 } from "lucide-react"

<DetailPage>
  <DetailPageHeader
    backHref="/organizations"
    backLabel="Organizations"
    icon={<Building2 className="size-6" />}
    title="Pandaworks"
    subtitle="12 members"
    actions={<Button size="sm">Edit</Button>}
  />
  <DetailPageMain>
    <DetailPageContent>
      {/* Main content area */}
    </DetailPageContent>
    <DetailPageSidebar>
      <DetailPageMetaItem label="Created" value="Mar 3, 2026" />
      <DetailPageMetaItem label="ID" value="org_abc123" copyable />
    </DetailPageSidebar>
  </DetailPageMain>
</DetailPage>`}>
        <OrganizationDetailDemo />
      </DemoSection>

      <DemoSection title="Minimal (no sidebar)">
        <DetailPage>
          <DetailPageHeader
            backHref="#"
            backLabel="Back"
            title="Simple Detail"
            subtitle="A detail page without the metadata sidebar"
          />
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The sub-components are composable -- use only what you need.
              </p>
            </CardContent>
          </Card>
        </DetailPage>
      </DemoSection>
    </>
  );
}

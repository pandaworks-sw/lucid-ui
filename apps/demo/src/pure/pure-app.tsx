// PURE SHOWCASE — strict-purity SaaS demo built only from registry components.
//
// This is the diagnostic harness that proves (or fails to prove) the registry
// can express a real SaaS app without local custom UI. Where a screen forces
// a workaround, see docs/REGISTRY-GAPS.md.

import { forwardRef, useCallback, useState, type ReactNode } from 'react';
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings as SettingsIcon,
  User,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { AppShell } from '@/components/ui/app-shell';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/theme-toggle';
import { RouterProvider, useRouter } from '../saas/router';
import { StoreProvider, useStore } from '../saas/store';
import { ProjectFormModal } from '../saas/project-form-modal';
import { Dashboard } from './dashboard';
import { ProjectsList } from './projects-list';
import { ProjectDetail } from './project-detail';
import { Team } from './team';
import { Reports } from './reports';
import { Settings } from './settings';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const ShellLink = forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, className, ...rest }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      window.location.hash = href;
    }
  };

  return (
    <a ref={ref} href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});
ShellLink.displayName = 'ShellLink';

function PageRenderer() {
  const { route } = useRouter();
  switch (route.name) {
    case 'dashboard':
      return <Dashboard />;
    case 'projects':
      return <ProjectsList />;
    case 'project':
      return <ProjectDetail projectId={route.id} />;
    case 'team':
      return <Team />;
    case 'reports':
      return <Reports />;
    case 'settings':
      return <Settings />;
  }
}

function PureShell() {
  const { route, navigate } = useRouter();
  const { addProject } = useStore();
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateProject = useCallback(() => setCreateOpen(true), []);

  return (
    <>
      <AppShell
        branding={{ name: 'Pandawork · Pure', href: '#/dashboard' }}
        navigation={[
          {
            label: 'Workspace',
            href: '#/dashboard',
            icon: LayoutDashboard,
            active: route.name === 'dashboard',
          },
          {
            label: 'Projects',
            href: '#/projects',
            icon: FolderKanban,
            active: route.name === 'projects' || route.name === 'project',
          },
          {
            label: 'Team',
            href: '#/team',
            icon: Users,
            active: route.name === 'team',
          },
          {
            label: 'Reports',
            href: '#/reports',
            icon: BarChart3,
            active: route.name === 'reports',
          },
          { type: 'separator' },
          {
            label: 'Settings',
            href: '#/settings',
            icon: SettingsIcon,
            active: route.name === 'settings',
          },
        ]}
        user={{
          name: 'Ahmad Razif',
          email: 'ahmad.razif@pandaworks.com',
          actions: [
            { label: 'Profile', href: '#/settings?tab=profile', icon: User },
            { label: 'Settings', href: '#/settings', icon: SettingsIcon },
            {
              label: 'Sign out',
              onClick: () => toast('Signed out (demo)'),
              icon: LogOut,
              variant: 'destructive',
            },
          ],
        }}
        header={
          <div className="flex w-full items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Pure showcase — registry-only</span>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="brand" onClick={handleCreateProject}>
                <Plus className="size-4" />
                New project
              </Button>
              <ThemeToggle />
            </div>
          </div>
        }
        linkComponent={ShellLink}
        maxWidth={1400}
        contentClassName="p-4 md:p-6 lg:p-8"
      >
        <PageRenderer />
      </AppShell>

      <ProjectFormModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={(input) => {
          const created = addProject(input);
          toast.success('Project created', {
            description: `${created.name} · ${created.key}`,
            action: {
              label: 'Open',
              onClick: () => navigate({ name: 'project', id: created.id }),
            },
          });
        }}
      />
    </>
  );
}

export default function PureApp() {
  return (
    <TooltipProvider>
      <StoreProvider>
        <RouterProvider>
          <PureShell />
          <Toaster position="bottom-right" richColors closeButton />
        </RouterProvider>
      </StoreProvider>
    </TooltipProvider>
  );
}

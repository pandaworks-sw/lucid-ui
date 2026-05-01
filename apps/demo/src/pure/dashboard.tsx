// PURE Dashboard — see pure-shared.tsx header for rules.

import { useMemo } from 'react';
import { CheckCircle2, ClipboardList, Clock, FolderKanban, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeLabel } from '@/components/ui/code-label';
import { ListRow } from '@/components/ui/list-row';
import { MeterRow } from '@/components/ui/meter-row';
import { PageHeader } from '@/components/ui/page-header';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { StatCard } from '@/components/ui/stat-card';
import { useStore } from '../saas/store';
import { useRouter } from '../saas/router';
import { MemberAvatar, MemberStack, PriorityBadge, StatusBadge, formatDate, relativeTime } from './pure-shared';
import type { Project } from '../saas/types';

function DepartmentChart({ projects, memberLookup }: { projects: Project[]; memberLookup: Record<string, string> }) {
  const totals = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      for (const mid of p.memberIds) {
        const dept = memberLookup[mid];
        if (!dept) continue;
        map.set(dept, (map.get(dept) ?? 0) + 1);
      }
    }
    const arr = Array.from(map.entries()).map(([dept, count]) => ({ dept, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr;
  }, [projects, memberLookup]);

  const max = Math.max(...totals.map((t) => t.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Team allocation</CardTitle>
        <CardDescription>Seats by department across active projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {totals.map(({ dept, count }) => (
          <MeterRow
            key={dept}
            label={<span className="font-medium">{dept}</span>}
            value={count}
            max={max}
            valueLabel={count}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const { projects, tasks, members, activity } = useStore();
  const { navigate } = useRouter();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const tasksDue = tasks.filter((t) => t.status !== 'done').length;
  const tasksDone = tasks.filter((t) => t.status === 'done').length;
  const completion = tasks.length > 0 ? Math.round((tasksDone / tasks.length) * 100) : 0;

  const memberLookup = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m.department])), [members]);
  const memberById = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members]);

  const spotlight = [...activeProjects].sort((a, b) => b.progress - a.progress).slice(0, 4);

  const upcoming = [...tasks]
    .filter((t) => t.status !== 'done')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspace"
        description="Snapshot of projects, tasks, and team activity across Pandawork."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate({ name: 'reports' })}>
              View reports
            </Button>
            <Button variant="brand" onClick={() => navigate({ name: 'projects' })}>
              Browse projects
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FolderKanban}
          label="Active projects"
          value={activeProjects.length}
          hint={`of ${projects.length} total`}
          delta="+2 QoQ"
          deltaTone="up"
        />
        <StatCard
          icon={ClipboardList}
          label="Open tasks"
          value={tasksDue}
          hint="across all projects"
          delta="+11%"
          deltaTone="down"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completion rate"
          value={completion}
          suffix="%"
          hint="of all tasks shipped"
          delta="+4 pts"
          deltaTone="up"
        />
        <StatCard
          icon={Users}
          label="People"
          value={members.length}
          hint="across 5 departments"
          delta="+1"
          deltaTone="up"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Spotlight projects</CardTitle>
              <CardDescription>Biggest bets currently in flight.</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => navigate({ name: 'projects' })}>
              See all
            </Button>
          </CardHeader>
          <CardContent className="space-y-0">
            {spotlight.map((project, idx) => {
              const owner = memberById[project.ownerId];
              const teamMembers = project.memberIds.map((id) => memberById[id]).filter(Boolean);
              const openTasks = tasks.filter((t) => t.projectId === project.id && t.status !== 'done').length;
              return (
                <div key={project.id}>
                  {idx > 0 && <Separator className="my-4" />}
                  {/* Wrapper is a div (not button) because CodeLabel renders */}
                  {/* an internal copy button — nested buttons are invalid HTML. */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate({ name: 'project', id: project.id })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate({ name: 'project', id: project.id });
                      }
                    }}
                    className="group flex w-full cursor-pointer flex-col gap-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <CodeLabel value={project.key} size="sm" />
                          <h4 className="truncate text-sm font-semibold group-hover:text-primary">{project.name}</h4>
                        </div>
                        <p className="line-clamp-1 text-xs text-muted-foreground">{project.description}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <StatusBadge status={project.status} />
                        <PriorityBadge priority={project.priority} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="tabular-nums">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      <div className="hidden sm:flex shrink-0 items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Owner</p>
                          <p className="text-xs font-medium">{owner?.name ?? '—'}</p>
                        </div>
                        <MemberStack members={teamMembers} size="xs" max={3} />
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Open</p>
                          <p className="text-xs font-medium tabular-nums">{openTasks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <DepartmentChart projects={projects} memberLookup={memberLookup} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Upcoming deadlines</CardTitle>
              <CardDescription>Tasks due soonest, across all projects.</CardDescription>
            </div>
            <Badge variant="secondary">
              <Clock className="size-3" />
              {upcoming.length}
            </Badge>
          </CardHeader>
          <CardContent className="divide-y">
            {upcoming.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              const assignee = task.assigneeId ? memberById[task.assigneeId] : undefined;
              return (
                <ListRow
                  key={task.id}
                  asButton
                  onClick={() => project && navigate({ name: 'project', id: project.id, tab: 'tasks' })}
                  leading={<MemberAvatar member={assignee} size="sm" />}
                  title={task.title}
                  subtitle={`${project?.key ?? ''} · ${project?.name ?? ''}`}
                  trailing={
                    <div className="text-right">
                      <p className="text-xs font-medium">{formatDate(task.dueDate)}</p>
                      <PriorityBadge priority={task.priority} />
                    </div>
                  }
                />
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
            <CardDescription>What the team shipped, updated, and flagged lately.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            {activity.slice(0, 6).map((entry) => {
              const actor = memberById[entry.actorId];
              return (
                <ListRow
                  key={entry.id}
                  density="sm"
                  leading={<MemberAvatar member={actor} size="sm" />}
                  title={
                    <span className="leading-snug">
                      <span className="font-medium">{actor?.name ?? 'Someone'}</span>{' '}
                      <span className="font-normal text-muted-foreground">{entry.verb}</span>{' '}
                      <span className="font-medium">{entry.object}</span>
                    </span>
                  }
                  subtitle={relativeTime(entry.at)}
                />
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

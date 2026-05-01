// PURE Reports — see pure-shared.tsx header for rules.

import { useMemo, useState } from 'react';
import { BarChart3, Download, PieChart, Target, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeLabel } from '@/components/ui/code-label';
import { MeterRow } from '@/components/ui/meter-row';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useStore } from '../saas/store';
import { PriorityBadge, StatusBadge, TaskStatusBadge, formatCurrency } from './pure-shared';
import type { Priority, ProjectStatus, TaskStatus } from '../saas/types';

const PRIORITY_ORDER: Priority[] = ['urgent', 'high', 'medium', 'low'];
const STATUS_ORDER: ProjectStatus[] = ['planning', 'active', 'on-hold', 'completed'];

const STATUS_TONE: Record<ProjectStatus, 'success' | 'warning' | 'info' | 'muted'> = {
  active: 'success',
  planning: 'info',
  'on-hold': 'warning',
  completed: 'muted',
};

const PRIORITY_TONE: Record<Priority, 'destructive' | 'warning' | 'info' | 'muted'> = {
  urgent: 'destructive',
  high: 'warning',
  medium: 'info',
  low: 'muted',
};

export function Reports() {
  const { projects, tasks, members } = useStore();
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('quarter');

  const projectByStatus = useMemo(() => {
    const map = new Map<ProjectStatus, number>();
    for (const p of projects) map.set(p.status, (map.get(p.status) ?? 0) + 1);
    return map;
  }, [projects]);

  const taskByStatus = useMemo(() => {
    const map = new Map<TaskStatus, number>();
    for (const t of tasks) map.set(t.status, (map.get(t.status) ?? 0) + 1);
    return map;
  }, [tasks]);

  const priorityDist = useMemo(() => {
    const map = new Map<Priority, number>();
    for (const p of projects) map.set(p.priority, (map.get(p.priority) ?? 0) + 1);
    return PRIORITY_ORDER.map((p) => ({ priority: p, count: map.get(p) ?? 0 }));
  }, [projects]);

  const budgetByOwner = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) map.set(p.ownerId, (map.get(p.ownerId) ?? 0) + p.budget);
    return Array.from(map.entries())
      .map(([id, total]) => ({ owner: members.find((m) => m.id === id), total }))
      .sort((a, b) => b.total - a.total);
  }, [projects, members]);

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const activeBudget = projects.filter((p) => p.status === 'active').reduce((sum, p) => sum + p.budget, 0);
  const avgProgress =
    projects.length === 0 ? 0 : Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
  const statusMax = Math.max(...Array.from(projectByStatus.values()), 1);
  const projectMax = Math.max(projects.length, 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Cross-cutting analytics across projects, people, and dollars."
        actions={
          <>
            <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="quarter">Quarter</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" onClick={() => toast('Export queued')}>
              <Download className="size-4" />
              Export
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total committed budget"
          value={totalBudget}
          formatter={formatCurrency}
          hint={`vs last ${period}`}
          delta="+12%"
          deltaTone="up"
        />
        <StatCard
          label="Budget in active projects"
          value={activeBudget}
          formatter={formatCurrency}
          hint={`${Math.round((activeBudget / (totalBudget || 1)) * 100)}% of the portfolio`}
        />
        <StatCard label="Average progress" value={avgProgress} suffix="%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Projects by status</CardTitle>
                <CardDescription>Where each project sits right now.</CardDescription>
              </div>
              <BarChart3 className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {STATUS_ORDER.map((status) => {
              const count = projectByStatus.get(status) ?? 0;
              return (
                <MeterRow
                  key={status}
                  label={<StatusBadge status={status} />}
                  value={count}
                  max={statusMax}
                  valueLabel={count}
                  tone={STATUS_TONE[status]}
                />
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Task workload</CardTitle>
                <CardDescription>Tasks grouped by current status.</CardDescription>
              </div>
              <PieChart className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {(['todo', 'in-progress', 'review', 'done'] as TaskStatus[]).map((status) => {
                const count = taskByStatus.get(status) ?? 0;
                return (
                  <div key={status} className="rounded-md border p-3">
                    <TaskStatusBadge status={status} />
                    <p className="mt-1 text-2xl font-semibold tabular-nums">{count}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Priority distribution</CardTitle>
                <CardDescription>How urgent the portfolio skews right now.</CardDescription>
              </div>
              <Target className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityDist.map(({ priority, count }) => (
              <MeterRow
                key={priority}
                label={<PriorityBadge priority={priority} />}
                value={count}
                max={projectMax}
                valueLabel={count}
                tone={PRIORITY_TONE[priority]}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Budget by owner</CardTitle>
                <CardDescription>Where the money sits across project leaders.</CardDescription>
              </div>
              <TrendingDown className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead className="text-right">Total budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetByOwner.map(({ owner, total }) => {
                  const owned = projects.filter((p) => p.ownerId === owner?.id);
                  return (
                    <TableRow key={owner?.id ?? 'unknown'}>
                      <TableCell>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{owner?.name ?? 'Unassigned'}</p>
                          <p className="truncate text-xs text-muted-foreground">{owner?.role}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {owned.slice(0, 3).map((p) => (
                            <CodeLabel key={p.id} value={p.key} size="sm" copyable={false} />
                          ))}
                          {owned.length > 3 && (
                            <span className="text-xs text-muted-foreground">+{owned.length - 3}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm tabular-nums">{formatCurrency(total)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

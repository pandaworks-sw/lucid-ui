// PURE Project detail — see pure-shared.tsx header for rules.

import { useMemo, useState } from 'react';
import {
  Activity,
  Calendar as CalendarIcon,
  CheckCircle2,
  ClipboardList,
  Flag,
  FolderKanban,
  Link as LinkIcon,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeLabel } from '@/components/ui/code-label';
import {
  DetailPage,
  DetailPageContent,
  DetailPageHeader,
  DetailPageMain,
  DetailPageMetaItem,
  DetailPageSidebar,
  DetailPageSidebarSection,
} from '@/components/ui/detail-page';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/components/ui/empty-state';
import { ExpandableText } from '@/components/ui/expandable-text';
import { ListRow } from '@/components/ui/list-row';
import { Separator } from '@/components/ui/separator';
import { StatCard } from '@/components/ui/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { useStore } from '../saas/store';
import { useRouter } from '../saas/router';
import {
  MemberAvatar,
  MemberStack,
  PriorityBadge,
  StatusBadge,
  TaskStatusBadge,
  formatCurrency,
  formatDate,
  relativeTime,
} from './pure-shared';
import type { Task, TaskStatus } from '../saas/types';
import { ProjectFormModal } from '../saas/project-form-modal';
import { TaskFormModal } from '../saas/task-form-modal';
import { ConfirmDialog } from '../saas/confirm-dialog';

const TAB_VALUES = ['overview', 'tasks', 'team', 'activity'] as const;
type TabValue = (typeof TAB_VALUES)[number];
const TASK_STATUS_ORDER: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];

export function ProjectDetail({ projectId }: { projectId: string }) {
  const { projects, tasks, members, activity, updateProject, deleteProject, addTask, updateTask, deleteTask } =
    useStore();
  const { route, navigate } = useRouter();
  const project = projects.find((p) => p.id === projectId);

  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
  const [taskModal, setTaskModal] = useState<{ open: boolean; task?: Task }>({ open: false });
  const [confirmTaskDelete, setConfirmTaskDelete] = useState<Task | null>(null);

  const tab: TabValue = useMemo(() => {
    const active = route.name === 'project' ? route.tab : undefined;
    return TAB_VALUES.includes(active as TabValue) ? (active as TabValue) : 'overview';
  }, [route]);

  const memberById = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members]);

  if (!project) {
    return (
      <EmptyState
        icon={<FolderKanban />}
        title="Project not found."
        action={
          <Button variant="outline" onClick={() => navigate({ name: 'projects' })}>
            Back to projects
          </Button>
        }
      />
    );
  }

  const owner = memberById[project.ownerId];
  const team = project.memberIds.map((id) => memberById[id]).filter(Boolean);
  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const projectActivity = activity.filter((a) => a.projectId === project.id);

  const openTasks = projectTasks.filter((t) => t.status !== 'done').length;
  const doneTasks = projectTasks.filter((t) => t.status === 'done').length;
  const overdue = projectTasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < new Date()).length;

  function handleTabChange(next: string) {
    navigate({ name: 'project', id: project!.id, tab: next });
  }
  function handleTaskSubmit(input: Omit<Task, 'id' | 'createdAt'>) {
    if (taskModal.task) {
      updateTask(taskModal.task.id, input);
      toast.success('Task updated');
    } else {
      addTask(input);
      toast.success('Task added');
    }
  }
  function handleTaskStatusChange(task: Task, status: TaskStatus) {
    updateTask(task.id, { status });
    toast.message(`Moved to ${status.replace('-', ' ')}`);
  }
  function handleProjectDelete() {
    const name = project!.name;
    deleteProject(project!.id);
    toast.success(`${name} deleted`);
    navigate({ name: 'projects' });
  }

  return (
    <DetailPage>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#/dashboard">Workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailPageHeader
        icon={<FolderKanban className="size-5" />}
        title={project.name}
        subtitle={`${project.key} · Started ${formatDate(project.startDate)} · Due ${formatDate(project.dueDate)}`}
        actions={
          <>
            <Button variant="outline" onClick={() => toast('Link copied')}>
              <LinkIcon className="size-3.5" />
              Share
            </Button>
            <Button variant="outline" action="edit" onClick={() => setEditOpen(true)} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    updateProject(project.id, {
                      status: project.status === 'completed' ? 'active' : 'completed',
                    })
                  }
                >
                  <CheckCircle2 className="size-4" />
                  {project.status === 'completed' ? 'Reopen project' : 'Mark as completed'}
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={() => setConfirmDeleteProject(true)}>
                  <Trash2 className="size-4" />
                  Delete project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
        <CodeLabel value={project.key} size="sm" />
      </div>

      <DetailPageMain>
        <DetailPageContent>
          <Tabs value={tab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="overview" className="gap-1.5">
                <FolderKanban className="size-3.5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tasks" className="gap-1.5">
                <ClipboardList className="size-3.5" />
                Tasks
                <Badge variant="muted">{projectTasks.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-1.5">
                <Users className="size-3.5" />
                Team
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-1.5">
                <Activity className="size-3.5" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">About this project</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExpandableText visibleLines={3}>{project.description}</ExpandableText>
                </CardContent>
              </Card>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  icon={Flag}
                  label="Progress"
                  value={project.progress}
                  suffix="%"
                  hint={`${doneTasks}/${projectTasks.length} tasks done`}
                />
                <StatCard
                  icon={ClipboardList}
                  label="Open / total tasks"
                  value={openTasks}
                  suffix={` / ${projectTasks.length}`}
                  hint={`${doneTasks} shipped · ${overdue} overdue`}
                />
                <StatCard
                  icon={CalendarIcon}
                  label="Budget"
                  value={project.budget}
                  formatter={formatCurrency}
                  hint={`Due ${formatDate(project.dueDate)}`}
                />
              </div>

              <TasksBreakdown tasks={projectTasks} />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Tasks</CardTitle>
                    <CardDescription>
                      {projectTasks.length} items · {openTasks} open
                    </CardDescription>
                  </div>
                  <Button variant="brand" onClick={() => setTaskModal({ open: true })}>
                    <Plus className="size-4" />
                    Add task
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  {projectTasks.length === 0 ? (
                    <EmptyState
                      icon={<ClipboardList />}
                      title="No tasks yet."
                      description="Add the first one and start tracking."
                      action={
                        <Button variant="brand" onClick={() => setTaskModal({ open: true })}>
                          <Plus className="size-4" />
                          Add task
                        </Button>
                      }
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Assignee</TableHead>
                          <TableHead>Due</TableHead>
                          <TableHead className="text-right">Est.</TableHead>
                          <TableHead className="w-12" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectTasks.map((task) => {
                          const assignee = task.assigneeId ? memberById[task.assigneeId] : undefined;
                          const overdueTask = task.status !== 'done' && new Date(task.dueDate) < new Date();
                          return (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">{task.title}</p>
                                  {task.description && (
                                    <p className="truncate text-xs text-muted-foreground">{task.description}</p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button type="button" aria-label="Change status">
                                      <TaskStatusBadge status={task.status} />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                    {TASK_STATUS_ORDER.map((status) => (
                                      <DropdownMenuItem
                                        key={status}
                                        onClick={() => handleTaskStatusChange(task, status)}
                                      >
                                        <TaskStatusBadge status={status} />
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                              <TableCell>
                                <PriorityBadge priority={task.priority} />
                              </TableCell>
                              <TableCell>
                                {assignee ? (
                                  <div className="flex items-center gap-2">
                                    <MemberAvatar member={assignee} size="xs" />
                                    <span className="text-sm">{assignee.name}</span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-muted-foreground">Unassigned</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <span className={cn('text-sm', overdueTask && 'text-destructive font-medium')}>
                                  {formatDate(task.dueDate)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right text-sm tabular-nums">{task.estimatedHours}h</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-sm">
                                      <MoreHorizontal className="size-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTaskModal({ open: true, task })}>
                                      <Pencil className="size-4" />
                                      Edit task
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive" onClick={() => setConfirmTaskDelete(task)}>
                                      <Trash2 className="size-4" />
                                      Delete task
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Team</CardTitle>
                  <CardDescription>{team.length} members assigned to this project.</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                  {team.map((member) => (
                    <ListRow
                      key={member.id}
                      leading={<MemberAvatar member={member} size="md" />}
                      title={member.name}
                      subtitle={`${member.role} · ${member.department}`}
                      trailing={
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {member.timezone.split('/')[1]?.replace('_', ' ')}
                          </p>
                          <p className="text-xs font-medium">{member.email}</p>
                        </div>
                      }
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project activity</CardTitle>
                  <CardDescription>Everything that happened on this project.</CardDescription>
                </CardHeader>
                <CardContent>
                  {projectActivity.length === 0 ? (
                    <EmptyState
                      size="sm"
                      title="No activity yet."
                      description="Start creating tasks and it'll show up here."
                    />
                  ) : (
                    <div className="divide-y">
                      {projectActivity.map((entry) => {
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DetailPageContent>

        <DetailPageSidebar>
          <DetailPageMetaItem label="Key" value={project.key} copyable />
          <DetailPageMetaItem label="Status" value={<StatusBadge status={project.status} />} />
          <DetailPageMetaItem label="Priority" value={<PriorityBadge priority={project.priority} />} />
          <DetailPageMetaItem
            label="Owner"
            value={
              owner ? (
                <span className="inline-flex items-center gap-2">
                  <MemberAvatar member={owner} size="xs" />
                  {owner.name}
                </span>
              ) : (
                'Unassigned'
              )
            }
          />
          <DetailPageMetaItem label="Start" value={formatDate(project.startDate)} />
          <DetailPageMetaItem label="Due" value={formatDate(project.dueDate)} />
          <DetailPageMetaItem label="Budget" value={formatCurrency(project.budget)} />

          <DetailPageSidebarSection
            label="Team"
            action={
              <button
                type="button"
                onClick={() => handleTabChange('team')}
                className="text-xs text-primary hover:underline"
              >
                View all
              </button>
            }
          >
            <div className="mt-2 flex items-center gap-2">
              <MemberStack members={team} size="xs" max={5} />
              <span className="text-xs">{team.length} members</span>
            </div>
          </DetailPageSidebarSection>

          <DetailPageSidebarSection label="Tags">
            <div className="mt-1 flex flex-wrap gap-1">
              {project.tags.length === 0 ? (
                <span className="text-xs text-muted-foreground">None</span>
              ) : (
                project.tags.map((tag) => (
                  <Badge key={tag} variant="muted">
                    {tag}
                  </Badge>
                ))
              )}
            </div>
          </DetailPageSidebarSection>
        </DetailPageSidebar>
      </DetailPageMain>

      <ProjectFormModal
        open={editOpen}
        onOpenChange={setEditOpen}
        project={project}
        onSubmit={(input) => {
          updateProject(project.id, input);
          toast.success('Project updated');
        }}
      />

      <TaskFormModal
        open={taskModal.open}
        onOpenChange={(open) => setTaskModal({ open, task: open ? taskModal.task : undefined })}
        projectId={project.id}
        task={taskModal.task}
        onSubmit={handleTaskSubmit}
      />

      <ConfirmDialog
        open={confirmDeleteProject}
        onOpenChange={setConfirmDeleteProject}
        title={`Delete "${project.name}"?`}
        description="This permanently removes the project and all of its tasks."
        confirmLabel="Delete project"
        onConfirm={handleProjectDelete}
      />
      <ConfirmDialog
        open={!!confirmTaskDelete}
        onOpenChange={(o) => !o && setConfirmTaskDelete(null)}
        title={`Delete "${confirmTaskDelete?.title}"?`}
        description="This removes the task from this project."
        confirmLabel="Delete task"
        onConfirm={() => {
          if (confirmTaskDelete) {
            deleteTask(confirmTaskDelete.id);
            toast.success('Task deleted');
            setConfirmTaskDelete(null);
          }
        }}
      />
    </DetailPage>
  );
}

function TasksBreakdown({ tasks }: { tasks: Task[] }) {
  const buckets = useMemo(() => {
    const result: Record<TaskStatus, Task[]> = {
      todo: [],
      'in-progress': [],
      review: [],
      done: [],
    };
    for (const t of tasks) result[t.status].push(t);
    return result;
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">By status</CardTitle>
        <CardDescription>How the workload is distributed across the board.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-4">
        {TASK_STATUS_ORDER.map((status) => (
          <div key={status} className="rounded-md border p-3">
            <TaskStatusBadge status={status} />
            <p className="mt-2 text-2xl font-semibold tabular-nums">{buckets[status].length}</p>
            <p className="text-xs text-muted-foreground">{buckets[status].length === 1 ? 'task' : 'tasks'}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

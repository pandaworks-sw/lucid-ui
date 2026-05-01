// PURE SHOWCASE — registry-only helpers.
//
// Rules (see CLAUDE.md "Showcase Purity Rules"):
//   - No custom UI components. Every visual element comes from @/components/ui/*.
//   - No hardcoded Tailwind palette colors.
//   - No inline style overrides on registry components.
//   - Layout-only wrappers (e.g. mapping a domain enum to a registry variant)
//     are allowed; new visual styling is not.

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Badge } from "@/components/ui/badge";
import type { Member, Priority, ProjectStatus, TaskStatus } from "../saas/types";

// -----------------------------------------------------------------------------
// Formatters (data layer — same as saas)
// -----------------------------------------------------------------------------

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatDate(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" });
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.round((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(iso);
}

// -----------------------------------------------------------------------------
// Status / priority badges — domain enum → Badge variant
// -----------------------------------------------------------------------------

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted";

const PROJECT_STATUS_VARIANT: Record<ProjectStatus, BadgeVariant> = {
  active: "success",
  planning: "info",
  "on-hold": "warning",
  completed: "muted",
};

const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Active",
  planning: "Planning",
  "on-hold": "On Hold",
  completed: "Completed",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant={PROJECT_STATUS_VARIANT[status]} dot>
      {PROJECT_STATUS_LABEL[status]}
    </Badge>
  );
}

const TASK_STATUS_VARIANT: Record<TaskStatus, BadgeVariant> = {
  todo: "muted",
  "in-progress": "info",
  review: "warning",
  done: "success",
};

const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  review: "In Review",
  done: "Done",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge variant={TASK_STATUS_VARIANT[status]} dot>
      {TASK_STATUS_LABEL[status]}
    </Badge>
  );
}

const PRIORITY_VARIANT: Record<Priority, BadgeVariant> = {
  urgent: "destructive",
  high: "warning",
  medium: "info",
  low: "muted",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant={PRIORITY_VARIANT[priority]}>{PRIORITY_LABEL[priority]}</Badge>
  );
}

// -----------------------------------------------------------------------------
// Avatars
// -----------------------------------------------------------------------------

const AVATAR_SIZES = {
  xs: "size-5 text-xs",
  sm: "size-7 text-xs",
  md: "size-9 text-sm",
  lg: "size-14 text-base",
} as const;

type AvatarSize = keyof typeof AVATAR_SIZES;

export function MemberAvatar({
  member,
  size = "sm",
  className,
}: {
  member?: Member;
  size?: AvatarSize;
  className?: string;
}) {
  return (
    <Avatar className={[AVATAR_SIZES[size], className].filter(Boolean).join(" ")}>
      {member ? (
        <AvatarFallback colorize>{initials(member.name)}</AvatarFallback>
      ) : (
        <AvatarFallback>?</AvatarFallback>
      )}
    </Avatar>
  );
}

export function MemberStack({
  members,
  max = 4,
  size = "sm",
}: {
  members: Member[];
  max?: number;
  size?: AvatarSize;
}) {
  // AvatarGroup handles the +N overflow tile and ring spacing — pure-showcase
  // just provides the data → Avatar mapping.
  return (
    <AvatarGroup size={size} max={max}>
      {members.map((m) => (
        <Avatar key={m.id}>
          <AvatarFallback colorize>{initials(m.name)}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}

export function ProjectTile({
  member,
  label,
  size = "md",
}: {
  member?: Member;
  label: string;
  size?: AvatarSize;
}) {
  return (
    <Avatar shape="square" className={AVATAR_SIZES[size]}>
      <AvatarFallback colorize>{member ? label : "??"}</AvatarFallback>
    </Avatar>
  );
}

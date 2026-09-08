import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div data-slot="page-header" className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-balance break-words">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex max-w-full flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
    </div>
  );
}

export { PageHeader };
export type { PageHeaderProps };

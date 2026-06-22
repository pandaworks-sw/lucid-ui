import { createContext, forwardRef, useContext, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

/* ---------------------------------- Root ---------------------------------- */

const DetailPage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div data-slot="detail-page" ref={ref} className={cn('space-y-6', className)} {...props} />
));
DetailPage.displayName = 'DetailPage';

/* --------------------------------- Header --------------------------------- */

interface DetailPageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  backHref?: string;
  backLabel?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

const DetailPageHeader = forwardRef<HTMLDivElement, DetailPageHeaderProps>(
  ({ className, backHref, backLabel, icon, title, subtitle, actions, ...props }, ref) => (
    <div data-slot="detail-page-header" ref={ref} className={cn('space-y-3', className)} {...props}>
      {backHref && (
        <a
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </a>
      )}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground dark:bg-muted/20">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  )
);
DetailPageHeader.displayName = 'DetailPageHeader';

/* ---------------------------------- Main ---------------------------------- */

const DetailPageMain = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    data-slot="detail-page-main"
    ref={ref}
    className={cn('grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]', className)}
    {...props}
  />
));
DetailPageMain.displayName = 'DetailPageMain';

/* -------------------------------- Content --------------------------------- */

const DetailPageContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div data-slot="detail-page-content" ref={ref} className={cn('min-w-0 space-y-6', className)} {...props} />
));
DetailPageContent.displayName = 'DetailPageContent';

/* -------------------------------- Section --------------------------------- */

interface DetailPageSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}

const DetailPageSection = forwardRef<HTMLDivElement, DetailPageSectionProps>(
  ({ className, title, description, action, children, ...props }, ref) => (
    <section data-slot="detail-page-section" ref={ref} className={cn('space-y-4', className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          {/* Inter, not font-display: this is a section title inside a non-PageHeader component (heading-font policy). */}
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  )
);
DetailPageSection.displayName = 'DetailPageSection';

/* -------------------------------- Sidebar --------------------------------- */

const DetailPageSidebar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <aside
    data-slot="detail-page-sidebar"
    ref={ref}
    className={cn('space-y-0 lg:sticky lg:top-6 lg:self-start', className)}
    {...props}
  />
));
DetailPageSidebar.displayName = 'DetailPageSidebar';

/* -------------------------------- Meta Bar -------------------------------- */

/**
 * Layout context for meta items. The sidebar lays them out vertically with
 * dividers; the bar lays them out as a horizontal, wrapping strip with no
 * dividers (spacing comes from the bar's flex gap). The same
 * `DetailPageMetaItem` renders correctly in either container.
 */
const MetaLayoutContext = createContext<'sidebar' | 'bar'>('sidebar');

const DetailPageMetaBar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <MetaLayoutContext.Provider value="bar">
      <div
        data-slot="detail-page-meta-bar"
        ref={ref}
        className={cn('flex flex-wrap gap-x-10 gap-y-4', className)}
        {...props}
      >
        {children}
      </div>
    </MetaLayoutContext.Provider>
  )
);
DetailPageMetaBar.displayName = 'DetailPageMetaBar';

/* ------------------------------ Meta Item --------------------------------- */

interface DetailPageMetaItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  copyable?: boolean;
  onCopyValue?: (text: string) => void | Promise<void>;
}

function CopyButton({ value, onCopyValue }: { value: string; onCopyValue?: (text: string) => void | Promise<void> }) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = async (e: MouseEvent) => {
    e.stopPropagation();
    await copy(value, onCopyValue);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all hover:scale-110 hover:text-brand active:scale-95"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}

const DetailPageMetaItem = forwardRef<HTMLDivElement, DetailPageMetaItemProps>(
  ({ className, label, value, copyable, onCopyValue, ...props }, ref) => {
    const layout = useContext(MetaLayoutContext);
    return (
      <div
        data-slot="detail-page-meta-item"
        ref={ref}
        className={cn(layout === 'bar' ? 'min-w-0' : 'border-b py-3 first:pt-0 last:border-b-0', className)}
        {...props}
      >
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="min-w-0 truncate text-sm">{value}</span>
          {copyable && typeof value === 'string' && <CopyButton value={value} onCopyValue={onCopyValue} />}
        </div>
      </div>
    );
  }
);
DetailPageMetaItem.displayName = 'DetailPageMetaItem';

/* ----------------------------- Sidebar Section ----------------------------- */

interface DetailPageSidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  action?: ReactNode;
}

const DetailPageSidebarSection = forwardRef<HTMLDivElement, DetailPageSidebarSectionProps>(
  ({ className, label, action, children, ...props }, ref) => (
    <div
      data-slot="detail-page-sidebar-section"
      ref={ref}
      className={cn('border-b py-4 first:pt-0 last:border-b-0', className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs text-muted-foreground">{label}</h3>
        {action && <div className="shrink-0 text-muted-foreground">{action}</div>}
      </div>
      {children && <div className="mt-1.5 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
);
DetailPageSidebarSection.displayName = 'DetailPageSidebarSection';

/* ------------------------------ Sidebar Group ----------------------------- */

interface DetailPageSidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

const DetailPageSidebarGroup = forwardRef<HTMLDivElement, DetailPageSidebarGroupProps>(
  ({ className, label, children, ...props }, ref) => (
    <div data-slot="detail-page-sidebar-group" ref={ref} className={cn('pt-5 first:pt-0', className)} {...props}>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</h3>
      <div>{children}</div>
    </div>
  )
);
DetailPageSidebarGroup.displayName = 'DetailPageSidebarGroup';

/* -------------------------------- Exports --------------------------------- */

export {
  DetailPage,
  DetailPageHeader,
  DetailPageMain,
  DetailPageContent,
  DetailPageSection,
  DetailPageSidebar,
  DetailPageMetaBar,
  DetailPageMetaItem,
  DetailPageSidebarSection,
  DetailPageSidebarGroup,
};
export type {
  DetailPageHeaderProps,
  DetailPageSectionProps,
  DetailPageMetaItemProps,
  DetailPageSidebarSectionProps,
  DetailPageSidebarGroupProps,
};

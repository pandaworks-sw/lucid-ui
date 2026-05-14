import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { Moon, Sun, Monitor, type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type ThemeMode = 'light' | 'dark' | 'system';

const DEFAULT_STORAGE_KEY = 'lucid-theme';

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: LucideIcon }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

function readStoredMode(storageKey: string): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(storageKey);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

function resolveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', resolveMode(mode) === 'dark');
}

// Read the saved theme from localStorage and apply it. Call in app entry before
// React mounts to avoid a flash of incorrect theme.
export function applyStoredTheme(storageKey: string = DEFAULT_STORAGE_KEY): void {
  applyMode(readStoredMode(storageKey));
}

type ButtonInheritedProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'onClick' | 'children' | 'asChild' | 'action' | 'icon' | 'loading'
>;

export interface ThemeToggleProps extends ButtonInheritedProps {
  storageKey?: string;
  align?: 'start' | 'center' | 'end';
}

export function ThemeToggle({
  storageKey = DEFAULT_STORAGE_KEY,
  align = 'end',
  variant = 'outline',
  size = 'icon',
  className,
  ...buttonProps
}: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode(storageKey));

  useEffect(() => {
    applyMode(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, mode);
    }
  }, [mode, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mode === 'system') applyMode('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  const ActiveIcon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          {...buttonProps}
          variant={variant}
          size={size}
          aria-label="Switch theme"
          className={cn(className)}
          data-slot="theme-toggle"
        >
          <ActiveIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-36" data-slot="theme-toggle-menu">
        <DropdownMenuRadioGroup
          value={mode}
          onValueChange={(value) => {
            if (value === 'light' || value === 'dark' || value === 'system') setMode(value);
          }}
        >
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                <Icon className="mr-2 h-4 w-4" />
                {opt.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
ThemeToggle.displayName = 'ThemeToggle';

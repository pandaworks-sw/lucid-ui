import { forwardRef, useState, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  /** Initial visibility of the password. Default: false. */
  defaultVisible?: boolean;
  /** Override the toggle button's aria-label per state. */
  toggleLabel?: { show: string; hide: string };
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, defaultVisible = false, toggleLabel, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(defaultVisible);
    const labels = toggleLabel ?? { show: 'Show password', hide: 'Hide password' };
    const ToggleIcon = visible ? EyeOff : Eye;

    return (
      <div data-slot="password-input" className="relative">
        <Input
          ref={ref}
          {...props}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          className={cn('pr-9', className)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-label={visible ? labels.hide : labels.show}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40"
        >
          <ToggleIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput, type PasswordInputProps };

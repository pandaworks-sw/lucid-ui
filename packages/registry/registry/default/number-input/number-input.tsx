import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { validateNumberInput } from './number-input-validator';

interface NumberInputProps {
  id?: string;
  label?: string;
  value: number | '';
  onChange: (value: number | '') => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minimum?: number;
  maximum?: number;
  step?: number;
  error?: string;
  suffix?: string;
  helperText?: string;
  className?: string;
}

const getDecimalPlaces = (step: number): number => {
  const stepStr = step.toString();
  if (stepStr.includes('.')) {
    return stepStr.split('.')[1].length;
  }
  return 0;
};

function NumberInput({
  id,
  label,
  value,
  onChange,
  onBlur: onBlurCallback,
  placeholder,
  required = false,
  disabled = false,
  minimum,
  maximum,
  step = 1,
  error,
  suffix,
  helperText,
  className,
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const decimalPlaces = getDecimalPlaces(step);

  useEffect(() => {
    if (!isFocused) {
      if (value === '') {
        setDisplayValue('');
      } else {
        setDisplayValue(Number(value).toFixed(decimalPlaces));
      }
    }
  }, [value, isFocused, decimalPlaces]);

  // Block scroll-to-change on the underlying input. Listener is non-passive
  // so preventDefault() actually works.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const preventWheel = (e: WheelEvent) => {
      if (document.activeElement === input) {
        e.preventDefault();
      }
    };

    input.addEventListener('wheel', preventWheel, { passive: false });
    return () => {
      input.removeEventListener('wheel', preventWheel);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const showValidationMessage = (message: string) => {
    setValidationMessage(message);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setValidationMessage('');
      messageTimeoutRef.current = null;
    }, 3000);
  };

  const constrainValue = (numValue: number, showMessage = false): number => {
    let constrainedValue = numValue;
    let wasConstrained = false;
    let constraintType: 'minimum' | 'maximum' | '' = '';

    if (minimum !== undefined && numValue < minimum) {
      constrainedValue = minimum;
      wasConstrained = true;
      constraintType = 'minimum';
    }
    if (maximum !== undefined && numValue > maximum) {
      constrainedValue = maximum;
      wasConstrained = true;
      constraintType = 'maximum';
    }

    if (showMessage && wasConstrained) {
      if (constraintType === 'minimum') {
        showValidationMessage(`Value adjusted to minimum: ${minimum}${suffix || ''}`);
      } else if (constraintType === 'maximum') {
        showValidationMessage(`Value adjusted to maximum: ${maximum}${suffix || ''}`);
      }
    }

    return constrainedValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (inputValue === '') {
      setDisplayValue('');
      onChange('');
      return;
    }

    // Truncate decimal precision while typing, but leave a trailing "." alone
    // so the user can keep typing the fractional part.
    if (inputValue.includes('.') && !inputValue.endsWith('.')) {
      const parts = inputValue.split('.');
      const decimalPart = parts[1] || '';

      if (decimalPart.length > decimalPlaces) {
        const numValue = Number.parseFloat(inputValue);
        if (!Number.isNaN(numValue)) {
          inputValue = numValue.toFixed(decimalPlaces);
        }
      }
    }

    setDisplayValue(inputValue);

    const numValue = Number.parseFloat(inputValue);
    if (!Number.isNaN(numValue)) {
      const constrainedValue = constrainValue(numValue);
      onChange(constrainedValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    const result = validateNumberInput({
      displayValue,
      previousValue: value,
      minimum,
      maximum,
      suffix,
    });

    let formattedValue = result.value;
    if (result.value !== '') {
      const numValue = Number.parseFloat(result.value);
      if (!Number.isNaN(numValue)) {
        formattedValue = numValue.toFixed(decimalPlaces);
      }
    }

    setDisplayValue(formattedValue);

    if (result.message) {
      showValidationMessage(result.message);
    }

    // Always notify parent so autosave captures the formatted value, even
    // when nothing was constrained.
    if (formattedValue !== '') {
      const numValue = Number.parseFloat(formattedValue);
      if (!Number.isNaN(numValue)) {
        onChange(numValue);
      }
    } else {
      onChange('');
    }

    onBlurCallback?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentValue = value === '' ? 0 : Number(value);
      const newValue = e.key === 'ArrowUp' ? currentValue + step : currentValue - step;
      const constrainedValue = constrainValue(newValue);
      onChange(constrainedValue);
    }
  };

  return (
    <div data-slot="number-input" className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-muted-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={cn(
            suffix && 'pr-12',
            error && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40'
          )}
        />

        {suffix && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-sm text-muted-foreground">{suffix}</span>
          </div>
        )}
      </div>

      {helperText && !error && !validationMessage && <p className="text-xs text-muted-foreground">{helperText}</p>}

      {validationMessage && !error && (
        <p className="animate-in fade-in slide-in-from-top-1 text-xs text-info duration-200">{validationMessage}</p>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export { NumberInput, type NumberInputProps };

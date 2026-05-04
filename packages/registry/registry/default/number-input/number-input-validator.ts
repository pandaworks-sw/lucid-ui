type ValidationResult = {
  value: string;
  message: string | null;
  wasAdjusted: boolean;
};

type ValidationOptions = {
  displayValue: string;
  previousValue: number | '';
  minimum?: number;
  maximum?: number;
  suffix?: string;
};

export function validateNumberInput(options: ValidationOptions): ValidationResult {
  const { displayValue, previousValue, minimum, maximum, suffix = '' } = options;

  if (displayValue === '') {
    return {
      value: previousValue === '' ? '' : String(previousValue),
      message: null,
      wasAdjusted: false,
    };
  }

  const parsedValue = Number.parseFloat(displayValue);
  if (Number.isNaN(parsedValue)) {
    return {
      value: previousValue === '' ? '' : String(previousValue),
      message: 'Invalid input. Please enter a valid number.',
      wasAdjusted: true,
    };
  }

  if (minimum !== undefined && parsedValue < minimum) {
    return {
      value: String(minimum),
      message: `Value adjusted to minimum: ${minimum}${suffix}`,
      wasAdjusted: true,
    };
  }

  if (maximum !== undefined && parsedValue > maximum) {
    return {
      value: String(maximum),
      message: `Value adjusted to maximum: ${maximum}${suffix}`,
      wasAdjusted: true,
    };
  }

  return {
    value: String(parsedValue),
    message: null,
    wasAdjusted: false,
  };
}

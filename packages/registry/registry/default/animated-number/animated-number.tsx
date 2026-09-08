import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  /** Target value to animate to */
  value: number;
  /** Animation duration in ms */
  duration?: number;
  /** Additional className */
  className?: string;
  /** Text to append after the number (e.g., "%", "pts") */
  suffix?: string;
  /** Text to prepend before the number (e.g., "$", "RM") */
  prefix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Custom number formatter (overrides decimals if provided) */
  formatter?: (value: number) => string;
}

const easeOutQuadFn = (t: number) => 1 - (1 - t) * (1 - t);

function AnimatedNumber({
  value,
  duration = 500,
  className,
  suffix,
  prefix,
  decimals = 0,
  formatter,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    const startTime = performance.now();
    let frameId: number | undefined;

    if (startValue === endValue) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      prevValueRef.current = endValue;
      setDisplayValue(endValue);
    };

    if (media.matches || duration <= 0) {
      settle();
      return;
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) settle();
    };
    media.addEventListener('change', onMotionChange);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = easeOutQuadFn(progress);
      const current = startValue + (endValue - startValue) * easeOutQuad;
      prevValueRef.current = current;

      setDisplayValue(decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = endValue;
        setDisplayValue(endValue);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      media.removeEventListener('change', onMotionChange);
    };
  }, [value, duration, decimals]);

  const formatted = formatter
    ? formatter(displayValue)
    : decimals > 0
      ? displayValue.toFixed(decimals)
      : String(displayValue);

  return (
    <span data-slot="animated-number" className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export { AnimatedNumber, type AnimatedNumberProps };

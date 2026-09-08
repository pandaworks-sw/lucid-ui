import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatedNumber } from '@/components/ui/animated-number';

function motionPreference(matches = false) {
  const listeners = new Set<(event: { matches: boolean }) => void>();
  const query = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: (event: { matches: boolean }) => void) => listeners.delete(listener),
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => query)
  );
  return (reduced: boolean) => {
    query.matches = reduced;
    act(() => {
      for (const listener of listeners) listener({ matches: reduced });
    });
  };
}

function renderButton(node: React.ReactNode) {
  return render(<TooltipProvider>{node}</TooltipProvider>);
}

describe('accessible action buttons', () => {
  it('names an icon-only action without requiring consumers to repeat the preset', () => {
    renderButton(<Button action="edit" size="icon" />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeEnabled();
  });
  it('uses a custom tooltip as the fallback name', () => {
    renderButton(<Button icon={Pencil} size="icon" tooltip="Edit project" />);
    expect(screen.getByRole('button', { name: 'Edit project' })).toBeEnabled();
  });
  it('preserves explicit labels and labelledby', () => {
    renderButton(
      <>
        <span id="edit-label">Edit Atlas</span>
        <Button action="edit" size="icon" aria-label="Rename" />
        <Button action="edit" size="icon" aria-labelledby="edit-label" />
      </>
    );
    expect(screen.getByRole('button', { name: 'Rename' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Edit Atlas' })).not.toHaveAttribute('aria-label');
  });
  it('keeps a visible custom label as the accessible name', () => {
    renderButton(<Button action="save">Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeEnabled();
  });
  it('marks loading as busy and prevents duplicate actions', async () => {
    const click = vi.fn();
    const user = userEvent.setup();
    renderButton(<Button action="save" loading onClick={click} />);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    await user.click(button);
    expect(click).not.toHaveBeenCalled();
  });
  it('preserves link composition without injecting extra children', () => {
    renderButton(
      <Button asChild action="view">
        <a href="#project">Open project</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: 'Open project' })).toHaveAttribute('href', '#project');
  });
  it('names icon-only composed links while preserving a child label', () => {
    renderButton(
      <Button asChild action="view" size="icon">
        <a href="#project" aria-label="View Atlas">
          <Pencil />
        </a>
      </Button>
    );
    expect(screen.getByRole('link', { name: 'View Atlas' })).toBeInTheDocument();
  });
});

describe('animated values', () => {
  it('shows the initial formatted value without an initial animation', () => {
    motionPreference();
    render(<AnimatedNumber value={12.5} prefix="RM " suffix=" total" decimals={2} />);
    expect(screen.getByText('RM 12.50 total')).toBeInTheDocument();
  });
  it('immediately settles updates when reduced motion is enabled', () => {
    motionPreference(true);
    const { rerender } = render(<AnimatedNumber value={1} />);
    rerender(<AnimatedNumber value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
  it('responds to a motion preference change during animation', () => {
    const change = motionPreference();
    const { rerender } = render(<AnimatedNumber value={1} />);
    rerender(<AnimatedNumber value={100} />);
    change(true);
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  it.each([0, -1])('settles immediately for duration %s', (duration) => {
    motionPreference();
    const { rerender } = render(<AnimatedNumber value={1} duration={duration} />);
    rerender(<AnimatedNumber value={7} duration={duration} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });
  it('animates to the exact target and supports a formatter', () => {
    motionPreference();
    vi.useFakeTimers();
    const formatter = (value: number) => `${value.toFixed(1)} pts`;
    const { rerender } = render(<AnimatedNumber value={1} formatter={formatter} />);
    rerender(<AnimatedNumber value={6.5} decimals={1} formatter={formatter} duration={100} />);
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByText('6.5 pts')).toBeInTheDocument();
  });
  it('cancels its animation on unmount', () => {
    motionPreference();
    const cancel = vi.spyOn(window, 'cancelAnimationFrame');
    const { rerender, unmount } = render(<AnimatedNumber value={1} />);
    rerender(<AnimatedNumber value={4} />);
    unmount();
    expect(cancel).toHaveBeenCalled();
  });
});

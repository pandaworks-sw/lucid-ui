import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MeterRow } from '../packages/registry/registry/default/meter-row/meter-row';

describe('MeterRow accessibility', () => {
  it('names a progress bar from a rich visible label', () => {
    render(<MeterRow label={<strong>Engineering</strong>} value={3} max={6} />);
    expect(screen.getByRole('progressbar', { name: 'Engineering' })).toHaveAttribute('aria-valuenow', '50');
  });
  it('allows contextual naming without a visible label', () => {
    render(<MeterRow aria-label="Project delivery" value={120} />);
    expect(screen.getByRole('progressbar', { name: 'Project delivery' })).toHaveAttribute('aria-valuenow', '100');
  });
  it('gives an explicit label precedence over the visible label', () => {
    render(<MeterRow label="Budget" aria-label="Budget used" value={-10} />);
    expect(screen.getByRole('progressbar', { name: 'Budget used' })).toHaveAttribute('aria-valuenow', '0');
  });
  it('supports external labels and guards a zero maximum', () => {
    render(
      <>
        <span id="delivery">Delivery</span>
        <MeterRow aria-labelledby="delivery" value={1} max={0} />
      </>
    );
    expect(screen.getByRole('progressbar', { name: 'Delivery' })).toHaveAttribute('aria-valuenow', '0');
  });
});

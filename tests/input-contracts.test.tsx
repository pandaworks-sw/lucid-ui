import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from '@/components/ui/search-input';
import { validateNumberInput } from '../packages/registry/registry/default/number-input/number-input-validator';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

describe('search input contract', () => {
  it('debounces search while reporting keystrokes immediately', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();
    const onChange = vi.fn();
    render(<SearchInput aria-label="Search projects" onSearch={onSearch} onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search projects' }), { target: { value: 'atlas' } });
    expect(onChange).toHaveBeenLastCalledWith('atlas');
    expect(onSearch).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(300));
    expect(onSearch).toHaveBeenCalledExactlyOnceWith('atlas');
  });
  it('clears the controlled value and reports the clear action', async () => {
    const onClear = vi.fn();
    function Search() {
      const [value, setValue] = useState('atlas');
      return <SearchInput aria-label="Search projects" value={value} onChange={setValue} onClear={onClear} />;
    }
    render(<Search />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onClear).toHaveBeenCalledOnce();
  });
  it('cancels pending search on unmount', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();
    const { unmount } = render(<SearchInput onSearch={onSearch} defaultValue="Atlas" />);
    unmount();
    act(() => vi.advanceTimersByTime(500));
    expect(onSearch).not.toHaveBeenCalled();
  });
});

describe('numeric constraints', () => {
  it.each([
    ['-3', 0, 10, '0', true],
    ['12', 0, 10, '10', true],
    ['2.5', 0, 10, '2.5', false],
    ['0', 0, 10, '0', false],
    ['10', 0, 10, '10', false],
  ])('validates %s within %s–%s', (displayValue, minimum, maximum, value, wasAdjusted) => {
    expect(validateNumberInput({ displayValue, previousValue: '', minimum, maximum })).toMatchObject({
      value,
      wasAdjusted,
    });
  });
  it('restores the previous value on invalid input', () => {
    expect(validateNumberInput({ displayValue: 'abc', previousValue: 4 })).toMatchObject({
      value: '4',
      wasAdjusted: true,
    });
  });
  it('keeps an empty field empty', () => {
    expect(validateNumberInput({ displayValue: '', previousValue: '' })).toMatchObject({
      value: '',
      wasAdjusted: false,
    });
  });
});

it('opens a named modal from the keyboard and returns focus on Escape', async () => {
  const user = userEvent.setup();
  render(
    <Modal>
      <ModalTrigger asChild>
        <Button>Open editor</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader title="Edit project" description="Update project details." />
        <ModalBody>
          <label htmlFor="name">Name</label>
          <input id="name" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  await user.tab();
  await user.keyboard('{Enter}');
  expect(screen.getByRole('dialog', { name: 'Edit project' })).toBeVisible();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open editor' })).toHaveFocus();
});

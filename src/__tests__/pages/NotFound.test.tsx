import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import NotFound from '../../app/pages/NotFound/NotFound';

const paramsNavigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => paramsNavigateMock),
}));

describe('test NotFound component page', () => {
  test('should display correct message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Page not found/)).toHaveLength(6);
  });

  test('should navigate to main after click', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(paramsNavigateMock).toHaveBeenCalledWith('..', null, null);
  });
});

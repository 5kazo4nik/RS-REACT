import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Search } from '../../app/components/Search/Search';
import { renderWithProviders } from '../redux/renderWithProviders';

const navigateMock = vi.fn();
vi.mock('../../app/hooks/useNavigator', () => ({
  useParamsNavigator: vi.fn(() => navigateMock),
}));

describe('test Search component', () => {
  test('should render input with correct search and select value', () => {
    renderWithProviders(<Search />, { preloadedState: { search: { limit: '10', search: 't', result: null } } });

    expect(screen.getByDisplayValue('t')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  test('should navigate with input value after btn click', () => {
    renderWithProviders(<Search />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(null, 1);
  });

  test('should save search value in local storage', () => {
    renderWithProviders(<Search />, { preloadedState: { search: { limit: '10', search: 't', result: null } } });

    const input = screen.getByDisplayValue('t');
    fireEvent.change(input, { target: { value: 'hoho' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(localStorage.getItem('search')).toBe('hoho');
  });
});

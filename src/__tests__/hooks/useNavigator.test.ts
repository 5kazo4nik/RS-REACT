import { afterEach, describe, expect, test, vi } from 'vitest';
import { useParamsNavigator } from '../../app/hooks/useNavigator';

const mockNavigate = vi.fn();
const mockLocation = vi.fn().mockReturnValue({ search: '?search=test&page=3' });
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe('test useParamsNavigator custom hook', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should navigate to correct path', () => {
    const navigate = useParamsNavigator();

    navigate(null, 2);
    expect(mockNavigate).toHaveBeenCalledWith('?page=2');

    navigate('test', 2);
    expect(mockNavigate).toHaveBeenCalledWith('test/?page=2');

    navigate(null, 4, '3');
    expect(mockNavigate).toHaveBeenCalledWith('?page=4&detail=3');

    navigate(null, 5, null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=5');
  });
});

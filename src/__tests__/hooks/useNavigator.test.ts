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

    navigate(null, 'hello', 2);
    expect(mockNavigate).toHaveBeenCalledWith('?search=hello&page=2');

    navigate('test', 'hello', 2);
    expect(mockNavigate).toHaveBeenCalledWith('test/?search=hello&page=2');

    navigate(null, '', 2);
    expect(mockNavigate).toHaveBeenCalledWith('?page=2');

    navigate(null, '', 3, '3');
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&detail=3');
  });
});

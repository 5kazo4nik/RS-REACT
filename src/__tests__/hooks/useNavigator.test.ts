import { afterEach, describe, expect, test, vi } from 'vitest';
import { useParamsNavigator } from '../../hooks/useNavigator';

const mockNavigate = vi.fn();
const mockAsPath = '?search=test&page=3';
vi.mock('next/router', () => ({
  useRouter: () => {
    return {
      push: mockNavigate,
      asPath: mockAsPath,
    };
  },
}));

describe('test useParamsNavigator custom hook', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should navigate to correct path', () => {
    const navigate = useParamsNavigator();

    navigate(null, 2, null, null, null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=2&search=test&limit=5');

    navigate('/detail', 2, null, null, null);
    expect(mockNavigate).toHaveBeenCalledWith('/detail?page=2&search=test&limit=5');

    navigate(null, null, null, null, null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&search=test&limit=5');

    navigate(null, null, null, '', null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&limit=5');

    navigate(null, null, null, 'cow', null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&search=cow&limit=5');

    navigate(null, null, null, null, '15');
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&search=test&limit=15');

    navigate(null, null, '3', null, null);
    expect(mockNavigate).toHaveBeenCalledWith('?page=3&search=test&limit=5&detail=3');
  });
});

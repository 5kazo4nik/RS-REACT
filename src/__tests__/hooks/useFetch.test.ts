import { renderHook, act } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useFetch } from '../../app/hooks/useFetch';

describe('test custom hook useFetch', () => {
  const callback = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should work with true data', async () => {
    const data = { result: 'test' };
    callback.mockResolvedValue(data);
    const { result } = renderHook(() => useFetch(callback));
    const [fetching] = result.current;

    await act(async () => await fetching());

    expect(callback).toHaveBeenCalled();
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe('');
    expect(result.current[3]).toEqual(data);
  });

  test('should set message if callback has been rejected', async () => {
    const error = new Error('404');
    callback.mockRejectedValue(error);
    const { result } = renderHook(() => useFetch(callback));
    const [fetching] = result.current;

    await act(async () => await fetching());

    expect(callback).toHaveBeenCalled();
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(error.message);
    expect(result.current[3]).toEqual(null);
  });
});

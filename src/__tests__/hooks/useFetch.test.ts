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
    const { result } = renderHook(() => useFetch<typeof data>(callback));
    const { getData } = result.current;

    await act(async () => await getData());

    expect(callback).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.message).toBe('');
    expect(result.current.searchResult).toEqual(data);
  });

  test('should set message if callback has been rejected', async () => {
    const error = new Error('404');
    callback.mockRejectedValue(error);
    const { result } = renderHook(() => useFetch(callback));
    const { getData } = result.current;

    await act(async () => await getData());

    expect(callback).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.message).toBe(error.message);
    expect(result.current.searchResult).toEqual(null);
  });
});

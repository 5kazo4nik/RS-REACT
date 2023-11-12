import { useState } from 'react';

type UseFetchingReturn<T> = {
  getData: (...args: unknown[]) => Promise<void>;
  isLoading: boolean;
  message: string;
  searchResult: T | null;
};

export const useFetch = <T>(callback: (...args: unknown[]) => unknown): UseFetchingReturn<T> => {
  const [searchResult, setSearchResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetching = async (...args: unknown[]) => {
    try {
      setIsLoading(true);
      setMessage('');
      const data = (await callback(...args)) as T;
      setSearchResult(data);
    } catch (e) {
      const message = (e as Error).message;
      setSearchResult(null);
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getData: fetching,
    isLoading,
    message,
    searchResult,
  };
};

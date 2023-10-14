import { useState } from 'react';
import { ISearchData } from '../types/PlanetsData';

type ISearchResult = ISearchData | null;
type UseFetchingReturn = [(...args: unknown[]) => Promise<void>, boolean, string, ISearchData | null];

export const useFetch = (callback: (...args: unknown[]) => unknown): UseFetchingReturn => {
  const [searchResult, setSearchResult] = useState<ISearchData | null>(null);
  const [isLoading, setIsLoad] = useState(false);
  const [message, setMessage] = useState('');

  const fetching = async (...args: unknown[]) => {
    try {
      setIsLoad(true);
      setMessage('');
      const data = (await callback(...args)) as ISearchResult;
      setSearchResult(data);
    } catch (e) {
      const message = (e as Error).message;
      setSearchResult(null);
      setMessage(message);
    } finally {
      setIsLoad(false);
    }
  };

  return [fetching, isLoading, message, searchResult];
};

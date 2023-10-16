import { createContext } from 'react';
import { ISearchData } from '../types/PlanetsData';

interface ISearchContext {
  search: string;
  searchResult: ISearchData | null;
}

export const SearchContext = createContext<ISearchContext>({ search: '', searchResult: null });

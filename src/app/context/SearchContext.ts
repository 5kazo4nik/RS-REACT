import { createContext } from 'react';
import { ISearchData } from '../types/PlanetsData';

interface ISearchContext {
  search: string;
  setSearch: (val: string) => void;
  searchResult: ISearchData | null;
}

export const SearchContext = createContext<ISearchContext>({
  search: '',
  setSearch: () => {},
  searchResult: null,
});

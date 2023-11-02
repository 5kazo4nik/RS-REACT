import { createContext } from 'react';
import { ISearchData } from '../types/AnimeData';

interface ISearchContext {
  search: string;
  setSearch: (val: string) => void;
  searchResult: ISearchData | null;
  limit: string;
  changeLimit: (val: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
  search: '',
  setSearch: () => {},
  searchResult: null,
  limit: '5',
  changeLimit: () => {},
});

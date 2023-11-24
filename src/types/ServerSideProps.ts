import { IQueryParams } from '../store/reducers/querySlice';
import { ISearchData } from './AnimeData';

export interface IHomePageProps {
  animeData: ISearchData;
  query: IQueryParams;
  animeMessage: string;
}

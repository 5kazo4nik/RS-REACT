import { ServerQueryParams } from '../utils/getServerSideParams';
import { IAnimeData, ISearchData } from './AnimeData';

export interface IRTKError {
  data: {
    message: string;
  };
}

export interface IRTKResp {
  status: string;
  originalArgs?: unknown;
  data?: unknown;
  error?: IRTKError | undefined;
  requestId?: unknown;
  endpointName?: string | undefined;
  startedTimeStamp?: unknown;
  fulfilledTimeStamp?: unknown;
}

export interface IQueryParams {
  detail?: string;
  page?: number;
  search?: string;
  limit?: string;
}

export interface IHomePageProps {
  animeData: ISearchData;
  query: ServerQueryParams;
  animeMessage: string;
}

export interface IDetailPageProps extends IHomePageProps {
  detailData: IAnimeData;
  detailMessage: string;
}

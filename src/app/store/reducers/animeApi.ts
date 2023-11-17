import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAnimeData, ISearchData } from '../../types/AnimeData';

interface IGetAllAnimeParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/anime' }),
  endpoints: (build) => ({
    getAllAnime: build.query<ISearchData, IGetAllAnimeParams>({
      query: ({ q, page, limit }) => ({
        url: '',
        params: {
          q,
          page,
          limit,
        },
      }),
    }),
    getAnime: build.query<IAnimeData, string | undefined>({
      query: (value) => ({
        url: `/${value}`,
      }),
    }),
  }),
});

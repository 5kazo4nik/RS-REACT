import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAnimeData, ISearchData } from '../../types/AnimeData';
import { HYDRATE } from 'next-redux-wrapper';

interface IGetAllAnimeParams {
  q?: string;
  page?: number;
  limit?: string;
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

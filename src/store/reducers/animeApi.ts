import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IAnimeData, ISearchData } from '../../types/AnimeData';
import { setAnimeMessage, setIsAnimeLoading } from './loaderSlice';

interface IGetAllAnimeParams {
  q?: string;
  page?: number;
  limit?: string;
}

interface IRtkQueryError {
  error: {
    data: {
      message: string;
    };
  };
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setAnimeMessage(''));
        dispatch(setIsAnimeLoading(true));
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          // dispatch(setAnimeData(data));
        } catch (e) {
          dispatch(setAnimeMessage((e as IRtkQueryError).error.data.message));
        } finally {
          dispatch(setIsAnimeLoading(false));
        }
      },
    }),
    getAnime: build.query<IAnimeData, string | undefined>({
      query: (value) => ({
        url: `/${value}`,
      }),
    }),
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === HYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
});

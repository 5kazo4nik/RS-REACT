import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPlanetData, ISearchData } from '../../types/PlanetsData';

interface IGetPlanetsParams {
  search?: string;
  page?: number;
}

export const planetApi = createApi({
  reducerPath: 'planetApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getPlanets: build.query<ISearchData, IGetPlanetsParams>({
      query: ({ search, page }) => ({
        url: '/planets',
        params: {
          search,
          page,
        },
      }),
    }),
    getPlanet: build.query<IPlanetData, string | undefined>({
      query: (value) => ({
        url: `/planets/${value}/`,
      }),
    }),
  }),
});

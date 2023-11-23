/* eslint-disable react-hooks/exhaustive-deps */
import Home from '../components/Home/Home';
import { setQuery } from '../store/reducers/querySlice';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/store';
import { animeApi } from '../store/reducers/animeApi';

export type IMainQuery = {
  search: string | undefined;
  page: string | undefined;
  detail: string | undefined;
};

export default function HomePage() {
  return <Home />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  store.dispatch(setQuery(query));

  const { search, page, limit } = query;
  const q = (search as string | undefined) ?? '';
  const p = (page as string | undefined) ?? '1';
  const l = (limit as string | undefined) ?? '5';

  await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q, page: +p, limit: l }));
  await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

  return { props: {} };
});

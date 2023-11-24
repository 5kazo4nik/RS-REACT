/* eslint-disable react-hooks/exhaustive-deps */
import Home from '../components/Home/Home';
import { setQuery } from '../store/reducers/querySlice';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/store';
import { animeApi } from '../store/reducers/animeApi';
import { IHomePageProps } from '../types/ServerSideProps';

export default function HomePage(data: IHomePageProps) {
  return <Home />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  store.dispatch(setQuery(query));

  const { search, page, limit } = query;
  const q = (search as string | undefined) ?? '';
  const p = (page as string | undefined) ?? '1';
  const l = (limit as string | undefined) ?? '5';

  const data = await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q, page: +p, limit: l }));
  await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

  // if (data.status === 'rejected') {
  //   message = data.error.data.message;
  // }

  return {
    props: {
      animeData: data,
      query,
      // animeMessage: message,
    },
  };
});

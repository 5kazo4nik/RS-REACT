import Home from '../../components/Home/Home';
import Details from '../../components/Details/Details';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store/store';
import { setQuery } from '../../store/reducers/querySlice';
import { animeApi } from '../../store/reducers/animeApi';

const DetailsPage = () => {
  return (
    <div className='app__splitted'>
      <div className='home__splitted'>
        <Home />
      </div>
      <Details />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { query } = ctx;
  store.dispatch(setQuery(query));

  const { search, page, limit, detail } = query;
  const q = (search as string | undefined) ?? '';
  const p = (page as string | undefined) ?? '1';
  const l = (limit as string | undefined) ?? '5';
  const d = (detail as string | undefined) ?? '1';

  await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q, page: +p, limit: l }));
  await store.dispatch(animeApi.endpoints.getAnime.initiate(d));
  await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

  return { props: {} };
});

export default DetailsPage;

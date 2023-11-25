import Home from '../components/Home/Home';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/store';
import { animeApi } from '../store/reducers/animeApi';
import { IHomePageProps, IRTKResp } from '../types/ServerSideProps';
import { getServerSideParams } from '../utils/getServerSideParams';
import { getServerSideData } from '../utils/getServerSideData';

export default function HomePage(data: IHomePageProps) {
  return <Home data={data} />;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const query = getServerSideParams(ctx);
  const { search, page, limit } = query;

  const resp = await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q: search, page: +page, limit }));
  await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

  const { data: animeData, message: animeMessage } = getServerSideData(resp as unknown as IRTKResp);

  return {
    props: {
      animeData,
      query,
      animeMessage,
    },
  };
});

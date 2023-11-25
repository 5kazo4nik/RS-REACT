import Home from '../../components/Home/Home';
import Details from '../../components/Details/Details';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store/store';
import { animeApi } from '../../store/reducers/animeApi';
import { getServerSideParams } from '../../utils/getServerSideParams';
import { getServerSideData } from '../../utils/getServerSideData';
import { IDetailPageProps, IRTKResp } from '../../types/ServerSideProps';

const DetailsPage = (data: IDetailPageProps) => {
  return (
    <div className='app__splitted'>
      <div className='home__splitted'>
        <Home data={data} />
      </div>
      <Details data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const query = getServerSideParams(ctx);
  const { search, page, limit, detail } = query;

  const animeResp = await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q: search, page: +page, limit }));
  const detailResp = await store.dispatch(animeApi.endpoints.getAnime.initiate(detail));
  await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

  const { data: animeData, message: animeMessage } = getServerSideData(animeResp as unknown as IRTKResp);
  const { data: detailData, message: detailMessage } = getServerSideData(detailResp as unknown as IRTKResp);

  return {
    props: {
      query,
      animeData,
      animeMessage,
      detailData,
      detailMessage,
    },
  };
});

export default DetailsPage;

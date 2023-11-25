import { Search } from '../Search/Search';
import { AnimeList } from '../AnimeList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { IHomePageProps } from '../../types/ServerSideProps';

interface IHomeProps {
  data: IHomePageProps;
}

function Home({ data }: IHomeProps) {
  const { animeData: searchResult, animeMessage, query } = data;

  return (
    <div>
      <Search query={query} />

      {animeMessage ? (
        <h2 className='error-message'>Oops... Something went wrong... {animeMessage}</h2>
      ) : (
        <AnimeList searchResult={searchResult} />
      )}

      {!!searchResult?.data?.length && <Pagination animeData={searchResult} query={query} />}
    </div>
  );
}

export default Home;

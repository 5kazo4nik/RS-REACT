/* eslint-disable react-hooks/exhaustive-deps */
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../Search/Search';
import { AnimeList } from '../AnimeList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useAppSelector } from '../../hooks/useAppSelector';

function Home() {
  const { animeMessage, isAnimeLoading } = useAppSelector((state) => state.loader);
  const { animeData: searchResult } = useAppSelector((state) => state.data);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(setQuery(data.query));
  // }, [data]);

  return (
    <div>
      {isAnimeLoading && <Loader />}
      <Search />

      {animeMessage ? <h2 className='error-message'>Oops... Something went wrong... {animeMessage}</h2> : <AnimeList />}

      {!!searchResult?.data?.length && <Pagination />}
    </div>
  );
}

export default Home;

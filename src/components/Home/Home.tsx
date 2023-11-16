/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../Search/Search';
import { AnimeList } from '../AnimeList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useAppSelector } from '../../hooks/useAppSelector';
import { animeApi } from '../../store/reducers/animeApi';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setResult } from '../../store/reducers/searchSlice';
import { useParamsNavigator } from '../../hooks/useNavigator';

function Home() {
  const { page } = useAppSelector((state) => state.query);
  const navigate = useParamsNavigator();

  const dispatch = useAppDispatch();

  const { search, limit } = useAppSelector((state) => state.search);
  const {
    isFetching: isLoading,
    isError,
    data: searchResult,
  } = animeApi.useGetAllAnimeQuery({ q: search, page, limit });

  useEffect(() => {
    dispatch(setResult(searchResult || null));
  }, [searchResult]);

  return (
    <div onClick={() => navigate('', null, null)}>
      {isLoading && <Loader />}
      <Search />

      {isError ? <h2 className='error-message'>Oops... Something went wrong...</h2> : <AnimeList />}

      {!!searchResult?.data?.length && <Pagination />}
    </div>
  );
}

export default Home;

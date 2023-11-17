/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { AnimeList } from '../../components/AnimeList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { animeApi } from '../../store/reducers/animeApi';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setResult } from '../../store/reducers/searchSlice';

function Home() {
  const { page } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();
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
    <div onClick={() => paramsNavigate('..', null, null)}>
      {isLoading && <Loader />}
      <Search />

      {isError ? <h2 className='error-message'>Oops... Something went wrong...</h2> : <AnimeList />}

      {!!searchResult?.data?.length && <Pagination />}
    </div>
  );
}

export default Home;

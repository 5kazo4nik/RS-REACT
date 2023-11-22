/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../Search/Search';
import { AnimeList } from '../AnimeList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useAppSelector } from '../../hooks/useAppSelector';
import { animeApi } from '../../store/reducers/animeApi';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setAnimeData } from '../../store/reducers/dataSlice';

function Home() {
  const { page, search, limit } = useAppSelector((state) => state.query);
  const { animeMessage, isAnimeLoading } = useAppSelector((state) => state.loader);

  const dispatch = useAppDispatch();
  const { data: searchResult } = animeApi.useGetAllAnimeQuery({ q: search, page, limit });

  useEffect(() => {
    // dispatch(setResult(searchResult || null));
    dispatch(setAnimeData(searchResult || null));
  }, [searchResult]);

  return (
    // <div onClick={() => navigate('', null, null, null, null)}>
    <div>
      {isAnimeLoading && <Loader />}
      <Search />

      {animeMessage ? <h2 className='error-message'>Oops... Something went wrong... {animeMessage}</h2> : <AnimeList />}

      {!!searchResult?.data?.length && <Pagination />}
    </div>
  );
}

export default Home;

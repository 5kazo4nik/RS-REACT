/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AnimeService } from '../../API/AnimeService';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { AnimeList } from '../../components/PlanetList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { SearchContext } from '../../context/SearchContext';

interface IHomeProps {
  pageQuery: number;
}

function Home({ pageQuery = 1 }: IHomeProps) {
  const paramsNavigate = useParamsNavigator();
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search') || '');
  const [page, setPage] = useState(pageQuery);
  const [limit, setLimit] = useState('5');
  const [getAllAnime, isLoading, message, searchResult] = useFetch(async () => {
    setPage(pageQuery);
    const res = await AnimeService.getAllAnime(searchQuery, pageQuery, limit);
    return res;
  });

  const changePage = (p: number) => {
    setPage(page + p);
  };

  const setSearch = (value: string) => {
    setSearchQuery(value);
  };

  const changeLimit = (limit: string) => {
    paramsNavigate(null, 1);
    setLimit(limit);
  };

  useEffect(() => {
    getAllAnime();
  }, [searchQuery, pageQuery, limit]);

  useEffect(() => {
    paramsNavigate(null, page);
  }, [page]);

  return (
    <SearchContext.Provider value={{ search: searchQuery, setSearch, searchResult, limit, changeLimit }}>
      <div onClick={() => paramsNavigate('..', null, null)}>
        {isLoading && <Loader />}
        <Search />

        {message ? <h2 className='error-message'>Error: {message}</h2> : <AnimeList />}

        {!!searchResult?.data?.length && <Pagination page={pageQuery} changePage={changePage} />}
      </div>
    </SearchContext.Provider>
  );
}

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { PlanetsService } from '../../API/PlanetsService';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { PlanetList } from '../../components/PlanetList/PlanetList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { SearchContext } from '../../context/SearchContext';

interface IHomeProps {
  // searchQuery: string | undefined;
  pageQuery: number;
}

// function Home({ searchQuery = '', pageQuery = 1 }: IHomeProps) {
function Home({ pageQuery = 1 }: IHomeProps) {
  const paramsNavigate = useParamsNavigator();
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search') || '');
  const [page, setPage] = useState(pageQuery);

  const [getPlanets, isLoad, message, searchResult] = useFetch(async () => {
    setPage(pageQuery);
    const res = await PlanetsService.getPlanets(searchQuery, pageQuery);
    return res;
  });

  const changePage = (p: number) => {
    setPage(page + p);
  };

  const setSearch = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    getPlanets();
  }, [searchQuery, pageQuery]);

  useEffect(() => {
    paramsNavigate(null, page);
  }, [page]);

  return (
    <SearchContext.Provider value={{ search: searchQuery, setSearch, searchResult }}>
      <div onClick={() => paramsNavigate('..', null, null)}>
        {isLoad && <Loader />}
        <Search />

        {message ? <h2 className='error-message'>Error: {message}</h2> : <PlanetList />}

        {!!searchResult?.results?.length && <Pagination page={pageQuery} changePage={changePage} />}
      </div>
    </SearchContext.Provider>
  );
}

export default Home;

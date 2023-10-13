/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { PlanetsService } from './API/PlanetsService';
import { ISearchData } from './types/PlanetsData';
import { PlanetList } from './components/PlanetList/PlanetList';
import { Pagination } from './UI/Pagination/Pagination';
import { Loader } from './UI/Loader/Loader';

function App() {
  const [searchResult, setSearchResult] = useState<ISearchData | null>(null);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState('');
  const searchValue = localStorage.getItem('searchValue') || '';

  const fetchData = (callback: (...args: unknown[]) => unknown) => {
    return async (...args: unknown[]) => {
      try {
        setIsLoad(true);
        setMessage('');
        await callback(...args);
      } catch (e) {
        const message = (e as Error).message;
        setSearchResult(null);
        setMessage(message);
      } finally {
        setIsLoad(false);
      }
    };
  };

  const getPage = fetchData(async (url, page) => {
    const res = await PlanetsService.getPlanetPage(url as string);
    setSearchResult(res);
    setPage((p) => p + (page as number));
  });

  const getPlanets = fetchData(async (value) => {
    const res = await PlanetsService.getPlanet(value as string);
    setSearchResult(res);
    setPage(1);
  });

  useEffect(() => {
    getPlanets(searchValue);
  }, []);

  return (
    <div className='app'>
      {isLoad && <Loader />}
      <Search value={searchValue} getPlanets={getPlanets} />

      {message ? (
        <h2 className='error-message'>Error: {message}</h2>
      ) : (
        <PlanetList planets={searchResult?.results || []} count={searchResult?.count || 0} />
      )}

      {!!searchResult?.results?.length && (
        <Pagination page={page} next={searchResult.next} previous={searchResult.previous} getPage={getPage} />
      )}
    </div>
  );
}

export default App;

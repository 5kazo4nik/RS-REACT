/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ISearchData } from '../../types/PlanetsData';
import { PlanetsService } from '../../API/PlanetsService';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { PlanetList } from '../../components/PlanetList/PlanetList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

interface IHomeProps {
  searchQuery: string | undefined;
  pageQuery: number;
}

function Home({ searchQuery = '', pageQuery = 1 }: IHomeProps) {
  const [searchResult, setSearchResult] = useState<ISearchData | null>(null);
  const [page, setPage] = useState(pageQuery);
  const [isLoad, setIsLoad] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

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

  const changePage = (p: number) => {
    setPage(page + p);
  };

  const getPlanets = fetchData(async () => {
    setPage(pageQuery);
    const res = await PlanetsService.getPlanets(searchQuery, pageQuery);
    setSearchResult(res);
  });

  useEffect(() => {
    getPlanets();
  }, [searchQuery, pageQuery]);

  useEffect(() => {
    const path = searchQuery.length ? `?search=${searchQuery}&page=${page}` : `?page=${page}`;
    navigate(path);
  }, [page]);

  return (
    <div className='home'>
      {isLoad && <Loader />}
      <Search value={searchQuery} />

      {message ? (
        <h2 className='error-message'>Error: {message}</h2>
      ) : (
        <PlanetList planets={searchResult?.results || []} count={searchResult?.count || 0} />
      )}

      {!!searchResult?.results?.length && (
        <Pagination
          page={pageQuery}
          next={searchResult.next}
          previous={searchResult.previous}
          changePage={changePage}
        />
      )}
    </div>
  );
}

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { PlanetsService } from '../../API/PlanetsService';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { PlanetList } from '../../components/PlanetList/PlanetList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { useParamsNavigator } from '../../hooks/useNavigator';

interface IHomeProps {
  searchQuery: string | undefined;
  pageQuery: number;
  detail: string | undefined;
}

function Home({ searchQuery = '', pageQuery = 1, detail = '' }: IHomeProps) {
  const paramsNavigate = useParamsNavigator();
  const [page, setPage] = useState(pageQuery);
  const [getPlanets, isLoad, message, searchResult] = useFetch(async () => {
    setPage(pageQuery);
    const res = await PlanetsService.getPlanets(searchQuery, pageQuery, detail);
    return res;
  });

  const changePage = (p: number) => {
    setPage(page + p);
  };

  useEffect(() => {
    getPlanets();
  }, [searchQuery, pageQuery]);

  useEffect(() => {
    paramsNavigate(null, searchQuery, page);
  }, [page]);

  return (
    <div onClick={() => paramsNavigate('..', null, null, null)}>
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

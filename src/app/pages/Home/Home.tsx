/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AnimeService } from '../../API/AnimeService';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { AnimeList } from '../../components/PlanetList/AnimeList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useFetch } from '../../hooks/useFetch';
import { useParamsNavigator } from '../../hooks/useNavigator';

interface IHomeProps {
  searchQuery: string | undefined;
  pageQuery: number;
}

function Home({ searchQuery = '', pageQuery = 1 }: IHomeProps) {
  const paramsNavigate = useParamsNavigator();
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

  const changeLimit = (limit: string) => {
    paramsNavigate(null, searchQuery, 1);
    setLimit(limit);
  };

  useEffect(() => {
    getAllAnime();
  }, [searchQuery, pageQuery, limit]);

  useEffect(() => {
    paramsNavigate(null, searchQuery, page);
  }, [page]);

  return (
    <div onClick={() => paramsNavigate('..', null, null, null)}>
      {isLoading && <Loader />}
      <Search value={searchQuery} limit={limit} changeLimit={changeLimit} />

      {message ? (
        <h2 className='error-message'>Error: {message}</h2>
      ) : (
        <AnimeList data={searchResult?.data || []} count={searchResult?.pagination.items.total || 0} />
      )}

      {!!searchResult?.data?.length && (
        <Pagination
          page={pageQuery}
          hasNext={searchResult?.pagination.has_next_page}
          hasPrev={page > 1 && !!searchResult.data.length}
          changePage={changePage}
        />
      )}
    </div>
  );
}

export default Home;

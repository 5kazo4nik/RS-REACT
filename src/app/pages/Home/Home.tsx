/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { PlanetList } from '../../components/PlanetList/PlanetList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { planetApi } from '../../store/reducers/planetsApi';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setResult } from '../../store/reducers/searchSlice';

function Home() {
  const { page } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();
  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state.search);
  const { isFetching: isLoading, isError, data: searchResult } = planetApi.useGetPlanetsQuery({ search, page });

  useEffect(() => {
    dispatch(setResult(searchResult || null));
  }, [searchResult]);

  return (
    <div onClick={() => paramsNavigate('..', null, null)}>
      {isLoading && <Loader />}
      <Search />

      {isError ? <h2 className='error-message'>Oops... Something went wrong...</h2> : <PlanetList />}

      {!!searchResult?.results?.length && <Pagination />}
    </div>
  );
}

export default Home;

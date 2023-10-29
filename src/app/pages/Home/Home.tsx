import { useState } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Search } from '../../components/Search/Search';
import { PlanetList } from '../../components/PlanetList/PlanetList';
import { Pagination } from '../../UI/Pagination/Pagination';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { SearchContext } from '../../context/SearchContext';
import { useAppSelector } from '../../hooks/useAppSelector';
import { planetApi } from '../../store/reducers/planetsApi';

function Home() {
  const { page } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();

  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('search') || '');

  const {
    isFetching: isLoad,
    isError,
    data: searchResult,
  } = planetApi.useGetPlanetsQuery({ search: searchQuery, page });

  const setSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <SearchContext.Provider value={{ search: searchQuery, setSearch, searchResult }}>
      <div onClick={() => paramsNavigate('..', null, null)}>
        {isLoad && <Loader />}
        <Search />

        {isError ? <h2 className='error-message'>Oops... Something went wrong...</h2> : <PlanetList />}

        {!!searchResult?.results?.length && <Pagination />}
      </div>
    </SearchContext.Provider>
  );
}

export default Home;

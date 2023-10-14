import queryString from 'query-string';
import { Outlet, useLocation } from 'react-router-dom';
import Home from '../Home/Home';
import { useEffect, useState } from 'react';

type IMainQuery = {
  search: string | undefined;
  page: string | undefined;
  detail: string | undefined;
};

function Main() {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search) as IMainQuery;
  const [query, setQuery] = useState<IMainQuery>(parsedQuery);

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search) as IMainQuery;
    setQuery(parsedQuery);
  }, [location.search]);

  return (
    <div className='app'>
      <Home searchQuery={query.search} pageQuery={Number(query.page) || 1} detail={query.detail} />
      <Outlet />
    </div>
  );
}

export default Main;

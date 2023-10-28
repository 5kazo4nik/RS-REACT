import queryString from 'query-string';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../../pages/Home/Home';

import './Main.css';

type IMainQuery = {
  search?: string;
  page?: string;
  detail?: string;
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
    <div className={`app ${!!query.detail && location.pathname.includes('details') ? 'app__splitted' : ''}`}>
      <div className={`home ${!!query.detail && location.pathname.includes('details') ? 'home__splitted' : ''}`}>
        <Home pageQuery={Number(query.page) || 1} />
      </div>
      <Outlet />
    </div>
  );
}

export default Main;

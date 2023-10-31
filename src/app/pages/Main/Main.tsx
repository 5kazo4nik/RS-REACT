import queryString from 'query-string';
import { Outlet, useLocation } from 'react-router-dom';
import Home from '../Home/Home';

import './Main.css';

type IMainQuery = {
  search: string | undefined;
  page: string | undefined;
  detail: string | undefined;
};

function Main() {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search) as IMainQuery;

  return (
    <div className={`app ${!!parsedQuery.detail && location.pathname.includes('details') ? 'app__splitted' : ''}`}>
      <div className={`home ${!!parsedQuery.detail && location.pathname.includes('details') ? 'home__splitted' : ''}`}>
        <Home pageQuery={Number(parsedQuery.page) || 1} />
      </div>
      <Outlet context={{ detail: parsedQuery.detail }} />
    </div>
  );
}

export default Main;

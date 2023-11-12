import classNames from 'classnames';
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

  const containerClassname = classNames('app', {
    app__splitted: !!parsedQuery.detail && location.pathname.includes('details'),
  });

  const homeClassname = classNames('home', {
    home__splitted: !!parsedQuery.detail && location.pathname.includes('details'),
  });

  return (
    <div className={containerClassname}>
      <div className={homeClassname}>
        <Home pageQuery={Number(parsedQuery.page) || 1} />
      </div>
      <Outlet context={{ detail: parsedQuery.detail }} />
    </div>
  );
}

export default Main;

import queryString from 'query-string';
import { Outlet, useLocation } from 'react-router-dom';
import './Main.css';
import Home from '../../pages/Home/Home';
import { setQuery } from '../../store/reducers/querySlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';

export interface IParsedQuery {
  page?: string;
  detail?: string;
}

function Main() {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search) as IParsedQuery;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuery(parsedQuery));
  }, [parsedQuery, dispatch]);

  return (
    <div className={`app ${!!parsedQuery.detail && location.pathname.includes('details') ? 'app__splitted' : ''}`}>
      <div className={`home ${!!parsedQuery.detail && location.pathname.includes('details') ? 'home__splitted' : ''}`}>
        <Home />
      </div>
      <Outlet />
    </div>
  );
}

export default Main;

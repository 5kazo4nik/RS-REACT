import Home from '../../components/Home/Home';
import Details from '../../components/Details/Details';
import queryString from 'query-string';
import { IQueryParamsState, setQuery } from '../../store/reducers/querySlice';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';

const DetailsPage = () => {
  const { asPath } = useRouter();
  const parsedQuery = queryString.parse(asPath.split('?')[1]) as unknown as IQueryParamsState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuery(parsedQuery));
  }, [asPath]);

  return (
    <div className='app__splitted'>
      <div className='home__splitted'>
        <Home />
      </div>
      <Details />
    </div>
  );
};

export default DetailsPage;

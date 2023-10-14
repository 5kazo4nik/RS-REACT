import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

type DetailsQuery = {
  detail: string;
};

const Details = () => {
  const location = useLocation();
  const { detail } = queryString.parse(location.search) as DetailsQuery;
  console.log(detail);
  // const getPlanet =

  return <div></div>;
};

export default Details;

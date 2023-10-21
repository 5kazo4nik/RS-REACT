import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

export const useParamsNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);

  return (path: string | null, page?: number | null, detail?: string | null) => {
    const pathValue = path ? `${path}/` : '';
    const pagePath = page ? `?page=${page}` : `?page=${query.page}`;

    const detailPath =
      typeof detail === 'object' ? '' : detail ? `&detail=${detail}` : query.detail ? `&detail=${query.detail}` : '';

    navigate(`${pathValue}${pagePath}${detailPath}`);
  };
};

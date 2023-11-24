import queryString from 'query-string';
import { useRouter } from 'next/router';

export const useParamsNavigator = () => {
  const { push, asPath } = useRouter();
  const curUrl = asPath.split('?');

  const query = queryString.parse(curUrl[1]);
  const curPath = curUrl[0];

  return (
    path: string | null,
    page: number | null,
    detail: string | null,
    search: string | null,
    limit: string | null
  ) => {
    const pathValue = typeof path === 'object' ? curPath : path ? `${path}` : '/';

    const pagePath = page ? `?page=${page}` : `?page=${query.page || 1}`;

    const detailPath =
      typeof detail === 'object' ? '' : detail ? `&detail=${detail}` : query.detail ? `&detail=${query.detail}` : '';

    const searchPath =
      typeof search === 'object' && query.search ? `&search=${query.search}` : !search ? '' : `&search=${search}`;

    const limitPath = typeof limit === 'object' ? `&limit=${query.limit || 5}` : `&limit=${limit}`;

    push(`${pathValue}${pagePath}${searchPath}${limitPath}${detailPath}`);
  };
};

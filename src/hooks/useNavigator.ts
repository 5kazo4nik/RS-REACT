import queryString from 'query-string';
import { useRouter } from 'next/router';

export const useParamsNavigator = () => {
  const { push, asPath } = useRouter();
  const curUrl = asPath.split('?');

  const query = queryString.parse(curUrl[1]);
  const curPath = curUrl[0];

  return (path: string | null, page?: number | null, detail?: string | null) => {
    const pathValue = typeof path === 'object' ? curPath : path ? `${path}` : '/';
    // const pathValue = path ? `${path}/` : '/';

    const pagePath = page ? `?page=${page}` : `?page=${query.page}`;

    const detailPath =
      typeof detail === 'object' ? '' : detail ? `&detail=${detail}` : query.detail ? `&detail=${query.detail}` : '';

    push(`${pathValue}${pagePath}${detailPath}`);
  };
};

/* eslint-disable react-hooks/exhaustive-deps */
import queryString from 'query-string';
import Home from '../components/Home/Home';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { IQueryParamsState, setQuery } from '../store/reducers/querySlice';
// import { wrapper } from '../store/store';
// import { GetServerSideProps } from 'next/types';

export type IMainQuery = {
  search: string | undefined;
  page: string | undefined;
  detail: string | undefined;
};

export default function HomePage() {
  const { asPath } = useRouter();
  const parsedQuery = queryString.parse(asPath.split('?')[1]) as unknown as IQueryParamsState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuery(parsedQuery));
  }, [asPath]);

  return (
    <>
      <Home />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   // const { query } = ctx;
//   // store.dispatch(setQuery(query as unknown as IQueryParamsState));

//   // await store.dispatch(animeApi.endpoints.getAllAnime.initiate({ q: search, page, limit }));
//   // const data = await store.dispatch(
//   //   animeApi.endpoints.getAllAnime.initiate({ q: '', page: Number(query.page), limit: 5 })
//   // );
//   // await Promise.all(store.dispatch(animeApi.util.getRunningQueriesThunk()));

//   // console.log(data.isLoading);
//   // console.log(state.animeApi.queries[`getAllAnime({"limit":5,"page":${query.page},"q":""})`]?.data);
//   // console.log(query);

//   return { props: {} };
// });

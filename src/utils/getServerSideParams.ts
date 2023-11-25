import { GetServerSidePropsContext } from 'next';

export function getServerSideParams(ctx: GetServerSidePropsContext) {
  const { query } = ctx;
  const { search, page, limit, detail } = query;
  const q = (search as string | undefined) ?? '';
  const p = (page as string | undefined) ?? '1';
  const l = (limit as string | undefined) ?? '5';
  const d = (detail as string | undefined) ?? '1';

  return { search: q, page: p, limit: l, detail: d };
}

export type ServerQueryParams = ReturnType<typeof getServerSideParams>;

import { IRTKError, IRTKResp } from '../types/ServerSideProps';

export function getServerSideData(resp: IRTKResp) {
  let data = null;
  let message = '';

  if (resp.status === 'rejected') {
    const errorData = resp.error as IRTKError;
    message = errorData.data.message;
  } else {
    data = resp.data;
  }

  return {
    data,
    message,
  };
}

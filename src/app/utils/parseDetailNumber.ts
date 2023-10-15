export const parseDetailNumber = (url: string) => {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 2];
};

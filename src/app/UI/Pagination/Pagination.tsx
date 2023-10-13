import styles from './Pagination.module.css';

interface IPaginationProps {
  next: string | null;
  previous: string | null;
  // getPage: (url: string, page: number) => void;
  // getPlanets: () => void;
  changePage: (page: number) => void;
  page: number;
}

export function Pagination({ next, previous, page, changePage }: IPaginationProps) {
  const getNextPage = () => {
    if (next) {
      // getPage(next, 1);
      changePage(1);
    }
  };

  const getPrevPage = () => {
    if (previous) {
      // getPage(previous, -1);
      changePage(-1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={`${styles.pagination__btn} ${styles.btn_prev}`} disabled={!previous} onClick={getPrevPage}>
        {'<'}
      </button>
      <div className={styles.pagination__page}>{page}</div>
      <button className={`${styles.pagination__btn} ${styles.btn_next}`} disabled={!next} onClick={getNextPage}>
        {'>'}
      </button>
    </div>
  );
}

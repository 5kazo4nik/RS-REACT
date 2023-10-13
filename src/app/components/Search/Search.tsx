import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Search.module.css';

interface ISearchProps {
  value: string;
}

export function Search({ value }: ISearchProps) {
  const [searchValue, setSearchValue] = useState(value);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const path = searchValue ? `?search=${searchValue}&page=1` : '';
    navigate(path);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <input value={searchValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchBtn}>Search</button>
      </form>
    </div>
  );
}

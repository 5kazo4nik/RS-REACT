import { useContext, useState } from 'react';
import styles from './Search.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { SearchContext } from '../../context/SearchContext';

export function Search() {
  const { search, setSearch } = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState(search);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('search', searchValue);
    setSearch(searchValue);
    navigate(null, 1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <input value={searchValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

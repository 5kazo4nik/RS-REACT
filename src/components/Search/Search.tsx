import styles from './Search.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { searchOptions } from './searchOptions';
import { useParamsNavigator } from '../../hooks/useNavigator';

export function Search() {
  const { limit, search } = useAppSelector((state) => state.query);

  const [inputValue, setInputValue] = useState(search);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/', 1, null, inputValue, limit || '5');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate('/', 1, null, search || '', e.target.value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any anime!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <select value={limit} onChange={onSelectChange}>
          {searchOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <input value={inputValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import { searchOptions } from './searchOptions';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { ServerQueryParams } from '../../utils/getServerSideParams';

interface ISearchProps {
  query: ServerQueryParams;
}

export function Search({ query }: ISearchProps) {
  const { limit, search } = query;
  const [inputValue, setInputValue] = useState(search);

  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/', 1, null, inputValue, limit);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate('/', 1, null, search, e.target.value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any anime!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <select value={limit} onChange={onSelectChange}>
          {searchOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input value={inputValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

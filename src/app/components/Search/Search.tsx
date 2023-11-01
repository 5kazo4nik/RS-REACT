import { useState } from 'react';
import styles from './Search.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';

interface ISearchProps {
  value: string;
}

export function Search({ value }: ISearchProps) {
  const [searchValue, setSearchValue] = useState(value);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(null, searchValue, 1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any Star Wars planet!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <select>
          <option value='5' selected>
            5
          </option>
          <option value='5' selected>
            10
          </option>
          <option value='5' selected>
            15
          </option>
          <option value='5' selected>
            20
          </option>
        </select>
        <input value={searchValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

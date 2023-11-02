import styles from './Search.module.css';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setLimit, setSearchValue } from '../../store/reducers/searchSlice';
import { useState } from 'react';

export function Search() {
  const { search, limit } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(search);
  const navigate = useParamsNavigator();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchValue(inputValue));
    navigate(null, 1);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(e.target.value));
  };

  return (
    <div className={styles.search}>
      <h1 className={styles.searchHeading}>Find any anime!</h1>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <select defaultValue={limit} onChange={onSelectChange}>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
        <input value={inputValue} className={styles.searchInput} type='text' onChange={onInputChange} />
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}

import { ChangeEvent, MouseEvent, useState } from 'react';
import styles from './AutoInput.module.css';

interface IAutoInputProps {
  link?: (el: HTMLInputElement) => void;
  items: string[];
}

const AutoInput = ({ link, items }: IAutoInputProps) => {
  const [list, setList] = useState(items);
  const [isShown, setIsShown] = useState(false);
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    const newList = items.filter((item) => item.includes(val) && item !== val);
    setList(newList);
    setIsShown(true);
  };

  const onFocusHandler = () => {
    setIsShown(true);
  };

  const onBlurHandler = () => {
    setIsShown(false);
  };

  const selectCountry = (e: MouseEvent, val: string) => {
    setIsShown(true);
    e.preventDefault();
    setValue(val);
    setIsShown(false);
    const newList = items.filter((item) => item.includes(val) && item !== val);
    setList(newList);
  };

  return (
    <div className={styles.autoInput}>
      {isShown && (
        <ul className={styles.autoInput__list}>
          {list.map((item, i) => (
            <li onMouseDown={(e) => selectCountry(e, item)} className={styles.autoInput__item} key={i}>
              {item}
            </li>
          ))}
        </ul>
      )}
      <input
        value={value}
        ref={link}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        className={`input_text ${styles.input_auto}`}
        type='text'
      />
    </div>
  );
};

export default AutoInput;

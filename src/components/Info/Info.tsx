import React from 'react';
import styles from './info.module.css';
import { useAppSelector } from '../../store/store';

const Info = () => {
  const data = useAppSelector((state) => state.dataSlice);

  if (!data.isSubmited) {
    return <></>;
  }

  return (
    <div className={styles.info}>
      <h2 className={styles.info__head}>Information</h2>
      <div className={styles.info__wrapper}>
        <div className={styles.info__picture}>
          <img src={data.pictureValue} alt='Picture' />
        </div>
        <div className={styles.data}>
          <p className={styles.data__heading}>Personal data</p>
          <ul className={styles.data__list}>
            <li className={styles.data__listItem}>
              <span className={styles.data__span}>Name:</span> {data.nameValue}
            </li>
            <li className={styles.data__listItem}>
              <span className={styles.data__span}>Age:</span> {data.ageValue}
            </li>
            <li className={styles.data__listItem}>
              <span className={styles.data__span}>Email:</span> {data.emailValue}
            </li>
            <li className={styles.data__listItem}>
              <span className={styles.data__span}>Gender:</span> {data.genderValue}
            </li>
            <li className={styles.data__listItem}>
              <span className={styles.data__span}>Country:</span> {data.countryValue}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;

import styles from './info.module.css';
import { useAppSelector } from '../../store/store';
import { IData } from '../../store/reducers/dataSlice';
import classNames from 'classnames';

const Info = () => {
  const { isSubmited, arrData } = useAppSelector((state) => state.dataSlice);

  if (!isSubmited) {
    return <></>;
  }

  const parseDataItem = (data: IData) => {
    const infoItemLi = [
      {
        title: 'Name:',
        value: data.nameValue
      },
      {
        title: 'Age',
        value: data.ageValue
      },
      {
        title: 'Email:',
        value: data.emailValue
      },
      {
        title: 'Gender:',
        value: data.genderValue
      },
      {
        title: 'Country:',
        value: data.countryValue
      }
    ];

    return infoItemLi.map((item, i) => (
      <li key={i} className={styles.data__listItem}>
        <span className={styles.data__span}>{item.title}</span> {item.value}
      </li>
    ));
  };

  return (
    <div className={styles.info}>
      <div className={styles.info__wrapper}>
        <h2 className={styles.info__head}>Information</h2>
        <div className={styles.info__data}>
          {arrData.map((data, i) => (
            // <div className={styles.info__dataWrapper} key={i}>
            <div
              className={classNames(styles.info__dataWrapper, {
                [styles.info__first]: i === 0
              })}
              key={i}
            >
              <div className={styles.info__picture}>
                <img src={data.pictureValue} alt='Picture' />
              </div>
              <div className={styles.data}>
                <p className={styles.data__heading}>Personal data</p>
                <ul className={styles.data__list}>{parseDataItem(data)}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;

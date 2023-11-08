import React from 'react';
import styles from './DetailedAnimeItem.module.css';
import { IAnimeData } from '../../types/AnimeData';

interface IDetailedAnimeItemProps {
  anime: IAnimeData;
}

const DetailedAnimeItem = ({ anime: anime }: IDetailedAnimeItemProps) => {
  const detailItemLi = [
    {
      title: 'Episodes:',
      value: anime?.data?.episodes || 'Between 1 and infinity',
    },
    {
      title: 'Status:',
      value: anime?.data?.status || 'Got lost on the way',
    },
    {
      title: 'Rating:',
      value: anime?.data?.rating || 'For the whole family... Maybe...',
    },
    {
      title: 'Year:',
      value: anime?.data?.year || 'Who knows...',
    },
  ];

  return (
    <div className={styles.details__info}>
      <h2 className={styles.details__heading}>{anime?.data.title_english || anime?.data.title}</h2>
      <p className={styles.details__score}>
        Score of this anime is <strong>{anime?.data.score || 'Underestimated'}</strong>
      </p>
      <ul className={styles.details__list}>
        {detailItemLi.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> {item.value}
          </li>
        ))}
      </ul>
      <h2 className={styles.details__heading}>Synopsis</h2>
      <p className={styles.details__sinopsis}>{anime?.data.synopsis || 'No such thing'}</p>
    </div>
  );
};

export default DetailedAnimeItem;

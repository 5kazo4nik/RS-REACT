import React from 'react';
import styles from './DetailedAnimeItem.module.css';
import { IAnimeData } from '../../types/AnimeData';

interface IDetailedAnimeItemProps {
  anime: IAnimeData;
}

const DetailedAnimeItem = ({ anime: anime }: IDetailedAnimeItemProps) => {
  return (
    <div className={styles.details__info}>
      <h2 className={styles.details__heading}>{anime?.data.title_english || anime?.data.title}</h2>
      <p className={styles.details__score}>
        Score of this anime is <strong>{anime?.data.score}</strong>
      </p>
      <ul className={styles.details__list}>
        <li>
          <strong>Episodes:</strong> {anime?.data.episodes}.
        </li>
        <li>
          <strong>Status:</strong> {anime?.data.status}.
        </li>
        <li>
          <strong>Rating:</strong> {anime?.data.rating}.
        </li>
        <li>
          <strong>Year:</strong> {anime?.data.year || 'Who knows...'}.
        </li>
      </ul>
      <h2 className={styles.details__heading}>Synopsis</h2>
      <p className={styles.details__sinopsis}>{anime?.data.synopsis || 'No such thing'}</p>
    </div>
  );
};

export default DetailedAnimeItem;

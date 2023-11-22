import styles from './Details.module.css';
import { Loader } from '../../UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { animeApi } from '../../store/reducers/animeApi';
import DetailedAnimeItem from '../DetailedAnimeItem/DetailedAnimeItem';
import { useParamsNavigator } from '../../hooks/useNavigator';

const Details = () => {
  const { detail } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();

  const { isFetching: isLoading, isError, data } = animeApi.useGetAnimeQuery(detail || '1');

  const onButtonClose = () => {
    paramsNavigate('/', null, null, null, null);
  };

  return (
    <>
      {detail && (
        <div className={styles.details}>
          {isLoading && <Loader absolute />}
          <div className={styles.details__wrapper}>
            {!isError && data ? (
              <DetailedAnimeItem anime={data} />
            ) : (
              <h2 className='error-message'>Oops... Something went wrong...</h2>
            )}
            <button className={styles.button__close} onClick={onButtonClose}>
              Close details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;

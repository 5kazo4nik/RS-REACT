import styles from './Details.module.css';
import { Loader } from '../../UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import DetailedAnimeItem from '../DetailedAnimeItem/DetailedAnimeItem';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsDetailLoading } from '../../store/reducers/loaderSlice';

const Details = () => {
  const { detail } = useAppSelector((state) => state.query);
  const { detailMessage, isDetailLoading: isLoading } = useAppSelector((state) => state.loader);
  const { detailData: data } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();
  const paramsNavigate = useParamsNavigator();

  const onButtonClose = () => {
    paramsNavigate('/', null, null, null, null);
  };

  useEffect(() => {
    dispatch(setIsDetailLoading(false));
  }, [data, dispatch]);

  return (
    <>
      {detail && (
        <div className={styles.details}>
          {isLoading && <Loader absolute />}
          <div className={styles.details__wrapper}>
            {!detailMessage && data ? (
              <DetailedAnimeItem anime={data} />
            ) : (
              <h2 className='error-message'>Oops... Something went wrong... {detailMessage}</h2>
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

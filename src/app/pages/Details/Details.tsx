import styles from './Details.module.css';
import { Loader } from '../../UI/Loader/Loader';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { planetApi } from '../../store/reducers/planetsApi';

const Details = () => {
  const { detail } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();
  const { isFetching: isLoad, isError: message, data: searchResult } = planetApi.useGetPlanetQuery(detail || '1');

  const onBtnClose = () => {
    paramsNavigate('..', null, null);
  };

  return (
    <>
      {detail && (
        <div className={styles.details}>
          {isLoad && <Loader absolute />}
          <div className={styles.details__wrapper}>
            {!message ? (
              <div className={styles.details__info}>
                <h2 className={styles.details__heading}>{searchResult?.name}</h2>
                <p className={styles.details__diam}>
                  Diameter of this planet is <strong>{searchResult?.diameter} kilometers.</strong>
                </p>
                <ul className={styles.details__list}>
                  <li>
                    <strong>Orbital period:</strong> {searchResult?.orbital_period} days.
                  </li>
                  <li>
                    <strong>Population:</strong> {searchResult?.population} units.
                  </li>
                  <li>
                    <strong>Climate:</strong> {searchResult?.climate}.
                  </li>
                  <li>
                    <strong>Terrain:</strong> {searchResult?.terrain}.
                  </li>
                  <li>
                    <strong>Gravity:</strong> {searchResult?.gravity}.
                  </li>
                  <li>
                    <strong>Rotation period:</strong> {searchResult?.rotation_period}.
                  </li>
                </ul>
              </div>
            ) : (
              <h2 className='error-message'>Error: {message}</h2>
            )}
            <button className={styles.btn__close} onClick={onBtnClose}>
              Close details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;

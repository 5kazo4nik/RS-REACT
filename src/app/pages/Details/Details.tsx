import styles from './Details.module.css';
import { Loader } from '../../UI/Loader/Loader';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { useAppSelector } from '../../hooks/useAppSelector';
import { planetApi } from '../../store/reducers/planetsApi';
import DetailedPlanetItem from '../../components/DetailedPlanetItem/DetailedPlanetItem';
import { IPlanetData } from '../../types/PlanetsData';

const Details = () => {
  const { detail } = useAppSelector((state) => state.query);
  const paramsNavigate = useParamsNavigator();
  const { isFetching: isLoad, isError, data } = planetApi.useGetPlanetQuery(detail || '1');

  const onBtnClose = () => {
    paramsNavigate('..', null, null);
  };

  return (
    <>
      {detail && (
        <div className={styles.details}>
          {isLoad && <Loader absolute />}
          <div className={styles.details__wrapper}>
            {!isError ? (
              <DetailedPlanetItem planet={data as IPlanetData} />
            ) : (
              <h2 className='error-message'>Oops... Something went wrong...</h2>
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

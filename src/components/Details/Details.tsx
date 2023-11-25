import styles from './Details.module.css';
import DetailedAnimeItem from '../DetailedAnimeItem/DetailedAnimeItem';
import { useParamsNavigator } from '../../hooks/useNavigator';
import { IDetailPageProps } from '../../types/ServerSideProps';

interface IDetailsProps {
  data: IDetailPageProps;
}

const Details = ({ data }: IDetailsProps) => {
  const {
    detailData,
    detailMessage,
    query: { detail },
  } = data;

  const paramsNavigate = useParamsNavigator();

  const onButtonClose = () => {
    paramsNavigate('/', null, null, null, null);
  };

  return (
    <>
      {detail && (
        <div className={styles.details}>
          <div className={styles.details__wrapper}>
            {!detailMessage && data ? (
              <DetailedAnimeItem anime={detailData} />
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

import ControlledForm from '../../components/Forms/ControlledForm';
import styles from './Forms.module.css';

const ControlledPage = () => {
  return (
    <div className={`${styles.controlled} page`}>
      <div className='form-page__wrapper'>
        <h1 className='form__head'>Controlled form</h1>
        <ControlledForm />
      </div>
    </div>
  );
};

export default ControlledPage;

import { FormEvent, useRef } from 'react';
import { countryList } from '../../data/countryList';
import CustomInput from '../CustomInput/CustomInput';
import styles from './UncontrolledForm.module.css';
import { IRefsInputs } from '../../types/RefsInputs';

const UncontrolledForm = () => {
  const inputRefs = useRef<IRefsInputs>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputRefs.current);
  };

  return (
    <form className={`${styles.form} form`} onSubmit={handleSubmit}>
      <CustomInput head='Name:'>
        <input ref={(el) => (inputRefs.current.name = el)} className='input_text' type='text' />
      </CustomInput>

      <CustomInput head='Age:'>
        <input ref={(el) => (inputRefs.current.age = el)} className='input_text' type='number' min={1} />
      </CustomInput>

      <CustomInput head='Email:'>
        <input ref={(el) => (inputRefs.current.email = el)} className='input_text' type='text' />
      </CustomInput>

      <CustomInput head='Password:'>
        <input ref={(el) => (inputRefs.current.password = el)} className='input_text' type='password' />
      </CustomInput>

      <CustomInput head='Repeat password:'>
        <input ref={(el) => (inputRefs.current.secondPassword = el)} className='input_text' type='password' />
      </CustomInput>

      <CustomInput head='Gender:'>
        <select ref={(el) => (inputRefs.current.gender = el)} defaultValue='gender' className='input_select'>
          <option disabled value='gender'>
            Gender
          </option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </CustomInput>

      <CustomInput head='Picture:'>
        <input ref={(el) => (inputRefs.current.picture = el)} type='file' accept='image/jpeg, image/png' />
      </CustomInput>

      <CustomInput head='Country:'>
        <select ref={(el) => (inputRefs.current.country = el)} className='input_select' autoComplete='country-name'>
          {countryList.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </CustomInput>

      <CustomInput head='Accept T&C' inline>
        <input ref={(el) => (inputRefs.current.tc = el)} type='checkbox' />
      </CustomInput>

      <button className={`${styles.form__button_uncontrolled} form__button`} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;

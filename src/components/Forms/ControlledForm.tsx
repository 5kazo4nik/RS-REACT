import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { messages } from '../../data/validationMessages';
import CustomInput from '../CustomInput/CustomInput';
import AutoInput from '../AutoInput/AutoInput';
import { countryList } from '../../data/countryList';
import { formSchema } from '../../validation/inputsSchema';
import { useAppDispatch } from '../../store/store';
import { setData, setIsSubmited } from '../../store/reducers/dataSlice';
import { readAsyncPic } from '../../utils/readAsyncPic';
import { useNavigate } from 'react-router-dom';
import PasswordStr from '../PasswordStr/PasswordStr';

interface IValidatedData {
  age?: number;
  country?: string;
  email?: string;
  gender?: string;
  name?: string;
  password?: string;
  picture?: unknown;
  secondPassword?: string;
  tc?: boolean;
}

const ControlledForm = () => {
  const { handleSubmit, register, reset, formState, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const passwordValue = watch('password');

  const onSubmitForm = async (data: IValidatedData) => {
    const pictureValue = (await readAsyncPic((data.picture as FileList)[0])) as string;

    dispatch(
      setData({
        nameValue: data.name as string,
        ageValue: String(data.age),
        emailValue: data.email as string,
        passwordValue: data.password as string,
        genderValue: data.secondPassword as string,
        pictureValue,
        countryValue: data.country as string
      })
    );
    dispatch(setIsSubmited());
    navigate('/');
    reset();
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmitForm)}>
      <CustomInput
        head='Name:'
        message={messages.name}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.name}
      >
        <input {...register('name')} className='input_text' type='text' />
      </CustomInput>

      <CustomInput
        head='Age:'
        message={messages.age}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.age}
      >
        <input {...register('age')} className='input_text' type='number' min={1} />
      </CustomInput>

      <CustomInput
        head='Email:'
        message={messages.email}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.email}
      >
        <input {...register('email')} className='input_text' type='text' />
      </CustomInput>

      <CustomInput
        head='Password:'
        message={messages.password}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.password}
      >
        <input {...register('password')} className='input_text' type='password' />
        <PasswordStr value={passwordValue || ''} min={6} />
      </CustomInput>

      <CustomInput
        head='Repeat password:'
        message={messages.secondPassword}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.secondPassword}
      >
        <input {...register('secondPassword')} className='input_text' type='password' />
      </CustomInput>

      <CustomInput
        head='Gender:'
        message={messages.gender}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.gender}
      >
        <select {...register('gender')} defaultValue='gender' className='input_select'>
          <option disabled value='gender'>
            Gender
          </option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </CustomInput>

      <CustomInput
        head='Picture:'
        message={messages.picture}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.picture}
      >
        <input {...register('picture')} type='file' accept='image/jpeg, image/png' />
      </CustomInput>

      <CustomInput
        head='Country:'
        message={messages.country}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.country}
      >
        <AutoInput reg={register('country')} items={countryList} />
      </CustomInput>

      <CustomInput
        head='Accept T&C'
        inline
        message={messages.tc}
        isFirstSubmit={formState.isSubmitted}
        isValid={!formState.errors.tc}
      >
        <input {...register('tc', { validate: (value) => value === true })} type='checkbox' />
      </CustomInput>

      <button disabled={!formState.isValid} className='form__button' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;

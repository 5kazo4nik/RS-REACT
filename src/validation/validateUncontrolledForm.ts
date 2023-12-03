import {
  ageSchema,
  countrySchema,
  emailSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
  pictureSchema
} from './inputsSchema';

export const validateUncontrolledForm = async (
  name: string | null | undefined,
  age: string | null | undefined,
  email: string | null | undefined,
  password: string | null | undefined,
  secondPassword: string | null | undefined,
  gender: string | null | undefined,
  picture: FileList | null | undefined,
  tc: boolean | undefined,
  country: string | null | undefined
) => {
  const isValidName = await nameSchema.isValid(name);
  const isValidAge = await ageSchema.isValid(age && +age);
  const isValidEmail = await emailSchema.isValid(email);
  const isValidPassword = await passwordSchema.isValid(password);
  const isValidSecPassword = password === secondPassword;
  const isValidGender = await genderSchema.isValid(gender);
  const isValidPicture = await pictureSchema.isValid(picture);
  const isValidCountry = await countrySchema.isValid(country);

  const isAllValid =
    isValidName &&
    isValidAge &&
    isValidEmail &&
    isValidPassword &&
    isValidSecPassword &&
    isValidGender &&
    isValidPicture &&
    !!tc;

  return {
    name: isValidName,
    age: isValidAge,
    email: isValidEmail,
    password: isValidPassword,
    secondPassword: isValidSecPassword,
    gender: isValidGender,
    picture: isValidPicture,
    country: isValidCountry,
    tc: !!tc,
    isAllValid
  };
};

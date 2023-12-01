import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDataSlice {
  nameValue: string;
  ageValue: string;
  emailValue: string;
  passwordValue: string;
  genderValue: string;
  pictureValue: string;
  countryValue: string;
}

const initialState = {
  nameValue: '',
  ageValue: '',
  emailValue: '',
  passwordValue: '',
  genderValue: '',
  pictureValue: '',
  countryValue: '',
  isSubmited: false
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setIsSubmited(state) {
      state.isSubmited = true;
    },

    setData(state, action: PayloadAction<IDataSlice>) {
      return { ...state, ...action.payload };
    }
  }
});

export default dataSlice.reducer;
export const { setData, setIsSubmited } = dataSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IData {
  nameValue: string;
  ageValue: string;
  emailValue: string;
  passwordValue: string;
  genderValue: string;
  pictureValue: string;
  countryValue: string;
}

const initialState = {
  arrData: [] as IData[],
  isSubmited: false
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setIsSubmited(state) {
      state.isSubmited = true;
    },

    setData(state, action: PayloadAction<IData>) {
      state.arrData.unshift(action.payload);
    }
  }
});

export default dataSlice.reducer;
export const { setData, setIsSubmited } = dataSlice.actions;

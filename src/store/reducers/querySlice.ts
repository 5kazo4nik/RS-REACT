import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IQueryParamsState {
  page: number;
  detail?: string;
}

const initialState: IQueryParamsState = {
  page: 1,
};

const queryParamsSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<IQueryParamsState>) {
      state.detail = action.payload.detail;
      if (action.payload.page) {
        state.page = Number(action.payload.page);
      }
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload,
  //     };
  //   },
  // },
});

export default queryParamsSlice.reducer;
export const { setQuery } = queryParamsSlice.actions;

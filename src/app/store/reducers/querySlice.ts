import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IParsedQuery } from '../../components/Main/Main';

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
    setQuery(state, action: PayloadAction<IParsedQuery>) {
      state.detail = action.payload.detail;
      if (action.payload.page) {
        state.page = Number(action.payload.page);
      }
    },
  },
});

export default queryParamsSlice.reducer;
export const { setQuery } = queryParamsSlice.actions;

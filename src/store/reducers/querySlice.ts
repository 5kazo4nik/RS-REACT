import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface IQueryParamsState {
  detail?: string;
  page: number;
  search: string;
  limit: string;
}

export interface IQueryParams {
  detail?: string;
  page?: number;
  search?: string;
  limit?: string;
}

const initialState: IQueryParamsState = {
  page: 1,
  search: '',
  limit: '5',
};

const queryParamsSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<IQueryParams>) {
      if (action.payload.detail) state.detail = action.payload.detail;
      state.page = Number(action.payload.page) || 1;
      state.limit = action.payload.limit || '5';
      state.search = action.payload.search || '';
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.query,
      };
    },
  },
});

export default queryParamsSlice.reducer;
export const { setQuery } = queryParamsSlice.actions;

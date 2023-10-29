import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchData } from '../../types/PlanetsData';

export interface ISearchState {
  result: ISearchData | null;
  search: string;
}

const initialState: ISearchState = {
  result: null,
  search: localStorage.getItem('search') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      localStorage.setItem('search', action.payload);
      state.search = action.payload;
    },

    setResult(state, action: PayloadAction<ISearchData | null>) {
      state.result = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchValue, setResult } = searchSlice.actions;

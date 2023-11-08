import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchData } from '../../types/AnimeData';

export interface ISearchState {
  result: ISearchData | null;
  search: string;
  limit: number;
}

const initialState: ISearchState = {
  result: null,
  search: localStorage.getItem('search') || '',
  limit: 5,
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

    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchValue, setResult, setLimit } = searchSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnimeData, ISearchData } from '../../types/AnimeData';
import { HYDRATE } from 'next-redux-wrapper';

interface IDataState {
  animeData: ISearchData | null;
  detailData: IAnimeData | null;
}

const initialState: IDataState = {
  animeData: null,
  detailData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAnimeData(state, action: PayloadAction<ISearchData | null>) {
      state.animeData = action.payload;
    },

    setDetailData(state, action: PayloadAction<IAnimeData | null>) {
      state.detailData = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
  },
});

export default dataSlice.reducer;
export const { setAnimeData, setDetailData } = dataSlice.actions;

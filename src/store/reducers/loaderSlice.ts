import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface ILoaderState {
  isAnimeLoading: boolean;
  isDetailLoading: boolean;
  animeMessage: string;
  detailMessage: string;
}

const initialState: ILoaderState = {
  isAnimeLoading: false,
  isDetailLoading: false,
  animeMessage: '',
  detailMessage: '',
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setIsAnimeLoading(state, action: PayloadAction<boolean>) {
      state.isAnimeLoading = action.payload;
    },

    setIsDetailLoading(state, action: PayloadAction<boolean>) {
      state.isDetailLoading = action.payload;
    },

    setAnimeMessage(state, action: PayloadAction<string>) {
      state.animeMessage = action.payload;
    },

    setDetailMessage(state, action: PayloadAction<string>) {
      state.animeMessage = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.loader,
      };
    },
  },
});

export default loaderSlice.reducer;
export const { setIsAnimeLoading, setIsDetailLoading, setAnimeMessage, setDetailMessage } = loaderSlice.actions;

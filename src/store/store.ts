import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import query from './reducers/querySlice';
import search from './reducers/searchSlice';
import { animeApi } from './reducers/animeApi';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  query,
  search,
  [animeApi.reducerPath]: animeApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
  });
};
// export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
//     preloadedState,
//   });
// };

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(setupStore);

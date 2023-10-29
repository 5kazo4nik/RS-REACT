import { combineReducers, configureStore } from '@reduxjs/toolkit';
import query from './reducers/querySlice';
import search from './reducers/searchSlice';
import { planetApi } from './reducers/planetsApi';

const rootReducer = combineReducers({
  query,
  search,
  [planetApi.reducerPath]: planetApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(planetApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

import { configureStore } from '@reduxjs/toolkit';
import { mapReducer } from '../components/Map/mapSlice';
import { storeAPI } from '../api/store';

const store = configureStore({
  reducer: {
    map: mapReducer,
    [storeAPI.reducerPath]: storeAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(storeAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

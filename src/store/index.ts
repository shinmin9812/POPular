import { configureStore } from '@reduxjs/toolkit';
import CommunitySlice from '../components/Community/CommunitySlice';
import WritePostSlice from '../components/WritePost/WritePostSlice';
import UserSlice from '../components/User/UserSlice';
import { mapReducer } from '../components/Map/mapSlice';
import { storeAPI } from '../api/store';

const store = configureStore({
  reducer: {
    map: mapReducer,
    CommunitySlice,
    WritePostSlice,
    UserSlice,
    [storeAPI.reducerPath]: storeAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(storeAPI.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

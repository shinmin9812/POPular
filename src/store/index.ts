import { configureStore } from '@reduxjs/toolkit';
import CommunitySlice from '../components/Community/CommunitySlice';
import WritePostSlice from '../components/WritePost/WritePostSlice';
import UserSlice from '../components/User/UserSlice';
import { api } from '../api/useQueries';

const store = configureStore({
  reducer: {
    CommunitySlice,
    WritePostSlice,
    UserSlice,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

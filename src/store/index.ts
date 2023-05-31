import { configureStore } from '@reduxjs/toolkit';
import CommunitySlice from '../components/Community/CommunitySlice';
const store = configureStore({
  reducer: {CommunitySlice},
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
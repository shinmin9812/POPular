import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../components/User/UserSlice';

const store = configureStore({
  reducer: { UserSlice },
});

export default store;

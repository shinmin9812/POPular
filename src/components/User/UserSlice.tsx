import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface Props {
  user: User | null;
  filter: string | number | readonly string[] | undefined;
}

const initialState: Props = {
  user: null,
  filter: 'desc',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { setFilter, setUser, deleteUser } = UserSlice.actions;
export default UserSlice.reducer;

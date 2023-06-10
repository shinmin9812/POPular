import { createSlice } from '@reduxjs/toolkit';

interface Props {
  filter: string | number | readonly string[] | undefined;
}

const initialState: Props = {
  filter: 'newest',
};

// eslint-disable-next-line react-refresh/only-export-components
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = UserSlice.actions;
export default UserSlice.reducer;

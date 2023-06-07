import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/post';

const loadPost = createAsyncThunk('UserSlice/loadPost', async () => {
  try {
    const response = await fetch(`/post/all`);
    const data: Post[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

interface Props {
  filter: string | number | readonly string[] | undefined;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null;
  loadList: Post[];
}

const initialState: Props = {
  filter: 'newest',
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadList: [],
};

const UserSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
        state.loadPostDone = false;
        state.loadPostError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostDone = true;
        state.loadList = [...state.loadList, ...action.payload];
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error.message || 'Unknown error occurred';
      }),
});

export const { setFilter } = UserSlice.actions;
export default UserSlice.reducer;
export { loadPost };

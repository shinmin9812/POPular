import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  tab: '자유게시판',
  postContent: '',
  rating: 1,
};

const WritePostSlice = createSlice({
  name: 'writePost',
  initialState,
  reducers: {
    setTab(state, action) {
      state.tab = action.payload;
    },
    setPostContent(state, action) {
      state.postContent = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
  },
});

const WritePostSliceActions = WritePostSlice.actions;

export { WritePostSliceActions };
export default WritePostSlice.reducer;

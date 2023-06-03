import { createSlice } from '@reduxjs/toolkit';
const Today = new Date();

const initialState = {
  tab: '자유게시판',
  postContent: '',
  rating: 1,
  filter: {
    address: '지역',
    category: '카테고리',
    duration: {
      show: false,
      StartDate: { year: Today.getFullYear(), month: Today.getMonth(), day: Today.getDay() },
      endDate: { year: Today.getFullYear(), month: Today.getMonth(), day: Today.getDay() },
    },
  },
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

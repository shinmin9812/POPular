import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: '전체',
  filter: {
    address: '지역',
    category: '카테고리',
    duration: { show: false, date: new Date().toString() },
  },
  page: 1,
};

const CommunitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setTab(state, action) {
      state.tab = action.payload;
    },
    setFilterAddress(state, action) {
      state.filter.address = action.payload;
    },
    setFilterCategory(state, action) {
      state.filter.category = action.payload;
    },
    setFilterDuration(state, action) {
      state.filter.duration.date = action.payload;
    },
    setFilterDurationShow(state, action) {
      state.filter.duration.show = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

const communityActions = CommunitySlice.actions;

export { communityActions };
export default CommunitySlice.reducer;

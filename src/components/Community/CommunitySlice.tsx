import { createSlice } from '@reduxjs/toolkit';

const Today = new Date();

const initialState = {
  tab: '전체',
  filter: {
    address: '지역',
    category: '카테고리',
    duration: {
      show: false,
      StartDate: { year: Today.getFullYear(), month: Today.getMonth(), day: Today.getDay() },
      endDate: { year: Today.getFullYear(), month: Today.getMonth(), day: Today.getDay() },
    },
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
    setFilterDurationYear(state, action) {
      if (action.payload.start) {
        state.filter.duration.StartDate.year = action.payload.date;
      } else {
        state.filter.duration.endDate.year = action.payload.date;
      }
    },
    setFilterDurationMonth(state, action) {
      if (action.payload.start) {
        state.filter.duration.StartDate.month = action.payload.date;
      } else {
        state.filter.duration.endDate.month = action.payload.date;
      }
    },
    setFilterDurationDay(state, action) {
      if (action.payload.start) {
        state.filter.duration.StartDate.day = action.payload.date;
      } else {
        state.filter.duration.endDate.day = action.payload.date;
      }
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

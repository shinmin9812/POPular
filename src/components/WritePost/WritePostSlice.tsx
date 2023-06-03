import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import useFilterActions from '../../Hooks/useFilterActions';
import useSetTabAction from '../../Hooks/useTabsActions';

export interface WritePostInitialState {
  tab: string;
  postContent: string;
  rating: number;
  filter: {
    address: string;
    category: string;
    duration: {
      show: boolean;
      StartDate: {
        year: number;
        month: number;
        day: number;
      };
      endDate: {
        year: number;
        month: number;
        day: number;
      };
    };
  };
}

export interface SetDate {
  start: boolean;
  date: number;
}

const Today = new Date();

const initialState: WritePostInitialState = {
  tab: '자유게시판',
  postContent: '',
  rating: 1,
  filter: {
    address: '지역',
    category: '카테고리',
    duration: {
      show: false,
      StartDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
      endDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
    },
  },
};

const WritePostSlice = createSlice({
  name: 'writePost',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      useSetTabAction.setTab(state, action);
    },
    setFilterAddress(state, action: PayloadAction<string>) {
      useFilterActions.setFilterAddress(state, action);
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      useFilterActions.setFilterCategory(state, action);
    },
    setFilterDurationYear(state, action: PayloadAction<SetDate>) {
      useFilterActions.setFilterDurationYear(state, action);
    },
    setFilterDurationMonth(state, action: PayloadAction<SetDate>) {
      useFilterActions.setFilterDurationMonth(state, action);
    },
    setFilterDurationDay(state, action: PayloadAction<SetDate>) {
      useFilterActions.setFilterDurationDay(state, action);
    },
    setFilterDurationShow(state, action: PayloadAction<boolean>) {
      useFilterActions.setFilterDurationShow(state, action);
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

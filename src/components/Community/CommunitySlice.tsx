import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import useFilterActions from '../../Hooks/useFilterActions';
import useSetTabAction from '../../Hooks/useTabsActions';

export interface initialState {
  tab: string;
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
  page: number;
}

export interface SetDate {
  start: boolean;
  date: number;
}

const Today: Date = new Date();

const initialState: initialState = {
  tab: '전체',
  filter: {
    address: '지역',
    category: '카테고리',
    duration: {
      show: false,
      StartDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
      endDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
    },
  },
  page: 1,
};

const CommunitySlice = createSlice({
  name: 'community',
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
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

const communityActions = CommunitySlice.actions;

export { communityActions };
export default CommunitySlice.reducer;

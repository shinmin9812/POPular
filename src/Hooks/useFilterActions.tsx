import { PayloadAction } from '@reduxjs/toolkit';
import { CommunityInitialState, SetDate } from '../components/Community/CommunitySlice';
import { WritePostInitialState } from '../components/WritePost/WritePostSlice';

type initialState = CommunityInitialState | WritePostInitialState;

const useFilterActions = {
  setFilterAddress(state: initialState, action: PayloadAction<string>) {
    state.filter.address = action.payload;
  },
  setFilterCategory(state: initialState, action: PayloadAction<string>) {
    state.filter.category = action.payload;
  },
  setFilterDurationYear(state: initialState, action: PayloadAction<SetDate>) {
    if (action.payload.start) {
      state.filter.duration.StartDate.year = action.payload.date;
    } else {
      state.filter.duration.endDate.year = action.payload.date;
    }
  },
  setFilterDurationMonth(state: initialState, action: PayloadAction<SetDate>) {
    if (action.payload.start) {
      state.filter.duration.StartDate.month = action.payload.date;
    } else {
      state.filter.duration.endDate.month = action.payload.date;
    }
  },
  setFilterDurationDay(state: initialState, action: PayloadAction<SetDate>) {
    if (action.payload.start) {
      state.filter.duration.StartDate.day = action.payload.date;
    } else {
      state.filter.duration.endDate.day = action.payload.date;
    }
  },
  setFilterDurationShow(state: initialState, action: PayloadAction<boolean>) {
    state.filter.duration.show = action.payload;
  },
};

export default useFilterActions;

import { PayloadAction } from '@reduxjs/toolkit';
import { CommunityInitialState } from '../components/Community/CommunitySlice';
import { WritePostInitialState } from '../components/WritePost/WritePostSlice';

type initialState = CommunityInitialState | WritePostInitialState;

const useSetTabAction = {
  setTab(state: initialState, action: PayloadAction<string>): void {
    state.tab = action.payload;
  },
};

export default useSetTabAction;

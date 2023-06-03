import { PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../components/Community/CommunitySlice';

const useSetTabAction = {
  setTab(state: initialState, action: PayloadAction<string>): void {
    state.tab = action.payload;
  },
};

export default useSetTabAction;

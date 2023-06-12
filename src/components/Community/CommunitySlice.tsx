import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommunityInitialState {
  tab: string;
  addressFilter: {
    value: string;
    use: boolean;
  };
  categoryFilter: {
    value: string;
    use: boolean;
  };
  durationFilter: {
    show: boolean;
    use: boolean;
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
  page: {
    currPage: number;
    totalPage: number[];
  };
}

export interface SetDate {
  year: number;
  month: number;
  day: number;
}

export interface SetFilter {
  filter: string;
  use: boolean;
}

const Today: Date = new Date();

const initialState: CommunityInitialState = {
  tab: '전체',
  addressFilter: {
    value: '지역',
    use: false,
  },
  categoryFilter: {
    value: '카테고리',
    use: false,
  },
  durationFilter: {
    show: false,
    use: false,
    StartDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
    endDate: { year: Today.getFullYear(), month: Today.getMonth() + 1, day: Today.getDate() },
  },
  page: {
    currPage: 1,
    totalPage: [1],
  },
};

const CommunitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page.currPage = action.payload;
    },
    setTotalPage(state, action: PayloadAction<number[]>) {
      state.page.totalPage = action.payload;
    },
    setFilterAddressValue(state, action: PayloadAction<string>) {
      state.addressFilter.value = action.payload;
    },
    setFilterAddressUse(state, action: PayloadAction<boolean>) {
      state.addressFilter.use = action.payload;
    },
    setFilterCategoryValue(state, action: PayloadAction<string>) {
      state.categoryFilter.value = action.payload;
    },
    setFilterCategoryUse(state, action: PayloadAction<boolean>) {
      state.categoryFilter.use = action.payload;
    },
    setFilterStartDate(state, action: PayloadAction<SetDate>) {
      state.durationFilter.StartDate = action.payload;
    },
    setFilterEndDate(state, action: PayloadAction<SetDate>) {
      state.durationFilter.endDate = action.payload;
    },
    setFilterDurationUse(state, action: PayloadAction<boolean>) {
      state.durationFilter.use = action.payload;
    },
    setFilterDurationShow(state, action: PayloadAction<boolean>) {
      state.durationFilter.show = action.payload;
    },
  },
});

const communityActions = CommunitySlice.actions;

export { communityActions };
export default CommunitySlice.reducer;

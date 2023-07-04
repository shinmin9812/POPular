import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const today = new Date().toISOString().slice(0, 10);

export interface CommunityInitialState {
  tab: string;
  searchValue: string;
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
    startDate: string;
    endDate: string;
  };
  page: {
    currPage: number;
    pageGroup: number[];
    totalPage: number[];
  };
}

export interface SetFilter {
  filter: string;
  use: boolean;
}

const initialState: CommunityInitialState = {
  tab: '전체게시판',
  searchValue: '',
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
    startDate: today,
    endDate: today,
  },
  page: {
    currPage: 1,
    pageGroup: [1],
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page.currPage = action.payload;
    },
    setPageGroup(state, action: PayloadAction<number[]>) {
      state.page.pageGroup = action.payload;
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
    setFilterStartDate(state, action: PayloadAction<string>) {
      state.durationFilter.startDate = action.payload;
    },
    setFilterEndDate(state, action: PayloadAction<string>) {
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

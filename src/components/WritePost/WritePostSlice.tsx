import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WritePostInitialState {
  tab: string;
  postTitle: string;
  postContent: string;
  ratings: number;
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
}

export interface SetDate {
  year: number;
  month: number;
  day: number;
}

const Today = new Date();

const initialState: WritePostInitialState = {
  tab: '자유게시판',
  postTitle: '',
  postContent: '',
  ratings: 0,
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
};

const WritePostSlice = createSlice({
  name: 'writePost',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
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

    setPostTitle(state, action) {
      state.postTitle = action.payload;
    },
    setPostContent(state, action) {
      state.postContent = action.payload;
    },
    setRating(state, action) {
      state.ratings = action.payload;
    },
  },
});

const WritePostSliceActions = WritePostSlice.actions;

export { WritePostSliceActions };
export default WritePostSlice.reducer;

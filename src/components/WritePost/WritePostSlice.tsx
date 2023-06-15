import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const today = new Date().toISOString().slice(0, 10);

export interface WritePostInitialState {
  tab: string;
  searchValue: string;
  postTitle: string;
  postContent: string;
  ratings: number;
  choiceStoreId: string;
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
  isUpdate: {
    use: boolean;
    id: string;
  };
}

export interface SetDate {
  year: number;
  month: number;
  day: number;
}

export interface isUpdate {
  use: boolean;
  id: string;
}

const initialState: WritePostInitialState = {
  tab: '자유게시판',
  postTitle: '',
  postContent: '',
  ratings: 1,
  choiceStoreId: '',
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
  isUpdate: {
    use: false,
    id: '',
  },
};

const WritePostSlice = createSlice({
  name: 'writePost',
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
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
    setPostTitle(state, action: PayloadAction<string>) {
      state.postTitle = action.payload;
    },
    setPostContent(state, action: PayloadAction<string>) {
      state.postContent = action.payload;
    },
    setRating(state, action: PayloadAction<number>) {
      state.ratings = action.payload;
    },
    setChoiceStoreId(state, action: PayloadAction<string>) {
      state.choiceStoreId = action.payload;
    },
    setIsUpdate(state, action: PayloadAction<isUpdate>) {
      state.isUpdate = action.payload;
    },
  },
});

const WritePostSliceActions = WritePostSlice.actions;

export { WritePostSliceActions };
export default WritePostSlice.reducer;

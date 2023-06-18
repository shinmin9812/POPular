import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getDateFunc from '../../utils/getDateFunc';
const today = getDateFunc(new Date().toString());

const initialState = {
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
};

const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

const SearchSliceActions = SearchSlice.actions;

export { SearchSliceActions };
export default SearchSlice.reducer;

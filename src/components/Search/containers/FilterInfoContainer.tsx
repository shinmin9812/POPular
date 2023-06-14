import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import FilterInfo from '../../common/Filter/FilterInfo';
import { SearchSliceActions } from '../SearchSlice';
const FilterInfoContainer = () => {
  const dispatch = useAppDispatch();

  const addressFilter = useAppSelector((state) => state.SearchSlice.addressFilter);
  const categoryFilter = useAppSelector((state) => state.SearchSlice.categoryFilter);
  const durationFilter = useAppSelector((state) => state.SearchSlice.durationFilter);
  const setFilterAddressValue = (address: string) => dispatch(SearchSliceActions.setFilterAddressValue(address));
  const setFilterCategoryValue = (category: string) => dispatch(SearchSliceActions.setFilterCategoryValue(category));
  const setFilterAddressUse = (use: boolean) => dispatch(SearchSliceActions.setFilterAddressUse(use));
  const setFilterCategoryUse = (use: boolean) => dispatch(SearchSliceActions.setFilterCategoryUse(use));
  const setFilterDurationUse = (use: boolean) => dispatch(SearchSliceActions.setFilterDurationUse(use));
  return (
    <FilterInfo
      address={addressFilter}
      category={categoryFilter}
      setFilterAddressValue={setFilterAddressValue}
      setFilterCategoryValue={setFilterCategoryValue}
      setFilterAddressUse={setFilterAddressUse}
      setFilterCategoryUse={setFilterCategoryUse}
      setFilterDurationUse={setFilterDurationUse}
      durationFilterUse={durationFilter.use}
      startDate={durationFilter.startDate}
      endDate={durationFilter.endDate}
    />
  );
};

export default FilterInfoContainer;

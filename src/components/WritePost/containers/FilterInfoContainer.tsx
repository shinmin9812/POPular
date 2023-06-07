import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import FilterInfo from '../../common/Filter/FilterInfo';
import { WritePostSliceActions } from '../WritePostSlice';
const FilterInfoContainer = () => {
  const dispatch = useAppDispatch();

  const addressFilter = useAppSelector((state) => state.WritePostSlice.addressFilter);
  const categoryFilter = useAppSelector((state) => state.WritePostSlice.categoryFilter);
  const durationFilter = useAppSelector((state) => state.WritePostSlice.durationFilter);
  const setFilterAddressValue = (address: string) => dispatch(WritePostSliceActions.setFilterAddressValue(address));
  const setFilterCategoryValue = (category: string) => dispatch(WritePostSliceActions.setFilterCategoryValue(category));
  const setFilterAddressUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterAddressUse(use));
  const setFilterCategoryUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterCategoryUse(use));
  const setFilterDurationUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterDurationUse(use));
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
      startDate={durationFilter.StartDate}
      endDate={durationFilter.endDate}
    />
  );
};

export default FilterInfoContainer;

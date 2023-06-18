import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import FilterInfo from '../../common/Filter/FilterInfo';
import { communityActions } from '../CommunitySlice';

const FilterInfoContainer = () => {
  const dispatch = useAppDispatch();

  const addressFilter = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const categoryFilter = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const durationFilter = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const setFilterAddressValue = (address: string) => dispatch(communityActions.setFilterAddressValue(address));
  const setFilterCategoryValue = (category: string) => dispatch(communityActions.setFilterCategoryValue(category));
  const setFilterAddressUse = (use: boolean) => dispatch(communityActions.setFilterAddressUse(use));
  const setFilterCategoryUse = (use: boolean) => dispatch(communityActions.setFilterCategoryUse(use));
  const setFilterDurationUse = (use: boolean) => dispatch(communityActions.setFilterDurationUse(use));
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

import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import FilterInfo from '../../common/Filter/FilterInfo';

const FilterInfoContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  return (
    <FilterInfo
      address={filter.address}
      category={filter.category}
      startDate={filter.duration.StartDate}
      endDate={filter.duration.endDate}
    />
  );
};

export default FilterInfoContainer;

import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import FilterInfo from '../../common/FilterInfo';

const FilterInfoContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  return <FilterInfo address={filter.address} category={filter.category} />;
};

export default FilterInfoContainer;

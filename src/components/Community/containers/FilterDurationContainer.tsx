import FilterDuration from '../../common/FilterDuration';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';

const FilterDurationContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  const dispatch = useAppDispatch();
  const setFilterDurationShow = (show: boolean) => dispatch(communityActions.setFilterDurationShow(show));
  return (
    <FilterDuration
      show={filter.duration.show}
      setShow={() => {
        setFilterDurationShow(!filter.duration.show);
      }}
    />
  );
};

export default FilterDurationContainer;

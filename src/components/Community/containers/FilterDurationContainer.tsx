import FilterDuration from '../../common/Filter/FilterDuration';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';

const FilterDurationContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  const dispatch = useAppDispatch();
  const setDurationShow = (show: boolean) => dispatch(communityActions.setFilterDurationShow(show));
  const setDurationYear = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationYear({ date, start }));
  const setDurationMonth = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationMonth({ date, start }));
  const setDurationDay = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationDay({ date, start }));
  return (
    <FilterDuration
      show={filter.duration.show}
      setShow={() => {
        setDurationShow(!filter.duration.show);
      }}
      startDate={filter.duration.StartDate}
      endDate={filter.duration.endDate}
      setYear={setDurationYear}
      setMonth={setDurationMonth}
      setDay={setDurationDay}
    />
  );
};

export default FilterDurationContainer;

import FilterDuration from '../../common/Filter/FilterDuration';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';

const FilterDurationContainer = () => {
  const filter = useAppSelector((state) => state.WritePostSlice.filter);
  const dispatch = useAppDispatch();
  const setDurationShow = (show: boolean) => dispatch(WritePostSliceActions.setFilterDurationShow(show));
  const setDurationYear = (date: number, start = false) =>
    dispatch(WritePostSliceActions.setFilterDurationYear({ date, start }));
  const setDurationMonth = (date: number, start = false) =>
    dispatch(WritePostSliceActions.setFilterDurationMonth({ date, start }));
  const setDurationDay = (date: number, start = false) =>
    dispatch(WritePostSliceActions.setFilterDurationDay({ date, start }));
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

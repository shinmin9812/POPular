import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { SearchSliceActions } from '../SearchSlice';
import Filter from '../../common/Filter/Filter';
import FilterDuration from '../../common/Filter/FilterDuration';
import FilterBox from '../../common/Filter/FilterBox';
import { useState } from 'react';
import { address, category } from '../../../constants/filterOptions';

const FilterContainer = () => {
  const durationFilterValue = useAppSelector((state) => state.SearchSlice.durationFilter);
  const addressFilterValue = useAppSelector((state) => state.SearchSlice.addressFilter);
  const categoryFilterValue = useAppSelector((state) => state.SearchSlice.categoryFilter);
  const dispatch = useAppDispatch();
  //지역 필터
  const setFilterAddressValue = (address: string) => dispatch(SearchSliceActions.setFilterAddressValue(address));
  const setFilterAddressUse = (use: boolean) => dispatch(SearchSliceActions.setFilterAddressUse(use));
  //카테고리 필터
  const setFilterCategoryValue = (category: string) => dispatch(SearchSliceActions.setFilterCategoryValue(category));
  const setFilterCategoryUse = (use: boolean) => dispatch(SearchSliceActions.setFilterCategoryUse(use));
  //기간 필터
  const setStartDate = (date: string) => dispatch(SearchSliceActions.setFilterStartDate(date));
  const setEndDate = (date: string) => dispatch(SearchSliceActions.setFilterEndDate(date));
  const setFilterDurationUse = (use: boolean) => dispatch(SearchSliceActions.setFilterDurationUse(use));
  const setDurationShow = (show: boolean) => dispatch(SearchSliceActions.setFilterDurationShow(show));

  // redux 기간 설정 전 validation을 위한 상태
  const [startDateTarget, setStartDateTarget] = useState(durationFilterValue.startDate);
  // redux 기간 설정 전 validation을 위한 상태
  const [endDateTarget, setEndDateTarget] = useState(durationFilterValue.endDate);
  return (
    <FilterBox>
      <Filter
        value={categoryFilterValue.value}
        onChange={(e) => {
          setFilterCategoryValue(e.target.value);
          setFilterCategoryUse(true);
        }}
        Options={category}
        width={33}
      />
      <Filter
        value={addressFilterValue.value}
        onChange={(e) => {
          setFilterAddressValue(e.target.value);
          setFilterAddressUse(true);
        }}
        Options={address}
        width={33}
      />
      <FilterDuration
        setShow={() => {
          setDurationShow(!durationFilterValue.show);
        }}
        durationFilterValue={durationFilterValue}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setFilterDurationUse={setFilterDurationUse}
        startDateTarget={startDateTarget}
        setStartDateTarget={setStartDateTarget}
        endDateTarget={endDateTarget}
        setEndDateTarget={setEndDateTarget}
      />
    </FilterBox>
  );
};

export default FilterContainer;

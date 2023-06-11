import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import Filter from '../../common/Filter/Filter';
import FilterDuration from '../../common/Filter/FilterDuration';
import FilterBox from '../../common/Filter/FilterBox';
import { useState } from 'react';
import { address, category } from '../../../constants/filterOptions';

const FilterContainer = () => {
  const durationFilterValue = useAppSelector((state) => state.WritePostSlice.durationFilter);
  const addressFilterValue = useAppSelector((state) => state.WritePostSlice.addressFilter);
  const categoryFilterValue = useAppSelector((state) => state.WritePostSlice.categoryFilter);
  const Tab = useAppSelector((state) => state.WritePostSlice.tab);
  const dispatch = useAppDispatch();
  //지역 필터
  const setFilterAddressValue = (address: string) => dispatch(WritePostSliceActions.setFilterAddressValue(address));
  const setFilterAddressUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterAddressUse(use));
  //카테고리 필터
  const setFilterCategoryValue = (category: string) => dispatch(WritePostSliceActions.setFilterCategoryValue(category));
  const setFilterCategoryUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterCategoryUse(use));
  //기간 필터
  const setStartDate = (date: string) => dispatch(WritePostSliceActions.setFilterStartDate(date));
  const setEndDate = (date: string) => dispatch(WritePostSliceActions.setFilterEndDate(date));
  const setFilterDurationUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterDurationUse(use));
  const setDurationShow = (show: boolean) => dispatch(WritePostSliceActions.setFilterDurationShow(show));

  // redux 기간 설정 전 validation을 위한 상태
  const [startDateTarget, setStartDateTarget] = useState(durationFilterValue.StartDate);
  // redux 기간 설정 전 validation을 위한 상태
  const [endDateTarget, setEndDateTarget] = useState(durationFilterValue.endDate);

  const Today: Date = new Date();
  // 자유게시판으로 이동 시 필터 초기화
  if (Tab === '자유게시판') {
    setFilterAddressValue('지역');
    setFilterCategoryValue('카테고리');
    // setDurationYear(Today.getFullYear());
    // setDurationYear(Today.getFullYear(), true);
    // setDurationMonth(Today.getMonth() + 1);
    // setDurationMonth(Today.getMonth() + 1, true);
    // setDurationDay(Today.getDate());
    // setDurationDay(Today.getDate(), true);
    return <div></div>;
  } else {
    return (
      <FilterBox width={100}>
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
  }
};

export default FilterContainer;

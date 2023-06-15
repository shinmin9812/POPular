import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Filter from '../../common/Filter/Filter';
import FilterDuration from '../../common/Filter/FilterDuration';
import FilterBox from '../../common/Filter/FilterBox';
import { useState } from 'react';
import { address, category } from '../../../constants/filterOptions';
import { useEffect } from 'react';

const FilterContainer = () => {
  const durationFilterValue = useAppSelector((state) => state.CommunitySlice.durationFilter);
  const addressFilterValue = useAppSelector((state) => state.CommunitySlice.addressFilter);
  const categoryFilterValue = useAppSelector((state) => state.CommunitySlice.categoryFilter);
  const tab = useAppSelector((state) => state.CommunitySlice.tab);
  const dispatch = useAppDispatch();
  //지역 필터
  const setFilterAddressValue = (address: string) => dispatch(communityActions.setFilterAddressValue(address));
  const setFilterAddressUse = (use: boolean) => dispatch(communityActions.setFilterAddressUse(use));
  //카테고리 필터
  const setFilterCategoryValue = (category: string) => dispatch(communityActions.setFilterCategoryValue(category));
  const setFilterCategoryUse = (use: boolean) => dispatch(communityActions.setFilterCategoryUse(use));
  //기간 필터
  const setStartDate = (date: string) => dispatch(communityActions.setFilterStartDate(date));
  const setEndDate = (date: string) => dispatch(communityActions.setFilterEndDate(date));
  const setFilterDurationUse = (use: boolean) => dispatch(communityActions.setFilterDurationUse(use));
  const setDurationShow = (show: boolean) => dispatch(communityActions.setFilterDurationShow(show));

  // redux 기간 설정 전 validation을 위한 상태
  const [startDateTarget, setStartDateTarget] = useState(durationFilterValue.startDate);
  // redux 기간 설정 전 validation을 위한 상태
  const [endDateTarget, setEndDateTarget] = useState(durationFilterValue.endDate);
  // 자유게시판으로 이동 시 필터 초기화
  useEffect(() => {
    if (tab === '자유게시판') {
      setFilterAddressUse(false);
      setFilterCategoryUse(false);
      setFilterDurationUse(false);
      setFilterAddressValue('지역');
      setFilterCategoryValue('카테고리');
    }
  }, [tab]);
  if (tab === '자유게시판') {
    return <div></div>;
  } else {
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
  }
};

export default FilterContainer;

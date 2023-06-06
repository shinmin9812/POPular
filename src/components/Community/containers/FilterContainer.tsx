import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Filter from '../../common/Filter/Filter';
import FilterDuration from '../../common/Filter/FilterDuration';
import WriteButton from '../components/WriteButton';
import FilterBox from '../../common/Filter/FilterBox';

const FilterContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  const Tab = useAppSelector((state) => state.CommunitySlice.tab);
  const dispatch = useAppDispatch();
  const setFilterAddress = (address: string) => dispatch(communityActions.setFilterAddress(address));
  const setFilterCategory = (category: string) => dispatch(communityActions.setFilterCategory(category));
  const setDurationShow = (show: boolean) => dispatch(communityActions.setFilterDurationShow(show));
  const setDurationYear = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationYear({ date, start }));
  const setDurationMonth = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationMonth({ date, start }));
  const setDurationDay = (date: number, start = false) =>
    dispatch(communityActions.setFilterDurationDay({ date, start }));
  const Today: Date = new Date();
  // 자유게시판으로 이동 시 필터 초기화
  if (Tab === '자유게시판') {
    setFilterAddress('지역');
    setFilterCategory('카테고리');
    setDurationYear(Today.getFullYear());
    setDurationYear(Today.getFullYear(), true);
    setDurationMonth(Today.getMonth() + 1);
    setDurationMonth(Today.getMonth() + 1, true);
    setDurationDay(Today.getDate());
    setDurationDay(Today.getDate(), true);
    return <div></div>;
  } else {
    return (
      <FilterBox>
        <Filter
          value={filter.category}
          onChange={(e) => {
            setFilterCategory(e.target.value);
          }}
          Options={['카테고리', '의류', '주류', '캐릭터']}
          width={23}
        />
        <Filter
          value={filter.address}
          onChange={(e) => {
            setFilterAddress(e.target.value);
          }}
          Options={[
            '지역',
            '서울',
            '강남구/서초구',
            '용산구/중구/종로구/성북구',
            '영등포/구로구',
            '동작구/관악구/금천구',
            '노원구/도봉구/강북구',
            '성동구/광진구',
            '강동구/송파구',
            '마포구/서대문구/은평구',
            '동대문구/중랑구',
            '강서구/양천구',
            '부산',
            '대구',
            '인천',
            '광주',
            '대전',
            '울산',
            '세종',
            '경기도',
            '강원도',
            '충청도',
            '전라북도',
            '전라남도',
            '경상북도',
            '경상남도',
            '제주',
          ]}
          width={23}
        />
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
        <WriteButton />
      </FilterBox>
    );
  }
};

export default FilterContainer;

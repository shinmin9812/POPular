import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';
import Filter from '../../common/Filter';
const FilterContainer = () => {
  const filter = useAppSelector((state) => state.CommunitySlice.filter);
  const dispatch = useAppDispatch();
  const setFilterAddress = (address: string) => dispatch(communityActions.setFilterAddress(address));
  const setFilterCategory = (category: string) => dispatch(communityActions.setFilterCategory(category));
  const setFilterDuration = (duration: string) => dispatch(communityActions.setFilterDuration(duration));

  return (
    <div>
      <Filter
        value={filter.address}
        onChange={(e) => {
          setFilterAddress(e.target.value);
        }}
        Options={['지역', '서울', '경기도', '충청남도']}
      />
      <Filter
        value={filter.category}
        onChange={(e) => {
          setFilterCategory(e.target.value);
        }}
        Options={['카테고리', '의류', '주류', '캐릭터']}
      />{' '}
      <Filter
        value={filter.duration}
        onChange={(e) => {
          setFilterDuration(e.target.value);
        }}
        Options={['기간', '어', '경기도', '충청남도']}
      />
    </div>
  );
};

export default FilterContainer;

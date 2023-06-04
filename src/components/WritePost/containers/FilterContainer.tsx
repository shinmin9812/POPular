import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import Filter from '../../common/Filter/Filter';
import FilterDurationContainer from './FilterDurationContainer';
const FilterContainer = () => {
  const filter = useAppSelector((state) => state.WritePostSlice.filter);
  const dispatch = useAppDispatch();
  const setFilterAddress = (address: string) => dispatch(WritePostSliceActions.setFilterAddress(address));
  const setFilterCategory = (category: string) => dispatch(WritePostSliceActions.setFilterCategory(category));

  return (
    <span>
      <Filter
        value={filter.category}
        onChange={(e) => {
          setFilterCategory(e.target.value);
        }}
        Options={['카테고리', '의류', '주류', '캐릭터']}
        width={24}
      />
      <Filter
        value={filter.address}
        onChange={(e) => {
          setFilterAddress(e.target.value);
        }}
        Options={['지역', '서울', '경기도', '충청남도']}
        width={24}
      />
      <FilterDurationContainer />
    </span>
  );
};

export default FilterContainer;

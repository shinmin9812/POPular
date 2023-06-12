import FilterAndWriteButtonWrap from '../components/FilterAndWriteWrap';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';

const FilterAndWriteButtonWrapContainer = ({ children }: { children: JSX.Element[] }) => {
  const Tab = useAppSelector((state) => state.CommunitySlice.tab);
  1;
  const isFreeTab = Tab === '자유게시판';
  return <FilterAndWriteButtonWrap isFreeTab={isFreeTab}>{children}</FilterAndWriteButtonWrap>;
};

export default FilterAndWriteButtonWrapContainer;

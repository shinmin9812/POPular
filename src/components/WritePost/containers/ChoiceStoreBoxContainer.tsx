import SearchContainerWrap from '../../common/SearchInput/SearchInput';
import FilterContainer from './FilterContainer';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';

const ChoiceStoreBoxContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);

  if (tab !== '자유게시판') {
    return (
      <div>
        <SearchContainerWrap placeholder={'스토어를 검색해주세요.'} />
        <FilterContainer />
      </div>
    );
  } else return <div></div>;
};

export default ChoiceStoreBoxContainer;

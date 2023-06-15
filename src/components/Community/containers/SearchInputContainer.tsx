import SearchInput from '../../common/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { communityActions } from '../CommunitySlice';

const SearchInputContainer = () => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.CommunitySlice.searchValue);
  const setSearchValue = (value: string) => dispatch(communityActions.setSearchValue(value));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return <SearchInput placeholder="제목을 검색해주세요" value={searchValue} onChange={handleInputChange} />;
};

export default SearchInputContainer;

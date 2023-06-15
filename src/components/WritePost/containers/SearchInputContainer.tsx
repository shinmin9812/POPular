import SearchInput from '../../common/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';

const SearchInputContainer = () => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.WritePostSlice.searchValue);
  const setSearchValue = (value: string) => dispatch(WritePostSliceActions.setSearchValue(value));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return <SearchInput placeholder="스토어를 검색해주세요." value={searchValue} onChange={handleInputChange} />;
};

export default SearchInputContainer;

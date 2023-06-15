import SearchInput from '../../common/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { SearchSliceActions } from '../SearchSlice';

const SearchInputContainer = () => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.SearchSlice.searchValue);
  const setSearchValue = (value: string) => dispatch(SearchSliceActions.setSearchValue(value));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // const handleInputKeyPress = (e: { code: string }) => {
  //   if (e.code === 'Enter' || searchValue) {
  //     setSearchValue(inputValue);
  //   }
  // };

  return <SearchInput placeholder="검색" value={searchValue} onChange={handleInputChange} />;
};

export default SearchInputContainer;

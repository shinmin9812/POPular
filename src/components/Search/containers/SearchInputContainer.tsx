import SearchInput from '../../common/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../../Hooks/useSelectorHooks';
import { SearchSliceActions } from '../SearchSlice';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SearchInputContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const searchValue = useAppSelector((state) => state.SearchSlice.searchValue);
  const setSearchValue = (value: string) => dispatch(SearchSliceActions.setSearchValue(value));

  useEffect(() => {
    if (location.state && location.state.value) {
      dispatch(setSearchValue(location.state.value));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return <SearchInput placeholder="제목을 검색해주세요" value={searchValue} onChange={handleInputChange} />;
};

export default SearchInputContainer;

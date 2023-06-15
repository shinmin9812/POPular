import FilterContainer from './FilterContainer';
import FilterInfoContainer from './FilterInfoContainer';
import ChoiceStoreItemContainer from './ChoiceStoreItemContainer';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import { useState, useEffect } from 'react';
import StoreItem from '../../common/Store/StoreItem';
import { Store } from '../../../types/store';
import filterFunc from '../../../utils/filterFunc';
import ChoiceStoreList from '../components/ChoiceStoreList';
import ChoiceStoreBox from '../components/ChoiceStoreBox';
import { API_PATH } from '../../../constants/path';
import SearchInputContainer from './SearchInputContainer';
import searchFilter from '../../../utils/SearchFilter';

const ChoiceStoreBoxContainer = () => {
  const choiceStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);
  const dispatch = useAppDispatch();
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const searchValue = useAppSelector((state) => state.WritePostSlice.searchValue);
  const filterCategory = useAppSelector((state) => state.WritePostSlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.WritePostSlice.addressFilter);
  const filterDate = useAppSelector((state) => state.WritePostSlice.durationFilter);
  const setFilterCategoryUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterCategoryUse(use));
  const setFilterAddressUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterAddressUse(use));
  const setFilterDurationUse = (use: boolean) => dispatch(WritePostSliceActions.setFilterDurationUse(use));
  const setFilterCategoryValue = (category: string) => dispatch(WritePostSliceActions.setFilterCategoryValue(category));
  const setFilterAddressValue = (address: string) => dispatch(WritePostSliceActions.setFilterAddressValue(address));
  let storeList: Store[] = [];
  const [stores, setStores] = useState<Store[]>();
  async function fetchData() {
    const response = await fetch(API_PATH.STORE.GET.ALL);
    const result = await response.json();
    setStores(result);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue.length > 0) {
      setFilterCategoryUse(false);
      setFilterAddressUse(false);
      setFilterDurationUse(false);
      setFilterCategoryValue('카테고리');
      setFilterAddressValue('지역');
    }
  }, [searchValue]);

  if (stores) {
    if (choiceStoreId && choiceStoreId.length > 0) {
      storeList = stores.filter((store) => store._id === choiceStoreId);
    } else if (searchValue.length > 0) {
      storeList = searchFilter(stores, searchValue);
    } else {
      storeList = filterFunc(stores, filterAddress, filterCategory, filterDate, choiceStoreId);
    }
  }

  return (
    <ChoiceStoreBox>
      <SearchInputContainer />
      <FilterContainer />
      <FilterInfoContainer />
      <ChoiceStoreList choice={choiceStoreId.length > 0}>
        {storeList ? (
          storeList.map((store: Store) => (
            <ChoiceStoreItemContainer key={store._id} setChoiceStoreId={setChoiceStoreId} storeId={store._id}>
              <StoreItem store={store} />
            </ChoiceStoreItemContainer>
          ))
        ) : (
          <li></li>
        )}
      </ChoiceStoreList>
    </ChoiceStoreBox>
  );
};

export default ChoiceStoreBoxContainer;

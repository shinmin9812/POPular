import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { API_PATH, CLIENT_PATH } from '../../../constants/path';
import { Store } from '../../../types/store';
import StoreItem from '../../common/Store/StoreItem';
import filterFunc from '../../../utils/filterFunc';
import { Link } from 'react-router-dom';
import searchFilter from '../../../utils/SearchFilter';
import { SearchSliceActions } from '../SearchSlice';

async function fetchData(setStores: (stores: Store[]) => void) {
  const response = await fetch(API_PATH.STORE.GET.ALL);
  const result = await response.json();
  setStores(result);
}

const SearchStoreListContainer = () => {
  const [stores, setStores] = useState<Store[]>();
  const filterDate = useAppSelector((state) => state.SearchSlice.durationFilter);
  const filterAddress = useAppSelector((state) => state.SearchSlice.addressFilter);
  const filterCategory = useAppSelector((state) => state.SearchSlice.categoryFilter);
  const dispatch = useAppDispatch();
  const setFilterCategoryUse = (use: boolean) => dispatch(SearchSliceActions.setFilterCategoryUse(use));
  const setFilterAddressUse = (use: boolean) => dispatch(SearchSliceActions.setFilterAddressUse(use));
  const setFilterDurationUse = (use: boolean) => dispatch(SearchSliceActions.setFilterDurationUse(use));
  const setFilterCategoryValue = (category: string) => dispatch(SearchSliceActions.setFilterCategoryValue(category));
  const setFilterAddressValue = (address: string) => dispatch(SearchSliceActions.setFilterAddressValue(address));

  const searchValue = useAppSelector((state) => state.SearchSlice.searchValue);

  useEffect(() => {
    fetchData(setStores);
  }, []);
  let array: Store[] | undefined;
  useEffect(() => {
    if (searchValue.length > 0) {
      setFilterCategoryUse(false);
      setFilterAddressUse(false);
      setFilterDurationUse(false);
      setFilterCategoryValue('카테고리');
      setFilterAddressValue('지역');
    }
  }, [searchValue]);

  if (searchValue.length > 0) {
    array = stores && searchFilter(stores, searchValue);
  } else {
    array = stores && filterFunc(stores, filterAddress, filterCategory, filterDate);
  }

  return (
    <ul>
      {array ? (
        array.map((store: Store) => (
          <li key={store._id}>
            <Link to={CLIENT_PATH.STORE_DETAIL.replace(':storeId', store._id)}>
              <StoreItem store={store} />
            </Link>
          </li>
        ))
      ) : (
        <li>loading...</li>
      )}
    </ul>
  );
};

export default SearchStoreListContainer;

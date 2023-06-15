import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import { API_PATH, CLIENT_PATH } from '../../../constants/path';
import { Store } from '../../../types/store';
import StoreItem from '../../common/Store/StoreItem';
import filterFunc from '../../../utils/filterFunc';
import { Link } from 'react-router-dom';
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
  console.log(stores);
  useEffect(() => {
    fetchData(setStores);
  }, []);
  console.log(stores);

  return (
    <ul>
      {stores ? (
        filterFunc(stores, filterAddress, filterCategory, filterDate).map((store: Store) => (
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

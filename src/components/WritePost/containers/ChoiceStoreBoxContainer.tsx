import SearchContainerWrap from '../../common/SearchInput/SearchInput';
import FilterContainer from './FilterContainer';
import FilterInfoContainer from './FilterInfoContainer';
import ChoiceStoreItemContainer from './ChoiceStoreItemContainer';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import { useState, useEffect } from 'react';
import StoreItem from '../../common/Store/StoreItem';
import { Store } from '../../../types/store';
import filterFunc from '../../../Hooks/filterFunc';
import ChoiceStoreList from '../components/ChoiceStoreList';
const ChoiceStoreBoxContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const choiceStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);
  const dispatch = useAppDispatch();
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const filterCategory = useAppSelector((state) => state.WritePostSlice.categoryFilter);
  const filterAddress = useAppSelector((state) => state.WritePostSlice.addressFilter);
  const filterDate = useAppSelector((state) => state.WritePostSlice.durationFilter);

  const [stores, setStores] = useState<Store[]>();
  async function fetchData() {
    const response = await fetch('http://34.22.81.36:3000/stores');
    const result = await response.json();
    setStores(result);
    console.log(result);
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (tab !== '자유게시판') {
    return (
      <div>
        <SearchContainerWrap placeholder={'스토어를 검색해주세요.'} />
        <FilterContainer />
        <FilterInfoContainer />
        <ChoiceStoreList>
          {stores ? (
            filterFunc(stores, filterAddress, filterCategory, filterDate, choiceStoreId).map((store: Store) => (
              <ChoiceStoreItemContainer key={store._id} setChoiceStoreId={setChoiceStoreId} storeId={store._id}>
                <StoreItem store={store} />
              </ChoiceStoreItemContainer>
            ))
          ) : (
            <li></li>
          )}
        </ChoiceStoreList>
      </div>
    );
  } else return <div></div>;
};

export default ChoiceStoreBoxContainer;

import SearchContainerWrap from '../../common/SearchInput/SearchInput';
import FilterContainer from './FilterContainer';
import FilterInfoContainer from './FilterInfoContainer';
import ChoiceStoreItemContainer from './ChoiceStoreItemContainer';
import { useAppSelector, useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions } from '../WritePostSlice';
import { useState, useEffect } from 'react';
import StoreItem from '../../common/Store/StoreItem';
import { Store } from '../../../types/store';

const filterFunc = (
  arr: Store[],
  address: {
    value: string;
    use: boolean;
  },
  category: {
    value: string;
    use: boolean;
  },
  targetStartDate: string,
  targetEndDate: string,
  DateFilterUse: boolean,
  choiceStoreId: string,
) => {
  if (choiceStoreId.length > 0) {
    return arr.filter((store) => store._id === choiceStoreId);
  }
  return arr.filter(
    (store) =>
      (address.use ? store.postcode.sido === address.value : store) &&
      (category.use ? store.category === category.value : store) &&
      (DateFilterUse
        ? new Date(store.start_date) <= new Date(targetEndDate) && new Date(targetStartDate) <= new Date(store.end_date)
        : store),
  );
};

const ChoiceStoreBoxContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const choiceStoreId = useAppSelector((state) => state.WritePostSlice.choiceStoreId);
  const dispatch = useAppDispatch();
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const FilterCategory = useAppSelector((state) => state.WritePostSlice.categoryFilter);
  const FilterAddress = useAppSelector((state) => state.WritePostSlice.addressFilter);
  const FilterDate = useAppSelector((state) => state.WritePostSlice.durationFilter);
  const FilterDateUse = useAppSelector((state) => state.WritePostSlice.durationFilter.use);
  const filterStartDate = `${FilterDate.StartDate.year}-${FilterDate.StartDate.month}-${FilterDate.StartDate.day}`;
  const filterEndDate = `${FilterDate.endDate.year}-${FilterDate.endDate.month}-${FilterDate.endDate.day}`;

  const [stores, setStores] = useState<Store[]>();
  //const [choiceStore, setChoiceStore] = useState<string>();
  async function fetchData() {
    const response = await fetch('http://34.22.81.36:3000/stores');
    const result = await response.json();
    setStores(result);
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
        <ul>
          {stores ? (
            filterFunc(
              stores,
              FilterAddress,
              FilterCategory,
              filterStartDate,
              filterEndDate,
              FilterDateUse,
              choiceStoreId,
            ).map((store: Store) => (
              <ChoiceStoreItemContainer key={store._id} setChoiceStoreId={setChoiceStoreId} storeId={store._id}>
                <StoreItem
                  store={store}
                  // 스토어 선택 취소 가능하게 하기
                />
              </ChoiceStoreItemContainer>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </div>
    );
  } else return <div></div>;
};

export default ChoiceStoreBoxContainer;

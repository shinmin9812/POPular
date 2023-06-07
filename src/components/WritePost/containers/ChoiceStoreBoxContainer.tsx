import SearchContainerWrap from '../../common/SearchInput/SearchInput';
import FilterContainer from './FilterContainer';
import FilterInfoContainer from './FilterInfoContainer';
import { useAppSelector } from '../../../Hooks/useSelectorHooks';
import { useState, useEffect } from 'react';
import StoreItem from '../../common/Store/StoreItem';
import { Store } from '../../../types/store';

const AddressfilterFuc = (arr: Store[], standard: string) => {
  if (standard === '지역') return arr;
  const regex = new RegExp(`[${standard}]`, 'g');
  return arr.filter((store) => store.postcode.sido.match(regex));
};
const CategoryfilterFuc = (arr: Store[], standard: string) => {
  if (standard === '카테고리') return arr;
  return arr.filter((store) => store.category === standard);
};
const durationfilterFuc = (arr: Store[], targetStartDate: string, targetEndDate: string) => {
  return arr.filter(
    (store) =>
      new Date(store.start_date) <= new Date(targetEndDate) && new Date(targetStartDate) <= new Date(store.end_date),
  );
};

const ChoiceStoreBoxContainer = () => {
  const tab = useAppSelector((state) => state.WritePostSlice.tab);
  const FilterCategory = useAppSelector((state) => state.WritePostSlice.categoryFilter.value);
  const FilterAddress = useAppSelector((state) => state.WritePostSlice.addressFilter.value);
  const FilterDate = useAppSelector((state) => state.WritePostSlice.durationFilter);
  const filterStartrDate = `${FilterDate.StartDate.year}-${FilterDate.StartDate.month}-${FilterDate.StartDate.day}`;
  const filterEndDate = `${FilterDate.StartDate.year}-${FilterDate.StartDate.month}-${FilterDate.StartDate.day}`;

  const [stores, setStores] = useState<Store[]>();
  const [choiceStore, setChoiceStore] = useState(true);
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
            stores.map((store: Store) => (
              <StoreItem
                key={store._id}
                store={store}
                // onClick={() => {
                //   setChoiceStore(true);
                // }}
              />
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
